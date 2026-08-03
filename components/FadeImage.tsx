"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * D-05 · Fundido de entrada para fotos diferidas.
 *
 * Las piezas del mosaico y las miniaturas de galería cargan bajo demanda
 * (sin `priority`): en una conexión lenta la foto puede tardar y, sin esto,
 * aparece de golpe a mitad de scroll — el "corte" que se nota. Con la foto en
 * opacity:0 hasta `onLoad` y una transición corta, el remate es un fundido en
 * vez de un chasquido; si la foto ya está en caché el fundido dura un frame y
 * no se percibe.
 *
 * No se usa en imágenes `priority` (héroes, LCP): retrasar su opacidad hasta
 * `onLoad` retrasaría también la métrica de LCP.
 *
 * El fundido y el zoom en hover comparten una sola declaración de
 * `transition`: `className` no debe traer su propio `transition-transform`,
 * porque dos utilidades de transición en el mismo elemento no se combinan
 * —la que gane en la hoja de estilos pisa a la otra por completo— y una de
 * las dos animaciones dejaría de tener efecto.
 */
export default function FadeImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        props.onLoad?.(e);
      }}
      className={`${className} transition-[opacity,transform] duration-[800ms] ease-[var(--ease-editorial)] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
