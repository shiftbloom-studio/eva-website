'use client'

import { motion, type HTMLMotionProps, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import * as React from 'react'

import { useAudio } from '#lib/audio'
import { cn } from '#lib/cn'

export interface MagneticButtonProps
  extends Omit<HTMLMotionProps<'a'>, 'children'> {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({
  children,
  strength = 0.25,
  className,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  onClick,
  ...props
}: MagneticButtonProps) {
  const audio = useAudio()
  const ref = React.useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 400, damping: 28, mass: 0.6 })
  const ySpring = useSpring(y, { stiffness: 400, damping: 28, mass: 0.6 })

  const reset = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    onMouseMove?.(e)
    if (reduceMotion) return

    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2

    x.set(dx * strength)
    y.set(dy * strength)
  }

  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    onMouseLeave?.(e)
    reset()
  }

  function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    onMouseEnter?.(e)
    audio.playSfx('sfx_link_hint')
    reset()
  }

  function handleFocus(e: React.FocusEvent<HTMLAnchorElement>) {
    onFocus?.(e)
    audio.playSfx('sfx_link_hint')
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    audio.playSfx('sfx_click_confirm')
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      onFocus={handleFocus}
      onClick={handleClick}
      style={reduceMotion ? undefined : { x: xSpring, y: ySpring }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-vellum-50 transition will-change-transform sm:px-6 sm:py-3 sm:backdrop-blur',
        'hover:border-sunbronze/40 hover:shadow-glow-bronze',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(120%_140%_at_50%_0%,rgba(186,138,45,0.22),transparent_55%)] opacity-0 transition group-hover:opacity-100" />
      {children}
    </motion.a>
  )
}
