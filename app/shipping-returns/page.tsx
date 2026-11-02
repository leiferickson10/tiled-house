import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { SHIPPING_CENTS, formatUsd } from "../lib/shop";
import { CONTACT_EMAIL, PROCESSING_DAYS, RETURN_WINDOW_DAYS } from "../lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns — Tiled House",
  description: `Tiled House coasters ship within ${PROCESSING_DAYS} business days. Learn about shipping costs and how returns work.`,
  alternates: { canonical: "/shipping-returns" },
};

const H2 = "mt-10 mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]";
const linkClass = "font-bold underline underline-offset-4 hover:text-[#b15356]";

export default function ShippingReturnsPage() {
  return (
    <PageShell current="/" title="Shipping & Returns">
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
        <p>
          Every Tiled House coaster is made by hand, so we take a little time to get each one
          right.
        </p>

        <h2 className={H2}>Making &amp; shipping</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Orders ship within <strong>{PROCESSING_DAYS} business days</strong> of your payment.
          </li>
          <li>
            We ship to addresses in the <strong>United States</strong>.
          </li>
          <li>
            Shipping is a flat <strong>{formatUsd(SHIPPING_CENTS)}</strong> per order. Sales tax is
            calculated at checkout from your shipping address.
          </li>
          <li>Delivery time after shipping depends on the carrier and your location.</li>
        </ul>

        <h2 className={H2}>Returns</h2>
        <p>
          We want you to love your coasters. If something isn&rsquo;t right, we&rsquo;ll make it
          right.
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            When your coasters arrive, check them over. If anything is damaged, defective or not
            what you ordered, take photos.
          </li>
          <li>
            Email the photos and your order reference (from your confirmation email) to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>{" "}
            within <strong>{RETURN_WINDOW_DAYS} days</strong> of delivery.
          </li>
          <li>
            We&rsquo;ll review your photos and reply with next steps and return instructions.
          </li>
          <li>
            For a refund, send the coasters back to us. Once we receive them, we&rsquo;ll refund
            your original payment method.
          </li>
        </ol>

        <h2 className={H2}>Questions?</h2>
        <p>
          Reach us any time on the{" "}
          <Link href="/contact" className={linkClass}>
            contact page
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
