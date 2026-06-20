/* ============================================================
   LUMINA HOTEL — JS da versão reformulada
   ============================================================ */

// Tema (aplicado o quanto antes para evitar flash)
;(function () {
  const stored = localStorage.getItem('lumina-theme')
  if (stored) document.documentElement.setAttribute('data-theme', stored)
})()

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement

  /* Tema */
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark'
      const next = isDark ? 'light' : 'dark'
      root.setAttribute('data-theme', next)
      localStorage.setItem('lumina-theme', next)
    })
  })

  /* Navegação mobile */
  const hamburger = document.querySelector('.hamburger')
  const mobileNav = document.querySelector('.mobile-nav')
  if (hamburger && mobileNav) {
    const toggle = () => {
      mobileNav.classList.toggle('active')
      hamburger.classList.toggle('active')
    }
    hamburger.addEventListener('click', toggle)
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', toggle))
  }

  /* Carrossel do hero */
  const slides = document.querySelectorAll('.hero-slide')
  if (slides.length > 1) {
    let i = 0
    setInterval(() => {
      slides[i].classList.remove('active')
      i = (i + 1) % slides.length
      slides[i].classList.add('active')
    }, 5000)
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    reveals.forEach((el) => io.observe(el))
  } else {
    reveals.forEach((el) => el.classList.add('in'))
  }

  /* ── Busca da home → leva os parâmetros para busca.html ── */
  const homeBooking = document.getElementById('homeBooking')
  if (homeBooking) {
    homeBooking.addEventListener('submit', (e) => {
      e.preventDefault()
      const ci = document.getElementById('checkin')
      const co = document.getElementById('checkout')
      const g = document.getElementById('guests')
      if (!validateDates(ci, co)) return
      const q = new URLSearchParams({ checkin: ci.value, checkout: co.value, guests: g.value })
      window.location.href = `busca.html?${q.toString()}`
    })
  }

  /* ── Página de resultados (busca.html) ── */
  initResults()

  /* ── Formulário de contato → mailto + validação ── */
  const contactForm = document.getElementById('contactForm')
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const name = contactForm.querySelector('#name')
      const email = contactForm.querySelector('#email')
      const message = contactForm.querySelector('#message')
      let ok = true
      ok = setError(name, name.value.trim() ? '' : 'Informe seu nome.') && ok
      ok = setError(email, isEmail(email.value) ? '' : 'Informe um e-mail válido.') && ok
      ok =
        setError(message, message.value.trim().length >= 10 ? '' : 'Escreva uma mensagem (mín. 10).') &&
        ok
      if (!ok) return
      const body = `${message.value}\n\n— ${name.value} (${email.value})`
      window.location.href = `mailto:contato@luminachapeco.com.br?subject=${encodeURIComponent(
        'Contato pelo site — ' + name.value,
      )}&body=${encodeURIComponent(body)}`
      const status = contactForm.querySelector('.form-status')
      if (status) {
        status.textContent = 'Pronto! Seu cliente de e-mail foi aberto com a mensagem.'
        status.classList.add('ok')
      }
    })
  }
})

/* ── Helpers de validação ── */
function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}
function setError(input, msg) {
  const field = input.closest('.field')
  const el = field && field.querySelector('.error-msg')
  if (field) field.classList.toggle('field-error', !!msg)
  if (el) el.textContent = msg
  return !msg
}
function validateDates(ci, co) {
  let ok = true
  ok = setError(ci, ci.value ? '' : 'Selecione o check-in.') && ok
  ok = setError(co, co.value ? '' : 'Selecione o check-out.') && ok
  if (ci.value && co.value && new Date(co.value) <= new Date(ci.value)) {
    ok = setError(co, 'Check-out deve ser após o check-in.') && false
  }
  return ok
}

/* ============================================================
   Fluxo de reserva simulado: resultados → reserva → confirmação
   ============================================================ */
function initResults() {
  const grid = document.getElementById('roomGrid')
  if (!grid) return

  // Preenche o resumo com os parâmetros da busca
  const params = new URLSearchParams(window.location.search)
  const fmt = (d) =>
    d ? new Date(d + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '—'
  const ci = params.get('checkin')
  const co = params.get('checkout')
  const guests = params.get('guests') || '2'
  const sCheck = document.getElementById('sumCheck')
  if (sCheck) sCheck.textContent = `${fmt(ci)} → ${fmt(co)}`
  const sGuests = document.getElementById('sumGuests')
  if (sGuests) sGuests.textContent = `${guests} hóspede(s)`
  let nights = 1
  if (ci && co) nights = Math.max(1, Math.round((new Date(co) - new Date(ci)) / 86400000))
  const sNights = document.getElementById('sumNights')
  if (sNights) sNights.textContent = `${nights} noite(s)`

  // Filtros por categoria
  const chips = document.querySelectorAll('.chip')
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'))
      chip.classList.add('active')
      const cat = chip.dataset.cat
      grid.querySelectorAll('.room-card').forEach((card) => {
        const show = cat === 'all' || card.dataset.cat === cat
        card.classList.toggle('hidden', !show)
      })
    })
  })

  // Botões "Reservar" → abre o modal de reserva
  const modal = document.getElementById('bookingModal')
  grid.querySelectorAll('[data-reserve]').forEach((btn) => {
    btn.addEventListener('click', () => openBooking(btn, nights))
  })

  function openBooking(btn, nights) {
    const card = btn.closest('.room-card')
    const name = card.dataset.name
    const price = parseInt(card.dataset.price, 10)
    const total = price * nights
    modal.querySelector('#mRoom').textContent = name
    modal.querySelector('#mTotal').textContent =
      `R$ ${total.toLocaleString('pt-BR')} (${nights} noite(s))`
    showStep(1)
    modal.classList.add('active')
  }

  function showStep(n) {
    modal.querySelectorAll('[data-step]').forEach((s) => {
      s.classList.toggle('hidden', Number(s.dataset.step) !== n)
    })
    modal.querySelectorAll('.modal-steps .dot').forEach((d, idx) => {
      d.classList.toggle('on', idx < n)
    })
  }

  modal.querySelector('[data-close]').addEventListener('click', () => modal.classList.remove('active'))
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active')
  })

  modal.querySelector('#mConfirm').addEventListener('click', () => {
    const gName = modal.querySelector('#gName')
    const gEmail = modal.querySelector('#gEmail')
    let ok = true
    ok = setError(gName, gName.value.trim() ? '' : 'Informe seu nome.') && ok
    ok = setError(gEmail, isEmail(gEmail.value) ? '' : 'Informe um e-mail válido.') && ok
    if (!ok) return
    const code = 'LUM-' + Math.random().toString(36).slice(2, 7).toUpperCase()
    modal.querySelector('#mCode').textContent = code
    modal.querySelector('#mGuestName').textContent = gName.value
    modal.querySelector('#mRoom2').textContent = modal.querySelector('#mRoom').textContent
    showStep(2)
  })
}
