import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";
import {
  TOOLS_REGISTRY,
  LANGUAGE_HUBS,
  LANGUAGE_ORDER,
  type ToolAccent,
} from "@/lib/tools-registry";

const BADGE_CLASSES: Record<ToolAccent, string> = {
  blue: "bg-blue-500/20 text-blue-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  amber: "bg-amber-500/20 text-amber-300",
  indigo: "bg-indigo-500/20 text-indigo-300",
  teal: "bg-teal-500/20 text-teal-300",
  violet: "bg-violet-500/20 text-violet-300",
};

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 3 Main Columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Micro<span className="text-blue-400">Tools</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-neutral-400">
              Suite multilingue de {TOOLS_REGISTRY.length} calculateurs et utilitaires web gratuits, rapides et confidentiels en français, allemand, espagnol et arabe.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {LANGUAGE_ORDER.map((code) => {
                const hub = LANGUAGE_HUBS[code];
                return (
                  <Link
                    key={code}
                    href={hub.slug}
                    className="rounded-lg border border-neutral-800 bg-neutral-800/70 px-2.5 py-1 text-[11px] font-semibold text-neutral-300 transition hover:border-blue-500/50 hover:text-white"
                  >
                    {hub.flag} {hub.nativeName}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="h-4 w-4 text-amber-400" />
                Core Web Vitals
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                100% Client-Side
              </span>
            </div>
          </div>

          {/* Column 2: Quick Tools populated dynamically from TOOLS_REGISTRY */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Nos Calculateurs Opérationnels ({TOOLS_REGISTRY.length})
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-neutral-400">
              {TOOLS_REGISTRY.map((tool) => {
                const hub = LANGUAGE_HUBS[tool.language];
                return (
                  <li key={tool.id}>
                    <Link
                      href={tool.slug}
                      dir={tool.dir}
                      lang={tool.language}
                      className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-white"
                    >
                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${BADGE_CLASSES[tool.accent]}`}
                      >
                        {hub.upperCode}
                      </span>
                      <span className="truncate">{tool.shortTitle}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Legal & Trust Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Informations & Conformité
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/about"
                  className="inline-block transition hover:text-white"
                >
                  About Us (À propos)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block transition hover:text-white"
                >
                  Contact Us & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="inline-block font-medium text-neutral-300 transition hover:text-white"
                >
                  Privacy Policy (Confidentialité)
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-block transition hover:text-white"
                >
                  Terms & Conditions (CGU)
                </Link>
              </li>
            </ul>

            <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-800/40 p-3 text-[11px] text-neutral-400">
              Conforme aux standards Google AdSense &amp; RGPD. Calculs 100 % côté client sans conservation serveur.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left + Developer Badge on Right */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-400 sm:flex-row">
          <p>© {currentYear} MicroTools. All rights reserved.</p>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Engineered by</span>
            <a
              href="https://musaddaq.tech"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-800/80 px-2.5 py-1 font-semibold text-blue-400 shadow-2xs transition hover:border-blue-500/50 hover:bg-neutral-800 hover:text-blue-300"
            >
              <span>musaddaq.tech</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
