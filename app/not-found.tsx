import { projects } from "@/content/projects";
import { ProjectTile } from "@/components/ProjectMosaic";
import { Band, Button, Kicker } from "@/components/ui";

/**
 * S-07 · 404 útil.
 * En vez de un callejón sin salida, reconduce al portfolio — que es donde
 * quiere acabar casi todo el tráfico que llega con una URL rota.
 */
export default function NotFound() {
  const suggestions = projects.slice(0, 3);

  return (
    <Band tone="ink" className="pt-40">
      <div className="wrap">
        <Kicker>404</Kicker>
        <h1 className="max-w-[18ch] [font-size:var(--text-h2)]">
          That page has grown over.
        </h1>
        <p className="mt-6 mb-9 max-w-[46ch] text-sage [font-size:var(--text-body)]">
          The page you were looking for isn&apos;t here. Here is some of the work
          instead — or head back to the beginning.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button href="/case-study" variant="fill">
            View the work
          </Button>
          <Button href="/" className="text-bone">
            Home
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {suggestions.map((project) => (
            <ProjectTile
              key={project.slug}
              project={project}
              shape="aspect-[4/3]"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          ))}
        </div>
      </div>
    </Band>
  );
}
