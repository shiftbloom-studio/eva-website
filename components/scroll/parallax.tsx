'use client'

import { useReducedMotion } from 'framer-motion'
import * as React from 'react'

import { cn } from '#lib/cn'

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * How much the layer moves per scroll pixel. Positive values drift down as you scroll down.
   * Keep tiny: ~0.01–0.05.
   */
  factor?: number
  /**
   * Clamp in px to avoid excessive drift on very long pages.
   */
  max?: number
  /**
   * Optional horizontal drift (uses the same scroll var).
   */
  xFactor?: number
  xMax?: number
}

export function Parallax({
  factor = 0.03,
  max = 70,
  xFactor = 0,
  xMax = 48,
  className,
  style,
  children,
  ...props
}: ParallaxProps) {
  const reduceMotion = useReducedMotion() ?? false

  const yExpr = `clamp(${-max}px, calc(var(--eva-scroll-y) * ${factor}), ${max}px)`
  const xExpr = xFactor
    ? `clamp(${-xMax}px, calc(var(--eva-scroll-y) * ${xFactor}), ${xMax}px)`
    : '0px'

  return (
    <div
      className={cn('will-change-transform', className)}
      style={{
        ...(reduceMotion
          ? null
          : {
              transform: `translate3d(${xExpr}, ${yExpr}, 0)`,
            }),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

