"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

/**
 * El contenedor con scroll del tablero.
 *
 * Con tabIndex basta para que el foco llegue, pero WebKit no desplaza un div
 * enfocado con las flechas —comprobado en Safari e iPad—, así que el teclado se
 * quedaba sin poder llegar a diciembre. El manejador cubre ese hueco y deja el
 * mismo juego de teclas en todos los navegadores.
 */
export default function BoardScroller({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    // Solo cuando el foco está en la región: si algún día el tablero gana algo
    // enfocable dentro, las flechas son suyas.
    if (event.target !== event.currentTarget) return;

    const page = el.clientWidth * 0.9;
    const step: Record<string, number> = {
      ArrowRight: 120,
      ArrowLeft: -120,
      PageDown: page,
      PageUp: -page,
    };

    let to: number | null = null;
    if (event.key in step) to = el.scrollLeft + step[event.key];
    else if (event.key === "Home") to = 0;
    else if (event.key === "End") to = el.scrollWidth;
    if (to === null) return;

    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: to, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="overflow-x-auto pb-4"
    >
      {children}
    </div>
  );
}
