import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../shared/components/section';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import { ItinerantSchedule } from '../../models/site.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-agenda-itinerante',
  imports: [CommonModule, SectionComponent, MatIconModule, MatTableModule],
  template: `
    <div class="bg-primary py-20 text-white">
      <div class="container">
        <h1 class="text-5xl font-bold mb-4">Agenda Itinerante</h1>
        <p class="text-xl text-white/80 max-w-2xl">Levamos o recebimento até você. Confira as datas nos municípios da região.</p>
      </div>
    </div>

    <app-section title="Próximos Recebimentos" subtitle="Fique atento às datas e locais de coleta no seu município.">
      <div class="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
        <table mat-table [dataSource]="schedule()" class="w-full">
          
          <ng-container matColumnDef="city">
            <th mat-header-cell *matHeaderCellDef class="!bg-surface !font-bold !text-primary"> Município </th>
            <td mat-cell *matCellDef="let item" class="!py-6"> 
              <div class="flex items-center gap-3">
                <mat-icon class="text-primary-light">location_city</mat-icon>
                <span class="font-bold">{{ item.city }}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="location">
            <th mat-header-cell *matHeaderCellDef class="!bg-surface !font-bold !text-primary"> Local </th>
            <td mat-cell *matCellDef="let item" class="text-gray-600"> {{ item.location }} </td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef class="!bg-surface !font-bold !text-primary"> Data </th>
            <td mat-cell *matCellDef="let item" class="font-semibold"> {{ item.date | date:'dd/MM/yyyy' }} </td>
          </ng-container>

          <ng-container matColumnDef="time">
            <th mat-header-cell *matHeaderCellDef class="!bg-surface !font-bold !text-primary"> Horário </th>
            <td mat-cell *matCellDef="let item" class="text-gray-500"> {{ item.time }} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-surface/50 transition-colors"></tr>
        </table>

        @if (schedule().length === 0) {
          <div class="p-20 text-center text-gray-400">
            <mat-icon class="!text-5xl mb-4">event_busy</mat-icon>
            <p>Nenhum recebimento itinerante agendado para os próximos dias.</p>
          </div>
        }
      </div>
    </app-section>

    <app-section bgClass="bg-beige/20" title="Como funciona o Itinerante?">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 bg-white rounded-2xl shadow-sm">
          <h4 class="font-bold text-primary mb-4">1. Divulgação</h4>
          <p class="text-sm text-gray-600">A AREIA e a Prefeitura local divulgam as datas com antecedência via rádio, redes sociais e carros de som.</p>
        </div>
        <div class="p-8 bg-white rounded-2xl shadow-sm">
          <h4 class="font-bold text-primary mb-4">2. Preparação</h4>
          <p class="text-sm text-gray-600">O produtor deve levar as embalagens já lavadas, furadas e separadas por tipo (plásticas, metálicas, tampas).</p>
        </div>
        <div class="p-8 bg-white rounded-2xl shadow-sm">
          <h4 class="font-bold text-primary mb-4">3. Comprovante</h4>
          <p class="text-sm text-gray-600">No ato da entrega, nossa equipe emite o comprovante oficial de devolução, válido para fiscalização.</p>
        </div>
      </div>
    </app-section>
  `
})
export class AgendaItineranteComponent implements OnInit {
  private dataService = inject(DataService);
  private seoService = inject(SeoService);

  schedule = signal<ItinerantSchedule[]>([]);
  displayedColumns: string[] = ['city', 'location', 'date', 'time'];

  ngOnInit() {
    this.seoService.updateMeta('Agenda Itinerante', 'Confira as datas de recebimento itinerante nos municípios da região.');
    this.dataService.getItinerantSchedule().subscribe(data => this.schedule.set(data));
  }
}
