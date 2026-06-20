import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * ProjectCard — estudo de caso 2026
 * - Enquadramento Desafio -> Solução em vez de tile de folheto.
 * - Screenshots reais de public/projects/*.
 * - Ações: ver projeto, ver versão reformulada (teste_alteracoes) e ver original.
 * - Projetos sem link (comingSoon) renderizam um selo "em breve" — nunca href="#".
 */
export default function ProjectCard({ project, labels, isDark, priority = false }) {
  const containerRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  const isExternal = (href) => href?.startsWith('http') || href?.startsWith('mailto')
  const href = project.comingSoon ? null : project.href
  const imageSrc = project.customImage || `projects/${project.id}.png`

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.98, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, delay: priority ? 0 : 0.1, ease: [0.165, 0.84, 0.44, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group w-full"
    >
      <div className="window-outline p-1.5 overflow-hidden">
        <div className="glare-top opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="project-card-bg relative overflow-hidden rounded-[16px]">
          {/* Camada de imagem imersiva (link primário quando houver) */}
          <CardMedia
            href={href}
            isExternal={isExternal(href)}
            title={project.title}
            labels={labels}
          >
            <div className="relative overflow-hidden aspect-[16/9] lg:aspect-[16/8] bg-neutral-900 border-b border-white border-opacity-5">
              <motion.div
                style={{ y: smoothY, scale: 1.1 }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={imageSrc}
                  alt={`Pré-visualização do projeto ${project.title}`}
                  width="1200"
                  height="675"
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hovered ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-60 scale-110'
                  }`}
                />
              </motion.div>

              {project.comingSoon && (
                <span className="absolute top-5 left-5 z-20 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                  {labels.soon}
                </span>
              )}

              <div
                className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                  hovered ? 'opacity-20' : 'opacity-0'
                } bg-gradient-to-tr from-white via-transparent to-white`}
              />
            </div>
          </CardMedia>

          {/* Painel de informação — contraste forçado para legibilidade */}
          <div className="p-10 md:p-14 lg:p-16 relative z-20 bg-white bg-opacity-[0.02] backdrop-blur-3xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <div className="max-w-2xl px-2">
                <h3 className="text-4xl md:text-6xl font-black italic tracking-perry font-gloock mb-6 uppercase text-perry">
                  {project.title}
                </h3>

                <p className="text-[15px] md:text-[16px] leading-relaxed mb-8 text-perry opacity-70">
                  {project.brief}
                </p>

                {/* Bloco Desafio -> Solução */}
                {(project.challenge || project.solution) && (
                  <div className="grid sm:grid-cols-2 gap-6 mb-10 border-t border-current border-opacity-10 pt-8">
                    {project.challenge && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-perry opacity-40 mb-3">
                          {labels.challengeLabel}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-perry opacity-70">
                          {project.challenge}
                        </p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-perry opacity-40 mb-3">
                          {labels.solutionLabel}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-perry opacity-70">
                          {project.solution}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] uppercase tracking-[0.4em] font-bold text-perry opacity-40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Círculo de ação */}
              {href && (
                <a
                  href={href}
                  target={isExternal(href) ? '_blank' : '_self'}
                  rel={isExternal(href) ? 'noopener noreferrer' : ''}
                  aria-label={`${labels.view} — ${project.title}`}
                  data-cursor-hover
                  data-cursor-text={labels.view}
                  className="flex items-center justify-center w-16 h-16 rounded-full border border-current border-opacity-10 group-hover:border-opacity-100 transition-all duration-700 group-hover:scale-110 shrink-0"
                >
                  <span className="text-3xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-perry">
                    ↗
                  </span>
                </a>
              )}
            </div>

            {/* Linha de ações: ver projeto / versão reformulada / original */}
            {(href || project.reworkedHref) && (
              <div className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t border-current border-opacity-10">
                {href && (
                  <a
                    href={href}
                    target={isExternal(href) ? '_blank' : '_self'}
                    rel={isExternal(href) ? 'noopener noreferrer' : ''}
                    data-cursor-hover
                    className={`text-[11px] font-bold uppercase tracking-[0.25em] px-6 py-3 rounded-full transition-colors ${
                      isDark
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    {labels.view} ↗
                  </a>
                )}
                {project.reworkedHref && (
                  <a
                    href={project.reworkedHref}
                    data-cursor-hover
                    className="text-[11px] font-bold uppercase tracking-[0.25em] px-6 py-3 rounded-full border border-current border-opacity-30 hover:border-opacity-100 transition-all text-perry"
                  >
                    ✦ {labels.reworked}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Textura/grão sutil */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.04] transition-opacity duration-1000 pointer-events-none" />
        </div>
      </div>
    </motion.article>
  )
}

/** Envolve a mídia em link apenas quando há destino (evita href="#"). */
function CardMedia({ href, isExternal, title, labels, children }) {
  if (!href) return <div className="block">{children}</div>
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : ''}
      aria-label={`${labels.view} — ${title}`}
      data-cursor-hover
      data-cursor-text={labels.view}
      className="block"
    >
      {children}
    </a>
  )
}
