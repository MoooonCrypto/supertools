import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavoritesData } from '@/types'

interface FavoritesStore extends FavoritesData {
  addFavorite: (toolId: string) => void
  removeFavorite: (toolId: string) => void
  isFavorite: (toolId: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      toolIds: [],
      updatedAt: new Date().toISOString(),

      addFavorite: (toolId: string) => {
        const { toolIds } = get()
        if (!toolIds.includes(toolId)) {
          set({
            toolIds: [...toolIds, toolId],
            updatedAt: new Date().toISOString(),
          })
        }
      },

      removeFavorite: (toolId: string) => {
        const { toolIds } = get()
        set({
          toolIds: toolIds.filter((id) => id !== toolId),
          updatedAt: new Date().toISOString(),
        })
      },

      isFavorite: (toolId: string) => {
        return get().toolIds.includes(toolId)
      },

      clearFavorites: () => {
        set({
          toolIds: [],
          updatedAt: new Date().toISOString(),
        })
      },
    }),
    {
      name: 'favorites',
    }
  )
)
