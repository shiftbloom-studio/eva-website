'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'

import { RevealGroup } from '#components/scroll'
import { cn } from '#lib/cn'

import { KnowledgeBadge } from './KnowledgeBadge'
import type { KnowledgeType } from '../_lib/content/types'

export interface ArticleCardData {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  category: string
  knowledgeType: KnowledgeType
}

export function ArticleCardGrid(props: { items: ArticleCardData[]; className?: string }) {
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
    <RevealGroup className={cn('grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6', props.className)} amount={0.2} stagger={0.06}>
      {props.items.map((a) => (
        <motion.div key={a.slug} variants={cardVariants} className="md:col-span-6">
          <Link
            href={`/enzyklopaedie/article/${a.slug}`}
            className={cn(
              'group relative isolate block h-full overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md',
              'transition hover:border-sunbronze/30 hover:bg-void-900/45',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
            )}
          >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(85%_140%_at_10%_0%,rgba(186,138,45,0.10),transparent_55%),radial-gradient(95%_120%_at_90%_30%,rgba(153,67,36,0.10),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{a.category}</p>
                <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">{a.title}</h3>
              </div>
              <KnowledgeBadge type={a.knowledgeType} />
            </div>

            <p className="relative z-10 mt-4 text-sm leading-relaxed text-vellum-200/80">{a.excerpt}</p>

            {a.tags.length ? (
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {a.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-vellum-200/75"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-medium text-sunbronze">
              Lesen <span aria-hidden="true">→</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </RevealGroup>
  )
}
