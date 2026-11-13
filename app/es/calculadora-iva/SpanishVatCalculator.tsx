"use client";

import React, { useState, useId } from "react";
import {
  Receipt,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Percent,
  Info,
} from "lucide-react";

type VatMode = "add_iva" | "remove_iva";

interface IvaRatePreset {
  id: string;
  value: number;
  label: string;
  desc: string;
}

const SPANISH_RATES: IvaRatePreset[] = [
  { id: "es21", value: 21, label: "21 %", desc: "General (España)" },
  { id: "es10", value: 10, label: "10 %", desc: "Reducido (España)" },
  { id: "es4", value: 4, label: "4 %", desc: "Superreducido" },
  { id: "latam16", value: 16, label: "16 %", desc: "México" },
  { id: "latam19", value: 19, label: "19 %", desc: "Colombia / Chile" },
];

const QUICK_SCENARIOS: Array<{
  label: string;
  mode: VatMode;
  amount: string;
  rate: number;
}> = [
  { label: "Factura 1.000 € + 21% IVA", mode: "add_iva", amount: "1000", rate: 21 },
  { label: "Ticket 121 € (Quitar 21%)", mode: "remove_iva", amount: "121", rate: 21 },
  { label: "Restaurante 88 € (10%)", mode: "remove_iva", amount: "88", rate: 10 },
  { label: "México 2.500 (16%)", mode: "add_iva", amount: "2500", rate: 16 },
];

export default function SpanishVatCalculator() {
  const amountId = useId();
  const customId = useId();

  const [mode, setMode] = useState<VatMode>("add_iva");
  const [amountStr, setAmountStr] = useState<string>("1000");
  const [selectedRate, setSelectedRate] = useState<number | "custom">(21);
  const [customRateStr, setCustomRateStr] = useState<string>("18");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseNum = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const rateValue =
    selectedRate === "custom" ? Math.max(0, parseNum(customRateStr)) : selectedRate;
  const inputVal = Math.max(0, parseNum(amountStr));
  const factor = rateValue / 100;

  let baseImponible = 0;
  let cuotaIva = 0;
  let totalConIva = 0;

  if (mode === "add_iva") {
    baseImponible = inputVal;
    cuotaIva = baseImponible * factor;
    totalConIva = baseImponible + cuotaIva;
  } else {
    totalConIva = inputVal;
    baseImponible = totalConIva / (1 + factor);
    cuotaIva = totalConIva - baseImponible;
  }

  const fmtEuro = (val: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const handleReset = () => {
    setMode("add_iva");
    setAmountStr("1000");
    setSelectedRate(21);
    setCustomRateStr("18");
    setCopiedKey(null);
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore fallback
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Mode Selector & Reset */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Operación Fiscal
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("add_iva")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "add_iva"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Añadir IVA (Base → Total)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("remove_iva")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                mode === "remove_iva"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Quitar IVA (Total → Base)</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Ejemplos rápidos:
        </span>
        {QUICK_SCENARIOS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              setMode(item.mode);
              setAmountStr(item.amount);
              setSelectedRate(item.rate);
            }}
            className="rounded-lg border border-blue-200/80 bg-blue-50/70 px-2.5 py-1 text-xs font-medium text-blue-800 transition hover:bg-blue-100 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Form Inputs */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-5">
          <label
            htmlFor={amountId}
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            {mode === "add_iva" ? "Base Imponible (Sin IVA)" : "Importe Total (Con IVA)"}
          </label>
          <div className="relative rounded-2xl shadow-xs">
            <input
              id={amountId}
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="Ej: 1000"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 pl-4 pr-12 text-lg font-bold text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-neutral-400">
              EUR / €
            </div>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-neutral-500">
            <Info className="h-3 w-3 text-neutral-400" />
            Resultado instantáneo sin recargar la página.
          </p>
        </div>

        {/* Rate Presets */}
        <div className="space-y-2 lg:col-span-7">
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Tipo de IVA aplicable (España y Latinoamérica)
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {SPANISH_RATES.map((rate) => {
              const active = selectedRate === rate.value;
              return (
                <button
                  key={rate.id}
                  type="button"
                  onClick={() => setSelectedRate(rate.value)}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition cursor-pointer ${
                    active
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  <span className="text-sm font-extrabold">{rate.label}</span>
                  <span
                    className={`mt-0.5 text-[10px] leading-tight ${
                      active ? "text-blue-100" : "text-neutral-500"
                    }`}
                  >
                    {rate.desc}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setSelectedRate("custom")}
              className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition cursor-pointer ${
                selectedRate === "custom"
                  ? "border-blue-600 bg-blue-600 text-white shadow-md"
                  : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              <Percent className="h-4 w-4" />
              <span className="mt-1 text-[10px] font-bold">Otro %</span>
            </button>
          </div>

          {selectedRate === "custom" && (
            <div className="mt-2 flex items-center gap-3">
              <label htmlFor={customId} className="text-xs font-semibold text-neutral-700">
                Tasa personalizada (%):
              </label>
              <input
                id={customId}
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={customRateStr}
                onChange={(e) => setCustomRateStr(e.target.value)}
                className="w-28 rounded-xl border border-blue-300 bg-white px-3 py-1.5 text-sm font-bold text-neutral-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Dark Container */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        <div className="flex flex-col gap-3 border-b border-neutral-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Desglose Fiscal ({rateValue}% IVA)
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              copyText(
                `Base Imponible: ${fmtEuro(baseImponible)} | Cuota IVA (${rateValue}%): ${fmtEuro(
                  cuotaIva
                )} | Total con IVA: ${fmtEuro(totalConIva)}`,
                "summary"
              )
            }
            className="inline-flex items-center gap-1.5 self-start rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 sm:self-auto cursor-pointer"
          >
            {copiedKey === "summary" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copiar desglose completo</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 divide-y divide-neutral-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">
                Base Imponible (Sin IVA)
              </span>
              <button
                type="button"
                onClick={() => copyText(baseImponible.toFixed(2), "base")}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Copiar Base Imponible"
              >
                {copiedKey === "base" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div translate="no" className="notranslate mt-2 text-2xl sm:text-3xl font-black text-white">
              {fmtEuro(baseImponible)}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-300">
                Cuota de IVA ({rateValue} %)
              </span>
              <button
                type="button"
                onClick={() => copyText(cuotaIva.toFixed(2), "iva")}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Copiar Cuota de IVA"
              >
                {copiedKey === "iva" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div translate="no" className="notranslate mt-2 text-2xl sm:text-3xl font-black text-blue-400">
              {fmtEuro(cuotaIva)}
            </div>
          </div>

          <div className="bg-blue-950/30 p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300">
                Importe Total (Con IVA)
              </span>
              <button
                type="button"
                onClick={() => copyText(totalConIva.toFixed(2), "total")}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Copiar Total con IVA"
              >
                {copiedKey === "total" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div translate="no" className="notranslate mt-2 text-2xl sm:text-3xl font-black text-emerald-400">
              {fmtEuro(totalConIva)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
