import { motion } from 'framer-motion'
import { SOCIAL_LINKS, MAILTO_URL } from '../data/site.js'

/**
 * Footer - Final Polish 2026
 * - Grid flexível de 4 colunas.
 * - Links sociais vindos de uma fonte única (data/site.js).
 * - Botão de download do currículo.
 * - Totalmente traduzido via i18n.
 */
export default function Footer({ isDark, t }) {
  return (
    <footer
      id="footer-connect"
      data-scroll-section
      className={`relative z-10 pt-section pb-12 transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-10">
        
        {/* Main Footer Grid (4-Column) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-32">
          
          {/* Column 1: Logo & Statement */}
          <div className="flex flex-col items-start">
            <div className="text-3xl font-black tracking-perry mb-8">LSM.</div>
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] opacity-30 leading-relaxed max-w-[200px]">
              {t.statement}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-10">{t.nav}</h4>
            <ul className="space-y-4">
              {[
                { label: t.links.home, target: 'home' },
                { label: t.links.work, target: 'projects' },
                { label: t.links.about, target: 'about' },
              ].map((link) => (
                <li key={link.target}>
                  <a
                    href={`#${link.target}`}
                    data-scroll-to
                    className="text-[14px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Resume */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-10">{t.contact}</h4>
            <ul className="space-y-6">
               <li>
                <a
                  href={MAILTO_URL}
                  className="text-[14px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
                >
                  {t.emailLabel}
                </a>
              </li>
              <li>
                <motion.a 
                  href="#/resume" 
                  whileHover={{ x: 5 }}
                  className="inline-block text-[12px] font-bold uppercase tracking-[0.3em] border border-current border-opacity-20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
                >
                  {t.resume}
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social / Future */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-10">{t.social}</h4>
            <div className="space-y-8">
               <p className="text-[13px] font-bold uppercase tracking-[0.2em] opacity-30 italic leading-relaxed">
                {t.availability}
              </p>
              <div className="flex gap-8">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-[12px] font-bold opacity-40 hover:opacity-100 transition-opacity"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white border-opacity-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-20">
            {t.copyright}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 italic">
            {t.madeBy}
          </p>
        </div>
      </div>
    </footer>
  )
}
