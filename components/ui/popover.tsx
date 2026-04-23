"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps extends Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "className"> {
  className?: string;
  showArrow?: boolean;
}

export function PopoverContent({
  className = "",
  sideOffset = 6,
  showArrow = false,
  children,
  ...rest
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        className={`w-64 bg-[var(--neutral-1)] rounded-[var(--radius-medium-4)] border border-[var(--neutral-3)] shadow-xl p-[var(--spacing-4)] z-50 ${className}`}
        {...rest}
      >
        {children}
        {showArrow && <PopoverPrimitive.Arrow className="fill-white" />}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
