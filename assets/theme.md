# Theme (Figma collection)

Reference for the **Theme** variable collection: logical groups and how names map to slash paths in `variables_export_*.json`. Values are generated into `styles/tokens.css` as `--theme-*` (not duplicated here).

## Groups

- **Tokens** (20)
  - **Space** — `Tokens/Space/{name}`  
    e.g. `button-height-1` … `table-cell-padding-3`
  - **Colors** — `Tokens/Colors/{name}`  
    e.g. `accent-contrast`, `page-background`, `text`, `surface`, …
- **Colors** (146)
  - **Default** — `Colors/Default/{white|black}`
  - **Neutral** — `Colors/Neutral/Neutral/{1–12}`, `Colors/Neutral/Neutral Alpha/{1–12}`
  - **Accent** — `Colors/Accent/Accent/{1–12}`, `Colors/Accent/Accent Alpha/{1–12}`
  - **Semantic** — `Colors/Semantic/{Error|Success|Warning|Info}/{1–12}` and matching `* Alpha/{1–12}`
- **Typography** (36)
  - `Typography/Font family/{text|code|…}`
  - `Typography/Font weight/{regular|medium|…}`
  - `Typography/Font size/{1–9}`
  - `Typography/Letter spacing/{1–9}`
  - `Typography/Line height/{1–9}`
- **Spacing** — `Spacing/{1–9}`
- **Radius** — `Radius/{1–6}`, `Radius/{1–6}-max`, `Radius/full`
- **Panel** — `Panel/{default|solid|translucent}`

## Modes

- Theme mode in export: **Table22** (single mode in the sample JSON).

## Related assets

- Raw export: `assets/variables_export_*.json`
- Tailwind mapping notes: `assets/tailwind-demo.md`
