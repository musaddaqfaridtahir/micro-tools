"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, ChevronDown, Menu, X, Globe } from "lucide-react";
import ToolIcon from "@/components/ToolIcon";
import {
  TOOLS_REGISTRY,
  LANGUAGE_HUBS,
  LANGUAGE_ORDER,
  type ToolAccent,
} from "@/lib/tools-registry";

const DROPDOWN_ICON_COLORS: Record<ToolAccent, string> = {
  blue: "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  indigo: "bg-indigo-100 text-indigo-700",
  teal: "bg-teal-100 text-teal-700",
  violet: "bg-violet-100 text-violet-700",
};

const LANG_SWITCHER_ACTIVE: Record<string, string> = {
  fr: "bg-blue-600 text-white",
  de: "bg-emerald-600 text-white",
  es: "bg-amber-600 text-white",
  ar: "bg-teal-700 text-white",
};

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const activeLang = LANGUAGE_ORDER.find(
    (code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm shadow-blue-500/20">
            <Wrench className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Micro<span className="text-blue-600">Tools</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
              {TOOLS_REGISTRY.length} Outils Gratuits &bull; 4 Langues
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-7">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-700 transition hover:text-blue-600"
          >
            Accueil
          </Link>

          {/* Tools Dropdown populated from registry */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition hover:text-blue-600 cursor-pointer"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              aria-expanded={toolsDropdownOpen}
            >
              <span>Tous les Outils ({TOOLS_REGISTRY.length})</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  toolsDropdownOpen ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-1 w-96 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-900/10 ring-1 ring-black/5">
                <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  <span>Annuaire des Calculateurs</span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    {TOOLS_REGISTRY.length} Actifs
                  </span>
                </div>

                <div className="max-h-[420px] space-y-0.5 overflow-y-auto pr-1">
                  {TOOLS_REGISTRY.map((tool) => {
                    const hub = LANGUAGE_HUBS[tool.language];
                    return (
                      <Link
                        key={tool.id}
                        href={tool.slug}
                        dir={tool.dir}
                        lang={tool.language}
                        onClick={() => setToolsDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-neutral-50"
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${DROPDOWN_ICON_COLORS[tool.accent]}`}
                        >
                          <ToolIcon name={tool.icon} className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-semibold text-neutral-900">
                            {tool.shortTitle}
                          </div>
                          <div className="truncate text-[11px] text-neutral-500">
                            {tool.category}
                          </div>
                        </div>
                        <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600">
                          {hub.upperCode}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="text-sm font-medium text-neutral-700 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-neutral-700 transition hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>

        {/* Right side: Language Hubs Switcher + Support CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <div
            className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1 text-xs font-medium text-neutral-700"
            aria-label="Language hubs"
          >
            <Globe className="mx-1 h-3.5 w-3.5 text-neutral-500" />
            {LANGUAGE_ORDER.map((code) => {
              const hub = LANGUAGE_HUBS[code];
              const isActive = activeLang === code;
              return (
                <Link
                  key={code}
                  href={hub.slug}
                  title={hub.nativeName}
                  className={`rounded-lg px-2 py-1 text-[11px] font-bold transition ${
                    isActive
                      ? LANG_SWITCHER_ACTIVE[code]
                      : "text-neutral-700 hover:bg-white hover:text-blue-700"
                  }`}
                >
                  {hub.upperCode}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
          >
            Support
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="max-h-[82vh] overflow-y-auto border-b border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {/* Mobile Language Hubs */}
            <div className="grid grid-cols-4 gap-1.5 pb-2 border-b border-neutral-100">
              {LANGUAGE_ORDER.map((code) => {
                const hub = LANGUAGE_HUBS[code];
                return (
                  <Link
                    key={code}
                    href={hub.slug}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-bold border ${
                      activeLang === code
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-neutral-200 bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    <span>{hub.flag}</span>
                    <span>{hub.upperCode}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            {TOOLS_REGISTRY.map((tool) => {
              const hub = LANGUAGE_HUBS[tool.language];
              return (
                <Link
                  key={tool.id}
                  href={tool.slug}
                  dir={tool.dir}
                  lang={tool.language}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between gap-2 rounded-lg border border-neutral-100 bg-neutral-50/70 px-3 py-2 text-sm font-semibold text-neutral-800 hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <span className="truncate">{tool.shortTitle}</span>
                  <span className="shrink-0 rounded bg-neutral-200/80 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
                    {hub.upperCode}
                  </span>
                </Link>
              );
            })}

            <div className="mt-2 flex items-center justify-between border-t border-neutral-100 px-3 pt-3 text-xs text-neutral-600">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                About Us
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                Contact
              </Link>
              <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                Privacy
              </Link>
              <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">
                Terms
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
