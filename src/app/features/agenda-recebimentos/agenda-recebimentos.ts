import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { ScheduleDate } from '../../models/site.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agenda-recebimentos',
  imports: [
    CommonModule, 
    SectionComponent, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Agendamento Online</h1>
        <p class="text-xl text-white/70 max-w-2xl font-light animate-fade-in delay-200">Reserve sua data para entrega de embalagens na Central de Silvanópolis.</p>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Calendário / Datas -->
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
            <mat-icon class="text-primary-light">calendar_today</mat-icon>
            Datas Disponíveis
          </h2>
          
          @if (loadingDates()) {
            <div class="space-y-4">
              @for (i of [1,2,3,4,5]; track i) {
                <div class="h-20 skeleton rounded-xl"></div>
              }
            </div>
          } @else {
            <div class="space-y-4">
              @for (date of dates(); track date.date; let i = $index) {
                <div class="p-5 rounded-2xl border flex items-center justify-between transition-all duration-300 hover:shadow-md stagger-item"
                     [style.animation-delay]="(i * 100) + 'ms'" [class.visible]="true"
                     [ngClass]="date.available ? 'border-primary-light/10 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'">
                  <div>
                    <p class="font-bold text-primary text-lg">{{ date.date | date:'EEEE, dd/MM' }}</p>
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">{{ date.occupied }}/{{ date.capacity }} vagas ocupadas</p>
                  </div>
                  @if (date.available) {
                    <span class="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full">DISPONÍVEL</span>
                  } @else {
                    <span class="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full">LOTADO</span>
                  }
                </div>
              }
            </div>
          }

          <div class="mt-10 p-8 bg-accent/20 rounded-3xl border border-accent/30 relative overflow-hidden">
            <div class="relative z-10">
              <h4 class="font-bold text-primary mb-3 flex items-center gap-2">
                <mat-icon class="!text-xl">info</mat-icon>
                Orientações
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed">O agendamento deve ser feito com no mínimo 48h de antecedência. Em caso de grandes volumes, entre em contato via telefone.</p>
            </div>
            <mat-icon class="absolute -bottom-4 -right-4 !text-8xl text-accent/20 rotate-12">help_outline</mat-icon>
          </div>
        </div>

        <!-- Formulário -->
        <div class="lg:col-span-2 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-black/5">
          <h2 class="text-3xl font-bold text-primary mb-10 tracking-tight">Dados do Agendamento</h2>
          
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Nome Completo / Razão Social</mat-label>
              <input matInput formControlName="name" placeholder="Ex: João da Silva">
              <mat-icon matPrefix class="mr-2 text-gray-400">person</mat-icon>
              @if (form.get('name')?.invalid && form.get('name')?.touched) {
                <mat-error>Nome é obrigatório</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>CPF ou CNPJ</mat-label>
              <input matInput formControlName="document" placeholder="000.000.000-00">
              <mat-icon matPrefix class="mr-2 text-gray-400">badge</mat-icon>
              @if (form.get('document')?.invalid && form.get('document')?.touched) {
                <mat-error>Documento inválido</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Telefone / WhatsApp</mat-label>
              <input matInput formControlName="phone" placeholder="(63) 99999-9999">
              <mat-icon matPrefix class="mr-2 text-gray-400">phone</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Município</mat-label>
              <mat-select formControlName="city">
                <mat-option>-- Selecione --</mat-option>
                @for (city of cities; track city) {
                  <mat-option [value]="city">{{ city }}</mat-option>
                }
              </mat-select>
              <mat-icon matPrefix class="mr-2 text-gray-400">location_city</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Data Desejada</mat-label>
              <mat-select formControlName="date">
                <mat-option>-- Selecione uma data --</mat-option>
                @for (date of availableDates(); track date.date) {
                  <mat-option [value]="date.date">{{ date.date | date:'dd/MM/yyyy' }}</mat-option>
                }
              </mat-select>
              <mat-icon matPrefix class="mr-2 text-gray-400">event</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Qtd. Aprox. de Embalagens</mat-label>
              <input matInput type="number" formControlName="quantity" placeholder="Ex: 150">
              <mat-icon matPrefix class="mr-2 text-gray-400">inventory_2</mat-icon>
            </mat-form-field>

            <div class="md:col-span-2 mt-6">
              <button mat-flat-button type="submit" 
                      class="!w-full !py-8 !text-xl !bg-primary !text-white !rounded-2xl hover:!bg-primary-light transition-all shadow-lg hover:shadow-primary/20"
                      [disabled]="form.invalid || loading()">
                <div class="flex items-center justify-center gap-3">
                  @if (loading()) {
                    <mat-icon class="animate-spin">sync</mat-icon>
                    <span>PROCESSANDO...</span>
                  } @else {
                    <mat-icon>check_circle</mat-icon>
                    <span>CONFIRMAR AGENDAMENTO</span>
                  }
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </app-section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .delay-200 { animation-delay: 0.2s; }
    
    .stagger-item {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeIn 0.6s ease-out forwards;
    }
  `]
})
export class AgendaRecebimentosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private seoService = inject(SeoService);
  private snackBar = inject(MatSnackBar);

  dates = signal<ScheduleDate[]>([]);
  availableDates = signal<ScheduleDate[]>([]);
  loading = signal(false);
  loadingDates = signal(true);

  cities = ['Porto Nacional', 'Silvanópolis', 'Brejinho de Nazaré', 'Monte do Carmo', 'Outro'];

  form = this.fb.group({
    name: ['', Validators.required],
    document: ['', [Validators.required, Validators.minLength(11)]],
    phone: ['', Validators.required],
    city: ['', Validators.required],
    date: ['', Validators.required],
    quantity: [null, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.seoService.updateMeta('Agendamento Online', 'Agende a devolução de suas embalagens vazias na Central de Silvanópolis.');
    this.dataService.getScheduleDates().subscribe(data => {
      this.dates.set(data);
      this.availableDates.set(data.filter(d => d.available));
      this.loadingDates.set(false);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      const val = this.form.value;
      this.dataService.createAppointment({
        id: Math.random().toString(36).substr(2, 9),
        name: val.name!,
        document: val.document!,
        phone: val.phone!,
        city: val.city!,
        date: val.date!,
        quantity: val.quantity!
      }).subscribe(() => {
        this.loading.set(false);
        this.snackBar.open('Agendamento realizado com sucesso!', 'Fechar', { 
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.form.reset();
      });
    }
  }
}
