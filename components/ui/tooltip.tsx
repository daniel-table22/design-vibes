"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipContentProps extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "className"> {
  className?: string;
  showArrow?: boolean;
}

export function TooltipContent({
  className = "",
  sideOffset = 6,
  showArrow = true,
  children,
  ...rest
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={`bg-[var(--neutral-12)] text-white text-[length:var(--font-size-1)] px-[var(--spacing-2)] py-1 rounded-[var(--radius-medium-2)] shadow-lg z-50 max-w-[200px] ${className}`}
        {...rest}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className="fill-gray-900" />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
