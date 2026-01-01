import type { CakeProfile, CakeSignals, CakeTier, EffectiveConnectionType } from './types'
import { featuresFor } from './features'

type NavigatorConnectionLike = {
  effectiveType?: string
  saveData?: boolean
  downlink?: number
  rtt?: number
}

function readConnection(): {
  saveData: boolean | null
  effectiveType: EffectiveConnectionType
  downlinkMbps: number | null
  rttMs: number | null
} {
  const nav: any = typeof navigator === 'undefined' ? null : navigator
  const conn: NavigatorConnectionLike | null =
    (nav?.connection as NavigatorConnectionLike | undefined) ??
    (nav?.mozConnection as NavigatorConnectionLike | undefined) ??
    (nav?.webkitConnection as NavigatorConnectionLike | undefined) ??
    null

  const effectiveRaw = (conn?.effectiveType ?? 'unknown') as string
  const effectiveType: EffectiveConnectionType =
    effectiveRaw === 'slow-2g' || effectiveRaw === '2g' || effectiveRaw === '3g' || effectiveRaw === '4g'
      ? effectiveRaw
      : 'unknown'

  const downlink = typeof conn?.downlink === 'number' && Number.isFinite(conn.downlink) ? conn.downlink : null
  const rtt = typeof conn?.rtt === 'number' && Number.isFinite(conn.rtt) ? conn.rtt : null
  const saveData = typeof conn?.saveData === 'boolean' ? conn.saveData : null

  return { saveData, effectiveType, downlinkMbps: downlink, rttMs: rtt }
}

function readDevice(): Pick<
  CakeSignals,
  'deviceMemoryGB' | 'hardwareConcurrency' | 'dpr' | 'screenWidth' | 'screenHeight'
> {
  const nav: any = typeof navigator === 'undefined' ? null : navigator

  const deviceMemoryGB =
    typeof nav?.deviceMemory === 'number' && Number.isFinite(nav.deviceMemory) ? nav.deviceMemory : null
  const hardwareConcurrency =
    typeof nav?.hardwareConcurrency === 'number' && Number.isFinite(nav.hardwareConcurrency) ? nav.hardwareConcurrency : null

  const dpr = typeof window !== 'undefined' && typeof window.devicePixelRatio === 'number' ? window.devicePixelRatio : null

  const screenWidth =
    typeof window !== 'undefined'
      ? (typeof window.screen?.width === 'number' ? window.screen.width : window.innerWidth ?? null)
      : null
  const screenHeight =
    typeof window !== 'undefined'
      ? (typeof window.screen?.height === 'number' ? window.screen.height : window.innerHeight ?? null)
      : null

  return {
    deviceMemoryGB,
    hardwareConcurrency,
    dpr,
    screenWidth: typeof screenWidth === 'number' && Number.isFinite(screenWidth) ? screenWidth : null,
    screenHeight: typeof screenHeight === 'number' && Number.isFinite(screenHeight) ? screenHeight : null,
  }
}

function readPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches)
  } catch {
    return false
  }
}

function decideTier(signals: CakeSignals): { tier: CakeTier; reasons: string[] } {
  const reasons: string[] = []

  // Default assumption: "rich", but we pessimistically downgrade when we see clear constraints.
  let tier: CakeTier = 'rich'

  // Hard stops: data saver / very slow connection.
  if (signals.saveData) {
    tier = 'base'
    reasons.push('navigator.connection.saveData')
  }
  if (signals.effectiveType === 'slow-2g' || signals.effectiveType === '2g') {
    tier = 'base'
    reasons.push(`network:${signals.effectiveType}`)
  }

  // Weak signals: slow-ish network.
  if (tier !== 'base') {
    if (signals.effectiveType === '3g') {
      tier = 'lite'
      reasons.push('network:3g')
    }
    if ((signals.rttMs ?? 0) >= 600) {
      tier = 'lite'
      reasons.push(`rttMs:${signals.rttMs}`)
    }
    if ((signals.downlinkMbps ?? 999) <= 1.2) {
      tier = 'lite'
      reasons.push(`downlinkMbps:${signals.downlinkMbps}`)
    }
  }

  // Device constraints.
  if (signals.deviceMemoryGB !== null) {
    if (signals.deviceMemoryGB < 2) {
      tier = 'base'
      reasons.push(`deviceMemoryGB:${signals.deviceMemoryGB}`)
    } else if (signals.deviceMemoryGB <= 3 && tier === 'rich') {
      tier = 'lite'
      reasons.push(`deviceMemoryGB:${signals.deviceMemoryGB}`)
    }
  }

  if (signals.hardwareConcurrency !== null) {
    // Some browsers under-report cores for privacy; treat as a *soft* signal unless other constraints exist.
    if (signals.hardwareConcurrency <= 2 && tier === 'rich') {
      const maxSide = Math.max(signals.screenWidth ?? 0, signals.screenHeight ?? 0)
      // Only downgrade if we also see a small-ish screen (likely a low-end phone).
      if (maxSide > 0 && maxSide <= 900) {
        tier = 'lite'
        reasons.push(`hardwareConcurrency:${signals.hardwareConcurrency}`)
      }
    }
  }

  // Ultra tier: only upgrade when we see strong evidence.
  const w = signals.screenWidth ?? 0
  const h = signals.screenHeight ?? 0
  const maxSide = Math.max(w, h)
  if (
    tier === 'rich' &&
    (signals.deviceMemoryGB ?? 0) >= 8 &&
    (signals.hardwareConcurrency ?? 0) >= 8 &&
    maxSide >= 2400
  ) {
    tier = 'ultra'
    reasons.push('ultra:mem+cpu+screen')
  }

  // Reduced motion does not change tier, but is a crucial feature gate.
  if (signals.prefersReducedMotion) reasons.push('prefers-reduced-motion')

  return { tier, reasons }
}

export function detectCakeProfile(): CakeProfile {
  const prefersReducedMotion = readPrefersReducedMotion()
  const connection = readConnection()
  const device = readDevice()

  const signals: CakeSignals = {
    ...connection,
    ...device,
    prefersReducedMotion,
  }

  const { tier, reasons } = decideTier(signals)
  const features = featuresFor(tier, signals)

  return { tier, features, signals, reasons }
}
