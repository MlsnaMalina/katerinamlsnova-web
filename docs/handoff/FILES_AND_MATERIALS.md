# FILES_AND_MATERIALS.md

## Kořenová struktura (`C:\Users\merit\OneDrive\Desktop\AI\Ostatní\katerinamlsnova-web\`)

### Hlavní zdrojové soubory (do těchto SE pracuje)
| Soubor | Účel | Velikost | Důležitost |
|---|---|---|---|
| `index.html` | Kompletní DOM, sekce, modal, SVG defs | 1035 ř. | **HLAVNÍ** |
| `style.css` | Všechny styly, paleta, dark/light tokens, animace | 3535 ř. | **HLAVNÍ** |
| `script.js` | Animace, nav, theme toggle, egg hunt, cookie consent | 760 ř. | **HLAVNÍ** |
| `game.js` | Hra Skákající malina (canvas) | 599 ř. | Hlavní (samostatný feature) |
| `zasady-ochrany-osobnich-udaju.html` | GDPR stránka (samostatná) | — | Hlavní |

### Pomocné soubory (kontext, dokumentace)
| Soubor | Účel | Pozn. |
|---|---|---|
| `README.md` | Veřejné readme repa | Aktuální? Ověřit obsah. |
| `PLAN.md` | Původní plán a roadmap projektu | Historický kontext |
| `CONTEXT.md` | Starší kontextový dokument | **POZOR — zastaralé barvy** |
| `SESSION_NOTES.md` | Starší session notes z dřívější práce | Untracked, neudržováno aktivně |
| `LICENSE` | Licence | — |
| `zasady-ochrany-osobnich-udaju-draft.md` | Draft GDPR textu (markdown verze) | Zdrojový text pro HTML stránku |

### Untracked soubory v rootu (NENÍ v gitu)
| Soubor | Pravděpodobný obsah |
|---|---|
| `files.zip` | Neznámý archiv. **Nutno ověřit, co obsahuje, nebo vyloučit z .gitignore.** |
| `hodnoceni-od-antigravity-kveten.txt` | Feedback / hodnocení od jiného AI (Antigravity) |
| `hodnoceni-od-claude-design-kveten.txt` | Feedback od Claude (designové review) |
| `.claude/` | Claude Code lokální nastavení |

### Generovaná / build / output
- **Žádné** — projekt nemá build systém. Soubory v rootu = produkční soubory.

---

## Složka `assets/`

Obsahuje obrázky, ikony a SVG. Všechny se odkazují přímo z `index.html` nebo `script.js`/`game.js`.

| Soubor | Použití |
|---|---|
| `katerina-portrait-transparent.png` | Sekce "O mně" — portrét |
| `malina.svg` | Egg hunt — schované maliny v sekcích |
| `malina-game.svg` | Hra Skákající malina — hráč |
| `brouk-game.svg` | Hra — překážka brouk |
| `mravenec-game.svg` | Hra — překážka mravenec |
| `wind-game.svg` | Hra — vizuální prvek vítr |
| `omalovanka-doodle-hledej.png` | Sekce Ukázky — preview omalovánky "Hledej" |
| `omalovanka-podle-cisel.png` | Sekce Ukázky — preview omalovánky "Podle čísel" (modifikováno, viz `git status`) |
| `kniha-beltaine-02.png` | Sekce Ukázky — preview knihy Beltaine |
| `hra-kouzelny-srdickovy-lektvar.png` | Sekce Ukázky — preview hry |
| `hra-nakrm-mlsne-zviratko.png` | Sekce Ukázky — preview hry |
| `hry-napady-10.png` | Sekce Ukázky — preview "10 nápadů" |

### `assets/ukazky/`
Podsložka s detailními screenshoty pro lightbox v sekci "Ukázky". Konkrétní soubory neauditovány — nutno projít při zásahu do sekce Ukázky.

---

## Složka `docs/handoff/` (tato handoff dokumentace)

| Soubor | Účel |
|---|---|
| `PROJECT_CONTEXT.md` | Hlavní orientační dokument o projektu |
| `SESSION_SUMMARY.md` | Shrnutí poslední session (2026-05-02) |
| `CURRENT_STATE.md` | Aktuální stav projektu |
| `NEXT_STEPS.md` | Plán pokračování |
| `FILES_AND_MATERIALS.md` | **Tento dokument** |
| `PROMPT_FOR_NEXT_MODEL.md` | Hotový prompt pro další AI |
| `DO_NOT_CHANGE.md` | Co se nesmí svévolně měnit |

---

## Externí materiály a zdroje

### Live web
- **Produkce**: https://katerinamlsnova-web.vercel.app

### Repository
- **GitHub**: https://github.com/MlsnaMalina/katerinamlsnova-web
- **Větev pro deploy**: `main` (auto-deploy na Vercel)

### Externí služby
| Služba | Účel | Místo v kódu |
|---|---|---|
| **Vercel** | Hosting + auto-deploy | Není v kódu — konfigurace na Vercel dashboardu |
| **GitHub** | Repository | — |
| **Formspree** | Backend pro formuláře (kontakt + ceník) | Endpoint v `index.html` u `<form action>` |
| **Google Fonts** | Fonty Syne / Space Grotesk / IBM Plex Mono | `<link>` v `<head>` `index.html` |
| **GSAP CDN** | Animace + ScrollTrigger | `<script src="https://cdnjs.cloudflare.com/...">` v `index.html` |
| **Google Analytics 4** | (placeholder) | `G-XXXXXXXXXX` — čeká na reálné ID |

### Loga / značka
- **Logo Kit** (zdrojové soubory) — **umístění mimo repo, nutno ověřit s Kateřinou.** Pravděpodobně lokálně u ní v jiné složce. Barvy jsou už extrahované do CSS proměnných.

---

## Doporučení pro práci

### Kde se má pracovat (zelené)
- `index.html`, `style.css`, `script.js`, `game.js` — primární zdrojové soubory.
- `docs/handoff/` — pro aktualizaci handoff dokumentace.
- `assets/` — pro přidání nových obrázků/ikon (vždy dodat optimalizované, ideálně < 200 KB).
- `zasady-ochrany-osobnich-udaju.html` + `-draft.md` — pro úpravy GDPR.

### Kde se má pracovat opatrně (žlutá)
- `CONTEXT.md`, `PLAN.md`, `README.md` — historické dokumenty, při úpravě hrozí ztráta kontextu (pokud nejde o cílenou aktualizaci).
- `SESSION_NOTES.md` — neudržováno, riziko zmatku se starými informacemi.

### Kam NESAHAT (červené)
- Konfigurační soubory na Vercelu (mimo repo) — řeší jen Kateřina nebo s explicitním souhlasem.
- `LICENSE` — ne bez instrukce.
- `.claude/` — lokální nastavení Claude Code.
- `files.zip` a `.txt` hodnocení — neznámý/citlivý obsah.

---

## Názvy souborů, které je nutné zachovat (kvůli odkazům z kódu)
- Všechny soubory v `assets/` (odkazují se přesnými jmény z HTML/JS).
- `zasady-ochrany-osobnich-udaju.html` — odkazováno z footeru/cookie consentu.
- `index.html`, `style.css`, `script.js`, `game.js` — fixní jména pro Vercel.

---

## Chybějící informace

### Co potřebuji od Kateřiny
1. **Reálné GA4 measurement ID** (až bude k dispozici).
2. **OG image grafika** (1200×630 px) pro sociální náhledy.
3. **Favicon design** (může vycházet z `assets/malina.svg`).
4. **Obsah `files.zip`** — co to je, zda patří do repa, nebo do `.gitignore`.
5. **Přístup k Vercel dashboardu / projekt settings** — pokud je třeba upravit deploy konfiguraci.
6. **Logo Kit zdrojové soubory** — pro případ, že by bylo potřeba derivovat ikony.

### Co je nejasné
- Zda jsou hodnocení v `.txt` souborech relevantní pro další práci, nebo jen archiv.
- Zda starší `CONTEXT.md` a `SESSION_NOTES.md` mají být sloučeny / smazány po migraci na `docs/handoff/`.
