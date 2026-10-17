import fs from 'node:fs';
import path from 'node:path';

const distBrowserDir = path.resolve('dist/eurova-market/browser');

// 1. Verify required prerendered files exist
const requiredRoutes = [
  'index.html',
  'our-stores/index.html',
  'about-us/index.html',
  'faq/index.html'
];

for (const relPath of requiredRoutes) {
  const fullPath = path.join(distBrowserDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`ERROR: Prerendered file missing: ${relPath}`);
    process.exit(1);
  } else {
    const size = fs.statSync(fullPath).size;
    console.log(`[PASS] Prerendered: ${relPath} (${size} bytes)`);
  }
}

// 2. Ensure 404.html exists in root of browser dist
const html404Nested = path.join(distBrowserDir, '404/index.html');
const html404Root = path.join(distBrowserDir, '404.html');

if (fs.existsSync(html404Nested)) {
  fs.copyFileSync(html404Nested, html404Root);
  console.log(`[PASS] Created 404.html from 404/index.html (${fs.statSync(html404Root).size} bytes)`);
} else if (fs.existsSync(html404Root)) {
  console.log(`[PASS] 404.html exists (${fs.statSync(html404Root).size} bytes)`);
} else {
  console.error('ERROR: Prerendered 404 page is missing!');
  process.exit(1);
}

// 3. Normalize all script/link paths in HTML files to absolute root paths
function normalizeHtmlPaths(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      normalizeHtmlPaths(fullPath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      // Replace relative script, modulepreload, and css references with root-relative paths
      content = content.replace(/(src|href)=["'](polyfills-[^"']+)["']/g, '$1="/$2"');
      content = content.replace(/(src|href)=["'](main-[^"']+)["']/g, '$1="/$2"');
      content = content.replace(/(src|href)=["'](chunk-[^"']+)["']/g, '$1="/$2"');
      content = content.replace(/(src|href)=["'](styles-[^"']+)["']/g, '$1="/$2"');
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  }
}

normalizeHtmlPaths(distBrowserDir);
console.log('[PASS] Normalized all script, modulepreload, and css assets to root-relative paths.');
console.log('Static prerender validation completed successfully.');
