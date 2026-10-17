import {
  Component,
  Input,
  signal,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FaqItem } from '../../models/faq.models';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  template: `
    <div class="faq-accordion" role="presentation">
      @for (item of items; track item.id; let idx = $index) {
        <div class="faq-item" [class.faq-item--expanded]="isOpen(item.id)">
          <h3 class="faq-item__heading">
            <button
              #accordionButton
              type="button"
              class="faq-item__trigger"
              [id]="'faq-btn-' + item.id"
              [attr.aria-expanded]="isOpen(item.id)"
              [attr.aria-controls]="'faq-panel-' + item.id"
              (click)="toggle(item.id)"
              (keydown)="onKeyDown($event, idx)"
            >
              <span class="faq-item__question">{{ item.question }}</span>
              <span class="faq-item__indicator" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>
          </h3>
          <div
            class="faq-item__panel"
            [id]="'faq-panel-' + item.id"
            role="region"
            [attr.aria-labelledby]="'faq-btn-' + item.id"
            [hidden]="!isOpen(item.id)"
          >
            <div class="faq-item__content">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './faq-accordion.component.scss'
})
export class FaqAccordionComponent {
  @Input({ required: true }) items: FaqItem[] = [];
  @ViewChildren('accordionButton') triggerButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  // Keep track of open item IDs using Angular signal
  protected readonly openItemIds = signal<Set<string>>(new Set());

  public isOpen(id: string): boolean {
    return this.openItemIds().has(id);
  }

  public toggle(id: string): void {
    this.openItemIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  public onKeyDown(event: KeyboardEvent, index: number): void {
    const buttons = this.triggerButtons.toArray();
    const count = buttons.length;
    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowDown':
        targetIndex = (index + 1) % count;
        break;
      case 'ArrowUp':
        targetIndex = (index - 1 + count) % count;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = count - 1;
        break;
      default:
        return;
    }

    if (targetIndex !== -1) {
      event.preventDefault();
      buttons[targetIndex].nativeElement.focus();
    }
  }
}
