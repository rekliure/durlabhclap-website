export default function sitemap() {
  const baseUrl = "https://durlabhclapfoundation.org";

  const pages = [
    "/", 
    "/journey",
    "/why-we-exist",
    "/projects",
    "/gallery",
    "/fellows",
    "/blogs",
    "/create",
    "/contact",
    "/about",

    // Recommended future pages (add only when created)
    // "/impact",
    // "/our-model",
    // "/team",
    // "/volunteer",
    // "/support-us",
    // "/privacy-policy",
    // "/terms"
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: page === "/" ? 1.0 : 0.8,
  }));
}
