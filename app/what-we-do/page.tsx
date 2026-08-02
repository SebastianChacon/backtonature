import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { Band, Eyebrow, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "What We Do",
  description:
    "Four disciplines under one roof: landscape architecture, landscape construction, landscape maintenance, and edible gardens with culinary experiences.",
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Four disciplines, one integrated studio."
        lead="Design, build and stewardship handled by the same team — so nothing is lost in the handoff between them."
        image={services[0].hero}
        imageAlt={services[0].heroAlt}
        height="short"
      />

      <Band tone="bone">
        <div className="wrap">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i === 0 ? 0 : 0.04}>
              <article
                className={`grid items-center gap-8 border-t border-ink/15 py-14 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Image
                    src={service.hero}
                    alt={service.heroAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </figure>

                <div>
                  <Eyebrow className="text-brass">/ {service.index}</Eyebrow>
                  <h2 className="mt-3 text-ink [font-size:var(--text-h2)]">
                    {service.title}
                  </h2>
                  <p className="serif-lead mt-4 text-forest">
                    {service.tagline}
                  </p>
                  <div className="mt-6 flex flex-col gap-4">
                    {service.intro.map((paragraph, j) => (
                      <p key={j} className="measure text-stone">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={service.href}
                    className="group mt-7 inline-flex items-center gap-3 border-b border-forest pb-1 [font-size:var(--text-label)] tracking-[0.22em] text-forest uppercase"
                  >
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band tone="forest">
        <div className="wrap">
          <Reveal>
            <Kicker>Single point of contact</Kicker>
            <h2 className="max-w-[20ch] text-bone [font-size:var(--text-h2)]">
              Everything managed under one roof.
            </h2>
            <p className="mt-6 max-w-[52ch] text-sage [font-size:var(--text-body)]">
              Because design, construction and maintenance are the same studio,
              you never coordinate between vendors — and the crew that plants
              the garden is briefed by the person who drew it.
            </p>
          </Reveal>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
