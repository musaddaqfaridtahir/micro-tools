"use client";

import React, { useState, useId } from "react";
import {
  Sun,
  Zap,
  RotateCcw,
  Copy,
  Check,
  Home,
  TrendingUp,
  Maximize2,
  Plus,
  Minus,
} from "lucide-react";

type CalcMode = "bill" | "appliances";

interface ApplianceItem {
  id: string;
  name: string;
  powerWatts: number;
  qty: number;
  unit: string;
}

const INITIAL_APPLIANCES: ApplianceItem[] = [
  { id: "ac15", name: "1.5-Ton Inverter AC", powerWatts: 1600, qty: 1, unit: "units" },
  { id: "ac10", name: "1.0-Ton Inverter AC", powerWatts: 1100, qty: 0, unit: "units" },
  { id: "fans", name: "Inverter Ceiling Fans", powerWatts: 80, qty: 5, unit: "units" },
  { id: "lights", name: "LED Lights / Bulbs", powerWatts: 18, qty: 12, unit: "bulbs" },
  { id: "fridge", name: "Refrigerator / Deep Freezer", powerWatts: 300, qty: 1, unit: "units" },
  { id: "pump", name: "Water Pump / Motor (1 HP)", powerWatts: 1000, qty: 1, unit: "unit" },
  { id: "tv", name: "LED TV / Laptop / Computers", powerWatts: 150, qty: 2, unit: "units" },
];

function formatPkr(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SolarSystemCalculator() {
  const billInputId = useId();
  const [mode, setMode] = useState<CalcMode>("bill");
  const [monthlyBill, setMonthlyBill] = useState<string>("55000");
  const [systemType, setSystemType] = useState<"ongrid" | "hybrid">("ongrid");
  const [appliances, setAppliances] = useState<ApplianceItem[]>(INITIAL_APPLIANCES);
  const [copied, setCopied] = useState(false);

  // Mode 1: By Monthly Bill
  const numericBill = Math.max(0, parseFloat(monthlyBill) || 0);
  // Average blended cost per unit in Pakistan 2026 is approx Rs. 52 (including FPA + taxes)
  const estimatedMonthlyUnits = Math.round(numericBill / 52);
  // Daily units needed
  const dailyUnits = estimatedMonthlyUnits / 30;
  // In Pakistan, 1kW of Tier-1 solar produces approx 4.0 to 4.2 units (kWh) per sunny day
  const rawKwNeeded = dailyUnits / 4.1;

  // Mode 2: By Appliances
  const totalWatts = appliances.reduce((sum, item) => sum + item.powerWatts * item.qty, 0);
  const applianceKwNeeded = totalWatts > 0 ? (totalWatts / 1000) * 1.25 : 0; // 25% safety margin for surge/inverter efficiency

  // Unified System Recommendation
  const kwNeeded = mode === "bill" ? rawKwNeeded : applianceKwNeeded;
  let recommendedKw = 3;
  if (kwNeeded <= 3.8) {
    recommendedKw = 3;
  } else if (kwNeeded <= 7.0) {
    recommendedKw = 6;
  } else if (kwNeeded <= 11.5) {
    recommendedKw = 10;
  } else if (kwNeeded <= 16.5) {
    recommendedKw = 15;
  } else if (kwNeeded <= 22.0) {
    recommendedKw = 20;
  } else {
    recommendedKw = Math.ceil(kwNeeded / 5) * 5;
  }

  // 585W TOPCon / N-Type Monocrystalline Bifacial Panels
  const panelWattage = 585;
  const numberOfPanels = Math.ceil((recommendedKw * 1000) / panelWattage);
  const actualSystemWatts = numberOfPanels * panelWattage;
  const actualSystemKw = Number((actualSystemWatts / 1000).toFixed(1));

  // Required Roof Area: ~28 sq. ft. per 585W panel + 25% spacing for maintenance & walk paths
  const roofAreaSqFt = Math.round(numberOfPanels * 35);
  const roofAreaMarlas = (roofAreaSqFt / 225).toFixed(1); // 1 Marla in Punjab/KPK is 225 sq. ft.

  // Average 2026 Turnkey Costs in Pakistan:
  // On-grid: ~Rs. 115,000 to Rs. 125,000 per kW (including Tier-1 panels, On-grid inverter, Net-metering green meter, structure, copper cabling & installation)
  // Hybrid: ~Rs. 160,000 to Rs. 185,000 per kW (adds Hybrid inverter + lithium / tubular battery bank)
  const costPerKw = systemType === "ongrid" ? 120000 : 175000;
  const estimatedTotalCost = Math.round(actualSystemKw * costPerKw);

  // Financial ROI & Savings
  // Monthly generation in kWh = actualSystemKw * 4.1 units * 30 days
  const monthlyGenerationKwh = Math.round(actualSystemKw * 4.1 * 30);
  const monthlySavingsPkr = Math.round(monthlyGenerationKwh * 52);
  const annualSavingsPkr = monthlySavingsPkr * 12;
  const paybackPeriodYears = annualSavingsPkr > 0 ? Number((estimatedTotalCost / annualSavingsPkr).toFixed(1)) : 0;

  const updateApplianceQty = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
    );
  };

  const handlePreset = (bill: number, type: "ongrid" | "hybrid") => {
    setMode("bill");
    setMonthlyBill(bill.toString());
    setSystemType(type);
  };

  const handleReset = () => {
    setMode("bill");
    setMonthlyBill("55000");
    setSystemType("ongrid");
    setAppliances(INITIAL_APPLIANCES);
    setCopied(false);
  };

  const handleCopy = async () => {
    const summary = `Solar System Size & ROI Estimation (Pakistan)
-----------------------------------------------
Recommended System Size: ${actualSystemKw} kW (${recommendedKw} kW Inverter)
Solar Panels: ${numberOfPanels}x ${panelWattage}W Tier-1 N-Type Panels
System Architecture: ${systemType === "ongrid" ? "On-Grid with Net-Metering" : "Hybrid with Battery Backup"}
-----------------------------------------------
Estimated Monthly Generation: ${monthlyGenerationKwh} Units (kWh)
Required Roof Space: ~${roofAreaSqFt} sq. ft. (~${roofAreaMarlas} Marla)
Estimated Turnkey Cost: Rs. ${formatPkr(estimatedTotalCost)}
-----------------------------------------------
Estimated Monthly Bill Savings: Rs. ${formatPkr(monthlySavingsPkr)}
Estimated Annual Savings: Rs. ${formatPkr(annualSavingsPkr)}
Estimated Payback Period: ${paybackPeriodYears} Years
Calculated on MicroTools (https://micro-tools.app/pk/solar-system-calculator)`;

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
      {/* Calculation Mode Toggle */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Select Estimation Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setMode("bill")}
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              mode === "bill"
                ? "border-amber-500 bg-amber-50/70 text-amber-950 shadow-2xs ring-1 ring-amber-500"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                mode === "bill" ? "bg-amber-500 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">By Electricity Bill (Recommended)</div>
              <div className="text-xs text-neutral-500">Calculate based on monthly WAPDA / KE bill in PKR</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMode("appliances")}
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
              mode === "appliances"
                ? "border-amber-500 bg-amber-50/70 text-amber-950 shadow-2xs ring-1 ring-amber-500"
                : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                mode === "appliances" ? "bg-amber-500 text-white" : "bg-neutral-200 text-neutral-700"
              }`}
            >
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">By Home Appliances / Load</div>
              <div className="text-xs text-neutral-500">Count ACs, fans, lights, fridge, and water pump</div>
            </div>
          </button>
        </div>
      </div>

      {/* System Type: On-Grid vs Hybrid */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 p-3.5">
        <div>
          <span className="text-xs font-bold text-neutral-700 block">System Architecture</span>
          <span className="text-xs text-neutral-500">
            {systemType === "ongrid"
              ? "On-Grid with Net-Metering (Lowest cost, exports extra power to grid)"
              : "Hybrid (Includes battery bank backup during loadshedding)"}
          </span>
        </div>
        <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSystemType("ongrid")}
            className={`rounded-md px-3 py-1.5 transition ${
              systemType === "ongrid"
                ? "bg-amber-600 text-white shadow-2xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            On-Grid (Net Meter)
          </button>
          <button
            type="button"
            onClick={() => setSystemType("hybrid")}
            className={`rounded-md px-3 py-1.5 transition ${
              systemType === "hybrid"
                ? "bg-amber-600 text-white shadow-2xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Hybrid + Battery
          </button>
        </div>
      </div>

      {/* Mode 1 Input */}
      {mode === "bill" ? (
        <div className="mb-5 rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
          <label htmlFor={billInputId} className="mb-2 block text-sm font-semibold text-neutral-800">
            Average Monthly Electricity Bill
          </label>
          <div className="relative mb-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 font-bold text-sm">
              <span translate="no" className="notranslate">
                Rs.
              </span>
            </div>
            <input
              id={billInputId}
              type="number"
              min="0"
              step="1000"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-12 pr-4 text-lg font-bold text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-100"
              placeholder="e.g. 55000"
            />
          </div>

          {/* Presets */}
          <div>
            <div className="mb-1.5 text-xs font-medium text-neutral-500">Quick House Presets:</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handlePreset(28000, "ongrid")}
                className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
              >
                <span translate="no" className="notranslate">
                  3 Marla / Small (Rs. 28k)
                </span>
              </button>
              <button
                type="button"
                onClick={() => handlePreset(55000, "ongrid")}
                className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
              >
                <span translate="no" className="notranslate">
                  5 Marla Home (Rs. 55k)
                </span>
              </button>
              <button
                type="button"
                onClick={() => handlePreset(95000, "ongrid")}
                className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
              >
                <span translate="no" className="notranslate">
                  10 Marla (Rs. 95k)
                </span>
              </button>
              <button
                type="button"
                onClick={() => handlePreset(160000, "ongrid")}
                className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100"
              >
                <span translate="no" className="notranslate">
                  1 Kanal Luxury (Rs. 160k)
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Appliance Counters */
        <div className="mb-5 rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-800">Connected Appliances Load</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Total Load:{" "}
              <span translate="no" className="notranslate">
                {(totalWatts / 1000).toFixed(2)} kW
              </span>
            </span>
          </div>
          <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {appliances.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-900">{app.name}</div>
                  <div className="text-xs text-neutral-500">
                    <span translate="no" className="notranslate">
                      {app.powerWatts}W
                    </span>{" "}
                    each
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateApplianceQty(app.id, -1)}
                    disabled={app.qty === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-neutral-900 font-mono">
                    {app.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateApplianceQty(app.id, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation Results Card */}
      <div className="mb-5 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-amber-50/30 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-600" />
            <h3 className="text-base font-bold text-neutral-900">
              Recommended Solar System Specifications
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-900">
            <span translate="no" className="notranslate">
              {actualSystemKw} kW Total Capacity
            </span>
          </span>
        </div>

        {/* Big Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>System Size</span>
              <Sun className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-950">
              <span translate="no" className="notranslate">
                {recommendedKw} kW
              </span>
            </div>
            <div className="text-xs text-amber-700 mt-0.5">
              Inverter &amp; Design Rating
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-3.5">
            <div className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Solar Panels</span>
              <Maximize2 className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="text-2xl font-black text-neutral-900">
              <span translate="no" className="notranslate">
                {numberOfPanels} Panels
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              <span translate="no" className="notranslate">
                {panelWattage}W
              </span>{" "}
              Bifacial N-Type
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Est. Payback</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-950">
              <span translate="no" className="notranslate">
                {paybackPeriodYears} Years
              </span>
            </div>
            <div className="text-xs text-emerald-700 mt-0.5">
              Break-even on Investment
            </div>
          </div>
        </div>

        {/* Technical & Financial Breakdown Table */}
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden mb-4">
          <div className="bg-neutral-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200">
            System &amp; Financial Details (Pakistan 2026)
          </div>
          <div className="divide-y divide-neutral-100 text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Estimated Turnkey Cost (PKR)</span>
              <span translate="no" className="notranslate font-bold text-neutral-900">
                Rs. {formatPkr(estimatedTotalCost)}
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Monthly Power Generation</span>
              <span translate="no" className="notranslate font-bold text-neutral-900">
                ~{monthlyGenerationKwh} kWh (Units)
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Estimated Monthly Bill Savings</span>
              <span translate="no" className="notranslate font-bold text-emerald-700">
                Rs. {formatPkr(monthlySavingsPkr)} / month
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Estimated Annual Savings</span>
              <span translate="no" className="notranslate font-bold text-emerald-700">
                Rs. {formatPkr(annualSavingsPkr)} / year
              </span>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-neutral-600">Required Shadow-Free Roof Area</span>
              <span translate="no" className="notranslate font-medium text-neutral-800">
                ~{roofAreaSqFt} sq. ft. (~{roofAreaMarlas} Marla)
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
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-700 active:scale-95"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Solar Estimate Copied!" : "Copy Solar Specifications"}
        </button>
      </div>
    </div>
  );
}
