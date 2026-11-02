import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { CONTACT_EMAIL } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact — Tiled House",
  description:
    "Questions about an order or a custom coaster? Email Tiled House or message us on Instagram or Facebook.",
  alternates: { canonical: "/contact" },
};

const linkClass = "font-bold underline underline-offset-4 hover:text-[#b15356]";

export default function ContactPage() {
  return (
    <PageShell current="/" title="Contact">
      <div className="max-w-xl space-y-6 text-lg">
        <p>
          Questions about an order, a custom coaster, or anything else? We&rsquo;d love to hear
          from you.
        </p>
        <div className="rounded-lg border-t-4 border-[#ddcd71] bg-[#f3ede3] p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">Email</h2>
          <p className="mt-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <h2 className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]">
            Social
          </h2>
          <p className="mt-2 space-x-5">
            <a
              href="https://www.instagram.com/tiledhouse.co"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/tiledhouse.co"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Facebook
            </a>
          </p>
        </div>
        <p className="text-base text-[#4a1d31]/70">
          Please include your order reference (from your confirmation email) if you&rsquo;re asking
          about an order. You may also find your answer in our{" "}
          <Link href="/faq" className={linkClass}>
            FAQ
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
