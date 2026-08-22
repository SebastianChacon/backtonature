/**
 * Logros, credenciales y pruebas verificables — la capa de "por qué contratarlos".
 *
 * REGLA DE ESTE ARCHIVO: nada entra aquí sin una fuente pública citable. Cada
 * entrada lleva `source`, y el `source` es lo que se usaría para defender la
 * afirmación si un cliente (o el equipo legal de Mariani) la cuestiona. No hay
 * cifras redondeadas "de marketing" ni superlativos sin respaldo: el sitio
 * actual ya dice "award-winning" sin nombrar un solo premio, y esa es
 * exactamente la clase de afirmación que no convierte.
 *
 * Ojo con la atribución: los premios del campus de The Willow School son DEL
 * COLEGIO, no de Back to Nature. Lo que es de Back to Nature es haber sido el
 * arquitecto paisajista y autor del plan maestro de ese campus. El copy respeta
 * esa distinción a propósito.
 */

export type Source = {
  /** Publicación citable — se enlaza con rel="nofollow" en el detalle. */
  label: string;
  url: string;
};

export type Credential = {
  /** Año o rango. Se muestra como dato tipográfico, no como fecha semántica. */
  year: string;
  title: string;
  body: string;
  source: Source;
};

/**
 * El año de fundación manda sobre cualquier redondeo. 1994 → "three decades",
 * nunca "four": el propio comunicado de Mariani dice "over 30 years".
 */
export const founded = 1994;

/** Años cumplidos, calculado — para que el copy no envejezca solo. */
export const yearsInPractice = new Date().getFullYear() - founded;

/**
 * Los cinco hechos que mejor responden "¿por qué estos y no otro paisajista?".
 * Ordenados por peso, no cronológicamente: el plan maestro de Willow es el
 * argumento más fuerte que tiene la firma y va primero.
 */
export const credentials: Credential[] = [
  {
    year: "2001–2018",
    title: "Master planners of the greenest school campus in America",
    body: "Back to Nature drew the campus master plan for The Willow School in Gladstone, NJ, and served as its landscape architect. Built to that plan, the campus became the first LEED-rated independent school in the country, home to the first LEED Gold building in the Northeast and the first LEED Platinum building in New Jersey.",
    source: {
      label: "Landscape Performance Series, Landscape Architecture Foundation",
      url: "https://www.landscapeperformance.org/case-study-briefs/the-willow-school",
    },
  },
  {
    year: "2016",
    title: "A Living Building — one of roughly a dozen on earth",
    body: "The campus's Health, Wellness & Nutrition Center earned New Jersey's first Living Building Challenge certification — the strictest standard in green building — and remains the largest certified Living Building at any school in the United States.",
    source: {
      label: "International Living Future Institute",
      url: "https://living-future.org/case-studies/the-health-wellness-and-nutrition-center-at-the-willow-school%EF%BF%BC/",
    },
  },
  {
    year: "2013",
    title: "Small Business Person of the Year",
    body: "Founder Anthony Sblendorio was named Small Business Person of the Year by the Small Business Council of America and honored at the 30th Annual Congressional Awards Reception in Washington, D.C.",
    source: {
      label: "Patch",
      url: "https://patch.com/new-jersey/baskingridge/basking-ridge-business-owner-wins-u-s-small-biz-award",
    },
  },
  {
    year: "2012",
    title: "4,000 trees back into New Jersey after Sandy",
    body: "Superstorm Sandy took more than 15,000 trees from Basking Ridge alone and nearly wiped out our own nursery. We committed over 4,000 trees to towns across central and northern New Jersey, and put spruces in the hands of local kindergartners to plant that spring.",
    source: {
      label: "CBS New York",
      url: "https://www.cbsnews.com/newyork/news/nj-kindergartners-helping-to-replace-trees-lost-to-superstorm-sandy/",
    },
  },
  {
    year: "2024",
    title: "Invited into Mariani Premier Group",
    body: "Back to Nature was selected to join Mariani Premier Group, the national partnership of premier landscape firms — bringing the resources of a nationwide organization to a studio that still answers its own phone.",
    source: {
      label: "Mariani Premier Group",
      url: "https://marianipremiergroup.com/mariani-premier-group-expands-again-with-addition-of-innovative-new-jersey-firm-back-to-nature-home-garden/",
    },
  },
];

/**
 * Cifras medidas en el campus de Willow por la Landscape Architecture
 * Foundation. Son *rendimiento verificado por un tercero*, no estimaciones
 * nuestras — el único bloque del sitio del que se puede decir eso.
 */
export const measuredOutcomes = {
  intro:
    "The Landscape Architecture Foundation measured what the landscape we designed at The Willow School actually does, year after year:",
  source: {
    label: "Landscape Performance Series",
    url: "https://www.landscapeperformance.org/case-study-briefs/the-willow-school",
  },
  stats: [
    {
      value: "375,000",
      unit: "gallons",
      label: "of potable water saved every year",
      note: "Rainwater harvested on site and used inside the buildings.",
    },
    {
      value: "380,000",
      unit: "gallons",
      label: "of wastewater treated on site each year",
      note: "Constructed wetlands and sand filtration — no municipal sewer.",
    },
    {
      value: "34",
      unit: "acres",
      label: "planned as one working ecosystem",
      note: "Meadow, woodland, wetland and food gardens, drawn as a single system.",
    },
  ],
} as const;

/**
 * Credenciales de la persona que firma los planos. En una compra de este
 * tamaño la gente contrata a alguien, no a un logotipo.
 */
export const founderCredentials = {
  name: "Anthony Sblendorio",
  role: "Founder & Co-President",
  lead: "One of the first landscape architects in the region to build a practice around regenerative design — three decades before the rest of the industry started calling it that.",
  credentials: [
    "Licensed landscape architect",
    "LEED Accredited Professional",
    "Member, American Society of Landscape Architects",
    "Taught regenerative planning studios at NJIT and Rutgers",
    "Trained staff at the NJ Department of Environmental Protection",
  ],
  source: {
    label: "PRWeb",
    url: "https://www.prweb.com/releases/2015/06/prweb12807580.htm",
  },
} as const;

/**
 * Qué pasa DESPUÉS de pulsar el botón. Es la objeción real que frena una
 * llamada —"¿cuánto tarda esto en moverse?"— y las tres respuestas salen del
 * proceso que la propia firma publica en /how-we-work, no de un invento.
 */
export const whatHappensNext = [
  {
    title: "On site in 1–2 days",
    body: "We walk the property with you, usually within 48 hours of your first call.",
  },
  {
    title: "Design & proposal within a week",
    body: "An initial hand-drawn concept, a full scope and a real timeline — not a placeholder estimate.",
  },
  {
    title: "One team, one contact",
    body: "Architects, masons, horticulturists and permit expeditors are all in house. You never coordinate a subcontractor.",
  },
] as const;
