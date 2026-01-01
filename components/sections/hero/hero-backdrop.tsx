'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import * as React from 'react'

import { cn } from '#lib/cn'
import { FloatingParticles } from '#components/ui/floating-particles'
import { NoiseOverlay } from '#components/ui/noise-overlay'
import { marketingImages } from '#lib/marketing-images'

const ASHES_PRESET = 'strong' as const

const ASHES_PRESETS = {
  subtle: {
    embers: {
      count: 18,
      color: 'bg-sunbronze',
      minSize: 1,
      maxSize: 3.5,
      peakOpacity: 0.55,
      blur: 0.25,
      glowColor: 'rgba(186, 138, 45, 0.45)',
      glowRadiusMultiplier: 7,
      minDuration: 12,
      maxDuration: 32,
      yDistance: 900,
      xWiggle: 35,
    },
    cinders: {
      count: 10,
      color: 'bg-bloodstone',
      minSize: 1,
      maxSize: 3.2,
      peakOpacity: 0.35,
      blur: 0.35,
      glowColor: 'rgba(153, 67, 36, 0.35)',
      glowRadiusMultiplier: 7,
      minDuration: 14,
      maxDuration: 36,
      yDistance: 850,
      xWiggle: 30,
    },
    ash: {
      count: 8,
      color: 'bg-white',
      minSize: 0.8,
      maxSize: 1.8,
      peakOpacity: 0.18,
      minDuration: 16,
      maxDuration: 38,
      yDistance: 800,
      xWiggle: 18,
    },
  },
  strong: {
    embers: {
      count: 28,
      color: 'bg-sunbronze',
      minSize: 1,
      maxSize: 4.6,
      peakOpacity: 0.85,
      blur: 0.35,
      glowColor: 'rgba(186, 138, 45, 0.70)',
      glowRadiusMultiplier: 8,
      minDuration: 10,
      maxDuration: 28,
      yDistance: 1100,
      xWiggle: 60,
    },
    cinders: {
      count: 14,
      color: 'bg-bloodstone',
      minSize: 1,
      maxSize: 3.9,
      peakOpacity: 0.5,
      blur: 0.45,
      glowColor: 'rgba(153, 67, 36, 0.55)',
      glowRadiusMultiplier: 8,
      minDuration: 12,
      maxDuration: 32,
      yDistance: 1000,
      xWiggle: 45,
    },
    ash: {
      count: 10,
      color: 'bg-white',
      minSize: 0.8,
      maxSize: 2.2,
      peakOpacity: 0.25,
      minDuration: 14,
      maxDuration: 34,
      yDistance: 950,
      xWiggle: 22,
    },
  },
  inferno: {
    embers: {
      count: 36,
      color: 'bg-sunbronze',
      minSize: 1,
      maxSize: 5.2,
      peakOpacity: 0.95,
      blur: 0.45,
      glowColor: 'rgba(186, 138, 45, 0.85)',
      glowRadiusMultiplier: 9,
      minDuration: 8,
      maxDuration: 24,
      yDistance: 1300,
      xWiggle: 70,
    },
    cinders: {
      count: 18,
      color: 'bg-bloodstone',
      minSize: 1,
      maxSize: 4.3,
      peakOpacity: 0.65,
      blur: 0.55,
      glowColor: 'rgba(153, 67, 36, 0.70)',
      glowRadiusMultiplier: 9,
      minDuration: 10,
      maxDuration: 28,
      yDistance: 1200,
      xWiggle: 55,
    },
    ash: {
      count: 14,
      color: 'bg-white',
      minSize: 0.8,
      maxSize: 2.4,
      peakOpacity: 0.3,
      minDuration: 12,
      maxDuration: 30,
      yDistance: 1050,
      xWiggle: 26,
    },
  },
} as const

export interface HeroBackdropProps {
  className?: string
}

export function HeroBackdrop({ className }: HeroBackdropProps) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Parallax effect for the background image
  const y = useTransform(scrollY, [0, 1000], [0, 400])
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3])
  const ashes = ASHES_PRESETS[ASHES_PRESET]

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
      <FloatingParticles {...ashes.embers} className="mix-blend-screen" />
      <FloatingParticles {...ashes.cinders} className="mix-blend-screen opacity-90" />
      <FloatingParticles {...ashes.ash} className="opacity-55" />

      {/* Texture */}
      <NoiseOverlay opacity={0.06} />
    </div>
  )
}

