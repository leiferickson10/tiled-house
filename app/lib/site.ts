/**
 * The public address of the site. Canonical links, the sitemap, robots.txt and
 * structured data all build their URLs from this. It is fixed on purpose
 * (not read from NEXT_PUBLIC_SITE_URL) so a preview deploy or a local run can
 * never leak localhost or preview URLs into what search engines see.
 */
export const SITE_URL = "https://www.tiledhouse.com";

export const SITE_NAME = "Tiled House";

/** Business days to make and ship an order. Used on the policy page and at checkout. */
export const PROCESSING_DAYS = 5;

/**
 * Days after delivery to email photos for a return. YOU DIDN'T SPECIFY THIS:
 * 7 is a placeholder default, change it to your real window.
 */
export const RETURN_WINDOW_DAYS = 7;

/** Public contact address, shown on the contact page and in the footer. */
export const CONTACT_EMAIL = "hazenleiferickson@gmail.com";

/** Absolute URL for a site-relative path like "/shop" or "/images/home/hero.jpg". */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
