# CURRENT_STATE.md

## Stav k datu: 2026-05-02
**Poslední commit**: `9bf6856 fix(egg-hunt): genderově neutrální text toastu` (na `main`, pushnuto na GitHub, auto-deploy Vercel).

## Co aktuálně funguje (produkce)
- **Navigace**: desktop + mobile hamburger + dark/light toggle (perzistence `km-theme`).
- **Hero sekce**: animovaná typografie KATEŘINA/MLSNOVÁ + IBM Plex Mono blikající kurzor + tagline + maskot malina + doodle šipka + uvítací modal po kliknutí na hero malinu.
- **Sekce "S čím vám můžu pomoci"** (id `co-umim`): 6 karet s ručně kreslenými ikonami, ceny fade-in při hoveru, hand-drawn rect rámečky.
- **Sekce "O mně"** (id `o-mne`): dvousloupcový layout, portrét + 3 odstavce, IntersectionObserver animace + roztřesený rámeček kolem portrétu.
- **Sekce "Jak to probíhá"** (id `jak-to-probiha`): 4 horizontální kroky s doodle šipkami a postupným fade-inem.
- **Sekce "Ukázky"** (id `ukazky`): carousel s lightboxem.
- **Sekce "Kolik co stojí?"** (id `ceny`): hover efekt, zaváděcí ceny, Formspree formulář.
- **Sekce "Kontakt"** (id `kontakt`): Formspree formulář, e-mail skrytý za JS.
- **Footer**: dvousloupcový, JS-skrytá adresa, copyright.
- **Stránka**: `zasady-ochrany-osobnich-udaju.html`.
- **Cookie lišta**: souhlas, GA4 placeholder `G-XXXXXXXXXX`.
- **Egg hunt**: 5 malin (hero maskot + 4 v sekcích), modal s `MAM_VSECH_5_POHROMADE`, plně viditelné a klikatelné, neutrální toast.
- **Hra "Skákající malina"** ([game.js](game.js)): endless runner, SVG postavičky, high-score v `localStorage`.
- **Doodle ilustrace** rozmístěné v sekcích.

## Co je hotové a stabilní (nesahat bez důvodu)
- Hero animace a tagline.
- Logo Kit barevná paleta a CSS proměnné.
- Dark/light toggle a perzistence.
- Egg hunt UX (po opravách této session) — viz [DO_NOT_CHANGE.md](DO_NOT_CHANGE.md).
- Formspree endpointy (kontakt + ceník).
- Hra Skákající malina.

## Co je rozpracované
**Nic.** Všechny commity na `main` jsou stabilní stav.

## Co je pouze navržené, ale ještě neprovedené
- **Reálné GA4 ID** — placeholder `G-XXXXXXXXXX` čeká na nahrazení. Místa: `index.html` (cookie consent + Google tag snippet).
- Nic dalšího není explicitně navrženo.

## Co je potřeba zkontrolovat (manuálně)
1. **Vercel deploy posledního commitu** (`9bf6856`) — ověřit, že produkce odráží novou logiku egg huntu.
2. **Chování egg huntu na různých zařízeních** (mobile touch vs. desktop hover).
3. **localStorage migrace** — pokud někdo navštívil web před opravami, může mít staré klíče. `resetEggHunt()` to řeší.
4. **Cookie consent** — chování s/bez souhlasu (GA4 zatím není reálné).

## Co je potřeba opravit (známé)
**Nic akutního.** Nejsou aktuálně reportované bugy.

## Co nesmí být změněno bez výslovného souhlasu uživatele
Viz [DO_NOT_CHANGE.md](DO_NOT_CHANGE.md). Stručně:
- Logo Kit barvy.
- Hand-drawn estetika (filtry `#rough`).
- Tagline a hero texty.
- Slevový kód `MAM_VSECH_5_POHROMADE`.
- Egg hunt logika (klíče, počet malin, IDs).
- Formspree endpointy.
- Git commit author email `k.schmiedtova@seznam.cz`.

---

## Struktura projektu

```
katerinamlsnova-web/
├── index.html                              # Hlavní stránka (1035 řádků)
├── style.css                               # Všechny styly (3535 řádků)
├── script.js                               # Hlavní JS — animace, nav, egg hunt, theme (760 řádků)
├── game.js                                 # Hra Skákající malina (599 řádků)
├── zasady-ochrany-osobnich-udaju.html      # GDPR stránka
├── zasady-ochrany-osobnich-udaju-draft.md  # Draft GDPR textu
├── README.md                               # Veřejné readme
├── PLAN.md                                 # Původní plán a roadmap
├── CONTEXT.md                              # Starší kontextový dokument (částečně neaktuální paleta)
├── SESSION_NOTES.md                        # Starší session notes (untracked, z minulé práce)
├── LICENSE                                 # Licence
├── files.zip                               # Untracked archiv (neznámý obsah, nezahrnut do projektu)
├── hodnoceni-od-antigravity-kveten.txt     # Untracked feedback
├── hodnoceni-od-claude-design-kveten.txt   # Untracked feedback
├── assets/
│   ├── katerina-portrait-transparent.png
│   ├── malina.svg
│   ├── malina-game.svg
│   ├── brouk-game.svg
│   ├── mravenec-game.svg
│   ├── wind-game.svg
│   ├── omalovanka-doodle-hledej.png
│   ├── omalovanka-podle-cisel.png
│   ├── kniha-beltaine-02.png
│   ├── hra-kouzelny-srdickovy-lektvar.png
│   ├── hra-nakrm-mlsne-zviratko.png
│   ├── hry-napady-10.png
│   └── ukazky/                              # Screenshoty pro sekci Ukázky
└── docs/
    └── handoff/                             # Tato handoff dokumentace
        ├── PROJECT_CONTEXT.md
        ├── SESSION_SUMMARY.md
        ├── CURRENT_STATE.md
        ├── NEXT_STEPS.md
        ├── FILES_AND_MATERIALS.md
        ├── PROMPT_FOR_NEXT_MODEL.md
        └── DO_NOT_CHANGE.md
```

## Důležité soubory a jejich účel

| Soubor | Účel | Klíčové místa |
|---|---|---|
| `index.html` | Kompletní DOM, sekce, modaly, SVG defs s filtry | Egg modal řádky 1018–1027, hero řádky ~280–315, SVG defs v `<body>` |
| `style.css` | Všechny styly, CSS proměnné, dark/light tokeny | Paleta v `:root` a `[data-theme="dark"]`, egg styly řádky 3282–3336, modal 3446+ |
| `script.js` | Intro animace, scroll-reveal, mobile menu, theme, egg hunt, cookie consent, Formspree handlers | Egg hunt IIFE řádky 642–767, theme toggle ~485–520, cookie consent ~554–580 |
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
- **CSS soubor je velký** (3535 ř.) — při edit hledej přes Grep, riziko duplicitních selektorů.
- **Žádný linter / formátor** — riziko nekonzistentního stylu.
- **Žádné testy** — kontrola jen vizuální.
- **GA4 placeholder** — není reálná analytika.
- **`CONTEXT.md` má neaktuální barvy** (`#a31f4f`, `#6b3fa0` jsou starší hodnoty, reálná paleta je v Logo Kit sekci `PROJECT_CONTEXT.md`).
- **Starší untrackované soubory** v rootu (`SESSION_NOTES.md`, `files.zip`, `.txt` hodnocení) — nepatří do produkce, ale nejsou v `.gitignore`.
- **Egg hunt opacity** — po této session jsou maliny plně viditelné. Pokud je v budoucnu přání vrátit "schovaný" charakter, nutno vyřešit kontrast s `is-found` stavem.
