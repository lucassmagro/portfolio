import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard.jsx'

/**
 * Gallery - Final Refinement 2026
 * - Strict Vertical Column (Single-Column).
 * - Perfectly Centered.
 * - Massive gap-y-48 (~192px).
 * - Consistent professional width (max-w-5xl).
 */
export default function Gallery({ projects, title, sectionLabel, isDark }) {
  return (
    <section 
      id="projects" 
      data-scroll-section 
      className="relative z-10 py-section flex flex-col items-center"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 w-full mb-40">
        
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-30 mb-6">
            {sectionLabel}
          </span>
          <h2 className="text-4xl md:text-7xl font-black italic tracking-perry font-gloock">
            {title}
          </h2>
        </motion.div>
      </div>

      {/* Strictly Vertical Single-Column Project Stack */}
      <div className="w-full flex flex-col items-center gap-y-32 md:gap-y-44 px-6 md:px-10">
        {projects.map((project, i) => (
          <div 
            key={project.id}
            className="w-full max-w-5xl"
            data-scroll
            data-scroll-speed="0.6"
          >
             <ProjectCard
              project={project}
              isDark={isDark}
              index={i}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Subtle separator */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 w-full mt-48">
        <div className="h-px w-full bg-current opacity-5" />
      </div>
    </section>
  )
}
