"use client";

import React, { useState, useId } from "react";
import {
  Receipt,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Percent,
  Euro,
  Info,
} from "lucide-react";

type GermanVatMode = "net_to_gross" | "gross_to_net";

interface RateOption {
  value: number;
  label: string;
  sublabel: string;
}

const GERMAN_VAT_RATES: RateOption[] = [
  { value: 19, label: "19 %", sublabel: "Regelsteuersatz" },
  { value: 7, label: "7 %", sublabel: "Ermäßigter Satz" },
];

const QUICK_PRESETS: Array<{
  label: string;
  mode: GermanVatMode;
  amount: string;
  rate: number;
}> = [
  { label: "Rechnung 1.000 € Netto (19 %)", mode: "net_to_gross", amount: "1000", rate: 19 },
  { label: "Kaufpreis 1.190 € Brutto (19 %)", mode: "gross_to_net", amount: "1190", rate: 19 },
  { label: "Lebensmittel/Buch 107 € Brutto (7 %)", mode: "gross_to_net", amount: "107", rate: 7 },
  { label: "Honorar 2.500 € Netto (19 %)", mode: "net_to_gross", amount: "2500", rate: 19 },
];

export default function GermanVatCalculator() {
  const amountId = useId();
  const customRateId = useId();

  const [mode, setMode] = useState<GermanVatMode>("net_to_gross");
  const [amountStr, setAmountStr] = useState<string>("1000");
  const [selectedRate, setSelectedRate] = useState<number | "custom">(19);
  const [customRateStr, setCustomRateStr] = useState<string>("19");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseValue = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const currentRate =
    selectedRate === "custom"
      ? Math.max(0, parseValue(customRateStr))
      : selectedRate;

  const cleanedAmount = amountStr.replace(/\s/g, "").replace(",", ".");
  const parsedAmount = parseFloat(cleanedAmount);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount >= 0;

  let nettobetrag = 0;
  let mwstBetrag = 0;
  let bruttobetrag = 0;

  if (isValidAmount) {
    const factor = currentRate / 100;
    if (mode === "net_to_gross") {
      nettobetrag = parsedAmount;
      mwstBetrag = nettobetrag * factor;
      bruttobetrag = nettobetrag + mwstBetrag;
    } else {
      bruttobetrag = parsedAmount;
      nettobetrag = bruttobetrag / (1 + factor);
      mwstBetrag = bruttobetrag - nettobetrag;
    }
  }

  const formatEuro = (val: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

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
    setMode("net_to_gross");
    setAmountStr("1000");
    setSelectedRate(19);
    setCustomRateStr("19");
    setCopiedKey(null);
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Mode Toggle & Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Berechnungsrichtung wählen
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("net_to_gross")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "net_to_gross"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Netto zu Brutto (+ MwSt.)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("gross_to_net")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "gross_to_net"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Brutto zu Netto (- MwSt.)</span>
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
          Schnellbeispiele:
        </span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setMode(preset.mode);
              setAmountStr(preset.amount);
              setSelectedRate(preset.rate);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Inputs */}
        <div className="space-y-6 lg:col-span-6">
          <div>
            <label
              htmlFor={amountId}
              className="block text-sm font-semibold text-neutral-800"
            >
              {mode === "net_to_gross"
                ? "Nettobetrag in Euro (€)"
                : "Bruttobetrag in Euro (€)"}
            </label>
            <div className="relative mt-2">
              <input
                id={amountId}
                type="text"
                inputMode="decimal"
                value={amountStr}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.,\s]/g, "");
                  setAmountStr(val);
                }}
                placeholder={mode === "net_to_gross" ? "z. B. 1000" : "z. B. 1190"}
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 pl-4 pr-12 text-lg font-bold text-neutral-900 placeholder-neutral-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400">
                <Euro className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* VAT Rate Pills */}
          <div>
            <span className="block text-sm font-semibold text-neutral-800">
              Mehrwertsteuersatz (Deutschland)
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2.5">
              {GERMAN_VAT_RATES.map((rate) => {
                const isActive = selectedRate === rate.value;
                return (
                  <button
                    key={rate.value}
                    type="button"
                    onClick={() => setSelectedRate(rate.value)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition cursor-pointer ${
                      isActive
                        ? "border-blue-600 bg-blue-50/80 text-blue-700 ring-2 ring-blue-600/20"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    <span className="text-base font-extrabold">{rate.label}</span>
                    <span className="mt-0.5 text-[10px] font-medium text-neutral-500 leading-tight">
                      {rate.sublabel}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSelectedRate("custom")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition cursor-pointer ${
                  selectedRate === "custom"
                    ? "border-blue-600 bg-blue-50/80 text-blue-700 ring-2 ring-blue-600/20"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <span className="text-base font-extrabold">Eigener</span>
                <span className="mt-0.5 text-[10px] font-medium text-neutral-500 leading-tight">
                  Freier Steuersatz
                </span>
              </button>
            </div>

            {selectedRate === "custom" && (
              <div className="mt-3">
                <label
                  htmlFor={customRateId}
                  className="mb-1.5 block text-xs font-semibold text-neutral-600"
                >
                  Benutzerdefinierten Steuersatz eingeben (%):
                </label>
                <div className="relative">
                  <input
                    id={customRateId}
                    type="text"
                    inputMode="decimal"
                    value={customRateStr}
                    onChange={(e) =>
                      setCustomRateStr(e.target.value.replace(/[^0-9.,]/g, ""))
                    }
                    className="w-full rounded-xl border border-blue-300 bg-blue-50/20 py-2.5 pl-4 pr-10 text-sm font-bold text-neutral-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
                    <Percent className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50 p-3.5 text-xs text-neutral-600">
            <Info className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
            <p>
              <strong>Verwendete Formel:</strong>{" "}
              {mode === "net_to_gross"
                ? `Brutto = Netto × (1 + ${currentRate.toString().replace(".", ",")} / 100)`
                : `Netto = Brutto ÷ (1 + ${currentRate.toString().replace(".", ",")} / 100)`}
            </p>
          </div>
        </div>

        {/* Right: Results */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 sm:p-6 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <Receipt className="h-3.5 w-3.5 text-blue-600" />
                Ergebnisübersicht
              </span>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                MwSt. {currentRate.toString().replace(".", ",")} %
              </span>
            </div>

            <div className="mt-5 space-y-3.5">
              {/* Nettobetrag */}
              <div
                className={`flex items-center justify-between rounded-2xl border p-4 transition ${
                  mode === "gross_to_net"
                    ? "border-blue-500/40 bg-white shadow-sm ring-1 ring-blue-500/10"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    Nettobetrag (ohne MwSt.)
                  </span>
                  <div translate="no" className="notranslate mt-0.5 text-2xl font-extrabold tracking-tight text-neutral-900">
                    {formatEuro(nettobetrag)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(nettobetrag.toFixed(2), "netto")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "netto" ? (
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

              {/* MwSt.-Betrag */}
              <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4">
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    Mehrwertsteuer ({currentRate.toString().replace(".", ",")} %)
                  </span>
                  <div translate="no" className="notranslate mt-0.5 text-2xl font-extrabold tracking-tight text-blue-600">
                    {formatEuro(mwstBetrag)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(mwstBetrag.toFixed(2), "mwst")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "mwst" ? (
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

              {/* Bruttobetrag */}
              <div
                className={`flex items-center justify-between rounded-2xl border p-4 transition ${
                  mode === "net_to_gross"
                    ? "border-blue-500/40 bg-white shadow-sm ring-1 ring-blue-500/10"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div>
                  <span className="text-xs font-semibold text-neutral-500">
                    Bruttobetrag (inkl. MwSt.)
                  </span>
                  <div translate="no" className="notranslate mt-0.5 text-2xl font-extrabold tracking-tight text-neutral-900">
                    {formatEuro(bruttobetrag)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(bruttobetrag.toFixed(2), "brutto")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedKey === "brutto" ? (
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
            </div>
          </div>

          {/* Share Bar */}
          <div className="mt-5 pt-4 border-t border-neutral-200/80">
            <div className="flex justify-between text-[11px] font-semibold text-neutral-500 mb-1.5">
              <span>Nettoanteil ({bruttobetrag > 0 ? ((nettobetrag / bruttobetrag) * 100).toFixed(1) : "0"} %)</span>
              <span>MwSt.-Anteil ({bruttobetrag > 0 ? ((mwstBetrag / bruttobetrag) * 100).toFixed(1) : "0"} %)</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 flex">
              <div
                className="bg-neutral-800 transition-all duration-300"
                style={{
                  width: bruttobetrag > 0 ? `${(nettobetrag / bruttobetrag) * 100}%` : "100%",
                }}
              />
              <div
                className="bg-blue-600 transition-all duration-300"
                style={{
                  width: bruttobetrag > 0 ? `${(mwstBetrag / bruttobetrag) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
