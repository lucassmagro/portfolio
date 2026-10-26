import { useEffect, useState } from 'react'
import { whatsappComMensagem } from '../data/site.js'

/**
 * WhatsAppButton — atalho flutuante para pedir orçamento, no canto inferior
 * direito. Aparece depois de sair do hero (que já tem o mesmo CTA) e some
 * sobre o rodapé, que tem o contato completo.
 */
export default function WhatsAppButton({ label, mensagem }) {
  const [scrolled, setScrolled] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const footer = document.getElementById('footer-connect')
    const observer = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
      : null
    if (footer) observer.observe(footer)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  const visible = scrolled && !footerInView

  return (
    <a
      href={whatsappComMensagem(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full bg-[#157a44] py-3 pl-3 pr-5 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#106436] md:bottom-8 md:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02zM12.04 20.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
      </svg>
      <span className="text-[0.8rem] font-medium uppercase tracking-[0.06em]">{label}</span>
    </a>
  )
}
