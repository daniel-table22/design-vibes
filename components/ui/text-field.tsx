export type TextFieldSize = "1" | "2" | "3";
export type TextFieldVariant = "classic" | "surface" | "soft";

const sizeClasses: Record<TextFieldSize, string> = {
  "1": "h-6 px-[var(--spacing-2)] text-[length:var(--font-size-1)] rounded-[var(--radius-medium-1)]",
  "2": "h-8 px-[var(--spacing-3)] text-[length:var(--font-size-2)] rounded-[var(--radius-medium-2)]",
  "3": "h-10 px-[var(--spacing-4)] text-[length:var(--font-size-3)] rounded-[var(--radius-medium-3)]",
};

const variantClasses: Record<TextFieldVariant, string> = {
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] text-[var(--neutral-12)] shadow-sm",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-12)]",
  soft: "bg-[var(--neutral-2)] border-transparent text-[var(--neutral-12)]",
};

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: TextFieldSize;
  variant?: TextFieldVariant;
}

export function TextField({ size = "2", variant = "classic", className = "", ...rest }: TextFieldProps) {
  return (
    <input
      className={`outline-none focus:border-[var(--neutral-5)] transition-colors border ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    />
  );
}
