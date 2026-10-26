import { NextRequest, NextResponse } from "next/server";

// TODO: wire this up to an actual destination (Resend/Mailchimp/a Google
// Sheet). Like /api/book, it only validates and logs for now, so signups are
// visible in the Vercel function logs but not stored anywhere else.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const item = typeof body?.item === "string" ? body.item.slice(0, 40) : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  console.log("Coming-soon notify signup:", { email, item });

  return NextResponse.json({ ok: true });
}
