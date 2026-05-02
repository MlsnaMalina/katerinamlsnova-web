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

**Žádné jiné barvy** (např. fialová `#6b3fa0` zmíněná ve starším `CONTEXT.md` je neaktuální — **neimportovat**).

### Typografie
- **Syne 800** — nadpisy
- **Space Grotesk 400/500** — tělo
- **IBM Plex Mono 600** — terminálové prvky

Nepřidávat další font bez souhlasu.

### Estetika
- **Hand-drawn vzhled** přes SVG filtr `#rough` (`feTurbulence` + `feDisplacementMap`).
- **Žádné** `box-shadow`, žádné gradient backgrounds, žádné glassmorphism, žádné neumorphism.
- Doodle ikony jsou kreslené **kubickými beziery s mírně off-line kontrolními body**, stroke-width 1.8–2.2. Nepřidávat ikony z knihoven (Font Awesome, Material Icons atd.).
- **Žádné stock fotky.** Pouze ručně vytvořené nebo schválené ilustrace/screenshoty.

---

## 3. NEMĚNNÉ — FORMULACE A TEXTY

### Hero
- Tagline: "Knižní redaktorka, která se naučila vibe kódovat..." — schválená formulace.
- Hero modal text "Máš první malinu. Gratuluji!" + instrukce egg huntu — neměnit bez schválení.

### Egg hunt
- **Slevový kód `MAM_VSECH_5_POHROMADE`** — fixní, je vytištěný v modalu.
- Toast text **"Další malina - X/5! 🍓"** — schválená neutrální formulace (commit `9bf6856`).
- **NEPŘIDÁVAT** zpět hlášku "Jejda, rozsypaly se mi maliny!" (odstraněna `3470e20`).
- **NEPŘIDÁVAT** auto-trigger modalu při page load (odstraněn `1acf671`).

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
- High-score klíč hry Skákající malina ([game.js:74](game.js:74))

**Změna těchto klíčů znamená resetování dat všem návštěvníkům.** Neměnit bez migrace.

### Skryté JS API
- **`window.resetEggHunt()`** — vymaže egg hunt state a reload (debug helper)
- **`window.startEggHunt()`** — registruje hero malinu (volá ji hero modal)

### Egg hunt struktura
- **5 malin total.** Hero maskot (ID `hero`) + 4 maliny v sekcích (`data-egg="2"` až `"5"`).
- HTML lokace 4 malin: CTA card, Pohádková knížka, "pssst" text, submit tlačítko (viz [index.html:312, 382, 660, 891](index.html:312)).
- Modal `#egg-modal` v [index.html:1018-1027](index.html:1018).

### Formspree
- **Endpointy formulářů** (kontakt, ceník) — neměnit bez souhlasu (jsou napojené na konkrétní Formspree účet).

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
2. S čím vám můžu pomoci (`#co-umim`)
3. O mně (`#o-mne`)
4. Jak to probíhá (`#jak-to-probiha`)
5. Ukázky (`#ukazky`)
6. Kolik co stojí? (`#ceny`)
7. Kontakt (`#kontakt`)
8. Footer

### Karty "S čím vám můžu pomoci"
- **6 karet** v gridu 3/2/1.
- **Ceny skryté** (opacity 0, max-height 0) v defaultu, fade-in při hoveru desktop, vždy viditelné na touch (`@media (hover: none)`).
- Pořadí karet a ceny: **viz `SESSION_NOTES.md` historie** — neměnit bez souhlasu.

### Sekce "O mně"
- Dvousloupcový grid: vlevo portrét (max 320×420 px, transparent PNG, **žádný blend mode**), vpravo 3 odstavce.
- Roztřesený malinový rámeček kolem portrétu (SVG `<rect>` Q-curve + filtr `#rough`, animace přes `stroke-dashoffset`).

### Egg hunt CSS (po této session)
- `.egg-raspberry { opacity: 1 }` — **NEVRACET** na 0.25.
- `.egg-raspberry:hover { opacity: 1; transform: scale(1.15) }`.
- `.egg-raspberry.is-found` — pulse animace končící na `opacity: 0.15`, `pointer-events: none`.
- `.egg-raspberry--pssst.is-found { opacity: 0.15 }`.

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

---

## 7. VYŽADUJE POTVRZENÍ PŘED ZMĚNOU

Tyto věci NEJSOU explicitně zakázané, ale před změnou se zeptat:

- **Texty na kartách "S čím vám můžu pomoci"** (názvy služeb, ceny, popisky).
- **Texty v sekci "O mně"** (3 odstavce o Kateřině).
- **Texty v sekci "Jak to probíhá"** (4 kroky).
- **Cenovky v sekci "Kolik co stojí?"**.
- **Kontaktní formulář** — pole, validace, success/error stavy.
- **Hra Skákající malina** ([game.js](game.js)) — fyzika, obtížnost, vizuál.
- **Doodle ilustrace** v sekcích — pozice, počet, jaký svg.
- **Stránka GDPR** — texty (jsou právní, mohou být schválené právníkem).
- **Cookie consent text** — formulace ano/ne.
- **Animace v hero** (typing efekt KATEŘINA → MLSNOVÁ → tagline) — tempo, sekvence.
- **Footer** — obsah, layout.

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
