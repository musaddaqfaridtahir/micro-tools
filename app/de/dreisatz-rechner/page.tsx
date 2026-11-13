import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Scale,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import DreisatzCalculator from "./DreisatzCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("dreisatz-rechner")!;

export const metadata: Metadata = {
  title: "Dreisatz Rechner – Proportional & Antiproportional mit Lösungsweg",
  description:
    "Berechnen Sie den direkten (proportionalen) und indirekten (antiproportionalen) Dreisatz blitzschnell online inklusive 3-Schritte-Lösungsweg und Beispielen.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/de/dreisatz-rechner",
  },
  openGraph: {
    title: "Dreisatz Rechner – Proportional & Antiproportional mit Lösungsweg",
    description:
      "Kostenloser Online-Dreisatz-Rechner für Schule, Studium, Handel und Alltag mit sofortigem Lösungsweg.",
    url: "/de/dreisatz-rechner",
    type: "website",
    locale: "de_DE",
    siteName: "MicroTools",
  },
};

const FAQ_DREISATZ_DATA = [
  {
    question: "Wie unterscheidet man proportionalen und antiproportionalen Dreisatz?",
    answer:
      "Beim proportionalen (direkten) Dreisatz gilt die Regel 'Je mehr, desto mehr' bzw. 'Je weniger, desto weniger' – zum Beispiel kosten doppelt so viele Kilogramm Obst auch doppelt so viel. Beim antiproportionalen (indirekten) Dreisatz gilt 'Je mehr, desto weniger' – beispielsweise benötigen doppelt so viele Arbeitskräfte für dieselbe Aufgabe nur halb so viel Zeit.",
  },
  {
    question: "Wie lautet die Formel für den direkten (proportionalen) Dreisatz?",
    answer:
      "Wenn A Einheiten genau B entsprechen und man den Wert X für C Einheiten sucht, rechnet man: X = (B ÷ A) × C. Man teilt also zuerst auf eine einzelne Einheit herunter und multipliziert anschließend mit der Zielmenge C.",
  },
  {
    question: "Wie berechnet man den indirekten (antiproportionalen) Dreisatz?",
    answer:
      "Bei einem umgekehrten Verhältnis bleibt das Produkt aus beiden Größen konstant. Die Formel lautet: X = (A × B) ÷ C. Beispiel: Schaffen 4 Pumpen ein Becken in 6 Stunden, liegt die Gesamtleistung bei 4 × 6 = 24 Pumpenstunden; 3 Pumpen benötigen dann 24 ÷ 3 = 8 Stunden.",
  },
  {
    question: "Kann man mit dem Dreisatz-Rechner auch Prozente und Rabatte berechnen?",
    answer:
      "Ja, hervorragend! Setzen Sie einfach den Grundwert als A = 100 (%) und den Eurobetrag als B ein. Geben Sie unter C den gewünschten Prozentsatz (z. B. 15 %) ein – der Rechner zeigt Ihnen sofort den genauen Rabattbetrag im proportionalen Modus.",
  },
  {
    question: "Werden meine eingegebenen Zahlen auf einem Server gespeichert?",
    answer:
      "Nein. Unser Dreisatz-Rechner arbeitet vollständig lokal im Browser-Speicher Ihres Geräts. Es erfolgt weder eine Speicherung noch eine Übertragung Ihrer Berechnungen ins Internet.",
  },
];

export default function DreisatzRechnerPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="de">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_DREISATZ_DATA}
        pageTitle="Dreisatz Rechner Online (Proportional & Antiproportional)"
        pageDescription="Kostenloser Online-Rechner für direkten und indirekten Dreisatz inklusive Schritt-für-Schritt-Lösungsweg und Praxisbeispielen."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Brotkrumennavigation" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Startseite
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/de" className="hover:text-neutral-900 transition">
            Rechner auf Deutsch (<span translate="no" className="notranslate font-bold">DE</span>)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Dreisatz Rechner
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 shadow-2xs">
            <Scale className="h-3.5 w-3.5" />
            <span>Direkter &amp; Indirekter Dreisatz mit Lösungsweg 2026</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Dreisatz Rechner Online
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Lösen Sie proportionale und antiproportionale Verhältnisgleichungen in Sekunden – inklusive{" "}
            <strong>3-Schritte-Lösungsweg</strong> zum Nachvollziehen und Lernen.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-dreisatz-de" />
        </div>

        <section aria-label="Interaktiver Dreisatz Rechner" className="mb-6 sm:mb-10">
          <DreisatzCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-dreisatz-de" />
        </div>

        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Introduction */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-violet-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Was ist der Dreisatz und warum heißt er so?
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Der <strong>Dreisatz</strong> (in der Kaufmannssprache auch <em>Schlussrechnung</em> genannt) zählt zu den wichtigsten Rechenverfahren der Mathematik im Alltag, in der kaufmännischen Ausbildung, beim Kochen sowie bei Preis- und Mengenvergleichen. Seinen Namen trägt das Verfahren, weil die Lösung stets in <strong>genau drei logischen Sätzen (Rechenschritten)</strong> ermittelt wird: Ausgangsverhältnis festhalten, Zwischenwert für eine einzelne Einheit bestimmen und schließlich auf die gesuchte Zielmenge schließen.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Ob Sie Materialmengen auf einer Baustelle hochrechnen, Rezeptzutaten für eine größere Gästezahl anpassen, die Fahrzeit bei veränderter Geschwindigkeit planen oder Rabatte ausrechnen möchten – unser kostenloser Online-Rechner wählt automatisch das richtige Rechenschema für direkte (proportionale) und indirekte (antiproportionale) Aufgaben.
            </p>
          </section>

          {/* Section 2: Step-by-step & Comparison Table */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Anleitung &amp; Formeln: Direkter vs. Indirekter Dreisatz
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">
                  1
                </span>
                <h3 className="text-sm font-bold text-neutral-900">Verhältnis wählen</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  Entscheiden Sie zwischen <strong>Proportional</strong> (&quot;je mehr, desto mehr&quot;) und <strong>Antiproportional</strong> (&quot;je mehr, desto weniger&quot;).
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">
                  2
                </span>
                <h3 className="text-sm font-bold text-neutral-900">Bekannte Werte eingeben</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  Tragen Sie die Größen A und B (bekanntes Paar) sowie den Zielwert C ein – Dezimalzahlen mit Punkt oder Komma sind möglich.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">
                  3
                </span>
                <h3 className="text-sm font-bold text-neutral-900">Lösungsweg prüfen</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  Unterhalb des Eingabefelds erscheinen automatisch das Endergebnis X sowie alle drei Teilschritte inklusive Zwischenergebnis für Einheit 1.
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="px-4 py-3.5 font-bold">Art des Dreisatzes</th>
                    <th className="px-4 py-3.5 font-bold">Grundprinzip</th>
                    <th className="px-4 py-3.5 font-bold">Mathematische Formel</th>
                    <th className="px-4 py-3.5 font-bold">Typisches Einsatzgebiet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr>
                    <td className="px-4 py-3.5 font-bold text-violet-700">Direkt (Proportional)</td>
                    <td className="px-4 py-3.5">Je mehr A, desto mehr B</td>
                    <td className="px-4 py-3.5 font-mono font-semibold text-neutral-900">X = (B ÷ A) × C</td>
                    <td className="px-4 py-3.5">Einkaufspreise, Rezepte, Prozentrechnung, Spritverbrauch</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-bold text-amber-700">Indirekt (Antiproportional)</td>
                    <td className="px-4 py-3.5">Je mehr A, desto weniger B</td>
                    <td className="px-4 py-3.5 font-mono font-semibold text-neutral-900">X = (A × B) ÷ C</td>
                    <td className="px-4 py-3.5">Arbeitszeit von Handwerkern, Geschwindigkeit &amp; Fahrzeit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Two Real-World Practical Examples */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              <FileCheck2 className="h-5 w-5 text-violet-600" />
              <span>Zwei konkrete Praxisbeispiele verständlich gerechnet</span>
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-violet-200/80 bg-violet-50/40 p-5">
                <h3 className="m-0 text-sm font-bold text-violet-900">
                  Beispiel 1 (Proportional): Supermarkt &amp; Einkaufspreis
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  <strong>Aufgabe:</strong> 5 kg Äpfel kosten 12,00 €. Wie viel kosten 8 kg derselben Sorte?
                  <br />
                  1. Satz: 5 kg ➔ 12,00 €
                  <br />
                  2. Satz: 1 kg ➔ 12,00 ÷ 5 = 2,40 €
                  <br />
                  3. Satz: 8 kg ➔ 2,40 × 8 = <strong>19,20 €</strong>.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5">
                <h3 className="m-0 text-sm font-bold text-amber-900">
                  Beispiel 2 (Antiproportional): Projektzeit &amp; Teamgröße
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  <strong>Aufgabe:</strong> 4 Maler streichen eine Fassade in 12 Stunden. Wie lange brauchen 6 Maler?
                  <br />
                  1. Satz: 4 Maler ➔ 12 Stunden
                  <br />
                  2. Satz: 1 Maler ➔ 4 × 12 = 48 Stunden Gesamtaufwand
                  <br />
                  3. Satz: 6 Maler ➔ 48 ÷ 6 = <strong>8 Stunden</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 space-y-3 text-sm text-neutral-600 leading-relaxed">
              <h3 className="m-0 text-base font-bold text-neutral-900">
                Typische Fehler beim Dreisatz vermeiden &amp; praktische Tipps für Schule und Beruf
              </h3>
              <p>
                Der häufigste Denkfehler beim Aufstellen eines Dreisatzes ist die Verwechslung von proportionalen und antiproportionalen Zusammenhängen. Stellen Sie sich vor dem Rechnen immer eine einfache Kontrollfrage: &quot;Wenn die Ausgangsgröße doppelt so groß wird, verdoppelt sich dann auch das Ergebnis – oder halbiert es sich?&quot; Verdoppelt es sich, liegt ein direkter (proportionaler) Dreisatz vor; halbiert es sich, müssen Sie den indirekten (antiproportionalen) Dreisatz anwenden.
              </p>
              <p>
                Achten Sie außerdem unbedingt auf einheitliche Maßeinheiten vor der Eingabe. Wenn etwa ein Verbrauchswert in Minuten angegeben ist und ein anderer in Stunden, oder ein Preis pro 100 Gramm gegen einen Kilopreis gerechnet werden soll, wandeln Sie beide Werte zunächst auf dieselbe Einheit um. Im kaufmännischen Alltag – etwa bei der Preiskalkulation, Skonto- und Rabattberechnung, bei Rezeptumrechnungen oder Mischungsverhältnissen im Handwerk – sorgt diese kurze Vorprüfung für absolut fehlerfreie Resultate.
              </p>
            </div>
          </section>

          {/* Section 4: 5 FAQs */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2.5 text-violet-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Häufig gestellte Fragen (FAQ) zum Dreisatz
              </h2>
            </div>

            <FaqAccordion faqs={FAQ_DREISATZ_DATA} dir="ltr" accent="violet" />
          </section>
        </article>

        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="mb-1 flex items-center justify-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>Sofortige Berechnung ohne Datenübertragung</span>
          </div>
          <p className="mx-auto max-w-xl text-emerald-700">
            <Sparkles className="mr-1 inline h-3.5 w-3.5" />
            Ideal für Schüler, Auszubildende und Unternehmen – 100 % kostenfrei und datenschutzkonform.
          </p>
        </aside>

        <RelatedTools currentToolId="dreisatz-rechner" language="de" />
      </div>
    </div>
  );
}
