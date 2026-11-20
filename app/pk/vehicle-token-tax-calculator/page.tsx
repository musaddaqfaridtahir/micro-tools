import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Car,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Building2,
  Table,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import VehicleTokenTaxCalculator from "./VehicleTokenTaxCalculator";
import { getToolById, type ToolFaqItem } from "@/lib/tools-registry";

const TOOL = getToolById("vehicle-token-tax-calculator")!;

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
  },
};

const FAQ_VEHICLE_TAX: ToolFaqItem[] = [
  {
    question: "How do I pay vehicle token tax online in Punjab using e-Pay?",
    answer:
      "To pay your vehicle token tax online in Punjab: (1) Download the official 'e-Pay Punjab' mobile app or visit the web portal. (2) Select 'Excise & Taxation' and choose 'Token Tax'. (3) Enter your vehicle registration number (e.g., LEA-19-1234). (4) The system will generate a unique 17-digit 1-Link PSID (Payment Slip ID). (5) Open your mobile banking app, ATM, or Easypaisa/JazzCash, select 1-Link Bill Payment, and pay using your PSID. The vehicle status updates to paid instantly in the Excise database.",
  },
  {
    question: "Why do Non-Filers pay significantly higher vehicle token tax?",
    answer:
      "Under Section 234 of the Income Tax Ordinance 2001, the Federal Board of Revenue (FBR) mandates provincial Excise departments to collect advance withholding tax on motor vehicles. To encourage tax compliance, the federal government legislated that individuals not appearing on the Active Taxpayer List (ATL) must pay up to three times (3x) higher withholding tax compared to active tax filers.",
  },
  {
    question: "What is Lifetime Token Tax in Punjab and who is eligible?",
    answer:
      "In Punjab, motor cars and passenger vehicles with engine capacities up to 1,000 cc (such as Suzuki Alto 660cc, Cultus, WagonR, and Prince Pearl) are subject to a one-time lump-sum Lifetime Token Tax (typically Rs. 15,000 to Rs. 20,000) collected at the time of initial registration. Once paid, the owner is permanently exempt from paying annual token taxes for the vehicle's lifespan.",
  },
  {
    question: "What is the penalty for late payment of vehicle token tax?",
    answer:
      "Token taxes in Punjab and Sindh are due on July 1st of each financial year. An initial grace period is typically granted until August 31st or September 30th. If unpaid after the deadline, a surcharge of 10% to 20% is levied for the first two months, escalating to a maximum penalty of 100% of the motor vehicle tax for chronic non-payment alongside vehicle impoundment during police excise checks.",
  },
  {
    question: "Can I adjust Section 234 vehicle withholding tax in my annual FBR tax return?",
    answer:
      "Yes! If you are an Active Taxpayer, the Withholding Tax (Section 234) paid along with your annual vehicle token tax is fully adjustable. When filing your annual FBR income tax return on the IRIS portal, you can declare the amount paid under 'Adjustable Taxes (Section 234)' to directly reduce your final annual income tax liability or claim a tax refund.",
  },
];

export default function VehicleTokenTaxCalculatorPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="en">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_VEHICLE_TAX}
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
            Vehicle Token Tax Calculator
          </span>
        </nav>

        {/* Compact Header for Above-the-fold optimization */}
        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-2xs">
            <Car className="h-3.5 w-3.5 text-emerald-700" />
            <span>Punjab &amp; Sindh Excise Rates 2026</span>
            <span className="mx-1 text-emerald-300">•</span>
            <span translate="no" className="notranslate font-bold">PK</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Punjab &amp; Sindh Vehicle Token Tax Calculator
          </h1>
          <p className="mx-auto mt-1 sm:mt-2 max-w-2xl text-xs sm:text-sm text-neutral-600 line-clamp-2">
            Calculate your exact motor vehicle token tax, Section 234 withholding tax for Filers vs. Non-Filers,
            and professional tax in Punjab and Sindh with 1-Link e-Pay estimates.
          </p>
        </header>

        {/* Above-the-fold Interactive Calculator */}
        <section aria-label="Interactive Vehicle Token Tax Calculator" className="mb-8">
          <VehicleTokenTaxCalculator />
        </section>

        {/* Monetization Slot */}
        <AdSlot position="in-content" className="my-8" />

        {/* Deep SEO & Educational Content */}
        <article className="prose prose-neutral max-w-none rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-lg mb-4">
            <BookOpen className="h-5 w-5" />
            <h2>Complete Guide to Motor Vehicle Token Tax in Pakistan (2026)</h2>
          </div>

          <p className="lead text-neutral-700 text-sm sm:text-base leading-relaxed">
            Every motor vehicle operating on public roads in Pakistan is legally required under the <strong>Motor Vehicles
            Taxation Act</strong> to pay an annual token tax to the respective provincial Excise &amp; Taxation Department.
            The total annual fee is a composite bill comprising the provincial Motor Vehicle Tax (MVT), the federal
            Withholding Tax (WHT under Section 234 of the Income Tax Ordinance), and provincial Professional Tax.
          </p>

          {/* Comparative Tax Rate Table */}
          <div className="my-8">
            <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Table className="h-5 w-5 text-emerald-600" />
              Annual Token Tax Slabs (Punjab &amp; Sindh Comparison)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
                  <tr>
                    <th className="p-3">Engine Capacity</th>
                    <th className="p-3">Motor Vehicle Tax (MVT)</th>
                    <th className="p-3">FBR WHT (Filer)</th>
                    <th className="p-3">FBR WHT (Non-Filer)</th>
                    <th className="p-3">Total Payable (Filer)</th>
                    <th className="p-3 text-rose-700">Total (Non-Filer)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  <tr>
                    <td className="p-3 font-semibold">Up to 1,000 cc</td>
                    <td className="p-3 font-mono">Rs. 1,000</td>
                    <td className="p-3 font-mono">Rs. 800 - 1,000</td>
                    <td className="p-3 font-mono text-rose-700">Rs. 2,400 - 3,000</td>
                    <td className="p-3 font-bold text-emerald-700">Rs. 2,000</td>
                    <td className="p-3 font-bold text-rose-800">Rs. 3,600 - 4,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1,001 cc to 1,300 cc</td>
                    <td className="p-3 font-mono">Rs. 1,800 - 2,000</td>
                    <td className="p-3 font-mono">Rs. 2,500 - 3,000</td>
                    <td className="p-3 font-mono text-rose-700">Rs. 7,500 - 9,000</td>
                    <td className="p-3 font-bold text-emerald-700">Rs. 4,500 - 5,000</td>
                    <td className="p-3 font-bold text-rose-800">Rs. 9,500 - 11,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1,301 cc to 1,500 cc</td>
                    <td className="p-3 font-mono">Rs. 3,000</td>
                    <td className="p-3 font-mono">Rs. 4,500 - 5,000</td>
                    <td className="p-3 font-mono text-rose-700">Rs. 13,500 - 15,000</td>
                    <td className="p-3 font-bold text-emerald-700">Rs. 7,700 - 8,000</td>
                    <td className="p-3 font-bold text-rose-800">Rs. 16,700 - 18,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">1,501 cc to 2,000 cc</td>
                    <td className="p-3 font-mono">Rs. 4,500 - 5,000</td>
                    <td className="p-3 font-mono">Rs. 9,000 - 10,000</td>
                    <td className="p-3 font-mono text-rose-700">Rs. 27,000 - 30,000</td>
                    <td className="p-3 font-bold text-emerald-700">Rs. 13,700 - 15,000</td>
                    <td className="p-3 font-bold text-rose-800">Rs. 31,700 - 35,000</td>
                  </tr>
                  <tr className="bg-rose-50/40">
                    <td className="p-3 font-semibold">Above 2,000 cc (Luxury/SUV)</td>
                    <td className="p-3 font-mono">Rs. 10,000 - 12,000</td>
                    <td className="p-3 font-mono">Rs. 18,000 - 20,000</td>
                    <td className="p-3 font-mono text-rose-700">Rs. 54,000 - 60,000</td>
                    <td className="p-3 font-bold text-emerald-700">Rs. 28,200 - 32,000</td>
                    <td className="p-3 font-bold text-rose-800">Rs. 64,200 - 72,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Practical Calculation Examples */}
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-6 mb-3">
            Real-Life Token Tax Case Studies (Filer vs. Non-Filer)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Case Study 1: Toyota Yaris / Honda City (1300cc) in Punjab
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-700">
                <li>• <strong>Engine Displacement:</strong> 1300 cc</li>
                <li>• <strong>Motor Vehicle Tax (MVT):</strong> Rs. 1,800</li>
                <li>• <strong>Professional Tax:</strong> Rs. 200</li>
                <li>• <strong>Active Filer WHT (Sec 234):</strong> Rs. 2,500</li>
                <li>• <strong>Non-Filer WHT (3x penalty):</strong> Rs. 7,500</li>
                <li>• <strong>Total Annual for Filer:</strong> <strong className="text-emerald-700">Rs. 4,500</strong></li>
                <li>• <strong>Total Annual for Non-Filer:</strong> <strong className="text-rose-700">Rs. 9,500</strong> (Extra Rs. 5,000 penalty)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Case Study 2: Toyota Fortuner / Hilux Revo (2800cc) in Punjab
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-700">
                <li>• <strong>Engine Displacement:</strong> 2755 cc (Above 2000cc category)</li>
                <li>• <strong>Motor Vehicle Tax (MVT):</strong> Rs. 10,000</li>
                <li>• <strong>Professional Tax:</strong> Rs. 200</li>
                <li>• <strong>Active Filer WHT (Sec 234):</strong> Rs. 18,000</li>
                <li>• <strong>Non-Filer WHT (3x penalty):</strong> Rs. 54,000</li>
                <li>• <strong>Total Annual for Filer:</strong> <strong className="text-emerald-700">Rs. 28,200</strong></li>
                <li>• <strong>Total Annual for Non-Filer:</strong> <strong className="text-rose-700">Rs. 64,200</strong> (Extra Rs. 36,000 penalty!)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-6 mb-3">
            How to Pay via e-Pay Punjab &amp; 1-Link Banking
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            Both the Government of Punjab and Government of Sindh have modernized token tax collection through 1-Link integrations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-3.5 text-xs">
              <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                <Smartphone className="h-4 w-4 text-emerald-600" />
                1. Generate PSID
              </div>
              <p className="text-neutral-600">
                Open e-Pay Punjab or Sindh Excise online, select Token Tax, enter your vehicle registration number, and generate your 17-digit PSID.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-3.5 text-xs">
              <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-600" />
                2. 1-Link Bill Payment
              </div>
              <p className="text-neutral-600">
                Open any banking app (HBL, Meezan, Alfalah, UBL, etc.) or JazzCash/Easypaisa. Search for &quot;e-Pay Punjab&quot; or &quot;Sindh Govt&quot; and paste the PSID.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-3.5 text-xs">
              <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                3. Instant Verification
              </div>
              <p className="text-neutral-600">
                Payment confirms immediately. You can download the digital tax receipt and verify vehicle status live on MTMIS Punjab or Sindh Excise.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs Section */}
        <section aria-label="Frequently Asked Questions" className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-bold text-neutral-900">
              Frequently Asked Questions (Vehicle Token Tax Pakistan)
            </h2>
          </div>
          <FaqAccordion faqs={FAQ_VEHICLE_TAX} dir="ltr" accent="emerald" />
        </section>

        {/* Related Pakistani & Automotive Tools */}
        <div className="mt-12">
          <RelatedTools currentToolId={TOOL.id} language="pk" />
        </div>
      </div>
    </div>
  );
}
