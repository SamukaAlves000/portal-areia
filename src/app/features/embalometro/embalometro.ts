import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { Metric } from '../../models/site.models';
import { MetricCardComponent } from '../../shared/components/metric-card';

@Component({
  selector: 'app-embalometro',
  imports: [CommonModule, SectionComponent, MetricCardComponent],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Embalômetro</h1>
        <p class="text-xl text-white/70 max-w-2xl font-light animate-fade-in delay-200">Transparência e indicadores de impacto ambiental da nossa região.</p>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section title="Impacto Consolidado" subtitle="Dados acumulados desde o início das operações da AREIA.">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (metric of metrics(); track metric.label; let i = $index) {
          <div class="stagger-item" [style.animation-delay]="(i * 100) + 'ms'" [class.visible]="true">
            <app-metric-card 
              [label]="metric.label" 
              [value]="metric.value" 
              [unit]="metric.unit" 
              [icon]="metric.icon"
            ></app-metric-card>
          </div>
        }
      </div>
    </app-section>

    <app-section bgClass="bg-surface" title="Evolução Anual">
      <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-black/5">
        <div class="flex flex-col md:flex-row gap-12 items-center">
          <div class="flex-grow w-full">
            <h3 class="text-2xl font-bold text-primary mb-6">Metas de Sustentabilidade</h3>
            <div class="space-y-8">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="font-bold text-gray-700">Meta de Destinação 2026</span>
                  <span class="text-primary-light font-bold">85%</span>
                </div>
                <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-primary-light w-[85%]"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="font-bold text-gray-700">Engajamento de Produtores</span>
                  <span class="text-primary-light font-bold">92%</span>
                </div>
                <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-primary-light w-[92%]"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="font-bold text-gray-700">Cobertura Territorial</span>
                  <span class="text-primary-light font-bold">100%</span>
                </div>
                <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-primary-light w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-80 shrink-0 bg-primary text-white p-8 rounded-2xl">
            <h4 class="text-xl font-bold mb-4">Destaque do Mês</h4>
            <p class="text-white/70 text-sm mb-6">Silvanópolis atingiu a marca de 10.000 embalagens destinadas somente em Fevereiro.</p>
            <div class="text-4xl font-bold text-accent">+12%</div>
            <p class="text-xs uppercase tracking-widest mt-2">Crescimento vs Jan</p>
          </div>
        </div>
      </div>
    </app-section>

    <app-section title="Por que medir?">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="flex gap-6">
          <div class="w-12 h-12 shrink-0 bg-accent rounded-full flex items-center justify-center text-primary">
            <span class="font-bold">01</span>
          </div>
          <div>
            <h4 class="text-xl font-bold text-primary mb-2">Transparência</h4>
            <p class="text-gray-600">Prestamos contas à sociedade e aos órgãos reguladores sobre o volume de resíduos retirados do meio ambiente.</p>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-12 h-12 shrink-0 bg-accent rounded-full flex items-center justify-center text-primary">
            <span class="font-bold">02</span>
          </div>
          <div>
            <h4 class="text-xl font-bold text-primary mb-2">Planejamento</h4>
            <p class="text-gray-600">Os dados nos ajudam a dimensionar as operações da Central e as rotas de recebimento itinerante.</p>
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
export class EmbalometroComponent implements OnInit {
  private dataService = inject(DataService);
  private seoService = inject(SeoService);

  metrics = signal<Metric[]>([]);

  ngOnInit() {
    this.seoService.updateMeta('Embalômetro', 'Indicadores de sustentabilidade e logística reversa da AREIA.');
    this.dataService.getMetrics().subscribe(data => this.metrics.set(data));
  }
}
