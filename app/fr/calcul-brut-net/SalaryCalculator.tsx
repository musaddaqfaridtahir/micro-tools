"use client";

import React, { useState, useId } from "react";
import {
  Briefcase,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Euro,
  Info,
  SlidersHorizontal,
} from "lucide-react";

type Direction = "brut_to_net" | "net_to_brut";
type Period = "monthly" | "annual";
type StatusKey = "non_cadre" | "cadre" | "fonction_publique";

interface StatusOption {
  key: StatusKey;
  label: string;
  chargeRate: number;
  hint: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    key: "non_cadre",
    label: "Salarié Non-Cadre",
    chargeRate: 22,
    hint: "~22 % de cotisations",
  },
  {
    key: "cadre",
    label: "Salarié Cadre",
    chargeRate: 25,
    hint: "~25 % de cotisations (incl. APEC)",
  },
  {
    key: "fonction_publique",
    label: "Fonction Publique",
    chargeRate: 15,
    hint: "~15 % de retenues",
  },
];

const QUICK_PRESETS: Array<{
  label: string;
  amount: string;
  period: Period;
  status: StatusKey;
  direction: Direction;
  pas: string;
}> = [
  {
    label: "SMIC 2026 (1 802 € Brut)",
    amount: "1801.80",
    period: "monthly",
    status: "non_cadre",
    direction: "brut_to_net",
    pas: "0",
  },
  {
    label: "2 500 € Brut/mois",
    amount: "2500",
    period: "monthly",
    status: "non_cadre",
    direction: "brut_to_net",
    pas: "4",
  },
  {
    label: "3 800 € Cadre/mois",
    amount: "3800",
    period: "monthly",
    status: "cadre",
    direction: "brut_to_net",
    pas: "8.5",
  },
  {
    label: "50 000 € Brut/an",
    amount: "50000",
    period: "annual",
    status: "cadre",
    direction: "brut_to_net",
    pas: "10",
  },
];

export default function SalaryCalculator() {
  const amountId = useId();
  const pasId = useId();

  const [direction, setDirection] = useState<Direction>("brut_to_net");
  const [period, setPeriod] = useState<Period>("monthly");
  const [status, setStatus] = useState<StatusKey>("non_cadre");
  const [amountStr, setAmountStr] = useState<string>("2500");
  const [pasRateStr, setPasRateStr] = useState<string>("4.0");
  const [workTimePct, setWorkTimePct] = useState<number>(100);
  const [monthsPerYear, setMonthsPerYear] = useState<12 | 13>(12);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedStatus =
    STATUS_OPTIONS.find((item) => item.key === status) || STATUS_OPTIONS[0];

  const parseVal = (val: string) =>
    parseFloat(val.replace(/\s/g, "").replace(",", ".")) || 0;

  const rawAmount = Math.max(0, parseVal(amountStr));
  const pasRate = Math.min(45, Math.max(0, parseVal(pasRateStr)));
  const chargeFactor = selectedStatus.chargeRate / 100;
  const timeFactor = workTimePct / 100;

  // Convert input into full-time equivalent period amount, then normalize to monthly & annual
  const effectiveAmount = rawAmount * timeFactor;

  let monthlyBrut = 0;
  let monthlyNetBeforeTax = 0;

  if (direction === "brut_to_net") {
    monthlyBrut = period === "monthly" ? effectiveAmount : effectiveAmount / monthsPerYear;
    monthlyNetBeforeTax = monthlyBrut * (1 - chargeFactor);
  } else {
    monthlyNetBeforeTax = period === "monthly" ? effectiveAmount : effectiveAmount / monthsPerYear;
    monthlyBrut = monthlyNetBeforeTax / (1 - chargeFactor);
  }

  const monthlyCotisations = monthlyBrut - monthlyNetBeforeTax;
  const monthlyImpot = monthlyNetBeforeTax * (pasRate / 100);
  const monthlyNetAfterTax = monthlyNetBeforeTax - monthlyImpot;

  const annualBrut = monthlyBrut * monthsPerYear;
  const annualNetBeforeTax = monthlyNetBeforeTax * monthsPerYear;
  const annualNetAfterTax = monthlyNetAfterTax * monthsPerYear;
  const annualCotisations = monthlyCotisations * monthsPerYear;
  const hourlyNet = (monthlyNetBeforeTax / 151.67) * (100 / Math.max(10, workTimePct));

  const formatEuro = (val: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const handleReset = () => {
    setDirection("brut_to_net");
    setPeriod("monthly");
    setStatus("non_cadre");
    setAmountStr("2500");
    setPasRateStr("4.0");
    setWorkTimePct(100);
    setMonthsPerYear(12);
    setCopiedKey(null);
  };

  const copySummary = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore clipboard fallback
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fullSummaryText = `Simulation Salaire France (${selectedStatus.label}, base ${monthsPerYear} mois, ${workTimePct}%) :
- Brut Mensuel : ${formatEuro(monthlyBrut)} | Brut Annuel : ${formatEuro(annualBrut)}
- Net Mensuel avant impôt : ${formatEuro(monthlyNetBeforeTax)} | Annuel : ${formatEuro(annualNetBeforeTax)}
- Net Mensuel après impôt (PAS ${pasRate}%) : ${formatEuro(monthlyNetAfterTax)}`;

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Direction Toggle */}
          <div className="inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setDirection("brut_to_net")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                direction === "brut_to_net"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Brut → Net</span>
            </button>
            <button
              type="button"
              onClick={() => setDirection("net_to_brut")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                direction === "net_to_brut"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Net → Brut</span>
            </button>
          </div>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                period === "monthly"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setPeriod("annual")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                period === "annual"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 active:scale-95 lg:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Exemples rapides :
        </span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setDirection(preset.direction);
              setPeriod(preset.period);
              setStatus(preset.status);
              setAmountStr(preset.amount);
              setPasRateStr(preset.pas);
              setWorkTimePct(100);
            }}
            className="rounded-lg border border-indigo-200/80 bg-indigo-50/70 px-2.5 py-1 text-xs font-medium text-indigo-800 transition hover:bg-indigo-100 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Inputs & Status Selector */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Input Salary */}
        <div className="space-y-2 lg:col-span-5">
          <label
            htmlFor={amountId}
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            Salaire {direction === "brut_to_net" ? "Brut" : "Net"}{" "}
            {period === "monthly" ? "Mensuel" : "Annuel"}
          </label>
          <div className="relative rounded-2xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
              <Euro className="h-5 w-5" />
            </div>
            <input
              id={amountId}
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="Ex: 2500"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 pl-11 pr-14 text-lg font-bold text-neutral-900 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-neutral-400">
              {period === "monthly" ? "€ / mois" : "€ / an"}
            </div>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-neutral-500">
            <Info className="h-3 w-3 text-neutral-400" />
            Mise à jour instantanée sans rechargement.
          </p>
        </div>

        {/* Status Buttons */}
        <div className="space-y-2 lg:col-span-7">
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Statut Professionnel (France 2026)
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {STATUS_OPTIONS.map((opt) => {
              const active = status === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setStatus(opt.key)}
                  className={`flex flex-col items-start rounded-2xl border p-3 text-left transition cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-100"
                  }`}
                >
                  <span className="text-xs font-bold">{opt.label}</span>
                  <span
                    className={`mt-1 text-[11px] ${
                      active ? "text-indigo-100" : "text-neutral-500"
                    }`}
                  >
                    {opt.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advanced Options: PAS, Time %, 12/13 Months */}
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor={pasId}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-700"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600" />
            <span>Prélèvement à la source (%)</span>
          </label>
          <input
            id={pasId}
            type="number"
            step="0.5"
            min="0"
            max="45"
            value={pasRateStr}
            onChange={(e) => setPasRateStr(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-bold text-neutral-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <span className="block text-xs font-bold text-neutral-700">
            Temps de travail ({workTimePct} %)
          </span>
          <div className="mt-1.5 flex gap-1.5">
            {[100, 80, 50].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setWorkTimePct(pct)}
                className={`flex-1 rounded-xl border py-2 text-xs font-bold transition cursor-pointer ${
                  workTimePct === pct
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-xs font-bold text-neutral-700">
            Mois de versement / an
          </span>
          <div className="mt-1.5 flex gap-1.5">
            {([12, 13] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonthsPerYear(m)}
                className={`flex-1 rounded-xl border py-2 text-xs font-bold transition cursor-pointer ${
                  monthsPerYear === m
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {m} mois
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Results Panel */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        <div className="flex flex-col gap-3 border-b border-neutral-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Estimation de Rémunération ({selectedStatus.label})
            </h3>
          </div>

          <button
            type="button"
            onClick={() => copySummary(fullSummaryText, "all")}
            className="inline-flex items-center gap-1.5 self-start rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 sm:self-auto cursor-pointer"
          >
            {copiedKey === "all" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copier le récapitulatif</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 divide-y divide-neutral-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* Card 1: Net Avant Impôt */}
          <div className="p-6">
            <span className="text-xs font-semibold text-neutral-400">
              Salaire Net Avant Impôt
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400">
              {formatEuro(monthlyNetBeforeTax)}
              <span className="text-xs font-medium text-neutral-400"> /mois</span>
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              Soit <strong>{formatEuro(annualNetBeforeTax)}</strong> / an
            </div>
            <div className="mt-3 text-[11px] text-neutral-500">
              Taux horaire net estimé : {formatEuro(hourlyNet)}/h
            </div>
          </div>

          {/* Card 2: Net Après Impôt (PAS) */}
          <div className="bg-indigo-950/30 p-6">
            <span className="text-xs font-semibold text-indigo-300">
              Salaire Net Payé (Après Impôt {pasRate}%)
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-white">
              {formatEuro(monthlyNetAfterTax)}
              <span className="text-xs font-medium text-neutral-400"> /mois</span>
            </div>
            <div className="mt-1 text-xs text-neutral-300">
              Soit <strong>{formatEuro(annualNetAfterTax)}</strong> / an
            </div>
            <div className="mt-3 text-[11px] text-indigo-300">
              Impôt prélevé : {formatEuro(monthlyImpot)}/mois
            </div>
          </div>

          {/* Card 3: Brut & Cotisations */}
          <div className="p-6">
            <span className="text-xs font-semibold text-neutral-400">
              Salaire Brut &amp; Cotisations ({selectedStatus.chargeRate}%)
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-400">
              {formatEuro(monthlyBrut)}
              <span className="text-xs font-medium text-neutral-400"> /mois</span>
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              Brut annuel : <strong>{formatEuro(annualBrut)}</strong>
            </div>
            <div className="mt-3 text-[11px] text-neutral-500">
              Cotisations salariales : {formatEuro(monthlyCotisations)}/mois (
              {formatEuro(annualCotisations)}/an)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
