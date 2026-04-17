export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  published: boolean;
}

export interface Metric {
  id?: string;
  label: string;
  value: number;
  unit: string;
  icon: string;
  order?: number;
}

export interface ScheduleDate {
  id?: string;
  city: string;
  date: string;
  available: boolean;
  capacity?: number;
  occupied?: number;
}

export interface ItinerantSchedule {
  id: string;
  city: string;
  location: string;
  date: string;
  time: string;
}

export interface ReceiptValidation {
  code: string;
  date: string;
  location: string;
  quantity: number;
  status: 'valid' | 'invalid' | 'pending';
  producerName: string;
}

export interface Appointment {
  id?: string;
  scheduleId?: string;
  name: string;
  document: string;
  phone: string;
  city: string;
  quantity: number;
  date: string;
  createdAt?: any;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title?: string;
  order: number;
  createdAt: any;
}
