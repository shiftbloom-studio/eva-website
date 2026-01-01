'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

import { cn } from '#lib/cn'

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
  span: motion.span,
} as const

export type DisplayTextTrigger = 'inView' | 'mount'
export type DisplayTextSplit = 'words' | 'chars' | 'lines'
export type DisplayTextEffect = 'rise' | 'rise-blur'

type DisplayTextHtmlProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  /**
   * `motion.*` components use these prop names for gesture/animation callbacks,
   * which conflict with React's native DOM event handler typings.
   */
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
>

export interface DisplayTextProps extends DisplayTextHtmlProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  className?: string
  wordClassName?: string
  stagger?: number
  delay?: number
  duration?: number
  trigger?: DisplayTextTrigger
  split?: DisplayTextSplit
  effect?: DisplayTextEffect
  tilt?: number
  once?: boolean
}

export function DisplayText({
  text,
  as = 'h1',
  className,
  wordClassName,
  stagger,
  delay,
  duration = 0.9,
  trigger = 'inView',
  split = 'words',
  effect = 'rise',
  tilt = 0,
  once = true,
  ...props
}: DisplayTextProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motionTags[as]

  const lines = text.split('\n')

  // NOTE: Avoid manual memoization here; the React Compiler can optimize this component itself.
  // We split out gradient-related Tailwind tokens so each animated segment inherits the gradient.
  let containerClassName = className
  let segmentGradientClassName: string | undefined
  const rawClassName = className?.trim()
  if (rawClassName) {
    const tokens = rawClassName.split(/\s+/).filter(Boolean)
    const bases = tokens.map((t) => t.split(':').at(-1) ?? t)
    const hasGradientText = bases.includes('bg-clip-text') && bases.includes('text-transparent')

    if (hasGradientText) {
      const gradientTokens = tokens.filter((t) => {
        const base = t.split(':').at(-1) ?? t
        return (
          base === 'bg-clip-text' ||
          base === 'text-transparent' ||
          base.startsWith('bg-gradient-') ||
          base.startsWith('from-') ||
          base.startsWith('via-') ||
          base.startsWith('to-')
        )
      })

      containerClassName = tokens.filter((t) => !gradientTokens.includes(t)).join(' ')
      segmentGradientClassName = gradientTokens.join(' ')
    }
  }
  const resolvedStagger = stagger ?? (split === 'chars' ? 0.018 : split === 'lines' ? 0.14 : 0.06)
  const resolvedDelay = delay ?? 0.15

  const segmentVariants = React.useMemo(() => {
    const hidden = {
      y: '110%',
      opacity: 0,
      rotate: tilt,
      ...(effect === 'rise-blur' ? { filter: 'blur(12px)' } : null),
    }

    const visible = {
      y: '0%',
      opacity: 1,
      rotate: 0,
      ...(effect === 'rise-blur' ? { filter: 'blur(0px)' } : null),
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }

    return { hidden, visible }
  }, [duration, effect, tilt])

  const containerVariants = React.useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: resolvedStagger,
          delayChildren: resolvedDelay,
        },
      },
    }),
    [resolvedDelay, resolvedStagger],
  )

  if (reduceMotion) {
    const Tag = as as keyof typeof motionTags
    return (
      <Tag className={className} {...props}>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={containerClassName}
      initial="hidden"
      animate={trigger === 'mount' ? 'visible' : undefined}
      whileInView={trigger === 'inView' ? 'visible' : undefined}
      viewport={trigger === 'inView' ? { once, amount: 0.7 } : undefined}
      variants={containerVariants}
      {...props}
    >
      {split === 'lines'
        ? lines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden">
              <motion.span
                className={cn('inline-block will-change-transform', segmentGradientClassName, wordClassName)}
                variants={segmentVariants}
              >
                {line}
              </motion.span>
            </span>
          ))
        : lines.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {split === 'chars'
                ? Array.from(line).map((char, charIdx) => (
                    <span
                      key={`${lineIdx}-${charIdx}-${char}`}
                      className="inline-block overflow-hidden align-baseline"
                    >
                      <motion.span
                        className={cn('inline-block will-change-transform', segmentGradientClassName, wordClassName)}
                        variants={segmentVariants}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    </span>
                  ))
                : line.split(' ').map((word, wordIdx) => (
                    <span
                      key={`${lineIdx}-${wordIdx}-${word}`}
                      className="inline-block overflow-hidden align-baseline"
                    >
                      <motion.span
                        className={cn('inline-block will-change-transform', segmentGradientClassName, wordClassName)}
                        variants={segmentVariants}
                      >
                        {word}
                      </motion.span>
                      <span className="inline-block w-[0.22em]" aria-hidden="true" />
                    </span>
                  ))}
            </span>
          ))}
    </MotionTag>
  )
}
