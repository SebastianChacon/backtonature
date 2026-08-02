import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { ProjectTile } from "@/components/ProjectMosaic";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { Band, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Nine landscapes across New Jersey, New York and Connecticut — master plans, LEED-certified grounds, native meadows and working edible gardens, each told as a project.",
  path: "/case-study",
});

export default function CaseStudyIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Case Studies"
        lead="Estates, gardens and grounds conceived as ecosystems — and built to mature with the land they belong to."
        image={projects[0].hero}
        imageAlt={projects[0].heroAlt}
        height="short"
      />

      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">The Portfolio</Kicker>
            <h2 className="max-w-[20ch] text-ink [font-size:var(--text-h2)]">
              {projects.length} projects, one way of reading a site.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.slug}>
                  <ProjectTile
                    project={project}
                    shape="aspect-[4/3]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <p className="mt-4 max-w-[38ch] text-stone">
                    {project.tagline}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-ink/15 px-3 py-1 text-[0.7rem] tracking-[0.1em] text-stone uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
