'use client'

import { motion } from 'framer-motion'
import { Crown, ScrollText, Swords, Wheat } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import { Reveal, RevealGroup } from '#components/scroll'
import { Section, SectionHeader } from '#components/ui/section'
import { useAudio } from '#lib/audio'
import { cn } from '#lib/cn'
import { marketingImages } from '#lib/marketing-images'
import { systems } from '#data/systems'

const icons = {
  wirtschaft: Wheat,
  politik: Crown,
  krieg: Swords,
  rollenspiel: ScrollText,
} as const

const voices = {
  wirtschaft: 'voice_wirtschaft',
  politik: 'voice_politik',
  krieg: 'voice_krieg',
  rollenspiel: 'voice_rollenspiel',
} as const

const imagery = {
  wirtschaft: marketingImages.contentCaravan,
  politik: marketingImages.contentCouncil,
  krieg: marketingImages.contentBattlefield,
  rollenspiel: marketingImages.contentEmblem,
} as const

export function SystemsSection() {
  const audio = useAudio()
  const [openId, setOpenId] = React.useState<(typeof systems)[number]['id'] | null>('wirtschaft')

  const cardVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      },
    }),
    [],
  )

  return (
    <Section id="systeme" className="pb-28 pt-6">
      <Reveal preset="rise-blur" amount={0.55}>
        <SectionHeader
          eyebrow="Systeme"
          title="Gebaut für Legenden, nicht für Listen."
          subtitle="Drei Säulen treiben die Welt: Wirtschaft, Diplomatie, Krieg. Doch darunter liegt das eigentliche Fundament: Rollenspiel. Keine Questline. Kein vorgezeichnetes Ende. Du schmiedest deine Geschichte – mit anderen."
        />
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6" amount={0.25} stagger={0.07}>
        {systems.map((item) => {
          const Icon = icons[item.id]
          const isOpen = openId === item.id

          return (
            <motion.button
              key={item.id}
              type="button"
              onMouseEnter={() => audio.playSfx('sfx_hover_card')}
              onClick={() => {
                const wasOpen = openId === item.id
                const next = wasOpen ? null : item.id
                setOpenId(next)

                audio.playSfx('sfx_click_confirm')
                if (!wasOpen) {
                  // Explicitly restart on repeated opens (bypass voice throttling).
                  audio.playVoice(voices[item.id], { cooldownMs: 0 })
                }
              }}
              className={cn(
                'group relative isolate flex h-full w-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 text-left backdrop-blur-md',
                'transition hover:border-sunbronze/30 hover:bg-void-900/45',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                item.id === 'wirtschaft' ? 'md:col-span-7' : 'md:col-span-5',
              )}
              layout
              variants={cardVariants}
            >
              {/* Background image (storytelling) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={imagery[item.id]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={cn(
                    'object-cover opacity-[0.24] transition duration-700 group-hover:opacity-[0.30]',
                    item.id === 'rollenspiel' ? 'object-center' : 'object-center',
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/65 to-transparent" />
              </div>

              <div className="absolute inset-0 z-0 bg-[radial-gradient(85%_140%_at_10%_0%,rgba(186,138,45,0.10),transparent_55%),radial-gradient(95%_120%_at_90%_30%,rgba(153,67,36,0.10),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sunbronze">
                  <Icon className="h-5 w-5" strokeWidth={1.25} />
                </div>
              </div>

              <p className="relative z-10 mt-4 text-sm leading-relaxed text-vellum-200/80">
                {item.description}
              </p>

              <motion.div
                className="relative z-10 overflow-hidden"
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-vellum-200/75">
                  {item.detail}
                </div>

                {/* Extra craft/progression beat (Economy) */}
                {item.id === 'wirtschaft' ? (
                  <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
                    <div className="relative h-36 sm:h-44">
                      <Image
                        src={marketingImages.contentForge}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void-950/70 via-transparent to-transparent" />
                    </div>
                  </div>
                ) : null}
              </motion.div>

              <div className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-medium text-sunbronze">
                {isOpen ? 'Weniger' : 'Mehr'} <span aria-hidden="true">→</span>
              </div>
            </motion.button>
          )
        })}
      </RevealGroup>
    </Section>
  )
}

