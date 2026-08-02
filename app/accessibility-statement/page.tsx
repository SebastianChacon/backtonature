import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LegalNotice from "@/components/LegalNotice";
import { Band, Eyebrow } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility Statement",
  description:
    "Back to Nature strives to ensure that its digital services are accessible to people with disabilities. Our commitment, standards and how to reach us.",
  path: "/accessibility-statement",
});

/** Compromisos técnicos que este sitio sí cumple y podemos afirmar. */
const commitments = [
  "Semantic HTML with a logical heading order and a skip link on every page.",
  "Visible focus styles on every interactive element, and full keyboard operation of menus, galleries and forms.",
  "Background video is muted, decorative, hidden from assistive technology and removed entirely under prefers-reduced-motion.",
  "Form fields have associated labels, and errors are announced and linked to their field.",
  "Text is kept legible over photography with gradient scrims rather than reduced contrast.",
];

export default function AccessibilityStatementPage() {
  return (
    <Band tone="ink" className="pt-40">
      <div className="wrap max-w-3xl">
        <Eyebrow className="text-brass">Legal</Eyebrow>
        <h1 className="mt-4 [font-size:var(--text-h2)]">
          Accessibility Statement
        </h1>

        <div className="mt-10 flex flex-col gap-5 text-bone/85 [font-size:var(--text-body)]">
          <p className="measure">
            Back to Nature strives to ensure that its digital services are
            accessible to people with disabilities, with the strong belief that
            every person has the right to live with dignity, equality, comfort
            and independence.
          </p>
          <p className="measure">
            Digital accessibility is not just a target we aim to achieve, but an
            ongoing commitment that we carry in every aspect of our digital
            service delivery. We recognise that this requires continuous
            monitoring, improvement and adaptation.
          </p>
        </div>

        <h2 className="mt-12 mb-5 [font-size:var(--text-h3)]">
          How this site is built
        </h2>
        <p className="measure mb-6 text-sage">
          This site targets WCAG 2.1 Level AA. Specifically:
        </p>
        <ul className="flex flex-col gap-3">
          {commitments.map((item) => (
            <li
              key={item}
              className="border-b border-bone/10 pb-3 text-bone/85"
            >
              {item}
            </li>
          ))}
        </ul>

        <LegalNotice liveUrl="https://backtonature.net/accessibility-statement/" />
      </div>
    </Band>
  );
}
