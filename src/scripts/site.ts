// Small progressive enhancements: menu, active anchor in the nav, directions index (tabs + filter).
// Without script every part of the page still shows: the menu opens as a list, all direction groups are listed.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Menu (details/summary): close on a link, on «Закрити» and on Escape. */
const menu = document.querySelector<HTMLDetailsElement>("[data-menu]");
if (menu) {
  const summary = menu.querySelector("summary");
  const close = (focusBack = false) => {
    menu.open = false;
    if (focusBack) summary?.focus();
  };
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => close()));
  menu.querySelector("[data-menu-close]")?.addEventListener("click", () => close(true));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) close(true);
  });
  menu.addEventListener("toggle", () => {
    document.documentElement.style.overflow = menu.open ? "hidden" : "";
    if (menu.open) menu.querySelector<HTMLElement>("[data-menu-close]")?.focus();
  });
}

/* Active anchor in the inline nav. */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
if (navLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(navLinks.map((a) => [a.getAttribute("href")!.slice(1), a]));
  const visible = new Set<string>();
  const order = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).map((s) => s.id);
  const update = () => {
    const current = order.find((id) => visible.has(id) && byId.has(id));
    navLinks.forEach((a) => a.removeAttribute("aria-current"));
    if (current) byId.get(current)!.setAttribute("aria-current", "true");
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
    update();
  }, { rootMargin: "-45% 0px -50% 0px" });
  order.forEach((id) => io.observe(document.getElementById(id)!));
}

/* Directions index: tabs by group and a filter by name. */
const index = document.querySelector<HTMLElement>("[data-directions]");
if (index) {
  const tabs = Array.from(index.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(index.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const lists = index.querySelector<HTMLElement>("[data-lists]")!;
  const input = index.querySelector<HTMLInputElement>("[data-filter]")!;
  const empty = index.querySelector<HTMLElement>("[data-empty]")!;
  const status = index.querySelector<HTMLElement>("[data-status]")!;
  let active = 0;

  index.classList.add("is-enhanced");

  const norm = (s: string) => s.toLocaleLowerCase("uk").replace(/[’'ʼ`]/g, "").replace(/\s+/g, " ").trim();

  const render = () => {
    const q = norm(input.value);
    let total = 0;
    panels.forEach((panel, i) => {
      const rows = Array.from(panel.querySelectorAll<HTMLElement>("[data-name]"));
      let shown = 0;
      rows.forEach((row) => {
        const hit = !q || norm(row.dataset.name ?? "").includes(q);
        row.hidden = !hit;
        if (hit) shown++;
      });
      const visible = q ? shown > 0 : i === active;
      panel.hidden = !visible;
      if (visible) total += shown;
    });
    index.classList.toggle("is-searching", q.length > 0);
    empty.hidden = !(q && total === 0);
    status.textContent = q ? (total ? `Знайдено: ${total}` : "Нічого не знайдено") : "";
  };

  // Height is held during the change, rows fade out (120ms) and in (220ms): no jump.
  const swap = (fn: () => void) => {
    if (reduce) { fn(); return; }
    lists.style.minHeight = `${lists.offsetHeight}px`;
    lists.classList.add("is-leaving");
    window.setTimeout(() => {
      fn();
      lists.classList.remove("is-leaving");
      window.setTimeout(() => { lists.style.minHeight = ""; }, 240);
    }, 120);
  };

  const select = (i: number, focus = false) => {
    active = i;
    tabs.forEach((t, j) => {
      const on = j === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    if (focus) tabs[i].focus();
    if (input.value) input.value = "";
    swap(render);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (e) => {
      const k = e.key;
      if (k === "ArrowRight" || k === "ArrowLeft" || k === "Home" || k === "End") {
        e.preventDefault();
        const n = k === "Home" ? 0 : k === "End" ? tabs.length - 1 : (i + (k === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        select(n, true);
      }
    });
  });

  let timer = 0;
  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => swap(render), 80);
  });

  render();
}
