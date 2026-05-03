# PROMPT_FOR_NEXT_MODEL.md

## Hotový prompt — zkopíruj celé do nové AI konverzace

---

Pracujeme na osobním webu Kateřiny Mlsnové (`katerinamlsnova-web`).
Stack: vanilla HTML/CSS/JS, žádný build systém, hosting Vercel auto-deploy z `main` větve.
Lokální cesta: `C:\Users\merit\OneDrive\Desktop\AI\Ostatní\katerinamlsnova-web`
Live web: https://katerinamlsnova-web.vercel.app
Repo: https://github.com/MlsnaMalina/katerinamlsnova-web

**Než cokoli začneš dělat, proveď tento postup:**

1. **Přečti si v tomto pořadí:**
   - `docs/handoff/QUICK_START.md` — nejrychlejší orientace
   - `docs/handoff/PROJECT_CONTEXT.md` — kompletní kontext
   - `docs/handoff/CURRENT_STATE.md` — aktuální stav projektu
   - `docs/handoff/DO_NOT_CHANGE.md` — co je posvátné
   - `docs/handoff/SESSION_SUMMARY.md` — co se dělo v předchozí session

2. **Spusť `git status` a `git log --oneline -10`** ať vidíš aktuální HEAD a unikamizované změny.

3. **Pošli mi krátké shrnutí (max 10 vět):**
   - Co jsi pochopil/a o projektu
   - Co je rozdělané, co je hotové
   - Co podle tebe nesmíš měnit bez mého souhlasu
   - Tvoje otázky, pokud něco není jasné

4. **Počkej na můj konkrétní pokyn.** Nezačínej nic iniciativně.

**Pravidla pro práci:**

- Pracuju stylem **"jeden úkol = jeden prompt = jeden commit"**. Nedomýšlej další kroky.
- Před úpravou kódu: navrhni postup ve 2-5 větách, počkej na schválení.
- Po každé schválené změně: commit + push na `main`. **Nepushuj nic bez mého výslovného souhlasu.**
- Commit message: česky, imperativ, vždy s `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- Git author email: `k.schmiedtova@seznam.cz` (Vercel jinak odmítne).
- Hodnotím vizuálně, posílám screenshoty s problémem. Když se objeví bug, kontroluj v prohlížeči (live preview / hard reload `Ctrl+Shift+R` / `resetEggHunt()` v konzoli).
- Cache prohlížeče často maskuje změny — vždy zmiň hard reload, když změny nejdou vidět.

**Tón komunikace:**
- Stručně, věcně, česky.
- Žádné dlouhé úvody, žádné "rád ti pomohu".
- Konkrétní cesty (`index.html:712`, `style.css:3320`).
- Když narazíš na rozhodnutí: nabídni varianty, nech mě vybrat.

**Před tvou první akcí**:
- Pokud vidíš v zadání rozpor s `DO_NOT_CHANGE.md`, **upozorni mě a zeptej se**, neopravuj sám.
- Pokud zadání není jednoznačné, **řekni co tě napadá za interpretace**, počkej.

Začni krokem 1.

---

## Použití
- Pošli tento prompt jako úvodní zprávu v nové AI konverzaci.
- AI by měla automaticky přečíst dokumenty a poslat ti shrnutí.
- Až dostane konkrétní úkol, pracuje podle pravidel výše.
