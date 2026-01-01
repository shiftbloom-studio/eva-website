export const VOICE_KEYS = [
  'voice_welcome',
  'voice_wirtschaft',
  'voice_politik',
  'voice_krieg',
  'voice_rollenspiel',
  'voice_server_status',
  'voice_lore',
  'voice_community',
  'voice_faq',
  'voice_cta_final',
] as const

export type VoiceKey = (typeof VOICE_KEYS)[number]

export const SFX_KEYS = [
  'sfx_hover_card',
  'sfx_click_confirm',
  'sfx_toggle_off',
  'sfx_scroll_whoosh',
  'sfx_section_stinger',
  'sfx_link_hint',
  'sfx_forge_strike',
  'sfx_parchment_open',
  'sfx_heavy_door_open',
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
  voice_server_status: 'voice',
  voice_lore: 'voice',
  voice_community: 'voice',
  voice_faq: 'voice',
  voice_cta_final: 'voice',
  sfx_hover_card: 'sfx',
  sfx_click_confirm: 'sfx',
  sfx_toggle_off: 'sfx',
  sfx_scroll_whoosh: 'sfx',
  sfx_section_stinger: 'sfx',
  sfx_link_hint: 'sfx',
  sfx_forge_strike: 'sfx',
  sfx_parchment_open: 'sfx',
  sfx_heavy_door_open: 'sfx',
} as const

export type AudioChannel = 'voice' | 'sfx'

export const SOUND_CHANNEL: Record<SoundKey, AudioChannel> = {
  voice_welcome: 'voice',
  voice_wirtschaft: 'voice',
  voice_politik: 'voice',
  voice_krieg: 'voice',
  voice_rollenspiel: 'voice',
  voice_server_status: 'voice',
  voice_lore: 'voice',
  voice_community: 'voice',
  voice_faq: 'voice',
  voice_cta_final: 'voice',
  sfx_hover_card: 'sfx',
  sfx_click_confirm: 'sfx',
  sfx_toggle_off: 'sfx',
  sfx_scroll_whoosh: 'sfx',
  sfx_section_stinger: 'sfx',
  sfx_link_hint: 'sfx',
  sfx_forge_strike: 'sfx',
  sfx_parchment_open: 'sfx',
  sfx_heavy_door_open: 'sfx',
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
  voice_server_status: 25_000,
  voice_lore: 25_000,
  voice_community: 25_000,
  voice_faq: 25_000,
  voice_cta_final: 35_000,

  sfx_hover_card: 220,
  sfx_click_confirm: 120,
  sfx_toggle_off: 250,
  sfx_scroll_whoosh: 800,
  sfx_section_stinger: 900,
  sfx_link_hint: 260,
  sfx_forge_strike: 650,
  sfx_parchment_open: 550,
  sfx_heavy_door_open: 900,
} as const

export const DEFAULT_SOUND_GAIN: Record<SoundKey, number> = {
  // Voices should be present, but not overpower SFX.
  voice_welcome: 1.0,
  voice_wirtschaft: 1.0,
  voice_politik: 1.0,
  voice_krieg: 1.0,
  voice_rollenspiel: 1.0,
  voice_server_status: 1.0,
  voice_lore: 1.0,
  voice_community: 1.0,
  voice_faq: 1.0,
  voice_cta_final: 1.0,

  sfx_hover_card: 0.7,
  sfx_click_confirm: 0.75,
  sfx_toggle_off: 0.7,
  sfx_scroll_whoosh: 0.65,
  sfx_section_stinger: 0.75,
  sfx_link_hint: 0.6,
  sfx_forge_strike: 0.8,
  sfx_parchment_open: 0.72,
  sfx_heavy_door_open: 0.78,
} as const
