# NEXT_STEPS.md

## Stav: Aktivní úkoly z této session — pokračování

Žádný z těchto kroků **nesmí být zahájen bez explicitního pokynu Kateřiny**. Tento dokument je orientační — co se hodí udělat, ne co se hned udělá.

---

## NUTNÉ KROKY (čekají na vstup od Kateřiny)

### 1. Nahradit GA4 placeholder reálným tracking ID
- **Co**: V `index.html` najít všechna `G-XXXXXXXXXX` a nahradit reálným GA4 ID, které Kateřina dodá z Google Analytics.
- **Proč**: Bez reálného ID se nesbírají data o návštěvnosti.
- **Kde**: `index.html` — Google tag snippet v `<head>`, cookie consent JS handler.
- **Hotovo když**: Site v produkci streamuje data do GA4 dashboardu (po cookie consent).
- **Závislost**: Kateřina musí poskytnout reálné ID.

### 2. Nahradit Open Graph image
- **Co**: Přidat OG image (`<meta property="og:image" content="...">`) pro hezčí náhled při sdílení na sociálních sítích.
- **Proč**: Při sdílení odkazu na FB/LinkedIn se zobrazí slušný náhled, ne generický.
- **Kde**: `index.html` v `<head>`, soubor v `assets/`.
- **Hotovo když**: Test přes https://www.opengraph.xyz/ ukazuje obrázek.
- **Závislost**: Kateřina musí poskytnout vizuál (1200×630 px doporučeno).

---

## DOPORUČENÉ KROKY (až na ně dojde řada)

### 3. Vyřešit duplicitu `data-egg="4"`
- **Co**: Rozhodnout, jak nakládat se dvěma `.egg-raspberry--pssst` (pricing + contact) — buď dát kopii unikátní `data-egg="6"` (a zvážit zda zvýšit `TOTAL=5` v `script.js:720`), nebo nechat sdílet slot. Uživatel akceptoval sdílení, ale UX je trochu mátoucí (klik na jednu z duplicitních = jeden bod).
- **Proč**: Aktuální stav matoucí pro hráče, kteří najdou „obě" maliny ale počítadlo přičte 1.
- **Kde**: `index.html` ř. 944 (kontaktní kopie), případně `script.js:720` (TOTAL).
- **Hotovo když**: Kliknutí na obě maliny zvyšuje počítadlo nezávisle, nebo je rozhodnuto že sdílí slot a UX je akceptováno.
- **Závislost**: Diskuze s Kateřinou o očekávaném chování egg huntu.

### 4. Přemyslet egg hunt vizuální logiku po `!important` overrides
- **Co**: Maliny `--cta`, `--submit` a duplikát pssst v contact jsou nyní vizuálně viditelné i po sebrání (`opacity: 1 !important; animation: none !important`). Toto je vědomý trade-off — uživatelka chtěla aby maliny byly vždy vidět.
- **Proč zvážit změnu**: Hráč nepozná, kterou malinu už sebral. Možnost: po sebrání zachovat viditelnost, ale např. přidat menší check-mark přes pseudo-element nebo barevný posun.
- **Kde**: `style.css` ř.3325-3334 (--cta), 3351-3362 (--submit), inline `index.html` ř.944 (kopie pssst).
- **Hotovo když**: Kateřina schválí novou variantu (nebo potvrdí současný stav jako finální).

### 5. Doladit pozice maliny v contact formuláři
- **Co**: Aktuální pozice `left: calc(50% + 95px); bottom: 1rem` je odhad. Pokud se změní šířka submit tlačítka nebo obsah, malina se může posunout.
- **Proč**: Vizuální křehkost — magic number `95px` je vázané na aktuální šířku submitu.
- **Kde**: `index.html` ř. 944 (inline style).
- **Hotovo když**: Pozice je vázaná na vlastnost submit tlačítka (ideálně přes CSS variabilní šířku) nebo jiné robustnější řešení.

### 6. Cosmetické vylepšení carouselu se 3 kartami
- **Co**: Carousel `.works__stage` byl navržen pro 5-6 karet (s `is-far-left`, `is-far-right`). Po cleanup má 3 karty, takže `is-far-*` se nevyužívá. CSS funguje, ale možná by se hodily karty větší / centrovanější.
- **Proč**: 3 karty se v carouselu zdají osamělé; mohlo by lépe vypadat jako prostý flex/grid.
- **Kde**: `style.css` ř.~1037-1095 (work-card classes).
- **Hotovo když**: Karty vypadají vyrovnaně, ne příliš úzké/řídké.

---

## VOLITELNÉ KROKY (nice-to-have)

### 7. Přesunout pomocné soubory mimo repo
- **Co**: `SESSION_NOTES.md`, `files.zip`, `cookies.json`, `hodnoceni-od-*.txt` přesunout mimo working directory nebo přidat do `.gitignore`.
- **Proč**: Riziko, že se omylem zacommituje něco citlivého.
- **Kde**: Root projektu, `.gitignore`.
- **Hotovo když**: `git status` neukazuje untracked soubory v rootu.

### 8. Konsolidace egg hunt CSS
- **Co**: CSS pro `.egg-raspberry--*` je rozeseté na různých místech (ř. 3282-3370 + universal dark mode ř.3372+). Sjednotit do jednoho bloku s komentáři.
- **Proč**: Při příští úpravě bude rychlejší se zorientovat.
- **Kde**: `style.css`.
- **Hotovo když**: Všechny egg-raspberry pravidla v jednom logickém bloku, komentované.

### 9. Aktualizovat starší dokumentaci
- **Co**: `CONTEXT.md`, `PLAN.md`, `README.md` v rootu mají možná zastaralé informace (např. CONTEXT.md zmiňuje `#a31f4f` jako paletu, ale `Logo Kit` v PROJECT_CONTEXT.md říká `#7A1840`/`#B83066`).
- **Proč**: Nový vývojář může dostat protichůdné info.
- **Kde**: Root projektu.
- **Hotovo když**: Hlavní dokumenty odkazují na `docs/handoff/PROJECT_CONTEXT.md` jako single source of truth.

### 10. Lazy-loading / image optimization slidery
- **Co**: 18 PNG prezentace + 10 PNG knížky je dohromady několik MB. Mohlo by se uvažovat o WebP konverzi nebo dynamic loading (jen sousední slidy).
- **Proč**: Mobile bandwidth.
- **Kde**: `assets/prezentace/`, `assets/kniha/`, případně `script.js` slider IIFE.
- **Hotovo když**: Network panel ukazuje, že načítá jen aktuální + sousední slidy.

---

## Co dělat, když přijde nový úkol od Kateřiny
1. Přečti si zadání **celé**, neskákej do akce.
2. Pokud je požadavek nejednoznačný, **napřed se zeptej** (Kateřina preferuje malé iterace).
3. Před úpravou: prohlédni `DO_NOT_CHANGE.md`, ujisti se že nejdeš proti něčemu schválenému.
4. Po úpravě: **commit + push na main**, použij commit message v imperativu češtině s Co-Authored-By.
5. Po pushi: stručně shrnout co se změnilo (1-2 věty), čekat na Kateřinin feedback (často screenshot s problémem).
