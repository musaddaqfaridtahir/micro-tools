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

type FrenchPctMode = "soldes" | "simple" | "evolution";

const SOLDES_PRESETS = [10, 20, 30, 50];

const QUICK_EXAMPLES: Array<{
  label: string;
  mode: FrenchPctMode;
  a: string;
  b: string;
}> = [
  { label: "Soldes -30 % sur 120 €", mode: "soldes", a: "120", b: "30" },
  { label: "Soldes -50 % sur 89,90 €", mode: "soldes", a: "89.90", b: "50" },
  { label: "20 % de 450 €", mode: "simple", a: "20", b: "450" },
  { label: "Évolution 1 800 → 2 070 €", mode: "evolution", a: "1800", b: "2070" },
];

export default function FrenchPercentageCalculator() {
  const inputAId = useId();
  const inputBId = useId();

  const [mode, setMode] = useState<FrenchPctMode>("soldes");
  const [valAStr, setValAStr] = useState<string>("120");
  const [valBStr, setValBStr] = useState<string>("30");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseVal = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const numA = parseVal(valAStr);
  const numB = parseVal(valBStr);

  const fmtEuro = (val: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const fmtNum = (val: number) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);

  let mainTitle = "";
  let mainDisplay = "";
  let mainCopy = "";
  let subTitle = "";
  let subDisplay = "";
  let subCopy = "";
  let formulaInfo = "";

  if (mode === "soldes") {
    const discountRate = Math.max(0, numB);
    const saved = numA * (discountRate / 100);
    const finalPrice = numA - saved;
    mainTitle = `Prix final après remise (-${fmtNum(discountRate)} %)`;
    mainDisplay = fmtEuro(finalPrice);
    mainCopy = finalPrice.toFixed(2);
    subTitle = "Montant économisé";
    subDisplay = fmtEuro(saved);
    subCopy = saved.toFixed(2);
    formulaInfo = `${fmtEuro(numA)} × (1 - ${fmtNum(discountRate)} / 100) = ${fmtEuro(finalPrice)}`;
  } else if (mode === "simple") {
    const res = (numA / 100) * numB;
    mainTitle = `${fmtNum(numA)} % de ${fmtNum(numB)}`;
    mainDisplay = fmtNum(res);
    mainCopy = res.toFixed(2);
    subTitle = "Valeur restante (100 % - taux)";
    subDisplay = fmtNum(numB - res);
    subCopy = (numB - res).toFixed(2);
    formulaInfo = `(${fmtNum(numB)} × ${fmtNum(numA)}) ÷ 100 = ${fmtNum(res)}`;
  } else {
    const diff = numB - numA;
    const pct = numA !== 0 ? (diff / numA) * 100 : 0;
    const sign = pct > 0 ? "+" : "";
    mainTitle = "Taux d'évolution entre les deux valeurs";
    mainDisplay = `${sign}${fmtNum(pct)} %`;
    mainCopy = pct.toFixed(2);
    subTitle = diff >= 0 ? "Augmentation absolue" : "Baisse absolue";
    subDisplay = `${diff > 0 ? "+" : ""}${fmtNum(diff)}`;
    subCopy = diff.toFixed(2);
    formulaInfo =
      numA !== 0
        ? `((${fmtNum(numB)} - ${fmtNum(numA)}) ÷ ${fmtNum(numA)}) × 100 = ${sign}${fmtNum(pct)} %`
        : "La valeur initiale ne peut pas être égale à 0.";
  }

  const switchMode = (next: FrenchPctMode) => {
    setMode(next);
    if (next === "soldes") {
      setValAStr("120");
      setValBStr("30");
    } else if (next === "simple") {
      setValAStr("20");
      setValBStr("450");
    } else {
      setValAStr("1800");
      setValBStr("2070");
    }
  };

  const handleReset = () => {
    switchMode("soldes");
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
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Mode Selector + Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            Type de calcul
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5 rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("soldes")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "soldes"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              <span>Remise / Soldes</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("simple")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "simple"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Percent className="h-3.5 w-3.5" />
              <span>Pourcentage d&apos;un nombre</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("evolution")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "evolution"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Évolution (% hausse / baisse)</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Exemples rapides :
        </span>
        {QUICK_EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => {
              setMode(ex.mode);
              setValAStr(ex.a);
              setValBStr(ex.b);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Calculator Grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Inputs */}
        <div className="space-y-5 lg:col-span-6">
          <div>
            <label
              htmlFor={inputAId}
              className="block text-sm font-semibold text-neutral-800"
            >
              {mode === "soldes"
                ? "Prix initial avant remise (€)"
                : mode === "simple"
                ? "Pourcentage à calculer (%)"
                : "Valeur initiale (de départ)"}
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
              {mode === "soldes"
                ? "Pourcentage de réduction / soldes (%)"
                : mode === "simple"
                ? "Montant ou nombre total"
                : "Valeur finale (d'arrivée)"}
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

            {mode === "soldes" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {SOLDES_PRESETS.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setValBStr(String(pct))}
                    className={`rounded-xl border px-3.5 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                      parseVal(valBStr) === pct
                        ? "border-violet-600 bg-violet-50 text-violet-700 ring-1 ring-violet-500/20"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-violet-300"
                    }`}
                  >
                    -{pct} %
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50 p-3.5 text-xs text-neutral-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
            <p className="font-mono">{formulaInfo}</p>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 sm:p-6 lg:col-span-6">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Percent className="h-3.5 w-3.5 text-violet-600" />
              Résultat instantané
            </span>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-violet-500/30 bg-white p-4 shadow-sm ring-1 ring-violet-500/10">
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    {mainTitle}
                  </span>
                  <div className="mt-0.5 text-3xl font-black tracking-tight text-violet-700">
                    {mainDisplay}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(mainCopy, "main")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "main" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4">
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    {subTitle}
                  </span>
                  <div className="mt-0.5 text-2xl font-extrabold text-emerald-700">
                    {subDisplay}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(subCopy, "sub")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "sub" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copié</span>
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

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-600">
            Détail : <span className="font-semibold text-neutral-900">{formulaInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
