import {
  credentials,
  founded,
  founderCredentials,
  measuredOutcomes,
  yearsInPractice,
} from "@/content/credentials";
import Reveal from "./Reveal";
import { Band, Eyebrow, Kicker } from "./ui";

/**
 * Prueba de credibilidad. Tres piezas independientes porque se consumen en
 * momentos distintos del recorrido:
 *
 * - `Recognition`      → home, justo después del portfolio ("¿son de fiar?").
 * - `MeasuredOutcomes` → /about, para quien ya está evaluando en serio.
 * - `FounderCredentials` → /about, porque a esta escala se contrata a alguien.
 *
 * Todas las afirmaciones salen de `content/credentials.ts`, y ahí cada una
 * lleva su fuente. Las fuentes se muestran: un premio sin verificar es ruido,
 * y un premio verificable es el único que mueve a alguien a llamar.
 */

/**
 * Enlace a la fuente. `nofollow` + `noopener` — son citas, no endorsements SEO.
 *
 * A11Y · el color NO es `text-stone`, que es el gris de apoyo del resto del
 * sitio. A este tamaño (--text-label, ~11-12px) stone da 3.8:1 sobre `ink` y
 * 4.27:1 sobre `bone`: ambos por debajo del 4.5:1 que exige AA para texto
 * normal. `sage` sobre oscuro rinde 7.6:1 y `forest` sobre claro 7.7:1.
 */
function SourceLink({
  label,
  url,
  tone = "dark",
}: {
  label: string;
  url: string;
  tone?: "dark" | "light";
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener nofollow"
      className={`inline-flex items-center gap-1.5 underline decoration-current/30 underline-offset-4 [font-size:var(--text-label)] tracking-[0.14em] uppercase transition-colors duration-300 ${
        tone === "dark"
          ? "text-sage hover:text-brass"
          : "text-forest hover:text-ink"
      }`}
    >
      {label}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/**
 * Home · el listado de logros.
 *
 * Es una `<ol>` deliberadamente: el orden no es cronológico sino de peso
 * argumental, y quiero que un lector de pantalla anuncie "1 de 5" para que la
 * jerarquía se perciba también sin ver la maquetación.
 */
export function Recognition() {
  return (
    <Band tone="ink">
      <div className="wrap">
        <Reveal>
          <Kicker>Why us</Kicker>
          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <h2 className="max-w-[18ch] text-bone [font-size:var(--text-h2)]">
              The record behind the drawings.
            </h2>
            <p className="max-w-[42ch] text-sage [font-size:var(--text-body)]">
              Every landscape firm calls itself award-winning. Here is ours,
              with the receipts — {yearsInPractice} years of practice since{" "}
              {founded}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ol className="mt-14 border-t border-bone/15">
            {credentials.map((item) => (
              <li
                key={item.title}
                className="grid gap-3 border-b border-bone/15 py-9 lg:grid-cols-[0.5fr_1.6fr_2.4fr] lg:gap-10"
              >
                <p className="font-[family-name:var(--font-display)] text-xl text-brass">
                  {item.year}
                </p>
                <h3 className="max-w-[22ch] text-bone [font-size:var(--text-h3)]">
                  {item.title}
                </h3>
                <div className="flex flex-col items-start gap-4">
                  <p className="max-w-[52ch] text-sage">{item.body}</p>
                  <SourceLink {...item.source} />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Band>
  );
}

/**
 * /about · rendimiento medido por un tercero.
 *
 * Las cifras son de la Landscape Architecture Foundation sobre el campus de
 * The Willow School, no autoinformadas. Es el único bloque del sitio del que
 * se puede decir eso, y por eso la atribución va en el propio encabezado en
 * vez de en letra pequeña.
 */
export function MeasuredOutcomes() {
  return (
    <Band tone="ink-soft">
      <div className="wrap">
        <Reveal>
          <Kicker>Measured, not claimed</Kicker>
          <h2 className="max-w-[20ch] text-bone [font-size:var(--text-h2)]">
            What a landscape of ours does after we leave.
          </h2>
          <p className="mt-6 max-w-[54ch] text-sage [font-size:var(--text-body)]">
            {measuredOutcomes.intro}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <dl className="mt-14 grid gap-10 border-t border-bone/15 pt-10 sm:grid-cols-3 lg:gap-14">
            {measuredOutcomes.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="font-[family-name:var(--font-display)] text-5xl leading-none text-forest-bright">
                    {stat.value}
                  </p>
                  <p className="mt-2 [font-size:var(--text-label)] tracking-[0.2em] text-brass uppercase">
                    {stat.unit}
                  </p>
                  <p className="mt-4 max-w-[24ch] text-bone">{stat.label}</p>
                  <p className="mt-2 max-w-[28ch] text-sm text-sage">
                    {stat.note}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <SourceLink {...measuredOutcomes.source} />
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

/** /about · quién firma los planos. */
export function FounderCredentials() {
  return (
    <Band tone="bone">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
            <div>
              <Eyebrow className="text-brass">
                {founderCredentials.role}
              </Eyebrow>
              <h2 className="mt-3 text-forest [font-size:var(--text-h3)]">
                {founderCredentials.name}
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <p className="measure text-stone [font-size:var(--text-body)]">
                {founderCredentials.lead}
              </p>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {founderCredentials.credentials.map((line) => (
                  <li
                    key={line}
                    className="border-b border-ink/10 pb-3 text-stone"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              <SourceLink {...founderCredentials.source} tone="light" />
            </div>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
