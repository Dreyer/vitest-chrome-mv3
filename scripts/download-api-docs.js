#!/usr/bin/env node

/**
 * Download Chrome Extensions API reference pages listed in index.txt
 * Each line in index.txt is a relative link like: /docs/extensions/reference/api/tabs
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE = join(__dirname, '../docs/chrome_extensions_reference.txt');
const OUT_DIR = join(__dirname, '../chrome_extensions_reference');

// Configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

/**
 * Download a file with retries
 */
async function downloadWithRetry(url, maxRetries = MAX_RETRIES) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        console.error(`  Attempt ${attempt} failed: ${error.message}. Retrying in ${RETRY_DELAY_MS}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  
  throw lastError;
}

/**
 * Main function
 */
async function main() {
  try {
    // Read the input file
    const content = readFileSync(INPUT_FILE, 'utf-8');
    const lines = content.split('\n');
    
    let downloaded = 0;
    let failed = 0;
    
    for (const line of lines) {
      const rel = line.trim();
      
      // Skip empty lines and comments
      if (!rel || rel.startsWith('#')) {
        continue;
      }
      
      // Ensure it starts with a slash
      if (!rel.startsWith('/')) {
        console.error(`Skipping invalid relative path (no leading '/'): ${rel}`);
        continue;
      }
      
      // Compose source URL and output path
      const srcUrl = `https://developer.chrome.com${rel}.md.txt`;
      const outPath = join(OUT_DIR, `${rel}.md`);
      
      // Create directories for nested paths
      mkdirSync(dirname(outPath), { recursive: true });
      
      console.log(`Downloading: ${srcUrl}`);
      
      try {
        const content = await downloadWithRetry(srcUrl);
        writeFileSync(outPath, content, 'utf-8');
        downloaded++;
      } catch (error) {
        console.error(`Failed to download: ${srcUrl}`);
        console.error(`  Error: ${error.message}`);
        failed++;
      }
    }
    
    console.log('\n✓ Done!');
    console.log(`  Downloaded: ${downloaded} files`);
    if (failed > 0) {
      console.log(`  Failed: ${failed} files`);
    }
    console.log(`  Output directory: ${OUT_DIR}`);
    
    process.exit(failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();

