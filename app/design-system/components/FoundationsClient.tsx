"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type {
  ColorFamily,
  TypographyScale,
  FontInfo,
  SpacingToken,
  RadiusToken,
  ScalingRow,
} from "@/lib/design-tokens";

interface Props {
  colorFamilies: ColorFamily[];
  semanticColorFamilies: ColorFamily[];
  typographyScale: TypographyScale[];
  fontInfo: FontInfo;
  spacingTokens: SpacingToken[];
  radiusTokens: RadiusToken[];
  scalingTokens: ScalingRow[];
}

function ColorSwatchRow({ family, swatches }: ColorFamily) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-40 text-xs text-gray-500 shrink-0 truncate">{family}</span>
      <div className="flex gap-1">
        {swatches.map((s) => (
          <div key={s.name} className="group relative">
            <div
              className="w-7 h-7 rounded"
              style={{ background: s.value }}
              title={`${s.cssVar}: ${s.value}`}
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap z-10 pointer-events-none">
              {s.name} · {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FoundationsClient({
  colorFamilies,
  semanticColorFamilies,
  typographyScale,
  fontInfo,
  spacingTokens,
  radiusTokens,
  scalingTokens,
}: Props) {
  // Group semantic families into sections
  const primitiveSection = colorFamilies.filter((f) => !f.family.startsWith("Overlay"));
  const overlaySection = colorFamilies.filter((f) => f.family.startsWith("Overlay"));
  const accentNeutral = semanticColorFamilies.filter((f) =>
    f.family === "Accent" || f.family === "Accent Alpha" || f.family === "Neutral" || f.family === "Neutral Alpha"
  );
  const semanticSection = semanticColorFamilies.filter((f) =>
    ["Success", "Error", "Warning", "Info", "Success Alpha", "Error Alpha", "Warning Alpha", "Info Alpha"].includes(f.family)
  );

  // Group radius by category
  const radiusByCategory = radiusTokens.reduce<Record<string, RadiusToken[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
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

        {/* ── Primitive Colors ── */}
        <section>
          <h2 className="text-lg font-semibold mb-1">Color Palette</h2>
          <p className="text-xs text-gray-400 mb-5">Color scheme — primitive 12-step scales</p>
          <div className="space-y-2">
            {primitiveSection.map((f) => <ColorSwatchRow key={f.family} {...f} />)}
          </div>

          {overlaySection.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mt-6 mb-3">Overlays</p>
              <div className="space-y-2">
                {overlaySection.map((f) => <ColorSwatchRow key={f.family} {...f} />)}
              </div>
            </>
          )}
        </section>

        {/* ── Semantic Colors ── */}
        <section>
          <h2 className="text-lg font-semibold mb-1">Semantic Colors</h2>
          <p className="text-xs text-gray-400 mb-5">Theme — aliased scales</p>

          {accentNeutral.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-3">Accent &amp; Neutral</p>
              <div className="space-y-2 mb-6">
                {accentNeutral.map((f) => <ColorSwatchRow key={f.family} {...f} />)}
              </div>
            </>
          )}

          {semanticSection.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-3">Status</p>
              <div className="space-y-2">
                {semanticSection.map((f) => <ColorSwatchRow key={f.family} {...f} />)}
              </div>
            </>
          )}
        </section>

        {/* ── Typography ── */}
        <section>
          <h2 className="text-lg font-semibold mb-1">Typography</h2>
          <p className="text-xs text-gray-400 mb-5">Theme — font sizes, line heights, letter spacing</p>

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
          <h2 className="text-lg font-semibold mb-1">Spacing</h2>
          <p className="text-xs text-gray-400 mb-5">Theme — 9-step spacing scale</p>
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

        {/* ── Radius ── */}
        <section>
          <h2 className="text-lg font-semibold mb-1">Radius</h2>
          <p className="text-xs text-gray-400 mb-5">Radius collection — grouped by size category</p>
          <div className="space-y-6">
            {Object.entries(radiusByCategory).map(([category, tokens]) => (
              <div key={category}>
                <p className="text-xs text-gray-400 mb-3">{category}</p>
                <div className="flex flex-wrap gap-4">
                  {tokens.map((t) => (
                    <div key={`${t.category}-${t.step}`} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 bg-gray-100 border border-gray-200"
                        style={{ borderRadius: t.value }}
                      />
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

        {/* ── Scaling ── */}
        <section>
          <h2 className="text-lg font-semibold mb-1">Scaling</h2>
          <p className="text-xs text-gray-400 mb-5">Scaling collection — responsive multipliers</p>
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

      </Tabs.Content>
    </Tabs.Root>
  );
}
