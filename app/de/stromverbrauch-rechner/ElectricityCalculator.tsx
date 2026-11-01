"use client";

import React, { useState, useId } from "react";
import {
  Zap,
  Clock,
  Calendar,
  Euro,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Tv,
  Refrigerator,
  Gamepad2,
  Flame,
  Shirt,
  SlidersHorizontal,
} from "lucide-react";

interface PresetAppliance {
  id: string;
  name: string;
  watt: number;
  hours: number;
  icon: React.ComponentType<{ className?: string }>;
}

const PRESET_APPLIANCES: PresetAppliance[] = [
  { id: "fridge", name: "Kühlschrank", watt: 120, hours: 24, icon: Refrigerator },
  { id: "gaming_pc", name: "Gaming-PC", watt: 450, hours: 4, icon: Gamepad2 },
  { id: "tv", name: "Fernseher / TV", watt: 100, hours: 4, icon: Tv },
  { id: "washing", name: "Waschmaschine", watt: 2000, hours: 1, icon: Shirt },
  { id: "heater", name: "Heizlüfter", watt: 2000, hours: 2, icon: Flame },
];

const DAYS_PRESETS = [
  { label: "365 Tage (Ganzes Jahr)", value: 365 },
  { label: "250 Tage (Arbeitstage)", value: 250 },
  { label: "180 Tage (Halbes Jahr)", value: 180 },
];

export default function ElectricityCalculator() {
  const wattId = useId();
  const hoursId = useId();
  const daysId = useId();
  const priceId = useId();

  // Selected appliance preset
  const [selectedPreset, setSelectedPreset] = useState<string>("fridge");

  // Input states
  const [wattStr, setWattStr] = useState<string>("120");
  const [hoursStr, setHoursStr] = useState<string>("24");
  const [daysStr, setDaysStr] = useState<string>("365");
  const [priceCentStr, setPriceCentStr] = useState<string>("35"); // 35 Cent/kWh

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Parse numeric values
  const parseVal = (str: string) => parseFloat(str.replace(/\s/g, "").replace(",", ".")) || 0;

  const watt = parseVal(wattStr);
  const hoursPerDay = Math.min(24, Math.max(0, parseVal(hoursStr)));
  const daysPerYear = Math.min(365, Math.max(0, parseVal(daysStr)));
  const priceCent = parseVal(priceCentStr);
  const priceEuro = priceCent / 100; // Euro pro kWh

  // Calculations
  // kWh pro Tag = (Watt * Stunden) / 1000
  const kwhPerDay = (watt * hoursPerDay) / 1000;
  const costPerDay = kwhPerDay * priceEuro;

  // Pro Jahr = kWh pro Tag * Tage im Jahr
  const kwhPerYear = kwhPerDay * daysPerYear;
  const costPerYear = kwhPerYear * priceEuro;

  // Pro Monat = Pro Jahr / 12
  const kwhPerMonth = kwhPerYear / 12;
  const costPerMonth = costPerYear / 12;

  // German formatting
  const formatEuro = (val: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatKwh = (val: number): string => {
    return (
      val.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " kWh"
    );
  };

  const handleSelectPreset = (preset: PresetAppliance) => {
    setSelectedPreset(preset.id);
    setWattStr(preset.watt.toString());
    setHoursStr(preset.hours.toString());
  };

  const handleSelectCustom = () => {
    setSelectedPreset("custom");
  };

  const handleReset = () => {
    setSelectedPreset("fridge");
    setWattStr("120");
    setHoursStr("24");
    setDaysStr("365");
    setPriceCentStr("35");
    setCopiedKey(null);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const getFullSummaryText = () => {
    return `Stromverbrauch & Kosten (${watt} Watt, ${hoursPerDay} Std./Tag bei ${priceCent} Cent/kWh):
- Pro Tag: ${formatKwh(kwhPerDay)} | ${formatEuro(costPerDay)}
- Pro Monat: ${formatKwh(kwhPerMonth)} | ${formatEuro(costPerMonth)}
- Pro Jahr (${daysPerYear} Tage): ${formatKwh(kwhPerYear)} | ${formatEuro(costPerYear)}`;
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Header: Title & Reset */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Schnell-Auswahl typischer Haushaltsgeräte
          </span>
          <p className="text-xs text-neutral-500 mt-0.5">
            Wählen Sie ein Gerät aus, um Standardwerte sofort zu laden, oder geben Sie eigene Werte ein.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 active:scale-95"
          title="Alle Eingaben zurücksetzen"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>Zurücksetzen</span>
        </button>
      </div>

      {/* 1. Appliance Presets Buttons */}
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {PRESET_APPLIANCES.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPreset === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPreset(item)}
                className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm ring-2 ring-blue-600/20"
                    : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100/70"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl mb-1.5 ${
                    isSelected ? "bg-blue-600 text-white" : "bg-neutral-200/80 text-neutral-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold leading-tight">{item.name}</span>
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  {item.watt} W • {item.hours} h
                </span>
              </button>
            );
          })}

          {/* Custom Appliance Option */}
          <button
            type="button"
            onClick={handleSelectCustom}
            className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
              selectedPreset === "custom"
                ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm ring-2 ring-blue-600/20"
                : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100/70"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl mb-1.5 ${
                selectedPreset === "custom" ? "bg-blue-600 text-white" : "bg-neutral-200/80 text-neutral-600"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold leading-tight">Eigenes Gerät</span>
            <span className="text-[10px] text-neutral-500 mt-0.5">Individuell</span>
          </button>
        </div>
      </div>

      {/* 2. Real-Time Input Fields */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Field 1: Watt */}
        <div className="space-y-1.5">
          <label htmlFor={wattId} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Leistung (Watt)</span>
          </label>
          <div className="relative rounded-2xl shadow-2xs">
            <input
              id={wattId}
              type="text"
              inputMode="decimal"
              value={wattStr}
              onChange={(e) => {
                setWattStr(e.target.value);
                setSelectedPreset("custom");
              }}
              placeholder="z.B. 120"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-10 text-base font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-neutral-400">
              W
            </div>
          </div>
          <span className="text-[11px] text-neutral-500">Angabe auf dem Typenschild</span>
        </div>

        {/* Field 2: Stunden pro Tag */}
        <div className="space-y-1.5">
          <label htmlFor={hoursId} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            <span>Nutzung pro Tag</span>
          </label>
          <div className="relative rounded-2xl shadow-2xs">
            <input
              id={hoursId}
              type="text"
              inputMode="decimal"
              value={hoursStr}
              onChange={(e) => {
                setHoursStr(e.target.value);
                setSelectedPreset("custom");
              }}
              placeholder="z.B. 4"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-12 text-base font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-neutral-400">
              Std./Tag
            </div>
          </div>
          <span className="text-[11px] text-neutral-500">0,5 bis 24 Stunden</span>
        </div>

        {/* Field 3: Nutzungstage pro Jahr */}
        <div className="space-y-1.5">
          <label htmlFor={daysId} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <Calendar className="h-3.5 w-3.5 text-emerald-500" />
            <span>Tage pro Jahr</span>
          </label>
          <div className="relative rounded-2xl shadow-2xs">
            <input
              id={daysId}
              type="text"
              inputMode="numeric"
              value={daysStr}
              onChange={(e) => setDaysStr(e.target.value)}
              placeholder="z.B. 365"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-12 text-base font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-neutral-400">
              Tage
            </div>
          </div>
          {/* Quick days buttons */}
          <div className="flex gap-1 pt-1">
            {DAYS_PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setDaysStr(p.value.toString())}
                className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold transition ${
                  daysStr === p.value.toString()
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {p.value}
              </button>
            ))}
          </div>
        </div>

        {/* Field 4: Strompreis (Cent / kWh) */}
        <div className="space-y-1.5">
          <label htmlFor={priceId} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <Euro className="h-3.5 w-3.5 text-indigo-500" />
            <span>Strompreis (Cent/kWh)</span>
          </label>
          <div className="relative rounded-2xl shadow-2xs">
            <input
              id={priceId}
              type="text"
              inputMode="decimal"
              value={priceCentStr}
              onChange={(e) => setPriceCentStr(e.target.value)}
              placeholder="z.B. 35"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-14 text-base font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-neutral-400">
              Ct/kWh
            </div>
          </div>
          <span className="text-[11px] text-neutral-500 flex items-center gap-1">
            <Info className="h-3 w-3 text-neutral-400" />
            Ø Deutschland 2024-2026: ~35 Ct
          </span>
        </div>
      </div>

      {/* 3. Output Results Cards */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        {/* Top Info Bar */}
        <div className="border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Berechnete Stromkosten & Verbrauch
            </h3>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(getFullSummaryText(), "all")}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 hover:text-white"
          >
            {copiedKey === "all" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Zusammenfassung kopiert!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Ergebnis kopieren</span>
              </>
            )}
          </button>
        </div>

        {/* 3 Result Columns */}
        <div className="grid grid-cols-1 divide-y divide-neutral-800 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {/* Pro Tag */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                1. Pro Tag ({hoursPerDay} Std.)
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(`${formatKwh(kwhPerDay)} | ${formatEuro(costPerDay)}`, "day")
                }
                className="text-neutral-400 hover:text-white"
                title="Tageswert kopieren"
              >
                {copiedKey === "day" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <div className="mt-3 text-2xl font-black text-white sm:text-3xl">
              {formatEuro(costPerDay)}
            </div>
            <div className="mt-1 text-sm font-semibold text-neutral-400">
              {formatKwh(kwhPerDay)}
            </div>
            <p className="mt-3 text-[11px] text-neutral-500">Täglicher Aufwand</p>
          </div>

          {/* Pro Monat */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                2. Pro Monat (Durchschnitt)
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(`${formatKwh(kwhPerMonth)} | ${formatEuro(costPerMonth)}`, "month")
                }
                className="text-neutral-400 hover:text-white"
                title="Monatswert kopieren"
              >
                {copiedKey === "month" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <div className="mt-3 text-2xl font-black text-blue-400 sm:text-3xl">
              {formatEuro(costPerMonth)}
            </div>
            <div className="mt-1 text-sm font-semibold text-blue-200/80">
              {formatKwh(kwhPerMonth)}
            </div>
            <p className="mt-3 text-[11px] text-neutral-500">Monatlicher Abschlag</p>
          </div>

          {/* Pro Jahr - Highlighted */}
          <div className="p-6 transition hover:bg-neutral-800/40 bg-gradient-to-br from-emerald-950/40 to-neutral-900 border-l-2 border-emerald-500/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <span>3. Pro Jahr ({daysPerYear} Tage)</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[10px] text-emerald-300">
                  Wichtig
                </span>
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(`${formatKwh(kwhPerYear)} | ${formatEuro(costPerYear)}`, "year")
                }
                className="text-neutral-400 hover:text-white"
                title="Jahreswert kopieren"
              >
                {copiedKey === "year" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-400 sm:text-4xl">
              {formatEuro(costPerYear)}
            </div>
            <div className="mt-1 text-base font-bold text-emerald-200">
              {formatKwh(kwhPerYear)}
            </div>
            <p className="mt-3 text-[11px] text-neutral-400">Gesamte Stromrechnung pro Jahr</p>
          </div>
        </div>

        {/* Calculation Formula Live Banner */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-3.5 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-mono text-[11px]">
            Berechnung : ({watt} W × {hoursPerDay} h × {daysPerYear} Tage) ÷ 1.000 ={" "}
            <span className="text-white font-bold">{formatKwh(kwhPerYear)}</span> × {priceEuro.toFixed(2)} € ={" "}
            <span className="text-emerald-400 font-bold">{formatEuro(costPerYear)}</span>
          </div>
          <span className="text-[10px] text-neutral-500">
            Basis: Strompreis {priceCent} Cent/kWh
          </span>
        </div>
      </div>
    </div>
  );
}
