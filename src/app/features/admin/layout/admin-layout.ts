import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav mode="side" opened class="w-64 bg-primary text-white border-none">
        <div class="p-6 border-b border-white/10">
          <h2 class="text-xl font-bold tracking-tight">Portal AREIA</h2>
          <p class="text-xs text-white/60">Painel Administrativo</p>
        </div>
        
        <mat-nav-list class="admin-nav mt-4">
          <a mat-list-item routerLink="/admin/home" routerLinkActive="bg-white/10" class="!px-6 !py-4">
            <mat-icon matListItemIcon class="!text-primary">dashboard</mat-icon>
            <span matListItemTitle class="text-white">Home</span>
          </a>
          <a mat-list-item routerLink="/admin/contatos" routerLinkActive="bg-white/10" class="!px-6 !py-4">
            <mat-icon matListItemIcon class="!text-primary">email</mat-icon>
            <span matListItemTitle class="text-white">Contatos</span>
          </a>
          <a mat-list-item routerLink="/admin/noticias" routerLinkActive="bg-white/10" class="!px-6 !py-4">
            <mat-icon matListItemIcon class="!text-primary">newspaper</mat-icon>
            <span matListItemTitle class="text-white">Notícias</span>
          </a>
          <a mat-list-item routerLink="/admin/agendamentos" routerLinkActive="bg-white/10" class="!px-6 !py-4">
            <mat-icon matListItemIcon class="!text-primary">event</mat-icon>
            <span matListItemTitle class="text-white">Agendamentos</span>
          </a>
          <a mat-list-item routerLink="/admin/galeria" routerLinkActive="bg-white/10" class="!px-6 !py-4">
            <mat-icon matListItemIcon class="!text-primary">photo_library</mat-icon>
            <span matListItemTitle class="text-white">Galeria</span>
          </a>
          <a mat-list-item routerLink="/admin/metricas" routerLinkActive="bg-white/10" class="!px-6 !py-4">
            <mat-icon matListItemIcon class="!text-primary">analytics</mat-icon>
            <span matListItemTitle class="text-white">Métricas</span>
          </a>
        </mat-nav-list>

        <div class="absolute bottom-0 w-full p-6 border-t border-white/10">
          <button mat-stroked-button class="w-full !text-white !border-white/20" (click)="logout()">
            <mat-icon>logout</mat-icon> Sair
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="bg-gray-50 flex flex-col">
        <mat-toolbar class="!bg-white border-b border-gray-200">
          <span class="text-primary font-medium">Painel Admin</span>
        </mat-toolbar>
        
        <main class="p-8 flex-grow overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    .admin-nav .mat-mdc-list-item {
      --mdc-list-list-item-label-text-color: white;
      transition: background-color 0.2s;
    }
    .admin-nav .mat-mdc-list-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  `]
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
