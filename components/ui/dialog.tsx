"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogSize = "1" | "2" | "3" | "4";

const sizeClasses: Record<DialogSize, string> = {
  "1": "max-w-[300px] p-[var(--spacing-3)] rounded-[var(--radius-medium-4)]",
  "2": "max-w-[432px] p-[var(--spacing-4)] rounded-[var(--radius-medium-4)]",
  "3": "max-w-[544px] p-[var(--spacing-5)] rounded-[var(--radius-medium-5)]",
  "4": "max-w-[640px] p-[var(--spacing-6)] rounded-[var(--radius-medium-5)]",
};

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "className"> {
  size?: DialogSize;
  className?: string;
  overlayClassName?: string;
}

export function DialogContent({
  size = "2",
  className = "",
  overlayClassName = "",
  children,
  ...rest
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={`fixed inset-0 bg-black/30 z-50 ${overlayClassName}`} />
      <DialogPrimitive.Content
        className={[
          "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)]",
          "bg-[var(--neutral-1)] border border-[var(--neutral-3)] shadow-xl flex flex-col gap-[var(--spacing-3)] focus:outline-none",
          sizeClasses[size],
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ className = "", ...rest }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={`font-bold text-[length:var(--font-size-4)] text-[var(--neutral-12)] ${className}`}
      {...rest}
    />
  );
}

export function DialogDescription({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={`text-[length:var(--font-size-2)] text-[var(--neutral-8)] ${className}`}
      {...rest}
    />
  );
}
