import StarsCanvas from './StarsCanvas.jsx'

/**
 * Hero — centralizado, no estilo do design de referência enviado.
 * - Saudação + nome em destaque (cor de acento), tagline e parágrafo curto.
 * - CTA em pílula e indicador de "Role" animado no rodapé da seção.
 * - Campo de estrelas/cometas ao fundo, somente no modo escuro.
 */
export default function Hero({ t }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <StarsCanvas />

      <div className="relative z-10 max-w-3xl anim-fade-up">
        <h1 className="font-display font-normal text-edtext tracking-[-0.02em] leading-[1.08] text-[clamp(2rem,8.5vw,3.5rem)] md:leading-[1.1] md:whitespace-nowrap md:text-[clamp(1.5rem,5vw,3.75rem)]">
          {t.greeting}{' '}
          <span className="text-accent italic block md:inline">Lucas Santos Magro</span>
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
      </div>

      {/* Indicador de scroll */}
      <a
        href="#projects"
        aria-label={t.scroll}
        className="anim-fade-in absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-edmuted hover:text-accent transition-colors"
        style={{ animationDelay: '1s' }}
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em]">{t.scroll}</span>
        <svg className="anim-bounce" width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
