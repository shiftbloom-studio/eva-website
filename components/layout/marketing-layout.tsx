import type { ReactNode } from 'react'
import Link from 'next/link'

import { PrivacySettingsTrigger } from '#components/privacy'
import { legal } from '#data/legal'
import { cn } from '#lib/cn'

import { MarketingBackdrop } from './marketing-backdrop'
import { MarketingHeader } from './marketing-header'

export interface MarketingLayoutProps {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  const year = new Date().getFullYear()

  return (
    <div className="relative isolate min-h-[100svh]">
      <MarketingBackdrop />

      <a
        href="#content"
        className={cn(
          'sr-only focus:not-sr-only',
          'fixed left-4 top-4 z-[100] rounded-full border border-white/10 bg-void-950/80 px-4 py-2 text-xs text-vellum-50 backdrop-blur',
        )}
      >
        Zum Inhalt springen
      </a>

      <MarketingHeader />

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
              <PrivacySettingsTrigger />
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
