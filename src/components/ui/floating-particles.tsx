'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

import { cn } from '#lib/cn'

export interface FloatingParticlesProps {
  count?: number
  className?: string
  color?: string
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
  minDelay?: number
  maxDelay?: number
  yDistance?: number
  xWiggle?: number
  peakOpacity?: number
  blur?: number
  glowColor?: string
  glowRadiusMultiplier?: number
}

export function FloatingParticles({
  count = 15,
  className,
  color = 'bg-sunbronze',
  minSize = 1,
  maxSize = 3,
  minDuration = 10,
  maxDuration = 30,
  minDelay = -30,
  maxDelay = 0,
  yDistance = 1000,
  xWiggle = 50,
  peakOpacity = 0.5,
  blur = 0,
  glowColor,
  glowRadiusMultiplier = 6,
}: FloatingParticlesProps) {
  const reduceMotion = useReducedMotion()
  const [particles, setParticles] = React.useState<
    Array<{ id: number; x: number; size: number; duration: number; delay: number; drift: number }>
  >([])

  React.useEffect(() => {
    const safeMinSize = Math.max(0.5, Math.min(minSize, maxSize))
    const safeMaxSize = Math.max(safeMinSize, maxSize)
    const safeMinDuration = Math.max(1, Math.min(minDuration, maxDuration))
    const safeMaxDuration = Math.max(safeMinDuration, maxDuration)
    const safeMinDelay = Math.min(minDelay, maxDelay)
    const safeMaxDelay = Math.max(minDelay, maxDelay)

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start position %
      size: Math.random() * (safeMaxSize - safeMinSize) + safeMinSize,
      duration: Math.random() * (safeMaxDuration - safeMinDuration) + safeMinDuration,
      delay: Math.random() * (safeMaxDelay - safeMinDelay) + safeMinDelay, // usually negative to start mid-animation
      drift: (Math.random() * 2 - 1) * xWiggle,
    }))
    setParticles(newParticles)
  }, [count, minSize, maxSize, minDuration, maxDuration, minDelay, maxDelay, xWiggle])

  if (reduceMotion) return null

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn('absolute rounded-full will-change-transform', color)}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            bottom: '-10%',
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
            boxShadow: glowColor ? `0 0 ${Math.max(4, p.size * glowRadiusMultiplier)}px ${glowColor}` : undefined,
          }}
          animate={{
            y: [0, -yDistance], // move way up
            x: [0, p.drift], // gentle drift
            opacity: [0, peakOpacity, 0], // fade in/out
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: [0, 0, 1, 1] as const,
          }}
        />
      ))}
    </div>
  )
}
