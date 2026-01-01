import { DEFAULT_SOUND_GAIN, getSoundUrlCandidates, type AudioChannel, type SoundKey } from './sounds'

type FadeShape = 'exp'

export interface SmartFadeOptions {
  /**
   * Fade duration in milliseconds.
   * Internally we use an exponential "setTargetAtTime" curve (organic, no hard cut).
   */
  durationMs: number
  shape?: FadeShape
}

export interface PlayOptions {
  channel?: AudioChannel
  /**
   * Per-sound gain multiplier (before channel/master volume).
   */
  gain?: number
  /**
   * Fade-in to avoid clicks.
   */
  fadeIn?: SmartFadeOptions
  /**
   * If true, the same channel is faded out before playing the next sound.
   */
  interrupt?: {
    fadeOut?: SmartFadeOptions
  }
}

interface ActivePlayback {
  key: SoundKey
  channel: AudioChannel
  source: AudioBufferSourceNode
  gain: GainNode
}

function clamp01(value: number) {
  if (Number.isNaN(value)) return 0
  return Math.min(1, Math.max(0, value))
}

function now(ctx: AudioContext) {
  return ctx.currentTime
}

function timeConstantForDuration(durationMs: number) {
  // setTargetAtTime reaches ~99.9% in ~6.9 * timeConstant.
  // We want "effectively done" at durationMs.
  const durationSec = Math.max(0.001, durationMs / 1000)
  return durationSec / 6.9
}

function decodeAudioDataSafe(ctx: AudioContext, arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
  // Safari still supports callback form; modern browsers return a Promise.
  const maybePromise = ctx.decodeAudioData(arrayBuffer as ArrayBuffer)
  if (maybePromise && typeof (maybePromise as any).then === 'function') {
    return maybePromise as Promise<AudioBuffer>
  }

  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(
      arrayBuffer,
      (buffer) => resolve(buffer),
      (err) => reject(err),
    )
  })
}

export class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private channelGain: Record<AudioChannel, GainNode | null> = { voice: null, sfx: null }

  private buffers = new Map<SoundKey, AudioBuffer>()
  private inflight = new Map<SoundKey, Promise<AudioBuffer>>()

  private active: Partial<Record<AudioChannel, ActivePlayback>> = {}

  private volume = 0.85
  private muted = false

  get isInitialized() {
    return this.ctx !== null
  }

  get isSuspended() {
    return this.ctx?.state === 'suspended'
  }

  async ensure() {
    if (this.ctx) return

    const Ctx =
      typeof window !== 'undefined'
        ? (window.AudioContext || (window as any).webkitAudioContext)
        : undefined

    if (!Ctx) {
      throw new Error('Web Audio API not supported in this environment.')
    }

    const ctx = new Ctx()
    const masterGain = ctx.createGain()
    const sfxGain = ctx.createGain()
    const voiceGain = ctx.createGain()

    sfxGain.connect(masterGain)
    voiceGain.connect(masterGain)
    masterGain.connect(ctx.destination)

    this.ctx = ctx
    this.masterGain = masterGain
    this.channelGain = { sfx: sfxGain, voice: voiceGain }

    this.applyMasterVolume({ immediate: true })
  }

  async resume() {
    await this.ensure()
    if (!this.ctx) return
    if (this.ctx.state === 'running') return
    await this.ctx.resume()
  }

  async suspend() {
    if (!this.ctx) return
    if (this.ctx.state !== 'running') return
    await this.ctx.suspend()
  }

  setVolume(volume: number) {
    this.volume = clamp01(volume)
    this.applyMasterVolume({ immediate: false })
  }

  setMuted(muted: boolean) {
    this.muted = muted
    this.applyMasterVolume({ immediate: false })
  }

  private applyMasterVolume({ immediate }: { immediate: boolean }) {
    const ctx = this.ctx
    const masterGain = this.masterGain
    if (!ctx || !masterGain) return

    const target = this.muted ? 0 : this.volume
    const t = now(ctx)

    masterGain.gain.cancelScheduledValues(t)
    if (immediate) {
      masterGain.gain.setValueAtTime(target, t)
      return
    }

    // Smooth slider updates without lag.
    masterGain.gain.setTargetAtTime(target, t, 0.03)
  }

  async preload(keys: SoundKey[]) {
    await this.ensure()
    await Promise.allSettled(keys.map((k) => this.loadBuffer(k)))
  }

  async play(key: SoundKey, options: PlayOptions = {}) {
    await this.ensure()
    const ctx = this.ctx
    if (!ctx) return

    const channel: AudioChannel = options.channel ?? (key.startsWith('voice_') ? 'voice' : 'sfx')
    const channelGain = this.channelGain[channel]
    if (!channelGain) return

    if (options.interrupt?.fadeOut) {
      this.stopChannel(channel, options.interrupt.fadeOut)
    } else if (this.active[channel]) {
      // Default: keep channels exclusive (prevents layering / spam).
      this.stopChannel(channel, { durationMs: 120 })
    }

    const buffer = await this.loadBuffer(key)
    const source = ctx.createBufferSource()
    source.buffer = buffer

    const gain = ctx.createGain()
    const baseGain = options.gain ?? DEFAULT_SOUND_GAIN[key] ?? 1

    source.connect(gain)
    gain.connect(channelGain)

    const t0 = now(ctx)

    // Start very low, then fade-in (organic, prevents clicks).
    const startValue = 0.0001
    gain.gain.setValueAtTime(startValue, t0)

    const fadeIn = options.fadeIn ?? { durationMs: 42, shape: 'exp' }
    this.smartFade(gain.gain, baseGain, fadeIn)

    const active: ActivePlayback = { key, channel, source, gain }
    this.active[channel] = active

    source.onended = () => {
      // Cleanup if this is still the active one.
      if (this.active[channel]?.source === source) {
        delete this.active[channel]
      }

      try {
        source.disconnect()
      } catch {
        // ignore
      }
      try {
        gain.disconnect()
      } catch {
        // ignore
      }
    }

    source.start()
  }

  stopAll(fadeOut: SmartFadeOptions = { durationMs: 140, shape: 'exp' }) {
    this.stopChannel('sfx', fadeOut)
    this.stopChannel('voice', fadeOut)
  }

  stopChannel(channel: AudioChannel, fadeOut: SmartFadeOptions = { durationMs: 140, shape: 'exp' }) {
    const ctx = this.ctx
    const active = this.active[channel]
    if (!ctx || !active) return

    const { source, gain } = active
    delete this.active[channel]

    const t0 = now(ctx)
    const durationSec = Math.max(0.01, fadeOut.durationMs / 1000)

    gain.gain.cancelScheduledValues(t0)

    // Keep current value to avoid "jump" when interrupting fades.
    const current = Math.max(0.0001, gain.gain.value)
    gain.gain.setValueAtTime(current, t0)

    this.smartFade(gain.gain, 0.0001, fadeOut)

    try {
      source.stop(t0 + durationSec)
    } catch {
      // ignore double-stop
    }
  }

  private smartFade(param: AudioParam, target: number, options: SmartFadeOptions) {
    const ctx = this.ctx
    if (!ctx) return

    const t0 = now(ctx)
    const shape = options.shape ?? 'exp'

    param.cancelScheduledValues(t0)

    const current = Math.max(0.0001, param.value)
    param.setValueAtTime(current, t0)

    if (shape === 'exp') {
      const tau = timeConstantForDuration(options.durationMs)
      // For exponential curves, avoid reaching exact 0 (log singularity).
      const safeTarget = target <= 0 ? 0.0001 : target
      param.setTargetAtTime(safeTarget, t0, tau)
      return
    }
  }

  private async loadBuffer(key: SoundKey): Promise<AudioBuffer> {
    const cached = this.buffers.get(key)
    if (cached) return cached

    const inflight = this.inflight.get(key)
    if (inflight) return inflight

    const p = (async () => {
      await this.ensure()
      const ctx = this.ctx
      if (!ctx) throw new Error('AudioContext not initialized.')

      let lastError: unknown = null
      const candidates = getSoundUrlCandidates(key)

      for (const url of candidates) {
        try {
          const res = await fetch(url, { cache: 'force-cache' })
          if (!res.ok) {
            lastError = new Error(`Failed to load sound: ${key} (${res.status})`)
            continue
          }
          const buf = await res.arrayBuffer()
          const decoded = await decodeAudioDataSafe(ctx, buf)
          this.buffers.set(key, decoded)
          return decoded
        } catch (err) {
          lastError = err
        }
      }

      throw lastError ?? new Error(`Failed to load sound: ${key}`)
    })()

    this.inflight.set(key, p)
    try {
      const buffer = await p
      return buffer
    } finally {
      this.inflight.delete(key)
    }
  }
}

