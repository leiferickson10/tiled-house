/**
 * The public address of the site. Canonical links, the sitemap, robots.txt and
 * structured data all build their URLs from this. It is fixed on purpose
 * (not read from NEXT_PUBLIC_SITE_URL) so a preview deploy or a local run can
 * never leak localhost or preview URLs into what search engines see.
 */
export const SITE_URL = "https://www.tiledhouse.com";

export const SITE_NAME = "Tiled House";

/** Absolute URL for a site-relative path like "/shop" or "/images/home/hero.jpg". */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
