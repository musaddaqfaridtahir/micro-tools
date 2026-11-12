import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  ShieldCheck,
  CalendarCheck2,
  HelpCircle,
  BookOpen,
  ArrowRightLeft,
  Sparkles,
  Scale,
} from "lucide-react";
import HijriAgeCalculator from "./HijriAgeCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("hijri-age-calculator")!;

export const metadata: Metadata = {
  title: "حاسبة العمر بالهجري والميلادي – احسب عمرك بدقة أونلاين (مجاناً)",
  description:
    "احسب عمرك بالتفصيل بالسنوات والشهور والأيام بالتقويم الهجري والميلادي مجاناً مع معرفة تاريخ ميلادك الهجري والعد التنازلي لعيد ميلادك القادم.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/ar/hijri-age-calculator",
  },
  openGraph: {
    title: "حاسبة العمر بالهجري والميلادي – احسب عمرك بدقة أونلاين (مجاناً)",
    description:
      "احسب عمرك بالتفصيل بالسنوات والشهور والأيام بالتقويم الهجري والميلادي مجاناً مع معرفة تاريخ ميلادك الهجري والعد التنازلي لعيد ميلادك القادم.",
    url: "/ar/hijri-age-calculator",
    type: "website",
    locale: "ar_SA",
    siteName: "MicroTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة العمر بالهجري والميلادي – احسب عمرك بدقة أونلاين (مجاناً)",
    description:
      "احسب عمرك بالتفصيل بالسنوات والشهور والأيام بالتقويم الهجري والميلادي مجاناً مع معرفة تاريخ ميلادك الهجري والعد التنازلي لعيد ميلادك القادم.",
  },
};

const FAQ_ARABIC_DATA = [
  {
    question: "كيف أحسب عمري بالهجري والميلادي بدقة؟",
    answer:
      "لحساب عمرك بدقة، ما عليك سوى إدخال تاريخ ميلادك بالميلادي في الحاسبة أعلاه. ستقوم الأداة بحساب عدد السنوات والشهور والأيام المنقضية بدقة طبقاً للتقويم الشمسي الميلادي، ثم تحويل التاريخ تلقائياً إلى التقويم الهجري القمري (تقويم أم القرى) واستخراج عمرك الهجري المقابل.",
  },
  {
    question: "لماذا عمري بالهجري أكبر من عمري بالميلادي؟",
    answer:
      "السنة الهجرية هي سنة قمرية تتكون من 354 أو 355 يوماً تقريباً، بينما السنة الميلادية سنة شمسية تتكون من 365 أو 366 يوماً. هذا الفارق (حوالي 11 يوماً كل عام) يجعل السنوات الهجرية تمر بوتيرة أسرع، لذلك يزداد عمرك بالهجري بمقدار سنة كاملة تقريباً كل 33 سنة ميلادية.",
  },
  {
    question: "كم يبلغ الفرق الدقيق بين السنة الميلادية والسنة الهجرية؟",
    answer:
      "يبلغ متوسط طول السنة الشمسية الميلادية 365.2425 يوماً، بينما يبلغ متوسط السنة القمرية الهجرية 354.367 يوماً. الفارق السنوي الدقيق هو 10.875 يوماً (أي ما يقارب 11 يوماً سنوياً)، ولهذا السبب تتقدم المناسبات والمواسم الهجرية كشهر رمضان كل عام بمقدار 10 إلى 12 يوماً في التقويم الميلادي.",
  },
  {
    question: "كيف أعرف تاريخ ميلادي الهجري المقابل لميلادي؟",
    answer:
      "توفر حاسبتنا محولاً مدمجاً يعتمد على تقويم أم القرى الرسمي المعتمد في المملكة العربية السعودية. بمجرد اختيار يوم وشهر وسنة ميلادك، تظهر لك بطاقة 'تاريخ ميلادك الهجري الموافق' باليوم والشهر والسنة الهجرية دون الحاجة لأي عملية يدوية.",
  },
  {
    question: "هل تُحسب السنوات الكبيسة ضمن إجمالي الأيام في حاسبة العمر؟",
    answer:
      "نعم، تعتمد حاسبة العمر على الفرق الزمني الفعلي بين التواريخ الميلادية مع احتساب السنوات الكبيسة التي يبلغ عدد أيامها 366 يوماً بدقة كاملة، مما يضمن دقة عدد الأيام والأسابيع والساعات التي عشتها دون أي تقريب عشوائي.",
  },
];

export default function HijriAgeCalculatorPage() {
  return (
    <div className="py-8 sm:py-12" lang="ar" dir="rtl">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_ARABIC_DATA}
        pageTitle="حاسبة العمر بالهجري والميلادي – تقويم أم القرى"
        pageDescription="أداة مجانية لحساب العمر بدقة بالسنوات والأشهر والأيام بالتقويمين الهجري والميلادي مع تحويل تاريخ الميلاد وفق تقويم أم القرى."
        priceCurrency="SAR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation (RTL: ChevronLeft) */}
        <nav aria-label="مسار التنقل" className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <Link href="/ar" className="hover:text-neutral-900 transition">
            الأدوات العربية (AR)
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            حاسبة العمر بالهجري والميلادي
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>معتمدة على تقويم أم القرى الرسمي لعام 2026</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            حاسبة العمر بالهجري والميلادي
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            احسب عمرك بالتفصيل بالسنوات والشهور والأيام، واكتشف تاريخ ميلادك الهجري المقابل، 
            والعد التنازلي المتبقي على موعد عيد ميلادك القادم.
          </p>
        </header>

        <div className="mb-8">
          <AdSlot position="top" adSlot="banner-top-hijri-age-ar" />
        </div>

        {/* 2. THE CALCULATOR COMPONENT */}
        <section aria-label="أداة حساب العمر التفاعلية" className="mb-10">
          <Suspense fallback={<div className="h-96 rounded-3xl bg-neutral-100 animate-pulse" />}>
            <HijriAgeCalculator />
          </Suspense>
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-hijri-age-ar" />
        </div>

        {/* 4. HIGH-QUALITY NATIVE ARABIC SEO CONTENT */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1: Introduction */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-3">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                أهمية حساب العمر بالتقويمين الهجري والميلادي
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-4">
              في المملكة العربية السعودية ودول الخليج العربي والعديد من البلدان الإسلامية، 
              يُعد معرفة العمر بالتقويمين <strong>الهجري والميلادي</strong> أمراً حيوياً لإنجاز المعاملات 
              الحكومية والإدارية والتعليمية. تعتمد منصات مثل <em>نظام نور</em> التعليمي، و<em>أبشر</em>، 
              وهيئة <em>الأحوال المدنية</em>، وصناديق التقاعد على معايير محددة قد تشترط عمراً هجرياً دقيقاً 
              لتسجيل الطلاب في مرحلة رياض الأطفال والصف الأول الابتدائي، أو لتحديد سن التقاعد الرسمي وبلوغ السن القانوني.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-3">
              توفر هذه الحاسبة أداة مجانية وفائقة السرعة تحسب الفوارق الزمنية وتمنحك تحويلاً دقيقاً 
              لتاريخ ميلادك طبقاً لتقويم أم القرى، مما يُغنيك عن الجداول الورقية والعمليات الحسابية المعقدة.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <CalendarCheck2 className="h-4 w-4 text-emerald-600" />
                  التقديم في المدارس ونظام نور
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  تحديد السن النظامي للقبول في الصف الأول الابتدائي والروضة بدقة تامة.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Scale className="h-4 w-4 text-blue-600" />
                  المعاملات الرسمية والتقاعد
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  حساب فترات الخدمة ومواعيد بلوغ السن القانوني للتقاعد المدني والعسكري.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  المناسبات الشخصية والأعياد
                </span>
                <p className="mt-1 text-xs text-neutral-600">
                  العد التنازلي لمعرفة الأيام المتبقية على تاريخ ميلادك القادم.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: كيف تعمل حاسبة العمر */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-3">
              <ArrowRightLeft className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                كيف تعمل حاسبة العمر؟
              </h2>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              تقوم خوارزمية الأداة بمعالجة التاريخ في ثلاثة خطوات برمجية فورية:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white mb-3">
                  ١
                </div>
                <h3 className="text-sm font-bold text-neutral-900">إدخال تاريخ الميلاد</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  اختر يوم وشهر وسنة ميلادك من حقل التاريخ بالميلادي بكل سهولة.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white mb-3">
                  ٢
                </div>
                <h3 className="text-sm font-bold text-neutral-900">المعالجة الفلكية المزدوجة</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  تحسب الأداة الفرق بين تاريخ اليوم وتاريخ ميلادك بالدورة الشمسية والدورة القمرية.
                </p>
              </div>

              <div className="flex flex-col rounded-2xl border border-neutral-200/80 p-5 bg-neutral-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white mb-3">
                  ٣
                </div>
                <h3 className="text-sm font-bold text-neutral-900">عرض النتائج التفصيلية</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  تحصل على عمرك بالهجري والميلادي، وإجمالي الأيام، وتاريخ ميلادك الهجري وموعد ميلادك القادم.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: الفرق بين السنة الهجرية والسنة الميلادية */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
              الفرق بين السنة الهجرية والسنة الميلادية
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              يرجع الفارق بين التقويمين إلى حركة الأجرام السماوية المعتمدة في كل منهما:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="py-3.5 px-4 font-bold">وجه المقارنة</th>
                    <th className="py-3.5 px-4 font-bold text-emerald-700">التقويم الهجري (القمري)</th>
                    <th className="py-3.5 px-4 font-bold text-blue-700">التقويم الميلادي (الشمسي)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">أساس الحساب</td>
                    <td className="py-3.5 px-4">دوران القمر حول الأرض (دورة قمرية كاملة).</td>
                    <td className="py-3.5 px-4">دوران الأرض حول الشمس (دورة شمسية كاملة).</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">عدد أيام السنة</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">354 أو 355 يوماً</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600">365 أو 366 يوماً (كبيسة)</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">طول الشهر</td>
                    <td className="py-3.5 px-4">29 أو 30 يوماً طبقاً لرؤية الهلال.</td>
                    <td className="py-3.5 px-4">30 أو 31 يوماً (وشهر فبراير 28 أو 29 يوماً).</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">تأثيره على العمر</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-700">
                      يزداد العمر بعدد سنوات أكبر (سنة إضافية كل ~33 سنة ميلادية).
                    </td>
                    <td className="py-3.5 px-4">
                      المعيار الدولي الثابت المعتمد في معظم دول العالم.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-xl bg-neutral-50 p-4 border border-neutral-200/80 text-xs text-neutral-500">
              <strong>معلومة مفيدة:</strong> إذا كان عمرك الآن 33 عاماً بالتقويم الميلادي، فإن عمرك بالتقويم الهجري يبلغ حوالي 34 عاماً كاملة بسبب تراكم فارق الأيام الـ 11 سنوياً.
            </div>
          </section>

          {/* Section 3B: مثالان عمليان لحساب العمر */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
              أمثلة عملية توضح الفرق بين العمر الهجري والميلادي (2026)
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5">
                <h3 className="text-sm font-bold text-emerald-900 m-0">
                  المثال الأول: مواليد ١٥ مايو ١٩٩٨ (١٩ محرم ١٤١٩ هـ)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  في عام 2026 يبلغ العمر الميلادي لهذا الشخص حوالي <strong>28 سنة ميلادية</strong>، بينما يتجاوز عمره بالتقويم الهجري <strong>29 سنة هجرية</strong> أي بزيادة تقارب سنة كاملة نتيجة تراكم فارق ١١ يوماً في كل عام.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-5">
                <h3 className="text-sm font-bold text-blue-900 m-0">
                  المثال الثاني: حساب سن التقاعد أو القبول الجامعي (١ يناير ٢٠٠٠)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  لمواليد الألفية الجديدة (٢٤ رمضان ١٤٢٠ هـ)، تظهر الحاسبة في لحظة واحدة إجمالي الأيام التي عاشها الشخص (أكثر من 9,800 يوم) مع التوقيت الدقيق لتطابق الأوراق الرسمية السعودية والخليجية.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 space-y-3 text-sm text-neutral-600 leading-relaxed">
              <h3 className="text-base font-bold text-neutral-900 m-0">
                أهمية معرفة العمر بالتقويمين الهجري والميلادي في المعاملات الرسمية
              </h3>
              <p>
                تعتمد الكثير من الجهات الحكومية والأنظمة في المملكة العربية السعودية ودول الخليج العربي على العمر الدقيق عند التقديم على الوظائف الحكومية، حساب سنوات الخدمة والتقاعد، تحديد سن التسجيل في المدارس، واستخراج وثائق الأحوال المدنية أو تجديد رخص القيادة. ونظراً لأن تقويم أم القرى القمري يتقدم سنوياً بمعدل 11 يوماً مقارنة بالتقويم الميلادي الشمسي، فإن الفارق يصبح مؤثراً جداً عند بلوغ سن الثامنة عشرة أو الستين.
              </p>
              <p>
                تساعدك هذه الأداة على التحقق الفوري من عمرك الفعلي باليوم والشهر والسنة دون الوقوع في أخطاء التقدير التقريبي، مع إمكانية نسخ النتائج كاملة بنقرة واحدة لمشاركتها أو حفظها بأمان تام دون أي تسجيل.
              </p>
            </div>
          </section>

          {/* Section 4: الأسئلة الشائعة (FAQ) */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-6">
              <HelpCircle className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl m-0">
                الأسئلة الشائعة حول حساب العمر
              </h2>
            </div>

            <FaqAccordion faqs={FAQ_ARABIC_DATA} dir="rtl" accent="teal" />
          </section>
        </article>

        {/* Security & Reliability Callout */}
        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>خصوصية تامة وسرية لبياناتك</span>
          </div>
          <p className="text-emerald-700 max-w-xl mx-auto">
            تتم جميع الحسابات في المتصفح محلياً دون إرسال أو حفظ تواريخ ميلادك على أي خوادم خارجية.
          </p>
        </aside>

        <RelatedTools currentToolId="hijri-age-calculator" language="ar" />
      </div>
    </div>
  );
}
