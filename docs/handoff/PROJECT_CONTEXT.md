# PROJECT_CONTEXT.md

## Název projektu
**Osobní web Kateřiny Mlsnové** — `katerinamlsnova-web`

## Stručný popis
Jednostránkové (one-page) osobní portfolio Kateřiny Mlsnové, knižní redaktorky a začínající "vibe coderky". Web prezentuje její služby (jednoduché weby, hry, prezentace, kontrolu AI textů), portfolio realizací, ceník, kontakt a obsahuje skryté herní prvky (egg hunt, mini hra Skákající malina).

## Cíl projektu
- Získávat zakázky od malých klientů (lektoři, OSVČ, učitelé, malé projekty).
- Demonstrovat schopnost dělat hravé, ručně-kreslené weby s AI asistencí.
- Být přátelskou, lidskou alternativou ke korporátním šablonovým webům.

## Cílová skupina
- Lidé hledající jednoduchý a finančně dostupný web (typicky 500–4 500 Kč).
- Lektoři, kreativci, OSVČ, učitelé — netechnická klientela.
- Lidé, kterým vyhovuje neformální, hravý tón.

## Celkový směr a záměr
- Web musí působit **lidsky a hravě**, ne korporátně.
- **Hand-drawn estetika** — všechny ohraničení, ikony a doodly jsou ručně kreslené (SVG filtry `#rough`, `#rough-strong` z `feTurbulence`+`feDisplacementMap`).
- Vše má svůj příběh (např. egg hunt s odměnou — slevový kód `MAM_VSECH_5_POHROMADE`).
- **Žádné stock fotky, žádné generické šablony.**

## Technický stack
- **Vanilla HTML / CSS / JS** — žádný build systém, žádný framework, žádný npm.
- **GSAP + ScrollTrigger** přes CDN (animace).
- **Google Fonts**: Syne 800 (nadpisy), Space Grotesk 400/500 (tělo), IBM Plex Mono 600 (terminál/kód).
- **Hosting**: Git → GitHub → Vercel (auto-deploy z `main` větve).
- **Formuláře**: Formspree (kontakt).
- **Analytika**: GA4 placeholder `G-XXXXXXXXXX` (čeká na reálné ID).

## Důležité preference uživatele (Kateřiny)
- Píše česky, komunikuje přes Claude Code (CLI), prompty často připravuje v Claude.ai.
- **Workflow**: Claude (web) připraví prompt → Kateřina vloží do Claude Code → Claude Code pracuje na repu.
- Není programátorka — neumí sama opravovat kód, ale rozumí tomu, co vidí.
- Hodnotí výsledek vizuálně a obsahově, ne kódem.
- Chce **konkrétní a jasné odpovědi**, ne dlouhé úvody.
- Chce **commit + push na main** po každé schválené změně (ne PR review proces — je solo developerka).
- E-mail pro git commity: `k.schmiedtova@seznam.cz` (povinné — Vercel jinak odmítne).
- Commity v imperativu, vždy s `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

## Styl, tón, vizuální požadavky
### Barvy (Logo Kit)
- Tmavá malina `#7A1840` (akcent v light mode)
- Světlá malina `#B83066` (akcent v dark mode)
- Inkoust `#1A1714`
- Hluboká čerň `#0F0E0C`
- Krém `#F7F4EE`
- Bílá `#FFFFFF`
- **Pozn.**: starší `CONTEXT.md` zmiňuje fialovou `#6b3fa0` a malinovou `#a31f4f` — to jsou starší/nepřesné hodnoty. **Reálná paleta v CSS je výše.**
- Light mode: pozadí čistě bílé, akcent tmavá malina.
- Dark mode: akcent světlá malina.

### Typografie
- **Syne 800** — nadpisy, hero KATEŘINA / MLSNOVÁ.
- **Space Grotesk 400/500** — tělo textu.
- **IBM Plex Mono 600** — terminálový kurzor v hero, kódové prvky.

### Tón textů
- Neformální, ale ne familiérní.
- **Genderově neutrální** (nepředpokládat pohlaví návštěvníka). Příklad: "Další malina – 3/5! 🍓" místo "Našla jsi malinu 3/5!".
- Lidský, hravý, někde sebeironický ("Knižní redaktorka, která se naučila vibe kódovat...").

### UX prvky
- **Dark / light mode** auto (`prefers-color-scheme`) + manuální toggle (🌙/☀️ ikona v navu, perzistence v `localStorage` pod klíčem `km-theme`).
- **IntersectionObserver** pro fade-in animace sekcí (vzor v `script.js`).
- **Mobile-first**: hamburger menu pod 768 px.
- **Hover efekty** jen na desktopu (`@media (hover: hover)`); na touch zařízeních alternativní chování (např. ceny vždy viditelné).

## Co je pro projekt zásadní zachovat
1. **Hand-drawn estetika** — žádné box-shadow, žádné gradient lazy efekty, vše přes SVG `#rough` filtr.
2. **Logo Kit barvy** (viz výše).
3. **Formspree formuláře** — endpoint nesmí být změněn bez souhlasu.
4. **Egg hunt logika** — 5 schovaných malin, slevový kód `MAM_VSECH_5_POHROMADE`.
5. **`localStorage` klíče**: `km-theme`, `km-eggs-found`, `km-cookies-consent` (a sessionStorage `km-eggs-modal-shown`).
6. **Skryté API**: `window.resetEggHunt()`, `window.startEggHunt()`.
7. **Git workflow**: Vercel email `k.schmiedtova@seznam.cz`, push na `main`, vždy s `Co-Authored-By: Claude Opus 4.7 (1M context)`.

## Co bylo výslovně odmítnuto / nepoužívat
- **Žádný framework** (React, Vue, Svelte, Next.js, Astro...). Vanilla pouze.
- **Žádný build systém** (Vite, Webpack, Parcel...). Soubory jsou nasazeny přímo.
- **Žádný TypeScript** (vanilla JS).
- **Žádné stock fotky** ani generické ikony.
- **Žádný framework CSS** (Tailwind, Bootstrap...). Custom CSS s proměnnými.
- **Animace "vysypávání malin z obálky"** — opuštěna jako příliš složitá.
- **"Doodle bloom" layout sekce O mně** (8 doodlů + 3 chapter karty) — opuštěno, vrátilo se zpět na dvousloupcový layout s rámečkem.
- **Auto-trigger egg hunt modalu při page load** — opraveno commitem `1acf671`, nesmí se vrátit.
- **Hláška "Jejda, rozsypaly se mi maliny"** — odstraněna v `3470e20`, nepřidávat zpět.
- **Genderově specifické texty** ("Našla jsi" → musí být neutrální).

## Limity, omezení a rizika
- **Bez build systému** — všechny soubory musí běžet přímo v prohlížeči. Žádné importy modulů (kromě `<script src="...">`).
- **Vercel deploy je automatický** — každý push na `main` jde okamžitě do produkce. **Před pushnutím vždy zvážit, zda změna je hotová.**
- **GA4 placeholder** — pokud bude reálné ID, musí se nahradit ve všech místech (`index.html` cookie consent + Google tag).
- **Velikost CSS** (3535 řádků) a `index.html` (1035 řádků) — opatrné při edit, hledat přes Grep.
- **Žádný linter, žádné testy** — kontrola kvality probíhá vizuálně v prohlížeči.
- **Egg hunt CSS** — výchozí opacita malin je nyní `1` (pro viditelnost při testování). Pokud Kateřina někdy bude chtít vrátit "schovaný" efekt, je třeba opatrně řešit kontrast s `is-found` stavem.

## Externí odkazy
- **Live web**: https://katerinamlsnova-web.vercel.app
- **Repo**: https://github.com/MlsnaMalina/katerinamlsnova-web
- **Lokální cesta**: `C:\Users\merit\OneDrive\Desktop\AI\Ostatní\katerinamlsnova-web`
