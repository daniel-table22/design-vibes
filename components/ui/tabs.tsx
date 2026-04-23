"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createContext, useContext } from "react";

export type TabsSize = "1" | "2";
export type TabsVariant = "line" | "enclosed";

const variantStyles: Record<TabsVariant, { list: string; trigger: string; activeTrigger: string }> = {
  line: {
    list: "flex border-b border-[var(--neutral-3)]",
    trigger:
      "px-[var(--spacing-3)] py-2 text-[var(--neutral-8)] border-b-2 border-transparent hover:text-[var(--neutral-10)] transition-colors cursor-pointer -mb-px",
    activeTrigger:
      "data-[state=active]:border-[var(--accent-9)] data-[state=active]:text-[var(--accent-11)] data-[state=active]:font-medium",
  },
  enclosed: {
    list: "flex gap-1 p-1 bg-[var(--neutral-2)] rounded-[var(--radius-medium-3)]",
    trigger:
      "px-[var(--spacing-3)] py-1.5 text-[var(--neutral-8)] rounded-[var(--radius-medium-2)] hover:text-[var(--neutral-10)] transition-colors cursor-pointer",
    activeTrigger:
      "data-[state=active]:bg-[var(--neutral-1)] data-[state=active]:text-[var(--neutral-12)] data-[state=active]:font-medium data-[state=active]:shadow-sm",
  },
};

type TabsCtx = { size: TabsSize; variant: TabsVariant };
const Ctx = createContext<TabsCtx>({ size: "1", variant: "line" });

interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "className"> {
  size?: TabsSize;
  variant?: TabsVariant;
  className?: string;
}

export function Tabs({ size = "1", variant = "line", className = "", children, ...rest }: TabsProps) {
  return (
    <Ctx.Provider value={{ size, variant }}>
      <TabsPrimitive.Root className={className} {...rest}>
        {children}
      </TabsPrimitive.Root>
    </Ctx.Provider>
  );
}

export function TabsList({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  const { variant, size } = useContext(Ctx);
  const fontSize = size === "1" ? "text-[length:var(--font-size-1)]" : "text-[length:var(--font-size-2)]";
  return <TabsPrimitive.List className={`${variantStyles[variant].list} ${fontSize} ${className}`} {...rest} />;
}

export function TabsTrigger({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  const { variant } = useContext(Ctx);
  return (
    <TabsPrimitive.Trigger
      className={`${variantStyles[variant].trigger} ${variantStyles[variant].activeTrigger} ${className}`}
      {...rest}
    />
  );
}

export function TabsContent({
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  const { size } = useContext(Ctx);
  const fontSize = size === "1" ? "text-[length:var(--font-size-1)]" : "text-[length:var(--font-size-2)]";
  return (
    <TabsPrimitive.Content
      className={`pt-[var(--spacing-3)] ${fontSize} text-[var(--neutral-9)] ${className}`}
      {...rest}
    />
  );
}
