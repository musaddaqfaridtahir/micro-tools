import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import AdSlot from "@/components/AdSlot";
import HomeToolsDirectory from "@/components/HomeToolsDirectory";
import {
  TOOLS_REGISTRY,
  LANGUAGE_HUBS,
  LANGUAGE_ORDER,
} from "@/lib/tools-registry";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top AdSlot (renders null unless NEXT_PUBLIC_ENABLE_ADS === 'true') */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <AdSlot position="top" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 text-center sm:pt-14 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-xs">
            <Sparkles className="h-4 w-4" />
            <span>
              Suite Multilingue de {TOOLS_REGISTRY.length} Micro-Outils Gratuits (<span translate="no" className="notranslate">FR • DE • ES • AR</span>)
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl sm:leading-tight">
            Des calculateurs en ligne{" "}
            <span className="text-blue-600">rapides</span>, précis et{" "}
            <span className="underline decoration-blue-500/30 decoration-wavy">
              100 % gratuits
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Effectuez vos calculs fiscaux, salariaux, énergétiques, juridiques, calendaires et mathématiques en français, allemand, espagnol et arabe sans inscription ni collecte de données.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-neutral-600">
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 shadow-2xs">
              <Zap className="h-4 w-4 text-amber-500" />
              Calculs Instantanés Client-Side
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Zéro Stockage de Données
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 shadow-2xs">
              <Smartphone className="h-4 w-4 text-blue-500" />
              Responsive Mobile &amp; RTL Arabe
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Filterable Tools Directory */}
      <HomeToolsDirectory />

      {/* Dedicated Language Hubs Section */}
      <section className="border-t border-neutral-200/80 bg-neutral-50/70 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              Portails par Langue &amp; Marché
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGE_ORDER.map((code) => {
              const hub = LANGUAGE_HUBS[code];
              const count = TOOLS_REGISTRY.filter(
                (t) => t.language === code
              ).length;
              return (
                <Link
                  key={code}
                  href={hub.slug}
                  dir={hub.dir}
                  lang={hub.code}
                  className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs transition hover:border-blue-300 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        translate="no"
                        className="notranslate rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-black tracking-wider text-neutral-800 shadow-2xs"
                      >
                        {hub.upperCode}
                      </span>
                    </div>
                    <h3
                      translate="no"
                      className="notranslate mt-3 text-base font-bold text-neutral-900 group-hover:text-blue-700"
                    >
                      {hub.nativeName}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                      {hub.hubHeadline}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs font-semibold text-blue-600">
                    <span>
                      {count} {hub.toolsCountSuffix}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom AdSlot */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot position="bottom" />
      </div>
    </div>
  );
}
