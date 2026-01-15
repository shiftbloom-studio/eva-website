'use client'

import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import faq from '#data/faq'
import { legal } from '#data/legal'
import { systems } from '#data/systems'
import { testimonials } from '#data/testimonials-arda'
import { cn } from '#lib/cn'
import { marketingImages } from '#lib/marketing-images'

const MarketingHomeEnhanced = React.lazy(async () => {
  const mod = await import('./marketing-home-enhanced')
  return { default: mod.MarketingHomeEnhanced }
})

function FeatureTag(props: { children: React.ReactNode; testId?: string }) {
  return (
    <span
      data-testid={props.testId}
      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-vellum-200/70"
    >
      {props.children}
    </span>
  )
}

function MarketingHomeBase() {
  const [openSystemId, setOpenSystemId] = React.useState<(typeof systems)[number]['id'] | null>('wirtschaft')
  const [openFaq, setOpenFaq] = React.useState<string | null>(faq.items[0]?.question ?? null)

  return (
    <>
      {/* HERO (base) */}
      <section className="relative isolate min-h-[92svh] overflow-hidden">
        {/* Base hero image (loads early even before rich layer chunks arrive) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#2d2e3a_0%,#07060a_100%)]" />
          <div className="absolute inset-0">
            <Image
              src={marketingImages.heroWide}
              alt=""
              fill
              // On mobile portrait the image is effectively "zoomed" via `object-cover`,
              // so we request a larger candidate to keep it crisp on high-DPR screens.
              sizes="(max-width: 640px) 200vw, (max-width: 768px) 100vw, 2560px"
              priority
              placeholder="blur"
              quality={86}
              className="object-cover object-[70%_0%] opacity-85 grayscale-[8%] sepia-[12%] sm:object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-void-950/15 via-void-950/30 to-void-950 sm:from-void-950/10 sm:via-void-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-void-950/50 via-transparent to-void-950/50" />
          'use client'

          import { MarketingHomeEnhanced } from './marketing-home-enhanced'

          export function MarketingHomeCake() {
            return <MarketingHomeEnhanced />
          }
