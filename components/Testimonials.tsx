import { testimonials } from "@/content/testimonials";
import Reveal from "./Reveal";
import { Band, Kicker } from "./ui";

/**
 * Prueba social para el home. Devuelve `null` mientras no haya reseñas reales
 * cargadas en `content/testimonials.ts` — no deja hueco visual en la página.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Band tone="bone">
      <div className="wrap">
        <Reveal>
          <Kicker tone="forest">What clients say</Kicker>
          <h2 className="max-w-[20ch] text-ink [font-size:var(--text-h2)]">
            Trusted by the people who live with the work.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.author} className="border-t border-ink/15 pt-6">
                <blockquote className="serif-lead text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 [font-size:var(--text-label)] tracking-[0.14em] text-stone uppercase">
                  {t.author}
                  {t.source ? ` — ${t.source}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
