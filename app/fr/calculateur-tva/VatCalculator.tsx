"use client";

import React, { useState, useId } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Percent,
  Euro,
  ArrowRightLeft,
  Info,
} from "lucide-react";

type Mode = "ht_to_ttc" | "ttc_to_ht";

interface RateOption {
  value: number;
  label: string;
  sublabel: string;
}

const FRENCH_RATES: RateOption[] = [
  { value: 20, label: "20 %", sublabel: "Taux normal" },
  { value: 10, label: "10 %", sublabel: "Taux intermédiaire" },
  { value: 5.5, label: "5,5 %", sublabel: "Taux réduit" },
  { value: 2.1, label: "2,1 %", sublabel: "Taux particulier" },
];

export default function VatCalculator() {
  const inputId = useId();
  const customRateId = useId();

  // Mode: "ht_to_ttc" (HT -> TTC) or "ttc_to_ht" (TTC -> HT)
  const [mode, setMode] = useState<Mode>("ht_to_ttc");
  // Raw amount string
  const [amountStr, setAmountStr] = useState<string>("100");
  // Selected rate (20, 10, 5.5, 2.1, or "custom")
  const [selectedRate, setSelectedRate] = useState<number | "custom">(20);
  const [customRateStr, setCustomRateStr] = useState<string>("8.5");

  // Copy feedback state for each result row
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Parse rate
  const currentRateValue =
    selectedRate === "custom"
      ? parseFloat(customRateStr.replace(",", ".")) || 0
      : selectedRate;

  // Parse amount
  const cleanedAmount = amountStr.replace(/\s/g, "").replace(",", ".");
  const inputAmount = parseFloat(cleanedAmount);
  const isValidAmount = !isNaN(inputAmount) && inputAmount >= 0;

  // Calculation Logic
  let montantHT = 0;
  let montantTVA = 0;
  let montantTTC = 0;

  if (isValidAmount) {
    const rateDecimal = currentRateValue / 100;

    if (mode === "ht_to_ttc") {
      // Input is HT
      montantHT = inputAmount;
      montantTVA = inputAmount * rateDecimal;
      montantTTC = inputAmount + montantTVA;
    } else {
      // Input is TTC
      montantTTC = inputAmount;
      montantHT = inputAmount / (1 + rateDecimal);
      montantTVA = montantTTC - montantHT;
    }
  }

  // Format currency according to French locale: 1 234,56 €
  const formatEuro = (val: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleReset = () => {
    setMode("ht_to_ttc");
    setAmountStr("");
    setSelectedRate(20);
    setCustomRateStr("8.5");
    setCopiedKey(null);
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Controls: Mode Toggle & Reset */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Mode de Calcul
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("ht_to_ttc")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "ht_to_ttc"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>HT vers TTC (Ajouter TVA)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("ttc_to_ht")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "ttc_to_ht"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>TTC vers HT (Extraire TVA)</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 active:scale-95"
          title="Réinitialiser tous les champs"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Main Form: Input Amount + Rate Selector */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Input Montant */}
        <div className="lg:col-span-5 space-y-2">
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            {mode === "ht_to_ttc" ? "Montant Hors Taxes (HT)" : "Montant Toutes Taxes Comprises (TTC)"}
          </label>
          <div className="relative rounded-2xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
              <Euro className="h-5 w-5" />
            </div>
            <input
              id={inputId}
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="Ex: 100,00"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 pl-11 pr-12 text-lg font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-neutral-400">
              EUR €
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 flex items-center gap-1">
            <Info className="h-3 w-3 text-neutral-400" />
            Saisie en temps réel. Utilisez la virgule ou le point pour les centimes.
          </p>
        </div>

        {/* Right: Quick-select TVA rates */}
        <div className="lg:col-span-7 space-y-2">
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Taux de TVA officiel en France
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {FRENCH_RATES.map((rate) => {
              const isSelected = selectedRate === rate.value;
              return (
                <button
                  key={rate.value}
                  type="button"
                  onClick={() => setSelectedRate(rate.value)}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600/20"
                      : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-100"
                  }`}
                >
                  <span className="text-base font-extrabold">{rate.label}</span>
                  <span
                    className={`text-[10px] leading-tight ${
                      isSelected ? "text-blue-100" : "text-neutral-500"
                    }`}
                  >
                    {rate.sublabel}
                  </span>
                </button>
              );
            })}

            {/* Custom Rate Button */}
            <button
              type="button"
              onClick={() => setSelectedRate("custom")}
              className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all ${
                selectedRate === "custom"
                  ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600/20"
                  : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-0.5">
                <Percent className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">Autre</span>
              </div>
              <span
                className={`text-[10px] leading-tight ${
                  selectedRate === "custom" ? "text-blue-100" : "text-neutral-500"
                }`}
              >
                Personnalisé
              </span>
            </button>
          </div>

          {/* If Custom Rate selected, show input */}
          {selectedRate === "custom" && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/50 p-2.5">
              <label
                htmlFor={customRateId}
                className="text-xs font-semibold text-blue-900 shrink-0"
              >
                Taux personnalisé (%) :
              </label>
              <input
                id={customRateId}
                type="text"
                inputMode="decimal"
                value={customRateStr}
                onChange={(e) => setCustomRateStr(e.target.value)}
                placeholder="Ex: 8.5"
                className="w-24 rounded-lg border border-neutral-300 bg-white px-3 py-1 text-sm font-bold text-neutral-900 focus:border-blue-600 focus:outline-none"
              />
              <span className="text-xs text-neutral-500">
                (Ex: 8,5% pour la Corse/DOM-TOM)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Output Results Box */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        <div className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Résultats du Calcul ({currentRateValue} % de TVA)
            </h3>
          </div>
          <span className="text-xs font-medium text-neutral-400">
            {mode === "ht_to_ttc" ? "Base HT renseignée" : "Base TTC renseignée"}
          </span>
        </div>

        <div className="grid grid-cols-1 divide-y divide-neutral-800 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {/* 1. Montant HT */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              1. Montant HT (Hors Taxes)
            </span>
            <div className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {formatEuro(montantHT)}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Prix net</span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(montantHT.toFixed(2), "ht")
                }
                className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 transition hover:bg-neutral-700 hover:text-white"
              >
                {copiedKey === "ht" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Montant de la TVA */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              2. Montant de la TVA ({currentRateValue} %)
            </span>
            <div className="mt-2 text-2xl font-black text-blue-400 sm:text-3xl">
              {formatEuro(montantTVA)}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Taxe collectée</span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(montantTVA.toFixed(2), "tva")
                }
                className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 transition hover:bg-neutral-700 hover:text-white"
              >
                {copiedKey === "tva" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. Montant TTC */}
          <div className="p-6 transition hover:bg-neutral-800/40 bg-neutral-800/20">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              3. Montant TTC (Total)
            </span>
            <div className="mt-2 text-2xl font-black text-emerald-400 sm:text-3xl">
              {formatEuro(montantTTC)}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Total à payer</span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(montantTTC.toFixed(2), "ttc")
                }
                className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 transition hover:bg-neutral-700 hover:text-white"
              >
                {copiedKey === "ttc" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Calculation summary formula banner */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-3 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-mono text-[11px]">
            {mode === "ht_to_ttc" ? (
              <span>
                Formule : TTC = {montantHT.toFixed(2)} € × (1 + {currentRateValue} / 100) = <strong className="text-white">{montantTTC.toFixed(2)} €</strong>
              </span>
            ) : (
              <span>
                Formule : HT = {montantTTC.toFixed(2)} € / (1 + {currentRateValue} / 100) = <strong className="text-white">{montantHT.toFixed(2)} €</strong>
              </span>
            )}
          </div>
          <span className="text-[10px] text-neutral-500">
            Arrondi légal à 2 décimales
          </span>
        </div>
      </div>
    </div>
  );
}
