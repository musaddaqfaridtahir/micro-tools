import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Briefcase,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SalaryCalculator from "./SalaryCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("calcul-brut-net")!;

export const metadata: Metadata = {
  title: "Calcul Salaire Brut en Net France 2026 – Cadre, Non-Cadre & Public",
  description:
    "Convertissez instantanément votre salaire brut en net (mensuel et annuel) selon votre statut : Non-Cadre (-22%), Cadre (-25%) ou Fonction Publique (-15%) avec prélèvement à la source.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/fr/calcul-brut-net",
  },
  openGraph: {
    title: "Calcul Salaire Brut en Net France 2026 – Cadre, Non-Cadre & Public",
    description:
      "Simulateur gratuit de salaire brut en net en France : Non-Cadre, Cadre, Fonction publique, SMIC 2026 et net après impôt à la source.",
    url: "/fr/calcul-brut-net",
    type: "website",
    locale: "fr_FR",
    siteName: "MicroTools",
  },
};

const FAQ_SALARY_DATA = [
  {
    question: "Comment calculer rapidement son salaire net à partir du brut en France ?",
    answer:
      "Pour obtenir une estimation fiable en 2026, retirez environ 22 % de cotisations sociales salariales pour un salarié non-cadre (coefficient × 0,78), environ 25 % pour un cadre (× 0,75) en incluant les tranches Agirc-Arrco et l'APEC, et environ 15 % pour un agent de la fonction publique (× 0,85).",
  },
  {
    question: "Pourquoi les cadres paient-ils légèrement plus de cotisations que les non-cadres ?",
    answer:
      "Les salariés ayant le statut cadre cotisent à la prévoyance obligatoire cadre (minimum 1,50 % sur la tranche 1 pris en charge par l'employeur mais impactant l'assiette sociale), à l'APEC (Association Pour l'Emploi des Cadres, 0,024 % part salariale) et à la CET (Contribution d'Équilibre Technique) au-delà du plafond de la Sécurité sociale.",
  },
  {
    question: "Quelle est la différence entre le Net à payer avant impôt et le Net après impôt ?",
    answer:
      "Le salaire net avant impôt (ou net imposable ajusté) correspond à votre rémunération après déduction des cotisations sociales salariales. Depuis l'instauration du Prélèvement à la Source (PAS), votre employeur déduit directement l'impôt sur le revenu selon votre taux personnalisé transmis par la DGFiP pour verser le Net à payer final sur votre compte bancaire.",
  },
  {
    question: "Comment calculer son salaire mensuel si le contrat prévoit un 13ème mois ?",
    answer:
      "Si votre contrat fixe un salaire brut annuel de 39 000 € réparti sur 13 mois, chaque versement mensuel standard est égal à 39 000 ÷ 13 = 3 000 € brut par mois, et vous percevrez une prime équivalente à un 13ème mois (en une ou deux fois selon votre convention collective).",
  },
  {
    question: "Les données saisies dans ce simulateur brut/net sont-elles conservées ?",
    answer:
      "Non. L'intégralité des calculs de rémunération s'exécute localement dans votre navigateur web via JavaScript côté client. Aucun salaire, taux d'imposition ou statut n'est transmis ni stocké sur nos serveurs.",
  },
];

export default function CalculBrutNetPage() {
  return (
    <div className="py-8 sm:py-12" lang="fr">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_SALARY_DATA}
        pageTitle="Calculateur Salaire Brut en Net France 2026"
        pageDescription="Convertisseur salaire brut en net mensuel et annuel pour salarié Non-Cadre, Cadre et Fonction Publique en France avec estimation du prélèvement à la source."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/fr" className="hover:text-neutral-900 transition">
            Outils Français (FR)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Salaire Brut en Net
          </span>
        </nav>

        <header className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-2xs">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Barèmes sociaux et cotisations France 2026</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculateur Salaire Brut en Net
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            Convertissez instantanément votre rémunération <strong>Brute en Net</strong> (ou Net en Brut) en mode{" "}
            <strong>Mensuel ou Annuel</strong> selon votre statut (Non-Cadre, Cadre, Fonction Publique).
          </p>
        </header>

        <div className="mb-8">
          <AdSlot position="top" adSlot="banner-top-brut-net-fr" />
        </div>

        <section aria-label="Simulateur interactif de salaire brut en net" className="mb-10">
          <SalaryCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-brut-net-fr" />
        </div>

        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Understanding Brut vs Net */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-indigo-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Comprendre le passage du Salaire Brut au Salaire Net en 2026
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Lors d&apos;une négociation d&apos;embauche, d&apos;un renouvellement de contrat ou d&apos;un changement de poste en France, la rémunération est quasi systématiquement exprimée en <strong>salaire brut annuel ou mensuel</strong>. Pourtant, la somme réellement versée sur votre compte bancaire chaque mois correspond au <strong>salaire net après impôt</strong>. Connaître précisément l&apos;écart entre ces deux valeurs vous évite toute mauvaise surprise budgétaire et vous permet de comparer objectivement deux offres d&apos;emploi.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              La différence entre le brut et le net correspond aux <strong>cotisations sociales salariales</strong> obligatoires prélevées par l&apos;employeur et reversées aux organismes publics (URSSAF, caisse de retraite complémentaire Agirc-Arrco, assurance vieillesse de la Sécurité sociale, CSG déductible et non déductible, CRDS). Depuis l&apos;entrée en vigueur du prélèvement à la source, s&apos;ajoute enfin la retenue d&apos;impôt sur le revenu calculée selon votre taux personnalisé.
            </p>
          </section>

          {/* Section 2: Step by step + Mathematical Formulas */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Comment utiliser le simulateur et quelles sont les formules ?
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                  1
                </span>
                <h3 className="text-sm font-bold text-neutral-900">Sens &amp; Périodicité</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  Choisissez entre <strong>Brut → Net</strong> ou <strong>Net → Brut</strong>, puis sélectionnez l&apos;affichage en base mensuelle ou annuelle (12 ou 13 mois).
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                  2
                </span>
                <h3 className="text-sm font-bold text-neutral-900">Statut Professionnel</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  Sélectionnez Non-Cadre (22 %), Cadre (25 %) ou Fonction Publique (15 %) afin d&apos;appliquer le taux moyen de charges salariales adapté.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                  3
                </span>
                <h3 className="text-sm font-bold text-neutral-900">Impôt &amp; Temps partiel</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  Ajustez votre taux de prélèvement à la source (PAS) et votre quotité de travail (100 %, 80 %, 50 %) pour obtenir votre reste à vivre réel.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-900">
                <FileCheck2 className="h-4 w-4 text-indigo-600" />
                Formules Mathématiques de Conversion
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-indigo-200/70 bg-white p-4">
                  <span className="text-xs font-bold text-indigo-800">Conversion Brut → Net</span>
                  <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs text-neutral-900">
                    Net Avant Impôt = Brut × (1 - Taux Cotisations)
                    <br />
                    Net Après Impôt = Net Avant Impôt × (1 - Taux PAS)
                  </div>
                </div>
                <div className="rounded-xl border border-indigo-200/70 bg-white p-4">
                  <span className="text-xs font-bold text-indigo-800">Conversion Net → Brut</span>
                  <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs text-neutral-900">
                    Brut = Net Avant Impôt ÷ (1 - Taux Cotisations)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 2026 Rates Table & 2 Practical Examples */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Tableau des taux de charges salariales en France (2026)
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="px-4 py-3.5 font-bold">Statut salarié</th>
                    <th className="px-4 py-3.5 font-bold">Taux moyen de retenues</th>
                    <th className="px-4 py-3.5 font-bold">Coefficient multiplicateur</th>
                    <th className="px-4 py-3.5 font-bold">Exemple sur 3 000 € brut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">Salarié Non-Cadre</td>
                    <td className="px-4 py-3.5 font-bold text-blue-700">~22 %</td>
                    <td className="px-4 py-3.5 font-mono">× 0,78</td>
                    <td className="px-4 py-3.5 font-bold text-emerald-700">2 340,00 € net</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">Salarié Cadre</td>
                    <td className="px-4 py-3.5 font-bold text-indigo-700">~25 %</td>
                    <td className="px-4 py-3.5 font-mono">× 0,75</td>
                    <td className="px-4 py-3.5 font-bold text-emerald-700">2 250,00 € net</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">Fonction Publique</td>
                    <td className="px-4 py-3.5 font-bold text-teal-700">~15 %</td>
                    <td className="px-4 py-3.5 font-mono">× 0,85</td>
                    <td className="px-4 py-3.5 font-bold text-emerald-700">2 550,00 € net</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 text-lg font-bold text-neutral-900">
              Deux exemples pratiques de calcul salarial
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-5">
                <h4 className="m-0 text-sm font-bold text-indigo-900">
                  Exemple 1 : Salarié Non-Cadre à 2 500 € Brut / mois
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  Avec 22 % de cotisations salariales, le salaire net avant impôt est de{" "}
                  <code>2 500 × 0,78 = 1 950,00 €</code> (23 400 € nets par an sur 12 mois). Avec un taux de prélèvement à la source de 4 %, le virement net final atteint <strong>1 872,00 €</strong>.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-5">
                <h4 className="m-0 text-sm font-bold text-blue-900">
                  Exemple 2 : Cadre négociant 50 000 € Brut Annuel
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  Sur 12 mois, cela représente <strong>4 166,67 € brut/mois</strong>. En appliquant le taux cadre de 25 %, le net avant impôt s&apos;élève à <strong>3 125,00 € / mois</strong> (soit 37 500 € nets/an). Avec 10 % d&apos;impôt à la source, le net versé est de <strong>2 812,50 €</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: 5 FAQs */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2.5 text-indigo-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Questions Fréquentes (FAQ) – Salaire Brut / Net
              </h2>
            </div>

            <FaqAccordion faqs={FAQ_SALARY_DATA} dir="ltr" accent="indigo" />
          </section>
        </article>

        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="mb-1 flex items-center justify-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>Confidentialité Bancaire &amp; Calcul Local</span>
          </div>
          <p className="mx-auto max-w-xl text-emerald-700">
            <Sparkles className="mr-1 inline h-3.5 w-3.5" />
            Toutes vos simulations salariales restent strictement confidentielles dans la mémoire de votre appareil.
          </p>
        </aside>

        <RelatedTools currentToolId="calcul-brut-net" language="fr" />
      </div>
    </div>
  );
}
