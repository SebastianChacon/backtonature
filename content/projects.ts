/**
 * Los 9 proyectos del portfolio (F-02).
 *
 * Texto, imágenes y objetivos de diseño provienen del contenido publicado hoy
 * en backtonature.net. Tres proyectos (Harding Harvest, Chateau in Bloom y
 * Montclair Historic Haven) están publicados como galerías sin narrativa: el
 * documento de requerimientos los lista como contenido pendiente de recolectar.
 * Se marcan con `narrativePending` y la plantilla los renderiza como pieza
 * visual en lugar de inventar texto. Cuando llegue el texto del cliente, basta
 * con rellenar `sections` y poner la bandera en false.
 */

export type ProjectSection = {
  heading: string;
  body: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  location: string;
  scope: string;
  tags: string[];
  hero: string;
  heroAlt: string;
  /** true = el sitio actual no publica narrativa para este proyecto todavía. */
  narrativePending: boolean;
  pullQuote: string | null;
  sections: ProjectSection[];
  objectives: { materials: string[]; elements: string[] };
  gallery: GalleryImage[];
};

export const projects: Project[] = [
  {
    "slug": "harding-harvest",
    "title": "Harding Harvest",
    "tagline": "A Working Farm Embracing Sustainable Beauty",
    "location": "Harding Township, New Jersey",
    "scope": "Design / Build · Edible Landscape",
    "tags": [
      "Edible Gardens",
      "Design/Build"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/12/BTN_FZ-r1.jpg",
    "narrativePending": true,
    "pullQuote": null,
    "sections": [],
    "objectives": {
      "materials": [],
      "elements": []
    },
    "heroAlt": "Harding Harvest — A Working Farm Embracing Sustainable Beauty",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_G2.jpg",
        "alt": "Harding Harvest, Harding Township, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_G1.jpg",
        "alt": "Harding Harvest, Harding Township, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_G3-r1.jpg",
        "alt": "Harding Harvest, Harding Township, New Jersey — landscape photograph 3"
      }
    ]
  },
  {
    "slug": "chateau-in-bloom",
    "title": "Chateau in Bloom",
    "tagline": "Country Living with Classic Charm Elegance",
    "location": "New Jersey",
    "scope": "Design / Build · Outdoor Living",
    "tags": [
      "Design/Build",
      "Outdoor Living"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9143.jpg",
    "narrativePending": true,
    "pullQuote": null,
    "sections": [],
    "objectives": {
      "materials": [],
      "elements": []
    },
    "heroAlt": "Chateau in Bloom — Country Living with Classic Charm Elegance",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9300_Massaro-Fire-1.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9594_Massaro-Pool-House.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9748_Massaro-Side-View.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9281_Massaro-Fire-2.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9176.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9197.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9199.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9336.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9349.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9475.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9518.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9528.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9583.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9672.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9694.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9760.jpg",
        "alt": "Chateau in Bloom, New Jersey — landscape photograph 16"
      }
    ]
  },
  {
    "slug": "montclair-historic-haven",
    "title": "Montclair Historic Haven",
    "tagline": "A Classic Home Reimagined Through Landscape",
    "location": "Montclair, New Jersey",
    "scope": "Landscape Architecture · Design / Build",
    "tags": [
      "Historic",
      "Design/Build"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6701-3_Saluzzo-Gate.jpg",
    "narrativePending": true,
    "pullQuote": null,
    "sections": [],
    "objectives": {
      "materials": [],
      "elements": []
    },
    "heroAlt": "Montclair Historic Haven — A Classic Home Reimagined Through Landscape",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_7134_Saluzzo-2.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0530_Saluzzo-Walkway-1.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/FullSizeRender-5.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0532.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6825-2.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_7208-2.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6867_Pool-1.jpg",
        "alt": "Montclair Historic Haven, Montclair, New Jersey — landscape photograph 7"
      }
    ]
  },
  {
    "slug": "historic-hamlet-redesigned",
    "title": "Historic Hamlet Redesigned",
    "tagline": "Master Plan to revitalize a historic hamlet while preserving the natural systems and surrounding environment.",
    "location": "Pottersville Village Historic District, New Jersey",
    "scope": "Master Planning · Ecological Restoration",
    "tags": [
      "Master Planning",
      "LEED",
      "Ecological"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/07/Pottersville-Deli-header.jpg",
    "narrativePending": false,
    "pullQuote": "Using regenerative and sustainable practices, Back to Nature has helped elevate the vision for this project beyond its current course towards LEED certification.",
    "sections": [
      {
        "heading": "Project Details",
        "body": [
          "The Pottersville Village Historic district, rich with social and environmental history, is a five-acre site that includes the Black River General Store, an old mill, and a post office."
        ]
      },
      {
        "heading": "Collaborative Journey Towards Sustainable Transformation",
        "body": [
          "Collaborating with a team of engineers, architects, environmental and traffic consultants, Back to Nature helped to create a master plan for the revitalization of the Pottersville Corner. Back to Nature’s approach targeted positive, long term benefits to natural systems, habitat, river and water quality, alternative stormwater practices, and interpretive signage. Using regenerative and sustainable practices, Back to Nature has helped elevate the vision for this project beyond its current course towards LEED certification."
        ]
      },
      {
        "heading": "A Sustainable Vision for the Future",
        "body": [
          "While this project is still under review, it is an example of how Back to Nature works with clients to assemble the most knowledgeable, seasoned team to develop a plan that takes into consideration the health of the environment and community."
        ]
      }
    ],
    "objectives": {
      "materials": [],
      "elements": [
        "Wildflowers",
        "Woodland Restoration",
        "Ferns"
      ]
    },
    "heroAlt": "Historic Hamlet Redesigned — Master Plan to revitalize a historic hamlet while preserving the natural systems and surrounding environment",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/jack-in-the-pulpit-NEW.jpg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Pottersville-Deli-dark-3-1.jpg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/lamington-river-image.jpg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/postoffice-Pottersville.jpg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/wildflowers.jpg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/WoodlandRestoration.jpeg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Ferns.jpeg",
        "alt": "Historic Hamlet Redesigned, Pottersville Village Historic District, New Jersey — landscape photograph 7"
      }
    ]
  },
  {
    "slug": "eco-and-agro-luxury",
    "title": "Eco and Agro Luxury",
    "tagline": "Outdoor spaces designed to be in tune with organic, nature loving, family-oriented lifestyle.",
    "location": "New Jersey · Six-acre property",
    "scope": "Master Plan · Design / Build · Seven-year stewardship",
    "tags": [
      "Ecological",
      "Edible Gardens",
      "Master Planning"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/07/Eco-agro-1-header.jpg",
    "narrativePending": false,
    "pullQuote": "Visioning and nature’s own processes provide the opportunity for a designed “ecosystem” that is environmentally responsible and fulfilling. Collecting, conserving, and reusing are essential components to this integrated system.",
    "sections": [
      {
        "heading": "Project Details",
        "body": [
          "This project involved a home converted from stables located on a six-acre property. The homeowners approached Back to Nature to help transform the outdoor spaces surrounding the home to be in tune with their organic, nature loving, and family-oriented lifestyle. The project incorporated several environmentally conscious strategies, and to this day the outdoor spaces continue to develop as a reflection of the clients’ green lifestyle."
        ]
      },
      {
        "heading": "A Journey of Outdoor Rooms and Sustainable Living",
        "body": [
          "The main goal of this project was to create a series of outdoor rooms that would “unfold” similar to the indoor rooms of a home. The project started with a site master plan that evaluated the barriers between indoors and out. Over the next seven years, Back to Nature continued working with the client as the project evolved in the areas of growing organic food, restoring native habitats, integrating alternative energies and storm water practices, promoting a healthy and inviting atmosphere for family and friends, and connecting the homeowners with their land."
        ]
      },
      {
        "heading": "Maximizing Potential Through a Design Process",
        "body": [
          "An integrated design process has played a value-adding role in realizing the potential of this project. There is an ongoing collaboration between the clients, landscape architect, other design professionals, project installers, and maintenance managers, who all are engaged regularly in the project. Over the course of this outdoor remodel, stakeholders have included the clients, the landscape architect, architects, contractors from all trades, engineers, arborists, organic consultants, apiary specialists, forest managers, municipal agents, and neighbors."
        ]
      },
      {
        "heading": "Balancing Investment and Returns Within The Project",
        "body": [
          "Costs are an important consideration for all projects; this venture was no different. They must be understood and woven into the fabric of the project. The project team has anticipated and realized both tangible and intangible returns on the investment costs of this project, including a decreased reliance on purchasing produce and a greatly expanded living space."
        ]
      }
    ],
    "objectives": {
      "materials": [],
      "elements": []
    },
    "heroAlt": "Eco and Agro Luxury — Outdoor spaces designed to be in tune with organic, nature loving, family-oriented lifestyle",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/BTN-Drawings-21.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/eco-agro-3.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Perennial-Gardens.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Perennial-bins.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Birch-Grove-After.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-1.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-2.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-3.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-landscape-3.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-landscape-4.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-landscape-2.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/07/Eco-landscape-1.jpg",
        "alt": "Eco and Agro Luxury, New Jersey · Six-acre property — landscape photograph 12"
      }
    ]
  },
  {
    "slug": "inspired-by-nature",
    "title": "Inspired by Nature",
    "tagline": "Natural attributes on the property guided this unique, native landscape design, installation and continued maintenance.",
    "location": "Highlands of North Central New Jersey",
    "scope": "Landscape Architecture · Installation · Fine Maintenance",
    "tags": [
      "Native Planting",
      "Meadow",
      "Ecological"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/06/inspired-meadow.jpg",
    "narrativePending": false,
    "pullQuote": "We created continuous displays of color and texture using perennials with staggered flowering seasons and with ornamental grasses whose foliage brought color, texture and movement into the winter months.",
    "sections": [
      {
        "heading": "Project Details",
        "body": [
          "This suburban property in the Highlands of north central New Jersey offered a wealth of natural attributes and existing built elements that guided the landscape design: Rolling topography, mature shade trees, a house overlooking a large expanse of open land, a pool surrounded by undisturbed woodland, and a beautiful ‘borrowed’ view of a neighboring meadow. Yet several elements detracted from what could be a more environmentally friendly, year-round garden: Over four acres of lawn turf required hours of mowing and frequent chemical treatments, and monotonous foundation plantings had limited seasonal interest."
        ]
      },
      {
        "heading": "Inspired",
        "body": [
          "Back to Nature’s design objective was to create several garden environments inspired by the home’s natural surroundings. We incorporated new perennial plantings in bold scales and textures year round to replace three acres of lawn. Once dull views along the driveway and from the house now evolve from season to season and the homeowner benefits from lower levels of maintenance. Because the home was located in an intensely developed community, we were very concerned about water quality and the effects of development on local habitat. We removed almost two-thirds of the impervious surfaces, such as driveways and unused terraces. We replaced turf with more water-quality friendly native wildflower meadows and large flowering trees."
        ]
      },
      {
        "heading": "Nature’s Palette",
        "body": [
          "The palette of plants used in this garden becomes increasingly bold and “wild” in form and color as you move away from the residence, climaxing in a completely wild ‘seeded’ meadow at the far edge of the property. We created continuous displays of color and texture using perennials with staggered flowering seasons and with ornamental grasses whose foliage brought color, texture and movement into the winter months.",
          "Our clients can enjoy all the different parts of their garden through a series of mown paths through the meadow. So that they change their perspective on the garden, the layout of these paths can be changed by simply mowing through a different section of the meadow.",
          "Over 400 different species of plants were incorporated throughout this property. Eighty-five percent of the plants are native to our region and benefit the environment. None of the non-native plants are considered invasive or pests. In total, we installed over 41,000 plants, the majority of them being ornamental grasses, perennials, and specimen flowering trees."
        ]
      },
      {
        "heading": "Maintenance Concerns",
        "body": [
          "The clients recognized the value of regular maintenance as a means to protect their investment in the garden. Maintenance needs were discussed with the client during the design stage so that their expectations on time and cost were clear. Clearly, plants are always selected for important basic criteria: cold hardiness, heat/drought tolerance, no requirement for frequent deadheading or division, no need for staking. Few, if any, insect or disease problems are found in the garden. (Pest care is strictly organic—hand picking, natural predators, and organic remedies.) Plants do not require heavy fertilization.",
          "Clients understand that while perennial plants are still filling in during the first year, the need for weeding will be greatest. An irrigation system is calibrated to apply about one-inch of water per week. Rain gauges monitor rainfall and turn off the system when it’s not needed.",
          "Maintenance crews of three men spend on average 3-5 hours per week on weeding and other upkeep.",
          "A yearly garden clean-up takes place in late February or early March before spring bulbs pop up. Perennials and grasses are cut down to the ground and debris is removed. Various mulches are applied as necessary to a depth of one to two inches—shredded hardwood mulch or a well-decayed compost, either of which will slowly decay over the course of the growing season and add to the organic content of the planting beds."
        ]
      }
    ],
    "objectives": {
      "materials": [
        "Lattice",
        "Reclaimed Roof Tiles",
        "Bronze",
        "Slab Stones",
        "Pea Stone",
        "Bluestone"
      ],
      "elements": [
        "Native Grasses",
        "Wildflowers",
        "Liatris",
        "Apple Trees",
        "Meadow Plants",
        "Hillside Plants"
      ]
    },
    "heroAlt": "Inspired by Nature — Natural attributes on the property guided this unique, native landscape design, installation and continued maintenance",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/Wynne-house-front-after.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/drivewayafter-fall.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/inspired-water.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/drivewayafter-summer.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/meadowafter.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/inspired-courtyard.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/birdhouse.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/Lattice.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/Reclaimed_Roof_Tiles.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/Bronze.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/Slab_Steps.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/pea-stone.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/reclaimedBluestone.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/NativeGrasses.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/wildflowers.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Liatris.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/AppleTrees.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/MeadowPlants.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 18"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/HillsidePlants.jpg",
        "alt": "Inspired by Nature, Highlands of North Central New Jersey — landscape photograph 19"
      }
    ]
  },
  {
    "slug": "master-planning",
    "title": "Master Planning",
    "tagline": "Landscape planning and design to promote learning from the surrounding environment.",
    "location": "The Willow School · Gladstone, New Jersey",
    "scope": "Master Planning · Institutional · LEED Gold",
    "tags": [
      "Master Planning",
      "LEED",
      "Institutional"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/05/willow-school-1a.jpg",
    "narrativePending": false,
    "pullQuote": "It was determined that many of the site design features and some of the building systems could be integrated into the great expression of the forest that was once there.",
    "sections": [
      {
        "heading": "Project Details",
        "body": [
          "The green building movement in the United States, Europe and Asia has been primarily focused on “limiting the damage” to the environment. The Willow School has approached its relationship with the environment from a more positive perspective."
        ]
      },
      {
        "heading": "A Fresh Perspective",
        "body": [
          "Instead of only looking at using less energy to heat and cool the buildings, less potable water to flush human waste, or using materials that contain fewer toxins and so on, the School has been working with a group of consultants who look for opportunities to improve the health of the natural and human systems engaged in this place.",
          "Although this is a different way of building than conventional practice, once understood, it is actually easier to leverage the proposed human activities on the site in ways where they become catalysts for the damaged natural systems to be rehabilitated. Once functioning in a healthy manner, these systems, including the people engaged in it, begin to support the health of the place with much reduced input of time, money, and damaging “maintenance” activities."
        ]
      },
      {
        "heading": "Environmental Goals",
        "body": [
          "The LEED™ Green Building Rating System, produced by the US Green Building Council, was used as a framework to set goals for environmental performance for the School and the design team. LEED stands for Leadership in Energy and Environmental Design. It helps projects set high environmental performance in the general categories of healthy Plant/Animal Habitat and Water Quality, Water Conservation, Energy Conservation, Material Resource efficiencies, and Indoor Environmental Quality. The Willow School will be reaching the Gold level due to the high number of effective environmental issues that will be addressed in the course of building and operating this facility."
        ]
      },
      {
        "heading": "A Growing Opportunity",
        "body": [
          "The health of the site was evaluated and it was determined that many of the site design features and some of the building systems could be integrated into the great expression of the forest that was once there. This is the essential context for all human activity in this place and a real educational opportunity for students and community. The forest is the most diverse opportunity for self directed total immersion learning. The opportunity is to demonstrate how the forest on the site can return to become the living sponge and filter that is the natural response to this climate (40+ inches of precipitation). The forest which now is at an early order of expression (low level of succession) will evolve to higher levels of effectiveness and increasing capability to support life while it stores, filters, and gradually releases the water and nutrients that is collects."
        ]
      },
      {
        "heading": "Looking Beyond",
        "body": [
          "A whole systems approach has been used to evaluate building systems rather than assuming that efficient technical approaches are sufficient.",
          "As an example, ground source heat pumps are a very efficient technology. Many designers use them when trying to achieve high energy efficiency in buildings. However, the New Jersey climate requires more heating than cooling. Ground source heat pumps are very efficient when supplying equal amounts of heating and cooling."
        ]
      },
      {
        "heading": "The Whole System Approach",
        "body": [
          "Because the School will not be operating at full occupancy during the summer, it was determined that the largest percentage of energy supplied to the building, and therefore the amount of greenhouse gasses emitted to the atmosphere, would occur during the heating season. Using natural gas at the building is much more efficient than burning it at a power plant and sending this energy over electric transmission lines to be used by the heat pumps for heating purposes. The limited amounts of cooling will be provided by high efficiency air conditioners when needed. This whole system approach allowed the School to save on initial cost of equipment, operating costs and, importantly, reduces its contribution of greenhouse gasses. This compares to the standard approach of only considering the efficiency of the equipment at the site rather than the impact of how this equipment will be used in relation to the larger ecosystem."
        ]
      }
    ],
    "objectives": {
      "materials": [
        "Bluestone",
        "Reclaimed Granite",
        "Repurposed Wood",
        "Stone"
      ],
      "elements": [
        "Woodland Floor",
        "Amsonia",
        "Meadow Plants",
        "Wetland Plants"
      ]
    },
    "heroAlt": "Master Planning — Landscape planning and design to promote learning from the surrounding environment",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/06/BTN-Landscape-6a.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Tall-meadow-plantings-over-septic-dosing-field.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/willow-school-meadow.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Willow-Winter.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Willow-School-masterplan-NEW-.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/The-Green-Schoolhouse-in-Gladstone.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/WillowSchool-detentionbasin.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/reclaimedBluestone.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/RepurposedGranite.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/RepurposedWoodfromSite.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Stone.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/WoodlandFloor.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Amsonia.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/MeadowPlants.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/WetlandPlants.jpg",
        "alt": "Master Planning, The Willow School · Gladstone, New Jersey — landscape photograph 15"
      }
    ]
  },
  {
    "slug": "luxury-and-leed",
    "title": "Luxury and LEED",
    "tagline": "First Certified LEED Home in Harding, NJ — a model practice of environmental stewardship and site regeneration.",
    "location": "Harding, New Jersey",
    "scope": "Landscape Architecture · Rain Garden · Site Regeneration",
    "tags": [
      "LEED",
      "Ecological",
      "Stormwater"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/05/luxury-LEED.jpg",
    "narrativePending": false,
    "pullQuote": "Plants had to meet important criteria: vigor, cold hardiness, heat/drought tolerance, no need for deadheading or staking, and resistance to disease and pests.",
    "sections": [
      {
        "heading": "Project Details",
        "body": [
          "This New Jersey residence is a model for the practice of environmental stewardship and site regeneration. The design and construction process tells a story of inspired leadership, the incorporation of systems design, and design team synergy. Innovative landscape elements treat stormwater in unconventional ways. Plantings and site stewardship regenerate soils and groundwater."
        ]
      },
      {
        "heading": "Whole-Systems-Thinking",
        "body": [
          "Back to Nature as landscape architects, employed a whole-systems-thinking approach to integrate planning, and construction. We worked closely with the property owners, architects, engineers and consultants to blur the lines between interior and exterior spaces as well as between human and natural systems. To meet the resident’s aesthetic and environmental goals the landscape architects created an innovative site design that focused on natural systems and processes to meet the functional needs of the site. In this whole-systems-thinking approach, natural elements such as water, soil, forest and wildlife became recognized stakeholders in the design process. Site regeneration (design to leave the site environmentally better after development) was an important consideration. Crews removed approximately 1.25 acres of invasive trees and shrubs."
        ]
      },
      {
        "heading": "Plants as Producers / Soil Regeneration",
        "body": [
          "The intensive use of plantings in the rain garden for function, habitat and aesthetics was inspired by the regenerative design approach for architecture and landscape. Their roles were diverse yet important. Disturbed areas were stabilized with meadow seed or perennial plugs rather than lawn. Perennial plantings played an important role in the environmentally innovative features of this site. In the place of dry wells along the entrance drive, vegetated swales were constructed to accept stormwater runoff. Plantings help to purify contaminated runoff and to slow the speed of runoff flow from the existing grades.",
          "Long and broad sweeps of species such as Rudbeckia, Solidago, Aster, Pycnanthemum, Carex, and Panicum, installed as landscape plugs, thrive in the mixed sun/shade environment, reflect the regional native plant palette, and help to diversity the newly exposed edges of cleared woodlands. A similar palette, along with native shrubs, covers the slopes of the rain garden."
        ]
      },
      {
        "heading": "Sustainable Landscaping",
        "body": [
          "PLANTS AND SOILS: Native plants were selected and specifically grown to best match the unique natural conditions of this site.",
          "MAINTENANCE: Long-term rain garden maintenance became an important element in the landscape design and plant selection. Plants had to meet important criteria: vigor, cold hardiness, heat/drought tolerance, no need for deadheading or staking, and resistance to disease and pests. They also had to fit with the woodland character and aesthetics. In keeping with USGBC/LEED guidelines, landscape plantings were designed to survive without permanent irrigation after being established, the need for weeding and water decreased or ceased. Vigorous plant growth crowded out most weeds. Yearly mulching after a late winter cut back is done every year by residents."
        ]
      }
    ],
    "objectives": {
      "materials": [
        "Bluestone",
        "Stone",
        "Biofiltration",
        "Rainwater Harvesting"
      ],
      "elements": [
        "Meadow Plants",
        "Wetland Plants",
        "Aquatic Plants",
        "Amsonia",
        "Liatris",
        "Wildflowers"
      ]
    },
    "heroAlt": "Luxury and LEED — First Certified LEED Home in Harding, NJ — a model practice of environmental stewardship and site regeneration",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/LEED-Cert-in-Harding.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/luxury-LEED-raingarden.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/butterfly.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/patio.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/luxury-LEED-sketch.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/rain-garden-in-progress.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/raingarden.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/luxury-LEED_meadow.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/reclaimedBluestone.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Stone.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Biofiltration.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/rainwater-harvesting.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/MeadowPlants.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/WetlandPlants.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/AquaticPlants.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Amsonia.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Liatris.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/wildflowers.jpg",
        "alt": "Luxury and LEED, Harding, New Jersey — landscape photograph 18"
      }
    ]
  },
  {
    "slug": "residential-design-and-installation",
    "title": "Residential Design and Installation",
    "tagline": "Master planning, design and installation services for a beautiful North Central New Jersey residence.",
    "location": "Bernardsville, New Jersey",
    "scope": "Master Planning · Design · Installation",
    "tags": [
      "Residential",
      "Perennial Gardens",
      "Masonry"
    ],
    "hero": "https://backtonature.net/wp-content/uploads/2023/05/Residential-Design-Installation-header.jpg",
    "narrativePending": false,
    "pullQuote": "The design and construction style was intended to evoke a sense of time and history, which made the residence seem like it had been there for a hundred years, but it also reflected the client’s personality and desires.",
    "sections": [
      {
        "heading": "Project Details",
        "body": [
          "For the design and installation of landscape around their new home in Bernardsville, New Jersey, these clients called upon the landscape architect who had designed their previous suburban residence. Their new home site, a secluded woodland clearing, offered the opportunity to create wonderful outdoor living spaces and called for a bold treatment in both built elements and plants."
        ]
      },
      {
        "heading": "Transforming Woodland Edges and Slopes with Scale and Beauty",
        "body": [
          "The large scale of the new home needed strongly scaled plantings. Site clearing for the new construction exposed woodland edges on three sides of the residence. Small trees, shrubs and perennial plantings soften these edges. Steep exposed slopes became broad canvases for sweeps of perennials and ornamental grasses that, with large plantings of spring bulbs, provide visual delight year round. Larger specimen-size evergreens were brought in to anchor the house to the land."
        ]
      },
      {
        "heading": "Ever-Changing Colors and Textures",
        "body": [
          "Color and texture were selected carefully to provide sweeps of changing colors and textures throughout the four seasons. Broad drifts of early and late-blooming daffodils extend the spring while the perennial garden appears. Early flowering plants such as Senecio aureus and Euphorbia palustris grow quickly in the cooler spring. In the early summer Nepeta and Amsonia bring soft blues to the garden in contrasting textures. By later summer Pervoskia, Rudbeckias, and Echinacea provide strong colors and plant forms next to the relaxed, flowing foliage of Pennisetum and Miscanthus. In the fall, purple and blue Asters glow in the autumn sun next to the russet browns and reds of grasses such as Miscanthus purpurascens. And by Thanksgiving the garden has matured into a palette of browns, sepias and russets."
        ]
      },
      {
        "heading": "Perennial Elegance",
        "body": [
          "In the garden, perennials play a crucial role in the shaping of outdoor spaces. In open public spaces along the entrance driveway and garage parking areas, the rich textural assortment gives the owners a dazzling display of color and form that evolves over the growing season. Entertaining terraces, woodland edge swimming terrace and outdoor dining areas are shaped by plantings that delight in the way no built structure could. Smaller intimate areas such as the mother-in-law’s terrace feel secluded but lush with texture and movement. Exquisitely built masonry terraces and walls shine next to these plantings which add flow and softness to hard areas of hardscape."
        ]
      }
    ],
    "objectives": {
      "materials": [
        "Gray Granite",
        "Stone",
        "Pea Stone",
        "Bluestone"
      ],
      "elements": [
        "Native Grasses",
        "Hillside Plants",
        "Amsonia",
        "Mazus"
      ]
    },
    "heroAlt": "Residential Design and Installation — Master planning, design and installation services for a beautiful North Central New Jersey residence",
    "gallery": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Casestudy1.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Case-Study-Residential-Design-Installation-1.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Case-Study-Residential-Design-Installation-2.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Residential-Design-Installation-5.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/pool-sketch-.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Residential-Design-Installation-3-.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Residential-Design-Installation-6.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Residential-Design-Installation-4.jpeg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/greygranite.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Stone.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/pea-stone.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/reclaimedBluestone.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/NativeGrasses.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/HillsidePlants.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Amsonia.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/05/Mazus_BetweenStones.jpg",
        "alt": "Residential Design and Installation, Bernardsville, New Jersey — landscape photograph 16"
      }
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, count = 3): Project[] {
  const current = projects.find((p) => p.slug === slug);
  if (!current) return projects.slice(0, count);

  const scored = projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      project: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared);

  return scored.slice(0, count).map((s) => s.project);
}

/** Proyectos destacados en el mosaico de la home. */
export const featuredSlugs = [
  "harding-harvest",
  "residential-design-and-installation",
  "eco-and-agro-luxury",
  "luxury-and-leed",
  "inspired-by-nature",
] as const;
