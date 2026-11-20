"use client";

import React, { useState } from "react";
import {
  Car,
  RotateCcw,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  BadgeAlert,
} from "lucide-react";

type Province = "punjab" | "sindh";
type TaxStatus = "filer" | "non-filer";
type EngineCategory = "up_to_1000" | "1001_to_1300" | "1301_to_1500" | "1501_to_2000" | "above_2000";

interface TaxRateData {
  category: EngineCategory;
  label: string;
  exampleCars: string;
  mvt: number; // Motor Vehicle Tax
  whtFiler: number; // Section 234 Withholding Tax for Filers
  whtNonFiler: number; // Section 234 Withholding Tax for Non-Filers
  profTax: number; // Professional Tax
  lifetimeOption?: number; // Lifetime token tax if applicable
}

const PUNJAB_RATES: Record<EngineCategory, TaxRateData> = {
  up_to_1000: {
    category: "up_to_1000",
    label: "Up to 1,000 cc",
    exampleCars: "Suzuki Alto 660cc, Cultus, WagonR, Picanto",
    mvt: 1000,
    whtFiler: 800,
    whtNonFiler: 2400,
    profTax: 200,
    lifetimeOption: 15000,
  },
  "1001_to_1300": {
    category: "1001_to_1300",
    label: "1,001 cc to 1,300 cc",
    exampleCars: "Toyota Yaris 1.3L, Honda City 1.2L/1.3L, Suzuki Swift",
    mvt: 1800,
    whtFiler: 2500,
    whtNonFiler: 7500,
    profTax: 200,
  },
  "1301_to_1500": {
    category: "1301_to_1500",
    label: "1,301 cc to 1,500 cc",
    exampleCars: "Honda Civic 1.5L Turbo, City 1.5L, Yaris 1.5L, Changan Alsvin",
    mvt: 3000,
    whtFiler: 4500,
    whtNonFiler: 13500,
    profTax: 200,
  },
  "1501_to_2000": {
    category: "1501_to_2000",
    label: "1,501 cc to 2,000 cc",
    exampleCars: "Hyundai Elantra, Kia Sportage, Hyundai Tucson, Oshan X7",
    mvt: 4500,
    whtFiler: 9000,
    whtNonFiler: 27000,
    profTax: 200,
  },
  above_2000: {
    category: "above_2000",
    label: "Above 2,000 cc",
    exampleCars: "Toyota Fortuner, Hilux Revo, Land Cruiser, Prado",
    mvt: 10000,
    whtFiler: 18000,
    whtNonFiler: 54000,
    profTax: 200,
  },
};

const SINDH_RATES: Record<EngineCategory, TaxRateData> = {
  up_to_1000: {
    category: "up_to_1000",
    label: "Up to 1,000 cc",
    exampleCars: "Suzuki Alto 660cc, Cultus, WagonR, Daihatsu Mira",
    mvt: 1000,
    whtFiler: 1000,
    whtNonFiler: 3000,
    profTax: 0,
    lifetimeOption: 12000,
  },
  "1001_to_1300": {
    category: "1001_to_1300",
    label: "1,001 cc to 1,300 cc",
    exampleCars: "Toyota Yaris 1.3L, Honda City 1.2L, Suzuki Swift",
    mvt: 2000,
    whtFiler: 3000,
    whtNonFiler: 9000,
    profTax: 0,
  },
  "1301_to_1500": {
    category: "1301_to_1500",
    label: "1,301 cc to 1,500 cc",
    exampleCars: "Honda Civic 1.5L Turbo, City 1.5L, Alsvin 1.5L",
    mvt: 3000,
    whtFiler: 5000,
    whtNonFiler: 15000,
    profTax: 0,
  },
  "1501_to_2000": {
    category: "1501_to_2000",
    label: "1,501 cc to 2,000 cc",
    exampleCars: "Kia Sportage, Hyundai Tucson, MG HS, Haval H6",
    mvt: 5000,
    whtFiler: 10000,
    whtNonFiler: 30000,
    profTax: 0,
  },
  above_2000: {
    category: "above_2000",
    label: "Above 2,000 cc",
    exampleCars: "Toyota Fortuner, Hilux Revo, Prado, Land Cruiser",
    mvt: 12000,
    whtFiler: 20000,
    whtNonFiler: 60000,
    profTax: 0,
  },
};

function formatPkr(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function VehicleTokenTaxCalculator() {
  const [province, setProvince] = useState<Province>("punjab");
  const [taxStatus, setTaxStatus] = useState<TaxStatus>("filer");
  const [engineCategory, setEngineCategory] = useState<EngineCategory>("1001_to_1300");
  const [copied, setCopied] = useState(false);

  const currentRates = province === "punjab" ? PUNJAB_RATES : SINDH_RATES;
  const rateData = currentRates[engineCategory];

  const mvt = rateData.mvt;
  const wht = taxStatus === "filer" ? rateData.whtFiler : rateData.whtNonFiler;
  const profTax = rateData.profTax;
  const annualTotal = mvt + wht + profTax;

  const handleSelectCarPreset = (cat: EngineCategory) => {
    setEngineCategory(cat);
  };

  const handleReset = () => {
    setProvince("punjab");
    setTaxStatus("filer");
    setEngineCategory("1001_to_1300");
    setCopied(false);
  };

  const handleCopy = async () => {
    const summary = `Vehicle Token Tax Calculation (Pakistan 2026)
-----------------------------------------------
Province: ${province === "punjab" ? "Punjab (e-Pay Punjab / Excise)" : "Sindh (Excise & Taxation)"}
Taxpayer Status: ${taxStatus === "filer" ? "Active Filer (ATL)" : "Non-Filer (Triple WHT)"}
Engine Capacity: ${rateData.label} (${rateData.exampleCars})
-----------------------------------------------
Motor Vehicle Tax (MVT): Rs. ${formatPkr(mvt)}
Withholding Tax (Sec 234): Rs. ${formatPkr(wht)}
Professional Tax: Rs. ${formatPkr(profTax)}
-----------------------------------------------
TOTAL ANNUAL TOKEN TAX: Rs. ${formatPkr(annualTotal)}
${rateData.lifetimeOption ? `(One-Time Lifetime Option: Rs. ${formatPkr(rateData.lifetimeOption)})` : ""}
Calculated on MicroTools (https://micro-tools.app/pk/vehicle-token-tax-calculator)`;

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
      {/* Province Selector */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          1. Select Province of Registration
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setProvince("punjab")}
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              province === "punjab"
                ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-2xs ring-1 ring-emerald-600"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                province === "punjab" ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Punjab (e-Pay Punjab)</div>
              <div className="text-xs text-neutral-500">Excise &amp; Taxation Department, Punjab</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setProvince("sindh")}
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              province === "sindh"
                ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-2xs ring-1 ring-emerald-600"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                province === "sindh" ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Sindh (Karachi / Hyderabad)</div>
              <div className="text-xs text-neutral-500">Excise, Taxation &amp; Narcotics Control, Sindh</div>
            </div>
          </button>
        </div>
      </div>

      {/* Taxpayer Status: Filer vs Non-Filer */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          2. Taxpayer Status (FBR ATL)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setTaxStatus("filer")}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
              taxStatus === "filer"
                ? "border-blue-600 bg-blue-50/70 text-blue-950 shadow-2xs ring-1 ring-blue-600"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                taxStatus === "filer" ? "bg-blue-600 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Active Tax Filer (ATL)</div>
              <div className="text-xs text-neutral-500">Standard Section 234 withholding tax rates</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTaxStatus("non-filer")}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
              taxStatus === "non-filer"
                ? "border-rose-600 bg-rose-50/70 text-rose-950 shadow-2xs ring-1 ring-rose-600"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                taxStatus === "non-filer" ? "bg-rose-600 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <BadgeAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Non-Filer</div>
              <div className="text-xs text-rose-700 font-semibold">
                3x Withholding Tax penalty applies!
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Engine Capacity Selection */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          3. Vehicle Engine Capacity (Displacement)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {(Object.keys(currentRates) as EngineCategory[]).map((cat) => {
            const data = currentRates[cat];
            const isSelected = engineCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setEngineCategory(cat)}
                className={`rounded-xl border p-3 text-left transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-2xs ring-1 ring-emerald-600"
                    : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800"
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">{data.label}</div>
                <div className="text-2xs text-neutral-500 mt-0.5 line-clamp-1">{data.exampleCars}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Car Quick Presets */}
      <div className="mb-5 rounded-xl border border-neutral-100 bg-neutral-50/60 p-3">
        <div className="mb-1.5 text-xs font-medium text-neutral-500">Quick Car Models:</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleSelectCarPreset("up_to_1000")}
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
          >
            <span translate="no" className="notranslate">
              Suzuki Alto (660cc)
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectCarPreset("1001_to_1300")}
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
          >
            <span translate="no" className="notranslate">
              Toyota Yaris (1.3L)
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectCarPreset("1301_to_1500")}
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
          >
            <span translate="no" className="notranslate">
              Honda Civic (1.5L)
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectCarPreset("1501_to_2000")}
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
          >
            <span translate="no" className="notranslate">
              Kia Sportage (2.0L)
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectCarPreset("above_2000")}
            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
          >
            <span translate="no" className="notranslate">
              Toyota Fortuner / Revo
            </span>
          </button>
        </div>
      </div>

      {/* Token Tax Result Card */}
      <div className="mb-5 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-neutral-900">
              Token Tax Calculation ({province === "punjab" ? "Punjab" : "Sindh"})
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
              taxStatus === "filer" ? "bg-blue-100 text-blue-800" : "bg-rose-100 text-rose-800"
            }`}
          >
            {taxStatus === "filer" ? "Active Filer Rate" : "Non-Filer 3x WHT"}
          </span>
        </div>

        {/* Big Total Card */}
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              Total Annual Token Tax Payable
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950">
              <span translate="no" className="notranslate">
                Rs. {formatPkr(annualTotal)}
              </span>
            </div>
          </div>
          <div className="mt-3 sm:mt-0 text-xs text-emerald-800 bg-white/80 rounded-lg p-2.5 border border-emerald-200 sm:max-w-xs">
            Payable via <strong>e-Pay Punjab</strong> or <strong>Sindh Excise</strong> 1-Link PSID.
          </div>
        </div>

        {/* Lifetime Token Notice if applicable */}
        {rateData.lifetimeOption && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-xs text-blue-900 flex items-center justify-between">
            <div>
              <strong>Lifetime Token Option (Up to 1000cc):</strong> You can pay a one-time fixed lifetime token tax of{" "}
              <strong translate="no" className="notranslate">
                Rs. {formatPkr(rateData.lifetimeOption)}
              </strong>{" "}
              and never pay annual tokens again!
            </div>
          </div>
        )}

        {/* Breakdown Table */}
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden mb-4">
          <div className="bg-neutral-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200">
            Excise &amp; FBR Tax Breakdown
          </div>
          <div className="divide-y divide-neutral-100 text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Motor Vehicle Tax (Annual MVT)</span>
              <span translate="no" className="notranslate font-bold text-neutral-900">
                Rs. {formatPkr(mvt)}
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <div className="text-neutral-600 flex items-center gap-1.5">
                <span>Withholding Tax (FBR Sec 234)</span>
                {taxStatus === "non-filer" && (
                  <span className="text-2xs font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                    3x Non-Filer
                  </span>
                )}
              </div>
              <span
                translate="no"
                className={`notranslate font-bold ${
                  taxStatus === "non-filer" ? "text-rose-700" : "text-neutral-900"
                }`}
              >
                Rs. {formatPkr(wht)}
              </span>
            </div>
            {profTax > 0 && (
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-neutral-600">Professional Tax (Punjab)</span>
                <span translate="no" className="notranslate font-bold text-neutral-900">
                  Rs. {formatPkr(profTax)}
                </span>
              </div>
            )}
            <div className="flex justify-between px-4 py-2.5 bg-neutral-50/50">
              <span className="font-bold text-neutral-800">Total Annual Payable</span>
              <span translate="no" className="notranslate font-black text-emerald-800">
                Rs. {formatPkr(annualTotal)}
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
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Tax Calculation Copied!" : "Copy Token Tax Summary"}
        </button>
      </div>
    </div>
  );
}
