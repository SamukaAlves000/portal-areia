import { News, Metric, ScheduleDate, ItinerantSchedule, ReceiptValidation } from '../models/site.models';

export const MOCK_NEWS: News[] = [
  {
    id: '1',
    title: 'AREIA inicia campanha de recebimento itinerante 2026',
    summary: 'A AREIA iniciou o calendário de recebimentos itinerantes de 2026, ampliando o atendimento aos produtores rurais em diferentes regiões do Tocantins.',
    content: `A AREIA iniciou oficialmente o calendário de recebimentos itinerantes para o ano de 2026. Esta iniciativa estratégica visa ampliar o alcance do sistema de logística reversa, facilitando para que o produtor rural possa realizar a devolução de suas embalagens vazias de agrotóxicos em locais mais próximos de sua propriedade.

As ações contemplam diversos municípios do Tocantins, focando especialmente naquelas regiões que possuem maior distância da Central de Silvanópolis. Com isso, a AREIA reforça seu compromisso com a sustentabilidade e com o cumprimento da legislação ambiental vigente.

O cronograma completo com datas e locais pode ser consultado na seção de Agenda Itinerante do nosso portal.`,
    date: '2026-03-05',
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070&auto=format&fit=crop',
    published: true
  },
  {
    id: '2',
    title: 'Logística reversa avança com maior adesão de produtores',
    summary: 'A AREIA registra crescimento contínuo no volume de embalagens recebidas.',
    content: `Os indicadores operacionais da AREIA em 2026 demonstram um avanço significativo na adesão dos produtores à logística reversa. O volume de embalagens recebidas na Central de Silvanópolis e nos pontos itinerantes tem superado as metas projetadas.

Esse crescimento é reflexo direto do trabalho de conscientização realizado em campo e da facilidade proporcionada pelos sistemas digitais de agendamento. "O produtor entende que a devolução correta é, além de uma obrigação legal, um compromisso com o futuro da agricultura", destaca a diretoria da associação.

Com o aumento da adesão, o impacto ambiental positivo é potencializado, retirando toneladas de resíduos que poderiam contaminar o solo e os recursos hídricos.`,
    date: '2026-02-28',
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=2036&auto=format&fit=crop',
    published: true
  },
  {
    id: '3',
    title: 'Educação ambiental fortalece práticas sustentáveis no campo',
    summary: 'As ações de educação ambiental promovendo orientação técnica e conscientização.',
    content: `A educação ambiental é um dos pilares fundamentais da atuação da AREIA. Em parceria com o inpEV (Instituto Nacional de Processamento de Embalagens Vazias), temos intensificado as ações de treinamento para produtores, técnicos e colaboradores do setor.

As palestras e orientações focam em temas cruciais como a tríplice lavagem, o armazenamento seguro na propriedade e os prazos legais para a devolução. "Levar informação técnica de qualidade é a melhor forma de garantir que todo o processo da logística reversa ocorra de forma eficiente e segura", explicam os coordenadores do programa.

Ao longo do ano, novas capacitações serão realizadas em diversos polos agrícolas do Tocantins, reforçando a cultura da sustentabilidade no campo.`,
    date: '2026-02-15',
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=2036&auto=format&fit=crop',
    published: true
  }
];

export const MOCK_METRICS: Metric[] = [
  { label: 'Embalagens Recebidas', value: 1250000, unit: 'unid', icon: 'inventory_2' },
  { label: 'Peso Total Destinado', value: 450, unit: 'ton', icon: 'scale' },
  { label: 'Produtores Atendidos', value: 1200, unit: '', icon: 'groups' },
  { label: 'Municípios Cobertos', value: 12, unit: '', icon: 'map' }
];

export const MOCK_SCHEDULE_DATES: ScheduleDate[] = [
  { date: '2026-03-15', available: true, capacity: 50, occupied: 12, city: 'Porto Nacional' },
  { date: '2026-03-16', available: true, capacity: 50, occupied: 45, city: 'Porto Nacional' },
  { date: '2026-03-17', available: false, capacity: 50, occupied: 50, city: 'Palmas' },
  { date: '2026-03-18', available: true, capacity: 50, occupied: 5, city: 'Silvanópolis' },
  { date: '2026-03-19', available: true, capacity: 50, occupied: 20, city: 'Silvanópolis' }
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
