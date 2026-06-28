import { useState, useEffect } from 'react'

/**
 * Navbar — editorial, thin (estilo "Editorial Zen").
 * - Barra fixa com fundo creme translúcido e blur.
 * - Wordmark serif (Fraunces), links uppercase pequenos com hover azul.
 * - Toggle de idioma (PT/EN) e de tema (sol/lua) minimalistas.
 */
export default function Navbar({ isDark, onToggle, lang, onLangToggle, t }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#projects', label: t.work },
    { href: '#about', label: t.about },
    { href: '#contact', label: t.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 border-b transition-colors duration-300 ${
        scrolled ? 'border-edborderfaint' : 'border-transparent'
      }`}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--ed-paper) 92%, transparent)',
        backdropFilter: 'blur(12px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.6)',
      }}
    >
      <div className="max-w-[1100px] mx-auto h-full px-6 md:px-8 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#home"
          data-scroll-to
          className="font-display text-xl text-edtext select-none tracking-[-0.02em]"
        >
          LSM.
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-scroll-to
              className="text-[0.8rem] uppercase tracking-[0.1em] text-edsecondary hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onLangToggle}
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-edsecondary hover:text-accent transition-colors"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          <button
            onClick={onToggle}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-edborder text-edsecondary hover:border-edtext hover:text-edtext hover:scale-110 transition-all"
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
