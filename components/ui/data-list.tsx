import { createContext, useContext } from "react";

type Orientation = "horizontal" | "vertical";
const DataListCtx = createContext<Orientation>("horizontal");

interface DataListRootProps {
  orientation?: Orientation;
  children?: React.ReactNode;
  className?: string;
}

export function DataList({ orientation = "horizontal", children, className = "" }: DataListRootProps) {
  return (
    <DataListCtx.Provider value={orientation}>
      <dl className={`flex flex-col gap-[var(--spacing-2)] ${className}`}>{children}</dl>
    </DataListCtx.Provider>
  );
}

interface DataListItemProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function DataListItem({ label, children, className = "" }: DataListItemProps) {
  const orientation = useContext(DataListCtx);
  const isHoriz = orientation === "horizontal";
  return (
    <div className={`${isHoriz ? "flex items-center gap-[var(--spacing-4)]" : "flex flex-col gap-[1px]"} ${className}`}>
      <dt className="text-[length:var(--font-size-1)] font-medium text-[var(--neutral-8)] uppercase tracking-wide min-w-[64px]">
        {label}
      </dt>
      <dd className="text-[length:var(--font-size-2)] text-[var(--neutral-12)]">{children}</dd>
    </div>
  );
}
