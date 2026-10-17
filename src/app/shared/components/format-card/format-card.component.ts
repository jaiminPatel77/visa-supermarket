import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreFormat } from '../../models/stores.models';
import { IMAGES_MANIFEST } from '../../../data/images.data';

@Component({
  selector: 'app-format-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="format-card">
      <a [routerLink]="['/our-stores']" [fragment]="format.id" class="format-card__link">
        <div class="format-card__image-container">
          <picture>
            <source [srcset]="image.src640" media="(max-width: 640px)" type="image/webp">
            <source [srcset]="image.src1024" media="(max-width: 1024px)" type="image/webp">
            <img
              [src]="image.src"
              [alt]="image.alt"
              [width]="image.width"
              [height]="image.height"
              loading="lazy"
              decoding="async"
              class="format-card__image"
            />
          </picture>
        </div>
        <div class="format-card__content">
          <div class="format-card__header">
            <h3 class="format-card__title">{{ format.title }}</h3>
            <span class="format-card__arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
          <p class="format-card__description">{{ format.shortDescription }}</p>
        </div>
      </a>
    </article>
  `,
  styleUrl: './format-card.component.scss'
})
export class FormatCardComponent {
  @Input({ required: true }) format!: StoreFormat;

  protected get image() {
    return IMAGES_MANIFEST[this.format.mainImageKey];
  }
}
