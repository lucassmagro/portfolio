import { useState, useEffect } from 'react'

/**
 * ScrollToTop — botão flutuante que aparece após rolar a página.
 * Fundo de acento sólido com ícone branco, para boa visibilidade sobre
 * qualquer seção (inclusive o rodapé escuro) nos dois temas.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollUp}
      aria-label="Voltar ao topo"
      className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/25 transition-all duration-300 hover:scale-110 active:scale-90 ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 10L8 5L13 10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
