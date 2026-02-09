import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://growth-tech.com.ua";

  // Static pages
  const staticPages = [
    "",
    "/portfolio",
    "/privacy",
    "/terms",
  ];

  // Demo sites
  const demoSites = [
    "/portfolio/demo/techstart",
    "/portfolio/demo/ecoshop",
    "/portfolio/demo/lawfirm",
    "/portfolio/demo/fitclub",
    "/portfolio/demo/autoparts",
    "/portfolio/demo/consultant",
    "/portfolio/demo/medclinic",
    "/portfolio/demo/realestate",
    "/portfolio/demo/eventpro",
  ];

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const demoEntries = demoSites.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...demoEntries];
}
