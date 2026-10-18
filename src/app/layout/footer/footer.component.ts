import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION_ITEMS } from '../../data/navigation.data';
import { BRAND_DATA, SITE_COPY } from '../../data/site.data';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  template: `
    <footer class="site-footer">
      <div class="container site-footer__container">
        <!-- Top Row: Full Stacked Brand Logo & One-line Description -->
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <app-logo variant="stacked" theme="dark" />
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
            &copy; {{ currentYear }} {{ brand.brandFull }}.
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
