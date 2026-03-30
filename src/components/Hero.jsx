import { motion } from 'framer-motion'

/**
 * Hero Component - Final Polish March 2026
 * - Mac-style window with translated i18n content.
 * - Massive typographic headline (15vw).
 * - Vertical markers updated to 2026.
 */
export default function Hero({ isDark, t }) {
  return (
    <section 
      id="home" 
      data-scroll-section
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-40 overflow-hidden"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 w-full relative z-10">
        
        {/* The Window Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
          className="window-outline w-full"
        >
          <div className="window-glass relative overflow-hidden p-1">
            
            {/* Top Bar with Traffic Lights */}
            <div className="flex items-center gap-2 px-6 py-5 border-b border-white border-opacity-5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f46b5d] shadow-[0_0_15px_rgba(244,107,93,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#f9bd4e] shadow-[0_0_15px_rgba(249,189,78,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#57c353] shadow-[0_0_15px_rgba(87,195,83,0.4)]" />
              </div>
            </div>

            {/* Window Content */}
            <div className="relative pt-24 pb-32 px-6 md:px-16 text-center">
              {/* Shine Overlay */}
              <div className="shine-wrapper opacity-10">
                <div className="shine-item w-[60px] left-[30%]" />
                <div className="shine-item w-[15px] left-[54%]" />
              </div>

              {/* Massive Typographic Headline */}
              <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-[clamp(3.5rem,15vw,14rem)] font-black leading-perry tracking-perry uppercase">
                  LUCAS <br />
                  <span className="font-gloock normal-case italic opacity-95">Santos</span> <br />
                  MAGRO
                </h1>
                
                <div className="mt-16 max-w-2xl mx-auto">
                  <p className="text-[12px] font-bold uppercase tracking-[0.4em] mb-6 opacity-30">
                    {t.tag}
                  </p>
                  <p className="text-xl md:text-2xl leading-relaxed opacity-60">
                    {t.intro}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical markers */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block overflow-hidden h-[360px]">
        <span className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-10 vertical-text block h-full">
          {t.marker}
        </span>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="opacity-30"
        >
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  )
}
