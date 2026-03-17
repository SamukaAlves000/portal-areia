import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { News } from '../../models/site.models';

@Component({
  selector: 'app-news-card',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 flex flex-col h-full group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <div class="relative h-56 overflow-hidden">
        <img [src]="news().imageUrl" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" [alt]="news().title" referrerpolicy="no-referrer">
        <div class="absolute top-6 left-6 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          {{ news().date | date:'dd MMM, yyyy' }}
        </div>
      </div>
      <div class="p-8 flex flex-col flex-grow">
        <h3 class="text-2xl font-bold text-primary mb-4 line-clamp-2 leading-tight group-hover:text-primary-light transition-colors">{{ news().title }}</h3>
        <p class="text-gray-500 mb-8 line-clamp-3 text-sm leading-relaxed">{{ news().summary }}</p>
        <div class="mt-auto flex items-center justify-between">
          <a [routerLink]="['/noticias', news().id]" class="text-primary font-bold text-xs flex items-center tracking-widest group/link">
            LER MAIS
            <span class="material-icons text-sm ml-2 transition-transform group-hover/link:translate-x-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class NewsCardComponent {
  news = input.required<News>();
}
