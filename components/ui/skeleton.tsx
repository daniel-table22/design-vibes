interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  pulse?: boolean;
}

export function Skeleton({ pulse = true, className = "", ...rest }: SkeletonProps) {
  return (
    <div
      className={`rounded bg-[var(--neutral-3)] ${pulse ? "animate-pulse" : ""} ${className}`}
      {...rest}
    />
  );
}
