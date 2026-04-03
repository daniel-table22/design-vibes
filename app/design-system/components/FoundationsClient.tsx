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
  typographyScale: TypographyScale[];
  fontInfo: FontInfo;
  spacingTokens: SpacingToken[];
  radiusTokens: RadiusToken[];
  scalingTokens: ScalingRow[];
}

export default function FoundationsClient({
  colorFamilies,
  typographyScale,
  fontInfo,
  spacingTokens,
  radiusTokens,
  scalingTokens,
}: Props) {
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

        {/* Colors */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Colors</h2>
          <div className="space-y-3">
            {colorFamilies.map(({ family, swatches }) => (
              <div key={family} className="flex items-center gap-2">
                <span className="w-32 text-xs text-gray-500 shrink-0">{family}</span>
                <div className="flex gap-1">
                  {swatches.map((s) => (
                    <div key={s.name} className="group relative">
                      <div
                        className="w-8 h-8 rounded"
                        style={{ background: s.value }}
                        title={`${s.cssVar}: ${s.value}`}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap z-10">
                        {s.name} · {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Typography</h2>

          <div className="mb-6 flex gap-8 text-sm">
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Families</p>
              {Object.entries(fontInfo.families).map(([k, v]) => (
                <p key={k}><span className="text-gray-500">{k}:</span> {v}</p>
              ))}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Weights</p>
              {Object.entries(fontInfo.weights).map(([k, v]) => (
                <p key={k}><span className="text-gray-500">{k}:</span> {v}</p>
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
                      <span
                        style={{
                          fontSize: row.fontSize,
                          lineHeight: row.lineHeight,
                          letterSpacing: row.letterSpacing,
                        }}
                      >
                        The quick brown fox
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Spacing</h2>
          <div className="space-y-3">
            {spacingTokens.map((t) => (
              <div key={t.step} className="flex items-center gap-4">
                <span className="w-6 text-xs text-gray-400">{t.step}</span>
                <div
                  className="h-4 bg-black rounded-sm shrink-0"
                  style={{ width: t.px }}
                />
                <span className="font-mono text-xs text-gray-500">{t.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Radius</h2>
          <div className="flex flex-wrap gap-4">
            {radiusTokens.map((t) => (
              <div key={`${t.category}-${t.step}`} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 bg-gray-100 border border-gray-200"
                  style={{ borderRadius: t.value }}
                />
                <div className="text-center">
                  <p className="text-[10px] text-gray-500">{t.category}/{t.step}</p>
                  <p className="font-mono text-[10px] text-gray-400">{t.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scaling */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Scaling</h2>
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
                      <td key={v.step} className="py-2 pr-4 font-mono text-xs text-gray-600">
                        {v.value}
                      </td>
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
