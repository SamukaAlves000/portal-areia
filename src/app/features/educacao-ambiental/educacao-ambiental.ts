import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-educacao-ambiental',
  imports: [CommonModule, SectionComponent, MatIconModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Educação Ambiental</h1>
        <p class="text-xl text-white/80 max-w-2xl">Formando cidadãos conscientes para um futuro sustentável no campo.</p>
      </div>
    </div>

    <app-section title="Nossos Projetos" subtitle="Acreditamos que a educação é a base para a transformação ambiental.">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 group">
          <div class="h-64 overflow-hidden">
            <img src="https://picsum.photos/seed/edu1/800/600" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Projeto Escolas" referrerpolicy="no-referrer">
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-4">Pequeno Guardião do Campo</h3>
            <p class="text-gray-600 mb-6">Levamos palestras e atividades lúdicas para escolas rurais e urbanas, ensinando sobre o ciclo da logística reversa e a preservação das águas e do solo.</p>
            <div class="flex items-center gap-2 text-primary-light font-bold">
              <mat-icon>groups</mat-icon>
              <span>+2.000 alunos atendidos anualmente</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 group">
          <div class="h-64 overflow-hidden">
            <img src="https://picsum.photos/seed/edu2/800/600" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dia do Campo Limpo" referrerpolicy="no-referrer">
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-4">Dia Nacional do Campo Limpo</h3>
            <p class="text-gray-600 mb-6">Celebrado anualmente em 18 de agosto, realizamos um grande evento de "Portas Abertas" na Central, recebendo a comunidade para conhecer nossos processos.</p>
            <div class="flex items-center gap-2 text-primary-light font-bold">
              <mat-icon>event</mat-icon>
              <span>Evento anual de conscientização</span>
            </div>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-primary text-white" title="Campanhas Permanentes">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="text-center">
          <mat-icon class="!text-5xl mb-4 text-accent">eco</mat-icon>
          <h4 class="text-xl font-bold mb-2">Preservação de Nascentes</h4>
          <p class="text-white/70 text-sm">Orientamos sobre o descarte correto para evitar a contaminação de lençóis freáticos.</p>
        </div>
        <div class="text-center">
          <mat-icon class="!text-5xl mb-4 text-accent">health_and_safety</mat-icon>
          <h4 class="text-xl font-bold mb-2">Saúde do Trabalhador</h4>
          <p class="text-white/70 text-sm">Foco no uso correto de EPIs e manuseio seguro de produtos químicos.</p>
        </div>
        <div class="text-center">
          <mat-icon class="!text-5xl mb-4 text-accent">auto_awesome</mat-icon>
          <h4 class="text-xl font-bold mb-2">Solo Produtivo</h4>
          <p class="text-white/70 text-sm">Técnicas de manejo que mantêm a fertilidade e a vida no solo agrícola.</p>
        </div>
      </div>
    </app-section>
  `
})
export class EducacaoAmbientalComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMeta('Educação Ambiental', 'Conheça nossos projetos educativos e campanhas de conscientização.');
  }
}
