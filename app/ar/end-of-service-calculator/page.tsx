import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Briefcase,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import EndOfServiceCalculator from "./EndOfServiceCalculator";
import AdSlot from "@/components/AdSlot";
import SeoSchema from "@/components/SeoSchema";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getToolById } from "@/lib/tools-registry";

const TOOL = getToolById("end-of-service-calculator")!;

export const metadata: Metadata = {
  title: "حاسبة مكافأة نهاية الخدمة (نظام العمل السعودي – المادة 84 و 85)",
  description:
    "احسب مكافأة نهاية الخدمة بدقة وفق نظام العمل السعودي (المادة 84 و85): نصف راتب لأول 5 سنوات وراتب كامل بعدها مع تطبيق نسب الاستقالة (الثلث والثلثان وكاملة).",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/ar/end-of-service-calculator",
  },
  openGraph: {
    title: "حاسبة مكافأة نهاية الخدمة السعودية – المادة 84 و 85",
    description:
      "احسب مستحقات نهاية الخدمة في السعودية فوراً حسب نوع العقد، سبب انتهاء الخدمة، الراتب الأخير، والسنوات والأشهر.",
    url: "/ar/end-of-service-calculator",
    type: "website",
    locale: "ar_SA",
    siteName: "MicroTools",
  },
};

const FAQ_EOS = [
  {
    question: "كيف تُحسب مكافأة نهاية الخدمة وفق المادة 84 من نظام العمل السعودي؟",
    answer:
      "تنص المادة 84 على استحقاق العامل أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تليها، على أن يُتخذ الأجر الأخير أساساً لحساب المكافأة ويُحسب الجزء من السنة بنسبة ما قضاه العامل في العمل.",
  },
  {
    question: "ما هي نسبة استحقاق الموظف في حالة الاستقالة (المادة 85)؟",
    answer:
      "وفق المادة 85: إذا كانت مدة الخدمة أقل من سنتين لا يستحق العامل مكافأة. ومن سنتين إلى أقل من 5 سنوات يستحق ثلث (1/3) المكافأة. ومن 5 سنوات إلى أقل من 10 سنوات يستحق ثلثي (2/3) المكافأة. وإذا بلغت الخدمة 10 سنوات فأكثر يستحق المكافأة كاملة (100%).",
  },
  {
    question: "هل يُحسب الراتب الأساسي فقط أم الراتب الإجمالي؟",
    answer:
      "يُحسب أجر مكافأة نهاية الخدمة على أساس الأجر الفعلي الأخير الذي يتقاضاه الموظف، والذي يشمل الراتب الأساسي مضافاً إليه البدلات الثابتة مثل بدل السكن وبدل النقل (ما لم يتفق الطرفان على استثناء العمولات المتغيرة غير المضمونة وفق المادة 86).",
  },
  {
    question: "متى يُحرم العامل من مكافأة نهاية الخدمة؟",
    answer:
      "في حالتين رئيسيتين: إذا استقال قبل إكمال سنتين متتاليتين في الخدمة، أو إذا تم فصله من العمل لأحد الأسباب التأديبية الخطيرة المنصوص عليها حصراً في المادة 80 من نظام العمل السعودي.",
  },
  {
    question: "هل تُخزن هذه الحاسبة بيانات راتبي أو مدة خدمتي؟",
    answer:
      "لا إطلاقاً. تجري جميع الحسابات محلياً داخل متصفحك دون إرسال أي أرقام أو بيانات وظيفية إلى أي خادم خارجي.",
  },
];

export default function EndOfServicePage() {
  return (
    <div className="pt-3 pb-8 sm:py-10" lang="ar" dir="rtl">
      <SeoSchema
        tool={TOOL}
        faqs={FAQ_EOS}
        pageTitle="حاسبة مكافأة نهاية الخدمة نظام العمل السعودي"
        pageDescription="احسب مكافأة نهاية الخدمة في السعودية وفق المادتين 84 و85 وحالات الاستقالة وانتهاء العقد والفصل."
        priceCurrency="SAR"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="مسار التنقل" className="mb-3 sm:mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <Link href="/ar" className="hover:text-neutral-900 transition">
            الأدوات العربية (<span translate="no" className="notranslate font-bold">AR</span>)
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="font-semibold text-neutral-900" aria-current="page">
            حاسبة مكافأة نهاية الخدمة
          </span>
        </nav>

        <header className="mb-4 sm:mb-6 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-800 shadow-2xs">
            <Briefcase className="h-3.5 w-3.5" />
            <span>متوافقة مع المادتين 84 و 85 من نظام العمل السعودي 2026</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            حاسبة مكافأة نهاية الخدمة
          </h1>
          <p className="mx-auto mt-1.5 sm:mt-3 max-w-2xl text-xs sm:text-base text-neutral-600 line-clamp-2 sm:line-clamp-none">
            احسب <strong>مستحقات نهاية الخدمة</strong> بدقة وفق نظام العمل السعودي بناءً على نوع العقد، سبب ترك العمل (انتهاء عقد، استقالة، فصل)، الراتب الأخير، وسنوات وأشهر الخدمة.
          </p>
        </header>

        <div className="mb-4 sm:mb-8">
          <AdSlot position="top" adSlot="banner-top-eos-ar" />
        </div>

        <section aria-label="حاسبة مكافأة نهاية الخدمة التفاعلية" className="mb-6 sm:mb-10">
          <EndOfServiceCalculator />
        </section>

        <div className="my-10">
          <AdSlot position="in-content" adSlot="content-banner-eos-ar" />
        </div>

        {/* 700+ Word Arabic SEO Guide */}
        <article className="prose prose-neutral max-w-none space-y-12 text-neutral-800">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-3 flex items-center gap-2.5 text-amber-700">
              <BookOpen className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                دليل حساب مكافأة نهاية الخدمة في نظام العمل السعودي
              </h2>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              تُعد <strong>مكافأة نهاية الخدمة</strong> حقاً مالياً أصيلاً كفله <strong>نظام العمل السعودي</strong> للموظف عند انتهاء علاقته التعاقدية مع المنشأة. ويعتمد احتساب هذه المكافأة على ضوابط واضحة حددتها وزارة الموارد البشرية والتنمية الاجتماعية في المادتين 84 و85؛ حيث يُمنح الموظف أجراً تصاعدياً يعكس سنوات عطائه واستقراره الوظيفي لدى صاحب العمل.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              تتيح لك حاسبتنا العربية تقدير المبلغ المستحق فوراً دون الحاجة إلى معادلات يدوية معقدة، مع تفصيل قيمة المكافأة عن السنوات الخمس الأولى وما يليها، وتطبيق نسب التخفيض الخاصة بالاستقالة (ثلث أو ثلثا المكافأة أو كاملة) وحساب كسور السنة بدقة حتى آخر شهر.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-600">
              كما يُنصح دائماً بمراجعة بنود عقد العمل الموثق في منصة قوى (Qiwa) والتأكد من مكونات الأجر الإجمالي المسجل في التأمينات الاجتماعية، إذ يدخل الراتب الأساسي وبدلات السكن والمواصلات الثابتة في وعاء حساب المكافأة، بينما تستبعد البدلات العارضة أو المكافآت التشجيعية غير المنتظمة ما لم ينص العقد أو اللائحة الداخلية للمنشأة على احتسابها. وتساعدك هذه الأداة على التحقق السريع من تصفية حقوقك النهائية قبل التوقيع على مخالصة نهاية الخدمة، كما توضح الفرق المالي الدقيق بين الاستقالة وانتهاء مدة العقد المحددة نظامياً وفق لوائح العمل السارية في المملكة.
            </p>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              القواعد النظامية وجدول نسب الاستحقاق (المادة 84 و 85)
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pr-5 text-sm sm:text-base text-neutral-700">
              <li>اختر نوع العقد (<strong>غير محدد المدة</strong> أو <strong>محدد المدة</strong>).</li>
              <li>حدد سبب انتهاء العلاقة العمالية: <strong>انتهاء العقد</strong> أو <strong>استقالة الموظف</strong> أو <strong>فصل من العمل</strong>.</li>
              <li>أدخل <strong>الراتب الأخير الإجمالي</strong> (الأساسي + البدلات الثابتة) بالريال السعودي.</li>
              <li>أدخل مدة الخدمة بالسنوات والأشهر لتظهر تفاصيل المكافأة فوراً مع زر النسخ.</li>
            </ol>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
              <span className="text-xs font-bold text-amber-900">
                القاعدة الأساسية للمكافأة (المادة 84):
              </span>
              <p className="mt-2 text-xs sm:text-sm font-bold text-neutral-900">
                أول 5 سنوات = (الراتب الأخير × 0.5 × سنوات الخدمة في هذه الشريحة)<br />
                أكثر من 5 سنوات = (الراتب الأخير × 1.0 × السنوات الإضافية بعد الخامسة)
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-right text-sm">
                <thead className="bg-neutral-50 text-xs font-bold text-neutral-600">
                  <tr>
                    <th className="px-4 py-3">حالة انتهاء الخدمة</th>
                    <th className="px-4 py-3">مدة الخدمة</th>
                    <th className="px-4 py-3">النسبة المستحقة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-emerald-700">انتهاء مدة العقد أو إنهاء من صاحب العمل (م 84)</td>
                    <td className="px-4 py-3">أي مدة خدمة</td>
                    <td className="px-4 py-3 font-bold">100% كاملة</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-800">استقالة الموظف (م 85)</td>
                    <td className="px-4 py-3">أقل من سنتين</td>
                    <td className="px-4 py-3 text-rose-700 font-bold">0% (لا يستحق)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-800">استقالة الموظف (م 85)</td>
                    <td className="px-4 py-3">من سنتين إلى أقل من 5 سنوات</td>
                    <td className="px-4 py-3 font-bold text-amber-700">ثلث المكافأة (1/3)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-neutral-800">استقالة الموظف (م 85)</td>
                    <td className="px-4 py-3">من 5 سنوات إلى أقل من 10 سنوات</td>
                    <td className="px-4 py-3 font-bold text-amber-700">ثلثا المكافأة (2/3)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-emerald-700">استقالة الموظف (م 85)</td>
                    <td className="px-4 py-3">10 سنوات فأكثر</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">100% كاملة</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-4 flex items-center gap-2 text-amber-700">
              <FileCheck2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                مثالان عمليان لحساب مكافأة نهاية الخدمة
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  المثال 1: انتهاء عقد بعد 8 سنوات براتب 10,000 ريال
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  انتهى عقد موظف أكمل <strong>8 سنوات</strong> كاملة وكان راتبه الإجمالي الأخير <strong>10,000 ريال سعودي</strong>:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pr-4">
                  <li>أول 5 سنوات (5 × 5,000): <strong>25,000 ريال</strong></li>
                  <li>الـ 3 سنوات التالية (3 × 10,000): <strong>30,000 ريال</strong></li>
                  <li>المكافأة الكاملة المستحقة (100%): <strong>55,000 ريال سعودي</strong></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
                <h3 className="mt-0 text-base font-bold text-neutral-900">
                  المثال 2: استقالة بعد 3 سنوات و 6 أشهر براتب 8,000 ريال
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  استقال موظف بعد <strong>3.5 سنوات</strong> خدمة براتب <strong>8,000 ريال</strong> (تُطبق قاعدة ثلث المكافأة):
                </p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700 list-disc pr-4">
                  <li>المكافأة الأساسية (3.5 × 4,000): <strong>14,000 ريال</strong></li>
                  <li>نسبة الاستحقاق (1/3 وفق المادة 85): <strong>33.33%</strong></li>
                  <li>صافي المكافأة المستحقة: <strong>4,666.67 ريال سعودي</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="mb-6 flex items-center gap-2 text-amber-700">
              <HelpCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                الأسئلة الشائعة حول مكافأة نهاية الخدمة
              </h2>
            </div>
            <FaqAccordion faqs={FAQ_EOS} dir="rtl" accent="amber" />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <strong className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                حساب فوري وآمن 100%:
              </strong>
              تعمل الحاسبة بالكامل داخل متصفحك لخصوصية تامة، وتُعد النتائج استرشادية لمساعدتك على تقدير مستحقاتك وفق نصوص النظام.
            </div>
          </section>
        </article>

        <RelatedTools currentToolId={TOOL.id} language={TOOL.language} />
      </div>
    </div>
  );
}
