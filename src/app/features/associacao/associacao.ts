import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-associacao',
  imports: [CommonModule, SectionComponent, MatIconModule, RouterLink],
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
              <p>A <b>AREIA – Associação dos Recebedores de Insumos Agropecuários</b> de Porto Nacional e Região é uma entidade representativa do setor de revendas e distribuição de insumos agrícolas.</p>
              <p>Criada com o propósito de garantir o cumprimento das obrigações legais relacionadas à logística reversa de embalagens vazias de agrotóxicos, em conformidade com a <b>Lei nº 14.785/2023</b>, o <b>Decreto nº 4.074/2002</b> e a <b>Política Nacional de Resíduos Sólidos.</b></p>
            <p>Com atuação estratégica na região centro-sul do Tocantins, a AREIA é responsável pela gestão e operação da <b>Central de Recebimento de Embalagens Vazias de Silvanópolis/TO</b>, estruturando um sistema eficiente, seguro e ambientalmente adequado para o recebimento, triagem, acondicionamento e destinação final desses resíduos.</p>
            <p>Hoje, somos referência no Tocantins, operando a Central de Recebimento de Silvanópolis e coordenando diversas ações itinerantes em todos os municípios da nossa área de abrangência.</p>
            <p>Mais do que uma entidade operacional, a AREIA se consolida como a <b>legítima representante das empresas do agronegócio (revendas e distribuidores)</b>, promovendo a integração entre produtores rurais, setor privado e órgãos reguladores, garantindo rastreabilidade, conformidade ambiental e responsabilidade compartilhada.</p>
              <p>Sua atuação vai além da logística reversa, abrangendo também iniciativas de <b>educação ambiental</b>, orientação técnica aos produtores e fortalecimento de práticas sustentáveis no campo, contribuindo diretamente para a preservação dos recursos naturais, a segurança do trabalhador rural e o desenvolvimento sustentável do agronegócio.</p>
              <p>Com uma estrutura consolidada, equipe qualificada e atuação regional abrangente, a AREIA reafirma seu compromisso com a sustentabilidade, a legalidade e a eficiência operacional, sendo referência no Tocantins na gestão ambiental aplicada ao setor agrícola.</p>
          </div>
        </div>
        <div class="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://i.ibb.co/Q7gzSKMC/Gemini-Generated-Image-z6f6o6z6f6o6z6f6.png" alt="Equipe AREIA" class="w-full h-full object-cover" referrerpolicy="no-referrer">
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
          <p class="text-gray-600">Promover a gestão sustentável dos resíduos provenientes do agronegócio, assegurando a correta devolução, recebimento e destinação final de embalagens vazias de agrotóxicos, em conformidade com a legislação vigente.</p>
            <br>
          <p class="text-gray-600">A AREIA atua de forma integrada com produtores rurais, empresas associadas e órgãos reguladores, contribuindo para a preservação ambiental, a redução de impactos negativos ao meio ambiente e a promoção de práticas responsáveis no campo, fortalecendo a logística reversa como instrumento essencial de sustentabilidade.</p>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-black/5">
          <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>visibility</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-4">Visão</h3>
          <p class="text-gray-600">Ser reconhecida como referência nacional na gestão da logística reversa de embalagens agrícolas, destacando-se pela excelência operacional, pela conformidade legal e pelo impacto positivo gerado ao meio ambiente e à sociedade.</p>
            <br>
            <p class="text-gray-600">A AREIA busca consolidar-se como modelo de eficiência, inovação e responsabilidade socioambiental, ampliando sua atuação e fortalecendo o agronegócio sustentável no Brasil.</p>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-black/5">
          <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>favorite</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-4">Valores</h3>
          <p class="text-gray-600">A atuação da AREIA é guiada por princípios sólidos que orientam suas decisões e práticas institucionais:</p>
            <br>
            <ul class="space-y-4 text-gray-600">
                <li class="flex gap-3">
                    <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
                    <span><b>Sustentabilidade</b> </span>
                </li>
                <li class="flex gap-3">
                    <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
                    <span><b>Ética</b> </span>
                </li>
                <li class="flex gap-3">
                    <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
                    <span><b>Transparência</b></span>
                </li>
                <li class="flex gap-3">
                    <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
                    <span><b>Cooperação</b> </span>
                </li>
                <li class="flex gap-3">
                    <mat-icon class="text-green-500 shrink-0">check_circle</mat-icon>
                    <span><b>Respeito ao Meio Ambiente e às Pessoas</b></span>
                </li>
            </ul>
        </div>
      </div>
    </app-section>

    <app-section title="Onde Atuamos">
      <div class="bg-primary-light/10 p-12 rounded-3xl border border-primary-light/20">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          @for (city of cities; track city) {
            <div class="bg-white py-4 px-6 rounded-xl shadow-sm font-semibold text-primary">
              {{ city }}
            </div>
          }
        </div>

        <div class="text-center mt-12">
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
            A AREIA atua de forma estratégica em diversas regiões do Tocantins, abrangendo municípios do Polígono da Soja, Jalapão e Sudeste.
          </p>
          <a routerLink="/associacao/abrangencia" class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-light transition-all shadow-lg scale-100 active:scale-95">
            Saiba mais sobre nossa abrangência
            <mat-icon>arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </app-section>
  `
})
export class AssociacaoComponent implements OnInit {
  private seoService = inject(SeoService);

  cities = [
      'Porto Nacional',
      'Silvanópolis',
      'Palmas',
      'Monte do Carmo',
      'Brejinho de Nazaré',
      'Ipueiras',
      'Fátima',
      'Oliveira de Fátima',
      'Santa Rosa do Tocantins',
      'Chapada da Natividade',
      'Natividade',
      'Pindorama',
      'Ponte Alta do Tocantins',
      'Lajeado',
      'Tocantínia',
      'Aparecida do Rio Negro',
      'Novo Acordo',
      'Santa Tereza do Tocantins',
      'Paraíso do Tocantins',
      'Divinópolis do Tocantins',
      'Pium',
      'Marianópolis',
      'Caseara',
      'Lagoa da Confusão',
      'Cristalândia',
      'Dianópolis',
      'Taguatinga',
      'Arraias',
      'Combinado',
      'Lavandeira'
  ];

  ngOnInit() {
    this.seoService.updateMeta('A Associação', 'Conheça a história, missão e valores da AREIA.');
  }
}
