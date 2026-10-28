import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/site";

// Public, indexable pages only. /cart, /checkout and the order confirmation are
// personal to a visitor, and /designs just redirects to /shop, so none of those
// are listed. To add a page (a new blog post, say), add a line here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/shop") },
    { url: absoluteUrl("/custom") },
    { url: absoluteUrl("/mosaics") },
    {
      url: absoluteUrl("/blog/handmade-glass-tile-coasters"),
      lastModified: "2026-10-27",
    },
  ];
}
