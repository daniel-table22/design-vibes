import Link from "next/link";
import { prototypes } from "@/lib/prototypes";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Design Vibes</h1>
      <ul className="space-y-2">
        {prototypes.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/prototypes/${p.slug}`}
              className="underline hover:opacity-70"
            >
              {p.name}
            </Link>
            {p.description && (
              <span className="ml-3 text-sm text-gray-500">{p.description}</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
