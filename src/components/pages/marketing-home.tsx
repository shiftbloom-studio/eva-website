'use client'

import { BentoSection } from '#components/sections/bento'
import { CtaSection } from '#components/sections/cta'
import { FaqSection } from '#components/sections/faq'
import { HeroSection } from '#components/sections/hero'
import { SystemsSection } from '#components/sections/systems'
import { TestimonialsSection } from '#components/sections/testimonials'

export function MarketingHome() {
  return (
    <>
      <HeroSection />
      <BentoSection />
      <SystemsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
