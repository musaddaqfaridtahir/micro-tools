"use client";

import React, { useState, useId } from "react";
import {
  Zap,
  RotateCcw,
  Copy,
  Check,
  Info,
  ShieldCheck,
  Building2,
} from "lucide-react";

type DiscoName = "LESCO" | "GEPCO" | "FESCO" | "MEPCO" | "IESCO" | "K-Electric";
type TariffCategory = "protected" | "unprotected" | "commercial";

interface DiscoOption {
  code: DiscoName;
  fullName: string;
  region: string;
}

const DISCOS: DiscoOption[] = [
  { code: "LESCO", fullName: "Lahore Electric Supply Co.", region: "Lahore, Kasur, Okara" },
  { code: "IESCO", fullName: "Islamabad Electric Supply Co.", region: "Islamabad, Rawalpindi" },
  { code: "FESCO", fullName: "Faisalabad Electric Supply Co.", region: "Faisalabad, Sargodha" },
  { code: "GEPCO", fullName: "Gujranwala Electric Power Co.", region: "Gujranwala, Sialkot" },
  { code: "MEPCO", fullName: "Multan Electric Power Co.", region: "Multan, Bahawalpur" },
  { code: "K-Electric", fullName: "Karachi Electric (KE)", region: "Karachi Metropolitan" },
];

const PRESETS = [
  { label: "150 Units (Protected)", units: "150", cat: "protected" as TariffCategory },
  { label: "300 Units (Middle Class)", units: "300", cat: "unprotected" as TariffCategory },
  { label: "500 Units (Summer AC)", units: "500", cat: "unprotected" as TariffCategory },
  { label: "800 Units (Commercial / Large)", units: "800", cat: "unprotected" as TariffCategory },
];

export default function ElectricityBillEstimator() {
  const unitsInputId = useId();
  const fpaInputId = useId();

  const [selectedDisco, setSelectedDisco] = useState<DiscoName>("LESCO");
  const [tariffCat, setTariffCat] = useState<TariffCategory>("unprotected");
  const [unitsStr, setUnitsStr] = useState<string>("300");
  const [fpaRateStr, setFpaRateStr] = useState<string>("3.20");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const units = Math.max(0, parseFloat(unitsStr) || 0);
  const fpaRate = Math.max(0, parseFloat(fpaRateStr) || 0);

  // 1. Calculate Base Energy Cost according to NEPRA 2026 Slabs
  let baseEnergyCost = 0;

  if (tariffCat === "commercial") {
    // Commercial flat base rate
    baseEnergyCost = units * 41.5;
  } else if (tariffCat === "protected") {
    // Protected Domestic (≤ 200 units)
    if (units <= 50) {
      baseEnergyCost = units * 3.95;
    } else if (units <= 100) {
      baseEnergyCost = 50 * 3.95 + (units - 50) * 7.74;
    } else {
      // 101 - 200
      baseEnergyCost = 50 * 3.95 + 50 * 7.74 + (units - 100) * 10.06;
    }
  } else {
    // Unprotected Domestic (Progressive Slabs)
    if (units <= 100) {
      baseEnergyCost = units * 16.48;
    } else if (units <= 200) {
      baseEnergyCost = 100 * 16.48 + (units - 100) * 22.95;
    } else if (units <= 300) {
      baseEnergyCost = 100 * 16.48 + 100 * 22.95 + (units - 200) * 27.14;
    } else if (units <= 400) {
      baseEnergyCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + (units - 300) * 32.03;
    } else if (units <= 500) {
      baseEnergyCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + 100 * 32.03 + (units - 400) * 35.24;
    } else if (units <= 600) {
      baseEnergyCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + 100 * 32.03 + 100 * 35.24 + (units - 500) * 36.66;
    } else if (units <= 700) {
      baseEnergyCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + 100 * 32.03 + 100 * 35.24 + 100 * 36.66 + (units - 600) * 37.8;
    } else {
      baseEnergyCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + 100 * 32.03 + 100 * 35.24 + 100 * 36.66 + 100 * 37.8 + (units - 700) * 42.72;
    }
  }

  // Surcharges & Taxes
  const debtSurcharge = units * 3.23;
  const fpaAmount = units * fpaRate;
  const electricityDuty = baseEnergyCost * 0.015;
  const tvFee = tariffCat === "commercial" ? 60 : 35;

  // GST: 18% applied on base + FPA + Debt Surcharge + ED (waived on protected ≤ 200 units under lifeline rules)
  const isGstExempt = tariffCat === "protected" && units <= 200;
  const gstAmount = isGstExempt
    ? 0
    : (baseEnergyCost + fpaAmount + debtSurcharge + electricityDuty) * 0.18;

  // Advance Income Tax (Under Section 235: 7.5% if bill exceeds Rs. 25,000 for non-filers/commercial)
  const subTotalBeforeAdvanceTax =
    baseEnergyCost + debtSurcharge + fpaAmount + electricityDuty + tvFee + gstAmount;
  const advanceTax = subTotalBeforeAdvanceTax > 25000 ? subTotalBeforeAdvanceTax * 0.075 : 0;

  const totalBill = Math.round(subTotalBeforeAdvanceTax + advanceTax);
  const effectiveCostPerUnit = units > 0 ? totalBill / units : 0;

  const fmtPkr = (val: number) => {
    return `Rs. ${Math.round(val).toLocaleString("en-PK")}`;
  };

  const handleReset = () => {
    setUnitsStr("300");
    setFpaRateStr("3.20");
    setTariffCat("unprotected");
    setSelectedDisco("LESCO");
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const summaryText = `WAPDA / K-Electric Electricity Bill Estimate (${selectedDisco}):
Units Consumed: ${units} kWh (${tariffCat})
Base Energy Cost: ${fmtPkr(baseEnergyCost)}
Fuel Adjustment (FPA @ Rs. ${fpaRate}/unit): ${fmtPkr(fpaAmount)}
Debt Surcharge: ${fmtPkr(debtSurcharge)}
Electricity Duty (1.5%): ${fmtPkr(electricityDuty)}
PTV Fee: Rs. ${tvFee}
GST (18%): ${fmtPkr(gstAmount)}
${advanceTax > 0 ? `Advance WHT (>Rs. 25k): ${fmtPkr(advanceTax)}\n` : ""}Estimated Total Bill: ${fmtPkr(totalBill)}
Average Rate: Rs. ${effectiveCostPerUnit.toFixed(2)} / unit
Calculated via MicroTools Pakistan`;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Controls: DISCO Selector + Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-200/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
            Select Your Electricity Distribution Company (DISCO)
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DISCOS.map((disco) => {
              const active = selectedDisco === disco.code;
              return (
                <button
                  key={disco.code}
                  type="button"
                  onClick={() => setSelectedDisco(disco.code)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    active
                      ? "border border-emerald-600 bg-emerald-600 text-white shadow-xs"
                      : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-emerald-300 hover:bg-emerald-50/60"
                  }`}
                >
                  <span translate="no" className="notranslate">{disco.code}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Tariff Category Selector */}
      <div className="mt-6">
        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Connection &amp; Tariff Category (NEPRA 2026 Slabs)
        </span>
        <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              setTariffCat("unprotected");
              if (units < 201) setUnitsStr("300");
            }}
            className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition cursor-pointer ${
              tariffCat === "unprotected"
                ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-600/20"
                : "border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <span className="text-xs font-bold text-neutral-900">Domestic Unprotected</span>
            <span className="mt-0.5 text-[11px] text-neutral-500">
              Standard homes exceeding 200 units in any of the last 6 months
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTariffCat("protected");
              if (units > 200) setUnitsStr("150");
            }}
            className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition cursor-pointer ${
              tariffCat === "protected"
                ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-600/20"
                : "border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Domestic Protected
            </span>
            <span className="mt-0.5 text-[11px] text-neutral-500">
              Low-usage consumers consistently &le; 200 units for 6 months (subsidized)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTariffCat("commercial")}
            className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition cursor-pointer ${
              tariffCat === "commercial"
                ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-600/20"
                : "border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
              <Building2 className="h-3.5 w-3.5 text-amber-600" />
              Commercial (Shops / Offices)
            </span>
            <span className="mt-0.5 text-[11px] text-neutral-500">
              Commercial meter rate with flat tariffs and 18% GST
            </span>
          </button>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Quick Examples:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setUnitsStr(p.units);
              setTariffCat(p.cat);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Inputs & Output Cards */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Inputs */}
        <div className="space-y-5 lg:col-span-5">
          <div>
            <label
              htmlFor={unitsInputId}
              className="block text-sm font-semibold text-neutral-800"
            >
              Units Consumed in Month (kWh)
            </label>
            <div className="relative mt-2">
              <input
                id={unitsInputId}
                type="text"
                inputMode="numeric"
                value={unitsStr}
                onChange={(e) => setUnitsStr(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="e.g. 350"
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 pl-4 pr-16 text-lg font-bold text-neutral-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition"
              />
              <div
                translate="no"
                className="notranslate pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-bold text-neutral-400"
              >
                Units (kWh)
              </div>
            </div>
            {tariffCat === "protected" && units > 200 && (
              <p className="mt-1 text-xs font-semibold text-amber-700">
                Notice: Protected status applies strictly up to 200 units. Slabs above 200 units automatically fall under Unprotected tariffs.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={fpaInputId}
              className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              <span>Estimated Fuel Price Adjustment (FPA)</span>
              <span translate="no" className="notranslate text-emerald-700 font-bold">
                Rs. {fpaRate.toFixed(2)} / unit
              </span>
            </label>
            <div className="relative mt-2">
              <input
                id={fpaInputId}
                type="number"
                step="0.10"
                min="0"
                max="15"
                value={fpaRateStr}
                onChange={(e) => setFpaRateStr(e.target.value)}
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-16 text-sm font-bold text-neutral-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition"
              />
              <div
                translate="no"
                className="notranslate pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-bold text-neutral-400"
              >
                PKR / Unit
              </div>
            </div>
            <p className="mt-1 text-[11px] text-neutral-500">
              National electric bills include monthly FPA determined by NEPRA (typically Rs. 2.00 to Rs. 4.50).
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Info className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Selected Provider: {selectedDisco}</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Base tariff slabs, GST (18%), Financing Surcharges (Rs. 3.23), and TV fee (Rs. 35) are harmonized across WAPDA DISCOs and K-Electric according to the 2026 NEPRA Uniform Tariff schedule.
            </p>
          </div>
        </div>

        {/* Right Output Results */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-900 text-white p-5 sm:p-6 lg:col-span-7 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Estimated Electricity Bill ({selectedDisco})
                </h3>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(summaryText, "all")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 cursor-pointer"
              >
                {copiedKey === "all" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Breakdown</span>
                  </>
                )}
              </button>
            </div>

            {/* Total Estimated Bill Card */}
            <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-5 ring-1 ring-emerald-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Total Payable Electricity Bill
              </span>
              <div
                translate="no"
                className="notranslate mt-1 text-3xl sm:text-4xl font-black tracking-tight text-emerald-400"
              >
                {fmtPkr(totalBill)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                <span>
                  Effective Rate: <strong translate="no" className="notranslate text-white">Rs. {effectiveCostPerUnit.toFixed(2)}/unit</strong>
                </span>
                <span className="text-neutral-500">&bull;</span>
                <span>
                  Base Units: <strong translate="no" className="notranslate text-white">{units} kWh</strong>
                </span>
              </div>
            </div>

            {/* Itemized Taxes & Surcharges Breakdown */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 p-3">
                <span className="text-neutral-300">Base Energy Cost (Slab Tariff)</span>
                <span translate="no" className="notranslate font-mono font-bold text-white">
                  {fmtPkr(baseEnergyCost)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 p-3">
                <span className="text-neutral-300">Fuel Price Adjustment (FPA @ Rs. {fpaRate}/u)</span>
                <span translate="no" className="notranslate font-mono font-bold text-white">
                  {fmtPkr(fpaAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 p-3">
                <span className="text-neutral-300">Debt Financing Surcharge (Rs. 3.23/u)</span>
                <span translate="no" className="notranslate font-mono font-bold text-white">
                  {fmtPkr(debtSurcharge)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 p-3">
                <span className="text-neutral-300">General Sales Tax (18% GST)</span>
                <span translate="no" className="notranslate font-mono font-bold text-white">
                  {isGstExempt ? "Rs. 0 (Protected Exempt)" : fmtPkr(gstAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 p-3">
                <span className="text-neutral-300">Electricity Duty (1.5%) + PTV Fee (Rs. {tvFee})</span>
                <span translate="no" className="notranslate font-mono font-bold text-white">
                  {fmtPkr(electricityDuty + tvFee)}
                </span>
              </div>

              {advanceTax > 0 && (
                <div className="flex items-center justify-between rounded-xl bg-amber-950/40 p-3 border border-amber-600/30">
                  <span className="text-amber-200">Advance Income Tax (Sec 235 &gt; Rs. 25,000)</span>
                  <span translate="no" className="notranslate font-mono font-bold text-amber-300">
                    {fmtPkr(advanceTax)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Calculated strictly locally in your browser.</span>
            <span className="text-emerald-400 font-semibold">NEPRA 2026 Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
