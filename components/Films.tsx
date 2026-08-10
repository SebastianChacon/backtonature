import { films } from "@/content/site";
import FilmPlayer from "./FilmPlayer";
import Reveal from "./Reveal";
import { Band, Kicker } from "./ui";

/** 117 → "1:57". El sello de duración le dice al visitante lo que le va a costar. */
function runtime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * F-05b · Las dos películas del estudio, a tamaño completo.
 *
 * Banda oscura a propósito: las dos piezas son cine de marca y el `ink-soft`
 * apaga la página alrededor del cuadro, igual que hace el visor de Lightbox
 * con las fotos. Además parte el tramo claro de la home (ethos → portfolio),
 * que sin esto encadena dos bandas `bone` seguidas.
 */
export default function Films() {
  // `scroll-mt` libera el header fijo (67px): sin él, un salto a #films deja
  // el titular de la sección tapado por la barra.
  return (
    <Band tone="ink-soft" id="films" className="scroll-mt-24">
      <div className="wrap">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-bone/15 pb-8">
            <div>
              <Kicker>On Film</Kicker>
              <h2 className="max-w-[15ch] text-bone [font-size:var(--text-h2)]">
                See the work in motion.
              </h2>
            </div>
            <p className="max-w-[38ch] text-sage [font-size:var(--text-body)]">
              Photographs hold a garden still. These two films show it the way
              it is actually lived in — light moving, planting breathing, a
              landscape being built.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-[clamp(3.5rem,8vh,6rem)]">
          {films.map((film, i) => (
            <Reveal key={film.id} as="section" delay={i * 0.05}>
              <FilmPlayer
                vimeoId={film.vimeoId}
                title={film.title}
                poster={film.poster}
              />

              <div className="mt-7 grid items-start gap-x-14 gap-y-4 lg:grid-cols-[1.05fr_1fr]">
                <div>
                  <div className="flex items-center gap-3 [font-size:var(--text-label)] tracking-[0.22em] text-brass uppercase">
                    <span>{film.eyebrow}</span>
                    <i aria-hidden="true" className="block h-px w-6 bg-brass/50" />
                    {/* <time> con dateTime en ISO-8601 de duración: el sello es
                        para el ojo, pero así también lo entiende un lector de
                        pantalla y queda como dato, no como adorno. */}
                    <time dateTime={`PT${film.seconds}S`} className="text-sage">
                      {runtime(film.seconds)}
                    </time>
                  </div>
                  <h3 className="mt-3 text-bone [font-size:var(--text-h3)]">
                    {film.title}
                  </h3>
                </div>
                <p className="max-w-[46ch] text-sage [font-size:var(--text-body)] lg:pt-2">
                  {film.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}
