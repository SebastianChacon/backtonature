"use client";

import { useState } from "react";
import type { GalleryCategory } from "@/content/galleries";
import Lightbox from "./Lightbox";

/**
 * F-04 · Galería filtrable.
 * Los filtros son botones reales con aria-pressed, navegables con teclado.
 */
export default function GalleryBrowser({
  categories,
}: {
  categories: GalleryCategory[];
}) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const current = categories.find((c) => c.slug === active) ?? categories[0];

  if (!current) return null;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter galleries"
        className="flex flex-wrap gap-2.5"
      >
        {categories.map((category) => {
          const selected = category.slug === active;
          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category.slug)}
              className={`rounded-full border px-5 py-2 [font-size:var(--text-label)] tracking-[0.14em] uppercase transition-colors ${
                selected
                  ? "border-brass bg-brass text-ink"
                  : "border-bone/25 text-bone/75 hover:border-bone/60 hover:text-bone"
              }`}
            >
              {category.title}
              <span className="ml-2 opacity-60">{category.images.length}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone">
          {current.title}
        </h2>
        <p className="mt-2 max-w-[52ch] text-sage">{current.description}</p>
      </div>

      <div className="mt-8">
        <Lightbox key={current.slug} images={current.images} columns={4} />
      </div>
    </div>
  );
}
