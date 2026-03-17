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
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Contato</h1>
        <p class="text-xl text-white/80 max-w-2xl">Estamos à disposição para tirar suas dúvidas e ouvir suas sugestões.</p>
      </div>
    </div>

    <app-section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Info -->
        <div>
          <h2 class="text-3xl font-bold text-primary mb-8">Fale Conosco</h2>
          <p class="text-gray-600 mb-12">Utilize nossos canais de atendimento ou envie uma mensagem através do formulário ao lado.</p>

          <div class="space-y-8">
            <div class="flex gap-6">
              <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary text-lg">Endereço</h4>
                <p class="text-gray-500">Rodovia TO-050, KM 12, Silvanópolis - TO, CEP: 77580-000</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>phone</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary text-lg">Telefone</h4>
                <p class="text-gray-500">(63) 3514-1234 / (63) 99988-7766</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <mat-icon>email</mat-icon>
              </div>
              <div>
                <h4 class="font-bold text-primary text-lg">Email</h4>
                <p class="text-gray-500">contato&#64;areia.org.br</p>
              </div>
            </div>
          </div>

          <div class="mt-12 p-8 bg-primary rounded-3xl text-white">
            <h4 class="text-xl font-bold mb-4">Horário de Atendimento</h4>
            <p class="text-white/70 text-sm">Segunda a Sexta: 08h às 12h e 14h às 17h</p>
            <p class="text-white/70 text-sm mt-2">Sábados: Somente agendamentos especiais</p>
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
                    class="!w-full !py-7 !text-lg !bg-primary !rounded-xl"
                    [disabled]="form.invalid || loading()">
              {{ loading() ? 'Enviando...' : 'ENVIAR MENSAGEM' }}
            </button>
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

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  ngOnInit() {
    this.seoService.updateMeta('Contato', 'Entre em contato com a equipe da AREIA.');
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      setTimeout(() => {
        this.loading.set(false);
        this.snackBar.open('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'Fechar', { duration: 5000 });
        this.form.reset();
      }, 1500);
    }
  }
}
