import { motion } from 'framer-motion'
import { SOCIAL_LINKS, WHATSAPP_URL, MAILTO_URL } from '../data/site.js'

// Constrói a lista de links a partir da fonte única + textos traduzidos.
const buildLinks = (t) => {
  const social = Object.fromEntries(SOCIAL_LINKS.map((s) => [s.id, s.url]))
  return [
    { name: t.links.portfolio, url: '#/' },
    { name: t.links.resume, url: '#/resume' },
    { name: t.links.github, url: social.github },
    { name: t.links.linkedin, url: social.linkedin },
    { name: t.links.instagram, url: social.instagram },
    { name: t.links.spotify, url: social.spotify },
    { name: t.links.whatsapp, url: WHATSAPP_URL },
    { name: t.links.email, url: MAILTO_URL },
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
}

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function LinkHub({ isDark, toggleTheme, toggleLang, t, lang }) {
  const socialLinks = buildLinks(t)

  const projectCards = [
    {
      href: '#/',
      img: 'linkhub-thumb.png',
      fallback:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2070&auto=format&fit=crop',
      title: t.projects.portfolio.title,
      sub: t.projects.portfolio.sub,
    },
    {
      href: 'cafeteria/index.html',
      img: 'projects/cafeteria.png',
      fallback:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      title: t.projects.cafeteria.title,
      sub: t.projects.cafeteria.sub,
    },
    {
      href: 'refit/index.html',
      img: 'refit-thumb.png',
      fallback:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
      title: t.projects.refit.title,
      sub: t.projects.refit.sub,
    },
  ]

  return (
    <div className="linkhub-page relative min-h-screen bg-paper text-edtext font-body flex flex-col items-center py-16 px-4 transition-colors duration-500">
      {/* Controles fixos: idioma + tema */}
      <button
        onClick={toggleLang}
        aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        className="fixed top-6 right-20 z-50 w-9 h-9 flex items-center justify-center rounded-full border border-edborder text-[0.65rem] font-medium tracking-[0.15em] text-edsecondary hover:border-edtext hover:text-edtext transition-colors"
      >
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>

      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        className="fixed top-6 right-6 z-50 w-9 h-9 flex items-center justify-center rounded-full border border-edborder text-edsecondary hover:border-edtext hover:text-edtext transition-colors"
      >
        {isDark ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Cabeçalho de perfil */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center mb-10 text-center"
      >
        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border border-edborder">
          <img src="eu1.jpg" alt="Lucas Santos Magro" className="w-full h-full object-cover" />
        </div>

        <h1 className="font-display font-normal text-edtext text-3xl sm:text-4xl tracking-[-0.02em]">
          Lucas <em className="italic">Santos</em> Magro
        </h1>

        <p className="section-label mt-4">{t.role}</p>
      </motion.div>

      {/* Lista de links */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] space-y-3"
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : '_self'}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
            variants={itemVariants}
            className="group flex items-center justify-between rounded-ed border border-edborder bg-cream px-5 py-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent"
          >
            <span className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-edbody group-hover:text-edtext transition-colors">
              {link.name}
            </span>
            <span className="text-edmuted group-hover:text-accent transition-colors">↗</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Projetos recentes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-[440px] mt-12"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px flex-1 bg-edborder" />
          <span className="section-label">{t.latest}</span>
          <div className="h-px flex-1 bg-edborder" />
        </div>

        <div className="space-y-4">
          {projectCards.map((p) => (
            <motion.a
              key={p.href}
              href={p.href}
              className="group block overflow-hidden rounded-ed border border-edborder bg-cream transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent"
            >
              <div className="relative aspect-video overflow-hidden bg-paper">
                <img
                  src={p.img}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = p.fallback
                  }}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="font-display text-lg text-edtext">{p.title}</h3>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-edmuted">{p.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Rodapé */}
      <footer className="mt-16 text-[0.65rem] uppercase tracking-[0.18em] text-edmuted">
        {t.copyright}
      </footer>
    </div>
  )
}
