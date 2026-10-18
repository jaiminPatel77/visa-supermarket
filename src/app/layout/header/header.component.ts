import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_ITEMS } from '../../data/navigation.data';
import { BRAND_DATA } from '../../data/site.data';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MobileNavComponent, LogoComponent],
  template: `
    <header class="site-header" [class.site-header--scrolled]="isScrolled()">
      <div class="container site-header__container">
        <!-- Brand Logo Lockup -->
        <a routerLink="/" class="site-header__brand" aria-label="Kineth Supermarket Homepage">
          <app-logo variant="horizontal" [priority]="true" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="site-header__nav" aria-label="Primary navigation">
          <ul class="site-header__nav-list">
            @for (item of navItems; track item.route) {
              <li class="site-header__nav-item">
                <a
                  [routerLink]="item.route"
                  routerLinkActive="active"
                  #rla="routerLinkActive"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  [attr.aria-current]="rla.isActive ? 'page' : null"
                  class="site-header__nav-link"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Mobile Menu Trigger -->
        <button
          #hamburgerBtn
          type="button"
          class="site-header__hamburger"
          [attr.aria-expanded]="isMobileNavOpen()"
          aria-controls="mobile-navigation-drawer"
          aria-label="Toggle navigation menu"
          (click)="toggleMobileNav()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Mobile Nav Drawer -->
      <app-mobile-nav
        [isOpen]="isMobileNavOpen()"
        [items]="navItems"
        (close)="onMobileNavClose()"
      />
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('hamburgerBtn') hamburgerBtn?: ElementRef<HTMLButtonElement>;

  protected readonly brand = BRAND_DATA;
  protected readonly navItems = NAVIGATION_ITEMS;
  protected readonly isScrolled = signal<boolean>(false);
  protected readonly isMobileNavOpen = signal<boolean>(false);

  private readonly platformId = inject(PLATFORM_ID);
  private scrollListener?: () => void;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const handleScroll = () => {
        this.isScrolled.set(window.scrollY > 12);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      this.scrollListener = () => window.removeEventListener('scroll', handleScroll);
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  public toggleMobileNav(): void {
    this.isMobileNavOpen.update((open) => !open);
  }

  public onMobileNavClose(): void {
    this.isMobileNavOpen.set(false);
    if (this.hamburgerBtn) {
      this.hamburgerBtn.nativeElement.focus();
    }
  }
}
