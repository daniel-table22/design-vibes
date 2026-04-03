"use client";

import { useState } from "react";
import FoundationsContent, { type FoundationsProps } from "./FoundationsContent";
import CoreRadixLayout from "./CoreRadixLayout";
import CoreRadixTypography from "./CoreRadixTypography";
import CoreRadixTab from "./CoreRadixTab";
import CustomOrganismsContent from "./CustomOrganismsContent";

type Section =
  | "foundations"
  | "core-radix/layout"
  | "core-radix/typography"
  | "core-radix/components"
  | "custom/atoms"
  | "custom/molecules"
  | "custom/organisms";

const nav: { label: string; section?: Section; children?: { label: string; section: Section }[] }[] = [
  { label: "Foundations", section: "foundations" },
  {
    label: "Core Radix",
    children: [
      { label: "Layout", section: "core-radix/layout" },
      { label: "Typography", section: "core-radix/typography" },
      { label: "Components", section: "core-radix/components" },
    ],
  },
  {
    label: "Custom",
    children: [
      { label: "Atoms", section: "custom/atoms" },
      { label: "Molecules", section: "custom/molecules" },
      { label: "Organisms", section: "custom/organisms" },
    ],
  },
];

function EmptySection({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <p className="text-xs text-gray-300 mt-1">{description}</p>
    </div>
  );
}

export default function DesignSystemShell(props: FoundationsProps) {
  const [active, setActive] = useState<Section>("foundations");

  return (
    <div className="flex gap-12 min-h-screen">
      {/* Left nav */}
      <nav className="w-44 shrink-0 pt-1">
        {nav.map((group) => (
          <div key={group.label} className="mb-5">
            {group.section ? (
              <button
                onClick={() => setActive(group.section!)}
                className={[
                  "w-full text-left text-sm py-1 cursor-pointer transition-colors",
                  active === group.section ? "text-black font-medium" : "text-gray-400 hover:text-gray-700",
                ].join(" ")}
              >
                {group.label}
              </button>
            ) : (
              <p className="text-xs font-medium text-gray-300 uppercase tracking-wide mb-1">{group.label}</p>
            )}
            {group.children && (
              <div className="flex flex-col">
                {group.children.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => setActive(item.section)}
                    className={[
                      "text-left text-sm py-1 pl-3 cursor-pointer transition-colors",
                      active === item.section ? "text-black font-medium" : "text-gray-400 hover:text-gray-700",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 min-w-0">
        {active === "foundations" && <FoundationsContent {...props} />}
        {active === "core-radix/layout" && <CoreRadixLayout />}
        {active === "core-radix/typography" && <CoreRadixTypography />}
        {active === "core-radix/components" && <CoreRadixTab />}
        {active === "custom/atoms" && <EmptySection title="Atoms" description="Custom atomic components will appear here." />}
        {active === "custom/molecules" && <EmptySection title="Molecules" description="Custom molecule components will appear here." />}
        {active === "custom/organisms" && <CustomOrganismsContent />}
      </main>
    </div>
  );
}
