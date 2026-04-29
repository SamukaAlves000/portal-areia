import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-associados',
  standalone: true,
  imports: [CommonModule, SectionComponent, MatIconModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Associados</h1>
        <p class="text-xl text-white/80 max-w-2xl">Conheça as empresas que compõem a AREIA e reafirmam o compromisso com a sustentabilidade no campo.</p>
      </div>
    </div>

    <app-section>
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (associado of associados; track associado) {
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow flex items-start gap-4 group">
              <div class="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <mat-icon>business</mat-icon>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Razão Social</span>
                <span class="text-gray-700 font-medium leading-snug">{{ associado }}</span>
              </div>
            </div>
          }
        </div>
        
        <div class="mt-16 p-8 bg-surface rounded-3xl border border-black/5 text-center">
          <p class="text-gray-600 italic">
            "A união de forças entre revendas e distribuidores em prol de um agronegócio cada vez mais sustentável e responsável."
          </p>
        </div>
      </div>
    </app-section>
  `
})
export class AssociadosComponent implements OnInit {
  private seoService = inject(SeoService);

  associados: string[] = [
    'AGREX DO BRASIL LTDA.',
    'AGRO AMAZONIA PRODUTOS AGROPECUARIOS S.A,',
    'AGRO AMAZÔNIA PRODUTOS AGROPECUÁRIOS S.A',
    'AGROCONFIANCA COMERCIO E REPRESENTACAO LTDA',
    'COMERCIAL AGROPRODUZ LTDA',
    'AGROQUIMA PRODUTOS AGROPECUÁRIOS LTDA',
    'AGROSERVICE COMERCIO IMPORTACAO EXPORTACAO E REPRESENTACAO DE PRODUTOS AGROPECUARIOS LTDA',
    'AGROVENCI - COMÉRCIO, IMPORTAÇÃO, EXPORTAÇÃO E AGROPECUÁRIA',
    'AMAGGI EXPORTACAO E IMPORTACAO LTDA',
    'AMAGGI LOUIS DREYFUS ZEN-NOH GRAOS S/A',
    'AVANTIAGRO COMERCIAL AGRICOLA LTDA',
    'BIAGRO COMERCIO E DISTRIBUICAO DE INSUMOS AGROPE',
    'BUFFON & DALMOLIN LTDA - ME',
    'CHS AGRONEGOCIO - INDUSTRIA E COMERCIO LTDA',
    'CONEXÃO AGRÍCOLA - COMÉRCIO E REPRESENTAÇÃO LTDA - ME',
    'AGRO DEALER PARAISO DO TOCANTINS TO LTDA',
    'ELO AGRONEGOCIOS LTDA (BR AGRO)',
    'DEMICIANO AGRONEGOCIOS LTDA',
    'FIAGRIL LTDA',
    'FOCO AGROBUSINESS LTDA',
    'FOLIGREEN FERTILIZANTES LTDA',
    'FRONTEIRA COMERCIO E REPRESENTACAO DE PRODUTOS AGROPECUARIOS LTDA',
    'G & R COMERCIO DE PRODUTOS AGROPECUARIOS LTDA',
    'ALVORADA COMERCIO DE PRODUTOS AGROPECUARIOS LTDA',
    'INNOVAR COMERCIO DE DEFENSIVOS AGRICOLAS LTDA',
    'JN COMERCIAL AGRÍCOLA TOCANTINS LTDA',
    'MARBO AGRICOLA LTDA',
    'NATIVA AGRICOLA LTDA',
    'AGRONACIONAL SOLUCOES AGRICOLAS LTDA',
    'PANTANAL AGRICOLA S.A',
    'PRODUTECNICA NORDESTE COMERCIO DE INSUMOS AGRICOLAS LTDA',
    'RAIZ AGRONEGOCIOS LTDA',
    'SIMBIOSE BIOCIENCIAS S/A',
    'SINOVA INOVACOES AGRICOLAS S.A',
    'SYNAGRO COMERCIAL AGRICOLA S.A',
    'TERRA DO BRASIL PRODUTOS AGROPECUARIOS LTDA',
    'UNIAGRO - UBT COMERCIAL AGRICOLA LTDA',
    'OESTE REPRESENTACOES AGRICOLAS LTDA',
    'RURALLI COMERCIO DE PRODUTOS AGRICOLAS',
    'SOLOS SOLUCOES AGRICOLAS LTDA',
    'ROBERTO CASTELO BRANCO DOS SANTOS SOARES LTDA',
    'AGROBOI COMERCIO DE PRODUTOS VETERINARIOS LTDA',
    'AGRO COLTIVARE SERVICOS AGRICOLA LTDA',
    'AGROCOSTA COMERCIO DE PRODUTOS AGROPECUARIOS LTDA',
    'T S MARTINS LTDA',
    'AGROPATOS COM. VAREJ. DE PROD. AGROPECUARIOS LTDA',
    'AGROPECUARIA FORMOSO LTDA',
    'BR RURAL - COMERCIO DE PRODUTOS AGROPECUARIOS LTDA',
    'BRASIL RURAL PRODUTOS AGROPECUÁRIOS LTDA',
    'BUFFON & DALMOLIN AGRO LTDA',
    'CASA DO CRIADOR COMERCIO DE PRODUTOS AGROPECUARIOS LTDA',
    'RS REP. E COM. VAREJ. DE PROD. AGROPECUARIOS LTDA',
    'CONEXAO AGRICOLA COMERCIO E REPRESENTACAO LTDA',
    'CULTIVARE REPRESENTACOES DE AGRONEGOCIOS LTDA',
    'HILTON GANDRA DE ARRUDA E FILHOS LTDA',
    'LO MILLER COMERCIO DE ADUBOS E FERTILIZANTES LTDA',
    'JN PRODUTOS AGROPECUARIOS LTDA',
    'M MOROSINI - EIRELI',
    'MADEREIRA E MATERIAL DE CONSTRUCAO DUAS IRMAS LTDA',
    'MRX AGRO COMERCIO VAREJISTA DE PRODUTOS AGROVETERINARIOS LTDA',
    'PAIOL AGROPET LTDA',
    'PARAISO COM. VAREJ. PROD. AGROPECUARIOS LTDA',
    'RACA RURAL AGRO LTDA',
    'R. D. INSUMOS AGROPECUARIOS LTDA',
    'RURALBRAS-COMERCIO ATACADISTA E VAREJISTA DE PRODUTOS AGROPECUARIOS LTDA',
    'TERRA FORTE SOLUCOES AGRICOLAS LTDA',
    'TERRA NOVA AGROPECUARIA EIRELI',
    'TERRAFOS COMERCIO E INDUSTRIA DE PRODUTOS AGROPECUARIOS LTDA'
  ];

  ngOnInit() {
    this.seoService.updateMeta('Associados', 'Lista de empresas associadas à AREIA.');
    this.removeDuplicates();
  }

  private removeDuplicates() {
    this.associados = Array.from(new Set(this.associados.map(a => a.trim()))).sort();
  }
}
