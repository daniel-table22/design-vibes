"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export type RadioSize = "1" | "2" | "3";

const sizeClasses: Record<RadioSize, string> = {
  "1": "w-3.5 h-3.5",
  "2": "w-4 h-4",
  "3": "w-5 h-5",
};

const indicatorSize: Record<RadioSize, string> = {
  "1": "w-1 h-1",
  "2": "w-1.5 h-1.5",
  "3": "w-2 h-2",
};

interface RadioProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "className"> {
  size?: RadioSize;
  className?: string;
}

export function Radio({ size = "2", className = "", ...rest }: RadioProps) {
  return (
    <RadioGroupPrimitive.Item
      className={`rounded-full border-2 border-[var(--neutral-4)] bg-[var(--neutral-1)] flex items-center justify-center cursor-pointer transition-colors data-[state=checked]:border-[var(--accent-9)] focus:outline-none ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className={`rounded-full bg-[var(--accent-9)] ${indicatorSize[size]}`} />
    </RadioGroupPrimitive.Item>
  );
}
