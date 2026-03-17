import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <footer class="bg-primary text-white pt-16 pb-8">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-6">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-xl">A</div>
              <span class="text-2xl font-display font-bold tracking-tight">AREIA</span>
            </div>
            <p class="text-white/70 text-sm leading-relaxed mb-6">
              Associação dos Recebedores de Insumos Agropecuários de Porto Nacional e Região. Comprometidos com a sustentabilidade do agronegócio.
            </p>
            <div class="flex gap-4">
              <a href="https://facebook.com" target="_blank" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <mat-icon class="!text-xl">facebook</mat-icon>
              </a>
              <a href="https://instagram.com" target="_blank" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <mat-icon class="!text-xl">camera_alt</mat-icon>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-lg font-bold mb-6">Institucional</h4>
            <ul class="space-y-4 text-sm text-white/70">
              <li><a routerLink="/associacao" class="hover:text-white transition-colors">A Associação</a></li>
              <li><a routerLink="/central-recebimento" class="hover:text-white transition-colors">Central de Recebimento</a></li>
              <li><a routerLink="/logistica-reversa" class="hover:text-white transition-colors">Logística Reversa</a></li>
              <li><a routerLink="/educacao-ambiental" class="hover:text-white transition-colors">Educação Ambiental</a></li>
              <li><a routerLink="/noticias" class="hover:text-white transition-colors">Notícias e Eventos</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-lg font-bold mb-6">Serviços</h4>
            <ul class="space-y-4 text-sm text-white/70">
              <li><a routerLink="/agenda-recebimentos" class="hover:text-white transition-colors">Agendamento Online</a></li>
              <li><a routerLink="/agenda-itinerante" class="hover:text-white transition-colors">Agenda Itinerante</a></li>
              <li><a routerLink="/validar-comprovante" class="hover:text-white transition-colors">Validar Comprovante</a></li>
              <li><a routerLink="/embalometro" class="hover:text-white transition-colors">Embalômetro</a></li>
              <li><a routerLink="/contato" class="hover:text-white transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-bold mb-6">Contato</h4>
            <ul class="space-y-4 text-sm text-white/70">
              <li class="flex gap-3">
                <mat-icon class="!text-lg text-primary-light">location_on</mat-icon>
                <span>Rodovia TO-050, KM 12, Silvanópolis - TO</span>
              </li>
              <li class="flex gap-3">
                <mat-icon class="!text-lg text-primary-light">phone</mat-icon>
                <span>(63) 3514-1234</span>
              </li>
              <li class="flex gap-3">
                <mat-icon class="!text-lg text-primary-light">email</mat-icon>
                <span>contato&#64;areia.org.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© 2026 AREIA. Todos os direitos reservados.</p>
          <div class="flex gap-6">
            <a routerLink="/privacidade" class="hover:text-white transition-colors">Política de Privacidade</a>
            <a routerLink="/termos" class="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
