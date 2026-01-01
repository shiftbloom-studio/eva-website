'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { useAudio } from '#lib/audio'
import { cn } from '#lib/cn'

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BentoGrid({ className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6', className)}
      {...props}
    />
  )
}

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description: string
  icon?: React.ReactNode
  footer?: React.ReactNode
  image?: string
  imageClassName?: string
}

export function BentoCard({
  eyebrow,
  title,
  description,
  icon,
  footer,
  image,
  imageClassName,
  className,
  onMouseMove: onMouseMoveProp,
  onMouseEnter: onMouseEnterProp,
  onFocus: onFocusProp,
  ...props
}: BentoCardProps) {
  const audio = useAudio()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Preserve consumer handler while keeping the lantern effect intact.
    onMouseMoveProp?.(e)
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    onMouseEnterProp?.(e)
    audio.playSfx('sfx_hover_card')
  }

  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    onFocusProp?.(e)
    audio.playSfx('sfx_hover_card')
  }

  return (
    <div
      className={cn(
        'group relative isolate h-full overflow-hidden rounded-4xl border border-white/10 bg-void-900/40 p-6 backdrop-blur-md',
        'transition hover:border-sunbronze/30',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      {...props}
    >
      {/* Lantern Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-4xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(186, 138, 45, 0.10),
              transparent 80%
            )
          `,
        }}
      />

      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={86}
            className={cn(
              "object-cover opacity-[0.72] transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-[0.86]",
              imageClassName,
            )}
          />
              <div className="absolute inset-0 bg-gradient-to-b from-void-950/55 via-void-950/18 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/95 via-void-950/65 to-transparent" />
        </div>
      )}

      {/* Decorative Gradient Blob */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(80%_120%_at_20%_0%,rgba(186,138,45,0.08),transparent_55%),radial-gradient(90%_140%_at_80%_20%,rgba(153,67,36,0.08),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-20 flex items-start gap-4">
        {icon ? (
          <div className="mt-1 text-vellum-50/80">{icon}</div>
        ) : null}

        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.18em] text-vellum-200/60">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="mt-1 font-display text-lg tracking-[-0.02em] text-vellum-50">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-vellum-200/80">
            {description}
          </p>
        </div>
      </div>

      {footer ? <div className="relative z-20 mt-6">{footer}</div> : null}
    </div>
  )
}
