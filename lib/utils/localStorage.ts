export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('LocalStorage set error:', error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('LocalStorage remove error:', error)
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('LocalStorage clear error:', error)
    }
  },
}
