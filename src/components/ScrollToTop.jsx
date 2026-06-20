import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cx, themeClasses } from '../lib/theme.js'

/**
 * ScrollToTop — Floating button that appears after scrolling down.
 * Minimalist flat design matching the portfolio DNA.
 */
export default function ScrollToTop({ isDark }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          onClick={scrollUp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor-hover
          className={cx(
            'fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-3xl transition-colors duration-500',
            themeClasses(isDark).border,
            isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10',
          )}
          aria-label="Scroll to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 10L8 5L13 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
