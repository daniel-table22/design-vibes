import Link from "next/link";
import { prototypes } from "@/lib/prototypes";

export default function Home() {
  return (
    <main
      className="p-8 min-h-screen"
      style={{ background: "var(--neutral-2)", color: "var(--neutral-12)" }}
    >
      <h1 className="text-2xl font-semibold mb-6">Design Vibes</h1>

      <section className="mb-8">
        <h2
          className="text-xs font-medium uppercase tracking-wide mb-2"
          style={{ color: "var(--neutral-9)" }}
        >
          System
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/design-system"
              className="text-sm transition-colors"
              style={{ color: "var(--neutral-12)" }}
            >
              Design System
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2
          className="text-xs font-medium uppercase tracking-wide mb-2"
          style={{ color: "var(--neutral-9)" }}
        >
          Prototypes
        </h2>
        <ul className="space-y-1">
          {prototypes.map((p) => (
            <li key={p.slug} className="flex items-baseline gap-3">
              <Link
                href={`/prototypes/${p.slug}`}
                className="text-sm transition-colors"
                style={{ color: "var(--neutral-12)" }}
              >
                {p.name}
              </Link>
              {p.description && (
                <span className="text-xs" style={{ color: "var(--neutral-9)" }}>
                  {p.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
