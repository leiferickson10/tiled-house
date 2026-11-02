import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import { CONTACT_EMAIL } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Tiled House",
  description: "How Tiled House collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

const H2 = "mt-10 mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b15356]";
const linkClass = "font-bold underline underline-offset-4 hover:text-[#b15356]";

export default function PrivacyPage() {
  return (
    <PageShell current="/" title="Privacy Policy">
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
        <p className="text-base text-[#4a1d31]/70">Last updated: November 2026</p>
        <p>
          This policy explains what information Tiled House (&ldquo;we&rdquo;) collects when you
          use tiledhouse.com, and how we use it.
        </p>

        <h2 className={H2}>What we collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Order information:</strong> your name, email, phone number, billing and
            shipping address, and what you ordered.
          </li>
          <li>
            <strong>Payment details:</strong> entered directly with our payment processor,
            Stripe. We never see or store your full card number.
          </li>
          <li>
            <strong>Email signups and messages:</strong> your email address if you join our list,
            ask to be notified about a product, or contact us.
          </li>
          <li>
            <strong>Your cart:</strong> saved in your own browser so it&rsquo;s there when you
            come back. It stays on your device.
          </li>
        </ul>

        <h2 className={H2}>How we use it</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To make, ship and deliver your order, and email you about it.</li>
          <li>To calculate sales tax and prevent fraud.</li>
          <li>To reply to your questions.</li>
          <li>To send news about new pieces, sales and blog posts, only if you signed up.</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2 className={H2}>Who we share it with</h2>
        <p>We share information only with the services that help us run the shop:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Stripe, for payments, receipts and tax calculation.</li>
          <li>Resend, to send our order and email messages.</li>
          <li>Vercel, which hosts this website.</li>
          <li>Shipping carriers, so your order can be delivered.</li>
        </ul>
        <p>These providers handle your data under their own privacy policies.</p>

        <h2 className={H2}>Your choices</h2>
        <p>
          You can unsubscribe from marketing emails at any time, and you can ask us to see,
          correct or delete the information we hold about you. Email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          . We may need to keep order records for tax and accounting.
        </p>

        <h2 className={H2}>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
