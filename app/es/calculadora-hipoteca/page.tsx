import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import MortgageCalculator from "./MortgageCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("calculadora-hipoteca")!;

export const metadata: Metadata = {
  title: "Calculadora de Hipoteca y Préstamos (Cuota Mensual – Sistema Francés)",
  description:
    "Simula la cuota mensual de tu hipoteca o préstamo personal en euros o dólares según el Sistema Francés: calcula intereses totales, total a pagar y cuadro resumen.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/es/calculadora-hipoteca",
  },
  openGraph: {
    title: "Calculadora de Hipoteca y Préstamos Online – Cuota Mensual",
    description:
      "Calcula gratis tu cuota mensual, los intereses acumulados y el capital amortizado año a año con el sistema de amortización francés.",
    url: "/es/calculadora-hipoteca",
    type: "website",
    locale: "es_ES",
    siteName: "MicroTools",
  },
};

const FAQ_HIPOTECA = [
  {
    question: "¿Cómo se calcula la cuota mensual de una hipoteca con el Sistema Francés?",
    answer:
      "El sistema de amortización francés mantiene la cuota mensual constante durante todo el préstamo (si el tipo es fijo). La fórmula es: Cuota = Capital × [i × (1 + i)^n] ÷ [(1 + i)^n - 1], donde i es el interés mensual (TIN anual / 12 / 100) y n es el número total de mensualidades.",
  },
  {
    question: "¿Qué diferencia hay entre TIN y TAE al simular una hipoteca?",
    answer:
      "El TIN (Tipo de Interés Nominal) es el porcentaje puro que se aplica sobre el capital pendiente para calcular la cuota mensual. La TAE (Tasa Anual Equivalente) incorpora además comisiones de apertura, seguros vinculados y la periodicidad de los pagos, sirviendo para comparar ofertas entre bancos.",
  },
  {
    question: "¿Por qué se pagan más intereses durante los primeros años del préstamo?",
    answer:
      "Porque en cada cuota mensual los intereses se calculan sobre el capital pendiente de devolver. Al inicio de la hipoteca la deuda es máxima, por lo que una mayor parte de la cuota va a intereses; con el paso de los años disminuye el capital vivo y aumenta la proporción amortizada.",
  },
  {
    question: "¿Conviene más elegir un plazo de 20 o 30 años?",
    answer:
      "Un plazo más largo (30 años) reduce la cuota mensual y da mayor holgura presupuestaria cada mes, pero incrementa de forma considerable el total de intereses pagados al banco. Si tus ingresos lo permiten, reducir el plazo ahorra miles de euros en intereses.",
  },
  {
    question: "¿Se guardan mis datos financieros o importes introducidos?",
    answer:
      "No. La simulación hipotecaria se ejecuta íntegramente en tu navegador (Client-Side) sin enviar datos a servidores ni requerir registro.",
  },
];

export default function CalculadoraHipotecaPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="es">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_HIPOTECA}
        pageTitle="Calculadora de Hipoteca y Préstamos (Cuota Mensual)"
        pageDescription="Simulador gratuito de hipotecas y préstamos personales con Sistema Francés: cuota mensual, intereses totales y cuadro de amortización."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Ruta de navegación" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/es" className="hover:text-neutral-900 transition">
            Herramientas en Español (<span translate="no" className="notranslate font-bold">ES</span>)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Calculadora de Hipoteca y Préstamos
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 shadow-2xs">
            <Home className="h-3.5 w-3.5" />
            <span>Sistema Francés &bull; Hipotecas y Préstamos Personales</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculadora de Hipoteca y Préstamos
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Calcula al instante tu <strong>cuota mensual</strong>, el <strong>total de intereses</strong> y el{" "}
            <strong>importe total a devolver</strong> según el capital, interés anual (TIN) y plazo en años o meses.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-hipoteca-es" />
        </div>

        <section aria-label="Simulador interactivo de hipoteca y préstamos" className="mb-6 sm:mb-10">
          <MortgageCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-hipoteca-es" />
        </div>

        {/* 700+ Word Spanish SEO Guide */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-emerald-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Cómo funciona el cálculo de hipoteca y el Sistema de Amortización Francés
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Tanto en España como en la mayoría de países de Latinoamérica, las entidades bancarias emplean el <strong>Sistema de Amortización Francés</strong> para calcular las hipotecas de vivienda y los préstamos personales o de automóvil. Su característica principal es que, bajo un tipo de interés fijo o durante cada periodo de revisión en hipotecas variables, la <strong>cuota mensual permanece constante</strong> desde el primer hasta el último mes.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Sin embargo, la composición interna de esa cuota cambia continuamente: durante los primeros años, una fracción elevada de cada recibo corresponde al pago de intereses sobre el capital vivo, mientras que hacia el tramo final del préstamo casi la totalidad de la cuota amortiza capital principal. Nuestra <strong>Calculadora de Hipoteca y Préstamos</strong> muestra en segundos la cuota exacta, la proporción capital/intereses y hitos clave de evolución anual.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Instrucciones de uso, fórmula financiera y comparativa por plazo
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm sm:text-base text-neutral-700">
              <li>Selecciona la divisa deseada (<strong>Euro €</strong> o <strong>Dólar $</strong>).</li>
              <li>Introduce el <strong>Capital</strong> solicitado al banco (descontando tu ahorro o entrada inicial).</li>
              <li>Indica el <strong>Tipo de interés anual (TIN %)</strong> ofrecido en la ficha de información precontractual (FEIN).</li>
              <li>Especifica el <strong>Plazo</strong> en años (por ejemplo, 20, 25 o 30 años para vivienda) o cambia a <em>Meses</em> para préstamos rápidos (24, 36 o 60 meses).</li>
            </ol>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Fórmula matemática del Sistema Francés
              </span>
              <p className="mt-2 font-mono text-xs sm:text-sm font-bold text-neutral-900">
                Cuota Mensual = Capital × [ i × (1 + i)^n ] ÷ [ (1 + i)^n - 1 ]
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Donde <strong>i = TIN anual ÷ 12 ÷ 100</strong> y <strong>n = número total de meses</strong>.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-xs font-bold uppercase text-neutral-600">
                  <tr>
                    <th className="px-4 py-3">Escenario (150.000 € al 3,2 % TIN)</th>
                    <th className="px-4 py-3">Cuota Mensual</th>
                    <th className="px-4 py-3">Total Intereses</th>
                    <th className="px-4 py-3">Total a Pagar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-900">Plazo corto: 15 años (180 meses)</td>
                    <td className="px-4 py-3 font-semibold text-emerald-700">1.050,49 €</td>
                    <td className="px-4 py-3 text-amber-700">39.088,69 €</td>
                    <td className="px-4 py-3">189.088,69 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-900">Plazo medio: 25 años (300 meses)</td>
                    <td className="px-4 py-3 font-semibold text-emerald-700">727,01 €</td>
                    <td className="px-4 py-3 text-amber-700">68.103,09 €</td>
                    <td className="px-4 py-3">218.103,09 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-900">Plazo largo: 30 años (360 meses)</td>
                    <td className="px-4 py-3 font-semibold text-emerald-700">648,69 €</td>
                    <td className="px-4 py-3 text-amber-700">83.528,17 €</td>
                    <td className="px-4 py-3">233.528,17 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <FileCheck2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                2 ejemplos prácticos de financiación
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Ejemplo 1: Hipoteca vivienda habitual (150.000 € a 25 años)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Un comprador financia el 80 % de una vivienda solicitando <strong>150.000 €</strong> a un tipo fijo del <strong>3,2 % TIN</strong> durante <strong>25 años (300 meses)</strong>:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Cuota mensual aproximada: <strong>727,01 €/mes</strong></li>
                  <li>Total intereses acumulados: <strong>68.103,09 €</strong></li>
                  <li>Total devuelto al banco: <strong>218.103,09 €</strong></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  Ejemplo 2: Préstamo automóvil (20.000 € a 60 meses)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Para financiar la compra de un coche con <strong>20.000 €</strong> al <strong>6,5 % TIN</strong> en <strong>5 años (60 cuotas)</strong>:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pl-4">
                  <li>Cuota mensual constante: <strong>391,32 €/mes</strong></li>
                  <li>Coste total en intereses: <strong>3.479,38 €</strong></li>
                  <li>Importe total pagado: <strong>23.479,38 €</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-emerald-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Preguntas frecuentes sobre hipotecas y préstamos
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_HIPOTECA} accent="emerald" />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <strong className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Privacidad y carácter informativo:
              </strong>
              Todos los cálculos se ejecutan localmente en tu dispositivo sin guardar información personal ni bancaria.
            </div>
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
