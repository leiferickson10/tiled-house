import { NextResponse } from "next/server";
import { isLocalDeliveryCode } from "../../lib/localDelivery";

/**
 * Lets the cart page check a local-delivery code right away. It only says
 * valid / not valid; checkout checks the code again before giving free shipping.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { code?: unknown } | null;
  return NextResponse.json({ valid: isLocalDeliveryCode(body?.code) });
}
