import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { SITE_COPY } from '../../data/site.data';
import { FAQ_DATA } from '../../data/faq.data';
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FaqAccordionComponent],
  template: `
    <section class="faq-page-section" aria-labelledby="faq-page-heading">
      <div class="container">
        <header class="faq-page-header">
          <span class="eyebrow">Corporate Inquiries</span>
          <h1 id="faq-page-heading" class="faq-page-header__title">{{ copy.heading }}</h1>
          <p class="lead faq-page-header__lead">{{ copy.intro }}</p>
        </header>

        <div class="faq-page-content">
          <app-faq-accordion [items]="faqs" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly copy = SITE_COPY.faq;
  protected readonly faqs = FAQ_DATA;

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Frequently Asked Questions | Eurova Market Group',
      description:
        'Answers to frequently asked questions about Eurova Market Group, including store formats, corporate structure, and operating standards.',
      path: '/faq'
    });
  }
}
