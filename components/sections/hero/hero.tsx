'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

import { DisplayText } from '#components/ui/display-text'
import { MagneticButton } from '#components/ui/magnetic-button'

import { HeroBackdrop } from './hero-backdrop'

export interface HeroSectionProps {
  discordUrl?: string
}

export function HeroSection({ discordUrl = 'https://discord.gg/6B3WHTJaRA' }: HeroSectionProps) {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="max-w-3xl">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-sunbronze/30 bg-sunbronze/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-sunbronze backdrop-blur-md"
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
              className="relative z-10 mt-8 font-display text-display-sm text-transparent bg-clip-text bg-gradient-to-b from-vellum-50 via-vellum-100 to-vellum-400 sm:text-display-md lg:text-display-lg"
            />
             {/* Subtle glow behind text */}
             <div className="absolute -inset-x-10 -top-10 -bottom-10 z-0 bg-sunbronze/10 blur-[90px] rounded-full opacity-60 pointer-events-none" />
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

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <MagneticButton
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-sunbronze/30 bg-sunbronze/10 hover:bg-sunbronze/20 text-sunbronze hover:border-sunbronze/50"
            >
              <span className="text-[0.95rem] tracking-widest uppercase text-xs font-bold">In die Welt eintreten</span>
              <ArrowRight className="h-4 w-4 opacity-80" strokeWidth={1.5} />
            </MagneticButton>

            <a
              href="#bento"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-medium text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto"
            >
              Lore entdecken
            </a>
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
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
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
          className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-vellum-200/70 backdrop-blur"
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

