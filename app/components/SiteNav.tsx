import Link from "next/link";
import CartLink from "./CartLink";

const NAV = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT US", href: "/#about" },
  { label: "DESIGN YOUR OWN", href: "/custom" },
];

export default function SiteNav({ current }: { current: string }) {
  return (
    <nav className="flex min-h-14 flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-[#d3c467] px-4 py-2 text-sm sm:gap-x-9 sm:text-lg">
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            item.href === current ? "text-white" : "text-white/70 hover:text-white"
          }
        >
          {item.label}
        </Link>
      ))}
      <CartLink active={current === "/cart"} />
    </nav>
  );
}
