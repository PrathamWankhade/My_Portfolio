/**
 * Canonical public URL, shared by metadata, robots.txt and sitemap.xml.
 * Set SITE_URL when the portfolio moves to a custom domain.
 */
const configuredUrl = process.env.SITE_URL;

export const siteUrl = (
  configuredUrl || "https://prathamwankhades-portfolio.vercel.app"
).replace(/\/+$/, "");
