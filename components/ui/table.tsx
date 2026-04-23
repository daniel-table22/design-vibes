export type TableVariant = "ghost" | "surface";

const variantClasses: Record<TableVariant, string> = {
  ghost: "bg-transparent",
  surface: "bg-[var(--neutral-1)] border border-[var(--neutral-3)] rounded-[var(--radius-medium-3)] overflow-hidden",
};

interface TableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TableVariant;
}

export function Table({ variant = "surface", className = "", children, ...rest }: TableRootProps) {
  return (
    <div
      className={`w-full text-[length:var(--font-size-1)] ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function TableHeader({ className = "", ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} {...rest} />;
}

export function TableBody({ className = "", ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...rest} />;
}

export function TableRow({ className = "", header = false, ...rest }: React.HTMLAttributes<HTMLTableRowElement> & { header?: boolean }) {
  return (
    <tr
      className={`${header ? "border-b border-[var(--neutral-3)] bg-[var(--neutral-1)]" : "border-b border-[var(--neutral-2)] last:border-0"} ${className}`}
      {...rest}
    />
  );
}

export function TableHead({ className = "", ...rest }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-[var(--spacing-3)] py-2 text-left font-medium text-[var(--neutral-8)] ${className}`}
      {...rest}
    />
  );
}

export function TableCell({ className = "", ...rest }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`px-[var(--spacing-3)] py-2 text-[var(--neutral-12)] ${className}`} {...rest} />;
}
