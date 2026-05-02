# NEJRYCHLEJŠÍ MOŽNÝ START PRO DALŠÍ SESSION

Pro nový AI model nebo nového vývojáře — co udělat hned na začátku, než cokoli editovat.

1. **Otevři `docs/handoff/PROJECT_CONTEXT.md`** a přečti celé. Získáš obrázek o projektu, paletě, tónu a workflow Kateřiny.

2. **Otevři `docs/handoff/DO_NOT_CHANGE.md`** a přečti celé. Pochop, co je posvátné — barvy, formulace, slevový kód, klíče v localStorage, git workflow.

3. **Otevři `docs/handoff/CURRENT_STATE.md`** a podívej se na sekci "Stav k datu" + "Co aktuálně funguje". Zjistíš, kde projekt teď stojí.

4. **Spusť `git status` a `git log --oneline -10`** v rootu repa. Ověř, že na `main` je commit `9bf6856` (nebo novější) a žádné nepushnuté změny.

5. **Otevři live web** https://katerinamlsnova-web.vercel.app v prohlížeči. Klikni v hero na malinu, pak na další maliny v sekcích, ověř, že egg hunt funguje (toast "Další malina - X/5! 🍓"). Po 5/5 musí přijít modal se slevovým kódem.

6. **Otevři DevTools konzoli** a zkus `resetEggHunt()` — musí vymazat stav a reloadnout.

7. **Otevři `docs/handoff/NEXT_STEPS.md`** a podívej se na sekci "NUTNÉ KROKY". Žádný nejde řešit bez podkladů od Kateřiny (GA4 ID, OG image, atd.) — proto **počkej na její pokyn**.

8. **Pošli Kateřině krátké shrnutí (max 10 vět)** podle struktury v `PROMPT_FOR_NEXT_MODEL.md`: co jsi pochopil + co se NESMÍ měnit + co je rozdělané.

9. **Počkej na konkrétní zadání.** Nezačínej iniciativně — Kateřina pracuje stylem "jeden úkol = jeden prompt = jeden commit".

10. **Až dostaneš úkol**: nejdřív navrhni postup (2-5 vět), počkej na schválení, pak edituj. Necommituj/nepushuj automaticky — vždy se zeptej.
