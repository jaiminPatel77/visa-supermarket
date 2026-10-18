import {
  Component,
  Input,
  OnInit,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  computed
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StatItem } from '../../models/stats.models';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  template: `
    <div class="stat-counter" [class.stat-counter--placeholder]="item.isPlaceholder">
      <div class="stat-counter__value-wrapper">
        <span class="stat-counter__prefix">{{ item.prefix || '' }}</span>
        <span class="stat-counter__value">{{ displayValue() }}</span>
        <span class="stat-counter__suffix">{{ item.suffix || '' }}</span>
      </div>
      <div class="stat-counter__label">{{ item.label }}</div>
    </div>
  `,
  styleUrl: './stat-counter.component.scss'
})
export class StatCounterComponent implements OnInit {
  @Input({ required: true }) item!: StatItem;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);

  protected readonly displayValue = signal<number>(0);
  private hasAnimated = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayValue.set(this.item.value);
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.displayValue.set(this.item.value);
      return;
    }

    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.displayValue.set(this.item.value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.runCountUp();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(this.elementRef.nativeElement);
  }

  private runCountUp(): void {
    const target = this.item.value;
    const durationMs = 450;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Gentle easeOutQuad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.round(easedProgress * target);

      this.displayValue.set(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.displayValue.set(target);
      }
    };

    requestAnimationFrame(step);
  }
}
