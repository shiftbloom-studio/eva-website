'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import * as React from 'react'

import { cn } from '#lib/cn'
import { FloatingParticles } from '#components/ui/floating-particles'
import { NoiseOverlay } from '#components/ui/noise-overlay'
import { marketingImages } from '#lib/marketing-images'

export interface HeroBackdropProps {
  className?: string
}

export function HeroBackdrop({ className }: HeroBackdropProps) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Parallax effect for the background image
  const y = useTransform(scrollY, [0, 1000], [0, 400])
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3])

  return (
    <div className={cn('absolute inset-0 z-0 overflow-hidden bg-void-950', className)}>
      {/* Base Atmospheric Gradient - Lighter/Blueish for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#2d2e3a_0%,#07060a_100%)]" />

      {/* Parallax Image Layer */}
      <motion.div 
        className="absolute inset-0 h-[120%]"
        style={reduceMotion ? undefined : { y, opacity }}
      >
        <Image
          src={marketingImages.heroWide}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 2560px"
          priority
          quality={92}
          className="object-cover object-top opacity-85 grayscale-[8%] sepia-[12%]"
        />
        {/* Vignette - Much lighter to let image show */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/10 via-void-950/20 to-void-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-950/50 via-transparent to-void-950/50" />
      </motion.div>

      {/* Animated Orbs/Glows */}
      {reduceMotion ? (
        <>
          <div className="absolute -left-[10%] -top-[10%] h-[50rem] w-[50rem] rounded-full bg-sunbronze/10 blur-[120px]" />
          <div className="absolute -right-[10%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-bloodstone/10 blur-[120px]" />
        </>
      ) : (
        <>
          <motion.div
            className="absolute -left-[10%] -top-[10%] h-[50rem] w-[50rem] rounded-full bg-sunbronze/10 blur-[120px] mix-blend-screen"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const }}
          />
          <motion.div
            className="absolute -right-[10%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-bloodstone/10 blur-[120px] mix-blend-screen"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const, delay: 2 }}
          />
        </>
      )}

      {/* Particles */}
      <FloatingParticles count={16} color="bg-sunbronze" />
      <FloatingParticles count={10} color="bg-white" className="opacity-50" />

      {/* Texture */}
      <NoiseOverlay opacity={0.06} />
    </div>
  )
}

