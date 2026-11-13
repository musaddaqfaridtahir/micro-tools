import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Percent,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ProzentCalculator from "./ProzentCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("prozentrechner")!;

export const metadata: Metadata = {
  title: "Prozentrechner Online – Prozentwert, Prozentsatz & Rabatt berechnen",
  description:
    "Kostenloser Prozentrechner für Deutschland: Prozentwert (X % von Y), Prozentsatz sowie Rabatte (-%) und Aufschläge (+%) inklusive Ersparnis in Euro berechnen.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/de/prozentrechner",
  },
  openGraph: {
    title: "Prozentrechner Online – Prozentwert, Prozentsatz & Rabatt",
    description:
      "Drei Prozentrechner in einem Tool: X % von Y, prozentualer Anteil sowie Preisnachlass und Ersparnis in € sofort ermitteln.",
    url: "/de/prozentrechner",
    type: "website",
    locale: "de_DE",
    siteName: "MicroTools",
  },
};

const FAQ_PROZENT = [
  {
    question: "Wie berechne ich X Prozent von einer Zahl (Prozentwert)?",
    answer:
      "Multiplizieren Sie den Grundwert mit dem Prozentsatz und teilen Sie das Ergebnis durch 100. Formel: W = (G × p) ÷ 100. Beispiel: 15 % von 200 € = (200 × 15) ÷ 100 = 30 €.",
  },
  {
    question: "Wie finde ich heraus, wie viel Prozent eine Zahl von einer anderen ist?",
    answer:
      "Teilen Sie den kleineren bzw. verglichenen Teilwert (W) durch den Gesamtwert (G) und multiplizieren Sie mit 100: p = (W ÷ G) × 100. Beispiel: 45 von 180 sind (45 ÷ 180) × 100 = 25 %.",
  },
  {
    question: "Wie berechne ich einen Rabatt und die Ersparnis in Euro?",
    answer:
      "Die Ersparnis in Euro entspricht Preis × (Rabatt % ÷ 100). Den neuen Endpreis erhalten Sie, indem Sie diesen Betrag vom Originalpreis abziehen: Endpreis = Ausgangspreis × (1 − Rabatt % / 100).",
  },
  {
    question: "Warum führt eine Senkung um 20 % und danach +20 % nicht zum alten Preis?",
    answer:
      "Weil die beiden Prozentsätze sich auf unterschiedliche Grundwerte beziehen. Sinkt ein Preis von 100 € um 20 %, liegt er bei 80 €. Steigen diese 80 € anschließend wieder um 20 % (+16 €), beträgt der Endpreis nur 96 € – also 4 % weniger als anfangs.",
  },
  {
    question: "Werden meine eingegebenen Zahlen auf einem Server gespeichert?",
    answer:
      "Nein. Unser Prozentrechner arbeitet vollständig lokal in Ihrem Browser (Client-Side). Alle Eingaben verlassen niemals Ihr Endgerät.",
  },
];

export default function ProzentrechnerPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="de">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_PROZENT}
        pageTitle="Prozentrechner Online – Prozentwert, Prozentsatz & Rabatt"
        pageDescription="Prozentwert, Prozentsatz, prozentuale Veränderung und Rabatt-Ersparnis in Euro schnell und fehlerfrei berechnen."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Brotkrumennavigation" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Startseite
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/de" className="hover:text-neutral-900 transition">
            Deutsche Rechner (<span translate="no" className="notranslate font-bold">DE</span>)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Prozentrechner
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-2xs">
            <Percent className="h-3.5 w-3.5" />
            <span>3 Rechenmodi inkl. Rabatt- &amp; Ersparnis-Check</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Prozentrechner Online
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Berechnen Sie im Handumdrehen <strong>Prozentwert (X % von Y)</strong>,{" "}
            <strong>Prozentsatz</strong> sowie <strong>Rabatte (-%) und Aufschläge (+%)</strong> inklusive Ersparnis in Euro.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-prozent-de" />
        </div>

        <section aria-label="Interaktiver Prozentrechner" className="mb-6 sm:mb-10">
          <ProzentCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-prozent-de" />
        </div>

        {/* 700+ Word German SEO Guide */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-indigo-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Grundwert, Prozentwert &amp; Prozentsatz einfach erklärt
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Die <strong>Prozentrechnung</strong> gehört zu den wichtigsten mathematischen Grundlagen im Alltag, beim Einkaufen, bei Gehaltsverhandlungen, bei Finanzierungen und in der Schule. Das Wort <em>Prozent</em> stammt aus dem Lateinischen (<em>pro centum</em>) und bedeutet wörtlich „von Hundert“. Ein Prozent entspricht somit genau einem Hundertstel (1 % = 1/100 = 0,01).
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Jede klassische Prozentaufgabe arbeitet mit drei Größen: dem <strong>Grundwert (G)</strong> als Ganzes (100 %), dem <strong>Prozentwert (W)</strong> als konkretem Teilbetrag in Euro oder Einheiten sowie dem <strong>Prozentsatz (p %)</strong> als Verhältnisanteil. Mit den drei Tabs unseres Prozentrechners wechseln Sie nahtlos zwischen allen Varianten und sehen zusätzlich den genauen Rechenweg in Echtzeit.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Darüber hinaus hilft der Rabatt- und Veränderungsmodus sowohl beim Preisvergleich während großer Verkaufsaktionen (Black Friday, Saison-Schlussverkauf, Skonto-Abzug auf Lieferantenrechnungen) als auch bei der Kalkulation von Preissteigerungen, Mieten, Inflationseffekten oder Gehaltserhöhungen. Durch die direkte Gegenüberstellung von Ausgangswert, absoluter Differenz in Euro und prozentualer Abweichung vermeiden Sie typische Rundungsfehler und treffen schnell fundierte Finanzentscheidungen im beruflichen und privaten Alltag. Besonders im E-Commerce und im Handwerk lohnt sich die exakte Nachkalkulation von Materialzuschlägen, Mengenrabatten und Skonti: Bereits zwei oder drei Prozent Unterschied wirken sich bei größeren Projektsummen spürbar auf Marge, Endpreis und Gewinn aus. Dank der Schnellwahl-Buttons für gängige Rabattsätze von 10 % bis 50 % sparen Sie zudem wertvolle Zeit beim Vergleichen verschiedener Anbieter.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Anleitung &amp; Formeltabelle für alle drei Rechenmodi
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm sm:text-base text-neutral-700">
              <li>Wählen Sie den gewünschten Tab: <strong>Prozentwert</strong>, <strong>Prozentsatz</strong> oder <strong>Veränderung / Rabatt</strong>.</li>
              <li>Tragen Sie Ausgangszahlen ein oder testen Sie den Rechner über die 1-Klick-Beispielbuttons.</li>
              <li>Im Rabatt-Modus legen Sie über die Schalter fest, ob ein Preisnachlass (- %) oder eine Erhöhung (+ %) berechnet werden soll.</li>
              <li>Lesen Sie Endwert, Ersparnis und Formel sofort ab und kopieren Sie das Ergebnis direkt in die Zwischenablage.</li>
            </ol>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-xs font-bold uppercase text-neutral-600">
                  <tr>
                    <th className="px-4 py-3">Gesuchte Größe</th>
                    <th className="px-4 py-3">Formel</th>
                    <th className="px-4 py-3">Typische Fragestellung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-indigo-700">Prozentwert (W)</td>
                    <td className="px-4 py-3 font-mono text-xs">W = (G × p) ÷ 100</td>
                    <td className="px-4 py-3 text-neutral-600">Wie viel sind 19 % von 250 €?</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-indigo-700">Prozentsatz (p %)</td>
                    <td className="px-4 py-3 font-mono text-xs">p = (W ÷ G) × 100</td>
                    <td className="px-4 py-3 text-neutral-600">Wie viel Prozent sind 45 € von 180 €?</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-emerald-700">Endpreis nach Rabatt</td>
                    <td className="px-4 py-3 font-mono text-xs">Endpreis = G × (1 − p / 100)</td>
                    <td className="px-4 py-3 text-neutral-600">Was kostet ein 120-€-Artikel mit 25 % Rabatt?</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-800">Preis nach Aufschlag</td>
                    <td className="px-4 py-3 font-mono text-xs">Endpreis = G × (1 + p / 100)</td>
                    <td className="px-4 py-3 text-neutral-600">Wie hoch ist das Gehalt nach +8 % Erhöhung?</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2 text-indigo-600">
              <FileCheck2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                2 konkrete Rechenbeispiele aus dem Alltag
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Beispiel 1: Rabatt beim Online-Shopping (-25 %)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Eine Winterjacke kostet regulär <strong>120,00 €</strong> und wird im Sale mit <strong>25 % Rabatt</strong> angeboten:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Ersparnis: 120 × 0,25 = <strong>30,00 €</strong></li>
                  <li>Neuer Endpreis: 120 − 30 = <strong>90,00 €</strong></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Beispiel 2: Sparquote vom Nettoeinkommen berechnen
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Sie legen jeden Monat <strong>450 €</strong> von Ihrem Monatsbudget von <strong>2.250 €</strong> zurück:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Formel: (450 ÷ 2.250) × 100</li>
                  <li>Ihre Sparquote (Prozentsatz): <strong>20 %</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-indigo-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Häufige Fragen zum Prozentrechner (FAQ)
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_PROZENT} accent="indigo" />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <strong className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                100 % Client-Side &amp; Datenschutzkonform:
              </strong>
              Alle Berechnungen finden lokal im Browser statt – ohne Tracking oder Speicherung Ihrer Finanzdaten.
            </div>
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
