import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Car,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import MileageCalculator from "./MileageCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("frais-kilometriques")!;

export const metadata: Metadata = {
  title: "Calculateur Frais Kilométriques 2026 – Barème Fiscal Auto & Électrique",
  description:
    "Calculez gratuitement vos frais kilométriques déductibles des impôts en France selon le barème fiscal 2026 (3 CV à 7 CV+) avec majoration +20 % pour véhicule électrique.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/fr/frais-kilometriques",
  },
  openGraph: {
    title: "Calculateur Frais Kilométriques 2026 – Barème Fiscal Auto & Électrique",
    description:
      "Simulateur gratuit d'indemnités kilométriques en France (frais réels impôts, auto 3 à 7 CV+ et bonus électrique +20%).",
    url: "/fr/frais-kilometriques",
    type: "website",
    locale: "fr_FR",
    siteName: "MicroTools",
  },
};

const FAQ_MILEAGE_DATA = [
  {
    question: "Quand est-il intéressant d'opter pour les frais kilométriques plutôt que l'abattement de 10 % ?",
    answer:
      "L'administration fiscale applique automatiquement un abattement forfaitaire de 10 % sur les salaires. Vous avez intérêt à opter pour les frais réels (barème kilométrique) dès que vos indemnités kilométriques professionnelles et trajets domicile-travail dépassent ces 10 % du revenu imposable.",
  },
  {
    question: "La majoration de 20 % s'applique-t-elle aux voitures hybrides rechargeables ?",
    answer:
      "Non. Selon la doctrine fiscale française, la majoration de 20 % du barème kilométrique est réservée exclusivement aux véhicules fonctionnant à l'énergie 100 % électrique (ou à hydrogène). Les véhicules hybrides, même rechargeables, restent soumis au barème thermique classique.",
  },
  {
    question: "Quelle distance maximale peut-on déclarer pour le trajet domicile-travail ?",
    answer:
      "En règle générale, la distance retenue entre le domicile et le lieu de travail est plafonnée à 40 kilomètres par trajet simple (soit 80 km aller-retour par jour travaillé), sauf circonstances professionnelles ou familiales exceptionnelles dûment justifiées auprès des impôts.",
  },
  {
    question: "Que couvre exactement le barème kilométrique fiscal ?",
    answer:
      "Le barème inclut forfaitairement la dépréciation du véhicule, les frais de réparation et d'entretien, le remplacement des pneumatiques, la consommation de carburant ou d'électricité ainsi que la prime d'assurance. Vous pouvez toutefois ajouter séparément les frais de péage et de stationnement professionnels sur justificatifs.",
  },
  {
    question: "Où trouver la puissance fiscale (CV) de mon véhicule ?",
    answer:
      "La puissance administrative est indiquée à la ligne P.6 de votre certificat d'immatriculation (carte grise). Au-delà de 7 chevaux fiscaux, c'est toujours la tranche '7 CV et plus' qui s'applique sans majoration supplémentaire.",
  },
];

export default function FraisKilometriquesPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="fr">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_MILEAGE_DATA}
        pageTitle="Calculateur Frais Kilométriques France 2026"
        pageDescription="Outil gratuit de calcul du barème kilométrique fiscal français 2026 pour véhicules thermiques et 100 % électriques."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/fr" className="hover:text-neutral-900 transition">
            Outils Français (<span translate="no" className="notranslate font-bold">FR</span>)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Frais Kilométriques 2026
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-800 shadow-2xs">
            <Car className="h-3.5 w-3.5" />
            <span>Barème kilométrique officiel applicable 2026</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculateur Frais Kilométriques 2026
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Calculez vos <strong>indemnités kilométriques</strong> et frais réels déductibles des impôts en fonction de vos kilomètres parcourus, de la puissance fiscale (3 CV à 7 CV+) et de la majoration électrique.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-frais-km-fr" />
        </div>

        <section aria-label="Calculateur de frais kilométriques" className="mb-6 sm:mb-10">
          <MileageCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-frais-km-fr" />
        </div>

        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-teal-700">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Comment fonctionne le barème kilométrique en France ?
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              En France, les salariés utilisant leur véhicule personnel pour leurs trajets domicile-travail ou déplacements professionnels peuvent renoncer à la déduction forfaitaire automatique de 10 % et déclarer leurs <strong>frais réels</strong> lors de la déclaration de revenus. Les dirigeants de sociétés, consultants indépendants et professions libérales utilisent également ce barème pour calculer leurs <strong>indemnités kilométriques (IK)</strong> exonérées de charges sociales et d&apos;impôt sur le revenu.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Le calcul repose sur deux variables officielles : la puissance administrative du véhicule (de <strong>3 CV et moins</strong> jusqu&apos;à <strong>7 CV et plus</strong>) et trois tranches annuelles de distance parcourue à titre professionnel (<em>d</em>). Afin d&apos;encourager la mobilité propre, les véhicules <strong>100 % électriques bénéficient d&apos;une majoration supplémentaire de 20 %</strong> sur le résultat obtenu.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Grille officielle et formules par tranche kilométrique
            </h2>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="px-4 py-3.5 font-bold">Puissance fiscale</th>
                    <th className="px-4 py-3.5 font-bold">Jusqu&apos;à 5 000 km</th>
                    <th className="px-4 py-3.5 font-bold">De 5 001 à 20 000 km</th>
                    <th className="px-4 py-3.5 font-bold">Plus de 20 000 km</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600 font-mono">
                  <tr>
                    <td className="px-4 py-3.5 font-sans font-semibold text-neutral-900">3 CV et moins</td>
                    <td className="px-4 py-3.5">d × 0,529</td>
                    <td className="px-4 py-3.5">(d × 0,316) + 1 065</td>
                    <td className="px-4 py-3.5">d × 0,370</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-sans font-semibold text-neutral-900">4 CV</td>
                    <td className="px-4 py-3.5">d × 0,606</td>
                    <td className="px-4 py-3.5">(d × 0,340) + 1 330</td>
                    <td className="px-4 py-3.5">d × 0,407</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-sans font-semibold text-neutral-900">5 CV</td>
                    <td className="px-4 py-3.5">d × 0,636</td>
                    <td className="px-4 py-3.5">(d × 0,357) + 1 395</td>
                    <td className="px-4 py-3.5">d × 0,427</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-sans font-semibold text-neutral-900">6 CV</td>
                    <td className="px-4 py-3.5">d × 0,665</td>
                    <td className="px-4 py-3.5">(d × 0,374) + 1 457</td>
                    <td className="px-4 py-3.5">d × 0,447</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-sans font-semibold text-neutral-900">7 CV et plus</td>
                    <td className="px-4 py-3.5">d × 0,697</td>
                    <td className="px-4 py-3.5">(d × 0,394) + 1 515</td>
                    <td className="px-4 py-3.5">d × 0,470</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-neutral-900">
              <FileCheck2 className="h-5 w-5 text-teal-600" />
              <span>Deux exemples concrets d&apos;application</span>
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-teal-200/80 bg-teal-50/40 p-5">
                <h4 className="m-0 text-sm font-bold text-teal-900">
                  Exemple 1 : Trajets domicile-travail avec une citadine 4 CV (3 500 km)
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  Pour <strong>3 500 km</strong> (tranche ≤ 5 000 km) avec une voiture essence de <strong>4 CV</strong>, la formule est <code>3 500 × 0,606 = 2 121,00 €</code> déductibles.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5">
                <h4 className="m-0 text-sm font-bold text-emerald-900">
                  Exemple 2 : Commercial en véhicule 5 CV 100 % électrique (12 000 km)
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  Base tranche 2 : <code>(12 000 × 0,357) + 1 395 = 5 679,00 €</code>. Avec le bonus véhicule électrique (+20 %, soit +1 135,80 €), le montant total atteint <strong>6 814,80 €</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 space-y-3 text-sm text-neutral-600 leading-relaxed">
              <h3 className="text-base font-bold text-neutral-900 m-0">
                Justificatifs obligatoires et règles clés pour votre déclaration fiscale 2026
              </h3>
              <p>
                Pour sécuriser votre déduction aux frais réels en cas de demande de l&apos;administration fiscale, vous devez pouvoir justifier la réalité des déplacements professionnels ainsi que la propriété ou location du véhicule (carte grise à votre nom ou à celui de votre conjoint marié/pacsé, ou contrat de location longue durée). En pratique, il est recommandé de tenir un relevé kilométrique mensuel précisant la date, le motif professionnel, le lieu de destination et le nombre de kilomètres parcourus.
              </p>
              <p>
                Rappel important pour les salariés : l&apos;option des frais réels vous oblige à réintégrer dans votre revenu imposable les éventuelles allocations forfaitaires pour frais d&apos;emploi versées par votre employeur (remboursements de transports ou indemnités de déplacement). Vérifiez donc systématiquement que le total obtenu grâce au barème kilométrique majoré de vos péages et frais de repas dépasse bien les 10 % d&apos;abattement automatique avant de cocher la case correspondante dans votre déclaration d&apos;impôts sur les revenus.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2.5 text-teal-700">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Questions Fréquentes (FAQ) sur les Frais Kilométriques
              </h2>
            </div>

            <FaqAccordion faqs={FAQ_MILEAGE_DATA} dir="ltr" accent="teal" />
          </section>
        </article>

        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="mb-1 flex items-center justify-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>Calcul Confidentiel Sans Conservation</span>
          </div>
          <p className="mx-auto max-w-xl text-emerald-700">
            <Sparkles className="mr-1 inline h-3.5 w-3.5" />
            Aucun kilométrage ni donnée fiscale personnelle n&apos;est transmis à nos serveurs.
          </p>
        </aside>

        <RelatedTools currentToolId="frais-kilometriques" language="fr" />
      </div>
    </div>
  );
}
