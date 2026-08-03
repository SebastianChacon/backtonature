import Image from "next/image";
import type { ReactNode } from "react";
import { BLUR_DATA_URL } from "@/lib/image";
import { heroBlurData } from "@/lib/heroBlur";
import { Eyebrow } from "./ui";

/**
 * Hero editorial para páginas internas (D-03/D-04).
 * La foto es el elemento LCP: se marca `priority` y se sirve a ancho completo.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  children,
  height = "tall",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  height?: "tall" | "short";
}) {
  return (
    <header
      className={`relative flex items-end overflow-hidden ${
        height === "tall"
          ? "min-h-[68svh] lg:min-h-[78svh]"
          : "min-h-[52svh] lg:min-h-[58svh]"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        quality={60}
        placeholder="blur"
        blurDataURL={heroBlurData[image] ?? BLUR_DATA_URL}
        className="object-cover"
      />
      {/*
        A11Y · contraste. Varias fotos de cabecera son escenas soleadas y el
        texto blanco se quedaba por debajo de AA. El degradado vertical sostiene
        la mitad inferior y el radial lava la esquina izquierda, que es donde
        vive la columna de texto.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,21,18,.62)_0%,rgba(15,21,18,.28)_35%,rgba(15,21,18,.55)_70%,rgba(15,21,18,.9)_100%),radial-gradient(105%_85%_at_8%_75%,rgba(15,21,18,.7),transparent_60%)]"
      />

      <div className="wrap relative z-10 w-full pt-32 pb-[clamp(3rem,7vh,5rem)]">
        {eyebrow && <Eyebrow className="text-bone/90">{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-[18ch] text-white [font-size:var(--text-h2)]">
          {title}
        </h1>
        {lead && (
          <p className="serif-lead mt-6 max-w-[46ch] text-bone/90">{lead}</p>
        )}
        {children}
      </div>
    </header>
  );
}
