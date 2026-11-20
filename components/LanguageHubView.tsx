import React from "react";
import Link from "next/link";
import { ChevronRight, Globe, ShieldCheck, Zap } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import ToolCard from "@/components/ToolCard";
import {
  getLanguageHub,
  getToolsByLanguage,
  LANGUAGE_HUBS,
  LANGUAGE_ORDER,
  type LanguageCode,
} from "@/lib/tools-registry";

const HUB_UI_COPY: Record<
  LanguageCode,
  {
    home: string;
    otherLanguages: string;
    privacyBadge: string;
    speedBadge: string;
    noSignupBadge: string;
  }
> = {
  fr: {
    home: "Accueil",
    otherLanguages: "Autres langues disponibles :",
    privacyBadge: "Calculs 100 % locaux (RGPD)",
    speedBadge: "Sans inscription ni latence",
    noSignupBadge: "Barèmes 2026 à jour",
  },
  de: {
    home: "Startseite",
    otherLanguages: "Weitere Sprachen:",
    privacyBadge: "100 % lokale Berechnung (DSGVO)",
    speedBadge: "Keine Registrierung nötig",
    noSignupBadge: "Aktuelle Formeln 2026",
  },
  es: {
    home: "Inicio",
    otherLanguages: "Otros idiomas:",
    privacyBadge: "Cálculo 100 % local y privado",
    speedBadge: "Sin registro ni límites",
    noSignupBadge: "Actualizado para 2026",
  },
  ar: {
    home: "الرئيسية",
    otherLanguages: "لغات أخرى متاحة:",
    privacyBadge: "حسابات محلية 100% دون حفظ البيانات",
    speedBadge: "مجاني وسريع دون تسجيل",
    noSignupBadge: "محدّث لعام 2026",
  },
  pk: {
    home: "Home",
    otherLanguages: "Other Regions & Languages:",
    privacyBadge: "100% Client-Side Privacy",
    speedBadge: "Instant Calculation • No Login",
    noSignupBadge: "Updated for Pakistan 2026",
  },
};

export default function LanguageHubView({
  language,
}: {
  language: LanguageCode;
}) {
  const hub = getLanguageHub(language);
  const tools = getToolsByLanguage(language);
  const copy = HUB_UI_COPY[language];
  const isRtl = hub.dir === "rtl";

  return (
    <div
      dir={hub.dir}
      lang={hub.code}
      className="py-8 sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top AdSlot (hidden unless NEXT_PUBLIC_ENABLE_ADS === 'true') */}
        <AdSlot position="top" className="mb-8" />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs font-medium text-neutral-500"
        >
          <Link href="/" className="transition hover:text-blue-600">
            {copy.home}
          </Link>
          <ChevronRight
            className={`h-3.5 w-3.5 text-neutral-400 ${isRtl ? "rotate-180" : ""}`}
          />
          <span className="font-semibold text-neutral-900 inline-flex items-center gap-1.5">
            <span
              translate="no"
              className="notranslate rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700"
            >
              {hub.upperCode}
            </span>
            <span translate="no" className="notranslate">{hub.nativeName}</span>
          </span>
        </nav>

        {/* Hub Hero Card */}
        <header className="mb-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
            <span
              translate="no"
              className="notranslate rounded bg-blue-200/80 px-1.5 py-0.5 text-[10px] font-black text-blue-900"
            >
              {hub.upperCode}
            </span>
            <span>
              {tools.length} {hub.toolsCountSuffix}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {hub.hubHeadline}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            {hub.hubSubheadline}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-neutral-700">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{copy.privacyBadge}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>{copy.speedBadge}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5">
              <Globe className="h-4 w-4 text-blue-600" />
              <span>{copy.noSignupBadge}</span>
            </span>
          </div>
        </header>

        {/* Tools Grid */}
        <section aria-label={hub.hubHeadline}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Switch to Other Language Hubs */}
        <section className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-neutral-800">
              {copy.otherLanguages}
            </span>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_ORDER.map((code) => {
                const target = LANGUAGE_HUBS[code];
                const isCurrent = code === language;
                return (
                  <Link
                    key={code}
                    href={target.slug}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold border transition ${
                      isCurrent
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <span
                      translate="no"
                      className={`notranslate rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        isCurrent
                          ? "bg-white/20 text-white"
                          : "bg-neutral-200/80 text-neutral-800"
                      }`}
                    >
                      {target.upperCode}
                    </span>
                    <span translate="no" className="notranslate">{target.nativeName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <AdSlot position="bottom" className="mt-10" />
      </div>
    </div>
  );
}
