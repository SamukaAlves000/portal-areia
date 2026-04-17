import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-abrangencia',
  imports: [CommonModule, SectionComponent, MatIconModule, RouterLink],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center">Onde Atuamos</h1>
        <p class="text-xl text-white/80 max-w-2xl mx-auto">
          Conheça a abrangência regional da AREIA e sua importância estratégica para o agronegócio no Tocantins.
        </p>
      </div>
    </div>

    <app-section>
      <div class="max-w-4xl mx-auto space-y-12">
        <div>
          <h2 class="text-3xl font-bold text-primary mb-6">Abrangência Regional – Polígono da Soja e Região do Jalapão</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              A AREIA atua de forma estratégica nas regiões centro, centro-sul, centro-oeste e sudeste do Estado do Tocantins, com abrangência direta nos municípios de:
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              @for (city of directCities; track city) {
                <div class="bg-surface p-3 rounded-lg border border-black/5 text-sm font-medium">
                  {{ city }}
                </div>
              }
            </div>
          </div>
        </div>

        <div class="bg-surface p-8 rounded-3xl border border-black/5">
          <h3 class="text-2xl font-bold text-primary mb-4">No eixo da capital</h3>
          <p class="text-gray-600 mb-6">A atuação se estende aos municípios adjacentes a Palmas, incluindo:</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            @for (city of capitalAxis; track city) {
              <div class="bg-white p-3 rounded-lg shadow-sm text-sm font-medium">
                {{ city }}
              </div>
            }
          </div>
          <p class="mt-6 text-gray-600">Ampliando o atendimento aos produtores rurais da região central do estado.</p>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-primary mb-4">Estrutura Operacional e Recebimentos Itinerantes</h3>
          <p class="text-gray-600 mb-6">A AREIA amplia sua presença em municípios estratégicos, incluindo:</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            @for (city of strategicCities; track city) {
              <div class="bg-surface p-3 rounded-lg border border-black/5 text-sm font-medium">
                {{ city }}
              </div>
            }
          </div>
          <p class="mt-6 text-gray-600">E região.</p>
        </div>

        <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
          <h3 class="text-2xl font-bold text-primary mb-4">Áreas Estratégicas</h3>
          <p class="text-gray-600 leading-relaxed">
            A AREIA está inserida em uma das mais relevantes regiões produtivas do Tocantins, conhecida como <b>“Polígono da Soja”</b>, além de atuar em áreas estratégicas da região do <b>Jalapão</b> e sudeste do estado, onde há crescente expansão da atividade agrícola.
          </p>
          <div class="mt-6 space-y-3">
            <div class="flex items-center gap-3 text-primary font-semibold">
              <mat-icon>trending_flat</mat-icon>
              <span>Desde a divisa com o Estado da Bahia</span>
            </div>
            <div class="flex items-center gap-3 text-primary font-semibold">
              <mat-icon>trending_flat</mat-icon>
              <span>Até a divisa com o Estado do Pará</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-primary mb-6">Principais Polos Agrícolas Atendidos</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-black/5">
              <div class="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary mb-1">Sudeste</h4>
                <p class="text-sm text-gray-600">Região de Dianópolis, Taguatinga, Arraias, Combinado e Lavandeira.</p>
              </div>
            </div>
            <div class="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-black/5">
              <div class="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary mb-1">Centro</h4>
                <p class="text-sm text-gray-600">Região de Porto Nacional, Silvanópolis, Palmas e municípios adjacentes.</p>
              </div>
            </div>
            <div class="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-black/5">
              <div class="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary mb-1">Centro-Oeste</h4>
                <p class="text-sm text-gray-600">Região de Paraíso do Tocantins e Vale do Araguaia.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-primary flex items-center gap-3">
              <mat-icon class="text-accent">agriculture</mat-icon>
              Importância da Atuação Regional
            </h3>
            <ul class="space-y-4">
              @for (item of importance; track item) {
                <li class="flex gap-3 text-gray-600">
                  <mat-icon class="text-primary shrink-0 text-sm">circle</mat-icon>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
          </div>
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-primary flex items-center gap-3">
              <mat-icon class="text-accent">verified_user</mat-icon>
              Diferencial Institucional
            </h3>
            <ul class="space-y-4">
              @for (diff of differentials; track diff) {
                <li class="flex gap-3 text-gray-600">
                  <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
                  <span>{{ diff }}</span>
                </li>
              }
            </ul>
          </div>
        </div>

        <div class="pt-12 text-center">
          <a routerLink="/associacao" class="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <mat-icon>arrow_back</mat-icon>
            Voltar para A Associação
          </a>
        </div>
      </div>
    </app-section>
  `
})
export class AbrangenciaComponent implements OnInit {
  private seoService = inject(SeoService);

  directCities = [
    'Porto Nacional', 'Silvanópolis', 'Palmas', 'Monte do Carmo', 
    'Brejinho de Nazaré', 'Ipueiras', 'Fátima', 'Oliveira de Fátima', 
    'Santa Rosa do Tocantins', 'Chapada da Natividade', 'Natividade', 
    'Pindorama', 'Ponte Alta do Tocantins'
  ];

  capitalAxis = [
    'Lajeado', 'Tocantínia', 'Aparecida do Rio Negro', 
    'Novo Acordo', 'Santa Tereza do Tocantins'
  ];

  strategicCities = [
    'Paraíso do Tocantins', 'Divinópolis do Tocantins', 'Pium', 
    'Marianópolis', 'Caseara', 'Lagoa da Confusão', 'Cristalândia', 
    'Dianópolis', 'Taguatinga', 'Arraias', 'Combinado', 'Lavandeira'
  ];

  importance = [
    'Atender produtores em diferentes polos agrícolas do estado',
    'Facilitar o acesso ao sistema de devolução de embalagens',
    'Reduzir impactos ambientais decorrentes do descarte irregular',
    'Fortalecer a logística reversa em regiões estratégicas',
    'Garantir o cumprimento das obrigações legais ambientais'
  ];

  differentials = [
    'Estrutura fixa na Central de Silvanópolis',
    'Operações itinerantes em municípios estratégicos',
    'Integração com empresas associadas',
    'Apoio técnico contínuo aos produtores',
    'Cobertura logística em áreas de difícil acesso'
  ];

  ngOnInit() {
    this.seoService.updateMeta(
      'Onde Atuamos - Abrangência Regional', 
      'Conheça a atuação estratégica da AREIA no Estado do Tocantins, abrangendo o Polígono da Soja e a região do Jalapão.'
    );
  }
}
