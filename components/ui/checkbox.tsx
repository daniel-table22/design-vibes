"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export type CheckboxSize = "1" | "2" | "3";
export type CheckboxVariant = "classic" | "surface";

const sizeClasses: Record<CheckboxSize, string> = {
  "1": "w-3.5 h-3.5 rounded-[var(--radius-medium-1)]",
  "2": "w-4 h-4 rounded-[var(--radius-medium-2)]",
  "3": "w-5 h-5 rounded-[var(--radius-medium-3)]",
};

const variantClasses: Record<CheckboxVariant, string> = {
  classic: "border-2 border-[var(--neutral-5)] data-[state=checked]:bg-[var(--accent-9)] data-[state=checked]:border-[var(--accent-9)]",
  surface: "border border-[var(--neutral-4)] bg-[var(--neutral-1)] data-[state=checked]:bg-[var(--accent-9)] data-[state=checked]:border-[var(--accent-9)]",
};

interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "className"> {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  className?: string;
}

export function Checkbox({ size = "2", variant = "classic", className = "", ...rest }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={`flex items-center justify-center cursor-pointer transition-colors focus:outline-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      <CheckboxPrimitive.Indicator>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
