"use client";

import React, { useState, useId } from "react";
import {
  Scale,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Info,
  CheckCircle2,
} from "lucide-react";

type DreisatzMode = "proportional" | "antiproportional";

const QUICK_EXAMPLES: Array<{
  label: string;
  mode: DreisatzMode;
  a: string;
  b: string;
  c: string;
  unitA: string;
  unitB: string;
}> = [
  {
    label: "5 kg Äpfel → 12 € (8 kg?)",
    mode: "proportional",
    a: "5",
    b: "12",
    c: "8",
    unitA: "kg",
    unitB: "€",
  },
  {
    label: "4 Maler → 12 Std. (6 Maler?)",
    mode: "antiproportional",
    a: "4",
    b: "12",
    c: "6",
    unitA: "Maler",
    unitB: "Std.",
  },
  {
    label: "100 % = 240 € (15 % Rabatt)",
    mode: "proportional",
    a: "100",
    b: "240",
    c: "15",
    unitA: "%",
    unitB: "€",
  },
  {
    label: "80 km/h → 3 Std. (120 km/h?)",
    mode: "antiproportional",
    a: "80",
    b: "3",
    c: "120",
    unitA: "km/h",
    unitB: "Std.",
  },
];

export default function DreisatzCalculator() {
  const inputAId = useId();
  const inputBId = useId();
  const inputCId = useId();

  const [mode, setMode] = useState<DreisatzMode>("proportional");
  const [valAStr, setValAStr] = useState<string>("5");
  const [valBStr, setValBStr] = useState<string>("12");
  const [valCStr, setValCStr] = useState<string>("8");
  const [unitA, setUnitA] = useState<string>("Einheiten");
  const [unitB, setUnitB] = useState<string>("€");
  const [copied, setCopied] = useState<boolean>(false);

  const parseNum = (s: string) => parseFloat(s.replace(/\s/g, "").replace(",", "."));

  const numA = parseNum(valAStr);
  const numB = parseNum(valBStr);
  const numC = parseNum(valCStr);

  const validNumbers = !isNaN(numA) && !isNaN(numB) && !isNaN(numC);

  let stepOneVal: number | null = null;
  let resultX: number | null = null;
  let divZeroError = false;

  if (validNumbers) {
    if (mode === "proportional") {
      if (numA === 0) {
        divZeroError = true;
      } else {
        stepOneVal = numB / numA;
        resultX = stepOneVal * numC;
      }
    } else {
      if (numC === 0 || numA === 0) {
        divZeroError = true;
      } else {
        stepOneVal = numA * numB;
        resultX = stepOneVal / numC;
      }
    }
  }

  const fmt = (n: number) =>
    n.toLocaleString("de-DE", { maximumFractionDigits: 4 });

  const handleReset = () => {
    setMode("proportional");
    setValAStr("5");
    setValBStr("12");
    setValCStr("8");
    setUnitA("Einheiten");
    setUnitB("€");
    setCopied(false);
  };

  const copyResult = async () => {
    if (resultX === null) return;
    const summary =
      mode === "proportional"
        ? `Direkter Dreisatz: ${valAStr} ${unitA} = ${valBStr} ${unitB} → ${valCStr} ${unitA} = ${fmt(resultX)} ${unitB}`
        : `Indirekter Dreisatz: ${valAStr} ${unitA} = ${valBStr} ${unitB} → ${valCStr} ${unitA} = ${fmt(resultX)} ${unitB}`;
    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      // ignore clipboard fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Mode Switcher & Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            Dreisatz-Typ auswählen
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("proportional")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "proportional"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Proportional (Direkt)
            </button>
            <button
              type="button"
              onClick={() => setMode("antiproportional")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "antiproportional"
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Antiproportional (Indirekt)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>Zurücksetzen</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Schnell-Beispiele:
        </span>
        {QUICK_EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => {
              setMode(ex.mode);
              setValAStr(ex.a);
              setValBStr(ex.b);
              setValCStr(ex.c);
              setUnitA(ex.unitA);
              setUnitB(ex.unitB);
            }}
            className="rounded-lg border border-violet-200/80 bg-violet-50/70 px-2.5 py-1 text-xs font-medium text-violet-900 transition hover:bg-violet-100 cursor-pointer"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* 2x2 Input Grid */}
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-5 sm:p-7">
        <div className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500">
          {mode === "proportional"
            ? "Je mehr von Größe A, desto mehr von Größe B"
            : "Je mehr von Größe A, desto weniger von Größe B"}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* A */}
          <div className="space-y-1.5">
            <label
              htmlFor={inputAId}
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              Ausgangsgröße A ({unitA})
            </label>
            <input
              id={inputAId}
              type="text"
              inputMode="decimal"
              value={valAStr}
              onChange={(e) => setValAStr(e.target.value)}
              placeholder="z.B. 5"
              className="block w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3.5 text-lg font-bold text-neutral-900 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition"
            />
          </div>

          {/* B */}
          <div className="space-y-1.5">
            <label
              htmlFor={inputBId}
              className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              <span>Entspricht Größe B ({unitB})</span>
              <ArrowRight className="hidden h-3.5 w-3.5 text-violet-600 md:inline" />
            </label>
            <input
              id={inputBId}
              type="text"
              inputMode="decimal"
              value={valBStr}
              onChange={(e) => setValBStr(e.target.value)}
              placeholder="z.B. 12"
              className="block w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3.5 text-lg font-bold text-neutral-900 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition"
            />
          </div>

          {/* C */}
          <div className="space-y-1.5">
            <label
              htmlFor={inputCId}
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              Gesuchte Menge C ({unitA})
            </label>
            <input
              id={inputCId}
              type="text"
              inputMode="decimal"
              value={valCStr}
              onChange={(e) => setValCStr(e.target.value)}
              placeholder="z.B. 8"
              className="block w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3.5 text-lg font-bold text-neutral-900 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition"
            />
          </div>

          {/* Result X Box */}
          <div className="space-y-1.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-violet-700">
              Ergebnis X ({unitB})
            </span>
            <div className="flex items-center justify-between rounded-2xl border-2 border-violet-500 bg-neutral-900 px-4 py-3 text-white shadow-md">
              <span translate="no" className="notranslate text-2xl font-black text-emerald-400">
                {divZeroError
                  ? "Fehler (÷ 0)"
                  : resultX !== null
                  ? `${fmt(resultX)} ${unitB}`
                  : "—"}
              </span>
              <button
                type="button"
                onClick={copyResult}
                disabled={resultX === null}
                className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 disabled:opacity-40 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Kopieren</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-500">
          <Info className="h-3.5 w-3.5 text-neutral-400" />
          Sofortige Live-Berechnung mit vollständiger Aufschlüsselung der drei Rechenschritte.
        </p>
      </div>

      {/* Live 3-Step Lösungsweg Breakdown */}
      {!divZeroError && resultX !== null && stepOneVal !== null && (
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
            <Scale className="h-4 w-4 text-violet-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Lösungsweg Schritt für Schritt ({mode === "proportional" ? "Proportional" : "Antiproportional"})
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-800/60 p-4">
              <span className="text-[11px] font-bold uppercase text-violet-300">
                1. Satz: Ausgangslage
              </span>
              <div translate="no" className="notranslate mt-2 font-mono text-sm font-bold text-white">
                {fmt(numA)} {unitA} ➔ {fmt(numB)} {unitB}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-800/60 p-4">
              <span className="text-[11px] font-bold uppercase text-violet-300">
                2. Satz: Auf 1 Einheit umrechnen
              </span>
              <div translate="no" className="notranslate mt-2 font-mono text-sm font-bold text-white">
                1 {unitA} ➔ {fmt(stepOneVal)} {unitB}
              </div>
              <div translate="no" className="notranslate mt-1 text-[11px] text-neutral-400 font-mono">
                {mode === "proportional"
                  ? `(${fmt(numB)} ÷ ${fmt(numA)})`
                  : `(${fmt(numA)} × ${fmt(numB)})`}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-700/60 bg-emerald-950/30 p-4">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                3. Satz: Zielwert ermitteln
              </span>
              <div translate="no" className="notranslate mt-2 font-mono text-sm font-bold text-emerald-300">
                {fmt(numC)} {unitA} ➔ {fmt(resultX)} {unitB}
              </div>
              <div translate="no" className="notranslate mt-1 text-[11px] text-emerald-200/80 font-mono">
                {mode === "proportional"
                  ? `(${fmt(stepOneVal)} × ${fmt(numC)})`
                  : `(${fmt(stepOneVal)} ÷ ${fmt(numC)})`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
