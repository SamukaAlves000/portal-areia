import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, collectionData } from '../../firebase.config';
import { Observable } from 'rxjs';
import { ScheduleDate } from '../../models/site.models';

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
      <div class="max-w-4xl mx-auto mb-16">
        <div class="space-y-6 text-gray-600 leading-relaxed">
          <p class="text-lg">
            O agendamento prévio é <b>obrigatório</b> para a entrega de embalagens vazias de defensivos agrícolas na Central da AREIA, sendo uma medida essencial para garantir a organização operacional, a segurança no atendimento e o cumprimento das normas ambientais.
          </p>
          <p>
            A Central realiza o recebimento de <b>segunda a sexta-feira</b>, em horário comercial, e o atendimento é realizado exclusivamente mediante agendamento realizado com antecedência.
          </p>
          <p>
            Por meio do sistema oficial, o produtor ou representante deverá selecionar previamente a data disponível, garantindo melhor planejamento da operação, evitando filas e assegurando maior eficiência no processo de recebimento.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <!-- Orientações Importantes -->
        <div class="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 shadow-sm">
          <h3 class="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-3">
            <mat-icon class="text-amber-600">warning</mat-icon>
            Orientações Importantes
          </h3>
          <ul class="space-y-4">
            @for (item of [
              'O agendamento deve ser realizado antes da entrega das embalagens;',
              'Recomenda-se antecedência mínima de 48 horas;',
              'O atendimento ocorre apenas em dias úteis (segunda a sexta-feira);',
              'A entrega somente será realizada mediante agendamento confirmado;',
              'Para grandes volumes, recomenda-se contato prévio com a equipe da AREIA;'
            ]; track item) {
              <li class="flex gap-3 text-amber-800">
                <mat-icon class="text-amber-500 !text-sm h-4 w-4 mt-1">circle</mat-icon>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>

        <!-- Documentos e Condições -->
        <div class="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 shadow-sm">
          <h3 class="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
            <mat-icon class="text-blue-600">description</mat-icon>
            Documentos e Condições
          </h3>
          <p class="text-blue-800 mb-4 font-medium">No dia agendado, o produtor deverá:</p>
          <ul class="space-y-4">
            @for (item of [
              'Apresentar a nota fiscal de aquisição dos produtos;',
              'Entregar as embalagens devidamente tríplice lavadas, inutilizadas e separadas por tipo;',
              'Seguir as orientações de transporte e segurança conforme a legislação vigente;'
            ]; track item) {
              <li class="flex gap-3 text-blue-800">
                <mat-icon class="text-blue-500 !text-sm h-4 w-4 mt-1">check_circle</mat-icon>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
          <p class="mt-6 text-sm text-blue-700 bg-white/50 p-4 rounded-xl border border-blue-200">
            A AREIA realizará a conferência técnica e emitirá o comprovante de devolução, documento obrigatório para fins de fiscalização.
          </p>
        </div>
      </div>

      <!-- Link para Sistema Oficial -->
      <div class="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden mb-20 text-center">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div class="relative z-10">
          <h2 class="text-3xl font-bold mb-4">Acessar Sistema Oficial de Agendamento</h2>
          <p class="text-white/70 mb-8 max-w-2xl mx-auto">
            Utilize o sistema do inpEV para agendar sua entrega de forma rápida e segura.
          </p>
          <a href="https://agendamento.inpev.org.br//Page/Passo2.aspx" target="_blank" 
             class="inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
            <mat-icon>link</mat-icon>
            AGENDAR ENTREGA DE EMBALAGENS
          </a>
        </div>
      </div>

      <!-- Seção do Formulário / Dados Necessários -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-1">
          <h2 class="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <mat-icon class="text-primary-light">assignment</mat-icon>
            Dados para Agendamento
          </h2>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Para realizar o agendamento, será necessário informar os seguintes dados básicos para identificação e planejamento operacional.
          </p>
          
          <div class="space-y-4 mb-12">
            @for (item of ['Nome completo ou razão social', 'CPF ou CNPJ', 'Telefone / WhatsApp', 'Município de origem', 'Data desejada', 'Quantidade aproximada']; track item) {
              <div class="flex items-center gap-3 p-4 bg-surface rounded-2xl border border-black/5">
                <mat-icon class="text-primary-light">check</mat-icon>
                <span class="font-medium text-gray-700">{{ item }}</span>
              </div>
            }
          </div>

          <!-- Atendimento e Suporte -->
          <div class="p-8 bg-primary/5 rounded-3xl border border-primary/10">
            <h4 class="font-bold text-primary mb-4 flex items-center gap-2">
              <mat-icon>contact_support</mat-icon>
              Atendimento e Suporte
            </h4>
            <div class="space-y-4">
              <a href="tel:63984367707" class="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                <mat-icon class="text-primary">phone_iphone</mat-icon>
                <span class="font-medium">(63) 98436-7707</span>
              </a>
              <a href="mailto:central.silvanopolis.agenda@gmail.com" class="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                <mat-icon class="text-primary">email</mat-icon>
                <span class="font-medium text-sm">central.silvanopolis.agenda&#64;gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Formulário -->
        <div class="lg:col-span-2 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-black/5 !overflow-visible">
          <h2 class="text-3xl font-bold text-primary mb-10 tracking-tight">Formulário de Pré-Agendamento</h2>
          <p class="text-sm text-gray-500 mb-10 -mt-6">Utilize este formulário para agendamento direto ou solicitação de suporte.</p>
          
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
              <mat-select formControlName="city" [disableOptionCentering]="true" panelClass="agenda-select-panel">
                <mat-option>-- Selecione --</mat-option>
                @for (city of cities(); track city) {
                  <mat-option [value]="city">{{ city }}</mat-option>
                }
              </mat-select>
              <mat-icon matPrefix class="mr-2 text-gray-400">location_city</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Data Desejada</mat-label>
              <mat-select formControlName="date" [disableOptionCentering]="true" panelClass="agenda-select-panel">
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

    ::ng-deep .agenda-select-panel {
      margin-top: 4px !important;
      border-radius: 12px !important;
      overflow-y: auto !important;
      max-height: 250px !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
      background-color: white !important;
      min-width: calc(100% + 32px) !important;
      transform: translateX(-16px) !important;
    }
  `]
})
export class AgendaRecebimentosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);
  private snackBar = inject(MatSnackBar);

  configs = signal<ScheduleDate[]>([]);
  loading = signal(false);
  loadingConfigs = signal(true);

  cities = computed(() => {
    const cities = this.configs()
      .filter(c => c.available)
      .map(c => c.city);
    return [...new Set(cities)].sort();
  });

  availableDates = computed(() => {
    const selectedCity = this.selectedCity();
    if (!selectedCity) return [];
    return this.configs()
      .filter(c => c.available && c.city === selectedCity)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  selectedCity = signal<string>('');

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
    this.loadConfigs();
    
    // Monitorar mudança de cidade para limpar a data e atualizar o signal
    this.form.get('city')?.valueChanges.subscribe(city => {
      this.selectedCity.set(city || '');
      this.form.get('date')?.setValue('');
    });
  }

  loadConfigs() {
    const configCollection = collection(db, 'portal-areia/agendamentos/configuracoes');
    (collectionData<ScheduleDate>(configCollection, { idField: 'id' })).subscribe({
      next: (data) => {
        this.configs.set(data);
        this.loadingConfigs.set(false);
      },
      error: (err) => {
        console.error('Error loading schedule configs:', err);
        this.loadingConfigs.set(false);
      }
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      try {
        const val = this.form.value;
        const selectedDate = val.date;
        const selectedCity = val.city;
        
        // Encontrar a configuração correspondente para pegar o ID
        const config = this.configs().find(c => c.city === selectedCity && c.date === selectedDate);

        const appointmentsCollection = collection(db, 'portal-areia/agendamentos/lista');
        await addDoc(appointmentsCollection, {
          ...val,
          scheduleId: config?.id || '',
          createdAt: serverTimestamp()
        });

        this.snackBar.open('Agendamento realizado com sucesso!', 'Fechar', { 
          duration: 10000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.form.reset();
      } catch (error) {
        console.error('Error creating appointment:', error);
        this.snackBar.open('Erro ao realizar agendamento. Tente novamente.', 'Fechar', { 
          duration: 5000,
          verticalPosition: 'top'
        });
      } finally {
        this.loading.set(false);
      }
    }
  }
}
