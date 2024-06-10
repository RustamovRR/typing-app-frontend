import { create } from 'zustand'

interface ISoundStore {
  isDisabledTypingSound: boolean
  isDisabledErrorTypingSound: boolean
  updateSoundStore: <K extends keyof Omit<ISoundStore, 'updateSoundStore'>>(key: K, value: ISoundStore[K]) => void
}

const useSoundStore = create<ISoundStore>((set) => ({
  isDisabledTypingSound: true,
  isDisabledErrorTypingSound: true,
  updateSoundStore: (key, value) => {
    set({ [key]: value })
  },
}))

export default useSoundStore
