import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const outputDir = path.resolve('public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const docsDir = path.resolve('docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// 13 strictly neutral images
const images = [
  {
    name: 'hero-retail-lifestyle',
    sourceUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1800&q=85',
    alt: 'Modern supermarket interior with organized grocery aisles and soft architectural lighting',
    photographer: 'Fikri Rasyid',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '16/10'
  },
  {
    name: 'group-intro-overview',
    sourceUrl: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=1800&q=85',
    alt: 'Spacious retail distribution and modern store architecture reflecting group operations',
    photographer: 'Scott Warman',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '21/9'
  },
  {
    name: 'store-grocery-main',
    sourceUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800&q=85',
    alt: 'Approachable neighborhood grocery store layout with fresh produce and dry goods',
    photographer: 'nrd',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '16/10'
  },
  {
    name: 'store-grocery-sub1',
    sourceUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=85',
    alt: 'Clean organized shelving in a compact grocery store format',
    photographer: 'Victoriano Izquierdo',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '4/3'
  },
  {
    name: 'store-grocery-sub2',
    sourceUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=85',
    alt: 'Clear store entrance and self-service checkout area in neighborhood store',
    photographer: 'Eduardo Soares',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '4/3'
  },
  {
    name: 'store-supermarket-main',
    sourceUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1800&q=85',
    alt: 'Full-size supermarket with wide aisles, distinct sections and bright modern signage',
    photographer: 'Franki Chamaki',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '16/10'
  },
  {
    name: 'store-supermarket-sub1',
    sourceUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=85',
    alt: 'Bakery and fresh goods section within a modern full-size supermarket',
    photographer: 'Wesual Click',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '4/3'
  },
  {
    name: 'store-supermarket-sub2',
    sourceUrl: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=1200&q=85',
    alt: 'Customer service and organized checkout counters in supermarket format',
    photographer: 'Eduardo Soares',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '4/3'
  },
  {
    name: 'store-warehouse-main',
    sourceUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85',
    alt: 'High-ceiling warehouse retail format with high-capacity shelving and wide aisles',
    photographer: 'Peteco Peteco',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '16/10'
  },
  {
    name: 'store-warehouse-sub1',
    sourceUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85',
    alt: 'Bulk storage racking and pallet displays in warehouse store environment',
    photographer: 'Adrian Sulyok',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '4/3'
  },
  {
    name: 'store-warehouse-sub2',
    sourceUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&q=85',
    alt: 'Efficient logistics and high-volume dispatch area within warehouse retail format',
    photographer: 'Chuttersnap',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '4/3'
  },
  {
    name: 'about-hero-overview',
    sourceUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&q=85',
    alt: 'Corporate retail operations and supply chain management presentation',
    photographer: 'John Schnobrich',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '16/9'
  },
  {
    name: 'og-image',
    sourceUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&h=630&fit=crop&q=85',
    alt: 'Eurova Market Group corporate overview and retail format preview',
    photographer: 'Fikri Rasyid',
    source: 'Unsplash (Free Unsplash License)',
    aspectRatio: '1200/630'
  }
];

function createFallbackSvg(img, width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#176B45" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0E4A30" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${width * 0.25}" fill="#E8F3ED" opacity="0.08" />
      <text x="50%" y="46%" font-family="system-ui, sans-serif" font-size="${Math.round(width * 0.035)}px" font-weight="600" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">
        EUROVA MARKET GROUP
      </text>
      <text x="50%" y="54%" font-family="system-ui, sans-serif" font-size="${Math.round(width * 0.02)}px" font-weight="400" fill="#E8F3ED" opacity="0.85" text-anchor="middle" dominant-baseline="middle">
        ${img.alt}
      </text>
    </svg>
  `);
}

async function processImage(img) {
  console.log(`Processing: ${img.name}...`);
  let inputBuffer;
  try {
    const res = await fetch(img.sourceUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    inputBuffer = Buffer.from(await res.arrayBuffer());
    console.log(`  Downloaded ${img.name} (${inputBuffer.length} bytes)`);
  } catch (err) {
    console.warn(`  Download failed for ${img.name} (${err.message}). Using elegant SVG fallback.`);
    inputBuffer = createFallbackSvg(img, 1600, 1000);
  }

  const widths = [640, 1024, 1600];

  for (const w of widths) {
    const targetFile = path.join(outputDir, `${img.name}-${w}.webp`);
    await sharp(inputBuffer)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(targetFile);
  }

  // Also default version
  const defaultFile = path.join(outputDir, `${img.name}.webp`);
  await sharp(inputBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(defaultFile);

  console.log(`  Generated all WebP sizes for ${img.name}`);
}

async function main() {
  for (const img of images) {
    await processImage(img);
  }

  // Write image credits documentation
  const creditsContent = `# Image Credits and Manifest

All imagery used across the Eurova Market Group website represents modern, neutral retail environments. In strict accordance with corporate confidentiality requirements:
- No geographic landmarks, city names, street signs, or coordinates are depicted.
- No brand logos, commercial trademarks, or branded uniforms are visible.
- All EXIF, GPS, camera metadata, and timestamps are stripped during processing.
- Images are served strictly as self-hosted responsive WebP files without third-party CDN or runtime connections.

## Sourced Photography

| Asset Key | File Name | Alt Text | Photographer / Source | License |
| :--- | :--- | :--- | :--- | :--- |
${images
  .map(
    (img) =>
      `| \`${img.name}\` | \`/images/${img.name}.webp\` | ${img.alt} | ${img.photographer} via ${img.source} | Neutral Unsplash License (Commercial Use Allowed) |`
  )
  .join('\n')}
`;

  fs.writeFileSync(path.join(docsDir, 'image-credits.md'), creditsContent, 'utf-8');
  console.log('Successfully wrote docs/image-credits.md');
}

main().catch((err) => {
  console.error('Fatal error processing images:', err);
  process.exit(1);
});
