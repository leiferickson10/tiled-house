import Link from "next/link";
import CartLink from "./CartLink";

// On phones the menu has to fit on one line, so some items get a short label
// ("CUSTOM" instead of "DESIGN YOUR OWN") and, on the shop pages only, "ABOUT US"
// is hidden. Tablets and desktops always show the full menu.
const NAV = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT US", href: "/#about", hideOnPhoneInShop: true },
  { label: "DESIGN YOUR OWN", shortLabel: "CUSTOM", href: "/custom" },
];

export default function SiteNav({ current }: { current: string }) {
  const inShop = current === "/shop"; // the shop and every product page
  return (
    <nav className="flex min-h-14 flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-[#d3c467] px-4 py-2 text-sm sm:gap-x-9 sm:text-lg">
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            item.href === current ? "text-white" : "text-white/70 hover:text-white"
          } ${item.hideOnPhoneInShop && inShop ? "hidden sm:inline" : ""}`}
        >
          {item.shortLabel ? (
            <>
              <span className="sm:hidden">{item.shortLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </>
          ) : (
            item.label
          )}
        </Link>
      ))}
      <CartLink active={current === "/cart"} />
    </nav>
  );
}
