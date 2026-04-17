import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/admin/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/layout/admin-layout').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/admin/home/admin-home').then(m => m.AdminHomeComponent)
      },
      {
        path: 'contatos',
        loadComponent: () => import('./features/admin/contatos/admin-contatos').then(m => m.AdminContatosComponent)
      },
      {
        path: 'noticias',
        loadComponent: () => import('./features/admin/noticias/admin-noticias').then(m => m.AdminNoticiasComponent)
      },
      {
        path: 'agendamentos',
        loadComponent: () => import('./features/admin/agendamentos/admin-agendamentos').then(m => m.AdminAgendamentosComponent)
      },
      {
        path: 'galeria',
        loadComponent: () => import('./features/admin/galeria/admin-galeria').then(m => m.AdminGaleriaComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'associacao',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/associacao/associacao').then(m => m.AssociacaoComponent)
      },
      {
        path: 'abrangencia',
        loadComponent: () => import('./features/associacao/abrangencia').then(m => m.AbrangenciaComponent)
      }
    ]
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
    children: [
      {
        path: '',
        loadComponent: () => import('./features/noticias/noticias').then(m => m.NoticiasComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/noticias/noticia-detalhe').then(m => m.NoticiaDetalheComponent)
      }
    ]
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
