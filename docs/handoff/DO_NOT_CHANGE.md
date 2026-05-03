# DO_NOT_CHANGE.md

## Účel
Tento dokument vyjmenovává prvky projektu, které **nelze měnit bez výslovného souhlasu uživatele (Kateřiny)**. Sahá-li nový model na tyto prvky bez konkrétního pokynu, hrozí regrese, ztráta hodnoty nebo rozbití schválené UX.

---

## 1. NEMĚNNÉ — TECHNICKÝ STACK

- **Vanilla HTML/CSS/JS.** Žádný framework, build systém, TypeScript, npm/pnpm, JSX, SCSS atd.
- **Žádný bundler.** Soubory v rootu = produkční soubory.
- **GSAP a ScrollTrigger přes CDN.** Nenahrazovat lokální kopií ani jinou knihovnou.
- **Google Fonts** přes `<link>` v `<head>`. Nelokalizovat self-hostingem bez souhlasu.
- **Hosting Vercel z `main`.** Auto-deploy. Nepřesouvat na jiný hosting bez souhlasu.

---

## 2. NEMĚNNÉ — VIZUÁLNÍ IDENTITA

### Barvy (Logo Kit)
- Tmavá malina **`#7A1840`** (light mode akcent)
- Světlá malina **`#B83066`** (dark mode akcent)
- Inkoust **`#1A1714`**
- Hluboká čerň **`#0F0E0C`**
- Krém **`#F7F4EE`**
- Bílá **`#FFFFFF`** (light mode pozadí)

**V CSS používat tokeny**: `var(--accent)`, `var(--bg)`, `var(--text)`, `var(--text-muted)`, `var(--bg-elevated)`, `var(--border)`.

**Žádné jiné barvy** v nových pravidlech (např. fialová `#6b3fa0` zmíněná ve starším `CONTEXT.md` je neaktuální — neimportovat). Výjimka: hex `#a31f4f` se nachází v inline SVG doodlech a v `assets/malina.svg` jako legacy — **nechat na pokoji**, nepřepisovat na tokeny.

### Typografie
- `var(--font-display)` → **Syne 800** — nadpisy
- `var(--font-body)` → **Space Grotesk 400/500** — tělo
- `var(--font-mono)` → **IBM Plex Mono 600** — terminálové prvky, service tagy, slide counter

Nepřidávat další font bez souhlasu.

### Estetika
- **Hand-drawn vzhled** přes SVG filtr `#rough` (`feTurbulence` + `feDisplacementMap`).
- **Žádné** `box-shadow`, žádné gradient backgrounds, žádné glassmorphism, žádné neumorphism.
  - **Výjimka**: `.presentation-slider-container` má schválený ofset stín `box-shadow: -8px 8px 0 rgba(163, 31, 79, 0.2)` jako "doodle ofset" stín — neodstraňovat.
- Doodle ikony jsou kreslené **kubickými beziery s mírně off-line kontrolními body**, stroke-width 1.8–2.2. Nepřidávat ikony z knihoven (Font Awesome, Material Icons atd.).
- **Žádné stock fotky.** Pouze ručně vytvořené nebo schválené ilustrace/screenshoty.

---

## 3. NEMĚNNÉ — FORMULACE A TEXTY

### Hero
- Tagline: "Knižní redaktorka, která se naučila vibe kódovat..." — schválená formulace.
- Hero modal text "Máš první malinu. Gratuluji!" + instrukce egg huntu — neměnit bez schválení.

### Sekce Ukázky
- **Featured iframe blok** (Kouzelný srdíčkový lektvar):
  - Iframe URL `https://kouzelny-srdickovy-lektvar.vercel.app/` — neměnit.
  - Popisek "Kouzelný srdíčkový lektvar - hra pro děti na cvičení paměti..." schválen v commit `e048a26`.
  - Loading hláška "🪄 Připravuju kouzla…" — neměnit.
  - Mobilní upozornění "📱 Pro nejlepší zážitek otoč telefon na šířku." — neměnit.
- **Slider 1 (prezentace)**: 18 slidů, header "Interaktivní prezentace", popis "Proklikejte si slajdy pomocí šipek." Cesta `assets/prezentace/hra-pro-deti-XX.png`.
- **Slider 2 (knížka)**: 10 stran, header "Dětská knížka", popis "Ukázka 10stránkové knížky. Proklikejte si ji přímo v prohlížeči." Cesta `assets/kniha/kniha-beltaine-XX.png`.
- **Carousel**: 3 karty (Nakrm zvířátko, Hledací omalovánka, Omalovánka podle čísel) — zbylé byly odstraněny v commitu `ef0ce81`. Nevracet.

### Egg hunt
- **Slevový kód `MAM_VSECH_5_POHROMADE`** — fixní, je vytištěný v modalu.
- Toast text **"Další malina - X/5! 🍓"** — schválená neutrální formulace (commit `9bf6856`).
- **NEPŘIDÁVAT** zpět hlášku "Jejda, rozsypaly se mi maliny!" (odstraněna `3470e20`).
- **NEPŘIDÁVAT** auto-trigger modalu při page load (odstraněn `1acf671`).
- **NEPŘEPISOVAT** maliny na `position: fixed` v `<body>` — bylo zkoušeno (`2da35f5`), revertováno (`b9bb6be`).

### Tón obecně
- **Genderově neutrální.** Žádné "našla jsi", "udělala jsi", "byla jsi".
- Neformální, ne familiérní.
- Žádné anglicismy, kde existuje česká varianta.

---

## 4. NEMĚNNÉ — TECHNICKÁ ŘEŠENÍ

### localStorage / sessionStorage klíče
- **`km-theme`** — hodnoty `light` / `dark` (theme toggle)
- **`km-eggs-found`** — JSON pole nalezených ID malin
- **`km-eggs-modal-shown`** (sessionStorage) — flag zobrazení vítězného modalu
- **`km-cookies-consent`** — `granted` / `denied`
- High-score klíč hry Skákající malina (`game.js:74`)

**Změna těchto klíčů znamená resetování dat všem návštěvníkům.** Neměnit bez migrace.

### Skryté JS API
- **`window.resetEggHunt()`** — vymaže egg hunt state a reload (debug helper)
- **`window.startEggHunt()`** — registruje hero malinu (volá ji hero modal)

### Egg hunt struktura
- **5 malin total** (`TOTAL = 5` v `script.js:720`).
  - Hero maskot (registrován jako string ID `"hero"` přes `startEggHunt()`, NEMÁ `data-egg`)
  - 4 maliny s `data-egg` atributem: hodnoty `2`, `3`, `4`, `5`
  - **POZN**: `data-egg="4"` (`.egg-raspberry--pssst`) má 2 instance — jedna v pricing (`index.html:713`), kopie v contact (`index.html:944`). Sdílí JS slot.
- HTML lokace malin:
  - `data-egg="2"` (`.egg-raspberry--cta`): v `.egg-slot--ukazky` mezi slidery a carouselem v `#ukazky`.
  - `data-egg="3"` (`.egg-raspberry--book`): v `.showcase-grid-2col`, vystředěná mezi 2 slidery.
  - `data-egg="4"` (`.egg-raspberry--pssst`): inline v `<p class="pricing__easter-egg">`.
  - `data-egg="4"` (kopie): inline-pozicovaná za submit tlačítkem v contact form.
  - `data-egg="5"` (`.egg-raspberry--submit`): v sekci `#co-umim` na levém okraji.
- Modal `#egg-modal` v `index.html:1018-1027`.

### Egg hunt CSS — `!important` overrides (vědomé porušení původní logiky)
- `.egg-raspberry--cta`, `.egg-raspberry--submit` (CSS) a kopie pssst v contact (inline) mají:
  - `opacity: 1 !important;`
  - `animation: none !important;`
  - `pointer-events: auto !important;`
- **Důvod**: zákaznice požadovala, aby maliny zůstaly viditelné i po sebrání.
- **Důsledek**: `.is-found` třída se aplikuje JS-em správně (počítadlo funguje), ale vizuál po sebrání zůstává stejný.
- **Neodstraňovat tyto overrides** bez explicitního pokynu Kateřiny.

### Featured iframe blok
- Iframe atributy: `loading="lazy"`, `allow="autoplay; fullscreen"`, žádné sandbox restrikce.
- 8s timeout fallback se zprávou "Hra se nepodařila načíst. [Otevřít v novém okně ↗]".
- JS handler v `script.js` v IIFE před carousel kódem.

### Slider JS handler
- Universal `initShowcaseSliders` IIFE v `script.js` iteruje přes `.presentation-slider-container` a obsluží libovolný počet sliderů.
- Klávesová navigace: ← →.
- **Nepřejmenovávat třídy** `.prev-slide`, `.next-slide`, `.slide-counter-text`, `.slide.active` — JS na ně závisí.

### Formspree
- **Endpoint formuláře kontakt**: `https://formspree.io/f/mzdopbaq` — neměnit bez souhlasu (napojeno na konkrétní Formspree účet).

### Git config
- **Author email `k.schmiedtova@seznam.cz`** — Vercel jinak commit odmítne.
- **Co-author podpis** v každém commitu: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- **Push pouze na `main`** (pokud uživatel nezadá jinak).
- **Necommitovat / nepushovat automaticky** bez explicitního pokynu.

---

## 5. NEMĚNNÉ — STRUKTURA A LAYOUT SEKCÍ

### Navigace
- KM▌ logo vlevo (malinová, IBM Plex Mono).
- Odkazy vpravo: **Co umím | Ukázky | Ceny | O mně | Kontakt** (v tomto pořadí).
- Pod 768 px: hamburger + full-screen overlay menu (zavře ×, klik na odkaz, Esc).
- Theme toggle ikona uvnitř navu vpravo, 1.2rem, bez pozadí.

### Pořadí sekcí v `<main>`
1. Hero
2. S čím vám můžu pomoci (`#co-umim`) — obsahuje malinu #5 plovoucí
3. O mně (`#o-mne`)
4. Jak to probíhá (`#jak-to-probiha`)
5. Ukázky (`#ukazky`) — featured iframe + 2col grid (slidery + malina #3) + carousel (+ malina #2)
6. Kolik co stojí? (`#ceny`) — obsahuje malinu #4
7. Kontakt (`#kontakt`) — obsahuje kopii maliny #4 za submit
8. Footer

### Karty "S čím vám můžu pomoci"
- **6 karet** v gridu 3/2/1.
- **Ceny skryté** (opacity 0, max-height 0) v defaultu, fade-in při hoveru desktop, vždy viditelné na touch (`@media (hover: none)`).
- Pořadí karet a ceny — neměnit bez souhlasu.

### Sekce "O mně"
- Dvousloupcový grid: vlevo portrét (max 320×420 px, transparent PNG, **žádný blend mode**), vpravo 3 odstavce.
- Roztřesený malinový rámeček kolem portrétu (SVG `<rect>` Q-curve + filtr `#rough`, animace přes `stroke-dashoffset`).

### Sekce "Ukázky" — pevná struktura po této session
1. Section title "Ukázky"
2. Subtitle "Tyhle stránky jsou ukázkou jednoduchého webu..."
3. Featured iframe blok `.featured-game` s hrou Lektvar
4. `.showcase-grid-2col` se 2 `.live-showcase-item` (slidery prezentace + knížka), uvnitř malina `data-egg="3"`
5. `.egg-slot--ukazky` (height: 0) s malinou `data-egg="2"`
6. `.works__stage` se 3 kartami carouselu

---

## 6. NEMĚNNÉ — CHOVÁNÍ FUNKCÍ

- **Theme toggle**: změna mezi light/dark, perzistence v `localStorage`. Iniciální stav respektuje `prefers-color-scheme`.
- **Egg hunt**:
  - Klik na malinu → registrace v `found` setu → toast s počtem.
  - Po 5/5 → vítězný modal se slevovým kódem.
  - Hero malina se aktivuje přes hero modal tlačítko (`startEggHunt()`).
  - Modal lze zavřít: tlačítko, klik mimo, Esc.
- **Mobile menu**: hamburger ikona, full-screen overlay, zavírá se třemi způsoby (×, klik na odkaz, Esc).
- **Cookie consent**: zobrazí se, pokud `km-cookies-consent` neexistuje. Tři volby: granted, denied, dismiss.
- **Slidery**: ← → tlačítka, klávesnice ← →, cyklení (poslední slide → první), counter "X / Y".

---

## 7. VYŽADUJE POTVRZENÍ PŘED ZMĚNOU

Tyto věci NEJSOU explicitně zakázané, ale před změnou se zeptat:

- **Texty na kartách "S čím vám můžu pomoci"** (názvy služeb, ceny, popisky).
- **Texty v sekci "O mně"** (3 odstavce o Kateřině).
- **Texty v sekci "Jak to probíhá"** (4 kroky).
- **Cenovky v sekci "Kolik co stojí?"**.
- **Pozice egg hunt malin** — aktuální pozice `top: 45%/62%/82%`/atd. jsou výchozí, doladí se.
- **Kontaktní formulář** — pole, validace, success/error stavy.
- **Hra Skákající malina** (`game.js`) — fyzika, obtížnost, vizuál.
- **Doodle ilustrace** v sekcích — pozice, počet, jaký svg.
- **Stránka GDPR** — texty (jsou právní, mohou být schválené právníkem).
- **Cookie consent text** — formulace ano/ne.
- **Animace v hero** (typing efekt KATEŘINA → MLSNOVÁ → tagline) — tempo, sekvence.
- **Footer** — obsah, layout.
- **Ošetření duplicity `data-egg="4"`** — současný stav (sdílí slot) je přijatý, ale lze přemyslet.

---

## 8. CO SE MŮŽE MĚNIT VOLNĚ (bez ptaní)

- Drobné CSS úpravy mimo barvu / tvar (např. `padding`, `gap`, `font-size` v rámci stejné stupnice).
- Komentáře v kódu (přidávat / odstraňovat dle smyslu).
- Optimalizace performance, pokud nemění vizuál ani chování.
- Oprava typo / drobných pravopisných chyb v textech (ale upozornit, co se mění).
- Aktualizace `docs/handoff/` dokumentů (pokud reflektují skutečnost).

---

## Když si nejsi jistý
- **Zeptej se** Kateřiny dřív, než edituješ.
- Pokud je požadavek nejednoznačný, navrhni 2-3 varianty a nech ji vybrat.
- Pokud je požadavek v rozporu s tímto dokumentem, výslovně to upozorni a počkej na potvrzení.
