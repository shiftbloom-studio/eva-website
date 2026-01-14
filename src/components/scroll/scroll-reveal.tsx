'use client'

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import * as React from 'react'

import { cn } from '#lib/cn'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

type RevealPreset = 'fade' | 'rise' | 'rise-blur'

function getViewportIntersectionRatio(el: HTMLElement): number {
  const rect = el.getBoundingClientRect()
  const vw = window.innerWidth || document.documentElement.clientWidth || 0
  const vh = window.innerHeight || document.documentElement.clientHeight || 0

  const intersectionW = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0))
  const intersectionH = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0))

  const intersectionArea = intersectionW * intersectionH
  const area = rect.width * rect.height
  if (!area) return 0
  return intersectionArea / area
}

export interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode
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
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { amount, once: false })
  // Lock the reveal state once the element has been seen to avoid replaying animations
  // when IntersectionObserver updates jitter around the threshold.
  const hasBeenInViewRef = React.useRef(false)
  const [hasBeenInView, setHasBeenInView] = React.useState(false)

  // If the rich layer swaps in late (after the user already scrolled), `useInView()`
  // won't report "true" until after mount. Prevent a one-frame flash by pre-seeding
  // the "revealed" state when we're already intersecting the viewport.
  React.useLayoutEffect(() => {
    if (reduceMotion) return
    if (!once) return
    const el = ref.current
    if (!el) return
    const isIntersecting = getViewportIntersectionRatio(el) > 0
    hasBeenInViewRef.current = isIntersecting
    setHasBeenInView(isIntersecting)
  }, [once, reduceMotion])

  React.useEffect(() => {
    if (!once) return
    if (!isInView || hasBeenInViewRef.current) return
    hasBeenInViewRef.current = true
    setHasBeenInView(true)
  }, [isInView, once])

  if (reduceMotion) {
    return (
      <div className={className} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>
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

  const shouldReveal = once ? hasBeenInView || isInView : isInView

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      data-eva-reveal=""
      initial={false}
      animate={shouldReveal ? 'visible' : 'hidden'}
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

export interface RevealGroupProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode
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
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { amount, once: false })
  const hasBeenInViewRef = React.useRef(false)
  const [hasBeenInView, setHasBeenInView] = React.useState(false)

  React.useLayoutEffect(() => {
    if (reduceMotion) return
    if (!once) return
    const el = ref.current
    if (!el) return
    const isIntersecting = getViewportIntersectionRatio(el) > 0
    hasBeenInViewRef.current = isIntersecting
    setHasBeenInView(isIntersecting)
  }, [once, reduceMotion])

  React.useEffect(() => {
    if (!once) return
    if (!isInView || hasBeenInViewRef.current) return
    hasBeenInViewRef.current = true
    setHasBeenInView(true)
  }, [isInView, once])

  if (reduceMotion) {
    return (
      <div className={className} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    )
  }

  const shouldReveal = once ? hasBeenInView || isInView : isInView

  return (
    <motion.div
      ref={ref}
      className={className}
      data-eva-reveal-group=""
      initial={false}
      animate={shouldReveal ? 'visible' : 'hidden'}
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

export interface RevealGroupItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode
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
      <div className={className} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>
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
