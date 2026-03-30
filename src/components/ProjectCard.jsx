import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * ProjectCard - Final Refinement 2026
 * - Focus: High Contrast Legibility (Strict #000 in Light Mode).
 * - Component: Fixed Immersive Width.
 * - Glass: Adaptive Blur & Sharp Text.
 */
export default function ProjectCard({ project, isDark, index, priority = false }) {
  const containerRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  const isExternal = project.href?.startsWith('http') || project.href?.startsWith('mailto')

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.98, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: priority ? 0 : 0.1, ease: [0.165, 0.84, 0.44, 1] }}
      className="relative group w-full"
    >
      <a
        href={project.href || '#'}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor-hover
        data-cursor-text="VIEW"
        className="block"
      >
        {/* Project Card Outline (Outer Layer) */}
        <div className="window-outline p-1.5 overflow-hidden">
          
          <div className="glare-top opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="project-card-bg relative overflow-hidden rounded-[16px]">
            
            {/* Immersive Image Layer */}
            <div className="relative overflow-hidden aspect-[16/9] lg:aspect-[16/8] bg-neutral-900 border-b border-white border-opacity-5">
              <motion.div 
                style={{ y: smoothY, scale: 1.1 }} 
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={project.customImage || `/projects/${project.id}.png`}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hovered ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-60 scale-110'
                  }`}
                />
                {/* REPLACE WITH REAL SCREENSHOT: img/catedra_thumb.png */}
              </motion.div>
              
              <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                hovered ? 'opacity-20' : 'opacity-0'
              } bg-gradient-to-tr from-white via-transparent to-white`} />
            </div>

            {/* Project Info Panel - Forced Contrast Legibility */}
            <div className="p-10 md:p-14 lg:p-16 relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 bg-white bg-opacity-[0.02] backdrop-blur-3xl">
              <div className="max-w-2xl px-2">
                <h3 className="text-4xl md:text-6xl font-black italic tracking-perry font-gloock mb-8 uppercase text-perry">
                  {project.title}
                </h3>
                
                <p className="text-[15px] md:text-[16px] leading-relaxed mb-10 text-perry opacity-70">
                  {project.brief}
                </p>

                <div className="flex flex-wrap gap-5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] uppercase tracking-[0.4em] font-bold text-perry opacity-40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full border border-current border-opacity-10 group-hover:border-opacity-100 transition-all duration-700 group-hover:scale-110">
                <span className="text-3xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-perry">↗</span>
              </div>
            </div>

            {/* Subtle Texture/Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            {/* Selective Glow on Hover */}
            <div className={`absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.04] transition-opacity duration-1000 pointer-events-none`} />
          </div>
        </div>
      </a>
    </motion.article>
  )
}
