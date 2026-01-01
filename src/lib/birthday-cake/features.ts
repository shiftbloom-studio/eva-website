import type { CakeFeatures, CakeSignals, CakeTier } from './types'

export function featuresFor(tier: CakeTier, signals: CakeSignals): CakeFeatures {
  const reduceMotion = signals.prefersReducedMotion
  const saveData = Boolean(signals.saveData)
  const slowNet = signals.effectiveType === 'slow-2g' || signals.effectiveType === '2g' || signals.effectiveType === '3g'

  // We treat "lite" as a mostly-static mode (old phones, slow-ish connections).
  const motion = !reduceMotion && (tier === 'rich' || tier === 'ultra')
  const smoothScroll = motion && (tier === 'rich' || tier === 'ultra')

  // Audio is the most "optional nice-to-have": require good tier AND no explicit data saving AND no slow net.
  const audio = (tier === 'rich' || tier === 'ultra') && !saveData && !slowNet

  // Privacy banner can be a UX tax on slow devices; on base/lite we auto-decline by simply not mounting it.
  const privacyBanner = (tier === 'rich' || tier === 'ultra') && !saveData && !slowNet

  // Rich images: allow only on capable tiers; still browsers will pick via srcset.
  const richImages = tier === 'rich' || tier === 'ultra'

  return { motion, smoothScroll, audio, privacyBanner, richImages }
}
