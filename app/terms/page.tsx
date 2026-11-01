import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, AlertTriangle, ShieldCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions of Use – MicroTools",
  description:
    "Read the terms and conditions governing the use of MicroTools. Understand acceptable usage, intellectual property, and our informational disclaimer.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 26, 2026";

  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Terms & Conditions
          </span>
        </nav>

        {/* Page Header */}
        <header className="border-b border-neutral-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-800 shadow-2xs mb-3">
            <Scale className="h-3.5 w-3.5 text-blue-600" />
            <span>Legal Agreement & User Guidelines</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-xs text-neutral-500">
            Last updated: <strong>{lastUpdated}</strong>
          </p>
        </header>

        {/* Content Body */}
        <article className="prose prose-neutral max-w-none space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1: Agreement */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <FileText className="h-5 w-5" />
              <h2 className="text-lg font-bold text-neutral-900 m-0">
                1. Acceptance of Terms
              </h2>
            </div>
            <p>
              By accessing and using <strong>MicroTools</strong> (the &quot;Site&quot;), you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. 
              If you do not agree with any part of these terms, you must not use or access this website.
            </p>
          </section>

          {/* Section 2: Informational Disclaimer (Crucial for AdSense & Legal Safety) */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="text-lg font-bold text-neutral-900 m-0">
                2. Informational & Educational Disclaimer (Not Professional Advice)
              </h2>
            </div>
            <p className="text-amber-950 font-medium">
              All tools, calculators, mathematical formulas, and content on MicroTools are provided strictly for 
              <strong> informational and educational purposes only</strong>.
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700">
              <li>
                <strong>No Tax or Legal Advisory:</strong> The French VAT Calculator and Spanish Business Days Calculator provide mathematical approximations based on current statutory rules. They do not constitute certified tax advice or formal legal representation. Always verify statutory deadlines with official administrative agencies or licensed legal counsel.
              </li>
              <li>
                <strong>No Engineering Guarantee:</strong> The German electricity consumption calculator utilizes average regional tariffs and device wattage approximations. Actual electricity costs depend on your specific utility provider agreement and meter readings.
              </li>
            </ul>
          </section>

          {/* Section 3: Intellectual Property */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              3. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the Site, its source code, design, layout, logo, icons, and original software components 
              are the proprietary property of MicroTools and are protected by applicable copyright, trademark, and intellectual property laws. 
              You may use our online calculators freely for personal, professional, and commercial calculation tasks, but you may not duplicate, reverse engineer, scrape, or resell the platform&apos;s codebase without prior written consent.
            </p>
          </section>

          {/* Section 4: Acceptable Use */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              4. Acceptable Use Policy
            </h2>
            <p>
              When using MicroTools, you agree not to:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-neutral-700">
              <li>Deploy automated scripts, bots, spiders, or crawlers that disrupt the availability or normal operation of the Site.</li>
              <li>Attempt to gain unauthorized access to our infrastructure, hosting servers, or connected networks.</li>
              <li>Circumvent or tamper with security measures, ad placements, or site performance protections.</li>
              <li>Use the Site for any unlawful or prohibited purpose under applicable regional, national, or international laws.</li>
            </ul>
          </section>

          {/* Section 5: Disclaimer of Warranties */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              5. Disclaimer of Warranties (&quot;As-Is&quot;)
            </h2>
            <p>
              The Site is provided on an <strong>&quot;AS-IS&quot;</strong> and <strong>&quot;AS-AVAILABLE&quot;</strong> basis. 
              MicroTools makes no representations or warranties of any kind, express or implied, regarding the accuracy, adequacy, 
              validity, reliability, or completeness of any calculation result, formula output, or article on the Site.
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall MicroTools, its owners, or contributors be liable for any direct, indirect, incidental, consequential, 
              or punitive damages (including but not limited to loss of profits, tax penalties, missed legal deadlines, or business interruption) 
              arising out of your access to or inability to use the Site or reliance upon any calculation results.
            </p>
          </section>

          {/* Section 7: Third-Party Links & Ads */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              7. Third-Party Links & Advertisements
            </h2>
            <p>
              The Site may display third-party advertisements (such as Google AdSense) or links to external websites. 
              MicroTools does not endorse, guarantee, or assume responsibility for the accuracy or reliability of any information, 
              products, or services offered by third-party advertisers or linked websites.
            </p>
          </section>

          {/* Section 8: Changes & Contact */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              8. Modifications & Governing Law
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time without prior notice. 
              Your continued use of the Site following any changes indicates your acceptance of the updated terms.
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              For any questions regarding these Terms, please reach out via our{" "}
              <Link href="/contact" className="text-blue-600 font-semibold underline">
                Contact Page
              </Link>{" "}
              or email us at <code>contact@musaddaq.tech</code>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
