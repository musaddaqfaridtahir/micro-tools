import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Receipt,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import GermanVatCalculator from "./GermanVatCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("mehrwertsteuer-rechner")!;

export const metadata: Metadata = {
  title: "Mehrwertsteuer-Rechner Deutschland (19 % & 7 %) – Netto & Brutto berechnen",
  description:
    "Kostenloser Mehrwertsteuer-Rechner für Deutschland 2026: Netto zu Brutto oder Brutto zu Netto mit 19 %, 7 % oder individuellem Steuersatz sofort berechnen.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/de/mehrwertsteuer-rechner",
  },
  openGraph: {
    title: "Mehrwertsteuer-Rechner Deutschland (19 % & 7 %) – Netto & Brutto",
    description:
      "Berechnen Sie Nettobetrag, 19 % / 7 % Mehrwertsteuer und Bruttobetrag in Euro sekundenschnell und ohne Datenspeicherung.",
    url: "/de/mehrwertsteuer-rechner",
    type: "website",
    locale: "de_DE",
    siteName: "MicroTools",
  },
};

const FAQ_DE_VAT = [
  {
    question: "Wie berechne ich aus einem Bruttobetrag die 19 % Mehrwertsteuer heraus?",
    answer:
      "Um bei 19 % Mehrwertsteuer vom Bruttobetrag auf den Nettobetrag zu kommen, teilen Sie den Bruttobetrag durch 1,19 (nicht minus 19 % rechnen!). Beispiel: 1.190 € Brutto ÷ 1,19 = 1.000 € Netto. Die enthaltene Mehrwertsteuer beträgt somit 190 €.",
  },
  {
    question: "Wann gilt in Deutschland der ermäßigte Steuersatz von 7 %?",
    answer:
      "Der ermäßigte Umsatzsteuersatz von 7 % nach § 12 Abs. 2 UStG gilt unter anderem für Grundnahrungsmittel, Bücher, Zeitungen und Zeitschriften, den öffentlichen Personennahverkehr, Hotelübernachtungen (ohne Frühstück) sowie Eintrittskarten für kulturelle Veranstaltungen.",
  },
  {
    question: "Wie lautet die Formel für Netto zu Brutto?",
    answer:
      "Bei 19 % Regelsteuersatz lautet die Formel: Bruttobetrag = Nettobetrag × 1,19 und MwSt.-Betrag = Nettobetrag × 0,19. Bei 7 % ermäßigtem Steuersatz multiplizieren Sie den Nettobetrag entsprechend mit 1,07 (MwSt. = Netto × 0,07).",
  },
  {
    question: "Was ist der Unterschied zwischen Mehrwertsteuer und Umsatzsteuer?",
    answer:
      "Im deutschen Sprachgebrauch werden beide Begriffe oft synonym verwendet. Rechtlich heißt die Steuer im Umsatzsteuergesetz (UStG) ‚Umsatzsteuer‘. ‚Mehrwertsteuer‘ ist der umgangssprachliche Oberbegriff, während Unternehmen die gezahlte Steuer auf Eingangsrechnungen als ‚Vorsteuer‘ abziehen können.",
  },
  {
    question: "Müssen Kleinunternehmer Mehrwertsteuer auf Rechnungen ausweisen?",
    answer:
      "Nein. Wer die Kleinunternehmerregelung nach § 19 UStG nutzt (Vorjahresumsatz unter den gesetzlichen Grenzen), weist keine Umsatzsteuer aus und führt auch keine ab. Auf der Rechnung ist stattdessen ein entsprechender Hinweis auf die Steuerbefreiung nach § 19 UStG anzugeben.",
  },
];

export default function MehrwertsteuerRechnerPage() {
  return (
    <div className="py-8 sm:py-12" lang="de">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_DE_VAT}
        pageTitle="Mehrwertsteuer-Rechner Deutschland (19 % & 7 %)"
        pageDescription="Nettobetrag, Mehrwertsteuer (19 % und 7 %) und Bruttobetrag kostenlos und sofort in Euro berechnen."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Brotkrumennavigation" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Startseite
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/de" className="hover:text-neutral-900 transition">
            Deutsche Rechner (DE)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Mehrwertsteuer-Rechner
          </span>
        </nav>

        <header className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs">
            <Receipt className="h-3.5 w-3.5" />
            <span>Deutschland Steuersätze 2026 (19 % &amp; 7 %)</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Mehrwertsteuer-Rechner
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            Berechnen Sie sekundenschnell <strong>Netto zu Brutto (+ MwSt.)</strong> oder{" "}
            <strong>Brutto zu Netto (- MwSt.)</strong> mit 19 %, 7 % oder einem eigenen Steuersatz in Euro.
          </p>
        </header>

        <div className="mb-8">
          <AdSlot position="top" adSlot="banner-top-mwst-de" />
        </div>

        <section aria-label="Interaktiver Mehrwertsteuer-Rechner" className="mb-10">
          <GermanVatCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-mwst-de" />
        </div>

        {/* 700+ Word German SEO Guide */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-blue-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                So funktioniert die Mehrwertsteuer in Deutschland (Netto, Brutto &amp; UStG)
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Die <strong>Mehrwertsteuer (MwSt.)</strong> – gesetzlich im deutschen Umsatzsteuergesetz (UStG) als <strong>Umsatzsteuer</strong> bezeichnet – ist eine indirekte Verbrauchssteuer, die nahezu auf jeden Warenverkauf und jede Dienstleistung im Inland erhoben wird. Während Privatpersonen im Einzelhandel fast immer den Endpreis inklusive Steuer (<strong>Bruttobetrag</strong>) bezahlen, kalkulieren Unternehmen, Handwerker und Selbstständige ihre Angebote meist auf Basis des <strong>Nettobetrags</strong> zuzüglich des jeweils gültigen Steuersatzes.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Gerade beim Prüfen von Kassenbons, beim Ausstellen von Ausgangsrechnungen oder beim Vorsteuerabzug in der Buchhaltung passiert ein klassischer Denkfehler: Wer aus einem Bruttobetrag von 119 € einfach 19 % abzieht, erhält fälschlicherweise 96,39 € statt der korrekten 100,00 € Netto. Unser <strong>Mehrwertsteuer-Rechner</strong> löst beide Richtungen exakt nach den gesetzlichen Rechenregeln und liefert Ihnen Nettobetrag, Steuerbetrag und Bruttobetrag inklusive 1-Klick-Kopierfunktion direkt im Browser.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Für Unternehmer mit Vorsteuerabzugsberechtigung ist insbesondere der Nettobetrag maßgeblich, da die gezahlte Vorsteuer über die Umsatzsteuer-Voranmeldung beim Finanzamt wieder geltend gemacht werden kann. Privatverbraucher hingegen vergleichen stets Bruttopreise einschließlich gesetzlicher Mehrwertsteuer gemäß Preisangabenverordnung (PAngV). Bei grenzüberschreitenden B2B-Leistungen innerhalb der Europäischen Union greift zudem häufig das Reverse-Charge-Verfahren, bei dem der Leistungsempfänger die Steuer schuldet.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Schritt-für-Schritt-Anleitung, Formeln &amp; Steuersätze 2026
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm sm:text-base text-neutral-700">
              <li>Wählen Sie oben zwischen <strong>Netto zu Brutto (+ MwSt.)</strong>, wenn die Steuer hinzugerechnet werden soll, oder <strong>Brutto zu Netto (- MwSt.)</strong>, um die Steuer herauszurechnen.</li>
              <li>Geben Sie Ihren Geldbetrag in Euro (€) ein oder wählen Sie eines der Schnellbeispiele.</li>
              <li>Klicken Sie auf <strong>19 % (Regelsteuersatz)</strong>, <strong>7 % (Ermäßigter Satz)</strong> oder tragen Sie unter <em>Eigener</em> jeden beliebigen Prozentwert ein.</li>
              <li>Kopieren Sie das gewünschte Ergebnis mit einem Klick direkt in Ihre Rechnung oder Tabellenkalkulation.</li>
            </ol>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Vorwärtsrechnung (Netto &rarr; Brutto)
                </span>
                <p className="mt-2 font-mono text-xs sm:text-sm font-bold text-neutral-900">
                  MwSt. = Netto × (Steuersatz / 100)<br />
                  Brutto = Netto × (1 + Steuersatz / 100)
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Rückwärtsrechnung (Brutto &rarr; Netto)
                </span>
                <p className="mt-2 font-mono text-xs sm:text-sm font-bold text-neutral-900">
                  Netto = Brutto ÷ (1 + Steuersatz / 100)<br />
                  MwSt. = Brutto - Netto
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-xs font-bold uppercase text-neutral-600">
                  <tr>
                    <th className="px-4 py-3">Steuersatz</th>
                    <th className="px-4 py-3">Rechtsgrundlage</th>
                    <th className="px-4 py-3">Typische Anwendungsbeispiele in Deutschland</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-blue-700">19 % (Regelsteuersatz)</td>
                    <td className="px-4 py-3">§ 12 Abs. 1 UStG</td>
                    <td className="px-4 py-3 text-neutral-600">Elektronik, Kleidung, Möbel, Handwerkerleistungen, Beratung, Software, Alkohol, Restaurant-Getränke</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-emerald-700">7 % (Ermäßigter Satz)</td>
                    <td className="px-4 py-3">§ 12 Abs. 2 UStG</td>
                    <td className="px-4 py-3 text-neutral-600">Grundnahrungsmittel, Leitungswasser, Bücher, Zeitungen, ÖPNV, Hotelübernachtung, Kultur</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-700">0 % (Nullsteuersatz / Befreit)</td>
                    <td className="px-4 py-3">§ 12 Abs. 3 / § 4 UStG</td>
                    <td className="px-4 py-3 text-neutral-600">Bestimmte Photovoltaikanlagen auf Wohngebäuden, Exporte in Drittländer, medizinische Heilbehandlungen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 2 Real-world examples */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2 text-blue-600">
              <FileCheck2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                2 Praxisbeispiele aus dem Geschäfts- und Privatalltag
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Beispiel 1: Freelancer-Rechnung (Netto zu Brutto, 19 %)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Ein Webdesigner vereinbart mit einem deutschen Geschäftskunden ein Nettohonorar von <strong>2.500,00 €</strong> zuzüglich 19 % Umsatzsteuer:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Nettobetrag: <strong>2.500,00 €</strong></li>
                  <li>MwSt. (2.500 × 0,19): <strong>475,00 €</strong></li>
                  <li>Rechnungsbetrag Brutto: <strong>2.975,00 €</strong></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Beispiel 2: Fachbuch-Kauf (Brutto zu Netto, 7 %)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Ein Unternehmen kauft Fachbücher für <strong>107,00 € Brutto</strong> im Buchhandel und möchte die abziehbare Vorsteuer (7 %) ermitteln:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Nettobetrag (107 ÷ 1,07): <strong>100,00 €</strong></li>
                  <li>Enthaltene MwSt. (107 - 100): <strong>7,00 €</strong></li>
                  <li>Bruttobetrag: <strong>107,00 €</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-blue-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Häufige Fragen zur Mehrwertsteuer (FAQ)
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_DE_VAT} accent="blue" />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <strong className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Datenschutzgarantie:
              </strong>
              Alle Berechnungen erfolgen lokal in Ihrem Browser. Rechnungsbeträge werden weder gespeichert noch an Server übertragen.
            </div>
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
