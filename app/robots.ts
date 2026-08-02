import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * S-02 · robots.txt.
 *
 * El sitio actual publica `Sitemap: https://backtonature.com/sitemaps.xml`
 * — un dominio aparcado, distinto del real. Google buscaba el sitemap donde no
 * existe. Aquí apunta a backtonature.net, que es el dominio que se indexa.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
