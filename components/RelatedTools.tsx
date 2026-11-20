import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import {
  getRelatedTools,
  getLanguageHub,
  type LanguageCode,
} from "@/lib/tools-registry";

interface RelatedToolsProps {
  currentToolId: string;
  language: LanguageCode;
}

const SECTION_COPY: Record<
  LanguageCode,
  { heading: string; subtitle: string; hubLinkText: string }
> = {
  fr: {
    heading: "Outils associés et calculateurs complémentaires",
    subtitle:
      "Découvrez d'autres calculateurs gratuits de notre suite multilingue pour vos démarches quotidiennes.",
    hubLinkText: "Voir tous les outils en français",
  },
  de: {
    heading: "Verwandte Rechner & hilfreiche Online-Tools",
    subtitle:
      "Entdecken Sie weitere kostenlose Rechner aus unserer mehrsprachigen Tool-Suite für Alltag und Finanzen.",
    hubLinkText: "Alle deutschen Rechner ansehen",
  },
  es: {
    heading: "Calculadoras relacionadas y herramientas útiles",
    subtitle:
      "Explore otras calculadoras gratuitas de nuestra plataforma multilingüe sin registro ni límites.",
    hubLinkText: "Ver todas las calculadoras en español",
  },
  ar: {
    heading: "أدوات وحاسبات ذات صلة قد تهمك",
    subtitle:
      "استكشف المزيد من الحاسبات المجانية السريعة في منصتنا دون تسجيل أو حفظ للبيانات.",
    hubLinkText: "عرض جميع الأدوات العربية",
  },
  pk: {
    heading: "Related Pakistan Utility Tools & Calculators",
    subtitle:
      "Explore more free online utility calculators designed for Pakistani taxpayers, consumers, and vehicle owners.",
    hubLinkText: "View all Pakistan Tools (PK)",
  },
};

export default function RelatedTools({
  currentToolId,
  language,
}: RelatedToolsProps) {
  const related = getRelatedTools(currentToolId, 3);
  const copy = SECTION_COPY[language];
  const hub = getLanguageHub(language);
  const isRtl = language === "ar";

  return (
    <section
      aria-labelledby="related-tools-heading"
      dir={isRtl ? "rtl" : "ltr"}
      className="mt-14 border-t border-neutral-200 pt-10"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h2
            id="related-tools-heading"
            className="text-xl font-bold text-neutral-900 sm:text-2xl"
          >
            {copy.heading}
          </h2>
          <p className="mt-1 text-sm text-neutral-600">{copy.subtitle}</p>
        </div>

        <Link
          href={hub.slug}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-2xs transition hover:border-blue-300 hover:text-blue-700"
        >
          <span>{copy.hubLinkText}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
