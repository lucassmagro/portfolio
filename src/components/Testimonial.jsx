import { useInView } from '../hooks/useInView.js'

/**
 * Testimonial — depoimento do cliente real (MG Incorporações), logo depois
 * dos trabalhos: é a prova de que o serviço já funcionou para um negócio.
 */
export default function Testimonial({ t }) {
  const [ref, inView] = useInView()
  return (
    <section className="relative py-20 md:py-28 bg-cream">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16 items-center reveal ${
            inView ? 'is-visible' : ''
          }`}
        >
          <figure>
            <span className="section-label mb-6">{t.section}</span>
            <span
              aria-hidden="true"
              className="block font-display text-accent text-[4.5rem] leading-[0.6] select-none"
            >
              “
            </span>
            <blockquote className="mt-2 font-display font-normal text-edtext text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.4] tracking-[-0.01em]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <img
                src="imobiliaria-mg-avatar-128.webp"
                alt=""
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                className="h-14 w-14 shrink-0 rounded-full border border-edborder object-cover"
              />
              <span>
                <span className="block font-medium text-edtext">{t.author}</span>
                <span className="block text-[0.85rem] text-edsecondary">{t.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="rounded-ed border border-edborder bg-paper p-6 md:p-7">
            <ul className="space-y-3">
              {t.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[0.92rem] text-edbody">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-[2px] shrink-0 text-accent"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[0.85rem] text-edtext underline underline-offset-4 hover:text-accent transition-colors"
            >
              {t.link}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
