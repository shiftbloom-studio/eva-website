import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '#lib/cn'

export interface MarketingLayoutProps {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  const year = new Date().getFullYear()

  return (
    <div className="relative min-h-[100svh]">
      <a
        href="#content"
        className={cn(
          'sr-only focus:not-sr-only',
          'fixed left-4 top-4 z-[100] rounded-full border border-white/10 bg-void-950/80 px-4 py-2 text-xs text-vellum-50 backdrop-blur',
        )}
      >
        Zum Inhalt springen
      </a>

      <header className="sticky top-0 z-50">
        <div className="bg-void-950/35 backdrop-blur-xl supports-[backdrop-filter]:bg-void-950/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link href="/" className="group inline-flex items-baseline gap-3">
              <span className="font-display text-base tracking-[-0.02em] text-vellum-50 sm:text-lg">
                Erbe von Arda
              </span>
              <span className="hidden text-xs uppercase tracking-[0.18em] text-vellum-200/60 sm:inline">
                Bannerlord RP
              </span>
            </Link>

            <nav className="hidden items-center gap-7 text-sm text-vellum-200/75 md:flex">
              <a href="#lore" className="transition hover:text-vellum-50">
                Lore
              </a>
              <a href="#status" className="transition hover:text-vellum-50">
                Status
              </a>
              <a href="#bento" className="transition hover:text-vellum-50">
                Einstieg
              </a>
              <a
                href="https://discord.gg/erbevonarda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90 transition hover:border-sunbronze/40 hover:shadow-glow-bronze"
              >
                Discord <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </nav>

            <a
              href="https://discord.gg/erbevonarda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90 transition hover:border-sunbronze/40 hover:shadow-glow-bronze md:hidden"
            >
              Discord <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
            </a>
          </div>
          <div className="h-px w-full bg-white/5" />
        </div>
      </header>

      <main id="content" className="relative">
        {children}
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-12 pt-16">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-vellum-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Erbe von Arda. Alle Banner, alle Eide.</p>
          <p className="text-vellum-200/50">Mount & Blade II: Bannerlord Roleplay • Fanprojekt</p>
        </div>
      </footer>
    </div>
  )
}
