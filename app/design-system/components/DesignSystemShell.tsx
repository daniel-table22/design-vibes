"use client";

import { useState } from "react";
import FoundationsContent, { type FoundationsProps } from "./FoundationsContent";
import CoreRadixLayout from "./CoreRadixLayout";
import CoreRadixTypography from "./CoreRadixTypography";
import CoreRadixTab from "./CoreRadixTab";
import CustomOrganismsContent from "./CustomOrganismsContent";
import MemberPortalHome from "../templates/member-portal/MemberPortalHome";

// ── Section type ─────────────────────────────────────────────────────────────

type Section =
  | "foundations"
  | "core-radix/layout"
  | "core-radix/typography"
  | "core-radix/components"
  | "custom/atoms"
  | "custom/molecules"
  | "custom/organisms"
  | "templates/partner/template"
  | "templates/storefront/template"
  | "templates/member-portal/template";

// ── Nav definition (3 levels) ─────────────────────────────────────────────────

type NavLeaf = { label: string; section: Section };
type NavGroup = { label: string; children: NavLeaf[] };
type NavCategory = { label: string; section?: Section; groups?: NavGroup[]; children?: NavLeaf[] };

const nav: NavCategory[] = [
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
  {
    label: "Templates",
    groups: [
      {
        label: "Partner",
        children: [
          { label: "Template", section: "templates/partner/template" },
        ],
      },
      {
        label: "Storefront",
        children: [
          { label: "Template", section: "templates/storefront/template" },
        ],
      },
      {
        label: "Member Portal",
        children: [
          { label: "Template", section: "templates/member-portal/template" },
        ],
      },
    ],
  },
];

// ── Empty placeholder ─────────────────────────────────────────────────────────

function EmptySection({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-sm font-medium" style={{ color: "var(--neutral-9)" }}>{title}</p>
      {description && <p className="text-xs mt-1" style={{ color: "var(--neutral-8)" }}>{description}</p>}
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function DesignSystemShell(props: FoundationsProps) {
  const [active, setActive] = useState<Section>("foundations");

  function navItem(label: string, section: Section, depth: number) {
    const isActive = active === section;
    return (
      <button
        key={section}
        onClick={() => setActive(section)}
        style={{
          paddingLeft: `${depth * 12 + 8}px`,
          paddingRight: "8px",
          color: isActive ? "var(--neutral-12)" : "var(--neutral-9)",
          background: isActive ? "var(--neutral-alpha-3)" : "transparent",
        }}
        className={[
          "w-full text-left text-sm py-1 rounded cursor-pointer transition-colors",
          isActive ? "font-medium" : "hover:bg-[var(--neutral-alpha-2)]",
        ].join(" ")}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="flex gap-12 min-h-screen">
      {/* Left nav */}
      <nav className="w-48 shrink-0 pt-1 flex flex-col gap-4">
        {nav.map((category) => (
          <div key={category.label}>
            {/* Top-level: either a clickable leaf or a group header */}
            {category.section ? (
              navItem(category.label, category.section, 0)
            ) : (
              <p
                className="text-xs font-medium uppercase tracking-wide mb-1 px-2"
                style={{ color: "var(--neutral-8)" }}
              >
                {category.label}
              </p>
            )}

            {/* 2-level children (Core Radix, Custom) */}
            {category.children?.map((item) => navItem(item.label, item.section, 1))}

            {/* 3-level groups (Templates) */}
            {category.groups?.map((group) => (
              <div key={group.label} className="mt-1">
                <p className="text-xs font-medium pl-3 mb-0.5" style={{ color: "var(--neutral-9)" }}>{group.label}</p>
                {group.children.map((item) => navItem(item.label, item.section, 2))}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 min-w-0">
        {active === "foundations"              && <FoundationsContent {...props} />}
        {active === "core-radix/layout"        && <CoreRadixLayout />}
        {active === "core-radix/typography"    && <CoreRadixTypography />}
        {active === "core-radix/components"    && <CoreRadixTab />}
        {active === "custom/atoms"             && <EmptySection title="Atoms" description="Custom atomic components will appear here." />}
        {active === "custom/molecules"         && <EmptySection title="Molecules" description="Custom molecule components will appear here." />}
        {active === "custom/organisms"         && <CustomOrganismsContent />}
        {active === "templates/partner/template"       && <EmptySection title="Partner — Template" />}
        {active === "templates/storefront/template"    && <EmptySection title="Storefront — Template" />}
        {active === "templates/member-portal/template" && <MemberPortalHome />}
      </main>
    </div>
  );
}
