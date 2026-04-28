// Hero intro sekvence: kurzor bliká 2s → pauza → tagline fade in → kurzor znovu bliká
(function () {
  const cursor = document.querySelector(".logo__cursor");
  const tagline = document.querySelector(".tagline");
  if (!cursor || !tagline) return;

  // 1) Kurzor bliká 2 s (init class už nastavena v HTML)
  setTimeout(() => {
    // 2) Stop blikání
    cursor.classList.remove("is-blinking");
    cursor.classList.add("is-paused");

    // 3) Tagline fade in (0.6 s)
    tagline.classList.add("is-visible");

    // 4) Po dokončení fade in kurzor znovu rozblikat
    setTimeout(() => {
      cursor.classList.remove("is-paused");
      cursor.classList.add("is-blinking");
    }, 600);
  }, 2000);
})();

// Theme toggle — light/dark s perzistencí v localStorage
(function () {
  const STORAGE_KEY = "km-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle?.querySelector(".theme-toggle__icon");

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getActiveTheme() {
    return root.getAttribute("data-theme") || getSystemTheme();
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (icon) {
      // V light zobrazujeme měsíc (nabídka přechodu na dark), v dark slunce.
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  // init
  const stored = localStorage.getItem(STORAGE_KEY);
  applyTheme(stored || getSystemTheme());

  toggle?.addEventListener("click", () => {
    const next = getActiveTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();
