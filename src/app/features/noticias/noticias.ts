import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { News } from '../../models/site.models';
import { NewsCardComponent } from '../../shared/components/news-card';
import { MatIconModule } from '@angular/material/icon';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { db, collectionData } from '../../firebase.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, SectionComponent, NewsCardComponent, MatIconModule],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Notícias e Eventos</h1>
        <p class="text-xl text-white/70 max-w-3xl font-light animate-fade-in delay-200">
          Acompanhe as ações da AREIA e as principais informações do setor ambiental do agronegócio.
        </p>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section>
      <div class="max-w-4xl mb-16">
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Este espaço reúne atualizações institucionais, ações operacionais, projetos ambientais e conteúdos relevantes sobre logística reversa, sustentabilidade e legislação aplicada ao agronegócio.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed">
          A AREIA também acompanha e compartilha informações de fontes confiáveis do setor, fortalecendo o acesso ao conhecimento técnico e às boas práticas ambientais.
        </p>
      </div>

      <div class="mb-20">
        <div class="flex items-center gap-3 mb-12">
          <span class="text-3xl">🌱</span>
          <h2 class="text-3xl font-bold text-primary">Notícias da AREIA</h2>
        </div>

        @if (loading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (i of [1,2,3]; track i) {
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
        }
      </div>

      <div class="mb-20">
        <div class="flex items-center gap-3 mb-8">
          <span class="text-3xl">🌍</span>
          <h2 class="text-3xl font-bold text-primary">Conteúdos do Setor Agroambiental</h2>
        </div>
        <p class="text-gray-600 mb-12 max-w-3xl">
          A AREIA também disponibiliza conteúdos relevantes de instituições e organizações reconhecidas no setor, contribuindo para a disseminação de informações atualizadas sobre sustentabilidade no agronegócio.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Item 1: inpEV -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <span class="text-2xl">♻️</span>
              <span class="text-xs font-bold text-primary/40 uppercase tracking-widest">Fonte: inpEV</span>
            </div>
            <h3 class="text-xl font-bold text-primary mb-4">Logística reversa no Brasil é referência mundial</h3>
            <p class="text-gray-600 text-sm mb-8 leading-relaxed">
              O sistema brasileiro de destinação de embalagens vazias de agrotóxicos é considerado um dos mais eficientes do mundo, baseado na responsabilidade compartilhada entre todos os atores da cadeia produtiva.
            </p>
            <a href="https://www.inpev.org.br" target="_blank" class="inline-flex items-center text-primary font-bold text-xs tracking-widest hover:gap-2 transition-all">
              VISITAR SITE <mat-icon class="!text-sm ml-1">open_in_new</mat-icon>
            </a>
          </div>

          <!-- Item 2: Embrapa -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <span class="text-2xl">🌱</span>
              <span class="text-xs font-bold text-primary/40 uppercase tracking-widest">Fonte: Embrapa</span>
            </div>
            <h3 class="text-xl font-bold text-primary mb-4">Boas práticas no uso de defensivos agrícolas</h3>
            <p class="text-gray-600 text-sm mb-8 leading-relaxed">
              Conteúdos técnicos sobre uso correto, armazenamento e manejo seguro de insumos agrícolas, com foco na sustentabilidade e produtividade.
            </p>
            <a href="https://www.embrapa.br" target="_blank" class="inline-flex items-center text-primary font-bold text-xs tracking-widest hover:gap-2 transition-all">
              VISITAR SITE <mat-icon class="!text-sm ml-1">open_in_new</mat-icon>
            </a>
          </div>

          <!-- Item 3: MAPA -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <span class="text-2xl">⚖️</span>
              <span class="text-xs font-bold text-primary/40 uppercase tracking-widest">Fonte: Ministério da Agricultura</span>
            </div>
            <h3 class="text-xl font-bold text-primary mb-4">Legislação e normas ambientais do agronegócio</h3>
            <p class="text-gray-600 text-sm mb-8 leading-relaxed">
              Atualizações sobre legislação, regulamentações e políticas públicas relacionadas ao setor agrícola e ambiental.
            </p>
            <a href="https://www.gov.br/agricultura" target="_blank" class="inline-flex items-center text-primary font-bold text-xs tracking-widest hover:gap-2 transition-all">
              VISITAR SITE <mat-icon class="!text-sm ml-1">open_in_new</mat-icon>
            </a>
          </div>

          <!-- Item 4: ADAPEC -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <span class="text-2xl">🛡️</span>
              <span class="text-xs font-bold text-primary/40 uppercase tracking-widest">Fonte: ADAPEC</span>
            </div>
            <h3 class="text-xl font-bold text-primary mb-4">Orientações sobre segurança no uso de insumos agrícolas</h3>
            <p class="text-gray-600 text-sm mb-8 leading-relaxed">
              Informações sobre fiscalização, boas práticas e cumprimento das normas sanitárias e ambientais.
            </p>
            <a href="https://www.adapec.to.gov.br" target="_blank" class="inline-flex items-center text-primary font-bold text-xs tracking-widest hover:gap-2 transition-all">
              VISITAR SITE <mat-icon class="!text-sm ml-1">open_in_new</mat-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="mb-20">
        <div class="bg-primary rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <span class="text-3xl">📢</span>
                <h2 class="text-3xl font-bold">Eventos e Participações Institucionais</h2>
              </div>
              <p class="text-white/70 mb-8 leading-relaxed">
                A AREIA participa ativamente de eventos e ações estratégicas do setor, fortalecendo a integração entre produtores, empresas e instituições, promovendo a sustentabilidade no agronegócio.
              </p>
              <ul class="space-y-4">
                <li class="flex items-center gap-3">
                  <mat-icon class="text-accent">check_circle</mat-icon>
                  <span>Feiras agropecuárias (ex: Agrotins)</span>
                </li>
                <li class="flex items-center gap-3">
                  <mat-icon class="text-accent">check_circle</mat-icon>
                  <span>Dia Nacional do Campo Limpo</span>
                </li>
                <li class="flex items-center gap-3">
                  <mat-icon class="text-accent">check_circle</mat-icon>
                  <span>Ações em parceria com ADAPEC e inpEV</span>
                </li>
                <li class="flex items-center gap-3">
                  <mat-icon class="text-accent">check_circle</mat-icon>
                  <span>Programas de educação ambiental</span>
                </li>
              </ul>
            </div>
            <div class="hidden lg:block relative">
              <div class="aspect-square bg-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl animate-pulse">
                <mat-icon class="!text-[120px] !w-[120px] !h-[120px] opacity-20">event</mat-icon>
              </div>
            </div>
          </div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32"></div>
        </div>
      </div>

      <div>
        <div class="text-center mb-12">
          <span class="text-4xl mb-4 block">🌱</span>
          <h2 class="text-3xl font-bold text-primary">Compromisso com a Informação e Sustentabilidade</h2>
          <p class="text-gray-500 mt-2">Ao reunir notícias próprias e conteúdos do setor, a AREIA busca:</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div class="bg-white p-6 rounded-2xl border border-black/5 text-center flex flex-col items-center group hover:border-accent transition-colors">
            <div class="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <mat-icon>visibility</mat-icon>
            </div>
            <p class="text-xs font-bold text-primary leading-tight">Promover transparência institucional</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-black/5 text-center flex flex-col items-center group hover:border-accent transition-colors">
            <div class="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <mat-icon>school</mat-icon>
            </div>
            <p class="text-xs font-bold text-primary leading-tight">Disseminar conhecimento técnico</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-black/5 text-center flex flex-col items-center group hover:border-accent transition-colors">
            <div class="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <mat-icon>nature_people</mat-icon>
            </div>
            <p class="text-xs font-bold text-primary leading-tight">Fortalecer a educação ambiental</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-black/5 text-center flex flex-col items-center group hover:border-accent transition-colors">
            <div class="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <mat-icon>gavel</mat-icon>
            </div>
            <p class="text-xs font-bold text-primary leading-tight">Apoiar o cumprimento da legislação</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-black/5 text-center flex flex-col items-center group hover:border-accent transition-colors">
            <div class="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <mat-icon>eco</mat-icon>
            </div>
            <p class="text-xs font-bold text-primary leading-tight">Incentivar práticas sustentáveis no campo</p>
          </div>
        </div>
      </div>
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
  private seoService = inject(SeoService);

  news = signal<News[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.seoService.updateMeta('Notícias', 'Fique por dentro das novidades e eventos da AREIA.');
    
    const newsCollection = collection(db, 'portal-areia/noticias/lista');
    const q = query(
      newsCollection, 
      where('published', '==', true)
    );

    (collectionData<News>(q, { idField: 'id' })).subscribe({
      next: (data) => {
        // Ordenação manual para evitar erro de índice composto no Firebase
        const sortedData = [...data].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.news.set(sortedData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading news:', err);
        this.loading.set(false);
      }
    });
  }
}
