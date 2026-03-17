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
        <p class="text-xl text-white/80 max-w-2xl">Entenda o ciclo das embalagens e sua responsabilidade como produtor.</p>
      </div>
    </div>

    <app-section title="O Ciclo do Campo Limpo" subtitle="Um sistema de sucesso que é referência mundial em sustentabilidade.">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-6 text-2xl font-bold">1</div>
          <h4 class="font-bold mb-2">Compra</h4>
          <p class="text-sm text-gray-500">O produtor adquire o produto e recebe orientações sobre a devolução.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-6 text-2xl font-bold">2</div>
          <h4 class="font-bold mb-2">Uso e Lavagem</h4>
          <p class="text-sm text-gray-500">Após o uso, o produtor realiza a tríplice lavagem e inutiliza a embalagem.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-6 text-2xl font-bold">3</div>
          <h4 class="font-bold mb-2">Devolução</h4>
          <p class="text-sm text-gray-500">O produtor entrega as embalagens na Central ou em postos itinerantes.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-6 text-2xl font-bold">4</div>
          <h4 class="font-bold mb-2">Destinação</h4>
          <p class="text-sm text-gray-500">A AREIA encaminha para reciclagem ou incineração controlada.</p>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-surface" title="Orientações ao Produtor">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
          <h3 class="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <mat-icon class="text-primary-light">wash</mat-icon>
            Tríplice Lavagem
          </h3>
          <ol class="space-y-4 text-gray-600 list-decimal pl-5">
            <li>Esvazie completamente o conteúdo da embalagem no tanque do pulverizador.</li>
            <li>Adicione água limpa até 1/4 do volume da embalagem.</li>
            <li>Tampe bem e agite por 30 segundos em todas as direções.</li>
            <li>Despeje a água de lavagem no tanque do pulverizador.</li>
            <li>Repita este procedimento 3 vezes.</li>
            <li>Inutilize a embalagem perfurando o fundo.</li>
          </ol>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
          <h3 class="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <mat-icon class="text-primary-light">warning</mat-icon>
            Dicas de Segurança
          </h3>
          <ul class="space-y-4 text-gray-600">
            <li class="flex gap-3">
              <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
              <span>Sempre utilize EPI completo durante o manuseio e lavagem.</span>
            </li>
            <li class="flex gap-3">
              <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
              <span>Armazene as embalagens lavadas em local seco e coberto.</span>
            </li>
            <li class="flex gap-3">
              <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
              <span>Mantenha as tampas separadas das embalagens.</span>
            </li>
            <li class="flex gap-3">
              <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
              <span>O prazo para devolução é de até 1 ano após a compra.</span>
            </li>
          </ul>
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
