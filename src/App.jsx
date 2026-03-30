import { useState, useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

import { translations } from './i18n/translations.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import AboutSection from './components/AboutSection.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import LinkHub from './pages/LinkHub.jsx'
import NexusSaaS from './components/NexusSaaS.jsx'

export default function App() {
  const scrollRef = useRef(null)
  const lScroll = useRef(null)
  
  // Hash Routing State
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('lsm-theme') !== 'light'
  })

  // i18n State
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lsm-lang')
    if (saved) return saved
    return navigator.language.startsWith('pt') ? 'pt' : 'en'
  })

  const t = translations[lang]

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

  // Sync scroll on language change to prevent glitches
  useEffect(() => {
    if (lScroll.current) {
      setTimeout(() => {
        lScroll.current.update()
      }, 100)
    }
    localStorage.setItem('lsm-lang', lang)
  }, [lang])

  // Theme effect
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('lsm-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)
  const toggleLang = () => setLang((prev) => (prev === 'pt' ? 'en' : 'pt'))

  // Render LinkHub if hash contains 'links'
  if (currentPath.includes('links')) {
    return <LinkHub isDark={isDark} toggleTheme={toggleTheme} />
  }

  // Render NexusSaaS if hash contains 'nexus'
  if (currentPath.includes('nexus')) {
    return (
      <NexusSaaS 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        onLangToggle={toggleLang} 
        t={translations[lang]} 
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
      <Navbar 
        isDark={isDark} 
        onToggle={toggleTheme} 
        lang={lang} 
        onLangToggle={toggleLang} 
        t={t.navbar} 
      />

      <main>
        <Hero isDark={isDark} t={t.hero} />
        <CtaBanner isDark={isDark} t={t.cta} />
        <Gallery projects={t.projects.items} title={t.projects.title} sectionLabel={t.projects.section} isDark={isDark} />
        <AboutSection isDark={isDark} t={t.about} />
      </main>

      <ScrollToTop isDark={isDark} />
      <Footer isDark={isDark} t={t.footer} />
    </div>
  )
}
