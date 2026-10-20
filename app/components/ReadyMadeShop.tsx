import Image from "next/image";
import { readyMadePhoto, type ReadyMadeCoaster } from "../lib/coasters";
import { READY_MADE_PRICE_CENTS, readyMadeId } from "../lib/shop";
import AddToCartButton from "./AddToCartButton";

/** Grid of photographed coasters, each its own product with a real photo. */
export default function ReadyMadeShop({
  coasters,
}: {
  coasters: ReadyMadeCoaster[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {coasters.map((c, i) => (
        <li key={c.slug}>
          <Image
            src={readyMadePhoto(c.slug)}
            alt={`${c.name} glass tile coaster`}
            width={400}
            height={400}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={i < 4}
            className="aspect-square w-full rounded-[4px] object-cover shadow-[0_12px_24px_-14px_rgba(74,29,49,0.55)]"
          />
          <p className="mt-3 text-sm font-medium leading-snug">{c.name}</p>
          <AddToCartButton
            id={readyMadeId(c.slug)}
            priceCents={READY_MADE_PRICE_CENTS}
            compact
          />
        </li>
      ))}
    </ul>
  );
}
