import { motion } from 'framer-motion'

/**
 * CtaBanner — Premium CTA between Hero and Gallery.
 * Minimalist editorial design matching the portfolio DNA.
 */
export default function CtaBanner({ isDark, t }) {
  return (
    <section
      data-scroll-section
      className="relative z-10 flex flex-col items-center justify-center py-32 md:py-44 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
        className="flex flex-col items-center text-center max-w-2xl"
      >
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic font-gloock tracking-perry mb-6 text-perry">
          {t.headline}
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] md:text-[16px] leading-relaxed opacity-50 mb-12 max-w-lg text-perry">
          {t.sub}
        </p>

        {/* CTA Button */}
        <motion.a
          href="https://wa.me/5549991259617"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          data-cursor-text="GO"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
            isDark
              ? 'bg-white text-black hover:bg-white/90'
              : 'bg-black text-white hover:bg-black/90'
          }`}
        >
          {t.button}
          <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
            ↗
          </span>
        </motion.a>
      </motion.div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1700px] px-6 md:px-10">
        <div className="h-px w-full bg-current opacity-5" />
      </div>
    </section>
  )
}
