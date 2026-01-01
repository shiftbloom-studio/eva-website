'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { Reveal } from '#components/scroll'
import { Section, SectionHeader } from '#components/ui/section'
import { cn } from '#lib/cn'
import faq from '#data/faq'

export function FaqSection() {
  const [open, setOpen] = React.useState<string | null>(faq.items[0]?.question ?? null)

  return (
    <Section id="faq" className="pb-28 pt-6">
      <Reveal preset="rise-blur" amount={0.55}>
        <SectionHeader eyebrow="FAQ" title={faq.title} subtitle="Kurz, klar – und wenn du mehr willst: Discord." />
      </Reveal>

      <Reveal
        preset="rise-blur"
        amount={0.25}
        className="mt-10 divide-y divide-white/10 overflow-hidden rounded-4xl border border-white/10 bg-void-900/30 backdrop-blur-md"
      >
        {faq.items.map((item) => {
          const isOpen = open === item.question
          return (
            <div key={item.question} className="group">
              <button
                type="button"
                onClick={() => setOpen((prev) => (prev === item.question ? null : item.question))}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-6 py-5 text-left',
                  'transition hover:bg-white/[0.03]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                <span className="font-display text-base tracking-[-0.01em] text-vellum-50">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-none text-vellum-200/60 transition',
                    isOpen ? 'rotate-180 text-sunbronze' : '',
                  )}
                  strokeWidth={1.25}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm leading-relaxed text-vellum-200/80">
                      {item.answer}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </Reveal>
    </Section>
  )
}
