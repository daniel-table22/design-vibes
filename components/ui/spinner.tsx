export type SpinnerSize = "1" | "2" | "3" | "4" | "5";

const sizeClasses: Record<SpinnerSize, string> = {
  "1": "w-3 h-3 border-[1.5px]",
  "2": "w-4 h-4 border-2",
  "3": "w-5 h-5 border-2",
  "4": "w-6 h-6 border-[2.5px]",
  "5": "w-8 h-8 border-[3px]",
};

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function Spinner({ size = "3", className = "" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`rounded-full border-[var(--neutral-3)] border-t-[var(--accent-9)] animate-spin ${sizeClasses[size]} ${className}`}
      style={{ borderTopColor: "var(--accent-9)" }}
    />
  );
}
