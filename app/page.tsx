import Image from "next/image";
import Link from "next/link";
import { site, videos } from "@/content/site";
import { featuredSlugs, projects } from "@/content/projects";
import { cultivate, services } from "@/content/services";
import { homeProcess } from "@/content/pages";
import VideoBackground from "@/components/VideoBackground";
import ProjectMosaic from "@/components/ProjectMosaic";
import ContactCta from "@/components/ContactCta";
import FadeImage from "@/components/FadeImage";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import { Band, Button, Eyebrow, Kicker } from "@/components/ui";

const featured = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function HomePage() {
  return (
    <>
      {/* ---------- HERO con video (F-05) ---------- */}
      <header className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
        {/*
          D-05 · La portada deriva hacia arriba al bajar por la página. El
          recorrido es el más largo del sitio —es la única imagen que ocupa la
          pantalla entera— pero el degradado y el titular quedan FUERA de la
          capa: si el scrim se moviera con la foto, el contraste del titular
          cambiaría a mitad de scroll.
        */}
        <Parallax className="absolute inset-0 z-0" shift="clamp(2rem,7vh,5.5rem)">
          <Image
            src={videos.hero.poster}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <VideoBackground
            vimeoId={videos.hero.vimeoId}
            title={videos.hero.title}
            revealAfter={videos.hero.revealAfter}
          />
        </Parallax>
        {/*
          A11Y · contraste. El césped soleado deja el texto blanco por debajo de
          AA, así que el scrim se refuerza en la mitad inferior —donde vive el
          titular— y se añade un lavado radial desde la esquina de lectura.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(15,21,18,.55)_0%,rgba(15,21,18,.10)_22%,rgba(15,21,18,.45)_52%,rgba(15,21,18,.88)_100%),radial-gradient(120%_95%_at_12%_100%,rgba(15,21,18,.65),transparent_62%)]"
        />

        <div className="wrap relative z-10 w-full pb-[clamp(3rem,7vh,6rem)]">
          <Eyebrow className="text-bone">
            {site.contact.serviceArea.join(" · ")}
          </Eyebrow>
          <h1 className="mt-4 mb-6 max-w-[16ch] text-white [font-size:var(--text-hero)]">
            Where others see challenges, we see{" "}
            <em className="text-sage italic">a living garden.</em>
          </h1>
          <div className="flex flex-wrap items-center gap-7">
            <Button href="/case-study" variant="light">
              View the Work
            </Button>
            <p className="max-w-[34ch] text-bone/90 [font-size:var(--text-body)]">
              An ecologically inspired landscape architecture &amp; design/build
              firm.
            </p>
          </div>
        </div>
      </header>

      {/* ---------- ETHOS ---------- */}
      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">Our Ethos</Kicker>
            <h2 className="max-w-[20ch] text-ink [font-size:var(--text-h2)]">
              We design and build outdoor spaces that are as ecologically alive
              as they are beautiful.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
              <p className="max-w-[46ch] text-stone [font-size:var(--text-body)]">
                For four decades, Back to Nature has shaped estates, gardens,
                and grounds across the tri-state area — landscapes conceived as
                ecosystems, drawn by hand, and built to mature gracefully with
                the land they belong to.
              </p>
              <dl className="flex flex-col gap-4">
                {[
                  ["Discipline", "Design / Build"],
                  ["Approach", "Ecological"],
                  ["Studio", `${site.contact.locality}, ${site.contact.region}`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-ink/15 pb-4"
                  >
                    <dt className="[font-size:var(--text-label)] tracking-[0.14em] text-stone uppercase">
                      {label}
                    </dt>
                    <dd className="font-[family-name:var(--font-display)] text-xl text-forest">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ---------- PORTFOLIO ---------- */}
      <section className="bg-bone pb-[clamp(4.5rem,11vh,9rem)] text-ink">
        <div className="wrap">
          <Reveal>
            <div className="mb-11 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-b border-ink/15 pb-8">
              <div>
                <Kicker tone="forest">Selected Work</Kicker>
                <h2 className="max-w-[14ch] [font-size:var(--text-h2)]">
                  Estates, gardens &amp; grounds.
                </h2>
              </div>
              <div className="flex flex-col items-start gap-6">
                <p className="max-w-[38ch] text-stone [font-size:var(--text-body)]">
                  {featured.length} landscapes from four decades of work — each
                  one read, drawn and built for the ground it stands on.
                </p>
                <Button href="/case-study" className="text-forest">
                  All Projects
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectMosaic projects={featured} />
          </Reveal>
        </div>
      </section>

      {/* ---------- CULTIVATE — el diferenciador ---------- */}
      <Band tone="forest">
        <div className="wrap">
          <Reveal>
            <Kicker>What sets us apart</Kicker>
            <h2 className="max-w-[18ch] text-bone [font-size:var(--text-h2)]">
              A landscape that feeds the people who live in it.
            </h2>
            <p className="mt-6 max-w-[52ch] text-sage [font-size:var(--text-body)]">
              Beyond ornament, we build productive ecosystems — orchards,
              apiaries, medicinal gardens and heritage coops — woven into the
              design so the land gives back season after season.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {cultivate.map((item) => (
                <div
                  key={item.title}
                  className="group relative aspect-[3/4.4] overflow-hidden rounded-[2px] bg-ink"
                >
                  {/* Recorrido corto: son cuatro piezas estrechas en fila y un
                      desplazamiento largo las descoordinaría entre sí. */}
                  <Parallax
                    className="absolute inset-0"
                    shift="clamp(0.75rem,2.5vh,2rem)"
                  >
                    <FadeImage
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-107"
                    />
                  </Parallax>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <span className="text-[0.6rem] tracking-[0.3em] text-brass uppercase">
                      Cultivate
                    </span>
                    <h3 className="mt-1 text-2xl text-white">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ---------- SERVICIOS ---------- */}
      <Band tone="bone">
        <div className="wrap">
          <Reveal>
            <Kicker tone="forest">What we do</Kicker>
            <h2 className="max-w-[16ch] text-ink [font-size:var(--text-h2)]">
              Four disciplines, one integrated studio.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="mt-10 border-t border-ink/15">
              {services.map((service) => (
                <li key={service.slug} className="border-b border-ink/15">
                  <Link
                    href={service.href}
                    className="group grid items-baseline gap-2 py-8 transition-[padding] duration-500 hover:pl-5 lg:grid-cols-[0.5fr_2fr_3fr] lg:gap-8"
                  >
                    <span className="hidden font-[family-name:var(--font-display)] text-xl text-brass lg:block">
                      / {service.index}
                    </span>
                    <h3 className="text-ink [font-size:var(--text-h3)]">
                      {service.title}
                    </h3>
                    <p className="max-w-[44ch] text-stone">{service.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Band>

      {/* ---------- PROCESO ---------- */}
      <Band tone="ink-soft">
        <div className="wrap">
          <Reveal>
            <Kicker>How we work</Kicker>
            <h2 className="max-w-[14ch] [font-size:var(--text-h2)]">
              A considered path from land to legacy.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <ol className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-14">
              {homeProcess.map((step) => (
                <li key={step.num} className="border-t border-bone/15 pt-6">
                  <span className="font-[family-name:var(--font-display)] text-5xl leading-none text-forest-bright">
                    {step.num}
                  </span>
                  <h3 className="mt-3 mb-2 text-2xl text-bone">{step.title}</h3>
                  <p className="max-w-[34ch] text-sage">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <Button href="/how-we-work" className="text-bone">
                The full process
              </Button>
            </div>
          </Reveal>
        </div>
      </Band>

      <ContactCta />
    </>
  );
}
