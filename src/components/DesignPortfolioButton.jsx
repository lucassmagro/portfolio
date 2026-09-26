import { useEffect, useState } from 'react'

// Cores do portfólio de design (bento em tons pastel), usadas como "prévia" no ícone.
const PREVIEW_COLORS = ['#b4c5d6', '#cdd8bf', '#e2d4bd', '#c0714f']

/**
 * DesignPortfolioButton — pílula flutuante no canto inferior esquerdo que leva ao
 * portfólio de design (/portfolio-ui-ux/). O canto direito fica com o ScrollToTop.
 * - Entra com um leve atraso para não competir com a animação do hero.
 * - No celular só aparece depois de rolar (senão cobre o indicador "Role" do hero).
 * - Some quando o rodapé entra na tela (senão cobre o copyright).
 */
export default function DesignPortfolioButton({ t }) {
  const [ready, setReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200)

    const media = window.matchMedia('(min-width: 768px)')
    const onMedia = () => setIsDesktop(media.matches)
    onMedia()
    media.addEventListener('change', onMedia)

    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const footer = document.getElementById('footer-connect')
    const observer = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
      : null
    if (footer) observer.observe(footer)

    return () => {
      window.clearTimeout(timer)
      media.removeEventListener('change', onMedia)
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  const visible = ready && !footerInView && (isDesktop || scrolled)

  return (
    <a
      href="portfolio-ui-ux/index.html"
      aria-label={t.label}
      className={`group fixed bottom-6 left-4 z-50 flex items-center gap-3 rounded-full border border-edborder bg-paper py-2 pl-2 pr-4 text-edtext shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent hover:shadow-xl md:bottom-8 md:left-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      {/* Mini grade 2x2: lembra o layout em cards do portfólio de design */}
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 grid-cols-2 gap-[3px] rounded-full bg-cream p-[7px] transition-transform duration-500 group-hover:rotate-90"
      >
        {PREVIEW_COLORS.map((color) => (
          <span key={color} className="rounded-[2px]" style={{ backgroundColor: color }} />
        ))}
      </span>

      <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em]">
        <span className="sm:hidden">{t.short}</span>
        <span className="hidden sm:inline">{t.label}</span>
      </span>

      <svg
        aria-hidden="true"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        <path
          d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
