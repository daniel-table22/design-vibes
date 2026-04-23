"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

interface ScrollAreaProps extends Omit<React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>, "className"> {
  className?: string;
  viewportClassName?: string;
  scrollbar?: "vertical" | "horizontal" | "both";
}

export function ScrollArea({
  className = "",
  viewportClassName = "",
  scrollbar = "vertical",
  children,
  ...rest
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      className={`rounded-[var(--radius-medium-3)] border border-[var(--neutral-3)] bg-[var(--neutral-1)] overflow-hidden ${className}`}
      {...rest}
    >
      <ScrollAreaPrimitive.Viewport className={`w-full h-full ${viewportClassName}`}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(scrollbar === "vertical" || scrollbar === "both") && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-[var(--neutral-2)] transition-colors w-2.5"
        >
          <ScrollAreaPrimitive.Thumb className="flex-1 bg-[var(--neutral-4)] rounded-full relative" />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      {(scrollbar === "horizontal" || scrollbar === "both") && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          className="flex flex-col select-none touch-none p-0.5 bg-[var(--neutral-2)] transition-colors h-2.5"
        >
          <ScrollAreaPrimitive.Thumb className="flex-1 bg-[var(--neutral-4)] rounded-full relative" />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      <ScrollAreaPrimitive.Corner className="bg-[var(--neutral-2)]" />
    </ScrollAreaPrimitive.Root>
  );
}
