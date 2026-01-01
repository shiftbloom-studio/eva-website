'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

import { cn } from '#lib/cn'

export interface FloatingParticlesProps {
  count?: number
  className?: string
  color?: string
}

export function FloatingParticles({
  count = 15,
  className,
  color = 'bg-sunbronze',
}: FloatingParticlesProps) {
  const reduceMotion = useReducedMotion()
  const [particles, setParticles] = React.useState<Array<{ id: number; x: number; size: number; duration: number; delay: number }>>([])

  React.useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start position %
      size: Math.random() * 2 + 1, // random size 1-3px
      duration: Math.random() * 20 + 10, // 10-30s float duration
      delay: Math.random() * -30, // negative delay to start mid-animation
    }))
    setParticles(newParticles)
  }, [count])

  if (reduceMotion) return null

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn('absolute rounded-full opacity-20', color)}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -1000], // move way up
            x: [0, Math.sin(p.id) * 50], // gentle wave
            opacity: [0, 0.5, 0], // fade in/out
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
