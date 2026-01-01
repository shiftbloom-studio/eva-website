export type CakeTier = 'base' | 'lite' | 'rich' | 'ultra'

export type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'

export interface CakeSignals {
  /** User explicitly enabled data saver (if supported). */
  saveData: boolean | null
  /** Network effective type (if supported). */
  effectiveType: EffectiveConnectionType
  /** Estimated downlink in Mbps (if supported). */
  downlinkMbps: number | null
  /** Estimated RTT in ms (if supported). */
  rttMs: number | null

  /** Approx device memory in GB (if supported). */
  deviceMemoryGB: number | null
  /** CPU core count (if supported). */
  hardwareConcurrency: number | null

  /** Pixel ratio (if supported). */
  dpr: number | null
  /** Screen size in CSS pixels (best effort). */
  screenWidth: number | null
  screenHeight: number | null

  /** User preference. */
  prefersReducedMotion: boolean
}

export interface CakeFeatures {
  /** Animations and framer-motion based components. */
  motion: boolean
  /** Smooth scrolling / scroll-driven CSS vars. */
  smoothScroll: boolean
  /** Audio engine, gate modal, SFX/VO. */
  audio: boolean
  /** Show cookie/privacy banner UI (opt-in) instead of auto-decline. */
  privacyBanner: boolean
  /** Allow high-res / high-quality images by default. */
  richImages: boolean
}

export interface CakeProfile {
  tier: CakeTier
  features: CakeFeatures
  signals: CakeSignals
  reasons: string[]
}
