import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { SITE_COPY } from '../../data/site.data';
import { VALUES_DATA } from '../../data/values.data';
import { MILESTONES_DATA } from '../../data/milestones.data';
import { IMAGES_MANIFEST } from '../../data/images.data';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ValuesGridComponent } from '../../shared/components/values-grid/values-grid.component';
import { TimelineComponent } from '../../shared/components/timeline/timeline.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SectionHeaderComponent, ValuesGridComponent, TimelineComponent],
  template: `
    <!-- Hero Section -->
    <section class="about-hero-section" aria-labelledby="about-heading">
      <div class="container">
        <div class="about-hero-section__content">
          <span class="eyebrow">Corporate Overview</span>
          <h1 id="about-heading" class="about-hero-section__title">{{ copy.heading }}</h1>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="section story-section" aria-labelledby="story-heading">
      <div class="container">
        <div class="story-grid">
          <div class="story-grid__content">
            <span class="eyebrow">Our Background</span>
            <h2 id="story-heading" class="story-grid__title">{{ copy.ourStory.heading }}</h2>
            <p class="lead story-grid__text">{{ copy.ourStory.text }}</p>
            @if (copy.ourStory.isPlaceholder) {
              <div class="story-grid__placeholder-note">
                <span class="story-grid__badge">Registry Note</span>
                <span>Corporate archive history subject to formalized verification.</span>
              </div>
            }
          </div>
          <div class="story-grid__visual">
            <picture>
              <source [srcset]="storyImage.src640" media="(max-width: 640px)" type="image/webp">
              <source [srcset]="storyImage.src1024" media="(max-width: 1024px)" type="image/webp">
              <img
                [src]="storyImage.src"
                [alt]="storyImage.alt"
                [width]="storyImage.width"
                [height]="storyImage.height"
                loading="lazy"
                decoding="async"
                class="story-grid__img"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Mission (Two Columns) -->
    <section class="section section--soft vision-mission-section" aria-label="Vision and Mission">
      <div class="container">
        <div class="vision-mission-grid">
          <article class="statement-card">
            <span class="eyebrow">Long-Term Orientation</span>
            <h2 class="statement-card__title">{{ copy.vision.heading }}</h2>
            <p class="lead statement-card__text">{{ copy.vision.text }}</p>
          </article>
          <article class="statement-card">
            <span class="eyebrow">Operating Mandate</span>
            <h2 class="statement-card__title">{{ copy.mission.heading }}</h2>
            <p class="lead statement-card__text">{{ copy.mission.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Values Grid -->
    <section class="section values-section" aria-labelledby="values-heading">
      <div class="container">
        <app-section-header
          [eyebrow]="copy.values.eyebrow"
          [title]="copy.values.heading"
          align="left"
        />
        <app-values-grid [values]="values" />
      </div>
    </section>

    <!-- Milestones Timeline -->
    <section class="section section--soft milestones-section" aria-labelledby="milestones-heading">
      <div class="container">
        <app-section-header
          [eyebrow]="copy.milestones.eyebrow"
          [title]="copy.milestones.heading"
          align="center"
        />
        <app-timeline [milestones]="milestones" />
      </div>
    </section>
  `,
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly copy = SITE_COPY.aboutUs;
  protected readonly values = VALUES_DATA;
  protected readonly milestones = MILESTONES_DATA;
  protected readonly storyImage = IMAGES_MANIFEST['about-hero-overview'];

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'About Eurova Market Group',
      description:
        'Learn about Eurova Market Group, our corporate mission, values, operational principles, and strategic development across European markets.',
      path: '/about-us'
    });
  }
}
