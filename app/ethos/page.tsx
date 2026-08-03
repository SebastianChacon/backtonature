import type { Metadata } from "next";
import { ethosPage } from "@/content/pages";
import { cultivate } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import EditorialSections from "@/components/EditorialSections";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import FadeImage from "@/components/FadeImage";
import { Band, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Ethos",
  description:
    "More than a landscape company — creators of outdoor living experiences. How Back to Nature designs with intention, care and responsibility to the land.",
  path: "/ethos",
});

export default function EthosPage() {
  return (
    <>
      <PageHero
        eyebrow={ethosPage.eyebrow}
        title={ethosPage.title}
        lead={ethosPage.lead}
        image={ethosPage.hero}
        imageAlt={ethosPage.heroAlt}
      />

      <Band tone="bone">
        <div className="wrap">
          <EditorialSections sections={ethosPage.sections} />
        </div>
      </Band>

      <Band tone="forest">
        <div className="wrap">
          <Reveal>
            <Kicker>Cultivate</Kicker>
            <h2 className="max-w-[18ch] text-bone [font-size:var(--text-h2)]">
              A landscape that gives back, season after season.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {cultivate.map((item) => (
                <figure
                  key={item.title}
                  className="group relative aspect-[3/4] overflow-hidden rounded-[2px]"
                >
                  <FadeImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-xl text-white">
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
