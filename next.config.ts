import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio actual canonicaliza con barra final (/about/ y 301 desde /about).
  // Mantenerlo es parte del requisito S-01 (paridad de URLs).
  trailingSlash: true,

  images: {
    // Requisito: las fotos de galería/mosaico siguen viviendo en la biblioteca
    // de WordPress hasta que el cliente entregue los originales. Las
    // portadas (LCP de cada página) se auto-alojaron en /public/images/hero
    // para no depender de la latencia de un origen externo en la foto que
    // más bloquea el pintado — ver public/images/hero.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backtonature.net",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // El salto por defecto de Next (1920 → 3840) obliga a una pantalla
    // retina normal (~1280 CSS px × 2 dpr = 2560) a descargar el bucket de
    // 3840 entero. Se añade 2560 para que esa franja, la más común en
    // portátiles retina, no pague el peso del bucket más grande.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // 60 = piezas del mosaico, miniaturas, fotos de página interior Y las
    // portadas (home, PageHero, ContactCta) — comprobado visualmente: en
    // fotos con follaje/detalle fino, 75 no se distingue de 60 pero pesa
    // ~27% más incluso en AVIF, y encima la portada siempre lleva un
    // degradado oscuro pesado encima. 75 se mantiene solo para el visor de
    // Lightbox (foto suelta a pantalla completa, ahí sí se pide detalle real).
    qualities: [60, 75],
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
