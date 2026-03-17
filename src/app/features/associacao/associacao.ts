import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-associacao',
  imports: [CommonModule, SectionComponent, MatIconModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">A Associação</h1>
        <p class="text-xl text-white/80 max-w-2xl">Conheça a história e o compromisso da AREIA com o agronegócio sustentável.</p>
      </div>
    </div>

    <app-section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl font-bold text-primary mb-6">Nossa História</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>Fundada em Porto Nacional, a AREIA nasceu da união de distribuidores e cooperativas preocupados com o impacto ambiental das embalagens vazias de defensivos agrícolas.</p>
            <p>Desde o início, nosso foco foi criar uma estrutura eficiente de logística reversa que atendesse às exigências legais e facilitasse a vida do produtor rural da nossa região.</p>
            <p>Hoje, somos referência no Tocantins, operando a Central de Recebimento de Silvanópolis e coordenando diversas ações itinerantes em todos os municípios da nossa área de abrangência.</p>
          </div>
        </div>
        <div class="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/seed/associacao/800/600" alt="Equipe AREIA" class="w-full h-full object-cover" referrerpolicy="no-referrer">
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-surface">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-black/5">
          <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>flag</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-4">Missão</h3>
          <p class="text-gray-600">Promover a gestão sustentável de resíduos do agronegócio, garantindo a destinação correta de embalagens e a preservação ambiental.</p>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-black/5">
          <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>visibility</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-4">Visão</h3>
          <p class="text-gray-600">Ser reconhecida como a melhor associação de logística reversa do agronegócio no Brasil, pela excelência operacional e impacto social.</p>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-black/5">
          <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>favorite</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-4">Valores</h3>
          <p class="text-gray-600">Sustentabilidade, Ética, Transparência, Cooperação e Respeito ao Meio Ambiente e às Pessoas.</p>
        </div>
      </div>
    </app-section>

    <app-section title="Onde Atuamos">
      <div class="bg-primary-light/10 p-12 rounded-3xl border border-primary-light/20">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          @for (city of cities; track city) {
            <div class="bg-white py-4 px-6 rounded-xl shadow-sm font-semibold text-primary">
              {{ city }}
            </div>
          }
        </div>
      </div>
    </app-section>
  `
})
export class AssociacaoComponent implements OnInit {
  private seoService = inject(SeoService);

  cities = [
    'Porto Nacional', 'Silvanópolis', 'Brejinho de Nazaré', 'Monte do Carmo',
    'Ipueiras', 'Fátima', 'Oliveira de Fátima', 'Santa Rosa do Tocantins',
    'Chapada da Natividade', 'Natividade', 'Pindorama', 'Ponte Alta'
  ];

  ngOnInit() {
    this.seoService.updateMeta('A Associação', 'Conheça a história, missão e valores da AREIA.');
  }
}
