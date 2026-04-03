"use client";

import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";

export type ControlDef =
  | { type: "select"; label: string; key: string; options: string[] }
  | { type: "toggle"; label: string; key: string };

interface Props {
  name: string;
  controls: ControlDef[];
  defaultProps: Record<string, unknown>;
  render: (props: Record<string, unknown>) => React.ReactNode;
  preview: (props: Record<string, unknown>) => React.ReactNode;
}

export default function ComponentShowcase({ name, controls, defaultProps, render, preview }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [props, setProps] = useState<Record<string, unknown>>(defaultProps);

  function setProp(key: string, value: unknown) {
    setProps((p) => ({ ...p, [key]: value }));
  }

  return (
    <Collapsible.Root open={expanded} onOpenChange={setExpanded}>
      {/* Row header — always visible */}
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <Collapsible.Trigger className="flex items-center gap-2 cursor-pointer group">
          <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors select-none w-3">
            {expanded ? "▼" : "▶"}
          </span>
          <span className="text-sm font-medium text-gray-800">{name}</span>
        </Collapsible.Trigger>

        {/* Compact preview in collapsed state */}
        {!expanded && (
          <div className="flex items-center">
            {preview(props)}
          </div>
        )}
      </div>

      {/* Expanded content */}
      <Collapsible.Content>
        <div className="py-6 flex flex-col gap-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-6 items-end">
            {controls.map((ctrl) => (
              <div key={ctrl.key} className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-medium">{ctrl.label}</label>
                {ctrl.type === "select" && (
                  <div className="flex gap-1">
                    {ctrl.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setProp(ctrl.key, opt)}
                        className={[
                          "px-2.5 py-1 text-xs rounded border cursor-pointer transition-colors",
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
                        props[ctrl.key] ? "translate-x-4.5" : "translate-x-0.5",
                      ].join(" ")}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Component preview */}
          <div className="flex items-center justify-center min-h-32 bg-gray-50 rounded-lg p-8 border border-gray-100">
            {render(props)}
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
