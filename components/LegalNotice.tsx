import { site } from "@/content/site";

/**
 * Aviso de migración pendiente en las páginas legales.
 *
 * El texto íntegro de la política de privacidad y de la declaración de
 * accesibilidad del sitio actual se inyecta por JavaScript desde el proveedor
 * legal de Mariani: no está en el HTML y no se puede migrar automáticamente sin
 * arriesgarse a publicar un documento legal truncado. Estas rutas existen para
 * conservar la paridad de URLs; el texto definitivo lo aporta el cliente.
 */
export default function LegalNotice({ liveUrl }: { liveUrl: string }) {
  return (
    <aside className="mt-12 rounded-[3px] border border-brass/50 bg-ink-soft p-7">
      <p className="[font-size:var(--text-label)] tracking-[0.2em] text-brass uppercase">
        Pending content migration
      </p>
      <p className="mt-4 max-w-[60ch] text-bone/85">
        The full legal text is served by {site.parent}&apos;s legal provider and
        must be migrated verbatim by the client&apos;s legal team before launch —
        it is deliberately not reproduced or paraphrased here.
      </p>
      <a
        href={liveUrl}
        className="mt-4 inline-block [font-size:var(--text-label)] tracking-[0.2em] text-brass uppercase underline underline-offset-4"
      >
        Read the current published version →
      </a>
    </aside>
  );
}
