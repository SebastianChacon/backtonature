import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * S-03 · Metadatos.
 * Una sola función para que ninguna ruta se quede sin title, description,
 * canonical y Open Graph propios.
 */

type PageMetaInput = {
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz, con barra final: "/about/". */
  path: string;
  image?: string;
  type?: "website" | "article";
};

/** El sitio canonicaliza con barra final (paridad con el sitio actual). */
export function canonical(path: string): string {
  if (path === "/") return `${site.url}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return `${site.url}${clean}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
  type = "website",
}: PageMetaInput): Metadata {
  const url = canonical(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [image],
    },
  };
}
