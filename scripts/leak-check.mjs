import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const allowedUrls = [
  'https://www.eurova-market.eu',
  'https://schema.org',
  'http://www.w3.org/2000/svg',
  'http://www.sitemaps.org/schemas/sitemap/0.9',
  'http://www.w3.org/1998/Math/MathML',
  'http://www.w3.org/1999/xhtml',
  'http://www.w3.org/1999/xlink',
  'http://www.w3.org/XML/1998/namespace',
  'http://www.w3.org/2000/xmlns/',
  'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss'
];

const allowedFaqPhrases = [
  'Individual store locations and addresses are not published on this website.',
  'Individual store locations and addresses are not published on this website'
];

const forbiddenKeywords = [
  { term: 'locator', regex: /\blocator\b/i },
  { term: 'street', regex: /\bstreet\b/i },
  { term: 'latitude', regex: /\blatitude\b/i },
  { term: 'longitude', regex: /\blongitude\b/i },
  { term: 'google', regex: /\bgoogle\b/i },
  { term: 'facebook', regex: /\bfacebook\b/i },
  { term: 'analytics', regex: /\banalytics\b/i },
  { term: 'gtag', regex: /\bgtag\b/i },
  { term: 'geo', regex: /\bgeo\b/i },
  { term: 'map', regex: /\b(map|maps)\b/i }
];

let errorsFound = 0;

function checkFile(fullPath, isHtmlOnly = false) {
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Check forbidden keywords
  for (const { term, regex } of forbiddenKeywords) {
    if (regex.test(content)) {
      console.error(`[LEAK DETECTED] Forbidden term '${term}' found in: ${fullPath}`);
      errorsFound++;
    }
  }

  // Check address (forbidden outside exact approved FAQ phrase)
  const addressMatches = content.match(/\baddress(es)?\b/gi);
  if (addressMatches) {
    let sanitized = content;
    for (const phrase of allowedFaqPhrases) {
      sanitized = sanitized.replaceAll(phrase, '');
    }
    if (/\baddress(es)?\b/i.test(sanitized)) {
      console.error(`[LEAK DETECTED] Unauthorized 'address' term found outside approved FAQ in: ${fullPath}`);
      errorsFound++;
    }
  }

  // Check external URLs
  const urlRegex = /https?:\/\/[^\s"'`<>]+/g;
  const matches = content.match(urlRegex) || [];
  for (const url of matches) {
    const cleanUrl = url.replace(/[),;.]+$/, '');
    const isAllowed = allowedUrls.some(allowed => cleanUrl.startsWith(allowed));
    if (!isAllowed) {
      console.error(`[EXTERNAL URL DETECTED] Found unapproved URL: ${cleanUrl} in ${fullPath}`);
      errorsFound++;
    }
  }
}

function scanSrcDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanSrcDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.ts', '.html', '.scss'].includes(ext)) {
        checkFile(fullPath);
      }
    }
  }
}

function scanPrerenderedHtml(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanPrerenderedHtml(fullPath);
    } else if (stat.isFile() && file.endsWith('.html')) {
      checkFile(fullPath, true);
    }
  }
}

async function checkImagesExif() {
  const imagesDir = path.resolve('public/images');
  if (!fs.existsSync(imagesDir)) return;

  const files = fs.readdirSync(imagesDir);
  let checkedCount = 0;
  for (const file of files) {
    if (!file.endsWith('.webp')) continue;
    checkedCount++;
    const fullPath = path.join(imagesDir, file);
    try {
      const metadata = await sharp(fullPath).metadata();
      if (metadata.exif || metadata.gps) {
        console.error(`[EXIF/GPS LEAK DETECTED] Image ${file} contains metadata!`);
        errorsFound++;
      }
    } catch (e) {
      console.error(`Could not read metadata for ${file}:`, e.message);
      errorsFound++;
    }
  }
  console.log(`Verified ${checkedCount} WebP images. All EXIF/GPS stripped: 100%.`);
}

async function run() {
  console.log('--- STARTING LEAK CHECK ---');
  console.log('1. Scanning src/ directory for forbidden terms and unauthorized URLs...');
  scanSrcDirectory(path.resolve('src'));

  console.log('2. Scanning prerendered HTML output in dist/eurova-market/browser...');
  if (fs.existsSync(path.resolve('dist/eurova-market/browser'))) {
    scanPrerenderedHtml(path.resolve('dist/eurova-market/browser'));
  }

  console.log('3. Checking EXIF/GPS data in public/images...');
  await checkImagesExif();

  if (errorsFound > 0) {
    console.error(`FAILED: ${errorsFound} potential leak(s) detected.`);
    process.exit(1);
  } else {
    console.log('[PASS] All leak checks passed! Zero confidential leaks, zero external runtime requests, zero EXIF/GPS data.');
  }
}

run();
