import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { canonical } from "@/lib/seo";

/**
 * S-02 · Sitemap XML válido en backtonature.net/sitemap.xml.
 * Sustituye al sitemap roto del sitio actual, que robots.txt apuntaba a
 * backtonature.com (dominio aparcado) — el fallo de indexación activo que el
 * documento de requerimientos marca como primer arreglo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/case-study", priority: 0.9 },
    { path: "/what-we-do", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/ethos", priority: 0.7 },
    { path: "/how-we-work", priority: 0.7 },
    { path: "/galleries", priority: 0.7 },
    { path: "/careers", priority: 0.5 },
    { path: "/subscribe", priority: 0.4 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/accessibility-statement", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: canonical(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((service) => ({
      url: canonical(service.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: canonical(`/portfolio/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
