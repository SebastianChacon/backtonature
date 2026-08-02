import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SubscribeForm from "@/components/SubscribeForm";
import Reveal from "@/components/Reveal";
import { Band, Kicker } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Subscribe",
  description:
    "Get occasional notifications on news, seasonal openings and special events from the Back to Nature studio.",
  path: "/subscribe",
});

export default function SubscribePage() {
  return (
    <>
      <PageHero
        eyebrow="Subscribe for Updates"
        title="Occasional notes from the studio."
        lead="News, seasonal openings and special events. Infrequent, and easy to leave."
        image="https://backtonature.net/wp-content/uploads/2023/06/Back-To-Nature-Landscape-Gallery-20.jpg"
        imageAlt="A seasonal planting in a mature garden"
        height="short"
      />

      <Band tone="ink">
        <div className="wrap max-w-2xl">
          <Reveal>
            <Kicker>Join the list</Kicker>
            <SubscribeForm />
          </Reveal>
        </div>
      </Band>
    </>
  );
}
