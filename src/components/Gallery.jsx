import ProjectCard from './ProjectCard.jsx'
import { useInView } from '../hooks/useInView.js'

/**
 * Gallery — sites feitos para negócios ("Editorial Zen").
 * - Cabeçalho com rótulo, título serif e divisor fino.
 * - Só os projetos com `featured`: quem procura um site quer ver negócios
 *   parecidos com o seu. Os estudos ficam em `OtherProjects`.
 */
export default function Gallery({ t }) {
  const { title, section: sectionLabel } = t
  const projects = t.items.filter((p) => p.featured)
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
