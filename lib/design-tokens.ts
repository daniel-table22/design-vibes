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

// ─── Color Palette (primitive) ───────────────────────────────────────────────

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
    // Only Colors/ and Overlays/ groups — skip Variables/
    if (parts[0] !== "Colors" && parts[0] !== "Overlays") continue;
    if (parts.length < 3) continue;

    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    if (!val || typeof val !== "object" || !("r" in val)) continue;

    // "Colors/Tomato/1" → family "Tomato", step "1"
    // "Overlays/Black Alpha/1" → family "Overlay: Black Alpha", step "1"
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

// ─── Semantic Colors (Theme) ──────────────────────────────────────────────────

export function getSemanticColorFamilies(): ColorFamily[] {
  const col = getCollection("Theme");
  if (!col) return [];

  const map = new Map<string, ColorSwatch[]>();

  for (const v of col.variables) {
    const parts = v.name.split("/");
    // Colors/Accent/Accent/1, Colors/Neutral/Neutral/1, Colors/Semantic/Success/1
    if (parts[0] !== "Colors") continue;
    if (parts.length < 4) continue;

    const val = resolveValue(Object.values(v.valuesByMode)[0]);
    if (!val || typeof val !== "object" || !("r" in val)) continue;

    // Use last two path segments as family: "Accent" / "Neutral" / "Success" etc.
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
    if (v.name.startsWith("Typography/Font size/"))
      fontSizes[step] = `${val}px`;
    if (v.name.startsWith("Typography/Line height/"))
      lineHeights[step] = `${val}px`;
    if (v.name.startsWith("Typography/Letter spacing/"))
      letterSpacings[step] = `${val.toFixed(4)}px`;
  }

  return Object.keys(fontSizes)
    .sort((a, b) => Number(a) - Number(b))
    .map((step) => ({
      step,
      fontSize: fontSizes[step] ?? "-",
      lineHeight: lineHeights[step] ?? "-",
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
    if (v.name.startsWith("Typography/Font weight/")) weights[key] = val;
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
  const col = getCollection("Theme");
  if (!col) return [];

  return col.variables
    .filter((v) => v.name.startsWith("Spacing/"))
    .map((v) => {
      const step = v.name.split("/")[1];
      const val = resolveValue(Object.values(v.valuesByMode)[0]);
      const px = typeof val === "number" ? val : 0;
      return { step, value: `${px}px`, px };
    })
    .sort((a, b) => Number(a.step) - Number(b.step));
}

// ─── Radius ───────────────────────────────────────────────────────────────────

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
    .filter((t) => !t.isMax) // show base steps only (skip -max variants)
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
    if (!step || isNaN(Number(step))) continue; // skip "95%/09" typo
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
