import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Calculator,
  BookOpen,
  ArrowRightLeft,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import ElectricityCalculator from "./ElectricityCalculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Stromverbrauch Rechner – Stromkosten einfach online berechnen (Kostenlos)",
  description:
    "Berechnen Sie kostenlos den Stromverbrauch (kWh) und die jährlichen Stromkosten Ihrer Haushaltsgeräte mit unserem präzisen Online-Stromrechner.",
  alternates: {
    canonical: "/de/stromverbrauch-rechner",
  },
  openGraph: {
    title: "Stromverbrauch Rechner – Stromkosten einfach online berechnen (Kostenlos)",
    description:
      "Berechnen Sie kostenlos den Stromverbrauch (kWh) und die jährlichen Stromkosten Ihrer Haushaltsgeräte mit unserem präzisen Online-Stromrechner.",
    url: "/de/stromverbrauch-rechner",
    type: "website",
    locale: "de_DE",
    siteName: "MicroTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stromverbrauch Rechner – Stromkosten einfach online berechnen (Kostenlos)",
    description:
      "Berechnen Sie kostenlos den Stromverbrauch (kWh) und die jährlichen Stromkosten Ihrer Haushaltsgeräte mit unserem präzisen Online-Stromrechner.",
  },
};

const FAQ_GERMAN_DATA = [
  {
    question: "Wie berechnet man Watt in Kilowattstunden (kWh) um?",
    answer:
      "Um den Stromverbrauch von Watt in Kilowattstunden (kWh) umzurechnen, multiplizieren Sie die Leistung des Geräts (in Watt) mit der täglichen Nutzungsdauer (in Stunden) und teilen das Ergebnis durch 1.000. Beispiel: Ein Fernseher mit 100 Watt, der 4 Stunden am Tag läuft, verbraucht (100 × 4) ÷ 1.000 = 0,4 kWh pro Tag.",
  },
  {
    question: "Was kostet 1 kWh Strom aktuell in Deutschland?",
    answer:
      "In Deutschland liegt der durchschnittliche Strompreis für private Haushalte aktuell zwischen 34 und 38 Cent pro Kilowattstunde (Stand 2024–2026). Je nach Stromanbieter, Bundesland und Vertrag (Grundversorgung vs. Sondervertrag) können die Preise variieren. Unser Rechner nutzt standardmäßig den realistischen Durchschnittswert von 35 Cent/kWh.",
  },
  {
    question: "Welche Geräte verbrauchen am meisten Strom im Haushalt?",
    answer:
      "Zu den größten Stromfressern im deutschen Haushalt zählen veraltete Kühlschränke und Gefriertruhen, alte Wäschetrockner, elektrische Heizlüfter bzw. Radiatoren, Durchlauferhitzer sowie leistungsstarke Gaming-PCs. Auch Geräte im dauerhaften Standby-Modus können unbemerkt 50 bis 100 Euro pro Jahr kosten.",
  },
  {
    question: "Wie kann man die Stromkosten im Alltag am effektivsten senken?",
    answer:
      "1. Standby-Verluste durch schaltbare Steckdosenleisten vermeiden. 2. Haushaltsgroßgeräte (Waschmaschine, Spülmaschine) im Eco-Modus und voll beladen betreiben. 3. Veraltete Geräte gegen energieeffiziente Modelle (Energieeffizienzklasse A oder B) austauschen. 4. Regelmäßig den Stromanbieter vergleichen und in günstigere Tarife wechseln.",
  },
];

const APPLIANCES_TABLE = [
  {
    device: "Kühlschrank (Klasse D/E)",
    watt: "100 – 150 W",
    hours: "24 Std. (Thermostat)",
    kwhYear: "150 kWh",
    costYear: "52,50 €",
  },
  {
    device: "Gefriertruhe / Gefrierschrank",
    watt: "120 – 180 W",
    hours: "24 Std. (Thermostat)",
    kwhYear: "200 kWh",
    costYear: "70,00 €",
  },
  {
    device: "Waschmaschine (160 Waschgänge)",
    watt: "2.000 W (Heizphase)",
    hours: "ca. 1 Std. pro Gang",
    kwhYear: "160 kWh",
    costYear: "56,00 €",
  },
  {
    device: "Wäschetrockner (Kondenstrockner)",
    watt: "2.500 W",
    hours: "ca. 140 Zyklen/Jahr",
    kwhYear: "350 kWh",
    costYear: "122,50 €",
  },
  {
    device: "Geschirrspüler (Eco-Programm)",
    watt: "1.800 – 2.100 W",
    hours: "200 Spülgänge/Jahr",
    kwhYear: "210 kWh",
    costYear: "73,50 €",
  },
  {
    device: "Gaming-PC mit Monitor",
    watt: "400 – 500 W",
    hours: "3 – 4 Std./Tag",
    kwhYear: "550 kWh",
    costYear: "192,50 €",
  },
  {
    device: "Smart-TV (55 Zoll, LED/OLED)",
    watt: "80 – 130 W",
    hours: "4 Std./Tag",
    kwhYear: "160 kWh",
    costYear: "56,00 €",
  },
  {
    device: "Heizlüfter / Elektro-Radiator",
    watt: "2.000 W",
    hours: "100 Std. im Winter",
    kwhYear: "200 kWh",
    costYear: "70,00 €",
  },
];

export default function ElectricityCalculatorPage() {
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GERMAN_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stromverbrauch Rechner",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Online-Stromrechner zur Ermittlung des Stromverbrauchs (kWh) und der Stromkosten für Haushaltsgeräte in Deutschland.",
  };

  return (
    <div className="py-8 sm:py-12" lang="de">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Brotkrumennavigation" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Startseite
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#tools" className="hover:text-neutral-900 transition">
            Energie & Haushalt
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Stromverbrauch Rechner
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs mb-3">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Aktualisiert für deutsche Stromtarife 2024 – 2026</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Stromverbrauch Rechner
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            Berechnen Sie die Stromkosten Ihrer Elektrogeräte pro Tag, Monat und Jahr. 
            Finden Sie heimliche Stromfresser und senken Sie gezielt Ihre Stromrechnung.
          </p>
        </header>

        {/* 1. TOP AD BANNER PLACEHOLDER */}
        <div className="mb-8">
          <AdBanner position="top" adSlot="banner-top-stromrechner-de" />
        </div>

        {/* 2. ELECTRICITY CALCULATOR COMPONENT */}
        <section aria-label="Interaktiver Stromverbrauchs-Rechner" className="mb-10">
          <ElectricityCalculator />
        </section>

        {/* 3. IN-CONTENT AD BANNER PLACEHOLDER */}
        <div className="my-10">
          <AdBanner position="in-content" adSlot="content-banner-stromrechner-de" />
        </div>

        {/* 4. HIGH-QUALITY NATIVE GERMAN SEO CONTENT */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Introduction */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Stromkosten im Blick behalten: Transparenz für Ihren Haushalt
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-4">
              In den letzten Jahren sind die Energiekosten in Deutschland spürbar angestiegen. Viele Verbraucher 
              werden erst mit der jährlichen Stromrechnung oder bei einer Nachzahlung mit den tatsächlichen Kosten 
              ihrer Haushaltsgeräte konfrontiert. Ob Home-Office-Setup, moderner OLED-Fernseher oder ein älterer 
              Kühlschrank im Keller: Häufig ist unklar, wie viel Geld ein einzelnes Gerät wirklich im Monat oder Jahr verbraucht.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
              Mit unserem <strong>kostenlosen Online-Stromverbrauch-Rechner</strong> ermitteln Sie in Sekundenschnelle 
              den exakten Verbrauch in Kilowattstunden (kWh) sowie die Kosten in Euro. Sie benötigen kein spezielles 
              Messgerät – die Watt-Angabe auf dem Typenschild des Geräts genügt.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900">Stromfresser identifizieren</span>
                <p className="mt-1 text-xs text-neutral-600">
                  Erkennen Sie sofort, welche Altgeräte ersetzt werden sollten, um bares Geld zu sparen.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900">Neuanschaffungen bewerten</span>
                <p className="mt-1 text-xs text-neutral-600">
                  Vergleichen Sie vor dem Kauf, ob sich der Aufpreis für eine höhere Energieeffizienzklasse lohnt.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900">Budget & Abschläge planen</span>
                <p className="mt-1 text-xs text-neutral-600">
                  Berechnen Sie realistische monatliche Abschläge und vermeiden Sie böse Überraschungen.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Wie funktioniert der Rechner & Mathematische Formel */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <Calculator className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Wie funktioniert der Stromverbrauch-Rechner?
              </h2>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Der Rechner führt die physikalische Umrechnung von Leistung und Betriebsdauer in 3 einfachen Schritten durch:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  1
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Gerät oder Watt wählen</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Wählen Sie ein vordefiniertes Haushaltsgerät oder tragen Sie die elektrische Leistung in Watt ein.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  2
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Nutzungszeit angeben</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Geben Sie an, wie viele Stunden am Tag und an wie vielen Tagen im Jahr das Gerät durchschnittlich eingeschaltet ist.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  3
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Strompreis anpassen</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Passen Sie den Arbeitspreis in Cent pro kWh an Ihren persönlichen Stromtarif an (Voreinstellung: 35 Cent/kWh).
                </p>
              </div>
            </div>

            {/* Mathematische Formel Box */}
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-blue-600" />
                Die mathematische Formel zur Stromkostenberechnung
              </h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-white p-4 border border-blue-200/70 shadow-2xs">
                  <span className="text-xs font-bold text-blue-800">Schritt 1: Energieverbrauch in kWh berechnen</span>
                  <div className="mt-2 font-mono text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-neutral-900">
                    Verbrauch (kWh) = (Leistung in Watt × Stunden) ÷ 1.000
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-500">
                    Da 1 Kilowattstunde (kWh) genau 1.000 Wattstunden (Wh) entspricht, wird der Wert durch 1.000 geteilt.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-blue-200/70 shadow-2xs">
                  <span className="text-xs font-bold text-blue-800">Schritt 2: Stromkosten in Euro berechnen</span>
                  <div className="mt-2 font-mono text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-neutral-900">
                    Stromkosten (€) = Verbrauch (kWh) × Strompreis (€ / kWh)
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-500">
                    Bei 35 Cent pro kWh multiplizieren Sie einfach die kWh mit 0,35 €.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Typischer Stromverbrauch im Haushalt (Tabelle) */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
              Typischer Stromverbrauch im Haushalt (Übersichtstabelle)
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Die folgende Tabelle zeigt Richtwerte für gängige Elektrogeräte in deutschen Haushalten 
              auf Basis eines durchschnittlichen Strompreises von <strong>35 Cent pro kWh</strong>:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="py-3.5 px-4 font-bold">Haushaltsgerät</th>
                    <th className="py-3.5 px-4 font-bold">Typische Leistung</th>
                    <th className="py-3.5 px-4 font-bold">Nutzungsgewohnheit</th>
                    <th className="py-3.5 px-4 font-bold">Verbrauch pro Jahr</th>
                    <th className="py-3.5 px-4 font-bold text-emerald-700">Kosten / Jahr (35 Ct)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  {APPLIANCES_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50">
                      <td className="py-3.5 px-4 font-semibold text-neutral-900">{row.device}</td>
                      <td className="py-3.5 px-4 font-mono">{row.watt}</td>
                      <td className="py-3.5 px-4">{row.hours}</td>
                      <td className="py-3.5 px-4 font-bold text-neutral-800">{row.kwhYear}</td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-600">{row.costYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-neutral-50 p-3.5 border border-neutral-200/80 text-xs text-neutral-500">
              <TrendingDown className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Spartipp:</strong> Der Austausch eines 15 Jahre alten Kühlschranks gegen ein modernes Gerät der Energieklasse C oder B kann bis zu <strong>60 € pro Jahr</strong> einsparen.
              </span>
            </div>
          </section>

          {/* Section 4: Häufig gestellte Fragen (FAQ) */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-6">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Häufig gestellte Fragen (FAQ) zum Stromverbrauch
              </h2>
            </div>

            <div className="divide-y divide-neutral-200">
              {FAQ_GERMAN_DATA.map((faq, index) => (
                <div key={index} className="py-5">
                  <h3 className="text-base font-bold text-neutral-900 m-0">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 m-0">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Security & Reliability Callout */}
        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Datenschutz & Privatsphäre garantiert</span>
          </div>
          <p className="text-emerald-700 max-w-xl mx-auto">
            Alle Berechnungen werden lokal auf Ihrem Endgerät ausgeführt. Es werden keinerlei Verbrauchsdaten 
            oder persönliche Angaben an externe Server übertragen.
          </p>
        </aside>
      </div>
    </div>
  );
}
