import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type LogoVariant = 'horizontal' | 'stacked' | 'icon';
export type LogoTheme = 'light' | 'dark';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    @if (variant() === 'horizontal') {
      <div class="logo-horizontal" [class.logo-horizontal--dark]="theme() === 'dark'">
        <div class="logo-horizontal__icon">
          <img
            ngSrc="/brand/logo-icon-transparent.png"
            width="1071"
            height="951"
            alt="Kineth Supermarket icon"
            [priority]="priority()"
            class="logo-horizontal__img"
          />
        </div>
        <div class="logo-horizontal__text">
          <span class="logo-horizontal__brand">KINETH</span>
          <span class="logo-horizontal__descriptor">SUPERMARKET</span>
        </div>
      </div>
    } @else if (variant() === 'stacked') {
      <div class="logo-stacked" [class.logo-stacked--dark]="theme() === 'dark'">
        <img
          [ngSrc]="theme() === 'dark' ? '/brand/logo-full-on-dark.png' : '/brand/logo-full-transparent.png'"
          width="1396"
          height="1061"
          alt="Kineth Supermarket logo"
          [priority]="priority()"
          class="logo-stacked__img"
        />
      </div>
    } @else {
      <div class="logo-icon" [class.logo-icon--dark]="theme() === 'dark'">
        <img
          ngSrc="/brand/logo-icon-transparent.png"
          width="1071"
          height="951"
          alt="Kineth Supermarket icon"
          [priority]="priority()"
          class="logo-icon__img"
        />
      </div>
    }
  `,
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  readonly variant = input<LogoVariant>('horizontal');
  readonly theme = input<LogoTheme>('light');
  readonly priority = input<boolean>(false);
}
