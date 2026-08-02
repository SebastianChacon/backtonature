import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProject, getRelatedProjects, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Lightbox from "@/components/Lightbox";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { ProjectTile } from "@/components/ProjectMosaic";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/JsonLd";
import { Band, Breadcrumbs, Eyebrow, Kicker } from "@/components/ui";

/** F-02 · Cada proyecto del CMS genera su ruta /portfolio/[slug]. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: `${project.tagline} ${project.location}.`,
    path: `/portfolio/${project.slug}`,
    image: project.hero,
    type: "article",
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);
  const trail = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-study" },
    { label: project.title },
  ];

  const hasObjectives =
    project.objectives.materials.length > 0 ||
    project.objectives.elements.length > 0;

  return (
    <>
      <ProjectJsonLd project={project} />
      <BreadcrumbJsonLd trail={trail} />

      <PageHero
        eyebrow={project.location}
        title={project.title}
        lead={project.tagline}
        image={project.hero}
        imageAlt={project.heroAlt}
      >
        <div className="mt-8">
          <Breadcrumbs trail={trail} />
        </div>
      </PageHero>

      {/* Ficha del proyecto */}
      <section className="bg-ink-soft py-12">
        <div className="wrap">
          <dl className="grid gap-8 sm:grid-cols-3">
            {[
              ["Location", project.location],
              ["Scope", project.scope],
              ["Focus", project.tags.join(" · ")],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>
                  <Eyebrow className="text-brass">{label}</Eyebrow>
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-display)] text-xl text-bone">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Narrativa — o aviso honesto de que aún no existe */}
      {project.narrativePending ? (
        <Band tone="bone">
          <div className="wrap">
            <Reveal>
              <Kicker tone="forest">The Project</Kicker>
              <p className="serif-lead measure text-ink">
                This project is currently published as a visual study. The
                written case study — brief, design response and outcome — is
                being prepared with the client.
              </p>
            </Reveal>
          </div>
        </Band>
      ) : (
        <Band tone="bone">
          <div className="wrap">
            {project.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i === 0 ? 0 : 0.03}>
                <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
                  <h2 className="text-forest [font-size:var(--text-h3)] lg:sticky lg:top-28 lg:self-start">
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
          </div>
        </Band>
      )}

      {/* Cita destacada sobre foto */}
      {project.pullQuote && project.gallery[0] && (
        <section className="relative flex min-h-[60svh] items-center overflow-hidden">
          <Image
            src={project.gallery[0].src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/70"
          />
          <div className="wrap relative z-10 w-full py-20">
            <blockquote className="serif-lead max-w-[28ch] text-white [font-size:var(--text-h3)]">
              “{project.pullQuote}”
            </blockquote>
          </div>
        </section>
      )}

      {/* Objetivos de diseño */}
      {hasObjectives && (
        <Band tone="forest">
          <div className="wrap">
            <Reveal>
              <Kicker>Design Objectives</Kicker>
              <div className="grid gap-12 lg:grid-cols-2">
                {project.objectives.materials.length > 0 && (
                  <div>
                    <h2 className="mb-5 text-bone [font-size:var(--text-h3)]">
                      Building Materials
                    </h2>
                    <ul className="flex flex-wrap gap-2.5">
                      {project.objectives.materials.map((m) => (
                        <li
                          key={m}
                          className="rounded-full border border-bone/25 px-4 py-1.5 text-sm text-bone/85"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.objectives.elements.length > 0 && (
                  <div>
                    <h2 className="mb-5 text-bone [font-size:var(--text-h3)]">
                      Landscape Elements
                    </h2>
                    <ul className="flex flex-wrap gap-2.5">
                      {project.objectives.elements.map((e) => (
                        <li
                          key={e}
                          className="rounded-full border border-bone/25 px-4 py-1.5 text-sm text-bone/85"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Band>
      )}

      {/* Galería con lightbox (F-04) */}
      {project.gallery.length > 0 && (
        <Band tone="ink">
          <div className="wrap">
            <Reveal>
              <Kicker>The Grounds</Kicker>
              <h2 className="mb-10 max-w-[18ch] [font-size:var(--text-h2)]">
                {project.gallery.length} photographs from the site.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Lightbox images={project.gallery} />
            </Reveal>
          </div>
        </Band>
      )}

      {/* Proyectos relacionados */}
      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">More Work</Kicker>
            <h2 className="mb-10 text-ink [font-size:var(--text-h2)]">
              Related projects
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <ProjectTile
                  key={p.slug}
                  project={p}
                  shape="aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Band>

      <ContactCta title="Ready to elevate your outdoor living space?" />
    </>
  );
}
