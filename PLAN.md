# PLAN.md — Osobní web Kateřiny Mlsnové

## O projektu
Osobní web Kateřiny Mlsnové — vibe coderky. Web má reflektovat osobní brand a estetiku z Logo Kitu (tmavá malina, inkoust, krém).

## Tech stack
- **Frontend:** Vanilla HTML + CSS + JS (bez frameworku, lehké a rychlé)
- **Hosting:** Git → GitHub → Vercel (auto-deploy)
- **Fonty:** Google Fonts CDN (Syne, Space Grotesk, IBM Plex Mono)

## Barevná paleta (Logo Kit)
| Název | Hex |
|---|---|
| Tmavá malina | `#7A1840` |
| Světlá malina | `#B83066` |
| Inkoust | `#1A1714` |
| Hluboká čerň | `#0F0E0C` |
| Bílá | `#FFFFFF` |
| Krém | `#F7F4EE` |

## Typografie
- **Syne 800** — velké nadpisy, příjmení v logu
- **Space Grotesk 400 / 500** — křestní jméno, běžné texty
- **IBM Plex Mono 600** — kurzor, technické detaily

## Struktura souborů
```
/
├── index.html      # základní HTML kostra
├── style.css       # styly + CSS proměnné (light/dark)
├── script.js       # interakce
├── assets/         # obrázky, ikony, loga
└── PLAN.md
```

## Režimy
- **Light mode** — krémové pozadí, inkoustový text
- **Dark mode** — hluboká čerň, krémový text
- Přepínání přes `prefers-color-scheme` + manuální toggle (později)

## Roadmap
1. ✅ Základní struktura souborů + CSS proměnné
2. ⏳ Hero sekce s logem (Kateřina Mlsnová + kurzor)
3. ⏳ Sekce „o mně" / vibe coding manifest
4. ⏳ Projekty / portfolio
5. ⏳ Kontakt
6. ⏳ Polish: animace, dark mode toggle, responzivita
