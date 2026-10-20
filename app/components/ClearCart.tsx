"use client";

import { useEffect } from "react";
import { cartActions } from "../lib/cart";

/** Empties the browser cart once Stripe confirms the order is paid. */
export default function ClearCart() {
  useEffect(() => cartActions.clear(), []);
  return null;
}
