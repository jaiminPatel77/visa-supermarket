import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <header class="section-header" [class.section-header--centered]="align === 'center'">
      @if (eyebrow) {
        <span class="eyebrow">{{ eyebrow }}</span>
      }
      <h2 class="section-header__title">{{ title }}</h2>
      @if (lead) {
        <p class="lead section-header__lead" [class.text-on-tint]="onTint">{{ lead }}</p>
      }
    </header>
  `,
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input() lead?: string;
  @Input() align: 'left' | 'center' = 'left';
  @Input() onTint: boolean = false;
}
