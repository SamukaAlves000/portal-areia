import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy, Timestamp, doc, updateDoc } from '@angular/fire/firestore';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  dataEnvio: Timestamp;
  read?: boolean;
  periodo?: string;
}

@Component({
  selector: 'app-view-message-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="p-6 max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-primary">Detalhes da Mensagem</h2>
        <button mat-icon-button (click)="close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="text-xs font-bold uppercase tracking-wider text-gray-400">Remetente</label>
          <p class="text-lg font-medium text-gray-900">{{ data.name }}</p>
          <p class="text-gray-500">{{ data.email }}</p>
        </div>

        <div>
          <label class="text-xs font-bold uppercase tracking-wider text-gray-400">Assunto</label>
          <p class="text-lg font-medium text-gray-900">{{ data.subject }}</p>
        </div>

        <div>
          <label class="text-xs font-bold uppercase tracking-wider text-gray-400">Data de Envio</label>
          <p class="text-gray-700">{{ data.dataEnvio ? (data.dataEnvio.toDate() | date:'dd/MM/yyyy HH:mm') : '-' }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <label class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Mensagem</label>
          <p class="text-gray-700 whitespace-pre-wrap leading-relaxed">{{ data.message }}</p>
        </div>
      </div>

      <div class="mt-8 flex justify-end">
        <button mat-flat-button color="primary" (click)="close()" class="!rounded-xl !px-8">
          FECHAR
        </button>
      </div>
    </div>
  `
})
export class ViewMessageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ContactMessage,
    private dialogRef: MatDialogRef<ViewMessageDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-admin-contatos',
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
      <header>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Mensagens de Contato</h1>
        <p class="text-gray-500">Listagem de todas as mensagens recebidas pelo formulário Fale Conosco.</p>
      </header>

      <div class="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        @if (loading()) {
          <div class="p-20 flex justify-center">
            <mat-spinner diameter="50"></mat-spinner>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table mat-table [dataSource]="dataSource" matSort class="w-full">
              
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let element">
                  @if (!element.read) {
                    <div class="w-2 h-2 bg-primary rounded-full" title="Não lida"></div>
                  }
                </td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Nome </th>
                <td mat-cell *matCellDef="let element" [class.font-bold]="!element.read"> {{element.name}} </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
                <td mat-cell *matCellDef="let element" [class.font-bold]="!element.read"> {{element.email}} </td>
              </ng-container>

              <ng-container matColumnDef="subject">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Assunto </th>
                <td mat-cell *matCellDef="let element" [class.font-bold]="!element.read"> {{element.subject}} </td>
              </ng-container>

              <ng-container matColumnDef="message">
                <th mat-header-cell *matHeaderCellDef> Mensagem </th>
                <td mat-cell *matCellDef="let element" class="max-w-xs truncate" [title]="element.message" [class.font-bold]="!element.read"> 
                  {{element.message}} 
                </td>
              </ng-container>

              <ng-container matColumnDef="dataEnvio">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Data de Envio </th>
                <td mat-cell *matCellDef="let element" [class.font-bold]="!element.read"> 
                  {{ element.dataEnvio ? (element.dataEnvio.toDate() | date:'dd/MM/yyyy HH:mm') : '-' }} 
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-right"> Ações </th>
                <td mat-cell *matCellDef="let element" class="text-right">
                  <button mat-icon-button color="primary" (click)="viewMessage(element)" title="Visualizar mensagem">
                    <mat-icon>visibility</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  (click)="viewMessage(row)"></tr>

              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell p-8 text-center" colspan="7">
                  Nenhuma mensagem encontrada.
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
    .mat-column-message {
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `]
})
export class AdminContatosComponent implements OnInit {
  private firestore = inject(Firestore);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['status', 'name', 'email', 'subject', 'message', 'dataEnvio', 'actions'];
  dataSource = new MatTableDataSource<ContactMessage>([]);
  loading = signal(true);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const contactsCollection = collection(this.firestore, 'portal-areia/fale-conosco/mensagens');
    const q = query(contactsCollection, orderBy('dataEnvio', 'desc'));
    
    (collectionData(q, { idField: 'id' }) as Observable<ContactMessage[]>).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading messages:', err);
        this.loading.set(false);
      }
    });
  }

  async viewMessage(message: ContactMessage) {
    this.dialog.open(ViewMessageDialogComponent, {
      data: message,
      width: '100%',
      maxWidth: '600px',
      panelClass: 'custom-dialog-container'
    });

    if (!message.read && message.id) {
      try {
        const docRef = doc(this.firestore, `portal-areia/fale-conosco/mensagens/${message.id}`);
        await updateDoc(docRef, { read: true });
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }
  }
}
