import { Cormorant_Garamond, Jost } from "next/font/google";

/**
 * D-02 · Tipografía.
 * next/font descarga y sirve las fuentes desde nuestro propio dominio en tiempo
 * de build: cumple el requisito de auto-alojado (velocidad + sin dependencia de
 * Google Fonts en runtime) y elimina el CLS por swap.
 */

// Solo los cortes que el sistema usa de verdad: 300 (serif-lead), 400
// (titulares) y 500, más la itálica 400 del hero. Declarar pesos de más engorda
// el build sin que ninguna regla CSS los pida.
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});
