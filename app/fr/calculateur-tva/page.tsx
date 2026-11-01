import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck2,
  BookOpen,
  ArrowRightLeft,
  Info,
} from "lucide-react";
import VatCalculator from "./VatCalculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Calculateur de TVA en Ligne – Calcul HT en TTC et Inversement (Gratuit)",
  description:
    "Calculez facilement la TVA (20%, 10%, 5.5%, 2.1%) avec notre calculateur de TVA gratuit. Convertissez un montant HT en TTC ou TTC en HT instantanément.",
  alternates: {
    canonical: "/fr/calculateur-tva",
  },
  openGraph: {
    title: "Calculateur de TVA en Ligne – Calcul HT en TTC et Inversement (Gratuit)",
    description:
      "Calculez facilement la TVA (20%, 10%, 5.5%, 2.1%) avec notre calculateur de TVA gratuit. Convertissez un montant HT en TTC ou TTC en HT instantanément.",
    url: "/fr/calculateur-tva",
    type: "website",
    locale: "fr_FR",
    siteName: "MicroTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de TVA en Ligne – Calcul HT en TTC et Inversement (Gratuit)",
    description:
      "Calculez facilement la TVA (20%, 10%, 5.5%, 2.1%) avec notre calculateur de TVA gratuit. Convertissez un montant HT en TTC ou TTC en HT instantanément.",
  },
};

const FAQ_DATA = [
  {
    question: "Comment calculer le montant HT à partir du TTC ?",
    answer:
      "Pour calculer le montant Hors Taxes (HT) à partir d'un prix Toutes Taxes Comprises (TTC), vous devez diviser le montant TTC par (1 + Taux de TVA / 100). Par exemple, pour un montant TTC de 120 € avec une TVA à 20 %, la formule est : 120 / 1,20 = 100 € HT. La TVA correspondante est ensuite de 120 - 100 = 20 €.",
  },
  {
    question: "Quelle est la formule de calcul de la TVA à 20 % ?",
    answer:
      "Pour ajouter 20 % de TVA à un montant HT : Montant TVA = Montant HT × 0,20. Montant TTC = Montant HT × 1,20. À l'inverse, pour extraire la TVA d'un montant TTC : Montant HT = Montant TTC / 1,20 et Montant TVA = Montant TTC - Montant HT.",
  },
  {
    question: "Qui est concerné par la franchise en base de TVA en France ?",
    answer:
      "La franchise en base de TVA s'applique principalement aux micro-entrepreneurs et auto-entrepreneurs ne dépassant pas certains plafonds annuels de chiffre d'affaires. Sous ce régime, aucune TVA n'est facturée aux clients (avec la mention légale obligatoire 'TVA non applicable, art. 293 B du CGI'), et la TVA sur les achats ne peut pas être récupérée.",
  },
  {
    question: "Pourquoi existe-t-il 4 taux de TVA différents en France ?",
    answer:
      "L'État français module les taux de TVA selon la nature essentielle ou économique des biens et services. Les produits de première nécessité (alimentation de base, livres, abonnements d'énergie) bénéficient du taux réduit à 5,5 %, la restauration et les rénovations ont un taux intermédiaire à 10 %, les médicaments remboursables et la presse ont un taux particulier à 2,1 %, tandis que la majorité des biens et services relèvent du taux normal à 20 %.",
  },
];

export default function VatCalculatorPage() {
  // Structured Data (JSON-LD) for SEO Rich Snippets
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
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
    name: "Calculateur de TVA en Ligne",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Outil gratuit de calcul de la taxe sur la valeur ajoutée (TVA) en France : conversion HT en TTC et TTC en HT aux taux de 20%, 10%, 5.5% et 2.1%.",
  };

  return (
    <div className="py-8 sm:py-12" lang="fr">
      {/* Schema.org JSON-LD Script Tags */}
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
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#tools" className="hover:text-neutral-900 transition">
            Outils Fiscaux
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Calculateur de TVA France
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs mb-3">
            <Zap className="h-3.5 w-3.5" />
            <span>Mis à jour pour la fiscalité française 2024 - 2026</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculateur de TVA en Ligne
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            Convertissez facilement un montant <strong>Hors Taxes (HT)</strong> en{" "}
            <strong>Toutes Taxes Comprises (TTC)</strong> et inversement avec les taux officiels de 20 %, 10 %, 5,5 % et 2,1 %.
          </p>
        </header>

        {/* 1. TOP AD BANNER PLACEHOLDER (Above Tool) */}
        <div className="mb-8">
          <AdBanner position="top" adSlot="banner-top-calculateur-tva" />
        </div>

        {/* 2. THE VAT CALCULATOR (Client Component) */}
        <section aria-label="Outil de calcul de TVA interactif" className="mb-10">
          <VatCalculator />
        </section>

        {/* 3. IN-CONTENT AD BANNER PLACEHOLDER (Below Tool) */}
        <div className="my-10">
          <AdBanner position="in-content" adSlot="content-banner-calculateur-tva" />
        </div>

        {/* 4. HIGH-QUALITY NATIVE FRENCH SEO CONTENT */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Introduction */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                La Taxe sur la Valeur Ajoutée (TVA) en France : Comprendre le HT et le TTC
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-4">
              En France, la <strong>Taxe sur la Valeur Ajoutée (TVA)</strong> est un impôt indirect général sur la consommation. 
              Elle s&apos;applique à la quasi-totalité des livraisons de biens et des prestations de services. 
              Pour les entreprises, auto-entrepreneurs, artisans et commerçants, la maîtrise du passage du montant <strong>Hors Taxes (HT)</strong> au montant <strong>Toutes Taxes Comprises (TTC)</strong> est fondamentale pour établir des devis précis, émettre des factures légales et anticiper les déclarations auprès de l&apos;administration fiscale.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
              Notre calculateur de TVA a été spécifiquement développé pour offrir aux professionnels et aux particuliers un calcul <strong>instantané, sans publicité intrusive et 100 % conforme</strong> aux règles d&apos;arrondi de la direction générale des Finances publiques (DGFiP).
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900">Pour les Entreprises & PME</span>
                <p className="mt-1 text-xs text-neutral-600">
                  Établissez rapidement vos prix de vente et vérifiez vos factures fournisseurs.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900">Pour les Freelances & Artisans</span>
                <p className="mt-1 text-xs text-neutral-600">
                  Calculez immédiatement le montant de la TVA à collecter ou à reverser à l&apos;État.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900">Pour les Consommateurs</span>
                <p className="mt-1 text-xs text-neutral-600">
                  Connaissez le prix réel hors taxe d&apos;un achat ou d&apos;une prestation de service.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Comment fonctionne notre calculateur & Formules Mathématiques */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <ArrowRightLeft className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Comment fonctionne notre calculateur de TVA ?
              </h2>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              L&apos;outil utilise un algorithme de calcul réactif côté client pour vous donner des résultats immédiats en 3 étapes simples :
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  1
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Choisissez le sens du calcul</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Sélectionnez <strong>&quot;HT vers TTC&quot;</strong> pour ajouter la taxe, ou <strong>&quot;TTC vers HT&quot;</strong> pour déduire la taxe d&apos;un prix global.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  2
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Entrez votre montant</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Saisissez la valeur en euros. Les centimes avec virgule ou point sont acceptés et pris en compte en temps réel.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  3
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Sélectionnez le taux de TVA</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Cliquez sur l&apos;un des taux officiels français (20 %, 10 %, 5,5 %, 2,1 %) ou saisissez un taux sur-mesure.
                </p>
              </div>
            </div>

            {/* Mathematical Formulas Card */}
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-blue-600" />
                Formules Mathématiques Officielles
              </h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-white p-4 border border-blue-200/70 shadow-2xs">
                  <span className="text-xs font-bold text-blue-800">Formule 1 : Calculer le TTC à partir du HT</span>
                  <div className="mt-2 font-mono text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-neutral-900">
                    Montant TTC = HT × (1 + Taux / 100)
                    <br />
                    Montant TVA = HT × (Taux / 100)
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-500">
                    Exemple à 20 % : 100 € HT × 1,20 = <strong>120,00 € TTC</strong>.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-blue-200/70 shadow-2xs">
                  <span className="text-xs font-bold text-blue-800">Formule 2 : Calculer le HT à partir du TTC</span>
                  <div className="mt-2 font-mono text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-neutral-900">
                    Montant HT = TTC / (1 + Taux / 100)
                    <br />
                    Montant TVA = TTC - HT
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-500">
                    Exemple à 20 % : 120 € TTC / 1,20 = <strong>100,00 € HT</strong> (TVA = 20 €).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Les différents taux de TVA en France */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
              Les différents taux de TVA applicables en France
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Le Code Général des Impôts (CGI) prévoit quatre taux de TVA en France métropolitaine, applicables selon la nature des biens et prestations :
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="py-3.5 px-4 font-bold">Taux</th>
                    <th className="py-3.5 px-4 font-bold">Dénomination</th>
                    <th className="py-3.5 px-4 font-bold">Domaines d&apos;application principaux</th>
                    <th className="py-3.5 px-4 font-bold">Coefficient HT / TTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-blue-600 text-base">20 %</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Taux normal</td>
                    <td className="py-3.5 px-4">
                      Majorité des ventes de biens de consommation courante, matériel informatique, prestations de services, alcool, habillement, honoraires.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">× 1,20 ou ÷ 1,20</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-blue-600 text-base">10 %</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Taux intermédiaire</td>
                    <td className="py-3.5 px-4">
                      Restauration (consommation sur place), transport de voyageurs, travaux de rénovation de logements achevés depuis plus de 2 ans, musées, foires.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">× 1,10 ou ÷ 1,10</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-blue-600 text-base">5,5 %</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Taux réduit</td>
                    <td className="py-3.5 px-4">
                      Produits alimentaires de première nécessité, abonnements gaz et électricité, livres (papier et numérique), cantines scolaires, équipements pour personnes handicapées.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">× 1,055 ou ÷ 1,055</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-blue-600 text-base">2,1 %</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Taux particulier</td>
                    <td className="py-3.5 px-4">
                      Médicaments remboursables par la Sécurité sociale, presse écrite et publications d&apos;information en ligne reconnues par la CPPAP, redevance audiovisuelle.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">× 1,021 ou ÷ 1,021</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-xl bg-neutral-50 p-4 border border-neutral-200/80 text-xs text-neutral-500 flex items-start gap-2">
              <Info className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note géographique :</strong> Des taux spécifiques s&apos;appliquent en Corse (ex: 0,90 %, 2,1 %, 10 %, 13 %, 20 %) ainsi que dans les départements d&apos;outre-mer (Guadeloupe, Martinique, La Réunion avec un taux normal à 8,5 %). Vous pouvez utiliser notre option <em>&quot;Taux personnalisé&quot;</em> pour ces territoires.
              </span>
            </div>
          </section>

          {/* Section 4: Foire Aux Questions (FAQ) */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-6">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Foire Aux Questions (FAQ) – Tout sur le calcul de la TVA
              </h2>
            </div>

            <div className="divide-y divide-neutral-200">
              {FAQ_DATA.map((faq, index) => (
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
            <span>Confidentialité et Précision Numérique Garanties</span>
          </div>
          <p className="text-emerald-700 max-w-xl mx-auto">
            Ce calculateur s&apos;exécute à 100 % dans la mémoire vive de votre navigateur sans aucun cookie publicitaire intrusif. 
            Aucun montant n&apos;est enregistré sur un serveur distant.
          </p>
        </aside>
      </div>
    </div>
  );
}
