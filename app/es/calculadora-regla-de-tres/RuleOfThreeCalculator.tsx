"use client";

import React, { useState, useId } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  HelpCircle,
  Equal,
} from "lucide-react";

type ProportionMode = "direct" | "inverse";

export default function RuleOfThreeCalculator() {
  const aId = useId();
  const bId = useId();
  const cId = useId();

  // Mode: "direct" (X = (B * C) / A) or "inverse" (X = (A * B) / C)
  const [mode, setMode] = useState<ProportionMode>("direct");

  // Inputs
  const [valA, setValA] = useState<string>("20");
  const [valB, setValB] = useState<string>("100");
  const [valC, setValC] = useState<string>("50");

  const [copied, setCopied] = useState<boolean>(false);

  // Parse numbers
  const parseNum = (str: string) => {
    const cleaned = str.replace(/\s/g, "").replace(",", ".");
    return parseFloat(cleaned);
  };

  const numA = parseNum(valA);
  const numB = parseNum(valB);
  const numC = parseNum(valC);

  const isValidInputs = !isNaN(numA) && !isNaN(numB) && !isNaN(numC);

  let resultX: number | null = null;
  let hasDivisionByZero = false;

  if (isValidInputs) {
    if (mode === "direct") {
      if (numA === 0) {
        hasDivisionByZero = true;
      } else {
        resultX = (numB * numC) / numA;
      }
    } else {
      if (numC === 0) {
        hasDivisionByZero = true;
      } else {
        resultX = (numA * numB) / numC;
      }
    }
  }

  // Formatting result
  const formatNumber = (num: number) => {
    // If integer, don't show trailing decimals; else up to 4 decimal places
    return num.toLocaleString("es-ES", {
      maximumFractionDigits: 4,
    });
  };

  const handleReset = () => {
    setValA("");
    setValB("");
    setValC("");
    setCopied(false);
  };

  const handleLoadExample = () => {
    setValA("20");
    setValB("100");
    setValC("50");
  };

  const copyToClipboard = async () => {
    if (resultX === null) return;
    const textToCopy = formatNumber(resultX);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Mode Selector & Reset Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Tipo de Proporcionalidad
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("direct")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "direct"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Regla de tres directa</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("inverse")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "inverse"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Regla de tres inversa</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleLoadExample}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
          >
            Cargar ejemplo
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 active:scale-95"
            title="Borrar todos los campos"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
            <span>Borrar datos</span>
          </button>
        </div>
      </div>

      {/* Visual 2x2 Proportion Layout */}
      <div className="mt-8">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {mode === "direct"
              ? "A más valor de A, más valor de B (Proporción Directa)"
              : "A más valor de A, menos valor de B (Proporción Inversa)"}
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* ROW 1: Value A ---> Value B */}
            <div className="space-y-2">
              <label htmlFor={aId} className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Si un valor de (A):
              </label>
              <div className="relative">
                <input
                  id={aId}
                  type="text"
                  inputMode="decimal"
                  value={valA}
                  onChange={(e) => setValA(e.target.value)}
                  placeholder="Ej: 20"
                  className="block w-full rounded-2xl border border-neutral-300 bg-white py-3.5 px-4 text-lg font-bold text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div>
              <span className="text-[11px] text-neutral-500">Primer término conocido</span>
            </div>

            <div className="space-y-2">
              <label htmlFor={bId} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700">
                <span>Produce o equivale a (B):</span>
                <span className="hidden md:flex items-center gap-1 text-[11px] text-blue-600 font-normal">
                  <ArrowRight className="h-3.5 w-3.5" />
                  Relación base
                </span>
              </label>
              <div className="relative">
                <input
                  id={bId}
                  type="text"
                  inputMode="decimal"
                  value={valB}
                  onChange={(e) => setValB(e.target.value)}
                  placeholder="Ej: 100"
                  className="block w-full rounded-2xl border border-neutral-300 bg-white py-3.5 px-4 text-lg font-bold text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div>
              <span className="text-[11px] text-neutral-500">Segundo término conocido</span>
            </div>

            {/* Middle Divider Arrow */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 shadow-sm pointer-events-none">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* ROW 2: Value C ---> Output Box X */}
            <div className="space-y-2">
              <label htmlFor={cId} className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Entonces un valor de (C):
              </label>
              <div className="relative">
                <input
                  id={cId}
                  type="text"
                  inputMode="decimal"
                  value={valC}
                  onChange={(e) => setValC(e.target.value)}
                  placeholder="Ej: 50"
                  className="block w-full rounded-2xl border border-neutral-300 bg-white py-3.5 px-4 text-lg font-bold text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div>
              <span className="text-[11px] text-neutral-500">Tercer término a comparar</span>
            </div>

            {/* Result Box (X) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Producirá un resultado (X):
                </span>
                {resultX !== null && (
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copiar resultado</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 py-3 px-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-800">X =</span>
                  <span className="text-2xl font-black text-emerald-900 sm:text-3xl">
                    {hasDivisionByZero ? (
                      <span className="text-sm text-red-600 font-semibold">
                        División entre 0 no válida
                      </span>
                    ) : resultX !== null ? (
                      formatNumber(resultX)
                    ) : (
                      <span className="text-neutral-400 text-lg font-normal">
                        Esperando datos...
                      </span>
                    )}
                  </span>
                </div>

                <div className="rounded-xl bg-emerald-600 p-2 text-white shadow-2xs">
                  <Equal className="h-5 w-5" />
                </div>
              </div>
              <span className="text-[11px] text-neutral-500">
                Resultado calculado en tiempo real
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Dynamic Formula Resolution Box */}
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-900 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Resolución Paso a Paso de la Fórmula
            </h3>
          </div>
          <span className="text-[11px] text-blue-400 font-mono">
            {mode === "direct" ? "Fórmula: X = (B × C) / A" : "Fórmula: X = (A × B) / C"}
          </span>
        </div>

        {isValidInputs && !hasDivisionByZero && resultX !== null ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="rounded-xl bg-neutral-800/60 p-4 border border-neutral-800">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Paso 1: Multiplicar
                </span>
                <div className="mt-1 font-mono text-sm text-white">
                  {mode === "direct" ? (
                    <>
                      {numB} × {numC} ={" "}
                      <strong className="text-blue-400">{formatNumber(numB * numC)}</strong>
                    </>
                  ) : (
                    <>
                      {numA} × {numB} ={" "}
                      <strong className="text-blue-400">{formatNumber(numA * numB)}</strong>
                    </>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-neutral-500">
                  {mode === "direct" ? "Multiplicación cruzada (B × C)" : "Multiplicación horizontal (A × B)"}
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl bg-neutral-800/60 p-4 border border-neutral-800">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Paso 2: Dividir
                </span>
                <div className="mt-1 font-mono text-sm text-white">
                  {mode === "direct" ? (
                    <>
                      {formatNumber(numB * numC)} ÷ {numA} ={" "}
                      <strong className="text-emerald-400">{formatNumber(resultX)}</strong>
                    </>
                  ) : (
                    <>
                      {formatNumber(numA * numB)} ÷ {numC} ={" "}
                      <strong className="text-emerald-400">{formatNumber(resultX)}</strong>
                    </>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-neutral-500">
                  {mode === "direct" ? "División entre el valor opuesto (A)" : "División entre el valor de referencia (C)"}
                </p>
              </div>
            </div>

            {/* Full equation banner */}
            <div className="rounded-xl bg-neutral-950 p-4 font-mono text-xs sm:text-sm text-neutral-300 flex flex-wrap items-center justify-between gap-2 border border-neutral-800">
              <div>
                X = (
                {mode === "direct" ? (
                  <>
                    <span className="text-blue-400">{numB}</span> ×{" "}
                    <span className="text-blue-400">{numC}</span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-400">{numA}</span> ×{" "}
                    <span className="text-blue-400">{numB}</span>
                  </>
                )}
                ) /{" "}
                <span className="text-amber-400">
                  {mode === "direct" ? numA : numC}
                </span>{" "}
                ={" "}
                <strong className="text-emerald-400 text-base">
                  {formatNumber(resultX)}
                </strong>
              </div>
              <span className="text-[10px] text-neutral-500">
                Precisión hasta 4 decimales
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 text-center text-xs text-neutral-400">
            {hasDivisionByZero ? (
              <span className="text-red-400 font-semibold">
                Error matemático: No es posible dividir entre 0. Modifique el valor para continuar.
              </span>
            ) : (
              <span>
                Introduzca valores numéricos válidos en los campos A, B y C para visualizar el desglose paso a paso.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
