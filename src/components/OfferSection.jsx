import { useState } from 'react'
import { CONTACT } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'

// Site modelo publicado neste mesmo domínio (pasta public/aurema).
const MODELO_URL = 'aurema/'

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-accent"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

/**
 * OfferSection — o serviço de site para negócios locais, com preço.
 * - Lista do que está incluído e passos de como funciona.
 * - Campo "nome do seu negócio" que abre o site modelo com esse nome
 *   (`?marca=`): a pessoa vê a prévia do próprio site antes de chamar.
 * - Cartão de preço com CTA para o WhatsApp, mensagem já pronta.
 */
export default function OfferSection({ t }) {
  const [ref, inView] = useInView()
  const [marca, setMarca] = useState('')

  const whatsapp = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`

  function abrirPrevia(e) {
    e.preventDefault()
    const nome = marca.trim()
    const url = nome ? `${MODELO_URL}?marca=${encodeURIComponent(nome)}` : MODELO_URL
    window.open(url, '_blank', 'noopener')
  }

  return (
    <section id="offer" data-scroll-section className="relative py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''}`}>
          <span className="section-label mb-4">{t.section}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.01em] max-w-[22ch]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.7] text-edsecondary">{t.sub}</p>
          <span className="ed-divider mt-6" />
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          {/* O que inclui + como funciona + prévia */}
          <div>
            <h3 className="section-label mb-5">{t.includedTitle}</h3>
            <ul className="space-y-3.5">
              {t.included.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-[1.6] text-edbody">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="section-label mt-12 mb-5">{t.stepsTitle}</h3>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.steps.map((step, i) => (
                <li key={step.title} className="border-t border-edborder pt-4">
                  <span className="text-[0.75rem] text-edmuted tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1 font-medium text-edtext">{step.title}</p>
                  <p className="mt-1 text-[0.85rem] leading-[1.6] text-edsecondary">{step.text}</p>
                </li>
              ))}
            </ol>

            <form
              onSubmit={abrirPrevia}
              className="mt-12 rounded-ed border border-edborder bg-cream p-5 md:p-6"
            >
              <label htmlFor="offer-marca" className="block font-medium text-edtext">
                {t.previewTitle}
              </label>
              <p className="mt-1 text-[0.85rem] leading-[1.6] text-edsecondary">{t.previewSub}</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  id="offer-marca"
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder={t.previewPlaceholder}
                  maxLength={60}
                  autoComplete="organization"
                  className="flex-1 min-h-[48px] rounded-ed border border-edborder bg-paper px-4 text-[16px] text-edtext placeholder:text-edmuted focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="btn-ed btn-ed--primary justify-center min-h-[48px]"
                >
                  {t.previewCta}
                </button>
              </div>
            </form>
          </div>

          {/* Cartão de preço */}
          <aside className="lg:sticky lg:top-24 rounded-ed border border-edborder bg-cream p-7 md:p-9">
            <span className="section-label">{t.priceLabel}</span>
            <p className="mt-3 font-display text-edtext text-[3.2rem] leading-none tracking-[-0.02em]">
              {t.price}
            </p>
            <p className="mt-2 text-[0.85rem] text-edsecondary">{t.priceNote}</p>

            <p className="mt-6 inline-flex rounded-full border border-edborder px-3 py-1 text-[0.8rem] text-edbody">
              {t.deadline}
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-edborder pt-6">
              {t.priceIncludes.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9rem] text-edbody">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ed btn-ed--pill mt-8 w-full justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02zM12.04 20.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
              </svg>
              {t.cta}
            </a>
            <a
              href={MODELO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-[0.85rem] text-edtext underline underline-offset-4 hover:text-accent transition-colors"
            >
              {t.modelLink}
            </a>
            <p className="mt-6 text-[0.8rem] leading-[1.6] text-edsecondary">{t.maintenance}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
