# Kineth Supermarket — European Supermarket Group Corporate Portal

A production-quality, **information-only** corporate website for **Kineth Supermarket** (`brandShort`: **Kineth**), an established European Supermarket Group operating grocery stores, supermarkets, and warehouse formats across European Union member countries.

Built with Angular 20 (standalone components, strict TypeScript, custom SCSS design tokens, and static SSG prerendering), the website projects a corporate, spacious, modern, and trustworthy European retail identity without looking like an online shop, startup, or agency site.

---

## 1. Compliance, Privacy & Confidentiality Rules

In accordance with strict corporate directives:
- **Zero Geographic Leakage**: Store locations, branch lists, street addresses, cities, coordinates, maps, and store locators are strictly confidential and omitted. The sole permitted geographic statement is the official FAQ answer: *"Kineth Supermarket operates across selected European markets. Individual store locations and addresses are not published on this website."*
- **No E-Commerce**: No shopping cart, checkout, prices, categories, product catalogues, or commercial CTAs.
- **No Direct Contact Points**: No email addresses, phone numbers, contact forms, `mailto:`, or `tel:` links anywhere.
- **Intentional Omissions**: Per client decision, pages and links for **Contact, Privacy Policy, Terms, Legal Notice, Careers, Locations, Departments, and Products** were intentionally omitted.
  > **Legal Advisory Before Launch**: While omitted per client specifications for this corporate overview phase, European Union directives (such as the EU eCommerce Directive / corporate transparency laws) require registered commercial entities to provide company registration details and legal notices prior to public general dissemination. These requirements should be reviewed by legal counsel before public deployment.
- **Zero Third-Party Runtime Requests**: No external analytics, trackers, pixels, cookies, CDN scripts, or remote fonts. Fonts are self-hosted using `@fontsource-variable/inter`.
- **Neutral Photography**: All imagery depicts modern, neutral European retail interiors and logistics architecture. All readable street names, signs, license plates, and commercial logos are absent, and 100% of EXIF/GPS metadata is stripped.
- **EU Representation**: The site does not use the EU flag, EU emblem, or any wording suggesting an official EU affiliation.

---

## 2. Brand Identity, Logo Assets & Favicons

### 2.1 Brand Tokens
- **`brandShort`**: `Kineth`
- **`brandFull`**: `Kineth Supermarket`
- **`descriptor`**: `European Supermarket Group`
- **`tagline`**: `Everyday retail. Built around people.`
- **`domainName`**: `kinethsupermarketeu`
- **`siteUrl`**: `https://kinethsupermarketeu.com` (TODO: confirm domain extension)
- **Hero Eyebrow**: `KINETH SUPERMARKET | EUROPEAN SUPERMARKET GROUP`

### 2.2 Color Palette (Exact Sampled Logo Tokens)
- `--color-primary`: `#13295C` (The corporate logo navy: used for headings, primary buttons, footer background, and links)
- `--color-primary-dark`: `#0D1C40` (Dark navy for button hover and active states)
- `--color-primary-light`: `#EFF3FA` (Very light navy tint for soft container backgrounds)
- `--color-secondary`: `#6AA84F` (The logo leaf green: used for icons, thin accent lines, small highlights, and large 24px+ bold text)
- `--color-secondary-dark`: `#3E732B` (Darkened leaf green computed for WCAG AA compliance with `>= 4.5:1` contrast on light backgrounds for small text)
- `--color-accent`: `#C9A64B` (The logo gold: decorative only for dividers and stat highlights at large size)
- `--color-text`: `#17211C` (Dark neutral body copy)
- `--color-text-muted`: `#526059` (Muted copy verified for `>= 4.7:1` contrast on white and soft backgrounds)

### 2.3 Logo Assets & Directory Structure
Original source artwork files reside in `public/design-assets/`:
- `public/design-assets/kineth-logo-icon.png` (Original 2048x2048 icon artwork: K with green leaf, cart, and star arc)
- `public/design-assets/kineth-logo-full.png` (Original 2752x1536 stacked lockup: icon with "KINETH SUPERMARKET")

Optimized production brand assets reside in `public/brand/`:
- `logo-icon.png` — Icon artwork on solid white background
- `logo-icon-transparent.png` — Icon artwork with white background defringed and converted to alpha, cropped tightly
- `logo-full.png` — Full stacked logo lockup on white background
- `logo-full-transparent.png` — Full stacked logo lockup with alpha transparency, cropped tightly
- `logo-full-on-dark.png` — Dark-background version where navy elements (the letter K and the word KINETH) are rendered in crisp `#FFFFFF` while preserving the leaf green and gold stars
- `logo-full-white-panel.png` — Full logo lockup set on an elegant rounded white card

### 2.4 Vector Assets Recommendation
> **Designer Recommendation**: The provided logo files in `/design-assets` are high-resolution PNG rasters (2048x2048 and 2752x1536). While exported at high fidelity with antialiased edge defringing, **we strongly recommend requesting native vector SVG versions** of both the icon mark and horizontal/stacked lockups from the brand design agency. SVGs guarantee sub-pixel sharpness across ultra-high-density mobile screens and 4K/Retina displays with negligible file weight. Do not upscale raster assets with blur.

### 2.5 Favicon Suite & Browser Caching
The default Angular CLI favicon has been removed and replaced with a custom suite generated directly from brand artwork:
- `public/favicon.ico` (Multi-size `.ico` containing 16x16, 32x32, and 48x48)
- `public/favicon-32x32.png` (32x32 simplified icon: navy K + green leaf for crisp high-DPI tab rendering)
- `public/favicon-16x16.png` (16x16 simplified icon: optimized for low-resolution tab bars)
- `public/favicon.svg` (Scalable vector favicon with navy K and green leaf)
- `public/apple-touch-icon.png` (180x180 on solid white background for iOS home screens)
- `public/icon-192.png` (192x192 PWA manifest icon)
- `public/icon-512.png` (512x512 PWA splash icon)
- `public/site.webmanifest` (Standard web application manifest)
- `<meta name="theme-color" content="#13295C">`

> **Browser Favicon Caching Notice**: Web browsers aggressively cache `favicon.ico`. To view updated tab icons immediately in dev or staging environments, perform a hard refresh (`Ctrl + Shift + R` or `Cmd + Shift + R`) or open the site in a private/incognito window.

To regenerate all brand assets, transparent cutouts, and favicon sizes from `/design-assets`:
```bash
npm run process:brand
```

---

## 3. Configuration & Customization Guide

All corporate copy, numbers, and settings reside in typed data files under `src/app/data/` and `src/app/core/`. Templates contain zero hardcoded copy.

### 3.1 Updating Brand Name, Descriptor & Tagline
- Open `src/app/core/site.config.ts`:
  ```typescript
  export const SITE_CONFIG = {
    brandShort: 'Kineth',
    brandFull: 'Kineth Supermarket',
    descriptor: 'European Supermarket Group',
    tagline: 'Everyday retail. Built around people.',
    domainName: 'kinethsupermarketeu',
    // TODO: confirm the actual domain extension (.com / .eu / other)
    siteUrl: 'https://kinethsupermarketeu.com',
    ...
  };
  ```
- Open `src/app/data/site.data.ts`:
  ```typescript
  export const BRAND_DATA: BrandData = {
    brandShort: SITE_CONFIG.brandShort,
    brandFull: SITE_CONFIG.brandFull,
    descriptor: SITE_CONFIG.descriptor,
    tagline: SITE_CONFIG.tagline,
    domainName: SITE_CONFIG.domainName,
    siteUrl: SITE_CONFIG.siteUrl,
    copyrightYear: 2026,
    isPlaceholder: true // set to false upon confirming final brand guidelines
  };
  ```

### 3.2 Updating Domain & Production Site URL
When deploying to your production domain (e.g. `https://kinethsupermarketeu.com`):
1. Update `siteUrl` in `src/app/core/site.config.ts`.
2. Update the domain in `public/robots.txt` (`Sitemap: https://your-domain.com/sitemap.xml`).
3. Update `<loc>` tags in `public/sitemap.xml`.
4. Update the JSON-LD Organization schema in `src/index.html`.

### 3.3 Updating Statistics
Open `src/app/data/stats.data.ts`:
```typescript
export const STATS_DATA: StatItem[] = [
  {
    id: 'stores',
    value: 280, // Replace with confirmed count
    suffix: '+',
    label: 'Stores',
    isPlaceholder: false // Set to false once confirmed
  },
  {
    id: 'formats',
    value: 3,
    suffix: '',
    label: 'Retail Formats',
    isPlaceholder: false
  },
  {
    id: 'experience',
    value: 25, // Replace with verified founding duration
    suffix: '+',
    label: 'Years of Experience',
    isPlaceholder: false
  }
];
```

### 3.4 Updating Copy & Sections
- **Store Formats**: `src/app/data/stores.data.ts` (descriptions and feature points for Grocery Store, Supermarket, and Warehouse).
- **Corporate Values**: `src/app/data/values.data.ts` (Reliability, Customers First, Responsible Growth, Operational Excellence).
- **Milestones Timeline**: `src/app/data/milestones.data.ts` (Phase years and descriptions).
- **FAQ Questions & Answers**: `src/app/data/faq.data.ts`.

---

## 4. "Before Launch" Verification Checklist

Every placeholder in the application is tagged with `// TODO: PLACEHOLDER` and a typed boolean flag `isPlaceholder: true`. Before going live, verify the following:

- [ ] **Brand Identity**: Confirm formal legal trading entity in `src/app/core/site.config.ts` and `src/app/data/site.data.ts` (set `isPlaceholder: false`).
- [ ] **Production Domain Extension**: Confirm whether production domain is `.com`, `.eu`, or other in `site.config.ts`, `robots.txt`, `sitemap.xml`, and `src/index.html`.
- [ ] **Store Count Metric**: Update verified retail store count in `src/app/data/stats.data.ts` (set `isPlaceholder: false`).
- [ ] **Years of Experience**: Update verified operating years in `src/app/data/stats.data.ts` (set `isPlaceholder: false`).
- [ ] **Group Chronology & Founding**: Replace placeholder phase markers (`Phase I (TODO: Year)`) in `src/app/data/milestones.data.ts` with confirmed corporate archive dates (set `isPlaceholder: false`).
- [ ] **Corporate Story**: Review the narrative in `src/app/data/site.data.ts` (`SITE_COPY.aboutUs.ourStory`) against company records.
- [ ] **EU Company Registration & Legal Assessment**: Have corporate legal counsel review whether company registration number, commercial register entry, and VAT identification need to be displayed for the entity's EU jurisdiction.
- [ ] **Automated Leak Verification**: Execute `npm run leak-check` to confirm zero confidential location references, external URLs, contact details, or leftover placeholder terms.

---

## 5. Build & Deployment Commands

```bash
# Install dependencies
npm install

# Run dev server
npm start

# Process brand assets, strip background, and generate responsive favicons
npm run process:brand

# Pre-generate responsive WebP editorial images & strip metadata
npm run generate:images

# Build and prerender static HTML output
npm run build

# Run automated leak check
npm run leak-check
```

### Static Output
Running `npm run build` generates purely static HTML pages inside `dist/eurova-market/browser/`:
- `index.html` (Home)
- `our-stores/index.html` (Our Stores)
- `about-us/index.html` (About Us)
- `faq/index.html` (FAQ)
- `404.html` and `404/index.html` (Error Page)

Deploy this directory to any static hosting provider (e.g. Cloudflare Pages, AWS S3 / CloudFront, GitHub Pages, Netlify, or Azure Static Web Apps) with **zero Node.js server required**.
