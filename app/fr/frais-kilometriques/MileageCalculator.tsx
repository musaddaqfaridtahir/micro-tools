"use client";

import React, { useState, useId } from "react";
import {
  Car,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Info,
  Gauge,
} from "lucide-react";

type HorsePower = 3 | 4 | 5 | 6 | 7;

interface BaremeRow {
  cv: HorsePower;
  label: string;
  rateLow: number;
  rateMidCoef: number;
  rateMidFixed: number;
  rateHigh: number;
}

const BAREME_AUTO_2026: BaremeRow[] = [
  { cv: 3, label: "3 CV et moins", rateLow: 0.529, rateMidCoef: 0.316, rateMidFixed: 1065, rateHigh: 0.37 },
  { cv: 4, label: "4 CV", rateLow: 0.606, rateMidCoef: 0.34, rateMidFixed: 1330, rateHigh: 0.407 },
  { cv: 5, label: "5 CV", rateLow: 0.636, rateMidCoef: 0.357, rateMidFixed: 1395, rateHigh: 0.427 },
  { cv: 6, label: "6 CV", rateLow: 0.665, rateMidCoef: 0.374, rateMidFixed: 1457, rateHigh: 0.447 },
  { cv: 7, label: "7 CV et plus", rateLow: 0.697, rateMidCoef: 0.394, rateMidFixed: 1515, rateHigh: 0.47 },
];

const QUICK_PRESETS: Array<{
  label: string;
  km: string;
  cv: HorsePower;
  electric: boolean;
}> = [
  { label: "3 500 km • 4 CV", km: "3500", cv: 4, electric: false },
  { label: "8 500 km • 5 CV", km: "8500", cv: 5, electric: false },
  { label: "12 000 km • 5 CV Électrique (+20%)", km: "12000", cv: 5, electric: true },
  { label: "22 000 km • 6 CV", km: "22000", cv: 6, electric: false },
];

export default function MileageCalculator() {
  const kmId = useId();
  const [kmStr, setKmStr] = useState<string>("8500");
  const [cv, setCv] = useState<HorsePower>(5);
  const [isElectric, setIsElectric] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const km = Math.max(0, parseFloat(kmStr.replace(/\s/g, "").replace(",", ".")) || 0);
  const row = BAREME_AUTO_2026.find((r) => r.cv === cv) || BAREME_AUTO_2026[2];

  let bracketLabel = "Tranche 1 (≤ 5 000 km)";
  let formulaStr = `${km.toLocaleString("fr-FR")} × ${row.rateLow.toFixed(3)}`;
  let baseAmount = 0;

  if (km <= 5000) {
    baseAmount = km * row.rateLow;
    bracketLabel = "Tranche 1 (jusqu'à 5 000 km)";
    formulaStr = `${km.toLocaleString("fr-FR")} km × ${row.rateLow.toFixed(3).replace(".", ",")}`;
  } else if (km <= 20000) {
    baseAmount = km * row.rateMidCoef + row.rateMidFixed;
    bracketLabel = "Tranche 2 (de 5 001 à 20 000 km)";
    formulaStr = `(${km.toLocaleString("fr-FR")} km × ${row.rateMidCoef.toFixed(3).replace(".", ",")}) + ${row.rateMidFixed} €`;
  } else {
    baseAmount = km * row.rateHigh;
    bracketLabel = "Tranche 3 (plus de 20 000 km)";
    formulaStr = `${km.toLocaleString("fr-FR")} km × ${row.rateHigh.toFixed(3).replace(".", ",")}`;
  }

  const electricBonus = isElectric ? baseAmount * 0.2 : 0;
  const totalDeductible = baseAmount + electricBonus;
  const costPerKm = km > 0 ? totalDeductible / km : 0;

  const formatEuro = (v: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);

  const handleReset = () => {
    setKmStr("8500");
    setCv(5);
    setIsElectric(false);
    setCopied(false);
  };

  const copySummary = async () => {
    const text = `Frais Kilométriques France 2026 (${km} km, ${row.label}${isElectric ? ", Électrique +20%" : ""}) :
- Montant déductible total : ${formatEuro(totalDeductible)}
- Formule appliquée : ${formulaStr}${isElectric ? " (+ 20%)" : ""}
- Coût moyen retenu par km : ${costPerKm.toFixed(3).replace(".", ",")} € / km`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Barème Fiscal Kilométrique Automobile
          </span>
          <p className="mt-0.5 text-xs text-neutral-500">
            Calculez vos indemnités kilométriques ou frais réels déductibles d&apos;impôts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 sm:self-auto cursor-pointer"
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
              setKmStr(preset.km);
              setCv(preset.cv);
              setIsElectric(preset.electric);
            }}
            className="rounded-lg border border-teal-200/80 bg-teal-50/70 px-2.5 py-1 text-xs font-medium text-teal-800 transition hover:bg-teal-100 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Distance */}
        <div className="space-y-2 lg:col-span-5">
          <label
            htmlFor={kmId}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            <Gauge className="h-4 w-4 text-teal-600" />
            <span>Distance annuelle parcourue (km)</span>
          </label>
          <div className="relative rounded-2xl shadow-xs">
            <input
              id={kmId}
              type="text"
              inputMode="decimal"
              value={kmStr}
              onChange={(e) => setKmStr(e.target.value)}
              placeholder="Ex: 8500"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 pl-4 pr-14 text-lg font-bold text-neutral-900 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-neutral-400">
              km / an
            </div>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-neutral-500">
            <Info className="h-3 w-3 text-neutral-400" />
            Inclut déplacements domicile-travail et trajets professionnels.
          </p>
        </div>

        {/* Puissance Fiscale */}
        <div className="space-y-2 lg:col-span-7">
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Puissance administrative du véhicule (Certificat d&apos;immatriculation P.6)
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {BAREME_AUTO_2026.map((item) => {
              const active = cv === item.cv;
              return (
                <button
                  key={item.cv}
                  type="button"
                  onClick={() => setCv(item.cv)}
                  className={`rounded-2xl border py-3 px-2 text-center text-xs font-bold transition cursor-pointer ${
                    active
                      ? "border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-500/20"
                      : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <label className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 text-xs font-semibold text-emerald-900 cursor-pointer">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span>Véhicule 100 % électrique (Majoration légale +20 %)</span>
            </span>
            <input
              type="checkbox"
              checked={isElectric}
              onChange={(e) => setIsElectric(e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600"
            />
          </label>
        </div>
      </div>

      {/* Results Dark Panel */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        <div className="flex flex-col gap-3 border-b border-neutral-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-teal-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Indemnités Kilométriques Estimées ({bracketLabel})
            </h3>
          </div>
          <button
            type="button"
            onClick={copySummary}
            className="inline-flex items-center gap-1.5 self-start rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 sm:self-auto cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copier le résultat</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 divide-y divide-neutral-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="bg-teal-950/30 p-6">
            <span className="text-xs font-semibold text-teal-300">
              Total Frais Kilométriques Déductibles
            </span>
            <div className="mt-2 text-3xl font-black text-emerald-400">
              {formatEuro(totalDeductible)}
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              Formule : <span className="font-mono">{formulaStr}</span>
            </div>
          </div>

          <div className="p-6">
            <span className="text-xs font-semibold text-neutral-400">
              Indemnité au kilomètre
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-white">
              {costPerKm.toFixed(3).replace(".", ",")} €/km
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              {row.label} sur {km.toLocaleString("fr-FR")} km/an
            </div>
          </div>

          <div className="p-6">
            <span className="text-xs font-semibold text-neutral-400">
              Majoration Véhicule Électrique (+20%)
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-400">
              {isElectric ? `+ ${formatEuro(electricBonus)}` : "0,00 €"}
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              {isElectric
                ? "Bonus écologique fiscal activé"
                : "Activez l'option si véhicule 100% électrique"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
