(() => {
  const CONFIG = {
    whatsappNumber: "5511940028922",
    whatsappMessage: "Olá! Gostaria de agendar uma avaliação na Aurema.",
    showFloatingWhatsapp: true,
    autoplayDepoimentos: true,
    autoplayIntervalMs: 7000,
    // Defina o domínio real do site (o mesmo cadastrado no Plausible) para
    // carregar o Plausible Analytics depois que o usuário aceitar no banner.
    // Plausible não usa cookies nem coleta dado pessoal. Preferimos ele aqui
    // por ser um site de saúde e estética, mas ainda assim ele só carrega
    // depois do consentimento, pra combinar com o texto do banner.
    plausibleDomain: "",
    // Deixe vazio para o formulário montar a mensagem e abrir no WhatsApp,
    // sem back-end nenhum. Preenchendo com a URL de um serviço de formulário
    // (Formspree, Basin, a Function do próprio host), o envio passa a ser um
    // POST para lá e o WhatsApp vira só o plano B em caso de falha. Se usar,
    // libere o domínio no connect-src do CSP em _headers e vercel.json.
    contactFormEndpoint: "",
  };

  function buildWaLink(message) {
    const digits = CONFIG.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(message || CONFIG.whatsappMessage)}`;
  }

  // O link real do wa.me já está escrito no HTML de cada [data-wa-link], para o
  // caminho de conversão funcionar sem JS (bloqueador, falha de rede, crawler).
  // Aqui ele é reescrito a partir do CONFIG, que segue sendo a fonte única para
  // quem for customizar o site: basta trocar o número/mensagem em um lugar.
  function initWhatsappLinks() {
    const link = buildWaLink();
    document.querySelectorAll("[data-wa-link]").forEach((el) => {
      el.setAttribute("href", link);
    });

    const floating = document.querySelector(".floating-whatsapp");
    if (floating && !CONFIG.showFloatingWhatsapp) {
      floating.style.display = "none";
    }
  }

  // O mapa do Google grava cookies de terceiros. Carregar sob demanda mantém
  // verdadeira, no carregamento da página, a promessa da política de
  // privacidade — e transforma o mapa numa escolha informada do visitante.
  function initMap() {
    const container = document.querySelector("[data-map]");
    if (!container) return;
    const button = container.querySelector("[data-map-load]");
    if (!button || !container.dataset.mapSrc) return;

    // O botão nasce hidden no HTML: sem JS ele não carregaria nada, e o que
    // sobra é o link "Ver no Google Maps", que funciona sozinho.
    button.hidden = false;

    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = container.dataset.mapSrc;
      iframe.title = "Mapa com a localização da Aurema";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      container.replaceChildren(iframe);
      // O foco estava no botão que acabou de sumir. Mandá-lo para dentro do
      // iframe de terceiro é desorientador: o foco vai para o container, e o
      // leitor de tela segue dali para o iframe, que tem title próprio.
      container.tabIndex = -1;
      container.focus();
    });
  }

  function formatPhoneBR(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  const FIELD_MESSAGES = {
    valueMissing: "Este campo é obrigatório.",
    typeMismatch: "Formato inválido.",
    tooShort: "Muito curto, complete um pouco mais.",
  };

  function messageFor(field) {
    const validity = field.validity;
    if (validity.valid) return "";
    for (const key of Object.keys(FIELD_MESSAGES)) {
      if (validity[key]) return FIELD_MESSAGES[key];
    }
    return "Verifique este campo.";
  }

  function setFieldError(field, message) {
    const wrapper = field.closest(".field");
    const errorEl = document.querySelector(`[data-error-for="${field.id}"]`);
    if (wrapper) wrapper.classList.toggle("is-invalid", Boolean(message));
    if (errorEl) errorEl.textContent = message;
  }

  // Monta a mensagem já organizada, para a clínica receber os mesmos campos
  // que receberia por e-mail em vez de um texto solto.
  function buildContactMessage(data) {
    return [
      "Olá! Vim pelo site da Aurema.",
      "",
      `Nome: ${data.nome}`,
      `Telefone: ${data.telefone}`,
      `E-mail: ${data.email}`,
      `Assunto: ${data.assunto}`,
      "",
      data.mensagem,
    ].join("\n");
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const fallback = document.querySelector("[data-contact-fallback]");
    if (!form) return;

    // o formulário só existe de verdade com JS; a alternativa some agora
    form.hidden = false;
    if (fallback) fallback.hidden = true;

    const phoneInput = form.querySelector("#cf-telefone");
    if (phoneInput) {
      phoneInput.addEventListener("input", () => {
        phoneInput.value = formatPhoneBR(phoneInput.value);
      });
    }

    const messageInput = form.querySelector("#cf-mensagem");
    const charCount = form.querySelector("[data-char-count]");
    if (messageInput && charCount) {
      messageInput.addEventListener("input", () => {
        charCount.textContent = String(messageInput.value.length);
      });
    }

    const statusEl = form.querySelector("[data-form-status]");
    const fields = Array.from(form.querySelectorAll("input, select, textarea")).filter(
      (el) => el.name !== "empresa"
    );

    function validateAll() {
      let firstInvalid = null;
      fields.forEach((field) => {
        const message = messageFor(field);
        setFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });
      return firstInvalid;
    }

    fields.forEach((field) => {
      field.addEventListener("blur", () => setFieldError(field, messageFor(field)));
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // honeypot: bot preenche campo oculto — finge sucesso sem enviar nada
      const honeypot = form.querySelector("#cf-empresa");
      if (honeypot && honeypot.value) {
        form.reset();
        return;
      }

      const firstInvalid = validateAll();
      if (firstInvalid) {
        firstInvalid.focus();
        if (statusEl) {
          statusEl.dataset.state = "error";
          statusEl.textContent = "Verifique os campos destacados antes de enviar.";
        }
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());

      if (CONFIG.contactFormEndpoint) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;
        if (statusEl) {
          statusEl.dataset.state = "";
          statusEl.textContent = "Enviando...";
        }
        try {
          const response = await fetch(CONFIG.contactFormEndpoint, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(form),
          });
          if (!response.ok) throw new Error("request failed");
          if (statusEl) {
            statusEl.dataset.state = "success";
            statusEl.textContent = "Mensagem enviada! Retornaremos em breve.";
          }
          form.reset();
          if (charCount) charCount.textContent = "0";
          return;
        } catch (err) {
          if (statusEl) {
            statusEl.dataset.state = "error";
            statusEl.textContent = "Não foi possível enviar. Abrindo o WhatsApp...";
          }
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      }

      // Sem endpoint (ou se ele falhou): abre o WhatsApp com tudo preenchido.
      // Nada é enviado daqui — quem aperta enviar é o visitante, no app dele.
      window.open(buildWaLink(buildContactMessage(data)), "_blank", "noopener");
      if (statusEl) {
        statusEl.dataset.state = "success";
        statusEl.textContent = "Abrimos o WhatsApp com sua mensagem pronta.";
      }
    });
  }

  function initTestimonials() {
    const container = document.querySelector(".testimonials");
    const track = document.querySelector(".testimonials__track");
    const slides = Array.from(document.querySelectorAll(".testimonial"));
    const dots = Array.from(document.querySelectorAll(".testimonials__dot"));
    const dotsGroup = document.querySelector(".testimonials__dots");
    const status = document.querySelector("[data-carousel-status]");
    if (!container || !track || dots.length === 0) return;

    let index = 0;
    let timer = null;

    function goTo(i, { announce = true } = {}) {
      index = i;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, di) => {
        const active = di === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", String(active));
      });
      slides.forEach((slide, si) => slide.setAttribute("aria-hidden", String(si !== index)));
      if (announce && status) {
        const author = slides[index].querySelector(".testimonial__author strong");
        status.textContent = `Depoimento ${index + 1} de ${slides.length}, de ${author ? author.textContent : ""}.`;
      }
    }

    function startAutoplay() {
      if (!CONFIG.autoplayDepoimentos) return;
      stopAutoplay();
      timer = setInterval(() => goTo((index + 1) % dots.length), CONFIG.autoplayIntervalMs);
    }

    function stopAutoplay() {
      clearInterval(timer);
      timer = null;
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        stopAutoplay();
        goTo(i);
      });
    });

    if (dotsGroup) {
      dotsGroup.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        stopAutoplay();
        const next = event.key === "ArrowRight" ? (index + 1) % dots.length : (index - 1 + dots.length) % dots.length;
        goTo(next);
        dots[next].focus();
      });
    }

    // pausa o autoplay enquanto o usuário lê ou navega pelo teclado
    container.addEventListener("mouseenter", stopAutoplay);
    container.addEventListener("mouseleave", startAutoplay);
    container.addEventListener("focusin", stopAutoplay);
    container.addEventListener("focusout", startAutoplay);

    goTo(0, { announce: false });
    startAutoplay();
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(".section");
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    targets.forEach((el) => el.classList.add("reveal"));

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function loadPlausible() {
    if (!CONFIG.plausibleDomain) return;
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = CONFIG.plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }

  function initCookieConsent() {
    const banner = document.getElementById("cookie-banner");
    if (!banner) return;

    const STORAGE_KEY = "aurema-cookie-consent";
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "accepted") {
      loadPlausible();
      return;
    }
    if (stored === "rejected") return;

    banner.hidden = false;

    banner.querySelector("[data-cookie-accept]").addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "accepted");
      banner.hidden = true;
      loadPlausible();
    });

    banner.querySelector("[data-cookie-reject]").addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "rejected");
      banner.hidden = true;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWhatsappLinks();
    initContactForm();
    initMap();
    initTestimonials();
    initScrollReveal();
    initCookieConsent();
  });
})();
