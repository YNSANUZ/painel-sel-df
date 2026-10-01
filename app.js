const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const icons = {
  book: "i-book",
  trophy: "i-trophy",
  medal: "i-medal",
  ball: "i-ball",
  people: "i-people",
  users: "i-users",
  file: "i-file",
  heart: "i-heart",
  grid: "i-grid",
  pin: "i-pin",
};
const icon = (n) =>
  `<svg aria-hidden="true"><use href="#${icons[n] || "i-grid"}"/></svg>`;
const money = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function showProgram(id) {
  const p = SEL.programs.find((x) => x.id === id);
  if (!p) return;
  $("#dialogBody").innerHTML =
    `<div class="dialog-top tone-${p.tone}">${p.logo ? `<img src="assets/${p.logo}" alt="">` : icon(p.icon)}<span>${p.tag}</span></div><div class="dialog-content"><h2>${p.name}</h2><p>${p.description}</p><div class="dialog-highlight">${p.highlight}</div><small>Conteúdo demonstrativo. Consulte o portal oficial para informações vigentes.</small><a class="primary-btn" href="${p.url}" target="_blank" rel="noreferrer">${p.action} ${icon("file")}</a></div>`;
  $("#programDialog").showModal();
}
function programCard(p) {
  return `<article class="program-card tone-${p.tone}" data-program="${p.id}" role="button" tabindex="0" aria-label="${p.action}: ${p.name}"><div class="program-icon">${p.logo ? `<img src="assets/${p.logo}" alt="">` : icon(p.icon)}</div><span>${p.tag}</span><h3>${p.name}</h3><p>${p.description}</p><strong>${p.highlight}</strong><button type="button" tabindex="-1">${p.action}<svg><use href="#i-arrow"/></svg></button></article>`;
}
function renderFeatured() {
  $("#featuredPrograms").innerHTML = SEL.programs
    .slice(0, 3)
    .map(programCard)
    .join("");
}
function renderPrograms(q = "") {
  const n = SEL.normalize(q);
  const list = SEL.programs.filter((p) =>
    SEL.normalize(`${p.name} ${p.tag} ${p.description}`).includes(n),
  );
  $("#programList").innerHTML = list.length
    ? list.map(programCard).join("")
    : '<p class="empty">Nenhum programa encontrado.</p>';
  observeReveals();
}
function renderData() {
  const max = Math.max(...SEL.support.map((x) => x.investment));
  const medals = [
    ["Ouro", 50, "#ffb627"],
    ["Prata", 200, "#8fa3b7"],
    ["Bronze", 100, "#b87333"],
  ];
  const profiles = [
    ["Paratletas", 150, "#7656d8"],
    ["Atletas", 70, "#0875c9"],
    ["Técnicos e acompanhantes", 30, "#00a66d"],
  ];
  $("#dataContent").innerHTML =
    `<div class="data-hero reveal"><div><span>COMPETE BRASÍLIA</span><h2>Resultados que atravessam fronteiras</h2><p>Apoio demonstrativo a atletas e paratletas em competições.</p></div><div class="donut" style="--target:72"><strong data-count="1773">0</strong><small>beneficiados</small></div></div><div class="data-kpis reveal"><article><small>Investimento</small><strong>R$ <b data-count="2.91" data-decimals="2">0</b> mi</strong><span>Total demonstrativo</span></article><article><small>Medalhas</small><strong data-count="350">0</strong><span>Referência visual</span></article><article><small>Apoios</small><strong data-count="3">0</strong><span>Modalidades de transporte</span></article></div><article class="chart-card reveal"><div class="section-head"><div><small>DISTRIBUIÇÃO</small><h2>Investimento por apoio</h2></div></div><div class="bars">${SEL.support.map((x) => `<div><div class="bar-head"><span>${x.name}</span><strong>${money(x.investment)}</strong></div><div class="track"><i style="--w:${(x.investment / max) * 100}%;background:${x.color}"></i></div><small><b data-count="${x.people}">0</b> atendimentos</small></div>`).join("")}</div><p class="source-note">Valores demonstrativos, sem integração em tempo real.</p></article><div class="chart-pair"><article class="chart-card reveal"><div class="section-head"><div><small>DESEMPENHO</small><h2>Medalhas obtidas</h2></div></div><div class="vertical-chart">${medals.map(([name, value, color]) => `<div><strong data-count="${value}">0</strong><i style="--h:${value / 2}%;background:${color}"></i><span>${name}</span></div>`).join("")}</div></article><article class="chart-card reveal"><div class="section-head"><div><small>ATENDIMENTOS</small><h2>Perfil do apoio</h2></div></div><div class="bars compact">${profiles.map(([name, value, color]) => `<div><div class="bar-head"><span>${name}</span><strong data-count="${value}">0</strong></div><div class="track"><i style="--w:${value / 1.5}%;background:${color}"></i></div></div>`).join("")}</div></article></div><div class="split-cards reveal"><article><span data-count="12">0</span><h3>COPs</h3><p>Unidades em diferentes regiões do DF.</p></article><article><span><b data-count="2000">0</b>+</span><h3>Escola de Esportes</h3><p>Alunos no cenário demonstrativo.</p></article></div>`;
  observeReveals();
}
function renderModalities() {
  $("#modalityList").innerHTML = SEL.general
    .map((x) => `<span>${x.name}</span>`)
    .join("");
  $("#inclusiveList").innerHTML = SEL.inclusive
    .map((x) => `<span>${x}</span>`)
    .join("");
}
function setupModalities() {
  renderModalities();
}
function renderSchool() {
  $("#schoolList").innerHTML = SEL.school
    .map(
      (x) =>
        `<article class="vacancy reveal">${icon("ball")}<h3>${x.name}</h3><div><strong>${x.vacancies}</strong><span>vagas</span></div></article>`,
    )
    .join("");
  $("#homeSchoolList").innerHTML = SEL.school
    .map(
      (x) =>
        `<div class="school-sticker"><strong>${x.name}</strong><span><b data-count="${x.vacancies}">0</b> vagas</span></div>`,
    )
    .join("");
  const competeRows = [
    ["Nacional", 72, 192, 52, 316, "478.602,40"],
    ["Internacional", 22, 127, 24, 173, "1.539.450,49"],
    ["Terrestre", 58, 949, 226, 1284, "890.139,53"],
  ];
  $("#homeCompeteTable").innerHTML =
    `<div class="compete-row compete-head"><span></span><span>Paratleta</span><span>Atleta</span><span>Téc.</span><span>Total</span><span>Investimento</span></div>` +
    competeRows
      .map(
        ([name, para, athlete, staff, total, investment]) =>
          `<div class="compete-row"><strong>${name}</strong><span data-count="${para}">0</span><span data-count="${athlete}">0</span><span data-count="${staff}">0</span><b data-count="${total}">0</b><em>R$ ${investment}</em></div>`,
      )
      .join("");
  observeReveals();
}
let spaceType = "cops";
function renderSpaces() {
  const sources = {
    cops: SEL.centers.map((x) => `COP ${x}`),
    venues: SEL.venues,
    fields: SEL.fields.map((x) => `Campo - ${x}`),
  };
  $("#spaceList").innerHTML = sources[spaceType]
    .map((x) => `<div class="space-item">${icon("pin")}<span>${x}</span></div>`)
    .join("");
}
function setupSpaces() {
  $("#mapFrame").src = SEL.mapURL;
  $("#homeMapFrame").src = SEL.mapURL;
  $("#spaceFilters").innerHTML = [
    ["cops", "12 COPs"],
    ["venues", "8 espaços"],
    ["fields", "8 campos"],
  ]
    .map(
      ([id, l]) =>
        `<button data-space="${id}" class="${id === "cops" ? "active" : ""}">${l}</button>`,
    )
    .join("");
  renderSpaces();
}
function renderTeam() {
  $("#teamList").innerHTML = SEL.team
    .map(
      (x, i) =>
        `<article class="team-card reveal"><span>${String(i + 1).padStart(2, "0")}</span><div><h3>${x.name}</h3><p>${x.role}</p></div></article>`,
    )
    .join("");
  observeReveals();
}
function animateCounts(root = document) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $$("[data-count]", root).forEach((el) => {
    const end = +el.dataset.count;
    const decimals = +(el.dataset.decimals || 0);
    const format = (value) =>
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + (el.dataset.suffix || "");
    if (reduced) {
      el.textContent = format(end);
      return;
    }
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / 1800, 1);
      const v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = format(decimals ? v : Math.round(v));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
let revealObserver;
function observeReveals() {
  if (
    !("IntersectionObserver" in window) ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    $$(".reveal").forEach((x) => x.classList.add("shown"));
    return;
  }
  if (!revealObserver)
    revealObserver = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("shown");
            animateCounts(e.target);
            revealObserver.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
  $$(".reveal:not(.shown)").forEach((x) => {
    revealObserver.unobserve(x);
    revealObserver.observe(x);
  });
}
function closeMenu() {
  $("#drawer").classList.remove("open");
  $("#scrim").classList.remove("open");
  $("#menuBtn").setAttribute("aria-expanded", "false");
}
function route() {
  const name = location.hash.slice(1) || "inicio",
    safe = $(`[data-view="${name}"]`) ? name : "inicio";
  $$(".view").forEach((v) =>
    v.classList.toggle("active", v.dataset.view === safe),
  );
  $$("[data-nav]").forEach((a) =>
    a.classList.toggle("active", a.dataset.nav === safe),
  );
  $(".app-shell").classList.toggle("map-mode", safe === "espacos");
  closeMenu();
  scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
  setTimeout(() => {
    const activeView = $(`[data-view="${safe}"]`);
    $$(".reveal", activeView).forEach((item) => {
      if (item.getBoundingClientRect().top < innerHeight * 1.15)
        item.classList.add("shown");
    });
    observeReveals();
    $$(".reveal.shown", activeView).forEach((item) => animateCounts(item));
  }, 60);
}
renderFeatured();
renderPrograms();
renderData();
setupModalities();
renderSchool();
setupSpaces();
renderTeam();
route();
observeReveals();
addEventListener("hashchange", route);
document.addEventListener("click", (e) => {
  const p = e.target.closest("[data-program]");
  if (p) showProgram(p.dataset.program);
  const g = e.target.closest("[data-go]");
  if (g) location.hash = g.dataset.go;
  const toggle = e.target.closest("[data-modality-panel]");
  if (toggle) {
    const name = toggle.dataset.modalityPanel;
    $$("[data-modality-panel]").forEach((button) => {
      const active =
        button === toggle && button.getAttribute("aria-expanded") !== "true";
      button.classList.toggle("active", active);
      button.setAttribute("aria-expanded", String(active));
      $("#" + button.getAttribute("aria-controls")).classList.toggle(
        "open",
        active,
      );
    });
  }
  const s = e.target.closest("[data-space]");
  if (s) {
    spaceType = s.dataset.space;
    $$("[data-space]").forEach((b) => b.classList.toggle("active", b === s));
    renderSpaces();
  }
});
$("#programSearch").addEventListener("input", (e) =>
  renderPrograms(e.target.value),
);
$("#menuBtn").addEventListener("click", () => {
  $("#drawer").classList.add("open");
  $("#scrim").classList.add("open");
  $("#menuBtn").setAttribute("aria-expanded", "true");
});
$("#menuClose").addEventListener("click", closeMenu);
$("#scrim").addEventListener("click", closeMenu);
$(".dialog-close").addEventListener("click", () => $("#programDialog").close());
$("#programDialog").addEventListener("click", (e) => {
  if (e.target === $("#programDialog")) $("#programDialog").close();
});
$("#spaceInfoBtn").addEventListener("click", () =>
  $("#spaceSheet").classList.add("open"),
);
$("#spaceClose").addEventListener("click", () =>
  $("#spaceSheet").classList.remove("open"),
);
addEventListener("keydown", (e) => {
  const card = e.target.closest?.(".program-card[data-program]");
  if (card && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    showProgram(card.dataset.program);
  }
  if (e.key === "Escape") {
    closeMenu();
    $("#spaceSheet").classList.remove("open");
  }
});
