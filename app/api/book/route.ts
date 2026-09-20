import { NextRequest, NextResponse } from "next/server";

// TODO: wire this up to an actual destination — e.g. Resend/SendGrid for
// email, or write to a database/Google Sheet. For now it just validates
// and logs the submission so the form is fully functional end-to-end.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, crafters, craft, notes } = body ?? {};

  if (!name || !email || !craft) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  console.log("New booking request:", { name, email, crafters, craft, notes });

  return NextResponse.json({ ok: true });
}
