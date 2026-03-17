import { News, Metric, ScheduleDate, ItinerantSchedule, ReceiptValidation } from '../models/site.models';

export const MOCK_NEWS: News[] = [
  {
    id: '1',
    title: 'AREIA inicia campanha de recebimento itinerante 2026',
    summary: 'Ação visa facilitar a devolução de embalagens para pequenos produtores da região de Porto Nacional.',
    content: 'A AREIA, em parceria com as prefeituras locais, inicia na próxima semana o cronograma de recebimento itinerante...',
    date: '2026-03-05',
    imageUrl: 'https://picsum.photos/seed/agro1/800/600'
  },
  {
    id: '2',
    title: 'Recorde de devolução: Embalômetro atinge marca histórica',
    summary: 'Graças ao engajamento dos produtores, superamos a meta de destinação correta no primeiro trimestre.',
    content: 'O sistema Campo Limpo na região de Silvanópolis demonstrou uma eficiência sem precedentes...',
    date: '2026-02-28',
    imageUrl: 'https://picsum.photos/seed/agro2/800/600'
  },
  {
    id: '3',
    title: 'Educação Ambiental nas escolas de Silvanópolis',
    summary: 'Projeto "Pequeno Guardião do Campo" leva conscientização sobre logística reversa para crianças.',
    content: 'Mais de 500 alunos participaram das palestras e atividades lúdicas promovidas pela equipe técnica da AREIA...',
    date: '2026-02-15',
    imageUrl: 'https://picsum.photos/seed/agro3/800/600'
  }
];

export const MOCK_METRICS: Metric[] = [
  { label: 'Embalagens Recebidas', value: 1250000, unit: 'unid', icon: 'inventory_2' },
  { label: 'Peso Total Destinado', value: 450, unit: 'ton', icon: 'scale' },
  { label: 'Produtores Atendidos', value: 1200, unit: '', icon: 'groups' },
  { label: 'Municípios Cobertos', value: 12, unit: '', icon: 'map' }
];

export const MOCK_SCHEDULE_DATES: ScheduleDate[] = [
  { date: '2026-03-15', available: true, capacity: 50, occupied: 12 },
  { date: '2026-03-16', available: true, capacity: 50, occupied: 45 },
  { date: '2026-03-17', available: false, capacity: 50, occupied: 50 },
  { date: '2026-03-18', available: true, capacity: 50, occupied: 5 },
  { date: '2026-03-19', available: true, capacity: 50, occupied: 20 }
];

export const MOCK_ITINERANT: ItinerantSchedule[] = [
  { id: '1', city: 'Porto Nacional', location: 'Parque de Exposições', date: '2026-04-10', time: '08:00 - 17:00' },
  { id: '2', city: 'Brejinho de Nazaré', location: 'Garagem Municipal', date: '2026-04-12', time: '08:00 - 16:00' },
  { id: '3', city: 'Monte do Carmo', location: 'Praça Central', date: '2026-04-15', time: '09:00 - 15:00' }
];

export const MOCK_VALIDATIONS: ReceiptValidation[] = [
  { code: 'AREIA-2026-XYZ', date: '2026-01-10', location: 'Central Silvanópolis', quantity: 150, status: 'valid', producerName: 'João da Silva' },
  { code: 'AREIA-2026-ABC', date: '2026-02-05', location: 'Itinerante Porto', quantity: 45, status: 'valid', producerName: 'Maria Oliveira' }
];
