export type TextAreaSize = "1" | "2" | "3";
export type TextAreaVariant = "classic" | "surface" | "soft";
export type TextAreaResize = "none" | "vertical" | "both";

const sizeClasses: Record<TextAreaSize, string> = {
  "1": "text-[length:var(--font-size-1)] rounded-[var(--radius-medium-2)] px-[var(--spacing-2)] py-[var(--spacing-1)]",
  "2": "text-[length:var(--font-size-2)] rounded-[var(--radius-medium-3)] px-[var(--spacing-3)] py-[var(--spacing-2)]",
  "3": "text-[length:var(--font-size-3)] rounded-[var(--radius-medium-4)] px-[var(--spacing-4)] py-[var(--spacing-3)]",
};

const variantClasses: Record<TextAreaVariant, string> = {
  classic: "bg-[var(--neutral-1)] border border-[var(--neutral-4)] text-[var(--neutral-12)] shadow-sm",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] text-[var(--neutral-12)]",
  soft: "bg-[var(--neutral-2)] border-transparent text-[var(--neutral-12)]",
};

const resizeClasses: Record<TextAreaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
};

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: TextAreaSize;
  variant?: TextAreaVariant;
  resize?: TextAreaResize;
}

export function TextArea({
  size = "2",
  variant = "classic",
  resize = "vertical",
  className = "",
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      className={`outline-none focus:border-[var(--neutral-5)] transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${resizeClasses[resize]} ${className}`}
      {...rest}
    />
  );
}
