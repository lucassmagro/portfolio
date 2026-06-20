import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT, WHATSAPP_URL } from '../data/site.js'
import { cx, themeClasses } from '../lib/theme.js'

/**
 * CtaBanner — CTA premium entre o Hero e a galeria.
 * Form de contato com validação client-side. Sem backend, o envio
 * compõe um mailto: (caminho funcional e honesto) e há atalho de WhatsApp.
 */
export default function CtaBanner({ isDark, t }) {
  const f = t.form
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const s = themeClasses(isDark)
  const inputBase = cx(
    'w-full bg-transparent border-b py-3 text-[15px] outline-none transition-colors',
    isDark ? 'border-white/15 focus:border-white/60' : 'border-black/15 focus:border-black/60',
  )

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
    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `${f.subject} — ${values.name}`,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <section
      data-scroll-section
      className="relative z-10 flex flex-col items-center justify-center py-32 md:py-44 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
        className="flex flex-col items-center text-center w-full max-w-2xl"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic font-gloock tracking-perry mb-6 text-perry">
          {t.headline}
        </h2>

        <p className="text-[14px] md:text-[16px] leading-relaxed opacity-50 mb-12 max-w-lg text-perry">
          {t.sub}
        </p>

        {/* Form de contato */}
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg text-left space-y-8">
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
              className="block text-[11px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3"
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
            {errors.message && <p className="mt-2 text-[12px] text-red-400">{errors.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <motion.button
              type="submit"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cx(
                'group inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.3em] transition-all duration-500',
                s.solidBtn,
              )}
            >
              {sent ? f.sending : f.send}
              <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                ↗
              </span>
            </motion.button>

            <p className="text-[12px] uppercase tracking-[0.2em] opacity-50">
              {f.or}{' '}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-bold underline underline-offset-4 hover:opacity-100"
              >
                {f.whatsapp}
              </a>
            </p>
          </div>

          {sent && (
            <p role="status" className="text-[13px] text-green-400 pt-2">
              {f.success}
            </p>
          )}
        </form>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1700px] px-6 md:px-10">
        <div className="h-px w-full bg-current opacity-5" />
      </div>
    </section>
  )
}

function Field({ id, name, type = 'text', label, value, error, onChange, className }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3"
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
      {error && <p className="mt-2 text-[12px] text-red-400">{error}</p>}
    </div>
  )
}
