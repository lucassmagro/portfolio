import { SOCIAL_LINKS, CONTACT } from '../data/site.js'

const linkedin = SOCIAL_LINKS.find((item) => item.id === 'linkedin')

/** Cabeçalho de seção editorial: rótulo pequeno + linha fina. */
function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-5 mb-10">
      <h2 className="section-label whitespace-nowrap">{children}</h2>
      <div className="h-px w-full bg-edborder" />
    </div>
  )
}

export default function Resume({ t, toggleLang, lang }) {
  return (
    <div className="resume-print anim-fade-in min-h-screen bg-paper text-edtext font-body py-16 px-6 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        {/* Controles */}
        <div className="no-print flex justify-between items-center mb-20 gap-4">
          <a
            href="#/"
            className="text-[0.75rem] uppercase tracking-[0.15em] text-edsecondary hover:text-accent transition-colors flex items-center gap-2"
          >
            <span>←</span> {t.back}
          </a>
          <div className="flex items-center gap-5">
            <button onClick={() => window.print()} className="btn-ed btn-ed--outline">
              ↓ {t.download}
            </button>
            <button
              onClick={toggleLang}
              aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-edsecondary hover:text-accent transition-colors"
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>
        </div>

        {/* Nome */}
        <header className="mb-24">
          <h1 className="font-display font-normal tracking-[-0.02em] leading-[1.02] text-[clamp(2.8rem,7vw,5.5rem)] mb-10">
            Lucas <em className="italic">Santos</em> Magro
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[0.8rem] text-edsecondary">
            <div className="space-y-1.5">
              <p>{CONTACT.email}</p>
              <p>{t.location}</p>
            </div>
            <div className="space-y-1.5 md:text-right">
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/lucassmagro"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>

        {/* Experiência */}
        <section className="mb-24">
          <SectionTitle>{t.experience}</SectionTitle>
          <div className="space-y-12">
            {t.sections.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
                <div className="text-[0.75rem] uppercase tracking-[0.12em] text-edmuted">
                  {exp.period}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-edtext tracking-[-0.01em]">
                    {exp.company}
                  </h3>
                  <p className="text-[0.95rem] italic text-edsecondary mt-1 mb-4">{exp.role}</p>
                  <p className="text-[0.9rem] leading-relaxed text-edbody max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projetos */}
        <section className="mb-24">
          <SectionTitle>{t.projects}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.sections.projects.map((proj, i) => (
              <div key={i}>
                <div className="text-[0.7rem] uppercase tracking-[0.12em] text-edmuted mb-3">
                  {proj.period}
                </div>
                <h3 className="font-display text-lg text-edtext mb-2">{proj.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-edbody">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formação & Habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-28">
          <section>
            <SectionTitle>{t.education}</SectionTitle>
            <div className="space-y-8">
              {t.sections.education.map((edu, i) => (
                <div key={i}>
                  <div className="text-[0.7rem] uppercase tracking-[0.12em] text-edmuted mb-2">
                    {edu.period}
                  </div>
                  <h3 className="font-display text-lg text-edtext">{edu.school}</h3>
                  <p className="text-[0.9rem] italic text-edsecondary mt-0.5">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>{t.skills}</SectionTitle>
            <div className="space-y-8">
              <div>
                <h4 className="section-label mb-3">{t.langLabel}</h4>
                <p className="text-[0.95rem] leading-relaxed text-edbody">
                  {t.sections.skills.languages}
                </p>
              </div>
              <div>
                <h4 className="section-label mb-3">{t.techLabel}</h4>
                <p className="text-[0.95rem] leading-relaxed text-edbody">
                  {t.sections.skills.tools}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Rodapé */}
        <footer className="pt-12 border-t border-edborder text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-edmuted">{t.footerNote}</p>
        </footer>
      </div>
    </div>
  )
}
