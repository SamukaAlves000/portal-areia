import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <section class="relative h-[85vh] flex items-center overflow-hidden bg-primary text-white">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0 scale-110 animate-parallax">
        <img [src]="backgroundImage()" class="w-full h-full object-cover opacity-30" alt="Hero Background" referrerpolicy="no-referrer">
        <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
      </div>

      <div class="container relative z-10">
        <div class="max-w-3xl">
          <div class="overflow-hidden mb-4">
            <span class="inline-block text-accent font-bold tracking-widest uppercase text-sm animate-slide-up">
              Sustentabilidade & Tecnologia
            </span>
          </div>
          
          <h1 class="text-5xl md:text-8xl font-bold mb-6 leading-[1.1] tracking-tight animate-fade-in-up">
            {{ title() }}
          </h1>
          
          <p class="text-xl md:text-2xl mb-10 text-white/80 font-light max-w-xl animate-fade-in-up delay-200">
            {{ subtitle() }}
          </p>
          
          <div class="flex flex-wrap gap-4 animate-fade-in-up delay-400">
            <button mat-flat-button class="!px-10 !py-7 !text-lg !bg-primary-light !text-white !rounded-full hover:!scale-105 transition-transform" (click)="primaryAction.emit()">
              {{ primaryLabel() }}
              <mat-icon class="ml-2">arrow_forward</mat-icon>
            </button>
            <button mat-stroked-button class="!px-10 !py-7 !text-lg !border-white/30 !text-white !rounded-full hover:!bg-white/10 transition-all" (click)="secondaryAction.emit()">
              {{ secondaryLabel() }}
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <mat-icon>expand_more</mat-icon>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    @keyframes parallax {
      from { transform: scale(1.1) translateY(0); }
      to { transform: scale(1.1) translateY(-20px); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      opacity: 0;
    }
    .animate-slide-up {
      animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .animate-parallax {
      animation: parallax 10s ease-in-out infinite alternate;
    }
    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
  `]
})
export class HeroComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  backgroundImage = input<string>('https://i.ibb.co/4wZ2c1Sz/Gemini-Generated-Image-tszgtttszgtttszg.png');
  primaryLabel = input<string>('Saiba Mais');
  secondaryLabel = input<string>('Contato');
  
  primaryAction = output<void>();
  secondaryAction = output<void>();
}
