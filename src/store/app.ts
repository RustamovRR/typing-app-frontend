import { create } from 'zustand'

interface IAppStore {
  isLoading: boolean
  updateAppStore: <K extends keyof Omit<IAppStore, 'updateAppStore'>>(key: K, value: IAppStore[K]) => void
}

const useAppStore = create<IAppStore>((set) => ({
  isLoading: false,
  updateAppStore: (key, value) => {
    set({ [key]: value })
  },
}))

export default useAppStore
