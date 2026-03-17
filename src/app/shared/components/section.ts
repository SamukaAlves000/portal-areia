import { Component, input, ElementRef, inject, AfterViewInit, OnDestroy, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-section',
  imports: [CommonModule],
  template: `
    <section [class]="'section-padding transition-all duration-1000 ' + (bgClass() || '') + (isVisible() ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-10')">
      <div class="container">
        @if (title()) {
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{{ title() }}</h2>
            @if (subtitle()) {
              <p class="text-gray-500 max-w-2xl mx-auto text-lg">{{ subtitle() }}</p>
            }
            <div class="w-16 h-1.5 bg-primary-light mx-auto mt-8 rounded-full"></div>
          </div>
        }
        <ng-content></ng-content>
      </div>
    </section>
  `
})
export class SectionComponent implements AfterViewInit, OnDestroy {
  title = input<string>();
  subtitle = input<string>();
  bgClass = input<string>();

  isVisible = signal(false);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      }, { threshold: 0.1 });

      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
