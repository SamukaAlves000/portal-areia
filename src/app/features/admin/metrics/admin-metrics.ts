import { Component, inject, OnInit, signal, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, query, orderBy, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Metric } from '../../../models/site.models';

@Component({
  selector: 'app-metric-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="p-6 max-w-xl w-full">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-primary">{{ isEdit ? 'Editar Métrica' : 'Nova Métrica' }}</h2>
        <button mat-icon-button (click)="close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Rótulo (Label)</mat-label>
          <input matInput formControlName="label" placeholder="Ex: Embalagens Recebidas">
        </mat-form-field>

        <div class="grid grid-cols-2 gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Valor</mat-label>
            <input matInput type="number" formControlName="value" placeholder="Ex: 4500">
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Unidade</mat-label>
            <input matInput formControlName="unit" placeholder="Ex: toneladas">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Ícone (Emoji ou Material Icon name)</mat-label>
          <input matInput formControlName="icon" placeholder="Ex: 📦 ou recycling">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Ordem de Exibição</mat-label>
          <input matInput type="number" formControlName="order" placeholder="Ex: 1">
        </mat-form-field>

        <div class="mt-8 flex justify-end gap-3">
          <button type="button" mat-button (click)="close()" class="!rounded-xl">CANCELAR</button>
          <button type="submit" mat-flat-button color="primary" [disabled]="form.invalid || loading" class="!rounded-xl !px-8">
            {{ loading ? 'SALVANDO...' : 'SALVAR' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class MetricEditDialogComponent {
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    label: ['', Validators.required],
    value: [0, [Validators.required]],
    unit: ['', Validators.required],
    icon: ['', Validators.required],
    order: [0, [Validators.required, Validators.min(0)]]
  });

  isEdit = false;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Metric | null,
    private dialogRef: MatDialogRef<MetricEditDialogComponent>
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
        const metricsCollection = collection(db, 'portal-areia/embalometro/metricas');
        const metricData = { 
          ...this.form.value,
          updatedAt: serverTimestamp()
        };

        if (this.isEdit && this.data?.id) {
          const docRef = doc(db, `portal-areia/embalometro/metricas/${this.data.id}`);
          await updateDoc(docRef, metricData);
        } else {
          await addDoc(metricsCollection, metricData);
        }
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error saving metric:', error);
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
  selector: 'app-admin-metrics',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  template: `
    <div class="space-y-6 animate-fade-in">
      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Gerenciar Embalômetro</h1>
          <p class="text-gray-500">Cadastre e atualize as métricas de impacto ambiental exibidas no site.</p>
        </div>
        <button mat-flat-button color="primary" (click)="addMetric()" class="!rounded-2xl !py-6">
          <mat-icon>add</mat-icon> NOVA MÉTRICA
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
              
              <ng-container matColumnDef="icon">
                <th mat-header-cell *matHeaderCellDef> Ícone </th>
                <td mat-cell *matCellDef="let element">
                  <span class="text-2xl">{{ element.icon }}</span>
                </td>
              </ng-container>

              <ng-container matColumnDef="label">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Rótulo </th>
                <td mat-cell *matCellDef="let element" class="font-medium"> {{element.label}} </td>
              </ng-container>

              <ng-container matColumnDef="value">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Valor </th>
                <td mat-cell *matCellDef="let element"> {{element.value}} {{element.unit}} </td>
              </ng-container>

              <ng-container matColumnDef="order">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Ordem </th>
                <td mat-cell *matCellDef="let element"> {{element.order}} </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-right"> Ações </th>
                <td mat-cell *matCellDef="let element" class="text-right">
                  <div class="flex justify-end gap-2">
                    <button mat-icon-button color="primary" (click)="editMetric(element)" title="Editar">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteMetric(element)" title="Excluir">
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
                  Nenhuma métrica encontrada.
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
export class AdminMetricsComponent implements OnInit {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['icon', 'label', 'value', 'order', 'actions'];
  dataSource = new MatTableDataSource<Metric>([]);
  loading = signal(true);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const metricsCollection = collection(db, 'portal-areia/embalometro/metricas');
    const q = query(metricsCollection, orderBy('order', 'asc'));
    
    (collectionData(q, { idField: 'id' }) as Observable<Metric[]>).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading metrics:', err);
        this.loading.set(false);
      }
    });
  }

  addMetric() {
    const dialogRef = this.dialog.open(MetricEditDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh handled by subscription
      }
    });
  }

  editMetric(metric: Metric) {
    const dialogRef = this.dialog.open(MetricEditDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      data: metric
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh handled by subscription
      }
    });
  }

  async deleteMetric(metric: Metric) {
    if (confirm(`Tem certeza que deseja excluir a métrica "${metric.label}"?`)) {
      try {
        const docRef = doc(db, `portal-areia/embalometro/metricas/${metric.id}`);
        await deleteDoc(docRef);
      } catch (error) {
        console.error('Error deleting metric:', error);
      }
    }
  }
}
