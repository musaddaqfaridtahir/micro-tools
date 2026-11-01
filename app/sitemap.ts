import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://microtools.example.com";
  const lastModified = new Date("2026-10-26");

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Tool 1: French VAT Calculator
    {
      url: `${baseUrl}/fr/calculateur-tva`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Tool 2: German Electricity Calculator
    {
      url: `${baseUrl}/de/stromverbrauch-rechner`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Tool 3: Spanish Working Days Calculator
    {
      url: `${baseUrl}/es/calculadora-dias-habiles`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Tool 4: Arabic Hijri Age Calculator
    {
      url: `${baseUrl}/ar/hijri-age-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Tool 5: Spanish Rule of Three Calculator
    {
      url: `${baseUrl}/es/calculadora-regla-de-tres`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Legal & Trust Pages (AdSense Compliance)
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
