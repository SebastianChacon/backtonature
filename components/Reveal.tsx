"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * D-05 · Reveals. "Si se nota, es demasiado".
 *
 * El estado oculto lo aplica CSS dentro de `@media (scripting: enabled)`, así
 * que si el JavaScript falla o está desactivado el contenido se ve entero —
 * nunca se sirve una página en blanco. Por eso no se usa un componente de
 * librería que serialice `opacity: 0` en el HTML del servidor.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        // El margen superior enorme extiende la raíz muy por encima del
        // viewport, de modo que todo lo que ya quedó arriba cuenta como
        // visible. Sin esto, un salto de scroll (ancla, botón atrás, rueda
        // rápida) lleva al elemento de "debajo" a "encima" sin pasar por
        // "dentro": el observer no ve cambio de estado, no dispara, y esa
        // sección se queda invisible para siempre.
        rootMargin: "10000px 0px -6% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
