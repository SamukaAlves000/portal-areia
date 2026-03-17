import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-central-recebimento',
  imports: [CommonModule, SectionComponent, MatIconModule, MatButtonModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Central de Recebimento</h1>
        <p class="text-xl text-white/80 max-w-2xl">Unidade Silvanópolis: Referência em logística reversa no Tocantins.</p>
      </div>
    </div>

    <app-section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
          <img src="https://picsum.photos/seed/central1/800/1000" alt="Central Silvanópolis" class="w-full h-full object-cover" referrerpolicy="no-referrer">
        </div>
        <div>
          <h2 class="text-3xl font-bold text-primary mb-6">Estrutura e Capacidade</h2>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Nossa central em Silvanópolis conta com uma infraestrutura moderna, projetada para receber, processar e armazenar temporariamente embalagens vazias de defensivos agrícolas com total segurança.
          </p>
          
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary">Localização Estratégica</h4>
                <p class="text-sm text-gray-500">Rodovia TO-050, KM 12 - Silvanópolis, TO. Fácil acesso para produtores de toda a região.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>schedule</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary">Horário de Funcionamento</h4>
                <p class="text-sm text-gray-500">Segunda a Sexta: 08:00 às 12:00 e 14:00 às 17:00.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>engineering</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary">Equipe Especializada</h4>
                <p class="text-sm text-gray-500">Técnicos treinados para orientar e conferir a tríplice lavagem.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-surface" title="Galeria da Unidade">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @for (i of [1,2,3,4]; track i) {
          <div class="aspect-square rounded-2xl overflow-hidden shadow-sm">
            <img [src]="'https://picsum.photos/seed/central' + i + '/600/600'" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Foto Central" referrerpolicy="no-referrer">
          </div>
        }
      </div>
    </app-section>

    <app-section title="Como Chegar">
      <div class="bg-white p-4 rounded-3xl shadow-xl border border-black/5 overflow-hidden h-[400px]">
        <!-- Placeholder for Map -->
        <div class="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
          <mat-icon class="!text-6xl mb-4">map</mat-icon>
          <p class="font-bold">Mapa Interativo</p>
          <p class="text-sm">Silvanópolis - TO, Rodovia TO-050</p>
          <button mat-stroked-button color="primary" class="mt-4">Ver no Google Maps</button>
        </div>
      </div>
    </app-section>
  `
})
export class CentralRecebimentoComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMeta('Central de Recebimento', 'Conheça a estrutura e localização da Central de Silvanópolis.');
  }
}
