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

export interface DisplayTextProps extends React.HTMLAttributes<HTMLElement> {
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

  const lines = React.useMemo(() => text.split('\n'), [text])
  const resolvedStagger = stagger ?? (split === 'chars' ? 0.018 : split === 'lines' ? 0.14 : 0.06)
  const resolvedDelay = delay ?? 0.15

  const segmentVariants = React.useMemo(() => {
    const hidden: Record<string, unknown> = {
      y: '110%',
      opacity: 0,
      rotate: tilt,
    }

    const visible: Record<string, unknown> = {
      y: '0%',
      opacity: 1,
      rotate: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }

    if (effect === 'rise-blur') {
      hidden.filter = 'blur(12px)'
      visible.filter = 'blur(0px)'
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
    const Tag = as as keyof React.JSX.IntrinsicElements
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
      className={className}
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
              <motion.span className={cn('inline-block will-change-transform', wordClassName)} variants={segmentVariants}>
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
                      <motion.span className={cn('inline-block will-change-transform', wordClassName)} variants={segmentVariants}>
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    </span>
                  ))
                : line.split(' ').map((word, wordIdx) => (
                    <span
                      key={`${lineIdx}-${wordIdx}-${word}`}
                      className="inline-block overflow-hidden align-baseline"
                    >
                      <motion.span className={cn('inline-block will-change-transform', wordClassName)} variants={segmentVariants}>
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

