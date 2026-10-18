import { Component, Input } from '@angular/core';
import { MilestoneItem } from '../../models/milestones.models';

@Component({
  selector: 'app-timeline',
  standalone: true,
  template: `
    <div class="timeline" role="list">
      @for (item of milestones; track item.id; let idx = $index) {
        <div class="timeline-item" role="listitem">
          <div class="timeline-item__axis" aria-hidden="true">
            <div class="timeline-item__node"></div>
            @if (idx < milestones.length - 1) {
              <div class="timeline-item__line"></div>
            }
          </div>
          <div class="timeline-item__content">
            <div class="timeline-item__header">
              <span class="timeline-item__period">{{ item.period }}</span>
            </div>
            <h3 class="timeline-item__title">{{ item.title }}</h3>
            <p class="timeline-item__description">{{ item.description }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @Input({ required: true }) milestones: MilestoneItem[] = [];
}
