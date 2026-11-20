import React from "react";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { getLanguageHub, type ToolDefinition, type ToolFaqItem } from "@/lib/tools-registry";

interface SeoSchemaProps {
  tool: ToolDefinition;
  faqs: ToolFaqItem[];
  pageTitle?: string;
  pageDescription?: string;
  priceCurrency?: string;
}

const HOME_LABELS: Record<ToolDefinition["language"], string> = {
  fr: "Accueil",
  de: "Startseite",
  es: "Inicio",
  ar: "الرئيسية",
  pk: "Home",
};

export default function SeoSchema({
  tool,
  faqs,
  pageTitle,
  pageDescription,
  priceCurrency,
}: SeoSchemaProps) {
  const hub = getLanguageHub(tool.language);
  const fullUrl = `${SITE_URL}${tool.slug}`;
  const hubUrl = `${SITE_URL}${hub.slug}`;
  const currency =
    priceCurrency || (tool.language === "ar" ? "SAR" : "EUR");

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${fullUrl}#software`,
        name: pageTitle || tool.title,
        description: pageDescription || tool.shortDescription,
        url: fullUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        inLanguage: tool.language,
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: currency,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${fullUrl}#faq`,
        inLanguage: tool.language,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: HOME_LABELS[tool.language],
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: hub.nativeName,
            item: hubUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tool.shortTitle,
            item: fullUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
