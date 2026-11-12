"use client";

import React, { useState, useId } from "react";
import {
  Landmark,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Percent,
  Info,
} from "lucide-react";

type VatCalcMode = "add_vat" | "extract_vat";

const GCC_RATES = [
  { value: 15, label: "15%", desc: "السعودية (المعدل الأساسي)" },
  { value: 5, label: "5%", desc: "الإمارات وعُمان" },
  { value: 10, label: "10%", desc: "البحرين" },
];

const QUICK_PRESETS: Array<{
  label: string;
  mode: VatCalcMode;
  amount: string;
  rate: number;
}> = [
  { label: "1,000 ريال قبل الضريبة (15%)", mode: "add_vat", amount: "1000", rate: 15 },
  { label: "1,150 ريال شامل الضريبة (15%)", mode: "extract_vat", amount: "1150", rate: 15 },
  { label: "10,000 ريال خدمة (15%)", mode: "add_vat", amount: "10000", rate: 15 },
  { label: "5,000 درهم الإمارات (5%)", mode: "add_vat", amount: "5000", rate: 5 },
];

export default function SaudiVatCalculator() {
  const amountId = useId();
  const customRateId = useId();

  const [mode, setMode] = useState<VatCalcMode>("add_vat");
  const [amountStr, setAmountStr] = useState<string>("1000");
  const [selectedRate, setSelectedRate] = useState<number | "custom">(15);
  const [customRateStr, setCustomRateStr] = useState<string>("15");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseVal = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const rateVal =
    selectedRate === "custom" ? Math.max(0, parseVal(customRateStr)) : selectedRate;
  const inputVal = Math.max(0, parseVal(amountStr));
  const rateFactor = rateVal / 100;

  let netAmount = 0;
  let vatAmount = 0;
  let grossAmount = 0;

  if (mode === "add_vat") {
    netAmount = inputVal;
    vatAmount = netAmount * rateFactor;
    grossAmount = netAmount + vatAmount;
  } else {
    grossAmount = inputVal;
    netAmount = grossAmount / (1 + rateFactor);
    vatAmount = grossAmount - netAmount;
  }

  const fmtNumber = (val: number) =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleReset = () => {
    setMode("add_vat");
    setAmountStr("1000");
    setSelectedRate(15);
    setCustomRateStr("15");
    setCopiedKey(null);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore fallback
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
      {/* Top Controls */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            نوع العملية الضريبية
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("add_vat")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "add_vat"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>إضافة الضريبة (إلى المبلغ الصافي)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("extract_vat")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "extract_vat"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>استخراج الضريبة (من المبلغ الشامل)</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>إعادة تعيين</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-neutral-500">
          أمثلة جاهزة:
        </span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setMode(preset.mode);
              setAmountStr(preset.amount);
              setSelectedRate(preset.rate);
            }}
            className="rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-1 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Form */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-5">
          <label
            htmlFor={amountId}
            className="block text-xs font-bold text-neutral-700"
          >
            {mode === "add_vat"
              ? "أدخل المبلغ قبل الضريبة (الصافي)"
              : "أدخل المبلغ الإجمالي شامل الضريبة"}
          </label>
          <div className="relative rounded-2xl shadow-xs">
            <input
              id={amountId}
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="مثال: 1000"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 px-4 text-lg font-bold text-neutral-900 text-right focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition"
            />
          </div>
          <p className="flex items-center gap-1 text-[11px] text-neutral-500">
            <Info className="h-3 w-3 text-neutral-400" />
            يتم الحساب تلقائياً فور إدخال المبلغ دون تحديث الصفحة.
          </p>
        </div>

        {/* Rate Selector */}
        <div className="space-y-2 lg:col-span-7">
          <span className="block text-xs font-bold text-neutral-700">
            نسبة ضريبة القيمة المضافة المطبقة
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {GCC_RATES.map((rate) => {
              const active = selectedRate === rate.value;
              return (
                <button
                  key={rate.value}
                  type="button"
                  onClick={() => setSelectedRate(rate.value)}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition cursor-pointer ${
                    active
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                      : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  <span className="text-base font-extrabold">{rate.label}</span>
                  <span
                    className={`mt-0.5 text-[10px] ${
                      active ? "text-emerald-100" : "text-neutral-500"
                    }`}
                  >
                    {rate.desc}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setSelectedRate("custom")}
              className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition cursor-pointer ${
                selectedRate === "custom"
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-md"
                  : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              <Percent className="h-4 w-4" />
              <span className="mt-1 text-[10px] font-bold">نسبة مخصصة</span>
            </button>
          </div>

          {selectedRate === "custom" && (
            <div className="mt-2 flex items-center gap-3">
              <label htmlFor={customRateId} className="text-xs font-semibold text-neutral-700">
                أدخل النسبة (%):
              </label>
              <input
                id={customRateId}
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={customRateStr}
                onChange={(e) => setCustomRateStr(e.target.value)}
                className="w-28 rounded-xl border border-emerald-300 bg-white px-3 py-1.5 text-sm font-bold text-neutral-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Dark Panel */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        <div className="flex flex-col gap-3 border-b border-neutral-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-neutral-300">
              ملخص الحساب الضريبي (بنسبة {rateVal}%)
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              copyToClipboard(
                `المبلغ قبل الضريبة: ${fmtNumber(netAmount)}\nقيمة الضريبة (${rateVal}%): ${fmtNumber(
                  vatAmount
                )}\nالإجمالي شامل الضريبة: ${fmtNumber(grossAmount)}`,
                "summary"
              )
            }
            className="inline-flex items-center gap-1.5 self-start rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 sm:self-auto cursor-pointer"
          >
            {copiedKey === "summary" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ النتيجة بالكامل</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 divide-y divide-neutral-800 md:grid-cols-3 md:divide-x md:divide-x-reverse md:divide-y-0">
          <div className="p-6 text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">
                المبلغ قبل الضريبة (الصافي)
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(netAmount.toFixed(2), "net")}
                className="text-neutral-400 hover:text-white cursor-pointer"
                aria-label="نسخ المبلغ قبل الضريبة"
              >
                {copiedKey === "net" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-white">
              {fmtNumber(netAmount)}
            </div>
          </div>

          <div className="p-6 text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-300">
                قيمة الضريبة ({rateVal}%)
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(vatAmount.toFixed(2), "vat")}
                className="text-neutral-400 hover:text-white cursor-pointer"
                aria-label="نسخ قيمة الضريبة"
              >
                {copiedKey === "vat" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-400">
              {fmtNumber(vatAmount)}
            </div>
          </div>

          <div className="bg-emerald-950/35 p-6 text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300">
                الإجمالي شامل الضريبة
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(grossAmount.toFixed(2), "gross")}
                className="text-neutral-400 hover:text-white cursor-pointer"
                aria-label="نسخ الإجمالي شامل الضريبة"
              >
                {copiedKey === "gross" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400">
              {fmtNumber(grossAmount)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
