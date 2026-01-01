'use client'

import { motion } from 'framer-motion'
import { BookOpen, Crown, Gem, MapPin, ScrollText, Users } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { RevealGroup } from '#components/scroll'
import { cn } from '#lib/cn'

export interface CategoryCardData {
  id: string
  label: string
  description: string
  count: number
}

const icons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  characters: Users,
  locations: MapPin,
  factions: Crown,
  items: Gem,
  events: ScrollText,
  lore: BookOpen,
  timeline: ScrollText,
  misc: ScrollText,
}

export function CategoryGrid(props: { items: CategoryCardData[] }) {
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
    <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6" amount={0.25} stagger={0.07}>
      {props.items.map((item) => {
        const Icon = icons[item.id] ?? ScrollText
        const wide = item.id === 'locations' || item.id === 'characters'

        return (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className={cn(wide ? 'md:col-span-7' : 'md:col-span-5')}
          >
            <Link
              href={`/enzyklopaedie/kategorie/${item.id}`}
              className={cn(
                'group relative isolate block h-full overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md',
                'transition hover:border-sunbronze/30 hover:bg-void-900/45',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
              )}
            >
              <div className="absolute inset-0 z-0 bg-[radial-gradient(85%_140%_at_10%_0%,rgba(186,138,45,0.10),transparent_55%),radial-gradient(95%_120%_at_90%_30%,rgba(153,67,36,0.10),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{item.count} Einträge</p>
                  <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">{item.label}</h3>
                </div>

                <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sunbronze">
                  <Icon className="h-5 w-5" strokeWidth={1.25} />
                </div>
              </div>

              <p className="relative z-10 mt-4 text-sm leading-relaxed text-vellum-200/80">{item.description}</p>

              <div className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-medium text-sunbronze">
                Öffnen <span aria-hidden="true">→</span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </RevealGroup>
  )
}
