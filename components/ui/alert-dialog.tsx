"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export type AlertDialogSize = "1" | "2" | "3" | "4";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: AlertDialogSize;
  insetContent?: boolean;
  showDescription?: boolean;
  title?: string;
  description?: string;
  cancelLabel?: string;
  actionLabel?: string;
  children?: React.ReactNode;
}

const sizeStyles = {
  "1": {
    panel: "gap-[var(--spacing-3)] py-[var(--spacing-3)] rounded-[var(--radius-4)]",
    text: "gap-[var(--spacing-1)] px-[var(--spacing-3)]",
    buttons: "gap-[var(--spacing-2)] px-[var(--spacing-3)]",
    slot: "px-[var(--spacing-3)]",
    title: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)] tracking-[var(--letter-spacing-2)] font-bold",
    desc: "text-[length:var(--font-size-1)] leading-[var(--line-height-1)] tracking-[var(--letter-spacing-1)]",
    cancelBtn: "h-6 px-[var(--spacing-2)] rounded-[var(--radius-1)] gap-[var(--spacing-1)] text-[length:var(--font-size-1)] leading-[var(--line-height-1)]",
    actionBtn: "h-6 px-[var(--spacing-2)] rounded-[var(--radius-1)] gap-[var(--spacing-1)] text-[length:var(--font-size-1)] leading-[var(--line-height-1)]",
    width: "w-[300px]",
  },
  "2": {
    panel: "gap-[var(--spacing-4)] py-[var(--spacing-4)] rounded-[var(--radius-4)]",
    text: "gap-[var(--spacing-2)] px-[var(--spacing-4)]",
    buttons: "gap-[var(--spacing-2)] px-[var(--spacing-4)]",
    slot: "px-[var(--spacing-4)]",
    title: "text-[length:var(--font-size-5)] leading-[var(--line-height-5)] tracking-[var(--letter-spacing-5)] font-bold",
    desc: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)] tracking-[var(--letter-spacing-2)]",
    cancelBtn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-2)] gap-[var(--spacing-2)] text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    actionBtn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-2)] gap-[var(--spacing-2)] text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    width: "w-[432px]",
  },
  "3": {
    panel: "gap-[var(--spacing-4)] py-[var(--spacing-5)] rounded-[var(--radius-5)]",
    text: "gap-[var(--spacing-3)] px-[var(--spacing-5)]",
    buttons: "gap-[var(--spacing-3)] px-[var(--spacing-5)]",
    slot: "px-[var(--spacing-5)]",
    title: "text-[length:var(--font-size-5)] leading-[var(--line-height-5)] tracking-[var(--letter-spacing-5)] font-bold",
    desc: "text-[length:var(--font-size-2)] leading-[var(--line-height-2)] tracking-[var(--letter-spacing-2)]",
    cancelBtn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-2)] gap-[var(--spacing-2)] text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    actionBtn: "h-8 px-[var(--spacing-3)] rounded-[var(--radius-2)] gap-[var(--spacing-2)] text-[length:var(--font-size-2)] leading-[var(--line-height-2)]",
    width: "w-[432px]",
  },
  "4": {
    panel: "gap-[var(--spacing-5)] py-[var(--spacing-6)] rounded-[var(--radius-5)]",
    text: "gap-[var(--spacing-3)] px-[var(--spacing-6)]",
    buttons: "gap-[var(--spacing-3)] px-[var(--spacing-6)]",
    slot: "px-[var(--spacing-6)]",
    title: "text-[length:var(--font-size-6)] leading-[var(--line-height-6)] tracking-[var(--letter-spacing-6)] font-bold",
    desc: "text-[length:var(--font-size-3)] leading-[var(--line-height-3)] tracking-[var(--letter-spacing-3)]",
    cancelBtn: "h-10 px-[var(--spacing-4)] rounded-[var(--radius-3)] gap-[var(--spacing-3)] text-[length:var(--font-size-3)] leading-[var(--line-height-3)]",
    actionBtn: "h-10 px-[var(--spacing-4)] rounded-[var(--radius-3)] gap-[var(--spacing-3)] text-[length:var(--font-size-3)] leading-[var(--line-height-3)]",
    width: "w-[482px]",
  },
} as const;

export function AlertDialog({
  open,
  onOpenChange,
  size = "3",
  insetContent = false,
  showDescription = true,
  title = "Title",
  description = "Description",
  cancelLabel = "Cancel",
  actionLabel = "Action",
  children,
}: AlertDialogProps) {
  const s = sizeStyles[size];

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-[var(--color-black-a-6)] z-50" />
        <AlertDialogPrimitive.Content
          className={[
            "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-white flex flex-col items-start max-h-[690px] max-w-[600px] overflow-y-auto",
            "border border-[rgba(0,0,51,0.06)] shadow-[0px_16px_36px_-20px_rgba(0,6,46,0.2),0px_16px_64px_0px_rgba(0,0,85,0.02),0px_12px_60px_0px_rgba(0,0,0,0.15)]",
            "w-full focus:outline-none",
            s.panel,
            s.width,
          ].join(" ")}
        >
          {/* Text block */}
          <div className={`flex flex-col items-start w-full shrink-0 ${s.text}`}>
            <AlertDialogPrimitive.Title className={`w-full text-gray-900 ${s.title}`}>
              {title}
            </AlertDialogPrimitive.Title>
            {showDescription && (
              <AlertDialogPrimitive.Description className={`w-full text-gray-900 font-normal ${s.desc}`}>
                {description}
              </AlertDialogPrimitive.Description>
            )}
          </div>

          {/* Inset content slot */}
          {insetContent && (
            <div className={`w-full shrink-0 overflow-clip ${s.slot}`}>
              {children ?? (
                <div className="border border-dashed border-gray-300 rounded h-[120px] w-full" />
              )}
            </div>
          )}

          {/* Buttons */}
          <div className={`flex items-center justify-end w-full shrink-0 ${s.buttons}`}>
            <AlertDialogPrimitive.Cancel
              className={`flex items-center justify-center font-medium bg-[rgba(0,0,51,0.06)] text-gray-600 cursor-pointer hover:bg-[rgba(0,0,51,0.1)] transition-colors ${s.cancelBtn}`}
            >
              {cancelLabel}
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              className={`flex items-center justify-center font-medium bg-[var(--color-red-9,#fa4b41)] text-white cursor-pointer hover:bg-[var(--color-red-10,#e5413a)] transition-colors ${s.actionBtn}`}
            >
              {actionLabel}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
