export type InsetSide = "all" | "top" | "bottom" | "left" | "right";

const clipClasses: Record<InsetSide, string> = {
  all: "rounded-[var(--radius-medium-3)]",
  top: "rounded-t-[var(--radius-medium-3)]",
  bottom: "rounded-b-[var(--radius-medium-3)]",
  left: "rounded-l-[var(--radius-medium-3)]",
  right: "rounded-r-[var(--radius-medium-3)]",
};

const marginClasses: Record<InsetSide, string> = {
  all: "-m-[var(--spacing-3)]",
  top: "-mt-[var(--spacing-3)] -mx-[var(--spacing-3)]",
  bottom: "-mb-[var(--spacing-3)] -mx-[var(--spacing-3)]",
  left: "-ml-[var(--spacing-3)] -my-[var(--spacing-3)]",
  right: "-mr-[var(--spacing-3)] -my-[var(--spacing-3)]",
};

interface InsetProps {
  side?: InsetSide;
  children?: React.ReactNode;
  className?: string;
}

export function Inset({ side = "all", children, className = "" }: InsetProps) {
  return <div className={`${clipClasses[side]} ${marginClasses[side]} overflow-hidden ${className}`}>{children}</div>;
}
