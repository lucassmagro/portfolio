import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Navbar 'Perry Wang' Style 2026
 * - Ultra-minimal logos and links.
 * - Language Toggle (PT/EN).
 * - Monochromatic theme toggle.
 * - Translated nav links.
 */
export default function Navbar({ isDark, onToggle, lang, onLangToggle, t }) {
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 100)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <motion.nav
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isDark ? 'text-white' : 'text-black'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 py-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" data-scroll-to className="text-xl font-black tracking-perry select-none">
          LSM.
        </a>

        {/* Navigation */}
        <div className="flex items-center gap-6 md:gap-14">
          <a
            href="#projects"
            data-scroll-to
            className="hidden md:block text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
          >
            {t.work}
          </a>
          <a
            href="#about"
            data-scroll-to
            className="hidden md:block text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
          >
            {t.about}
          </a>
          <a
            href="#footer-connect"
            data-scroll-to
            className="hidden md:block text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
          >
            {t.contact}
          </a>

          {/* Language Toggle (PT/EN) */}
          <button
            onClick={onLangToggle}
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity border-r border-current pr-4 mr-2"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          {/* Minimalist Theme Toggle */}
          <button
            onClick={onToggle}
            className="group relative flex items-center justify-center w-5 h-5 focus:outline-none"
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <motion.div
              animate={{
                scale: isDark ? 1 : 0.4,
                backgroundColor: isDark ? '#fff' : '#000',
              }}
              className="w-full h-full rounded-full"
            />
            <motion.div
              animate={{
                opacity: isDark ? 0 : 1,
                scale: isDark ? 0 : 1.2,
              }}
              className="absolute inset-0 border border-current rounded-full"
            />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
