import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Eyebrow } from "./ui";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pt-[clamp(3.5rem,8vh,6rem)] pb-10">
      <div className="wrap">
        <div className="grid gap-10 border-b border-bone/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone">
              {site.name}
            </h2>
            <p className="mt-4 max-w-[34ch] text-sage">{site.description}</p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block [font-size:var(--text-label)] tracking-[0.2em] text-brass uppercase hover:text-bone"
            >
              Instagram
            </a>
          </div>

          <div className="flex flex-col gap-3.5">
            <Eyebrow className="mb-1 text-brass">Studio</Eyebrow>
            <span className="text-bone/80">
              {site.contact.locality}, {site.contact.regionName}
            </span>
            <span className="text-bone/80">{site.contact.hours}</span>
            <a
              href={site.contact.phoneHref}
              className="text-bone/80 hover:text-bone"
            >
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-bone/80 hover:text-bone"
            >
              {site.contact.email}
            </a>
          </div>

          <div className="flex flex-col gap-3.5">
            <Eyebrow className="mb-1 text-brass">Studio</Eyebrow>
            {footerNav.studio.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-bone/80 hover:text-bone"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <Eyebrow className="mb-1 text-brass">Explore</Eyebrow>
            {footerNav.work.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-bone/80 hover:text-bone"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs tracking-[0.04em] text-stone">
          <span>
            © {year} {site.legalName} — a {site.parent} company.
          </span>
          <div className="flex flex-wrap gap-5">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-sage">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
