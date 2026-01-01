'use client'

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
