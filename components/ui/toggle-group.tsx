"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, useContext } from "react";

export type ToggleGroupSize = "1" | "2" | "3";

const sizeClasses: Record<ToggleGroupSize, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)]",
};

const SizeCtx = createContext<ToggleGroupSize>("2");

type ToggleGroupProps =
  | (Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>, "className"> & {
      size?: ToggleGroupSize;
      className?: string;
    });

export function ToggleGroup({ size = "2", className = "", children, ...rest }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      className={`inline-flex rounded-[var(--radius-medium-2)] border border-[var(--neutral-3)] overflow-hidden ${className}`}
      {...(rest as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>)}
    >
      <SizeCtx.Provider value={size}>{children}</SizeCtx.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

export function ToggleGroupItem({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>) {
  const size = useContext(SizeCtx);
  return (
    <ToggleGroupPrimitive.Item
      className={[
        "inline-flex items-center justify-center font-medium cursor-pointer transition-colors",
        "border-r border-[var(--neutral-3)] last:border-0 bg-[var(--neutral-1)] text-[var(--neutral-9)]",
        "hover:bg-[var(--neutral-2)] data-[state=on]:bg-[var(--accent-3)] data-[state=on]:text-[var(--accent-11)]",
        "focus:outline-none",
        sizeClasses[size],
        className,
      ].join(" ")}
      {...rest}
    />
  );
}
