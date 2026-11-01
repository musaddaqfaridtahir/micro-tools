import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  CalendarCheck2,
  HelpCircle,
  BookOpen,
  ArrowRightLeft,
  FileCheck2,
  Scale,
  Sparkles,
} from "lucide-react";
import WorkingDaysCalculator from "./WorkingDaysCalculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Calculadora de Días Hábiles y Laborables – Sumar Días a una Fecha",
  description:
    "Calcule fácilmente los días hábiles o laborables entre fechas o sume días hábiles a una fecha específica excluyendo fines de semana. Herramienta 100% gratis.",
  alternates: {
    canonical: "/es/calculadora-dias-habiles",
  },
  openGraph: {
    title: "Calculadora de Días Hábiles y Laborables – Sumar Días a una Fecha",
    description:
      "Calcule fácilmente los días hábiles o laborables entre fechas o sume días hábiles a una fecha específica excluyendo fines de semana. Herramienta 100% gratis.",
    url: "/es/calculadora-dias-habiles",
    type: "website",
    locale: "es_ES",
    siteName: "MicroTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Días Hábiles y Laborables – Sumar Días a una Fecha",
    description:
      "Calcule fácilmente los días hábiles o laborables entre fechas o sume días hábiles a una fecha específica excluyendo fines de semana. Herramienta 100% gratis.",
  },
};

const FAQ_SPANISH_DATA = [
  {
    question: "¿Cómo se cuentan los días hábiles legales y administrativos?",
    answer:
      "En el cómputo legal y administrativo (por ejemplo, en la Ley 39/2015 del Procedimiento Administrativo Común en España), los plazos señalados por días se entienden como días hábiles salvo que una ley exprese lo contrario. El cómputo comienza a partir del día siguiente a la notificación o publicación del acto, y se excluyen los sábados, domingos y los días declarados festivos.",
  },
  {
    question: "¿Se consideran los sábados como días hábiles en España?",
    answer:
      "En el ámbito administrativo y procesal general en España, desde la entrada en vigor de la Ley 39/2015, los sábados son días inhábiles junto con los domingos y festivos. No obstante, en el ámbito laboral o mercantil privado (por ejemplo, en el sector comercio o ciertos contratos de obra), los sábados pueden ser considerados laborables según lo pactado en convenio colectivo o contrato.",
  },
  {
    question: "¿Qué sucede si el último día del plazo de vencimiento es inhábil?",
    answer:
      "Tanto el Código Civil como el procedimiento administrativo establecen que si el último día del plazo fijado es inhábil (sábado, domingo o festivo oficial), dicho plazo se prorroga automáticamente al primer día hábil siguiente.",
  },
  {
    question: "¿Cuál es la diferencia exacta entre días hábiles y días naturales?",
    answer:
      "Los días naturales son todos los días correlativos del año civil (de lunes a domingo, incluidos festivos). Por su parte, los días hábiles son exclusivamente aquellos con validez jurídica o administrativa para realizar trámites o presentar alegaciones, excluyendo fines de semana y festivos.",
  },
];

export default function WorkingDaysCalculatorPage() {
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SPANISH_DATA.map((item) => ({
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
    name: "Calculadora de Días Hábiles y Laborables",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Herramienta gratuita para calcular y sumar o restar días hábiles y laborables a una fecha excluyendo fines de semana.",
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
            Herramientas Legales & Gestión
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            Calculadora de Días Hábiles
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Actualizado con la normativa administrativa y procesal</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Calculadora de Días Hábiles y Laborables
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            Sume o reste fácilmente días hábiles a cualquier fecha para calcular plazos administrativos, 
            vencimientos judiciales, entregas profesionales o contratos mercantiles sin errores.
          </p>
        </header>

        {/* 1. TOP AD BANNER PLACEHOLDER */}
        <div className="mb-8">
          <AdBanner position="top" adSlot="banner-top-dias-habiles-es" />
        </div>

        {/* 2. THE WORKING DAYS CALCULATOR COMPONENT */}
        <section aria-label="Herramienta interactiva de cálculo de días hábiles" className="mb-10">
          <Suspense fallback={<div className="h-96 rounded-3xl bg-neutral-100 animate-pulse" />}>
            <WorkingDaysCalculator />
          </Suspense>
        </section>

        {/* 3. IN-CONTENT AD BANNER PLACEHOLDER */}
        <div className="my-10">
          <AdBanner position="in-content" adSlot="content-banner-dias-habiles-es" />
        </div>

        {/* 4. HIGH-QUALITY NATIVE SPANISH SEO CONTENT */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Introduction */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                El Cómputo de Plazos: Por qué es Crucial Contar en Días Hábiles
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-4">
              Calcular con precisión una fecha límite o plazo de vencimiento es un requisito indispensable 
              en el mundo profesional, empresarial y jurídico. Ya sea para interponer un recurso ante la 
              Administración Pública (Agencia Tributaria, Seguridad Social o ayuntamientos), contestar una demanda 
              en sede judicial, o coordinar el cronograma de entrega con un cliente, una confusión entre días naturales 
              y días hábiles puede provocar la pérdida de derechos o la aplicación de penalizaciones contractuales.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
              Nuestra <strong>Calculadora de Días Hábiles en Línea</strong> realiza el cálculo automático excluyendo 
              fines de semana al instante. Todo el cómputo se procesa en su navegador de forma confidencial, garantizando 
              una respuesta inmediata y libre de publicidad intrusiva.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Scale className="h-4 w-4 text-blue-600" />
                  Ámbito Jurídico y Legal
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  Control exacto de plazos procesales, recursos de alzada y requerimientos administrativos.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <FileCheck2 className="h-4 w-4 text-emerald-600" />
                  Empresas y Autónomos
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  Planificación de fechas de pago de facturas, vencimiento de pagarés y entregas a clientes.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <CalendarCheck2 className="h-4 w-4 text-indigo-600" />
                  Gestión de Proyectos
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  Estimación de sprints y fases de trabajo considerando únicamente jornadas operativas efectivas.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Cómo usar la calculadora */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-3">
              <ArrowRightLeft className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Cómo usar la calculadora de días hábiles
              </h2>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              El algoritmo de cálculo determina la fecha final estimada en 3 sencillos pasos:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  1
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Elija la fecha de inicio</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Indique la fecha en que comienza el cómputo o el día de recepción de la notificación oficial.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  2
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Configure los días</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Introduzca el número de días hábiles y seleccione si desea sumarlos (plazo futuro) o restarlos (fecha previa).
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white mb-3">
                  3
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Ajuste de fines de semana</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Excluya Sábados y Domingos (criterio estándar en España) o Solo Domingos según la naturaleza de su sector.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Diferencia entre días hábiles y días naturales */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
              Diferencia entre Días Hábiles, Días Naturales y Días Laborables
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Para evitar errores en la interpretación de contratos o notificaciones legales, es fundamental 
              distinguir las tres categorías de días existentes en la legislación española y latinoamericana:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="py-3.5 px-4 font-bold">Tipo de Día</th>
                    <th className="py-3.5 px-4 font-bold">¿Qué incluye?</th>
                    <th className="py-3.5 px-4 font-bold">¿Qué excluye?</th>
                    <th className="py-3.5 px-4 font-bold">Uso habitual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-blue-600 text-base">Días Hábiles</td>
                    <td className="py-3.5 px-4 font-medium text-neutral-900">
                      De lunes a viernes aptos para trámites.
                    </td>
                    <td className="py-3.5 px-4 font-medium text-red-600">
                      Sábados, domingos y festivos oficiales.
                    </td>
                    <td className="py-3.5 px-4">
                      Administración Pública (Ley 39/2015), recursos tributarios, juzgados y tribunales.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-neutral-800 text-base">Días Naturales</td>
                    <td className="py-3.5 px-4 font-medium text-neutral-900">
                      Los 365 (o 366) días continuos del año.
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-500">
                      No excluye ningún día.
                    </td>
                    <td className="py-3.5 px-4">
                      Contratos de arrendamiento (alquiler), garantías comerciales, plazos de desistimiento de compras.
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-emerald-600 text-base">Días Laborables</td>
                    <td className="py-3.5 px-4 font-medium text-neutral-900">
                      Días en que se trabaja según convenio colectivo.
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-500">
                      Domingos y festivos del calendario laboral.
                    </td>
                    <td className="py-3.5 px-4">
                      Cálculo de vacaciones laborales, jornadas en comercio y hostelería (los sábados suelen ser laborables).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-xl bg-neutral-50 p-4 border border-neutral-200/80 text-xs text-neutral-500">
              <strong>Importante sobre festivos locales y autonómicos:</strong> Nuestra calculadora excluye automáticamente los fines de semana. Si durante el periodo existe un festivo nacional, autonómico o local específico (como Navidad o fiestas patronales), debe restar ese día festivo adicional de su cómputo final.
            </div>
          </section>

          {/* Section 4: Preguntas Frecuentes (FAQ) */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600 mb-6">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                Preguntas Frecuentes (FAQ) sobre el Cómputo de Días
              </h2>
            </div>

            <div className="divide-y divide-neutral-200">
              {FAQ_SPANISH_DATA.map((faq, index) => (
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
            <span>Precisión y Privacidad Total</span>
          </div>
          <p className="text-emerald-700 max-w-xl mx-auto">
            Todas las operaciones cronológicas se procesan en el entorno seguro de su navegador. 
            No almacenamos fechas, documentos ni datos de navegación en servidores externos.
          </p>
        </aside>
      </div>
    </div>
  );
}
