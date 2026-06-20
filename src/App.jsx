import { useState, useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

import { useTheme } from './context/ThemeContext.jsx'
import { useI18n } from './context/I18nContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import AboutSection from './components/AboutSection.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ParticleCanvas from './components/ParticleCanvas.jsx'
import Cursor from './components/Cursor.jsx'
import LinkHub from './pages/LinkHub.jsx'
import Resume from './pages/Resume.jsx'

export default function App() {
  const scrollRef = useRef(null)
  const lScroll = useRef(null)

  const { isDark, toggleTheme } = useTheme()
  const { lang, t, toggleLang } = useI18n()

  // Hash Routing State
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/links')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/links')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Locomotive Scroll Initialization
  useEffect(() => {
    lScroll.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      class: 'is-inview',
    })

    const handleResize = () => lScroll.current.update()
    window.addEventListener('resize', handleResize)

    return () => {
      if (lScroll.current) lScroll.current.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Sincroniza o Locomotive Scroll ao trocar de idioma (evita glitches de altura).
  // O estado de tema/idioma e sua persistência vivem nos providers de contexto.
  useEffect(() => {
    if (lScroll.current) {
      setTimeout(() => lScroll.current.update(), 100)
    }
  }, [lang])

  // Render Resume if hash contains 'resume'
  if (currentPath.includes('resume')) {
    return <Resume isDark={isDark} t={t.resume} toggleLang={toggleLang} lang={lang} />
  }

  // Render LinkHub if hash contains 'links'
  if (currentPath.includes('links')) {
    return (
      <LinkHub
        isDark={isDark}
        toggleTheme={toggleTheme}
        toggleLang={toggleLang}
        t={t.linkhub}
        lang={lang}
      />
    )
  }

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className={`relative min-h-screen font-sans selection:bg-white selection:text-black transition-colors duration-700 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <a href="#main-content" className="skip-link">
        {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>

      <ParticleCanvas isDark={isDark} />
      <Cursor />

      <Navbar
        isDark={isDark}
        onToggle={toggleTheme}
        lang={lang}
        onLangToggle={toggleLang}
        t={t.navbar}
      />

      <main id="main-content">
        <Hero t={t.hero} />
        <CtaBanner isDark={isDark} t={t.cta} />
        <Gallery t={t.projects} isDark={isDark} />
        <AboutSection t={t.about} />
      </main>

      <ScrollToTop isDark={isDark} />
      <Footer isDark={isDark} t={t.footer} />
    </div>
  )
}
