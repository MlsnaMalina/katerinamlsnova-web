// Hero intro: terminal seq1 → pitch → subtext → terminal seq2 → maskot Malina
document.addEventListener('DOMContentLoaded', () => {
  const textToType1 = "> kateřino, vytvoř mi jednoduchý web";
  const textToType2 = "> system --spust_malinu";
  const typewriterEl = document.getElementById('terminal-typewriter');
  const pitchEl = document.getElementById('hero-pitch');
  const subtextEl = document.getElementById('hero-subtext');
  const mascotEl = document.getElementById('hero-mascot-container');

  if (!typewriterEl || !mascotEl) return;

  let i = 0;
  function typeWriter1() {
    if (i < textToType1.length) {
      typewriterEl.innerHTML += textToType1.charAt(i);
      i++;
      setTimeout(typeWriter1, 28);
    } else {
      setTimeout(() => {
        pitchEl?.classList.add('visible-element');
        setTimeout(() => {
          subtextEl?.classList.add('visible-element');
          setTimeout(() => {
            typewriterEl.innerHTML = "";
            let j = 0;
            function typeWriter2() {
              if (j < textToType2.length) {
                typewriterEl.innerHTML += textToType2.charAt(j);
                j++;
                setTimeout(typeWriter2, 28);
              } else {
                setTimeout(() => {
                  mascotEl.classList.add('visible-element');
                  initEyes();
                }, 200);
              }
            }
            typeWriter2();
          }, 400);
        }, 300);
      }, 200);
    }
  }

  setTimeout(typeWriter1, 200);

  function initEyes() {
    const pupils = document.querySelectorAll('.pupil');
    document.addEventListener('mousemove', (e) => {
      pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const rad = Math.atan2(e.clientX - x, e.clientY - y);
        const distance = Math.min(4, Math.hypot(e.clientX - x, e.clientY - y) / 10);

        const moveX = Math.sin(rad) * distance;
        const moveY = Math.cos(rad) * distance;

        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      });
    });
  }

  const arrowEl = document.getElementById('hero-malina-arrow');
  const heroModal = document.getElementById('hero-malina-modal');
  const heroModalCloseBtn = document.getElementById('hero-malina-modal-close');

  function openHeroModal() {
    if (!heroModal) return;
    heroModal.classList.add('is-open');
    heroModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => heroModalCloseBtn?.focus(), 50);
  }
  function closeHeroModal() {
    if (!heroModal) return;
    heroModal.classList.remove('is-open');
    heroModal.setAttribute('aria-hidden', 'true');
  }

  heroModalCloseBtn?.addEventListener('click', closeHeroModal);
  heroModal?.addEventListener('click', (e) => {
    if (e.target === heroModal) closeHeroModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && heroModal?.classList.contains('is-open')) closeHeroModal();
  });

  function triggerHunt() {
    if (mascotEl.dataset.taken === "1") return;
    mascotEl.dataset.taken = "1";

    if (arrowEl) arrowEl.classList.add('is-hidden');

    mascotEl.style.opacity = '0';
    setTimeout(() => {
      mascotEl.style.display = 'none';
    }, 600);

    if (typeof window.startEggHunt === "function") {
      window.startEggHunt();
    }

    openHeroModal();
  }

  mascotEl.addEventListener('click', triggerHunt);
  mascotEl.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerHunt();
    }
  });

  if (arrowEl) {
    const startArrowBlink = () => {
      if (mascotEl.dataset.taken === "1") return;
      arrowEl.classList.add('is-blinking');
    };
    if (mascotEl.classList.contains('visible-element')) {
      startArrowBlink();
    } else {
      const obs = new MutationObserver(() => {
        if (mascotEl.classList.contains('visible-element')) {
          startArrowBlink();
          obs.disconnect();
        }
      });
      obs.observe(mascotEl, { attributes: true, attributeFilter: ['class'] });
    }
  }
});

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

// Slidery v sekci Ukázky — univerzální obsluha více nezávislých slideru
(function initShowcaseSliders() {
  function init() {
    const sliders = document.querySelectorAll('.presentation-slider-container');

    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll('.slide');
      const prevBtn = slider.querySelector('.prev-slide');
      const nextBtn = slider.querySelector('.next-slide');
      const counterText = slider.querySelector('.slide-counter-text');
      const region = slider.querySelector('.slider-images');

      if (!slides.length || !prevBtn || !nextBtn || !counterText) return;

      let currentSlide = 0;
      const totalSlides = slides.length;

      function updateSlider() {
        slides.forEach((slide, index) => {
          slide.classList.toggle('active', index === currentSlide);
        });
        counterText.textContent = `${currentSlide + 1} / ${totalSlides}`;
      }

      function goNext() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      }

      function goPrev() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      }

      nextBtn.addEventListener('click', goNext);
      prevBtn.addEventListener('click', goPrev);

      if (region) {
        region.setAttribute('tabindex', '0');
        region.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
          if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Featured game embed — loading placeholder + 8s timeout fallback
(function () {
  const wrap = document.querySelector(".featured-game__embed");
  if (!wrap) return;
  const iframe = wrap.querySelector(".featured-game__iframe");
  const placeholder = wrap.querySelector(".featured-game__placeholder");
  if (!iframe || !placeholder) return;

  let loaded = false;
  iframe.addEventListener("load", () => {
    loaded = true;
    placeholder.dataset.state = "ready";
  });

  setTimeout(() => {
    if (loaded) return;
    placeholder.dataset.state = "error";
    placeholder.innerHTML =
      'Hra se nepodařila načíst. <a href="https://kouzelny-srdickovy-lektvar.vercel.app/" target="_blank" rel="noopener noreferrer">Otevřít v novém okně ↗</a>';
  }, 8000);
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

  const submitLabel = submitBtn.querySelector(".contact__submit-label");
  const submitArrow = submitBtn.querySelector(".contact__submit-arrow");
  const submitLoading = submitBtn.querySelector(".contact__submit-loading");

  function setLoading(on) {
    submitBtn.disabled = on;
    if (submitLabel) submitLabel.hidden = on;
    if (submitArrow) submitArrow.hidden = on;
    if (submitLoading) submitLoading.hidden = !on;
  }

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

    setLoading(true);

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
      setLoading(false);
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

(function initCookieConsent() {
  const CONSENT_KEY = "cookie_consent";
  const GA_ID = "G-XXXXXXXXXX"; // TODO: doplnit reálné GA4 ID

  function initGA() {
    if (GA_ID === "G-XXXXXXXXXX") return;
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function getBanner() {
    return document.getElementById("cookie-banner");
  }

  function hideBanner() {
    const banner = getBanner();
    if (banner) banner.hidden = true;
  }

  function showBanner() {
    const banner = getBanner();
    if (banner) banner.hidden = false;
  }

  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === "granted") {
    initGA();
  }

  function onReady() {
    if (consent === null) {
      setTimeout(showBanner, 800);
    }

    const btnAccept = document.getElementById("cookie-accept");
    const btnReject = document.getElementById("cookie-reject");
    const btnManage = document.getElementById("cookie-manage");

    btnAccept?.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "granted");
      hideBanner();
      initGA();
    });

    btnReject?.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "denied");
      hideBanner();
    });

    btnManage?.addEventListener("click", () => {
      localStorage.removeItem(CONSENT_KEY);
      showBanner();
    });
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
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

// Doodle reveal — fade-in když sekce vstoupí do viewportu
(function initDoodleReveal() {
  if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    document.querySelectorAll(".doodle").forEach((el) => {
      el.style.setProperty("--doodle-progress", "1");
    });
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".doodle").forEach((el) => {
    const section = el.closest("section");
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => gsap.to(el, { "--doodle-progress": 1, duration: 0.8 }),
      onEnterBack: () => gsap.to(el, { "--doodle-progress": 1, duration: 0.8 }),
      onLeave: () => gsap.to(el, { "--doodle-progress": 0, duration: 0.5 }),
      onLeaveBack: () => gsap.to(el, { "--doodle-progress": 0, duration: 0.5 }),
    });
  });
})();

// Egg hunt — 5 schovaných malin (1× hero maskot + 4× v sekcích)
(function initEggHunt() {
  const STORAGE_KEY = "km-eggs-found-v2";
  const TOTAL = 5;
  const HERO_ID = "hero";
  const DISCOUNT_CODE = "MAM_VSECH_5_POHROMADE";

  function loadFound() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr.map(String) : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveFound(set) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    } catch (e) {
      // noop
    }
  }

  const found = loadFound();
  const modal = document.getElementById("egg-modal");
  const closeBtn = document.getElementById("egg-modal-close");

  function markFoundEggs() {
    document.querySelectorAll(".egg-raspberry").forEach((egg) => {
      const id = egg.dataset.egg;
      if (id && found.has(id)) egg.classList.add("is-found");
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    try { sessionStorage.setItem("km-eggs-modal-shown", "1"); } catch (e) {}
    setTimeout(() => closeBtn?.focus(), 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  // Toast/počítadlo — společný UI prvek
  let toastEl = null;
  function showCounter(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "egg-counter-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(showCounter._t);
    showCounter._t = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 3500);
  }

  function registerFound(id) {
    if (found.has(id)) return false;
    found.add(id);
    saveFound(found);
    showCounter(`Další malina - ${found.size}/${TOTAL}! 🍓`);
    if (found.size >= TOTAL) {
      setTimeout(openModal, 1200);
    }
    return true;
  }

  // Veřejné API pro hero maskota
  window.startEggHunt = function () {
    if (!found.has(HERO_ID)) {
      registerFound(HERO_ID);
    }
  };

  markFoundEggs();

  // Event delegation — odolnější vůči pořadí načítání a překryvům
  document.addEventListener("click", (e) => {
    const egg = e.target.closest && e.target.closest(".egg-raspberry");
    if (!egg) return;
    const id = egg.dataset.egg;
    if (!id) return;
    e.preventDefault();
    e.stopPropagation();
    if (found.has(id)) return;
    egg.classList.add("is-found");
    registerFound(id);
  }, true);

  closeBtn?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
  });

  // Skrytá reset funkce pro testování — spustit v konzoli: resetEggHunt()
  window.resetEggHunt = function () {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem("km-eggs-modal-shown");
    } catch (e) {}
    console.log("Egg hunt resetován. Reloaduju stránku…");
    location.reload();
  };
})();

(function initPriceCalculator() {
  const calcInputs = document.querySelectorAll(".calculator-wrapper input");
  if (!calcInputs.length) return;

  const priceDisplay = document.getElementById("calc-price");
  const emptyState = document.getElementById("calc-empty-state");
  const itemsState = document.getElementById("calc-items-state");
  const selectedList = document.getElementById("calc-selected-list");
  if (!priceDisplay || !emptyState || !itemsState || !selectedList) return;

  function updateCalculator() {
    let total = 0;
    selectedList.innerHTML = "";
    let hasSelection = false;

    calcInputs.forEach((input) => {
      if (input.checked) {
        hasSelection = true;
        total += parseInt(input.value, 10) || 0;
        const li = document.createElement("li");
        li.textContent = input.getAttribute("data-label");
        selectedList.appendChild(li);
      }
    });

    priceDisplay.textContent = total.toLocaleString("cs-CZ");

    if (hasSelection) {
      emptyState.style.display = "none";
      itemsState.style.display = "block";
    } else {
      emptyState.style.display = "block";
      itemsState.style.display = "none";
    }
  }

  calcInputs.forEach((input) => {
    input.addEventListener("change", updateCalculator);
  });

  const resetBtn = document.getElementById("calc-reset");
  resetBtn?.addEventListener("click", () => {
    calcInputs.forEach((input) => {
      input.checked = false;
    });
    updateCalculator();
  });
})();

// FAQ accordion — "Možná vás zajímá"
(function initFaqAccordion() {
  const buttons = document.querySelectorAll('.faq__question');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq__item.is-open').forEach((open) => {
        open.classList.remove('is-open');
        const a = open.querySelector('.faq__answer');
        const q = open.querySelector('.faq__question');
        if (a) a.hidden = true;
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
