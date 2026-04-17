import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { News, Metric, ScheduleDate, ItinerantSchedule, ReceiptValidation, Appointment } from '../models/site.models';
import { MOCK_NEWS, MOCK_METRICS, MOCK_SCHEDULE_DATES, MOCK_ITINERANT, MOCK_VALIDATIONS } from '../mock-data/site.data';
import { collection, query, orderBy } from 'firebase/firestore';
import { db, collectionData } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private appointments = signal<Appointment[]>([]);

  getNews(): Observable<News[]> {
    return of(MOCK_NEWS).pipe(delay(500));
  }

  getNewsById(id: string): Observable<News | undefined> {
    return of(MOCK_NEWS.find(n => n.id === id)).pipe(delay(300));
  }

  getMetrics(): Observable<Metric[]> {
    const metricsCollection = collection(db, 'portal-areia/embalometro/metricas');
    const q = query(metricsCollection, orderBy('order', 'asc'));
    return collectionData<Metric>(q, { idField: 'id' });
  }

  getScheduleDates(): Observable<ScheduleDate[]> {
    return of(MOCK_SCHEDULE_DATES).pipe(delay(400));
  }

  getItinerantSchedule(): Observable<ItinerantSchedule[]> {
    return of(MOCK_ITINERANT).pipe(delay(500));
  }

  validateReceipt(code: string): Observable<ReceiptValidation | undefined> {
    return of(MOCK_VALIDATIONS.find(v => v.code === code)).pipe(delay(800));
  }

  createAppointment(appointment: Appointment): Observable<boolean> {
    this.appointments.update(prev => [...prev, appointment]);
    console.log('Appointment created:', appointment);
    return of(true).pipe(delay(1000));
  }
}
