'use client'

import * as React from 'react'

import { detectCakeProfile, featuresFor, type CakeProfile, type CakeTier } from '#lib/birthday-cake'

type CakeContextValue = {
  profile: CakeProfile
  ready: boolean
  /**
   * Debug hook: hard override tier for the current tab/session.
   * This intentionally does not persist across new sessions.
   */
  setTierOverride: (tier: CakeTier | null) => void
}

const DEFAULT_PROFILE: CakeProfile = {
  tier: 'base',
  features: {
    motion: false,
    smoothScroll: false,
    audio: false,
    privacyBanner: false,
    richImages: false,
  },
  signals: {
    saveData: null,
    effectiveType: 'unknown',
    downlinkMbps: null,
    rttMs: null,
    deviceMemoryGB: null,
    hardwareConcurrency: null,
    dpr: null,
    screenWidth: null,
    screenHeight: null,
    prefersReducedMotion: false,
  },
  reasons: ['default'],
}

const STORAGE_KEY = 'eva_cake_tier_override'

function readTierOverride(): CakeTier | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw === 'base' || raw === 'lite' || raw === 'rich' || raw === 'ultra') return raw
    return null
  } catch {
    return null
  }
}

function writeTierOverride(tier: CakeTier | null) {
  try {
    if (tier === null) window.sessionStorage.removeItem(STORAGE_KEY)
    else window.sessionStorage.setItem(STORAGE_KEY, tier)
  } catch {
    // ignore
  }
}

function applyHtmlDataset(profile: CakeProfile, ready: boolean) {
  const root = document.documentElement
  root.dataset.evaCakeTier = profile.tier
  root.dataset.evaCakeReady = ready ? '1' : '0'
  root.dataset.evaCakeMotion = profile.features.motion ? '1' : '0'
  root.dataset.evaCakeAudio = profile.features.audio ? '1' : '0'
  root.dataset.evaCakePrivacy = profile.features.privacyBanner ? '1' : '0'
  root.dataset.evaCakeSaveData = profile.signals.saveData ? '1' : '0'
}

const CakeContext = React.createContext<CakeContextValue | null>(null)

export function CakeProvider(props: { children: React.ReactNode }) {
  // SSR-safe default.
  const [profile, setProfile] = React.useState<CakeProfile>(DEFAULT_PROFILE)
  const [ready, setReady] = React.useState(false)

  const setTierOverride = React.useCallback((tier: CakeTier | null) => {
    writeTierOverride(tier)
    if (tier === null) {
      const next = detectCakeProfile()
      setProfile(next)
      setReady(true)
      applyHtmlDataset(next, true)
      return
    }
    const next = { ...detectCakeProfile(), tier, reasons: ['override'] as string[] }
    const adjusted = { ...next, features: featuresFor(tier, next.signals) }
    setProfile(adjusted)
    setReady(true)
    applyHtmlDataset(adjusted, true)
  }, [])

  React.useEffect(() => {
    const override = readTierOverride()
    const detected = detectCakeProfile()
    const next = override ? { ...detected, tier: override, reasons: ['override'] } : detected
    // If overridden, also adjust features for that tier.
    const final = override ? { ...next, features: featuresFor(override, next.signals) } : next

    setProfile(final)
    setReady(true)
    applyHtmlDataset(final, true)
  }, [])

  const value = React.useMemo<CakeContextValue>(
    () => ({
      profile,
      ready,
      setTierOverride,
    }),
    [profile, ready, setTierOverride],
  )

  return <CakeContext.Provider value={value}>{props.children}</CakeContext.Provider>
}

export function useCake() {
  const ctx = React.useContext(CakeContext)
  if (!ctx) throw new Error('useCake must be used within <CakeProvider />')
  return ctx
}
