import type { Metadata } from "next";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import ServicePage from "@/components/ServicePage";
import { notFound } from "next/navigation";

const SLUG = "edible-gardens-and-culinary-experiences";

export const metadata: Metadata = pageMetadata({
  title: "Edible Gardens & Culinary Experiences",
  description:
    "Kitchen gardens, orchards, food forests and culinary lessons — from soil to plate, designed, planted and maintained by the studio.",
  path: `/${SLUG}`,
});

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
