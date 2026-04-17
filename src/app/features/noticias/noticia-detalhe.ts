import { Component, inject, OnInit, signal, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SectionComponent } from '../../shared/components/section';
import { News } from '../../models/site.models';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo.service';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-noticia-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionComponent, MatIconModule],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <a routerLink="/noticias" class="inline-flex items-center text-accent font-bold text-xs tracking-widest mb-8 hover:gap-2 transition-all">
          <mat-icon class="!text-sm mr-2">arrow_back</mat-icon> VOLTAR PARA NOTÍCIAS
        </a>
        
        @if (loading()) {
          <div class="h-12 w-3/4 skeleton rounded mb-6"></div>
          <div class="h-6 w-1/4 skeleton rounded"></div>
        } @else if (news()) {
          <h1 class="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in">{{ news()?.title }}</h1>
          <div class="flex items-center gap-4 text-white/60 animate-fade-in delay-200">
             <span class="flex items-center gap-1"><mat-icon class="!text-sm">calendar_today</mat-icon> {{ news()?.date | date:'dd MMM, yyyy' }}</span>
          </div>
        }
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section>
      <div class="max-w-4xl mx-auto">
        @if (loading()) {
          <div class="aspect-video w-full skeleton rounded-3xl mb-12"></div>
          <div class="space-y-4">
            <div class="h-4 w-full skeleton rounded"></div>
            <div class="h-4 w-full skeleton rounded"></div>
            <div class="h-4 w-3/4 skeleton rounded"></div>
          </div>
        } @else if (news()) {
          <div class="mb-12 rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <img [src]="news()?.imageUrl" [alt]="news()?.title" class="w-full object-cover max-h-[500px]" referrerpolicy="no-referrer">
          </div>

          <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed animate-fade-in delay-200">
            <p class="text-xl font-medium text-primary mb-8">{{ news()?.summary }}</p>
            <div [innerHTML]="safeContent()" class="whitespace-pre-wrap"></div>
          </div>

          <div class="mt-16 pt-8 border-t border-black/5 flex justify-between items-center animate-fade-in delay-400">
             <a routerLink="/noticias" class="inline-flex items-center text-primary font-bold text-xs tracking-widest hover:gap-2 transition-all">
              <mat-icon class="!text-sm mr-2">arrow_back</mat-icon> VOLTAR
            </a>
            
            <div class="flex gap-4">
                <!-- Redes sociais fake para compor o layout -->
                <div class="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary/40 cursor-not-allowed">
                    <mat-icon class="!text-xl">share</mat-icon>
                </div>
            </div>
          </div>
        } @else {
          <div class="text-center py-20">
            <mat-icon class="text-6xl text-gray-300 mb-4">find_in_page</mat-icon>
            <h2 class="text-2xl font-bold text-primary mb-4">Notícia não encontrada</h2>
            <p class="text-gray-500 mb-8">A notícia que você está procurando não existe ou foi removida.</p>
            <a routerLink="/noticias" class="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-light transition-colors inline-block">
              Ver todas as notícias
            </a>
          </div>
        }
      </div>
    </app-section>
  `,
  styles: [`
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class NoticiaDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private seo = inject(SeoService);
  private sanitizer = inject(DomSanitizer);

  news = signal<News | undefined>(undefined);
  safeContent = signal<SafeHtml>('');
  loading = signal(true);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadNews(id);
      }
    });
  }

  private loadNews(id: string) {
    this.loading.set(true);
    const docRef = doc(this.firestore, `portal-areia/noticias/lista/${id}`);
    
    (docData(docRef, { idField: 'id' }) as Observable<News>).subscribe({
      next: (item) => {
        this.news.set(item);
        if (item) {
          this.safeContent.set(this.sanitizer.bypassSecurityTrustHtml(item.content));
          this.seo.generateTags({
            title: `${item.title} | AREIA`,
            description: item.summary,
            image: item.imageUrl
          });
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading news details:', err);
        this.loading.set(false);
      }
    });
  }
}
