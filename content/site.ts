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
    poster:
      "https://backtonature.net/wp-content/uploads/2023/06/Back-to-Nature-Homepage-Header-2-Compressed.jpg",
    /**
     * Los dos másters traen la placa de intro con el logo incrustada y ese
     * lettering choca con el titular. El video se reproduce oculto sobre el
     * póster estos segundos y luego se funde. Es una tirita: el arreglo bueno
     * es que el cliente entregue un máster sin intro, como pide el documento de
     * requerimientos (§11 Contenido y activos). Al llegar, poner 0.
     */
    revealAfter: 12,
  },
  cta: {
    vimeoId: "783406618",
    title: "Ambient garden film",
    poster:
      "https://backtonature.net/wp-content/uploads/2023/06/inspired-meadow.jpg",
    revealAfter: 9,
  },
} as const;
