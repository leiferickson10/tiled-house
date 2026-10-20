import SiteNav from "./SiteNav";

/** Shared frame for the shop pages (cart, checkout, order confirmation). */
export default function PageShell({
  current,
  title,
  children,
}: {
  current: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex min-h-screen flex-col bg-[#f9f8f0] text-[#4a1d31]"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <SiteNav current={current} />
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <h1
          className="mb-10 text-5xl text-[#b15356] sm:text-6xl"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.026em",
          }}
        >
          {title}
        </h1>
        {children}
      </div>
    </main>
  );
}
