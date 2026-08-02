"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * F-06 · Analítica y consentimiento.
 *
 * Privacidad primero: GA4 no se carga hasta que la persona acepta. Rechazar es
 * tan fácil como aceptar (mismo peso visual), y la decisión se recuerda.
 * Sin NEXT_PUBLIC_GA_ID definido no se muestra el banner ni se carga nada.
 */

const STORAGE_KEY = "btn-consent";
type Consent = "granted" | "denied";

export default function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const gaId = site.analytics.gaId;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") setConsent(stored);
    } catch {
      // Modo privado o storage bloqueado: se trata como "sin decisión".
    }
    setReady(true);
  }, []);

  const decide = (value: Consent) => {
    setConsent(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Si no se puede persistir, la decisión sigue valiendo para esta sesión.
    }
  };

  if (!gaId) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[130] mx-auto max-w-2xl rounded-[3px] border border-bone/20 bg-ink/95 p-5 backdrop-blur-md sm:inset-x-6"
        >
          <p className="text-sm text-bone/85">
            We use analytics cookies to understand how the site is used. Nothing
            is loaded until you choose.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-[2px] border border-brass bg-brass px-5 py-2.5 [font-size:var(--text-label)] tracking-[0.2em] text-ink uppercase"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-[2px] border border-bone/40 px-5 py-2.5 [font-size:var(--text-label)] tracking-[0.2em] text-bone uppercase"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
