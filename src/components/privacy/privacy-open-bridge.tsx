'use client'

import * as React from 'react'

/**
 * Progressive enhancement bridge:
 * lets server-rendered markup trigger the privacy settings dialog without
 * importing the full `PrivacySettingsTrigger` client component.
 */
export function PrivacyOpenBridge() {
  React.useEffect(() => {
    const opts = { capture: true } as const

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const el = target?.closest?.('[data-eva-privacy-open]')
      if (!el) return

      // If this came from a real <button>, keep keyboard semantics intact.
      e.preventDefault()
      // If the rich layer (and thus <PrivacyLayer/>) hasn't mounted yet, remember the intent
      // so the dialog can open as soon as it becomes available.
      ;(window as unknown as { __evaPrivacyOpenRequested?: boolean }).__evaPrivacyOpenRequested = true
      window.dispatchEvent(new Event('eva:privacy-open'))
    }

    document.addEventListener('click', onClick, opts)
    return () => document.removeEventListener('click', onClick, opts)
  }, [])

  return null
}
