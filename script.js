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

// Ukázky — 3D coverflow carousel + lightbox po kliknutí na střední kartu
(function () {
  const carousel = document.querySelector(".works__carousel");
  const lightbox = document.getElementById("lightbox");
  if (!carousel || !lightbox) return;

  const cards = Array.from(carousel.querySelectorAll(".work-card"));
  const total = cards.length;
  let active = 0;
  let timer = null;

  function updatePositions() {
    cards.forEach((card, i) => {
      let offset = i - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      card.classList.remove("is-center", "is-left", "is-right", "is-far-left", "is-far-right");
      if (offset === 0) card.classList.add("is-center");
      else if (offset === -1) card.classList.add("is-left");
      else if (offset === 1) card.classList.add("is-right");
      else if (offset === -2) card.classList.add("is-far-left");
      else if (offset === 2) card.classList.add("is-far-right");
    });
  }

  function advance() {
    active = (active + 1) % total;
    updatePositions();
  }

  function regress() {
    active = (active - 1 + total) % total;
    updatePositions();
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(advance, 4000);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  if (total > 1) {
    updatePositions();
    startTimer();
  }

  const prevBtn = document.querySelector(".works__nav--prev");
  const nextBtn = document.querySelector(".works__nav--next");
  prevBtn?.addEventListener("click", () => {
    regress();
    if (total > 1) startTimer();
  });
  nextBtn?.addEventListener("click", () => {
    advance();
    if (total > 1) startTimer();
  });
  const imgEl = lightbox.querySelector(".lightbox__image");
  const tagEl = lightbox.querySelector(".lightbox__tag");
  const titleEl = lightbox.querySelector(".lightbox__title");
  const descEl = lightbox.querySelector(".lightbox__desc");
  const ctaEl = lightbox.querySelector(".lightbox__cta");
  const ctaLabelEl = lightbox.querySelector(".lightbox__cta-label");

  let lastFocused = null;

  function open(card) {
    const cardImg = card.querySelector(".work-card__media img");
    const cardTag = card.querySelector(".work-card__tag");
    const cardTitle = card.querySelector(".work-card__title");
    const cardDesc = card.querySelector(".work-card__desc");
    const cardCta = card.querySelector(".work-card__cta");

    imgEl.src = cardImg?.src || "";
    imgEl.alt = cardImg?.alt || "";
    tagEl.textContent = cardTag?.textContent || "";
    titleEl.textContent = cardTitle?.textContent || "";
    descEl.textContent = cardDesc?.textContent || "";

    if (cardCta) {
      const href = cardCta.getAttribute("href") || "#";
      const label = cardCta.firstChild?.textContent?.trim() || cardCta.textContent.trim().replace(/→\s*$/, "").trim();
      ctaEl.setAttribute("href", href);
      ctaLabelEl.textContent = label;
      // Externí odkazy otevírat v novém tabu, mailto v aktuálním
      if (href.startsWith("mailto:")) {
        ctaEl.removeAttribute("target");
        ctaEl.removeAttribute("rel");
      } else {
        ctaEl.setAttribute("target", "_blank");
        ctaEl.setAttribute("rel", "noopener");
      }
      ctaEl.style.display = "";
    } else {
      ctaEl.style.display = "none";
    }

    lastFocused = document.activeElement;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    stopTimer();
    setTimeout(() => lightbox.querySelector(".lightbox__close")?.focus(), 50);
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (total > 1) startTimer();
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Pokud uživatel klikl přímo na CTA, neotvírat lightbox — nech ho jít na odkaz
      if (e.target.closest(".work-card__cta")) return;
      open(card);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(card);
      }
    });
  });

  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      close();
    }
  });
})();

// Animace doodle podtržení sekčních nadpisů při scrollu
(function () {
  const titles = document.querySelectorAll(".section-title--underlined");
  if (!titles.length) return;

  if (!("IntersectionObserver" in window)) {
    titles.forEach((t) => t.classList.add("is-underlined"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(() => el.classList.add("is-underlined"), 200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  titles.forEach((t) => observer.observe(t));
})();

// Kontakt — odeslání přes Formspree (fetch, bez page reloadu)
(function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-success");
  const errorEl = document.getElementById("contact-error");
  const submitBtn = document.getElementById("contact-submit");
  if (!form || !success) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.hidden = true;

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    if (!name || !email || !message || !emailRe.test(email)) {
      errorEl.textContent = "Vyplňte prosím všechna pole správně.";
      errorEl.hidden = false;
      return;
    }

    submitBtn.disabled = true;
    const originalLabel = submitBtn.querySelector(".contact__submit-label").textContent;
    submitBtn.querySelector(".contact__submit-label").textContent = "Odesílám…";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Network response not ok");

      form.hidden = true;
      success.hidden = false;
    } catch (err) {
      errorEl.textContent = "Něco se pokazilo. Zkuste to znovu nebo mi napište přímo na e-mail.";
      errorEl.hidden = false;
      submitBtn.disabled = false;
      submitBtn.querySelector(".contact__submit-label").textContent = originalLabel;
    }
  });
})();

// Kontakt — odhalení e-mailu po kliknutí (anti-spam obfuskace)
(function () {
  const btn = document.getElementById("contact-email-reveal");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (btn.classList.contains("is-revealed")) return;
    const user = btn.dataset.user;
    const domain = btn.dataset.domain;
    if (!user || !domain) return;
    const email = user + "@" + domain;

    const link = document.createElement("a");
    link.href = "mailto:" + email;
    link.textContent = email;
    link.className = "contact__email is-revealed";

    btn.replaceWith(link);
  });
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

(function initFooterAddress() {
  const trigger = document.querySelector(".footer-address-trigger");
  const target = document.getElementById("footer-address");
  if (!trigger || !target) return;

  const parts = ["U Parku", " ", "280", ", ", "252", " ", "43", " ", "Průhonice"];

  let revealed = false;
  trigger.addEventListener("click", () => {
    if (!revealed) {
      target.textContent = " — " + parts.join("");
      target.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      revealed = true;
    } else {
      target.hidden = !target.hidden;
      trigger.setAttribute("aria-expanded", String(!target.hidden));
    }
  });
})();
