import type { Metadata, Viewport } from "next";
import { cormorant, jost } from "@/lib/fonts";
import { site } from "@/content/site";
import { canonical } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    images: [{ url: site.ogImage, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#20342a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        {/* A11Y — skip link */}
        <a
          href="#main"
          className="fixed top-[-120px] left-4 z-[140] rounded-[2px] bg-bone px-5 py-3 [font-size:var(--text-label)] tracking-[0.18em] text-ink uppercase transition-[top] focus:top-4"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <SiteHeader />

        <main id="main">{children}</main>

        <SiteFooter />
        <Analytics />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
