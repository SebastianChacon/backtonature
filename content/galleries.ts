/**
 * Galerías filtrables (F-04).
 *
 * Las nueve categorías y sus imágenes son las publicadas hoy en
 * backtonature.net/galleries. Los `alt` son etiquetas de categoría, no
 * descripciones por foto: el alt definitivo es contenido pendiente del
 * cliente (ver README → "Contenido pendiente").
 */

import type { GalleryImage } from "./projects";

export type GalleryCategory = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  images: GalleryImage[];
};

export const galleries: GalleryCategory[] = [
  {
    "slug": "featured-work",
    "title": "Featured Work",
    "description": "A cross-section of the studio's built work across the tri-state area.",
    "cover": "/images/hero/galleries-cover.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_A-r.jpg",
        "alt": "Featured Work — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A.jpg",
        "alt": "Featured Work — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/2025_9_1_Luhadia_KitchenRendering_JR_c.jpg",
        "alt": "Featured Work — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/2025_01_02_Caporaso_FireplaceRendering_MK_c.jpg",
        "alt": "Featured Work — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A1-R1.jpg",
        "alt": "Featured Work — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A2A-R.jpg",
        "alt": "Featured Work — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A2-R.jpg",
        "alt": "Featured Work — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A3-R.jpg",
        "alt": "Featured Work — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A4A.jpg",
        "alt": "Featured Work — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A4B-R.jpg",
        "alt": "Featured Work — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A5A.jpg",
        "alt": "Featured Work — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A5-R.jpg",
        "alt": "Featured Work — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A6.jpg",
        "alt": "Featured Work — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-B.jpg",
        "alt": "Featured Work — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-B-scaled.jpg",
        "alt": "Featured Work — photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-B1.jpg",
        "alt": "Featured Work — photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-B2-R.jpg",
        "alt": "Featured Work — photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-B3.jpg",
        "alt": "Featured Work — photograph 18"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-C1.jpg",
        "alt": "Featured Work — photograph 19"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-C2-R.jpg",
        "alt": "Featured Work — photograph 20"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-C3.jpg",
        "alt": "Featured Work — photograph 21"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D1.jpg",
        "alt": "Featured Work — photograph 22"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D2.jpg",
        "alt": "Featured Work — photograph 23"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D5.jpg",
        "alt": "Featured Work — photograph 24"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D6.jpg",
        "alt": "Featured Work — photograph 25"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D7.jpg",
        "alt": "Featured Work — photograph 26"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D8T-2.jpg",
        "alt": "Featured Work — photograph 27"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D9.jpg",
        "alt": "Featured Work — photograph 28"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D9A-R.jpg",
        "alt": "Featured Work — photograph 29"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-D9B-R.jpg",
        "alt": "Featured Work — photograph 30"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-E.jpg",
        "alt": "Featured Work — photograph 31"
      }
    ]
  },
  {
    "slug": "drawings",
    "title": "Drawings",
    "description": "Hand-drawn plans and sketches — the studio still draws before it builds.",
    "cover": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-d-BTN_TITLEBLOCK-A.jpg",
        "alt": "Drawings — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-A1R.jpg",
        "alt": "Drawings — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-B1-R-11.jpg",
        "alt": "Drawings — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-B2.jpg",
        "alt": "Drawings — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-B3.jpg",
        "alt": "Drawings — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-C1-R.jpg",
        "alt": "Drawings — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-C2.jpg",
        "alt": "Drawings — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-D1.jpg",
        "alt": "Drawings — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-D1B-6.jpg",
        "alt": "Drawings — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-D2-R-5.jpg",
        "alt": "Drawings — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-D3-8.jpg",
        "alt": "Drawings — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-DIETZMEADOW.jpg",
        "alt": "Drawings — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-DSC_2019-R-14.jpg",
        "alt": "Drawings — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-F1R-7.jpg",
        "alt": "Drawings — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-F2.jpg",
        "alt": "Drawings — photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-G1-1R1.jpg",
        "alt": "Drawings — photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-H1-3R-e1752685598383.jpg",
        "alt": "Drawings — photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-H2-4R.jpg",
        "alt": "Drawings — photograph 18"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-L2.jpg",
        "alt": "Drawings — photograph 19"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-L2-15R.jpg",
        "alt": "Drawings — photograph 20"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-M1-9R.jpg",
        "alt": "Drawings — photograph 21"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-OOR.jpg",
        "alt": "Drawings — photograph 22"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-S-R1.jpg",
        "alt": "Drawings — photograph 23"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-S1-R-12.jpg",
        "alt": "Drawings — photograph 24"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-S2-R-13.jpg",
        "alt": "Drawings — photograph 25"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-Z-2R.jpg",
        "alt": "Drawings — photograph 26"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4680.jpg",
        "alt": "Drawings — photograph 27"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4725.jpg",
        "alt": "Drawings — photograph 28"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5313_Larson-Purple-1.jpg",
        "alt": "Drawings — photograph 29"
      }
    ]
  },
  {
    "slug": "meadows",
    "title": "Meadows",
    "description": "Native meadow seeding and management that replaces turf with habitat.",
    "cover": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-A1R.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-med-A1R.jpg",
        "alt": "Meadows — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9345_Pool-3.jpg",
        "alt": "Meadows — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9247_Pool-2.jpg",
        "alt": "Meadows — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6867_Pool-1.jpg",
        "alt": "Meadows — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-C-R.jpg",
        "alt": "Meadows — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-D-R.jpg",
        "alt": "Meadows — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-D2-R.jpg",
        "alt": "Meadows — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-E-R.jpg",
        "alt": "Meadows — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-F.jpg",
        "alt": "Meadows — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-G.jpg",
        "alt": "Meadows — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-IMG-20210803-WA0005.jpg",
        "alt": "Meadows — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-H.jpg",
        "alt": "Meadows — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-L-R.jpg",
        "alt": "Meadows — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-M-R.jpg",
        "alt": "Meadows — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-pool-M-R-scaled.jpg",
        "alt": "Meadows — photograph 15"
      }
    ]
  },
  {
    "slug": "custom-pools",
    "title": "Custom Pools",
    "description": "Pools set into the grade so they read as part of the landscape.",
    "cover": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9345_Pool-3.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9345_Pool-3.jpg",
        "alt": "Custom Pools — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_R5.jpg",
        "alt": "Custom Pools — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-B.jpg",
        "alt": "Custom Pools — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-B1-R.jpg",
        "alt": "Custom Pools — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-C.jpg",
        "alt": "Custom Pools — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-D-R.jpg",
        "alt": "Custom Pools — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-E.jpg",
        "alt": "Custom Pools — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-F.jpg",
        "alt": "Custom Pools — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-G.jpg",
        "alt": "Custom Pools — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-G2.jpg",
        "alt": "Custom Pools — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-HR.jpg",
        "alt": "Custom Pools — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-IMG_19098.jpg",
        "alt": "Custom Pools — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-LR.jpg",
        "alt": "Custom Pools — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-M.jpg",
        "alt": "Custom Pools — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-N.jpg",
        "alt": "Custom Pools — photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-O-R.jpg",
        "alt": "Custom Pools — photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-R.jpg",
        "alt": "Custom Pools — photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-S.jpg",
        "alt": "Custom Pools — photograph 18"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-S1-R.jpg",
        "alt": "Custom Pools — photograph 19"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-20211015_164720.jpg",
        "alt": "Custom Pools — photograph 20"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-wrld-Z.jpg",
        "alt": "Custom Pools — photograph 21"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20160426_172909_Original.jpg",
        "alt": "Custom Pools — photograph 22"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0448.jpg",
        "alt": "Custom Pools — photograph 23"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_8689-2.jpg",
        "alt": "Custom Pools — photograph 24"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5536_Larson-Steps.jpg",
        "alt": "Custom Pools — photograph 25"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9594_Massaro-Pool-House.jpg",
        "alt": "Custom Pools — photograph 26"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9748_Massaro-Side-View.jpg",
        "alt": "Custom Pools — photograph 27"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6701-3_Saluzzo-Gate.jpg",
        "alt": "Custom Pools — photograph 28"
      }
    ]
  },
  {
    "slug": "old-world-masonry",
    "title": "Old World Masonry",
    "description": "Terraces, walls and steps laid by classically trained masons.",
    "cover": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_R5.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/BTN_F_R5.jpg",
        "alt": "Old World Masonry — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-A-3R.jpg",
        "alt": "Old World Masonry — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-20200507_105153-R-7R.jpg",
        "alt": "Old World Masonry — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-B-1R.jpg",
        "alt": "Old World Masonry — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-D-R.jpg",
        "alt": "Old World Masonry — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-D1.jpg",
        "alt": "Old World Masonry — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-D2-4R.jpg",
        "alt": "Old World Masonry — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-E-6R.jpg",
        "alt": "Old World Masonry — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-F-8R.jpg",
        "alt": "Old World Masonry — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-G-11R.jpg",
        "alt": "Old World Masonry — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-H-R-9R.jpg",
        "alt": "Old World Masonry — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-L-10R.jpg",
        "alt": "Old World Masonry — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-M-R.jpg",
        "alt": "Old World Masonry — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-M2-R.jpg",
        "alt": "Old World Masonry — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-Z-R-2R.jpg",
        "alt": "Old World Masonry — photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-N-5R.jpg",
        "alt": "Old World Masonry — photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5343-6_Larson-Paperbark-Tree.jpg",
        "alt": "Old World Masonry — photograph 17"
      }
    ]
  },
  {
    "slug": "mature-trees",
    "title": "Mature Trees",
    "description": "Specimen trees moved and established to anchor a house to its land.",
    "cover": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-A-3R.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2023/12/btn-tree-A-3R.jpg",
        "alt": "Mature Trees — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20230720_193035.jpg",
        "alt": "Mature Trees — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_1912_c.jpg",
        "alt": "Mature Trees — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20230720_193317.jpg",
        "alt": "Mature Trees — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6397.jpg",
        "alt": "Mature Trees — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4682-e1752684904664.jpg",
        "alt": "Mature Trees — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4701.jpg",
        "alt": "Mature Trees — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_6720-3.jpg",
        "alt": "Mature Trees — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9281_Massaro-Fire-2.jpg",
        "alt": "Mature Trees — photograph 9"
      }
    ]
  },
  {
    "slug": "details",
    "title": "Details",
    "description": "The small moves — edges, joints, gates, fixtures — that carry a project.",
    "cover": "https://backtonature.net/wp-content/uploads/2025/05/20230720_193035.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20230720_193035.jpg",
        "alt": "Details — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/EA85E6F0-1EB2-479A-8959-478B133DA69C.jpg",
        "alt": "Details — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9832_c.jpg",
        "alt": "Details — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/06E50599-531E-4EA3-8EEC-350363FA43AA.jpg",
        "alt": "Details — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/17066480-826D-4792-9312-1C5F0458EE42.jpg",
        "alt": "Details — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20240503_163509.jpg",
        "alt": "Details — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20240521_170544.jpg",
        "alt": "Details — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20240628_225344070_iOS.jpg",
        "alt": "Details — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20240802_133339.jpg",
        "alt": "Details — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20240806_125807.jpg",
        "alt": "Details — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20250410_182811.jpg",
        "alt": "Details — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/E7ABA4DB-0F9F-41F5-B7B2-42AAB1CA5746_1_102_a.jpg",
        "alt": "Details — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_3894.jpg",
        "alt": "Details — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4195.jpg",
        "alt": "Details — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4276.jpg",
        "alt": "Details — photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4714.jpg",
        "alt": "Details — photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_4720.jpg",
        "alt": "Details — photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/7E4B6871-FCD4-470E-B3DC-FD817C8F6346.jpg",
        "alt": "Details — photograph 18"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/AF069BEB-6BD0-4440-AFF2-12C63F851052.jpg",
        "alt": "Details — photograph 19"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/D7A9165A-69A3-46D3-A7B5-8BE786DFA235.jpg",
        "alt": "Details — photograph 20"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/205DE4EA-9C88-4B43-AEAD-CD75A2E8B634.jpg",
        "alt": "Details — photograph 21"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/264858D8-C0FA-4138-B13C-4C6BF9BB9751.jpg",
        "alt": "Details — photograph 22"
      }
    ]
  },
  {
    "slug": "edible-gardens",
    "title": "Edible Gardens & Culinary Experiences",
    "description": "Kitchen gardens, orchards and apiaries woven into the design.",
    "cover": "https://backtonature.net/wp-content/uploads/2025/05/EA85E6F0-1EB2-479A-8959-478B133DA69C.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/EA85E6F0-1EB2-479A-8959-478B133DA69C.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 1"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_7032.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 2"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/123_1-1.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 3"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0783-1.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 4"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0368.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 5"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0422.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 6"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_2453.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 7"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_2497.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 8"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_3418.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 9"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_3419.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 10"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_3472.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 11"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_3508.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 12"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_3637.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 13"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5423.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 14"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5446.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 15"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5729.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 16"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_5735.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 17"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_9152.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 18"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_0300.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 19"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20230920_160817.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 20"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/84C1B0A5-4801-4845-ABC6-798282AE74FD.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 21"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/PB230211.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 22"
      },
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/20240825_181419.jpg",
        "alt": "Edible Gardens & Culinary Experiences — photograph 23"
      }
    ]
  },
  {
    "slug": "seasonal-decor",
    "title": "Seasonal Decor & Containers",
    "description": "Containers, florals and seasonal decor refreshed through the year.",
    "cover": "https://backtonature.net/wp-content/uploads/2025/05/IMG_7032.jpg",
    "images": [
      {
        "src": "https://backtonature.net/wp-content/uploads/2025/05/IMG_7032.jpg",
        "alt": "Seasonal Decor & Containers — photograph 1"
      }
    ]
  }
];

export function getGallery(slug: string): GalleryCategory | undefined {
  return galleries.find((g) => g.slug === slug);
}

export const totalGalleryImages = galleries.reduce(
  (n, g) => n + g.images.length,
  0,
);
