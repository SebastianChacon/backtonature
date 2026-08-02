/**
 * Copy de las páginas editoriales.
 * Texto tomado del contenido publicado hoy en backtonature.net.
 */

export type EditorialSection = {
  heading: string;
  body: string[];
};

export type EditorialPage = {
  title: string;
  eyebrow: string;
  lead: string;
  hero: string;
  heroAlt: string;
  sections: EditorialSection[];
};

export const aboutPage: EditorialPage = {
  title: "Who We Are",
  eyebrow: "About Us",
  lead: "Back to Nature is an award-winning landscape architecture, construction and maintenance firm based in Northern New Jersey.",
  hero: "https://backtonature.net/wp-content/uploads/2023/05/Mizuno-Walkway.jpg",
  heroAlt: "A stone walkway winding through a mature planted landscape",
  sections: [
    {
      heading: "A full-service firm",
      body: [
        "We service properties in New Jersey, New York, and Connecticut. As a full-service firm, we have talented in-house landscape architects, construction managers, classically trained masons, permit expeditors, horticulturists, artisans, and a farm-to-table chef.",
      ],
    },
    {
      heading: "Chosen by people who care how the land is treated",
      body: [
        "We are the choice firm for ecologically minded homeowners and a celebrated group of talented architects, interior designers, realtors, and custom home builders. Nurturing those relationships to form collaborative partnerships has been integral to our success.",
        "We are 'seasoned' granola heads who love teaching, designing, building, and maintaining ecologically and agriculturally inspired landscapes.",
      ],
    },
  ],
};

export const ethosPage: EditorialPage = {
  title: "Our Clients are Partners in Success",
  eyebrow: "Ethos",
  lead: "We are more than just a landscape company — we are creators of outdoor living experiences.",
  hero: "https://backtonature.net/wp-content/uploads/2023/06/Back-To-Nature-Landscape-Gallery-19.jpg",
  heroAlt: "A garden designed as an extension of the home it belongs to",
  sections: [
    {
      heading: "Reconnecting People and Nature",
      body: [
        "We don't just design and build spaces — we enhance and elevate the way you live outdoors. Our mission goes beyond designing beautiful landscapes by crafting spaces that enrich lives, enhance outdoor living, and foster deep connections.",
        "We believe your home should flow seamlessly into the outdoors. Our goal is to transform your landscape into a meaningful extension of your life—where timeless charm and modern comfort come together. From edible gardens to serene retreats, we design spaces that create peaceful and functional places where you can relax, entertain, and reconnect with nature.",
      ],
    },
    {
      heading: "Intimately Crafted Custom Designs",
      body: [
        "What sets us apart is how we design—with intention, care, and connection. Our process begins with listening: to you, your vision, and your land. The result is a custom environment that not only looks beautiful but feels personal and purposeful. Every detail is thoughtfully crafted to create an experience that speaks to your life and style.",
      ],
    },
    {
      heading: "Responsibility",
      body: [
        "Success for our work is an integration of improving the land while creating beautiful landscapes. We ensure that every aspect of your outdoor living is meticulously cared for, offering a seamless experience and peace of mind.",
      ],
    },
  ],
};

/** Proceso — /how-we-work. Secuencia real, numerada. */
export const processSteps = [
  {
    num: "01",
    title: "Personal Consultation",
    body: "We meet on-site, usually within one to two days after the initial contact. Our process begins with a site walk to understand your vision and unique essence. We provide a clear overview of what to expect from our team during the design, construction, and ongoing maintenance phases.",
  },
  {
    num: "02",
    title: "Landscape Design & Detailed Proposal",
    body: "We meet our clients within one week to present initial designs and a comprehensive proposal with detailed timelines. Our designs blend modern technology with the timeless art of hand drawing. Each stroke of the pencil is not merely a line on paper; it's a dialogue, a shared journey of discovery where your vision and our expertise intertwine to create something extraordinary.",
  },
  {
    num: "03",
    title: "Seamless Landscape Installations",
    body: "Upon approval of your design and proposal, our in-house construction team will transform your outdoor space while your vision comes to life. Our comprehensive approach means you don't have to manage multiple vendors; we are your single point of contact. Open and transparent communication will ensure the build process aligns with your expectations.",
  },
  {
    num: "04",
    title: "Comprehensive Landscape Maintenance",
    body: "Once your project is successfully completed, we provide a full suite of maintenance services to preserve the beauty and vitality of your new outdoor area. These services include regular garden care, lawn maintenance, seasonal pruning, and the enhancements that keep a landscape maturing year over year.",
  },
] as const;

/** Proceso condensado para la home — tres tiempos. */
export const homeProcess = [
  {
    num: "01",
    title: "Design",
    body: "We walk the land, understand how you live, and draw a plan that belongs to the place.",
  },
  {
    num: "02",
    title: "Build",
    body: "Our own crews construct it — hardscape, water, and thousands of plants set by hand.",
  },
  {
    num: "03",
    title: "Steward",
    body: "We stay on, tending the landscape so it grows richer and more established each year.",
  },
] as const;

/** Vacantes publicadas hoy en /careers. */
export const openRoles = [
  { title: "Mason Foreman", type: "Full time · Construction" },
  { title: "Landscape Designer / Architect", type: "Full time · Studio" },
  { title: "Maintenance Foreman / Manager", type: "Full time · Maintenance" },
] as const;

export const careersCopy = {
  eyebrow: "Now Hiring",
  title: "Apply For a Career With Back To Nature",
  lead: "A meaningful career in landscaping starts with Back to Nature. With us, you'll work toward excellence in design/build and maintenance, fine-tuning crucial skills while developing workplace relationships that will last a lifetime.",
  /** El sitio actual publica esta página también en español. */
  leadEs:
    "Una carrera significativa en paisajismo comienza con Back to Nature. Con nosotros, trabajará hacia la excelencia en diseño/construcción y mantenimiento, afinando habilidades cruciales mientras desarrolla relaciones laborales que durarán toda la vida.",
  hero: "https://backtonature.net/wp-content/uploads/2023/06/Careers-header.jpg",
  heroAlt: "A Back to Nature crew at work on a landscape installation",
} as const;
