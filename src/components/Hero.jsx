import StarsCanvas from './StarsCanvas.jsx'
import { whatsappComMensagem } from '../data/site.js'

/**
 * Hero — centralizado, voltado a quem procura um site.
 * - Assinatura com o nome (cor de acento) e título com a oferta.
 * - Dois CTAs: WhatsApp com mensagem pronta e "ver trabalhos", e logo abaixo
 *   a prova rápida (cliente real, prazo e preço).
 * - Campo de estrelas/cometas ao fundo, somente no modo escuro.
 */
export default function Hero({ t, mensagem }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <StarsCanvas />

      <div className="relative z-10 max-w-5xl anim-fade-up">
        <p className="font-display text-lg md:text-xl text-edbody">
          {t.greeting} <span className="text-accent italic">Lucas Santos Magro</span>
        </p>

        {/* Largura e balance para o título caber em duas linhas no desktop */}
        <h1 className="mt-5 font-display font-normal text-edtext tracking-[-0.02em] leading-[1.08] text-balance text-[clamp(2.1rem,6vw,3.9rem)]">
          {t.title}
        </h1>

        <p className="mt-6 mx-auto max-w-xl text-[1rem] md:text-[1.05rem] leading-[1.7] text-edsecondary">
          {t.intro}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            href={whatsappComMensagem(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ed btn-ed--pill justify-center"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02zM12.04 20.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
            </svg>
            {t.ctaClient}
          </a>
          <a
            href="#projects"
            className="btn-ed btn-ed--outline justify-center rounded-full py-[14px]"
          >
            {t.ctaWork}
          </a>
        </div>

        {/* Prova rápida: cliente real, prazo e preço, antes de qualquer rolagem */}
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.85rem] text-edsecondary">
          {t.proof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 text-accent"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#projects"
        aria-label={t.scroll}
        className="anim-fade-in absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-edmuted hover:text-accent transition-colors"
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
