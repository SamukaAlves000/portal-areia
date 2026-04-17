import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

@Component({
  selector: 'app-contato',
  imports: [
    CommonModule, 
    SectionComponent, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Contato</h1>
        <p class="text-xl text-white/70 max-w-3xl font-light animate-fade-in delay-200">
          Estamos à disposição para orientar, esclarecer dúvidas e apoiar produtores, associados e parceiros.
          A AREIA mantém canais de atendimento para suporte técnico, orientações sobre devolução de embalagens, agendamento e demais informações relacionadas à logística reversa.
        </p>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Info -->
        <div>
          <h2 class="text-3xl font-bold text-primary mb-6">Fale Conosco</h2>
          <p class="text-gray-600 mb-10 leading-relaxed">
            Utilize nossos canais de atendimento ou envie uma mensagem através do formulário disponível na página.
            Nossa equipe está preparada para oferecer suporte com agilidade e responsabilidade.
          </p>

          <div class="space-y-8">
            <div class="flex gap-6">
              <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary text-lg">Endereço</h4>
                <p class="text-gray-500 leading-relaxed">
                  Rodovia TO-050, KM 130, Trevo de Pindorama,<br>
                  Loteamento Extrema, Zona Rural<br>
                  Silvanópolis – TO
                </p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>phone</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary text-lg">Telefone / WhatsApp</h4>
                <p class="text-gray-500">(63) 98436-7707</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>email</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary text-lg">E-mail</h4>
                <p class="text-gray-500">central.silvanopolis.agenda&#64;gmail.com</p>
              </div>
            </div>
          </div>

          <div class="mt-12 p-10 bg-primary rounded-3xl text-white relative overflow-hidden shadow-xl">
            <div class="relative z-10">
              <h4 class="text-xl font-bold mb-6 flex items-center gap-2">
                <mat-icon>schedule</mat-icon>
                Horário de Atendimento
              </h4>
              <div class="space-y-2 text-white/80">
                <p class="font-bold text-accent">Segunda a Sexta-feira</p>
                <p>08h00 às 12h00</p>
                <p>14h00 às 17h00</p>
              </div>
              <div class="mt-6 pt-6 border-t border-white/10">
                <p class="text-xs leading-relaxed italic opacity-80">
                  📌 Atendimento realizado em horário comercial e, para entrega de embalagens, mediante agendamento prévio obrigatório.
                </p>
              </div>
            </div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          </div>
        </div>

        <!-- Form -->
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-black/5">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Seu Nome</mat-label>
              <input matInput formControlName="name" placeholder="Ex: João da Silva">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Seu Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="joao&#64;email.com">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Assunto</mat-label>
              <input matInput formControlName="subject" placeholder="Ex: Dúvida sobre agendamento">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Mensagem</mat-label>
              <textarea matInput rows="5" formControlName="message" placeholder="Como podemos ajudar?"></textarea>
            </mat-form-field>

            <button mat-flat-button color="primary" type="submit" 
                    class="!w-full !py-7 !text-lg !bg-primary !text-white !rounded-xl"
                    [disabled]="form.invalid || loading()">
              {{ loading() ? 'Enviando...' : 'ENVIAR MENSAGEM' }}
            </button>

            @if (message()) {
              <div class="mt-4 p-4 rounded-xl text-center animate-fade-in"
                   [ngClass]="success() ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'">
                <div class="flex items-center justify-center gap-2">
                  <mat-icon class="!text-xl">{{ success() ? 'check_circle' : 'error' }}</mat-icon>
                  <span class="font-medium">{{ message() }}</span>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    </app-section>
  `
})
export class ContatoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  success = signal<boolean | null>(null);
  message = signal<string | null>(null);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  ngOnInit() {
    this.seoService.updateMeta('Contato', 'Entre em contato com a equipe da AREIA.');
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      try {
        const now = new Date();
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();
        const periodo = `${mes}/${ano}`;

        const contactsCollection = collection(db, 'portal-areia/fale-conosco/mensagens');
        await addDoc(contactsCollection, {
          ...this.form.value,
          dataEnvio: serverTimestamp(),
          periodo,
          read: false
        });

        this.form.reset();
        this.success.set(true);
        this.message.set('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      } catch (error) {
        console.error('Error saving message:', error);
        this.success.set(false);
        this.message.set('Erro ao enviar mensagem. Tente novamente mais tarde.');
      } finally {
        this.loading.set(false);
        // Limpar mensagem após 10 segundos
        setTimeout(() => {
          this.success.set(null);
          this.message.set(null);
        }, 10000);
      }
    }
  }
}
