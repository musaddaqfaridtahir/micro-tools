"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  ChevronDown,
  Menu,
  X,
  Globe,
  Zap,
  CalendarDays,
  Moon,
  Divide,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

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
              5 Outils Gratuits & Rapides
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

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition hover:text-blue-600 cursor-pointer"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
            >
              <span>Tous les Outils (5)</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  toolsDropdownOpen ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-1 w-88 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-900/5 ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center justify-between">
                  <span>Outils Opérationnels</span>
                  <span className="text-emerald-600 font-semibold text-[10px]">5 / 5 Actifs</span>
                </div>

                {/* Tool 1 */}
                <Link
                  href="/fr/calculateur-tva"
                  className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-blue-50/70"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                    %
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">
                      Calculateur de TVA (FR)
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Taux français 20%, 10%, 5.5%, 2.1%
                    </div>
                  </div>
                </Link>

                {/* Tool 2 */}
                <Link
                  href="/de/stromverbrauch-rechner"
                  className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-emerald-50/70"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">
                      Stromverbrauch Rechner (DE)
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Stromkosten & kWh Rechner Deutschland
                    </div>
                  </div>
                </Link>

                {/* Tool 3 */}
                <Link
                  href="/es/calculadora-dias-habiles"
                  className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-amber-50/70"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-bold text-xs">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">
                      Calculadora de Días Hábiles (ES)
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Plazos legales & días laborables
                    </div>
                  </div>
                </Link>

                {/* Tool 4 */}
                <Link
                  href="/ar/hijri-age-calculator"
                  className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-emerald-50/70"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">
                      حاسبة العمر بالهجري والميلادي (AR)
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      تقويم أم القرى وموعد الميلاد القادم
                    </div>
                  </div>
                </Link>

                {/* Tool 5 */}
                <Link
                  href="/es/calculadora-regla-de-tres"
                  className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-indigo-50/70"
                  onClick={() => setToolsDropdownOpen(false)}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs">
                    <Divide className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">
                      Calculadora de Regla de Tres (ES)
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Directa e inversa paso a paso
                    </div>
                  </div>
                </Link>
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

        {/* Right side: Language Selector & Quick CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
            <Globe className="h-3.5 w-3.5 text-neutral-500" />
            <Link href="/fr/calculateur-tva" className="font-semibold text-blue-700 hover:underline" title="Français">
              FR
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/de/stromverbrauch-rechner" className="font-semibold text-emerald-700 hover:underline" title="Deutsch">
              DE
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/es/calculadora-regla-de-tres" className="font-semibold text-indigo-700 hover:underline" title="Español">
              ES
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/ar/hijri-age-calculator" className="font-semibold text-emerald-800 hover:underline" title="العربية">
              AR
            </Link>
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
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2.5">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <Link
              href="/fr/calculateur-tva"
              className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Calculateur de TVA (FR)</span>
              <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                Actif
              </span>
            </Link>

            <Link
              href="/de/stromverbrauch-rechner"
              className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Stromverbrauch Rechner (DE)</span>
              <span className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] text-white">
                Actif
              </span>
            </Link>

            <Link
              href="/es/calculadora-dias-habiles"
              className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Calculadora Días Hábiles (ES)</span>
              <span className="rounded bg-amber-600 px-2 py-0.5 text-[10px] text-white">
                Actif
              </span>
            </Link>

            <Link
              href="/ar/hijri-age-calculator"
              className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>حاسبة العمر بالهجري والميلادي (AR)</span>
              <span className="rounded bg-emerald-700 px-2 py-0.5 text-[10px] text-white">
                Actif
              </span>
            </Link>

            <Link
              href="/es/calculadora-regla-de-tres"
              className="flex items-center justify-between rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Calculadora de Regla de Tres (ES)</span>
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] text-white">
                Actif
              </span>
            </Link>

            <div className="border-t border-neutral-100 pt-2 flex items-center justify-between px-3 text-xs text-neutral-600">
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
