import { motion } from 'framer-motion'

/**
 * ProjectCard — card de projeto editorial ("Editorial Zen").
 * Superfície clara com borda fina que ganha a cor de acento no hover, com leve
 * translateY. A imagem aplica zoom sutil no hover e o corpo traz o enquadramento
 * Desafio/Solução. Projetos sem link (comingSoon) exibem o selo "em breve".
 */
export default function ProjectCard({ project, labels, index = 0, priority = false }) {
  const isExternal = (href) => href?.startsWith('http') || href?.startsWith('mailto')
  const href = project.comingSoon ? null : project.href
  const imageSrc = project.customImage || `projects/${project.id}.png`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: priority ? 0 : (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-ed border border-edborder bg-cream transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent">
        {/* Mídia */}
        <CardMedia href={href} isExternal={isExternal(href)} title={project.title} labels={labels}>
          <div className="relative aspect-[16/10] overflow-hidden bg-paper">
            <img
              src={imageSrc}
              alt={`Pré-visualização do projeto ${project.title}`}
              width="1200"
              height="750"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {project.comingSoon && (
              <span className="absolute left-4 top-4 z-10 rounded-edsm bg-black/70 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                {labels.soon}
              </span>
            )}
          </div>
        </CardMedia>

        {/* Corpo */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h3 className="font-display text-2xl font-normal text-edtext tracking-[-0.01em]">
            {project.title}
          </h3>

          <p className="mt-3 text-[0.9rem] leading-[1.65] text-edsecondary">{project.brief}</p>

          {(project.challenge || project.solution) && (
            <div className="mt-6 grid gap-5 border-t border-edborderfaint pt-6 sm:grid-cols-2">
              {project.challenge && (
                <div>
                  <h4 className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent">
                    {labels.challengeLabel}
                  </h4>
                  <p className="text-[0.8rem] leading-relaxed text-edbody">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h4 className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent">
                    {labels.solutionLabel}
                  </h4>
                  <p className="text-[0.8rem] leading-relaxed text-edbody">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.65rem] uppercase tracking-[0.16em] text-edmuted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Ações */}
          {(href || project.reworkedHref) && (
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-edborderfaint pt-6">
              {href && (
                <a
                  href={href}
                  target={isExternal(href) ? '_blank' : '_self'}
                  rel={isExternal(href) ? 'noopener noreferrer' : ''}
                  className="btn-ed btn-ed--primary"
                >
                  {labels.view} ↗
                </a>
              )}
              {project.reworkedHref && (
                <a href={project.reworkedHref} className="btn-ed btn-ed--outline">
                  {labels.reworked}
                </a>
              )}
            </div>
          )}
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
      aria-label={`${labels.view}: ${title}`}
      className="block"
    >
      {children}
    </a>
  )
}
