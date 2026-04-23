export type ButtonSize = "1" | "2" | "3" | "4";
export type ButtonVariant = "solid" | "soft" | "outline" | "surface" | "ghost" | "classic";

const sizeClasses: Record<ButtonSize, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
  "4": "h-12 px-[var(--spacing-5)] text-[length:var(--font-size-4)] rounded-[var(--radius-medium-4)]",
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-[var(--accent-9)] text-white hover:bg-[var(--accent-10)]",
  soft: "bg-[var(--accent-3)] text-[var(--accent-11)] hover:bg-[var(--accent-4)]",
  outline: "border border-[var(--accent-7)] text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
  surface: "bg-[var(--accent-2)] border border-[var(--accent-6)] text-[var(--accent-11)] hover:bg-[var(--accent-3)]",
  ghost: "text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-11)] shadow-sm hover:bg-[var(--neutral-1)]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({ size = "2", variant = "solid", className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-[var(--spacing-2)] font-medium cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
