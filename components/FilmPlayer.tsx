"use client";

import Image from "next/image";
import { useState } from "react";
import { heroBlurData } from "@/lib/heroBlur";
import { BLUR_DATA_URL } from "@/lib/image";

/**
 * F-05b · Reproductor de las películas de marca (ver `films` en content/site.ts).
 *
 * Es el reverso de VideoBackground: aquí el video se MIRA, así que suena, lleva
 * controles y se reproduce entero, sin el recorte que necesita el fondo.
 *
 * Fachada ligera: mientras nadie pulse, esto es una foto y un botón — cero
 * peticiones a Vimeo. El iframe (~600KB de reproductor entre JS y CSS) solo se
 * monta tras el clic, que además cuenta como gesto de usuario y por eso el
 * `autoplay=1` arranca CON sonido en vez de quedarse mudo.
 *
 * Sin la fachada, dos iframes en la home costarían más que el resto de la
 * página junta, y la mayoría de visitas no llegan a darle al play.
 *
 * A11Y · el estado de reposo es un <button> real: foco, Enter/Espacio y el
 * anillo de latón de globals.css salen gratis. El póster va como decorativo
 * (alt="") porque la etiqueta accesible la pone el propio botón.
 */
export default function FilmPlayer({
  vimeoId,
  title,
  poster,
  sizes = "(max-width: 64rem) 100vw, 75rem",
}: {
  vimeoId: string;
  title: string;
  poster: string;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);

  // `dnt=1` mantiene la promesa de la política de privacidad: sin él, Vimeo
  // deja sus cookies de analítica en cuanto se monta el reproductor.
  // `color` tiñe los controles con el latón del sistema (D-01).
  const src =
    `https://player.vimeo.com/video/${vimeoId}` +
    `?autoplay=1&playsinline=1&dnt=1&title=0&byline=0&portrait=0&color=b08a4f`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-ink-soft">
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes={sizes}
            quality={60}
            placeholder="blur"
            blurDataURL={heroBlurData[poster] ?? BLUR_DATA_URL}
            className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-103"
          />
          {/* Vela el póster lo justo para que el disco de play mantenga
              contraste sobre las cartelas claras de las dos películas. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-ink/25 transition-colors duration-500 group-hover:bg-ink/10"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/70 bg-ink/35 backdrop-blur-[2px] transition-all duration-500 ease-[var(--ease-editorial)] group-hover:border-brass group-hover:bg-brass"
          >
            {/* Triángulo óptico: desplazado 2px a la derecha para que el peso
                visual quede centrado en el disco, no su caja. */}
            <svg
              viewBox="0 0 24 24"
              className="ml-[2px] h-7 w-7 fill-bone transition-colors duration-500 group-hover:fill-ink"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="sr-only">Play the film: {title}</span>
        </button>
      )}
    </div>
  );
}
