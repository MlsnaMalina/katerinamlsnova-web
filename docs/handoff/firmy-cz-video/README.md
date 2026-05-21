# Firmy.cz video — animovaná 15s smyčka

`index.html` je 1200×800 dark stage v tvé paletě (malinová `#a31f4f`, černá `#0a0a0a`, bílá), naprogramovaná jako čistá CSS smyčka (žádný JS, žádné externí runtime kromě Google Fonts). Otevři v Chrome, screenrecorduj, exportuj do MP4, přidej hudbu v CapCutu / Premiere.

## Co se ve videu odehrává

| t       | dění                                                                 |
|---------|----------------------------------------------------------------------|
| 0–1.5s  | Terminálový prompt `~ $ kateřina --portfolio` se vypisuje vlevo nahoře |
| 1.5–3s  | "KATEŘINA" se odkrývá zleva doprava (Syne ExtraBold)                 |
| 3–4s    | "MLSNOVÁ" se odkrývá, na konci pulzuje malinový kurzor               |
| 4–5s    | Tagline fade-in pod hero textem                                       |
| 5–7s    | První dlaždice (Nakrm zvířátko) najede zprava, malinová highlight     |
| 7–9.5s  | Doodle kurzor letí na dlaždici 2 (Kouzelný lektvar), klikne          |
| 9.5–12s | Kurzor přejíždí na dlaždici 3 (Checklist), klikne                    |
| 12–14s  | Footer URL `katerinamlsnova.cz` + tagline fade-in vlevo dole, vpravo READY indikátor |
| 14–15s  | Vše fade-out, loop                                                    |

Smyčka je seamless — poslední frame matchuje první.

## Recording v Chrome (rychlá cesta, ~10 min)

1. **Otevři** `index.html` v Chrome.
2. **DevTools** (F12) → ikonka mobilu (Toggle device toolbar, Ctrl+Shift+M).
3. V horní liště nastav rozměr na **`1200 × 800`** (responsive), DPR `2` pro retina ostrost.
4. Zoom 100 %.
5. Spusť screen recorder:
   - **Windows:** OBS Studio → Display Capture nebo Window Capture, output 1200×800, 60 fps, MP4.
   - **Alternativa:** Win + G (Xbox Game Bar) — ale obsahuje overlay, lepší OBS.
   - **CapCut Desktop:** má vestavěný screen recorder.
6. Nahraj **~16 sekund** (jedna celá smyčka, ať není seam vidět). Pak v editoru ostříhej na 15s.

## Postprocessing (CapCut / Premiere / DaVinci)

- **Hudba**: instrumentální, lehká, pozitivní. Royalty-free zdroje:
  - Pixabay Music (free, MP3/WAV)
  - YouTube Audio Library
  - Epidemic Sound (placené, ale prémiové)
  - Suno AI (vygeneruj vlastní — bezpečné z licenčního hlediska, pokud máš účet)
- **Export**: MP4 H.264, 1080p (1920×1080) nebo 1200×800 native, bitrate 6–10 Mbps, 30 fps stačí.
- **Watermark**: nepřidávat — bude to už dost identifikovatelné.

## Možné úpravy

Pokud se ti něco nebude líbit, řekni mi co, a doladím:

- **Tempo** — celých 15s je v jedné CSS proměnné `--dur: 15s` (řádek 8). Změň na `12s` / `18s` a zbytek se přepočítá automaticky.
- **Dlaždice** — `index.html` ř. ~210 (3 `<div class="tile">`). Vyměň `src` za jiný screenshot z `assets/`.
- **Barvy** — `--accent`, `--bg`, `--text` v `:root`.
- **Tagline text** — `<p class="tagline">` ř. ~205.
- **URL v patičce** — `<span class="url">` ř. ~225.

## Co jsme záměrně nepoužili

- **JavaScript** — celá animace je čisté CSS keyframes. Lehčí, deterministické, snadno laditelné.
- **React/Tailwind** — overkill pro 15s smyčku.
- **Externí media** — vše čte ze složky `assets/` v repu (přes `../../../assets/...`).

## Pokud chceš animaci re-renderovat do PNG sekvence (pokročilé)

Pro plynulý export bez screen recordingu by se hodilo `puppeteer` + screenshot každý frame → ffmpeg → MP4. Pokud o to budeš stát, řekni — připravím Node skript.
