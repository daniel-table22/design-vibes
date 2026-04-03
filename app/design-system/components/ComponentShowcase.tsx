"use client";

import { useState } from "react";

export type ControlDef =
  | { type: "select"; label: string; key: string; options: string[] }
  | { type: "toggle"; label: string; key: string };

interface Props {
  name: string;
  controls: ControlDef[];
  defaultProps: Record<string, unknown>;
  render: (props: Record<string, unknown>) => React.ReactNode;
}

export default function ComponentShowcase({ name, controls, defaultProps, render }: Props) {
  const [props, setProps] = useState<Record<string, unknown>>(defaultProps);

  function setProp(key: string, value: unknown) {
    setProps((p) => ({ ...p, [key]: value }));
  }

  return (
    <div className="grid grid-cols-[180px_1fr_1fr] items-center gap-8 py-6 border-b border-gray-100 last:border-0">
      {/* Title */}
      <p className="text-sm font-medium text-gray-800">{name}</p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        {controls.map((ctrl) => (
          <div key={ctrl.key} className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{ctrl.label}</label>
            {ctrl.type === "select" && (
              <div className="flex gap-1">
                {ctrl.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setProp(ctrl.key, opt)}
                    className={[
                      "px-2 py-0.5 text-xs rounded border cursor-pointer transition-colors",
                      props[ctrl.key] === opt
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {ctrl.type === "toggle" && (
              <button
                onClick={() => setProp(ctrl.key, !props[ctrl.key])}
                className={[
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer",
                  props[ctrl.key] ? "bg-black" : "bg-gray-200",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform",
                    props[ctrl.key] ? "translate-x-[18px]" : "translate-x-0.5",
                  ].join(" ")}
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Component */}
      <div className="flex items-center justify-center">
        {render(props)}
      </div>
    </div>
  );
}
