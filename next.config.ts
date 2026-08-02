import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio actual canonicaliza con barra final (/about/ y 301 desde /about).
  // Mantenerlo es parte del requisito S-01 (paridad de URLs).
  trailingSlash: true,

  images: {
    // Requisito: las fotos siguen viviendo en la biblioteca de WordPress hasta que
    // el cliente entregue los originales. next/image las sirve como AVIF/WebP.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backtonature.net",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // 75 = default de Next para las piezas del mosaico y las miniaturas; 85 es
    // el que piden las portadas (home, PageHero, ContactCta) — son la imagen
    // más grande y más vista de cada página, así que ahí sí se paga el peso
    // extra a cambio de que no se note la compresión.
    qualities: [75, 85],
  },

  poweredByHeader: false,

  async redirects() {
    // Rutas heredadas de WordPress y variantes que ya circulan en enlaces
    // externos. Origen y destino llevan barra final a propósito: con
    // `trailingSlash: true` Next normaliza la URL ANTES de evaluar estas
    // reglas, así que un `source: "/services"` nunca llegaría a coincidir, y un
    // `destination: "/what-we-do"` encadenaría un salto extra.
    // Se usa 301 explícito en vez de `permanent` (que emite 308) porque el
    // documento de requerimientos pide 301 y algún crawler antiguo aún lo trata
    // distinto.
    const legacy: [string, string][] = [
      ["/home/", "/"],
      ["/index.php", "/"],
      ["/case-studies/", "/case-study/"],
      ["/portfolio/", "/case-study/"],
      ["/work/", "/case-study/"],
      ["/projects/", "/case-study/"],
      ["/services/", "/what-we-do/"],
      ["/gallery/", "/galleries/"],
      ["/about-us/", "/about/"],
      ["/contact-us/", "/contact/"],
      ["/privacy/", "/privacy-policy/"],
      ["/accessibility/", "/accessibility-statement/"],
      ["/edible-gardens/", "/edible-gardens-and-culinary-experiences/"],
    ];

    return legacy.map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
