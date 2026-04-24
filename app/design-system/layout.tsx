export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--neutral-2)",
        color: "var(--neutral-12)",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
