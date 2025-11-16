import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const referenceApiDir = path.resolve(__dirname, '../chrome/reference_api');
const schemaOutputPath = path.resolve(__dirname, '../src/vitest-chrome-schema.json');

function getNamespace(ast) {
  let namespace = '';
  visit(ast, 'heading', (node) => {
    if (node.depth === 1) {
      const codeNode = node.children.find(child => child.type === 'inlineCode');
      if (codeNode) {
        namespace = codeNode.value.split('.')[1];
      }
    }
  });
  return namespace;
}

function parseSection(ast, sectionName) {
  const section = [];
  let inSection = false;
  visit(ast, (node) => {
    if (node.type === 'heading' && node.depth === 2) {
      inSection = node.children[0].value === sectionName;
    } else if (inSection && node.type === 'code') {
      section.push(node.value);
    }
  });
  return section;
}

function parseMethod(signature) {
  const match = signature.match(/chrome\.(\w+)\.(\w+)\(([^)]*)\)/);
  if (!match) return null;

  const [, namespace, name, paramsString] = match;
  const returnsMatch = signature.match(/:\s*(Promise<.*>|.*)/);
  const returns = returnsMatch ? returnsMatch[1].trim() : 'void';

  const parameters = paramsString.split(',').map(p => p.trim()).filter(Boolean).map(p => {
    const [name, type] = p.split(':').map(s => s.trim());
    return { name, type: type || 'any', optional: name.includes('?') };
  });

  return {
    name,
    type: 'function',
    isPromise: returns.startsWith('Promise<'),
    parameters,
  };
}

function parseEvent(signature) {
  const match = signature.match(/chrome\.(\w+)\.(\w+)\.addListener/);
  if (!match) return null;

  const [, namespace, name] = match;

  return {
    name,
    type: 'event',
    parameters: [], // Note: detailed event parameter parsing is complex and will be added later
  };
}

function parseProperty(propString) {
  const name = propString.trim().split(' ')[0];
  if (!name) return null;
  
  return {
    name,
    type: 'property',
    value: null, // Note: default values are not currently parsed
  };
}

async function generateSchema() {
  const apiSchema = {};
  const files = await fs.promises.readdir(referenceApiDir);

  for (const file of files) {
    if (path.extname(file) !== '.md' || file === 'index.md' || file === 'README.md') {
      continue;
    }

    const markdown = await fs.promises.readFile(path.join(referenceApiDir, file), 'utf-8');
    const ast = remark.parse(markdown);

    let namespace = '';
    visit(ast, 'heading', (node) => {
      if (node.depth === 1) {
        const child = node.children[0];
        if ((child.type === 'text' || child.type === 'inlineCode') && child.value.includes('.')) {
          namespace = child.value.split('.')[1];
        }
      }
    });

    if (!namespace) {
      continue;
    }

    apiSchema[namespace] = {
      functions: parseSection(ast, 'Methods').map(parseMethod).filter(Boolean),
      events: parseSection(ast, 'Events').map(parseEvent).filter(Boolean),
      properties: parseSection(ast, 'Properties').flatMap(propBlock => propBlock.split('\n').map(p => p.trim().split(' ')[0]).filter(Boolean)).map(prop => ({ name: prop, type: 'property', value: null })).filter(p => p.name),
    };
  }

  await fs.promises.writeFile(schemaOutputPath, JSON.stringify(apiSchema, null, 2));
  console.log('Schema generated successfully!');
}

generateSchema().catch(console.error);
