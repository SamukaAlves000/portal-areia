import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-educacao-ambiental',
  imports: [CommonModule, SectionComponent, MatIconModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Educação Ambiental</h1>
        <p class="text-xl text-white/80 max-w-2xl">Formando cidadãos conscientes para um futuro sustentável no campo.</p>
      </div>
    </div>

    <app-section title="Nossos Projetos" subtitle="A AREIA desenvolve e executa iniciativas voltadas à educação ambiental e ao compliance do setor, integrando conhecimento técnico, responsabilidade legal e impacto social.">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- PEA -->
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 group">
          <div class="h-64 overflow-hidden">
            <img src="https://picsum.photos/seed/pea/800/600" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Programa de Educação Ambiental" referrerpolicy="no-referrer">
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-2">🎓 Programa de Educação Ambiental – PEA</h3>
            <p class="text-gray-600 mb-6 text-sm">O PEA é desenvolvido em parceria com o inpEV, sendo um instrumento essencial para atendimento às exigências legais relacionadas à logística reversa de embalagens de agrotóxicos.</p>
            <ul class="text-gray-600 space-y-2 mb-6 text-sm">
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Atender às exigências da legislação ambiental vigente;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Promover a conscientização ambiental em escolas e comunidades;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Orientar produtores rurais sobre uso, armazenamento e devolução;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Fortalecer a responsabilidade compartilhada;</li>
            </ul>
          </div>
        </div>

        <!-- Pequeno Guardião -->
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 group">
          <div class="h-64 overflow-hidden">
            <img src="https://picsum.photos/seed/edu1/800/600" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Pequeno Guardião do Campo" referrerpolicy="no-referrer">
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-2">🌾 Pequeno Guardião do Campo</h3>
            <span class="text-xs font-bold text-accent uppercase mb-2 block">(Em desenvolvimento)</span>
            <p class="text-gray-600 mb-6 text-sm">Ferramenta complementar ao PEA, voltada aos associados, revendas e distribuidores para auxiliar no cumprimento das exigências legais.</p>
            <ul class="text-gray-600 space-y-2 mb-6 text-sm">
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Ações educativas direcionadas a escolas e comunidades locais;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Formar consciência ambiental em crianças e jovens;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Instrumento de apoio na demonstração de conformidade ambiental;</li>
            </ul>
          </div>
        </div>

        <!-- Dia Nacional do Campo Limpo -->
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 group">
          <div class="h-64 overflow-hidden">
            <img src="https://picsum.photos/seed/edu2/800/600" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dia do Campo Limpo" referrerpolicy="no-referrer">
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-2">🌍 Dia Nacional do Campo Limpo</h3>
            <p class="text-gray-600 mb-6 text-sm">Celebrado em 18 de agosto, em parceria com inpEV, ADAPEC e demais instituições, promovendo a sustentabilidade no agronegócio.</p>
            <ul class="text-gray-600 space-y-2 mb-6 text-sm">
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Eventos educativos com produtores e comunidade;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Apresentação dos resultados da logística reversa;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Divulgação de boas práticas ambientais;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Integração entre setor produtivo e sociedade;</li>
            </ul>
          </div>
        </div>

        <!-- REGULARE -->
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 group">
          <div class="h-64 overflow-hidden">
            <img src="https://picsum.photos/seed/regulare/800/600" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Projeto REGULARE" referrerpolicy="no-referrer">
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-2">⚖️ Projeto REGULARE</h3>
            <p class="text-gray-600 mb-6 text-sm">Apoio técnico voltado à estruturação do compliance ambiental e regulatório para maior segurança jurídica e operacional.</p>
            <ul class="text-gray-600 space-y-2 mb-6 text-sm">
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Apoio no cumprimento da legislação ambiental;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Organização de licenças e documentos obrigatórios;</li>
              <li class="flex items-start gap-2"><mat-icon class="text-primary-light text-sm">check_circle</mat-icon> Estruturação de práticas de governança e gestão (ESG);</li>
            </ul>
          </div>
        </div>
      </div>
    </app-section>

    <app-section bgClass="bg-primary text-white" titleClass="text-white" title="🌱 Compromisso Institucional">
      <div class="max-w-4xl mx-auto">
        <p class="text-center text-xl mb-12 text-white/90">A atuação da AREIA na educação ambiental reforça seu compromisso com a sustentabilidade e a conformidade legal do agronegócio.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div class="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm">
            <mat-icon class="!text-4xl mb-3 text-accent">gavel</mat-icon>
            <p class="text-sm font-bold">Cumprimento da legislação</p>
          </div>
          <div class="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm">
            <mat-icon class="!text-4xl mb-3 text-accent">eco</mat-icon>
            <p class="text-sm font-bold">Sustentabilidade no agronegócio</p>
          </div>
          <div class="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm">
            <mat-icon class="!text-4xl mb-3 text-accent">engineering</mat-icon>
            <p class="text-sm font-bold">Apoio técnico aos associados</p>
          </div>
          <div class="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm">
            <mat-icon class="!text-4xl mb-3 text-accent">psychology</mat-icon>
            <p class="text-sm font-bold">Formação de consciência ambiental</p>
          </div>
          <div class="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm">
            <mat-icon class="!text-4xl mb-3 text-accent">diversity_3</mat-icon>
            <p class="text-sm font-bold">Integração setor e sociedade</p>
          </div>
        </div>
      </div>
    </app-section>
  `
})
export class EducacaoAmbientalComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMeta('Educação Ambiental', 'Conheça nossos projetos educativos e campanhas de conscientização.');
  }
}
