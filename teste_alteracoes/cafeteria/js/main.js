/* ============================================================
   ARTISANAL EDITORIAL COFFEE — JS da versão reformulada
   ============================================================ */
;(function () {
  const stored = localStorage.getItem('artisanal-theme')
  if (stored) document.documentElement.setAttribute('data-theme', stored)
})()

const CART_KEY = 'artisanal-cart'
const CONTACT_EMAIL = 'contato@artisanaleditorial.com.br'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement

  /* Tema */
  document.querySelectorAll('.theme-toggle').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      root.setAttribute('data-theme', next)
      localStorage.setItem('artisanal-theme', next)
    }),
  )

  /* Drawer mobile */
  const hamburger = document.querySelector('.hamburger')
  const drawer = document.querySelector('.drawer')
  if (hamburger && drawer) {
    const toggle = () => drawer.classList.toggle('active')
    hamburger.addEventListener('click', toggle)
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', toggle))
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
      { threshold: 0.15 },
    )
    reveals.forEach((el) => io.observe(el))
  } else {
    reveals.forEach((el) => el.classList.add('in'))
  }

  updateCartCount()

  /* Loja: adicionar ao carrinho */
  document.querySelectorAll('[data-add]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const p = btn.closest('.product')
      addToCart({ name: p.dataset.name, price: Number(p.dataset.price) })
      toast(`"${p.dataset.name}" adicionado ao carrinho`)
    }),
  )

  /* Carrinho: finalizar via mailto */
  document.querySelectorAll('[data-checkout]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const cart = getCart()
      if (!cart.length) return toast('Seu carrinho está vazio')
      const lines = cart.map((i) => `• ${i.name} — R$ ${i.price.toFixed(2)}`).join('\n')
      const total = cart.reduce((s, i) => s + i.price, 0)
      const body = `Olá! Gostaria de fazer um pedido:\n\n${lines}\n\nTotal: R$ ${total.toFixed(2)}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        'Pedido de grãos — site',
      )}&body=${encodeURIComponent(body)}`
    }),
  )

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
      ok = setError(message, message.value.trim().length >= 10 ? '' : 'Mensagem muito curta.') && ok
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

/* Helpers de carrinho */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}
function addToCart(item) {
  const cart = getCart()
  cart.push(item)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  updateCartCount()
}
function updateCartCount() {
  const n = getCart().length
  document.querySelectorAll('.cart-count').forEach((el) => {
    el.textContent = n
    el.style.display = n ? 'inline' : 'none'
  })
}

/* Validação */
function setError(input, msg) {
  const field = input.closest('.field')
  const el = field && field.querySelector('.error-msg')
  if (field) field.classList.toggle('field-error', !!msg)
  if (el) el.textContent = msg
  return !msg
}

/* Toast */
let toastTimer
function toast(msg) {
  let el = document.querySelector('.toast')
  if (!el) {
    el = document.createElement('div')
    el.className = 'toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  requestAnimationFrame(() => el.classList.add('show'))
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600)
}
