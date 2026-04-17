import { Component, inject, OnInit, signal, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, query, doc, deleteDoc, addDoc, updateDoc, where, getDocs, Timestamp, orderBy } from 'firebase/firestore';
import { db, collectionData } from '../../../firebase.config';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';
import { ScheduleDate, Appointment } from '../../../models/site.models';

const CITIES = [
  'Porto Nacional', 'Silvanópolis', 'Palmas', 'Monte do Carmo', 'Brejinho de Nazaré',
  'Ipueiras', 'Fátima', 'Oliveira de Fátima', 'Santa Rosa do Tocantins', 'Chapada da Natividade',
  'Natividade', 'Pindorama', 'Ponte Alta do Tocantins', 'Lajeado', 'Tocantínia',
  'Aparecida do Rio Negro', 'Novo Acordo', 'Santa Tereza do Tocantins', 'Paraíso do Tocantins',
  'Divinópolis do Tocantins', 'Pium', 'Marianópolis', 'Caseara', 'Lagoa da Confusão',
  'Cristalândia', 'Dianópolis', 'Taguatinga', 'Arraias', 'Combinado', 'Lavandeira'
];

@Component({
  selector: 'app-schedule-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="p-6 max-w-xl w-full !overflow-visible">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-primary">{{ isEdit ? 'Editar Configuração' : 'Nova Configuração de Data' }}</h2>
        <button mat-icon-button (click)="close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4 !overflow-visible">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Município</mat-label>
          <mat-select formControlName="city" [disableOptionCentering]="true" panelClass="admin-select-panel">
            @for (city of cities; track city) {
              <mat-option [value]="city">{{ city }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Data Desejada</mat-label>
          <input matInput type="date" formControlName="date">
        </mat-form-field>

        <div class="flex items-center gap-4 py-2">
          <mat-slide-toggle formControlName="available" color="primary">
            Liberar Agendamento
          </mat-slide-toggle>
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <button type="button" mat-button (click)="close()" class="!rounded-xl">CANCELAR</button>
          <button type="submit" mat-flat-button color="primary" [disabled]="form.invalid || loading" class="!rounded-xl !px-8">
            {{ loading ? 'SALVANDO...' : 'SALVAR' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    ::ng-deep .admin-select-panel {
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
export class ScheduleEditDialogComponent {
  private fb = inject(FormBuilder);
  
  cities = CITIES;
  form = this.fb.group({
    city: ['', Validators.required],
    date: ['', Validators.required],
    available: [true]
  });

  isEdit = false;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ScheduleDate | null,
    private dialogRef: MatDialogRef<ScheduleEditDialogComponent>
  ) {
    if (data) {
      this.isEdit = true;
      this.form.patchValue(data);
    }
  }

  async save() {
    if (this.form.valid) {
      this.loading = true;
      try {
        const scheduleCollection = collection(db, 'portal-areia/agendamentos/configuracoes');
        const scheduleData = { ...this.form.value };

        if (this.isEdit && this.data?.id) {
          const docRef = doc(db, `portal-areia/agendamentos/configuracoes/${this.data.id}`);
          await updateDoc(docRef, scheduleData);
        } else {
          await addDoc(scheduleCollection, scheduleData);
        }
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error saving schedule config:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-appointments-view-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatProgressSpinnerModule],
  template: `
    <div class="p-6 max-w-4xl w-full min-h-[400px] flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-primary">Agendamentos Vinculados</h2>
          <p class="text-gray-500">{{ data.city }} - {{ data.date | date:'dd/MM/yyyy' }}</p>
        </div>
        <button mat-icon-button (click)="close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="flex-grow overflow-auto">
        <div class="overflow-hidden rounded-2xl border border-gray-100">
          @if (loading) {
            <div class="p-20 flex justify-center">
              <mat-spinner diameter="50"></mat-spinner>
            </div>
          } @else {
            <table mat-table [dataSource]="appointments" class="w-full">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> Nome </th>
                <td mat-cell *matCellDef="let element"> {{element.name}} </td>
              </ng-container>

              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef> Telefone </th>
                <td mat-cell *matCellDef="let element"> {{element.phone}} </td>
              </ng-container>

              <ng-container matColumnDef="document">
                <th mat-header-cell *matHeaderCellDef> CPF/CNPJ </th>
                <td mat-cell *matCellDef="let element"> {{element.document}} </td>
              </ng-container>

              <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef> Qtd. Embalagens </th>
                <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="['name', 'phone', 'document', 'quantity']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['name', 'phone', 'document', 'quantity'];"></tr>

              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell p-8 text-center" colspan="4">
                  Nenhum agendamento realizado para esta data.
                </td>
              </tr>
            </table>
          }
        </div>
      </div>

      <div class="mt-8 flex justify-end shrink-0">
        <button mat-flat-button color="primary" (click)="close()" class="!rounded-xl !px-8">
          FECHAR
        </button>
      </div>
    </div>
  `
})
export class AppointmentsViewDialogComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  private cdr = inject(ChangeDetectorRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ScheduleDate,
    private dialogRef: MatDialogRef<AppointmentsViewDialogComponent>
  ) {}

  async ngOnInit() {
    try {
      const appointmentsCollection = collection(db, 'portal-areia/agendamentos/lista');
      const q = query(appointmentsCollection, where('scheduleId', '==', this.data.id));
      const snapshot = await getDocs(q);
      this.appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-admin-agendamentos',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule
  ],
  template: `
    <div class="space-y-6 animate-fade-in">
      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Controle de Agendamentos</h1>
          <p class="text-gray-500">Defina os municípios e datas disponíveis para pré-agendamento.</p>
        </div>
        <button mat-flat-button color="primary" (click)="addConfig()" class="!rounded-2xl !py-6">
          <mat-icon>add</mat-icon> NOVA CONFIGURAÇÃO
        </button>
      </header>

      <div class="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        @if (loading()) {
          <div class="p-20 flex justify-center">
            <mat-spinner diameter="50"></mat-spinner>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table mat-table [dataSource]="dataSource" matSort class="w-full">
              
              <ng-container matColumnDef="city">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Município </th>
                <td mat-cell *matCellDef="let element" class="font-medium"> {{element.city}} </td>
              </ng-container>

              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Data </th>
                <td mat-cell *matCellDef="let element"> {{element.date | date:'dd/MM/yyyy'}} </td>
              </ng-container>

              <ng-container matColumnDef="available">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let element">
                  @if (element.available) {
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Liberado</span>
                  } @else {
                    <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">Bloqueado</span>
                  }
                </td>
              </ng-container>

              <ng-container matColumnDef="count">
                <th mat-header-cell *matHeaderCellDef> Agendamentos </th>
                <td mat-cell *matCellDef="let element">
                  <span class="inline-flex items-center justify-center bg-primary/10 text-primary font-bold rounded-lg px-3 py-1 min-w-[30px]">
                    {{ element.occupied || 0 }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-right"> Ações </th>
                <td mat-cell *matCellDef="let element" class="text-right">
                  <div class="flex justify-end gap-2">
                    <button mat-icon-button color="primary" (click)="viewAppointments(element)" title="Ver agendamentos">
                      <mat-icon>group</mat-icon>
                    </button>
                    <button mat-icon-button color="primary" (click)="editConfig(element)" title="Editar configuração">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteConfig(element)" title="Excluir configuração">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  class="hover:bg-gray-50 transition-colors"></tr>

              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell p-8 text-center" colspan="5">
                  Nenhuma configuração de agendamento encontrada.
                </td>
              </tr>
            </table>
          </div>

          <mat-paginator [pageSizeOptions]="[10, 20, 50]" showFirstLastButtons class="!rounded-b-3xl"></mat-paginator>
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class AdminAgendamentosComponent implements OnInit {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['city', 'date', 'available', 'count', 'actions'];
  dataSource = new MatTableDataSource<ScheduleDate>([]);
  loading = signal(true);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const configCollection = collection(db, 'portal-areia/agendamentos/configuracoes');
    const appointmentsCollection = collection(db, 'portal-areia/agendamentos/lista');
    
    const configs$ = collectionData<ScheduleDate>(configCollection, { idField: 'id' });
    const appointments$ = collectionData<Appointment>(appointmentsCollection);

    combineLatest([configs$, appointments$]).pipe(
      map(([configs, appointments]) => {
        return configs.map(config => {
          const count = appointments.filter(a => a.scheduleId === config.id).length;
          return { ...config, occupied: count };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
    ).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading scheduling data:', err);
        this.loading.set(false);
      }
    });
  }

  addConfig() {
    const dialogRef = this.dialog.open(ScheduleEditDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Data saved
      }
    });
  }

  editConfig(config: ScheduleDate) {
    const dialogRef = this.dialog.open(ScheduleEditDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      data: config
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Data updated
      }
    });
  }

  viewAppointments(config: ScheduleDate) {
    this.dialog.open(AppointmentsViewDialogComponent, {
      width: '100%',
      maxWidth: '800px',
      data: config
    });
  }

  async deleteConfig(config: ScheduleDate) {
    if (confirm(`Tem certeza que deseja excluir esta configuração para ${config.city} em ${config.date}?`)) {
      try {
        const docRef = doc(db, `portal-areia/agendamentos/configuracoes/${config.id}`);
        await deleteDoc(docRef);
      } catch (error) {
        console.error('Error deleting schedule config:', error);
      }
    }
  }
}
