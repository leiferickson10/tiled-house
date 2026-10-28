/*
 * Top nav for the home page, shared by the desktop and phone layouts: just the
 * centered links. On phones they wrap onto extra rows if they don't fit.
 */

type NavLink = { label: string; href: string; active?: boolean };

const DM = { fontFamily: "var(--font-dm-sans), sans-serif" } as const;

export default function HomeNav({ links }: { links: NavLink[] }) {
  return (
    <nav aria-label="Main" style={{ background: "#d3c467" }}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-center px-4 py-2 sm:px-8 md:min-h-16">
        <ul
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-base md:gap-x-9 md:text-[clamp(16px,1.6vw,24px)]"
          style={DM}
        >
          {links.map((l) => (
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
      </div>
    </nav>
  );
}
