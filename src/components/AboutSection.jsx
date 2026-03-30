import { motion } from 'framer-motion'

/**
 * AboutSection 'Info' - Final Polish 2026
 * - i18n Bio & Details.
 * - Magnetic 'Download Resume' Button.
 * - 200px Spacing Gap to Footer.
 */
export default function AboutSection({ isDark, t }) {
  return (
    <section 
      id="about" 
      data-scroll-section 
      className="relative z-10 py-section pb-48 overflow-hidden" // pb-48 for ~200px gap
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-10">
        
        {/* Section Title */}
        <div className="mb-24 flex flex-col items-start">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-30 mb-4">
            {t.section}
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-perry font-gloock">
            {t.title}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-20 lg:gap-32 items-end">
          
          {/* Bio & Details */}
          <div className="order-2 lg:order-1">
            <div className="space-y-12 max-w-2xl">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed opacity-70">
                {t.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">{t.specialty}</h4>
                  <ul className="text-[14px] font-bold space-y-2 uppercase tracking-widest">
                    {t.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">{t.stack}</h4>
                  <ul className="text-[14px] font-bold space-y-2 uppercase tracking-widest">
                    {t.tools.map((tool, i) => (
                      <li key={i}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Resume */}
              <div className="pt-10 flex flex-wrap gap-8 items-center">
                 <motion.a 
                   href="curriculo_lucas_santos_magro.pdf" 
                   download
                   whileHover={{ scale: 1.05 }}
                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
                   className="text-[11px] font-bold uppercase tracking-[0.3em] bg-white text-black px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors"
                   data-cursor-hover
                 >
                   {t.resume}
                 </motion.a>

                <div className="flex gap-8">
                  <a 
                    href="https://linkedin.com/in/lucasmagro/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://instagram.com/lucassmagro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://github.com/lucassmagro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Portrait (eu.jpg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="window-outline w-full max-w-[450px]">
              <div className="window-glass relative overflow-hidden aspect-[3/4]">
                 <img 
                   src="eu.png" 
                   alt="Lucas Santos Magro Portrait" 
                   className="w-full h-full object-cover grayscale-0 contrast-[1.05] transition-all duration-700 hover:scale-105"
                 />
                 <div className="shine-wrapper opacity-20">
                    <div className="shine-item w-[40px] left-[20%]" />
                    <div className="shine-item w-[10px] left-[50%]" />
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
