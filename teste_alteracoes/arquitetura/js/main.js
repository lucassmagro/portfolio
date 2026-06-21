/* ============================================================
   FORMA STUDIO — JS externo da versão reformulada
   ============================================================ */
;(function () {
  const stored = localStorage.getItem('forma-theme')
  if (stored) document.documentElement.setAttribute('data-theme', stored)
})()

const CONTACT_EMAIL = 'contato@formastudio.com.br'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement

  /* Tema */
  document.querySelectorAll('.theme-toggle').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      root.setAttribute('data-theme', next)
      localStorage.setItem('forma-theme', next)
    }),
  )

  /* Header scroll */
  const header = document.querySelector('header')
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    onScroll()
  }

  /* Menu mobile */
  const hamburger = document.querySelector('.hamburger')
  const mobileMenu = document.querySelector('.mobile-menu')
  if (hamburger && mobileMenu) {
    const toggle = () => mobileMenu.classList.toggle('active')
    hamburger.addEventListener('click', toggle)
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', toggle))
  }

  /* Carrossel do hero */
  const slides = document.querySelectorAll('.hero .slide')
  const dots = document.querySelectorAll('.carousel-dots button')
  if (slides.length > 1) {
    let i = 0
    const go = (n) => {
      slides[i].classList.remove('active')
      if (dots[i]) dots[i].classList.remove('on')
      i = (n + slides.length) % slides.length
      slides[i].classList.add('active')
      if (dots[i]) dots[i].classList.add('on')
    }
    dots.forEach((d, idx) => d.addEventListener('click', () => go(idx)))
    setInterval(() => go(i + 1), 5500)
  }

  /* Reveal */
  const reveals = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    reveals.forEach((el) => io.observe(el))
  } else {
    reveals.forEach((el) => el.classList.add('in'))
  }

  /* Galeria: filtros */
  const fbtns = document.querySelectorAll('.filter-btn')
  const items = document.querySelectorAll('.g-item')
  fbtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      fbtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      const cat = btn.dataset.filter
      items.forEach((it) => it.classList.toggle('hide', cat !== 'all' && it.dataset.cat !== cat))
    }),
  )

  /* Lightbox */
  const lightbox = document.getElementById('lightbox')
  if (lightbox) {
    const lbImg = lightbox.querySelector('img')
    document.querySelectorAll('.g-item img').forEach((img) =>
      img.addEventListener('click', () => {
        lbImg.src = img.src
        lbImg.alt = img.alt
        lightbox.classList.add('active')
      }),
    )
    const close = () => lightbox.classList.remove('active')
    lightbox.querySelector('.close').addEventListener('click', close)
    lightbox.addEventListener('click', (e) => e.target === lightbox && close())
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close())
  }

  /* Formulário de contato */
  const form = document.getElementById('contactForm')
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const name = form.querySelector('#name')
      const email = form.querySelector('#email')
      const message = form.querySelector('#message')
      let ok = true
      ok = setError(name, name.value.trim() ? '' : 'Informe seu nome.') && ok
      ok = setError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'E-mail inválido.') && ok
      ok = setError(message, message.value.trim().length >= 10 ? '' : 'Conte um pouco mais.') && ok
      if (!ok) return
      const body = `${message.value}\n\n— ${name.value} (${email.value})`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        'Contato pelo site — ' + name.value,
      )}&body=${encodeURIComponent(body)}`
      const status = form.querySelector('.form-status')
      if (status) {
        status.textContent = 'Pronto! Abrimos seu e-mail com a mensagem.'
        status.classList.add('ok')
      }
    })
  }
})

function setError(input, msg) {
  const field = input.closest('.field')
  const el = field && field.querySelector('.err')
  if (field) field.classList.toggle('error', !!msg)
  if (el) el.textContent = msg
  return !msg
}
