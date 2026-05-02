# PROMPT_FOR_NEXT_MODEL.md

## Hotový prompt — zkopíruj do nové AI konverzace

---

```
Pracuji na osobním webu Kateřiny Mlsnové (katerinamlsnova-web).

Stack: vanilla HTML/CSS/JS, žádný build systém, deploy přes Vercel z main větve.
Repo: https://github.com/MlsnaMalina/katerinamlsnova-web
Lokálně (Windows): C:\Users\merit\OneDrive\Desktop\AI\Ostatní\katerinamlsnova-web
Live: https://katerinamlsnova-web.vercel.app

V repu je kompletní handoff dokumentace ve složce docs/handoff/. Obsahuje:
- PROJECT_CONTEXT.md — celkový kontext, paleta, tón, co se nesmí dělat
- SESSION_SUMMARY.md — co se řešilo v poslední session (egg hunt fixes)
- CURRENT_STATE.md — aktuální stav projektu, struktura, známé limity
- NEXT_STEPS.md — prioritizovaný plán dalších kroků
- FILES_AND_MATERIALS.md — kde co najít, jaké soubory neměnit
- DO_NOT_CHANGE.md — schválené prvky, kterých se nesahá bez výslovného pokynu

POSTUP, KTERÝ OD TEBE OČEKÁVÁM:

1. NEJPRVE si přečti VŠECHNY soubory v docs/handoff/ (postupně, ne zběžně).
   - Začni s PROJECT_CONTEXT.md, pak DO_NOT_CHANGE.md, pak CURRENT_STATE.md.
   - Pak SESSION_SUMMARY.md, NEXT_STEPS.md, FILES_AND_MATERIALS.md.

2. POTÉ mi odpověz krátkým shrnutím (max 10 vět) — co jsi pochopil:
   - O jaký projekt jde
   - Jaký je aktuální stav
   - Co se naposledy řešilo
   - Co se NESMÍ měnit
   - Co je rozdělané (pokud něco)

3. POČKEJ na můj pokyn, co řešit. Nezačínej sám iniciativně.

4. AŽ DOSTANEŠ ÚKOL:
   - Nejdřív navrhni postup (2-5 vět).
   - Počkej na schválení.
   - Teprve pak edituj soubory.
   - Po dokončení se mě zeptej, jestli mám commit a push, nebo počkat.

PRAVIDLA, KTERÁ MUSÍŠ DODRŽET:
- Žádný framework, žádný build, žádný TypeScript. Vanilla JS pouze.
- Hand-drawn estetika (SVG filtr #rough) — nikdy box-shadow ani lazy moderní efekty.
- Logo Kit barvy v style.css — neměnit (tmavá malina #7A1840, světlá malina #B83066, atd.).
- Slevový kód MAM_VSECH_5_POHROMADE — neměnit.
- Texty musí být genderově neutrální.
- Git author email pro commity: k.schmiedtova@seznam.cz (Vercel jinak odmítne).
- Commity v imperativu češtinou, vždy s podpisem:
  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
- Necommituj a nepushuj automaticky. Vždy se zeptej.
- Nesmíš měnit nic, co je v DO_NOT_CHANGE.md, bez explicitního souhlasu.

POZNÁMKY KE STYLU PRÁCE:
- Píšu česky, odpovídej česky.
- Buď konkrétní, ne obecný.
- Krátce, bez dlouhých úvodů.
- U každé změny napiš číslo řádku / cestu k souboru, ať vidím, kde edituješ.
- Pokud něčemu nerozumíš, zeptej se. Nehádej.

Začni teď: přečti dokumentaci v docs/handoff/ a pak mi shrň, co jsi pochopil.
```

---

## Pozn. k použití promptu
- Funguje pro jakýkoliv AI model s přístupem k souborům (Claude Code, Claude.ai s file upload, ChatGPT s code interpreter, atd.).
- Pokud nový model nemá přístup k souborům, je třeba nejdřív nahrát/zkopírovat obsah `docs/handoff/` ručně.
- Prompt předpokládá, že model bude mít aktivní přístup k repu — pokud ne, je třeba popsat alternativní pracovní postup (např. "zveřejni patche, já je aplikuji ručně").
