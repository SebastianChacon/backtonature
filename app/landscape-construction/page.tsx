import type { Metadata } from "next";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import ServicePage from "@/components/ServicePage";
import { notFound } from "next/navigation";

const SLUG = "landscape-construction";

export const metadata: Metadata = pageMetadata({
  title: "Landscape Construction",
  description:
    "One team from sketch to stone: grading, drainage, hardscape, pools, water features, irrigation and lighting, built by our own crews.",
  path: `/${SLUG}`,
});

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
