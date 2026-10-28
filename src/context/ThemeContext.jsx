import { createContext, useContext, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

const ThemeContext = createContext(null)

/**
 * Provider de tema (claro/escuro). Centraliza o estado, a persistência em
 * localStorage e a classe `dark` no <html>, tirando essa responsabilidade do App.
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('lsm-theme')
    // Sem preferência salva, todo o site abre claro (estética editorial);
    // o usuário pode alternar para o escuro, e a escolha é persistida.
    return stored === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('lsm-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  /**
   * Troca o tema. Com a View Transitions API, o tema novo se revela num
   * círculo que nasce no botão clicado (`evento`) e cobre a tela; sem ela, ou
   * com movimento reduzido, a troca é imediata.
   */
  const toggleTheme = (evento) => {
    const raiz = document.documentElement
    const proximo = !raiz.classList.contains('dark')
    const aplicar = () => {
      flushSync(() => setIsDark(proximo))
      raiz.classList.toggle('dark', proximo)
    }
    const reduzido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduzido) return aplicar()

    const caixa = evento?.currentTarget?.getBoundingClientRect?.()
    const x = caixa ? caixa.left + caixa.width / 2 : window.innerWidth - 40
    const y = caixa ? caixa.top + caixa.height / 2 : 40
    const raio = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    raiz.classList.add('trocando-tema')
    const transicao = document.startViewTransition(aplicar)
    transicao.ready
      .then(() =>
        raiz.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`],
          },
          {
            duration: 750,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        ),
      )
      .catch(() => {})
    transicao.finished.finally(() => raiz.classList.remove('trocando-tema'))
  }

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
  return ctx
}
