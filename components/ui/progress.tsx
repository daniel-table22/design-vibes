"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";

export type ProgressSize = "1" | "2" | "3";
export type ProgressVariant = "classic" | "surface" | "soft";

const heightClasses: Record<ProgressSize, string> = {
  "1": "h-1",
  "2": "h-2",
  "3": "h-3",
};

const trackClasses: Record<ProgressVariant, string> = {
  classic: "bg-[var(--neutral-3)]",
  surface: "bg-[var(--neutral-2)] border border-[var(--neutral-3)]",
  soft: "bg-[var(--accent-3)]",
};

const barClasses: Record<ProgressVariant, string> = {
  classic: "bg-[var(--accent-9)]",
  surface: "bg-[var(--accent-9)]",
  soft: "bg-[var(--accent-8)]",
};

interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "className" | "value"> {
  value?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  className?: string;
}

export function Progress({ value = 0, size = "2", variant = "classic", className = "", ...rest }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      className={`w-48 overflow-hidden rounded-full ${heightClasses[size]} ${trackClasses[variant]} ${className}`}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        className={`h-full rounded-full transition-all duration-300 ${barClasses[variant]}`}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
