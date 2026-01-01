'use client'

import { cancelFrame, frame, MotionConfig } from 'framer-motion'
import { ReactLenis, type LenisRef } from 'lenis/react'

import * as React from 'react'

export function Provider(props: { children: React.ReactNode }) {
  const lenisRef = React.useRef<LenisRef>(null)

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
        options={{
          autoRaf: false,
          lerp: 0.1,
          smoothWheel: true,
          smoothTouch: false,
          wheelMultiplier: 0.9,
        }}
      >
        {props.children}
      </ReactLenis>
    </MotionConfig>
  )
}
