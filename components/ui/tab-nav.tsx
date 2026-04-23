"use client";

export type TabNavSize = "1" | "2";

const fontSize: Record<TabNavSize, string> = {
  "1": "text-[length:var(--font-size-1)]",
  "2": "text-[length:var(--font-size-2)]",
};

interface TabNavProps extends React.HTMLAttributes<HTMLElement> {
  size?: TabNavSize;
}

export function TabNav({ size = "1", className = "", children, ...rest }: TabNavProps) {
  return (
    <nav
      className={`flex border-b border-[var(--neutral-3)] ${fontSize[size]} ${className}`}
      {...rest}
    >
      {children}
    </nav>
  );
}

interface TabNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export function TabNavLink({ active = false, className = "", children, ...rest }: TabNavLinkProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={[
        "px-[var(--spacing-3)] py-2 border-b-2 -mb-px transition-colors cursor-pointer",
        active
          ? "border-[var(--accent-9)] text-[var(--accent-11)] font-medium"
          : "border-transparent text-[var(--neutral-8)] hover:text-[var(--neutral-10)]",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </a>
  );
}
