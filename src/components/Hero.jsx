import { motion } from 'framer-motion'

/**
 * Hero — centralizado, no estilo do design de referência enviado.
 * - Saudação + nome em destaque (cor de acento), tagline e parágrafo curto.
 * - CTA em pílula e indicador de "Role" animado no rodapé da seção.
 */
export default function Hero({ t }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <h1 className="font-display font-normal text-edtext leading-[1.05] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,5rem)]">
          {t.greeting} <span className="text-accent italic">Lucas Santos Magro</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-edbody">{t.tag}</p>

        <p className="mt-5 mx-auto max-w-xl text-[0.95rem] leading-[1.75] text-edsecondary">
          {t.intro}
        </p>

        <div className="mt-9 flex justify-center">
          <a href="#projects" className="btn-ed btn-ed--pill">
            {t.ctaWork}
          </a>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#projects"
        aria-label={t.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-edmuted hover:text-accent transition-colors"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em]">{t.scroll}</span>
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.a>
    </section>
  )
}
