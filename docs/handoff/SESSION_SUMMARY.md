# SESSION_SUMMARY.md

## Datum session
2026-05-03

## Hlavní přidané funkce / změny

### 1. Cenová kalkulačka (NOVÁ velká feature v sekci #ceny)
- **Lokace**: pod ceníkem v `<section class="pricing">`, mimo `.pricing__inner`
- **HTML**: `<div class="calculator-wrapper" id="kalkulator">` (pozor: ID je `kalkulator` bez háčku, bez „c")
- **3 sekce formuláře**:
  1. „Co má váš web hlavně udělat?" — radio (5 000 / 3 000 / 2 000 / 9 000 Kč)
  2. „Jak moc máte připravené podklady?" — radio (+0 / +3 000 / +5 000 Kč)
  3. „Co chcete přidat?" — checkboxy (+1 500 / +800 / +1 500 / +1 500 / +3 000 Kč)
- **Pravý sloupec**: účtenka s průběžnou cenou (Caveat heading, Space Grotesk options) + sticky pod 769px
- **Vzhled**: hand-drawn doodle frame (dvojitý rough rect), 4 sparkles (✦) v rozích wrapperu, custom CSS radio/checkbox čtverečky přes `::before` + `filter: url(#rough)`, doodle separátor (rough SVG, 45% šířky) místo border-top
- **Fonty**: Caveat 700 (otázky + h2), Space Grotesk (text), Caveat přidán do Google Fonts linku v `<head>`
- **Max-width**: 820px, padding 2rem 1.75rem, `scroll-margin-top: 90px` ať fixed nav nezakryje target
- **JS** ([script.js](script.js) konec): IIFE `initPriceCalculator` poslouchá change event, suma + render účtenky + locale formátování (`cs-CZ`)

### 2. Egg hunt — opravy a sjednocení
- **Smazaná malina mezi slidery prezentace a knížky** (původní `data-egg="3"` `--book`) — byla pozůstatek starého rozšíření, slabě viditelná
- **Contact malina přepnuta z `data-egg="4"` na `data-egg="3"`** — tím se obnovilo 5 unikátních slotů (hero + 2/3/4/5) a modal po sebrání 5/5 zase funguje
- **`STORAGE_KEY` bumpnut z `"km-eggs-found"` na `"km-eggs-found-v2"`** ([script.js:719](script.js:719)) — všichni návštěvníci se starým localStorage stavem (z dob, kdy data-egg="3" byla ta mezi slidery) začali s čistým štítem
- **Pricing pssst malina po `.is-found` zůstává plně viditelná** — sladěno s ostatními 4 malinami (přidány `!important` overrides na opacity / animation / pointer-events)
- **Modal text rozšířen**: „Tady je malý dárek - slevový kód **15 %** na první spolupráci:"

### 3. Sekce #ceny — proces od ceny po CTA
- Karta „Jednoduchý web" — částka „2 500 – 4 500 Kč" odstraněna, nahrazena prostým `<a href="#kalkulator" class="price-calc-link">Orientační cena níže</a>` (Space Grotesk **bold** 1rem, doodle SVG zvlněné podtržení přes `background-image` data URI)
- „Dle rozsahu" a „Domluvíme se" dostaly novou třídu `.pricing__price-alt` (Space Grotesk bold accent 1rem, bez podtržení) **vedle** stávající `.pricing-row__price` — kvůli specificity je definovaná **až za** `.pricing-row__price` v style.css
- Intro rámeček: smazaná věta „S tvorbou díky vibe codingu začínám…", „Hledám 10 projektů" a „zaváděcí ceny" dostaly inline rough SVG podtržení (třída `.doodle-underline` s `.doodle-underline__svg`), poslední věta přeformulovaná („Těmto prvním klientům nabízím zaváděcí ceny, které jsou uvedeny níže — pak…")

### 4. Sekce #ukazky — copy a layout
- Subtitle: „Tyhle stránky **samy o sobě** jsou ukázkou jednoduchého webu (landing page),<br>co jsem vyrobila." + srdíčko vynuceno na **vlastní třetí řádek** přes `flex-basis: 100%` + center
- Featured iframe blok dostal nový `.showcase-header`: štítek `service-tag` „Interaktivní hra" + h3 **„Interaktivní hra pro děti"** (vystředěné přes `.featured-game .showcase-header h3 { text-align: center }`)
- Lead featured bloku končí: „Vyzkoušej rovnou tady, **nebo**" + odkaz na novém řádku „**otevřít** v novém okně ↗" (malé „o")
- Carousel work-card tagy přepnuty na `text-transform: none` ať respektují velká písmena: „Interaktivní hra" (Nakrm zvířátko) a „Pracovní materiály" (obě omalovánky)

### 5. Decorative swap mezi #o-mne a #kontakt
- Srdíčko (red doodle SVG) přesunuto z #kontakt do #o-mne na místo brouka
- Brouk (`assets/brouk-game.svg`) přesunut z #o-mne do #kontakt na místo srdíčka
- Každý element si zachoval své původní třídy a inline styling

### 6. #kontakt: „klikni sem" + šipka přepnuté z `var(--accent)` na `var(--text)`
- `.contact__email-hint`, `.contact__email-hint-text`, `.contact__email-hint-arrow path` — všechny tři teď používají barvu textu, takže se mění s light/dark módem

### 7. Sekce #co-umim — karta „Jednoduchý web"
- Popis rozšířen o use-case příklady (zvířecí miláčci, svatby, eventy)

### 8. Navigace (desktop + mobile overlay)
- „Co umím" → **„S čím vám mohu pomoci"**
- „Ceny" → **„Kolik to stojí?"**
- Přidán nový odkaz **„Jak to probíhá"** (`#jak-to-probiha`) **mezi „O mně" a „Hra"**

### 9. Sekce #jak-to-probiha — všechny 4 kroky přepsané delším copy
- Krok 01: Napíšete mi — „Přes kontaktní formulář nebo e-mail mi popíšete…"
- Krok 02: Domluvíme se — „Co nejdříve se vám ozvu s případnými doplňujícími dotazy…"
- Krok 03: Tvořím — „Pokud si vše odsouhlasíme, pustím se do práce…"
- Krok 04: Hotovo — „Předám vám hotový projekt s instrukcemi…"

### 10. Hero animace
- Zrychlena intro animace na ~3,2 s (commit `b3dc4ee`)

## Co bylo zkoušeno a zavrženo
| Varianta | Výsledek |
|---|---|
| Velká doodle šipka přes celou sekci #ceny od CTA ke kalkulačce | Procházela přes ceny, několikrát se ladila, nakonec ÚPLNĚ ODSTRANĚNA |
| Šipka v pravém gutteru sekce | Také odstraněna — finální verze je jen text-only odkaz s SVG podtržením |
| Caveat font na `.pricing__price-alt` | Příliš handwritten, sjednoceno se Space Grotesk bold |
| Krátká SVG šipka uvnitř karty u CTA | Také odstraněna — finální stav je čistý text |

## Aktuální stav egg huntu (kritický!)
- **5 unikátních slotů**: hero + `data-egg="2"` + `data-egg="3"` + `data-egg="4"` + `data-egg="5"`
  - hero — `#hero-mascot-container`
  - data-egg="5" — `.egg-raspberry--submit` v #co-umim ([index.html:139](index.html:139))
  - data-egg="2" — `.egg-raspberry--cta` v #ukazky ([index.html:471](index.html:471))
  - data-egg="4" — `.egg-raspberry--pssst` v pricing ([index.html:714](index.html:714))
  - data-egg="3" — `.egg-raspberry--pssst` (copie) v contact form ([index.html:1015](index.html:1015))
- TOTAL = 5 ([script.js:720](script.js:720))
- STORAGE_KEY = `"km-eggs-found-v2"` (po přejmenování)
- Všechny 4 data-egg maliny po `.is-found` zůstávají vizuálně viditelné (`!important` overrides)
- Slevový kód: `MAM_VSECH_5_POHROMADE`

## Soubory upravené v této session
- `index.html` — kalkulačka, egg-hunt změny, copy, nav, doodle swap, štítky, lead texty
- `style.css` — kalkulačka styly, `.price-calc-link`, `.pricing__price-alt`, `.doodle-underline`, .calc-* pravidla, fontové úpravy, sjednocení barev hint
- `script.js` — IIFE `initPriceCalculator`, STORAGE_KEY bump

## HEAD na konci session
`882fce8 copy(jak-to-probiha): rozšířené texty čtyř kroků procesu`

Vše pushnuto na `main`, Vercel auto-deploy aktivní.

## Untrackované soubory v rootu (nedotýkat)
`.claude/`, `SESSION_NOTES.md`, `cookies.json`, `files.zip`, `hodnoceni-od-antigravity-kveten.txt`, `hodnoceni-od-claude-design-kveten.txt`, plus modifikovaný `assets/omalovanka-podle-cisel.png` a smazaný `assets/hry-napady-10.png` (mimo git index, neřešit bez výslovného pokynu).
