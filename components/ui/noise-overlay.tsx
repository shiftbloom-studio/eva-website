import * as React from 'react'

import { cn } from '#lib/cn'

export interface NoiseOverlayProps {
  opacity?: number
  className?: string
}

export function NoiseOverlay({ opacity = 0.08, className }: NoiseOverlayProps) {
  const id = React.useId().replace(/:/g, '')

  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay',
        className,
      )}
      style={{ opacity }}
    >
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  )
}

