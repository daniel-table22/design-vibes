import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(
    join(__dirname, "../assets/variables_export_2026-04-03T21194.json"),
    "utf8"
  )
);

function toColor(v) {
  const r = Math.round(v.r * 255);
  const g = Math.round(v.g * 255);
  const b = Math.round(v.b * 255);
  return v.a === 1
    ? `rgb(${r} ${g} ${b})`
    : `rgb(${r} ${g} ${b} / ${Math.round(v.a * 100)}%)`;
}

function resolve(variable) {
  const mode = Object.keys(variable.valuesByMode)[0];
  const val = variable.valuesByMode[mode];
  if (val !== null && typeof val === "object" && "aliasOf" in val) {
    return val.resolved ?? null;
  }
  return val ?? null;
}

function slug(str) {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function toCssVar(collectionName, varName) {
  const parts = varName.split("/").map((p) => p.trim());
  const lower = parts.map(slug);

  if (collectionName === "Color scheme") {
    const group = parts[0]; // Colors | Overlays | Variables
    if (group === "Colors") {
      // Colors/Tomato/1 → --color-tomato-1
      // Colors/Tomato Alpha/1 → --color-tomato-alpha-1
      return `--color-${lower.slice(1).join("-")}`;
    }
    if (group === "Overlays") {
      // Overlays/Black Alpha/1 → --color-overlay-black-alpha-1
      return `--color-overlay-${lower.slice(1).join("-")}`;
    }
    if (group === "Variables") {
      // Variables/Effects/translucent color → --color-effects-translucent-color
      return `--color-${lower.slice(1).join("-")}`;
    }
    return `--color-${lower.join("-")}`;
  }

  if (collectionName === "Theme") {
    const group = parts[0];

    if (group === "Colors") {
      const sub = parts[1]; // Accent | Neutral | Semantic | Default
      if (sub === "Accent" || sub === "Neutral") {
        // Colors/Accent/Accent/1 → --theme-accent-1
        // Colors/Accent/Accent Alpha/1 → --theme-accent-alpha-1
        // Colors/Neutral/Neutral/1 → --theme-neutral-1
        return `--theme-${lower.slice(2).join("-")}`;
      }
      if (sub === "Semantic") {
        // Colors/Semantic/Success/1 → --theme-success-1
        return `--theme-${lower.slice(2).join("-")}`;
      }
      if (sub === "Default") {
        // Colors/Default/white → --theme-white
        return `--theme-${lower.slice(2).join("-")}`;
      }
      return `--theme-colors-${lower.slice(2).join("-")}`;
    }

    if (group === "Spacing") {
      return `--spacing-${lower[1]}`;
    }

    if (group === "Typography") {
      const sub = parts[1];
      if (sub === "Font size")     return `--font-size-${lower[2]}`;
      if (sub === "Line height")   return `--line-height-${lower[2]}`;
      if (sub === "Letter spacing") return `--letter-spacing-${lower[2]}`;
      if (sub === "Font weight")   return `--font-weight-${lower[2]}`;
      if (sub === "Font family")   return `--font-family-${lower[2]}`;
      return `--typography-${lower.slice(1).join("-")}`;
    }

    if (group === "Radius") {
      // Radius/1, Radius/1-max, Radius/full → --theme-radius-1, --theme-radius-1-max
      return `--theme-radius-${lower[1]}`;
    }

    if (group === "Panel") {
      return `--panel-${lower[1]}`;
    }

    if (group === "Tokens") {
      // Tokens/Colors/accent-contrast → --token-accent-contrast
      // Tokens/Space/button-height-1 → --token-button-height-1
      return `--token-${lower.slice(2).join("-")}`;
    }

    return `--theme-${lower.join("-")}`;
  }

  if (collectionName === "Radius") {
    // Full/1 → --radius-full-1  |  Full/1-max → --radius-full-1-max
    return `--radius-${lower.join("-")}`;
  }

  if (collectionName === "Scaling") {
    const scale = parts[0].replace("%", "").trim();
    return `--scale-${scale}-${lower[1]}`;
  }

  if (collectionName === "Responsive sizes (custom)") {
    return `--responsive-${slug(varName)}`;
  }

  return `--${lower.join("-")}`;
}

function toValue(variable, collectionName) {
  const val = resolve(variable);
  if (val === null) return null;

  if (variable.type === "color") {
    if (typeof val === "object" && "r" in val) return toColor(val);
    return null;
  }

  if (variable.type === "float") {
    if (collectionName === "Scaling") return String(+val.toFixed(3));
    if (variable.name.toLowerCase().includes("letter spacing")) return `${+val.toFixed(4)}px`;
    return `${+val.toFixed(2)}px`;
  }

  if (variable.type === "string") return val;

  return null;
}

// ---- Build CSS ----
const rootVars = [];
const themeColors = [];
const themeRadius = [];

for (const collection of data.collections) {
  rootVars.push(`\n  /* ── ${collection.name} ── */`);
  for (const variable of collection.variables) {
    const cssVar = toCssVar(collection.name, variable.name);
    const cssVal = toValue(variable, collection.name);
    if (cssVal === null) continue;

    rootVars.push(`  ${cssVar}: ${cssVal};`);

    if (collection.name === "Color scheme" && variable.type === "color") {
      themeColors.push(`  ${cssVar}: var(${cssVar});`);
    }
    if (collection.name === "Theme" && variable.type === "color") {
      themeColors.push(`  ${cssVar}: var(${cssVar});`);
    }
    if (collection.name === "Radius" && variable.type === "float") {
      themeRadius.push(`  ${cssVar}: var(${cssVar});`);
    }
  }
}

const css = `/* Auto-generated from Figma variables — do not edit manually */
/* Run: node scripts/build-tokens.mjs */

:root {
${rootVars.join("\n")}
}

@theme inline {
  /* Color scheme + Theme colors → Tailwind utilities */
${themeColors.join("\n")}

  /* Radius → Tailwind utilities */
${themeRadius.join("\n")}
}
`;

const outPath = join(__dirname, "../styles/tokens.css");
writeFileSync(outPath, css);
console.log(`✓ Tokens written to styles/tokens.css (${rootVars.filter(l => l.includes(":")).length} variables)`);
