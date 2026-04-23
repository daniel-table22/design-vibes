"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

export function ContextMenuContent({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={`min-w-[140px] bg-[var(--neutral-1)] rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] shadow-lg p-1 z-50 ${className}`}
        {...rest}
      />
    </ContextMenuPrimitive.Portal>
  );
}

interface ContextMenuItemProps extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>, "className"> {
  color?: "neutral" | "danger";
  className?: string;
}

export function ContextMenuItem({ color = "neutral", className = "", ...rest }: ContextMenuItemProps) {
  const color_ = color === "danger"
    ? "text-red-600 hover:text-red-700"
    : "text-[var(--neutral-10)] hover:bg-[var(--neutral-2)]";
  return (
    <ContextMenuPrimitive.Item
      className={`flex items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] rounded cursor-pointer outline-none ${color_} ${className}`}
      {...rest}
    />
  );
}

export function ContextMenuSeparator({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator className={`my-1 h-px bg-[var(--neutral-2)] ${className}`} {...rest} />;
}
