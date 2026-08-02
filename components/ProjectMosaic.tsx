import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Eyebrow } from "./ui";

/**
 * D-03 · Mosaico asimétrico de portfolio.
 *
 * El patrón de 12 columnas viene del concepto aprobado, pero la asimetría vive
 * en el ANCHO, nunca en el alto: cada fila fija su propia altura y las piezas la
 * rellenan. Antes cada pieza traía su propio `aspect-ratio` (16/11 junto a 4/5),
 * así que dentro de una misma fila una quedaba ~130px más corta que su vecina y
 * el mosaico se leía como un montón de fotos apiladas con huecos. En móvil el
 * problema era el mismo en vertical: cinco proporciones distintas seguidas.
 *
 * Ahora: móvil = una proporción constante; md+ = filas a ras, alternando el
 * lado ancho para que el ojo baje en zigzag.
 */

type Row = {
  variant: "pair" | "pair-reverse" | "full";
  items: { project: Project; index: number }[];
};

/** Alto de fila. Fluido, con tope para que en pantallas anchas no domine. */
const PAIR_ROW = "md:h-[clamp(21rem,40vw,32rem)]";
const FULL_ROW = "md:h-[clamp(15rem,26vw,26rem)]";

/** Ancho de cada pieza en la rejilla de 12, y el `sizes` que le corresponde. */
const WIDE = { span: "md:col-span-7", sizes: "(max-width: 768px) 100vw, 58vw" };
const TALL = { span: "md:col-span-5", sizes: "(max-width: 768px) 100vw, 42vw" };

/**
 * Agrupa los proyectos en filas: dos piezas (ancha + estrecha), dos invertidas,
 * y una panorámica. El patrón se repite, así que el mosaico admite cualquier
 * número de proyectos sin dejar una fila coja.
 */
function buildRows(projects: Project[]): Row[] {
  const pattern = ["pair", "pair-reverse", "full"] as const;
  const rows: Row[] = [];

  for (let i = 0, r = 0; i < projects.length; r++) {
    const variant = pattern[r % pattern.length];
    const pair = variant !== "full" && i + 1 < projects.length;

    rows.push({
      variant: pair ? variant : "full",
      items: projects
        .slice(i, i + (pair ? 2 : 1))
        .map((project, k) => ({ project, index: i + k + 1 })),
    });

    i += pair ? 2 : 1;
  }

  return rows;
}

export function ProjectTile({
  project,
  shape = "aspect-[16/11]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  index,
  wide = false,
  tagline = false,
}: {
  project: Project;
  shape?: string;
  sizes?: string;
  priority?: boolean;
  /** Numeral editorial de la pieza (01, 02…). Se omite fuera del mosaico. */
  index?: number;
  /** Pieza panorámica: el pie se abre en dos columnas en pantallas anchas. */
  wide?: boolean;
  /**
   * Rotula la pieza con su tagline. Apagado por defecto: en la grilla del
   * portfolio y en "related" el tagline ya se imprime bajo la foto, y repetirlo
   * dentro dejaría la misma frase dos veces seguidas.
   */
  tagline?: boolean;
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
      {/*
        A11Y · contraste. El degradado se mantiene opaco en el tercio inferior
        —donde vive el texto— y se disuelve antes de tapar la foto.
      */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,21,18,.88)_0%,rgba(15,21,18,.55)_26%,rgba(15,21,18,.12)_58%,rgba(15,21,18,0)_78%)] transition-opacity duration-500 group-hover:opacity-90"
      />

      {index !== undefined && (
        <span
          aria-hidden="true"
          className="absolute top-5 left-6 z-10 font-[family-name:var(--font-display)] text-xl text-brass/90 lg:top-6 lg:left-7"
        >
          {String(index).padStart(2, "0")}
        </span>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-6 lg:p-7 ${
          wide ? "md:flex-row md:items-end md:justify-between md:gap-10" : ""
        }`}
      >
        <div className="min-w-0">
          <span
            aria-hidden="true"
            className="mb-4 block h-px w-9 origin-left scale-x-0 bg-brass transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-x-100"
          />
          <Eyebrow className="block text-sage">{project.location}</Eyebrow>
          <h3 className="mt-2 text-white [font-size:clamp(1.5rem,1.2rem+1vw,2.1rem)]">
            {project.title}
          </h3>
        </div>

        {tagline && (
          /*
            Solo a partir de lg. En móvil y tablet la columna estrecha mide
            ~300px y el tagline en dos líneas tapaba media foto; con la
            ubicación y el título basta. Vuelve cuando hay sitio de sobra.
          */
          <div className={`hidden lg:block ${wide ? "md:shrink-0" : ""}`}>
            <p
              className={`line-clamp-2 max-w-[40ch] text-bone/75 [font-size:var(--text-label)] [letter-spacing:0.04em] ${
                wide ? "md:text-right" : ""
              }`}
            >
              {project.tagline}
              <span
                aria-hidden="true"
                className="ml-3 inline-block text-brass transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function ProjectMosaic({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-3 md:gap-4 lg:gap-5">
      {buildRows(projects).map((row) => {
        if (row.variant === "full") {
          const { project, index } = row.items[0];
          return (
            <ProjectTile
              key={project.slug}
              project={project}
              index={index}
              wide
              tagline
              shape={`aspect-[16/10] md:aspect-auto ${FULL_ROW}`}
              sizes="100vw"
              // Sin `priority`: el mosaico va siempre bajo el pliegue. Marcarlo
              // prioritario descarga fotos de 1900px en el arranque y compite
              // con el LCP real, que es la imagen del hero.
            />
          );
        }

        // La pieza ancha va primero o segunda según la fila; el zigzag es lo
        // que evita que dos filas seguidas se lean como una rejilla plana.
        const shapes = row.variant === "pair" ? [WIDE, TALL] : [TALL, WIDE];

        return (
          <div
            key={row.items.map((i) => i.project.slug).join("-")}
            className={`grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4 lg:gap-5 ${PAIR_ROW}`}
          >
            {row.items.map(({ project, index }, k) => (
              <ProjectTile
                key={project.slug}
                project={project}
                index={index}
                tagline
                shape={`aspect-[4/3] md:aspect-auto md:h-full ${shapes[k].span}`}
                sizes={shapes[k].sizes}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
