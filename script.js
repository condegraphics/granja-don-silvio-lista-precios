(() => {
  "use strict";

  const categoryMenu = document.getElementById("category-menu");
  const searchMenu = document.getElementById("search-menu");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("product-search");
  const clearButton = document.getElementById("clear-search");
  const searchStatus = document.getElementById("search-status");
  const catalogue = document.querySelector(".catalogue");
  const sections = Array.from(document.querySelectorAll(".category-section"));

  if (!searchInput || !searchStatus || !catalogue || sections.length === 0) return;

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
    if (categoryMenu.open && searchMenu?.open) searchMenu.open = false;
  });

  searchMenu?.addEventListener("toggle", () => {
    if (searchMenu.open) {
      if (categoryMenu?.open) categoryMenu.open = false;
      requestAnimationFrame(() => searchInput.focus({ preventScroll: true }));
    }
  });

  categoryMenu?.querySelectorAll(".category-links a").forEach((link) => {
    link.addEventListener("click", () => {
      categoryMenu.open = false;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (searchMenu?.open) {
      searchMenu.open = false;
      searchMenu.querySelector("summary")?.focus();
    } else if (categoryMenu?.open) {
      categoryMenu.open = false;
      categoryMenu.querySelector("summary")?.focus();
    }
  });
})();
