import Link from "next/link";
import { getGallery } from "@/content/galleries";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import PageHero from "./PageHero";
import Lightbox from "./Lightbox";
import ContactCta from "./ContactCta";
import Reveal from "./Reveal";
import { Band, Eyebrow, Kicker } from "./ui";

/** Plantilla compartida por las cuatro rutas de servicio. */
export default function ServicePage({ service }: { service: Service }) {
  const related = service.relatedGalleries
    .map(getGallery)
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  // Una muestra de cada galería relacionada, no la galería entera.
  const preview = related.flatMap((g) => g.images.slice(0, 4));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/*
        El h1 lleva el nombre del servicio, no el eslogan: "Landscape
        Architecture" es el término por el que se busca esta página.
        El eslogan baja a lead.
      */}
      <PageHero
        eyebrow="What We Do"
        title={service.title}
        lead={service.tagline}
        image={service.hero}
        imageAlt={service.heroAlt}
        height="short"
      />

      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">/ {service.index}</Kicker>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
              <h2 className="text-forest [font-size:var(--text-h3)]">
                {service.title}
              </h2>
              <div className="flex flex-col gap-5">
                {service.intro.map((paragraph, i) => (
                  <p
                    key={i}
                    className="measure text-stone [font-size:var(--text-body)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-16 border-t border-ink/15">
            {service.steps.map((step, i) => (
              <Reveal key={step.heading} delay={i === 0 ? 0 : 0.04}>
                <div className="grid gap-6 border-b border-ink/15 py-12 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
                  <h3 className="text-ink [font-size:var(--text-h3)]">
                    {step.heading}
                  </h3>
                  <p className="measure text-stone [font-size:var(--text-body)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {preview.length > 0 && (
        <Band tone="ink">
          <div className="wrap">
            <Reveal>
              <Kicker>Featured Galleries</Kicker>
              <h2 className="mb-4 [font-size:var(--text-h2)]">
                {related.map((g) => g.title).join(" · ")}
              </h2>
              <Link
                href="/galleries"
                className="mb-10 inline-block [font-size:var(--text-label)] tracking-[0.2em] text-brass uppercase hover:text-bone"
              >
                All galleries →
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <Lightbox images={preview} columns={4} />
            </Reveal>
          </div>
        </Band>
      )}

      <Band tone="forest">
        <div className="wrap">
          <Reveal>
            <Kicker>The other disciplines</Kicker>
            <ul className="grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={other.href}
                    className="block h-full rounded-[2px] border border-bone/20 p-6 transition-colors hover:border-brass"
                  >
                    <Eyebrow className="text-brass">/ {other.index}</Eyebrow>
                    <h3 className="mt-3 text-2xl text-bone">
                      {other.shortTitle}
                    </h3>
                    <p className="mt-3 text-sm text-sage">{other.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Band>

      <ContactCta title={service.cta} />
    </>
  );
}
