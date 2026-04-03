"use client";

import { useState } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import ComponentShowcase from "./ComponentShowcase";

// ── Alert Dialog ─────────────────────────────────────────────────────────────

type Size = "1" | "2" | "3" | "4";

const size = {
  "1": {
    dialog: "rounded-[var(--radius-4)] py-[var(--spacing-3)] gap-[var(--spacing-3)]",
    pad: "px-[var(--spacing-3)]",
    title: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)] font-bold",
    desc: "text-[length:var(--font-size-1)] leading-[var(--line-height-1)]",
    btn: "h-6 px-[var(--spacing-2)] rounded-[var(--radius-1)] text-[length:var(--font-size-1)]",
    w: "max-w-[300px]",
  },
  "2": {
    dialog: "rounded-[var(--radius-4)] py-[var(--spacing-4)] gap-[var(--spacing-4)]",
    pad: "px-[var(--spacing-4)]",
    title: "text-[length:var(--font-size-5)] leading-[var(--line-height-5)] font-bold",
    desc: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    btn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-2)] text-[length:var(--font-size-2)]",
    w: "max-w-[432px]",
  },
  "3": {
    dialog: "rounded-[var(--radius-5)] py-[var(--spacing-5)] gap-[var(--spacing-4)]",
    pad: "px-[var(--spacing-5)]",
    title: "text-[length:var(--font-size-5)] leading-[var(--line-height-5)] font-bold",
    desc: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    btn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-2)] text-[length:var(--font-size-2)]",
    w: "max-w-[432px]",
  },
  "4": {
    dialog: "rounded-[var(--radius-5)] py-[var(--spacing-6)] gap-[var(--spacing-5)]",
    pad: "px-[var(--spacing-6)]",
    title: "text-[length:var(--font-size-6)] leading-[var(--line-height-6)] font-bold",
    desc: "text-[length:var(--font-size-3)] leading-[var(--line-height-3)]",
    btn: "h-10 px-[var(--spacing-4)] rounded-[var(--radius-3)] text-[length:var(--font-size-3)]",
    w: "max-w-[480px]",
  },
} satisfies Record<Size, object>;

function AlertDialogPreview({ sz, showDesc }: { sz: Size; showDesc: boolean }) {
  const s = size[sz];
  return (
    <div
      className={[
        "w-full flex flex-col bg-white border border-black/[0.06]",
        "shadow-[0_16px_36px_-20px_rgba(0,6,46,0.2),0_16px_64px_rgba(0,0,85,0.02),0_12px_60px_rgba(0,0,0,0.15)]",
        s.dialog, s.w,
      ].join(" ")}
    >
      <div className={`flex flex-col gap-[var(--spacing-1)] ${s.pad}`}>
        <p className={`text-gray-900 ${s.title}`}>Are you absolutely sure?</p>
        {showDesc && (
          <p className={`text-gray-500 ${s.desc}`}>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </p>
        )}
      </div>
      <div className={`flex items-center justify-end gap-[var(--spacing-2)] ${s.pad}`}>
        <button className={`font-medium bg-black/[0.06] text-gray-600 cursor-pointer hover:bg-black/10 transition-colors ${s.btn}`}>
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
          <AlertDialogPreview sz={props.size as Size} showDesc={props.showDescription as boolean} />
          <div className="flex items-center gap-3">
            <AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
              <AlertDialogPrimitive.Trigger asChild>
                <button className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded hover:bg-gray-800 transition-colors cursor-pointer">
                  Open live dialog
                </button>
              </AlertDialogPrimitive.Trigger>
              <AlertDialogPrimitive.Portal>
                <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/30 z-50" />
                <AlertDialogPrimitive.Content
                  className={[
                    "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)]",
                    "flex flex-col bg-white border border-black/[0.06]",
                    "shadow-[0_16px_36px_-20px_rgba(0,6,46,0.2),0_16px_64px_rgba(0,0,85,0.02),0_12px_60px_rgba(0,0,0,0.15)]",
                    "focus:outline-none",
                    size[props.size as Size].dialog,
                    size[props.size as Size].w,
                  ].join(" ")}
                >
                  <div className={`flex flex-col gap-[var(--spacing-1)] ${size[props.size as Size].pad}`}>
                    <AlertDialogPrimitive.Title className={`text-gray-900 ${size[props.size as Size].title}`}>
                      Are you absolutely sure?
                    </AlertDialogPrimitive.Title>
                    {(props.showDescription as boolean) && (
                      <AlertDialogPrimitive.Description className={`text-gray-500 ${size[props.size as Size].desc}`}>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </AlertDialogPrimitive.Description>
                    )}
                  </div>
                  <div className={`flex items-center justify-end gap-[var(--spacing-2)] ${size[props.size as Size].pad}`}>
                    <AlertDialogPrimitive.Cancel className={`font-medium bg-black/[0.06] text-gray-600 cursor-pointer hover:bg-black/10 transition-colors ${size[props.size as Size].btn}`}>
                      Cancel
                    </AlertDialogPrimitive.Cancel>
                    <AlertDialogPrimitive.Action className={`font-medium bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors ${size[props.size as Size].btn}`}>
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

// ── Tab ───────────────────────────────────────────────────────────────────────

export default function CoreRadixTab() {
  return (
    <div>
      <AlertDialogShowcase />
    </div>
  );
}
