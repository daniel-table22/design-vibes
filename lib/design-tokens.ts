import rawData from "@/assets/variables_export_2026-04-03T21194.json";

type RawColor = { r: number; g: number; b: number; a: number };
type RawValue =
  | number
  | string
  | RawColor
  | { aliasOf: string; resolved: number | string | RawColor | null };

interface RawVariable {
  name: string;
  type: "color" | "float" | "string";
  valuesByMode: Record<string, RawValue>;
}

interface RawCollection {
  name: string;
  modes: string[];
  variables: RawVariable[];
}

const data = rawData as { version: number; collections: RawCollection[] };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveValue(v: RawValue): number | string | RawColor | null {
  if (v !== null && typeof v === "object" && "aliasOf" in v) {
    return (v.resolved as number | string | RawColor | null) ?? null;
  }
  return v as number | string | RawColor;
}

function toRgb(c: RawColor): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  return c.a === 1
    ? `rgb(${r} ${g} ${b})`
    : `rgb(${r} ${g} ${b} / ${Math.round(c.a * 100)}%)`;
}

function getCollection(name: string) {
  return data.collections.find((c) => c.name === name);
}

// Build a lookup map of all resolved spacing values from Theme Spacing/
function buildSpacingMap(): Record<string, number> {
  const col = getCollection("Theme");
  const map: Record<string, number> = {};
  if (!col) return map;
  for (const v of col.variables) {
    if (!v.name.startsWith("Spacing/")) continue;
    const step = v.name.split("/")[1];
    // Spacing values alias to Scaling — follow the chain via Scaling collection
    const raw = Object.values(v.valuesByMode)[0];
    const alias = raw !== null && typeof raw === "object" && "aliasOf" in raw ? raw.aliasOf : null;
    if (alias) {
      // aliasOf = "Scaling::100%/N" — look it up directly in Scaling
      const scalingCol = getCollection("Scaling");
      const scalingName = alias.replace("Scaling::", "");
      const sv = scalingCol?.variables.find((sv) => sv.name === scalingName);
      if (sv) {
        const sval = resolveValue(Object.values(sv.valuesByMode)[0]);
        if (typeof sval === "number") map[step] = sval;
      }
    } else {
      const val = resolveValue(raw);
      if (typeof val === "number") map[step] = val;
    }
  }
  return map;
}

// ─── Color Palette (Color scheme) ────────────────────────────────────────────

export interface ColorSwatch {
  name: string;
  cssVar: string;
  value: string;
}

export interface ColorFamily {
  family: string;
  swatches: ColorSwatch[];
}

export function getColorFamilies(): ColorFamily[] {
  const col = getCollection("Color scheme");
  if (!col) return [];
  const map = new Map<string, ColorSwatch[]>();
  for (const v of col.variables) {
    const parts = v.name.split("/");
    if (parts[0] !== "Colors" && parts[0] !== "Overlays") continue;
    if (parts.length < 3) continue;
    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    if (!val || typeof val !== "object" || !("r" in val)) continue;
    const prefix = parts[0] === "Overlays" ? "Overlay: " : "";
    const family = prefix + parts.slice(1, -1).join(" ");
    const step = parts[parts.length - 1];
    const cssVar = `--color-${family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${step}`;
    if (!map.has(family)) map.set(family, []);
    map.get(family)!.push({ name: step, cssVar, value: toRgb(val) });
  }
  return Array.from(map.entries()).map(([family, swatches]) => ({
    family,
    swatches: swatches.sort((a, b) => Number(a.name) - Number(b.name)),
  }));
}

// ─── Variable Colors (Color scheme Variables/) ────────────────────────────────

export interface NamedColorToken {
  name: string;
  label: string;
  value: string | null;
  aliasOf: string | null;
}

export function getVariableColors(): NamedColorToken[] {
  const col = getCollection("Color scheme");
  if (!col) return [];
  return col.variables
    .filter((v) => v.name.startsWith("Variables/") && v.type === "color")
    .map((v) => {
      const raw = Object.values(v.valuesByMode)[0];
      const alias = raw !== null && typeof raw === "object" && "aliasOf" in raw ? raw.aliasOf : null;
      const resolved = resolveValue(raw);
      const color = resolved && typeof resolved === "object" && "r" in resolved ? toRgb(resolved) : null;
      const label = v.name.split("/").slice(1).join(" / ");
      return { name: v.name, label, value: color, aliasOf: alias };
    });
}

// ─── Semantic Colors (Theme Colors/) ─────────────────────────────────────────

export function getSemanticColorFamilies(): ColorFamily[] {
  const col = getCollection("Theme");
  if (!col) return [];
  const map = new Map<string, ColorSwatch[]>();
  for (const v of col.variables) {
    const parts = v.name.split("/");
    if (parts[0] !== "Colors") continue;
    if (parts.length < 4) continue;
    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    if (!val || typeof val !== "object" || !("r" in val)) continue;
    const family = parts.slice(2, -1).join(" ");
    const step = parts[parts.length - 1];
    const cssVar = `--theme-${family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${step}`;
    if (!map.has(family)) map.set(family, []);
    map.get(family)!.push({ name: step, cssVar, value: toRgb(val) });
  }
  return Array.from(map.entries()).map(([family, swatches]) => ({
    family,
    swatches: swatches.sort((a, b) => Number(a.name) - Number(b.name)),
  }));
}

// ─── Panel Tokens (Theme Panel/) ─────────────────────────────────────────────

export function getPanelTokens(): NamedColorToken[] {
  const col = getCollection("Theme");
  if (!col) return [];
  return col.variables
    .filter((v) => v.name.startsWith("Panel/") && v.type === "color")
    .map((v) => {
      const raw = Object.values(v.valuesByMode)[0];
      const alias = raw !== null && typeof raw === "object" && "aliasOf" in raw ? raw.aliasOf : null;
      const resolved = resolveValue(raw);
      const color = resolved && typeof resolved === "object" && "r" in resolved ? toRgb(resolved) : null;
      const label = v.name.split("/").slice(1).join(" / ");
      return { name: v.name, label, value: color, aliasOf: alias };
    });
}

// ─── Token Colors (Theme Tokens/Colors/) ─────────────────────────────────────

export function getTokenColors(): NamedColorToken[] {
  const col = getCollection("Theme");
  if (!col) return [];
  return col.variables
    .filter((v) => v.name.startsWith("Tokens/Colors/") && v.type === "color")
    .map((v) => {
      const raw = Object.values(v.valuesByMode)[0];
      const alias = raw !== null && typeof raw === "object" && "aliasOf" in raw ? raw.aliasOf : null;
      const resolved = resolveValue(raw);
      const color = resolved && typeof resolved === "object" && "r" in resolved ? toRgb(resolved) : null;
      const label = v.name.split("/").slice(2).join(" / ");
      return { name: v.name, label, value: color, aliasOf: alias };
    });
}

// ─── Theme Radius (Theme Radius/) ────────────────────────────────────────────

export interface ThemeRadiusToken {
  name: string;   // "1", "2", "full"
  isMax: boolean;
  value: string;
  px: number;
  aliasOf: string | null;
}

export function getThemeRadiusTokens(): ThemeRadiusToken[] {
  const col = getCollection("Theme");
  if (!col) return [];
  return col.variables
    .filter((v) => v.name.startsWith("Radius/") && v.type === "float")
    .filter((v) => !v.name.endsWith("-max"))
    .map((v) => {
      const raw = Object.values(v.valuesByMode)[0];
      const alias = raw !== null && typeof raw === "object" && "aliasOf" in raw ? raw.aliasOf : null;
      const val = resolveValue(raw);
      const px = typeof val === "number" ? val : 0;
      const name = v.name.split("/")[1];
      return { name, isMax: false, value: px === 9999 ? "9999px (full)" : `${px}px`, px, aliasOf: alias };
    })
    .sort((a, b) => (a.name === "full" ? 999 : Number(a.name)) - (b.name === "full" ? 999 : Number(b.name)));
}

// ─── Token Space (Theme Tokens/Space/) ───────────────────────────────────────

export interface SpaceToken {
  name: string;
  label: string;
  aliasOf: string | null;
  px: number | null;
}

export function getTokenSpaceTokens(): SpaceToken[] {
  const col = getCollection("Theme");
  if (!col) return [];
  const spacingMap = buildSpacingMap();

  return col.variables
    .filter((v) => v.name.startsWith("Tokens/Space/") && v.type === "float")
    .map((v) => {
      const raw = Object.values(v.valuesByMode)[0];
      const alias = raw !== null && typeof raw === "object" && "aliasOf" in raw ? raw.aliasOf : null;
      const label = v.name.split("/").slice(2).join("/");

      // Resolve px: follow alias to Spacing/N, then look up spacingMap
      let px: number | null = null;
      const direct = resolveValue(raw);
      if (typeof direct === "number") {
        px = direct;
      } else if (alias) {
        // alias like "::Spacing/5" or "Theme::Spacing/5"
        const spacingStep = alias.match(/Spacing\/(\d+)/)?.[1];
        if (spacingStep && spacingMap[spacingStep] !== undefined) {
          px = spacingMap[spacingStep];
        }
      }

      return { name: v.name, label, aliasOf: alias, px };
    });
}

// ─── Typography ───────────────────────────────────────────────────────────────

export interface TypographyScale {
  step: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

export function getTypographyScale(): TypographyScale[] {
  const col = getCollection("Theme");
  if (!col) return [];
  const fontSizes: Record<string, string> = {};
  const lineHeights: Record<string, string> = {};
  const letterSpacings: Record<string, string> = {};
  for (const v of col.variables) {
    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    if (typeof val !== "number") continue;
    const step = v.name.split("/").pop()!;
    if (v.name.startsWith("Typography/Font size/"))      fontSizes[step]      = `${val}px`;
    if (v.name.startsWith("Typography/Line height/"))    lineHeights[step]    = `${val}px`;
    if (v.name.startsWith("Typography/Letter spacing/")) letterSpacings[step] = `${val.toFixed(4)}px`;
  }
  return Object.keys(fontSizes)
    .sort((a, b) => Number(a) - Number(b))
    .map((step) => ({
      step,
      fontSize:      fontSizes[step]      ?? "-",
      lineHeight:    lineHeights[step]    ?? "-",
      letterSpacing: letterSpacings[step] ?? "-",
    }));
}

export interface FontInfo {
  families: Record<string, string>;
  weights: Record<string, string>;
}

export function getFontInfo(): FontInfo {
  const col = getCollection("Theme");
  if (!col) return { families: {}, weights: {} };
  const families: Record<string, string> = {};
  const weights: Record<string, string> = {};
  for (const v of col.variables) {
    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    if (typeof val !== "string") continue;
    const key = v.name.split("/").pop()!;
    if (v.name.startsWith("Typography/Font family/")) families[key] = val;
    if (v.name.startsWith("Typography/Font weight/"))  weights[key]  = val;
  }
  return { families, weights };
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

export interface SpacingToken {
  step: string;
  value: string;
  px: number;
}

export function getSpacingTokens(): SpacingToken[] {
  const spacingMap = buildSpacingMap();
  return Object.entries(spacingMap)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([step, px]) => ({ step, value: `${px}px`, px }));
}

// ─── Radius (standalone collection) ──────────────────────────────────────────

export interface RadiusToken {
  category: string;
  step: string;
  isMax: boolean;
  value: string;
  px: number;
}

export function getRadiusTokens(): RadiusToken[] {
  const col = getCollection("Radius");
  if (!col) return [];
  const categoryOrder = ["None", "Small", "Medium", "Large", "Full"];
  return col.variables
    .map((v) => {
      const parts = v.name.split("/");
      const category = parts[0];
      const raw = parts[1] ?? "1";
      const isMax = raw.endsWith("-max");
      const step = isMax ? raw.replace("-max", "") : raw;
      const val = resolveValue(Object.values(v.valuesByMode)[0]);
      const px = typeof val === "number" ? val : 0;
      return { category, step, isMax, value: `${px}px`, px };
    })
    .filter((t) => !t.isMax)
    .sort((a, b) => {
      const catA = categoryOrder.indexOf(a.category);
      const catB = categoryOrder.indexOf(b.category);
      if (catA !== catB) return catA - catB;
      return Number(a.step) - Number(b.step);
    });
}

// ─── Scaling ──────────────────────────────────────────────────────────────────

export interface ScalingRow {
  scale: string;
  values: { step: string; value: string }[];
}

export function getScalingTokens(): ScalingRow[] {
  const col = getCollection("Scaling");
  if (!col) return [];
  const map = new Map<string, { step: string; value: string }[]>();
  for (const v of col.variables) {
    const parts = v.name.split("/");
    const scale = parts[0];
    const step = parts[1];
    if (!step || isNaN(Number(step))) continue;
    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    const num = typeof val === "number" ? +val.toFixed(1) : 0;
    if (!map.has(scale)) map.set(scale, []);
    map.get(scale)!.push({ step, value: String(num) });
  }
  return Array.from(map.entries())
    .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
    .map(([scale, values]) => ({
      scale,
      values: values.sort((a, b) => Number(a.step) - Number(b.step)),
    }));
}

// ─── Responsive Sizes ─────────────────────────────────────────────────────────

export interface ResponsiveToken {
  name: string;
  desktop: string;
  mobile: string;
}

export function getResponsiveSizes(): ResponsiveToken[] {
  const col = getCollection("Responsive sizes (custom)");
  if (!col) return [];
  const spacingMap = buildSpacingMap();

  function resolveMode(raw: RawValue): string {
    if (typeof raw === "number") return raw === 0 ? "0px" : `${raw}px`;
    if (raw !== null && typeof raw === "object" && "aliasOf" in raw) {
      if (raw.resolved !== null && typeof raw.resolved === "number") {
        return `${raw.resolved}px`;
      }
      // follow alias to spacing map
      const step = raw.aliasOf.match(/Spacing\/(\d+)/)?.[1];
      if (step && spacingMap[step] !== undefined) return `${spacingMap[step]}px`;
      return raw.aliasOf;
    }
    return "-";
  }

  return col.variables.map((v) => {
    const modes = v.valuesByMode;
    return {
      name: v.name,
      desktop: resolveMode(modes["Desktop"] as RawValue),
      mobile: resolveMode(modes["Mobile"] as RawValue),
    };
  });
}
