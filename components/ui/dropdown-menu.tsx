"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export function DropdownMenuContent({
  className = "",
  sideOffset = 4,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={`min-w-[160px] bg-[var(--neutral-1)] rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] shadow-lg p-1 z-50 ${className}`}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

interface DropdownMenuItemProps extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, "className"> {
  color?: "neutral" | "danger";
  className?: string;
}

export function DropdownMenuItem({ color = "neutral", className = "", ...rest }: DropdownMenuItemProps) {
  const color_ = color === "danger"
    ? "text-red-600 hover:bg-red-50"
    : "text-[var(--neutral-10)] hover:bg-[var(--neutral-2)]";
  return (
    <DropdownMenuPrimitive.Item
      className={`flex items-center gap-[var(--spacing-2)] px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] rounded cursor-pointer outline-none ${color_} ${className}`}
      {...rest}
    />
  );
}

export function DropdownMenuSeparator({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator className={`my-1 h-px bg-[var(--neutral-2)] ${className}`} {...rest} />
  );
}

export function DropdownMenuLabel({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={`px-[var(--spacing-2)] py-1 text-[length:var(--font-size-1)] text-[var(--neutral-8)] uppercase tracking-wide ${className}`}
      {...rest}
    />
  );
}
