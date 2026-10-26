import { NextRequest, NextResponse } from "next/server";

// TODO: send these to the email list (Mailchimp/Klaviyo/Resend audience),
// tagged by `source`. Like /api/notify, it only validates and logs for now,
// so signups are visible in the Vercel function logs but not stored elsewhere.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 40) : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  console.log("Newsletter signup:", { email, source });

  return NextResponse.json({ ok: true });
}
