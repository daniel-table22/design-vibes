"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Checkbox, type CheckboxSize, type CheckboxVariant } from "./checkbox";

type CheckboxGroupContextValue = {
  value: string[];
  toggle: (v: string) => void;
  size: CheckboxSize;
  variant: CheckboxVariant;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  orientation?: "vertical" | "horizontal";
  children?: React.ReactNode;
  className?: string;
}

export function CheckboxGroup({
  value,
  defaultValue = [],
  onValueChange,
  size = "2",
  variant = "classic",
  orientation = "vertical",
  children,
  className = "",
}: CheckboxGroupProps) {
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

  const ctx = useMemo(() => ({ value: current, toggle, size, variant }), [current, toggle, size, variant]);

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div
        className={`flex gap-[var(--spacing-2)] ${orientation === "horizontal" ? "flex-row items-center" : "flex-col"} ${className}`}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

interface CheckboxGroupItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export function CheckboxGroupItem({ value, children, className = "" }: CheckboxGroupItemProps) {
  const ctx = useContext(CheckboxGroupContext);
  if (!ctx) throw new Error("CheckboxGroupItem must be used within CheckboxGroup");
  const checked = ctx.value.includes(value);
  return (
    <label className={`flex items-center gap-[var(--spacing-2)] cursor-pointer select-none ${className}`}>
      <Checkbox
        size={ctx.size}
        variant={ctx.variant}
        checked={checked}
        onCheckedChange={() => ctx.toggle(value)}
      />
      <span className="text-[length:var(--font-size-2)] text-[var(--neutral-10)]">{children}</span>
    </label>
  );
}
