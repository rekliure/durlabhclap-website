import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://durlabhclapfoundation.org").replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
