'use client'

import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { DisplayText } from '#components/ui/display-text'
import { MagneticButton } from '#components/ui/magnetic-button'
import { useAudio } from '#lib/audio'

import { HeroBackdrop } from './hero-backdrop'

export interface HeroSectionProps {
  discordUrl?: string
}

// Quick tweak point for the main headline animation.
// Try: 'chars_blur' | 'words' | 'lines_blur'
const HEADLINE_PRESET = 'lines_blur' as const

const HEADLINE_PRESETS = {
  chars_blur: {
    trigger: 'mount',
    split: 'chars',
    effect: 'rise-blur',
    stagger: 0.018,
    delay: 0.08,
    duration: 1.05,
    tilt: 0,
  },
  words: {
    trigger: 'mount',
    split: 'words',
    effect: 'rise',
    stagger: 0.06,
    delay: 0.1,
    duration: 0.95,
    tilt: 0,
  },
  lines_blur: {
    trigger: 'mount',
    split: 'lines',
    effect: 'rise-blur',
    stagger: 0.18,
    delay: 0.06,
    duration: 1.1,
    tilt: 0,
  },
} as const

export function HeroSection({ discordUrl = 'https://discord.gg/6B3WHTJaRA' }: HeroSectionProps) {
  const audio = useAudio()
  const headlineMotion = HEADLINE_PRESETS[HEADLINE_PRESET]

  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden">
      <HeroBackdrop />
      {/* Readability overlay: darkens bottom-left, fades to fully transparent top-right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-void-950/55 via-void-950/18 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="max-w-3xl">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-sunbronze/30 bg-sunbronze/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-sunbronze sm:backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
            Die Welt ist im Wandel
          </motion.div>

          <div className="relative">
            <DisplayText
              as="h1"
              text={'Schatten\nüber Arda'}
              {...headlineMotion}
              className="relative z-10 mt-8 font-display text-display-md text-transparent bg-clip-text bg-gradient-to-b from-vellum-50 via-vellum-100 to-vellum-400 lg:text-display-lg"
            />
             {/* Subtle glow behind text */}
             <div className="pointer-events-none absolute -inset-x-8 -top-8 -bottom-8 z-0 rounded-full bg-sunbronze/10 blur-[60px] opacity-45 sm:-inset-x-10 sm:-top-10 sm:-bottom-10 sm:blur-[90px] sm:opacity-60" />
          </div>

          <motion.p
            className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-vellum-200/90 font-serif tracking-wide sm:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Wo alte Banner im Wind zerfallen, wachsen neue Legenden. Schmiede dein Schicksal in den Feuern des
            Krieges oder im Flüstern der Höfe.
            <span className="text-sunbronze/90"> Dein Wort ist das einzige Gesetz, das zählt.</span>
          </motion.p>

          <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center">
            <MagneticButton
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Noch nicht veröffentlicht – geplant für Q3 2026"
              className="w-full justify-between border-sunbronze/30 bg-sunbronze/10 text-sunbronze hover:border-sunbronze/50 hover:bg-sunbronze/20 sm:w-auto sm:justify-center"
            >
              <span className="flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] max-[360px]:normal-case max-[360px]:text-[0.85rem] max-[360px]:tracking-[0.06em] sm:hidden">
                  Q3 2026 <span className="opacity-70">– Release geplant</span>
                </span>
                <span className="hidden flex-col items-start leading-tight sm:flex">
                  <span className="text-xs font-bold uppercase tracking-[0.22em]">Q3 2026</span>
                  <span className="mt-0.5 text-[0.7rem] uppercase tracking-[0.22em] opacity-75">Release geplant</span>
                </span>
              </span>
              <Clock className="h-4 w-4 opacity-80" strokeWidth={1.5} />
            </MagneticButton>

            <a
              href="#bento"
              onClick={() => audio.playSfx('sfx_scroll_whoosh')}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto sm:px-6 sm:py-3"
            >
              Lore entdecken
            </a>

            <Link
              href="/enzyklopaedie"
              onClick={() => audio.playSfx('sfx_link_hint')}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-vellum-50/90 transition hover:border-sunbronze/30 hover:bg-white/[0.05] hover:shadow-glow-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto sm:px-6 sm:py-3"
            >
              Enzyklopädie öffnen <span aria-hidden="true">→</span>
            </Link>
          </div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 text-xs text-vellum-200/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              RP-first
            </span>
            <span data-testid="feature-whitelist" className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              Whitelist
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              Events & Intrigen
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              Atmosphärisch • Premium
            </span>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center" aria-hidden="true">
        <motion.div
          className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-vellum-200/70 sm:backdrop-blur"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Scroll
        </motion.div>
      </div>
    </section>
  )
}
