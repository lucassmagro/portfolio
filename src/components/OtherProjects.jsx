import { useInView } from '../hooks/useInView.js'

/**
 * OtherProjects — estudos e projetos pessoais, em lista compacta.
 * Ficam depois da oferta: mostram repertório sem disputar atenção com os
 * sites feitos para negócios.
 */
export default function OtherProjects({ t }) {
  const projects = t.items.filter((p) => !p.featured)
  const [ref, inView] = useInView()
  if (projects.length === 0) return null

  return (
    <section className="relative pb-24 md:pb-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''}`}>
          <span className="section-label mb-4">{t.othersSection}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.01em]">
            {t.othersTitle}
          </h2>
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 border-t border-edborder">
          {projects.map((p) => {
            const externo = p.href?.startsWith('http')
            return (
              <li key={p.id} className="border-b border-edborder sm:odd:pr-8 sm:even:pl-8">
                <a
                  href={p.href}
                  target={externo ? '_blank' : undefined}
                  rel={externo ? 'noopener noreferrer' : undefined}
                  className="group block py-5"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg text-edtext group-hover:text-accent transition-colors">
                      {p.title}
                    </span>
                    <span aria-hidden="true" className="text-edmuted group-hover:text-accent">
                      ↗
                    </span>
                  </span>
                  <span className="mt-1 block text-[0.88rem] leading-[1.6] text-edsecondary">
                    {p.brief}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
