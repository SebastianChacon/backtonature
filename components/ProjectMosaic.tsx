import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Eyebrow } from "./ui";

/**
 * D-03 · Mosaico asimétrico de portfolio.
 * El patrón de 12 columnas viene del concepto aprobado; en móvil todo pasa a
 * una columna con proporción constante.
 */

/** Ancho de cada pieza en la rejilla de 12, y el `sizes` que le corresponde. */
const SHAPES: { className: string; sizes: string }[] = [
  {
    className: "lg:col-span-7 aspect-[16/11]",
    sizes: "(max-width: 1024px) 100vw, 58vw",
  },
  {
    className: "lg:col-span-5 aspect-[4/5]",
    sizes: "(max-width: 1024px) 100vw, 42vw",
  },
  {
    className: "lg:col-span-5 aspect-[4/5]",
    sizes: "(max-width: 1024px) 100vw, 42vw",
  },
  {
    className: "lg:col-span-7 aspect-[16/11]",
    sizes: "(max-width: 1024px) 100vw, 58vw",
  },
  {
    className: "lg:col-span-12 aspect-[16/10] lg:aspect-[21/8]",
    sizes: "100vw",
  },
];

export function ProjectTile({
  project,
  shape = "aspect-[16/11]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  project: Project;
  shape?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group relative block overflow-hidden rounded-[2px] bg-ink-soft ${shape}`}
    >
      <Image
        src={project.hero}
        alt={project.heroAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-editorial)] group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute bottom-0 left-0 z-10 translate-y-1.5 p-6 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-y-0">
        <Eyebrow className="block text-sage">{project.location}</Eyebrow>
        <h3 className="mt-2 text-white [font-size:clamp(1.5rem,1.2rem+1vw,2.1rem)]">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

export default function ProjectMosaic({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-5">
      {projects.map((project, i) => {
        const shape = SHAPES[i % SHAPES.length];
        return (
          <ProjectTile
            key={project.slug}
            project={project}
            shape={shape.className}
            sizes={shape.sizes}
            // Sin `priority`: el mosaico va siempre bajo el pliegue. Marcarlo
            // prioritario descarga fotos de 1900px en el arranque y compite con
            // el LCP real, que es la imagen del hero.
          />
        );
      })}
    </div>
  );
}
