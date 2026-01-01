'use client'

import Image from 'next/image'

import { cn } from '#lib/cn'
import { Parallax } from '#components/scroll'
import { marketingImages } from '#lib/marketing-images'

export interface MarketingBackdropProps {
  className?: string
}

export function MarketingBackdrop({ className }: MarketingBackdropProps) {
  return (
    <div className={cn('pointer-events-none fixed inset-0 z-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-void-950" />

      {/* Color atmosphere (iron wood + bronze + bloodstone) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_12%_18%,rgba(186,138,45,0.14),transparent_58%),radial-gradient(900px_circle_at_88%_22%,rgba(153,67,36,0.12),transparent_62%),radial-gradient(1000px_circle_at_52%_92%,rgba(69,44,31,0.22),transparent_60%)]" />

      {/* Screenshot layers (very soft, masked) */}
      <Parallax
        factor={0.02}
        max={60}
        xFactor={-0.004}
        xMax={42}
        className="absolute -left-[14%] top-[6%] h-[58vh] w-[70vw] opacity-35 [mask-image:radial-gradient(55%_60%_at_42%_45%,black,transparent_72%)]"
      >
        <Image
          src={marketingImages.backdropLeft}
          alt=""
          fill
          sizes="70vw"
          quality={82}
          className="object-cover object-left-top saturate-[0.95] contrast-[1.06] brightness-[0.92]"
        />
      </Parallax>

      <Parallax
        factor={0.028}
        max={76}
        xFactor={0.0035}
        xMax={48}
        className="absolute -right-[12%] top-[28%] h-[70vh] w-[66vw] opacity-28 [mask-image:radial-gradient(60%_60%_at_52%_46%,black,transparent_74%)]"
      >
        <Image
          src={marketingImages.backdropRight}
          alt=""
          fill
          sizes="66vw"
          quality={82}
          className="object-cover object-center saturate-[0.92] contrast-[1.06] brightness-[0.9]"
        />
      </Parallax>

      <div className="absolute left-1/2 top-[62%] h-[60vh] w-[72vw] -translate-x-1/2 opacity-16 [mask-image:radial-gradient(55%_55%_at_50%_45%,black,transparent_76%)]" />

      {/* Mist drift (very cheap: pure gradients + transform) */}
      <Parallax
        factor={0.035}
        max={90}
        xFactor={-0.006}
        xMax={72}
        className="absolute -inset-x-[18%] top-[8%] h-[62vh] opacity-[0.10] blur-[2px]"
      >
        <div className="h-full w-full bg-[radial-gradient(55%_70%_at_55%_35%,rgba(231,207,166,0.22),transparent_62%),radial-gradient(60%_70%_at_30%_20%,rgba(186,138,45,0.16),transparent_64%)]" />
      </Parallax>

      {/* Mist & vignette to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-950/35 via-transparent to-void-950/85" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,transparent_0%,rgba(7,6,10,0.65)_75%,rgba(7,6,10,0.9)_100%)]" />

      {/* Subtle, cheap texture (avoid SVG turbulence on the full page) */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_14px)]" />
    </div>
  )
}
