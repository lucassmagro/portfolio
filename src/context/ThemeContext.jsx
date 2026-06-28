import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

/**
 * Provider de tema (claro/escuro). Centraliza o estado, a persistência em
 * localStorage e a classe `dark` no <html>, tirando essa responsabilidade do App.
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('lsm-theme')
    if (stored) return stored === 'dark'
    // Sem preferência salva: portfólio e LinkHub abrem claros (estética editorial);
    // apenas o currículo mantém o padrão escuro.
    const hash = window.location.hash || ''
    return hash.includes('resume')
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('lsm-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
  return ctx
}
