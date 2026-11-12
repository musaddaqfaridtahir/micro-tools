"use client";

import React, { useState, useId } from "react";
import {
  Percent,
  Copy,
  Check,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Info,
} from "lucide-react";

type ProzentMode = "wert" | "satz" | "rabatt";

const QUICK_PRESETS: Array<{
  label: string;
  mode: ProzentMode;
  a: string;
  b: string;
  subOp?: "discount" | "increase";
}> = [
  { label: "19 % von 250 €", mode: "wert", a: "19", b: "250" },
  { label: "45 € von 180 € in %", mode: "satz", a: "45", b: "180" },
  { label: "25 % Rabatt auf 120 €", mode: "rabatt", a: "120", b: "25", subOp: "discount" },
  { label: "+8 % Aufschlag auf 1.500 €", mode: "rabatt", a: "1500", b: "8", subOp: "increase" },
];

const RABATT_PILLS = [10, 15, 20, 25, 30, 50];

export default function ProzentCalculator() {
  const fieldAId = useId();
  const fieldBId = useId();

  const [mode, setMode] = useState<ProzentMode>("wert");
  const [subOp, setSubOp] = useState<"discount" | "increase">("discount");
  const [valAStr, setValAStr] = useState<string>("19");
  const [valBStr, setValBStr] = useState<string>("250");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseNum = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const numA = parseNum(valAStr);
  const numB = parseNum(valBStr);

  const fmtNum = (val: number) =>
    new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);

  const fmtEuro = (val: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  let primaryLabel = "";
  let primaryValue = "";
  let primaryRawCopy = "";
  let secondaryLabel = "";
  let secondaryValue = "";
  let formulaLine = "";

  if (mode === "wert") {
    // numA % von numB
    const wert = (numA / 100) * numB;
    primaryLabel = `Prozentwert (${fmtNum(numA)} % von ${fmtNum(numB)})`;
    primaryValue = fmtNum(wert);
    primaryRawCopy = wert.toFixed(2);
    secondaryLabel = `Restbetrag (100 % − ${fmtNum(numA)} %)`;
    secondaryValue = fmtNum(numB - wert);
    formulaLine = `W = (${fmtNum(numB)} × ${fmtNum(numA)}) ÷ 100 = ${fmtNum(wert)}`;
  } else if (mode === "satz") {
    // numA ist wie viel % von numB?
    const satz = numB !== 0 ? (numA / numB) * 100 : 0;
    primaryLabel = `Prozentsatz (${fmtNum(numA)} von ${fmtNum(numB)})`;
    primaryValue = `${fmtNum(satz)} %`;
    primaryRawCopy = satz.toFixed(2);
    secondaryLabel = "Differenz zum Grundwert (100 %)";
    secondaryValue = `${fmtNum(numB - numA)} (${fmtNum(100 - satz)} %)`;
    formulaLine =
      numB !== 0
        ? `p = (${fmtNum(numA)} ÷ ${fmtNum(numB)}) × 100 = ${fmtNum(satz)} %`
        : "Grundwert darf nicht 0 sein.";
  } else {
    // Mode 3: Rabatt / Aufschlag — numA = Ausgangspreis (€), numB = Prozentsatz (%)
    const diffEuro = numA * (numB / 100);
    const endPreis = subOp === "discount" ? numA - diffEuro : numA + diffEuro;
    primaryLabel =
      subOp === "discount"
        ? `Endpreis nach -${fmtNum(numB)} % Rabatt`
        : `Neuer Preis nach +${fmtNum(numB)} % Aufschlag`;
    primaryValue = fmtEuro(endPreis);
    primaryRawCopy = endPreis.toFixed(2);
    secondaryLabel =
      subOp === "discount" ? "Ihre Ersparnis in Euro" : "Aufschlagsbetrag in Euro";
    secondaryValue = fmtEuro(diffEuro);
    formulaLine =
      subOp === "discount"
        ? `${fmtEuro(numA)} × (1 − ${fmtNum(numB)} / 100) = ${fmtEuro(endPreis)}`
        : `${fmtEuro(numA)} × (1 + ${fmtNum(numB)} / 100) = ${fmtEuro(endPreis)}`;
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleReset = () => {
    setMode("wert");
    setSubOp("discount");
    setValAStr("19");
    setValBStr("250");
    setCopiedKey(null);
  };

  const switchMode = (nextMode: ProzentMode) => {
    setMode(nextMode);
    if (nextMode === "wert") {
      setValAStr("19");
      setValBStr("250");
    } else if (nextMode === "satz") {
      setValAStr("45");
      setValBStr("180");
    } else {
      setSubOp("discount");
      setValAStr("120");
      setValBStr("25");
    }
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Tabs & Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Berechnungsmodus auswählen
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5 rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("wert")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "wert"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              1. Prozentwert (X % von Y)
            </button>
            <button
              type="button"
              onClick={() => switchMode("satz")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "satz"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              2. Prozentsatz (X von Y in %)
            </button>
            <button
              type="button"
              onClick={() => switchMode("rabatt")}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "rabatt"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              3. Veränderung / Rabatt (±%)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Zurücksetzen</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Beispiele:
        </span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setMode(preset.mode);
              if (preset.subOp) setSubOp(preset.subOp);
              setValAStr(preset.a);
              setValBStr(preset.b);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Inputs */}
        <div className="space-y-5 lg:col-span-6">
          {mode === "rabatt" && (
            <div className="inline-flex rounded-xl bg-neutral-100 p-1">
              <button
                type="button"
                onClick={() => setSubOp("discount")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  subOp === "discount"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-neutral-600"
                }`}
              >
                <TrendingDown className="h-3.5 w-3.5" />
                <span>- % Rabatt / Ersparnis</span>
              </button>
              <button
                type="button"
                onClick={() => setSubOp("increase")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  subOp === "increase"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-neutral-600"
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+ % Aufschlag / Erhöhung</span>
              </button>
            </div>
          )}

          <div>
            <label
              htmlFor={fieldAId}
              className="block text-sm font-semibold text-neutral-800"
            >
              {mode === "wert"
                ? "Prozentsatz (%)"
                : mode === "satz"
                ? "Anteil / Prozentwert (X)"
                : "Ausgangspreis / Betrag (€)"}
            </label>
            <input
              id={fieldAId}
              type="text"
              inputMode="decimal"
              value={valAStr}
              onChange={(e) =>
                setValAStr(e.target.value.replace(/[^0-9.,\-\s]/g, ""))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor={fieldBId}
              className="block text-sm font-semibold text-neutral-800"
            >
              {mode === "wert"
                ? "Grundwert (Y)"
                : mode === "satz"
                ? "Gesamtwert / Grundwert (Y)"
                : subOp === "discount"
                ? "Rabatt in Prozent (%)"
                : "Aufschlag in Prozent (%)"}
            </label>
            <input
              id={fieldBId}
              type="text"
              inputMode="decimal"
              value={valBStr}
              onChange={(e) =>
                setValBStr(e.target.value.replace(/[^0-9.,\-\s]/g, ""))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
            {mode === "rabatt" && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {RABATT_PILLS.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setValBStr(String(pct))}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                      parseNum(valBStr) === pct
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {subOp === "discount" ? `-${pct} %` : `+${pct} %`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50 p-3.5 text-xs text-neutral-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <p className="font-mono">{formulaLine}</p>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 sm:p-6 lg:col-span-6">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Percent className="h-3.5 w-3.5 text-indigo-600" />
              Sofortergebnis
            </span>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-white p-4 shadow-sm ring-1 ring-indigo-500/10">
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    {primaryLabel}
                  </span>
                  <div className="mt-0.5 text-3xl font-black tracking-tight text-indigo-700">
                    {primaryValue}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(primaryRawCopy, "primary")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "primary" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Kopiert</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Kopieren</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <span className="text-xs font-semibold text-neutral-500">
                  {secondaryLabel}
                </span>
                <div className="mt-0.5 text-xl font-extrabold text-neutral-900">
                  {secondaryValue}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-600">
            Rechenweg: <span className="font-semibold text-neutral-900">{formulaLine}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
