import { SOCIAL_LINKS, MAILTO_URL, WEBSITE_URL } from '../data/site.js'

/**
 * Footer — editorial escuro ("Editorial Zen").
 * - Fundo ink (escuro mesmo no tema claro, como a referência).
 * - Grid de colunas: marca/statement, navegação, contato+currículo, social.
 * - Links sociais e e-mail vindos da fonte única (data/site.js).
 */
export default function Footer({ t }) {
  return (
    <footer
      id="footer-connect"
      data-scroll-section
      className="relative bg-ink text-ondark pt-24 pb-8"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-16 mb-16">
          {/* Marca */}
          <div>
            <a
              href={WEBSITE_URL}
              className="font-display text-2xl tracking-[-0.02em] hover:text-accent transition-colors"
            >
              LSM.
            </a>
            <p className="mt-4 max-w-[280px] text-[0.85rem] leading-[1.65] text-ondark/70">
              {t.statement}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ondark/55 mb-5">
              {t.nav}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t.links.home, target: 'home' },
                { label: t.links.work, target: 'projects' },
                { label: t.links.about, target: 'about' },
              ].map((link) => (
                <li key={link.target}>
                  <a
                    href={`#${link.target}`}
                    data-scroll-to
                    className="text-[0.85rem] text-ondark/60 hover:text-ondark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato + Social */}
          <div>
            <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ondark/55 mb-5">
              {t.contact}
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <a
                  href={MAILTO_URL}
                  className="text-[0.85rem] text-ondark/60 hover:text-ondark transition-colors"
                >
                  {t.emailLabel}
                </a>
              </li>
              <li>
                <a
                  href="#/resume"
                  className="text-[0.85rem] text-ondark/60 hover:text-ondark transition-colors"
                >
                  {t.resume}
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ondark/65 hover:text-ondark transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-ondark/10 pt-6">
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ondark/55">{t.copyright}</p>
          <a
            href={WEBSITE_URL}
            className="text-[0.7rem] uppercase tracking-[0.12em] text-ondark/65 italic hover:text-ondark transition-colors"
          >
            {t.madeBy}
          </a>
        </div>
      </div>
    </footer>
  )
}
