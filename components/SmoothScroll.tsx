"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * D-05 · Smooth scroll.
 * Se desactiva por completo con prefers-reduced-motion: en ese caso el scroll
 * nativo del navegador es el comportamiento correcto y accesible.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Sin suavizado en táctil: interfiere con el scroll nativo del móvil.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
