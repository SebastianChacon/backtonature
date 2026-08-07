import { site } from "@/content/site";
import { credentials, founded, founderCredentials } from "@/content/credentials";
import type { Project } from "@/content/projects";
import { canonical } from "@/lib/seo";

/**
 * S-04 · Datos estructurados.
 * LocalBusiness con NAP consistente + zona de servicio NJ/NY/CT.
 */

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro, generado desde content/site.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "LandscapingBusiness",
        "@id": `${site.url}/#business`,
        name: site.legalName,
        alternateName: site.name,
        description: site.description,
        url: canonical("/"),
        telephone: site.contact.phone,
        email: site.contact.email,
        image: site.ogImage,
        parentOrganization: { "@type": "Organization", name: site.parent },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.contact.locality,
          addressRegion: site.contact.region,
          addressCountry: site.contact.country,
        },
        openingHours: site.contact.openingHours,
        areaServed: site.contact.serviceArea.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        foundingDate: String(founded),
        founder: {
          "@type": "Person",
          name: founderCredentials.name,
          jobTitle: founderCredentials.role,
        },
        /**
         * `award` acepta texto libre y admite varios. Se emite el título más
         * el año para que la cadena se sostenga sola fuera de contexto —
         * Google la puede mostrar sin la página alrededor.
         */
        award: credentials.map((item) => `${item.title} (${item.year})`),
        /**
         * Las fuentes citadas también van en `sameAs`: es donde un motor
         * espera encontrar corroboración de tercero, y es exactamente lo que
         * son. Se deduplican por si dos logros comparten publicación.
         */
        sameAs: [
          site.social.instagram,
          ...new Set(credentials.map((item) => item.source.url)),
        ],
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        headline: project.tagline,
        url: canonical(`/portfolio/${project.slug}`),
        image: project.hero,
        locationCreated: { "@type": "Place", name: project.location },
        creator: { "@id": `${site.url}/#business` },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: canonical(item.href) } : {}),
        })),
      }}
    />
  );
}
