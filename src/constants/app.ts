import { SettingsType, SoundSettingsType } from '@/types'

export const SETTINGS_TYPE_OPTIONS: { label: string; value: SettingsType }[] = [{ label: 'sound', value: 'sound' }]

export const SOUND_SETTINGS_TYPE_OPTIONS: { label: string; value: SoundSettingsType }[] = [
  { label: 'Yozganda tovush', value: 'typing' },
  { label: 'Xatolik tovushi', value: 'error-typing' },
]
