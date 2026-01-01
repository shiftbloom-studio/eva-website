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

export interface DisplayTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  className?: string
  wordClassName?: string
  stagger?: number
  delay?: number
  once?: boolean
}

export function DisplayText({
  text,
  as = 'h1',
  className,
  wordClassName,
  stagger = 0.06,
  delay = 0.15,
  once = true,
}: DisplayTextProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motionTags[as]

  const lines = React.useMemo(() => text.split('\n'), [text])

  if (reduceMotion) {
    const Tag = as as keyof React.JSX.IntrinsicElements
    return (
      <Tag className={className}>
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
      whileInView="visible"
      viewport={{ once, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(' ').map((word, wordIdx) => (
            <span
              key={`${lineIdx}-${wordIdx}-${word}`}
              className="inline-block overflow-hidden align-baseline"
            >
              <motion.span
                className={cn('inline-block', wordClassName)}
                variants={{
                  hidden: { y: '110%', rotate: 1.5, opacity: 0 },
                  visible: {
                    y: '0%',
                    rotate: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  },
                }}
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

