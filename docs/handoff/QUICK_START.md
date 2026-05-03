# NEJRYCHLEJŠÍ MOŽNÝ START PRO DALŠÍ SESSION

Pro nový AI model nebo nového vývojáře — co udělat hned na začátku, než cokoli editovat.

1. **Otevři `docs/handoff/PROJECT_CONTEXT.md`** a přečti celé. Získáš obrázek o projektu, paletě, tónu a workflow Kateřiny.

2. **Otevři `docs/handoff/DO_NOT_CHANGE.md`** a přečti celé. Pochop, co je posvátné — barvy, formulace, slevový kód, klíče v localStorage, git workflow, **vědomé `!important` overrides na egg hunt malinách**, struktura sekce `#ukazky`.

3. **Otevři `docs/handoff/CURRENT_STATE.md`** a podívej se na sekci „Stav k datu" + „Co aktuálně funguje". Zjistíš, kde projekt teď stojí.

4. **Otevři `docs/handoff/SESSION_SUMMARY.md`** a přečti — pochopíš, proč některé věci vypadají jak vypadají (zejména egg hunt overrides a duplicita `data-egg="4"`).

5. **Spusť `git status` a `git log --oneline -10`** v rootu repa. Ověř, že na `main` je commit `c9335dc` (nebo novější) a žádné nepushnuté změny.

6. **Otevři live web** https://katerinamlsnova-web.vercel.app v prohlížeči. Klikni v hero na malinu, projdi sekce. Zejména v sekci `#ukazky` ověř:
   - Featured iframe blok hry „Kouzelný srdíčkový lektvar" funguje a načte se
   - Slidery prezentace (18 slidů) a knížky (10 stran) mají funkční šipky a counter
   - Carousel se 3 kartami pod nimi funguje (lightbox)

7. **Otevři DevTools konzoli** a zkus `resetEggHunt()` — musí vymazat stav a reloadnout. Pak ověř že po sebrání všech 5 malin se otevře modal s kódem `MAM_VSECH_5_POHROMADE`.

8. **Otevři `docs/handoff/NEXT_STEPS.md`** a podívej se na sekci „NUTNÉ KROKY". Žádný nejde řešit bez podkladů od Kateřiny (GA4 ID, OG image atd.) — proto **počkej na její pokyn**.

9. **Pošli Kateřině krátké shrnutí (max 10 vět)** podle struktury v `PROMPT_FOR_NEXT_MODEL.md`: co jsi pochopil + co se NESMÍ měnit + co je rozdělané + tvoje otázky.

10. **Počkej na konkrétní zadání.** Nezačínej iniciativně — Kateřina pracuje stylem „jeden úkol = jeden prompt = jeden commit".

11. **Až dostaneš úkol**: nejdřív navrhni postup (2-5 vět), počkej na schválení, pak edituj. Necommituj/nepushuj automaticky — vždy se zeptej.

## Časté pasti, na které dej pozor
- **Cache prohlížeče**: změny v CSS často nejsou vidět bez `Ctrl+Shift+R`. Když Kateřina řekne „nezměnilo se to", první otázka: zkusil jsi hard reload?
- **`opacity: 1 !important` na egg hunt malinách** je vědomé — neopravovat zpět.
- **Duplicitní `data-egg="4"`** (pssst v pricing + kopie v contact) je vědomé — kopie je inline-pozicovaná za submit tlačítkem v contact form.
- **`top: 0` na `.egg-raspberry--pssst`** vyhrává nad `bottom: X` — pokud chceš pozicovat malinu z dna, přidej `top: auto` do inline style.
- **`overflow: hidden` na `.works`, `.skills`, `.contact`** ořezává absolutně pozicované děti — počítej s tím při placement nových prvků.
- **`.contact__form { position: relative }`** je definováno na `style.css:3392` — slouží jako positioning context pro egg malinu v formuláři.
