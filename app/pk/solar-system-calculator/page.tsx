import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Sun,
  BookOpen,
  HelpCircle,
  Zap,
  CheckCircle2,
} from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import SolarSystemCalculator from "./SolarSystemCalculator";
import { getToolById, type ToolFaqItem } from "@/lib/tools-registry";

const TOOL = getToolById("solar-system-calculator")!;

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

const FAQ_SOLAR: ToolFaqItem[] = [
  {
    question: "How does Net-Metering work with DISCOs (LESCO, IESCO, MEPCO, KE) in Pakistan?",
    answer:
      "Net-metering allows residential and commercial solar owners with a 3-phase meter to export excess daytime solar electricity back into the national grid. The DISCO installs a green bidirectional meter that measures both imported units (consumed at night or cloudy days) and exported units. At the end of the month, exported units are subtracted from imported units. If you export more than you import, the monetary credit rolls over to your next electricity bill.",
  },
  {
    question: "What is the difference between On-Grid, Hybrid, and Off-Grid solar systems?",
    answer:
      "An On-Grid (grid-tied) system is connected directly to the DISCO grid without batteries; it is the most affordable and allows net-metering, but shuts down during grid loadshedding for safety. A Hybrid system combines solar panels, grid connection (net-metering), and a battery bank (tubular or lithium) to power essential appliances during power outages. An Off-Grid system operates entirely independently with heavy battery storage and has no connection to the utility grid.",
  },
  {
    question: "How many units (kWh) does a 1kW solar system produce per day in Pakistan?",
    answer:
      "Due to Pakistan's high solar irradiance (averaging 5 to 6 peak sun hours across Punjab, Sindh, and Balochistan), a high-efficiency 1kW system equipped with Tier-1 N-Type TOPCon or Bifacial panels typically generates between 3.8 and 4.3 units (kWh) of clean electricity per day, or approximately 115 to 130 units per month.",
  },
  {
    question: "What is the average payback period for a residential solar system in Pakistan?",
    answer:
      "With utility electricity tariffs averaging Rs. 48 to Rs. 58 per unit (inclusive of FPA, surcharges, and 18% GST), most residential on-grid solar installations achieve full financial payback within 2.2 to 3.0 years. After this payback horizon, the system delivers virtually free electricity for the remainder of its 25-year panel warranty.",
  },
  {
    question: "How much roof space is required for a 6kW or 10kW solar system?",
    answer:
      "Modern 585W monocrystalline bifacial panels measure approximately 24 sq. ft. each. Factoring in inter-panel spacing, mounting structure angles, and walking space for periodic glass cleaning, a 6kW system (11 panels) requires roughly 380 to 420 sq. ft. (under 2 marlas), while a 10kW system (18 panels) requires approximately 650 to 750 sq. ft. (about 3 to 3.5 marlas) of unshaded rooftop space.",
  },
];

export default function SolarSystemCalculatorPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="en">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_SOLAR}
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
            Solar System &amp; ROI Calculator
          </span>
        </nav>

        {/* Compact Header for Above-the-fold optimization */}
        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-800 shadow-2xs">
            <Sun className="h-3.5 w-3.5 text-amber-600" />
            <span>Pakistan Solar Sizing &amp; Payback 2026</span>
            <span className="mx-1 text-amber-300">•</span>
            <span translate="no" className="notranslate font-bold">PK</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Solar System Size, Load &amp; ROI Calculator
          </h1>
          <p className="mx-auto mt-1 sm:mt-2 max-w-2xl text-xs sm:text-sm text-neutral-600 line-clamp-2">
            Calculate your ideal solar capacity (kW), 585W panel count, roof space, turnkey installation cost in PKR,
            monthly bill savings, and payback period for homes and businesses across Pakistan.
          </p>
        </header>

        {/* Above-the-fold Interactive Calculator */}
        <section aria-label="Interactive Solar System Calculator" className="mb-8">
          <SolarSystemCalculator />
        </section>

        {/* Monetization Slot */}
        <AdSlot position="in-content" className="my-8" />

        {/* Deep SEO & Educational Content */}
        <article className="prose prose-neutral max-w-none rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2.5 text-amber-700 font-bold text-lg mb-4">
            <BookOpen className="h-5 w-5" />
            <h2>Rooftop Solar in Pakistan: Engineering Sizing &amp; Investment Guide</h2>
          </div>

          <p className="lead text-neutral-700 text-sm sm:text-base leading-relaxed">
            With national grid electricity tariffs consistently escalating and fuel adjustment surcharges (FPA) adding
            substantial volatility to utility bills, rooftop solar photovoltaics (PV) have become one of the highest-yielding
            capital investments for Pakistani homeowners and businesses. Sizing your system accurately ensures you neither
            overspend on unneeded inverter capacity nor undersize your array and remain trapped in higher NEPRA tariff slabs.
          </p>

          {/* On-Grid vs Hybrid vs Off-Grid Table */}
          <div className="my-8">
            <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              Comparison: On-Grid vs. Hybrid vs. Off-Grid Systems in Pakistan
            </h3>
            <div className="overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
                  <tr>
                    <th className="p-3">Feature / Parameter</th>
                    <th className="p-3">On-Grid (Grid-Tied)</th>
                    <th className="p-3">Hybrid Solar</th>
                    <th className="p-3">Off-Grid Solar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  <tr>
                    <td className="p-3 font-semibold">Net-Metering Eligible</td>
                    <td className="p-3 font-bold text-emerald-700">Yes (Full Support)</td>
                    <td className="p-3 font-bold text-emerald-700">Yes (With certified inverter)</td>
                    <td className="p-3 text-neutral-500">No (Isolated)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Battery Storage Required</td>
                    <td className="p-3 text-emerald-700">No (Zero battery costs)</td>
                    <td className="p-3">Yes (Tubular or Lithium)</td>
                    <td className="p-3 font-bold text-rose-700">Yes (Mandatory heavy bank)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Powers Load during Outages</td>
                    <td className="p-3 text-rose-700">No (Anti-islanding safety)</td>
                    <td className="p-3 font-bold text-emerald-700">Yes (Seamless UPS backup)</td>
                    <td className="p-3 font-bold text-emerald-700">Yes (Always active)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Average 2026 Cost / kW</td>
                    <td className="p-3 font-mono font-bold text-neutral-900">Rs. 115k – 125k</td>
                    <td className="p-3 font-mono font-bold text-neutral-900">Rs. 160k – 185k</td>
                    <td className="p-3 font-mono font-bold text-neutral-900">Rs. 190k – 230k</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Payback Period</td>
                    <td className="p-3 font-bold text-emerald-700">2.0 – 2.8 Years</td>
                    <td className="p-3 text-amber-700">3.2 – 4.2 Years</td>
                    <td className="p-3 text-neutral-600">5.0+ Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Practical Calculation Examples */}
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-6 mb-3">
            Real-Life Solar Sizing &amp; Financial Case Studies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-600" />
                Case Study 1: 5 Marla Home (Rs. 55,000 Monthly Bill)
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-700">
                <li>• <strong>Monthly Electricity Bill:</strong> Rs. 55,000 (~1,050 units)</li>
                <li>• <strong>Recommended System:</strong> 6 kW On-Grid with Net-Metering</li>
                <li>• <strong>Solar Panels:</strong> 11x 585W Bifacial TOPCon (6.43 kW actual)</li>
                <li>• <strong>Roof Area Required:</strong> ~385 sq. ft. (~1.7 Marla)</li>
                <li>• <strong>Total Turnkey Cost:</strong> Rs. 770,000 (at Rs. 120k/kW)</li>
                <li>• <strong>Monthly Generation:</strong> ~790 Units (kWh)</li>
                <li>• <strong>Monthly Bill Savings:</strong> ~Rs. 41,000 / month</li>
                <li>• <strong>Annual Savings:</strong> ~Rs. 492,000 / year</li>
                <li>• <strong>Payback Time:</strong> <strong>1.6 to 1.8 Years</strong></li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-600" />
                Case Study 2: 1 Kanal Luxury Home (Rs. 150,000 Monthly Bill)
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-700">
                <li>• <strong>Monthly Electricity Bill:</strong> Rs. 150,000 (~2,800 units with 3-4 ACs)</li>
                <li>• <strong>Recommended System:</strong> 15 kW On-Grid with Net-Metering</li>
                <li>• <strong>Solar Panels:</strong> 26x 585W Bifacial TOPCon (15.2 kW actual)</li>
                <li>• <strong>Roof Area Required:</strong> ~910 sq. ft. (~4.0 Marla)</li>
                <li>• <strong>Total Turnkey Cost:</strong> Rs. 1,820,000 (at Rs. 120k/kW)</li>
                <li>• <strong>Monthly Generation:</strong> ~1,870 Units (kWh)</li>
                <li>• <strong>Monthly Bill Savings:</strong> ~Rs. 97,000 / month</li>
                <li>• <strong>Annual Savings:</strong> ~Rs. 1,164,000 / year</li>
                <li>• <strong>Payback Time:</strong> <strong>1.5 to 1.6 Years</strong></li>
              </ul>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-6 mb-3">
            Understanding 585W N-Type TOPCon &amp; Bifacial Technology
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            Older P-Type PERC solar panels have been largely phased out in favor of modern <strong>N-Type TOPCon (Tunnel Oxide Passivated Contact)</strong> cells. These newer modules offer several decisive advantages in Pakistan&apos;s climate:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-neutral-700 space-y-2 my-3">
            <li>
              <strong>Superior Temperature Coefficient:</strong> During extreme summer heatwaves (40°C to 48°C in Punjab and Sindh), N-type panels experience significantly less efficiency drop compared to older polycrystalline modules.
            </li>
            <li>
              <strong>Bifacial Rear-Side Gain:</strong> Double-glass bifacial panels capture scattered sunlight reflected off the rooftop floor, boosting power output by an additional 10% to 25% when installed over white-painted or reflective roof surfaces.
            </li>
            <li>
              <strong>Lower Degradation &amp; 30-Year Performance:</strong> N-type cells eliminate Light-Induced Degradation (LID), guaranteeing over 87.4% of original power output even after 30 years of continuous operation.
            </li>
          </ul>
        </article>

        {/* FAQs Section */}
        <section aria-label="Frequently Asked Questions" className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-700" />
            <h2 className="text-lg font-bold text-neutral-900">
              Frequently Asked Questions (Solar Systems Pakistan)
            </h2>
          </div>
          <FaqAccordion faqs={FAQ_SOLAR} dir="ltr" accent="amber" />
        </section>

        {/* Related Pakistani & Utility Tools */}
        <div className="mt-12">
          <RelatedTools currentToolId={TOOL.id} language="pk" />
        </div>
      </div>
    </div>
  );
}
