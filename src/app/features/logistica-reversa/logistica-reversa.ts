import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logistica-reversa',
  imports: [CommonModule, SectionComponent, MatIconModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Logística Reversa</h1>
        <p class="text-xl text-white/80 max-w-2xl">O Ciclo do Campo Limpo: Um sistema estruturado, obrigatório por lei e referência em sustentabilidade no agronegócio brasileiro.</p>
      </div>
    </div>

    <app-section title="O Ciclo do Campo Limpo" subtitle="Baseado no princípio da responsabilidade compartilhada entre produtores rurais, revendas, indústria e entidades gestoras.">
      <div class="max-w-4xl mx-auto">
        <div class="space-y-6 text-gray-600 leading-relaxed mb-12">
          <p>
            A logística reversa de embalagens vazias de agrotóxicos é regulamentada pela <b>Lei nº 14.785/2023</b> e pelo <b>Decreto nº 4.074/2002</b>, sendo baseada no princípio da responsabilidade compartilhada entre produtores rurais, revendas, indústria e entidades gestoras, como a <b>AREIA</b>.
          </p>
          <p>
            O correto cumprimento desse ciclo é essencial para garantir a conformidade ambiental, a segurança do trabalhador e a proteção dos recursos naturais.
          </p>
        </div>

          <h3 class="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
              <mat-icon class="text-3xl leading-none flex items-center justify-center">
                  sync
              </mat-icon>
              <span>Etapas do Ciclo da Logística Reversa</span>
          </h3>

        <div class="space-y-8">
          <!-- Etapa 1 -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div class="absolute top-0 right-0 p-4 text-primary/5 font-bold text-6xl group-hover:text-primary/10 transition-colors">1</div>
            <h4 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <mat-icon>shopping_cart</mat-icon>
              1. Aquisição Regular do Produto
            </h4>
            <p class="text-gray-600 mb-4">
              O produtor rural deve adquirir defensivos agrícolas exclusivamente em revendas e empresas devidamente licenciadas pela <b>ADAPEC</b> e órgãos ambientais.
            </p>
            <ul class="space-y-2 text-sm text-gray-500">
              <li class="flex items-center gap-2"><mat-icon class="text-green-500 !text-sm h-4 w-4">check_circle</mat-icon> Nota fiscal obrigatória;</li>
              <li class="flex items-center gap-2"><mat-icon class="text-green-500 !text-sm h-4 w-4">check_circle</mat-icon> Receituário agronômico por profissional habilitado;</li>
              <li class="flex items-center gap-2"><mat-icon class="text-green-500 !text-sm h-4 w-4">check_circle</mat-icon> Orientações técnicas de uso, armazenamento e devolução.</li>
            </ul>
          </div>

          <!-- Etapa 2 -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div class="absolute top-0 right-0 p-4 text-primary/5 font-bold text-6xl group-hover:text-primary/10 transition-colors">2</div>
            <h4 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <mat-icon>wash</mat-icon>
              2. Uso, Lavagem e Preparo das Embalagens
            </h4>
            <p class="text-gray-600 mb-4">
              Após a utilização, o produtor deve realizar imediatamente a <b>tríplice lavagem</b> (ou sob pressão) e a <b>inutilização</b> da embalagem, perfurando o fundo para impedir reutilização indevida.
            </p>
            <p class="text-sm text-gray-500 italic">
              Todo o processo deve seguir as normas técnicas de segurança, armazenamento e transporte.
            </p>
          </div>

          <!-- Etapa 3 -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div class="absolute top-0 right-0 p-4 text-primary/5 font-bold text-6xl group-hover:text-primary/10 transition-colors">3</div>
            <h4 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <mat-icon>event_available</mat-icon>
              3. Agendamento e Devolução Obrigatória na AREIA
            </h4>
            <p class="text-gray-600 mb-4">
              Antes da entrega, o produtor deve realizar o <b>agendamento prévio</b> via sistema do <b>inpEV</b>. A devolução ocorre na Central de Silvanópolis ou recebimentos itinerantes.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div class="bg-white p-4 rounded-xl border border-black/5">
                <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Onde Devolver</p>
                <p class="text-sm font-medium text-primary">Central Silvanópolis/TO ou Recebimentos Itinerantes</p>
              </div>
              <div class="bg-white p-4 rounded-xl border border-black/5">
                <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Obrigatoriedade</p>
                <p class="text-sm font-medium text-primary">Nota fiscal e embalagens devidamente lavadas</p>
              </div>
            </div>
          </div>

          <!-- Etapa 4 -->
          <div class="bg-surface p-8 rounded-3xl border border-black/5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div class="absolute top-0 right-0 p-4 text-primary/5 font-bold text-6xl group-hover:text-primary/10 transition-colors">4</div>
            <h4 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <mat-icon>local_shipping</mat-icon>
              4. Recebimento, Processamento e Destinação Final
            </h4>
            <p class="text-gray-600 mb-4">
              A AREIA executa a triagem, classificação e processamento (prensagem/enfardamento). Posteriormente, os resíduos são encaminhados para:
            </p>
            <div class="flex gap-4">
              <div class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                <mat-icon class="!text-lg h-5 w-5">recycling</mat-icon> Reciclagem
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-100">
                <mat-icon class="!text-lg h-5 w-5">local_fire_department</mat-icon> Incineração
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-white" title="Orientações ao Produtor Rural">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Tríplice Lavagem -->
        <div class="bg-surface p-8 md:p-12 rounded-[3rem] border border-black/5">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <mat-icon>wash</mat-icon>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-primary">Tríplice Lavagem</h3>
              <p class="text-sm text-gray-500 font-medium">Procedimento Obrigatório</p>
            </div>
          </div>
          
          <ol class="space-y-4">
            @for (step of [
              'Esvazie completamente a embalagem no tanque do pulverizador;',
              'Adicione água limpa até ¼ do volume;',
              'Agite por 30 segundos;',
              'Despeje a água no tanque;',
              'Repita o procedimento três vezes;',
              'Inutilize a embalagem perfurando o fundo.'
            ]; track step; let i = $index) {
              <li class="flex gap-4 items-start">
                <span class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{{ i + 1 }}</span>
                <span class="text-gray-600">{{ step }}</span>
              </li>
            }
          </ol>
        </div>

        <!-- Segurança e Prazo -->
        <div class="space-y-6">
          <div class="bg-primary text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <h4 class="text-xl font-bold mb-6 flex items-center gap-2">
              <mat-icon class="text-accent">shield</mat-icon>
              Segurança, Armazenamento e Transporte
            </h4>
            <ul class="space-y-3 text-sm text-white/80">
              <li class="flex gap-3"><mat-icon class="text-accent !text-sm h-4 w-4">check</mat-icon> Utilize sempre EPIs adequados;</li>
              <li class="flex gap-3"><mat-icon class="text-accent !text-sm h-4 w-4">check</mat-icon> Armazene em local coberto, ventilado e seguro;</li>
              <li class="flex gap-3"><mat-icon class="text-accent !text-sm h-4 w-4">check</mat-icon> Mantenha tampas separadas;</li>
              <li class="flex gap-3"><mat-icon class="text-accent !text-sm h-4 w-4">check</mat-icon> Transporte conforme normas vigentes;</li>
              <li class="flex gap-3"><mat-icon class="text-accent !text-sm h-4 w-4">check</mat-icon> Siga o receituário agronômico e a legislação.</li>
            </ul>
          </div>

          <div class="bg-accent/10 p-8 rounded-[2.5rem] border border-accent/20">
            <h4 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <mat-icon>timer</mat-icon>
              Prazo Legal para Devolução
            </h4>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-black/5 font-bold">1</div>
                <p class="text-gray-600 font-medium">Até 1 (um) ano após a compra;</p>
              </div>
              <p class="text-sm text-gray-500 bg-white/50 p-4 rounded-xl border border-black/5">
                <b>Atenção:</b> Guardar o comprovante de devolução para fins de fiscalização.
              </p>
            </div>
          </div>
        </div>
      </div>
    </app-section>
  `
})
export class LogisticaReversaComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMeta('Logística Reversa', 'Aprenda como fazer a tríplice lavagem e a destinação correta das embalagens.');
  }
}
