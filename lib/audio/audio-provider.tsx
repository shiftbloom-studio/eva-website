'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import { AudioEngine } from './audio-engine'
import {
  DEFAULT_COOLDOWN_MS,
  SOUND_CHANNEL,
  SFX_KEYS,
  type AudioChannel,
  type SfxKey,
  type SoundKey,
  type VoiceKey,
  VOICE_KEYS,
} from './sounds'

type ConsentState = 'unknown' | 'granted' | 'denied'

type AutoplayCandidate = {
  id: string
  el: HTMLElement
  ratio: number
  voice?: VoiceKey
  sfx?: SfxKey
}

const VOICE_KEY_SET = new Set<string>(VOICE_KEYS)
const SFX_KEY_SET = new Set<string>(SFX_KEYS)

function parseVoiceKey(raw: string | undefined): VoiceKey | undefined {
  if (!raw) return undefined
  return VOICE_KEY_SET.has(raw) ? (raw as VoiceKey) : undefined
}

function parseSfxKey(raw: string | undefined): SfxKey | undefined {
  if (!raw) return undefined
  return SFX_KEY_SET.has(raw) ? (raw as SfxKey) : undefined
}

const STORAGE_KEYS = {
  consent: 'eva_audio_consent',
  enabled: 'eva_audio_enabled',
  volume: 'eva_audio_volume',
  muted: 'eva_audio_muted',
  welcomePlayed: 'eva_audio_welcome_played',
} as const

function clamp01(value: number) {
  if (Number.isNaN(value)) return 0
  return Math.min(1, Math.max(0, value))
}

function readStorageString(key: string) {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorageString(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

function readConsent(): ConsentState {
  const raw = readStorageString(STORAGE_KEYS.consent)
  if (raw === 'granted') return 'granted'
  if (raw === 'denied') return 'denied'
  return 'unknown'
}

function readBool(key: string, fallback: boolean) {
  const raw = readStorageString(key)
  if (raw === null) return fallback
  return raw === '1' || raw === 'true'
}

function readNumber(key: string, fallback: number) {
  const raw = readStorageString(key)
  if (raw === null) return fallback
  const n = Number(raw)
  return Number.isFinite(n) ? n : fallback
}

export interface PlayGateOptions {
  /**
   * Debounce / throttle per sound key.
   */
  cooldownMs?: number
}

export interface AudioLayerApi {
  consent: ConsentState
  enabled: boolean
  muted: boolean
  volume: number

  gateOpen: boolean
  openGate: () => void
  closeGate: () => void

  /**
   * True while the page is actively scrolling (wheel/lenis RAF).
   * Useful to suppress triggers and to delay section stingers until idle.
   */
  isScrollActive: boolean

  enable: () => Promise<void>
  deny: () => void
  disable: (options?: { fadeMs?: number }) => void

  setVolume: (volume: number) => void
  setMuted: (muted: boolean) => void

  playSfx: (key: SfxKey, options?: PlayGateOptions) => void
  playVoice: (key: VoiceKey, options?: PlayGateOptions) => void
  stopAll: (options?: { fadeMs?: number }) => void
}

const NOOP_AUDIO_LAYER_API: AudioLayerApi = {
  consent: 'denied',
  enabled: false,
  muted: true,
  volume: 0,
  gateOpen: false,
  openGate: () => {},
  closeGate: () => {},
  isScrollActive: false,
  enable: async () => {},
  deny: () => {},
  disable: () => {},
  setVolume: () => {},
  setMuted: () => {},
  playSfx: () => {},
  playVoice: () => {},
  stopAll: () => {},
}

const AudioLayerContext = React.createContext<AudioLayerApi>(NOOP_AUDIO_LAYER_API)

export function AudioProvider(props: { children: React.ReactNode }) {
  const pathname = usePathname()

  const [engine] = React.useState(() => new AudioEngine())

  // IMPORTANT: do not read localStorage in initial state.
  // This component is SSR-ed (client boundary) and would otherwise cause hydration mismatch.
  const [consent, setConsent] = React.useState<ConsentState>('unknown')
  const [enabled, setEnabled] = React.useState<boolean>(false)
  const [muted, setMutedState] = React.useState<boolean>(false)
  const [volume, setVolumeState] = React.useState<number>(0.85)

  const [gateOpen, setGateOpen] = React.useState(false)
  const [isScrollActive, setIsScrollActive] = React.useState(false)
  const [isUnlocked, setIsUnlocked] = React.useState(false)

  const stateRef = React.useRef({ consent, enabled, muted, isUnlocked })
  React.useEffect(() => {
    stateRef.current = { consent, enabled, muted, isUnlocked }
  }, [consent, enabled, muted, isUnlocked])

  const scrollActiveRef = React.useRef(false)
  const scrollStopTimerRef = React.useRef<number | null>(null)

  const lastPlayedAtRef = React.useRef<Map<SoundKey, number>>(new Map())
  const lastChannelPlayedAtRef = React.useRef<Map<AudioChannel, number>>(new Map())
  const sectionRatiosRef = React.useRef<Map<string, number>>(new Map())
  const sectionLastStingerAtRef = React.useRef<Map<string, number>>(new Map())
  const lastActiveSectionIdRef = React.useRef<string | null>(null)

  const autoplayCandidatesRef = React.useRef<Map<string, AutoplayCandidate>>(new Map())
  const autoplayPlayedIdsRef = React.useRef<Set<string>>(new Set())

  const routeInitRef = React.useRef(false)

  // Hydrate persisted preferences on the client (useState initializers run on the server in RSC).
  React.useEffect(() => {
    const persistedConsent = readConsent()
    setConsent(persistedConsent)

    // Only read non-essential preferences (volume/mute/enabled) if audio consent was granted.
    if (persistedConsent === 'granted') {
      const persistedEnabled = readBool(STORAGE_KEYS.enabled, false)
      const persistedMuted = readBool(STORAGE_KEYS.muted, false)
      const persistedVolume = clamp01(readNumber(STORAGE_KEYS.volume, 0.85))

      setEnabled(persistedEnabled)
      setMutedState(persistedMuted)
      setVolumeState(persistedVolume)

      engine.setMuted(persistedMuted)
      engine.setVolume(persistedVolume)
      return
    }

    // No consent → keep audio effectively off and avoid reading/storing optional preferences.
    setEnabled(false)
    setMutedState(false)
    setVolumeState(0.85)
    engine.setMuted(false)
    engine.setVolume(0.85)
  }, [engine])

  // Keep state sane: if consent isn't granted, audio is effectively off.
  React.useEffect(() => {
    if (consent !== 'granted' && enabled) {
      setEnabled(false)
    }
  }, [consent, enabled])

  const closeGate = React.useCallback(() => setGateOpen(false), [])
  const openGate = React.useCallback(() => setGateOpen(true), [])

  const stopAll = React.useCallback(
    (options?: { fadeMs?: number }) => {
      engine.stopAll({ durationMs: options?.fadeMs ?? 140, shape: 'exp' })
    },
    [engine],
  )

  const disable = React.useCallback(
    (options?: { fadeMs?: number }) => {
      writeStorageString(STORAGE_KEYS.enabled, '0')
      setEnabled(false)
      stopAll({ fadeMs: options?.fadeMs ?? 140 })
      void engine.suspend()
    },
    [engine, stopAll],
  )

  const unlock = React.useCallback(async () => {
    try {
      await engine.ensure()
      engine.setMuted(muted)
      engine.setVolume(volume)
      await engine.resume()
      setIsUnlocked(true)
      return true
    } catch {
      return false
    }
  }, [engine, muted, volume])

  const deny = React.useCallback(() => {
    writeStorageString(STORAGE_KEYS.consent, 'denied')
    setConsent('denied')
    closeGate()
    disable({ fadeMs: 140 })
  }, [closeGate, disable])

  const enable = React.useCallback(async () => {
    writeStorageString(STORAGE_KEYS.consent, 'granted')
    writeStorageString(STORAGE_KEYS.enabled, '1')
    setConsent('granted')
    setEnabled(true)
    closeGate()

    const ok = await unlock()
    if (!ok) return

    // Preload a few short SFX to make the first interactions feel instant.
    const preloadKeys: SoundKey[] = [
      'sfx_hover_card',
      'sfx_click_confirm',
      'sfx_link_hint',
      'sfx_section_stinger',
    ]

    const schedule = (fn: () => void) => {
      const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void) => void)
      if (ric) return ric(fn)
      window.setTimeout(fn, 250)
    }

    schedule(() => {
      void engine.preload(preloadKeys)
    })

    // Optional immersion: play welcome voice once, only if user stays still for a moment.
    const welcomePlayed = readStorageString(STORAGE_KEYS.welcomePlayed) === '1'
    if (!welcomePlayed) {
      window.setTimeout(() => {
        if (scrollActiveRef.current) return
        const s = stateRef.current
        if (!(s.consent === 'granted' && s.enabled && !s.muted && s.isUnlocked)) return
        // We mark as played even if audio is later stopped; avoids re-spam.
        writeStorageString(STORAGE_KEYS.welcomePlayed, '1')
        void engine.play('voice_welcome', {
          channel: 'voice',
          interrupt: { fadeOut: { durationMs: 140, shape: 'exp' } },
          fadeIn: { durationMs: 60, shape: 'exp' },
        })
      }, 650)
    }
  }, [closeGate, engine, unlock])

  const setVolume = React.useCallback(
    (next: number) => {
      const v = clamp01(next)
      if (stateRef.current.consent === 'granted') {
        writeStorageString(STORAGE_KEYS.volume, String(v))
      }
      setVolumeState(v)
      engine.setVolume(v)
      if (v > 0) {
        if (stateRef.current.consent === 'granted') {
          writeStorageString(STORAGE_KEYS.muted, '0')
        }
        setMutedState(false)
        engine.setMuted(false)
      }
    },
    [engine],
  )

  const setMuted = React.useCallback(
    (next: boolean) => {
      if (stateRef.current.consent === 'granted') {
        writeStorageString(STORAGE_KEYS.muted, next ? '1' : '0')
      }
      setMutedState(next)
      engine.setMuted(next)
    },
    [engine],
  )

  const canPlay = React.useCallback(() => {
    return consent === 'granted' && enabled && !muted && isUnlocked && !scrollActiveRef.current
  }, [consent, enabled, muted, isUnlocked])

  const tryPlaySound = React.useCallback(
    (key: SoundKey, options?: PlayGateOptions) => {
      if (!canPlay()) return

      const t = Date.now()
      const cooldownMs = options?.cooldownMs ?? DEFAULT_COOLDOWN_MS[key] ?? 200
      const bypassCooldown = options?.cooldownMs === 0

      if (!bypassCooldown) {
        const last = lastPlayedAtRef.current.get(key) ?? 0
        if (t - last < cooldownMs) return
      }

      const channel: AudioChannel = SOUND_CHANNEL[key]

      // Extra safety: never spam voices, even if different voice keys are clicked rapidly.
      if (channel === 'voice' && !bypassCooldown) {
        const lastVoice = lastChannelPlayedAtRef.current.get('voice') ?? 0
        if (t - lastVoice < 3500) return
        lastChannelPlayedAtRef.current.set('voice', t)
      }

      if (!bypassCooldown) {
        lastPlayedAtRef.current.set(key, t)
      }
      void engine.play(key, {
        channel,
        interrupt: { fadeOut: { durationMs: 110, shape: 'exp' } },
        fadeIn: { durationMs: 42, shape: 'exp' },
      })
    },
    [canPlay, engine],
  )

  const playSfx = React.useCallback(
    (key: SfxKey, options?: PlayGateOptions) => {
      tryPlaySound(key, options)
    },
    [tryPlaySound],
  )

  const playVoice = React.useCallback(
    (key: VoiceKey, options?: PlayGateOptions) => {
      tryPlaySound(key, options)
    },
    [tryPlaySound],
  )

  // Unlock automatically on the first real user activation (for returning users with enabled=true).
  React.useEffect(() => {
    if (!(consent === 'granted' && enabled)) return
    if (isUnlocked) return

    const onActivate = () => {
      void unlock()
    }

    window.addEventListener('pointerdown', onActivate, { capture: true, once: true })
    window.addEventListener('keydown', onActivate, { capture: true, once: true })
    return () => {
      window.removeEventListener('pointerdown', onActivate, { capture: true } as any)
      window.removeEventListener('keydown', onActivate, { capture: true } as any)
    }
  }, [consent, enabled, isUnlocked, unlock])

  // Stop everything on route change (hard safety net).
  React.useEffect(() => {
    if (!routeInitRef.current) {
      routeInitRef.current = true
      return
    }
    stopAll({ fadeMs: 160 })
    closeGate()
    autoplayCandidatesRef.current.clear()
    autoplayPlayedIdsRef.current.clear()
  }, [pathname, stopAll, closeGate])

  // Stop audio when tab becomes hidden (external links, tab switch, etc.)
  React.useEffect(() => {
    const onVis = () => {
      if (document.hidden) stopAll({ fadeMs: 140 })
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [stopAll])

  // Auto-prompt the gatekeeper once (only if user is still at top and hasn't started reading).
  React.useEffect(() => {
    if (consent !== 'unknown') return
    if (gateOpen) return

    let didRun = false
    const timer = window.setTimeout(() => {
      didRun = true
      const y = window.scrollY || 0
      // If the user already scrolled, we interpret: "I want to read, not click."
      if (y > 8) return
      setGateOpen(true)
    }, 900)

    return () => {
      window.clearTimeout(timer)
      // If we unmount before the timer fires, we don't count it.
      void didRun
    }
  }, [consent, gateOpen])

  // Close the modal immediately on scroll (scheues Tier).
  React.useEffect(() => {
    if (!gateOpen) return
    const onScroll = () => setGateOpen(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [gateOpen])

  const maybeFireSectionStinger = React.useCallback(() => {
    const candidates = Array.from(sectionRatiosRef.current.entries())
    if (candidates.length === 0) return

    const [bestId, bestRatio] = candidates.reduce<[string, number]>(
      (best, item) => (item[1] > best[1] ? item : best),
      candidates[0],
    )

    // We only want to "announce" big section arrivals, not tiny overlaps.
    if (bestRatio < 0.45) return

    // Only fire on actual section changes.
    const prev = lastActiveSectionIdRef.current
    if (prev === bestId) return
    lastActiveSectionIdRef.current = bestId

    // Only after scrolling has ended (idle), and only when audio can actually play.
    if (!canPlay()) return

    const last = sectionLastStingerAtRef.current.get(bestId) ?? 0
    const t = Date.now()
    if (t - last < 15_000) return

    sectionLastStingerAtRef.current.set(bestId, t)
    tryPlaySound('sfx_section_stinger', { cooldownMs: 900 })
  }, [canPlay, tryPlaySound])

  const maybeFireAutoplay = React.useCallback(() => {
    if (!canPlay()) return

    const played = autoplayPlayedIdsRef.current

    const candidates = Array.from(autoplayCandidatesRef.current.values())
      .filter((c) => c.ratio >= 0.25)
      .filter((c) => !played.has(c.id))
      .filter((c) => Boolean(c.voice || c.sfx))
      .map((c) => ({ ...c, top: c.el.getBoundingClientRect().top }))
      .sort((a, b) => a.top - b.top)

    const best = candidates[0]
    if (!best) return

    // Enforce "only one per viewport moment": we only pick the top-most candidate once per scroll idle.
    played.add(best.id)

    if (best.sfx) {
      // For scroll-autoplay, we intentionally bypass cooldown: the once-per-id gate prevents spam.
      tryPlaySound(best.sfx, { cooldownMs: 0 })
    }

    if (best.voice) {
      const delayMs = best.sfx ? 160 : 0
      window.setTimeout(() => {
        tryPlaySound(best.voice!, { cooldownMs: 0 })
      }, delayMs)
    }
  }, [canPlay, tryPlaySound])

  // Scroll dominates audio: stop + fade out immediately on scroll start.
  React.useEffect(() => {
    const onScroll = () => {
      // Close gate immediately if open.
      if (gateOpen) setGateOpen(false)

      if (!scrollActiveRef.current) {
        scrollActiveRef.current = true
        setIsScrollActive(true)
        stopAll({ fadeMs: 140 })
      }

      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current)
      }

      // "Idle detection" window: must be still for a moment.
      scrollStopTimerRef.current = window.setTimeout(() => {
        scrollActiveRef.current = false
        setIsScrollActive(false)
        maybeFireSectionStinger()
        maybeFireAutoplay()
      }, 240)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollStopTimerRef.current) window.clearTimeout(scrollStopTimerRef.current)
    }
  }, [gateOpen, stopAll, maybeFireSectionStinger, maybeFireAutoplay])

  // Track which main sections are currently visible (for stingers after idle).
  React.useEffect(() => {
    if (!(consent === 'granted' && enabled)) return

    const sections = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[]
    if (sections.length === 0) return

    sectionRatiosRef.current.clear()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          const id = el.id
          if (!id) continue
          if (entry.isIntersecting) {
            sectionRatiosRef.current.set(id, entry.intersectionRatio)
          } else {
            sectionRatiosRef.current.delete(id)
          }
        }
      },
      {
        threshold: [0, 0.2, 0.35, 0.45, 0.6, 0.75],
        // Favor the center of the viewport (stingers should feel like "arrivals").
        rootMargin: '-15% 0px -45% 0px',
      },
    )

    for (const section of sections) io.observe(section)
    return () => io.disconnect()
  }, [consent, enabled, pathname])

  // Autoplay-on-scroll: observe specifically marked elements and play the top-most visible trigger after scroll idle.
  React.useEffect(() => {
    if (!(consent === 'granted' && enabled)) return

    const els = Array.from(document.querySelectorAll('[data-eva-audio-autoplay]')) as HTMLElement[]
    if (els.length === 0) return

    autoplayCandidatesRef.current.clear()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          const id = el.getAttribute('id')
          if (!id) continue

          if (!entry.isIntersecting) {
            autoplayCandidatesRef.current.delete(id)
            continue
          }

          const voice = parseVoiceKey(el.dataset.evaAudioVoice)
          const sfx = parseSfxKey(el.dataset.evaAudioSfx)
          autoplayCandidatesRef.current.set(id, {
            id,
            el,
            ratio: entry.intersectionRatio,
            voice: voice ?? undefined,
            sfx: sfx ?? undefined,
          })
        }
      },
      {
        threshold: [0, 0.15, 0.25, 0.35, 0.45, 0.6, 0.75],
        // Slightly favor "arrivals" near the upper/middle viewport.
        rootMargin: '-10% 0px -40% 0px',
      },
    )

    for (const el of els) io.observe(el)

    // If the user enables audio while already inside a marked section, we try once after IO has had a moment
    // to populate candidates (without relying on a scroll event).
    let rafId: number | null = null
    let tries = 0

    const pump = () => {
      tries += 1
      if (autoplayCandidatesRef.current.size > 0 || tries > 12) {
        maybeFireAutoplay()
        return
      }
      rafId = window.requestAnimationFrame(pump)
    }

    rafId = window.requestAnimationFrame(pump)

    return () => {
      io.disconnect()
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [consent, enabled, pathname, maybeFireAutoplay])

  const value = React.useMemo<AudioLayerApi>(
    () => ({
      consent,
      enabled,
      muted,
      volume,
      gateOpen,
      openGate,
      closeGate,
      isScrollActive,
      enable,
      deny,
      disable,
      setVolume,
      setMuted,
      playSfx,
      playVoice,
      stopAll,
    }),
    [
      consent,
      enabled,
      muted,
      volume,
      gateOpen,
      openGate,
      closeGate,
      isScrollActive,
      enable,
      deny,
      disable,
      setVolume,
      setMuted,
      playSfx,
      playVoice,
      stopAll,
    ],
  )

  return <AudioLayerContext.Provider value={value}>{props.children}</AudioLayerContext.Provider>
}

export function useAudioLayer() {
  const ctx = React.useContext(AudioLayerContext)
  return ctx
}
