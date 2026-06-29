import ProjectCard from './ProjectCard.jsx'
import { useInView } from '../hooks/useInView.js'

/**
 * Gallery — grid editorial de projetos ("Editorial Zen").
 * - Cabeçalho com rótulo, título serif e divisor fino.
 * - Cards em grid responsivo de 2 colunas.
 */
export default function Gallery({ t }) {
  const { items: projects, title, section: sectionLabel } = t
  const [headRef, headIn] = useInView({ margin: '0px' })
  return (
    <section id="projects" data-scroll-section className="relative py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        {/* Cabeçalho de seção */}
        <div ref={headRef} className={`mb-14 md:mb-20 reveal ${headIn ? 'is-visible' : ''}`}>
          <span className="section-label mb-4">{sectionLabel}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.01em]">
            {title}
          </h2>
          <span className="ed-divider mt-6" />
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              labels={t}
              index={i}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
