"use client";

import { useState } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import ComponentShowcase from "./ComponentShowcase";

// ── Alert Dialog ─────────────────────────────────────────────────────────────

type ADSize = "1" | "2" | "3" | "4";

const adSize = {
  "1": {
    dialog: "rounded-[var(--radius-medium-4)] py-[var(--spacing-3)] gap-[var(--spacing-3)]",
    pad: "px-[var(--spacing-3)]",
    title: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)] font-bold",
    desc: "text-[length:var(--font-size-1)] leading-[var(--line-height-1)]",
    btn: "h-6 px-[var(--spacing-2)] rounded-[var(--radius-medium-1)] text-[length:var(--font-size-1)]",
    w: "max-w-[300px]",
  },
  "2": {
    dialog: "rounded-[var(--radius-medium-4)] py-[var(--spacing-4)] gap-[var(--spacing-4)]",
    pad: "px-[var(--spacing-4)]",
    title: "text-[length:var(--font-size-5)] leading-[var(--line-height-5)] font-bold",
    desc: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    btn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-medium-2)] text-[length:var(--font-size-2)]",
    w: "max-w-[432px]",
  },
  "3": {
    dialog: "rounded-[var(--radius-medium-5)] py-[var(--spacing-5)] gap-[var(--spacing-4)]",
    pad: "px-[var(--spacing-5)]",
    title: "text-[length:var(--font-size-5)] leading-[var(--line-height-5)] font-bold",
    desc: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    btn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-medium-2)] text-[length:var(--font-size-2)]",
    w: "max-w-[432px]",
  },
  "4": {
    dialog: "rounded-[var(--radius-medium-5)] py-[var(--spacing-6)] gap-[var(--spacing-5)]",
    pad: "px-[var(--spacing-6)]",
    title: "text-[length:var(--font-size-6)] leading-[var(--line-height-6)] font-bold",
    desc: "text-[length:var(--font-size-3)] leading-[var(--line-height-3)]",
    btn: "h-10 px-[var(--spacing-4)] rounded-[var(--radius-medium-3)] text-[length:var(--font-size-3)]",
    w: "max-w-[480px]",
  },
} satisfies Record<ADSize, object>;

function AlertDialogPreview({ sz, showDesc }: { sz: ADSize; showDesc: boolean }) {
  const s = adSize[sz];
  return (
    <div
      className={[
        "w-full flex flex-col bg-[var(--neutral-1)] border border-black/[0.06]",
        "shadow-[0_16px_36px_-20px_rgba(0,6,46,0.2),0_16px_64px_rgba(0,0,85,0.02),0_12px_60px_rgba(0,0,0,0.15)]",
        s.dialog, s.w,
      ].join(" ")}
    >
      <div className={`flex flex-col gap-[var(--spacing-1)] ${s.pad}`}>
        <p className={`text-[var(--neutral-12)] ${s.title}`}>Are you absolutely sure?</p>
        {showDesc && (
          <p className={`text-[var(--neutral-8)] ${s.desc}`}>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </p>
        )}
      </div>
      <div className={`flex items-center justify-end gap-[var(--spacing-2)] ${s.pad}`}>
        <button className={`font-medium bg-[var(--neutral-alpha-3)] text-[var(--neutral-9)] cursor-pointer hover:bg-[var(--neutral-alpha-4)] transition-colors ${s.btn}`}>
          Cancel
        </button>
        <button className={`font-medium bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors ${s.btn}`}>
          Delete account
        </button>
      </div>
    </div>
  );
}

function AlertDialogShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentShowcase
      name="Alert Dialog"
      defaultProps={{ size: "3", showDescription: true }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4"] },
        { type: "toggle", label: "Description", key: "showDescription" },
      ]}
      render={(props) => (
        <div className="flex flex-col items-center gap-6 w-full">
          <AlertDialogPreview sz={props.size as ADSize} showDesc={props.showDescription as boolean} />
          <div className="flex items-center gap-3">
            <AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
              <AlertDialogPrimitive.Trigger asChild>
                <button className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded hover:bg-[var(--neutral-11)] transition-colors cursor-pointer">
                  Open live dialog
                </button>
              </AlertDialogPrimitive.Trigger>
              <AlertDialogPrimitive.Portal>
                <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/30 z-50" />
                <AlertDialogPrimitive.Content
                  className={[
                    "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)]",
                    "flex flex-col bg-[var(--neutral-1)] border border-black/[0.06]",
                    "shadow-[0_16px_36px_-20px_rgba(0,6,46,0.2),0_16px_64px_rgba(0,0,85,0.02),0_12px_60px_rgba(0,0,0,0.15)]",
                    "focus:outline-none",
                    adSize[props.size as ADSize].dialog,
                    adSize[props.size as ADSize].w,
                  ].join(" ")}
                >
                  <div className={`flex flex-col gap-[var(--spacing-1)] ${adSize[props.size as ADSize].pad}`}>
                    <AlertDialogPrimitive.Title className={`text-[var(--neutral-12)] ${adSize[props.size as ADSize].title}`}>
                      Are you absolutely sure?
                    </AlertDialogPrimitive.Title>
                    {(props.showDescription as boolean) && (
                      <AlertDialogPrimitive.Description className={`text-[var(--neutral-8)] ${adSize[props.size as ADSize].desc}`}>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </AlertDialogPrimitive.Description>
                    )}
                  </div>
                  <div className={`flex items-center justify-end gap-[var(--spacing-2)] ${adSize[props.size as ADSize].pad}`}>
                    <AlertDialogPrimitive.Cancel className={`font-medium bg-[var(--neutral-alpha-3)] text-[var(--neutral-9)] cursor-pointer hover:bg-[var(--neutral-alpha-4)] transition-colors ${adSize[props.size as ADSize].btn}`}>
                      Cancel
                    </AlertDialogPrimitive.Cancel>
                    <AlertDialogPrimitive.Action className={`font-medium bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors ${adSize[props.size as ADSize].btn}`}>
                      Delete account
                    </AlertDialogPrimitive.Action>
                  </div>
                </AlertDialogPrimitive.Content>
              </AlertDialogPrimitive.Portal>
            </AlertDialogPrimitive.Root>
          </div>
        </div>
      )}
    />
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

const avatarSizes: Record<string, string> = {
  "1": "w-5 h-5 text-[10px]",
  "2": "w-6 h-6 text-[11px]",
  "3": "w-8 h-8 text-[13px]",
  "4": "w-10 h-10 text-[15px]",
  "5": "w-12 h-12 text-[17px]",
  "6": "w-16 h-16 text-[20px]",
};

function AvatarShowcase() {
  return (
    <ComponentShowcase
      name="Avatar"
      defaultProps={{ size: "4", variant: "fallback" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4", "5", "6"] },
        { type: "select", label: "Variant", key: "variant", options: ["fallback", "image"] },
      ]}
      render={(props) => {
        const sz = avatarSizes[props.size as string] ?? avatarSizes["4"];
        return (
          <AvatarPrimitive.Root
            className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--accent-3)] select-none ${sz}`}
          >
            {props.variant === "image" && (
              <AvatarPrimitive.Image
                src="https://i.pravatar.cc/150?img=3"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            )}
            <AvatarPrimitive.Fallback
              className="flex items-center justify-center w-full h-full font-medium text-[var(--accent-11)]"
              delayMs={props.variant === "image" ? 600 : 0}
            >
              AB
            </AvatarPrimitive.Fallback>
          </AvatarPrimitive.Root>
        );
      }}
    />
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────

const badgeSizeClasses: Record<string, string> = {
  "1": "px-[var(--spacing-1)] py-[1px] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "px-[var(--spacing-2)] py-[2px] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "px-[var(--spacing-3)] py-[4px] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
};
const badgeVariantClasses: Record<string, string> = {
  solid: "bg-[var(--accent-9)] text-white",
  soft: "bg-[var(--accent-3)] text-[var(--accent-11)]",
  outline: "border border-[var(--accent-7)] text-[var(--accent-11)] bg-transparent",
  surface: "bg-[var(--accent-2)] border border-[var(--accent-6)] text-[var(--accent-11)]",
};

function BadgeShowcase() {
  return (
    <ComponentShowcase
      name="Badge"
      defaultProps={{ size: "2", variant: "solid" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["solid", "soft", "outline", "surface"] },
      ]}
      render={(props) => (
        <span
          className={`inline-flex items-center font-medium ${badgeSizeClasses[props.size as string] ?? badgeSizeClasses["2"]} ${badgeVariantClasses[props.variant as string] ?? badgeVariantClasses["solid"]}`}
        >
          In Progress
        </span>
      )}
    />
  );
}

// ── Button ────────────────────────────────────────────────────────────────────

const btnSizeClasses: Record<string, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
  "4": "h-12 px-[var(--spacing-5)] text-[length:var(--font-size-4)] rounded-[var(--radius-medium-4)]",
};
const btnVariantClasses: Record<string, string> = {
  solid: "bg-[var(--accent-9)] text-white hover:bg-[var(--accent-10)]",
  soft: "bg-[var(--accent-3)] text-[var(--accent-11)] hover:bg-[var(--accent-4)]",
  outline: "border border-[var(--accent-7)] text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
  surface: "bg-[var(--accent-2)] border border-[var(--accent-6)] text-[var(--accent-11)] hover:bg-[var(--accent-3)]",
  ghost: "text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-11)] shadow-sm hover:bg-[var(--neutral-1)]",
};

function ButtonShowcase() {
  return (
    <ComponentShowcase
      name="Button"
      defaultProps={{ size: "2", variant: "solid", disabled: false }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4"] },
        { type: "select", label: "Variant", key: "variant", options: ["solid", "soft", "outline", "surface", "ghost", "classic"] },
        { type: "toggle", label: "Disabled", key: "disabled" },
      ]}
      render={(props) => (
        <button
          disabled={props.disabled as boolean}
          className={`inline-flex items-center justify-center font-medium cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${btnSizeClasses[props.size as string] ?? btnSizeClasses["2"]} ${btnVariantClasses[props.variant as string] ?? btnVariantClasses["solid"]}`}
        >
          Click me
        </button>
      )}
    />
  );
}

// ── Callout ───────────────────────────────────────────────────────────────────

const calloutSizeClasses: Record<string, string> = {
  "1": "p-[var(--spacing-3)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-3)] gap-[var(--spacing-2)]",
  "2": "p-[var(--spacing-4)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-4)] gap-[var(--spacing-3)]",
  "3": "p-[var(--spacing-5)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-5)] gap-[var(--spacing-3)]",
};
const calloutVariantClasses: Record<string, string> = {
  soft: "bg-[var(--color-blue-3)] text-[var(--color-blue-11)]",
  surface: "bg-[var(--color-blue-2)] border border-[var(--color-blue-6)] text-[var(--color-blue-11)]",
  outline: "border border-[var(--color-blue-7)] text-[var(--color-blue-11)] bg-transparent",
};

function CalloutShowcase() {
  return (
    <ComponentShowcase
      name="Callout"
      defaultProps={{ size: "2", variant: "soft" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["soft", "surface", "outline"] },
      ]}
      render={(props) => (
        <div
          className={`flex items-start ${calloutSizeClasses[props.size as string] ?? calloutSizeClasses["2"]} ${calloutVariantClasses[props.variant as string] ?? calloutVariantClasses["soft"]} max-w-sm`}
        >
          <span className="text-base leading-none mt-0.5">ℹ️</span>
          <p className="leading-[var(--line-height-2)]">You will need admin privileges to install and access this application.</p>
        </div>
      )}
    />
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

const cardSizeClasses: Record<string, string> = {
  "1": "p-[var(--spacing-3)] rounded-[var(--radius-medium-3)]",
  "2": "p-[var(--spacing-4)] rounded-[var(--radius-medium-4)]",
  "3": "p-[var(--spacing-5)] rounded-[var(--radius-medium-5)]",
};
const cardVariantClasses: Record<string, string> = {
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] shadow-sm",
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] shadow-[0_2px_4px_rgba(0,0,0,0.08)]",
  ghost: "bg-transparent",
};

function CardShowcase() {
  return (
    <ComponentShowcase
      name="Card"
      defaultProps={{ size: "2", variant: "surface" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["surface", "classic", "ghost"] },
      ]}
      render={(props) => (
        <div className={`w-48 ${cardSizeClasses[props.size as string] ?? cardSizeClasses["2"]} ${cardVariantClasses[props.variant as string] ?? cardVariantClasses["surface"]}`}>
          <p className="text-[length:var(--font-size-3)] font-semibold text-[var(--neutral-12)] mb-1">Card Title</p>
          <p className="text-[length:var(--font-size-1)] text-[var(--neutral-8)]">Some placeholder content inside the card component.</p>
        </div>
      )}
    />
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

const checkboxSizeClasses: Record<string, string> = {
  "1": "w-3.5 h-3.5 rounded-[var(--radius-medium-1)]",
  "2": "w-4 h-4 rounded-[var(--radius-medium-2)]",
  "3": "w-5 h-5 rounded-[var(--radius-medium-3)]",
};
const checkboxVariantClasses: Record<string, string> = {
  classic: "border-2 border-[var(--neutral-5)] data-[state=checked]:bg-[var(--accent-9)] data-[state=checked]:border-[var(--accent-9)]",
  surface: "border border-[var(--neutral-4)] bg-[var(--neutral-1)] data-[state=checked]:bg-[var(--accent-9)] data-[state=checked]:border-[var(--accent-9)]",
};

function CheckboxShowcase() {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <ComponentShowcase
      name="Checkbox"
      defaultProps={{ size: "2", variant: "classic" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["classic", "surface"] },
        { type: "toggle", label: "Checked", key: "checked" },
      ]}
      render={(props) => (
        <div className="flex items-center gap-[var(--spacing-2)]">
          <CheckboxPrimitive.Root
            checked={props.checked as boolean}
            onCheckedChange={(v) => setChecked(v === true)}
            className={`flex items-center justify-center cursor-pointer transition-colors focus:outline-none ${checkboxSizeClasses[props.size as string] ?? checkboxSizeClasses["2"]} ${checkboxVariantClasses[props.variant as string] ?? checkboxVariantClasses["classic"]}`}
          >
            <CheckboxPrimitive.Indicator>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <label className="text-[length:var(--font-size-2)] text-[var(--neutral-10)] cursor-pointer select-none">
            Accept terms
          </label>
        </div>
      )}
    />
  );
}

// ── Context Menu ──────────────────────────────────────────────────────────────

function ContextMenuShowcase() {
  return (
    <ComponentShowcase
      name="Context Menu"
      defaultProps={{ showIcons: true }}
      controls={[
        { type: "toggle", label: "Show icons", key: "showIcons" },
      ]}
      render={(props) => (
        <ContextMenuPrimitive.Root>
          <ContextMenuPrimitive.Trigger asChild>
            <div className="flex items-center justify-center w-48 h-16 border-2 border-dashed border-[var(--neutral-4)] rounded-[var(--radius-medium-3)] text-[length:var(--font-size-1)] text-[var(--neutral-5)] cursor-context-menu select-none">
              Right-click here
            </div>
          </ContextMenuPrimitive.Trigger>
          <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content className="min-w-[140px] bg-[var(--neutral-1)] rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] shadow-lg p-1 z-50">
              {["Edit", "Duplicate", "Delete"].map((item, i) => (
                <ContextMenuPrimitive.Item
                  key={item}
                  className={`flex items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] rounded cursor-pointer outline-none hover:bg-[var(--neutral-2)] ${i === 2 ? "text-red-600 hover:text-red-700" : "text-[var(--neutral-10)]"}`}
                >
                  {(props.showIcons as boolean) && <span>{i === 0 ? "✏️" : i === 1 ? "📋" : "🗑️"}</span>}
                  {item}
                </ContextMenuPrimitive.Item>
              ))}
            </ContextMenuPrimitive.Content>
          </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Root>
      )}
    />
  );
}

// ── Data List ─────────────────────────────────────────────────────────────────

function DataListShowcase() {
  return (
    <ComponentShowcase
      name="Data List"
      defaultProps={{ orientation: "horizontal" }}
      controls={[
        { type: "select", label: "Orientation", key: "orientation", options: ["horizontal", "vertical"] },
      ]}
      render={(props) => {
        const isHoriz = props.orientation === "horizontal";
        const items = [
          { label: "Status", value: "Active" },
          { label: "Role", value: "Admin" },
          { label: "Joined", value: "Jan 2024" },
        ];
        return (
          <dl className={`${isHoriz ? "flex flex-col gap-[var(--spacing-2)]" : "flex flex-col gap-[var(--spacing-2)]"}`}>
            {items.map(({ label, value }) => (
              <div key={label} className={`${isHoriz ? "flex items-center gap-[var(--spacing-4)]" : "flex flex-col gap-[1px]"}`}>
                <dt className="text-[length:var(--font-size-1)] font-medium text-[var(--neutral-8)] uppercase tracking-wide min-w-[64px]">{label}</dt>
                <dd className="text-[length:var(--font-size-2)] text-[var(--neutral-12)]">{value}</dd>
              </div>
            ))}
          </dl>
        );
      }}
    />
  );
}

// ── Dialog ────────────────────────────────────────────────────────────────────

const dialogSizeClasses: Record<string, string> = {
  "1": "max-w-[300px] p-[var(--spacing-3)] rounded-[var(--radius-medium-4)]",
  "2": "max-w-[432px] p-[var(--spacing-4)] rounded-[var(--radius-medium-4)]",
  "3": "max-w-[544px] p-[var(--spacing-5)] rounded-[var(--radius-medium-5)]",
  "4": "max-w-[640px] p-[var(--spacing-6)] rounded-[var(--radius-medium-5)]",
};

function DialogShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <ComponentShowcase
      name="Dialog"
      defaultProps={{ size: "2" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4"] },
      ]}
      render={(props) => (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Static preview */}
          <div className={`w-full bg-[var(--neutral-1)] border border-[var(--neutral-3)] shadow-md flex flex-col gap-[var(--spacing-3)] ${dialogSizeClasses[props.size as string] ?? dialogSizeClasses["2"]}`}>
            <p className="font-bold text-[length:var(--font-size-4)] text-[var(--neutral-12)]">Edit profile</p>
            <p className="text-[length:var(--font-size-2)] text-[var(--neutral-8)]">Update your display name and bio.</p>
            <div className="flex justify-end gap-[var(--spacing-2)]">
              <button className="px-3 py-1.5 text-xs rounded bg-[var(--neutral-2)] text-[var(--neutral-9)]">Cancel</button>
              <button className="px-3 py-1.5 text-xs rounded bg-black text-white">Save</button>
            </div>
          </div>
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <button className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded hover:bg-[var(--neutral-11)] transition-colors cursor-pointer">
                Open live dialog
              </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30 z-50" />
              <DialogPrimitive.Content
                className={[
                  "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)]",
                  "bg-[var(--neutral-1)] border border-[var(--neutral-3)] shadow-xl flex flex-col gap-[var(--spacing-3)] focus:outline-none",
                  dialogSizeClasses[props.size as string] ?? dialogSizeClasses["2"],
                ].join(" ")}
              >
                <DialogPrimitive.Title className="font-bold text-[length:var(--font-size-4)] text-[var(--neutral-12)]">Edit profile</DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-[length:var(--font-size-2)] text-[var(--neutral-8)]">Update your display name and bio.</DialogPrimitive.Description>
                <div className="flex flex-col gap-[var(--spacing-2)]">
                  <input className="w-full border border-[var(--neutral-3)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--neutral-5)]" placeholder="Display name" />
                </div>
                <div className="flex justify-end gap-[var(--spacing-2)]">
                  <DialogPrimitive.Close className="px-3 py-1.5 text-xs rounded bg-[var(--neutral-2)] text-[var(--neutral-9)] cursor-pointer hover:bg-[var(--neutral-3)] transition-colors">Cancel</DialogPrimitive.Close>
                  <button className="px-3 py-1.5 text-xs rounded bg-black text-white cursor-pointer hover:bg-[var(--neutral-11)] transition-colors">Save</button>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      )}
    />
  );
}

// ── Dropdown Menu ─────────────────────────────────────────────────────────────

function DropdownMenuShowcase() {
  return (
    <ComponentShowcase
      name="Dropdown Menu"
      defaultProps={{ size: "2" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2"] },
      ]}
      render={(_props) => (
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[var(--neutral-1)] border border-[var(--neutral-3)] rounded-[var(--radius-medium-2)] shadow-sm hover:bg-[var(--neutral-1)] transition-colors cursor-pointer">
              Options <span className="text-[var(--neutral-5)]">▾</span>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              className="min-w-[160px] bg-[var(--neutral-1)] rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] shadow-lg p-1 z-50"
              sideOffset={4}
            >
              {["New file", "Copy link", "Settings"].map((item) => (
                <DropdownMenuPrimitive.Item
                  key={item}
                  className="flex items-center px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] text-[var(--neutral-10)] rounded cursor-pointer outline-none hover:bg-[var(--neutral-2)]"
                >
                  {item}
                </DropdownMenuPrimitive.Item>
              ))}
              <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[var(--neutral-2)]" />
              <DropdownMenuPrimitive.Item className="flex items-center px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] text-red-600 rounded cursor-pointer outline-none hover:bg-red-50">
                Delete
              </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      )}
    />
  );
}

// ── Hover Card ────────────────────────────────────────────────────────────────

function HoverCardShowcase() {
  return (
    <ComponentShowcase
      name="Hover Card"
      defaultProps={{ side: "bottom" }}
      controls={[
        { type: "select", label: "Side", key: "side", options: ["top", "right", "bottom", "left"] },
      ]}
      render={(props) => (
        <HoverCardPrimitive.Root openDelay={200} closeDelay={100}>
          <HoverCardPrimitive.Trigger asChild>
            <a href="#" className="text-[length:var(--font-size-2)] text-[var(--accent-11)] underline underline-offset-2 hover:text-[var(--accent-12)] cursor-pointer">
              @designvibes
            </a>
          </HoverCardPrimitive.Trigger>
          <HoverCardPrimitive.Portal>
            <HoverCardPrimitive.Content
              side={props.side as "top" | "right" | "bottom" | "left"}
              sideOffset={6}
              className="w-64 bg-[var(--neutral-1)] rounded-[var(--radius-medium-4)] border border-[var(--neutral-3)] shadow-xl p-[var(--spacing-3)] z-50"
            >
              <div className="flex gap-[var(--spacing-3)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-3)] flex items-center justify-center text-[var(--accent-11)] font-bold flex-shrink-0">
                  DV
                </div>
                <div>
                  <p className="font-semibold text-[length:var(--font-size-2)] text-[var(--neutral-12)]">Design Vibes</p>
                  <p className="text-[length:var(--font-size-1)] text-[var(--neutral-8)]">@designvibes</p>
                  <p className="text-[length:var(--font-size-1)] text-[var(--neutral-9)] mt-1">Building beautiful design systems.</p>
                  <p className="text-[length:var(--font-size-1)] text-[var(--neutral-5)] mt-1">Joined Jan 2024 · 128 following</p>
                </div>
              </div>
            </HoverCardPrimitive.Content>
          </HoverCardPrimitive.Portal>
        </HoverCardPrimitive.Root>
      )}
    />
  );
}

// ── Icon Button ───────────────────────────────────────────────────────────────

const iconBtnSizeClasses: Record<string, string> = {
  "1": "w-6 h-6 text-[12px] rounded-[var(--radius-medium-1)]",
  "2": "w-8 h-8 text-[14px] rounded-[var(--radius-medium-2)]",
  "3": "w-10 h-10 text-[16px] rounded-[var(--radius-medium-3)]",
  "4": "w-12 h-12 text-[20px] rounded-[var(--radius-medium-4)]",
};
const iconBtnVariantClasses: Record<string, string> = {
  solid: "bg-[var(--accent-9)] text-white hover:bg-[var(--accent-10)]",
  soft: "bg-[var(--accent-3)] text-[var(--accent-11)] hover:bg-[var(--accent-4)]",
  outline: "border border-[var(--accent-7)] text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
  surface: "bg-[var(--accent-2)] border border-[var(--accent-6)] text-[var(--accent-11)]",
  ghost: "text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
};

function IconButtonShowcase() {
  return (
    <ComponentShowcase
      name="Icon Button"
      defaultProps={{ size: "2", variant: "solid" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4"] },
        { type: "select", label: "Variant", key: "variant", options: ["solid", "soft", "outline", "surface", "ghost"] },
      ]}
      render={(props) => (
        <button
          className={`inline-flex items-center justify-center cursor-pointer transition-colors font-bold leading-none ${iconBtnSizeClasses[props.size as string] ?? iconBtnSizeClasses["2"]} ${iconBtnVariantClasses[props.variant as string] ?? iconBtnVariantClasses["solid"]}`}
          aria-label="Add"
        >
          +
        </button>
      )}
    />
  );
}

// ── Inset ─────────────────────────────────────────────────────────────────────

function InsetShowcase() {
  return (
    <ComponentShowcase
      name="Inset"
      defaultProps={{ side: "all" }}
      controls={[
        { type: "select", label: "Side", key: "side", options: ["all", "top", "bottom", "left", "right"] },
      ]}
      render={(props) => {
        const side = props.side as string;
        const clip = {
          all: "rounded-[var(--radius-medium-3)]",
          top: "rounded-t-[var(--radius-medium-3)]",
          bottom: "rounded-b-[var(--radius-medium-3)]",
          left: "rounded-l-[var(--radius-medium-3)]",
          right: "rounded-r-[var(--radius-medium-3)]",
        }[side] ?? "rounded-[var(--radius-medium-3)]";
        const margin = {
          all: "-m-[var(--spacing-3)]",
          top: "-mt-[var(--spacing-3)] -mx-[var(--spacing-3)]",
          bottom: "-mb-[var(--spacing-3)] -mx-[var(--spacing-3)]",
          left: "-ml-[var(--spacing-3)] -my-[var(--spacing-3)]",
          right: "-mr-[var(--spacing-3)] -my-[var(--spacing-3)]",
        }[side] ?? "-m-[var(--spacing-3)]";
        return (
          <div className="w-48 p-[var(--spacing-3)] bg-[var(--neutral-1)] border border-[var(--neutral-3)] rounded-[var(--radius-medium-3)] overflow-hidden">
            <div className={`${clip} ${margin} bg-[var(--accent-3)] flex items-center justify-center h-16`}>
              <span className="text-[length:var(--font-size-1)] text-[var(--accent-11)] font-medium">Inset ({side})</span>
            </div>
          </div>
        );
      }}
    />
  );
}

// ── Popover ───────────────────────────────────────────────────────────────────

function PopoverShowcase() {
  return (
    <ComponentShowcase
      name="Popover"
      defaultProps={{ side: "bottom" }}
      controls={[
        { type: "select", label: "Side", key: "side", options: ["top", "right", "bottom", "left"] },
      ]}
      render={(props) => (
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger asChild>
            <button className="px-3 py-1.5 text-sm font-medium bg-[var(--neutral-1)] border border-[var(--neutral-3)] rounded-[var(--radius-medium-2)] shadow-sm hover:bg-[var(--neutral-1)] transition-colors cursor-pointer">
              Open popover
            </button>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              side={props.side as "top" | "right" | "bottom" | "left"}
              sideOffset={6}
              className="w-64 bg-[var(--neutral-1)] rounded-[var(--radius-medium-4)] border border-[var(--neutral-3)] shadow-xl p-[var(--spacing-4)] z-50"
            >
              <p className="font-semibold text-[length:var(--font-size-2)] text-[var(--neutral-12)] mb-[var(--spacing-3)]">Quick settings</p>
              <div className="flex flex-col gap-[var(--spacing-2)]">
                <label className="text-[length:var(--font-size-1)] text-[var(--neutral-8)]">Name</label>
                <input className="w-full border border-[var(--neutral-3)] rounded px-2 py-1.5 text-sm outline-none focus:border-[var(--neutral-5)]" defaultValue="Design Vibes" />
                <label className="text-[length:var(--font-size-1)] text-[var(--neutral-8)]">Width</label>
                <input className="w-full border border-[var(--neutral-3)] rounded px-2 py-1.5 text-sm outline-none focus:border-[var(--neutral-5)]" defaultValue="100%" />
              </div>
              <PopoverPrimitive.Arrow className="fill-white" />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      )}
    />
  );
}

// ── Progress ──────────────────────────────────────────────────────────────────

const progressSizeH: Record<string, string> = { "1": "h-1", "2": "h-2", "3": "h-3" };
const progressVariantClasses: Record<string, string> = {
  classic: "bg-[var(--neutral-3)]",
  surface: "bg-[var(--neutral-2)] border border-[var(--neutral-3)]",
  soft: "bg-[var(--accent-3)]",
};
const progressBarVariant: Record<string, string> = {
  classic: "bg-[var(--accent-9)]",
  surface: "bg-[var(--accent-9)]",
  soft: "bg-[var(--accent-8)]",
};

function ProgressShowcase() {
  return (
    <ComponentShowcase
      name="Progress"
      defaultProps={{ value: "50", size: "2", variant: "classic" }}
      controls={[
        { type: "select", label: "Value", key: "value", options: ["0", "25", "50", "75", "100"] },
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["classic", "surface", "soft"] },
      ]}
      render={(props) => {
        const pct = parseInt(props.value as string, 10);
        return (
          <ProgressPrimitive.Root
            value={pct}
            className={`w-48 overflow-hidden rounded-full ${progressSizeH[props.size as string] ?? progressSizeH["2"]} ${progressVariantClasses[props.variant as string] ?? progressVariantClasses["classic"]}`}
          >
            <ProgressPrimitive.Indicator
              className={`h-full rounded-full transition-all duration-300 ${progressBarVariant[props.variant as string] ?? progressBarVariant["classic"]}`}
              style={{ width: `${pct}%` }}
            />
          </ProgressPrimitive.Root>
        );
      }}
    />
  );
}

// ── Radio Group ───────────────────────────────────────────────────────────────

const radioSizeClasses: Record<string, string> = {
  "1": "w-3.5 h-3.5",
  "2": "w-4 h-4",
  "3": "w-5 h-5",
};

function RadioGroupShowcase() {
  const [value, setValue] = useState("option-1");
  return (
    <ComponentShowcase
      name="Radio Group"
      defaultProps={{ size: "2", orientation: "vertical" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Orientation", key: "orientation", options: ["vertical", "horizontal"] },
      ]}
      render={(props) => (
        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={setValue}
          orientation={props.orientation as "vertical" | "horizontal"}
          className={`flex gap-[var(--spacing-2)] ${props.orientation === "horizontal" ? "flex-row items-center" : "flex-col"}`}
        >
          {["Option A", "Option B", "Option C"].map((opt, i) => (
            <div key={opt} className="flex items-center gap-[var(--spacing-2)]">
              <RadioGroupPrimitive.Item
                value={`option-${i + 1}`}
                className={`rounded-full border-2 border-[var(--neutral-4)] bg-[var(--neutral-1)] flex items-center justify-center cursor-pointer transition-colors data-[state=checked]:border-[var(--accent-9)] focus:outline-none ${radioSizeClasses[props.size as string] ?? radioSizeClasses["2"]}`}
              >
                <RadioGroupPrimitive.Indicator
                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent-9)]"
                />
              </RadioGroupPrimitive.Item>
              <label className="text-[length:var(--font-size-2)] text-[var(--neutral-10)] cursor-pointer">{opt}</label>
            </div>
          ))}
        </RadioGroupPrimitive.Root>
      )}
    />
  );
}

// ── Scroll Area ───────────────────────────────────────────────────────────────

function ScrollAreaShowcase() {
  return (
    <ComponentShowcase
      name="Scroll Area"
      defaultProps={{ type: "auto" }}
      controls={[
        { type: "select", label: "Type", key: "type", options: ["auto", "always"] },
      ]}
      render={(props) => (
        <ScrollAreaPrimitive.Root
          type={props.type as "auto" | "always"}
          className="w-48 h-36 rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] bg-[var(--neutral-1)] overflow-hidden"
        >
          <ScrollAreaPrimitive.Viewport className="w-full h-full">
            <div className="p-[var(--spacing-2)]">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="py-1 px-[var(--spacing-2)] text-[length:var(--font-size-1)] text-[var(--neutral-9)] hover:bg-[var(--neutral-1)] rounded">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            orientation="vertical"
            className="flex select-none touch-none p-0.5 bg-[var(--neutral-2)] transition-colors w-2.5"
          >
            <ScrollAreaPrimitive.Thumb className="flex-1 bg-[var(--neutral-4)] rounded-full relative" />
          </ScrollAreaPrimitive.Scrollbar>
        </ScrollAreaPrimitive.Root>
      )}
    />
  );
}

// ── Select ────────────────────────────────────────────────────────────────────

const selectSizeClasses: Record<string, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
};
const selectVariantClasses: Record<string, string> = {
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] text-[var(--neutral-10)] shadow-sm",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-10)]",
  soft: "bg-[var(--neutral-2)] border-transparent text-[var(--neutral-10)]",
};

function SelectShowcase() {
  return (
    <ComponentShowcase
      name="Select"
      defaultProps={{ size: "2", variant: "classic" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["classic", "surface", "soft"] },
      ]}
      render={(props) => (
        <SelectPrimitive.Root defaultValue="apple">
          <SelectPrimitive.Trigger
            className={`inline-flex items-center justify-between gap-[var(--spacing-2)] cursor-pointer outline-none border ${selectSizeClasses[props.size as string] ?? selectSizeClasses["2"]} ${selectVariantClasses[props.variant as string] ?? selectVariantClasses["classic"]}`}
          >
            <SelectPrimitive.Value />
            <SelectPrimitive.Icon className="text-[var(--neutral-5)]">▾</SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="bg-[var(--neutral-1)] rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] shadow-xl z-50 overflow-hidden">
              <SelectPrimitive.Viewport className="p-1">
                {["Apple", "Banana", "Cherry", "Grape", "Mango"].map((fruit) => (
                  <SelectPrimitive.Item
                    key={fruit}
                    value={fruit.toLowerCase()}
                    className="flex items-center px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] text-[var(--neutral-10)] rounded cursor-pointer outline-none hover:bg-[var(--neutral-2)] data-[highlighted]:bg-[var(--neutral-2)]"
                  >
                    <SelectPrimitive.ItemText>{fruit}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      )}
    />
  );
}

// ── Separator ─────────────────────────────────────────────────────────────────

const separatorColorClasses: Record<string, string> = {
  gray: "bg-[var(--neutral-3)]",
  accent: "bg-[var(--accent-6)]",
};

function SeparatorShowcase() {
  return (
    <ComponentShowcase
      name="Separator"
      defaultProps={{ orientation: "horizontal", color: "gray" }}
      controls={[
        { type: "select", label: "Orientation", key: "orientation", options: ["horizontal", "vertical"] },
        { type: "select", label: "Color", key: "color", options: ["gray", "accent"] },
      ]}
      render={(props) => (
        <div className={`flex items-center justify-center ${props.orientation === "vertical" ? "h-16" : "w-48"}`}>
          <SeparatorPrimitive.Root
            orientation={props.orientation as "horizontal" | "vertical"}
            className={`${separatorColorClasses[props.color as string] ?? separatorColorClasses["gray"]} ${props.orientation === "vertical" ? "w-px h-full" : "h-px w-full"}`}
          />
        </div>
      )}
    />
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonShowcase() {
  return (
    <ComponentShowcase
      name="Skeleton"
      defaultProps={{ pulse: true }}
      controls={[
        { type: "toggle", label: "Pulse", key: "pulse" },
      ]}
      render={(props) => (
        <div className="flex flex-col gap-[var(--spacing-2)] w-48">
          {[
            { w: "w-full", h: "h-4" },
            { w: "w-4/5", h: "h-3" },
            { w: "w-3/5", h: "h-3" },
          ].map(({ w, h }, i) => (
            <div
              key={i}
              className={`${w} ${h} rounded bg-[var(--neutral-3)] ${props.pulse ? "animate-pulse" : ""}`}
            />
          ))}
        </div>
      )}
    />
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────

const sliderSizeClasses: Record<string, string> = {
  "1": "h-1",
  "2": "h-1.5",
  "3": "h-2",
};

function SliderShowcase() {
  const [value, setValue] = useState(40);
  return (
    <ComponentShowcase
      name="Slider"
      defaultProps={{ size: "2", orientation: "horizontal" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Orientation", key: "orientation", options: ["horizontal", "vertical"] },
      ]}
      render={(props) => {
        const isVert = props.orientation === "vertical";
        return (
          <SliderPrimitive.Root
            value={[value]}
            onValueChange={(v) => setValue(v[0])}
            min={0}
            max={100}
            step={1}
            orientation={props.orientation as "horizontal" | "vertical"}
            className={`relative flex touch-none select-none items-center ${isVert ? "flex-col h-32 w-3" : "w-48 h-3"}`}
          >
            <SliderPrimitive.Track
              className={`relative grow overflow-hidden rounded-full bg-[var(--neutral-3)] ${isVert ? `w-full ${sliderSizeClasses[props.size as string] ?? sliderSizeClasses["2"]}` : `h-full ${sliderSizeClasses[props.size as string] ?? sliderSizeClasses["2"]}`}`}
            >
              <SliderPrimitive.Range className="absolute bg-[var(--accent-9)] rounded-full h-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block w-4 h-4 rounded-full border-2 border-[var(--accent-9)] bg-[var(--neutral-1)] shadow cursor-grab active:cursor-grabbing focus:outline-none" />
          </SliderPrimitive.Root>
        );
      }}
    />
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────

const spinnerSizeClasses: Record<string, string> = {
  "1": "w-3 h-3 border-[1.5px]",
  "2": "w-4 h-4 border-2",
  "3": "w-5 h-5 border-2",
  "4": "w-6 h-6 border-[2.5px]",
  "5": "w-8 h-8 border-[3px]",
};

function SpinnerShowcase() {
  return (
    <ComponentShowcase
      name="Spinner"
      defaultProps={{ size: "3" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4", "5"] },
      ]}
      render={(props) => (
        <div
          className={`rounded-full border-[var(--neutral-3)] border-t-[var(--accent-9)] animate-spin ${spinnerSizeClasses[props.size as string] ?? spinnerSizeClasses["3"]}`}
          style={{ borderTopColor: "var(--accent-9)" }}
        />
      )}
    />
  );
}

// ── Switch ────────────────────────────────────────────────────────────────────

const switchSizeClasses: Record<string, string> = {
  "1": "w-7 h-4",
  "2": "w-9 h-5",
  "3": "w-11 h-6",
};
const switchThumbSize: Record<string, string> = {
  "1": "w-3 h-3 data-[state=checked]:translate-x-3.5",
  "2": "w-4 h-4 data-[state=checked]:translate-x-4",
  "3": "w-5 h-5 data-[state=checked]:translate-x-5",
};
const switchVariantClasses: Record<string, string> = {
  classic: "data-[state=unchecked]:bg-[var(--neutral-3)] data-[state=checked]:bg-[var(--accent-9)]",
  surface: "data-[state=unchecked]:bg-[var(--neutral-2)] border border-[var(--neutral-4)] data-[state=checked]:bg-[var(--accent-9)]",
  soft: "data-[state=unchecked]:bg-[var(--accent-3)] data-[state=checked]:bg-[var(--accent-7)]",
};

function SwitchShowcase() {
  return (
    <ComponentShowcase
      name="Switch"
      defaultProps={{ size: "2", variant: "classic", checked: true }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["classic", "surface", "soft"] },
        { type: "toggle", label: "Checked", key: "checked" },
      ]}
      render={(props) => (
        <SwitchPrimitive.Root
          checked={props.checked as boolean}
          className={`relative inline-flex items-center rounded-full cursor-pointer transition-colors focus:outline-none ${switchSizeClasses[props.size as string] ?? switchSizeClasses["2"]} ${switchVariantClasses[props.variant as string] ?? switchVariantClasses["classic"]}`}
        >
          <SwitchPrimitive.Thumb
            className={`block rounded-full bg-[var(--neutral-1)] shadow transition-transform translate-x-0.5 ${switchThumbSize[props.size as string] ?? switchThumbSize["2"]}`}
          />
        </SwitchPrimitive.Root>
      )}
    />
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────

const tableVariantClasses: Record<string, string> = {
  ghost: "bg-transparent",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] rounded-[var(--radius-medium-3)] overflow-hidden",
};

function TableShowcase() {
  return (
    <ComponentShowcase
      name="Table"
      defaultProps={{ variant: "surface" }}
      controls={[
        { type: "select", label: "Variant", key: "variant", options: ["ghost", "surface"] },
      ]}
      render={(props) => (
        <div className={`w-full max-w-xs text-[length:var(--font-size-1)] ${tableVariantClasses[props.variant as string] ?? tableVariantClasses["surface"]}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--neutral-3)] bg-[var(--neutral-1)]">
                <th className="px-[var(--spacing-3)] py-2 text-left font-medium text-[var(--neutral-8)]">Name</th>
                <th className="px-[var(--spacing-3)] py-2 text-left font-medium text-[var(--neutral-8)]">Role</th>
                <th className="px-[var(--spacing-3)] py-2 text-left font-medium text-[var(--neutral-8)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Alice", role: "Admin", status: "Active" },
                { name: "Bob", role: "Editor", status: "Inactive" },
                { name: "Carol", role: "Viewer", status: "Active" },
                { name: "Dave", role: "Editor", status: "Active" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-[var(--neutral-2)] last:border-0">
                  <td className="px-[var(--spacing-3)] py-2 text-[var(--neutral-12)]">{row.name}</td>
                  <td className="px-[var(--spacing-3)] py-2 text-[var(--neutral-9)]">{row.role}</td>
                  <td className="px-[var(--spacing-3)] py-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-[var(--neutral-2)] text-[var(--neutral-8)]"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    />
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

const tabsVariantClasses: Record<string, { list: string; trigger: string; activeTrigger: string }> = {
  line: {
    list: "flex border-b border-[var(--neutral-3)]",
    trigger: "px-[var(--spacing-3)] py-2 text-[var(--neutral-8)] border-b-2 border-transparent hover:text-[var(--neutral-10)] transition-colors cursor-pointer -mb-px",
    activeTrigger: "border-[var(--accent-9)] text-[var(--accent-11)] font-medium",
  },
  enclosed: {
    list: "flex gap-1 p-1 bg-[var(--neutral-2)] rounded-[var(--radius-medium-3)]",
    trigger: "px-[var(--spacing-3)] py-1.5 text-[var(--neutral-8)] rounded-[var(--radius-medium-2)] hover:text-[var(--neutral-10)] transition-colors cursor-pointer",
    activeTrigger: "bg-[var(--neutral-1)] text-[var(--neutral-12)] font-medium shadow-sm",
  },
};

function TabsShowcase() {
  return (
    <ComponentShowcase
      name="Tabs"
      defaultProps={{ size: "1", variant: "line" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2"] },
        { type: "select", label: "Variant", key: "variant", options: ["line", "enclosed"] },
      ]}
      render={(props) => {
        const v = tabsVariantClasses[props.variant as string] ?? tabsVariantClasses["line"];
        const fontSize = props.size === "1" ? "text-[length:var(--font-size-1)]" : "text-[length:var(--font-size-2)]";
        return (
          <TabsPrimitive.Root defaultValue="tab-1" className="w-56">
            <TabsPrimitive.List className={`${v.list} ${fontSize}`}>
              {["Account", "Security", "Billing"].map((tab, i) => (
                <TabsPrimitive.Trigger
                  key={tab}
                  value={`tab-${i + 1}`}
                  className={`${v.trigger} data-[state=active]:${v.activeTrigger}`}
                  style={{ fontWeight: undefined }}
                >
                  {tab}
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
            {["Account settings and profile info.", "Password and two-factor auth.", "Plans, billing history, invoices."].map((content, i) => (
              <TabsPrimitive.Content key={i} value={`tab-${i + 1}`} className={`pt-[var(--spacing-3)] ${fontSize} text-[var(--neutral-9)]`}>
                {content}
              </TabsPrimitive.Content>
            ))}
          </TabsPrimitive.Root>
        );
      }}
    />
  );
}

// ── Text Area ─────────────────────────────────────────────────────────────────

const textAreaSizeClasses: Record<string, string> = {
  "1": "text-[length:var(--font-size-1)] rounded-[var(--radius-medium-2)] px-[var(--spacing-2)] py-[var(--spacing-1)]",
  "2": "text-[length:var(--font-size-2)] rounded-[var(--radius-medium-3)] px-[var(--spacing-3)] py-[var(--spacing-2)]",
  "3": "text-[length:var(--font-size-3)] rounded-[var(--radius-medium-4)] px-[var(--spacing-4)] py-[var(--spacing-3)]",
};
const textAreaVariantClasses: Record<string, string> = {
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] text-[var(--neutral-12)] shadow-sm",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-12)]",
  soft: "bg-[var(--neutral-2)] border-transparent text-[var(--neutral-12)]",
};
const textAreaResizeClasses: Record<string, string> = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
};

function TextAreaShowcase() {
  return (
    <ComponentShowcase
      name="Text Area"
      defaultProps={{ size: "2", variant: "classic", resize: "vertical" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["classic", "surface", "soft"] },
        { type: "select", label: "Resize", key: "resize", options: ["none", "vertical", "both"] },
      ]}
      render={(props) => (
        <textarea
          rows={3}
          placeholder="Type something..."
          className={`w-48 outline-none focus:border-[var(--neutral-5)] transition-colors ${textAreaSizeClasses[props.size as string] ?? textAreaSizeClasses["2"]} ${textAreaVariantClasses[props.variant as string] ?? textAreaVariantClasses["classic"]} ${textAreaResizeClasses[props.resize as string] ?? textAreaResizeClasses["vertical"]}`}
        />
      )}
    />
  );
}

// ── Text Field ────────────────────────────────────────────────────────────────

const textFieldSizeClasses: Record<string, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
};
const textFieldVariantClasses: Record<string, string> = {
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] text-[var(--neutral-12)] shadow-sm",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-12)]",
  soft: "bg-[var(--neutral-2)] border-transparent text-[var(--neutral-12)]",
};

function TextFieldShowcase() {
  return (
    <ComponentShowcase
      name="Text Field"
      defaultProps={{ size: "2", variant: "classic", type: "text" }}
      controls={[
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
        { type: "select", label: "Variant", key: "variant", options: ["classic", "surface", "soft"] },
        { type: "select", label: "Type", key: "type", options: ["text", "email", "password"] },
      ]}
      render={(props) => (
        <input
          type={props.type as string}
          placeholder={props.type === "email" ? "you@example.com" : props.type === "password" ? "••••••••" : "Enter text..."}
          className={`w-48 outline-none focus:border-[var(--neutral-5)] transition-colors border ${textFieldSizeClasses[props.size as string] ?? textFieldSizeClasses["2"]} ${textFieldVariantClasses[props.variant as string] ?? textFieldVariantClasses["classic"]}`}
        />
      )}
    />
  );
}

// ── Toggle Group ──────────────────────────────────────────────────────────────

const toggleSizeClasses: Record<string, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)]",
};

function ToggleGroupShowcase() {
  const [singleVal, setSingleVal] = useState("bold");
  const [multiVal, setMultiVal] = useState<string[]>(["bold"]);

  return (
    <ComponentShowcase
      name="Toggle Group"
      defaultProps={{ type: "single", size: "2" }}
      controls={[
        { type: "select", label: "Type", key: "type", options: ["single", "multiple"] },
        { type: "select", label: "Size", key: "size", options: ["1", "2", "3"] },
      ]}
      render={(props) => {
        const options = [
          { value: "bold", label: "B" },
          { value: "italic", label: "I" },
          { value: "underline", label: "U" },
        ];
        const sz = toggleSizeClasses[props.size as string] ?? toggleSizeClasses["2"];

        if (props.type === "multiple") {
          return (
            <ToggleGroupPrimitive.Root
              type="multiple"
              value={multiVal}
              onValueChange={setMultiVal}
              className="inline-flex rounded-[var(--radius-medium-2)] border border-[var(--neutral-3)] overflow-hidden"
            >
              {options.map(({ value, label }) => (
                <ToggleGroupPrimitive.Item
                  key={value}
                  value={value}
                  className={`inline-flex items-center justify-center font-medium cursor-pointer transition-colors border-r border-[var(--neutral-3)] last:border-0 bg-[var(--neutral-1)] text-[var(--neutral-9)] hover:bg-[var(--neutral-1)] data-[state=on]:bg-[var(--accent-3)] data-[state=on]:text-[var(--accent-11)] focus:outline-none ${sz}`}
                >
                  {label}
                </ToggleGroupPrimitive.Item>
              ))}
            </ToggleGroupPrimitive.Root>
          );
        }

        return (
          <ToggleGroupPrimitive.Root
            type="single"
            value={singleVal}
            onValueChange={(v) => { if (v) setSingleVal(v); }}
            className="inline-flex rounded-[var(--radius-medium-2)] border border-[var(--neutral-3)] overflow-hidden"
          >
            {options.map(({ value, label }) => (
              <ToggleGroupPrimitive.Item
                key={value}
                value={value}
                className={`inline-flex items-center justify-center font-medium cursor-pointer transition-colors border-r border-[var(--neutral-3)] last:border-0 bg-[var(--neutral-1)] text-[var(--neutral-9)] hover:bg-[var(--neutral-1)] data-[state=on]:bg-[var(--accent-3)] data-[state=on]:text-[var(--accent-11)] focus:outline-none ${sz}`}
              >
                {label}
              </ToggleGroupPrimitive.Item>
            ))}
          </ToggleGroupPrimitive.Root>
        );
      }}
    />
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

function TooltipShowcase() {
  return (
    <ComponentShowcase
      name="Tooltip"
      defaultProps={{ side: "top" }}
      controls={[
        { type: "select", label: "Side", key: "side", options: ["top", "right", "bottom", "left"] },
      ]}
      render={(props) => (
        <TooltipPrimitive.Provider delayDuration={200}>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <button className="px-3 py-1.5 text-sm font-medium bg-[var(--neutral-1)] border border-[var(--neutral-3)] rounded-[var(--radius-medium-2)] shadow-sm hover:bg-[var(--neutral-1)] transition-colors cursor-pointer">
                Hover me
              </button>
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content
                side={props.side as "top" | "right" | "bottom" | "left"}
                sideOffset={6}
                className="bg-[var(--neutral-12)] text-white text-[length:var(--font-size-1)] px-[var(--spacing-2)] py-1 rounded-[var(--radius-medium-2)] shadow-lg z-50 max-w-[200px]"
              >
                Tooltip content
                <TooltipPrimitive.Arrow className="fill-gray-900" />
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
      )}
    />
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export default function CoreRadixTab() {
  return (
    <div>
      <AlertDialogShowcase />
      <AvatarShowcase />
      <BadgeShowcase />
      <ButtonShowcase />
      <CalloutShowcase />
      <CardShowcase />
      <CheckboxShowcase />
      <ContextMenuShowcase />
      <DataListShowcase />
      <DialogShowcase />
      <DropdownMenuShowcase />
      <HoverCardShowcase />
      <IconButtonShowcase />
      <InsetShowcase />
      <PopoverShowcase />
      <ProgressShowcase />
      <RadioGroupShowcase />
      <ScrollAreaShowcase />
      <SelectShowcase />
      <SeparatorShowcase />
      <SkeletonShowcase />
      <SliderShowcase />
      <SpinnerShowcase />
      <SwitchShowcase />
      <TableShowcase />
      <TabsShowcase />
      <TextAreaShowcase />
      <TextFieldShowcase />
      <ToggleGroupShowcase />
      <TooltipShowcase />
    </div>
  );
}
