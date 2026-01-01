'use client'

import * as React from 'react'

import { DEFAULT_COOLDOWN_MS, type SfxKey, type VoiceKey } from './sounds'
import { useAudio } from './use-audio'

export interface AudioTriggerOptions {
  hoverSfx?: SfxKey
  clickSfx?: SfxKey
  voice?: VoiceKey
  /**
   * Override default throttling. If omitted, we use sensible defaults per key.
   */
  cooldownMs?: number
}

type AnyFn = (...args: any[]) => void

function mergeHandlers<T extends AnyFn>(a?: T, b?: T): T | undefined {
  if (!a) return b
  if (!b) return a
  return (((...args: any[]) => {
    a(...args)
    b(...args)
  }) as unknown) as T
}

/**
 * Scalable wiring: returns event props you can spread onto interactive elements.
 * It merges with existing handlers (so it won't break your UX).
 */
export function useAudioTrigger(options: AudioTriggerOptions) {
  const audio = useAudio()

  const hoverCooldown = options.cooldownMs ?? (options.hoverSfx ? DEFAULT_COOLDOWN_MS[options.hoverSfx] : 220)
  const clickCooldown = options.cooldownMs ?? (options.clickSfx ? DEFAULT_COOLDOWN_MS[options.clickSfx] : 140)
  const voiceCooldown = options.cooldownMs ?? (options.voice ? DEFAULT_COOLDOWN_MS[options.voice] : 20_000)

  return React.useMemo(() => {
    const props: Record<string, any> = {}

    if (options.hoverSfx) {
      props.onMouseEnter = (e: React.MouseEvent) => {
        void e
        audio.playSfx(options.hoverSfx!, { cooldownMs: hoverCooldown })
      }
      props.onFocus = (e: React.FocusEvent) => {
        void e
        audio.playSfx(options.hoverSfx!, { cooldownMs: hoverCooldown })
      }
    }

    if (options.clickSfx || options.voice) {
      props.onClick = (e: React.MouseEvent) => {
        void e
        if (options.clickSfx) audio.playSfx(options.clickSfx, { cooldownMs: clickCooldown })
        if (options.voice) audio.playVoice(options.voice, { cooldownMs: voiceCooldown })
      }
    }

    return props
  }, [audio, clickCooldown, hoverCooldown, voiceCooldown, options.clickSfx, options.hoverSfx, options.voice])
}

/**
 * Helper to merge audio trigger props into an existing props object.
 */
export function withAudioTriggerProps<T extends { onMouseEnter?: AnyFn; onFocus?: AnyFn; onClick?: AnyFn }>(
  baseProps: T,
  triggerProps: Partial<T>,
): T {
  return {
    ...baseProps,
    onMouseEnter: mergeHandlers(baseProps.onMouseEnter as any, triggerProps.onMouseEnter as any) as any,
    onFocus: mergeHandlers(baseProps.onFocus as any, triggerProps.onFocus as any) as any,
    onClick: mergeHandlers(baseProps.onClick as any, triggerProps.onClick as any) as any,
  }
}

