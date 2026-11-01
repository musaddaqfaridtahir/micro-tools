import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Calculator,
  HelpCircle,
  BookOpen,
  ArrowRightLeft,
  Sparkles,
  Equal,
  CheckCircle2,
} from "lucide-react";
import RuleOfThreeCalculator from "./RuleOfThreeCalculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Calculadora de Regla de Tres Online – Directa e Inversa (Gratis)",
  description:
    "Resuelva problemas de proporcionalidad al instante con nuestra calculadora de regla de tres simple directa e inversa. Incluye fórmula y explicación paso a paso.",
  alternates: {
    canonical: "/es/calculadora-regla-de-tres",
  },
  openGraph: {
    title: "Calculadora de Regla de Tres Online – Directa e Inversa (Gratis)",
    description:
      "Resuelva problemas de proporcionalidad al instante con nuestra calculadora de regla de tres simple directa e inversa. Incluye fórmula y explicación paso a paso.",
    url: "/es/calculadora-regla-de-tres",
    type: "website",
    locale: "es_ES",
    siteName: "MicroTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Regla de Tres Online – Directa e Inversa (Gratis)",
    description:
      "Resuelva problemas de proporcionalidad al instante con nuestra calculadora de regla de tres simple directa e inversa. Incluye fórmula y explicación paso a paso.",
  },
};

const FAQ_RULE_THREE_DATA = [
  {
    question: "¿Qué es la regla de tres simple?",
    answer:
      "La regla de tres simple es una operación matemática fundamental que permite encontrar el cuarto término desconocido de una proporción conociendo tres valores relacionados. Se clasifica en regla de tres directa (cuando las dos magnitudes aumentan o disminuyen juntas) y regla de tres inversa (cuando un aumento en una magnitud provoca una disminución en la otra).",
  },
  {
    question: "¿Cómo saber si una regla de tres es directa o inversa?",
    answer:
      "Es directa si al aumentar una cantidad, la otra también aumenta proporcionalmente (por ejemplo, a más cantidad de kilos comprados, mayor será el precio total). Es inversa si al aumentar una cantidad, la otra disminuye (por ejemplo, a mayor número de trabajadores en una obra, menos días se tardará en terminarla).",
  },
  {
    question: "¿Cuál es la fórmula para calcular la regla de tres directa?",
    answer:
      "En una regla de tres directa donde A produce B y queremos saber cuánto produce C (valor X), la fórmula es: X = (B × C) / A. Se multiplican los valores cruzados (B y C) y se divide el resultado entre el valor restante (A).",
  },
  {
    question: "¿Para qué sirve la regla de tres en la vida cotidiana?",
    answer:
      "La regla de tres se utiliza a diario para: 1. Ajustar ingredientes en recetas de cocina según el número de comensales. 2. Calcular descuentos en rebajas y porcentajes. 3. Calcular el consumo de gasolina según la distancia. 4. Convertir escalas en planos arquitectónicos y dosificaciones farmacéuticas.",
  },
];

export default function RuleOfThreePage() {
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_RULE_THREE_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Regla de Tres Online",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Calculadora online para resolver la regla de tres simple directa e inversa con resolución y desglose de fórmula paso a paso.",
  };

  return (
    <div className="py-8 sm:py-12" lang="es">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Miga de pan" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#tools" className="hover:text-neutral-900 transition">
            Matemáticas & Utilidades
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Calculadora de Regla de Tres
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Resolución matemática inmediata con explicación paso a paso</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculadora de Regla de Tres Online
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            Resuelva problemas de proporcionalidad directa e inversa de forma instantánea. 
            Introduzca los tres valores conocidos para obtener el resultado X y visualizar la fórmula detallada.
          </p>
        </header>

        {/* 1. TOP AD BANNER PLACEHOLDER */}
        <div className="mb-8">
          <AdBanner position="top" adSlot="banner-top-regla-de-tres-es" />
        </div>

        {/* 2. THE RULE OF THREE CALCULATOR COMPONENT */}
        <section aria-label="Herramienta interactiva de cálculo de regla de tres" className="mb-10">
          <Suspense fallback={<div className="h-96 rounded-3xl bg-neutral-100 animate-pulse" />}>
            <RuleOfThreeCalculator />
          </Suspense>
        </section>

        {/* 3. IN-CONTENT AD BANNER PLACEHOLDER */}
        <div className="my-10">
          <AdBanner position="in-content" adSlot="content-banner-regla-de-tres-es" />
        </div>

        {/* 4. HIGH-QUALITY NATIVE SPANISH SEO CONTENT */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Introduction */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                La Regla de Tres: La Herramienta Matemática Más Útil del Día a Día
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-4">
              La <strong>regla de tres</strong> es una de las fórmulas matemáticas más prácticas y utilizadas 
              en todo el mundo. Desde estudiantes de secundaria y universidad hasta profesionales de la cocina, 
              la construcción, la ingeniería y las finanzas, resolver una incógnita a partir de tres datos conocidos 
              es una necesidad constante.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
              Nuestra calculadora en línea simplifica este proceso: no sólo calcula el valor final sin recargar la página, 
              sino que además <strong>desglosa el procedimiento aritmético paso a paso</strong> con sus números reales, 
              permitiendo verificar el resultado y comprender la lógica matemática subyacente.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  Estudio y Tareas Escolares
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  Compruebe sus ejercicios de matemáticas y física con la solución detallada.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Equal className="h-4 w-4 text-emerald-600" />
                  Cocina y Recetas
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  Ajuste gramos y mililitros con precisión al cambiar el número de porciones.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <ArrowRightLeft className="h-4 w-4 text-indigo-600" />
                  Comercio y Finanzas
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  Calcule porcentajes de descuento, proporciones de divisas y precios por unidad.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Cómo funciona */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <Calculator className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Cómo funciona la calculadora de regla de tres
              </h2>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Dependiendo de la relación entre las variables, existen dos modalidades de cálculo:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direct Card */}
              <div className="flex flex-col rounded-2xl border border-blue-200 bg-blue-50/40 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                    Modalidad 1
                  </span>
                  <span className="text-xs font-bold text-blue-800">Proporción Directa</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900">Regla de tres directa</h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Se aplica cuando ambas variables se mueven en el mismo sentido: si A aumenta, B aumenta en la misma proporción.
                </p>
                <div className="mt-4 rounded-xl bg-white p-3 font-mono text-xs border border-blue-200 text-neutral-900">
                  Fórmula: X = (B × C) / A
                </div>
                <p className="mt-2 text-[11px] text-neutral-500">
                  Método: Multiplicación en cruz de B y C, y división entre A.
                </p>
              </div>

              {/* Inverse Card */}
              <div className="flex flex-col rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-lg bg-amber-600 px-2.5 py-1 text-xs font-bold text-white">
                    Modalidad 2
                  </span>
                  <span className="text-xs font-bold text-amber-800">Proporción Inversa</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900">Regla de tres inversa</h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Se aplica cuando una variable aumenta y la otra disminuye: más obreros terminan una obra en menos tiempo.
                </p>
                <div className="mt-4 rounded-xl bg-white p-3 font-mono text-xs border border-amber-200 text-neutral-900">
                  Fórmula: X = (A × B) / C
                </div>
                <p className="mt-2 text-[11px] text-neutral-500">
                  Método: Multiplicación horizontal de A y B, y división entre C.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Ejemplos prácticos */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
              Ejemplos Prácticos: Directa vs Inversa
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Analicemos dos casos reales para comprender cuándo elegir cada una:
            </p>

            <div className="mt-6 space-y-6">
              {/* Example 1: Directa */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Ejemplo de Regla de Tres Directa: Compra por kilos</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  <strong>Problema:</strong> Si 3 kilogramos de manzanas cuestan 6 €, ¿cuánto costarán 7 kilogramos de manzanas?
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono bg-white p-3 rounded-xl border border-neutral-200">
                  <div>3 kg ➔ 6 €</div>
                  <div>7 kg ➔ X €</div>
                  <div className="text-blue-700 font-bold">X = (6 × 7) / 3 = 14 €</div>
                </div>
                <span className="block mt-2 text-[11px] text-neutral-500">
                  A más kilos, más euros pagaremos. Por lo tanto, es directamente proporcional.
                </span>
              </div>

              {/* Example 2: Inversa */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Ejemplo de Regla de Tres Inversa: Trabajo en equipo y tiempo</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  <strong>Problema:</strong> 4 albañiles construyen un muro en 10 días. Si contratamos a 8 albañiles, ¿cuántos días tardarán?
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono bg-white p-3 rounded-xl border border-neutral-200">
                  <div>4 obreros ➔ 10 días</div>
                  <div>8 obreros ➔ X días</div>
                  <div className="text-amber-700 font-bold">X = (4 × 10) / 8 = 5 días</div>
                </div>
                <span className="block mt-2 text-[11px] text-neutral-500">
                  A más obreros trabajando, menos días serán necesarios. Por lo tanto, es inversamente proporcional.
                </span>
              </div>
            </div>
          </section>

          {/* Section 4: Preguntas Frecuentes (FAQ) */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-6">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Preguntas Frecuentes (FAQ) sobre la Regla de Tres
              </h2>
            </div>

            <div className="divide-y divide-neutral-200">
              {FAQ_RULE_THREE_DATA.map((faq, index) => (
                <div key={index} className="py-5">
                  <h3 className="text-base font-bold text-neutral-900 m-0">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 m-0">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Security & Reliability Callout */}
        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Precisión Matemática Garantizada</span>
          </div>
          <p className="text-emerald-700 max-w-xl mx-auto">
            Todos los cálculos aritméticos se resuelven en memoria local con precisión decimal exacta y sin publicidad intrusiva.
          </p>
        </aside>
      </div>
    </div>
  );
}
