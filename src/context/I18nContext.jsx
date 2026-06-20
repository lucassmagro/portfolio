import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations.js'

const I18nContext = createContext(null)

const detectLang = () => {
  const saved = localStorage.getItem('lsm-lang')
  if (saved) return saved
  return navigator.language.startsWith('pt') ? 'pt' : 'en'
}

/**
 * Provider de idioma (pt/en). Centraliza o estado, a persistência e a
 * sincronização do atributo lang do <html>, expondo também o dicionário `t`.
 */
export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  useEffect(() => {
    localStorage.setItem('lsm-lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'pt' ? 'en' : 'pt'))

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n deve ser usado dentro de <I18nProvider>')
  return ctx
}
