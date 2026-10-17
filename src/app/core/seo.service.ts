import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG } from './site.config';

export interface SeoMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  public updatePageSeo(seo: SeoMetadata): void {
    const fullTitle = seo.title;
    this.titleService.setTitle(fullTitle);

    const canonicalUrl = `${SITE_CONFIG.siteUrl}${seo.path}`;
    const ogImageUrl = `${SITE_CONFIG.siteUrl}${seo.ogImage || SITE_CONFIG.defaultOgImage}`;

    // Standard meta tags
    this.metaService.updateTag({ name: 'description', content: seo.description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: seo.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: ogImageUrl });
    this.metaService.updateTag({ property: 'og:site_name', content: SITE_CONFIG.brandLegalName });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: seo.description });
    this.metaService.updateTag({ name: 'twitter:image', content: ogImageUrl });

    // Canonical link tag
    this.setCanonicalLink(canonicalUrl);
  }

  private setCanonicalLink(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
