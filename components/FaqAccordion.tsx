"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ToolFaqItem } from "@/lib/tools-registry";

interface FaqAccordionProps {
  faqs: ToolFaqItem[];
  dir?: "ltr" | "rtl";
  accent?: "blue" | "emerald" | "amber" | "indigo" | "teal" | "violet";
}

const ACCENT_RING: Record<
  NonNullable<FaqAccordionProps["accent"]>,
  string
> = {
  blue: "hover:border-blue-300 focus-visible:ring-blue-500",
  emerald: "hover:border-emerald-300 focus-visible:ring-emerald-500",
  amber: "hover:border-amber-300 focus-visible:ring-amber-500",
  indigo: "hover:border-indigo-300 focus-visible:ring-indigo-500",
  teal: "hover:border-teal-300 focus-visible:ring-teal-500",
  violet: "hover:border-violet-300 focus-visible:ring-violet-500",
};

const ICON_BADGE: Record<
  NonNullable<FaqAccordionProps["accent"]>,
  string
> = {
  blue: "bg-blue-50 text-blue-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  indigo: "bg-indigo-50 text-indigo-700",
  teal: "bg-teal-50 text-teal-700",
  violet: "bg-violet-50 text-violet-700",
};

export default function FaqAccordion({
  faqs,
  dir = "ltr",
  accent = "blue",
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <div dir={dir} className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={idx}
            className={`rounded-2xl border border-neutral-200/90 bg-white shadow-2xs transition ${ACCENT_RING[accent]}`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-4 p-5 text-sm sm:text-base font-semibold text-neutral-900 cursor-pointer focus:outline-none focus-visible:ring-2 rounded-2xl ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${ICON_BADGE[accent]}`}
                >
                  {idx + 1}
                </span>
                <span>{faq.question}</span>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-neutral-700" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`border-t border-neutral-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-neutral-600 ${
                    dir === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
