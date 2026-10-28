import { useState } from 'react'
import { useInView } from '../hooks/useInView.js'

/**
 * Gallery — o que já foi feito, para quem procura um site.
 * - O case real (projeto com `caseReal`) em destaque, com o resumo e o link.
 * - Abaixo, "Veja um site do seu ramo": os sites modelo numa grade limpa, só a
 *   captura do site, o nome e o ramo. Filtro por ramo (`ramo` de cada projeto).
 * - Capas em `public/projects/capas/` (geradas por
 *   aurema/scripts/capas-portfolio.mjs): no computador o topo do site no
 *   computador; no celular, o topo no celular. Com mouse, a página inteira
 *   (<id>-pagina.webp) rola dentro da moldura; ela só é baixada no hover.
 */
export default function Gallery({ t }) {
  const featured = t.items.filter((p) => p.featured)
  const caso = featured.find((p) => p.caseReal)
  const ordem = t.filters.map((f) => f.id)
  const modelos = featured
    .filter((p) => !p.caseReal)
    .sort((a, b) => ordem.indexOf(a.ramo) - ordem.indexOf(b.ramo))
  const contagem = (id) =>
    id === 'todos' ? modelos.length : modelos.filter((m) => m.ramo === id).length
  const filtros = t.filters.filter((f) => contagem(f.id) > 0)
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
        </div>

        {caso && <CaseReal projeto={caso} t={t} />}

        <div ref={modelosRef} className={`mt-24 md:mt-32 reveal ${modelosIn ? 'is-visible' : ''}`}>
          <div>
            <div>
              <h3 className="font-display font-normal text-edtext text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.01em]">
                {t.modelsTitle}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.6] text-edsecondary">{t.modelsSub}</p>
            </div>
            {/* No celular os filtros ficam numa linha que rola de lado */}
            <div
              className="-mx-6 mt-4 flex gap-6 overflow-x-auto border-b border-edborderfaint px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              role="group"
              aria-label={t.filterLabel}
            >
              {filtros.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filtro === f.id}
                  onClick={() => setFiltro(f.id)}
                  className="filtro-ramo"
                >
                  {f.label}
                  <span className="filtro-ramo__n" aria-hidden="true">
                    {contagem(f.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:mt-10 lg:grid-cols-3">
            {visiveis.map((m) => (
              <li key={m.id}>
                <CardModelo projeto={m} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const capa = (id, tipo) => `projects/capas/${id}-${tipo}.webp`

/**
 * A captura do site numa moldura. No celular, a capa do celular (3:4); no
 * computador, a do computador (16:10). `rolar` liga a página inteira por
 * cima, que desce devagar enquanto o mouse está em cima.
 */
function Tela({ id, rolar, sizes, prioridade = false }) {
  const [pronta, setPronta] = useState(false)
  return (
    <div className="tela" data-rolando={(rolar && pronta) || undefined}>
      <picture>
        <source media="(max-width: 639px)" srcSet={capa(id, 'm-480')} />
        <img
          src={capa(id, 'd-640')}
          srcSet={`${capa(id, 'd-640')} 640w, ${capa(id, 'd-1000')} 1000w`}
          sizes={sizes}
          alt=""
          width="1000"
          height="625"
          loading={prioridade ? 'eager' : 'lazy'}
          decoding="async"
          className="tela__capa"
        />
      </picture>
      {rolar && (
        <img
          src={capa(id, 'pagina')}
          alt=""
          decoding="async"
          className="tela__pagina"
          onLoad={() => setPronta(true)}
        />
      )}
    </div>
  )
}

/** Só quem tem mouse ganha a prévia rolando (no toque não existe hover). */
function usePrevia() {
  const [ligada, setLigada] = useState(false)
  const ligar = () => {
    if (
      !ligada &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      setLigada(true)
  }
  return [ligada, { onPointerEnter: ligar, onFocus: ligar }]
}

function CaseReal({ projeto, t }) {
  const [ref, inView] = useInView()
  const [previa, ligar] = usePrevia()
  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-14 reveal ${
        inView ? 'is-visible' : ''
      }`}
    >
      <a
        href={projeto.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="cartao-site block"
        {...ligar}
      >
        <Tela id={projeto.id} rolar={previa} sizes="(max-width: 1024px) 100vw, 620px" />
      </a>
      <div>
        <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent">
          {t.caseLabel}
        </span>
        <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.01em] text-edtext">
          {projeto.title}
        </h3>
        <p className="mt-1 text-[0.85rem] text-edsecondary">{projeto.sector}</p>
        <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-[1.7] text-edbody">
          {projeto.brief}
        </p>
        <a
          href={projeto.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ed btn-ed--primary mt-7 inline-flex"
        >
          {t.caseCta} ↗
        </a>
      </div>
    </article>
  )
}

function CardModelo({ projeto }) {
  const [previa, ligar] = usePrevia()
  return (
    <a href={projeto.href} className="cartao-site group block" {...ligar}>
      <Tela
        id={projeto.id}
        rolar={previa}
        sizes="(max-width: 639px) 46vw, (max-width: 1024px) 46vw, 340px"
      />
      <h4 className="mt-3 font-display sm:mt-4 text-[1.05rem] font-normal tracking-[-0.01em] text-edtext sm:text-[1.3rem]">
        {projeto.title}
      </h4>
      <p className="mt-0.5 text-[0.8rem] leading-snug text-edsecondary sm:text-[0.85rem]">
        {projeto.sector}
      </p>
    </a>
  )
}
