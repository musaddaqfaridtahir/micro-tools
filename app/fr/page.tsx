import React from "react";
import type { Metadata } from "next";
import LanguageHubView from "@/components/LanguageHubView";
import { getLanguageHub } from "@/lib/tools-registry";

const hub = getLanguageHub("fr");

export const metadata: Metadata = {
  title: hub.seoTitle,
  description: hub.seoDescription,
  alternates: {
    canonical: hub.slug,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: hub.seoTitle,
    description: hub.seoDescription,
    url: hub.slug,
    type: "website",
    locale: hub.locale,
    siteName: "MicroTools",
  },
};

export default function FrenchHubPage() {
  return <LanguageHubView language="fr" />;
}
