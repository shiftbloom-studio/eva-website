import * as React from 'react'

import { cn } from '#lib/cn'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div'
}

export function Section({ as = 'section', className, ...props }: SectionProps) {
  const Tag = as
  return <Tag className={cn('relative mx-auto max-w-7xl scroll-mt-28 px-6', className)} {...props} />
}

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  eyebrow?: string
}

export function SectionHeader({ title, subtitle, eyebrow, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-2xl', className)} {...props}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  )
}

