"use client";

import React, { useState, useId } from "react";
import {
  RotateCcw,
  Copy,
  Check,
  TrendingDown,
  Building,
  User,
  ShieldCheck,
  Coins,
} from "lucide-react";

type TaxCategory = "salaried" | "business";
type PeriodMode = "monthly" | "annual";

interface SlabTier {
  min: number;
  max: number | null;
  baseTax: number;
  rate: number;
  label: string;
}

// 2025-2026 FBR Tax Slabs (Finance Act)
const SALARIED_SLABS: SlabTier[] = [
  { min: 0, max: 600000, baseTax: 0, rate: 0, label: "Up to Rs. 600,000 (Tax Free)" },
  { min: 600000, max: 1200000, baseTax: 0, rate: 0.05, label: "Rs. 600,001 to Rs. 1,200,000 (5%)" },
  { min: 1200000, max: 2200000, baseTax: 30000, rate: 0.15, label: "Rs. 1,200,001 to Rs. 2,200,000 (Rs. 30k + 15%)" },
  { min: 2200000, max: 3200000, baseTax: 180000, rate: 0.25, label: "Rs. 2,200,001 to Rs. 3,200,000 (Rs. 180k + 25%)" },
  { min: 3200000, max: 4100000, baseTax: 430000, rate: 0.30, label: "Rs. 3,200,001 to Rs. 4,100,000 (Rs. 430k + 30%)" },
  { min: 4100000, max: null, baseTax: 700000, rate: 0.35, label: "Above Rs. 4,100,000 (Rs. 700k + 35%)" },
];

const BUSINESS_SLABS: SlabTier[] = [
  { min: 0, max: 600000, baseTax: 0, rate: 0, label: "Up to Rs. 600,000 (Tax Free)" },
  { min: 600000, max: 1200000, baseTax: 0, rate: 0.15, label: "Rs. 600,001 to Rs. 1,200,000 (15%)" },
  { min: 1200000, max: 1600000, baseTax: 90000, rate: 0.20, label: "Rs. 1,200,001 to Rs. 1,600,000 (Rs. 90k + 20%)" },
  { min: 1600000, max: 3200000, baseTax: 170000, rate: 0.30, label: "Rs. 1,600,001 to Rs. 3,200,000 (Rs. 170k + 30%)" },
  { min: 3200000, max: 5600000, baseTax: 650000, rate: 0.40, label: "Rs. 3,200,001 to Rs. 5,600,000 (Rs. 650k + 40%)" },
  { min: 5600000, max: null, baseTax: 1610000, rate: 0.45, label: "Above Rs. 5,600,000 (Rs. 1.61M + 45%)" },
];

function calculateTax(annualGross: number, category: TaxCategory) {
  const slabs = category === "salaried" ? SALARIED_SLABS : BUSINESS_SLABS;
  if (annualGross <= 0) {
    return {
      annualTax: 0,
      marginalRate: 0,
      appliedSlabIndex: 0,
      slabs,
    };
  }

  let annualTax = 0;
  let marginalRate = 0;
  let appliedSlabIndex = 0;

  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i];
    if (annualGross > slab.min) {
      appliedSlabIndex = i;
      marginalRate = slab.rate * 100;
      const taxableInSlab = slab.max ? Math.min(annualGross, slab.max) - slab.min : annualGross - slab.min;
      annualTax = slab.baseTax + taxableInSlab * slab.rate;
    }
  }

  return {
    annualTax: Math.round(annualTax),
    marginalRate,
    appliedSlabIndex,
    slabs,
  };
}

function formatPkr(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function FbrIncomeTaxCalculator() {
  const incomeInputId = useId();
  const [category, setCategory] = useState<TaxCategory>("salaried");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("monthly");
  const [inputValue, setInputValue] = useState<string>("150000");
  const [copied, setCopied] = useState(false);

  const numericInput = Math.max(0, parseFloat(inputValue) || 0);
  const annualGross = periodMode === "monthly" ? numericInput * 12 : numericInput;
  const monthlyGross = periodMode === "monthly" ? numericInput : numericInput / 12;

  const { annualTax, marginalRate, appliedSlabIndex, slabs } = calculateTax(annualGross, category);
  const monthlyTax = Math.round(annualTax / 12);
  const annualTakeHome = Math.max(0, annualGross - annualTax);
  const monthlyTakeHome = Math.max(0, monthlyGross - monthlyTax);
  const effectiveTaxRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;
  const takeHomePercentage = 100 - effectiveTaxRate;

  const handlePreset = (amount: number, mode: PeriodMode) => {
    setPeriodMode(mode);
    setInputValue(amount.toString());
  };

  const handleReset = () => {
    setCategory("salaried");
    setPeriodMode("monthly");
    setInputValue("150000");
    setCopied(false);
  };

  const handleCopy = async () => {
    const summary = `FBR Income Tax Calculation (Pakistan 2025-2026)
-----------------------------------------------
Taxpayer Category: ${category === "salaried" ? "Salaried Individual (>75% salary)" : "Business / AOP"}
Monthly Gross Income: Rs. ${formatPkr(monthlyGross)}
Annual Gross Income: Rs. ${formatPkr(annualGross)}
-----------------------------------------------
Monthly Tax Deduction: Rs. ${formatPkr(monthlyTax)}
Annual Total Tax: Rs. ${formatPkr(annualTax)}
Effective Tax Rate: ${effectiveTaxRate.toFixed(2)}%
Marginal Tax Slab Rate: ${marginalRate}%
-----------------------------------------------
Monthly Net Take-Home: Rs. ${formatPkr(monthlyTakeHome)}
Annual Net Take-Home: Rs. ${formatPkr(annualTakeHome)}
Calculated on MicroTools (https://micro-tools.app/pk/fbr-income-tax-calculator)`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
      {/* Category Toggle: Salaried vs Business */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Select Taxpayer Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setCategory("salaried")}
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              category === "salaried"
                ? "border-blue-600 bg-blue-50/70 text-blue-950 shadow-2xs ring-1 ring-blue-600"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                category === "salaried" ? "bg-blue-600 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Salaried Individual</div>
              <div className="text-xs text-neutral-500">
                Salary accounts for &gt;75% of total taxable income
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setCategory("business")}
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              category === "business"
                ? "border-amber-600 bg-amber-50/70 text-amber-950 shadow-2xs ring-1 ring-amber-600"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                category === "business" ? "bg-amber-600 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <Building className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Business / Non-Salaried (AOP)</div>
              <div className="text-xs text-neutral-500">
                Sole proprietors, freelance business income &amp; partnerships
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mode & Income Input */}
      <div className="mb-5 rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={incomeInputId} className="text-sm font-semibold text-neutral-800">
            {periodMode === "monthly" ? "Monthly Gross Salary / Income" : "Annual Gross Income"}
          </label>
          <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                if (periodMode !== "monthly") {
                  setPeriodMode("monthly");
                  setInputValue(Math.round(annualGross / 12).toString());
                }
              }}
              className={`rounded-md px-3 py-1 transition ${
                periodMode === "monthly" ? "bg-blue-600 text-white shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => {
                if (periodMode !== "annual") {
                  setPeriodMode("annual");
                  setInputValue(Math.round(annualGross).toString());
                }
              }}
              className={`rounded-md px-3 py-1 transition ${
                periodMode === "annual" ? "bg-blue-600 text-white shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="relative mb-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 font-bold text-sm">
            <span translate="no" className="notranslate">
              Rs.
            </span>
          </div>
          <input
            id={incomeInputId}
            type="number"
            min="0"
            step="1000"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-12 pr-4 text-lg font-bold text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. 150000"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <div className="mb-1.5 text-xs font-medium text-neutral-500">Quick Examples:</div>
          <div className="flex flex-wrap gap-1.5">
            {category === "salaried" ? (
              <>
                <button
                  type="button"
                  onClick={() => handlePreset(50000, "monthly")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 50k/mo (0%)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(100000, "monthly")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 100k/mo
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(200000, "monthly")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 200k/mo
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(350000, "monthly")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 350k/mo
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(500000, "monthly")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 500k/mo
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handlePreset(600000, "annual")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 600k/yr (0%)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(1500000, "annual")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 1.5M/yr
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(3000000, "annual")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 3M/yr
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(6000000, "annual")}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
                >
                  <span translate="no" className="notranslate">
                    Rs. 6M/yr
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Calculation Results Card */}
      <div className="mb-5 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-blue-50/30 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-neutral-900">
              Tax Calculation Summary ({category === "salaried" ? "Salaried" : "Business"})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
              <span translate="no" className="notranslate">
                Slab #{appliedSlabIndex + 1}
              </span>
            </span>
          </div>
        </div>

        {/* Big Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
            <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Monthly Tax Deduction</span>
              <TrendingDown className="h-4 w-4 text-rose-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-950">
              <span translate="no" className="notranslate">
                Rs. {formatPkr(monthlyTax)}
              </span>
            </div>
            <div className="text-xs text-rose-700 mt-1">
              Annual Tax:{" "}
              <strong translate="no" className="notranslate">
                Rs. {formatPkr(annualTax)}
              </strong>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Monthly Net Take-Home</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              <span translate="no" className="notranslate">
                Rs. {formatPkr(monthlyTakeHome)}
              </span>
            </div>
            <div className="text-xs text-emerald-700 mt-1">
              Annual Take-Home:{" "}
              <strong translate="no" className="notranslate">
                Rs. {formatPkr(annualTakeHome)}
              </strong>
            </div>
          </div>
        </div>

        {/* Visual Take-Home vs Tax Bar */}
        <div className="mb-4 rounded-xl border border-neutral-200 bg-white p-3.5">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-emerald-700">
              Take-Home:{" "}
              <span translate="no" className="notranslate font-bold">
                {takeHomePercentage.toFixed(1)}%
              </span>
            </span>
            <span className="text-rose-700">
              Income Tax:{" "}
              <span translate="no" className="notranslate font-bold">
                {effectiveTaxRate.toFixed(1)}%
              </span>
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 flex">
            <div
              style={{ width: `${Math.max(0, Math.min(100, takeHomePercentage))}%` }}
              className="bg-emerald-500 transition-all duration-300"
              title="Take-Home Pay"
            />
            <div
              style={{ width: `${Math.max(0, Math.min(100, effectiveTaxRate))}%` }}
              className="bg-rose-500 transition-all duration-300"
              title="FBR Tax"
            />
          </div>
        </div>

        {/* Rates & Breakdown Table */}
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden mb-4">
          <div className="bg-neutral-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200">
            Tax Metrics Breakdown
          </div>
          <div className="divide-y divide-neutral-100 text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Gross Income (Annual)</span>
              <span translate="no" className="notranslate font-bold text-neutral-900">
                Rs. {formatPkr(annualGross)}
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Marginal Slab Rate</span>
              <span translate="no" className="notranslate font-bold text-blue-700">
                {marginalRate}%
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Effective Tax Rate</span>
              <span translate="no" className="notranslate font-bold text-rose-700">
                {effectiveTaxRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Active Tax Slab</span>
              <span className="text-right text-xs font-semibold text-neutral-800">
                {slabs[appliedSlabIndex]?.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Copy & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-200">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 transition hover:bg-neutral-100"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          Reset Defaults
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Tax Summary Copied!" : "Copy Tax Calculation"}
        </button>
      </div>
    </div>
  );
}
