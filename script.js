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

// Nav scroll behavior — pozadí navigace se objeví po scrollu > 80 px
(function () {
  const nav = document.getElementById("nav");
  if (!nav) return;

  function update() {
    if (window.scrollY > 80) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
})();

// Mobile menu — hamburger toggle
(function () {
  const burger = document.getElementById("nav-burger");
  const menu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-menu-close");
  if (!burger || !menu) return;

  function open() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function close() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) close();
  });
})();

// Process steps — postupný fade-in zleva při scrollu (Intersection Observer)
(function () {
  const steps = document.querySelectorAll(
    ".process__step, .process__arrow"
  );
  if (!steps.length) return;

  if (!("IntersectionObserver" in window)) {
    steps.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  steps.forEach((el, i) => {
    el.dataset.delay = String(i * 150);
    observer.observe(el);
  });
})();

// O mně — slide in obrázku zleva, pak nakreslení doodle rámečku
(function () {
  const media = document.querySelector(".about__media");
  if (!media) return;

  if (!("IntersectionObserver" in window)) {
    media.classList.add("is-visible", "is-drawn");
    return;
  }

  const highlight = document.querySelector(".about__highlight");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          media.classList.add("is-visible");
          setTimeout(() => media.classList.add("is-drawn"), 700);
          // Po dokončení rámečku (slide 700 + draw 1200) → podtržení
          setTimeout(() => highlight?.classList.add("is-underlined"), 1900);
          // Po dokončení podtržení (+ 900) → srdíčko
          setTimeout(() => highlight?.classList.add("is-hearted"), 2800);
          observer.unobserve(media);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(media);
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
