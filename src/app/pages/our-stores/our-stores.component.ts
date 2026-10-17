import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../core/seo.service';
import { STORE_FORMATS } from '../../data/stores.data';
import { SITE_COPY } from '../../data/site.data';
import { IMAGES_MANIFEST } from '../../data/images.data';

@Component({
  selector: 'app-our-stores',
  standalone: true,
  template: `
    <!-- Header Hero -->
    <section class="stores-hero-section" aria-labelledby="stores-heading">
      <div class="container">
        <div class="stores-hero-section__content">
          <span class="eyebrow">Operating Formats</span>
          <h1 id="stores-heading" class="stores-hero-section__title">{{ copy.heading }}</h1>
          <p class="lead stores-hero-section__lead">{{ copy.intro }}</p>
        </div>
      </div>
    </section>

    <!-- Format Sections -->
    <div class="format-sections">
      @for (format of formats; track format.id; let idx = $index) {
        <section
          [id]="format.id"
          class="section format-section"
          [class.section--soft]="idx % 2 === 1"
          [attr.aria-labelledby]="'format-title-' + format.id"
        >
          <div class="container">
            <div
              class="format-layout"
              [class.format-layout--reversed]="idx % 2 === 1"
            >
              <!-- Content Column -->
              <div class="format-layout__content">
                <span class="eyebrow">Format 0{{ idx + 1 }}</span>
                <h2 [id]="'format-title-' + format.id" class="format-layout__title">
                  {{ format.title }}
                </h2>
                <p class="lead format-layout__description">
                  {{ format.fullDescription }}
                </p>

                <div class="format-features">
                  <h3 class="format-features__heading">Key Operational Characteristics</h3>
                  <ul class="format-features__list" role="list">
                    @for (feature of format.features; track feature) {
                      <li class="format-features__item">
                        <span class="format-features__check" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span class="format-features__text">{{ feature }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Editorial Image Grid (1 large + 2 supporting photos, no carousel) -->
              <div class="format-gallery" aria-label="Format architectural photography">
                <div class="format-gallery__primary">
                  <picture>
                    <source [srcset]="getImage(format.mainImageKey).src640" media="(max-width: 640px)" type="image/webp">
                    <source [srcset]="getImage(format.mainImageKey).src1024" media="(max-width: 1024px)" type="image/webp">
                    <img
                      [src]="getImage(format.mainImageKey).src"
                      [alt]="getImage(format.mainImageKey).alt"
                      [width]="getImage(format.mainImageKey).width"
                      [height]="getImage(format.mainImageKey).height"
                      loading="lazy"
                      decoding="async"
                      class="format-gallery__img format-gallery__img--primary"
                    />
                  </picture>
                </div>
                <div class="format-gallery__sub-grid">
                  <div class="format-gallery__secondary">
                    <picture>
                      <source [srcset]="getImage(format.subImage1Key).src640" media="(max-width: 640px)" type="image/webp">
                      <img
                        [src]="getImage(format.subImage1Key).src"
                        [alt]="getImage(format.subImage1Key).alt"
                        [width]="getImage(format.subImage1Key).width"
                        [height]="getImage(format.subImage1Key).height"
                        loading="lazy"
                        decoding="async"
                        class="format-gallery__img"
                      />
                    </picture>
                  </div>
                  <div class="format-gallery__secondary">
                    <picture>
                      <source [srcset]="getImage(format.subImage2Key).src640" media="(max-width: 640px)" type="image/webp">
                      <img
                        [src]="getImage(format.subImage2Key).src"
                        [alt]="getImage(format.subImage2Key).alt"
                        [width]="getImage(format.subImage2Key).width"
                        [height]="getImage(format.subImage2Key).height"
                        loading="lazy"
                        decoding="async"
                        class="format-gallery__img"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  `,
  styleUrl: './our-stores.component.scss'
})
export class OurStoresComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly seoService = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly copy = SITE_COPY.ourStores;
  protected readonly formats = STORE_FORMATS;
  protected readonly images = IMAGES_MANIFEST;

  private fragmentSub?: Subscription;

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Our Store Formats | Eurova Market Group',
      description:
        'Explore Eurova Market Group retail formats: community grocery stores, comprehensive supermarkets, and high-efficiency warehouse facilities.',
      path: '/our-stores'
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fragmentSub = this.route.fragment.subscribe((fragment) => {
        if (fragment) {
          // Defer until DOM layout is settled
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.fragmentSub) {
      this.fragmentSub.unsubscribe();
    }
  }

  protected getImage(key: string) {
    return this.images[key];
  }
}
