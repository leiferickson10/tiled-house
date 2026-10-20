"use client";

import { useSyncExternalStore } from "react";
import {
  MAX_LINES,
  MAX_QTY_PER_LINE,
  resolveItem,
  type CartItem,
} from "./shop";

/**
 * Browser cart, persisted in localStorage. Exposed through useSyncExternalStore
 * so every component (nav badge, cart page, checkout) stays in sync, including
 * across tabs, with no provider needed and no hydration mismatch (the server
 * render always sees an empty cart).
 */

const KEY = "tiled-house-cart-v2";
const EMPTY: CartItem[] = [];

let cache: CartItem[] = EMPTY;
let cachedRaw: string | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return cache; // storage blocked (private mode): fall back to in-memory
  }
  if (raw === cachedRaw) return cache;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed)
      ? parsed.filter(
          (i): i is CartItem =>
            resolveItem(i?.id) !== null &&
            Number.isInteger(i?.qty) &&
            i.qty >= 1,
        )
      : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: CartItem[]) {
  cache = next.length ? next : EMPTY;
  try {
    cachedRaw = next.length ? JSON.stringify(next) : null;
    if (cachedRaw) localStorage.setItem(KEY, cachedRaw);
    else localStorage.removeItem(KEY);
  } catch {
    cachedRaw = null;
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export const cartActions = {
  add(id: string, qty = 1) {
    const items = read();
    const existing = items.find((i) => i.id === id);
    if (existing) {
      write(
        items.map((i) =>
          i === existing
            ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY_PER_LINE) }
            : i,
        ),
      );
    } else if (items.length < MAX_LINES) {
      write([...items, { id, qty: Math.min(qty, MAX_QTY_PER_LINE) }]);
    }
  },
  setQty(id: string, qty: number) {
    const q = Math.min(Math.max(qty, 0), MAX_QTY_PER_LINE);
    write(
      read().flatMap((i) =>
        i.id !== id ? [i] : q === 0 ? [] : [{ ...i, qty: q }],
      ),
    );
  },
  remove(id: string) {
    write(read().filter((i) => i.id !== id));
  },
  clear() {
    write([]);
  },
};

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const cartCount = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.qty, 0);
