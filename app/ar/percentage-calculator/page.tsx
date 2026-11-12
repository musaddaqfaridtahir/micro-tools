import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Percent,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ArabicPercentageCalculator from "./ArabicPercentageCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("percentage-calculator")!;

export const metadata: Metadata = {
  title: "حاسبة النسبة المئوية والخصم – حساب التوفير والتخفيضات أونلاين",
  description:
    "احسب النسبة المئوية من مبلغ، وسعر المنتج بعد الخصم ومبلغ التوفير في التسوق، بالإضافة إلى نسبة الزيادة أو النقصان بواجهة عربية سهلة ونسخ بضغطة واحدة.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/ar/percentage-calculator",
  },
  openGraph: {
    title: "حاسبة النسبة المئوية والخصم العربية – مجاناً",
    description:
      "أداة عربية شاملة لحساب الخصومات (10%، 20%، 30%، 50%)، واستخراج النسبة المئوية من أي رقم، ومعرفة نسبة التغير المئوي فوراً.",
    url: "/ar/percentage-calculator",
    type: "website",
    locale: "ar_SA",
    siteName: "MicroTools",
  },
};

const FAQ_AR_PCT = [
  {
    question: "كيف أحسب السعر بعد الخصم ومبلغ التوفير عند التسوق؟",
    answer:
      "لمعرفة قيمة التوفير: اضرب السعر الأصلي في نسبة الخصم واقسم على 100. ثم اطرح قيمة التوفير من السعر الأصلي للحصول على السعر النهائي. مثال: منتج سعره 500 ريال وعليه خصم 30%، التوفير = 150 ريالاً والسعر بعد الخصم = 350 ريالاً.",
  },
  {
    question: "كيف أستخرج نسبة مئوية محددة من مبلغ مالي؟",
    answer:
      "اضرب المبلغ الإجمالي في النسبة المطلوبة ثم اقسم الناتج على 100. مثال: لحساب 15% من مبلغ 2,000، تكون المعادلة (2,000 × 15) ÷ 100 = 300.",
  },
  {
    question: "كيف أحسب نسبة الزيادة أو النقصان بين قيمتين؟",
    answer:
      "اطرح القيمة القديمة من القيمة الجديدة، ثم اقسم الفارق على القيمة القديمة واضرب الناتج في 100. إذا كان الناتج موجباً فهي نسبة زيادة، وإذا كان سالباً فهي نسبة نقصان.",
  },
  {
    question: "ما الفرق بين خصم 50% وخصم 25% + 25% إضافية؟",
    answer:
      "الخصم المتتابع يطبق على السعر المخفّض لا على السعر الأصلي؛ فخصم 25% ثم 25% إضافية على منتج بـ 100 ريال يجعله 75 ريالاً أولاً ثم 56.25 ريالاً ثانياً (أي خصم إجمالي 43.75% فقط وليس 50%).",
  },
  {
    question: "هل هذه الحاسبة مجانية وهل تعمل على الجوال؟",
    answer:
      "نعم، الحاسبة مجانية 100% ومصممة بالكامل باللغة العربية (RTL) لتعمل بسلاسة على جميع الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر دون حفظ أي بيانات.",
  },
];

export default function ArabicPercentagePage() {
  return (
    <div className="py-8 sm:py-12" lang="ar" dir="rtl">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_AR_PCT}
        pageTitle="حاسبة النسبة المئوية والخصم العربية"
        pageDescription="احسب النسبة المئوية من مبلغ، ونسبة الخصم والتوفير في التسوق، ونسبة الزيادة أو النقصان في ثوانٍ."
        priceCurrency="SAR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
            حاسبة النسبة المئوية والخصم
          </span>
        </nav>

        <header className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 shadow-2xs">
            <Percent className="h-3.5 w-3.5" />
            <span>3 أوضاع شاملة: الخصومات، النسبة من مبلغ، ونسبة التغيّر</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            حاسبة النسبة المئوية والخصم
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            احسب فوراً <strong>السعر بعد الخصم ومبلغ التوفير</strong> أثناء التسوق، أو استخرج <strong>نسبة مئوية من أي مبلغ</strong>، أو احسب <strong>نسبة الزيادة والنقصان</strong> بدقة متناهية.
          </p>
        </header>

        <div className="mb-8">
          <AdSlot position="top" adSlot="banner-top-percentage-ar" />
        </div>

        <section aria-label="حاسبة النسبة المئوية والخصم التفاعلية" className="mb-10">
          <ArabicPercentageCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-percentage-ar" />
        </div>

        {/* 700+ Word Arabic SEO Guide */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-violet-700">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                أهمية حساب النسبة المئوية والخصومات في حياتنا اليومية والتجارية
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              تُعد <strong>النسبة المئوية (%)</strong> اللغة المشتركة لمقارنة الأسعار والعوائد والخصومات في المتاجر والأسواق المالية والعمل الإداري. سواء كنت تتسوق في مواسم التخفيضات مثل عروض اليوم الوطني والجمعة البيضاء، أو تحسب نسبة العمولة والمبيعات، أو تقارن بين راتبك القديم والجديد بعد الترقية، فإن وجود حاسبة دقيقة يوفر عليك الوقت ويمنع أخطاء الحساب الذهني.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              صُممت هذه الأداة العربية بالكامل وفق اتجاه اليمين إلى اليسار (<strong>RTL</strong>) لتغطي أهم ثلاث عمليات مئوية في مكان واحد: حساب السعر بعد الخصم مع عرض قيمة التوفير الحقيقية، استخراج نسبة معينة من أي مبلغ، وقياس نسبة الزيادة أو النقصان المئوية بين قيمتين.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              كما يستفيد التجار وأصحاب المتاجر الإلكترونية من الحاسبة عند تسعير المنتجات ووضع عروض التخفيضات الموسمية أو حساب هامش الربح المئوي ومقارنة المبيعات بين شهر وآخر. وبفضل المعادلة الواضحة أسفل حقول الإدخال وزر النسخ السريع للنتائج، يمكنك التحقق من أي فاتورة أو عرض سعر خلال ثوانٍ معدودة ودون أي اشتراك أو تحميل تطبيقات خارجية. وتساعد معرفة السعر النهائي ومقدار التوفير الحقيقي المستهلك على مقارنة العروض الترويجية المختلفة واتخاذ قرار شراء ذكي ومبني على أرقام دقيقة في كل مرة. كذلك تُستخدم النسبة المئوية بكثرة لدى الطلاب والمعلمين لحساب المعدلات الدراسية والدرجات النهائية، ولدى المستثمرين لقياس نسبة العائد السنوي أو التغير في أسعار الأسهم والعملات والمؤشرات الاقتصادية بدقة وموثوقية عالية على مدار العام.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              طريقة الاستخدام وجدول المعادلات المئوية المعتمدة
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pr-5 text-sm sm:text-base text-neutral-700">
              <li>اختر الوضع المناسب من الأعلى: <strong>نسبة الخصم والتوفير</strong>، أو <strong>نسبة من مبلغ</strong>، أو <strong>نسبة الزيادة أو النقصان</strong>.</li>
              <li>أدخل الأرقام في الخانتين المخصصتين أو جرّب أحد الأمثلة السريعة الجاهزة بنقرة واحدة.</li>
              <li>في وضع الخصومات، يمكنك الضغط مباشرة على أزرار الخصم الشائعة (10%، 15%، 20%، 30%، 50%).</li>
              <li>انسخ النتيجة النهائية أو قيمة التوفير بضغطة زر واحدة.</li>
            </ol>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-right text-sm">
                <thead className="bg-neutral-50 text-xs font-bold text-neutral-600">
                  <tr>
                    <th className="px-4 py-3">العملية المطلوبة</th>
                    <th className="px-4 py-3">المعادلة الرياضية</th>
                    <th className="px-4 py-3">مثال سريع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-violet-700">السعر بعد الخصم</td>
                    <td className="px-4 py-3 font-mono text-xs" dir="ltr">Price × (1 - Disc / 100)</td>
                    <td className="px-4 py-3 text-neutral-600">500 بعد خصم 30% = 350</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-emerald-700">قيمة التوفير من الخصم</td>
                    <td className="px-4 py-3 font-mono text-xs" dir="ltr">Price × (Disc / 100)</td>
                    <td className="px-4 py-3 text-neutral-600">30% من 500 = 150</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-800">نسبة مئوية من مبلغ</td>
                    <td className="px-4 py-3 font-mono text-xs" dir="ltr">(Total × Pct) ÷ 100</td>
                    <td className="px-4 py-3 text-neutral-600">15% من 2,000 = 300</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-800">نسبة الزيادة / النقصان</td>
                    <td className="px-4 py-3 font-mono text-xs" dir="ltr">((New - Old) ÷ Old) × 100</td>
                    <td className="px-4 py-3 text-neutral-600">من 1,000 إلى 1,250 = +25%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2 text-violet-700">
              <FileCheck2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                مثالان تطبيقيان خطوة بخطوة
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  المثال 1: حساب خصم التسوق (-30% على 500 ريال)
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  شاهدت ساعة أو جهازاً بسعر <strong>500 ريال</strong> وعليه تخفيض موسمي بنسبة <strong>30%</strong>:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pr-4">
                  <li>قيمة التوفير: 500 × 0.30 = <strong>150.00 ريالاً</strong></li>
                  <li>السعر النهائي للدفع: 500 − 150 = <strong>350.00 ريالاً</strong></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  المثال 2: حساب نسبة نمو المبيعات الشهرية
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  ارتفعت مبيعات متجر إلكتروني من <strong>1,000</strong> طلب في يناير إلى <strong>1,250</strong> طلباً في فبراير:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pr-4">
                  <li>مقدار الزيادة: 1,250 − 1,000 = <strong>+250 طلباً</strong></li>
                  <li>نسبة الزيادة: (250 ÷ 1,000) × 100 = <strong>+25%</strong></li>
                </ul>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-neutral-600">
              نصيحة إضافية عند مقارنة الخصومات: احرص دائماً على التحقق من السعر الأصلي قبل الخصم ومقارنة السعر الصافي النهائي بعد إضافة ضريبة القيمة المضافة، كما يمكنك استخدام هذه الأداة لحساب نسب العمولة العقارية أو هامش الربح التجاري أو خصومات الدفع الفوري بسهولة وسرعة في كل وقت ومن أي جهاز.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-violet-700">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                الأسئلة الشائعة حول النسبة المئوية
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_AR_PCT} dir="rtl" accent="violet" />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <strong className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                خصوصية كاملة وسرعة فائقة:
              </strong>
              تعمل حاسبة النسبة المئوية مباشرة داخل المتصفح دون تسجيل دخول ودون تخزين أي أرقام تدخلها.
            </div>
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
