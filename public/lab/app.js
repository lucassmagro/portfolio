// Lucas Santos Magro, versão Rainbrand: interações da página.
// Tudo funciona sem este arquivo (links, âncoras, FAQ em <details>); ele
// acrescenta o cabeçalho compacto, os menus, o filtro da galeria, as
// prévias, a leitura do manifesto, o fio desenhado na rolagem e o rastro.
const reduzido = matchMedia("(prefers-reduced-motion: reduce)");
const comMouse = matchMedia("(hover: hover) and (pointer: fine)");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ----------------------------------------------------------------- aviso
const aviso = $("#aviso");
function medirAviso() {
  const h = aviso && !aviso.hidden ? aviso.offsetHeight : 0;
  document.documentElement.style.setProperty("--altura-aviso", `${h}px`);
}
$(".aviso__fechar")?.addEventListener("click", () => {
  aviso.hidden = true;
  medirAviso();
  agendar();
});
medirAviso();
addEventListener("resize", medirAviso, { passive: true });

// ----------------------------------------------------------------- menu
const cabecalho = $("#cabecalho");
const menu = $("#menu");
const menuBotao = $(".menu-botao");
function abrirMenu(aberto) {
  menuBotao.setAttribute("aria-expanded", String(aberto));
  menuBotao.querySelector(".sr-only").textContent = aberto ? "Fechar menu" : "Abrir menu";
  menu.classList.toggle("is-aberto", aberto);
  if (aberto) menu.querySelector("a")?.focus();
}
menuBotao.addEventListener("click", () => abrirMenu(menuBotao.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) abrirMenu(false);
});
menu.addEventListener("focusout", (e) => {
  if (menu.classList.contains("is-aberto") && !cabecalho.contains(e.relatedTarget)) abrirMenu(false);
});

// ----------------------------------------------------------------- seletor de ramo
const ramo = $("[data-ramo]");
const ramoBotao = $(".ramo__botao");
const ramoLista = $("#ramo-lista");
function abrirRamo(aberto) {
  ramoBotao.setAttribute("aria-expanded", String(aberto));
  ramoLista.hidden = !aberto;
  if (aberto) ramoLista.querySelector("a")?.focus();
}
ramoBotao.addEventListener("click", () => abrirRamo(ramoBotao.getAttribute("aria-expanded") !== "true"));
ramoLista.addEventListener("keydown", (e) => {
  if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
  e.preventDefault();
  const itens = $$("a", ramoLista);
  const i = itens.indexOf(document.activeElement);
  itens[(i + (e.key === "ArrowDown" ? 1 : -1) + itens.length) % itens.length].focus();
});
ramo.addEventListener("focusout", (e) => {
  if (!ramo.contains(e.relatedTarget)) abrirRamo(false);
});

document.addEventListener("click", (e) => {
  if (!ramo.contains(e.target)) abrirRamo(false);
  if (!cabecalho.contains(e.target) && menu.classList.contains("is-aberto")) abrirMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!ramoLista.hidden) {
    abrirRamo(false);
    ramoBotao.focus();
  }
  if (menu.classList.contains("is-aberto")) {
    abrirMenu(false);
    menuBotao.focus();
  }
});

// ----------------------------------------------------------------- galeria
const botoesFiltro = $$("[data-filtro]");
const cartoes = $$(".cartao");
const contagem = $("[data-contagem]");
const mostrarTodos = $("[data-mostrar-todos]");
const VISIVEIS = 6;
let filtroAtual = "todos";
let expandido = false;
function filtrar(filtro, { manterExpandido = false } = {}) {
  filtroAtual = filtro;
  if (!manterExpandido) expandido = false;
  for (const b of botoesFiltro) b.setAttribute("aria-pressed", String(b.dataset.filtro === filtro));
  let combinam = 0;
  let visiveis = 0;
  for (const c of cartoes) {
    const combina = filtro === "todos" || c.dataset.ramo === filtro;
    if (combina) combinam++;
    const mostra = combina && (filtro !== "todos" || expandido || combinam <= VISIVEIS);
    c.hidden = !mostra;
    if (mostra) {
      visiveis++;
      c.classList.add("is-visivel");
    }
  }
  contagem.textContent =
    visiveis < combinam ? `${visiveis} de ${combinam} modelos` : `${visiveis} ${visiveis === 1 ? "modelo" : "modelos"}`;
  mostrarTodos.parentElement.hidden = visiveis === combinam;
}
for (const b of botoesFiltro) b.addEventListener("click", () => filtrar(b.dataset.filtro));
mostrarTodos.addEventListener("click", () => {
  const primeiroNovo = cartoes.find((c) => c.hidden);
  expandido = true;
  filtrar(filtroAtual, { manterExpandido: true });
  primeiroNovo?.querySelector("h4 a")?.focus({ preventScroll: true });
});
for (const link of $$("[data-filtro-ir]")) {
  link.addEventListener("click", () => {
    filtrar(link.dataset.filtroIr);
    abrirRamo(false);
    // A âncora #modelos faz a rolagem (suave pelo CSS); o foco vai para o filtro.
    requestAnimationFrame(() => $(`[data-filtro="${link.dataset.filtroIr}"]`)?.focus({ preventScroll: true }));
  });
}

// Prévia: a página inteira só é baixada quando o mouse chega na tela.
for (const tela of $$("[data-previa]")) {
  const pagina = $(".tela__pagina", tela);
  if (!pagina) continue;
  const carregar = () => {
    if (reduzido.matches || !comMouse.matches || pagina.src) return;
    pagina.addEventListener("load", () => tela.classList.add("is-pronta"), { once: true });
    pagina.src = pagina.dataset.src;
  };
  tela.addEventListener("pointerenter", carregar);
  tela.addEventListener("focus", carregar);
}

// ----------------------------------------------------------------- manifesto
const manifesto = $("[data-leitura]");
const palavras = manifesto.textContent.trim().split(/\s+/);
manifesto.replaceChildren(
  ...palavras.flatMap((p, i) => {
    const s = document.createElement("span");
    s.className = "palavra";
    s.textContent = p;
    return i ? [document.createTextNode(" "), s] : [s];
  }),
);
const nosPalavra = $$(".palavra", manifesto);

// ----------------------------------------------------------------- rolagem
// Um só quadro por rolagem: cabeçalho, leitura do manifesto e fios.
const fios = $$(".fio");
const topoPainel = $(".topo__prancha");
let pendente = false;
function agendar() {
  if (pendente) return;
  pendente = true;
  requestAnimationFrame(atualizar);
}
function atualizar() {
  pendente = false;
  const vh = innerHeight;
  // Vira pílula logo no começo da rolagem: a barra não passa por cima do título.
  cabecalho.classList.toggle("is-compacto", scrollY > 24);

  // Manifesto: a leitura avança entre 85% e 35% da altura da tela.
  const r = manifesto.getBoundingClientRect();
  const progresso = reduzido.matches ? 1 : limitar((vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6));
  const n = nosPalavra.length;
  nosPalavra.forEach((s, i) => s.style.setProperty("--lido", limitar(progresso * n - i).toFixed(2)));

  // Fios: cada um se desenha enquanto atravessa a parte de baixo da tela.
  for (const f of fios) {
    const b = f.getBoundingClientRect();
    const p = reduzido.matches ? 1 : limitar((vh * 0.95 - b.top) / (b.height + vh * 0.25));
    f.style.setProperty("--desenho", (1 - p).toFixed(3));
  }
}
const limitar = (v) => Math.min(1, Math.max(0, v));
addEventListener("scroll", agendar, { passive: true });
addEventListener("resize", agendar, { passive: true });
reduzido.addEventListener("change", agendar);
atualizar();

// Seção atual na navegação.
const secoes = $$("main section[id]");
const linksNav = $$(".cabecalho__nav a[href^='#']");
const observadorSecao = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      for (const a of linksNav) {
        if (a.getAttribute("href") === `#${e.target.id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    }
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
secoes.forEach((s) => observadorSecao.observe(s));

// ----------------------------------------------------------------- entradas
const revelar = [
  ".processo__cab",
  ".diagrama .no",
  ".diagrama__centro",
  ".trabalho__cab",
  ".caso .tela",
  ".caso__texto",
  ".depoimento",
  ".modelos__cab",
  ".cartao",
  ".preco__cab",
  ".orcamento",
  ".sobre__foto",
  ".sobre__texto",
  ".duvidas__cab",
  ".pergunta",
  ".contato__conteudo",
  ".rodape__prancha",
];
const observadorEntrada = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-visivel");
      observadorEntrada.unobserve(e.target);
    }
  },
  { rootMargin: "0px 0px -8% 0px" },
);
for (const sel of revelar) {
  $$(sel).forEach((el, i) => {
    el.setAttribute("data-revela", "");
    // Irmãos entram em cascata curta (até três por linha).
    el.style.setProperty("--atraso", `${(i % 3) * 0.08}s`);
    observadorEntrada.observe(el);
  });
}

// O fluxo do diagrama só corre enquanto o painel está na tela.
const diagrama = $("[data-diagrama]");
new IntersectionObserver(([e]) => diagrama.classList.toggle("is-ativo", e.isIntersecting)).observe(diagrama);

// ----------------------------------------------------------------- marcações
// Em volta de "7 dias", as marcações se revezam a cada 4 s. A primeira
// se desenha 1,1 s depois de a página abrir; fora da tela, o revezamento
// pausa.
const formas = $$(".nuvem .forma");
let formaAtual = 0;
let marcandoVisivel = true;
function proximaForma() {
  if (reduzido.matches || !marcandoVisivel || document.hidden) return;
  const sai = formas[formaAtual];
  formaAtual = (formaAtual + 1) % formas.length;
  const entra = formas[formaAtual];
  sai.classList.remove("is-ativa");
  sai.classList.add("is-saindo");
  // Depois de sair, volta ao começo sem animar, pronta para a próxima vez.
  setTimeout(() => {
    sai.classList.add("sem-transicao");
    sai.classList.remove("is-saindo");
    void sai.getBoundingClientRect();
    sai.classList.remove("sem-transicao");
  }, 800);
  setTimeout(() => entra.classList.add("is-ativa"), 350);
}
if (formas.length > 1) {
  // A primeira entra com a página.
  formas[0].classList.remove("is-ativa");
  requestAnimationFrame(() => setTimeout(() => formas[0].classList.add("is-ativa"), 1100));
  setInterval(proximaForma, 4000);
  new IntersectionObserver(([e]) => (marcandoVisivel = e.isIntersecting)).observe($(".nuvem"));
}

// ----------------------------------------------------------------- mira
// No topo, com mouse: uma mira de CAD segue o ponteiro com mola. As linhas
// atravessam a prancha, a célula da grade sob a mira acende em vermelho e
// as coordenadas (em múltiplos da grade de 12 px) aparecem ao lado.
const canvas = $(".rastro");
const ctx = canvas.getContext("2d");
const GRADE = 12;
const VERMELHO = [226, 65, 43];
let largura = 0;
let altura = 0;
let quadro = 0;
let visivel = true;
let alvo = null; // onde está o mouse
let mira = null; // onde a mira está (suavizada)
let presenca = 0; // 0 escondida, 1 visível
let rastroCelulas = []; // células por onde a mira passou: { x, y, t }

function ativo() {
  return !reduzido.matches && innerWidth > 700;
}
function dimensionar() {
  const r = topoPainel.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  largura = r.width;
  altura = r.height;
  canvas.width = Math.round(largura * dpr);
  canvas.height = Math.round(altura * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  pedirQuadro();
}
const rgba = (a) => `rgb(${VERMELHO.join(" ")} / ${a})`;

function desenhar(agora) {
  quadro = 0;
  ctx.clearRect(0, 0, largura, altura);
  if (!visivel || !ativo()) return;
  let continuar = false;

  presenca += ((alvo ? 1 : 0) - presenca) * 0.14;
  if (Math.abs((alvo ? 1 : 0) - presenca) > 0.01) continuar = true;
  if (alvo) {
    if (!mira) mira = { ...alvo };
    mira.x += (alvo.x - mira.x) * 0.22;
    mira.y += (alvo.y - mira.y) * 0.22;
    if (Math.hypot(alvo.x - mira.x, alvo.y - mira.y) > 0.3) continuar = true;
    // Marca a célula sob a mira; elas se apagam em 900 ms.
    const cx = Math.floor(mira.x / GRADE) * GRADE;
    const cy = Math.floor(mira.y / GRADE) * GRADE;
    const ultima = rastroCelulas[rastroCelulas.length - 1];
    if (!ultima || ultima.x !== cx || ultima.y !== cy) rastroCelulas.push({ x: cx, y: cy, t: agora });
  }
  rastroCelulas = rastroCelulas.filter((c) => agora - c.t < 900);
  for (const c of rastroCelulas) {
    const vida = 1 - (agora - c.t) / 900;
    ctx.fillStyle = rgba(0.32 * vida * vida);
    ctx.fillRect(c.x + 1, c.y + 1, GRADE - 1, GRADE - 1);
  }
  if (rastroCelulas.length) continuar = true;

  if (mira && presenca > 0.01) {
    const a = presenca;
    const x = Math.round(mira.x) + 0.5;
    const y = Math.round(mira.y) + 0.5;
    // Linhas que atravessam a prancha, mais fortes perto da mira.
    const linha = (x0, y0, x1, y1) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, rgba(0));
      g.addColorStop(0.5, rgba(0.55 * a));
      g.addColorStop(1, rgba(0));
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    };
    ctx.lineWidth = 1;
    linha(x - 420, y, x + 420, y);
    linha(x, y - 320, x, y + 320);
    // Quadro da mira e o ponto.
    ctx.strokeStyle = rgba(a);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - 9, y - 9, 18, 18);
    ctx.fillStyle = rgba(a);
    ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
    // Coordenadas, em células da grade.
    const texto = `X ${String(Math.round(mira.x / GRADE)).padStart(3, "0")}  Y ${String(Math.round(mira.y / GRADE)).padStart(3, "0")}`;
    ctx.font = '500 10.5px "Plex Mono", monospace';
    const w = ctx.measureText(texto).width + 12;
    const tx = Math.min(x + 16, largura - w - 10);
    const ty = y + 16;
    ctx.fillStyle = `rgb(21 24 29 / ${0.92 * a})`;
    ctx.fillRect(tx, ty, w, 20);
    ctx.fillStyle = `rgb(255 255 255 / ${a})`;
    ctx.fillText(texto, tx + 6, ty + 14);
  }
  if (continuar) pedirQuadro();
}
function pedirQuadro() {
  if (!ativo()) {
    ctx.clearRect(0, 0, largura, altura);
    return;
  }
  if (!quadro) quadro = requestAnimationFrame(desenhar);
}
topoPainel.addEventListener(
  "pointermove",
  (e) => {
    if (!ativo() || e.pointerType === "touch") return;
    // Sobre botões e links a mira some: o cursor normal basta.
    if (e.target.closest("a, button, .ramo__lista")) {
      alvo = null;
      pedirQuadro();
      return;
    }
    const r = topoPainel.getBoundingClientRect();
    alvo = { x: e.clientX - r.left, y: e.clientY - r.top };
    pedirQuadro();
  },
  { passive: true },
);
topoPainel.addEventListener("pointerleave", () => {
  alvo = null;
  pedirQuadro();
});
new ResizeObserver(dimensionar).observe(topoPainel);
new IntersectionObserver(([e]) => {
  visivel = e.isIntersecting;
  pedirQuadro();
}).observe(topoPainel);
reduzido.addEventListener("change", pedirQuadro);
document.fonts?.ready.then(pedirQuadro);
