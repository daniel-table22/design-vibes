# Tailwind theme structure (demo)

This project uses **Tailwind CSS v4**, where the usual “`theme.extend` in `tailwind.config.js`” pattern is replaced by **CSS-first theming**: `@import "tailwindcss"` plus an `@theme` (or `@theme inline`) block. Your generated tokens live in `styles/tokens.css` and are wired into utilities the same way.

---

## 1. Standard shape (mental model)

| Layer | Role | Typical utilities |
|--------|------|-------------------|
| **Colors** | Named palettes + semantic roles | `bg-*`, `text-*`, `border-*`, `ring-*` |
| **Spacing** | Scale for margin/padding/gap | `p-*`, `m-*`, `gap-*`, `space-*` |
| **Sizing** | Width/height steps | `w-*`, `h-*`, `size-*` |
| **Radius** | Corner radii | `rounded-*` |
| **Typography** | Font family, size, weight, line-height, tracking | `font-*`, `text-*`, `leading-*`, `tracking-*` |
| **Shadows / blur** (optional) | Elevation | `shadow-*`, `blur-*` |

Figma “collections” map cleanly to **namespaces in CSS variables**, then to **one flat `@theme` namespace** Tailwind reads:

- **Color scheme** (raw ramps) → e.g. `--color-tomato-9`, utilities like `bg-tomato-9`.
- **Theme** (semantic) → e.g. `--theme-accent-9`, `--theme-neutral-1`, utilities like `bg-accent-9`, `text-neutral-12` (exact names depend on what you register under `@theme`).

---

## 2. Tailwind v4: how variables become classes

You define **theme variables** with the `--*` names Tailwind expects. Custom color `foo-bar` comes from `--color-foo-bar`:

```css
@import "tailwindcss";

@theme inline {
  /* Becomes bg-accent-9, text-accent-9, border-accent-9, etc. */
  --color-accent-9: var(--theme-accent-9);

  /* Spacing scale: becomes p-4, m-4, gap-4 if --spacing-4 is set */
  --spacing-4: var(--space-4);

  /* Radius: becomes rounded-lg-style names when mapped */
  --radius-md: var(--radius-3);
}
```

Utilities are **`{property}-{theme-key}`** where the theme key is the part after `--color-`, `--spacing-`, etc. (hyphens preserved).

---

## 3. “Standard” nesting vs what you ship

| Figma / design tool | CSS (`:root`) | Tailwind `@theme` | Example class |
|---------------------|----------------|-------------------|---------------|
| `Colors / Tomato / 9` | `--color-tomato-9` | `--color-tomato-9: var(--color-tomato-9);` | `bg-tomato-9` |
| `Theme / Colors / Accent / 9` | `--theme-accent-9` | `--color-accent-9: var(--theme-accent-9);` | `bg-accent-9` |
| `Theme / Spacing / 4` | `--space-4` (or similar) | `--spacing-4: var(--space-4);` | `p-4` |
| `Theme / Radius / 3` | `--radius-3` | `--radius-md: var(--radius-3);` *or* expose as `--radius-3` per Tailwind’s radius keys | `rounded-md` (if aliased) |

Your **generated** `styles/tokens.css` already mirrors this: `:root` holds values; `@theme inline { … }` re-exports them so Tailwind can generate utilities.

---

## 4. Minimal standalone example (illustration only)

Not imported by the app—shows the **idiom** only:

```css
@import "tailwindcss";

:root {
  --brand-50: oklch(0.98 0.02 250);
  --brand-500: oklch(0.55 0.2 250);
  --brand-950: oklch(0.2 0.05 250);
}

@theme inline {
  --color-brand-50: var(--brand-50);
  --color-brand-500: var(--brand-500);
  --color-brand-950: var(--brand-950);
}
```

Usage: `bg-brand-500`, `text-brand-950`, etc.

---

## 5. Where to look in this repo

| File | Purpose |
|------|---------|
| `app/globals.css` | `@import "tailwindcss"`, `@import "../styles/tokens.css"`, small app-level `@theme inline` |
| `styles/tokens.css` | Generated Figma tokens in `:root` + large `@theme inline` bridge |
| `scripts/build-tokens.mjs` | Builds `tokens.css` from the variables export JSON |

---

## 6. Older Tailwind (v3) comparison

If you see docs that still use **JavaScript config**, the same ideas apply with different syntax:

```js
// tailwind.config.js (v3 style) — conceptual equivalent
export default {
  theme: {
    extend: {
      colors: {
        accent: { 9: "var(--theme-accent-9)" },
      },
    },
  },
};
```

In **v4**, prefer the CSS `@theme` block next to `@import "tailwindcss"` instead of duplicating tokens in JS.
