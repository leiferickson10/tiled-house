/**
 * SERVER-ONLY. The secret code that gives free shipping to people nearby, whom
 * you deliver to by hand. Never import this file from a component: it would put
 * the code in the browser bundle where anyone could read it.
 *
 * The code is set below (a LOCAL_DELIVERY_CODE env var, if one exists, wins).
 * Matching ignores case and surrounding spaces, so "dropoff", "DROPOFF" and
 * "DropOff" all work. Empty means the feature is off and no code is accepted.
 */
const LOCAL_DELIVERY_CODE_IN_CODE = "DROPOFF";

const normalize = (s: string) => s.trim().toUpperCase();

/** True only when a code is configured and the visitor's code matches it. */
export function isLocalDeliveryCode(input: unknown): boolean {
  const real = normalize(process.env.LOCAL_DELIVERY_CODE ?? LOCAL_DELIVERY_CODE_IN_CODE);
  if (!real || typeof input !== "string") return false;
  return normalize(input) === real;
}
