/**
 * Las cuatro disciplinas (rutas hijas de /what-we-do).
 * Texto tomado del contenido publicado en backtonature.net.
 */

export type ServiceStep = {
  heading: string;
  body: string;
};

export type Service = {
  slug: string;
  /** Ruta real en el sitio actual — es una ruta raíz, no /what-we-do/[slug]. */
  href: string;
  index: string;
  title: string;
  /** Título corto para nav y tarjetas. */
  shortTitle: string;
  tagline: string;
  summary: string;
  hero: string;
  heroAlt: string;
  intro: string[];
  steps: ServiceStep[];
  /** Categorías de /galleries relacionadas con este servicio. */
  relatedGalleries: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "landscape-architecture",
    href: "/landscape-architecture",
    index: "01",
    title: "Landscape Architecture",
    shortTitle: "Landscape Architecture",
    tagline: "Inspired by nature, crafted with creativity & care",
    summary:
      "Master plans and hand-drawn designs that read the site first — grade, light, water, and the ecology already at work.",
    hero: "/images/hero/service-landscape-architecture.jpg",
    heroAlt:
      "Landscape architecture — a designed garden reading the grade of its site",
    intro: [
      "Our team is renowned for creating, planning, and executing ecologically inspired landscapes that reconnect clients to the natural beauty of their surroundings—and to the richness of local food systems. Our work is built on cultivating lasting relationships and a deep understanding of each client's unique essence.",
      "Blending artistry with innovation, we bring your vision to life through a thoughtful mix of traditional hand-drawn sketches and cutting-edge 3D modeling, ensuring every project feels personal, inspired, and enduring.",
    ],
    steps: [
      {
        heading: "Personalized On-Site Consultation",
        body: "Our journey begins with an on-site consultation, typically scheduled within 1–2 days of initial contact. This first meeting is a walk-through of your property and a walk into your world—an opportunity for us to listen, observe, and begin to understand your vision and the spirit of your space. We'll outline what to expect throughout the design, construction, and maintenance phases, ensuring transparency and collaboration from the start.",
      },
      {
        heading: "Landscape Design & Tailored Proposal",
        body: "Within a week, we reconvene to present an initial concept and a thoughtfully crafted proposal, including detailed timelines and next steps. Our design process fuses cutting-edge digital tools with the timeless elegance of hand-drawn plans. Each line drawn is part of a conversation—a merging of your hopes and our expertise—to shape an outdoor living experience that feels both personal and extraordinary.",
      },
    ],
    relatedGalleries: ["featured-work", "drawings", "meadows"],
    cta: "Ready to elevate your outdoor living space? Let's bring your vision to life—from the first sketch to the final stone.",
  },
  {
    slug: "landscape-construction",
    href: "/landscape-construction",
    index: "02",
    title: "Landscape Construction",
    shortTitle: "Landscape Construction",
    tagline: "Rooted in Precision",
    summary:
      "One team from sketch to stone. Terraces, pools, plantings and structures built by our own crews to the drawing's intent.",
    hero: "/images/hero/service-landscape-construction.jpg",
    heroAlt: "Landscape construction — a masonry walkway under a mature canopy",
    intro: [
      "Our construction team is celebrated for their expertise, precision, and exceptional craftsmanship. Specializing in the creation of intricate, dynamic landscapes, we manage every detail.",
      "From site preparation, grading, and drainage solutions to diverse planting, hardscapes, sport courts, custom gardens, lush lawns, expansive meadows, swimming pools, water features, irrigation systems, and landscape lighting, our team delivers a seamless, high-quality experience.",
    ],
    steps: [
      {
        heading: "Next Step, Next Level",
        body: "With your design and proposal approved, our in-house construction team begins the transformation of your outdoor living space. Because everything is managed under one roof—from concept to completion—you'll never need to coordinate with multiple contractors. We are your single, trusted point of contact, ensuring clarity and consistency throughout the process.",
      },
      {
        heading: "Built to the Highest Standards, Inspired by Nature",
        body: "Our construction team works in lockstep with our design studio, allowing for a seamless handoff and meticulous attention to detail at every phase. Through open communication, transparent scheduling, and hands-on project oversight, we ensure your outdoor living space is delivered smoothly, beautifully, and exactly as envisioned.",
      },
    ],
    relatedGalleries: ["old-world-masonry", "mature-trees", "custom-pools"],
    cta: "Exceptional landscapes begin with a solid foundation. Reach out today to start your construction journey with precision and purpose.",
  },
  {
    slug: "landscape-maintenance",
    href: "/landscape-maintenance",
    index: "03",
    title: "Landscape Maintenance",
    shortTitle: "Landscape Maintenance",
    tagline: "Maintaining Beauty, Enhancing Possibility",
    summary:
      "Stewardship that lets a landscape mature — pruning, soil health, and seasonal care by horticulturists, not mowers.",
    hero: "/images/hero/service-landscape-maintenance.jpg",
    heroAlt:
      "Landscape maintenance — seasonal care keeping a mature garden in health",
    intro: [
      "Once your project is successfully completed, we provide a full suite of maintenance services to preserve the beauty and vitality of your new outdoor area. Our commitment to your landscape doesn't end when construction is complete—it evolves.",
      "Integrated from the start, our maintenance professionals are introduced during the design phase and connect with you throughout construction. This early involvement ensures a seamless transition to ongoing care and provides continuity in understanding your vision.",
    ],
    steps: [
      {
        heading: "Essentials Included In Every Maintenance Plan",
        body: "Spring & fall cleanup · Seasonal fertilizer applications · Deer deterrent services · Edging garden beds · Pruning · Weeding · Dead heading · Winter plant wrapping · Furniture & patio cleanup · Fixture cleaning · Lawn mowing.",
      },
      {
        heading: "Enhancements — Custom Add-Ons For Your Home",
        body: "Custom seasonal containers · Annual flower installations · Custom seasonal décor & florals · Event florals & décor · Custom gardens · Culinary experiences · Power washing · Grill & outdoor cleaning · Furniture wrapping · Custom mulch solutions · Horticultural education experiences.",
      },
    ],
    relatedGalleries: ["details", "seasonal-decor", "featured-work"],
    cta: "Your landscape deserves exceptional care. Let's talk about a plan that keeps it growing richer each year.",
  },
  {
    slug: "edible-gardens-and-culinary-experiences",
    href: "/edible-gardens-and-culinary-experiences",
    index: "04",
    title: "Edible Gardens & Culinary Experiences",
    shortTitle: "Edible Gardens & Culinary",
    tagline: "From Field to Fork",
    summary:
      "Orchards, kitchen gardens, apiaries and culinary experiences that make the grounds productive and alive.",
    hero: "/images/hero/service-edible-gardens.jpg",
    heroAlt:
      "Edible gardens and culinary experiences — a harvest from the kitchen garden",
    intro: [
      "Led by our Director of Culinary Concierge, we'll guide you through every step: growing, harvesting, and enjoying your garden's bounty. We design, plant, and maintain your edible garden, so you can focus on the joy of fresh, seasonal cooking with your own homegrown produce.",
      "Our team can ensure that any extra harvest is donated to local food pantries, giving back to the community. In addition to enjoying fresh meals, we help you utilize your abundance through homemade teas, preserving fruits and vegetables, and crafting custom gifts.",
    ],
    steps: [
      {
        heading: "Edible Garden Design",
        body: "Creating a sustainable garden tailored to your lifestyle can be overwhelming; our expert team makes it easy. From thoughtful design to strategic plant selection, we guide you through every step to build a thriving, productive garden that fits seamlessly into your landscape.",
      },
      {
        heading: "Culinary Lessons",
        body: "Maximize the potential of your garden harvest with seasonal cooking lessons and recipe consultations from our Director of Culinary Experiences. Discover new ways to celebrate what you grow.",
      },
      {
        heading: "Food Forest Design",
        body: "A food forest is the ultimate expression of permaculture: self-sustaining, abundant, and ecologically rich — a layered planting that produces food season after season with less input each year.",
      },
    ],
    relatedGalleries: ["edible-gardens", "featured-work", "details"],
    cta: "From soil to plate — we handle everything, you enjoy. Let's plan a garden that feeds the people who live in it.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * "Cultivate" — el diferenciador ecológico destacado en la home.
 * Es el ángulo que el documento de requerimientos señala como único
 * frente a la competencia.
 */
export const cultivate = [
  {
    title: "Orchards",
    image: "https://backtonature.net/wp-content/uploads/2025/07/Orchards.jpg",
    alt: "An orchard planted as part of a working residential landscape",
  },
  {
    title: "Medicinal Herbs",
    image:
      "https://backtonature.net/wp-content/uploads/2025/07/Medicinal-Herbs.jpg",
    alt: "A medicinal herb garden in bloom",
  },
  {
    title: "Heritage Coops",
    image:
      "https://backtonature.net/wp-content/uploads/2025/07/Chicken-Coop.jpg",
    alt: "A heritage chicken coop built into the garden design",
  },
  {
    title: "Kitchen Gardens",
    image: "https://backtonature.net/wp-content/uploads/2025/05/IMG_7208-2.jpg",
    alt: "Raised kitchen garden beds planted for the season",
  },
] as const;
