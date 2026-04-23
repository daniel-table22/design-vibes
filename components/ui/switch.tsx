"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

export type SwitchSize = "1" | "2" | "3";
export type SwitchVariant = "classic" | "surface" | "soft";

const sizeClasses: Record<SwitchSize, string> = {
  "1": "w-7 h-4",
  "2": "w-9 h-5",
  "3": "w-11 h-6",
};

const thumbClasses: Record<SwitchSize, string> = {
  "1": "w-3 h-3 data-[state=checked]:translate-x-3.5",
  "2": "w-4 h-4 data-[state=checked]:translate-x-4",
  "3": "w-5 h-5 data-[state=checked]:translate-x-5",
};

const variantClasses: Record<SwitchVariant, string> = {
  classic: "data-[state=unchecked]:bg-[var(--neutral-3)] data-[state=checked]:bg-[var(--accent-9)]",
  surface: "data-[state=unchecked]:bg-[var(--neutral-2)] border border-[var(--neutral-4)] data-[state=checked]:bg-[var(--accent-9)]",
  soft: "data-[state=unchecked]:bg-[var(--accent-3)] data-[state=checked]:bg-[var(--accent-7)]",
};

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "className"> {
  size?: SwitchSize;
  variant?: SwitchVariant;
  className?: string;
}

export function Switch({ size = "2", variant = "classic", className = "", ...rest }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={`relative inline-flex items-center rounded-full cursor-pointer transition-colors focus:outline-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      <SwitchPrimitive.Thumb
        className={`block rounded-full bg-[var(--neutral-1)] shadow transition-transform translate-x-0.5 ${thumbClasses[size]}`}
      />
    </SwitchPrimitive.Root>
  );
}
