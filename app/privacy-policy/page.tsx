import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import LegalNotice from "@/components/LegalNotice";
import { Band, Eyebrow } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and discloses information gathered on backtonature.net.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Band tone="ink" className="pt-40">
      <div className="wrap max-w-3xl">
        <Eyebrow className="text-brass">Legal</Eyebrow>
        <h1 className="mt-4 [font-size:var(--text-h2)]">Privacy Policy</h1>
        <p className="mt-4 text-sage">Effective date: 1 January 2014</p>

        <div className="mt-10 flex flex-col gap-5 text-bone/85 [font-size:var(--text-body)]">
          <p className="measure">
            This Privacy Policy details important information regarding the use
            and disclosure of user information collected on the website
            backtonature.net, which is owned and operated by {site.legalName}{" "}
            and its affiliates and any successor website (collectively, the
            “Site”), and other interactive properties, including but not limited
            to any mobile applications enabling you to access the Site.
          </p>
          <p className="measure">
            {site.legalName} provides this Privacy Policy to help you make an
            informed decision about whether to use, or continue to use, the
            products and services provided by {site.legalName}.
          </p>
        </div>

        <LegalNotice liveUrl="https://backtonature.net/privacy-policy/" />
      </div>
    </Band>
  );
}
