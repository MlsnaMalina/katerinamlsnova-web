# Kontext projektu — Kateřina Mlsnová, osobní web

## Základní info
- Web: https://katerinamlsnova-web.vercel.app
- Repo: https://github.com/MlsnaMalina/katerinamlsnova-web
- Lokálně: C:\Users\merit\OneDrive\Desktop\AI\Ostatní\katerinamlsnova-web
- Stack: vanilla HTML/CSS/JS, žádný build, deploy přes Vercel z main
- Git author email: k.schmiedtova@seznam.cz
- Workflow: Claude (claude.ai) připravuje prompty → Kateřina vkládá do Claude Code

## Styl webu
- Barvy: malinová #a31f4f, fialová #6b3fa0, béžová #f5f0e8, černá, bílá
- Fonty: Syne (nadpisy), Space Grotesk (tělo), IBM Plex Mono (kód/právní)
- Estetika: doodle/hand-drawn, dark/light mode

## Co je hotovo
- Navigace (desktop + mobil + dark/light toggle)
- Hero sekce (čistá, typing efekt: KATEŘINA → kurzor → napíše MLSNOVÁ → tagline)
- Sekce „S čím vám můžu pomoci" (6 karet, SVG doodle ikony)
- Sekce „O mně"
- Sekce „Jak to probíhá"
- Sekce „Ukázky" (carousel, lightbox)
- Sekce „Kolik co stojí?" (hover efekt, Formspree formulář, zaváděcí ceny)
- Sekce „Kontakt" (Formspree, e-mail skrytý za JS)
- Doodle ilustrace rozmístěné v sekcích (bílá, černá, malinová)
- Egg hunt — 5 schovaných malin, modal se slevovým kódem MAM_VSECH_5_POHROMADE
- Hra „Skákající malina" (endless runner, SVG postavičky)
- Footer (dvousloupcový, JS skrytá adresa, copyright)
- Stránka zasady-ochrany-osobnich-udaju.html
- Cookie lišta (GA4 placeholder G-XXXXXXXXXX)

## Co zbývá
- Doplnit GA4 ID (až bude k dispozici, nahradit G-XXXXXXXXXX)
- Průběžné ladění a opravy

## Poznámky
- SVG ikony malin, brouka a mravence jsou v assets/ (z hry Skákající malina)
- Egg hunt: maliny mají opacity 0.25, stav uložen v localStorage
- Animace vysypávání z obálky byla opuštěna — příliš složitá pro Claude Code
