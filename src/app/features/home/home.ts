import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero';
import { SectionComponent } from '../../shared/components/section';
import { MetricCardComponent } from '../../shared/components/metric-card';
import { NewsCardComponent } from '../../shared/components/news-card';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';
import { News, Metric } from '../../models/site.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { collection, query, where } from 'firebase/firestore';
import { db, collectionData } from '../../firebase.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    RouterModule, 
    HeroComponent, 
    SectionComponent, 
    MetricCardComponent, 
    NewsCardComponent,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <app-hero 
      title="Sustentabilidade no Campo"
      subtitle="Associação dos Recebedores de Insumos Agropecuários de Porto Nacional e Região."
      primaryLabel="Agendar Devolução"
      secondaryLabel="Conheça a AREIA"
      (primaryAction)="navigateTo('/agenda-recebimentos')"
      (secondaryAction)="navigateTo('/associacao')"
    ></app-hero>

    <!-- Sobre Resumo -->
    <app-section title="Nossa Atuação" subtitle="Promovemos a destinação correta de embalagens vazias de defensivos agrícolas, protegendo o meio ambiente e a saúde do produtor.">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-10 bg-white rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
          <div class="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-4xl">recycling</mat-icon>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-primary">Logística Reversa</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Gerenciamos o ciclo completo das embalagens, desde o recebimento até a destinação final ambientalmente correta.</p>
        </div>
        <div class="p-10 bg-white rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
          <div class="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-4xl">school</mat-icon>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-primary">Educação Ambiental</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Capacitamos produtores e comunidades sobre a importância da preservação e os procedimentos de segurança.</p>
        </div>
        <div class="p-10 bg-white rounded-3xl shadow-sm border border-black/5 text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
          <div class="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-4xl">verified</mat-icon>
          </div>
          <h3 class="text-2xl font-bold mb-4 text-primary">Conformidade Legal</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Garantimos que o produtor esteja em dia com a legislação ambiental, emitindo comprovantes oficiais de devolução.</p>
        </div>
      </div>
    </app-section>

    <!-- Embalômetro Resumo -->
    <app-section title="Embalômetro" subtitle="Acompanhe em tempo real os indicadores de sustentabilidade da nossa região." bgClass="bg-surface">
      <div class="flex flex-wrap justify-center gap-6 mb-12">
        @for (metric of metrics(); track metric.label; let i = $index) {
          <div class="stagger-item w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[300px]" [style.animation-delay]="(i * 100) + 'ms'" [class.visible]="true">
            <app-metric-card 
              [label]="metric.label" 
              [value]="metric.value" 
              [unit]="metric.unit" 
              [icon]="metric.icon"
              class="h-full block"
            ></app-metric-card>
          </div>
        }
        @if (metrics().length === 0) {
          @for (i of [1,2,3,4]; track i) {
            <div class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[300px] h-48 bg-white/50 rounded-3xl animate-pulse"></div>
          }
        }
      </div>
      <div class="text-center mt-16">
        <button mat-stroked-button color="primary" routerLink="/embalometro" class="!px-10 !py-7 !rounded-full !border-primary/20 hover:!bg-primary hover:!text-white transition-all">
          Ver Relatório Completo
        </button>
      </div>
    </app-section>

    <!-- Notícias Recentes -->
    <app-section title="Notícias e Eventos" subtitle="Fique por dentro das últimas ações e novidades da AREIA.">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        @for (item of news(); track item.id; let i = $index) {
          <div class="stagger-item" [style.animation-delay]="(i * 150) + 'ms'" [class.visible]="true">
            <app-news-card [news]="item"></app-news-card>
          </div>
        }
      </div>
      <div class="text-center mt-16">
        <button mat-flat-button class="!px-10 !py-7 !rounded-full !bg-primary !text-white hover:!bg-primary-light transition-all" routerLink="/noticias">
          Ver Todas as Notícias
        </button>
      </div>
    </app-section>

    <!-- CTA Final -->
    <section class="bg-primary py-32 text-white text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-light rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>
      <div class="container relative z-10">
        <h2 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Pronto para fazer sua parte?</h2>
        <p class="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">Agende agora mesmo a devolução de suas embalagens vazias e contribua para um campo mais limpo e sustentável.</p>
        <button mat-flat-button class="!px-12 !py-8 !text-xl !bg-accent !text-primary !rounded-full hover:!scale-105 transition-transform font-bold" routerLink="/agenda-recebimentos">
          AGENDAR AGORA
        </button>
      </div>
    </section>
  `,
  styles: [`
    .stagger-item {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeIn 0.6s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HomeComponent implements OnInit {
  private dataService = inject(DataService);
  private seoService = inject(SeoService);
  private router = inject(Router);

  news = signal<News[]>([]);
  metrics = signal<Metric[]>([]);

  ngOnInit() {
    this.seoService.updateMeta('Home', 'Website institucional da AREIA - Associação dos Recebedores de Insumos Agropecuários.');
    
    // Carregar notícias dinâmicas do Firestore
    const newsCollection = collection(db, 'portal-areia/noticias/lista');
    const q = query(newsCollection, where('published', '==', true));

    (collectionData<News>(q, { idField: 'id' })).subscribe({
      next: (data) => {
        // Ordenação manual para evitar erro de índice composto no Firebase
        const sortedData = [...data].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.news.set(sortedData.slice(0, 3));
      },
      error: (err) => {
        console.error('Error loading news for home:', err);
      }
    });

    this.dataService.getMetrics().subscribe(data => {
      this.metrics.set(data);
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
