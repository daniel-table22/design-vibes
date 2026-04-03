"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as Collapsible from "@radix-ui/react-collapsible";
import type {
  ColorFamily,
  NamedColorToken,
  ThemeRadiusToken,
  SpaceToken,
  TypographyScale,
  FontInfo,
  SpacingToken,
  RadiusToken,
  ScalingRow,
  ResponsiveToken,
} from "@/lib/design-tokens";

interface Props {
  colorFamilies: ColorFamily[];
  variableColors: NamedColorToken[];
  semanticColorFamilies: ColorFamily[];
  panelTokens: NamedColorToken[];
  tokenColors: NamedColorToken[];
  themeRadiusTokens: ThemeRadiusToken[];
  tokenSpaceTokens: SpaceToken[];
  typographyScale: TypographyScale[];
  fontInfo: FontInfo;
  spacingTokens: SpacingToken[];
  radiusTokens: RadiusToken[];
  scalingTokens: ScalingRow[];
  responsiveSizes: ResponsiveToken[];
}

// ── Shared sub-components ────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function SwatchRow({ family, swatches }: ColorFamily) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-40 text-xs text-gray-500 shrink-0 truncate">{family}</span>
      <div className="flex gap-1">
        {swatches.map((s) => (
          <div key={s.name} className="group relative">
            <div className="w-7 h-7 rounded" style={{ background: s.value }} title={`${s.cssVar}: ${s.value}`} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap z-10 pointer-events-none">
              {s.name} · {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NamedColorRow({ token }: { token: NamedColorToken }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-7 h-7 rounded shrink-0 border border-gray-100"
        style={{ background: token.value ?? "transparent" }}
      />
      <div className="flex gap-2 items-baseline">
        <span className="text-sm">{token.label}</span>
        {token.aliasOf && (
          <span className="text-xs text-gray-400 font-mono truncate max-w-xs">{token.aliasOf}</span>
        )}
        {token.value && (
          <span className="text-xs text-gray-400 font-mono">{token.value}</span>
        )}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function FoundationsClient({
  colorFamilies,
  variableColors,
  semanticColorFamilies,
  panelTokens,
  tokenColors,
  themeRadiusTokens,
  tokenSpaceTokens,
  typographyScale,
  fontInfo,
  spacingTokens,
  radiusTokens,
  scalingTokens,
  responsiveSizes,
}: Props) {
  const primitiveColors = colorFamilies.filter((f) => !f.family.startsWith("Overlay"));
  const overlayColors   = colorFamilies.filter((f) => f.family.startsWith("Overlay"));

  const accentNeutral   = semanticColorFamilies.filter((f) =>
    ["Accent", "Accent Alpha", "Neutral", "Neutral Alpha"].includes(f.family)
  );
  const statusColors    = semanticColorFamilies.filter((f) =>
    ["Success", "Error", "Warning", "Info", "Success Alpha", "Error Alpha", "Warning Alpha", "Info Alpha"].includes(f.family)
  );

  const radiusByCategory = radiusTokens.reduce<Record<string, RadiusToken[]>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  return (
    <Tabs.Root defaultValue="foundations">
      <Tabs.List className="flex gap-6 border-b border-gray-200 mb-8">
        <Tabs.Trigger
          value="foundations"
          className="pb-3 text-sm font-medium text-gray-500 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black cursor-pointer"
        >
          Foundations
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="foundations" className="space-y-16">

        {/* 1. Color Palette (collapsed) */}
        <section>
          <Collapsible.Root defaultOpen={false}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold">Color Palette</h2>
                <p className="text-xs text-gray-400">Color scheme — primitive 12-step scales</p>
              </div>
              <Collapsible.Trigger className="text-xs text-gray-400 hover:text-black cursor-pointer select-none data-[state=open]:after:content-['Collapse_↑'] data-[state=closed]:after:content-['Expand_↓']" />
            </div>
            <Collapsible.Content>
              <div className="space-y-2">
                {primitiveColors.map((f) => <SwatchRow key={f.family} {...f} />)}
              </div>
              {overlayColors.length > 0 && (
                <>
                  <p className="text-xs text-gray-400 mt-6 mb-3">Overlays</p>
                  <div className="space-y-2">
                    {overlayColors.map((f) => <SwatchRow key={f.family} {...f} />)}
                  </div>
                </>
              )}
              {variableColors.length > 0 && (
                <>
                  <p className="text-xs text-gray-400 mt-6 mb-3">Variables (Effects &amp; Misc)</p>
                  <div className="space-y-2">
                    {variableColors.map((t) => <NamedColorRow key={t.name} token={t} />)}
                  </div>
                </>
              )}
            </Collapsible.Content>
          </Collapsible.Root>
        </section>

        {/* ── Semantic Colors ── */}
        <section>
          <SectionHeader title="Semantic Colors" subtitle="Theme — aliased scales and status colors" />
          {accentNeutral.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-3">Accent &amp; Neutral</p>
              <div className="space-y-2 mb-6">
                {accentNeutral.map((f) => <SwatchRow key={f.family} {...f} />)}
              </div>
            </>
          )}
          {statusColors.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-3">Status</p>
              <div className="space-y-2">
                {statusColors.map((f) => <SwatchRow key={f.family} {...f} />)}
              </div>
            </>
          )}
        </section>

        {/* ── Token Colors ── */}
        <section>
          <SectionHeader title="Token Colors" subtitle="Theme Tokens/Colors — semantic role tokens" />
          <div className="space-y-2">
            {tokenColors.map((t) => <NamedColorRow key={t.name} token={t} />)}
          </div>
        </section>

        {/* ── Panel Tokens ── */}
        <section>
          <SectionHeader title="Panel" subtitle="Theme — panel surface colors" />
          <div className="space-y-2">
            {panelTokens.map((t) => <NamedColorRow key={t.name} token={t} />)}
          </div>
        </section>

        {/* ── Typography ── */}
        <section>
          <SectionHeader title="Typography" subtitle="Theme — font families, weights, and type scale" />
          <div className="flex gap-8 text-sm mb-6">
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Families</p>
              {Object.entries(fontInfo.families).map(([k, v]) => (
                <p key={k} className="mb-0.5"><span className="text-gray-500">{k}:</span> {v}</p>
              ))}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Weights</p>
              {Object.entries(fontInfo.weights).map(([k, v]) => (
                <p key={k} className="mb-0.5"><span className="text-gray-500">{k}:</span> {v}</p>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 pr-6 font-medium">Step</th>
                  <th className="pb-2 pr-6 font-medium">Size</th>
                  <th className="pb-2 pr-6 font-medium">Line Height</th>
                  <th className="pb-2 pr-6 font-medium">Letter Spacing</th>
                  <th className="pb-2 font-medium">Sample</th>
                </tr>
              </thead>
              <tbody>
                {typographyScale.map((row) => (
                  <tr key={row.step} className="border-b border-gray-50">
                    <td className="py-3 pr-6 text-gray-400">{row.step}</td>
                    <td className="py-3 pr-6 font-mono text-xs">{row.fontSize}</td>
                    <td className="py-3 pr-6 font-mono text-xs">{row.lineHeight}</td>
                    <td className="py-3 pr-6 font-mono text-xs">{row.letterSpacing}</td>
                    <td className="py-3">
                      <span style={{ fontSize: row.fontSize, lineHeight: row.lineHeight, letterSpacing: row.letterSpacing }}>
                        The quick brown fox
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Spacing ── */}
        <section>
          <SectionHeader title="Spacing" subtitle="Theme — 9-step spacing scale" />
          <div className="space-y-3">
            {spacingTokens.map((t) => (
              <div key={t.step} className="flex items-center gap-4">
                <span className="w-6 text-xs text-gray-400">{t.step}</span>
                <div className="h-4 bg-black rounded-sm shrink-0" style={{ width: t.px }} />
                <span className="font-mono text-xs text-gray-500">{t.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Theme Radius ── */}
        <section>
          <SectionHeader title="Theme Radius" subtitle="Theme — active radius tokens (aliased to Radius collection)" />
          <div className="flex flex-wrap gap-4">
            {themeRadiusTokens.map((t) => (
              <div key={t.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 bg-gray-100 border border-gray-200"
                  style={{ borderRadius: t.px >= 9999 ? "50%" : `${t.px}px` }}
                />
                <div className="text-center">
                  <p className="text-[10px] text-gray-500">{t.name}</p>
                  <p className="font-mono text-[10px] text-gray-400">{t.value}</p>
                  {t.aliasOf && <p className="text-[9px] text-gray-300 truncate max-w-[80px]">{t.aliasOf}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Radius Collection ── */}
        <section>
          <SectionHeader title="Radius" subtitle="Radius collection — full scale by category" />
          <div className="space-y-6">
            {Object.entries(radiusByCategory).map(([category, tokens]) => (
              <div key={category}>
                <p className="text-xs text-gray-400 mb-3">{category}</p>
                <div className="flex flex-wrap gap-4">
                  {tokens.map((t) => (
                    <div key={`${t.category}-${t.step}`} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 border border-gray-200" style={{ borderRadius: t.value }} />
                      <div className="text-center">
                        <p className="text-[10px] text-gray-500">{t.step}</p>
                        <p className="font-mono text-[10px] text-gray-400">{t.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Token Space ── */}
        <section>
          <SectionHeader title="Token Space" subtitle="Theme Tokens/Space — component-level space tokens" />
          <table className="text-sm border-collapse w-full max-w-lg">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-6 font-medium">Token</th>
                <th className="pb-2 pr-6 font-medium">Alias</th>
                <th className="pb-2 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {tokenSpaceTokens.map((t) => (
                <tr key={t.name} className="border-b border-gray-50">
                  <td className="py-2 pr-6 font-mono text-xs">{t.label}</td>
                  <td className="py-2 pr-6 text-xs text-gray-400">{t.aliasOf ?? "—"}</td>
                  <td className="py-2 font-mono text-xs">{t.px !== null ? `${t.px}px` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Scaling ── */}
        <section>
          <SectionHeader title="Scaling" subtitle="Scaling collection — responsive multipliers" />
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 pr-8 font-medium">Scale</th>
                  {scalingTokens[0]?.values.map((v) => (
                    <th key={v.step} className="pb-2 pr-4 font-medium">{v.step}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scalingTokens.map((row) => (
                  <tr key={row.scale} className="border-b border-gray-50">
                    <td className="py-2 pr-8 font-medium">{row.scale}</td>
                    {row.values.map((v) => (
                      <td key={v.step} className="py-2 pr-4 font-mono text-xs text-gray-600">{v.value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Responsive Sizes ── */}
        <section>
          <SectionHeader title="Responsive Sizes" subtitle="Responsive sizes (custom) — Desktop &amp; Mobile" />
          <table className="text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-8 font-medium">Token</th>
                <th className="pb-2 pr-8 font-medium">Desktop</th>
                <th className="pb-2 font-medium">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {responsiveSizes.map((t) => (
                <tr key={t.name} className="border-b border-gray-50">
                  <td className="py-2 pr-8 font-mono text-xs">{t.name}</td>
                  <td className="py-2 pr-8 font-mono text-xs">{t.desktop}</td>
                  <td className="py-2 font-mono text-xs">{t.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </Tabs.Content>
    </Tabs.Root>
  );
}
