import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '../data/site.js'

/**
 * AboutSection — editorial ("Editorial Zen").
 * - Grid de duas colunas: texto/bio + retrato em moldura limpa.
 * - Blocos de Especialidade/Stack, prova social e CTA de currículo.
 * - Bio e detalhes via i18n; links sociais da fonte única (data/site.js).
 */
export default function AboutSection({ t }) {
  return (
    <section id="about" data-scroll-section className="relative py-24 md:py-32 bg-cream">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Texto */}
          <div className="order-2 lg:order-1">
            <span className="section-label mb-4">{t.section}</span>
            <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.01em]">
              {t.title}
            </h2>
            <span className="ed-divider mt-6 mb-8" />

            <p className="text-[0.95rem] leading-[1.8] text-edbody">{t.bio}</p>

            {/* Especialidade / Stack */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="section-label mb-3">{t.specialty}</h4>
                <ul className="space-y-1.5 text-[0.9rem] text-edbody">
                  {t.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="section-label mb-3">{t.stack}</h4>
                <ul className="space-y-1.5 text-[0.9rem] text-edbody">
                  {t.tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ações */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#/resume" className="btn-ed btn-ed--primary">
                {t.resume}
              </a>
              <div className="flex gap-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.75rem] uppercase tracking-[0.12em] text-edsecondary hover:text-accent transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Retrato */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="overflow-hidden rounded-ed border border-edborder bg-paper">
              <img
                src="eu.webp"
                alt="Retrato de Lucas Santos Magro"
                width="900"
                height="1200"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
