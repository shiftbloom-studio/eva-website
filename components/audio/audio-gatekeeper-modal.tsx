'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '#lib/cn'
import { useAudio } from '#lib/audio'

export function AudioGatekeeperModal() {
  const audio = useAudio()
  const [isEnabling, setIsEnabling] = React.useState(false)
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    if (!audio.gateOpen) return

    closeButtonRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') audio.closeGate()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [audio.gateOpen, audio.closeGate])

  const onEnable = React.useCallback(async () => {
    setIsEnabling(true)
    try {
      await audio.enable()
    } finally {
      setIsEnabling(false)
    }
  }, [audio])

  if (!audio.gateOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Schließen"
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          onClick={audio.closeGate}
          onWheel={audio.closeGate}
          onTouchMove={audio.closeGate}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="eva-audio-gate-title"
          aria-describedby="eva-audio-gate-desc"
          className={cn(
            'relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10',
            'bg-void-950/75 text-vellum-50 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl',
          )}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.985 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(186,138,45,0.18),transparent_55%),radial-gradient(800px_circle_at_80%_30%,rgba(153,67,36,0.14),transparent_60%)]" />

          <div className="relative p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/65">Optional</p>
                <h2 id="eva-audio-gate-title" className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">
                  Atmosphäre aktivieren?
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]',
                  'text-vellum-200/75 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-vellum-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
                onClick={audio.closeGate}
                aria-label="Schließen"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <p id="eva-audio-gate-desc" className="mt-4 text-sm leading-relaxed text-vellum-200/85">
              Wenn du willst, begleiten dich dezente Effekte und Sprecher-Stimmen durch die Seite — ohne Autoplay,
              ohne Spam. <span className="text-vellum-100/90">Scrollen stoppt Audio sofort.</span>
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={audio.deny}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-200/85',
                  'transition hover:border-white/15 hover:bg-white/[0.03] hover:text-vellum-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                Nein danke
              </button>

              <button
                type="button"
                onClick={onEnable}
                disabled={isEnabling}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border border-sunbronze/30 bg-sunbronze/10 px-5 py-2.5 text-sm font-semibold text-sunbronze',
                  'transition hover:border-sunbronze/45 hover:bg-sunbronze/15 hover:text-vellum-50',
                  'disabled:cursor-not-allowed disabled:opacity-60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                {isEnabling ? 'Aktiviere…' : 'Aktivieren'}
              </button>
            </div>

            <p className="mt-4 text-xs text-vellum-200/55">
              Du kannst Audio jederzeit unten wieder ausschalten.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

