import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Zap,
  ShieldCheck,
  Globe2,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Fast, Free & Privacy-First Online Utilities",
  description:
    "Learn about MicroTools, an ultra-fast, privacy-first multi-language platform offering specialized online calculation and productivity tools for global users.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            About Us
          </span>
        </nav>

        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs mb-4">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Our Mission & Technology</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-5xl">
            Empowering Daily Tasks with <span className="text-blue-600">Ultra-Fast</span> Utilities
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            MicroTools is a dedicated platform of lightweight, client-side web calculators and micro-tools. 
            We bridge linguistic and regional barriers by delivering native experiences tailored specifically 
            for France, Germany, Spain, Latin America, and the Arab world.
          </p>
        </header>

        {/* 3 Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 mb-5">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900">100% Free & Instant</h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                No paywalls, no mandatory sign-ups, and no waiting queues. Every tool computes results 
                in sub-milliseconds directly inside your web browser.
              </p>
            </div>
            <ul className="mt-6 space-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Zero server latency</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Unlimited daily usage</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900">Privacy First (No Data Stored)</h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Your financial numbers, dates of birth, energy wattages, and personal queries never leave 
                your machine. All arithmetic executes strictly in your browser&apos;s volatile RAM memory.
              </p>
            </div>
            <ul className="mt-6 space-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Client-side JavaScript only</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100% GDPR & privacy compliant</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 mb-5">
                <Globe2 className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900">Multi-Language Precision</h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We avoid automated machine translations. Each utility is natively localized with regional 
                legal regulations, tax rates, and calendar systems (e.g., French DGFiP VAT, German energy tariffs, Spanish Ley 39/2015, and Umm al-Qura calendar).
              </p>
            </div>
            <ul className="mt-6 space-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Native LTR and RTL support</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Culturally accurate standards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Story & Philosophy Section */}
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 mb-16 shadow-xs">
          <div className="flex items-center gap-2.5 text-blue-600 mb-4">
            <Cpu className="h-5 w-5" />
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 m-0">
              Why We Built MicroTools
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
            The modern web is filled with calculation websites that require long page reloads, force users 
            to register with email addresses, or overwhelm screens with dozens of intrusive pop-ups and heavy trackers.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
            We believe an essential utility tool should open in less than a second, provide an immediate answer, 
            offer a 1-click copy feature, and respect user autonomy. By relying on modern web technologies like 
            Next.js App Router and Tailwind CSS, our pages achieve perfect 95+ PageSpeed scores while maintaining 
            the highest accessibility and design standards.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4">
              <Layers className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Engineering Excellence</span>
                <span className="text-xs text-neutral-600 mt-0.5 block">
                  Built with modular TypeScript architecture, ensuring zero runtime bugs and consistent mathematical formulas.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4">
              <Wrench className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Community-Driven Growth</span>
                <span className="text-xs text-neutral-600 mt-0.5 block">
                  We frequently incorporate feedback, suggestions, and new tool requests from our global community of users.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to explore tools */}
        <div className="rounded-3xl bg-neutral-900 p-8 sm:p-10 text-center text-white">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ready to explore our specialized calculators?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Try our French VAT calculator, German power consumption estimator, Spanish business days calculator, 
            Arabic Hijri age calculator, or rule of three solver.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
            >
              Browse All 5 Tools
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-2.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 hover:text-white"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
