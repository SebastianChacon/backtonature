import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Band, Eyebrow, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with the Back to Nature studio in Basking Ridge, New Jersey. Consultations by appointment across New Jersey, New York and Connecticut.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with us."
        lead="Consultations are by appointment. Tell us about the property and we'll usually be walking it within a week."
        image="https://backtonature.net/wp-content/uploads/2023/06/contact-us-header.jpeg"
        imageAlt="A planted terrace at the edge of a woodland clearing"
        height="short"
      />

      <Band tone="ink">
        <div className="wrap grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Formulario */}
          <Reveal>
            <Kicker>Send us a message</Kicker>
            <h2 className="mb-10 max-w-[16ch] [font-size:var(--text-h2)]">
              Start a project.
            </h2>
            <ContactForm />
          </Reveal>

          {/* NAP — mismo dato que el JSON-LD (S-04) */}
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-10 border-t border-bone/15 pt-10 lg:border-t-0 lg:border-l lg:border-bone/15 lg:pt-0 lg:pl-12">
              <div>
                <Eyebrow className="text-brass">Landscape Design Office</Eyebrow>
                <p className="mt-3">
                  <a
                    href={site.contact.designOfficeHref}
                    className="font-[family-name:var(--font-display)] text-3xl text-bone hover:text-white"
                  >
                    {site.contact.designOffice}
                  </a>
                </p>
                <p className="mt-2 text-sage">{site.contact.hours}</p>
              </div>

              <div>
                <Eyebrow className="text-brass">Studio</Eyebrow>
                <p className="mt-3">
                  <a
                    href={site.contact.phoneHref}
                    className="font-[family-name:var(--font-display)] text-3xl text-bone hover:text-white"
                  >
                    {site.contact.phone}
                  </a>
                </p>
              </div>

              <div>
                <Eyebrow className="text-brass">Email</Eyebrow>
                <p className="mt-3">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-bone hover:text-white"
                  >
                    {site.contact.email}
                  </a>
                </p>
              </div>

              <div>
                <Eyebrow className="text-brass">Studio location</Eyebrow>
                <p className="mt-3 text-bone">
                  {site.contact.locality}, {site.contact.regionName}
                </p>
              </div>

              <div>
                <Eyebrow className="text-brass">Service area</Eyebrow>
                <ul className="mt-3 flex flex-col gap-1 text-bone">
                  {site.contact.serviceArea.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
