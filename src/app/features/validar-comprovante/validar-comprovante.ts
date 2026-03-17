import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { ReceiptValidation } from '../../models/site.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-validar-comprovante',
  imports: [
    CommonModule, 
    SectionComponent, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="bg-primary py-24 text-white relative overflow-hidden">
      <div class="container relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">Validar Comprovante</h1>
        <p class="text-xl text-white/70 max-w-2xl font-light animate-fade-in delay-200">Verifique a autenticidade dos documentos emitidos pela AREIA.</p>
      </div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/10 to-transparent"></div>
    </div>

    <app-section>
      <div class="max-w-4xl mx-auto">
        <div class="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-black/5 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full"></div>
          
          <div class="relative z-10">
            <h2 class="text-3xl font-bold text-primary mb-4 tracking-tight">Consulta de Autenticidade</h2>
            <p class="text-gray-500 mb-12 text-lg">Insira o código de validação impresso no seu comprovante de devolução.</p>
            
            <form [formGroup]="form" (ngSubmit)="(onValidate())" class="flex flex-col md:flex-row gap-6">
              <mat-form-field appearance="outline" class="flex-grow">
                <mat-label>Código de Validação</mat-label>
                <input matInput formControlName="code" placeholder="Ex: AREIA-2024-XXXX" class="uppercase">
                <mat-icon matPrefix class="mr-2 text-gray-400">qr_code_scanner</mat-icon>
                @if (form.get('code')?.invalid && form.get('code')?.touched) {
                  <mat-error>Código é obrigatório</mat-error>
                }
              </mat-form-field>
              
              <button mat-flat-button type="submit" 
                      class="!py-8 !px-12 !text-lg !bg-primary !text-white !rounded-2xl hover:!bg-primary-light transition-all shadow-lg hover:shadow-primary/20"
                      [disabled]="form.invalid || loading()">
                <div class="flex items-center justify-center gap-3">
                  @if (loading()) {
                    <mat-icon class="animate-spin">sync</mat-icon>
                    <span>VALIDANDO...</span>
                  } @else {
                    <mat-icon>search</mat-icon>
                    <span>CONSULTAR</span>
                  }
                </div>
              </button>
            </form>

            @if (result()) {
              <div class="mt-16 p-10 rounded-3xl border-2 animate-fade-in border-green-100 bg-green-50/50">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div class="w-24 h-24 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-green-500 text-white">
                    <mat-icon class="!text-5xl">verified</mat-icon>
                  </div>
                  
                  <div class="text-center md:text-left flex-grow">
                    <h3 class="text-3xl font-bold mb-3 text-green-800">Comprovante Válido</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div class="bg-white/60 p-4 rounded-2xl border border-green-100">
                        <p class="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-1">PRODUTOR</p>
                        <p class="text-primary font-bold">{{ result()?.producerName }}</p>
                      </div>
                      <div class="bg-white/60 p-4 rounded-2xl border border-green-100">
                        <p class="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-1">DATA DE EMISSÃO</p>
                        <p class="text-primary font-bold">{{ result()?.date | date:'dd/MM/yyyy' }}</p>
                      </div>
                      <div class="bg-white/60 p-4 rounded-2xl border border-green-100">
                        <p class="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-1">QUANTIDADE</p>
                        <p class="text-primary font-bold">{{ result()?.quantity }} embalagens</p>
                      </div>
                      <div class="bg-white/60 p-4 rounded-2xl border border-green-100">
                        <p class="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-1">LOCAL</p>
                        <p class="text-primary font-bold">{{ result()?.location }}</p>
                      </div>
                    </div>
                    <div class="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                      <button mat-stroked-button class="!rounded-full !px-8 !py-6 !border-green-200 !text-green-700 hover:!bg-green-100">
                        <mat-icon class="mr-2">file_download</mat-icon> BAIXAR PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            } @else if (searched() && !loading()) {
              <div class="mt-16 p-10 rounded-3xl border-2 animate-fade-in border-red-100 bg-red-50/50">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div class="w-24 h-24 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-red-500 text-white">
                    <mat-icon class="!text-5xl">error</mat-icon>
                  </div>
                  <div class="text-center md:text-left flex-grow">
                    <h3 class="text-3xl font-bold mb-3 text-red-800">Comprovante não encontrado</h3>
                    <p class="text-red-700 text-lg mb-6">O código informado não corresponde a nenhum documento oficial em nossa base de dados. Verifique o código e tente novamente.</p>
                  </div>
                </div>
              </div>
            }
          </div>
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
  `]
})

export class ValidarComprovanteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private seoService = inject(SeoService);

  form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(5)]]
  });

  loading = signal(false);
  searched = signal(false);
  result = signal<ReceiptValidation | undefined>(undefined);

  ngOnInit() {
    this.seoService.updateMeta('Validar Comprovante', 'Verifique a autenticidade do seu comprovante de devolução da AREIA.');
  }

  onValidate() {
    if (this.form.valid) {
      this.loading.set(true);
      this.searched.set(false);
      this.result.set(undefined);
      
      this.dataService.validateReceipt(this.form.value.code!).subscribe(res => {
        this.result.set(res);
        this.loading.set(false);
        this.searched.set(true);
      });
    }
  }
}
