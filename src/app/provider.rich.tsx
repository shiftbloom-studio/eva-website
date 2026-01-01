'use client'

import { cancelFrame, frame, MotionConfig, useReducedMotion } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import * as React from 'react'

import { AudioLayer } from '#components/audio'
import { PrivacyLayer } from '#components/privacy'
import { ScrollDebugOverlay } from '#components/scroll'
import { useCake } from '#components/birthday-cake'
import { PrivacyOpenBridge } from '#components/privacy/privacy-open-bridge'
import { AudioProvider } from '#lib/audio'

declare global {
  interface Window {
    __eva_lenis?: unknown
  }
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function LenisBridge() {
  const lenis = useLenis()

  React.useEffect(() => {
    if (!lenis) return
    // TS-safe snapshot for the raf callback (avoids "possibly undefined" under strict builds).
    const instance = lenis

    function update(data: { timestamp: number }) {
      instance.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [lenis])

  React.useEffect(() => {
    if (!lenis) return

    // Expose for debugging (devtools / overlay).
    window.__eva_lenis = lenis

    const root = document.documentElement

    const updateCssVars = () => {
      const y = lenis.scroll ?? window.scrollY ?? 0
      // Provide both a CSS-usable length and a raw number string for debugging.
      root.style.setProperty('--eva-scroll-y', `${y}px`)
      root.style.setProperty('--eva-scroll-y-num', `${y}`)
      root.style.setProperty('--eva-scroll-progress', `${lenis.progress ?? 0}`)
      root.style.setProperty('--eva-scroll-velocity', `${lenis.velocity ?? 0}`)
      root.style.setProperty('--eva-scroll-direction', `${lenis.direction ?? 0}`)
      root.dataset.evaIsScrolling = String(Boolean(lenis.isScrolling))
    }

    updateCssVars()
    const unsubscribe = lenis.on('scroll', () => {
      updateCssVars()
    })

    return () => {
      unsubscribe?.()
      delete window.__eva_lenis
    }
  }, [lenis])

  return null
}

function RichLayer(props: { children: React.ReactNode }) {
  const { profile } = useCake()
  const reduceMotion = useReducedMotion() ?? false

  const motionEnabled = profile.features.motion && !reduceMotion
  const smoothScrollEnabled = profile.features.smoothScroll && motionEnabled
  const audioEnabled = profile.features.audio
  const privacyEnabled = profile.features.privacyBanner

  const lenisOptions = React.useMemo(
    () => ({
      autoRaf: false,
      // If the user prefers reduced motion, we effectively disable smoothing.
      lerp: reduceMotion ? 1 : 0.085,
      smoothWheel: !reduceMotion,
      // Keep touch feeling native while still allowing Lenis to track + ease inertia.
      syncTouch: !reduceMotion,
      syncTouchLerp: reduceMotion ? 1 : 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      // Smooth anchor jumps (page-turn vibe).
      anchors: reduceMotion
        ? { offset: -112, immediate: true }
        : {
            offset: -112,
            duration: 1.15,
            easing: easeInOutCubic,
          },
      stopInertiaOnNavigate: true,
    }),
    [reduceMotion],
  )

  const content = (
    <>
      {props.children}
      {audioEnabled ? <AudioLayer /> : null}
      {privacyEnabled ? (
        <>
          <PrivacyOpenBridge />
          <PrivacyLayer />
        </>
      ) : null}
      {smoothScrollEnabled ? <ScrollDebugOverlay /> : null}
    </>
  )

  return (
    <MotionConfig reducedMotion="user">
      {smoothScrollEnabled ? (
        <ReactLenis root options={lenisOptions} autoRaf={false}>
          <LenisBridge />
          {audioEnabled ? <AudioProvider>{content}</AudioProvider> : content}
        </ReactLenis>
      ) : audioEnabled ? (
        <AudioProvider>{content}</AudioProvider>
      ) : (
        content
      )}
    </MotionConfig>
  )
}

/**
 * Rich providers are only lazy-loaded for capable devices.
 * We still wrap with CakeProvider here to make the module usable in isolation if needed.
 */
export function RichProvider(props: { children: React.ReactNode }) {
  return <RichLayer>{props.children}</RichLayer>
}
