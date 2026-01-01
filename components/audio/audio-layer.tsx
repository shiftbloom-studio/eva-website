'use client'

import * as React from 'react'

import { AudioControls } from './audio-controls'
import { AudioGatekeeperModal } from './audio-gatekeeper-modal'

export function AudioLayer() {
  return (
    <>
      <AudioGatekeeperModal />
      <AudioControls />
    </>
  )
}

