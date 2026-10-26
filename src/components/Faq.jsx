import { useInView } from '../hooks/useInView.js'

/**
 * Faq — as dúvidas que aparecem antes de alguém pedir orçamento (prazo, o que
 * está incluído, conteúdo, alterações, atendimento a distância). Usa
 * <details>, que já é acessível por teclado e leitor de tela.
 */
export default function Faq({ t }) {
  const [ref, inView] = useInView()
  return (
    <section id="faq" className="relative pb-24 md:pb-32">
      <div className="max-w-[820px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''}`}>
          <span className="section-label mb-4">{t.section}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.6rem,3.5vw,2.4rem)] tracking-[-0.01em]">
            {t.title}
          </h2>
        </div>

        <div className="mt-8 border-t border-edborder">
          {t.items.map((item, i) => (
            <details key={item.q} className="group border-b border-edborder" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium text-edtext hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-edmuted transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[0.95rem] leading-[1.7] text-edsecondary">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
