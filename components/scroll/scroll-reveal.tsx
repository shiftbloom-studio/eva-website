'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

import { cn } from '#lib/cn'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

type RevealPreset = 'fade' | 'rise' | 'rise-blur'

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: RevealPreset
  once?: boolean
  amount?: number
  delay?: number
  duration?: number
  y?: number
}

export function Reveal({
  preset = 'rise-blur',
  once = true,
  amount = 0.35,
  delay = 0,
  duration = 0.85,
  y = 18,
  className,
  children,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion() ?? false

  if (reduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const hidden =
    preset === 'fade'
      ? { opacity: 0 }
      : preset === 'rise'
        ? { opacity: 0, y }
        : { opacity: 0, y, filter: 'blur(10px)' }

  const visible =
    preset === 'fade'
      ? { opacity: 1 }
      : preset === 'rise'
        ? { opacity: 1, y: 0 }
        : { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      data-eva-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: { duration, delay, ease: EASE_OUT },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface RevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  once?: boolean
  amount?: number
  stagger?: number
  delayChildren?: number
}

export function RevealGroup({
  once = true,
  amount = 0.25,
  stagger = 0.08,
  delayChildren = 0.08,
  className,
  children,
  ...props
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion() ?? false

  if (reduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      data-eva-reveal-group=""
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface RevealGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: RevealPreset
  duration?: number
  y?: number
}

export function RevealGroupItem({
  preset = 'rise-blur',
  duration = 0.8,
  y = 18,
  className,
  children,
  ...props
}: RevealGroupItemProps) {
  const reduceMotion = useReducedMotion() ?? false

  if (reduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const hidden =
    preset === 'fade'
      ? { opacity: 0 }
      : preset === 'rise'
        ? { opacity: 0, y }
        : { opacity: 0, y, filter: 'blur(10px)' }

  const visible =
    preset === 'fade'
      ? { opacity: 1 }
      : preset === 'rise'
        ? { opacity: 1, y: 0 }
        : { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      data-eva-reveal-item=""
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: { duration, ease: EASE_OUT },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

