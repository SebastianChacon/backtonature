import type { Metadata } from "next";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import ServicePage from "@/components/ServicePage";
import { notFound } from "next/navigation";

const SLUG = "landscape-maintenance";

export const metadata: Metadata = pageMetadata({
  title: "Landscape Maintenance",
  description:
    "Stewardship that lets a landscape mature — pruning, soil health and seasonal care by horticulturists, with enhancements through the year.",
  path: `/${SLUG}`,
});

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
