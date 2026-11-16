(() => {
  const path = window.location.pathname;
  const links = [...document.querySelectorAll(".portal-sidebar a.portal-nav__link")];
  const matches = links.filter(link => {
    const target = new URL(link.href).pathname;
    return target === "/" ? path === "/" : path.startsWith(target);
  }).sort((a, b) => new URL(b.href).pathname.length - new URL(a.href).pathname.length);
  links.forEach(link => { link.classList.remove("is-active"); link.removeAttribute("aria-current"); });
  if (matches[0]) {
    matches[0].classList.add("is-active");
    matches[0].setAttribute("aria-current", new URL(matches[0].href).pathname === path ? "page" : "location");
  }
  const crumb = document.querySelector(".portal-breadcrumb strong");
  const heading = document.querySelector("main h1");
  if (crumb && heading) crumb.textContent = heading.textContent.trim();
  document.querySelectorAll(".ux-finance-group").forEach(group => {
    group.open = Boolean(group.querySelector('[aria-current="page"]'));
  });
  // Open history when arriving on a paginated machine session list or sign-off anchor.
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      let parent = target.parentElement;
      while (parent) { if (parent.tagName === "DETAILS") parent.open = true; parent = parent.parentElement; }
    }
  }
  document.querySelectorAll(".account-destination table, .member-locker-table").forEach(table => {
    const headers = [...table.querySelectorAll("thead th")].map(th => th.textContent.trim());
    if (!headers.length) return;
    table.classList.add("ux-mobile-table");
    table.setAttribute("role", "table");
    table.querySelectorAll("tr").forEach(row => row.setAttribute("role", "row"));
    table.querySelectorAll("th").forEach(th => th.setAttribute("role", "columnheader"));
    table.querySelectorAll("tbody tr").forEach(row => [...row.cells].forEach((cell, i) => {
      cell.dataset.label = headers[i] || "Action";
      cell.setAttribute("role", "cell");
    }));
  });
  document.querySelectorAll("main table").forEach(table => {
    if (table.closest(".scroll, .finance-table-wrap, .member-expenses-table, .ux-table-scroll")) return;
    const wrap = document.createElement("div");
    wrap.className = "ux-table-scroll";
    table.before(wrap);
    wrap.append(table);
  });
  const menu = document.querySelector(".portal-menu");
  const sidebar = document.querySelector(".portal-sidebar");
  if (menu && sidebar) {
    menu.addEventListener("click", () => {
      if (menu.getAttribute("aria-expanded") === "true") sidebar.querySelector("a")?.focus();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && sidebar.contains(document.activeElement)) menu.focus();
    });
  }
})();
