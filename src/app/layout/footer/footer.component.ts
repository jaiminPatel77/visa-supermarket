import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION_ITEMS } from '../../data/navigation.data';
import { BRAND_DATA, SITE_COPY } from '../../data/site.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container site-footer__container">
        <!-- Top Row: Brand & One-line Description -->
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <span class="site-footer__logo-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="var(--color-primary)"/>
                <path d="M9 9H23V12.5H13.2V14.5H21.5V17.5H13.2V19.5H23.5V23H9V9Z" fill="#FFFFFF"/>
              </svg>
            </span>
            <span class="site-footer__brand-name">{{ brand.name }}</span>
          </div>
          <p class="site-footer__description">{{ copy.description }}</p>
        </div>

        <!-- Middle Row: The Four Permitted Nav Links -->
        <nav class="site-footer__nav" aria-label="Footer navigation">
          <ul class="site-footer__nav-list">
            @for (item of navItems; track item.route) {
              <li class="site-footer__nav-item">
                <a [routerLink]="item.route" class="site-footer__nav-link">
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Bottom Row: Copyright Notice -->
        <div class="site-footer__bottom">
          <p class="site-footer__copyright">
            &copy; {{ currentYear }} {{ brand.name }}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly brand = BRAND_DATA;
  protected readonly copy = SITE_COPY.footer;
  protected readonly navItems = NAVIGATION_ITEMS;
  protected readonly currentYear = new Date().getFullYear();
}
