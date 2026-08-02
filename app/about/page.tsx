import type { Metadata } from "next";
import Image from "next/image";
import { aboutPage } from "@/content/pages";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { Band, Button, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Back to Nature is an award-winning landscape architecture, construction and maintenance firm based in Northern New Jersey, serving New Jersey, New York and Connecticut.",
  path: "/about",
});

/** Las disciplinas que viven bajo un mismo techo — dato real del copy actual. */
const inHouse = [
  "Landscape architects",
  "Construction managers",
  "Classically trained masons",
  "Permit expeditors",
  "Horticulturists",
  "Artisans",
  "A farm-to-table chef",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        lead={aboutPage.lead}
        image={aboutPage.hero}
        imageAlt={aboutPage.heroAlt}
      />

      <Band tone="bone">
        <div className="wrap">
          {aboutPage.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i === 0 ? 0 : 0.04}>
              <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
                <h2 className="text-forest [font-size:var(--text-h3)]">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-5">
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className="measure text-stone [font-size:var(--text-body)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="grid gap-8 border-t border-ink/15 pt-12 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
              <h2 className="text-forest [font-size:var(--text-h3)]">
                In-house
              </h2>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {inHouse.map((role) => (
                  <li
                    key={role}
                    className="border-b border-ink/10 pb-3 text-stone"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* Cifras verificables del sitio actual */}
      <Band tone="forest">
        <div className="wrap">
          <Reveal>
            <Kicker>The Studio</Kicker>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                ["Studio", `${site.contact.locality}, ${site.contact.region}`],
                ["Service area", site.contact.serviceArea.join(" · ")],
                ["Disciplines", "Four, under one roof"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="[font-size:var(--text-label)] tracking-[0.2em] text-sage uppercase">
                    {label}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-3xl text-bone">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Band>

      {/* Enlace a las cuatro disciplinas */}
      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">What we do</Kicker>
            <h2 className="mb-10 max-w-[18ch] text-ink [font-size:var(--text-h2)]">
              One team, from the first sketch to the final stone.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.slug}
                  className="group relative overflow-hidden rounded-[2px]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={service.hero}
                      alt={service.heroAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent"
                    />
                    <h3 className="absolute inset-x-0 bottom-0 p-6 text-white [font-size:var(--text-h3)]">
                      {service.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Button href="/what-we-do" className="text-forest">
                Explore the disciplines
              </Button>
            </div>
          </Reveal>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
