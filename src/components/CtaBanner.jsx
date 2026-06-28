import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT, WHATSAPP_URL } from '../data/site.js'

/**
 * CtaBanner — CTA editorial entre o Hero e a galeria ("Editorial Zen").
 * Form de contato com validação client-side. Sem backend, o envio
 * compõe um mailto: (caminho funcional e honesto) e há atalho de WhatsApp.
 */
export default function CtaBanner({ t }) {
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
    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `${f.subject}: ${values.name}`,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <section data-scroll-section className="relative py-24 md:py-32">
      <div className="max-w-[640px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-display font-normal text-edtext text-[clamp(1.8rem,4.5vw,3rem)] tracking-[-0.01em]">
            {t.headline}
          </h2>
          <p className="mt-5 mx-auto max-w-md text-[0.95rem] leading-[1.7] text-edsecondary">
            {t.sub}
          </p>
        </motion.div>

        {/* Form de contato */}
        <form onSubmit={handleSubmit} noValidate className="mt-12 text-left space-y-8">
          <Field
            id="cta-name"
            name="name"
            label={f.name}
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            className={inputBase}
          />
          <Field
            id="cta-email"
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
              htmlFor="cta-message"
              className="block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-edsecondary mb-3"
            >
              {f.message}
            </label>
            <textarea
              id="cta-message"
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

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 mt-24">
        <div className="h-px w-full bg-edborder" />
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
