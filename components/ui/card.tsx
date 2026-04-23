export type CardSize = "1" | "2" | "3";
export type CardVariant = "surface" | "classic" | "ghost";

const sizeClasses: Record<CardSize, string> = {
  "1": "p-[var(--spacing-3)] rounded-[var(--radius-medium-3)]",
  "2": "p-[var(--spacing-4)] rounded-[var(--radius-medium-4)]",
  "3": "p-[var(--spacing-5)] rounded-[var(--radius-medium-5)]",
};

const variantClasses: Record<CardVariant, string> = {
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] shadow-sm",
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] shadow-[0_2px_4px_rgba(0,0,0,0.08)]",
  ghost: "bg-transparent",
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  variant?: CardVariant;
}

export function Card({ size = "2", variant = "surface", className = "", children, ...rest }: CardProps) {
  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
