import { Component, inject, OnInit, signal, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy, doc, deleteDoc, addDoc, updateDoc, Timestamp } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { News } from '../../../models/site.models';

@Component({
  selector: 'app-news-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="flex flex-col h-[90vh] max-h-[800px] w-full max-w-3xl overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
        <h2 class="text-2xl font-bold text-primary">{{ isEdit ? 'Editar Notícia' : 'Nova Notícia' }}</h2>
        <button mat-icon-button (click)="close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="flex-grow overflow-y-auto p-6">
        <form [formGroup]="form" id="newsForm" (ngSubmit)="save()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <mat-form-field appearance="outline" class="w-full md:col-span-2">
              <mat-label>Título</mat-label>
              <input matInput formControlName="title" placeholder="Título da notícia">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full md:col-span-2">
              <mat-label>Resumo</mat-label>
              <textarea matInput formControlName="summary" rows="2" placeholder="Breve resumo para a listagem"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full md:col-span-2">
              <mat-label>Conteúdo</mat-label>
              <textarea matInput formControlName="content" rows="6" placeholder="Conteúdo completo da notícia"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Data</mat-label>
              <input matInput type="date" formControlName="date">
            </mat-form-field>

            <div class="md:col-span-2">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-gray-700">Imagem da Notícia</label>
                
                <div class="flex gap-4 items-center">
                  <div class="flex-grow">
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>URL da Imagem</mat-label>
                      <input matInput formControlName="imageUrl" placeholder="https://exemplo.com/imagem.jpg">
                      <mat-hint>Cole um link ou use o botão de upload ao lado</mat-hint>
                    </mat-form-field>
                  </div>

                  <div class="flex flex-col items-center">
                    <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" class="hidden">
                    <button type="button" mat-raised-button color="primary" (click)="fileInput.click()" [disabled]="uploading" class="!rounded-xl h-[56px] min-w-[120px]">
                      <mat-icon class="mr-2">{{ uploading ? 'sync' : 'cloud_upload' }}</mat-icon>
                      {{ uploading ? 'ENVIANDO...' : 'UPLOAD' }}
                    </button>
                  </div>
                </div>

                @if (form.get('imageUrl')?.value) {
                  <div class="mt-2 relative w-full aspect-video max-h-48 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img [src]="form.get('imageUrl')?.value" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button type="button" mat-mini-fab color="warn" (click)="form.get('imageUrl')?.setValue('')">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="flex items-center gap-4 py-2">
              <mat-slide-toggle formControlName="published" color="primary">
                Exibir no site
              </mat-slide-toggle>
            </div>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
        <button type="button" mat-button (click)="close()" class="!rounded-xl">CANCELAR</button>
        <button type="submit" form="newsForm" mat-flat-button color="primary" [disabled]="form.invalid || loading" class="!rounded-xl !px-8">
          {{ loading ? 'SALVANDO...' : 'SALVAR NOTÍCIA' }}
        </button>
      </div>
    </div>
  `
})
export class NewsEditDialogComponent {
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  
  form = this.fb.group({
    title: ['', Validators.required],
    summary: ['', Validators.required],
    content: ['', Validators.required],
    date: ['', Validators.required],
    imageUrl: ['', Validators.required],
    published: [true]
  });

  isEdit = false;
  loading = false;
  uploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: News | null,
    private dialogRef: MatDialogRef<NewsEditDialogComponent>
  ) {
    if (data) {
      this.isEdit = true;
      this.form.patchValue(data);
    } else {
      // Set today's date as default
      const today = new Date().toISOString().split('T')[0];
      this.form.patchValue({ date: today });
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploading = true;
      try {
        const filePath = `portal-areia/noticias/${Date.now()}_${file.name}`;
        const storageRef = ref(this.storage, filePath);
        
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        
        this.form.patchValue({ imageUrl: downloadURL });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Erro ao fazer upload da imagem. Tente novamente.');
      } finally {
        this.uploading = false;
        // Reset the input value to allow selecting the same file again if needed
        event.target.value = '';
      }
    }
  }

  async save() {
    if (this.form.valid) {
      this.loading = true;
      try {
        const newsCollection = collection(this.firestore, 'portal-areia/noticias/lista');
        const newsData = { ...this.form.value };

        if (this.isEdit && this.data?.id) {
          const docRef = doc(this.firestore, `portal-areia/noticias/lista/${this.data.id}`);
          await updateDoc(docRef, newsData);
        } else {
          await addDoc(newsCollection, newsData);
        }
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error saving news:', error);
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
  selector: 'app-admin-noticias',
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
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Gestão de Notícias</h1>
          <p class="text-gray-500">Crie, edite e gerencie as notícias exibidas no portal.</p>
        </div>
        <button mat-flat-button color="primary" (click)="addNews()" class="!rounded-2xl !py-6">
          <mat-icon>add</mat-icon> NOVA NOTÍCIA
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
              
              <ng-container matColumnDef="image">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let element">
                  <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 my-2">
                    <img [src]="element.imageUrl" [alt]="element.title" class="w-full h-full object-cover">
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Título </th>
                <td mat-cell *matCellDef="let element" class="font-medium"> {{element.title}} </td>
              </ng-container>

              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Data </th>
                <td mat-cell *matCellDef="let element"> {{element.date | date:'dd/MM/yyyy'}} </td>
              </ng-container>

              <ng-container matColumnDef="published">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let element">
                  @if (element.published) {
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Publicado</span>
                  } @else {
                    <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">Rascunho</span>
                  }
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-right"> Ações </th>
                <td mat-cell *matCellDef="let element" class="text-right">
                  <div class="flex justify-end gap-2">
                    <button mat-icon-button color="primary" (click)="editNews(element); $event.stopPropagation()" title="Editar notícia">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteNews(element); $event.stopPropagation()" title="Excluir notícia">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  (click)="editNews(row)"></tr>

              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell p-8 text-center" colspan="5">
                  Nenhuma notícia encontrada.
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
    .mat-column-title {
      max-width: 400px;
    }
  `]
})
export class AdminNoticiasComponent implements OnInit {
  private firestore = inject(Firestore);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['image', 'title', 'date', 'published', 'actions'];
  dataSource = new MatTableDataSource<News>([]);
  loading = signal(true);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    const newsCollection = collection(this.firestore, 'portal-areia/noticias/lista');
    // Removendo orderBy do query do Firestore para evitar erro de índice composto
    // A ordenação será feita no cliente pelo MatSort ou manualmente se necessário
    const q = query(newsCollection);
    
    (collectionData(q, { idField: 'id' }) as Observable<News[]>).subscribe({
      next: (data) => {
        // Ordenação manual inicial por data descrescente
        const sortedData = [...data].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.dataSource.data = sortedData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading news:', err);
        this.loading.set(false);
      }
    });
  }

  addNews() {
    const dialogRef = this.dialog.open(NewsEditDialogComponent, {
      width: '100%',
      maxWidth: '800px',
        height: '80%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // News saved
      }
    });
  }

  editNews(news: News) {
    const dialogRef = this.dialog.open(NewsEditDialogComponent, {
      width: '100%',
      maxWidth: '800px',
        height: '80%',
      data: news
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // News updated
      }
    });
  }

  async deleteNews(news: News) {
    if (confirm(`Tem certeza que deseja excluir a notícia "${news.title}"?`)) {
      try {
        const docRef = doc(this.firestore, `portal-areia/noticias/lista/${news.id}`);
        await deleteDoc(docRef);
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  }
}
