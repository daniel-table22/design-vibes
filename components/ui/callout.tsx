export type CalloutSize = "1" | "2" | "3";
export type CalloutVariant = "soft" | "surface" | "outline";

const sizeClasses: Record<CalloutSize, string> = {
  "1": "p-[var(--spacing-3)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-3)] gap-[var(--spacing-2)]",
  "2": "p-[var(--spacing-4)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-4)] gap-[var(--spacing-3)]",
  "3": "p-[var(--spacing-5)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-5)] gap-[var(--spacing-3)]",
};

const variantClasses: Record<CalloutVariant, string> = {
  soft: "bg-[var(--color-blue-3)] text-[var(--color-blue-11)]",
  surface: "bg-[var(--color-blue-2)] border border-[var(--color-blue-6)] text-[var(--color-blue-11)]",
  outline: "border border-[var(--color-blue-7)] text-[var(--color-blue-11)] bg-transparent",
};

interface CalloutProps {
  size?: CalloutSize;
  variant?: CalloutVariant;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Callout({ size = "2", variant = "soft", icon, children, className = "" }: CalloutProps) {
  return (
    <div className={`flex items-start ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {icon && <span className="text-base leading-none mt-0.5 shrink-0">{icon}</span>}
      <div className="leading-[var(--line-height-2)]">{children}</div>
    </div>
  );
}
