import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserSettings } from '@/types'

interface SettingsStore extends UserSettings {
  setTheme: (theme: UserSettings['theme']) => void
  setLanguage: (language: UserSettings['language']) => void
  setDefaultCategory: (category: UserSettings['defaultCategory']) => void
  setShowTutorial: (show: boolean) => void
  resetSettings: () => void
}

const defaultSettings: UserSettings = {
  theme: 'system',
  language: 'ja',
  showTutorial: true,
  updatedAt: new Date().toISOString(),
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme) => {
        set({
          theme,
          updatedAt: new Date().toISOString(),
        })
      },

      setLanguage: (language) => {
        set({
          language,
          updatedAt: new Date().toISOString(),
        })
      },

      setDefaultCategory: (defaultCategory) => {
        set({
          defaultCategory,
          updatedAt: new Date().toISOString(),
        })
      },

      setShowTutorial: (showTutorial) => {
        set({
          showTutorial,
          updatedAt: new Date().toISOString(),
        })
      },

      resetSettings: () => {
        set({
          ...defaultSettings,
          updatedAt: new Date().toISOString(),
        })
      },
    }),
    {
      name: 'user_settings',
    }
  )
)
