'use client'

import { Volume2, VolumeX } from 'lucide-react'
import * as React from 'react'

import { cn } from '#lib/cn'
import { useAudio } from '#lib/audio'

function formatPercent(value01: number) {
  const pct = Math.round(value01 * 100)
  return `${pct}%`
}

export function AudioControls() {
  const audio = useAudio()

  const isOn = audio.consent === 'granted' && audio.enabled
  const isInteractable = audio.consent === 'granted'

  const volumePct = Math.round(audio.volume * 100)

  const requestEnable = React.useCallback(async () => {
    if (audio.consent === 'granted') {
      await audio.enable()
      return
    }
    audio.openGate()
  }, [audio])

  return (
    <>
      {/* Volume (left bottom) */}
      <div className="fixed bottom-4 left-4 z-[150]">
        <div
          className={cn(
            'flex items-center gap-3 rounded-full border border-white/10 bg-void-950/45 px-3 py-2 backdrop-blur-md',
            'shadow-[0_10px_30px_rgba(0,0,0,0.35)]',
          )}
        >
          <button
            type="button"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]',
              'text-vellum-200/75 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-vellum-50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
            )}
            onClick={() => {
              if (audio.consent !== 'granted') {
                audio.openGate()
                return
              }
              audio.setMuted(!audio.muted)
            }}
            aria-label={audio.muted ? 'Audio stummschalten aufheben' : 'Audio stummschalten'}
          >
            {audio.muted ? <VolumeX className="h-4 w-4" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} />}
          </button>

          <label className="sr-only" htmlFor="eva-audio-volume">
            Lautstärke
          </label>
          <input
            id="eva-audio-volume"
            type="range"
            min={0}
            max={100}
            step={1}
            value={volumePct}
            onPointerDown={() => {
              if (!isInteractable) audio.openGate()
              if (isInteractable && !audio.enabled) void audio.enable()
            }}
            onChange={(e) => {
              const next = Number(e.target.value) / 100
              audio.setVolume(next)
            }}
            className={cn(
              'h-1.5 w-28 cursor-pointer appearance-none rounded-full bg-white/10',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sunbronze [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(186,138,45,0.15)]',
              '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-sunbronze',
              !isInteractable ? 'opacity-60' : '',
            )}
            aria-valuetext={formatPercent(audio.volume)}
          />

          <span className="hidden text-[11px] text-vellum-200/60 sm:inline">
            {isOn ? formatPercent(audio.muted ? 0 : audio.volume) : 'aus'}
          </span>
        </div>
      </div>

      {/* Kill switch (right bottom) */}
      <div className="fixed bottom-4 right-4 z-[150]">
        <button
          type="button"
          onClick={() => {
            if (isOn) {
              audio.playSfx('sfx_toggle_off', { cooldownMs: 0 })
              audio.disable({ fadeMs: 160 })
              return
            }
            void requestEnable()
          }}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-white/10 bg-void-950/45 px-4 py-2 text-xs font-semibold text-vellum-50/90 backdrop-blur-md',
            'shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:border-white/15 hover:bg-void-950/55',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
          )}
          aria-label={isOn ? 'Audio ausschalten' : 'Audio einschalten'}
        >
          {isOn ? <Volume2 className="h-4 w-4 text-sunbronze" strokeWidth={1.5} /> : <VolumeX className="h-4 w-4 text-vellum-200/75" strokeWidth={1.5} />}
          <span className="hidden sm:inline">{isOn ? 'Audio an' : 'Audio aus'}</span>
          <span className="sm:hidden">{isOn ? 'An' : 'Aus'}</span>
        </button>
      </div>
    </>
  )
}
