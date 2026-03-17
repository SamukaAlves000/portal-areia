import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { News } from '../../models/site.models';
import { NewsCardComponent } from '../../shared/components/news-card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule, SectionComponent, NewsCardComponent, MatIconModule],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Notícias e Eventos</h1>
        <p class="text-xl text-white/70 max-w-2xl font-light animate-fade-in delay-200">Acompanhe as ações, projetos e novidades da AREIA e do setor.</p>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section>
      @if (loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (i of [1,2,3,4,5,6]; track i) {
            <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 h-[450px] flex flex-col">
              <div class="h-56 skeleton"></div>
              <div class="p-8 space-y-4">
                <div class="h-8 w-3/4 skeleton rounded"></div>
                <div class="h-4 w-full skeleton rounded"></div>
                <div class="h-4 w-full skeleton rounded"></div>
                <div class="h-4 w-1/2 skeleton rounded"></div>
              </div>
            </div>
          }
        </div>
      } @else if (news().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (item of news(); track item.id; let i = $index) {
            <div class="stagger-item" [style.animation-delay]="(i * 100) + 'ms'" [class.visible]="true">
              <app-news-card [news]="item"></app-news-card>
            </div>
          }
        </div>
      } @else {
        <div class="py-32 text-center">
          <div class="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <mat-icon class="!text-5xl">article</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-2">Nenhuma notícia encontrada</h3>
          <p class="text-gray-500">Fique atento, em breve teremos novidades.</p>
        </div>
      }
    </app-section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .delay-200 { animation-delay: 0.2s; }
    
    .stagger-item {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeIn 0.6s ease-out forwards;
    }
  `]
})
export class NoticiasComponent implements OnInit {
  private dataService = inject(DataService);
  private seoService = inject(SeoService);

  news = signal<News[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.seoService.updateMeta('Notícias', 'Fique por dentro das novidades e eventos da AREIA.');
    this.dataService.getNews().subscribe(data => {
      this.news.set(data);
      this.loading.set(false);
    });
  }
}
