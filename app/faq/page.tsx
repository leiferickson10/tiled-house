import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import PageShell from "../components/PageShell";
import Link from "next/link";
import { CONTACT_EMAIL, PROCESSING_DAYS, RETURN_WINDOW_DAYS } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ — Tiled House",
  description:
    "Answers about Tiled House coasters: shipping, returns, discounts, custom designs and more.",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: string; link?: { href: string; label: string } };

// Every answer is built from the same constants the shop and checkout use, so
// the FAQ can't drift out of date when a price, limit or discount changes.
const FAQS: Faq[] = [
  {
    q: "How long until my order ships?",
    a: `Every coaster is made by hand. Orders ship within ${PROCESSING_DAYS} business days of payment. Delivery time after that depends on the carrier and your location.`,
  },

  {
    q: "What are the coasters made of, and how big are they?",
    a: `Each coaster is a 4 by 4 grid of glass mosaic tiles, about 4 inches square, mounted on a wood backing with felt feet. Colors on a screen can look slightly different from the real glass.`,
  },
  {
    q: "Can I design my own coaster?",
    a: `Yes. In Design Your Own you choose a tile color for each of the 16 spots, then add your coaster to the cart.`,
    link: { href: "/custom", label: "Design your own" },
  },


  {
    q: "What if something arrives damaged or isn't right?",
    a: `Take photos when your coasters arrive and email them, with your order reference, to ${CONTACT_EMAIL} within ${RETURN_WINDOW_DAYS} days of delivery. We'll reply with next steps. If you'd like a refund, send the coasters back to us and we'll refund your original payment method once we receive them.`,
    link: { href: "/shipping-returns", label: "Shipping & returns" },
  },
  {
    q: "How do I pay, and is it secure?",
    a: `Checkout is handled by Stripe, which accepts major credit and debit cards. Your card details go directly to Stripe, so we never see or store your card number.`,
  },
  {
    q: "I didn't get my confirmation email.",
    a: `You should receive an order confirmation right after you pay. Check your spam or junk folder first. If it isn't there, email us at ${CONTACT_EMAIL} with the name you ordered under and we'll sort it out.`,
  },

];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <PageShell current="/" title="FAQ">
      <JsonLd data={faqJsonLd} />
      <div className="max-w-2xl">
        <p className="mb-8 text-lg text-[#4a1d31]/80">
          Quick answers about ordering, shipping and returns. Can&rsquo;t find yours?{" "}
          <Link href="/contact" className="font-bold underline underline-offset-4 hover:text-[#b15356]">
            Get in touch
          </Link>
          .
        </p>
        <div className="divide-y divide-[#4a1d31]/15 border-y border-[#4a1d31]/15">
          {FAQS.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none text-[#b15356] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-5 text-lg leading-relaxed text-[#4a1d31]/90">
                <p>{f.a}</p>
                {f.link && (
                  <p className="mt-3">
                    <Link
                      href={f.link.href}
                      className="font-bold underline underline-offset-4 hover:text-[#b15356]"
                    >
                      {f.link.label}
                    </Link>
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
