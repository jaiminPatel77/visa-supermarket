import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE_COPY } from '../../data/site.data';
import { STORE_FORMATS } from '../../data/stores.data';
import { STATS_DATA } from '../../data/stats.data';
import { FAQ_DATA } from '../../data/faq.data';
import { IMAGES_MANIFEST } from '../../data/images.data';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { StatCounterComponent } from '../../shared/components/stat-counter/stat-counter.component';
import { FormatCardComponent } from '../../shared/components/format-card/format-card.component';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SectionHeaderComponent,
    StatCounterComponent,
    FormatCardComponent,
    FaqAccordionComponent
  ],
  template: `
    <!-- 1. Hero Section -->
    <section class="hero-section" aria-labelledby="hero-heading">
      <div class="container hero-section__container">
        <div class="hero-section__content">
          <span class="eyebrow">{{ copy.hero.eyebrow }}</span>
          <h1 id="hero-heading" class="hero-section__title">{{ copy.hero.heading }}</h1>
          <p class="lead hero-section__text">{{ copy.hero.text }}</p>
          <div class="hero-section__actions">
            <a [routerLink]="copy.hero.exploreStoresRoute" class="btn btn--primary">
              {{ copy.hero.exploreStoresLabel }}
            </a>
            <a [routerLink]="copy.hero.aboutGroupRoute" class="text-link">
              {{ copy.hero.aboutGroupLabel }}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div class="hero-section__visual">
          <picture>
            <source [srcset]="heroImage.src640" media="(max-width: 640px)" type="image/webp">
            <source [srcset]="heroImage.src1024" media="(max-width: 1024px)" type="image/webp">
            <source [srcset]="heroImage.src1600" media="(min-width: 1025px)" type="image/webp">
            <img
              [src]="heroImage.src"
              [alt]="heroImage.alt"
              [width]="heroImage.width"
              [height]="heroImage.height"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="hero-section__img"
            />
          </picture>
        </div>
      </div>
    </section>

    <!-- 2. Intro Section (Two Columns) -->
    <section class="section section--soft intro-section" aria-labelledby="intro-heading">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-grid__primary">
            <span class="eyebrow">{{ copy.intro.eyebrow }}</span>
            <h2 id="intro-heading" class="intro-grid__heading">{{ copy.intro.heading }}</h2>
          </div>
          <div class="intro-grid__secondary">
            <p class="lead intro-grid__lead">{{ copy.intro.lead }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Key Statistics -->
    <section class="section stats-section" aria-label="Key Group Statistics">
      <div class="container">
        <div class="stats-grid">
          @for (stat of stats; track stat.id) {
            <app-stat-counter [item]="stat" />
          }
        </div>
      </div>
    </section>

    <!-- 4. Formats Section -->
    <section class="section section--soft formats-section" aria-labelledby="formats-heading">
      <div class="container">
        <app-section-header
          [eyebrow]="copy.formats.eyebrow"
          [title]="copy.formats.heading"
          [lead]="copy.formats.lead"
        />
        <div class="formats-grid">
          @for (format of formats; track format.id) {
            <app-format-card [format]="format" />
          }
        </div>
      </div>
    </section>

    <!-- 5. Wide Brand Photo Section with Short Corporate Message -->
    <section class="section wide-brand-section" aria-labelledby="brand-message-heading">
      <div class="container">
        <div class="brand-banner">
          <div class="brand-banner__image-wrapper">
            <picture>
              <source [srcset]="brandImage.src640" media="(max-width: 640px)" type="image/webp">
              <source [srcset]="brandImage.src1024" media="(max-width: 1024px)" type="image/webp">
              <source [srcset]="brandImage.src1600" media="(min-width: 1025px)" type="image/webp">
              <img
                [src]="brandImage.src"
                [alt]="brandImage.alt"
                [width]="brandImage.width"
                [height]="brandImage.height"
                loading="lazy"
                decoding="async"
                class="brand-banner__img"
              />
            </picture>
          </div>
          <div class="brand-banner__content">
            <h2 id="brand-message-heading" class="brand-banner__heading">
              {{ copy.brandMessage.heading }}
            </h2>
            <p class="brand-banner__text">
              {{ copy.brandMessage.text }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FAQ Teaser -->
    <section class="section section--soft faq-teaser-section" aria-labelledby="faq-teaser-heading">
      <div class="container faq-teaser-container">
        <div class="faq-teaser-header">
          <div>
            <span class="eyebrow">{{ copy.faqTeaser.eyebrow }}</span>
            <h2 id="faq-teaser-heading" class="faq-teaser-heading">{{ copy.faqTeaser.heading }}</h2>
          </div>
          <a [routerLink]="copy.faqTeaser.viewAllRoute" class="btn btn--secondary">
            {{ copy.faqTeaser.viewAllLabel }}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div class="faq-teaser-accordion">
          <app-faq-accordion [items]="teaserFaqs" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly copy = SITE_COPY.home;
  protected readonly formats = STORE_FORMATS;
  protected readonly stats = STATS_DATA;
  protected readonly heroImage = IMAGES_MANIFEST['hero-retail-lifestyle'];
  protected readonly brandImage = IMAGES_MANIFEST['group-intro-overview'];

  // Home FAQ teaser shows 3 FAQs (store types, online store, where it operates)
  protected readonly teaserFaqs = FAQ_DATA.filter((item) => item.isHomeTeaser);

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Kineth Supermarket | European Supermarket Group',
      description:
        'Kineth Supermarket is an established European Supermarket Group operating modern grocery stores, supermarkets, and warehouse-format stores across selected European markets.',
      path: '/'
    });
  }
}
