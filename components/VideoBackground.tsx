"use client";

import { useEffect, useRef, useState } from "react";

const VIMEO_ORIGIN = "https://player.vimeo.com";

/**
 * F-05 · Video de fondo.
 *
 * Los dos videos son los publicados en Vimeo por el cliente (ver content/site.ts).
 * Reglas que cumple este componente:
 *  · El póster es lo primero que se pinta — lo renderiza el servidor con
 *    next/image, así el LCP no depende de que cargue Vimeo.
 *  · El iframe solo se monta en cliente, y solo cuando la sección entra en
 *    viewport: nada de reproductor en el arranque.
 *  · Decorativo: aria-hidden y fuera del orden de tabulación (A11Y).
 *  · Con prefers-reduced-motion NO se monta nunca — se queda el póster fijo.
 *
 * `revealAfter`: ambos másters traen la placa de intro con el logo incrustada y
 * ese lettering choca con el titular. El video se reproduce oculto sobre el
 * póster y solo se funde cuando el reproductor informa de que ya ha pasado ese
 * punto. Se pregunta la posición real al reproductor (postMessage, sin cargar
 * el SDK) en vez de usar un temporizador, porque en una pestaña de fondo el
 * video no avanza y un temporizador destaparía justo la placa. Si Vimeo no
 * responde, el video no se muestra nunca y se queda el póster: degradar a una
 * imagen fija es el fallo aceptable.
 *
 * El arreglo definitivo es un máster sin intro, como pide el documento de
 * requerimientos (§11 Contenido y activos). Con él, `revealAfter: 0`.
 */
export default function VideoBackground({
  vimeoId,
  title,
  revealAfter = 0,
}: {
  vimeoId: string;
  title: string;
  /** Segundo del video a partir del cual es seguro mostrarlo. */
  revealAfter?: number;
}) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const holder = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = holder.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || visible) return;

    if (revealAfter <= 0) {
      setVisible(true);
      return;
    }

    const post = (message: Record<string, unknown>) => {
      frame.current?.contentWindow?.postMessage(
        JSON.stringify(message),
        VIMEO_ORIGIN,
      );
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;
      if (event.source !== frame.current?.contentWindow) return;

      let payload: { event?: string; data?: { seconds?: number } };
      try {
        payload =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (payload?.event === "ready") {
        post({ method: "addEventListener", value: "timeupdate" });
        return;
      }

      if (
        payload?.event === "timeupdate" &&
        typeof payload.data?.seconds === "number" &&
        payload.data.seconds >= revealAfter
      ) {
        setVisible(true);
      }
    };

    window.addEventListener("message", onMessage);
    // Por si el player ya estaba listo antes de que montara este listener.
    post({ method: "addEventListener", value: "timeupdate" });

    return () => window.removeEventListener("message", onMessage);
  }, [active, visible, revealAfter]);

  const src =
    `https://player.vimeo.com/video/${vimeoId}` +
    `?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`;

  return (
    /*
      El recuadro se declara contenedor de consulta por TAMAÑO para que el
      iframe se dimensione contra él (cqw/cqh) y no contra el viewport. Importa
      desde que el hero de la home mete este fondo dentro de una capa de
      parallax más alta que la pantalla: con unidades de viewport, el "min-h-full"
      rompía la proporción 16/9 del reproductor y Vimeo dibujaba franjas negras.
    */
    <div
      ref={holder}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 [container-type:size]"
    >
      {active && (
        <iframe
          ref={frame}
          src={src}
          title={title}
          tabIndex={-1}
          allow="autoplay; fullscreen"
          loading="lazy"
          className={`pointer-events-none absolute top-1/2 left-1/2 h-[56.25cqw] min-h-[100cqh] w-[100cqw] min-w-[177.78cqh] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
