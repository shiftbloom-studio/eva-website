import { ArrowRight, Shield } from 'lucide-react'

import { Reveal, RevealGroup, RevealGroupItem } from '#components/scroll'
import { MagneticButton } from '#components/ui/magnetic-button'
import { Section } from '#components/ui/section'

export interface CtaSectionProps {
  discordUrl?: string
}

export function CtaSection({ discordUrl = 'https://discord.gg/6B3WHTJaRA' }: CtaSectionProps) {
  return (
    <Section id="cta" className="pb-28 pt-6">
      <Reveal
        preset="rise-blur"
        amount={0.25}
        className="relative overflow-hidden rounded-4xl border border-sunbronze/25 bg-gradient-to-b from-sunbronze/10 via-white/[0.02] to-transparent p-8 backdrop-blur-md sm:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(186,138,45,0.22),transparent_55%),radial-gradient(800px_circle_at_80%_30%,rgba(153,67,36,0.18),transparent_60%)]" />
        <RevealGroup className="relative" amount={0.35} stagger={0.09} delayChildren={0.05}>
          <RevealGroupItem>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-vellum-200/70">
              <Shield className="h-4 w-4 text-sunbronze" strokeWidth={1.25} />
              Whitelist & Einstieg
            </div>
          </RevealGroupItem>

          <RevealGroupItem>
            <h2 className="mt-6 max-w-2xl font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
              Nimm deinen Platz am Feuer ein.
            </h2>
          </RevealGroupItem>
          <RevealGroupItem>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-vellum-200/80 sm:text-base">
              Wenn du früh da bist, formst du Ton, Regeln und Legenden. Komm in den Discord, lies dich ein – und
              sichere dir einen Platz auf der Whitelist. Eröffnung geplant: Q3 2026.
            </p>
          </RevealGroupItem>

          <RevealGroupItem>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton href={discordUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                Discord beitreten <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </MagneticButton>
              <a
                href="#faq"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto sm:px-6 sm:py-3"
              >
                Erst die Regeln lesen
              </a>
            </div>
          </RevealGroupItem>
        </RevealGroup>
      </Reveal>
    </Section>
  )
}
