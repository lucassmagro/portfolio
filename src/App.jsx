import { useState, useEffect } from 'react'

import { useTheme } from './context/ThemeContext.jsx'
import { useI18n } from './context/I18nContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import LinkHub from './pages/LinkHub.jsx'
import Resume from './pages/Resume.jsx'

export default function App() {
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

  // Render Resume if hash contains 'resume'
  if (currentPath.includes('resume')) {
    return <Resume t={t.resume} toggleLang={toggleLang} lang={lang} />
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
    <div className="relative min-h-screen font-body bg-paper text-edtext transition-colors duration-700">
      <a href="#main-content" className="skip-link">
        {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>

      <Navbar
        isDark={isDark}
        onToggle={toggleTheme}
        lang={lang}
        onLangToggle={toggleLang}
        t={t.navbar}
      />

      <main id="main-content">
        <Hero t={t.hero} />
        <Gallery t={t.projects} />
        <AboutSection t={t.about} />
        <ContactSection t={t.cta} />
      </main>

      <ScrollToTop />
      <Footer t={t.footer} />
    </div>
  )
}
