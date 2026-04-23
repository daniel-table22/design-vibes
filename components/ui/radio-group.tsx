"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Radio, type RadioSize } from "./radio";

interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "className"> {
  size?: RadioSize;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function RadioGroup({
  size = "2",
  orientation = "vertical",
  className = "",
  children,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      orientation={orientation}
      className={`flex gap-[var(--spacing-2)] ${orientation === "horizontal" ? "flex-row items-center" : "flex-col"} ${className}`}
      {...rest}
    >
      {/* Children should be <RadioGroupItem> instances. size context is passed via data attribute. */}
      <RadioGroupSizeContext.Provider value={size}>{children}</RadioGroupSizeContext.Provider>
    </RadioGroupPrimitive.Root>
  );
}

import { createContext, useContext } from "react";
const RadioGroupSizeContext = createContext<RadioSize>("2");

interface RadioGroupItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export function RadioGroupItem({ value, children, className = "" }: RadioGroupItemProps) {
  const size = useContext(RadioGroupSizeContext);
  return (
    <label className={`flex items-center gap-[var(--spacing-2)] cursor-pointer select-none ${className}`}>
      <Radio size={size} value={value} />
      <span className="text-[length:var(--font-size-2)] text-[var(--neutral-10)]">{children}</span>
    </label>
  );
}
