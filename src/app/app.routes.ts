import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'associacao',
    loadComponent: () => import('./features/associacao/associacao').then(m => m.AssociacaoComponent)
  },
  {
    path: 'central-recebimento',
    loadComponent: () => import('./features/central-recebimento/central-recebimento').then(m => m.CentralRecebimentoComponent)
  },
  {
    path: 'logistica-reversa',
    loadComponent: () => import('./features/logistica-reversa/logistica-reversa').then(m => m.LogisticaReversaComponent)
  },
  {
    path: 'agenda-recebimentos',
    loadComponent: () => import('./features/agenda-recebimentos/agenda-recebimentos').then(m => m.AgendaRecebimentosComponent)
  },
  {
    path: 'agenda-itinerante',
    loadComponent: () => import('./features/agenda-itinerante/agenda-itinerante').then(m => m.AgendaItineranteComponent)
  },
  {
    path: 'educacao-ambiental',
    loadComponent: () => import('./features/educacao-ambiental/educacao-ambiental').then(m => m.EducacaoAmbientalComponent)
  },
  {
    path: 'embalometro',
    loadComponent: () => import('./features/embalometro/embalometro').then(m => m.EmbalometroComponent)
  },
  {
    path: 'noticias',
    loadComponent: () => import('./features/noticias/noticias').then(m => m.NoticiasComponent)
  },
  {
    path: 'validar-comprovante',
    loadComponent: () => import('./features/validar-comprovante/validar-comprovante').then(m => m.ValidarComprovanteComponent)
  },
  {
    path: 'contato',
    loadComponent: () => import('./features/contato/contato').then(m => m.ContatoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
