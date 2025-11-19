import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const referenceApiDir = path.resolve(__dirname, '../docs/chrome_extensions_reference');
const schemaOutputPath = path.resolve(
  __dirname,
  '../src/vitest-chrome-schema.json',
);

function getNamespace(ast) {
  let namespace = '';
  visit(ast, 'heading', (node) => {
    if (node.depth === 1) {
      const codeNode = node.children.find(
        (child) => child.type === 'inlineCode',
      );
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
  // Match nested namespaces like chrome.system.display.getInfo or chrome.runtime.getURL
  const match = signature.match(/chrome\.([\w.]+)\.(\w+)\(([^)]*)\)/);
  if (!match) return null;

  const [, namespacePath, name, paramsString] = match;
  const returnsMatch = signature.match(/:\s*(Promise<.*>|.*)/);
  const returns = returnsMatch ? returnsMatch[1].trim() : 'void';

  const parameters = paramsString
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [name, type] = p.split(':').map((s) => s.trim());
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
  // Match nested namespaces like chrome.system.display.onDisplayChanged
  const match = signature.match(/chrome\.([\w.]+)\.(\w+)\.addListener/);
  if (!match) return null;

  const [, namespacePath, name] = match;

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

/**
 * Recursively get all markdown files from a directory
 */
async function getAllMarkdownFiles(dir, fileList = []) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await getAllMarkdownFiles(filePath, fileList);
    } else if (
      file.isFile() &&
      path.extname(file.name) === '.md' &&
      file.name !== 'index.md' &&
      file.name !== 'README.md'
    ) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Set a nested property on an object using a dot-separated path
 */
function setNestedProperty(obj, path, value) {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || typeof current[part] !== 'object') {
      current[part] = {
        functions: [],
        events: [],
        properties: [],
      };
    }
    current = current[part];
  }

  const lastPart = parts[parts.length - 1];
  if (!current[lastPart] || typeof current[lastPart] !== 'object') {
    current[lastPart] = {
      functions: [],
      events: [],
      properties: [],
    };
  }

  // Merge the new data with existing
  const existing = current[lastPart];
  existing.functions.push(...value.functions);
  existing.events.push(...value.events);
  existing.properties.push(...value.properties);
}

async function generateSchema() {
  const apiSchema = {};
  const files = await getAllMarkdownFiles(referenceApiDir);

  for (const filePath of files) {
    const markdown = await fs.promises.readFile(filePath, 'utf-8');
    const ast = remark.parse(markdown);

    let namespacePath = '';

    // First try to find namespace in H1 heading
    visit(ast, 'heading', (node) => {
      if (node.depth === 1) {
        const child = node.children[0];
        if (
          (child.type === 'text' || child.type === 'inlineCode') &&
          child.value.includes('chrome.')
        ) {
          // Extract full namespace path (e.g., "system.display" from "chrome.system.display")
          const match = child.value.match(/chrome\.([\w.]+)/);
          if (match) {
            namespacePath = match[1];
          }
        }
      }
    });

    // If not found in H1, search entire markdown content for chrome.X pattern
    if (!namespacePath) {
      const markdownText = markdown.substring(0, 2000); // Check first 2000 chars
      const match = markdownText.match(/chrome\.([\w.]+)/);
      if (match) {
        namespacePath = match[1];
      }
    }

    if (!namespacePath) {
      continue;
    }

    const namespaceData = {
      functions: parseSection(ast, 'Methods').map(parseMethod).filter(Boolean),
      events: parseSection(ast, 'Events').map(parseEvent).filter(Boolean),
      properties: parseSection(ast, 'Properties')
        .flatMap((propBlock) =>
          propBlock
            .split('\n')
            .map((p) => p.trim().split(' ')[0])
            .filter(Boolean),
        )
        .map((prop) => ({ name: prop, type: 'property', value: null }))
        .filter((p) => p.name),
    };

    setNestedProperty(apiSchema, namespacePath, namespaceData);
  }

  await fs.promises.writeFile(
    schemaOutputPath,
    JSON.stringify(apiSchema, null, 2),
  );
  console.log('Schema generated successfully!');
}

generateSchema().catch(console.error);
