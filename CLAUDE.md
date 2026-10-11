# CLAUDE.md — katerinamlsnova.cz

Kontextový soubor pro Claude Code. Přečti před každou prací na projektu.
Odpovídá nasazenému webu k 2026-10-11 (ověřeno proti https://www.katerinamlsnova.cz/).

---

## Projekt v jedné větě

Web pro vibecoding činnost Kateřiny Mlsnové — nabízí tvorbu jednoduchých webů, her, kvízů, kalkulaček, aplikací a interaktivních materiálů pro malé klienty (živnostníci, lektoři, malé projekty). Web je zároveň ukázkou její práce.

**Důležité rámování:** Tohle NEJSOU stránky knižní redaktorky — jsou to stránky vibecodérky. Kateřinina redaktorská profese se na webu zmiňuje jen okrajově (služba „Kontrola a posouzení AI textů", sekce O mně) a nesmí se stát hlavní identitou webu.

---

## Technický stack

- **Vanilla HTML / CSS / JS** — žádný framework, žádný build systém, žádný npm
- **Soubory v rootu = produkční soubory** (Vercel je servíruje přímo, bez kompilace — pozor, veřejně dostupné jsou i `.md` soubory a `docs/`)
- **Hosting**: Vercel, auto-deploy z větve `main` přes GitHub
- **Formuláře**: Formspree (endpoint `mzdopbaq`) — neměnit
- **Analytika**: GA4 s reálným ID `G-PDXPMWRJB4`, načítá se lazy až po souhlasu s cookies
- **Animace**: IntersectionObserver + Web Animations API + View Transitions API, žádná knihovna — GSAP/ScrollTrigger byl odstraněn kvůli výkonu (commit `c9e093a`), nevracet; Motion/Remotion/21st.dev se na web nepoužívají (React/Tailwind zakázané, video zatím ne — rozhodnutí 2026-10-11)
- **Fonty**: Google Fonts — Syne 800, Space Grotesk 400/500, IBM Plex Mono 600, Caveat 600/700
- **Žádný TypeScript, SCSS, Tailwind, React, Vue ani nic podobného**

---

## Klíčové soubory

| Soubor | Obsah | Orientační velikost |
|---|---|---|
| `index.html` | Kompletní DOM, všechny sekce, SVG filtry v `<defs>`, JSON-LD, OG meta | ~1 500 ř. |
| `style.css` | Všechny styly, CSS tokeny, dark/light mode | ~4 850 ř. |
| `script.js` | Init fronta `__initQueue`, animace, navigace, slidery, lightbox, egg hunt, kalkulačka, FAQ, cookie consent, Formspree | ~980 ř. |
| `game.js` | Canvas hra „Skákající malina" (sekce `#hra`) | ~620 ř. |
| `404.html` | Vlastní 404 stránka | |
| `zasady-ochrany-osobnich-udaju.html` | GDPR stránka | |
| `vercel.json` | Redirect + rewrites pro subprojekt `/krejcirik-bazeny` | |
| `robots.txt`, `sitemap.xml` | SEO | |

**CSS je velký** — při hledání vždy použij Grep, ne ruční prohlížení.
Nové JS inity registruj přes `__initQueue.push(fn)` (jediný DOMContentLoaded dispatcher na začátku `script.js`).

---

## Vizuální identita — NEMĚNIT bez souhlasu

### Barvy (Logo Kit — jediná platná paleta)

| Token | Hex | Použití |
|---|---|---|
| `--accent` | `#7A1840` (light) / `#B83066` (dark) | Primary CTA, interactive |
| `--bg` | `#FFFFFF` (light) / `#0F0E0C` (dark) | Pozadí stránky |
| `--bg-elevated` | `#F4F4F5` (light) / `#1A1714` (dark) | Karty, elevated plochy (token `--color-light`) |
| `--text` | `#1A1714` | Hlavní text |
| `--text-muted` | rgba(26,23,20,0.7) | Sekundární text |
| `--border` | rgba(26,23,20,0.12) | Jemné linky |

**Béžová / krémová je zakázaná** (dřívější `--color-cream: #F7F4EE` nahrazen neutrální `--color-light: #F4F4F5`, 2026-10-11) — světlé plochy jen bílé nebo neutrálně šedé.

**Vždy piš `var(--accent)`, nikdy hardcoded hex v nových pravidlech.**
Výjimka: hex `#a31f4f` v inline SVG doodlech a `assets/malina.svg` je legacy — nechej být.

### Typografie

| Token | Font | Váha | Použití |
|---|---|---|---|
| `var(--font-display)` | Syne | 800 | Nadpisy sekcí |
| `var(--font-body)` | Space Grotesk | 400/500 | Tělo textu, nav |
| `var(--font-mono)` | IBM Plex Mono | 600 | Terminál, tagy, slidery |
| — | Caveat | 600/700 | Pouze kalkulačka (nadpisy, otázky) |

Další font nepřidávat.

### Maskot — Mlsná Malina

- Oficiální brand maskot, charakterový list: `docs/brand/maskot-malina.html`
- 10 póz jako SVG v `docs/brand/maskot/` (tělo `#a31f4f`, linky `#7a1438` — legacy paleta maskota, neměnit)
- Hero maskot na webu (`assets/malina.svg` + eye-tracking) zůstává nezávislý — pózy jsou pro thumbnaily, posty, prezentace
- Hlášky maskota: krátké, genderově neutrální („Pssst!", „Mňam!", „Hotovo!", „Další malina!")

### Estetika

- **Hand-drawn vzhled** přes SVG filtr `#rough` (`feTurbulence` + `feDisplacementMap`) — definovaný jednou v `index.html <defs>`
- **Žádné rozmazané** `box-shadow` — jen tvrdý ofsetový stín bez rozostření: `-8px 8px 0 rgba(163,31,79,0.2)` (`.presentation-slider-container`, `.win-terminal`, `.hero-malina-modal__panel`, `.egg-modal__panel`), toast `.egg-counter-toast` má `-5px 5px 0 rgba(26,23,20,0.18)`, cookie lišta je bez stínu (sjednoceno 2026-10-11)
- **Žádné** gradients, glassmorphism, stock fotky, ikony z knihoven
- Doodle ikony = kubické bezier křivky, stroke-width 1.8–2.2

---

## Struktura sekcí (pořadí v `<main>`)

1. **Hero** (`#hero`) — logo KATEŘINA/MLSNOVÁ, 2 taglines, CTA („Nezávazně se zeptat" → `#kontakt`, „Spočítat orientační cenu" → `#kalkulator`), Windows terminál s typewriter animací, pod ním náčrt webu `.hero-build`, který se po prvním příkazu nakreslí (jen desktop), maskot malina s eye-trackingem (klik = start egg huntu). Žádnou další malinu do hero nepřidávat (rozhodnutí 2026-10-11)
2. **S čím vám můžu pomoci** (`#co-umim`) — 6 karet služeb: Jednoduchý web · Interaktivní hry, kvízy a kalkulačky · Aplikace / Online prezentace · Pracovní listy, materiály a digitalizace · Kontrola a posouzení AI textů · Máte jiný nápad? + malina #5
3. **Ukázky** (`#ukazky`) — viz níže
4. **Je to pro vás, pokud…** (`#je-to-pro-vas`) — dva sloupce ano/ne v rámečku
5. **Proč to dává smysl** (`#proc-to-dava-smysl`) — dva odstavce + CTA Kontakt
6. **Kolik co stojí?** (`#ceny`) — 6 cenových řádků + pssst malina #4 + kalkulačka (`#kalkulator`)
7. **O mně** (`#o-mne`) — dvousloupcový grid, portrét + text (právnička, cesta k AI)
8. **Jak to probíhá** (`#jak-to-probiha`) — 4 kroky s doodle šipkami
9. **Malá přestávka** (`#hra`) — canvas hra (game.js)
10. **Možná vás zajímá** (`#mozna-vas-zajima`) — FAQ accordion, 6 otázek
11. **Napište mi** (`#kontakt`) — Formspree formulář + malina #3 + e-mail reveal
12. **Footer** — IČO, adresa na klik, GDPR odkaz, správa cookies

Navigace (desktop i mobilní overlay): S čím vám mohu pomoci · Ukázky · Kolik to stojí? · O mně · Jak to probíhá · FAQ · Kontakt. Theme toggle 🌙/☀️ vpravo, hamburger pod 768 px.

### Sekce Ukázky — aktuální struktura („police")

Tři police (`.shelf`, nadpisy Caveat + doodle podtržení), karty `.shelf-card` v gridu 2/1 sloupce. Aplikace odkazují na **živá dema s fiktivními daty** (`?demo` / `/demo` URL — nic z nich se neukládá, dema jsou v repozitářích jednotlivých aplikací).

1. **Police Aplikace** (`#ukazky-aplikace`):
   - Featured **VypusTo** — slider 8 snímků z `assets/Vypus-to/` (pozor, první slide je `2.png`, pak `1.png` a `3–8.png`) + tlačítko `.shelf-demo-btn` → `vypus-to.vercel.app/?demo`
   - Karty: **Finance** (→ `finance-ten-topaz.vercel.app/demo`), **Můj deník · to do** (→ `bullet-journal-todo.vercel.app/?demo`), **Výplata** (→ `vyplata.vercel.app/?demo`), **Matýsek** (→ `matysek.vercel.app/demo`; ostrá verze je za heslem)
2. `.egg-slot--ukazky` — malina `data-egg="2"` (`.egg-raspberry--cta`)
3. **Police Hry a kvízy** (`#ukazky-hry`), v tomto pořadí: Emoční příšerky (→ `/emoce`, rewrite ve `vercel.json`) · Neznalost dobrých knih neomlouvá (šibenice) · Hry do letadla na mobil (`hry-do-letadla.vercel.app`) · Nakrm mlsné zvířátko · Kouzelný srdíčkový lektvar; pod gridem odkaz na `#hra`
4. **Police Materiály a digitalizace** (`#ukazky-materialy`):
   - Redakční checklist — první karta; `data-lightbox-wide` + `data-slides-*` (5 snímků `assets/redakcni-checklist/redakcni-checklist-01–05.webp`: přehled, detail knihy, checklist fází, paragrafy po částech, generování e-mailu); bez živého odkazu
   - Interaktivní checklist dotisků — karta s `data-lightbox-wide`, klik otevře širokou variantu lightboxu (`assets/checklist-dotisku.webp`, jen obrázek, živý odkaz záměrně není)
   - Prázdninový balíček pro děti — klik listuje knížku v lightboxu (`data-slides-*`, `assets/kniha/*.webp`), CTA → `polevsko-2026.vercel.app`

**Screenshoty interních aplikací (oba checklisty) obsahují jen vymyšlená data.** Nejsou to výřezy z originálu — rozhraní je přestavěné v HTML s fiktivními knihami, lidmi, ISBN a bez názvů interních nástrojů (Navision, PublishOn, Yammer, ASPI, značka nakladatelství) a vyfocené v Chromiu. Skutečná data z Kateřininých screenshotů se na web nesmí dostat nikdy. Karty Interaktivní prezentace a Matýskův piknik byly odstraněny 2026-10-11.

Karty s vysokými screenshoty mají `work-card__media--cover` (ořez shora); klik na kartu = lightbox, klik na CTA = odkaz. Samostatné karty omalovánek a knížky nahradil Polevsko balíček (schváleno 2026-07-16).

---

## Egg Hunt — NEMĚNIT logiku, klíče ani názvy tříd

| Malina | `data-egg` | Selektor | Umístění |
|---|---|---|---|
| #1 (hero) | bez atributu (ID `"hero"`) | `#hero-mascot-container` | hero maskot; klik volá `startEggHunt()` |
| #2 | `2` | `.egg-raspberry--cta` | `.egg-slot--ukazky` v `#ukazky` |
| #3 | `3` | `.egg-raspberry--pssst` | za tlačítkem Odeslat v `#kontakt` (pozicovaná inline styly) |
| #4 | `4` | `.egg-raspberry--pssst` | inline v textu „…pssst…" v `#ceny` |
| #5 | `5` | `.egg-raspberry--submit` | plovoucí vlevo v `#co-umim` |

- **Názvy tříd nesedí k umístění** (`--pssst` je i v kontaktu, `--submit` je v `#co-umim`) — historické, ale funkční. Kateřina to ví a akceptuje. **Nepřejmenovávat, nerefaktorovat.**
- `TOTAL = 5` v `script.js`; klik se obsluhuje delegací na `document` (capture) — nevázat na maliny vlastní click handlery
- Slevový kód po sebrání všech: **`MAM_VSECH_5_POHROMADE`** — modal slibuje slevu **20 %**
- Storage klíč: `km-eggs-found-v2` (JSON pole; legacy klíč `km-eggs-found` se při načtení stránky maže)
- Maliny #2, #5 (v CSS) a #3 (inline styl) mají `opacity: 1 !important; animation: none !important` — záměrné, maliny zůstávají viditelné i po sebrání, nechej být
- Toast text: `"Další malina - X/5! 🍓"` — schválená genderově neutrální formulace
- Debug API: `window.resetEggHunt()`, `window.startEggHunt()`

---

## localStorage / sessionStorage klíče

| Klíč | Úložiště | Hodnoty |
|---|---|---|
| `km-theme` | localStorage | `"light"` / `"dark"` |
| `km-eggs-found-v2` | localStorage | JSON pole ID (např. `["hero","2","3"]`) |
| `cookie_consent` | localStorage | `"granted"` / `"denied"` — POZOR, bez `km-` prefixu |
| `km-eggs-modal-shown` | sessionStorage | `"1"` |
| `katherine-game-highscore` | localStorage | číslo (skóre) |

**Změna klíčů = reset dat u všech návštěvníků. Neměnit.**

---

## Interaktivní funkce (JavaScript)

- **Terminálová animace** — hero, 2 sekvence („> kateřino, vytvoř mi jednoduchý web", „> system --spust_malinu"), ~28 ms/znak; po první sekvenci `buildHeroSite()` nakreslí `.hero-build` (~1,9 s, třída `is-pending` drží výchozí skrytý stav), druhá sekvence startuje o 1 400 ms později; na mobilu (≤768 px) se terminál i náčrt přeskakují a maskot se ukáže rovnou
- **Eye-tracking mascot** — malina sleduje kurzor (sin/cos fyzika)
- **Theme toggle** — 🌙/☀️ v navu, auto-detect z `prefers-color-scheme`, manuální override
- **Slidery** (`initShowcaseSliders`) — universal handler pro `.presentation-slider-container`, ← → klávesy, cyklení, counter `X / Y`; třídy `.prev-slide`, `.next-slide`, `.slide-counter-text`, `.slide.active` nepřejmenovávat
- **Police + lightbox** — klik na `.shelf-card` otevře lightbox; karty s `data-slides-prefix/ext/count/pad` mají v lightboxu vícestránkový slider, karty s `data-lightbox-wide` širokou variantu (checklisty). Otevření/zavření běží přes View Transitions API: `open()`/`close()` obalují `openNow()`/`closeNow()`, obrázek nese `view-transition-name: km-shot`, třída `.lightbox--morph` vypíná CSS přechody během přechodu; bez podpory nebo při `prefers-reduced-motion` se otevře postaru. `.lightbox__close` má `z-index: 3`, jinak ho překryje `.lightbox__media`. Coverflow carousel byl odstraněn 2026-07-16.
- **Kalkulačka** (`#kalkulator`) — radio „cíl" (2 000–9 000 Kč), radio „podklady" (+0/+3 000/+5 000), checkboxy „doplňky", účtenka s výpisem a součtem, reset; ceny jsou v `value` atributech HTML. Součet doběhne na novou hodnotu (`showTotal`, 420 ms), nově přidaný řádek dostane `.is-new` a vjede
- **FAQ accordion** — jedna otevřená naráz, `hidden` + `aria-expanded`, klávesnice (šipky, Escape)
- **Kontaktní formulář** — async Formspree, client validace, loading/success/error stavy
- **Email reveal** (kontakt) a **adresa na klik** (footer) — anti-spam obfuskace
- **Cookie consent** — banner (přijmout/odmítnout), „Spravovat cookies" ve footeru banner znovu otevře, lazy GA4 load po souhlasu
- **Canvas hra** — Skákající malina (Space/tap = skok, gravity + vítr), high-score v localStorage
- **Dokreslování rámečků** — poslední init v `script.js`: `.skill-card__frame rect`, `.work-card__frame rect`, `.fit__frame rect` a `.shelf__underline path` se při prvním příjezdu do viewportu dokreslí (WAAPI, stroke-dashoffset, 900 ms); co je vidět už při načtení, zůstává; při `prefers-reduced-motion` vypnuto
- **Odezva na stisk** — blok „Pohyb a odezva" na konci `style.css`: tlačítka a CTA mají na `:active` vlastnost `scale: 0.97` (samostatná vlastnost, aby nepřebila existující `transform`/`transition`). Maliny egg huntu do seznamu nepatří

---

## Tón textů

- **Neformální, ne familiérní** — jako přátelský profesionál, ne kamarád
- **Genderově neutrální** — žádné „našla jsi", „udělala jsi"
- **Česky** — žádné anglicismy kde existuje česká alternativa
- Sebeironický humor je v pořádku
- Web mluví hlasem **vibecodérky** — ne knižní redaktorky (viz Projekt v jedné větě)

---

## Co NESMÍ být změněno bez výslovného souhlasu

- Logo Kit barvy a typografická sada
- Hand-drawn estetika (`#rough` filtry) — žádné rozmazané box-shadow (jen tvrdý ofset), gradients
- Hero taglines („Weby, hry a interaktivní materiály pro malé projekty…", „Pro živnostníky, lektory, řemeslníky…")
- Formspree endpoint (`mzdopbaq`)
- Slevový kód `MAM_VSECH_5_POHROMADE` a slíbených 20 %
- Egg hunt: klíče, počet malin, `data-egg` hodnoty, názvy tříd, `!important` overrides
- Ceny v ceníku a v kalkulačce
- `<iframe>` / embed URL (vždy se zeptat)
- Pořadí sekcí v `<main>`
- Git author email (viz sekce Git níže)

---

## Git workflow

```
git config user.email "k.schmiedtova@seznam.cz"   # povinné — Vercel jinak odmítne
```

- **Push vždy na `main`** (ne feature branch, pokud Kateřina neřekne jinak)
- Ve worktree: po commitu udělej fast-forward merge do `main` a pushni `main`
- Commit messages: imperativ, concise (česky nebo anglicky)
- Co-author v každém commitu (aktuálně používaný model):
  ```
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
  ```
- **Commit + push provádíš rovnou** po dokončení a ověření změny — bez ptaní
- Každý push = okamžitý deploy na Vercel → zvažuj před pushnutím

---

## Jak Kateřina pracuje

- Komunikuje česky, píše přes Claude Code CLI
- **Jeden úkol = jeden prompt = jeden commit** — nedomýšlej další kroky
- Hodnotí výsledek vizuálně, ne kódem — pokud se ptá na problém, reaguj na to, co vidí
- Chce konkrétní odpovědi bez dlouhých úvodů
- Není programátorka — nemůže sama opravit kód
- Screenshoty = preferovaný způsob komunikace problémů

---

## Limity a rizika

- **Žádný linter ani testy** — kontrola výhradně vizuální
- **CSS je velký** (~5 000 ř.) — hledej přes Grep, riziko duplicitních selektorů
- **Bez build systému** — žádné ES moduly (`import/export`), vše přes `<script src>`
- **`docs/handoff/` je historický snapshot k 2026-05-03** — popisuje neexistující stav (iframe Lektvar, GSAP, 3 karty carouselu, jiné rozmístění malin). Neber jako aktuální pravdu; rozhoduje kód a tento soubor.

---

## Rychlá orientace v repo

```
assets/
  katerina-portrait-transparent.webp   # portrét (O mně)
  malina.svg                           # maskot + egg hunt maliny
  malina-game.svg, mravenec-game.svg, brouk-game.svg, wind-game.svg  # hra
  og-image.png, og-image.svg           # sdílecí náhled
  checklist-dotisku.webp               # Ukázky — karta checklistu dotisků (wide lightbox, vymyšlená data)
  redakcni-checklist/redakcni-checklist-01–05.webp  # Ukázky — Redakční checklist (slider, vymyšlená data)
  hangman-shot.png                     # Ukázky — karta šibenice
  hra-nakrm-mlsne-zviratko.webp, hra-kouzelny-srdickovy-lektvar.webp
  omalovanka-doodle-hledej.webp, omalovanka-podle-cisel.webp  # už bez karet (v balíčku)
  Vypus-to/1.png–8.png                 # VypusTo slider (featured)
  Finance/dluhy.png, sporeni.png, pravidelne-platby.png  # dluhy.png = karta Finance
  kniha/kniha-beltaine-01–10.webp      # knížka (lightbox slider karty balíčku)
  prezentace/hra-pro-deti-01–18.webp   # už bez karty (odstraněno 2026-10-11)
  ukazky/*.webp                        # screenshoty karet: denik, vyplata, matysek-demo,
                                       #   travel-arcade, polevsko-balicek, emocni-priserky
                                       #   (matyskuv-piknik.webp už bez karty)
  logos/                               # branding assety (Firmy.cz apod.)
docs/
  brand/                               # maskot Mlsná Malina (charakterový list + pózy)
  handoff/                             # HISTORICKÁ dokumentace (stav 2026-05-03, zastaralé)
vercel.json                            # redirect+rewrites pro /krejcirik-bazeny subprojekt
```

---

## Živý web & repo

- **Produkce**: https://www.katerinamlsnova.cz
- **Vercel**: https://katerinamlsnova-web.vercel.app
- **GitHub**: https://github.com/MlsnaMalina/katerinamlsnova-web
- **IČO**: 22031383 (Průhonice, registrováno u Černošic)
