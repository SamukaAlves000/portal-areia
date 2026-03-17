import { Component, input, signal, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metric-card',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
      <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <mat-icon class="!text-3xl">{{ icon() }}</mat-icon>
      </div>
      <h3 class="text-4xl font-bold text-primary mb-2">
        {{ displayValue() | number }}<span class="text-lg font-medium ml-1">{{ unit() }}</span>
      </h3>
      <p class="text-gray-500 uppercase tracking-wider text-sm font-semibold">{{ label() }}</p>
    </div>
  `
})
export class MetricCardComponent implements AfterViewInit, OnDestroy {
  label = input.required<string>();
  value = input.required<number>();
  unit = input<string>('');
  icon = input.required<string>();

  displayValue = signal(0);
  private elementRef = inject(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.animateCounter();
        this.observer?.disconnect();
      }
    }, { threshold: 0.1 });

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private animateCounter() {
    const start = 0;
    const end = this.value();
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      this.displayValue.set(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}
