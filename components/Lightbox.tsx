"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/content/projects";
import FadeImage from "./FadeImage";

/**
 * F-04 · Galería con visor a pantalla completa.
 *
 * Accesibilidad: diálogo modal con foco atrapado, navegación con ← → y cierre
 * con Escape. Cada miniatura es un <button> real, no un div con onClick.
 */
export default function Lightbox({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((cur) =>
        cur === null ? cur : (cur + delta + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // Foco atrapado dentro del diálogo.
        const focusables =
          dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector("button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, close, step]);

  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const current = index === null ? null : images[index];

  return (
    <>
      <div className={`grid grid-cols-1 gap-3 ${cols}`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setIndex(i);
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-[2px] bg-ink-soft"
          >
            <FadeImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105"
            />
            <span className="sr-only">Open image {i + 1} full screen</span>
          </button>
        ))}
      </div>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/97 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 z-10 text-3xl leading-none text-bone"
          >
            &times;
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-3 z-10 px-4 py-6 text-2xl text-bone/70 hover:text-bone sm:left-6"
          >
            ‹
          </button>

          <figure className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4">
            <div className="relative h-[75vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="[font-size:var(--text-label)] tracking-[0.18em] text-sage uppercase">
              {index! + 1} / {images.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-3 z-10 px-4 py-6 text-2xl text-bone/70 hover:text-bone sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
