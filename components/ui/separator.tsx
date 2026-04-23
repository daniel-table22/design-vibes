import * as SeparatorPrimitive from "@radix-ui/react-separator";

export type SeparatorColor = "gray" | "accent";

const colorClasses: Record<SeparatorColor, string> = {
  gray: "bg-[var(--neutral-3)]",
  accent: "bg-[var(--accent-6)]",
};

interface SeparatorProps extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, "className"> {
  color?: SeparatorColor;
  className?: string;
}

export function Separator({ orientation = "horizontal", color = "gray", className = "", ...rest }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      className={`${colorClasses[color]} ${orientation === "vertical" ? "w-px h-full" : "h-px w-full"} ${className}`}
      {...rest}
    />
  );
}
