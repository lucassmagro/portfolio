import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT, WHATSAPP_URL } from '../data/site.js'

/**
 * ContactSection — formulário de contato editorial, ao final da página.
 * Sem backend: o envio compõe um mailto: endereçado a todos os e-mails
 * de CONTACT.formEmails (o cliente de e-mail do visitante abre preenchido).
 * Há também um atalho de WhatsApp.
 */
export default function ContactSection({ t }) {
  const f = t.form
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const inputBase =
    'w-full bg-transparent border-b border-edborder py-3 text-[0.95rem] text-edtext outline-none transition-colors focus:border-accent placeholder:text-edmuted'

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = f.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = f.errors.email
    if (values.message.trim().length < 10) next.message = f.errors.message
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const body = `${values.message}\n\nEnviado por ${values.name} (${values.email})`
    const to = CONTACT.formEmails.join(',')
    const mailto = `mailto:${to}?subject=${encodeURIComponent(
      `${f.subject}: ${values.name}`,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-cream">
      <div className="max-w-[640px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="section-label mb-4">{t.section}</span>
          <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4.5vw,3rem)] tracking-[-0.01em]">
            {t.headline}
          </h2>
          <p className="mt-5 mx-auto max-w-md text-[0.95rem] leading-[1.7] text-edsecondary">
            {t.sub}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="mt-12 text-left space-y-8">
          <Field
            id="ct-name"
            name="name"
            label={f.name}
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            className={inputBase}
          />
          <Field
            id="ct-email"
            name="email"
            type="email"
            label={f.email}
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            className={inputBase}
          />
          <div>
            <label
              htmlFor="ct-message"
              className="block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-edsecondary mb-3"
            >
              {f.message}
            </label>
            <textarea
              id="ct-message"
              name="message"
              rows={4}
              value={values.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              className={`${inputBase} resize-none`}
            />
            {errors.message && <p className="mt-2 text-[0.75rem] text-red-500">{errors.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <button type="submit" className="btn-ed btn-ed--primary">
              {sent ? f.sending : f.send} ↗
            </button>

            <p className="text-[0.8rem] text-edsecondary">
              {f.or}{' '}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-edtext underline underline-offset-4 hover:text-accent transition-colors"
              >
                {f.whatsapp}
              </a>
            </p>
          </div>

          {sent && (
            <p role="status" className="text-[0.85rem] text-brand-green pt-2">
              {f.success}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({ id, name, type = 'text', label, value, error, onChange, className }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-edsecondary mb-3"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={className}
      />
      {error && <p className="mt-2 text-[0.75rem] text-red-500">{error}</p>}
    </div>
  )
}
