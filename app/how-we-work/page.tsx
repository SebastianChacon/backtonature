import type { Metadata } from "next";
import { processSteps } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { Band, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "From the first on-site consultation to long-term stewardship — the four stages of a Back to Nature project, with one point of contact throughout.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title="A considered path from land to legacy."
        lead="One studio, four stages, and the same team from the first site walk to the tenth season of care."
        image="https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-D-R.jpg"
        imageAlt="A designed landscape maturing into the land it belongs to"
        height="short"
      />

      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">The Process</Kicker>
          </Reveal>

          <ol className="border-t border-ink/15">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} as="li" delay={i === 0 ? 0 : 0.04}>
                <div className="grid gap-6 border-b border-ink/15 py-12 lg:grid-cols-[auto_1fr_2fr] lg:gap-16">
                  <span className="font-[family-name:var(--font-display)] text-5xl leading-none text-brass">
                    {step.num}
                  </span>
                  <h2 className="text-forest [font-size:var(--text-h3)]">
                    {step.title}
                  </h2>
                  <p className="measure text-stone [font-size:var(--text-body)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
