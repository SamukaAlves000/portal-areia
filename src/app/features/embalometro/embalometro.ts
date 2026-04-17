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
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Embalômetro AREIA</h1>
        <p class="text-xl text-white/70 max-w-3xl font-light animate-fade-in delay-200 mb-8">
          Transparência, controle e impacto ambiental da logística reversa no agronegócio.
          O Embalômetro da AREIA representa o conjunto de indicadores operacionais e ambientais gerados a partir das atividades de recebimento, triagem e destinação de embalagens vazias de agrotóxicos.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in delay-200">
          <div>
            <h3 class="text-accent font-bold uppercase tracking-wider mb-4">As operações consideram:</h3>
            <ul class="space-y-2 text-white/80">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Central de Silvanópolis/TO
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Recebimentos itinerantes nos municípios
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-accent font-bold uppercase tracking-wider mb-4">Os dados refletem:</h3>
            <ul class="space-y-2 text-white/80">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                O impacto direto na retirada de resíduos do meio ambiente
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                O cumprimento das exigências legais (Lei nº 14.785/2023 e Decreto nº 4.074/2002)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section title="Impacto Consolidado" subtitle="Indicadores acumulados da operação">
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
            <div class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[300px] h-48 bg-gray-100 rounded-3xl animate-pulse"></div>
          }
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-black/5 pt-12">
        <div>
          <h4 class="font-bold text-primary mb-2">Embalagens Recebidas</h4>
          <p class="text-sm text-gray-600">Quantidade total devolvida por produtores e registrada no sistema.</p>
        </div>
        <div>
          <h4 class="font-bold text-primary mb-2">Peso Total Destinado (toneladas)</h4>
          <p class="text-sm text-gray-600">
            Volume encaminhado para:<br>
            • Reciclagem<br>
            • Incineração controlada
          </p>
        </div>
        <div>
          <h4 class="font-bold text-primary mb-2">Produtores Atendidos</h4>
          <p class="text-sm text-gray-600">Número de produtores com devolução regular e comprovante emitido.</p>
        </div>
        <div>
          <h4 class="font-bold text-primary mb-2">Municípios Atendidos</h4>
          <p class="text-sm text-gray-600">Abrangência territorial da operação (central + itinerantes).</p>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-surface" title="Como os Dados São Medidos">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
          <div class="text-accent text-3xl font-bold mb-4">⚙️</div>
          <h4 class="text-xl font-bold text-primary mb-3">Sistema Integrado</h4>
          <ul class="text-gray-600 text-sm leading-relaxed space-y-2">
            <li>• Registros de entrada na Central de Silvanópolis</li>
            <li>• Controle dos recebimentos itinerantes</li>
            <li>• Emissão de comprovantes de devolução</li>
            <li>• Pesagem dos materiais destinados</li>
          </ul>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
          <div class="text-accent text-3xl font-bold mb-4">📋</div>
          <h4 class="text-xl font-bold text-primary mb-3">Classificação</h4>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            Classificação das embalagens:
          </p>
          <ul class="text-gray-600 text-sm leading-relaxed space-y-2">
            <li>• Lavadas → Reciclagem</li>
            <li>• Contaminadas → Incineração</li>
          </ul>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
          <div class="text-accent text-3xl font-bold mb-4">🔗</div>
          <h4 class="text-xl font-bold text-primary mb-3">Integração inpEV</h4>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            Possível integração com o sistema do inpEV para:
          </p>
          <ul class="text-gray-600 text-sm leading-relaxed space-y-2">
            <li>• Rastreabilidade</li>
            <li>• Confiabilidade dos dados</li>
          </ul>
        </div>
      </div>
    </app-section>

    <app-section title="Evolução e Metas">
      <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-black/5">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 class="text-2xl font-bold text-primary mb-8">Evolução Operacional</h3>
            <p class="text-gray-600 mb-6">O monitoramento contínuo permite:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div class="flex items-start gap-3">
                <span class="text-xl">📈</span>
                <p class="text-gray-700 font-medium">Avaliar crescimento do volume recebido</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-xl">📍</span>
                <p class="text-gray-700 font-medium">Identificar regiões com maior/menor adesão</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-xl">🚛</span>
                <p class="text-gray-700 font-medium">Planejar ações itinerantes</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-xl">⚙️</span>
                <p class="text-gray-700 font-medium">Medir eficiência da Central</p>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-primary mb-8">Indicadores de Desempenho e Metas</h3>
            <p class="text-gray-600 mb-6">Principais objetivos estratégicos:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-1 rounded-full bg-accent flex-shrink-0"></div>
                <p class="text-gray-700 font-medium">Aumentar o volume de embalagens destinadas corretamente</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-1 rounded-full bg-accent flex-shrink-0"></div>
                <p class="text-gray-700 font-medium">Ampliar o número de produtores participantes</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-1 rounded-full bg-accent flex-shrink-0"></div>
                <p class="text-gray-700 font-medium">Expandir a cobertura territorial</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-5 h-5 mt-1 rounded-full bg-accent flex-shrink-0"></div>
                <p class="text-gray-700 font-medium">Fortalecer ações de educação ambiental</p>
              </div>
            </div>
            
            <p class="text-sm text-primary font-bold">📌 Base para: Planejamento estratégico e Melhoria contínua</p>
          </div>

          <div class="space-y-8">
            <div class="bg-primary text-white p-8 rounded-2xl relative overflow-hidden">
              <div class="relative z-10">
                <h4 class="text-xl font-bold mb-4">🌱 Destaques Operacionais</h4>
                <p class="text-white/70 text-sm mb-6">Resultados observados ao longo do tempo:</p>
                <ul class="space-y-4 mb-8">
                  <li class="flex items-center gap-3 text-white/80">
                    <span class="text-accent">📊</span> Crescimento no volume de devoluções
                  </li>
                  <li class="flex items-center gap-3 text-white/80">
                    <span class="text-accent">👨‍🌾</span> Maior adesão dos produtores
                  </li>
                  <li class="flex items-center gap-3 text-white/80">
                    <span class="text-accent">🌎</span> Expansão territorial da AREIA
                  </li>
                </ul>
                <p class="text-xs italic opacity-60">💡 Os destaques podem ser atualizados dinamicamente no sistema/site.</p>
              </div>
              <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-surface" title="❓ Por que Medir?">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="flex flex-col gap-4">
          <div class="w-12 h-12 shrink-0 bg-accent rounded-xl flex items-center justify-center text-primary shadow-sm">
            <span class="font-bold">01</span>
          </div>
          <div>
            <h4 class="text-xl font-bold text-primary mb-2">🔍 Transparência</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">Permite prestação de contas para:</p>
            <ul class="text-gray-600 text-sm leading-relaxed">
              <li>• Sociedade</li>
              <li>• Associados</li>
              <li>• Órgãos reguladores</li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="w-12 h-12 shrink-0 bg-accent rounded-xl flex items-center justify-center text-primary shadow-sm">
            <span class="font-bold">02</span>
          </div>
          <div>
            <h4 class="text-xl font-bold text-primary mb-2">📊 Planejamento Operacional</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">Ajuda a:</p>
            <ul class="text-gray-600 text-sm leading-relaxed">
              <li>• Dimensionar capacidade da Central</li>
              <li>• Planejar recebimentos itinerantes</li>
              <li>• Otimizar recursos logísticos</li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="w-12 h-12 shrink-0 bg-accent rounded-xl flex items-center justify-center text-primary shadow-sm">
            <span class="font-bold">03</span>
          </div>
          <div>
            <h4 class="text-xl font-bold text-primary mb-2">🌍 Sustentabilidade e Compliance</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">Garante:</p>
            <ul class="text-gray-600 text-sm leading-relaxed">
              <li>• Cumprimento legal</li>
              <li>• Responsabilidade compartilhada</li>
              <li>• Fortalecimento de práticas sustentáveis</li>
            </ul>
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
