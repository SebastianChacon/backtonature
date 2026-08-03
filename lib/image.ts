/**
 * Placeholder compartido para fotos remotas (WordPress). No hay forma barata
 * de generar un blurDataURL real por foto sin descargarlas en build, así que
 * se usa un degradado genérico en los tonos oscuros del sitio (ink):
 * mientras la foto real llega se ve un fundido suave en vez del bloque negro
 * sólido que dejaba el fondo `bg-ink`/`bg-ink-soft` del contenedor.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFiMjQyMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBmMTUxMiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==";
