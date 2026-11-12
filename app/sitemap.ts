import type { MetadataRoute } from "next";
import { SITE_URL, SITE_LAST_MODIFIED } from "@/lib/site-config";
import {
  TOOLS_REGISTRY,
  LANGUAGE_HUBS,
  LANGUAGE_ORDER,
} from "@/lib/tools-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_LAST_MODIFIED);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const languageHubRoutes: MetadataRoute.Sitemap = LANGUAGE_ORDER.map(
    (code) => ({
      url: `${SITE_URL}${LANGUAGE_HUBS[code].slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  const toolRoutes: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((tool) => ({
    url: `${SITE_URL}${tool.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...languageHubRoutes, ...toolRoutes];
}
