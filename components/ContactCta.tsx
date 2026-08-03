import { site, videos } from "@/content/site";
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
        quality={75}
        className="object-cover"
      />
      <VideoBackground
        vimeoId={videos.cta.vimeoId}
        title={videos.cta.title}
        revealAfter={videos.cta.revealAfter}
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
      </div>
    </section>
  );
}
