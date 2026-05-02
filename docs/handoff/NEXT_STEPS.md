# NEXT_STEPS.md

## Stav: Žádné aktivní úkoly z předchozí session
Egg hunt je opraven a stabilní. Následující seznam jsou možné další směry, **nikoliv pokračování rozdělané práce**.

---

## NUTNÉ KROKY
*(věci, které bez vyřešení znamenají reálný problém v produkci)*

### 1. Nahradit GA4 placeholder reálným ID
- **Co**: V `index.html` najít všechny výskyty `G-XXXXXXXXXX` a nahradit reálným GA4 measurement ID, jakmile ho Kateřina získá.
- **Proč**: Aktuálně se neměří návštěvnost. Cookie consent existuje, ale Google tag je placeholder.
- **Kde pracovat**: `index.html` — Google tag snippet (typicky v `<head>`) + cookie consent JS v `script.js` (~ řádek 554+).
- **Hotovo když**: GA4 dashboard ukazuje hits z produkce; Network tab v DevTools potvrzuje volání `g/collect` na `googletagmanager.com`.
- **Blokátor**: Kateřina musí nejdřív vytvořit GA4 property a dodat ID.

### 2. Ověřit `.gitignore` pro untrackované soubory
- **Co**: Rozhodnout, zda mají být commitnuté nebo přidat do `.gitignore`: `SESSION_NOTES.md`, `files.zip`, `hodnoceni-od-antigravity-kveten.txt`, `hodnoceni-od-claude-design-kveten.txt`, případně `.claude/`.
- **Proč**: Soubory leží v rootu repa, mohou nedopatřením být commitnuty (např. při `git add -A`). Některé mohou obsahovat citlivé informace nebo zbytečně bobtnají repo.
- **Kde pracovat**: `.gitignore` v rootu repa.
- **Hotovo když**: `git status` v rootu nehlásí untracked soubory, které nemají být součástí repa.

---

## DOPORUČENÉ KROKY
*(zlepší kvalitu webu, ale neblokují provoz)*

### 3. SEO — meta tagy a OG image
- **Co**: Přidat do `<head>` v `index.html`: `<meta name="description">`, `<meta name="keywords">`, OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter Card meta, `<link rel="canonical">`.
- **Proč**: Aktuálně web pravděpodobně nemá optimalizované sociální náhledy ani SEO description. Ovlivňuje sdílení a hledatelnost.
- **Kde pracovat**: `index.html` `<head>`.
- **Hotovo když**: [opengraph.xyz](https://www.opengraph.xyz) nebo Facebook Sharing Debugger ukazuje správný preview pro `https://katerinamlsnova-web.vercel.app`. Google Search Console crawler nehlásí chyby.
- **Materiál**: Nutný OG image (1200×630 px), pravděpodobně doodle ilustrace + KATEŘINA MLSNOVÁ. **Kateřina musí dodat nebo schválit grafiku.**

### 4. Favicon set
- **Co**: Vytvořit a přidat favicon (`favicon.ico`, `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`) + `<link rel="icon">` v `<head>`.
- **Proč**: V tabu prohlížeče se zobrazuje generická ikona.
- **Kde pracovat**: `assets/` (nové soubory) + `index.html` `<head>`.
- **Hotovo když**: V tabu Chrome/Firefox se zobrazuje malina (nebo schválená ikona). Vercel deploy ji servíruje.
- **Materiál**: Můžou být odvozené z `assets/malina.svg`. **Návrh schválit s Kateřinou.**

### 5. Vyčistit `CONTEXT.md` (nebo nahradit `PROJECT_CONTEXT.md`)
- **Co**: V `CONTEXT.md` jsou zastaralé barvy (`#a31f4f`, `#6b3fa0`). Buď opravit nebo soubor nahradit odkazem na `docs/handoff/PROJECT_CONTEXT.md`.
- **Proč**: Riziko, že další AI session pochytí špatné barvy.
- **Kde pracovat**: `CONTEXT.md`.
- **Hotovo když**: V `CONTEXT.md` jsou jen aktuální Logo Kit barvy (viz `PROJECT_CONTEXT.md`).

### 6. Performance audit
- **Co**: Spustit Lighthouse v Chrome DevTools, zkontrolovat skóre (Performance, Accessibility, Best Practices, SEO). Optimalizovat kritická místa.
- **Proč**: Web má hodně animací a SVG filtrů — riziko slabšího mobilního výkonu.
- **Kde pracovat**: Identifikovat z reportu (typicky `style.css` velikost, image weights v `assets/`).
- **Hotovo když**: Performance ≥ 80, Accessibility ≥ 95 na mobilu.

---

## VOLITELNÉ KROKY
*(nice to have, žádný tlak)*

### 7. A11y audit egg huntu
- **Co**: Ověřit, že screen readery rozumí egg modal (`aria-labelledby`, `aria-modal`, focus trap), že `tabindex` na malinách je správně.
- **Proč**: Web má `aria-*` atributy, ale focus trap v modalu nebyl explicitně testován.
- **Kde pracovat**: [script.js:678-690](script.js:678) (modal funkce), [style.css:3446+](style.css:3446) (modal CSS).
- **Hotovo když**: Test s VoiceOver / NVDA prochází bez problémů; Esc zavře, Tab cyklí.

### 8. Cleanup velkého `style.css`
- **Co**: Rozdělit `style.css` (3535 ř.) na sekce komentáři nebo (mírnější) projít a odstranit nepoužité selektory.
- **Proč**: Lepší orientace pro budoucí editaci.
- **Kde pracovat**: `style.css`.
- **Hotovo když**: Soubor má jasnou hierarchii sekcí; žádné `dead` selectory (manuální audit nebo nástroj typu PurgeCSS).
- **Riziko**: Vysoké riziko regresí. Zvážit, jestli skutečně potřeba.

### 9. PWA / instalovatelnost
- **Co**: Přidat `manifest.json`, service worker pro offline cache, ikona na home screen.
- **Proč**: Možnost instalace webu jako "appky" na mobilu.
- **Kde pracovat**: Nové soubory `manifest.json`, `sw.js` + `<link rel="manifest">` v `index.html`.
- **Hotovo když**: Chrome nabízí "Install app", DevTools Application tab vidí PWA.
- **Riziko**: Komplexita údržby vs. reálná hodnota — pravděpodobně nestojí za to pro one-page web.

---

## CO NEDĚLAT bez explicitního pokynu
- **Nepřidávat** framework, build systém, TypeScript.
- **Neupravovat** Logo Kit barvy, hand-drawn estetiku, slevový kód, Formspree endpointy.
- **Nepřesouvat** soubory ze struktury — zachovat ploché uspořádání.
- **Nečistit** untracked soubory v rootu bez ověření, co obsahují.
- **Nevracet** `opacity: 0.25` u `.egg-raspberry` (po této session je `1`).
- **Nevracet** hlášku "Jejda, rozsypaly se mi maliny".
- **Necommitovat ani nepushovat automaticky** — vždy se zeptat nebo počkat na explicitní pokyn.
