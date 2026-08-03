"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/content/site";

/**
 * F-07 · Navegación principal + menú móvil.
 *
 * Accesibilidad (WCAG 2.1 AA):
 *  · El submenú es un disclosure con botón real, aria-expanded y cierre con Escape
 *    — operable solo con teclado, no depende de :hover.
 *  · El menú móvil bloquea el scroll, devuelve el foco al botón que lo abrió y
 *    se cierra con Escape.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar todo al cambiar de ruta.
  useEffect(() => {
    setMenuOpen(false);
    setOpenSub(null);
  }, [pathname]);

  // Bloqueo de scroll + foco mientras el menú móvil está abierto.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      setOpenSub(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Cerrar el submenú al hacer clic fuera.
  useEffect(() => {
    if (!openSub) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenSub(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openSub]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  /** Id estable para enlazar el botón con su panel (aria-controls). */
  const subId = (href: string) => `sub-${href.replace(/\W+/g, "-")}`;

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--spacing-pad)] transition-[background-color,padding,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-bone/15 bg-ink/85 py-3 backdrop-blur-md"
            : "border-b border-transparent py-6"
        }`}
      >
        {/*
          A11Y · contraste del nav sobre la portada, sin la costura del scrim.
          Antes este degradado vivía en el propio <header> (91px de alto) y
          terminaba justo en su borde; debajo, el hero pinta OTRO degradado
          independiente y mucho más largo. Dos rampas lineales con pendientes
          tan distintas empalmadas crean un salto de pendiente (banda de Mach)
          justo en esa costura, muy visible sobre un cielo liso. Al alargar el
          desvanecido en una capa aparte, su pendiente se acerca a la del hero
          y la costura deja de notarse.
        */}
        {!scrolled && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[clamp(9rem,20vh,15rem)] bg-gradient-to-b from-ink/50 to-transparent"
          />
        )}

        <Link href="/" className="relative block h-9 w-[154px] shrink-0 sm:h-10 sm:w-[172px]">
          <Image
            src="/images/logo.png"
            alt={site.name}
            fill
            priority
            sizes="172px"
            className="object-contain object-left"
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-8 lg:flex xl:gap-9"
        >
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative">
                <button
                  type="button"
                  aria-expanded={openSub === item.href}
                  aria-controls={subId(item.href)}
                  onClick={() =>
                    setOpenSub(openSub === item.href ? null : item.href)
                  }
                  className={`flex items-center gap-1.5 py-1 [font-size:var(--text-label)] tracking-[0.2em] uppercase transition-opacity ${
                    isActive(item.href)
                      ? "text-bone opacity-100"
                      : "text-bone opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[0.6em]">
                    ▾
                  </span>
                </button>

                {openSub === item.href && (
                  <div
                    id={subId(item.href)}
                    className="absolute top-full left-0 mt-4 min-w-64 border border-bone/15 bg-ink/95 p-2 backdrop-blur-md"
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 [font-size:var(--text-label)] tracking-[0.18em] text-brass uppercase hover:bg-bone/5"
                    >
                      All services
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-bone/85 hover:bg-bone/5 hover:text-bone"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative py-1 [font-size:var(--text-label)] tracking-[0.2em] text-bone uppercase transition-opacity after:absolute after:bottom-[-2px] after:left-0 after:h-px after:bg-brass after:transition-[width] after:duration-300 hover:opacity-100 hover:after:w-full ${
                  isActive(item.href)
                    ? "opacity-100 after:w-full"
                    : "opacity-80 after:w-0"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}

          <Link
            href="/contact"
            className="rounded-[2px] border border-bone/25 px-5 py-2.5 [font-size:var(--text-label)] tracking-[0.2em] text-bone uppercase transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          >
            Contact
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="rounded-[2px] border border-bone/50 px-4 py-2.5 [font-size:var(--text-label)] tracking-[0.2em] text-bone uppercase lg:hidden"
        >
          Menu
        </button>
      </header>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[110] flex-col items-center justify-center gap-8 overflow-y-auto bg-ink/97 py-24 backdrop-blur-sm ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => {
            setMenuOpen(false);
            toggleRef.current?.focus();
          }}
          aria-label="Close menu"
          className="absolute top-5 right-[var(--spacing-pad)] text-3xl leading-none text-bone"
        >
          &times;
        </button>

        <nav
          aria-label="Mobile"
          className="flex w-full flex-col items-center gap-5"
        >
          {primaryNav.map((item) => (
            <div key={item.href} className="flex w-full flex-col items-center">
              <Link
                href={item.href}
                className="text-center font-[family-name:var(--font-display)] text-[clamp(1.8rem,7vw,2.4rem)] text-bone"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-2 flex flex-col items-center gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-sm text-sage hover:text-bone"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="text-center font-[family-name:var(--font-display)] text-[clamp(1.8rem,7vw,2.4rem)] text-bone"
          >
            Contact
          </Link>
        </nav>

        <a
          href={site.contact.phoneHref}
          className="[font-size:var(--text-label)] tracking-[0.24em] text-brass uppercase"
        >
          {site.contact.phone}
        </a>
      </div>
    </>
  );
}
