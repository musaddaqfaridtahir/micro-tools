import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Zap,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Building2,
  Table,
  CheckCircle2,
} from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import ElectricityBillEstimator from "./ElectricityBillEstimator";
import { getToolById, type ToolFaqItem } from "@/lib/tools-registry";

const TOOL = getToolById("electricity-bill-estimator")!;

export const metadata: Metadata = {
  title: TOOL.title,
  description: TOOL.shortDescription,
  alternates: {
    canonical: TOOL.slug,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TOOL.title,
    description: TOOL.shortDescription,
    url: TOOL.slug,
    type: "website",
    locale: TOOL.locale,
    siteName: "MicroTools",
  },
};

const FAQ_ELECTRICITY: ToolFaqItem[] = [
  {
    question: "What is the difference between Protected and Unprotected consumers in Pakistan?",
    answer:
      "Under NEPRA and Ministry of Energy regulations, a Protected consumer is a domestic residential user who has consumed 200 units or fewer every single month for the last 6 consecutive months. If your consumption exceeds 200 units even in a single month during the last 6 months, your meter is automatically reclassified as Unprotected, subjecting all consumed units to significantly higher base tariff rates.",
  },
  {
    question: "Why does my electricity bill include Fuel Price Adjustment (FPA)?",
    answer:
      "Fuel Price Adjustment (FPA) is determined monthly by NEPRA to account for variations in the cost of imported fuel (such as RLNG, coal, and furnace oil) used to generate power. Because fuel prices fluctuate globally, the actual generation cost incurred 1 to 2 months prior is reflected as a per-unit surcharge on your current DISCO or K-Electric bill.",
  },
  {
    question: "How is 18% General Sales Tax (GST) calculated on electricity bills?",
    answer:
      "GST is levied at 18% on the sum of the Base Energy Cost, Fuel Price Adjustment (FPA), Financing/Debt Surcharges, and Electricity Duty. Lifeline consumers and protected consumers using under 200 units are granted special exemptions, whereas commercial users and unprotected domestic users bear the full 18% sales tax.",
  },
  {
    question: "What is the Advance Income Tax under Section 235 on electricity bills?",
    answer:
      "Under Section 235 of the Income Tax Ordinance, power distribution companies levy an Advance Income Tax of 7.5% on domestic electricity bills exceeding Rs. 25,000 per month for consumers whose CNIC is not verified on the FBR Active Taxpayer List (ATL). Active tax filers can claim an exemption or adjust this tax when filing their annual income tax returns.",
  },
  {
    question: "Are Peak Hours rates different from Off-Peak hours in Pakistan?",
    answer:
      "Yes, for residential 3-phase connections and commercial connections with Time-of-Use (TOU) metering, peak hours (typically 6:00 PM to 10:00 PM in summer and 5:00 PM to 9:00 PM in winter) carry a much higher tariff rate (often exceeding Rs. 48 to Rs. 54 per unit) compared to normal off-peak hours.",
  },
];

export default function ElectricityBillEstimatorPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="en">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_ELECTRICITY}
        pageTitle={TOOL.title}
        pageDescription={TOOL.shortDescription}
        priceCurrency="PKR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/pk" className="hover:text-neutral-900 transition">
            Pakistan Tools (<span translate="no" className="notranslate font-bold">PK</span>)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Electricity Bill Estimator
          </span>
        </nav>

        {/* Compact Header for Above-the-fold optimization */}
        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-2xs">
            <Zap className="h-3.5 w-3.5" />
            <span>Updated with NEPRA 2026 Uniform Tariff &amp; Surcharges</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            WAPDA &amp; K-Electric Bill Estimator
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Calculate your estimated monthly electricity bill across <strong>LESCO, GEPCO, FESCO, MEPCO, IESCO, and K-Electric</strong> with progressive NEPRA slabs, FPA, debt surcharges, and GST.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-electricity-pk" />
        </div>

        {/* Interactive Client Calculator Component */}
        <section aria-label="Interactive Pakistan Electricity Bill Calculator" className="mb-6 sm:mb-10">
          <ElectricityBillEstimator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-electricity-pk" />
        </div>

        {/* Comprehensive 700+ Word SEO Guide for Pakistan Users */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Understanding Power Tariffs in Pakistan */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 text-emerald-700">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                How Pakistan Electricity Bills (WAPDA &amp; K-Electric) Are Calculated in 2026
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600">
              Electricity consumers in Pakistan frequently notice that their final payable bill (*bijli ka bill*) is significantly higher than simply multiplying consumed units by a single rate. Electricity billing governed by the National Electric Power Regulatory Authority (NEPRA) relies on a layered structure composed of progressive slab tariffs, variable monthly adjustments, debt financing surcharges, and state taxes.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Whether you receive your electricity supply from <strong>LESCO</strong> (Lahore), <strong>IESCO</strong> (Islamabad and Rawalpindi), <strong>FESCO</strong> (Faisalabad), <strong>MEPCO</strong> (Multan and South Punjab), <strong>GEPCO</strong> (Gujranwala and Sialkot), or <strong>K-Electric</strong> in Karachi, the federal government enforces a Uniform Base Tariff schedule. The primary driver of your bill is your consumer classification as either a <strong>Protected</strong> or <strong>Unprotected</strong> domestic consumer.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Protected Domestic Consumer
                </h3>
                <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
                  Consumers who consume 200 units or less for 6 consecutive months. Base tariffs range from Rs. 3.95/unit (lifeline 1-50 units) to Rs. 10.06/unit (101-200 units). Exemption from 18% General Sales Tax applies under federal subsidy guidelines.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  Unprotected Domestic Consumer
                </h3>
                <p className="mt-1 text-xs text-amber-800 leading-relaxed">
                  Any consumer whose monthly meter reading exceeds 200 units in even one of the preceding 6 months. Progressive slabs start at Rs. 16.48 for the first 100 units and escalate up to Rs. 42.72/unit for usage above 700 units, plus full 18% GST.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: NEPRA Tariff Slab Rate Table */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 text-blue-700">
              <Table className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                2026 NEPRA Domestic Electricity Tariff Slabs (Per Unit Rates)
              </h2>
            </div>
            <p className="text-sm text-neutral-600 mb-6">
              The table below summarizes base unit charges prior to Fuel Price Adjustments (FPA), Financing Surcharges (Rs. 3.23), Electricity Duty (1.5%), and 18% GST:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200 text-left text-xs sm:text-sm">
                <thead className="bg-neutral-50 text-neutral-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Consumption Slab</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Base Unit Rate (PKR)</th>
                    <th className="px-4 py-3">GST Applicable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  <tr className="bg-emerald-50/40">
                    <td className="px-4 py-3 font-semibold">1 – 50 Units (Lifeline)</td>
                    <td className="px-4 py-3">Protected</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">Rs. 3.95 / unit</td>
                    <td className="px-4 py-3 text-emerald-800">Exempt (0%)</td>
                  </tr>
                  <tr className="bg-emerald-50/40">
                    <td className="px-4 py-3 font-semibold">51 – 100 Units</td>
                    <td className="px-4 py-3">Protected</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">Rs. 7.74 / unit</td>
                    <td className="px-4 py-3 text-emerald-800">Exempt (0%)</td>
                  </tr>
                  <tr className="bg-emerald-50/40">
                    <td className="px-4 py-3 font-semibold">101 – 200 Units</td>
                    <td className="px-4 py-3">Protected</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">Rs. 10.06 / unit</td>
                    <td className="px-4 py-3 text-emerald-800">Exempt (0%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">1 – 100 Units</td>
                    <td className="px-4 py-3">Unprotected</td>
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900">Rs. 16.48 / unit</td>
                    <td className="px-4 py-3">18% GST</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">101 – 200 Units</td>
                    <td className="px-4 py-3">Unprotected</td>
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900">Rs. 22.95 / unit</td>
                    <td className="px-4 py-3">18% GST</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">201 – 300 Units</td>
                    <td className="px-4 py-3">Unprotected</td>
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900">Rs. 27.14 / unit</td>
                    <td className="px-4 py-3">18% GST</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">301 – 400 Units</td>
                    <td className="px-4 py-3">Unprotected</td>
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900">Rs. 32.03 / unit</td>
                    <td className="px-4 py-3">18% GST</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">401 – 500 Units</td>
                    <td className="px-4 py-3">Unprotected</td>
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900">Rs. 35.24 / unit</td>
                    <td className="px-4 py-3">18% GST</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Above 700 Units</td>
                    <td className="px-4 py-3">Unprotected / High Usage</td>
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900">Rs. 42.72 / unit</td>
                    <td className="px-4 py-3">18% GST</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Two Practical Billing Examples */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 text-indigo-700">
              <CheckCircle2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Practical Bill Calculations: Step-by-Step PKR Examples
              </h2>
            </div>

            <div className="space-y-6 text-sm text-neutral-700">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="text-base font-bold text-neutral-900">
                  Example 1: Middle-Class Home Consuming 300 Units (Unprotected Domestic)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Suppose your household consumed exactly 300 units in an urban center like Lahore (LESCO) or Islamabad (IESCO):
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1 font-mono text-xs text-neutral-800">
                  <li>First 100 units @ Rs. 16.48 = Rs. 1,648</li>
                  <li>Next 100 units (101 to 200) @ Rs. 22.95 = Rs. 2,295</li>
                  <li>Next 100 units (201 to 300) @ Rs. 27.14 = Rs. 2,714</li>
                  <li>Base Energy Cost = Rs. 6,657</li>
                  <li>Fuel Price Adjustment (FPA @ Rs. 3.20/unit × 300) = Rs. 960</li>
                  <li>Financing Debt Surcharge (Rs. 3.23/unit × 300) = Rs. 969</li>
                  <li>Electricity Duty (1.5% of Rs. 6,657) = Rs. 100</li>
                  <li>General Sales Tax (18% on Rs. 8,686) = Rs. 1,563</li>
                  <li>PTV Fee = Rs. 35</li>
                  <li><strong>Total Estimated Bill = Rs. 10,284</strong> (Effective rate ~Rs. 34.28/unit)</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="text-base font-bold text-neutral-900">
                  Example 2: Summer Air Conditioning Bill (650 Units)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  During peak summer months with multiple 1.5-ton inverter air conditioners running, a household consuming 650 units incurs higher upper slabs:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1 font-mono text-xs text-neutral-800">
                  <li>Progressive slab energy cost through 650 units = ~Rs. 20,410</li>
                  <li>FPA (Rs. 3.20 × 650 units) = Rs. 2,080</li>
                  <li>Financing Debt Surcharge (Rs. 3.23 × 650) = Rs. 2,100</li>
                  <li>Electricity Duty (1.5%) = Rs. 306</li>
                  <li>General Sales Tax (18% GST) = ~Rs. 4,481</li>
                  <li>PTV Fee = Rs. 35</li>
                  <li><strong>Total Estimated Bill = ~Rs. 29,412</strong> (Plus 7.5% Advance Income Tax if non-filer exceeds Rs. 25,000 threshold)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: 5 Local FAQs */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-emerald-700">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Frequently Asked Questions About Electricity Bills in Pakistan
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_ELECTRICITY} dir="ltr" accent="emerald" />
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
