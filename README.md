# Eurova Market Group — Corporate Information Portal

A production-quality, **information-only** corporate website for **Eurova Market Group**, an established European retail group operating grocery stores, supermarkets, and warehouse formats across European Union member states.

The site is built with Angular 20 (standalone architecture, strict TypeScript, SCSS design tokens, and static SSG prerendering) and delivers a premium, spacious European corporate aesthetic.

---

## 1. Compliance, Privacy & Confidentiality Rules

In accordance with strict corporate directives:
- **Zero Geographic Leakage**: Store locations, individual branch addresses, cities, streets, maps, coordinates, and store locators are strictly confidential and intentionally omitted. The sole authorized geographic statement is the official FAQ answer: *"Eurova Market Group operates across selected European markets. Individual store locations and addresses are not published on this website."*
- **No E-Commerce**: No cart, checkout, prices, categories, product catalogues, or commercial CTAs.
- **Intentional Omissions**: Per client decision, pages and links for **Contact, Privacy Policy, Terms, Legal Notice, Careers, Locations, Departments, and Products** were intentionally omitted.
  > **Legal Advisory Before Launch**: While omitted per client specifications for this corporate overview phase, European Union directives (such as the EU eCommerce Directive / corporate transparency laws) require registered commercial entities to provide company registration details and legal notices prior to public general dissemination. These requirements should be reviewed by legal counsel before public deployment.
- **Zero Third-Party Runtime Requests**: No external analytics, trackers, pixels, cookies, CDN scripts, or remote fonts. Fonts are self-hosted using `@fontsource-variable/inter`.
- **Neutral Photography**: All imagery depicts modern, neutral European retail interiors and logistics architecture. All readable street names, signs, license plates, and brand logos are absent, and 100% of EXIF/GPS metadata is stripped.

---

## 2. Configuration & Customization Guide

All corporate copy, numbers, and settings reside in typed data files under `src/app/data/` and `src/app/core/`. Templates contain zero hardcoded copy.

### 2.1 Updating Brand Name & Tagline
- Open `src/app/core/site.config.ts`:
  ```typescript
  export const SITE_CONFIG = {
    brandName: 'EUROVA MARKET GROUP',
    brandLegalName: 'Eurova Market Group',
    tagline: 'Everyday retail. Built around people.',
    ...
  };
  ```
- Open `src/app/data/site.data.ts`:
  ```typescript
  export const BRAND_DATA: BrandData = {
    name: 'EUROVA MARKET GROUP',
    tagline: 'Everyday retail. Built around people.',
    copyrightYear: 2026,
    isPlaceholder: true // set to false upon confirming final brand guidelines
  };
  ```

### 2.2 Updating Production Site URL
When deploying to your production domain (e.g. `https://www.eurova-market.eu`):
1. Update `siteUrl` in `src/app/core/site.config.ts`.
2. Update the domain in `public/robots.txt` (`Sitemap: https://your-domain.eu/sitemap.xml`).
3. Update `<loc>` tags in `public/sitemap.xml`.
4. Update the JSON-LD Organization schema in `src/index.html`.

### 2.3 Updating Statistics
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

### 2.4 Updating Copy & Sections
- **Store Formats**: `src/app/data/stores.data.ts` (descriptions and feature points for Grocery Store, Supermarket, and Warehouse).
- **Corporate Values**: `src/app/data/values.data.ts` (Reliability, Customers First, Responsible Growth, Operational Excellence).
- **Milestones Timeline**: `src/app/data/milestones.data.ts` (Phase years and descriptions).
- **FAQ Questions & Answers**: `src/app/data/faq.data.ts`.

### 2.5 Updating Images
All images are managed centrally via `src/app/data/images.data.ts`.
To replace an image:
1. Place source photos in a folder or update URLs in `scripts/generate-images.mjs`.
2. Run `npm run generate:images` to strip EXIF/GPS and compile responsive WebP variants (640w, 1024w, 1600w) into `public/images/`.
3. Update entries and alt text in `src/app/data/images.data.ts` and `docs/image-credits.md`.

---

## 3. "Before Launch" Verification Checklist

Every placeholder in the application is tagged with `// TODO: PLACEHOLDER` and a typed boolean flag `isPlaceholder: true`. Before going live, verify the following:

- [ ] **Brand Identity**: Confirm formal legal name, wordmark SVG, and trade name in `src/app/core/site.config.ts` and `src/app/data/site.data.ts` (set `isPlaceholder: false`).
- [ ] **Production Domain**: Replace placeholder domain (`https://www.eurova-market.eu`) with live production URL in `site.config.ts`, `robots.txt`, `sitemap.xml`, and `index.html`.
- [ ] **Store Count Statistic**: Update verified retail store count in `src/app/data/stats.data.ts` (set `isPlaceholder: false`).
- [ ] **Years of Experience**: Update verified operating years in `src/app/data/stats.data.ts` (set `isPlaceholder: false`).
- [ ] **Group Chronology & Founding**: Replace placeholder phase markers (`Phase I (TODO: Year)`) in `src/app/data/milestones.data.ts` with confirmed corporate archive dates (set `isPlaceholder: false`).
- [ ] **Corporate Story**: Review the narrative in `src/app/data/site.data.ts` (`SITE_COPY.aboutUs.ourStory`) against company records.
- [ ] **EU Company Registration & Legal Assessment**: Have corporate legal counsel review whether company registration number, commercial register entry, and VAT identification need to be displayed for the entity's EU jurisdiction.
- [ ] **Automated Leak Verification**: Execute `npm run leak-check` to confirm zero confidential location references or unapproved URLs exist in the build.

---

## 4. Build & Deployment Commands

```bash
# Install dependencies
npm install

# Run dev server
npm start

# Pre-generate responsive WebP images & strip metadata
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

Deploy this folder to any static hosting provider (e.g. AWS S3 / CloudFront, Cloudflare Pages, GitHub Pages, Netlify, or Azure Static Web Apps) with **no Node.js server required**.
