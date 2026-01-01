import { AlertTriangle, BookOpen, Info } from 'lucide-react'
import * as React from 'react'

import { cn } from '#lib/cn'

export interface CalloutProps {
  type?: string
  title?: string
  children?: React.ReactNode
}

const CALLOUT_STYLES: Record<
  string,
  {
    label: string
    icon: typeof Info
    container: string
    iconWrap: string
    iconColor: string
  }
> = {
  info: {
    label: 'Info',
    icon: Info,
    container: 'border-sunbronze/25 bg-sunbronze/10',
    iconWrap: 'border-sunbronze/25 bg-white/[0.03]',
    iconColor: 'text-sunbronze',
  },
  warning: {
    label: 'Warnung',
    icon: AlertTriangle,
    container: 'border-bloodstone/30 bg-bloodstone/12',
    iconWrap: 'border-bloodstone/25 bg-white/[0.03]',
    iconColor: 'text-bloodstone',
  },
  lore: {
    label: 'Lore',
    icon: BookOpen,
    container: 'border-moss-300/20 bg-moss-900/20',
    iconWrap: 'border-moss-300/20 bg-white/[0.03]',
    iconColor: 'text-moss-200',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.info
  const Icon = style.icon

  return (
    <section
      className={cn(
        'my-6 rounded-4xl border p-5 backdrop-blur-md sm:p-6',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_60px_rgba(0,0,0,0.35)]',
        style.container,
      )}
      data-eva-callout={type}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border',
            style.iconWrap,
          )}
        >
          <Icon className={cn('h-5 w-5', style.iconColor)} strokeWidth={1.25} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-vellum-200/70">
            {title || style.label}
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-vellum-200/80">{children}</div>
        </div>
      </div>
    </section>
  )
}
