export type ToolCategoryType =
  | 'text'
  | 'image'
  | 'dev'
  | 'calc'
  | 'pdf'
  | 'seo'
  | 'utility'

export type ToolDifficulty = 'easy' | 'medium' | 'hard'

export type ToolPriority = 'high' | 'medium' | 'low'

export interface Tool {
  id: string
  name: string
  nameJa: string
  description: string
  category: ToolCategoryType
  difficulty: ToolDifficulty
  priority: ToolPriority
  tags: string[]
  icon?: string
  isActive: boolean
  order: number
}

export interface ToolCategory {
  id: ToolCategoryType
  name: string
  nameJa: string
  description: string
  icon: string
  order: number
}

export interface FavoritesData {
  toolIds: string[]
  updatedAt: string
}

export interface RecentTool {
  id: string
  name: string
  category: ToolCategoryType
  usedAt: string
}

export interface RecentToolsData {
  tools: RecentTool[]
  updatedAt: string
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'ja' | 'en'
  defaultCategory?: ToolCategoryType
  showTutorial: boolean
  updatedAt: string
}

export interface ToolSettings {
  [key: string]: unknown
  updatedAt: string
}
