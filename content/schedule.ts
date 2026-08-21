/**
 * Production board — transcripción del tablero físico de la oficina.
 *
 * La pizarra tiene tres paneles y esta estructura los reproduce tal cual:
 *  · roster   — columnas D / CM / PM / CLIENT, agrupadas por color de rotulador.
 *  · weeks    — la regleta de semanas (lunes) que corona el Gantt.
 *  · crews    — las cuadrillas y su secuencia de obras en la parte baja.
 *  · enhancementWeeks — el panel derecho, día a día.
 *
 * Los tramos del Gantt se transcribieron a ojo desde la foto (hay reflejos
 * sobre media pizarra): sirven la forma correcta, pero las fechas exactas
 * conviene repasarlas contra el tablero real.
 */

export type MarkerColor = "red" | "green" | "blue" | "orange" | "ink";

/** Tramo del Gantt: semana de inicio (índice en `weeks`) y número de semanas. */
export type Bar = {
  start: number;
  span: number;
  color?: MarkerColor;
  /** Trazo discontinuo — en el tablero marca lo tentativo. */
  tentative?: boolean;
};

export type RosterRow = {
  client: string;
  /** Designer. */
  d?: string;
  /** Construction manager. */
  cm?: string;
  /** Project manager. */
  pm?: string;
  color: MarkerColor;
  bar?: Bar;
};

export type RosterGroup = {
  id: string;
  rows: RosterRow[];
};

export const rosterColumns = ["D", "CM", "PM", "Client"] as const;

export const roster: RosterGroup[] = [
  {
    id: "design-build-a",
    rows: [
      { client: "Caporasso", d: "CK·MK / AC", cm: "CK", pm: "NG", color: "red", bar: { start: 0, span: 3, color: "blue" } },
      { client: "Geffner", pm: "NG", color: "red", bar: { start: 1, span: 8, color: "red" } },
      { client: "Migirov", pm: "NG", color: "red" },
      { client: "Narcisse", pm: "NG", color: "red", bar: { start: 3, span: 2, color: "green" } },
      { client: "Clayton", pm: "NU", color: "red" },
      { client: "Hans", pm: "NU", color: "red" },
      { client: "Kirby", pm: "NG", color: "red", bar: { start: 8, span: 1, color: "green" } },
      { client: "Astigiraga", cm: "MK", pm: "NG", color: "red" },
      { client: "Calandra", pm: "NG", color: "red", bar: { start: 11, span: 1, color: "green" } },
      { client: "Drews", pm: "HU", color: "red" },
    ],
  },
  {
    id: "design-build-b",
    rows: [
      { client: "Gulbrandsen", pm: "NG", color: "red", bar: { start: 5, span: 2, color: "red", tentative: true } },
      { client: "Buckingham", pm: "NG", color: "red", bar: { start: 9, span: 2, color: "green" } },
      { client: "Braumann", pm: "NG", color: "red" },
    ],
  },
  {
    id: "hold",
    rows: [{ client: "Meranus", color: "blue" }],
  },
  {
    id: "design-build-c",
    rows: [
      { client: "Curry", d: "JR·DC / SM", cm: "JR", pm: "NG", color: "green", bar: { start: 0, span: 2, color: "green" } },
      { client: "Kramer", pm: "JT", color: "green", bar: { start: 1, span: 2, color: "green" } },
      { client: "Clarke", pm: "JT", color: "green", bar: { start: 0, span: 1, color: "blue" } },
      { client: "Muirhead", pm: "NG", color: "green", bar: { start: 0, span: 7, color: "red" } },
      { client: "Saluzzo", pm: "NU", color: "green", bar: { start: 6, span: 1, color: "red" } },
      { client: "Luhadia", pm: "JT", color: "green", bar: { start: 0, span: 3, color: "blue" } },
      { client: "Williams", pm: "NU", color: "green", bar: { start: 0, span: 2, color: "green" } },
      { client: "Callaghan", pm: "NU", color: "green", bar: { start: 0, span: 3, color: "green" } },
      { client: "Robbins", pm: "NG", color: "green" },
    ],
  },
  {
    id: "design-build-d",
    rows: [
      { client: "Dunmore", pm: "NG", color: "green", bar: { start: 0, span: 2, color: "green" } },
    ],
  },
];

/* ------------------------------------------------------------------
   Regleta de semanas — lunes consecutivos desde el 24 de agosto.
------------------------------------------------------------------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type Week = {
  index: number;
  /** ISO del lunes, para <time dateTime>. */
  iso: string;
  day: number;
  month: string;
  /** Primera semana que cae en su mes: es la que lleva rótulo en el tablero. */
  opensMonth: boolean;
  year?: number;
};

const TIMELINE_WEEKS = 20;
const TIMELINE_START = Date.UTC(2026, 7, 24); // lunes 24 de agosto de 2026
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const weeks: Week[] = Array.from({ length: TIMELINE_WEEKS }, (_, index) => {
  const date = new Date(TIMELINE_START + index * WEEK_MS);
  const month = date.getUTCMonth();
  const previousMonth = new Date(TIMELINE_START + (index - 1) * WEEK_MS).getUTCMonth();

  return {
    index,
    iso: date.toISOString().slice(0, 10),
    day: date.getUTCDate(),
    month: MONTHS[month],
    opensMonth: index === 0 || month !== previousMonth,
    year: month === 0 ? date.getUTCFullYear() : undefined,
  };
});

/** Labor Day — la raya naranja vertical que parte el tablero. */
export const laborDay = { week: 2, label: "Labor Day" };

/* ------------------------------------------------------------------
   Cuadrillas — franjas de obra en la parte baja del Gantt.
------------------------------------------------------------------- */

export type CrewJob = { client: string; start: number; span: number; note?: string };

export type Crew = {
  name: string;
  color: MarkerColor;
  /** Los clientes escritos bajo su nombre en la esquina inferior izquierda. */
  clients: string[];
  jobs: CrewJob[];
};

export const crews: Crew[] = [
  {
    name: "Niuver",
    color: "green",
    clients: ["Caporasso", "Geffner", "Narcisse", "Curry"],
    jobs: [
      { client: "Rakow", start: 0, span: 2, note: "cont." },
      { client: "Williams", start: 2, span: 4 },
      { client: "Geffner", start: 6, span: 3 },
      { client: "Curry", start: 9, span: 5 },
    ],
  },
  {
    name: "Carlos",
    color: "red",
    clients: ["Saluzzo", "Clayton", "Dunmore"],
    jobs: [
      { client: "Saluzzo", start: 0, span: 2 },
      { client: "Dunmore", start: 2, span: 2 },
      { client: "Clayton", start: 4, span: 10 },
    ],
  },
  {
    name: "Miguel",
    color: "orange",
    clients: ["Saluzzo", "Hans", "Callaghan", "Dunmore"],
    jobs: [
      { client: "Dunmore", start: 0, span: 2 },
      { client: "Drews", start: 2, span: 12 },
    ],
  },
  {
    name: "Domingo",
    color: "blue",
    clients: ["Kramer", "Clarke"],
    jobs: [
      { client: "Kramer", start: 0, span: 5 },
      { client: "Kramer", start: 5, span: 9, note: "cont." },
    ],
  },
];

/* ------------------------------------------------------------------
   Panel derecho — Enhancements, día a día.
------------------------------------------------------------------- */

export type EnhancementRow = {
  client: string;
  /** Índices de día (0 = lunes) ocupados por la barra roja. */
  days?: [number, number];
};

export type EnhancementWeek = {
  label: string;
  days: string[];
  rows: EnhancementRow[];
};

export const enhancementWeeks: EnhancementWeek[] = [
  {
    label: "August",
    days: ["Mon 24", "Tue 25", "Wed 26", "Thu 27", "Fri 28", "Sat 29"],
    rows: [
      { client: "Drews" },
      { client: "Muirhead" },
      { client: "Mount" },
      { client: "Brown 2.0", days: [0, 1] },
      { client: "Bernstein", days: [0, 1] },
      { client: "Cafasso" },
      { client: "O'Sullivan", days: [1, 4] },
      { client: "Lefkovits 2.0" },
    ],
  },
  {
    label: "Aug / Sept",
    days: ["Mon 31", "Tue 9/1", "Wed 9/2", "Thu 9/3", "Fri 9/4", "Sat 9/5"],
    rows: [
      { client: "Farina" },
      { client: "Dell Chiaie" },
      { client: "Mann", days: [3, 4] },
      { client: "Drews", days: [0, 3] },
      { client: "Welsh" },
      { client: "O'Sullivan" },
      { client: "Shapiro" },
    ],
  },
];
