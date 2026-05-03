# FILES_AND_MATERIALS.md

## Kořenová cesta projektu
`C:\Users\merit\OneDrive\Desktop\AI\Ostatní\katerinamlsnova-web\`

## Hlavní zdrojové soubory (DO TĚCHTO se zasahuje při úpravách)
| Soubor | Účel | Vstoupit pokud |
|---|---|---|
| `index.html` | Kompletní DOM webu | Měníš obsah, strukturu sekcí, texty, přidáváš/měníš HTML elementy |
| `style.css` | Všechny styly + CSS proměnné + dark/light tokeny | Měníš barvy, layout, animace, responsive breakpointy |
| `script.js` | Animace, navigace, theme toggle, slidery, egg hunt, cookie consent, Formspree handlery | Měníš JS logiku (kromě hry) |
| `game.js` | Hra Skákající malina (canvas, fyzika) | Měníš pravidla / vizuál hry |
| `zasady-ochrany-osobnich-udaju.html` | Statická GDPR stránka | Editace právního textu |

## Pomocné / dokumentační soubory v rootu
| Soubor | Stav | Co s ním |
|---|---|---|
| `README.md` | Tracked | Veřejný popis projektu (může vyžadovat aktualizaci po této session) |
| `PLAN.md` | Tracked | Starší roadmap / nápady (částečně neaktuální) |
| `CONTEXT.md` | Tracked | Starší kontextový dokument — **má neaktuální barvy** (`#a31f4f`, `#6b3fa0`). Ignoruj v případě konfliktu, použij `docs/handoff/PROJECT_CONTEXT.md`. |
| `LICENSE` | Tracked | Licence projektu |
| `zasady-ochrany-osobnich-udaju-draft.md` | Tracked | Markdown draft GDPR textu |

## Untracked soubory v rootu (mimo verzi)
| Soubor | Co je to | Akce |
|---|---|---|
| `SESSION_NOTES.md` | Starší zápisky z minulé session | Lze ignorovat, není závazné |
| `files.zip` | Neznámý archiv | Lze ignorovat |
| `cookies.json` | Export cookies (debug) | **Nezahrnovat do produkce** |
| `hodnoceni-od-antigravity-kveten.txt` | Feedback od Antigravity AI | Reference, needitovat |
| `hodnoceni-od-claude-design-kveten.txt` | Feedback od Claude design AI | Reference, needitovat |
| `.claude/` | Lokální Claude Code konfigurace | Neřešit |

## Asset složky

### `assets/` (root)
| Soubor | Účel | Použití v kódu |
|---|---|---|
| `katerina-portrait-transparent.png` | Portrét Kateřiny | Sekce "O mně" |
| `malina.svg` | SVG malina (300×300, ručně kreslená, fill `#a31f4f`) | Egg hunt všechny maliny + hero maskot |
| `malina-game.svg` | SVG postavička pro hru | `game.js` |
| `brouk-game.svg` | SVG brouk pro hru | `game.js` |
| `mravenec-game.svg` | SVG mravenec pro hru | `game.js` |
| `wind-game.svg` | SVG vítr pro hru | `game.js` |
| `omalovanka-doodle-hledej.png` | Náhled hledací omalovánky | Carousel ukázky |
| `omalovanka-podle-cisel.png` | Náhled omalovánky podle čísel | Carousel ukázky |
| `kniha-beltaine-02.png` | Náhled knížky pro carousel (legacy) | **Aktuálně NEPOUŽITÉ** (knížka teď má slider v `assets/kniha/`) |
| `hra-kouzelny-srdickovy-lektvar.png` | Náhled hry pro carousel (legacy) | **Aktuálně NEPOUŽITÉ** (hra teď má iframe v featured bloku) |
| `hra-nakrm-mlsne-zviratko.png` | Náhled hry | Carousel ukázky |

### `assets/prezentace/` (NOVÉ — vytvořeno v této session)
- 18 souborů: `hra-pro-deti-01.png` až `hra-pro-deti-18.png`
- Slidy ukázkové prezentace "Online prezentace" pro Slider 1 v `.showcase-grid-2col`
- **Nepřejmenovávat** — JS i HTML cesty na ně závisí

### `assets/kniha/` (NOVÉ — vytvořeno v této session)
- 10 souborů: `kniha-beltaine-01.png` až `kniha-beltaine-10.png`
- Strany ukázky knížky pro Slider 2 v `.showcase-grid-2col`
- **Nepřejmenovávat** — JS i HTML cesty na ně závisí

### `assets/ukazky/` (existující z minulých session)
- Starší screenshoty pro carousel (možná částečně unused). Před smazáním ověřit Grepem.

## Externí zdroje (mimo repo)
| Zdroj | URL / lokace | Účel |
|---|---|---|
| **Live web** | https://katerinamlsnova-web.vercel.app | Produkce |
| **GitHub repo** | https://github.com/MlsnaMalina/katerinamlsnova-web | Source control |
| **Vercel projekt** | (Kateřinin Vercel dashboard) | Deploy logs, env vars |
| **Iframe hra Lektvar** | https://kouzelny-srdickovy-lektvar.vercel.app/ | Embed v featured bloku |
| **Formspree endpoint** | `https://formspree.io/f/mzdopbaq` | Kontakt formulář |
| **GSAP CDN** | jsdelivr.net | Animace |
| **Google Fonts CDN** | fonts.googleapis.com | Typografie |

## Handoff dokumenty (`docs/handoff/`)
| Soubor | Účel | Read first |
|---|---|---|
| `QUICK_START.md` | Rychlý onboarding pro nový model | ⭐ ANO, jako první |
| `PROJECT_CONTEXT.md` | Kompletní kontext projektu, preference, stack | ⭐ ANO |
| `CURRENT_STATE.md` | Aktuální stav, struktura, vazby | ⭐ ANO |
| `DO_NOT_CHANGE.md` | Co nesmí být měněno | ⭐ ANO |
| `SESSION_SUMMARY.md` | Co se dělalo v této session | Pro pochopení proč věci jsou jak jsou |
| `NEXT_STEPS.md` | Doporučené další kroky | Pro plánování |
| `FILES_AND_MATERIALS.md` | Tento dokument | Reference |
| `PROMPT_FOR_NEXT_MODEL.md` | Hotový prompt pro novou AI session | Použít při startu nové conversation |

## Doporučení — kam se zasahuje a kam ne

**Bez váhání editovat**:
- `index.html` (kromě DO_NOT_CHANGE prvků)
- `style.css` (kromě DO_NOT_CHANGE pravidel)
- `script.js` (kromě egg hunt logiky a slider IIFE pokud nejde o úpravu chování)

**Editovat opatrně, nejlépe se zeptat**:
- `game.js` (hra je samostatný modul, snadno se rozbije fyzika)
- `index.html` SVG `<defs>` a inline SVG doodly (ručně kreslené, citlivé na změnu)
- CSS proměnné v `:root` a `[data-theme="dark"]` (mění celý site)

**Nikdy needitovat bez výslovného pokynu**:
- `assets/malina.svg` (ikonický element značky)
- `katerina-portrait-transparent.png` (portrét)
- `LICENSE`
- Soubory v `assets/prezentace/` a `assets/kniha/` (zákaznice je dodala)

## Chybějící informace (zatím nedoplněné)
- Reálné GA4 measurement ID
- Open Graph image (1200×630 px)
- Favicon (možná chybí — třeba ověřit)
- ALT texty pro slidery (`assets/prezentace/*` a `assets/kniha/*` mají generické "Slajd X z prezentace" / "Strana X" — Kateřina je doplní)
