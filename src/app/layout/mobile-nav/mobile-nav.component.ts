import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../shared/models/site.models';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (isOpen) {
      <div
        class="mobile-nav-backdrop"
        (click)="closeNav()"
        aria-hidden="true"
      ></div>
      <div
        #navDrawer
        id="mobile-navigation-drawer"
        class="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div class="mobile-nav-drawer__header">
          <span class="mobile-nav-drawer__brand">Navigation</span>
          <button
            #closeButton
            type="button"
            class="mobile-nav-drawer__close-btn"
            aria-label="Close navigation menu"
            (click)="closeNav()"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav class="mobile-nav-drawer__nav" aria-label="Mobile Navigation">
          <ul class="mobile-nav-drawer__list">
            @for (item of items; track item.route; let first = $first) {
              <li class="mobile-nav-drawer__item">
                <a
                  #firstLink
                  [routerLink]="item.route"
                  routerLinkActive="active"
                  #mRla="routerLinkActive"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  [attr.aria-current]="mRla.isActive ? 'page' : null"
                  class="mobile-nav-drawer__link"
                  (click)="closeNav()"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>
    }
  `,
  styleUrl: './mobile-nav.component.scss'
})
export class MobileNavComponent implements AfterViewInit {
  @Input({ required: true }) isOpen: boolean = false;
  @Input({ required: true }) items: NavItem[] = [];
  @Output() close = new EventEmitter<void>();

  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.closeNav();
    }
  }

  ngAfterViewInit(): void {
    if (this.isOpen && this.closeButton) {
      this.closeButton.nativeElement.focus();
    }
  }

  public closeNav(): void {
    this.close.emit();
  }
}
