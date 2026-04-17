import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { ItinerantSchedule } from '../../models/site.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-agenda-itinerante',
  imports: [CommonModule, SectionComponent, MatIconModule, MatTableModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4 tracking-tight">Agenda Itinerante</h1>
        <p class="text-xl text-white/80 max-w-2xl font-light">Levamos o recebimento até você. A AREIA realiza ações itinerantes para facilitar a devolução de embalagens em toda a região.</p>
      </div>
    </div>

    <app-section>
      <div class="max-w-4xl mx-auto mb-16">
        <div class="space-y-6 text-gray-600 leading-relaxed">
          <p>
            A AREIA promove anualmente os <b>Recebimentos Itinerantes (RI)</b> em municípios estratégicos do Tocantins, levando a estrutura de recebimento até os produtores rurais, especialmente em regiões mais distantes da Central de Silvanópolis.
          </p>
          <p>
            Essas ações são realizadas em parceria com a <b>ADAPEC – Agência de Defesa Agropecuária do Estado do Tocantins</b>, que atua no apoio à divulgação, orientação técnica e acompanhamento das atividades, fortalecendo o cumprimento da legislação ambiental e sanitária.
          </p>
        </div>
      </div>

      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-primary mb-2">Calendário de Recebimentos Itinerantes – 2026</h2>
        <div class="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
      </div>

      <div class="space-y-12">
        <!-- Regional Paraíso -->
        <div class="bg-white rounded-[2.5rem] shadow-xl border border-black/5 overflow-hidden">
          <div class="bg-primary/5 px-8 py-6 border-b border-black/5 flex items-center gap-3">
            <mat-icon class="text-primary">location_on</mat-icon>
            <h3 class="text-xl font-bold text-primary uppercase tracking-wider">Regional Paraíso</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/5">
            @for (item of [
              { city: 'Abreulândia', date: '18/05/2026', location: 'Parque de Exposição Agropecuária' },
              { city: 'Divinópolis do Tocantins', date: '19/05/2026', location: 'Parque de Exposição Agropecuária' },
              { city: 'Pium', date: '20/05/2026', location: 'Parque de Exposição Agropecuária' },
              { city: 'Paraíso do Tocantins', date: '21/05/2026', location: 'Parque de Exposição Agropecuária' }
            ]; track item.city) {
              <div class="p-8 hover:bg-surface/50 transition-colors">
                <p class="text-sm font-bold text-primary-light mb-1">{{ item.city }}</p>
                <p class="text-lg font-bold text-gray-800 mb-4">{{ item.date }}</p>
                <div class="flex items-start gap-2 text-sm text-gray-500">
                  <mat-icon class="!text-sm h-4 w-4 mt-0.5 shrink-0">place</mat-icon>
                  <span>{{ item.location }}</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Regional Dianópolis -->
        <div class="bg-white rounded-[2.5rem] shadow-xl border border-black/5 overflow-hidden">
          <div class="bg-primary/5 px-8 py-6 border-b border-black/5 flex items-center gap-3">
            <mat-icon class="text-primary">location_on</mat-icon>
            <h3 class="text-xl font-bold text-primary uppercase tracking-wider">Regional Dianópolis (Sudeste do Estado)</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
            @for (item of [
              { city: 'Dianópolis', date: '21/07/2026' },
              { city: 'Taguatinga', date: '22/07/2026' },
              { city: 'Combinado', date: '23/07/2026' }
            ]; track item.city) {
              <div class="p-8 hover:bg-surface/50 transition-colors">
                <p class="text-sm font-bold text-primary-light mb-1">{{ item.city }}</p>
                <p class="text-lg font-bold text-gray-800">{{ item.date }}</p>
              </div>
            }
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Regional Palmas -->
          <div class="bg-white rounded-[2.5rem] shadow-xl border border-black/5 overflow-hidden">
            <div class="bg-primary/5 px-8 py-6 border-b border-black/5 flex items-center gap-3">
              <mat-icon class="text-primary">location_on</mat-icon>
              <h3 class="text-xl font-bold text-primary uppercase tracking-wider">Regional Palmas</h3>
            </div>
            <div class="p-8 hover:bg-surface/50 transition-colors">
              <p class="text-sm font-bold text-primary-light mb-1">Palmas</p>
              <p class="text-lg font-bold text-gray-800">08/10/2026</p>
            </div>
          </div>

          <!-- Regional Porto Nacional -->
          <div class="bg-white rounded-[2.5rem] shadow-xl border border-black/5 overflow-hidden">
            <div class="bg-primary/5 px-8 py-6 border-b border-black/5 flex items-center gap-3">
              <mat-icon class="text-primary">location_on</mat-icon>
              <h3 class="text-xl font-bold text-primary uppercase tracking-wider">Regional Porto Nacional</h3>
            </div>
            <div class="p-8 hover:bg-surface/50 transition-colors">
              <p class="text-sm font-bold text-primary-light mb-1">Ponte Alta do Tocantins</p>
              <p class="text-lg font-bold text-gray-800">09/10/2026</p>
            </div>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-amber-50" title="⚠️ Orientações ao Produtor">
      <div class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-amber-200">
        <p class="text-amber-900 font-bold mb-6 text-lg">Para participação nos recebimentos itinerantes, é obrigatório:</p>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          @for (item of [
            'Realizar a tríplice lavagem das embalagens',
            'Inutilizar as embalagens (perfuração do fundo)',
            'Separar os materiais por tipo (plástico, metálico, tampas)',
            'Transportar as embalagens conforme as normas vigentes',
            'Apresentar a nota fiscal de aquisição dos produtos'
          ]; track item) {
            <li class="flex gap-3 text-amber-800">
              <mat-icon class="text-amber-500 shrink-0">check_circle</mat-icon>
              <span>{{ item }}</span>
            </li>
          }
        </ul>
      </div>
    </app-section>

    <app-section title="Como Funciona o Recebimento Itinerante">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="p-8 bg-white rounded-3xl shadow-sm border border-black/5 group hover:shadow-xl transition-all duration-500">
          <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-3xl">campaign</mat-icon>
          </div>
          <h4 class="text-xl font-bold text-primary mb-4">1. Divulgação</h4>
          <p class="text-gray-500 text-sm leading-relaxed">As datas e locais são divulgados previamente pela AREIA, em parceria com a ADAPEC, prefeituras e revendas locais.</p>
        </div>

        <div class="p-8 bg-white rounded-3xl shadow-sm border border-black/5 group hover:shadow-xl transition-all duration-500">
          <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-3xl">wash</mat-icon>
          </div>
          <h4 class="text-xl font-bold text-primary mb-4">2. Preparação</h4>
          <p class="text-gray-500 text-sm leading-relaxed">O produtor deve preparar as embalagens conforme exigências legais: lavadas, inutilizadas e separadas.</p>
        </div>

        <div class="p-8 bg-white rounded-3xl shadow-sm border border-black/5 group hover:shadow-xl transition-all duration-500">
          <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-3xl">psychology</mat-icon>
          </div>
          <h4 class="text-xl font-bold text-primary mb-4">3. Orientação Técnica</h4>
          <p class="text-gray-500 text-sm leading-relaxed">A ADAPEC e a AREIA orientam sobre a legislação, boas práticas de uso e educação ambiental no campo.</p>
        </div>

        <div class="p-8 bg-white rounded-3xl shadow-sm border border-black/5 group hover:shadow-xl transition-all duration-500">
          <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <mat-icon class="!text-3xl">receipt_long</mat-icon>
          </div>
          <h4 class="text-xl font-bold text-primary mb-4">4. Recebimento</h4>
          <p class="text-gray-500 text-sm leading-relaxed">Nossa equipe realiza a conferência técnica e emite o comprovante oficial de devolução para fins de fiscalização.</p>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-primary text-white" titleClass="text-white" title="Importância dos Recebimentos Itinerantes">
      <div class="max-w-4xl mx-auto">
        <p class="text-center text-white/70 mb-12 text-lg">Os recebimentos itinerantes, com apoio da ADAPEC, são fundamentais para garantir a sustentabilidade e legalidade no campo.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (benefit of [
            'Facilitar o acesso dos produtores ao sistema de devolução',
            'Ampliar a cobertura da logística reversa',
            'Promover orientação técnica e educação ambiental',
            'Reduzir impactos ambientais no campo',
            'Garantir o cumprimento da legislação vigente'
          ]; track benefit) {
            <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 group hover:bg-white/20 transition-all">
              <mat-icon class="text-accent group-hover:scale-110 transition-transform">verified</mat-icon>
              <span class="font-medium">{{ benefit }}</span>
            </div>
          }
        </div>
      </div>
    </app-section>

    <app-section title="🌱 Educação Ambiental" subtitle="Promovendo consciência, responsabilidade e conformidade ambiental no agronegócio.">
      <div class="max-w-4xl mx-auto">
        <div class="bg-surface p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-sm">
          <div class="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              A AREIA reconhece a <b>educação ambiental</b> como um pilar fundamental para o fortalecimento da logística reversa e para o cumprimento das obrigações legais previstas na <b>Lei nº 14.785/2023</b> e no <b>Decreto nº 4.074/2002</b>.
            </p>
            <p>
              Por meio de ações estruturadas e parcerias institucionais, a associação atua na orientação de produtores rurais, empresas associadas, revendas e distribuidores, promovendo práticas sustentáveis e o uso responsável de insumos agrícolas.
            </p>
          </div>
          
          <div class="mt-12 flex flex-wrap gap-4 justify-center">
             <div class="px-6 py-3 bg-white rounded-full shadow-sm border border-black/5 flex items-center gap-2 text-primary font-bold">
               <mat-icon>eco</mat-icon> Consciência
             </div>
             <div class="px-6 py-3 bg-white rounded-full shadow-sm border border-black/5 flex items-center gap-2 text-primary font-bold">
               <mat-icon>handshake</mat-icon> Responsabilidade
             </div>
             <div class="px-6 py-3 bg-white rounded-full shadow-sm border border-black/5 flex items-center gap-2 text-primary font-bold">
               <mat-icon>gavel</mat-icon> Conformidade
             </div>
          </div>
        </div>
      </div>
    </app-section>
  `
})
export class AgendaItineranteComponent implements OnInit {
  private dataService = inject(DataService);
  private seoService = inject(SeoService);

  schedule = signal<ItinerantSchedule[]>([]);
  displayedColumns: string[] = ['city', 'location', 'date', 'time'];

  ngOnInit() {
    this.seoService.updateMeta('Agenda Itinerante', 'Confira as datas de recebimento itinerante nos municípios da região.');
    this.dataService.getItinerantSchedule().subscribe(data => this.schedule.set(data));
  }
}
