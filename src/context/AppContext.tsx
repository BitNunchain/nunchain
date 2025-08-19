'use client'
import { createContext, useContext, useState } from 'react'

type AppState = {
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return <AppContext.Provider value={{ theme, setTheme }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
