import {
  crews,
  enhancementWeeks,
  laborDay,
  roster,
  rosterColumns,
  weeks,
  type Bar,
  type MarkerColor,
  type RosterRow,
} from "@/content/schedule";
import BoardScroller from "./BoardScroller";
import TodayMarker from "./TodayMarker";

/**
 * El tablero de producción de la oficina, tal cual cuelga de la pared:
 * el roster a la izquierda, el Gantt de semanas en el centro con la raya de
 * Labor Day, las cuadrillas abajo y el panel de Enhancements a la derecha.
 *
 * La pared entera se desplaza en horizontal —igual que hay que caminar delante
 * de ella— en lugar de reflowear los paneles, que perderían la lectura por
 * filas: en este tablero la fila ES el dato.
 */

/** Alto de fila compartido por el roster y el Gantt: es lo que los alinea. */
const ROW = 26;
const HEAD = 34;

const marker: Record<MarkerColor, string> = {
  red: "text-marker-red",
  green: "text-marker-green",
  blue: "text-marker-blue",
  orange: "text-marker-orange",
  ink: "text-marker-ink",
};

const markerBg: Record<MarkerColor, string> = {
  red: "bg-marker-red",
  green: "bg-marker-green",
  blue: "bg-marker-blue",
  orange: "bg-marker-orange",
  ink: "bg-marker-ink",
};

/** Posición horizontal en el Gantt, en porcentaje de la regleta de semanas. */
const span = (n: number) => `${(n / weeks.length) * 100}%`;

/**
 * Los tramos se recortan a la regleta. Un dato mal transcrito —un span que se
 * pase de enero— se saldría del marco de la pizarra y rompería la caja.
 */
function fit(start: number, length: number) {
  const from = Math.max(0, Math.min(start, weeks.length));
  return {
    left: span(from),
    width: span(Math.max(0, Math.min(length, weeks.length - from))),
  };
}

/**
 * Roster y Gantt se pintan en dos columnas independientes, así que los huecos
 * en blanco que separan los grupos tienen que existir en AMBAS. Se aplanan una
 * sola vez y las dos columnas recorren la misma lista.
 */
type Line = { kind: "row"; row: RosterRow } | { kind: "gap" };

const lines: Line[] = roster.flatMap((group, i) => [
  ...(i > 0 ? [{ kind: "gap" } as const] : []),
  ...group.rows.map((row) => ({ kind: "row", row }) as const),
]);

function BarStroke({ bar }: { bar: Bar }) {
  const color = bar.color ?? "ink";

  return (
    <span
      aria-hidden="true"
      data-bar=""
      className={`absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full ${
        bar.tentative ? "" : markerBg[color]
      }`}
      style={{
        ...fit(bar.start, bar.span),
        ...(bar.tentative
          ? {
              backgroundImage:
                "repeating-linear-gradient(90deg,currentColor 0 9px,transparent 9px 16px)",
              color: `var(--color-marker-${color})`,
            }
          : null),
      }}
    />
  );
}

function BoardFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[4px] bg-[linear-gradient(160deg,#d8dbd8,#a4aaa9_45%,#c6cac7)] p-[7px] shadow-[0_28px_60px_-24px_rgba(0,0,0,.75)] ${className}`}
    >
      <div
        className="h-full rounded-[2px] bg-board p-4 text-marker-ink shadow-[inset_0_1px_0_rgba(255,255,255,.9),inset_0_-14px_28px_-18px_rgba(30,45,55,.35)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right,color-mix(in srgb,var(--color-board-rule) 15%,transparent) 0 1px,transparent 1px 22px),repeating-linear-gradient(to bottom,color-mix(in srgb,var(--color-board-rule) 15%,transparent) 0 1px,transparent 1px 22px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ScheduleBoard() {
  /*
    La familia del rotulador se resuelve aquí y no en @theme: --font-caveat solo
    lo declara la clase de next/font en la página, así que una variable colgada
    de :root que lo referencie queda inválida en tiempo de cómputo y el tablero
    se pinta con la tipografía de UI.
  */
  return (
    <div className="font-[family-name:var(--font-caveat)]">
      <BoardScroller label="Production board">
        {/* items-start: cada pizarra conserva su alto, como en la pared. */}
        <div className="flex min-w-max items-start gap-5 px-[var(--spacing-pad)]">
          {/* ---------- Pizarra grande: roster + Gantt ---------- */}
          <BoardFrame className="w-[58rem] shrink-0 sm:w-[66rem]">
            <div className="flex gap-4">
              {/* Roster */}
              <div
                role="table"
                aria-label="Project roster — designer, construction manager, project manager and client"
                className="w-[19rem] shrink-0"
              >
                <div
                  role="row"
                  className="grid items-end gap-2 border-b border-marker-ink/25 pb-1 text-[11px] tracking-[0.14em] text-marker-red uppercase [grid-template-columns:3.9rem_2.1rem_2.1rem_1fr]"
                  style={{ height: HEAD }}
                >
                  {rosterColumns.map((col) => (
                    <span key={col} role="columnheader">
                      {col}
                    </span>
                  ))}
                </div>

                {lines.map((line, i) =>
                  line.kind === "gap" ? (
                    <div
                      key={`gap-${i}`}
                      aria-hidden="true"
                      style={{ height: ROW }}
                    />
                  ) : (
                    <div
                      key={line.row.client}
                      role="row"
                      data-roster-row={line.row.client}
                      className="grid items-center gap-2 text-[13px] leading-none [grid-template-columns:3.9rem_2.1rem_2.1rem_1fr]"
                      style={{ height: ROW }}
                    >
                      <span
                        role="cell"
                        className="text-[10px] text-marker-ink/75"
                      >
                        {line.row.d}
                      </span>
                      <span
                        role="cell"
                        className="text-[11px] text-marker-ink/85"
                      >
                        {line.row.cm}
                      </span>
                      <span
                        role="cell"
                        className="text-[11px] text-marker-ink/85"
                      >
                        {line.row.pm}
                      </span>
                      <span
                        role="cell"
                        className={`text-[15px] tracking-[0.03em] uppercase ${marker[line.row.color]}`}
                      >
                        {line.row.client}
                      </span>
                    </div>
                  ),
                )}
              </div>

              {/* Gantt */}
              <div className="relative min-w-0 flex-1 border-l border-marker-ink/20 pl-3">
                {/* Regleta de semanas */}
                <div
                  className="relative border-b border-marker-ink/25"
                  style={{ height: HEAD }}
                >
                  {weeks.map((week) => (
                    <span
                      key={week.iso}
                      className="absolute bottom-1 flex flex-col items-start"
                      style={{ left: span(week.index), width: span(1) }}
                    >
                      {week.opensMonth && (
                        <span className="text-[9px] leading-none tracking-[0.12em] text-marker-red uppercase">
                          {week.year ?? week.month}
                        </span>
                      )}
                      <time
                        dateTime={week.iso}
                        className="text-[11px] leading-tight text-marker-ink/80"
                      >
                        {week.day}
                      </time>
                    </span>
                  ))}
                </div>

                {/* Cuerpo: rayas verticales, Labor Day y los tramos */}
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    /*
                      Una raya por semana. El paso lo marca backgroundSize, no
                      un repeating-gradient: dentro del gradiente el porcentaje
                      se resuelve contra el tile y las rayas salían apelmazadas.
                    */
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg,color-mix(in srgb,var(--color-board-rule) 26%,transparent) 0 1px,transparent 1px)",
                      backgroundSize: `${100 / weeks.length}% 100%`,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    data-labor-day=""
                    className="absolute top-0 bottom-0 z-10 w-[2px] bg-marker-orange"
                    style={{ left: span(laborDay.week) }}
                  />
                  <span
                    className="absolute top-2 z-10 text-[10px] leading-[1.05] tracking-[0.12em] text-marker-orange uppercase [writing-mode:vertical-rl]"
                    style={{ left: `calc(${span(laborDay.week)} + 4px)` }}
                  >
                    {laborDay.label}
                  </span>

                  {lines.map((line, i) =>
                    line.kind === "gap" ? (
                      <div
                        key={`gap-${i}`}
                        aria-hidden="true"
                        style={{ height: ROW }}
                      />
                    ) : (
                      <div
                        key={line.row.client}
                        data-gantt-row={line.row.client}
                        className="relative"
                        style={{ height: ROW }}
                      >
                        {line.row.bar && (
                          <>
                            <BarStroke bar={line.row.bar} />
                            <span className="sr-only">
                              {line.row.client}: {line.row.bar.span} week
                              {line.row.bar.span === 1 ? "" : "s"} from{" "}
                              {weeks[line.row.bar.start]?.month}{" "}
                              {weeks[line.row.bar.start]?.day}
                            </span>
                          </>
                        )}
                      </div>
                    ),
                  )}

                  <TodayMarker
                    startIso={weeks[0].iso}
                    weekCount={weeks.length}
                  />
                </div>
              </div>
            </div>

            {/* ---------- Cuadrillas ---------- */}
            <div className="mt-8 flex gap-4 border-t border-marker-ink/20 pt-4">
              <div className="grid w-[19rem] shrink-0 grid-cols-4 gap-2">
                {crews.map((crew) => (
                  <div key={crew.name}>
                    <p
                      className={`text-[13px] tracking-[0.06em] uppercase ${marker[crew.color]}`}
                    >
                      {crew.name}
                    </p>
                    <ul className={`mt-1 space-y-[2px] ${marker[crew.color]}`}>
                      {crew.clients.map((client) => (
                        <li
                          key={client}
                          className="text-[10px] leading-tight uppercase"
                        >
                          {client}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="min-w-0 flex-1 border-l border-marker-ink/20 pl-3">
                {/*
                  Los marcadores verticales se pintan al final y con z-index: las
                  cajas de obra tienen fondo opaco y, en orden de documento, los
                  borraban. El contenedor no lleva padding porque el porcentaje
                  de `left` se resuelve contra la caja de relleno, no contra el
                  contenido — con el pl-3 fuera, carriles y rayas comparten base.
                */}
                <div className="relative">
                  {crews.map((crew) => (
                    <div
                      key={crew.name}
                      className="relative mb-3 h-[18px] last:mb-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 ${markerBg[crew.color]} opacity-70`}
                      />
                      {crew.jobs.map((job, i) => (
                        <span
                          key={`${job.client}-${i}`}
                          className={`absolute top-0 flex h-full items-center overflow-hidden rounded-[1px] border px-[3px] text-[9px] tracking-[0.06em] whitespace-nowrap uppercase bg-board ${marker[crew.color]} border-current`}
                          style={fit(job.start, job.span)}
                        >
                          {job.client}
                          {job.note && (
                            <em className="ml-1 not-italic opacity-70">
                              {job.note}
                            </em>
                          )}
                        </span>
                      ))}
                    </div>
                  ))}

                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 z-10 w-[2px] bg-marker-orange"
                    style={{ left: span(laborDay.week) }}
                  />
                  <TodayMarker
                    startIso={weeks[0].iso}
                    weekCount={weeks.length}
                    label={false}
                  />
                </div>
              </div>
            </div>
          </BoardFrame>

          {/* ---------- Pizarra derecha: Enhancements ---------- */}
          <BoardFrame className="w-[28rem] shrink-0">
            <p className="mb-3 text-center text-[13px] tracking-[0.28em] text-marker-ink uppercase">
              Enhancements
            </p>

            {enhancementWeeks.map((week) => (
              /*
                El nombre accesible va en aria-label y no en <caption>: un
                caption con sr-only se posiciona contra el bloque inicial, se
                escapa del contenedor con scroll y estira el ancho del documento.
              */
              <table
                key={week.label}
                aria-label={`Enhancements scheduled for ${week.label}`}
                className="mb-6 w-full table-fixed border-collapse last:mb-0"
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-[7.5rem] border-b border-marker-blue/40 pb-1 text-left text-[13px] tracking-[0.08em] text-marker-blue uppercase"
                    >
                      {week.label}
                    </th>
                    {week.days.map((day) => (
                      <th
                        key={day}
                        scope="col"
                        className="border-b border-marker-blue/40 pb-1 text-center text-[10px] font-normal tracking-[0.04em] text-marker-blue uppercase"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {week.rows.map((row) => (
                    <tr key={row.client}>
                      <th
                        scope="row"
                        className="border-b border-marker-ink/15 py-[3px] text-left text-[13px] font-normal tracking-[0.04em] text-marker-ink uppercase"
                      >
                        {row.client}
                      </th>
                      {week.days.map((day, i) => {
                        const busy =
                          row.days && i >= row.days[0] && i <= row.days[1];
                        const first = row.days && i === row.days[0];

                        return (
                          <td
                            key={day}
                            className="relative h-[21px] border-b border-l border-marker-ink/15"
                          >
                            {busy && (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="absolute top-1/2 -right-px -left-px h-[3px] -translate-y-1/2 bg-marker-red"
                                />
                                {first && (
                                  <span className="sr-only">
                                    scheduled {week.days[row.days![0]]} to{" "}
                                    {week.days[row.days![1]]}
                                  </span>
                                )}
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </BoardFrame>
        </div>
      </BoardScroller>

      <p className="wrap font-ui text-[length:var(--text-label)] tracking-[0.18em] text-bone/45 uppercase">
        Scroll sideways to read the full wall →
      </p>
    </div>
  );
}
