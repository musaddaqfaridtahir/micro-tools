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
import FrenchPercentageCalculator from "./FrenchPercentageCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("calcul-pourcentage")!;

export const metadata: Metadata = {
  title: "Calculateur de Pourcentage et Remise (Soldes) – Gratuit en Ligne",
  description:
    "Calculez facilement un pourcentage d'un nombre, un taux d'évolution (augmentation/baisse) et le prix final après remise ou soldes (-10%, -20%, -30%, -50%) avec économie en €.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/fr/calcul-pourcentage",
  },
  openGraph: {
    title: "Calculateur de Pourcentage et Remise (Soldes) en Ligne",
    description:
      "Calculez instantanément prix soldés, remises commerciales, pourcentage simple et variation entre deux montants sans inscription.",
    url: "/fr/calcul-pourcentage",
    type: "website",
    locale: "fr_FR",
    siteName: "MicroTools",
  },
};

const FAQ_FR_PCT = [
  {
    question: "Comment calculer le prix final après une remise ou des soldes ?",
    answer:
      "Multipliez le prix initial par (1 - pourcentage de remise / 100). Par exemple, pour un article à 120 € soldé à -30 %, le calcul est 120 × 0,70 = 84 €. L'économie réalisée est de 120 - 84 = 36 €.",
  },
  {
    question: "Comment calculer un pourcentage d'augmentation ou de baisse entre deux valeurs ?",
    answer:
      "Utilisez la formule du taux d'évolution : ((Valeur finale - Valeur initiale) ÷ Valeur initiale) × 100. Si le résultat est positif, c'est une hausse ; s'il est négatif, il s'agit d'une baisse.",
  },
  {
    question: "Comment calculer rapidement X % d'un nombre ?",
    answer:
      "Il suffit de multiplier le nombre total par X puis de diviser par 100 : Résultat = (Nombre × X) ÷ 100. Par exemple, 20 % de 450 € équivaut à (450 × 20) ÷ 100 = 90 €.",
  },
  {
    question: "Pourquoi deux remises successives de -20 % et -10 % ne font pas -30 % ?",
    answer:
      "La deuxième remise s'applique sur le prix déjà réduit et non sur le prix de départ. Sur 100 €, -20 % donne 80 €, puis -10 % sur 80 € retire 8 €, soit un prix final de 72 € (une réduction réelle de 28 % et non 30 %).",
  },
  {
    question: "Puis-je retrouver le prix d'origine avant une réduction ?",
    answer:
      "Oui ! Si un produit coûte 70 € après -30 % de remise, il représente 70 % du prix initial. Divisez donc 70 € par 0,70 (soit 1 - 0,30) pour retrouver le prix d'origine de 100 €.",
  },
];

export default function CalculPourcentagePage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="fr">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_FR_PCT}
        pageTitle="Calculateur de Pourcentage et Remise (Soldes)"
        pageDescription="Calculez un pourcentage simple, une variation en % entre deux valeurs et vos économies lors des soldes (-10%, -20%, -30%, -50%)."
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
            Calculateur de Pourcentage &amp; Soldes
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 shadow-2xs">
            <Percent className="h-3.5 w-3.5" />
            <span>Soldes, Taux d&apos;évolution &amp; Pourcentage simple</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculateur de Pourcentage et Remise
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Calculez instantanément le <strong>prix final après remise (-10 %, -20 %, -30 %, -50 %)</strong>,{" "}
            le <strong>pourcentage d&apos;un montant</strong> ou le <strong>taux d&apos;évolution</strong> entre deux valeurs.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-pourcentage-fr" />
        </div>

        <section aria-label="Calculateur de pourcentage et soldes" className="mb-6 sm:mb-10">
          <FrenchPercentageCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-pourcentage-fr" />
        </div>

        {/* 700+ Word French SEO Guide */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-violet-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Maîtriser le calcul de pourcentage, des remises et des variations
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Que vous prépariez vos achats pendant les <strong>soldes d&apos;hiver ou d&apos;été</strong>, vérifiiez une remise commerciale sur un devis, calculiez l&apos;évolution de votre chiffre d&apos;affaires ou analysiez une augmentation de loyer ou de salaire, le <strong>calcul de pourcentage</strong> intervient au quotidien. Pourtant, dès qu&apos;il faut passer d&apos;un taux en pour cent à un montant exact en euros — ou comparer deux chiffres entre deux années — les erreurs d&apos;arrondi sont fréquentes.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Notre <strong>Calculateur de Pourcentage et Remise</strong> réunit dans une interface unique les trois calculs les plus recherchés en France : la détermination rapide d&apos;un prix soldé avec boutons raccourcis (-10 %, -20 %, -30 %, -50 %), le calcul d&apos;une fraction en pourcentage d&apos;un nombre donné, et le taux d&apos;évolution positif ou négatif entre une valeur de départ et une valeur d&apos;arrivée.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              En période de soldes, de ventes privées ou lors d&apos;une négociation commerciale B2B, connaître immédiatement le montant exact économisé en euros permet de vérifier la réalité d&apos;une promotion affichée en vitrine ou sur une facture fournisseur. Le détail de la formule affichée sous les champs vous aide également à comprendre le coefficient multiplicateur utilisé pour vos devis et tableaux de suivi budgétaire.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Mode d&apos;emploi, formules officielles et tableau des soldes
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm sm:text-base text-neutral-700">
              <li>Sélectionnez l&apos;onglet adapté : <strong>Remise / Soldes</strong>, <strong>Pourcentage d&apos;un nombre</strong> ou <strong>Évolution (% hausse / baisse)</strong>.</li>
              <li>Saisissez vos chiffres ou cliquez sur un exemple rapide pour préremplir la simulation.</li>
              <li>Dans le mode Soldes, utilisez les pastilles <strong>-10 %</strong>, <strong>-20 %</strong>, <strong>-30 %</strong> ou <strong>-50 %</strong> (ou saisissez n&apos;importe quelle démarque personnalisée).</li>
              <li>Consultez immédiatement le prix payé, l&apos;économie réalisée en euros et copiez le montant en un clic.</li>
            </ol>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-xs font-bold uppercase text-neutral-600">
                  <tr>
                    <th className="px-4 py-3">Taux de remise</th>
                    <th className="px-4 py-3">Coefficient multiplicateur</th>
                    <th className="px-4 py-3">Prix initial 50 €</th>
                    <th className="px-4 py-3">Prix initial 100 €</th>
                    <th className="px-4 py-3">Prix initial 200 €</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-violet-700">-10 %</td>
                    <td className="px-4 py-3 font-mono text-xs">× 0,90</td>
                    <td className="px-4 py-3">45,00 €</td>
                    <td className="px-4 py-3">90,00 €</td>
                    <td className="px-4 py-3">180,00 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-violet-700">-20 %</td>
                    <td className="px-4 py-3 font-mono text-xs">× 0,80</td>
                    <td className="px-4 py-3">40,00 €</td>
                    <td className="px-4 py-3">80,00 €</td>
                    <td className="px-4 py-3">160,00 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-violet-700">-30 %</td>
                    <td className="px-4 py-3 font-mono text-xs">× 0,70</td>
                    <td className="px-4 py-3">35,00 €</td>
                    <td className="px-4 py-3">70,00 €</td>
                    <td className="px-4 py-3">140,00 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-emerald-700">-50 %</td>
                    <td className="px-4 py-3 font-mono text-xs">× 0,50</td>
                    <td className="px-4 py-3">25,00 €</td>
                    <td className="px-4 py-3">50,00 €</td>
                    <td className="px-4 py-3">100,00 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2 text-violet-600">
              <FileCheck2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                2 exemples pratiques détaillés
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Exemple 1 : Remise pendant les soldes (-30 %)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Une paire de chaussures affichée à <strong>120,00 €</strong> bénéficie d&apos;une remise de <strong>30 %</strong> en magasin :
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Économie réalisée : 120 × 0,30 = <strong>36,00 €</strong></li>
                  <li>Prix net à payer en caisse : 120 - 36 = <strong>84,00 €</strong></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Exemple 2 : Calcul d&apos;augmentation salariale (%)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Votre rémunération passe de <strong>1 800 €</strong> à <strong>2 070 €</strong> net par mois. Quel est le pourcentage d&apos;augmentation ?
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Différence absolue : 2 070 - 1 800 = <strong>+270,00 €</strong></li>
                  <li>Taux d&apos;évolution : (270 ÷ 1 800) × 100 = <strong>+15 %</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-violet-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Questions fréquentes sur les pourcentages et remises
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_FR_PCT} accent="violet" />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <strong className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Confidentialité totale :
              </strong>
              Tous les calculs s&apos;exécutent localement dans votre navigateur. Aucune donnée financière n&apos;est transmise ou conservée.
            </div>
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
