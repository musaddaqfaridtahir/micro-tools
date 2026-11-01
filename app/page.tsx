import React from "react";
import Link from "next/link";
import {
  Calculator,
  Zap,
  CalendarDays,
  Moon,
  Divide,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import AdBanner from "@/components/AdBanner";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  status: "active";
  badge: string;
  langBadge: string;
  highlights: string[];
}

const TOOLS: ToolCard[] = [
  {
    id: "calculateur-tva",
    title: "Calculateur de TVA (France)",
    description:
      "Calculez instantanément les montants HT, TTC et de la TVA selon les 4 taux officiels français (20%, 10%, 5,5%, 2,1%) ou un taux personnalisé.",
    category: "Finance & Fiscalité",
    icon: Calculator,
    href: "/fr/calculateur-tva",
    status: "active",
    badge: "Outil Actif",
    langBadge: "FR 🇫🇷",
    highlights: ["HT vers TTC & TTC vers HT", "Taux officiels 2024-2026", "Copie rapide en 1 clic"],
  },
  {
    id: "stromverbrauch-rechner",
    title: "Stromverbrauch Rechner (Deutschland)",
    description:
      "Berechnen Sie den Stromverbrauch (kWh) und die jährlichen Stromkosten Ihrer Haushaltsgeräte mit Schnell-Auswahl für Kühlschrank, PC, TV & Co.",
    category: "Energie & Haushalt",
    icon: Zap,
    href: "/de/stromverbrauch-rechner",
    status: "active",
    badge: "Outil Actif",
    langBadge: "DE 🇩🇪",
    highlights: ["Watt in kWh umrechnen", "Tages-, Monats- & Jahreskosten", "Geräte-Presets & Spar-Tipps"],
  },
  {
    id: "calculadora-dias-habiles",
    title: "Calculadora de Días Hábiles (España & Latam)",
    description:
      "Calcule fácilmente plazos legales y administrativos sumando o restando días laborables a una fecha específica, excluyendo fines de semana automáticamente.",
    category: "Legal & Gestión",
    icon: CalendarDays,
    href: "/es/calculadora-dias-habiles",
    status: "active",
    badge: "Outil Actif",
    langBadge: "ES 🇪🇸",
    highlights: ["Sumar o restar días hábiles", "Exclusión de sábados y domingos", "Desglose de días naturales"],
  },
  {
    id: "hijri-age-calculator",
    title: "حاسبة العمر بالهجري والميلادي (Hijri Age Calculator)",
    description:
      "احسب عمرك بدقة بالسنوات والشهور والأيام بالتقويمين الهجري والميلادي، واكتشف تاريخ ميلادك وفق تقويم أم القرى وموعد ميلادك القادم.",
    category: "أدوات التوقيت والتاريخ",
    icon: Moon,
    href: "/ar/hijri-age-calculator",
    status: "active",
    badge: "Outil Actif",
    langBadge: "AR 🇸🇦",
    highlights: ["حساب العمر بالهجري والميلادي", "تحويل تقويم أم القرى", "العد التنازلي لميلادك القادم"],
  },
  {
    id: "calculadora-regla-de-tres",
    title: "Calculadora de Regla de Tres (Directa e Inversa)",
    description:
      "Resuelva proporciones matemáticas directas e inversas de inmediato con desglose dinámico paso a paso y explicación visual de la fórmula.",
    category: "Matemáticas & Utilidades",
    icon: Divide,
    href: "/es/calculadora-regla-de-tres",
    status: "active",
    badge: "Nuevo & Activo",
    langBadge: "ES 🇪🇸",
    highlights: ["Proporción directa e inversa", "Resolución paso a paso en vivo", "Diseño visual 2x2 intuitivo"],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Advertisement Banner */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <AdBanner position="top" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 text-center sm:pt-14 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-xs mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Suite Multilingue de 5 Micro-Outils Ultra-Performants</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl sm:leading-tight">
            Des outils en ligne <span className="text-blue-600">rapides</span>, précis et{" "}
            <span className="underline decoration-blue-500/30 decoration-wavy">100% gratuits</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Effectuez vos calculs fiscaux, énergétiques, juridiques, temporels et mathématiques sans inscription, sans
            cookies invasifs et avec un temps de chargement quasi-instantané.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-neutral-600">
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 shadow-2xs">
              <Zap className="h-4 w-4 text-amber-500" />
              Score PageSpeed 95+
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Zéro Stockage de Données
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 shadow-2xs">
              <Smartphone className="h-4 w-4 text-blue-500" />
              100% Mobile & Desktop
            </span>
          </div>
        </div>
      </section>

      {/* Tools Directory Section */}
      <section id="tools" className="border-t border-neutral-200/80 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Annuaire des Micro-Outils
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Nos 5 Calculateurs Spécialisés
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Tous les outils sont 100% opérationnels en français, allemand, espagnol et arabe.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              5 Outils Actifs &bull; 100% Opérationnels
            </div>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;

              const getAccentClass = () => {
                if (tool.id === "stromverbrauch-rechner") return "bg-emerald-600 group-hover:bg-emerald-700";
                if (tool.id === "calculadora-dias-habiles") return "bg-amber-600 group-hover:bg-amber-700";
                if (tool.id === "hijri-age-calculator") return "bg-emerald-700 group-hover:bg-emerald-800";
                if (tool.id === "calculadora-regla-de-tres") return "bg-indigo-600 group-hover:bg-indigo-700";
                return "bg-blue-600 group-hover:bg-blue-700";
              };

              const getCardBorder = () => {
                if (tool.id === "stromverbrauch-rechner") {
                  return "border-emerald-300 bg-gradient-to-b from-emerald-50/30 to-white shadow-sm hover:border-emerald-500 hover:shadow-md";
                }
                if (tool.id === "calculadora-dias-habiles") {
                  return "border-amber-300 bg-gradient-to-b from-amber-50/30 to-white shadow-sm hover:border-amber-500 hover:shadow-md";
                }
                if (tool.id === "hijri-age-calculator") {
                  return "border-emerald-300 bg-gradient-to-b from-emerald-50/30 to-white shadow-sm hover:border-emerald-600 hover:shadow-md";
                }
                if (tool.id === "calculadora-regla-de-tres") {
                  return "border-indigo-300 bg-gradient-to-b from-indigo-50/30 to-white shadow-sm hover:border-indigo-500 hover:shadow-md";
                }
                return "border-blue-300 bg-gradient-to-b from-blue-50/40 to-white shadow-sm hover:border-blue-500 hover:shadow-md";
              };

              const getIconBg = () => {
                if (tool.id === "stromverbrauch-rechner") return "bg-emerald-600 text-white";
                if (tool.id === "calculadora-dias-habiles") return "bg-amber-600 text-white";
                if (tool.id === "hijri-age-calculator") return "bg-emerald-700 text-white";
                if (tool.id === "calculadora-regla-de-tres") return "bg-indigo-600 text-white";
                return "bg-blue-600 text-white";
              };

              return (
                <Link key={tool.id} href={tool.href} className="block h-full">
                  <div
                    className={`group relative flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-200 ${getCardBorder()}`}
                  >
                    <div>
                      {/* Header: Icon + Badge + Language */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-xs ${getIconBg()}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
                            {tool.langBadge}
                          </span>
                          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {tool.badge}
                          </span>
                        </div>
                      </div>

                      {/* Category & Title */}
                      <div className="mt-5">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                          {tool.category}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                          {tool.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <ul className="mt-5 space-y-1.5 border-t border-neutral-100 pt-4">
                        {tool.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-600">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-neutral-100">
                      <span
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition ${getAccentClass()}`}
                      >
                        <span>Ouvrir l&apos;outil</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Middle Advertisement */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdBanner position="in-content" />
      </div>

      {/* Value Proposition */}
      <section className="bg-neutral-50 py-16 border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Pourquoi utiliser notre réseau de micro-outils ?
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Des calculateurs spécialisés conçus pour répondre précisément aux besoins fiscaux, juridiques, énergétiques, culturels et mathématiques.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-neutral-900">Temps de Réponse Instantané</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Tous les algorithmes s&apos;exécutent localement en JavaScript/TypeScript pur sans temps de latence serveur.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-neutral-900">Confidentialité & RGPD</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Vos montants, dates de naissance et données restent strictement sur votre appareil. Aucun enregistrement externe.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-neutral-900">Optimisé Mobile & Multilingue</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Prise en charge native LTR et RTL, responsive sur smartphones et tablettes avec boutons de copie en un clic.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
