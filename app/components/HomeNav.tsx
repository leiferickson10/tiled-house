/*
 * Top nav for the home page, shared by the desktop and phone layouts: plain
 * links on the left and the call-to-action link (SHOP) as a rose pill on the
 * right. On phones everything shrinks to stay on one row where it can.
 */

type NavLink = { label: string; href: string; active?: boolean; cta?: boolean };

const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;

export default function HomeNav({ links }: { links: NavLink[] }) {
  const plain = links.filter((l) => !l.cta);
  const cta = links.filter((l) => l.cta);
  return (
    <nav aria-label="Main" style={{ background: "#d3c467" }}>
      <div
        className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-8 md:min-h-16"
        style={DM}
      >
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:gap-x-5 sm:text-base md:gap-x-9 md:text-[clamp(16px,1.6vw,24px)]">
          {plain.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={l.active ? "text-white" : "text-white/75 hover:text-white"}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {cta.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-4 py-1.5 text-base font-semibold tracking-wide transition-transform hover:-translate-y-0.5 md:px-6 md:py-2 md:text-[clamp(18px,1.9vw,28px)]"
            style={{
              background: "#b15356",
              color: "#f9f8f0",
              boxShadow: "0 1px 4px rgba(74,29,49,0.3)",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
