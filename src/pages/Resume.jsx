import React from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, CONTACT } from '../data/site.js'

const linkedin = SOCIAL_LINKS.find((s) => s.id === 'linkedin')

export default function Resume({ isDark, t, toggleLang, lang }) {
  const bgColor = isDark ? 'bg-black' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-black'
  const borderColor = isDark ? 'border-white/10' : 'border-black/10'
  const mutedTextColor = isDark ? 'text-white/40' : 'text-black/40'

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`resume-print min-h-screen ${bgColor} ${textColor} font-sans py-20 px-6 md:px-10 selection:bg-white selection:text-black`}
    >
      <div className="max-w-[1000px] mx-auto">

        {/* Header Controls */}
        <div className="no-print flex justify-between items-center mb-24 gap-4">
          <a
            href="#/"
            className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
          >
            <span>←</span> {t.back}
          </a>
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.print()}
              className={`text-[11px] font-bold uppercase tracking-[0.3em] px-5 py-2.5 rounded-full border transition-all ${borderColor} hover:opacity-100 opacity-70`}
            >
              ↓ {t.download}
            </button>
            <button
              onClick={toggleLang}
              aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>
        </div>

        {/* Name Header */}
        <header className="mb-32">
          <h1 className="flex flex-col gap-2 mb-12">
            <span className="text-5xl md:text-8xl font-black uppercase tracking-perry leading-none">LUCAS SANTOS</span>
            <span className="text-4xl md:text-7xl font-serif italic lowercase opacity-90 leading-none ml-0 md:ml-20">magro</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">
            <div className="space-y-2">
              <p>{CONTACT.email}</p>
              <p>{t.location}</p>
            </div>
            <div className="space-y-2 md:text-right">
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-100 uppercase">LinkedIn</a>
              <a href="https://github.com/lucassmagro" target="_blank" rel="noopener noreferrer" className="block hover:opacity-100 uppercase">GitHub</a>
            </div>
          </div>
        </header>

        {/* Experience Section */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 whitespace-nowrap">{t.experience}</h2>
            <div className={`h-[1px] w-full ${borderColor}`}></div>
          </div>
          
          <div className="space-y-20">
            {t.sections.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">
                  {exp.period}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">{exp.company}</h3>
                  <p className="text-lg font-serif italic mb-6 opacity-80">{exp.role}</p>
                  <p className="text-[14px] leading-relaxed opacity-60 max-w-xl">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 whitespace-nowrap">{t.projects}</h2>
            <div className={`h-[1px] w-full ${borderColor}`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {t.sections.projects.map((proj, i) => (
              <div key={i}>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4">{proj.period}</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{proj.title}</h3>
                <p className="text-[14px] leading-relaxed opacity-60">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-40">
          
          {/* Education */}
          <section>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 whitespace-nowrap">{t.education}</h2>
              <div className={`h-[1px] w-full ${borderColor}`}></div>
            </div>
            <div className="space-y-12">
              {t.sections.education.map((edu, i) => (
                <div key={i}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2">{edu.period}</div>
                  <h3 className="text-lg font-black uppercase mb-1">{edu.school}</h3>
                  <p className="text-[13px] font-serif italic opacity-60">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 whitespace-nowrap">{t.skills}</h2>
              <div className={`h-[1px] w-full ${borderColor}`}></div>
            </div>
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">{t.langLabel}</h4>
                <p className="text-[14px] font-bold tracking-widest uppercase leading-loose">{t.sections.skills.languages}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4">{t.techLabel}</h4>
                <p className="text-[14px] font-bold tracking-widest uppercase leading-loose">{t.sections.skills.tools}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Statement */}
        <footer className="pt-20 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">
            {t.footerNote}
          </p>
        </footer>

      </div>
    </motion.div>
  )
}
