import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { GalleryItem } from '../../models/site.models';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-central-recebimento',
  standalone: true,
  imports: [CommonModule, SectionComponent, MatIconModule, MatButtonModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Central de Recebimento</h1>
        <p class="text-xl text-white/80 max-w-2xl">Unidade Silvanópolis: Referência em logística reversa no Tocantins.</p>
      </div>
    </div>

    <app-section>
      <div class="max-w-4xl mx-auto space-y-12">
        <!-- Introdução -->
        <div>
          <h2 class="text-3xl font-bold text-primary mb-6">Unidade Silvanópolis: Referência em logística reversa no Tocantins</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              A Central de Recebimento de Embalagens Vazias de Silvanópolis/TO, sob gestão da AREIA, constitui uma estrutura técnica consolidada e estratégica para a operacionalização da logística reversa no estado do Tocantins.
            </p>
            <p>
              Com quase duas décadas de atuação, a unidade desempenha papel fundamental no cumprimento das obrigações legais previstas na <b>Lei nº 14.785/2023</b> e no <b>Decreto nº 4.074/2002</b>, garantindo o recebimento, triagem, processamento e destinação ambientalmente adequada das embalagens pós-consumo de defensivos agrícolas.
            </p>
            <p>
              A Central é referência regional pela sua organização, capacidade operacional e conformidade com normas ambientais, sanitárias e de segurança do trabalho.
            </p>
          </div>
        </div>

        <!-- Estrutura e Capacidade -->
        <div class="bg-surface p-8 md:p-12 rounded-3xl border border-black/5">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
              <mat-icon>build</mat-icon>
            </div>
            <h2 class="text-3xl font-bold text-primary">Estrutura e Capacidade</h2>
          </div>
          
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              A Central de Silvanópolis dispõe de uma infraestrutura técnica completa, projetada para assegurar eficiência operacional e segurança ambiental em todas as etapas da logística reversa.
            </p>
            <p>
              Instalada em uma área total de aproximadamente <b>6.095 m²</b>, com cerca de <b>848 m²</b> de área construída, a unidade conta com:
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li class="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                <mat-icon class="text-primary shrink-0">check_circle</mat-icon>
                <span>Galpão para embalagens tríplice lavadas (não contaminadas), com piso impermeabilizado e ventilação adequada.</span>
              </li>
              <li class="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                <mat-icon class="text-primary shrink-0">check_circle</mat-icon>
                <span>Galpão para embalagens contaminadas, com segregação física e armazenamento seguro.</span>
              </li>
              <li class="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                <mat-icon class="text-primary shrink-0">check_circle</mat-icon>
                <span>Equipamentos de prensagem e enfardamento, otimizando o transporte para reciclagem.</span>
              </li>
              <li class="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                <mat-icon class="text-primary shrink-0">check_circle</mat-icon>
                <span>Área administrativa, incluindo vestiários, cantina e lavanderia de EPIs.</span>
              </li>
              <li class="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-black/5 md:col-span-2">
                <mat-icon class="text-primary shrink-0">check_circle</mat-icon>
                <span>Sistema de controle operacional que garante rastreabilidade e segurança no manejo dos resíduos.</span>
              </li>
            </ul>
            <p class="mt-6 p-6 bg-primary/5 rounded-2xl border border-primary/10 font-medium">
              A capacidade operacional da Central é de aproximadamente <b>600 toneladas por ano</b>, com histórico acumulado superior a <b>4.000 toneladas</b> de embalagens destinadas corretamente.
            </p>
          </div>
        </div>

        <!-- Localização e Horário -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-8 bg-white rounded-3xl shadow-sm border border-black/5">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-primary">Localização Estratégica</h3>
            </div>
            <p class="text-gray-600 mb-4">
              A Central está localizada em ponto estratégico de fácil acesso:
            </p>
            <p class="font-bold text-primary mb-4">
              Rodovia TO-050, KM 130, Trevo de Pindorama, Loteamento Extrema, Zona Rural – Silvanópolis/TO
            </p>
            <p class="text-sm text-gray-500">
              Sua localização favorece a logística regional, especialmente no atendimento ao Polígono da Soja.
            </p>
          </div>

          <div class="p-8 bg-white rounded-3xl shadow-sm border border-black/5">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>schedule</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-primary">Horário de Funcionamento</h3>
            </div>
            <ul class="space-y-4 text-gray-600">
              <li class="flex justify-between border-b border-gray-100 pb-2">
                <span class="font-medium">Segunda a Quinta:</span>
                <span>07h30 às 12h00 | 13h30 às 18h00</span>
              </li>
              <li class="flex justify-between border-b border-gray-100 pb-2">
                <span class="font-medium">Sexta-feira:</span>
                <span>08h00 às 12h00 | 14h00 às 18h00</span>
              </li>
            </ul>
            <p class="mt-6 text-sm bg-accent/10 p-4 rounded-xl text-primary font-medium flex gap-2">
              <mat-icon class="!text-lg">info</mat-icon>
              Recomenda-se que os produtores realizem agendamento prévio.
            </p>
          </div>
        </div>

        <!-- Equipe Especializada -->
        <div>
          <h2 class="text-3xl font-bold text-primary mb-6">Equipe Especializada</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="space-y-4 text-gray-600">
              <p>
                A Central conta com uma equipe técnica qualificada e treinada para atuar em todas as etapas do processo, assegurando conformidade com as normas de segurança e meio ambiente.
              </p>
              <ul class="space-y-3">
                @for (task of ['Orientar tríplice lavagem e preparo', 'Realizar inspeção técnica no recebimento', 'Classificar materiais conforme tipo/condição', 'Garantir correto acondicionamento', 'Promover segurança e uso de EPIs', 'Assegurar conformidade legal e ambiental']; track task) {
                  <li class="flex gap-2">
                    <mat-icon class="text-green-500 text-sm">check</mat-icon>
                    <span>{{ task }}</span>
                  </li>
                }
              </ul>
            </div>
            <div class="rounded-3xl overflow-hidden shadow-xl h-[400px]">
              <img src="https://i.ibb.co/99B6zT8z/Gemini-Generated-Image-tmmjb1tmmjb1tmmj.png" alt="Equipe Técnica" class="w-full h-full object-cover">
            </div>
          </div>
        </div>

        <!-- Compromisso Ambiental -->
        <div class="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div class="relative z-10">
            <h2 class="text-3xl font-bold mb-8">Compromisso Ambiental e Operacional</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              @for (item of ['Redução de impactos ambientais', 'Destinação correta de resíduos', 'Proteção do solo e recursos hídricos', 'Segurança do trabalhador rural', 'Conformidade legal']; track item) {
                <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <mat-icon class="text-accent mb-4">eco</mat-icon>
                  <p class="font-medium">{{ item }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-surface" title="Galeria da Unidade">
      @if (loading()) {
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          @for (i of [1,2,3,4]; track i) {
            <div class="aspect-square rounded-2xl bg-gray-200"></div>
          }
        </div>
      } @else if (photos().length > 0) {
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          @for (photo of photos(); track photo.id) {
            <div class="aspect-square rounded-2xl overflow-hidden shadow-sm group relative bg-white border border-black/5 flex items-center justify-center">
              <img [src]="photo.imageUrl" [alt]="photo.title || 'Foto Central'" class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" referrerpolicy="no-referrer">
              @if (photo.title) {
                <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p class="text-white text-sm font-medium">{{ photo.title }}</p>
                </div>
              }
            </div>
          }
        </div>
      } @else {
        <div class="text-center py-12 bg-white rounded-3xl border border-black/5">
          <mat-icon class="text-4xl text-gray-300 mb-2">image_not_supported</mat-icon>
          <p class="text-gray-500">Nenhuma foto na galeria no momento.</p>
        </div>
      }
    </app-section>

    <app-section title="Como Chegar">
      <div class="bg-white p-2 rounded-3xl shadow-xl border border-black/5 overflow-hidden h-[500px]">
        <iframe 
          [src]="mapUrl" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          class="rounded-2xl">
        </iframe>
      </div>
    </app-section>
  `
})
export class CentralRecebimentoComponent implements OnInit {
  private seoService = inject(SeoService);
  private firestore = inject(Firestore);
  private sanitizer = inject(DomSanitizer);

  photos = signal<GalleryItem[]>([]);
  loading = signal(true);
  mapUrl!: SafeResourceUrl;

  ngOnInit() {
    this.seoService.updateMeta('Central de Recebimento', 'Conheça a estrutura e localização da Central de Silvanópolis.');
    this.loadPhotos();
    
    // Coordenadas aproximadas para Rodovia TO-050, KM 130, Silvanópolis - TO
    const lat = -7.488569886183061;
    const lng = -46.1596981278565;
      encodeURIComponent('Rodovia TO-050, KM 130, Silvanópolis, TO');
// Usando Embed API sem necessidade de chave (modo Place/Search público)
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.819616335!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI3JzI4LjQiUyA0OMKwMDknNTUuNiJX!5e0!3m2!1spt-BR!2sbr!4v1713360000000!5m2!1spt-BR!2sbr`
    );
  }

  private loadPhotos() {
    const galleryCollection = collection(this.firestore, 'portal-areia/galeria/unidade');
    const q = query(galleryCollection, orderBy('order', 'asc'));
    
    (collectionData(q, { idField: 'id' }) as Observable<GalleryItem[]>).subscribe({
      next: (data) => {
        this.photos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading gallery:', err);
        this.loading.set(false);
      }
    });
  }
}
