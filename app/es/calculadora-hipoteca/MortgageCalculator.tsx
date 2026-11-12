"use client";

import React, { useState, useId } from "react";
import {
  Home,
  Copy,
  Check,
  RotateCcw,
  Percent,
  Calendar,
  Info,
} from "lucide-react";

type TermUnit = "years" | "months";
type CurrencyCode = "EUR" | "USD";

const QUICK_PRESETS: Array<{
  label: string;
  capital: string;
  rate: string;
  term: string;
  unit: TermUnit;
  currency: CurrencyCode;
}> = [
  {
    label: "Hipoteca 150.000 € · 3,2 % · 25 años",
    capital: "150000",
    rate: "3.2",
    term: "25",
    unit: "years",
    currency: "EUR",
  },
  {
    label: "Hipoteca 250.000 € · 2,9 % · 30 años",
    capital: "250000",
    rate: "2.9",
    term: "30",
    unit: "years",
    currency: "EUR",
  },
  {
    label: "Préstamo coche 20.000 € · 6,5 % · 60 meses",
    capital: "20000",
    rate: "6.5",
    term: "60",
    unit: "months",
    currency: "EUR",
  },
  {
    label: "Préstamo 10.000 $ · 8 % · 36 meses",
    capital: "10000",
    rate: "8",
    term: "36",
    unit: "months",
    currency: "USD",
  },
];

export default function MortgageCalculator() {
  const capitalId = useId();
  const rateId = useId();
  const termId = useId();

  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [capitalStr, setCapitalStr] = useState<string>("150000");
  const [rateStr, setRateStr] = useState<string>("3.2");
  const [termStr, setTermStr] = useState<string>("25");
  const [termUnit, setTermUnit] = useState<TermUnit>("years");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parseVal = (s: string) =>
    parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0;

  const capital = Math.max(0, parseVal(capitalStr));
  const annualRate = Math.max(0, parseVal(rateStr));
  const rawTerm = Math.max(1, Math.round(parseVal(termStr)));
  const totalMonths = termUnit === "years" ? rawTerm * 12 : rawTerm;

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment = 0;
  if (capital > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = capital / totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyPayment = (capital * (monthlyRate * factor)) / (factor - 1);
    }
  }

  const totalToPay = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalToPay - capital);

  // Build concise yearly summary milestones (up to first 5 years + final year)
  const yearlySummary: Array<{
    year: number;
    interestPaid: number;
    principalPaid: number;
    remainingBalance: number;
  }> = [];

  if (capital > 0 && totalMonths > 0) {
    let balance = capital;
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let m = 1; m <= totalMonths; m++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = Math.min(balance, monthlyPayment - interestForMonth);
      balance = Math.max(0, balance - principalForMonth);
      yearInterest += interestForMonth;
      yearPrincipal += principalForMonth;

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.ceil(m / 12);
        yearlySummary.push({
          year: yearNum,
          interestPaid: yearInterest,
          principalPaid: yearPrincipal,
          remainingBalance: balance,
        });
        yearInterest = 0;
        yearPrincipal = 0;
      }
    }
  }

  const visibleSummary =
    yearlySummary.length <= 6
      ? yearlySummary
      : [
          ...yearlySummary.slice(0, 4),
          yearlySummary[Math.floor(yearlySummary.length / 2)],
          yearlySummary[yearlySummary.length - 1],
        ];

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const handleReset = () => {
    setCurrency("EUR");
    setCapitalStr("150000");
    setRateStr("3.2");
    setTermStr("25");
    setTermUnit("years");
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

  const capitalRatio = totalToPay > 0 ? (capital / totalToPay) * 100 : 100;
  const interestRatio = totalToPay > 0 ? (totalInterest / totalToPay) * 100 : 0;

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Sistema Francés (Cuota Mensual Constante)
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setCurrency("EUR")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                currency === "EUR"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Euro (€)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                currency === "USD"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Dólar ($)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 sm:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Ejemplos rápidos:
        </span>
        {QUICK_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setCapitalStr(p.capital);
              setRateStr(p.rate);
              setTermStr(p.term);
              setTermUnit(p.unit);
              setCurrency(p.currency);
            }}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Inputs */}
        <div className="space-y-5 lg:col-span-5">
          <div>
            <label
              htmlFor={capitalId}
              className="block text-sm font-semibold text-neutral-800"
            >
              Capital / Importe del préstamo ({currency === "EUR" ? "€" : "$"})
            </label>
            <input
              id={capitalId}
              type="text"
              inputMode="decimal"
              value={capitalStr}
              onChange={(e) =>
                setCapitalStr(e.target.value.replace(/[^0-9.,\s]/g, ""))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-lg font-bold text-neutral-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label
              htmlFor={rateId}
              className="block text-sm font-semibold text-neutral-800"
            >
              Tipo de interés anual TIN (%)
            </label>
            <div className="relative mt-2">
              <input
                id={rateId}
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) =>
                  setRateStr(e.target.value.replace(/[^0-9.,]/g, ""))
                }
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-10 text-lg font-bold text-neutral-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
              />
              <Percent className="pointer-events-none absolute right-3.5 top-3.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor={termId}
                className="block text-sm font-semibold text-neutral-800"
              >
                Plazo de devolución
              </label>
              <div className="inline-flex rounded-lg bg-neutral-100 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (termUnit === "months") {
                      setTermStr(String(Math.max(1, Math.round(rawTerm / 12))));
                    }
                    setTermUnit("years");
                  }}
                  className={`rounded-md px-2.5 py-1 font-bold transition cursor-pointer ${
                    termUnit === "years"
                      ? "bg-white text-emerald-700 shadow-2xs"
                      : "text-neutral-600"
                  }`}
                >
                  Años
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (termUnit === "years") {
                      setTermStr(String(rawTerm * 12));
                    }
                    setTermUnit("months");
                  }}
                  className={`rounded-md px-2.5 py-1 font-bold transition cursor-pointer ${
                    termUnit === "months"
                      ? "bg-white text-emerald-700 shadow-2xs"
                      : "text-neutral-600"
                  }`}
                >
                  Meses
                </button>
              </div>
            </div>
            <div className="relative mt-2">
              <input
                id={termId}
                type="text"
                inputMode="numeric"
                value={termStr}
                onChange={(e) => setTermStr(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-12 text-lg font-bold text-neutral-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
              />
              <Calendar className="pointer-events-none absolute right-3.5 top-3.5 h-5 w-5 text-neutral-400" />
            </div>
            <p className="mt-1.5 text-xs text-neutral-500">
              Equivalente a <strong>{totalMonths} cuotas mensuales</strong>.
            </p>
          </div>

          <div className="flex items-start gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 text-xs text-neutral-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p>
              Calculado mediante el <strong>Sistema de Amortización Francés</strong> de cuota constante mensual.
            </p>
          </div>
        </div>

        {/* Right: Results & Summary */}
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 sm:p-6 lg:col-span-7">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Home className="h-3.5 w-3.5 text-emerald-600" />
              Resumen de tu préstamo
            </span>

            {/* Main Monthly Payment Card */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-white p-4 shadow-sm ring-1 ring-emerald-500/10">
              <div>
                <span className="text-xs font-semibold text-neutral-500">
                  Cuota mensual estimada
                </span>
                <div className="mt-0.5 text-3xl font-black tracking-tight text-emerald-700">
                  {formatMoney(monthlyPayment)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(monthlyPayment.toFixed(2), "cuota")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
              >
                {copiedKey === "cuota" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Cards */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <span className="text-xs font-semibold text-neutral-500">
                  Total intereses
                </span>
                <div className="mt-0.5 text-xl font-extrabold text-amber-700">
                  {formatMoney(totalInterest)}
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <span className="text-xs font-semibold text-neutral-500">
                  Total a pagar (Capital + Intereses)
                </span>
                <div className="mt-0.5 text-xl font-extrabold text-neutral-900">
                  {formatMoney(totalToPay)}
                </div>
              </div>
            </div>

            {/* Ratio bar */}
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-neutral-600">
                <span>Capital ({capitalRatio.toFixed(1)} %)</span>
                <span>Intereses ({interestRatio.toFixed(1)} %)</span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="bg-emerald-600 transition-all duration-300"
                  style={{ width: `${capitalRatio}%` }}
                />
                <div
                  className="bg-amber-500 transition-all duration-300"
                  style={{ width: `${interestRatio}%` }}
                />
              </div>
            </div>

            {/* Interactive Milestone Table */}
            {visibleSummary.length > 0 && (
              <div className="mt-5 overflow-x-auto rounded-xl border border-neutral-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-[11px] font-bold uppercase text-neutral-500">
                    <tr>
                      <th className="px-3 py-2">Año</th>
                      <th className="px-3 py-2">Capital anual</th>
                      <th className="px-3 py-2">Intereses año</th>
                      <th className="px-3 py-2">Deuda pendiente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {visibleSummary.map((row) => (
                      <tr key={row.year}>
                        <td className="px-3 py-2 font-bold text-neutral-900">
                          Año {row.year}
                        </td>
                        <td className="px-3 py-2 text-emerald-700 font-medium">
                          {formatMoney(row.principalPaid)}
                        </td>
                        <td className="px-3 py-2 text-amber-700 font-medium">
                          {formatMoney(row.interestPaid)}
                        </td>
                        <td className="px-3 py-2 text-neutral-700">
                          {formatMoney(row.remainingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
