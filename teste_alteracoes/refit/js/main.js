/* ============================================================
   REFIT — JS externo da versão reformulada
   ============================================================ */
const CONTACT_EMAIL = 'contato@refit.com.br'

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons()

  /* Nav scroll */
  const nav = document.getElementById('navbar')
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50)
    })
  }

  /* Menu mobile */
  const menuBtn = document.querySelector('.menu-btn')
  const mobileMenu = document.querySelector('.mobile-menu')
  if (menuBtn && mobileMenu) {
    const toggle = () => mobileMenu.classList.toggle('active')
    menuBtn.addEventListener('click', toggle)
    mobileMenu.querySelectorAll('a, .close').forEach((el) => el.addEventListener('click', toggle))
  }

  /* Fade-in */
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.fade-in').forEach((el) => obs.observe(el))

  /* FAQ */
  document.querySelectorAll('.faq-question').forEach((btn) =>
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('active')),
  )

  /* Galeria: filtros */
  const filterBtns = document.querySelectorAll('.filter-btn')
  const items = document.querySelectorAll('.gallery-item')
  filterBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      const cat = btn.dataset.filter
      items.forEach((it) => {
        it.classList.toggle('hide', cat !== 'all' && it.dataset.cat !== cat)
      })
    }),
  )

  /* Lightbox */
  const lightbox = document.getElementById('lightbox')
  if (lightbox) {
    const lbImg = lightbox.querySelector('img')
    document.querySelectorAll('.gallery-item img').forEach((img) =>
      img.addEventListener('click', () => {
        lbImg.src = img.src
        lbImg.alt = img.alt
        lightbox.classList.add('active')
      }),
    )
    const close = () => lightbox.classList.remove('active')
    lightbox.querySelector('.close').addEventListener('click', close)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close()
    })
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close())
  }

  /* Formulário de contato → validação + mailto */
  const form = document.getElementById('contactForm')
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const name = form.querySelector('#name')
      const email = form.querySelector('#email')
      const message = form.querySelector('#message')
      const type = form.querySelector('#type')
      let ok = true
      ok = setError(name, name.value.trim() ? '' : 'Informe seu nome.') && ok
      ok = setError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'E-mail inválido.') && ok
      ok = setError(message, message.value.trim().length >= 10 ? '' : 'Conte um pouco mais (mín. 10).') && ok
      if (!ok) return
      const body = `Tipo de projeto: ${type ? type.value : '—'}\n\n${message.value}\n\n— ${name.value} (${email.value})`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        'Novo projeto — site REFIT',
      )}&body=${encodeURIComponent(body)}`
      const status = form.querySelector('.form-status')
      if (status) {
        status.textContent = 'Obrigado! Abrimos seu e-mail com a mensagem pronta para enviar.'
        status.classList.add('ok')
      }
    })
  }
})

function setError(input, msg) {
  const group = input.closest('.input-group')
  const el = group && group.querySelector('.err')
  if (group) group.classList.toggle('error', !!msg)
  if (el) el.textContent = msg
  return !msg
}
