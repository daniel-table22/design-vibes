"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { createContext, useContext } from "react";

export type RadioCardsSize = "1" | "2" | "3";

const sizeClasses: Record<RadioCardsSize, string> = {
  "1": "p-[var(--spacing-3)] rounded-[var(--radius-medium-2)] gap-[var(--spacing-2)]",
  "2": "p-[var(--spacing-4)] rounded-[var(--radius-medium-3)] gap-[var(--spacing-2)]",
  "3": "p-[var(--spacing-5)] rounded-[var(--radius-medium-4)] gap-[var(--spacing-3)]",
};

const indicatorSize: Record<RadioCardsSize, string> = {
  "1": "w-3.5 h-3.5",
  "2": "w-4 h-4",
  "3": "w-5 h-5",
};

const dotSize: Record<RadioCardsSize, string> = {
  "1": "w-1 h-1",
  "2": "w-1.5 h-1.5",
  "3": "w-2 h-2",
};

const SizeCtx = createContext<RadioCardsSize>("2");

interface RadioCardsProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "className"> {
  size?: RadioCardsSize;
  columns?: number;
  className?: string;
}

export function RadioCards({ size = "2", columns = 1, className = "", children, ...rest }: RadioCardsProps) {
  return (
    <RadioGroupPrimitive.Root
      className={`grid gap-[var(--spacing-2)] ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...rest}
    >
      <SizeCtx.Provider value={size}>{children}</SizeCtx.Provider>
    </RadioGroupPrimitive.Root>
  );
}

interface RadioCardsItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export function RadioCardsItem({ value, children, className = "" }: RadioCardsItemProps) {
  const size = useContext(SizeCtx);
  return (
    <RadioGroupPrimitive.Item
      value={value}
      className={[
        "flex items-start text-left cursor-pointer transition-colors border bg-[var(--neutral-1)]",
        "border-[var(--neutral-4)] hover:border-[var(--neutral-5)]",
        "data-[state=checked]:border-[var(--accent-9)] data-[state=checked]:ring-1 data-[state=checked]:ring-[var(--accent-9)]",
        "focus:outline-none",
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      <span
        className={`rounded-full border-2 border-[var(--neutral-5)] bg-[var(--neutral-1)] flex items-center justify-center shrink-0 mt-0.5 transition-colors ${indicatorSize[size]}`}
        data-slot="indicator"
      >
        <RadioGroupPrimitive.Indicator className={`rounded-full bg-[var(--accent-9)] block ${dotSize[size]}`} />
      </span>
      <div className="flex-1 text-[length:var(--font-size-2)] text-[var(--neutral-12)]">{children}</div>
    </RadioGroupPrimitive.Item>
  );
}
