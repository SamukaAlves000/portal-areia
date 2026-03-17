import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule
  ],
  template: `
    <mat-toolbar class="!bg-white/80 !backdrop-blur-md !h-20 !fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-black/5">
      <div class="container flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">A</div>
          <span class="text-2xl font-display font-bold text-primary tracking-tight hidden sm:block">AREIA</span>
        </a>

        <!-- Desktop Menu -->
        <nav class="hidden lg:flex items-center gap-1">
          @for (item of menuItems; track item.path) {
            <a [routerLink]="item.path" 
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: item.path === '/'}"
               class="nav-link px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors relative">
              {{ item.label }}
              <span class="nav-underline"></span>
            </a>
          }
          <a routerLink="/validar-comprovante" mat-flat-button class="!ml-4 !rounded-full !bg-primary !text-white hover:!bg-primary-light transition-all">
            Validar Comprovante
          </a>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button type="button" mat-icon-button class="lg:hidden" (click)="sidenav.toggle(); $event.preventDefault()">
          <mat-icon>menu</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <!-- Mobile Drawer -->
    <mat-sidenav-container class="!fixed !inset-0 !z-[60] !bg-transparent pointer-events-none" [hasBackdrop]="true">
      <mat-sidenav #sidenav mode="over" position="end" 
                   class="!w-80 !pointer-events-auto !bg-white !shadow-2xl"
                   (openedChange)="mobileMenuOpen.set($event)">
        <div class="p-8 flex flex-col h-full">
          <div class="flex items-center justify-between mb-10">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">A</div>
              <span class="text-xl font-bold text-primary tracking-tight">AREIA</span>
            </div>
            <button type="button" mat-icon-button (click)="sidenav.close()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          
          <nav class="flex-grow">
            <mat-nav-list class="!p-0">
              @for (item of menuItems; track item.path) {
                <a mat-list-item [routerLink]="item.path" 
                   (click)="sidenav.close()" 
                   routerLinkActive="active-mobile"
                   [routerLinkActiveOptions]="{exact: item.path === '/'}"
                   class="!h-14 !rounded-xl mb-1 hover:!bg-primary/5 transition-colors">
                  <span matListItemTitle class="!text-base !font-medium">{{ item.label }}</span>
                </a>
              }
              <div class="my-6 border-t border-gray-100"></div>
              <a mat-list-item routerLink="/validar-comprovante" (click)="sidenav.close()" 
                 class="!h-14 !rounded-xl !bg-primary/5 !text-primary hover:!bg-primary/10 transition-colors">
                <mat-icon matListItemIcon class="!text-primary">verified</mat-icon>
                <span matListItemTitle class="!font-bold">Validar Comprovante</span>
              </a>
            </mat-nav-list>
          </nav>

          <div class="mt-auto pt-10 border-t border-gray-100">
            <div class="flex gap-4 mb-6">
              <a href="https://facebook.com" target="_blank" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                <mat-icon class="!text-xl">facebook</mat-icon>
              </a>
              <a href="https://instagram.com" target="_blank" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                <mat-icon class="!text-xl">camera_alt</mat-icon>
              </a>
            </div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">© 2026 AREIA</p>
          </div>
        </div>
      </mat-sidenav>
    </mat-sidenav-container>
    
    <!-- Spacer for fixed header -->
    <div class="h-20"></div>
  `,
  styles: [`
    .nav-link.active {
      color: var(--color-primary-light);
      font-weight: 600;
    }
    .nav-link.active .nav-underline {
      width: 20px;
      opacity: 1;
    }
    .nav-underline {
      position: absolute;
      bottom: 4px;
      left: 16px;
      width: 0;
      height: 2px;
      background-color: var(--color-primary-light);
      transition: all 0.3s ease;
      opacity: 0;
    }
    .nav-link:hover .nav-underline {
      width: 20px;
      opacity: 1;
    }
    .active-mobile {
      background-color: rgba(var(--color-primary-rgb), 0.05) !important;
      color: var(--color-primary) !important;
    }
    .active-mobile ::ng-deep .mdc-list-item__primary-text {
      font-weight: 700 !important;
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  menuItems = [
    { label: 'Home', path: '/' },
    { label: 'A Associação', path: '/associacao' },
    { label: 'Central', path: '/central-recebimento' },
    { label: 'Logística Reversa', path: '/logistica-reversa' },
    { label: 'Agendamento', path: '/agenda-recebimentos' },
    { label: 'Itinerante', path: '/agenda-itinerante' },
    { label: 'Educação', path: '/educacao-ambiental' },
    { label: 'Embalômetro', path: '/embalometro' },
    { label: 'Notícias', path: '/noticias' },
    { label: 'Contato', path: '/contato' },
  ];
}
