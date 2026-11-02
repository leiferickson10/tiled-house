/**
 * Browser-side memory of the local-delivery code a customer typed, so it carries
 * from the cart page to checkout. It lives in sessionStorage (this tab only) and
 * is just what they typed: the server decides whether it's valid.
 */
const KEY = "th_local_code";

export function getSavedLocalCode(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null; // storage can be blocked (private windows, strict settings)
  }
}

export function saveLocalCode(code: string): void {
  try {
    sessionStorage.setItem(KEY, code);
  } catch {
    /* ignore */
  }
}

export function clearLocalCode(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
