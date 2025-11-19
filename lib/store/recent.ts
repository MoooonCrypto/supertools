import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RecentTool, RecentToolsData } from '@/types'

interface RecentToolsStore extends RecentToolsData {
  addRecentTool: (tool: Omit<RecentTool, 'usedAt'>) => void
  clearRecentTools: () => void
}

const MAX_RECENT_TOOLS = 20

export const useRecentToolsStore = create<RecentToolsStore>()(
  persist(
    (set, get) => ({
      tools: [],
      updatedAt: new Date().toISOString(),

      addRecentTool: (tool: Omit<RecentTool, 'usedAt'>) => {
        const { tools } = get()
        const newTool: RecentTool = {
          ...tool,
          usedAt: new Date().toISOString(),
        }

        // 既存のツールを削除（重複を防ぐ）
        const filteredTools = tools.filter((t) => t.id !== tool.id)

        // 新しいツールを先頭に追加し、最大数を超えたら古いものを削除
        const updatedTools = [newTool, ...filteredTools].slice(0, MAX_RECENT_TOOLS)

        set({
          tools: updatedTools,
          updatedAt: new Date().toISOString(),
        })
      },

      clearRecentTools: () => {
        set({
          tools: [],
          updatedAt: new Date().toISOString(),
        })
      },
    }),
    {
      name: 'recent_tools',
    }
  )
)
