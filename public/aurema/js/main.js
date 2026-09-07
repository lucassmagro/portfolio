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
    initMap();
    initTestimonials();
    initScrollReveal();
    initCookieConsent();
  });
})();
