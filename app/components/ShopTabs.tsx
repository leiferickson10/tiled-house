import Link from "next/link";

const TABS = [
  { key: "coasters", label: "Coasters", href: "/shop" },
  { key: "mosaics", label: "Mosaics", href: "/mosaics" },
] as const;

/** Switch between the two parts of the shop: ready-made coasters and mosaics. */
export default function ShopTabs({ current }: { current: "coasters" | "mosaics" }) {
  return (
    <nav aria-label="Shop sections" className="mb-8 flex gap-2">
      {TABS.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          aria-current={t.key === current ? "page" : undefined}
          className={`rounded-full border border-[#b15356] px-5 py-2 text-sm font-bold transition ${
            t.key === current
              ? "bg-[#b15356] text-[#f9f8f0]"
              : "text-[#b15356] hover:bg-[#b15356]/10"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
