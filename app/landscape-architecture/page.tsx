import type { Metadata } from "next";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import ServicePage from "@/components/ServicePage";
import { notFound } from "next/navigation";

const SLUG = "landscape-architecture";

export const metadata: Metadata = pageMetadata({
  title: "Landscape Architecture",
  description:
    "Master plans and hand-drawn designs that read the site first — grade, light, water, and the ecology already at work. Serving New Jersey, New York and Connecticut.",
  path: `/${SLUG}`,
});

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
