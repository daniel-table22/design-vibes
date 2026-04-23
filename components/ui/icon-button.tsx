export type IconButtonSize = "1" | "2" | "3" | "4";
export type IconButtonVariant = "solid" | "soft" | "outline" | "surface" | "ghost";

const sizeClasses: Record<IconButtonSize, string> = {
  "1": "w-6 h-6 text-[12px] rounded-[var(--radius-medium-1)]",
  "2": "w-8 h-8 text-[14px] rounded-[var(--radius-medium-2)]",
  "3": "w-10 h-10 text-[16px] rounded-[var(--radius-medium-3)]",
  "4": "w-12 h-12 text-[20px] rounded-[var(--radius-medium-4)]",
};

const variantClasses: Record<IconButtonVariant, string> = {
  solid: "bg-[var(--accent-9)] text-white hover:bg-[var(--accent-10)]",
  soft: "bg-[var(--accent-3)] text-[var(--accent-11)] hover:bg-[var(--accent-4)]",
  outline: "border border-[var(--accent-7)] text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
  surface: "bg-[var(--accent-2)] border border-[var(--accent-6)] text-[var(--accent-11)]",
  ghost: "text-[var(--accent-11)] bg-transparent hover:bg-[var(--accent-2)]",
};

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
}

export function IconButton({ size = "2", variant = "solid", className = "", children, ...rest }: IconButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center cursor-pointer transition-colors font-bold leading-none disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
