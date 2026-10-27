import { useState } from 'react'
import { useInView } from '../hooks/useInView.js'

/**
 * Gallery — o que já foi feito, para quem procura um site.
 * - O case real (projeto com `caseReal`) em destaque, grande, com o contexto
 *   do trabalho.
 * - Abaixo, "Veja um site do seu ramo": os sites modelo em cards enxutos, com
 *   filtro por ramo (`ramo` de cada projeto), para o visitante achar rápido um
 *   negócio parecido com o seu.
 * - Miniaturas em `public/projects/mockup-*.webp` (1200 px) com a variante
 *   -640 ao lado, usada no srcset.
 */
export default function Gallery({ t }) {
  const featured = t.items.filter((p) => p.featured)
  const caso = featured.find((p) => p.caseReal)
  const ordem = t.filters.map((f) => f.id)
  const modelos = featured
    .filter((p) => !p.caseReal)
    .sort((a, b) => ordem.indexOf(a.ramo) - ordem.indexOf(b.ramo))
  const filtros = t.filters.filter((f) => f.id === 'todos' || modelos.some((m) => m.ramo === f.id))
  const [filtro, setFiltro] = useState('todos')
  const visiveis = filtro === 'todos' ? modelos : modelos.filter((m) => m.ramo === filtro)
  const [headRef, headIn] = useInView({ margin: '0px' })
  const [modelosRef, modelosIn] = useInView()

  return (
    <section id="projects" data-scroll-section className="relative py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div ref={headRef} className={`mb-12 md:mb-16 reveal ${headIn ? 'is-visible' : ''}`}>
          <span className="section-label mb-4">{t.section}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.01em]">
            {t.title}
          </h2>
          <span className="ed-divider mt-6" />
        </div>

        {caso && <CaseReal projeto={caso} t={t} />}

        <div ref={modelosRef} className={`mt-20 md:mt-28 reveal ${modelosIn ? 'is-visible' : ''}`}>
          <div>
            <div className="max-w-2xl">
              <h3 className="font-display font-normal text-edtext text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.01em]">
                {t.modelsTitle}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-edsecondary">{t.modelsSub}</p>
            </div>
            {/* No celular os filtros ficam numa linha que rola de lado */}
            <div
              className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              role="group"
              aria-label={t.filterLabel}
            >
              {filtros.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filtro === f.id}
                  onClick={() => setFiltro(f.id)}
                  className="min-h-[40px] shrink-0 rounded-full border border-edborder px-4 text-[0.8rem] text-edbody transition-colors hover:border-edtext aria-pressed:border-edtext aria-pressed:bg-edtext aria-pressed:text-paper"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duas colunas já no celular: dá para ver vários ramos sem rolar muito */}
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
            {visiveis.map((m) => (
              <li key={m.id}>
                <CardModelo projeto={m} t={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** srcset para as miniaturas locais (-640 ao lado da de 1200 px). */
function srcSetDe(src) {
  return src.endsWith('.webp')
    ? `${src.replace(/\.webp$/, '-640.webp')} 640w, ${src} 1200w`
    : undefined
}

function CaseReal({ projeto, t }) {
  const [ref, inView] = useInView()
  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 overflow-hidden rounded-ed border border-edborder bg-cream lg:grid-cols-[1.35fr_1fr] reveal ${
        inView ? 'is-visible' : ''
      }`}
    >
      <a
        href={projeto.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        // Mesma cor do fundo da miniatura: a imagem fica inteira, centralizada,
        // sem ser esticada até a altura do texto.
        className="group flex items-center overflow-hidden bg-[#e3e6ea]"
      >
        <img
          src={projeto.customImage}
          srcSet={srcSetDe(projeto.customImage)}
          sizes="(max-width: 1024px) 100vw, 620px"
          alt=""
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </a>
      <div className="flex flex-col p-7 md:p-10">
        <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent">
          {t.caseLabel}
        </span>
        <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.01em] text-edtext">
          {projeto.title}
        </h3>
        <p className="mt-1 text-[0.85rem] text-edsecondary">{projeto.sector}</p>
        <p className="mt-5 text-[0.92rem] leading-[1.7] text-edbody">{projeto.brief}</p>
        <dl className="mt-6 space-y-4 border-t border-edborder pt-6 text-[0.85rem] leading-[1.6]">
          <div>
            <dt className="font-medium text-edtext">{t.challengeLabel}</dt>
            <dd className="mt-1 text-edsecondary">{projeto.challenge}</dd>
          </div>
          <div>
            <dt className="font-medium text-edtext">{t.solutionLabel}</dt>
            <dd className="mt-1 text-edsecondary">{projeto.solution}</dd>
          </div>
        </dl>
        <a
          href={projeto.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ed btn-ed--primary mt-8 self-start"
        >
          {t.caseCta} ↗
        </a>
      </div>
    </article>
  )
}

function CardModelo({ projeto, t }) {
  return (
    <a
      href={projeto.href}
      className="group flex h-full flex-col overflow-hidden rounded-ed border border-edborder bg-cream transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent"
    >
      <div className="aspect-[16/10] overflow-hidden bg-paper">
        <img
          src={projeto.customImage}
          srcSet={srcSetDe(projeto.customImage)}
          sizes="(max-width: 1024px) 50vw, 260px"
          alt=""
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h4 className="font-display text-lg font-normal tracking-[-0.01em] text-edtext sm:text-xl">
          {projeto.title}
        </h4>
        <p className="mt-1 text-[0.8rem] leading-snug text-edsecondary sm:text-[0.85rem]">
          {projeto.sector}
        </p>
        <span className="mt-auto pt-3 text-[0.8rem] font-medium sm:pt-4 text-edtext underline decoration-edborder underline-offset-4 transition-colors group-hover:text-accent group-hover:decoration-current">
          {t.view}
        </span>
      </div>
    </a>
  )
}
