import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 3 Main Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Micro<span className="text-blue-400">Tools</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 max-w-sm">
              Suite d&apos;utilitaires et calculateurs en ligne ultra-rapides, gratuits et confidentiels. 
              Des outils spécialisés conçus pour simplifier vos calculs fiscaux, énergétiques, juridiques et mathématiques quotidiens.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="h-4 w-4 text-amber-400" />
                Score 95+ PageSpeed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                100% Client-Side
              </span>
            </div>
          </div>

          {/* Column 2: Quick Tools (5 Tools) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Nos Calculateurs Opérationnels
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/fr/calculateur-tva"
                  className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-blue-400"
                >
                  <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-300">
                    FR
                  </span>
                  <span>Calculateur de TVA en Ligne</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/de/stromverbrauch-rechner"
                  className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-emerald-400"
                >
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    DE
                  </span>
                  <span>Stromverbrauch & Kosten Rechner</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/es/calculadora-dias-habiles"
                  className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-amber-400"
                >
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    ES
                  </span>
                  <span>Calculadora de Días Hábiles</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ar/hijri-age-calculator"
                  className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-emerald-400"
                >
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    AR
                  </span>
                  <span>حاسبة العمر بالهجري والميلادي</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/es/calculadora-regla-de-tres"
                  className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-indigo-400"
                >
                  <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300">
                    ES
                  </span>
                  <span>Calculadora de Regla de Tres</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Informations & Conformité
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-white inline-block"
                >
                  About Us (À propos)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white inline-block"
                >
                  Contact Us & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-white inline-block font-medium text-neutral-300"
                >
                  Privacy Policy (Politique de Confidentialité)
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-white inline-block"
                >
                  Terms & Conditions (Conditions d&apos;utilisation)
                </Link>
              </li>
            </ul>

            <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-800/40 p-3 text-[11px] text-neutral-400">
              Conforme aux exigences Google AdSense & RGPD. Tous les calculs s&apos;exécutent localement.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left + Developer Badge on Right */}
        <div className="mt-12 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {currentYear} MicroTools. All rights reserved.</p>

          {/* Developer Credit Link (without nofollow for SEO link juice) */}
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Engineered by</span>
            <a
              href="https://musaddaq.tech"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-800/80 px-2.5 py-1 font-semibold text-blue-400 transition hover:border-blue-500/50 hover:bg-neutral-800 hover:text-blue-300 shadow-2xs"
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
