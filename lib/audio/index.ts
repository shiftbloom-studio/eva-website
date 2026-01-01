'use client'

export { AudioProvider, useAudioLayer } from './audio-provider'
export { useAudio } from './use-audio'
export { useAudioTrigger, withAudioTriggerProps } from './use-audio-trigger'

export {
  DEFAULT_AUDIO_EXTS,
  DEFAULT_COOLDOWN_MS,
  DEFAULT_SOUND_GAIN,
  SOUND_CATEGORY,
  SOUND_CHANNEL,
  SFX_KEYS,
  SOUND_KEYS,
  VOICE_KEYS,
} from './sounds'

export type { AudioChannel, AudioExt, SfxKey, SoundCategory, SoundKey, VoiceKey } from './sounds'

