"use client";

import * as SelectPrimitive from "@radix-ui/react-select";

export type SelectSize = "1" | "2" | "3";
export type SelectVariant = "classic" | "surface" | "soft";

const sizeClasses: Record<SelectSize, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
};

const variantClasses: Record<SelectVariant, string> = {
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] text-[var(--neutral-10)] shadow-sm",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-10)]",
  soft: "bg-[var(--neutral-2)] border-transparent text-[var(--neutral-10)]",
};

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

interface SelectTriggerProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, "className"> {
  size?: SelectSize;
  variant?: SelectVariant;
  className?: string;
}

export function SelectTrigger({
  size = "2",
  variant = "classic",
  className = "",
  children,
  ...rest
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={`inline-flex items-center justify-between gap-[var(--spacing-2)] cursor-pointer outline-none border ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon className="text-[var(--neutral-5)]">▾</SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className = "",
  children,
  ...rest
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={`bg-[var(--neutral-1)] rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] shadow-xl z-50 overflow-hidden ${className}`}
        {...rest}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className = "",
  children,
  ...rest
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={`flex items-center px-[var(--spacing-2)] py-1.5 text-[length:var(--font-size-2)] text-[var(--neutral-10)] rounded cursor-pointer outline-none hover:bg-[var(--neutral-2)] data-[highlighted]:bg-[var(--neutral-2)] ${className}`}
      {...rest}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={`my-1 h-px bg-[var(--neutral-2)] ${className}`} {...rest} />;
}
