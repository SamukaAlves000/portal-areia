import { Component, inject, OnInit, signal, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, query, orderBy, doc, deleteDoc, addDoc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, collectionData } from '../../../firebase.config';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GalleryItem } from '../../../models/site.models';

@Component({
  selector: 'app-gallery-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `
    <div class="flex flex-col max-h-[90vh] h-[800px] w-full max-w-2xl overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
        <h2 class="text-2xl font-bold text-primary">{{ isEdit ? 'Editar Foto' : 'Novas Fotos' }}</h2>
        <button mat-icon-button (click)="close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="flex-grow overflow-y-auto p-6">
        <form [formGroup]="form" id="galleryForm" (ngSubmit)="save()" class="space-y-6">
          <div class="flex flex-col gap-6">
            @if (!isEdit) {
              <div class="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative" (click)="fileInput.click()">
                <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" class="hidden" multiple>
                <mat-icon class="text-gray-400 !text-5xl mb-4">add_photo_alternate</mat-icon>
                <p class="text-gray-500 font-medium">Clique para selecionar uma ou mais fotos</p>
                <p class="text-xs text-gray-400 mt-1">PNG, JPG ou WEBP</p>
              </div>

              @if (uploadedImages().length > 0) {
                <div class="grid grid-cols-2 gap-4">
                  @for (img of uploadedImages(); track img.url; let i = $index) {
                    <div class="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm group">
                      <div class="aspect-video bg-gray-50 rounded-xl overflow-hidden mb-3 relative flex items-center justify-center border border-gray-100">
                        <img [src]="img.url" class="max-w-full max-h-full object-contain">
                        <button type="button" mat-mini-fab color="warn" (click)="removeImage(i)" class="!absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity !w-8 !h-8 !min-h-0">
                          <mat-icon class="!text-sm">delete</mat-icon>
                        </button>
                      </div>
                      <mat-form-field appearance="outline" class="w-full !text-xs" dense>
                        <mat-label>Título (Opcional)</mat-label>
                        <input matInput [(ngModel)]="img.title" [ngModelOptions]="{standalone: true}" placeholder="Título desta foto">
                      </mat-form-field>
                    </div>
                  }
                </div>
              }
            } @else {
              <!-- Modo Edição de Item Único -->
              <div class="aspect-video bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 relative flex items-center justify-center">
                 <img [src]="form.get('imageUrl')?.value" class="max-w-full max-h-full object-contain">
                 <div class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" (click)="fileInput.click()">
                    <mat-icon class="text-white !text-4xl">cloud_upload</mat-icon>
                    <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" class="hidden">
                 </div>
              </div>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Título (Opcional)</mat-label>
                <input matInput formControlName="title" placeholder="Ex: Galpão de Triagem">
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Ordem de Exibição</mat-label>
                <input matInput type="number" formControlName="order" placeholder="Ex: 1">
                <mat-hint>Números menores aparecem primeiro</mat-hint>
              </mat-form-field>
            }
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
        <button type="button" mat-button (click)="close()" class="!rounded-xl">CANCELAR</button>
        <button type="submit" form="galleryForm" mat-flat-button color="primary" [disabled]="(isEdit ? form.invalid : uploadedImages().length === 0) || loading || uploading" class="!rounded-xl !px-8">
          {{ loading ? 'SALVANDO...' : (isEdit ? 'SALVAR ALTERAÇÕES' : 'SALVAR TODAS AS FOTOS') }}
        </button>
      </div>
    </div>
  `
})
export class GalleryEditDialogComponent {
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    imageUrl: ['', Validators.required],
    title: [''],
    order: [0, [Validators.required, Validators.min(0)]]
  });

  isEdit = false;
  loading = false;
  uploading = false;
  
  uploadedImages = signal<{url: string, title: string}[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GalleryItem | null,
    private dialogRef: MatDialogRef<GalleryEditDialogComponent>
  ) {
    if (data) {
      this.isEdit = true;
      this.form.patchValue(data);
    }
  }

  async onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploading = true;
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const filePath = `portal-areia/galeria/unidade/${Date.now()}_${file.name}`;
          const storageRef = ref(storage, filePath);
          
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          
          if (this.isEdit) {
            this.form.patchValue({ imageUrl: downloadURL });
          } else {
            this.uploadedImages.update(imgs => [...imgs, { url: downloadURL, title: '' }]);
          }
        }
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Erro ao fazer upload de uma ou mais imagens. Tente novamente.');
      } finally {
        this.uploading = false;
        event.target.value = '';
      }
    }
  }

  removeImage(index: number) {
    this.uploadedImages.update(imgs => imgs.filter((_, i) => i !== index));
  }

  async save() {
    if (this.isEdit && this.form.valid) {
      this.loading = true;
      try {
        const itemData = { 
          ...this.form.value,
          createdAt: this.data?.createdAt || serverTimestamp()
        };
        const docRef = doc(db, `portal-areia/galeria/unidade/${this.data!.id}`);
        await updateDoc(docRef, itemData);
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error updating gallery item:', error);
      } finally {
        this.loading = false;
      }
    } else if (!this.isEdit && this.uploadedImages().length > 0) {
      this.loading = true;
      try {
        const galleryCollection = collection(db, 'portal-areia/galeria/unidade');
        
        // Salvar cada imagem como um novo documento
        for (const img of this.uploadedImages()) {
          await addDoc(galleryCollection, {
            imageUrl: img.url,
            title: img.title || '',
            order: 0, // Ordem padrão para novas imagens
            createdAt: serverTimestamp()
          });
        }
        
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error saving gallery items:', error);
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
  selector: 'app-admin-galeria',
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
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Galeria da Unidade</h1>
          <p class="text-gray-500">Gerencie as fotos exibidas na página da Central de Recebimento.</p>
        </div>
        <button mat-flat-button color="primary" (click)="addItem()" class="!rounded-2xl !py-6">
          <mat-icon>add_a_photo</mat-icon> ADICIONAR FOTO
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
                <th mat-header-cell *matHeaderCellDef> Miniatura </th>
                <td mat-cell *matCellDef="let element">
                  <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 my-3 flex items-center justify-center border border-gray-100">
                    <img [src]="element.imageUrl" [alt]="element.title" class="max-w-full max-h-full object-contain">
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Título </th>
                <td mat-cell *matCellDef="let element" class="font-medium"> {{element.title || '-'}} </td>
              </ng-container>

              <ng-container matColumnDef="order">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Ordem </th>
                <td mat-cell *matCellDef="let element"> {{element.order}} </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-right"> Ações </th>
                <td mat-cell *matCellDef="let element" class="text-right">
                  <div class="flex justify-end gap-2">
                    <button mat-icon-button color="primary" (click)="editItem(element); $event.stopPropagation()" title="Editar">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteItem(element); $event.stopPropagation()" title="Excluir">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  (click)="editItem(row)"></tr>

              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell p-8 text-center" colspan="4">
                  Nenhuma foto encontrada na galeria.
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
export class AdminGaleriaComponent implements OnInit {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['image', 'title', 'order', 'actions'];
  dataSource = new MatTableDataSource<GalleryItem>([]);
  loading = signal(true);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    const galleryCollection = collection(db, 'portal-areia/galeria/unidade');
    const q = query(galleryCollection, orderBy('order', 'asc'));
    
    (collectionData(q, { idField: 'id' }) as Observable<GalleryItem[]>).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading gallery items:', err);
        this.loading.set(false);
      }
    });
  }

  addItem() {
    const dialogRef = this.dialog.open(GalleryEditDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh handled by Firestore subscription
      }
    });
  }

  editItem(item: GalleryItem) {
    const dialogRef = this.dialog.open(GalleryEditDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh handled by Firestore subscription
      }
    });
  }

  async deleteItem(item: GalleryItem) {
    if (confirm('Tem certeza que deseja excluir esta foto da galeria?')) {
      try {
        const docRef = doc(db, `portal-areia/galeria/unidade/${item.id}`);
        await deleteDoc(docRef);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  }
}
