import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes
    .filter((route) => !route.noIndex)
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency || "monthly",
      priority: route.priority || 0.5,
    }));
}
