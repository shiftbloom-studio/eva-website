'use client'

import { cancelFrame, frame, MotionConfig, useReducedMotion } from 'framer-motion'
import { ReactLenis, type LenisRef } from 'lenis/react'

import * as React from 'react'

import { AudioLayer } from '#components/audio'
import { PrivacyLayer } from '#components/privacy'
import { AudioProvider } from '#lib/audio'

export function Provider(props: { children: React.ReactNode }) {
  const lenisRef = React.useRef<LenisRef>(null)
  const reduceMotion = useReducedMotion() ?? false

  const lenisOptions = React.useMemo(
    () => ({
      autoRaf: false,
      // If the user prefers reduced motion, we effectively disable smoothing.
      lerp: reduceMotion ? 1 : 0.1,
      smoothWheel: !reduceMotion,
      syncTouch: reduceMotion,
      wheelMultiplier: 0.9,
    }),
    [reduceMotion],
  )

  React.useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        ref={lenisRef}
        options={lenisOptions}
      >
        <AudioProvider>
          {props.children}
          <AudioLayer />
          <PrivacyLayer />
        </AudioProvider>
      </ReactLenis>
    </MotionConfig>
  )
}
