import type { Metadata } from "next";
import { caveat } from "@/lib/fonts";
import { pageMetadata } from "@/lib/seo";
import ScheduleBoard from "@/components/ScheduleBoard";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Production Calendar",
    description:
      "The Back to Nature production board — crews, project managers and build windows, week by week.",
    path: "/calendar",
  }),
  /*
    Tablero interno: nombres de cliente y asignación de cuadrillas. Se sirve,
    pero no se indexa ni entra en el sitemap.
  */
  robots: { index: false, follow: false },
};

export default function CalendarPage() {
  return (
    <div className={`${caveat.variable} bg-ink pt-32 pb-[clamp(4rem,9vh,7rem)]`}>
      <div className="wrap">
        <Eyebrow className="text-brass">The Board</Eyebrow>
        <h1 className="mt-4 max-w-[16ch] text-bone [font-size:var(--text-h2)]">
          Production calendar
        </h1>
        <p className="serif-lead mt-6 max-w-[52ch] text-bone/75">
          Every project on the wall at once — designer, construction manager and
          project manager against the week it breaks ground, with the enhancement
          crews running alongside.
        </p>
      </div>

      <div className="mt-[clamp(2.5rem,6vh,4.5rem)]">
        <ScheduleBoard />
      </div>
    </div>
  );
}
