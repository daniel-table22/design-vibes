"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export type CheckboxCardsSize = "1" | "2" | "3";

const sizeClasses: Record<CheckboxCardsSize, string> = {
  "1": "p-[var(--spacing-3)] rounded-[var(--radius-medium-2)] gap-[var(--spacing-2)]",
  "2": "p-[var(--spacing-4)] rounded-[var(--radius-medium-3)] gap-[var(--spacing-2)]",
  "3": "p-[var(--spacing-5)] rounded-[var(--radius-medium-4)] gap-[var(--spacing-3)]",
};

const indicatorSize: Record<CheckboxCardsSize, string> = {
  "1": "w-3.5 h-3.5 rounded-[var(--radius-medium-1)]",
  "2": "w-4 h-4 rounded-[var(--radius-medium-2)]",
  "3": "w-5 h-5 rounded-[var(--radius-medium-3)]",
};

type Ctx = {
  value: string[];
  toggle: (v: string) => void;
  size: CheckboxCardsSize;
};

const CheckboxCardsContext = createContext<Ctx | null>(null);

interface CheckboxCardsProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  size?: CheckboxCardsSize;
  columns?: number;
  children?: React.ReactNode;
  className?: string;
}

export function CheckboxCards({
  value,
  defaultValue = [],
  onValueChange,
  size = "2",
  columns = 1,
  children,
  className = "",
}: CheckboxCardsProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const current = controlled ? value! : internal;

  const toggle = useCallback(
    (v: string) => {
      const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    },
    [controlled, current, onValueChange],
  );

  const ctx = useMemo(() => ({ value: current, toggle, size }), [current, toggle, size]);
  return (
    <CheckboxCardsContext.Provider value={ctx}>
      <div
        className={`grid gap-[var(--spacing-2)] ${className}`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    </CheckboxCardsContext.Provider>
  );
}

interface CheckboxCardsItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export function CheckboxCardsItem({ value, children, className = "" }: CheckboxCardsItemProps) {
  const ctx = useContext(CheckboxCardsContext);
  if (!ctx) throw new Error("CheckboxCardsItem must be used within CheckboxCards");
  const checked = ctx.value.includes(value);
  return (
    <label
      className={[
        "flex items-start cursor-pointer transition-colors border",
        "bg-[var(--neutral-1)]",
        checked ? "border-[var(--accent-9)] ring-1 ring-[var(--accent-9)]" : "border-[var(--neutral-4)] hover:border-[var(--neutral-5)]",
        sizeClasses[ctx.size],
        className,
      ].join(" ")}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={() => ctx.toggle(value)}
        className={`flex items-center justify-center shrink-0 mt-0.5 transition-colors focus:outline-none border-2 border-[var(--neutral-5)] data-[state=checked]:bg-[var(--accent-9)] data-[state=checked]:border-[var(--accent-9)] ${indicatorSize[ctx.size]}`}
      >
        <CheckboxPrimitive.Indicator>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div className="flex-1 text-[length:var(--font-size-2)] text-[var(--neutral-12)]">{children}</div>
    </label>
  );
}
