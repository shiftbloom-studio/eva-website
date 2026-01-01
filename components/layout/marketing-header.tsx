'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '#lib/cn'
import { useAudio } from '#lib/audio'

export function MarketingHeader() {
  const audio = useAudio()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled((window.scrollY || 0) > 10)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'backdrop-blur-xl supports-[backdrop-filter]:bg-void-950/10',
          scrolled
            ? 'bg-void-950/55 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
            : 'bg-gradient-to-b from-void-950/15 via-void-950/5 to-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="group inline-flex items-baseline gap-3">
            <span className="font-display text-base tracking-[-0.02em] text-vellum-50 sm:text-lg">
              Erbe von Arda
            </span>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-vellum-200/60 sm:inline">
              Bannerlord RP
            </span>
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 text-sm text-vellum-200/75 md:flex">
            <a href="#lore" onClick={() => audio.playSfx('sfx_scroll_whoosh')} className="transition hover:text-vellum-50">
              Lore
            </a>
            <a href="#status" onClick={() => audio.playSfx('sfx_scroll_whoosh')} className="transition hover:text-vellum-50">
              Status
            </a>
            <a href="#bento" onClick={() => audio.playSfx('sfx_scroll_whoosh')} className="transition hover:text-vellum-50">
              Einstieg
            </a>
            <a href="#systeme" onClick={() => audio.playSfx('sfx_scroll_whoosh')} className="transition hover:text-vellum-50">
              Systeme
            </a>
            <a href="#stimmen" onClick={() => audio.playSfx('sfx_scroll_whoosh')} className="transition hover:text-vellum-50">
              Stimmen
            </a>
            <a href="#faq" onClick={() => audio.playSfx('sfx_scroll_whoosh')} className="transition hover:text-vellum-50">
              FAQ
            </a>
            <a
              href="https://discord.gg/6B3WHTJaRA"
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
            href="https://discord.gg/6B3WHTJaRA"
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

        <div className={cn('h-px w-full bg-white/5 transition-opacity', scrolled ? 'opacity-100' : 'opacity-0')} />
      </div>
    </header>
  )
}
