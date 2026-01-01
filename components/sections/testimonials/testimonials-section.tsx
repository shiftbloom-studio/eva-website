'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
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
          title="Echos aus der Taverne."
          subtitle="Nicht Marketing. Geschichten von Spielern, die bereits Banner, Bündnisse und Brüche erlebt haben."
        />
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6" amount={0.25} stagger={0.08}>
        {testimonials.map((t) => (
          <motion.article
            key={t.name}
            className={cn(
              'relative overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md',
              'transition hover:border-white/15 hover:bg-void-900/45',
            )}
            variants={cardVariants}
          >
            <div className="absolute right-6 top-6 text-vellum-200/20">
              <Quote className="h-6 w-6" strokeWidth={1.25} />
            </div>

            <p className="text-sm leading-relaxed text-vellum-200/85">“{t.quote}”</p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="font-display text-sm tracking-[-0.01em] text-vellum-50">{t.name}</p>
              <p className="mt-1 text-xs text-vellum-200/60">{t.title}</p>
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  )
}
