"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export function HoverCardContent({
  className = "",
  sideOffset = 6,
  ...rest
}: React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        sideOffset={sideOffset}
        className={`w-64 bg-[var(--neutral-1)] rounded-[var(--radius-medium-4)] border border-[var(--neutral-3)] shadow-xl p-[var(--spacing-3)] z-50 ${className}`}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  );
}
