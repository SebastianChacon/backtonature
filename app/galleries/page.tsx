import type { Metadata } from "next";
import { galleries, totalGalleryImages } from "@/content/galleries";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import GalleryBrowser from "@/components/GalleryBrowser";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { Band, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Galleries",
  description:
    "Drawings, meadows, custom pools, old world masonry, mature trees, details, edible gardens and seasonal decor — the studio's work by subject.",
  path: "/galleries",
});

export default function GalleriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Galleries"
        title="The work, by subject."
        lead={`${totalGalleryImages} photographs across ${galleries.length} collections — from hand-drawn plans to the meadows they became.`}
        image={galleries[0].cover}
        imageAlt="A selection of built landscape work"
        height="short"
      />

      <Band tone="ink">
        <div className="wrap">
          <Reveal>
            <Kicker>Browse</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <GalleryBrowser categories={galleries} />
          </Reveal>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
