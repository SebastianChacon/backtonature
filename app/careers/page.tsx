import type { Metadata } from "next";
import { careersCopy, openRoles } from "@/content/pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Band, Eyebrow, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "A meaningful career in landscaping starts with Back to Nature. Open roles in construction, studio design and maintenance in Northern New Jersey.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careersCopy.eyebrow}
        title={careersCopy.title}
        lead={careersCopy.lead}
        image={careersCopy.hero}
        imageAlt={careersCopy.heroAlt}
        height="short"
      />

      <Band tone="ink">
        <div className="wrap">
          <Reveal>
            <Kicker>Open Roles</Kicker>
            <h2 className="mb-10 max-w-[18ch] [font-size:var(--text-h2)]">
              We&apos;re hiring across the studio.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="border-t border-bone/15">
              {openRoles.map((role) => (
                <li
                  key={role.title}
                  className="flex flex-wrap items-baseline justify-between gap-4 border-b border-bone/15 py-7"
                >
                  <h3 className="text-bone [font-size:var(--text-h3)]">
                    {role.title}
                  </h3>
                  <Eyebrow className="text-sage">{role.type}</Eyebrow>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 rounded-[3px] border border-bone/20 bg-ink-soft p-8">
              <Eyebrow className="text-brass">How to apply</Eyebrow>
              <p className="mt-4 max-w-[52ch] text-bone/85">
                Send a CV and a note about the work you want to do to{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-brass underline underline-offset-4"
                >
                  {site.contact.email}
                </a>
                , or call the studio on{" "}
                <a href={site.contact.phoneHref} className="text-brass">
                  {site.contact.phone}
                </a>
                .
              </p>
              <p className="mt-4 max-w-[52ch] text-sm text-stone">
                Note: the online application form with file attachments (F-03)
                is scheduled for the next phase; today this page routes
                applicants to email and phone.
              </p>
            </div>
          </Reveal>

          {/* El sitio actual publica esta página también en español. */}
          <Reveal delay={0.15}>
            <div className="mt-10 border-t border-bone/15 pt-10" lang="es">
              <Eyebrow className="text-brass">En español</Eyebrow>
              <p className="mt-4 max-w-[52ch] text-bone/85">
                {careersCopy.leadEs}
              </p>
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
