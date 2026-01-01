'use client'

import * as React from 'react'

import { cn } from '#lib/cn'

export interface PrivacySettingsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  className?: string
}

export function PrivacySettingsTrigger({ className, onClick, ...props }: PrivacySettingsTriggerProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={cn(
        'inline-flex items-center text-xs text-vellum-200/70 underline underline-offset-4 decoration-white/20',
        'transition hover:text-vellum-50 hover:decoration-white/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
        className,
      )}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        window.dispatchEvent(new Event('eva:privacy-open'))
      }}
      {...props}
    >
      Datenschutz-Einstellungen
    </button>
  )
}

