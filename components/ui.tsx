import Link from "next/link";
import type { ReactNode } from "react";

/** Primitivas compartidas del sistema de diseño (D-06). */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

/** Etiqueta de sección con la regla de latón del concepto. */
export function Kicker({
  children,
  tone = "brass",
}: {
  children: ReactNode;
  tone?: "brass" | "forest";
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <i
        className={`block h-px w-11 ${
          tone === "brass" ? "bg-brass" : "bg-forest"
        } opacity-70`}
      />
      <Eyebrow className={tone === "brass" ? "text-brass" : "text-forest"}>
        {children}
      </Eyebrow>
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "outline" | "light" | "fill";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "outline",
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 rounded-[2px] border px-7 py-4 font-normal uppercase transition-colors duration-300 [font-size:var(--text-label)] [letter-spacing:0.22em]";

  const variants = {
    outline: "border-current",
    light: "border-white text-white hover:bg-white hover:text-ink",
    fill: "border-brass bg-brass text-ink hover:bg-transparent hover:text-brass",
  } as const;

  const external = href.startsWith("http") || href.startsWith("tel:");
  const inner = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {inner}
    </Link>
  );
}

/** Banda de sección a ancho completo. */
export function Band({
  children,
  tone = "ink",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "ink" | "bone" | "forest" | "ink-soft";
  className?: string;
  id?: string;
}) {
  const tones = {
    ink: "bg-ink text-bone",
    "ink-soft": "bg-ink-soft text-bone",
    bone: "bg-bone text-ink",
    forest: "bg-forest-deep text-bone",
  } as const;

  return (
    <section
      id={id}
      className={`${tones[tone]} py-[clamp(4.5rem,11vh,9rem)] ${className}`}
    >
      {children}
    </section>
  );
}

/** F-07 · Breadcrumbs en páginas de proyecto. */
export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 [font-size:var(--text-label)] tracking-[0.18em] text-sage uppercase">
        {trail.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-bone">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-bone">
                {item.label}
              </span>
            )}
            {i < trail.length - 1 && (
              <span aria-hidden="true" className="text-stone">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
