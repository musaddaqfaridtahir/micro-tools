"use client";

import React, { useState, useId } from "react";
import {
  Percent,
  Copy,
  Check,
  RotateCcw,
  Tag,
  TrendingUp,
  Info,
} from "lucide-react";

type ArPctMode = "percent_of" | "discount" | "change";

const DISCOUNT_PILLS = [10, 15, 20, 30, 50];

const QUICK_PRESETS: Array<{
  label: string;
  mode: ArPctMode;
  a: string;
  b: string;
}> = [
  { label: "خصم 30% على 500 ريال", mode: "discount", a: "500", b: "30" },
  { label: "15% من مبلغ 2,000", mode: "percent_of", a: "15", b: "2000" },
  { label: "تغيّر من 1,000 إلى 1,250", mode: "change", a: "1000", b: "1250" },
  { label: "خصم 50% على 399 ريال", mode: "discount", a: "399", b: "50" },
];

export default function ArabicPercentageCalculator() {
  const inputAId = useId();
  const inputBId = useId();

  const [mode, setMode] = useState<ArPctMode>("discount");
  const [valAStr, setValAStr] = useState<string>("500");
  const [valBStr, setValBStr] = useState<string>("30");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseVal = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const numA = parseVal(valAStr);
  const numB = parseVal(valBStr);

  const fmt = (val: number) =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  let primaryTitle = "";
  let primaryDisplay = "";
  let primaryCopy = "";
  let secondaryTitle = "";
  let secondaryDisplay = "";
  let secondaryCopy = "";
  let formulaNote = "";

  if (mode === "discount") {
    const discPct = Math.max(0, numB);
    const saved = numA * (discPct / 100);
    const afterDiscount = numA - saved;
    primaryTitle = `السعر النهائي بعد خصم (${discPct}%)`;
    primaryDisplay = fmt(afterDiscount);
    primaryCopy = afterDiscount.toFixed(2);
    secondaryTitle = "مبلغ التوفير من الخصم";
    secondaryDisplay = fmt(saved);
    secondaryCopy = saved.toFixed(2);
    formulaNote = `${fmt(numA)} × (1 - ${discPct} ÷ 100) = ${fmt(afterDiscount)}`;
  } else if (mode === "percent_of") {
    const result = (numA / 100) * numB;
    primaryTitle = `قيمة ${numA}% من المبلغ ${fmt(numB)}`;
    primaryDisplay = fmt(result);
    primaryCopy = result.toFixed(2);
    secondaryTitle = "المتبقي بعد الطرح";
    secondaryDisplay = fmt(numB - result);
    secondaryCopy = (numB - result).toFixed(2);
    formulaNote = `(${fmt(numB)} × ${numA}) ÷ 100 = ${fmt(result)}`;
  } else {
    const diff = numB - numA;
    const pct = numA !== 0 ? (diff / numA) * 100 : 0;
    const typeLabel = diff >= 0 ? "نسبة الزيادة" : "نسبة النقصان";
    primaryTitle = typeLabel;
    primaryDisplay = `${diff > 0 ? "+" : ""}${pct.toFixed(2)}%`;
    primaryCopy = pct.toFixed(2);
    secondaryTitle = diff >= 0 ? "مقدار الزيادة الفعلي" : "مقدار النقصان الفعلي";
    secondaryDisplay = `${diff > 0 ? "+" : ""}${fmt(diff)}`;
    secondaryCopy = diff.toFixed(2);
    formulaNote =
      numA !== 0
        ? `((${fmt(numB)} - ${fmt(numA)}) ÷ ${fmt(numA)}) × 100 = ${pct.toFixed(2)}%`
        : "القيمة القديمة لا يمكن أن تساوي صفراً.";
  }

  const switchMode = (next: ArPctMode) => {
    setMode(next);
    if (next === "discount") {
      setValAStr("500");
      setValBStr("30");
    } else if (next === "percent_of") {
      setValAStr("15");
      setValBStr("2000");
    } else {
      setValAStr("1000");
      setValBStr("1250");
    }
  };

  const handleReset = () => {
    switchMode("discount");
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
      {/* Top Tabs & Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">
            اختر نوع الحساب المئوي
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5 rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("discount")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "discount"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              <span>نسبة الخصم والتوفير</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("percent_of")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "percent_of"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Percent className="h-3.5 w-3.5" />
              <span>حساب نسبة من مبلغ</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("change")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "change"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>نسبة الزيادة أو النقصان</span>
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

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-neutral-400">
          أمثلة سريعة:
        </span>
        {QUICK_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setMode(p.mode);
              setValAStr(p.a);
              setValBStr(p.b);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Inputs */}
        <div className="space-y-5 lg:col-span-6">
          <div>
            <label
              htmlFor={inputAId}
              className="block text-sm font-semibold text-neutral-800"
            >
              {mode === "discount"
                ? "السعر الأصلي قبل الخصم"
                : mode === "percent_of"
                ? "النسبة المئوية (%)"
                : "القيمة القديمة (الأساسية)"}
            </label>
            <input
              id={inputAId}
              type="text"
              inputMode="decimal"
              value={valAStr}
              onChange={(e) =>
                setValAStr(e.target.value.replace(/[^0-9.,\-\s]/g, ""))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div>
            <label
              htmlFor={inputBId}
              className="block text-sm font-semibold text-neutral-800"
            >
              {mode === "discount"
                ? "نسبة الخصم (%)"
                : mode === "percent_of"
                ? "المبلغ أو القيمة الكلية"
                : "القيمة الجديدة"}
            </label>
            <input
              id={inputBId}
              type="text"
              inputMode="decimal"
              value={valBStr}
              onChange={(e) =>
                setValBStr(e.target.value.replace(/[^0-9.,\-\s]/g, ""))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10"
            />

            {mode === "discount" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {DISCOUNT_PILLS.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setValBStr(String(pct))}
                    className={`rounded-xl border px-3.5 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                      parseVal(valBStr) === pct
                        ? "border-violet-600 bg-violet-50 text-violet-700"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-violet-300"
                    }`}
                  >
                    خصم {pct}%
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50 p-3.5 text-xs text-neutral-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
            <p className="font-mono" dir="ltr">
              {formulaNote}
            </p>
          </div>
        </div>

        {/* RTL Result Cards */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 sm:p-6 lg:col-span-6">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-500">
              <Percent className="h-3.5 w-3.5 text-violet-600" />
              النتيجة الفورية
            </span>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-violet-500/30 bg-white p-4 shadow-sm ring-1 ring-violet-500/10">
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    {primaryTitle}
                  </span>
                  <div translate="no" className="notranslate mt-0.5 text-3xl font-black text-violet-700">
                    {primaryDisplay}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(primaryCopy, "primary")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "primary" ? (
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

              <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4">
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    {secondaryTitle}
                  </span>
                  <div translate="no" className="notranslate mt-0.5 text-2xl font-extrabold text-emerald-700">
                    {secondaryDisplay}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(secondaryCopy, "secondary")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "secondary" ? (
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
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-600">
            الصيغة الحسابية: <span translate="no" className="notranslate font-mono font-semibold text-neutral-900" dir="ltr">{formulaNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
