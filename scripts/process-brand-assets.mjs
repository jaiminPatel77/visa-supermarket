import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const DESIGN_ASSETS = path.join(PROJECT_ROOT, 'public', 'design-assets');
const BRAND_OUTPUT = path.join(PROJECT_ROOT, 'public', 'brand');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

if (!fs.existsSync(BRAND_OUTPUT)) {
  fs.mkdirSync(BRAND_OUTPUT, { recursive: true });
}

// 1. Precise tight crop and transparent alpha generator
async function processLogoImage(inputPath, opts = {}) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Step A: Find true content bounding box
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const maxDiff = Math.max(255 - r, 255 - g, 255 - b);

      if (maxDiff > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = opts.padding || 32;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);

  console.log(`BBox for ${path.basename(inputPath)}: [${cropX}, ${cropY}, ${cropW}x${cropH}]`);

  // Step B: Extract and apply alpha with antialiased edge defringing
  const croppedRaw = await sharp(inputPath)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cWidth = croppedRaw.info.width;
  const cHeight = croppedRaw.info.height;
  const cData = croppedRaw.data;
  const out = Buffer.alloc(cWidth * cHeight * 4);

  for (let y = 0; y < cHeight; y++) {
    for (let x = 0; x < cWidth; x++) {
      const idx = (y * cWidth + x) * croppedRaw.info.channels;
      const outIdx = (y * cWidth + x) * 4;

      const r = cData[idx];
      const g = cData[idx + 1];
      const b = cData[idx + 2];

      const maxDiff = Math.max(255 - r, 255 - g, 255 - b);

      let alpha = 255;
      if (maxDiff <= 14) {
        alpha = 0;
      } else if (maxDiff < 64) {
        // Linear smooth ramp for anti-aliased edge
        alpha = Math.round(((maxDiff - 14) / 50) * 255);
      } else {
        alpha = 255;
      }

      if (alpha > 0) {
        // Defringe white edge pixels
        const aNorm = alpha / 255;
        const unmixR = Math.min(255, Math.max(0, Math.round((r - (1 - aNorm) * 255) / aNorm)));
        const unmixG = Math.min(255, Math.max(0, Math.round((g - (1 - aNorm) * 255) / aNorm)));
        const unmixB = Math.min(255, Math.max(0, Math.round((b - (1 - aNorm) * 255) / aNorm)));

        out[outIdx] = unmixR;
        out[outIdx + 1] = unmixG;
        out[outIdx + 2] = unmixB;
        out[outIdx + 3] = alpha;
      } else {
        out[outIdx] = 255;
        out[outIdx + 1] = 255;
        out[outIdx + 2] = 255;
        out[outIdx + 3] = 0;
      }
    }
  }

  const transBuffer = await sharp(out, {
    raw: { width: cWidth, height: cHeight, channels: 4 }
  })
    .png()
    .toBuffer();

  return { buffer: transBuffer, width: cWidth, height: cHeight };
}

// 2. Generate dark-mode full logo (Navy -> Pure White; Leaf & SUPERMARKET -> Leaf Green; Stars -> Gold)
async function createDarkVersion(transparentBuffer) {
  const { data, info } = await sharp(transparentBuffer).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
      continue;
    }

    // Navy detection: high blue relative to red/green, or dark blue/indigo
    const isNavy = (b > r + 15 && b > g + 10) || (r < 55 && g < 75 && b > 60);

    if (isNavy) {
      // Invert navy to pure crisp white
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = a;
    } else {
      // Retain green leaf, green text, gold stars
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
      out[i + 3] = a;
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

// 3. Simplified favicon icon (keep bold navy K + green leaf only, dropping small stars and cart)
async function createSimplifiedFaviconBase(transparentIconBuffer) {
  const { data, info } = await sharp(transparentIconBuffer).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a === 0) continue;

      // Filter out gold stars: r > 140, g > 110, b < 100
      const isGoldStar = r > 140 && g > 110 && b < 100;
      if (isGoldStar) {
        continue;
      }

      // Filter out cart wheels / basket if desired:
      // The cart is at the bottom right of the leaf / inside the K crotch.
      // Keeping the K and leaf provides an instantly readable silhouette.
      const outIdx = (y * width + x) * 4;
      out[outIdx] = r;
      out[outIdx + 1] = g;
      out[outIdx + 2] = b;
      out[outIdx + 3] = a;

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);

  return sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toBuffer();
}

// 4. Build standard multi-size ICO binary
function buildIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  const dirSize = numImages * 16;
  let currentOffset = 6 + dirSize;

  const dirEntries = [];
  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);
    currentOffset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

async function main() {
  console.log('--- PROCESSING BRAND ASSETS (TIGHT CROPPED & DEFRINGED) ---');

  // 1. Process Logo Icon
  console.log('Processing logo-icon...');
  const iconRes = await processLogoImage(
    path.join(DESIGN_ASSETS, 'kineth-logo-icon.png'),
    { padding: 24 }
  );
  await sharp(iconRes.buffer).toFile(path.join(BRAND_OUTPUT, 'logo-icon-transparent.png'));
  await sharp(iconRes.buffer)
    .flatten({ background: '#ffffff' })
    .toFile(path.join(BRAND_OUTPUT, 'logo-icon.png'));

  // 2. Process Logo Full
  console.log('Processing logo-full...');
  const fullRes = await processLogoImage(
    path.join(DESIGN_ASSETS, 'kineth-logo-full.png'),
    { padding: 24 }
  );
  await sharp(fullRes.buffer).toFile(path.join(BRAND_OUTPUT, 'logo-full-transparent.png'));
  await sharp(fullRes.buffer)
    .flatten({ background: '#ffffff' })
    .toFile(path.join(BRAND_OUTPUT, 'logo-full.png'));

  // Dark background version of full logo (navy inverted to white)
  console.log('Generating dark-background logo-full-on-dark.png...');
  const fullDarkBuf = await createDarkVersion(fullRes.buffer);
  await sharp(fullDarkBuf).toFile(path.join(BRAND_OUTPUT, 'logo-full-on-dark.png'));

  // Logo full with white panel
  await sharp(fullRes.buffer)
    .extend({
      top: 24,
      bottom: 24,
      left: 32,
      right: 32,
      background: '#ffffff'
    })
    .toFile(path.join(BRAND_OUTPUT, 'logo-full-white-panel.png'));

  // 3. Process Favicons
  console.log('Generating multi-size favicons...');
  const simplifiedBuf = await createSimplifiedFaviconBase(iconRes.buffer);

  // Favicon 16x16
  const fav16 = await sharp(simplifiedBuf)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), fav16);

  // Favicon 32x32
  const fav32 = await sharp(simplifiedBuf)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), fav32);

  // Favicon 48x48
  const fav48 = await sharp(simplifiedBuf)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Multi-size favicon.ico (16, 32, 48)
  const icoBuffer = buildIco([
    { buffer: fav16, size: 16 },
    { buffer: fav32, size: 32 },
    { buffer: fav48, size: 48 }
  ]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log(`Generated favicon.ico with 16, 32, 48px sizes (${icoBuffer.length} bytes)`);

  // Apple touch icon 180x180 (solid white background, full icon centered with ~8% padding)
  const appleTouch = await sharp(iconRes.buffer)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
      background: '#ffffff'
    })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), appleTouch);

  // Icon 192x192
  const icon192 = await sharp(iconRes.buffer)
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 16,
      bottom: 16,
      left: 16,
      right: 16,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-192.png'), icon192);

  // Icon 512x512
  const icon512 = await sharp(iconRes.buffer)
    .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 36,
      bottom: 36,
      left: 36,
      right: 36,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-512.png'), icon512);

  // Update favicon.svg with vector representation
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <!-- Navy K and Green Leaf Favicon -->
  <rect width="48" height="48" rx="10" fill="#13295C"/>
  <!-- Leaf -->
  <path d="M12 28C10 21 15 13 22 11C22 17 19 25 12 28Z" fill="#6AA84F"/>
  <path d="M12 28C15 25 18 20 22 11" stroke="#3E732B" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Bold K -->
  <path d="M19 13H24V22.2L31.5 13H38L28.2 24.3L38.5 35H32L24 25.8V35H19V13Z" fill="#FFFFFF"/>
</svg>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSvg);

  // Web Manifest
  const manifest = {
    name: 'Kineth Supermarket',
    short_name: 'Kineth',
    description: 'European Supermarket Group',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#13295C',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('--- ALL BRAND ASSETS AND ICONS PROCESSED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
