export type BadgeSize = "1" | "2" | "3";
export type BadgeVariant = "solid" | "soft" | "outline" | "surface";

const sizeClasses: Record<BadgeSize, string> = {
  "1": "px-[var(--spacing-1)] py-[1px] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "px-[var(--spacing-2)] py-[2px] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "px-[var(--spacing-3)] py-[4px] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
};

const variantClasses: Record<BadgeVariant, string> = {
  solid: "bg-[var(--accent-9)] text-white",
  soft: "bg-[var(--accent-3)] text-[var(--accent-11)]",
  outline: "border border-[var(--accent-7)] text-[var(--accent-11)] bg-transparent",
  surface: "bg-[var(--accent-2)] border border-[var(--accent-6)] text-[var(--accent-11)]",
};

interface BadgeProps {
  size?: BadgeSize;
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ size = "2", variant = "solid", children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
