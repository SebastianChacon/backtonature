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
 * `clip` · Ninguno de los dos másters es metraje ambiente: son piezas de marca
 * con grafismo incrustado (lettering, chinchetas con el logo, rótulos "AFTER",
 * bocetos, el director a cámara, placas finales con el teléfono). Por eso el
 * fondo no reproduce el máster entero: se salta a `clip.start` en cuanto el
 * reproductor está listo y se vuelve a saltar allí al llegar a `clip.end`, así
 * que solo se ve la ventana limpia y el grafismo no aparece nunca. Las ventanas
 * y el porqué de cada una están en content/site.ts.
 *
 * Como el recorte ya garantiza que lo que se ve es seguro, el video se destapa
 * en cuanto el salto aterriza (~1s) en vez de esperar a que la intro pase sola.
 *
 * Se pregunta la posición real al reproductor (postMessage, sin cargar el SDK)
 * en vez de usar un temporizador, porque en una pestaña de fondo el video no
 * avanza y un temporizador destaparía justo el grafismo. Si Vimeo no responde,
 * el video no se muestra nunca y se queda el póster: degradar a una imagen fija
 * es el fallo aceptable.
 *
 * El arreglo definitivo sigue siendo un máster ambiente sin grafismo, como pide
 * el documento de requerimientos (§11 Contenido y activos). Con él, `clip` sobra.
 */
export default function VideoBackground({
  vimeoId,
  title,
  clip,
}: {
  vimeoId: string;
  title: string;
  /** Ventana limpia del máster, en segundos. Se reproduce en bucle. */
  clip: { readonly start: number; readonly end: number };
}) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const holder = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  /* Momento del último salto, para no encadenar seeks mientras Vimeo busca. */
  const lastSeek = useRef(0);

  const { start: clipStart, end: clipEnd } = clip;

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
    // Ojo: el listener tiene que seguir vivo DESPUÉS del destape — es quien
    // devuelve el video al principio de la ventana en cada vuelta.
    if (!active) return;

    const post = (message: Record<string, unknown>) => {
      frame.current?.contentWindow?.postMessage(
        JSON.stringify(message),
        VIMEO_ORIGIN,
      );
    };

    const subscribe = () => {
      // El player responde con `playProgress` (API antigua) o con `timeupdate`
      // (API nueva) según la versión que sirva Vimeo ese día. Suscribirse a las
      // dos es lo único fiable: pedir solo `timeupdate` deja el fondo mudo —el
      // evento no llega nunca y el video no se destapa— y eso es exactamente lo
      // que tenía escondido este fondo.
      post({ method: "addEventListener", value: "timeupdate" });
      post({ method: "addEventListener", value: "playProgress" });
    };

    const rewind = () => {
      // Vimeo tarda en atender el salto y sigue emitiendo progreso fuera de la
      // ventana mientras tanto; sin esta guarda se encadenarían seeks.
      const now = Date.now();
      if (now - lastSeek.current < 1200) return;
      lastSeek.current = now;
      post({ method: "setCurrentTime", value: clipStart });
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
        subscribe();
        rewind();
        return;
      }

      if (payload?.event !== "timeupdate" && payload?.event !== "playProgress")
        return;
      const seconds = payload.data?.seconds;
      if (typeof seconds !== "number") return;

      if (seconds >= clipStart && seconds < clipEnd) {
        // Dentro de la ventana: ya es seguro enseñarlo.
        setVisible(true);
      } else {
        rewind();
      }
    };

    window.addEventListener("message", onMessage);
    // Por si el player ya estaba listo antes de que montara este listener.
    subscribe();

    return () => window.removeEventListener("message", onMessage);
    // `visible` queda fuera a propósito: si entrara, el destape desmontaría y
    // volvería a montar el listener, y con él se perdería la suscripción que
    // mantiene el bucle dentro de la ventana.
  }, [active, clipStart, clipEnd]);

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
