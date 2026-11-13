"use client";

import React, { useState, useId } from "react";
import {
  Briefcase,
  Copy,
  Check,
  RotateCcw,
  Info,
  Scale,
} from "lucide-react";

type ContractType = "unlimited" | "fixed";
type TerminationReason = "contract_end" | "resignation" | "dismissal";
type DismissalSubType = "employer_termination" | "article_80";

const QUICK_PRESETS: Array<{
  label: string;
  contractType: ContractType;
  reason: TerminationReason;
  dismissalSub?: DismissalSubType;
  salary: string;
  years: string;
  months: string;
}> = [
  {
    label: "انتهاء عقد · 8 سنوات · 10,000 ريال",
    contractType: "fixed",
    reason: "contract_end",
    salary: "10000",
    years: "8",
    months: "0",
  },
  {
    label: "استقالة · 3 سنوات و6 أشهر · 8,000 ريال",
    contractType: "unlimited",
    reason: "resignation",
    salary: "8000",
    years: "3",
    months: "6",
  },
  {
    label: "استقالة · 7 سنوات · 12,000 ريال",
    contractType: "unlimited",
    reason: "resignation",
    salary: "12000",
    years: "7",
    months: "0",
  },
  {
    label: "استقالة · 11 سنة · 15,000 ريال",
    contractType: "unlimited",
    reason: "resignation",
    salary: "15000",
    years: "11",
    months: "0",
  },
];

export default function EndOfServiceCalculator() {
  const salaryId = useId();
  const yearsId = useId();
  const monthsId = useId();

  const [contractType, setContractType] = useState<ContractType>("unlimited");
  const [reason, setReason] = useState<TerminationReason>("contract_end");
  const [dismissalSub, setDismissalSub] = useState<DismissalSubType>(
    "employer_termination"
  );
  const [salaryStr, setSalaryStr] = useState<string>("10000");
  const [yearsStr, setYearsStr] = useState<string>("8");
  const [monthsStr, setMonthsStr] = useState<string>("0");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseVal = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const salary = Math.max(0, parseVal(salaryStr));
  const years = Math.max(0, Math.floor(parseVal(yearsStr)));
  const months = Math.min(11, Math.max(0, Math.floor(parseVal(monthsStr))));
  const totalYears = years + months / 12;

  // Article 84 Base Calculation:
  // First 5 years = 0.5 month salary per year
  // Above 5 years = 1.0 month salary per year
  const first5YearsDuration = Math.min(totalYears, 5);
  const after5YearsDuration = Math.max(0, totalYears - 5);

  const first5Amount = 0.5 * salary * first5YearsDuration;
  const after5Amount = 1.0 * salary * after5YearsDuration;
  const baseGratuity = first5Amount + after5Amount;

  // Eligibility Ratio (Article 84, 85, 80)
  let ratio = 1;
  let ratioLabel = "100% (كامل المكافأة - المادة 84)";

  if (reason === "contract_end") {
    ratio = 1;
    ratioLabel = "100% (كامل المكافأة - المادة 84)";
  } else if (reason === "dismissal") {
    if (dismissalSub === "article_80") {
      ratio = 0;
      ratioLabel = "0% (لا يستحق مكافأة - المادة 80)";
    } else {
      ratio = 1;
      ratioLabel = "100% (إنهاء من صاحب العمل - المادة 84)";
    }
  } else {
    // Resignation (Article 85)
    if (totalYears < 2) {
      ratio = 0;
      ratioLabel = "0% (الخدمة أقل من سنتين - المادة 85)";
    } else if (totalYears < 5) {
      ratio = 1 / 3;
      ratioLabel = "ثلث المكافأة 33.33% (من 2 إلى أقل من 5 سنوات)";
    } else if (totalYears < 10) {
      ratio = 2 / 3;
      ratioLabel = "ثلثا المكافأة 66.67% (من 5 إلى أقل من 10 سنوات)";
    } else {
      ratio = 1;
      ratioLabel = "100% كاملة (10 سنوات فأكثر - المادة 85)";
    }
  }

  const finalGratuity = baseGratuity * ratio;

  const fmtSar = (val: number) =>
    `${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ر.س`;

  const handleReset = () => {
    setContractType("unlimited");
    setReason("contract_end");
    setDismissalSub("employer_termination");
    setSalaryStr("10000");
    setYearsStr("8");
    setMonthsStr("0");
    setCopiedKey(null);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      dir="rtl"
      lang="ar"
      className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8"
    >
      {/* Top Bar: Contract Type & Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            نوع عقد العمل
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setContractType("unlimited")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                contractType === "unlimited"
                  ? "bg-white text-amber-800 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              غير محدد المدة
            </button>
            <button
              type="button"
              onClick={() => setContractType("fixed")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                contractType === "fixed"
                  ? "bg-white text-amber-800 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              محدد المدة
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>إعادة تعيين</span>
        </button>
      </div>

      {/* Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-neutral-400">
          أمثلة سريعة:
        </span>
        {QUICK_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setContractType(p.contractType);
              setReason(p.reason);
              if (p.dismissalSub) setDismissalSub(p.dismissalSub);
              setSalaryStr(p.salary);
              setYearsStr(p.years);
              setMonthsStr(p.months);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Inputs */}
        <div className="space-y-5 lg:col-span-6">
          {/* Reason for Termination */}
          <div>
            <span className="block text-sm font-semibold text-neutral-800">
              سبب انتهاء العلاقة العمالية
            </span>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { id: "contract_end" as const, label: "انتهاء العقد" },
                { id: "resignation" as const, label: "استقالة الموظف" },
                { id: "dismissal" as const, label: "فصل من العمل" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setReason(item.id)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition cursor-pointer ${
                    reason === item.id
                      ? "border-amber-600 bg-amber-50 text-amber-800 ring-2 ring-amber-500/20"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {reason === "dismissal" && (
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setDismissalSub("employer_termination")}
                  className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                    dismissalSub === "employer_termination"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-neutral-200 bg-white text-neutral-600"
                  }`}
                >
                  إنهاء من صاحب العمل (مكافأة كاملة - م 84)
                </button>
                <button
                  type="button"
                  onClick={() => setDismissalSub("article_80")}
                  className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                    dismissalSub === "article_80"
                      ? "border-rose-600 bg-rose-50 text-rose-800"
                      : "border-neutral-200 bg-white text-neutral-600"
                  }`}
                >
                  فصل تأديبي بموجب المادة 80 (0%)
                </button>
              </div>
            )}
          </div>

          {/* Salary */}
          <div>
            <label
              htmlFor={salaryId}
              className="block text-sm font-semibold text-neutral-800"
            >
              الراتب الإجمالي الأخير (الأساسي + البدلات الثابتة بالريال)
            </label>
            <input
              id={salaryId}
              type="text"
              inputMode="decimal"
              value={salaryStr}
              onChange={(e) =>
                setSalaryStr(e.target.value.replace(/[^0-9.,\s]/g, ""))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          {/* Years & Months */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={yearsId}
                className="block text-sm font-semibold text-neutral-800"
              >
                سنوات الخدمة
              </label>
              <input
                id={yearsId}
                type="text"
                inputMode="numeric"
                value={yearsStr}
                onChange={(e) =>
                  setYearsStr(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10"
              />
            </div>
            <div>
              <label
                htmlFor={monthsId}
                className="block text-sm font-semibold text-neutral-800"
              >
                الأشهر (0 - 11)
              </label>
              <input
                id={monthsId}
                type="text"
                inputMode="numeric"
                value={monthsStr}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^0-9]/g, "");
                  setMonthsStr(clean);
                }}
                className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10"
              />
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50 p-3.5 text-xs text-neutral-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p>
              مدة الخدمة المحتسبة: <strong>{years} سنة</strong> و{" "}
              <strong>{months} شهر</strong> ({totalYears.toFixed(2)} سنة).
              {contractType === "fixed" && reason === "resignation" && (
                <span className="mt-1 block text-amber-800">
                  ملاحظة: في العقود محددة المدة قد تطبق أحكام المادة 77 عند الفسخ المبكر دون سبب مشروع، وتظهر هنا نسبة الاستقالة وفق المادة 85.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Output Cards */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 sm:p-6 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-500">
                <Scale className="h-3.5 w-3.5 text-amber-600" />
                تصفية مستحقات نهاية الخدمة
              </span>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                المادة 84 و 85
              </span>
            </div>

            {/* Final Gratuity Card */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-amber-500/40 bg-white p-4 shadow-sm ring-1 ring-amber-500/10">
              <div>
                <span className="text-xs font-semibold text-neutral-500">
                  مكافأة نهاية الخدمة المستحقة
                </span>
                <div translate="no" className="notranslate mt-0.5 text-3xl font-black text-amber-700">
                  {fmtSar(finalGratuity)}
                </div>
                <span className="mt-1 inline-block text-[11px] font-semibold text-neutral-600">
                  نسبة الاستحقاق: {ratioLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(finalGratuity.toFixed(2), "final")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
              >
                {copiedKey === "final" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>

            {/* Breakdown Cards */}
            <div className="mt-3.5 space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs">
                <span className="font-semibold text-neutral-600">
                  أول 5 سنوات (نصف راتب × {first5YearsDuration.toFixed(2)} سنة)
                </span>
                <span translate="no" className="notranslate font-bold text-neutral-900">
                  {fmtSar(first5Amount)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs">
                <span className="font-semibold text-neutral-600">
                  ما زاد عن 5 سنوات (راتب كامل × {after5YearsDuration.toFixed(2)} سنة)
                </span>
                <span translate="no" className="notranslate font-bold text-neutral-900">
                  {fmtSar(after5Amount)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs">
                <span className="font-semibold text-neutral-600">
                  إجمالي المكافأة الكاملة (100% وفق المادة 84)
                </span>
                <span translate="no" className="notranslate font-bold text-emerald-700">
                  {fmtSar(baseGratuity)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-600">
            <Briefcase className="h-4 w-4 shrink-0 text-amber-600" />
            <span>
              يُحسب على أساس <strong>الراتب الفعلي الأخير</strong> (الأساسي + البدلات الثابتة).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
