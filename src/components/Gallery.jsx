import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard.jsx'

/**
 * Gallery — grid editorial de projetos ("Editorial Zen").
 * - Cabeçalho com rótulo, título serif e divisor fino.
 * - Cards em grid responsivo de 2 colunas.
 */
export default function Gallery({ t }) {
  const { items: projects, title, section: sectionLabel } = t
  return (
    <section id="projects" data-scroll-section className="relative py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        {/* Cabeçalho de seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <span className="section-label mb-4">{sectionLabel}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.01em]">
            {title}
          </h2>
          <span className="ed-divider mt-6" />
        </motion.div>

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
