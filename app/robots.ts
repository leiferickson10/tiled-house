import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Crawling is open to everyone; there are no Disallow rules.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
