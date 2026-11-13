import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Receipt,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SpanishVatCalculator from "./SpanishVatCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("calculadora-iva")!;

export const metadata: Metadata = {
  title: "Calculadora de IVA Online (España 21%, 10%, 4% y Latam) – Gratis",
  description:
    "Calcule la Base Imponible, la Cuota de IVA y el Total con IVA al instante. Compatible con los tipos vigentes en España (21%, 10%, 4%) y tasas de Latinoamérica.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/es/calculadora-iva",
  },
  openGraph: {
    title: "Calculadora de IVA Online (España 21%, 10%, 4% y Latam)",
    description:
      "Añada o quite el IVA al instante con nuestra calculadora gratuita para autónomos, pymes y particulares.",
    url: "/es/calculadora-iva",
    type: "website",
    locale: "es_ES",
    siteName: "MicroTools",
  },
};

const FAQ_IVA_ES_DATA = [
  {
    question: "¿Cómo quitar el 21% de IVA de un precio total?",
    answer:
      "Para extraer la Base Imponible a partir de un importe Total con IVA incluido al 21%, debe dividir el precio total entre 1,21 (nunca restar el 21% directamente). Por ejemplo, en un ticket de 121 €, la Base Imponible es 121 ÷ 1,21 = 100 € y la cuota de IVA es de 21 €.",
  },
  {
    question: "¿Qué bienes tributan al 21%, al 10% y al 4% en España en 2026?",
    answer:
      "El tipo general del 21% se aplica a la mayoría de productos y servicios (tecnología, ropa, servicios profesionales, coches). El tipo reducido del 10% grava hostelería, transporte de viajeros, vivienda nueva y gran parte de alimentos elaborados. El tipo superreducido del 4% corresponde a alimentos de primera necesidad (pan, leche, huevos, fruta, verdura), libros, periódicos y medicamentos.",
  },
  {
    question: "¿Qué diferencia hay entre Base Imponible, Cuota de IVA y Total Factura?",
    answer:
      "La Base Imponible es el precio neto del servicio o producto antes de impuestos. La Cuota de IVA es el importe resultante de aplicar el porcentaje del impuesto sobre la base. Finalmente, el Total Factura es la suma de la Base Imponible más la Cuota de IVA.",
  },
  {
    question: "¿Sirve esta calculadora para países de Latinoamérica como México, Colombia o Chile?",
    answer:
      "Sí. Además de los tipos españoles (21%, 10% y 4%), incorporamos accesos rápidos para el IVA del 16% en México y el 19% en Colombia y Chile, así como un campo personalizable para cualquier otra tasa nacional o impuesto equivalente (IGV 18% en Perú, IVA 15% en Ecuador, etc.).",
  },
  {
    question: "¿Se guardan mis importes o facturas en algún servidor?",
    answer:
      "No. Toda la operativa se realiza al 100% en la memoria local de su navegador mediante JavaScript sin enviar ningún dato económico a servidores externos.",
  },
];

export default function CalculadoraIvaEsPage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="es">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_IVA_ES_DATA}
        pageTitle="Calculadora de IVA Online España y Latinoamérica 2026"
        pageDescription="Calcule Base Imponible, Cuota de IVA y Total con IVA para España (21%, 10%, 4%) y Latinoamérica de forma gratuita y privada."
        priceCurrency="EUR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Miga de pan" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/es" className="hover:text-neutral-900 transition">
            Calculadoras en Español (<span translate="no" className="notranslate font-bold">ES</span>)
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Calculadora de IVA
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs">
            <Receipt className="h-3.5 w-3.5" />
            <span>Actualizado para normativa tributaria 2026</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculadora de IVA Online
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            Calcule al instante la <strong>Base Imponible</strong>, la <strong>Cuota de IVA</strong> y el{" "}
            <strong>Total con IVA</strong> para facturas en España (21 %, 10 %, 4 %) o Latinoamérica.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-calculadora-iva-es" />
        </div>

        <section aria-label="Calculadora interactiva de IVA" className="mb-6 sm:mb-10">
          <SpanishVatCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-calculadora-iva-es" />
        </div>

        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-blue-600">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                ¿Qué es el IVA y cómo se calcula correctamente en 2026?
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              El <strong>Impuesto sobre el Valor Añadido (IVA)</strong> es un tributo indirecto que grava el consumo de bienes y la prestación de servicios por parte de empresas y autónomos. Emitir facturas con errores de redondeo o confundir el cálculo inverso al extraer la base imponible desde un precio final con impuestos incluidos es uno de los fallos más habituales en la contabilidad de pymes y profesionales independientes.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              Con nuestra herramienta podrá alternar en un clic entre <strong>Añadir IVA</strong> (ideal para elaborar presupuestos partiendo de sus honorarios netos) y <strong>Quitar IVA</strong> (esencial para contabilizar tickets de compra, gasolina, comidas o facturas cuyo importe viene expresado con impuestos incluidos).
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              Fórmulas matemáticas y tabla oficial de tipos de IVA
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
                <span className="text-xs font-bold uppercase text-blue-900">
                  1. Añadir IVA (De Base Imponible a Total)
                </span>
                <div className="mt-2 rounded-lg border border-blue-200 bg-white p-3 font-mono text-xs text-neutral-900">
                  Cuota IVA = Base Imponible × (Tipo / 100)
                  <br />
                  Total con IVA = Base Imponible × (1 + Tipo / 100)
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                <span className="text-xs font-bold uppercase text-emerald-900">
                  2. Quitar IVA (De Total a Base Imponible)
                </span>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-3 font-mono text-xs text-neutral-900">
                  Base Imponible = Total ÷ (1 + Tipo / 100)
                  <br />
                  Cuota IVA = Total - Base Imponible
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="px-4 py-3.5 font-bold">Tipo de IVA</th>
                    <th className="px-4 py-3.5 font-bold">País / Ámbito</th>
                    <th className="px-4 py-3.5 font-bold">Factor divisor</th>
                    <th className="px-4 py-3.5 font-bold">Bienes y servicios habituales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr>
                    <td className="px-4 py-3.5 font-extrabold text-blue-700">21 %</td>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">General (España)</td>
                    <td className="px-4 py-3.5 font-mono">÷ 1,21</td>
                    <td className="px-4 py-3.5">Servicios profesionales, electrónica, vehículos, textil, suministros</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-extrabold text-blue-700">10 %</td>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">Reducido (España)</td>
                    <td className="px-4 py-3.5 font-mono">÷ 1,10</td>
                    <td className="px-4 py-3.5">Restauración, hostelería, vivienda nueva, transporte de viajeros</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-extrabold text-blue-700">4 %</td>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">Superreducido (España)</td>
                    <td className="px-4 py-3.5 font-mono">÷ 1,04</td>
                    <td className="px-4 py-3.5">Pan, leche, huevos, frutas, verduras, libros, medicamentos humanos</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-extrabold text-indigo-700">16 % / 19 %</td>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">México / Colombia y Chile</td>
                    <td className="px-4 py-3.5 font-mono">÷ 1,16 / ÷ 1,19</td>
                    <td className="px-4 py-3.5">Tasa general estándar aplicable en transacciones comerciales Latam</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              <FileCheck2 className="h-5 w-5 text-blue-600" />
              <span>Dos ejemplos prácticos paso a paso</span>
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-5">
                <h3 className="m-0 text-sm font-bold text-blue-900">
                  Ejemplo 1: Presupuesto de diseñador autónomo (Añadir 21%)
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  Si sus honorarios son de <strong>1.500,00 € de Base Imponible</strong>, aplicando el 21% resulta una Cuota de IVA de <code>1.500 × 0,21 = 315,00 €</code>. El cliente deberá abonar un Total con IVA de <strong>1.815,00 €</strong>.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5">
                <h3 className="m-0 text-sm font-bold text-emerald-900">
                  Ejemplo 2: Desglosar ticket de hotel o restaurante (Quitar 10%)
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  Para un ticket con importe final de <strong>88,00 €</strong> al tipo reducido del 10%, dividimos <code>88,00 ÷ 1,10 = 80,00 €</code> de Base Imponible y <strong>8,00 € de IVA soportado</strong> deducible.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 space-y-3 text-sm text-neutral-600 leading-relaxed">
              <h3 className="m-0 text-base font-bold text-neutral-900">
                Claves para facturar correctamente el IVA en España y Latinoamérica (2026)
              </h3>
              <p>
                Cuando emita facturas como autónomo o sociedad mercantil en España ante la Agencia Tributaria (Modelo 303 trimestral), debe detallar de forma explícita y separada la Base Imponible, el tipo porcentual aplicado (21 %, 10 % o 4 %), la Cuota Tributaria resultante y el importe total. Si además realiza servicios profesionales sometidos a retención de IRPF (generalmente 15 % o 7 % para nuevos autónomos), recuerde que tanto el IVA como el IRPF se calculan siempre sobre la Base Imponible neta, nunca sobre el total con IVA incluido.
              </p>
              <p>
                Por último, en ventas a particulares el precio mostrado al consumidor final debe incluir siempre los impuestos aplicables, mientras que en presupuestos entre empresas (B2B) suele indicarse la Base Imponible con la mención &quot;IVA no incluido&quot;. Utilizar una calculadora rápida con botón de copia reduce prácticamente a cero las discrepancias en asientos contables y conciliaciones bancarias.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2.5 text-blue-600">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                Preguntas Frecuentes (FAQ) sobre el IVA
              </h2>
            </div>

            <FaqAccordion faqs={FAQ_IVA_ES_DATA} dir="ltr" accent="blue" />
          </section>
        </article>

        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="mb-1 flex items-center justify-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>Privacidad Fiscal Garantizada</span>
          </div>
          <p className="mx-auto max-w-xl text-emerald-700">
            <Sparkles className="mr-1 inline h-3.5 w-3.5" />
            Ningún dato financiero o importe facturado se almacena en servidores externos.
          </p>
        </aside>

        <RelatedTools currentToolId="calculadora-iva" language="es" />
      </div>
    </div>
  );
}
