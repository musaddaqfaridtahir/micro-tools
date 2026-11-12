import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Outils & Calculateurs Multilingues en Ligne (FR, DE, ES, AR)`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Calculateurs et utilitaires web gratuits, rapides et sans inscription en français, allemand, espagnol et arabe (TVA, Salaire Brut/Net, Dreisatz, Stromverbrauch, IVA, Hijri).",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-neutral-50/40 text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
