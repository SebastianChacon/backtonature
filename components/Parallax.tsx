"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * D-05 · Parallax de portadas.
 *
 * La foto vive en una capa MÁS ALTA que su marco (100% + 2·shift) y se desplaza
 * dentro de él según la posición del marco en el viewport: al bajar por la
 * página la imagen sube, al subir baja. El recorrido total es exactamente el
 * sobrante de la capa, así que nunca asoma un borde.
 *
 * Detalles que importan:
 *  · Un solo requestAnimationFrame para TODAS las portadas de la página, y solo
 *    mientras alguna está en pantalla — el IntersectionObserver da de alta y de
 *    baja; con el viewport lejos, no hay bucle.
 *  · Se lee `getBoundingClientRect` en cada frame en vez de escuchar `scroll`:
 *    el scroll suavizado (Lenis) interpola la posición fuera del evento nativo,
 *    y un listener dejaría la imagen a tirones.
 *  · Solo se escribe una custom property; la transformación la resuelve CSS en
 *    el compositor.
 *  · Con prefers-reduced-motion no se registra nada y el CSS deja la capa a ras
 *    del marco: la portada se ve exactamente igual, quieta.
 */

/** Portadas visibles ahora mismo. El bucle vive mientras el set tenga gente. */
const live = new Set<HTMLElement>();
let frame = 0;

function place(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  // −1 = el marco acaba de salir por arriba · +1 = está entrando por abajo.
  const span = (vh + rect.height) / 2;
  const raw = (rect.top + rect.height / 2 - vh / 2) / span;
  const progress = raw < -1 ? -1 : raw > 1 ? 1 : raw;
  el.style.setProperty("--parallax-p", progress.toFixed(4));
}

function tick() {
  for (const el of live) place(el);
  frame = live.size ? requestAnimationFrame(tick) : 0;
}

function watch(el: HTMLElement) {
  live.add(el);
  place(el);
  if (!frame) frame = requestAnimationFrame(tick);
}

function unwatch(el: HTMLElement) {
  live.delete(el);
}

export default function Parallax({
  children,
  className = "",
  /**
   * Recorrido a cada lado del centro. Longitud CSS: conviene que crezca con la
   * pantalla (vh) para que el gesto se lea igual en un portátil y en un 27".
   */
  shift = "clamp(1.25rem, 4vh, 3.5rem)",
}: {
  children: ReactNode;
  className?: string;
  shift?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) watch(el);
          else unwatch(el);
        }
      },
      // Margen generoso: la portada ya va colocada antes de asomar, así que no
      // se ve el salto del primer frame.
      { rootMargin: "20% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      unwatch(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`parallax overflow-hidden ${className}`}
      style={{ "--parallax-shift": shift } as CSSProperties}
    >
      <div className="parallax-layer">{children}</div>
    </div>
  );
}
