# Back to Nature — rediseño del sitio

Implementación del documento de requerimientos (`requerimientos.html`) sobre el
concepto ya aprobado de la home (`backtonature-concept.html`).

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · sin CMS externo todavía.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # sirve el build
npm run typecheck
```

---

## Qué está construido

El alcance de esta pasada fueron las **rutas P1 completas**; el resto existe y es
navegable, con contenido real, pero con una plantilla más simple.

| Estado | Rutas |
| --- | --- |
| Completas (P1) | `/` · `/about` · `/what-we-do` · `/case-study` · `/portfolio/[slug]` (×9) · `/contact` |
| Funcionales | `/ethos` · `/how-we-work` · `/galleries` · `/careers` · `/subscribe` · las 4 rutas de servicio |
| Legales | `/privacy-policy` · `/accessibility-statement` — ver *Contenido pendiente* |

**Las 25 rutas del sitio actual responden 200.** Ninguna URL indexada hoy se
rompe con la migración.

## Paridad de URLs (S-01)

Dos decisiones que no son obvias y conviene no revertir:

1. **`trailingSlash: true`.** El sitio actual canonicaliza *con* barra final
   (`/about/`) y hace 301 desde `/about`. Sin esta opción, Next haría lo
   contrario e invertiría el canonical de todas las URLs indexadas.
2. **Los redirects heredados llevan barra final en origen y destino.** Con
   `trailingSlash: true` Next normaliza la URL *antes* de evaluar los redirects,
   así que un `source: "/services"` nunca coincidiría. Se emite `301` explícito
   en vez de `permanent: true` (que emite 308).

Verificado: `/services/ → /what-we-do/`, `/case-studies/ → /case-study/`,
`/privacy/ → /privacy-policy/`, etc., todos en un solo salto 301.

## SEO

- `app/robots.ts` apunta el sitemap a **backtonature.net**. El `robots.txt`
  actual lo apunta a `backtonature.com` —un dominio aparcado—, que es el fallo de
  indexación activo señalado como "gana rápido" en el documento. Arreglado.
- `app/sitemap.ts` genera las 25 URLs con barra final.
- Title, description, canonical, Open Graph y Twitter Card únicos por página vía
  `lib/seo.ts` (`pageMetadata`). Ninguna ruta se queda sin ellos.
- JSON-LD: `LandscapingBusiness` con NAP y zona de servicio NJ/NY/CT,
  `CreativeWork` por proyecto y `BreadcrumbList`.
- 404 útil que reconduce al portfolio.

## Contenido (F-01)

Todo vive en `content/` como TypeScript tipado, con el esquema que tendría un CMS
headless:

| Archivo | Qué contiene |
| --- | --- |
| `site.ts` | NAP, navegación, GA4, los dos videos de Vimeo |
| `projects.ts` | Los 9 proyectos: texto, galerías, objetivos de diseño |
| `services.ts` | Las 4 disciplinas + el bloque "Cultivate" |
| `galleries.ts` | 9 categorías, 175 imágenes |
| `pages.ts` | Copy de About, Ethos, proceso, vacantes |

El texto es el publicado hoy en backtonature.net, extraído del sitio, no
reescrito.

### Migrar a un CMS

El corte está pensado para que sea un cambio localizado: `content/*` exporta
datos y funciones de acceso (`getProject`, `getService`, `getGallery`). Al mover
a Sanity/Payload se sustituye el cuerpo de esas funciones por un fetch que
devuelva los mismos tipos (`Project`, `Service`, `GalleryCategory`) y las páginas
no se tocan. Los tipos son el contrato.

## Imágenes

Se sirven desde la biblioteca de WordPress actual vía `next/image`
(`remotePatterns` en `next.config.ts`), optimizadas a AVIF/WebP. Cuando el
cliente entregue los originales, se cambia el origen sin tocar las páginas.

## Formularios (F-03)

Server actions en `app/actions.ts`, validación con Zod **en servidor** (nunca se
confía en la del navegador), honeypot anti-spam y notificación por email.

Sin `RESEND_API_KEY` el envío se registra en el log del servidor y la persona
recibe confirmación igual — el sitio es funcional en local y en preview sin
credenciales. Ver `.env.example`.

`/careers` todavía no tiene formulario con adjuntos: hoy dirige a email y
teléfono. Es el trozo de F-03 que queda pendiente.

## Accesibilidad

Objetivo WCAG 2.1 AA. Verificado en navegador:

- Menú móvil: bloquea el scroll, mueve el foco al abrir y lo devuelve al botón al
  cerrar con Escape.
- Lightbox: diálogo modal con foco atrapado, ← → para navegar, Escape para
  cerrar, miniaturas como `<button>` reales.
- Formularios: labels asociados, `aria-invalid`, errores enlazados por
  `aria-describedby` y anunciados con `role="alert"`.
- Submenú de navegación: disclosure con botón real y `aria-expanded`, no depende
  de `:hover`.
- Video de fondo: silenciado, `aria-hidden`, fuera del orden de tabulación, y no
  se monta en absoluto con `prefers-reduced-motion`.
- Sin `prefers-reduced-motion` no hay animación alguna: los reveals se resuelven
  a estado final.

Falta una auditoría formal con axe y una pasada con lector de pantalla.

## Decisiones que se apartan del documento

**Sin Framer Motion.** El documento lo lista en el stack recomendado. Se
implementó, y se retiró: sus componentes serializan `opacity: 0` en el HTML del
servidor, de modo que **sin JavaScript el sitio entero queda invisible**. Los
reveals ahora son CSS dentro de `@media (scripting: enabled)` más un
IntersectionObserver (`components/Reveal.tsx`): mismo efecto, degradación segura
y ~50 KB menos de JS. Lenis (smooth scroll) sí está, y se desactiva por completo
con `prefers-reduced-motion`.

Detalle no evidente del `Reveal`: el observer usa `rootMargin` con un margen
superior enorme. Sin eso, un salto de scroll (ancla, botón atrás, rueda rápida)
lleva al elemento de "debajo del viewport" a "encima" sin pasar por "dentro" — el
observer no ve cambio de estado, no dispara, y esa sección **se queda invisible
para siempre**. Pasó de verdad durante la verificación.

## Rendimiento

Medido sobre el build de producción en local, primera carga de la home:

| | |
| --- | --- |
| Total sin video | **328 KB** (objetivo < 1 MB) |
| JS | 169 KB |
| Fuentes (auto-alojadas) | 101 KB |
| CSS | 9 KB |
| HTML | 13 KB |
| Imágenes | 36 KB (solo el hero) |
| CLS | 0 |
| TTFB | 17 ms |

El mosaico de portfolio no lleva `priority`: marcarlo descargaba ~1.1 MB de fotos
bajo el pliegue compitiendo con el LCP real.

**No verificado todavía:** Lighthouse ≥95 y LCP < 2.5s. No se pueden medir de
forma fiable en local con el panel de navegador en segundo plano; hay que
ejecutarlos sobre el despliegue real.

## Contenido pendiente del cliente

Esto no es deuda técnica, es material que el documento ya lista como pendiente:

1. **Textos de 3 proyectos.** Harding Harvest, Chateau in Bloom y Montclair
   Historic Haven están publicados hoy como galerías sin narrativa. Se marcan con
   `narrativePending: true` y la plantilla los muestra como pieza visual con un
   aviso, en lugar de inventarles un case study. Al llegar el texto: rellenar
   `sections` y poner la bandera a `false`.
2. **Máster de video sin intro.** Los dos videos de Vimeo traen la placa del
   logo incrustada y ese lettering choca con el titular del hero. Mitigación
   actual: el video se reproduce oculto sobre el póster y solo se funde cuando el
   propio reproductor informa (por `postMessage`, sin cargar el SDK) de que ya
   pasó ese punto. Si Vimeo no responde, se queda el póster. Con un máster
   limpio, poner `revealAfter: 0` en `content/site.ts`.
3. **Alt text real por foto.** Los `alt` de galería son etiquetas de proyecto y
   ubicación, deliberadamente **no** derivadas del nombre de archivo: la
   biblioteca del cliente usa apellidos de propietarios (Massaro, Saluzzo,
   Wynne…) y no deben publicarse en el alt de una residencia privada.
4. **Texto legal íntegro.** La política de privacidad y la declaración de
   accesibilidad se inyectan por JavaScript desde el proveedor legal de Mariani:
   no están en el HTML y no se pueden migrar automáticamente. Las rutas existen
   con el texto que sí es público y un aviso; el resto lo debe aportar el equipo
   legal, verbatim.

## Pendiente de decisión con el cliente

El documento ya lo marca: al ser un sitio de **Mariani Premier Group**, el stack
y el hosting deben alinearse con sus estándares corporativos y con el contrato
vigente de la agencia actual antes de comprometer arquitectura.

## Estructura

```
app/            rutas (App Router) · actions.ts (server actions) · sitemap/robots
components/     biblioteca de UI reutilizable
content/        capa de contenido tipada — el "CMS" de hoy
lib/            fuentes, helpers de SEO, estado de formularios
```
