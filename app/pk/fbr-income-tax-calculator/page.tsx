import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Calculator,
  BookOpen,
  HelpCircle,
  Building,
  User,
  CheckCircle2,
} from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AdSlot from "@/components/AdSlot";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import FbrIncomeTaxCalculator from "./FbrIncomeTaxCalculator";
import { getToolById, type ToolFaqItem } from "@/lib/tools-registry";

const TOOL = getToolById("fbr-income-tax-calculator")!;

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

const FAQ_FBR_TAX: ToolFaqItem[] = [
  {
    question: "What is the tax-free salary threshold in Pakistan for Tax Year 2025-2026?",
    answer:
      "Under the latest Finance Act slabs passed by the Federal Board of Revenue (FBR), the annual tax-free income threshold remains Rs. 600,000 per year for both salaried and business individuals. This means any individual earning up to Rs. 50,000 per month is completely exempt from income tax (0% tax rate).",
  },
  {
    question: "How do I qualify as a 'Salaried Individual' under Pakistani tax law?",
    answer:
      "According to the Income Tax Ordinance 2001, an individual is legally classified as salaried if their salary income constitutes more than 75% of their total annual taxable income. If your salary represents 75% or less of your total income, your entire income is taxed under the non-salaried / business individual tax slabs.",
  },
  {
    question: "How is monthly salary tax deduction (withholding tax) calculated by employers?",
    answer:
      "Employers are legally mandated to deduct income tax at source under Section 149 of the Income Tax Ordinance. The employer projects your total expected annual taxable earnings for the financial year (July 1 to June 30), applies the progressive FBR annual tax slabs to determine the total annual tax liability, and divides that amount by 12 (or the remaining months) to deduct equal monthly withholding installments.",
  },
  {
    question: "What happens if I earn extra income from freelancing alongside my salaried job?",
    answer:
      "If you earn freelance or consulting income alongside your regular job, you must report both income streams on your annual FBR tax return (IRIS portal). If the salary portion remains greater than 75% of your combined income, salaried rates apply to your aggregate taxable income. If business/freelance income pushes salary below 75%, non-salaried business tax slabs apply.",
  },
  {
    question: "What are the major benefits of being on the FBR Active Taxpayer List (ATL)?",
    answer:
      "Being an Active Taxpayer (ATL filer) provides immense financial benefits in Pakistan, including: 50% lower withholding tax on bank cash withdrawals and profit on debt, lower tax on buying and selling immovable property (3% vs 6-10%), substantially reduced vehicle token tax and registration fees, and complete exemption from advance tax on electricity bills under Section 235.",
  },
];

export default function FbrIncomeTaxCalculatorPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="en">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_FBR_TAX}
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
            FBR Income Tax Calculator
          </span>
        </nav>

        {/* Compact Header for Above-the-fold optimization */}
        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-800 shadow-2xs">
            <Calculator className="h-3.5 w-3.5 text-blue-700" />
            <span>FBR Tax Year 2025–2026 Rates</span>
            <span className="mx-1 text-blue-300">•</span>
            <span translate="no" className="notranslate font-bold">PK</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            FBR Income Tax Calculator Pakistan
          </h1>
          <p className="mx-auto mt-1 sm:mt-2 max-w-2xl text-xs sm:text-sm text-neutral-600 line-clamp-2">
            Calculate your exact monthly salary tax deduction, annual income tax liability, and net take-home pay
            under the latest Federal Board of Revenue (FBR) Finance Act slabs.
          </p>
        </header>

        {/* Above-the-fold Interactive Calculator */}
        <section aria-label="Interactive Income Tax Calculator" className="mb-8">
          <FbrIncomeTaxCalculator />
        </section>

        {/* Monetization Slot */}
        <AdSlot position="in-content" className="my-8" />

        {/* Deep SEO & Educational Content */}
        <article className="prose prose-neutral max-w-none rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2.5 text-blue-700 font-bold text-lg mb-4">
            <BookOpen className="h-5 w-5" />
            <h2>Complete Guide to Income Tax in Pakistan (Finance Act 2025–2026)</h2>
          </div>

          <p className="lead text-neutral-700 text-sm sm:text-base leading-relaxed">
            Understanding how individual income tax is structured in Pakistan is vital for every salaried professional,
            freelancer, and business owner. The Federal Board of Revenue (FBR) governs personal income taxation under
            the statutory provisions of the <strong>Income Tax Ordinance, 2001</strong>. Each annual federal budget
            updates the progressive tax slabs, marginal rates, and withholding tax obligations that determine your take-home pay.
          </p>

          {/* Slabs Tables */}
          <div className="my-8 space-y-8">
            {/* Salaried Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-neutral-900">
                  Tax Slabs for Salaried Individuals (Tax Year 2025–2026)
                </h3>
              </div>
              <div className="overflow-x-auto rounded-xl border border-neutral-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
                    <tr>
                      <th className="p-3">Slab</th>
                      <th className="p-3">Annual Taxable Income (PKR)</th>
                      <th className="p-3">Rate of Income Tax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-neutral-800">
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 font-semibold">Slab 1</td>
                      <td className="p-3 font-mono font-medium">Up to Rs. 600,000</td>
                      <td className="p-3 font-bold text-emerald-700">0% (Tax Free)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 2</td>
                      <td className="p-3 font-mono font-medium">Rs. 600,001 to Rs. 1,200,000</td>
                      <td className="p-3">5% of the amount exceeding Rs. 600,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 3</td>
                      <td className="p-3 font-mono font-medium">Rs. 1,200,001 to Rs. 2,200,000</td>
                      <td className="p-3">Rs. 30,000 + 15% of the amount exceeding Rs. 1,200,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 4</td>
                      <td className="p-3 font-mono font-medium">Rs. 2,200,001 to Rs. 3,200,000</td>
                      <td className="p-3">Rs. 180,000 + 25% of the amount exceeding Rs. 2,200,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 5</td>
                      <td className="p-3 font-mono font-medium">Rs. 3,200,001 to Rs. 4,100,000</td>
                      <td className="p-3">Rs. 430,000 + 30% of the amount exceeding Rs. 3,200,000</td>
                    </tr>
                    <tr className="bg-rose-50/40">
                      <td className="p-3 font-semibold">Slab 6</td>
                      <td className="p-3 font-mono font-medium">Exceeding Rs. 4,100,000</td>
                      <td className="p-3 font-bold text-rose-800">Rs. 700,000 + 35% of the amount exceeding Rs. 4,100,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Business Individuals / AOP Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-neutral-900">
                  Tax Slabs for Non-Salaried &amp; Business Individuals / AOP
                </h3>
              </div>
              <div className="overflow-x-auto rounded-xl border border-neutral-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
                    <tr>
                      <th className="p-3">Slab</th>
                      <th className="p-3">Annual Taxable Income (PKR)</th>
                      <th className="p-3">Rate of Income Tax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-neutral-800">
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 font-semibold">Slab 1</td>
                      <td className="p-3 font-mono font-medium">Up to Rs. 600,000</td>
                      <td className="p-3 font-bold text-emerald-700">0% (Tax Free)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 2</td>
                      <td className="p-3 font-mono font-medium">Rs. 600,001 to Rs. 1,200,000</td>
                      <td className="p-3">15% of the amount exceeding Rs. 600,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 3</td>
                      <td className="p-3 font-mono font-medium">Rs. 1,200,001 to Rs. 1,600,000</td>
                      <td className="p-3">Rs. 90,000 + 20% of the amount exceeding Rs. 1,200,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 4</td>
                      <td className="p-3 font-mono font-medium">Rs. 1,600,001 to Rs. 3,200,000</td>
                      <td className="p-3">Rs. 170,000 + 30% of the amount exceeding Rs. 1,600,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Slab 5</td>
                      <td className="p-3 font-mono font-medium">Rs. 3,200,001 to Rs. 5,600,000</td>
                      <td className="p-3">Rs. 650,000 + 40% of the amount exceeding Rs. 3,200,000</td>
                    </tr>
                    <tr className="bg-rose-50/40">
                      <td className="p-3 font-semibold">Slab 6</td>
                      <td className="p-3 font-mono font-medium">Exceeding Rs. 5,600,000</td>
                      <td className="p-3 font-bold text-rose-800">Rs. 1,610,000 + 45% of the amount exceeding Rs. 5,600,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Practical Calculation Examples */}
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-6 mb-3">
            Step-by-Step Salary Tax Examples
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Example 1: Monthly Salary of Rs. 150,000
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-700">
                <li>• <strong>Annual Gross:</strong> Rs. 150,000 × 12 = Rs. 1,800,000</li>
                <li>• Falls into <strong>Slab 3</strong> (Rs. 1,200,001 to Rs. 2,200,000)</li>
                <li>• Excess over Rs. 1,200,000: Rs. 1,800,000 - Rs. 1,200,000 = Rs. 600,000</li>
                <li>• Tax on excess: 15% × Rs. 600,000 = Rs. 90,000</li>
                <li>• Base tax: Rs. 30,000</li>
                <li>• <strong>Total Annual Tax:</strong> Rs. 30,000 + Rs. 90,000 = Rs. 120,000</li>
                <li>• <strong>Monthly Tax Deduction:</strong> Rs. 120,000 ÷ 12 = <strong>Rs. 10,000</strong></li>
                <li>• <strong>Monthly Take-Home:</strong> Rs. 150,000 - Rs. 10,000 = <strong>Rs. 140,000</strong></li>
                <li>• Effective Tax Rate: <strong>6.67%</strong></li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Example 2: Monthly Salary of Rs. 350,000
              </h4>
              <ul className="text-xs space-y-1.5 text-neutral-700">
                <li>• <strong>Annual Gross:</strong> Rs. 350,000 × 12 = Rs. 4,200,000</li>
                <li>• Falls into <strong>Slab 6</strong> (Above Rs. 4,100,000)</li>
                <li>• Excess over Rs. 4,100,000: Rs. 4,200,000 - Rs. 4,100,000 = Rs. 100,000</li>
                <li>• Tax on excess: 35% × Rs. 100,000 = Rs. 35,000</li>
                <li>• Base tax: Rs. 700,000</li>
                <li>• <strong>Total Annual Tax:</strong> Rs. 700,000 + Rs. 35,000 = Rs. 735,000</li>
                <li>• <strong>Monthly Tax Deduction:</strong> Rs. 735,000 ÷ 12 = <strong>Rs. 61,250</strong></li>
                <li>• <strong>Monthly Take-Home:</strong> Rs. 350,000 - Rs. 61,250 = <strong>Rs. 288,750</strong></li>
                <li>• Effective Tax Rate: <strong>17.50%</strong></li>
              </ul>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-6 mb-3">
            Tax Deductions &amp; Allowable Tax Credits
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            Pakistani tax law permits individual taxpayers to lower their effective tax liability through several statutory tax credits:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-neutral-700 space-y-2 my-3">
            <li>
              <strong>Donations to Approved Charitable Organizations (Section 61):</strong> A direct tax rebate is available for donations made through crossed banking channels to approved non-profit organizations and relief funds up to 30% of taxable income.
            </li>
            <li>
              <strong>Contribution to Approved Pension Funds (Section 63):</strong> Taxpayers investing in voluntary pension schemes (VPS) approved by the SECP can claim a tax credit on contributions up to 20% of their taxable income for that financial year.
            </li>
            <li>
              <strong>Advance Tax Adjustments:</strong> Withholding taxes already paid throughout the year on electricity bills (Section 235), vehicle registration/tokens (Section 234), air travel, and banking transactions can be directly adjusted against your final tax liability on IRIS.
            </li>
          </ul>
        </article>

        {/* FAQs Section */}
        <section aria-label="Frequently Asked Questions" className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-neutral-900">
              Frequently Asked Questions (FBR Tax 2025–2026)
            </h2>
          </div>
          <FaqAccordion faqs={FAQ_FBR_TAX} dir="ltr" accent="blue" />
        </section>

        {/* Related Pakistani & Financial Tools */}
        <div className="mt-12">
          <RelatedTools currentToolId={TOOL.id} language="pk" />
        </div>
      </div>
    </div>
  );
}
