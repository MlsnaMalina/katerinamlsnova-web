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
