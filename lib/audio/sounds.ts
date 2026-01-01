export const VOICE_KEYS = [
  'voice_welcome',
  'voice_wirtschaft',
  'voice_politik',
  'voice_krieg',
  'voice_rollenspiel',
] as const

export type VoiceKey = (typeof VOICE_KEYS)[number]

export const SFX_KEYS = [
  'sfx_hover_card',
  'sfx_click_confirm',
  'sfx_toggle_off',
  'sfx_scroll_whoosh',
  'sfx_section_stinger',
  'sfx_link_hint',
] as const

export type SfxKey = (typeof SFX_KEYS)[number]

export const SOUND_KEYS = [...VOICE_KEYS, ...SFX_KEYS] as const
export type SoundKey = (typeof SOUND_KEYS)[number]

export type SoundCategory = 'voice' | 'sfx'

export const SOUND_CATEGORY: Record<SoundKey, SoundCategory> = {
  voice_welcome: 'voice',
  voice_wirtschaft: 'voice',
  voice_politik: 'voice',
  voice_krieg: 'voice',
  voice_rollenspiel: 'voice',
  sfx_hover_card: 'sfx',
  sfx_click_confirm: 'sfx',
  sfx_toggle_off: 'sfx',
  sfx_scroll_whoosh: 'sfx',
  sfx_section_stinger: 'sfx',
  sfx_link_hint: 'sfx',
} as const

export type AudioChannel = 'voice' | 'sfx'

export const SOUND_CHANNEL: Record<SoundKey, AudioChannel> = {
  voice_welcome: 'voice',
  voice_wirtschaft: 'voice',
  voice_politik: 'voice',
  voice_krieg: 'voice',
  voice_rollenspiel: 'voice',
  sfx_hover_card: 'sfx',
  sfx_click_confirm: 'sfx',
  sfx_toggle_off: 'sfx',
  sfx_scroll_whoosh: 'sfx',
  sfx_section_stinger: 'sfx',
  sfx_link_hint: 'sfx',
} as const

export const DEFAULT_AUDIO_EXTS = ['.mp3', '.ogg', '.wav'] as const
export type AudioExt = (typeof DEFAULT_AUDIO_EXTS)[number]

export function getSoundUrlCandidates(key: SoundKey, exts: readonly AudioExt[] = DEFAULT_AUDIO_EXTS) {
  return exts.map((ext) => `/audio/${key}${ext}`)
}

export const DEFAULT_COOLDOWN_MS: Record<SoundKey, number> = {
  // Voices are long: keep generous cooldown to avoid spam by accident.
  voice_welcome: 60_000,
  voice_wirtschaft: 20_000,
  voice_politik: 20_000,
  voice_krieg: 20_000,
  voice_rollenspiel: 20_000,

  sfx_hover_card: 220,
  sfx_click_confirm: 120,
  sfx_toggle_off: 250,
  sfx_scroll_whoosh: 800,
  sfx_section_stinger: 900,
  sfx_link_hint: 260,
} as const

export const DEFAULT_SOUND_GAIN: Record<SoundKey, number> = {
  // Voices should be present, but not overpower SFX.
  voice_welcome: 1.0,
  voice_wirtschaft: 1.0,
  voice_politik: 1.0,
  voice_krieg: 1.0,
  voice_rollenspiel: 1.0,

  sfx_hover_card: 0.7,
  sfx_click_confirm: 0.75,
  sfx_toggle_off: 0.7,
  sfx_scroll_whoosh: 0.65,
  sfx_section_stinger: 0.75,
  sfx_link_hint: 0.6,
} as const

