import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE_COPY } from '../../data/site.data';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section not-found-section" aria-labelledby="not-found-heading">
      <div class="container not-found-container">
        <span class="eyebrow">Status 404</span>
        <h1 id="not-found-heading" class="not-found-title">{{ copy.heading }}</h1>
        <p class="lead not-found-message">{{ copy.message }}</p>
        <div class="not-found-actions">
          <a [routerLink]="copy.backHomeRoute" class="btn btn--primary">
            {{ copy.backHomeLabel }}
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  protected readonly copy = SITE_COPY.notFound;

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Page Not Found | Eurova Market Group',
      description: 'The requested page could not be located on the Eurova Market Group corporate portal.',
      path: '/404'
    });
  }
}
