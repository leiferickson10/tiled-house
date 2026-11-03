import { CONTACT_EMAIL } from "./site";

/**
 * Emails a message to the shop owner's contact address (CONTACT_EMAIL, or a
 * FORM_NOTIFY_EMAIL env var if set) through Resend, using the same sender as the
 * order emails. Used by the newsletter, "coming soon" notify and booking forms,
 * so submissions land in your inbox instead of a log.
 *
 * If the email settings aren't present (local development), it logs the message
 * and returns without failing. If Resend rejects the message it THROWS, so the
 * form shows an error and the visitor can try again instead of being told it worked.
 */
export const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** One line, no control characters: safe to put in an email subject. */
export const oneLine = (s: unknown, max = 80) =>
  String(s ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);

export const isEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

export async function sendOwnerNotice(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  // Form messages go to the public contact address (lib/site.ts), not the order inbox.
  const to = process.env.FORM_NOTIFY_EMAIL ?? CONTACT_EMAIL;

  if (!apiKey || !from) {
    console.warn("Form email skipped (RESEND_API_KEY / EMAIL_FROM not set):", opts.subject);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: opts.subject,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#222;max-width:560px">${opts.html}</div>`,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
