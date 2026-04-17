import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="space-y-8 animate-fade-in">
      <header>
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Bem-vindo ao painel administrativo</h1>
        <p class="text-gray-500 mt-2 text-lg">Gerencie as solicitações e conteúdos do Portal AREIA.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <mat-card class="!p-8 !rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>email</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-2">Mensagens</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Acesse a aba de contatos para visualizar as mensagens enviadas pelo site.</p>
        </mat-card>

        <mat-card class="!p-8 !rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
            <mat-icon>verified_user</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-2">Segurança</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Sua sessão está protegida. Lembre-se de sair após o uso.</p>
        </mat-card>

        <mat-card class="!p-8 !rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300">
          <div class="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-primary mb-6">
            <mat-icon>info</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-2">Suporte</h3>
          <p class="text-gray-500 text-sm leading-relaxed">Para alterações no sistema, entre em contato com o administrador.</p>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
  `]
})
export class AdminHomeComponent {}
