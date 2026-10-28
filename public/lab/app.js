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
const topoPainel = $(".topo__painel");
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
  ".trabalho__fixo",
  ".caso .tela",
  ".caso__texto",
  ".depoimento",
  ".modelos__cab",
  ".cartao",
  ".preco__arte",
  ".preco__corpo",
  ".sobre__foto",
  ".sobre__texto",
  ".duvidas__cab",
  ".pergunta",
  ".contato__conteudo",
  ".rodape__painel",
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

// ----------------------------------------------------------------- rastro
// Um "seguidor" persegue o mouse com mola; por onde ele passa, células da
// grade acendem com a cor que corre num degradê contínuo ao longo do
// caminho. Cada célula nasce crescendo (com um leve passo além) e encolhe
// ao sumir. Parado, o rastro se desfaz e a semente ao lado do título volta,
// célula por célula. O desfoque vem do CSS (filter no canvas).
const canvas = $(".rastro");
const ctx = canvas.getContext("2d");
const titulo = $(".topo__titulo");
const PALETA = ["#c58cff", "#4f7bff", "#3fd0ff", "#f5e64a", "#ff8a3d", "#ff5a4e", "#c58cff"].map((h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]);
const VIDA = 1400; // ms
const NASCER = 160; // ms
const ESPERA_SEMENTE = 900; // ms parado até a semente voltar
let celula = 26;
let largura = 0;
let altura = 0;
let quadro = 0;
let visivel = true;
const celulas = new Map(); // "gx,gy" → { t, d }
let alvo = null; // posição do mouse
let seguidor = null; // posição suavizada
let percorrido = 0; // distância total, dá a cor
let ultimaCelula = null;
let ultimoMovimento = -Infinity;
let semente = 1; // 0 desfeita, 1 inteira

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
  celula = largura > 1200 ? 28 : 24;
  pedirQuadro();
}
// Cor contínua: interpola a paleta pela distância percorrida (em células).
function cor(d, alfa) {
  const n = PALETA.length - 1;
  const x = (((d / 7) % n) + n) % n;
  const i = Math.floor(x);
  const f = x - i;
  const [a, b] = [PALETA[i], PALETA[i + 1]];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(" ")} / ${alfa})`;
}
const suave = (x) => 1 - (1 - x) ** 3;
// Escala de nascimento com passo além (1 → 1.12 → 1).
function escalaNascer(x) {
  const c = 2.2;
  return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2;
}

// Semente: gancho de células que sai do canto do título.
const GANCHO = [
  [0, 3], [0, 2], [0, 1], [1, 0], [2, 0], [3, -1], [4, -1], [5, 0], [6, 0], [6, 1],
];
const LARGURA_GANCHO = 7;
const PINGOS = [
  { c: [-1.2, -0.6], r: 0.28, i: 1 },
  { c: [0, 4.6], r: 0.34, alto: 1.6, i: 3 },
  { c: [0.1, 6.9], r: 0.3, i: 5 },
];
function origemSemente() {
  const p = topoPainel.getBoundingClientRect();
  const t = titulo.getBoundingClientRect();
  const x = Math.min(t.right - p.left - celula * 0.6, p.width - celula * (LARGURA_GANCHO + 1.2));
  return { x, y: t.top - p.top - celula * 1.1 };
}
function quadrado(x, y, lado, raio) {
  if (lado <= 0.5) return;
  ctx.beginPath();
  ctx.roundRect(x - lado / 2, y - lado / 2, lado, lado, Math.max(0, raio));
  ctx.fill();
}

function acender(gx, gy) {
  const chave = `${gx},${gy}`;
  const atual = celulas.get(chave);
  const agora = performance.now();
  // Repassar por uma célula viva só a reacende, sem piscar.
  if (atual && agora - atual.t < VIDA * 0.5) atual.t = agora - Math.min(NASCER, agora - atual.t);
  else celulas.set(chave, { t: agora, d: percorrido });
}

function desenhar(agora) {
  quadro = 0;
  ctx.clearRect(0, 0, largura, altura);
  if (!visivel || !ativo()) return;
  let continuar = false;

  // O seguidor anda uma fração da distância até o mouse a cada quadro.
  if (alvo && seguidor) {
    const dx = alvo.x - seguidor.x;
    const dy = alvo.y - seguidor.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0.5) {
      const passos = Math.max(1, Math.ceil((dist * 0.28) / (celula * 0.45)));
      for (let i = 0; i < passos; i++) {
        seguidor.x += (dx * 0.28) / passos;
        seguidor.y += (dy * 0.28) / passos;
        const gx = Math.floor(seguidor.x / celula);
        const gy = Math.floor(seguidor.y / celula);
        if (!ultimaCelula || ultimaCelula[0] !== gx || ultimaCelula[1] !== gy) {
          percorrido += 1;
          // Pincel de 2 × 2: o traço sai cheio, mesmo na diagonal.
          const ox = seguidor.x / celula - gx < 0.5 ? -1 : 1;
          const oy = seguidor.y / celula - gy < 0.5 ? -1 : 1;
          acender(gx, gy);
          acender(gx + ox, gy);
          acender(gx, gy + oy);
          acender(gx + ox, gy + oy);
          ultimaCelula = [gx, gy];
        }
      }
      continuar = true;
    }
  }

  // Semente: desmancha rápido ao mexer, volta devagar depois de parado.
  const parado = agora - ultimoMovimento > ESPERA_SEMENTE;
  semente = Math.min(1, Math.max(0, semente + (parado ? 0.028 : -0.09)));
  if ((parado && semente < 1) || (!parado && semente > 0)) continuar = true;
  if (semente > 0.001) {
    const o = origemSemente();
    const total = GANCHO.length;
    GANCHO.forEach(([cx, cy], i) => {
      // Cada célula tem a sua vez: a semente se monta da ponta para o fim.
      const local = Math.min(1, Math.max(0, semente * (total + 4) / 4 - i / 4));
      if (local <= 0) return;
      const s = suave(local);
      ctx.fillStyle = cor(i * 1.6 + agora / 900, s);
      const lado = celula * (0.5 + 0.5 * s);
      quadrado(o.x + (cx + 0.5) * celula, o.y + (cy + 0.5) * celula, lado, lado * 0.28);
    });
    ctx.globalAlpha = suave(semente);
    for (const g of PINGOS) {
      ctx.fillStyle = cor(g.i * 1.6 + agora / 900, 1);
      const w = celula * g.r * 2;
      const h = g.alto ? celula * g.alto : w;
      // Os pingos boiam um pouco, como gotas.
      const boia = Math.sin(agora / 700 + g.i) * celula * 0.12;
      ctx.beginPath();
      ctx.roundRect(o.x + g.c[0] * celula, o.y + g.c[1] * celula + boia, w, h, w / 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (semente === 1) continuar = true; // pingos boiando
  }

  // Rastro: nasce crescendo, vive, encolhe e some. A cor continua correndo.
  for (const [chave, c] of celulas) {
    // O horário do quadro pode vir antes do nascimento da célula.
    const idade = Math.max(0, agora - c.t);
    if (idade > VIDA) {
      celulas.delete(chave);
      continue;
    }
    const [gx, gy] = chave.split(",").map(Number);
    const nascer = Math.min(1, idade / NASCER);
    const morrer = Math.max(0, (idade - VIDA * 0.45) / (VIDA * 0.55));
    const escala = escalaNascer(nascer) * (1 - morrer * morrer * 0.8);
    const alfa = Math.min(1, nascer * 1.6) * (1 - morrer ** 2.2);
    ctx.fillStyle = cor(c.d + idade / 260, alfa);
    const lado = celula * 1.04 * escala;
    quadrado((gx + 0.5) * celula, (gy + 0.5) * celula, lado, lado * 0.26);
  }
  if (celulas.size) continuar = true;
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
    const r = topoPainel.getBoundingClientRect();
    alvo = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!seguidor) seguidor = { ...alvo };
    ultimoMovimento = performance.now();
    pedirQuadro();
  },
  { passive: true },
);
topoPainel.addEventListener("pointerleave", () => {
  // O seguidor termina o caminho até o último ponto e para.
  setTimeout(() => {
    alvo = null;
    seguidor = null;
    ultimaCelula = null;
  }, 260);
});
new ResizeObserver(dimensionar).observe(topoPainel);
new IntersectionObserver(([e]) => {
  visivel = e.isIntersecting;
  pedirQuadro();
}).observe(topoPainel);
reduzido.addEventListener("change", pedirQuadro);
document.fonts?.ready.then(pedirQuadro);
