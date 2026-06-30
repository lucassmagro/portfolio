import { useInView } from '../hooks/useInView.js'

/**
 * ComingSoonCard — placeholder editorial de "novidades em breve".
 * Borda tracejada, ícone de relógio em selo arredondado, título serif e botão
 * pílula que leva ao contato. Ocupa um slot do grid de projetos.
 */
export default function ComingSoonCard({ copy, index = 0 }) {
  const [ref, inView] = useInView()

  return (
    <article
      ref={ref}
      className={`group h-full reveal ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 2) * 80}ms` }}
    >
      <div className="flex h-full flex-col items-start justify-center rounded-ed border border-dashed border-edborder bg-paper p-8 transition-colors duration-200 hover:border-accent md:p-10">
        {/* Ícone */}
        <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-ed border border-edborder bg-cream text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>

        {/* Texto */}
        <h3 className="font-display text-2xl font-normal text-edtext tracking-[-0.01em]">
          {copy.title}
        </h3>
        <p className="mt-3 max-w-[34ch] text-[0.9rem] leading-[1.65] text-edsecondary">
          {copy.text}
        </p>

        {/* Ação */}
        <a href="#contact" className="btn-ed btn-ed--outline mt-7">
          {copy.cta}
        </a>
      </div>
    </article>
  )
}
