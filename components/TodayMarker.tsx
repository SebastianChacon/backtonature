"use client";

import { useEffect, useState } from "react";

/**
 * La raya de "hoy" sobre el Gantt — el equivalente a la cinta negra vertical
 * que en el tablero físico se va corriendo cada lunes.
 *
 * Es cliente a propósito: /calendar se prerenderiza como estática, así que una
 * fecha calculada en el servidor se congelaría en el momento del build y el
 * tablero mentiría a partir del día siguiente. Se pinta tras el montaje, lo que
 * además evita el desajuste de hidratación.
 */
export default function TodayMarker({
  startIso,
  weekCount,
  label = true,
}: {
  /** Lunes de la primera columna del Gantt. */
  startIso: string;
  weekCount: number;
  label?: boolean;
}) {
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const week = 7 * 24 * 60 * 60 * 1000;
    const elapsed = (Date.now() - Date.parse(`${startIso}T00:00:00Z`)) / week;

    // Fuera de la ventana del tablero no hay nada que marcar.
    setOffset(elapsed >= 0 && elapsed <= weekCount ? elapsed : null);
  }, [startIso, weekCount]);

  if (offset === null) return null;

  const left = `${(offset / weekCount) * 100}%`;

  return (
    <>
      <span
        aria-hidden="true"
        data-today-marker=""
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-marker-ink"
        style={{ left }}
      />
      {label && (
        <span
          className="absolute top-1 z-20 text-[10px] leading-[1.05] tracking-[0.12em] text-marker-ink uppercase [writing-mode:vertical-rl]"
          style={{ left: `calc(${left} + 4px)` }}
        >
          Today
        </span>
      )}
    </>
  );
}
