"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, useContext } from "react";

export type SegmentedControlSize = "1" | "2" | "3";

const sizeClasses: Record<SegmentedControlSize, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)]",
};

const SizeCtx = createContext<SegmentedControlSize>("2");

interface SegmentedControlProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentedControlSize;
  className?: string;
  children?: React.ReactNode;
}

export function SegmentedControl({
  size = "2",
  className = "",
  value,
  defaultValue,
  onValueChange,
  children,
}: SegmentedControlProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={`inline-flex items-center p-0.5 rounded-[var(--radius-medium-2)] bg-[var(--neutral-2)] ${className}`}
    >
      <SizeCtx.Provider value={size}>{children}</SizeCtx.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

export function SegmentedControlItem({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>) {
  const size = useContext(SizeCtx);
  return (
    <ToggleGroupPrimitive.Item
      className={[
        "inline-flex items-center justify-center font-medium cursor-pointer rounded-[var(--radius-medium-1)] transition-colors",
        "text-[var(--neutral-9)] hover:text-[var(--neutral-11)]",
        "data-[state=on]:bg-[var(--neutral-1)] data-[state=on]:text-[var(--neutral-12)] data-[state=on]:shadow-sm",
        "focus:outline-none",
        sizeClasses[size],
        className,
      ].join(" ")}
      {...rest}
    />
  );
}
