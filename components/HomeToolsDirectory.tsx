"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, ArrowUpRight } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import {
  TOOLS_REGISTRY,
  LANGUAGE_HUBS,
  LANGUAGE_ORDER,
  getToolsByLanguage,
  type LanguageCode,
} from "@/lib/tools-registry";

type FilterOption = "all" | LanguageCode;

export default function HomeToolsDirectory() {
  const [selectedLang, setSelectedLang] = useState<FilterOption>("all");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get("lang");
      if (
        langParam === "fr" ||
        langParam === "de" ||
        langParam === "es" ||
        langParam === "ar"
      ) {
        setSelectedLang(langParam);
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const handleSelectLanguage = (lang: FilterOption) => {
    setSelectedLang(lang);
    const url = new URL(window.location.href);
    if (lang === "all") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const visibleTools =
    selectedLang === "all"
      ? TOOLS_REGISTRY
      : getToolsByLanguage(selectedLang);

  const selectedHub =
    selectedLang !== "all" ? LANGUAGE_HUBS[selectedLang] : null;

  return (
    <section
      id="tools"
      className="border-t border-neutral-200/80 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Directory Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Annuaire Multilingue des Micro-Outils
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Nos {TOOLS_REGISTRY.length} Calculateurs Spécialisés
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Tous les outils sont 100 % gratuits, sans inscription et exécutés localement en français, allemand, espagnol et arabe.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 md:self-auto">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <span>
              {TOOLS_REGISTRY.length} Outils Actifs &bull; 4 Langues
            </span>
          </div>
        </div>

        {/* Language Filter Tabs + Direct Language Hub Links */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filtrer les outils par langue"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedLang === "all"}
              onClick={() => handleSelectLanguage("all")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                selectedLang === "all"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Toutes ({TOOLS_REGISTRY.length})</span>
            </button>

            {LANGUAGE_ORDER.map((code) => {
              const hub = LANGUAGE_HUBS[code];
              const count = getToolsByLanguage(code).length;
              const active = selectedLang === code;
              return (
                <button
                  key={code}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectLanguage(code)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  <span>{hub.flag}</span>
                  <span>
                    {hub.upperCode} ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {selectedHub ? (
            <Link
              href={selectedHub.slug}
              className="inline-flex items-center gap-1.5 self-start rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 sm:self-auto"
            >
              <span>Hub {selectedHub.nativeName}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
              <span>Hubs dédiés :</span>
              {LANGUAGE_ORDER.map((code) => (
                <Link
                  key={code}
                  href={LANGUAGE_HUBS[code].slug}
                  className="rounded-md bg-white px-2 py-0.5 font-semibold text-neutral-700 border border-neutral-200 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  /{code}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
