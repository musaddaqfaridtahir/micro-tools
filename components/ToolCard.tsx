import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ToolIcon from "@/components/ToolIcon";
import {
  getLanguageHub,
  type ToolAccent,
  type ToolDefinition,
} from "@/lib/tools-registry";

const ACCENT_CLASSES: Record<
  ToolAccent,
  {
    card: string;
    iconBg: string;
    button: string;
    titleHover: string;
  }
> = {
  blue: {
    card: "border-blue-200/90 bg-gradient-to-b from-blue-50/40 to-white hover:border-blue-400 hover:shadow-md",
    iconBg: "bg-blue-600 text-white",
    button: "bg-blue-600 group-hover:bg-blue-700",
    titleHover: "group-hover:text-blue-700",
  },
  emerald: {
    card: "border-emerald-200/90 bg-gradient-to-b from-emerald-50/40 to-white hover:border-emerald-400 hover:shadow-md",
    iconBg: "bg-emerald-600 text-white",
    button: "bg-emerald-600 group-hover:bg-emerald-700",
    titleHover: "group-hover:text-emerald-700",
  },
  amber: {
    card: "border-amber-200/90 bg-gradient-to-b from-amber-50/40 to-white hover:border-amber-400 hover:shadow-md",
    iconBg: "bg-amber-600 text-white",
    button: "bg-amber-600 group-hover:bg-amber-700",
    titleHover: "group-hover:text-amber-700",
  },
  indigo: {
    card: "border-indigo-200/90 bg-gradient-to-b from-indigo-50/40 to-white hover:border-indigo-400 hover:shadow-md",
    iconBg: "bg-indigo-600 text-white",
    button: "bg-indigo-600 group-hover:bg-indigo-700",
    titleHover: "group-hover:text-indigo-700",
  },
  teal: {
    card: "border-teal-200/90 bg-gradient-to-b from-teal-50/40 to-white hover:border-teal-400 hover:shadow-md",
    iconBg: "bg-teal-600 text-white",
    button: "bg-teal-600 group-hover:bg-teal-700",
    titleHover: "group-hover:text-teal-700",
  },
  violet: {
    card: "border-violet-200/90 bg-gradient-to-b from-violet-50/40 to-white hover:border-violet-400 hover:shadow-md",
    iconBg: "bg-violet-600 text-white",
    button: "bg-violet-600 group-hover:bg-violet-700",
    titleHover: "group-hover:text-violet-700",
  },
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const styles = ACCENT_CLASSES[tool.accent];
  const hub = getLanguageHub(tool.language);
  const isRtl = tool.dir === "rtl";

  return (
    <Link
      href={tool.slug}
      dir={tool.dir}
      lang={tool.language}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
    >
      <article
        className={`group relative flex h-full flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-200 ${styles.card} ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <div>
          {/* Header: Icon + Language + Status Badge */}
          <div className="flex items-center justify-between gap-2">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-xs ${styles.iconBg}`}
            >
              <ToolIcon name={tool.icon} className="h-6 w-6" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-bold text-neutral-700">
                {hub.upperCode} {hub.flag}
              </span>
              <span className="rounded-full border border-emerald-300 bg-emerald-100/90 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                {tool.nativeBadgeText}
              </span>
            </div>
          </div>

          {/* Category, Title & Description */}
          <div className="mt-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              {tool.category}
            </span>
            <h3
              className={`mt-1 text-lg font-bold text-neutral-900 transition-colors ${styles.titleHover}`}
            >
              {tool.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600">
              {tool.shortDescription}
            </p>
          </div>

          {/* Highlights */}
          <ul className="mt-5 space-y-1.5 border-t border-neutral-100 pt-4">
            {tool.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs text-neutral-600"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Native Localized CTA */}
        <div className="mt-6 border-t border-neutral-100 pt-4">
          <span
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition ${styles.button}`}
          >
            <span>{tool.nativeCtaText}</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
