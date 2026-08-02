import type { EditorialSection } from "@/content/pages";
import Reveal from "./Reveal";

/** Cuerpo editorial de dos columnas — compartido por About, Ethos y servicios. */
export default function EditorialSections({
  sections,
}: {
  sections: readonly EditorialSection[];
}) {
  return (
    <>
      {sections.map((section, i) => (
        <Reveal key={section.heading} delay={i === 0 ? 0 : 0.04}>
          <div className="mb-14 grid gap-6 last:mb-0 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
            <h2 className="text-forest [font-size:var(--text-h3)]">
              {section.heading}
            </h2>
            <div className="flex flex-col gap-5">
              {section.body.map((paragraph, j) => (
                <p
                  key={j}
                  className="measure text-stone [font-size:var(--text-body)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </>
  );
}
