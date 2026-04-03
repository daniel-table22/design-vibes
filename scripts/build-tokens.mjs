import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(
    join(__dirname, "../assets/variables_export_2026-04-03T19311.json"),
    "utf8"
  )
);

// Convert normalized 0-1 RGBA to CSS color string
function toColor(v) {
  const r = Math.round(v.r * 255);
  const g = Math.round(v.g * 255);
  const b = Math.round(v.b * 255);
  return v.a === 1
    ? `rgb(${r} ${g} ${b})`
    : `rgb(${r} ${g} ${b} / ${Math.round(v.a * 100)}%)`;
}

// Resolve value from valuesByMode (use first mode, follow alias to resolved)
function resolve(variable) {
  const mode = Object.keys(variable.valuesByMode)[0];
  const val = variable.valuesByMode[mode];
  if (val !== null && typeof val === "object" && "aliasOf" in val) {
    return val.resolved ?? null;
  }
  return val ?? null;
}

// Convert a Figma variable name to a CSS custom property name
// "Colors/Tomato/1" → "--color-tomato-1"
// "Typography/Font size/1" → "--font-size-1"
// "Spacing/1" → "--spacing-1"
// "Small/1" (radius) → "--radius-small-1"
// "100%/1" (scaling) → "--scale-100-1"
function toCssVar(collectionName, varName) {
  const name = varName.toLowerCase().trim();

  if (collectionName === "Color scheme") {
    // "colors/tomato/1" → "--color-tomato-1"
    const parts = name.split("/").map((p) => p.trim().replace(/\s+/g, "-"));
    return `--color-${parts.slice(1).join("-")}`;
  }

  if (collectionName === "Theme ✦") {
    if (name.startsWith("spacing/")) {
      return `--spacing-${name.split("/")[1]}`;
    }
    if (name.startsWith("typography/font size/")) {
      return `--font-size-${name.split("/")[2]}`;
    }
    if (name.startsWith("typography/line height/")) {
      return `--line-height-${name.split("/")[2]}`;
    }
    if (name.startsWith("typography/letter spacing/")) {
      return `--letter-spacing-${name.split("/")[2]}`;
    }
    if (name.startsWith("typography/font weight/")) {
      return `--font-weight-${name.split("/")[2]}`;
    }
    if (name.startsWith("typography/font family/")) {
      return `--font-family-${name.split("/")[2]}`;
    }
    // Fallback for other Theme tokens (semantic colors etc.)
    const parts = name.split("/").map((p) => p.trim().replace(/\s+/g, "-"));
    return `--theme-${parts.join("-")}`;
  }

  if (collectionName === "Radius") {
    // "small/1" → "--radius-small-1", "none/1" → "--radius-none-1"
    const parts = name.split("/").map((p) => p.trim().replace(/\s+/g, "-"));
    return `--radius-${parts.join("-")}`;
  }

  if (collectionName === "Scaling") {
    // "100%/1" → "--scale-100-1"
    const parts = name.split("/");
    const scale = parts[0].replace("%", "").trim();
    return `--scale-${scale}-${parts[1]}`;
  }

  if (collectionName === "Responsive sizes (custom)") {
    return `--responsive-${name.replace(/\s+/g, "-")}`;
  }

  // Generic fallback
  return `--${name.replace(/[^a-z0-9]+/g, "-")}`;
}

function toValue(variable, collectionName) {
  const val = resolve(variable);
  if (val === null) return null;

  if (variable.type === "color") {
    if (typeof val === "object" && "r" in val) return toColor(val);
    return null;
  }

  if (variable.type === "float") {
    const name = variable.name.toLowerCase();
    // Scaling values are unitless multipliers
    if (collectionName === "Scaling") return String(+val.toFixed(3));
    // Letter spacing in px
    if (name.includes("letter spacing")) return `${+val.toFixed(4)}px`;
    // Everything else in px
    return `${+val.toFixed(2)}px`;
  }

  if (variable.type === "string") {
    return val;
  }

  return null;
}

// ---- Build CSS ----
const rootVars = [];
const themeColors = [];
const themeRadius = [];

for (const collection of data.collections) {
  for (const variable of collection.variables) {
    const cssVar = toCssVar(collection.name, variable.name);
    const cssVal = toValue(variable, collection.name);
    if (cssVal === null) continue;

    rootVars.push(`  ${cssVar}: ${cssVal};`);

    // Also surface colors + radius into Tailwind @theme
    if (collection.name === "Color scheme" && variable.type === "color") {
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
  /* Colors → Tailwind utilities: bg-tomato-1, text-red-9, etc. */
${themeColors.join("\n")}

  /* Radius → Tailwind utilities: rounded-small-1, etc. */
${themeRadius.join("\n")}
}
`;

const outPath = join(__dirname, "../styles/tokens.css");
writeFileSync(outPath, css);
console.log(`✓ Tokens written to styles/tokens.css (${rootVars.length} variables)`);
