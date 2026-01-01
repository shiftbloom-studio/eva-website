'use client'

import { motion } from 'framer-motion'
import * as React from 'react'

import { Reveal, RevealGroup } from '#components/scroll'
import { Section, SectionHeader } from '#components/ui/section'
import { cn } from '#lib/cn'
import { testimonials } from '#data/testimonials-arda'

export function TestimonialsSection() {
  const cardVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
      },
    }),
    [],
  )

  return (
    <Section id="stimmen" className="pb-28 pt-6">
      <Reveal preset="rise-blur" amount={0.55}>
        <SectionHeader
          eyebrow="Stimmen"
          title="Auszüge aus Leben, Blut und Bannern."
          subtitle="Keine Rezensionen. Keine Sterne. Nur Fragmente aus Tagebüchern, Briefen und Lagerfeuern – erzählt von denen, die Arda bereits geprägt hat."
        />
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6" amount={0.25} stagger={0.08}>
        {testimonials.map((t) => (
          <motion.article
            key={t.id}
            className={cn(
              'relative overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md',
              'transition hover:border-white/15 hover:bg-void-900/45',
            )}
            variants={cardVariants}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">{t.from}</p>

            <h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-vellum-50">{t.name}</h3>
            <p className="mt-1 text-xs text-vellum-200/60">{t.role}</p>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-vellum-200/85 font-serif">
              {t.story.map((p, idx) => (
                <p key={`${t.id}-${idx}`}>{p}</p>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">Unterzeichnet</p>
              <p className="mt-2 font-display text-sm tracking-[-0.01em] text-vellum-50">{t.name}</p>
              <p className="mt-1 text-xs text-vellum-200/60">{t.role}</p>
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  )
}
