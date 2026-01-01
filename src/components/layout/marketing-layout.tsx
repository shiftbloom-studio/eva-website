import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { legal } from '#data/legal'
import { cn } from '#lib/cn'

export interface MarketingLayoutProps {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  const year = new Date().getFullYear()

  return (
    <div className="relative isolate min-h-[100svh]">
      {/* Base (static) backdrop: CSS-only so the site stays usable on very old/slow devices. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-void-950" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_12%_18%,rgba(186,138,45,0.12),transparent_58%),radial-gradient(900px_circle_at_88%_22%,rgba(153,67,36,0.10),transparent_62%),radial-gradient(1000px_circle_at_52%_92%,rgba(69,44,31,0.20),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/35 via-transparent to-void-950/85" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_14px)]" />
      </div>

      <a
        href="#content"
        className={cn(
          'sr-only focus:not-sr-only',
          'fixed left-4 top-4 z-[100] rounded-full border border-white/10 bg-void-950/80 px-4 py-2 text-xs text-vellum-50 backdrop-blur',
        )}
      >
        Zum Inhalt springen
      </a>

      {/* Base (static) header: becomes “nicer” only when the rich layer is available. */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-void-950/55 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative block h-6 w-6 shrink-0 sm:h-7 sm:w-7">
                <Image
                  src="/static/images/eva-logo-tp.png"
                  alt={legal.siteName}
                  fill
                  sizes="28px"
                  priority
                  className="object-contain [filter:brightness(0)_invert(1)]"
                />
              </span>
              <div className="hidden flex-col justify-center text-[0.625rem] font-medium uppercase leading-tight tracking-[0.18em] text-vellum-200/60 sm:flex">
                <span className="leading-none">Ein Mittelerde</span>
                <span className="leading-none">Rollenspiel</span>
              </div>
            </Link>

            <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 text-sm text-vellum-200/75 md:flex">
              <a href="#lore" className="transition hover:text-vellum-50">
                Lore
              </a>
              <a href="#status" className="transition hover:text-vellum-50">
                Status
              </a>
              <a href="#bento" className="transition hover:text-vellum-50">
                Einstieg
              </a>
              <a href="#systeme" className="transition hover:text-vellum-50">
                Systeme
              </a>
              <a href="#stimmen" className="transition hover:text-vellum-50">
                Stimmen
              </a>
              <a href="#faq" className="transition hover:text-vellum-50">
                FAQ
              </a>
              <a
                href={legal.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90',
                  'transition hover:border-sunbronze/40 hover:shadow-glow-bronze',
                )}
              >
                Discord <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </nav>

            <a
              href={legal.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90',
                'transition hover:border-sunbronze/40 hover:shadow-glow-bronze md:hidden',
              )}
            >
              Discord <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
            </a>
          </div>

          <div className="h-px w-full bg-white/5 opacity-100" />
        </div>
      </header>

      <main id="content" className="relative z-10">
        {children}
      </main>

      <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-16">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-vellum-200/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p>© {year} Erbe von Arda. Alle Banner, alle Eide.</p>
              <p className="text-vellum-200/50">Mount & Blade II: Bannerlord Roleplay • Fanprojekt</p>
            </div>

            <nav aria-label="Rechtliches" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/impressum"
                className="text-vellum-200/70 underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                data-testid="footer-datenschutz"
                className="text-vellum-200/70 underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
              >
                Datenschutz
              </Link>
              <Link
                href="/barrierefreiheit"
                className="text-vellum-200/70 underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
              >
                Barrierefreiheit
              </Link>
              <button
                type="button"
                aria-haspopup="dialog"
                data-eva-privacy-open=""
                className="inline-flex items-center text-xs text-vellum-200/70 underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
              >
                Datenschutz-Einstellungen
              </button>
              <a
                href={legal.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vellum-200/70 underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
              >
                Discord
              </a>
            </nav>
          </div>

          <p className="text-[11px] leading-relaxed text-vellum-200/45">
            Hinweis: Inoffizielles Fanprojekt. Alle genannten Marken und Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.
          </p>
        </div>
      </footer>
    </div>
  )
}
