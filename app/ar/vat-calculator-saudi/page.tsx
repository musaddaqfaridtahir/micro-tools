import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Landmark,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SaudiVatCalculator from "./SaudiVatCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("vat-calculator-saudi")!;

export const metadata: Metadata = {
  title: "حاسبة ضريبة القيمة المضافة 15% (السعودية والإمارات) – مجاناً",
  description:
    "احسب ضريبة القيمة المضافة 15% في السعودية أو 5% في الإمارات أونلاين: أضف الضريبة للمبلغ الصافي أو استخرج المبلغ قبل الضريبة وقيمة الضريبة من السعر الشامل بضغطة زر.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/ar/vat-calculator-saudi",
  },
  openGraph: {
    title: "حاسبة ضريبة القيمة المضافة 15% (السعودية والإمارات)",
    description:
      "أداة عربية دقيقة لحساب واستخراج ضريبة القيمة المضافة في السعودية (15%) والإمارات (5%) وفق ضوابط الفاتورة الإلكترونية.",
    url: "/ar/vat-calculator-saudi",
    type: "website",
    locale: "ar_SA",
    siteName: "MicroTools",
  },
};

const FAQ_SAUDI_VAT_DATA = [
  {
    question: "كيف أستخرج قيمة ضريبة القيمة المضافة 15% من مبلغ شامل الضريبة؟",
    answer:
      "لاستخراج المبلغ الأساسي قبل الضريبة من سعر شامل لضريبة 15% في السعودية، قسّم المبلغ الإجمالي على 1.15 (وليس ضربه في 0.15). على سبيل المثال: إذا كانت الفاتورة الشاملة 1,150 ريالاً، فإن المبلغ قبل الضريبة = 1,150 ÷ 1.15 = 1,000 ريال، وتكون قيمة الضريبة 150 ريالاً.",
  },
  {
    question: "كيف أحسب السعر شامل الضريبة انطلاقاً من المبلغ الصافي؟",
    answer:
      "لإضافة 15% ضريبة إلى مبلغ صافي، اضرب المبلغ الصافي في 0.15 لمعرفة مقدار الضريبة وحدها، أو اضربه مباشرة في 1.15 للحصول على السعر النهائي شامل الضريبة. وفي الإمارات (ضريبة 5%) اضرب المبلغ الصافي في 1.05.",
  },
  {
    question: "كم تبلغ نسبة ضريبة القيمة المضافة في السعودية والإمارات والبحرين لعام 2026؟",
    answer:
      "تبلغ النسبة الأساسية لضريبة القيمة المضافة في المملكة العربية السعودية 15% (تشرف عليها هيئة الزكاة والضريبة والجمارك ZATCA)، وفي الإمارات العربية المتحدة وسلطنة عُمان 5%، وفي مملكة البحرين 10%، مع وجود إعفاءات وتوريدات خاضعة لنسبة 0% مثل الصادرات وبعض الأدوية والمستلزمات الطبية المؤهلة.",
  },
  {
    question: "ما هو حد التسجيل الإلزامي في ضريبة القيمة المضافة في السعودية؟",
    answer:
      "وفق نظام ضريبة القيمة المضافة في المملكة العربية السعودية، يجب على المنشآت التي تتجاوز إيراداتها السنوية الخاضعة للضريبة 375,000 ريال سعودي التسجيل إلزامياً وإصدار فواتير ضريبية إلكترونية متوافقة مع منظومة (فاتورة)، بينما يكون التسجيل اختيارياً لمن تتجاوز إيراداتهم 187,500 ريال.",
  },
  {
    question: "هل يتم حفظ مبالغ فواتيري أو بياناتي التجارية في الموقع؟",
    answer:
      "إطلاقاً. تعمل حاسبة ضريبة القيمة المضافة بالكامل داخل متصفحك (Client-Side)، ولا يتم إرسال أي أرقام مالية أو بيانات تجارية إلى خوادمنا أو أي طرف ثالث.",
  },
];

export default function SaudiVatCalculatorPage() {
  return (
    <div className="py-8 sm:py-12" lang="ar" dir="rtl">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_SAUDI_VAT_DATA}
        pageTitle="حاسبة ضريبة القيمة المضافة 15% السعودية والإمارات"
        pageDescription="احسب ضريبة القيمة المضافة 15% في السعودية أو 5% في الإمارات واستخرج قيمة الضريبة والمبلغ الصافي من الإجمالي فوراً."
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
            حاسبة ضريبة القيمة المضافة 15%
          </span>
        </nav>

        <header className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 shadow-2xs">
            <Landmark className="h-3.5 w-3.5" />
            <span>متوافقة مع ضوابط الفوترة في السعودية والإمارات 2026</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            حاسبة ضريبة القيمة المضافة 15%
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-neutral-600">
            احسب قيمة <strong>ضريبة القيمة المضافة (VAT)</strong> بدقة متناهية في السعودية (15%) والإمارات (5%) سواء لإضافة الضريبة أو استخراج المبلغ قبل الضريبة من الفاتورة الشاملة.
          </p>
        </header>

        <div className="mb-8">
          <AdSlot position="top" adSlot="banner-top-vat-saudi-ar" />
        </div>

        <section aria-label="حاسبة ضريبة القيمة المضافة التفاعلية" className="mb-10">
          <SaudiVatCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-vat-saudi-ar" />
        </div>

        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          {/* Section 1 */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-emerald-700">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                أهمية حساب ضريبة القيمة المضافة بدقة للتجار والأفراد
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              تُعد <strong>ضريبة القيمة المضافة (Value Added Tax - VAT)</strong> ضريبة غير مباشرة تُفرض على غالبية السلع والخدمات المباعة والمشتراة في المملكة العربية السعودية (بنسبة قياسية <strong>15%</strong>) والإمارات العربية المتحدة وعُمان (بنسبة <strong>5%</strong>). ومن أكثر الأخطاء المحاسبية شيوعاً عند مراجعة الفواتير أو إعداد عروض الأسعار هو محاولة استخراج الضريبة بضرب المبلغ الشامل في 15% ثم طرحه؛ وهو خطأ رياضي ينتج عنه فارق واضح في الإقرار الضريبي المقدم إلى هيئة الزكاة والضريبة والجمارك (ZATCA) أو الهيئة الاتحادية للضرائب.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              صُممت هذه الحاسبة العربية لتمنح المحاسبين وأصحاب المتاجر الإلكترونية والمقاولين والمستهلكين أداة فورية موثوقة لاستخراج صافي المبلغ وقيمة الضريبة والإجمالي النهائي مع إمكانية النسخ السريع بنقرة واحدة لإدراجه مباشرة في نظام الفاتورة الإلكترونية أو عروض الأسعار.
            </p>
          </section>

          {/* Section 2: Formulas & GCC Comparison Table */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              طريقة الاستخدام والمعادلات الرياضية المعتمدة لعام 2026
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                <span className="text-xs font-bold text-emerald-900">
                  أولاً: إضافة الضريبة (من الصافي إلى الشامل)
                </span>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-3 font-mono text-xs text-neutral-900" dir="ltr">
                  VAT = Net Amount × 0.15
                  <br />
                  Total = Net Amount × 1.15
                </div>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
                <span className="text-xs font-bold text-blue-900">
                  ثانياً: استخراج الضريبة (من الإجمالي الشامل إلى الصافي)
                </span>
                <div className="mt-2 rounded-lg border border-blue-200 bg-white p-3 font-mono text-xs text-neutral-900" dir="ltr">
                  Net Amount = Total ÷ 1.15
                  <br />
                  VAT = Total - Net Amount
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-right text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700">
                    <th className="px-4 py-3.5 font-bold">الدولة / الفئة</th>
                    <th className="px-4 py-3.5 font-bold">نسبة الضريبة 2026</th>
                    <th className="px-4 py-3.5 font-bold">معامل الاستخراج من الشامل</th>
                    <th className="px-4 py-3.5 font-bold">الجهة الرقابية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/80 text-neutral-600">
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">المملكة العربية السعودية</td>
                    <td className="px-4 py-3.5 font-extrabold text-emerald-700">15%</td>
                    <td className="px-4 py-3.5 font-mono" dir="ltr">÷ 1.15</td>
                    <td className="px-4 py-3.5">هيئة الزكاة والضريبة والجمارك (ZATCA)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">الإمارات العربية المتحدة</td>
                    <td className="px-4 py-3.5 font-extrabold text-blue-700">5%</td>
                    <td className="px-4 py-3.5 font-mono" dir="ltr">÷ 1.05</td>
                    <td className="px-4 py-3.5">الهيئة الاتحادية للضرائب (FTA)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">مملكة البحرين</td>
                    <td className="px-4 py-3.5 font-extrabold text-indigo-700">10%</td>
                    <td className="px-4 py-3.5 font-mono" dir="ltr">÷ 1.10</td>
                    <td className="px-4 py-3.5">الجهاز الوطني للإيرادات (NBR)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-neutral-900">سلطنة عُمان</td>
                    <td className="px-4 py-3.5 font-extrabold text-teal-700">5%</td>
                    <td className="px-4 py-3.5 font-mono" dir="ltr">÷ 1.05</td>
                    <td className="px-4 py-3.5">جهاز الضرائب العُماني</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: 2 Real-World Worked Examples */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              <FileCheck2 className="h-5 w-5 text-emerald-600" />
              <span>مثالان عمليان لحساب واستخراج الضريبة</span>
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5">
                <h3 className="m-0 text-sm font-bold text-emerald-900">
                  المثال الأول: إضافة 15% إلى عقد خدمات بقيمة 10,000 ريال
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  عندما يقدم مكتب استشاري عرض سعر بقيمة صافية <strong>10,000 ريال سعودي</strong> قبل الضريبة، تُحسب الضريبة بـ <code>10,000 × 0.15 = 1,500 ريال</code>، ليصبح إجمالي الفاتورة المستحقة <strong>11,500 ريال سعودي</strong>.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-5">
                <h3 className="m-0 text-sm font-bold text-blue-900">
                  المثال الثاني: استخراج الصافي من فاتورة شاملة بقيمة 2,300 ريال
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700">
                  لتحرير القيد المحاسبي الصحيح لفاتورة مشتريات شاملة قيمتها <strong>2,300 ريال</strong> بنسبة 15%، نقسم <code>2,300 ÷ 1.15 = 2,000 ريال</code> (صافي المشتريات)، وتكون ضريبة المدخلات القابلة للاسترداد <strong>300 ريال سعودي</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 space-y-3 text-sm text-neutral-600 leading-relaxed">
              <h3 className="m-0 text-base font-bold text-neutral-900">
                دليل الفوترة الإلكترونية (فاتورة) وتصنيف السلع الخاضعة والمعفاة 2026
              </h3>
              <p>
                تشترط هيئة الزكاة والضريبة والجمارك (ZATCA) في المملكة العربية السعودية إظهار السعر الأساسي قبل الضريبة، ومبلغ ضريبة القيمة المضافة المحسوب بنسبة 15%، والإجمالي النهائي بوضوح على كل فاتورة ضريبية أو فاتورة ضريبية مبسطة صادرة إلكترونياً. أما في حالة التوريدات الصفرية (0%) مثل صادرات السلع خارج دول مجلس التعاون الخليجي والنقل الدولي والأدوية والمعدات الطبية المؤهلة، فتُحتسب الضريبة بصفر مع حق المنشأة في استرداد ضريبة المدخلات المرتبطة بها.
              </p>
              <p>
                في المقابل، تشمل السلع والخدمات المعفاة من الضريبة في السعودية والإمارات بعض الخدمات المالية غير القائمة على رسوم صريحة (مثل الهوامش والفوائد التمويلية) وتأجير العقارات السكنية في نظام الضريبة السعودي. ويُنصح دائماً بمراجعة الفاتورة قبل إصدارها للتأكد من تطابق المجاميع التقريبية لأقرب هللة أو فلس، خاصة عند تقديم الإقرارات الضريبية الدورية الشهرية أو الربع سنوية. كما تُمكّنك هذه الحاسبة من مطابقة ضريبة المخرجات المحصلة من العملاء مع ضريبة المدخلات المدفوعة للموردين لتحديد صافي الضريبة الواجب سدادها أو استردادها بدقة كاملة وسرعة فائقة دون أخطاء يدوية.
              </p>
            </div>
          </section>

          {/* Section 4: 5 FAQs */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2.5 text-emerald-700">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                الأسئلة الشائعة حول ضريبة القيمة المضافة 15%
              </h2>
            </div>

            <FaqAccordion faqs={FAQ_SAUDI_VAT_DATA} dir="rtl" accent="emerald" />
          </section>
        </article>

        <aside className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center text-xs text-emerald-900">
          <div className="mb-1 flex items-center justify-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>سرية تامة لبياناتك المحاسبية</span>
          </div>
          <p className="mx-auto max-w-xl text-emerald-700">
            <Sparkles className="ml-1 inline h-3.5 w-3.5" />
            جميع الحسابات الضريبية تُنفذ محلياً في متصفحك دون أي تخزين سحابي.
          </p>
        </aside>

        <RelatedTools currentToolId="vat-calculator-saudi" language="ar" />
      </div>
    </div>
  );
}
