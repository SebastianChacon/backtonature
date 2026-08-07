import { site, videos } from "@/content/site";
import { whatHappensNext } from "@/content/credentials";
import FadeImage from "./FadeImage";
import VideoBackground from "./VideoBackground";
import { Button, Eyebrow, Kicker } from "./ui";

/**
 * CTA de cierre — usa el segundo video del cliente como fondo (F-05).
 * El póster lo pinta el servidor; el video solo se monta si procede.
 */
export default function ContactCta({
  title = "Let's design the grounds you'll grow into.",
  body = "Consultations are by appointment from our Basking Ridge studio, serving New Jersey, New York & Connecticut.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden">
      <FadeImage
        src={videos.cta.poster}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={60}
        className="object-cover"
      />
      <VideoBackground
        vimeoId={videos.cta.vimeoId}
        title={videos.cta.title}
        clip={videos.cta.clip}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/90 via-ink/55 to-ink/25"
      />

      <div className="wrap relative z-10 w-full py-20">
        <Kicker>Begin</Kicker>
        <h2 className="max-w-[16ch] text-white [font-size:var(--text-h2)]">
          {title}
        </h2>
        <p className="mt-6 mb-9 max-w-[40ch] text-bone/85 [font-size:var(--text-body)]">
          {body}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Button href="/contact" variant="fill">
            Start a Project
          </Button>
          <div className="font-[family-name:var(--font-display)] text-3xl text-bone">
            <Eyebrow className="mb-1 block text-sage">Studio</Eyebrow>
            <a href={site.contact.phoneHref} className="hover:text-white">
              {site.contact.phone}
            </a>
          </div>
        </div>

        {/*
          Lo que frena una llamada a esta escala no es el precio, es no saber
          en qué te metes. Estos tres pasos son el proceso que la firma ya
          publica en /how-we-work, puesto donde de verdad hace falta: pegado
          al botón. Es una `<ol>` porque son secuenciales.
        */}
        <ol className="mt-14 grid gap-6 border-t border-bone/20 pt-8 sm:grid-cols-3 sm:gap-10">
          {whatHappensNext.map((step, i) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="font-[family-name:var(--font-display)] text-brass"
              >
                0{i + 1}
              </span>
              <h3 className="mt-1 text-xl text-white">{step.title}</h3>
              <p className="mt-2 max-w-[32ch] text-sm text-bone/85">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
