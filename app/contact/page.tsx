import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Clock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us – Support, Suggestions & Inquiries",
  description:
    "Have a question, feature request, or spotted a bug? Contact the MicroTools engineering team. We typically respond within 24-48 business hours.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
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
            Contact Us
          </span>
        </nav>

        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>We are here to help</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-5xl">
            Get in Touch With Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Have a question, feedback, feature proposal, or commercial inquiry? 
            Send us a message and our team will get back to you shortly.
          </p>
        </header>

        {/* Contact Layout: Info Sidebar + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1: Direct Support */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900">Direct Inquiries</h2>
              <p className="mt-1 text-xs text-neutral-500">
                For administrative, press, and advertising communications:
              </p>
              <a
                href="mailto:contact@musaddaq.tech"
                className="mt-3 inline-block text-xs font-bold text-blue-600 hover:underline"
              >
                contact@musaddaq.tech
              </a>
            </div>

            {/* Card 2: Response SLA */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-3">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900">Response Time</h2>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                Our support desk reviews inquiries Monday through Friday. Average response time is <strong>24 to 48 hours</strong>.
              </p>
            </div>

            {/* Card 3: Feedback Guarantee */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 mb-3">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900">Feature Suggestions</h2>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                Need a specific calculator for your country or industry? Let us know in the form and our developers will prioritize it.
              </p>
            </div>

            {/* Privacy Promise Callout */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Your email address is strictly used to answer your question. We never send promotional spam or sell user data.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form (8 cols) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
