(() => {
  "use strict";

  const categoryMenu = document.getElementById("category-menu");
  const categoryPanel = document.getElementById("category-panel");
  const categorySummary = categoryMenu?.querySelector("summary");
  const searchMenu = document.getElementById("search-menu");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("product-search");
  const clearButton = document.getElementById("clear-search");
  const searchStatus = document.getElementById("search-status");
  const menuSearchButton = document.getElementById("menu-search-button");
  const catalogue = document.querySelector(".catalogue");
  const sections = Array.from(document.querySelectorAll(".category-section"));
  const backgroundRegions = [
    document.querySelector(".skip-link"),
    document.querySelector(".brand"),
    searchMenu,
    document.querySelector("main"),
    document.querySelector(".site-footer")
  ].filter(Boolean);

  if (!searchInput || !searchStatus || !catalogue || sections.length === 0) return;

  const isMobileMenu = () => window.matchMedia("(max-width: 760px)").matches;
  let bodyLockSnapshot = null;
  let lockedScrollY = null;

  function lockBackgroundScroll() {
    if (bodyLockSnapshot) return;
    const body = document.body;
    if (lockedScrollY === null) lockedScrollY = window.scrollY;
    bodyLockSnapshot = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow
    };
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }

  function unlockBackgroundScroll() {
    if (!bodyLockSnapshot) return;
    const body = document.body;
    const scrollY = lockedScrollY ?? window.scrollY;
    Object.entries(bodyLockSnapshot).forEach(([property, value]) => { body.style[property] = value; });
    bodyLockSnapshot = null;
    lockedScrollY = null;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollY);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  }

  function syncCategoryMenuState(focusOnOpen = false) {
    if (!categoryMenu) return;

    const isOpen = categoryMenu.open;
    const modalOpen = isOpen && isMobileMenu();

    categorySummary?.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú de categorías" : "Abrir menú de categorías"
    );
    if (modalOpen) lockBackgroundScroll();
    else unlockBackgroundScroll();
    document.body.classList.toggle("menu-open", modalOpen);
    backgroundRegions.forEach((region) => { region.inert = modalOpen; });

    if (isOpen && searchMenu?.open) searchMenu.open = false;

    if (focusOnOpen && modalOpen) {
      requestAnimationFrame(() => categoryPanel?.querySelector(".menu-brand")?.focus({ preventScroll: true }));
    }
  }

  function closeCategoryMenu(restoreFocus = false) {
    if (!categoryMenu) return;
    categoryMenu.open = false;
    syncCategoryMenuState();
    if (restoreFocus) categorySummary?.focus({ preventScroll: true });
  }

  categorySummary?.addEventListener("click", () => {
    if (categoryMenu && !categoryMenu.open && isMobileMenu()) lockedScrollY = window.scrollY;
  }, true);

  const emptyState = document.createElement("p");
  emptyState.className = "no-results";
  emptyState.hidden = true;
  catalogue.before(emptyState);

  const productRows = sections.flatMap((section) => Array.from(section.querySelectorAll("tbody tr")));
  const totalProducts = productRows.length;

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-AR")
    .trim();

  function updateCatalogue() {
    const rawQuery = searchInput.value.trim();
    const query = normalize(rawQuery);
    let matches = 0;

    sections.forEach((section) => {
      const categoryText = normalize(
        `${section.querySelector("h2")?.textContent || ""} ${section.querySelector(".category-note")?.textContent || ""}`
      );
      const rows = Array.from(section.querySelectorAll("tbody tr"));
      let sectionMatches = 0;

      rows.forEach((row) => {
        const rowText = normalize(row.textContent || "");
        const isMatch = !query || `${categoryText} ${rowText}`.includes(query);
        row.hidden = !isMatch;
        if (isMatch) sectionMatches += 1;
      });

      section.hidden = sectionMatches === 0;
      matches += sectionMatches;

      const count = section.querySelector(".item-count strong");
      const label = section.querySelector(".item-count span");
      if (count) count.textContent = String(sectionMatches);
      if (label) label.textContent = sectionMatches === 1 ? "producto" : "productos";
    });

    if (!query) {
      searchStatus.textContent = `${totalProducts} productos disponibles`;
      emptyState.hidden = true;
    } else if (matches === 0) {
      searchStatus.textContent = "No se encontraron productos";
      emptyState.textContent = `No encontramos “${rawQuery}”. Probá con otro nombre o categoría.`;
      emptyState.hidden = false;
    } else {
      searchStatus.textContent = `${matches} ${matches === 1 ? "producto encontrado" : "productos encontrados"}`;
      emptyState.hidden = true;
    }

    if (clearButton) clearButton.hidden = rawQuery.length === 0;
  }

  searchInput.addEventListener("input", updateCatalogue);
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstMatch = catalogue.querySelector("tbody tr:not([hidden])");
    if (!firstMatch) return;

    if (searchMenu?.open) {
      searchMenu.open = false;
      searchMenu.querySelector("summary")?.focus({ preventScroll: true });
    }

    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
    const targetTop = firstMatch.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: Math.max(0, targetTop), behavior });
  });

  clearButton?.addEventListener("click", () => {
    searchInput.value = "";
    updateCatalogue();
    searchInput.focus();
  });

  categoryMenu?.addEventListener("toggle", () => {
    syncCategoryMenuState(categoryMenu.open);
  });

  searchMenu?.addEventListener("toggle", () => {
    if (searchMenu.open) {
      if (categoryMenu?.open) closeCategoryMenu();
      requestAnimationFrame(() => searchInput.focus({ preventScroll: true }));
    }
  });

  categoryPanel?.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.getElementById(link.hash.slice(1));
      closeCategoryMenu();
      if (target) {
        if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    });
  });

  menuSearchButton?.addEventListener("click", () => {
    closeCategoryMenu();
    if (searchMenu) searchMenu.open = true;
  });

  window.addEventListener("resize", () => syncCategoryMenuState());

  document.addEventListener("keydown", (event) => {
    if (categoryMenu?.open && isMobileMenu() && event.key === "Tab" && categorySummary && categoryPanel) {
      const focusablePanelElements = Array.from(categoryPanel.querySelectorAll("a[href], button:not([disabled])"));
      const focusableElements = [categorySummary, ...focusablePanelElements];
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }

    if (event.key !== "Escape") return;

    if (searchMenu?.open) {
      searchMenu.open = false;
      searchMenu.querySelector("summary")?.focus();
    } else if (categoryMenu?.open) {
      closeCategoryMenu(true);
    }
  });
})();
