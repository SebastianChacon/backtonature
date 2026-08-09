/**
 * Datos de marca, contacto y navegación.
 *
 * Todo el contenido del sitio vive en `content/` como TypeScript tipado.
 * El esquema replica el que tendría un CMS headless (F-01), de modo que
 * migrar a Sanity/Payload es sustituir estos módulos por funciones de fetch
 * con los mismos tipos de retorno. Ver README → "Migrar a un CMS".
 */

export const site = {
  name: "Back to Nature",
  legalName: "Back to Nature Home & Garden",
  parent: "Mariani Premier Group",
  tagline: "Landscape Architecture & Design/Build",
  description:
    "An ecologically inspired landscape architecture and design/build firm and garden center in Basking Ridge, New Jersey, serving New Jersey, New York and Connecticut.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://backtonature.net",
  locale: "en_US",
  founded: "Est. New Jersey",

  /** NAP consistente — se reutiliza en el footer, /contact y el JSON-LD (S-04). */
  contact: {
    phone: "(908) 350-7506",
    phoneHref: "tel:+19083507506",
    designOffice: "(908) 439-4639",
    designOfficeHref: "tel:+19084394639",
    email: "info@backtonature.net",
    locality: "Basking Ridge",
    region: "NJ",
    regionName: "New Jersey",
    country: "US",
    hours: "Mon–Fri · 9–5, by appointment",
    openingHours: "Mo-Fr 09:00-17:00",
    serviceArea: ["New Jersey", "New York", "Connecticut"],
  },

  social: {
    instagram: "https://www.instagram.com/backtonature.nj",
  },

  analytics: {
    /** GA4 del sitio actual. Se activa solo si la variable está definida (F-06). */
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  },

  /** Imagen por defecto para Open Graph (S-03). */
  ogImage:
    "https://backtonature.net/wp-content/uploads/2023/06/BTN-Landscape-6a.jpg",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Navegación principal — F-07. */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "/case-study" },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      { label: "Landscape Architecture", href: "/landscape-architecture" },
      { label: "Landscape Construction", href: "/landscape-construction" },
      { label: "Landscape Maintenance", href: "/landscape-maintenance" },
      {
        label: "Edible Gardens & Culinary",
        href: "/edible-gardens-and-culinary-experiences",
      },
    ],
  },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Galleries", href: "/galleries" },
  { label: "About", href: "/about" },
  { label: "Ethos", href: "/ethos" },
];

/** Mapa del sitio en el footer — F-07. */
export const footerNav = {
  studio: [
    { label: "About", href: "/about" },
    { label: "Ethos", href: "/ethos" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Careers", href: "/careers" },
  ],
  work: [
    { label: "Case Studies", href: "/case-study" },
    { label: "Galleries", href: "/galleries" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Accessibility", href: "/accessibility-statement" },
    { label: "Subscribe", href: "/subscribe" },
  ],
};

/**
 * F-05 · Videos de fondo.
 * Son los dos únicos videos publicados hoy en backtonature.net (verificado en
 * el crawl del sitio). Cada uno lleva un póster de respaldo que se pinta antes
 * de que cargue el iframe y que es lo único que se ve con reduced-motion.
 */
export const videos = {
  hero: {
    vimeoId: "1017256479",
    title: "Ambient landscape film",
    /**
     * El póster original ("...Homepage-Header-2-Compressed.jpg") es la única
     * versión que existe de esa foto en la biblioteca: 1920×739, un techo
     * bajo para una portada a pantalla completa — en monitores anchos o
     * retina se ve borrosa porque el navegador la escala por encima de su
     * resolución nativa. Esta es la misma galería "Meadows" de
     * content/galleries.ts, pero a 2155×1436 (2.2× más píxeles) y con más
     * alto que ancho, que es lo que pide un hero de 100svh.
     */
    // Auto-alojada (D-05/perf): es el LCP de la home y se pedía en vivo a
    // WordPress en cada visita — 150-350ms de latencia de origen antes de
    // que next/image pudiera ni empezar a transcodificarla.
    poster: "/images/hero/home.jpg",
    /**
     * Ventana del máster que se usa como fondo, en segundos.
     *
     * El máster (117s) NO es metraje ambiente: es el promo de marca, y lleva
     * grafismo incrustado repartido por toda la duración —el lettering de
     * intro (0-12s), chinchetas negras con el logo sobre los planos aéreos
     * (~7s, ~31s, ~43s, ~66s, ~83s, ~90s), un plano de barbacoa (~19s), el
     * rótulo "Rooted in Excellence" (~106s) y la placa negra final con el
     * logo y el crédito de producción (~108-117s).
     *
     * `revealAfter: 12` solo esquivaba el lettering de intro: a partir de ahí
     * el hero iba enseñando chinchetas y rótulos, y cada dos minutos se ponía
     * entero negro. Por eso aquí se RECORTA en vez de retrasar — así el fondo
     * puede además destaparse de inmediato, sin 12s de foto fija delante.
     *
     * Este tramo es el único suficientemente largo y limpio del máster:
     * pradera a hora dorada, gramíneas, salvias y cardos. Verificado
     * fotograma a fotograma sobre el propio máster de Vimeo.
     *
     * Cuando el cliente entregue un máster ambiente sin grafismo (documento de
     * requerimientos §11 Contenido y activos), este recorte sobra.
     */
    // `end` va con holgura: el player avisa del progreso cada ~250ms y el salto
    // tarda en atenderse, así que se sobrepasa ~0.2-0.5s. El rótulo "Rooted in
    // Excellence" entra a ~106.4s; cortar en 104.8 deja margen de sobra.
    clip: { start: 91.5, end: 104.8 },
  },
  cta: {
    vimeoId: "783406618",
    title: "Ambient garden film",
    // Auto-alojada (perf): se pinta al final de CADA página del sitio
    // (ContactCta), así que era el segundo peaje de latencia de origen más
    // repetido de todo el sitio.
    poster: "/images/hero/inspired-meadow.jpg",
    /**
     * Mismo problema que el hero, y peor: este máster (176s) es el caso de
     * estudio en video. Lleva al director a cámara (~47s, ~64s, ~131s, ~158s),
     * planos de obra, bocetos a mano (~72s, ~144s), rótulos "AFTER" quemados
     * en la imagen (~121-129s) y una placa final blanca con el logo, el
     * teléfono y la web (~162-170s). Nada de eso puede quedar detrás del
     * bloque de contacto, que además se pinta al final de CADA página.
     *
     * `revealAfter: 9` no lo evitaba. Esta es la secuencia limpia más larga:
     * muro de piedra, borduras, terraza de piscina, pérgola y comedor con
     * lavanda, hasta justo antes de que entre el director a cámara.
     */
    // Mismo margen que el hero: el director entra a cámara a ~63.7s.
    clip: { start: 51.5, end: 62.5 },
  },
} as const;

/**
 * F-05b · Los mismos dos másters, pero para VERLOS, no como fondo.
 *
 * `videos` (arriba) los usa de tapiz y por eso tiene que recortarlos: el
 * grafismo incrustado —lettering, chinchetas con el logo, rótulos "AFTER", la
 * placa final— arruina un fondo. Aquí pasa lo contrario: ese grafismo ES la
 * pieza. Son las dos películas de marca del estudio y se reproducen enteras,
 * con sonido y controles, a petición del usuario. Por eso no llevan `clip`.
 *
 * Siguen sirviéndose desde Vimeo (cuenta de Finite Visual, la productora).
 * Vimeo no publica archivo progresivo de ninguno de los dos y tiene la
 * descarga desactivada, así que no hay copia auto-alojada que servir: el
 * reproductor incrustado es la vía prevista. Los pósters sí están
 * auto-alojados en /public/images/films — son las cartelas oficiales que
 * expone la API oEmbed, y así la sección pinta sin depender de Vimeo.
 *
 * El día que el cliente entregue los originales (requerimientos §11), esto
 * pasa a <video> local cambiando solo este objeto y FilmPlayer.
 */
export const films = [
  {
    id: "rooted-in-excellence",
    /** Título en pantalla del propio máster (~106s). */
    title: "Rooted in Excellence",
    eyebrow: "Brand Film",
    vimeoId: "1017256479",
    /** Duración real del máster en Vimeo, para el sello de la ficha. */
    seconds: 117,
    poster: "/images/films/rooted-in-excellence.jpg",
    blurb:
      "Four decades of practice in under two minutes — aerial passes over the estates, the meadow at golden hour, and the craft that holds it all together.",
  },
  {
    id: "garden-case-study",
    title: "A Garden, Start to Finish",
    eyebrow: "Case Study",
    vimeoId: "783406618",
    seconds: 176,
    poster: "/images/films/garden-case-study.jpg",
    blurb:
      "One landscape from first sketch to final planting: hand drawings, stonework going in, and the finished terrace, told by the director who designed it.",
  },
] as const;
