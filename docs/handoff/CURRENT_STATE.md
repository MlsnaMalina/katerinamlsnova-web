# CURRENT_STATE.md

## Stav k datu: 2026-05-03 (konec rozšířené session)
**Poslední commit**: `882fce8 copy(jak-to-probiha): rozšířené texty čtyř kroků procesu` (na `main`, pushnuto na GitHub, auto-deploy Vercel).

**Klíčové změny od předchozího handoffu** (HEAD `c9335dc` → `882fce8`):
- **Cenová kalkulačka** v `<div id="kalkulator">` přidána pod ceník (#ceny). HTML/CSS/JS — viz SESSION_SUMMARY.
- **Egg hunt**: malina mezi slidery smazaná, contact malina přepnutá na `data-egg="3"`, `STORAGE_KEY` bumpnutý na `"km-eggs-found-v2"`, pricing pssst sladěná s ostatními (zůstává viditelná po sebrání).
- **Navigace**: „Co umím" → „S čím vám mohu pomoci", „Ceny" → „Kolik to stojí?", přidán odkaz „Jak to probíhá".
- **Doodle swap**: srdíčko v #o-mne, brouk v #kontakt (původně naopak).
- **„klikni sem" v kontaktu**: barvy přes `var(--text)` (adaptuje se light/dark).
- **#ceny intro rámeček**: smazaná věta o vibe codingu, doodle SVG podtržení místo `<u>`, přeformulovaný závěr.
- **#ukazky**: subtitle „samy o sobě jsou…", srdíčko na 3. řádku, featured blok má showcase-header s tagem „Interaktivní hra" a vystředěným h3 „Interaktivní hra pro děti", carousel tagy s velkými písmeny.
- **#co-umim karta „Jednoduchý web"**: rozšířený popis.
- **#jak-to-probiha**: všechny 4 kroky přepsané delším textem.
- **Egg modal**: doplněno „15 %".
- **Hero animace**: zrychlená na ~3,2 s.

## Co aktuálně funguje (produkce)
- **Navigace**: desktop + mobile hamburger + dark/light toggle (perzistence `km-theme`).
- **Hero sekce**: animovaná typografie KATEŘINA/MLSNOVÁ + IBM Plex Mono blikající kurzor + tagline + maskot malina + doodle šipka + uvítací modal po kliknutí na hero malinu.
- **Sekce "S čím vám můžu pomoci"** (id `co-umim`): 6 karet s ručně kreslenými ikonami, ceny fade-in při hoveru, hand-drawn rect rámečky. **Plus malina #5 (`.egg-raspberry--submit`) plovoucí vlevo na vertikálním středu sekce.**
- **Sekce "O mně"** (id `o-mne`): dvousloupcový layout, portrét + 3 odstavce, IntersectionObserver animace + roztřesený rámeček kolem portrétu.
- **Sekce "Jak to probíhá"** (id `jak-to-probiha`): 4 horizontální kroky s doodle šipkami a postupným fade-inem.
- **Sekce "Ukázky"** (id `ukazky`):
  - **Featured iframe blok** s hrou "Kouzelný srdíčkový lektvar" (16:9, hand-drawn frame, loading + 8s fallback, mobilní rotace tip).
  - **2-col grid `.showcase-grid-2col`** se 2 slidery: prezentace (18 slidů) + knížka (10 stran). S malinou #3 (`.egg-raspberry--book`) vystředěnou v gapu mezi nimi.
  - **Carousel `.works__stage`** se 3 kartami (Nakrm zvířátko, Hledací omalovánka, Omalovánka podle čísel). Plus malina #2 (`.egg-raspberry--cta`) v `.egg-slot--ukazky` na pravém okraji nad carouselem.
- **Sekce "Kolik co stojí?"** (id `ceny`): hover efekt, zaváděcí ceny, Formspree formulář. Plus malina #4 (`.egg-raspberry--pssst`) inline v textu „...pssst...".
- **Sekce "Kontakt"** (id `kontakt`): Formspree formulář, e-mail skrytý za JS. Plus duplikát maliny #4 (`.egg-raspberry--pssst`) inline-pozicovaná za pravým okrajem tlačítka Odeslat.
- **Footer**: dvousloupcový, JS-skrytá adresa, copyright.
- **Stránka**: `zasady-ochrany-osobnich-udaju.html`.
- **Cookie lišta**: souhlas, GA4 placeholder `G-XXXXXXXXXX`.
- **Egg hunt**: 5 malin (hero + data-egg 2/3/4/5), modal s `MAM_VSECH_5_POHROMADE`. Maliny mají `!important` overrides na opacity (1) a animation (none) — viditelné i po sebrání (vědomé porušení původní logiky `.is-found`).
- **Hra "Skákající malina"** (`game.js`): endless runner, SVG postavičky, high-score v `localStorage`.
- **Doodle ilustrace** rozmístěné v sekcích.

## Co je hotové a stabilní (nesahat bez důvodu)
- Hero animace a tagline.
- Logo Kit barevná paleta a CSS proměnné.
- Dark/light toggle a perzistence.
- Featured iframe blok v `#ukazky` (commit `4a1881e`).
- 2col slider grid (prezentace + knížka).
- Universal slider JS handler (`initShowcaseSliders`).
- Formspree endpoint (kontakt).
- Hra Skákající malina.

## Co je rozpracované
**Nic.** Všechny commity na `main` jsou stabilní stav. Posledních 14 commitů od `4a1881e` (10 hodin práce v této session) se týkalo `#ukazky` + egg hunt malin.

## Co je pouze navržené, ale ještě neprovedené
- **Reálné GA4 ID** — placeholder `G-XXXXXXXXXX` čeká na nahrazení. Místa: `index.html` (cookie consent + Google tag snippet).
- Nic dalšího není explicitně navrženo.

## Co je potřeba zkontrolovat (manuálně po každé deploy)
1. **Vercel deploy posledního commitu** (`c9335dc`) — ověřit, že produkce odráží aktuální stav malin.
2. **Egg hunt v obou módech (light + dark)** — všechny 4 viditelné maliny (`--pssst` v pricing + 3 force-visible přes `!important`) musí být klikatelné a vidět.
3. **Sliders v `#ukazky`** — šipky a klávesnice (← →) přepínají, počítadlo odpovídá.
4. **Iframe hra** — načítá se, placeholder zmizí, mobilní rotace tip se zobrazí pod 768px.
5. **Carousel** — 3 karty, šipky fungují, lightbox po kliknutí na střední kartu.

## Co je potřeba opravit (známé)
**Akutních chyb 0.** Trade-offy:
- Maliny mají potlačený `.is-found` vizuální stav (zákaznice akceptovala).
- Duplicitní `data-egg="4"` (pssst v pricing + duplikát v contact) sdílí JS slot — funkčně OK, ale hráč může být zmaten že "našel malinu, ale počítadlo nezvýšilo".

## Co nesmí být změněno bez výslovného souhlasu uživatele
Viz [DO_NOT_CHANGE.md](DO_NOT_CHANGE.md). Stručně:
- Logo Kit barvy.
- Hand-drawn estetika (filtry `#rough`).
- Tagline a hero texty.
- Slevový kód `MAM_VSECH_5_POHROMADE`.
- Egg hunt logika (klíče, počet malin, IDs).
- Aktuální `!important` overrides na maliny (uživatelka je explicitně schválila).
- Iframe URL pro Kouzelný srdíčkový lektvar.
- Formspree endpoint.
- Git commit author email `k.schmiedtova@seznam.cz`.

---

## Struktura projektu

```
katerinamlsnova-web/
├── index.html                              # Hlavní stránka (~1080 řádků)
├── style.css                               # Všechny styly (~3700 řádků)
├── script.js                               # Hlavní JS — animace, nav, egg hunt, theme, slidery (~810 řádků)
├── game.js                                 # Hra Skákající malina (599 řádků)
├── zasady-ochrany-osobnich-udaju.html      # GDPR stránka
├── zasady-ochrany-osobnich-udaju-draft.md  # Draft GDPR textu
├── README.md                               # Veřejné readme
├── PLAN.md                                 # Původní plán a roadmap
├── CONTEXT.md                              # Starší kontextový dokument (částečně neaktuální paleta)
├── SESSION_NOTES.md                        # Untracked, starší
├── LICENSE                                 # Licence
├── files.zip                               # Untracked archiv (mimo projekt)
├── cookies.json                            # Untracked (export cookies, mimo projekt)
├── hodnoceni-od-antigravity-kveten.txt     # Untracked feedback
├── hodnoceni-od-claude-design-kveten.txt   # Untracked feedback
├── assets/
│   ├── katerina-portrait-transparent.png
│   ├── malina.svg                          # SVG malina (používaná v egg hunt + hero)
│   ├── malina-game.svg                     # SVG pro hru
│   ├── brouk-game.svg
│   ├── mravenec-game.svg
│   ├── wind-game.svg
│   ├── omalovanka-doodle-hledej.png
│   ├── omalovanka-podle-cisel.png
│   ├── kniha-beltaine-02.png               # Náhled v carouselu (kromě složky kniha/)
│   ├── hra-kouzelny-srdickovy-lektvar.png  # Náhled (už není použito po featured iframe refaktoru)
│   ├── hra-nakrm-mlsne-zviratko.png
│   ├── hry-napady-10.png                   # Untracked, odstraněno z carouselu
│   ├── prezentace/                         # 18 PNG slidů prezentace
│   │   └── hra-pro-deti-01.png ... -18.png
│   ├── kniha/                              # 10 PNG stran knížky
│   │   └── kniha-beltaine-01.png ... -10.png
│   └── ukazky/                             # Starší screenshoty (možná unused)
└── docs/
    └── handoff/                            # Tato handoff dokumentace
        ├── PROJECT_CONTEXT.md
        ├── SESSION_SUMMARY.md
        ├── CURRENT_STATE.md
        ├── NEXT_STEPS.md
        ├── FILES_AND_MATERIALS.md
        ├── PROMPT_FOR_NEXT_MODEL.md
        ├── DO_NOT_CHANGE.md
        └── QUICK_START.md
```

## Důležité soubory a jejich účel

| Soubor | Účel | Klíčové místa |
|---|---|---|
| `index.html` | Kompletní DOM, sekce, modaly, SVG defs s filtry | Featured iframe ~ř.368-394, showcase-grid-2col ~ř.396-466, .egg-slot--ukazky ~ř.468-473, carousel ~ř.475-560, egg modal ~ř.1018-1027, egg buttons na různých řádcích (viz Grep "data-egg") |
| `style.css` | Všechny styly, CSS proměnné, dark/light tokeny | Paleta v `:root` ř.5-27, dark mode ř.30-51, egg styly ř.3282-3370, modal ~ř.3500+, featured-game ~ř.3537+, showcase-grid-2col ~ř.3672+, slidery ~ř.3700+ |
| `script.js` | Intro animace, scroll-reveal, mobile menu, theme, slidery, egg hunt, cookie consent, Formspree handlers | Slider IIFE ř.245-296, featured-game iframe IIFE ř.298-318, carousel coverflow ř.~320-450, egg hunt IIFE ř.718-836, theme toggle, cookie consent |
| `game.js` | Hra Skákající malina (canvas, fyzika, render) | High-score klíč na řádku 74 |

## Vazby mezi soubory
- `index.html` načítá `style.css`, `script.js`, `game.js` přes `<link>` / `<script>` tagy.
- Sekce v HTML mají `id` shodné s anchory v navu (`#co-umim`, `#o-mne`, `#jak-to-probiha`, `#ukazky`, `#ceny`, `#kontakt`).
- SVG `<defs>` s filtry `#rough` a `#rough-strong` jsou definované jednou v `index.html`, používané z CSS `filter: url(#rough)`.
- `script.js` čte/zapisuje:
  - `localStorage`: `km-theme`, `km-eggs-found`, `km-cookies-consent`
  - `sessionStorage`: `km-eggs-modal-shown`
- `game.js` čte/zapisuje `localStorage` klíč pro high-score (HS_KEY na řádku 74).

## Známé chyby nebo slabá místa
- **CSS soubor je velký** (~3700 ř.) — při edit hledej přes Grep, riziko duplicitních selektorů. Egg hunt CSS je rozeseté na různých místech (ř. 3282-3370, plus universal dark mode ř. 3372+).
- **Žádný linter / formátor** — riziko nekonzistentního stylu.
- **Žádné testy** — kontrola jen vizuální.
- **GA4 placeholder** — není reálná analytika.
- **`CONTEXT.md` má neaktuální barvy** (`#a31f4f`, `#6b3fa0` jsou starší hodnoty, reálná paleta je v Logo Kit sekci `PROJECT_CONTEXT.md`). Hex `#a31f4f` se ale stále nachází v inline SVG doodlech a v `assets/malina.svg` — to je legacy, fungující.
- **Egg hunt vizuální logika `.is-found`** je u 3 malin (`--cta`, `--submit`, duplikát pssst v contact) potlačena přes `!important` — pokud někdo redesignuje egg hunt, musí o tom vědět.
- **Duplicita `data-egg="4"`** (pssst pricing + pssst contact) — kliknutí na jednu označí obě, počítadlo započítá jednou.
- **Starší untrackované soubory** v rootu (`SESSION_NOTES.md`, `files.zip`, `cookies.json`, `.txt` hodnocení) — nepatří do produkce, ale nejsou v `.gitignore`.
