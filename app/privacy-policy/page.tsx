import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – GDPR & Google AdSense Compliant",
  description:
    "Read the MicroTools Privacy Policy. Learn how we respect your privacy, utilize client-side calculations with zero data retention, and comply with GDPR and Google advertising standards.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </span>
        </nav>

        {/* Page Header */}
        <header className="border-b border-neutral-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-2xs mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>GDPR & Google AdSense Compliant Policy</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-neutral-500">
            Last updated: <strong>{lastUpdated}</strong>
          </p>
        </header>

        {/* Content Body */}
        <article className="prose prose-neutral max-w-none space-y-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <Eye className="h-5 w-5" />
              <h2 className="text-lg font-bold text-neutral-900 m-0">
                1. Introduction & Overview
              </h2>
            </div>
            <p>
              At <strong>MicroTools</strong> (accessible at <code>https://microtools.example.com</code>), 
              the privacy of our visitors is one of our main priorities. This Privacy Policy document describes 
              the types of information that are collected and recorded by MicroTools and how we handle and protect it.
            </p>
            <p className="mt-2">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at{" "}
              <a href="mailto:contact@musaddaq.tech" className="text-blue-600 font-semibold underline">
                contact@musaddaq.tech
              </a>.
            </p>
          </section>

          {/* Section 2: Critical Zero Data Retention for Calculators */}
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-700 mb-3">
              <Lock className="h-5 w-5" />
              <h2 className="text-lg font-bold text-neutral-900 m-0">
                2. Client-Side Calculation Guarantee (Zero User Data Stored)
              </h2>
            </div>
            <p>
              A cornerstone of MicroTools is our <strong>zero-data retention architecture</strong>:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Financial & Tax Data:</strong> Values entered into the French VAT Calculator (HT, TTC) remain exclusively inside your browser memory.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Appliance Wattage:</strong> Electricity consumption numbers in our German Stromverbrauch Rechner are computed via client-side JavaScript.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Dates & Birthdays:</strong> Calendar inputs in the Spanish Working Days Calculator and Arabic Hijri Age Calculator are never logged or stored on our servers.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Log Files */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              3. Standard Log Files & Analytics
            </h2>
            <p>
              MicroTools follows a standard procedure of using log files. These files log visitors when they visit websites. 
              The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), 
              date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. 
              The purpose of this information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>
          </section>

          {/* Section 4: Cookies and Web Beacons */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              4. Cookies and Web Beacons
            </h2>
            <p>
              Like any other website, MicroTools uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences 
              and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience 
              by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
          </section>

          {/* Section 5: MANDATORY GOOGLE ADSENSE & DART COOKIE SECTION */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-blue-800 mb-3">
              <FileText className="h-5 w-5" />
              <h2 className="text-lg font-bold text-neutral-900 m-0">
                5. Google DoubleClick DART Cookie & Third-Party Advertising
              </h2>
            </div>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, 
              to serve ads to our site visitors based upon their visit to <code>https://microtools.example.com</code> and other sites on the internet.
            </p>
            <div className="mt-4 rounded-xl bg-white p-4 border border-blue-200 text-xs sm:text-sm text-neutral-800 space-y-2">
              <p>
                <strong>Important Notice on Advertising Opt-Out:</strong>
              </p>
              <p>
                Visitors may choose to decline or opt out of the use of DART cookies and personalized advertising 
                by visiting the Google Ad and Content Network Privacy Policy at the following URL:{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline break-all"
                >
                  https://policies.google.com/technologies/ads
                </a>
              </p>
              <p>
                You can also configure your personalized ad settings across Google networks directly at:{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline break-all"
                >
                  https://adssettings.google.com
                </a>{" "}
                or opt-out of third-party vendor cookies via{" "}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline"
                >
                  www.aboutads.info
                </a>.
              </p>
            </div>
            <p className="mt-3 text-xs text-neutral-600">
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their 
              respective advertisements and links that appear on MicroTools, which are sent directly to users&apos; browser. 
              They automatically receive your IP address when this occurs. MicroTools has no access to or control over these cookies 
              that are used by third-party advertisers.
            </p>
          </section>

          {/* Section 6: GDPR Compliance */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              6. GDPR Data Protection Rights (European Economic Area)
            </h2>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). 
              Every user residing in France, Germany, Spain, and across the EEA is entitled to the following:
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-700">
              <li>
                <strong>The right to access:</strong> You have the right to request copies of your personal data.
              </li>
              <li>
                <strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.
              </li>
              <li>
                <strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.
              </li>
              <li>
                <strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.
              </li>
              <li>
                <strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.
              </li>
              <li>
                <strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.
              </li>
            </ul>
            <p className="mt-3 text-xs text-neutral-500">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </p>
          </section>

          {/* Section 7: CCPA Privacy Rights */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              7. California Consumer Privacy Act (CCPA / CPRA)
            </h2>
            <p>
              Under the CCPA, among other rights, California consumers have the right to:
            </p>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-neutral-700">
              <li>Request that a business disclose the categories and specific pieces of personal data collected.</li>
              <li>Request that a business delete any personal data about the consumer that a business collected.</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data. <strong>(MicroTools does not sell personal information).</strong></li>
            </ul>
          </section>

          {/* Section 8: Children's Privacy */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              8. Children&apos;s Online Privacy Protection (COPPA)
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. MicroTools does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>
          </section>

          {/* Section 9: Consent */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">
              9. Consent & Policy Updates
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. 
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
