"use client";

import React, { useState, useId } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  CalendarDays,
  CalendarCheck2,
  CalendarX2,
} from "lucide-react";

type Mode = "add" | "subtract";
type WeekendMode = "sat_sun" | "sun_only";

const QUICK_DAYS = [5, 10, 15, 20, 30];

export default function WorkingDaysCalculator() {
  const dateInputId = useId();
  const daysInputId = useId();

  // Static default for SSR/prerender stability
  const [startDateStr, setStartDateStr] = useState<string>("2026-10-26");
  const [businessDaysStr, setBusinessDaysStr] = useState<string>("10");
  const [mode, setMode] = useState<Mode>("add");
  const [weekendMode, setWeekendMode] = useState<WeekendMode>("sat_sun");
  const [copied, setCopied] = useState<boolean>(false);

  // Sync to today's date on mount
  React.useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    setStartDateStr(`${y}-${m}-${d}`);
  }, []);

  // Parse days
  const businessDays = Math.max(0, parseInt(businessDaysStr, 10) || 0);

  // Calculation Logic (Using local date components to avoid timezone shift)
  let targetDate: Date | null = null;
  let totalCalendarDays = 0;
  let skippedWeekends = 0;

  if (startDateStr && !isNaN(businessDays)) {
    const [year, month, day] = startDateStr.split("-").map(Number);
    const current = new Date(year, month - 1, day);

    let daysRemaining = businessDays;
    const direction = mode === "add" ? 1 : -1;

    // If starting on a weekend or counting business days
    while (daysRemaining > 0) {
      current.setDate(current.getDate() + direction);
      totalCalendarDays++;

      const dayOfWeek = current.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend =
        weekendMode === "sat_sun"
          ? dayOfWeek === 0 || dayOfWeek === 6
          : dayOfWeek === 0;

      if (isWeekend) {
        skippedWeekends++;
      } else {
        daysRemaining--;
      }
    }

    targetDate = new Date(current);
  }

  // Format Spanish date
  const formatSpanishFull = (date: Date): string => {
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatSpanishShort = (date: Date): string => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const formattedResultDate = targetDate
    ? formatSpanishFull(targetDate)
    : "Fecha no válida";

  const formattedShortDate = targetDate ? formatSpanishShort(targetDate) : "";

  const handleReset = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    setStartDateStr(`${y}-${m}-${d}`);
    setBusinessDaysStr("10");
    setMode("add");
    setWeekendMode("sat_sun");
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!targetDate) return;
    const textToCopy = `${formatSpanishShort(targetDate)} (${formatSpanishFull(targetDate)})`;
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
      {/* Top Header: Mode & Reset */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Configuración del Cálculo
          </span>
          <div className="mt-2 inline-flex rounded-2xl bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "add"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Sumar días hábiles (Hacia adelante)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("subtract")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "subtract"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Restar días hábiles (Hacia atrás)</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 active:scale-95"
          title="Reiniciar valores a los predeterminados"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Field 1: Start Date (5 cols) */}
        <div className="md:col-span-4 space-y-1.5">
          <label
            htmlFor={dateInputId}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            <CalendarIcon className="h-3.5 w-3.5 text-blue-600" />
            <span>Fecha de inicio</span>
          </label>
          <div className="relative rounded-2xl shadow-2xs">
            <input
              id={dateInputId}
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 px-4 text-base font-bold text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
          </div>
          <span className="text-[11px] text-neutral-500">
            Día a partir del cual comienza el cómputo
          </span>
        </div>

        {/* Field 2: Business Days (4 cols) */}
        <div className="md:col-span-4 space-y-1.5">
          <label
            htmlFor={daysInputId}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            <Clock className="h-3.5 w-3.5 text-emerald-600" />
            <span>Días a {mode === "add" ? "sumar" : "restar"}</span>
          </label>
          <div className="relative rounded-2xl shadow-2xs">
            <input
              id={daysInputId}
              type="number"
              min="0"
              max="1000"
              value={businessDaysStr}
              onChange={(e) => setBusinessDaysStr(e.target.value)}
              placeholder="Ej: 10"
              className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3 pl-4 pr-16 text-base font-bold text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-neutral-400">
              días
            </div>
          </div>
          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-1 pt-1">
            {QUICK_DAYS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setBusinessDaysStr(d.toString())}
                className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold transition ${
                  businessDaysStr === d.toString()
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                +{d}
              </button>
            ))}
          </div>
        </div>

        {/* Field 3: Weekend Configuration (4 cols) */}
        <div className="md:col-span-4 space-y-1.5">
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Días no laborables (Fin de semana)
          </span>
          <div className="flex flex-col gap-2 pt-0.5">
            <label className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/60 p-2.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100/70 cursor-pointer transition">
              <input
                type="radio"
                name="weekend"
                value="sat_sun"
                checked={weekendMode === "sat_sun"}
                onChange={() => setWeekendMode("sat_sun")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex flex-col">
                <span className="font-bold text-neutral-900">Sábados y Domingos</span>
                <span className="text-[10px] text-neutral-500">
                  Estándar legal y administrativo
                </span>
              </div>
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/60 p-2.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100/70 cursor-pointer transition">
              <input
                type="radio"
                name="weekend"
                value="sun_only"
                checked={weekendMode === "sun_only"}
                onChange={() => setWeekendMode("sun_only")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex flex-col">
                <span className="font-bold text-neutral-900">Solo Domingos</span>
                <span className="text-[10px] text-neutral-500">
                  Comercio y jornadas de 6 días
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Results Box */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
        {/* Results Header */}
        <div className="border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Resultado del Cómputo de Días Hábiles
            </h3>
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Copiado con éxito!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copiar fecha</span>
              </>
            )}
          </button>
        </div>

        {/* Main Highlighted Target Date Card */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-neutral-900 via-neutral-900 to-blue-950/40 border-b border-neutral-800">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <CalendarCheck2 className="h-4 w-4 text-blue-400" />
            <span>Fecha Final Estimada ({mode === "add" ? "Vencimiento" : "Inicio"})</span>
          </span>
          <div className="mt-3 text-2xl font-black capitalize text-white sm:text-4xl tracking-tight">
            {formattedResultDate}
          </div>
          <div className="mt-2 text-base font-semibold text-blue-300">
            Formato numérico: <strong className="text-white font-mono">{formattedShortDate}</strong>
          </div>
        </div>

        {/* Detailed Breakdown Columns */}
        <div className="grid grid-cols-1 divide-y divide-neutral-800 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {/* Working Days */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <CalendarCheck2 className="h-3.5 w-3.5" />
              <span>Días Hábiles Efectivos</span>
            </div>
            <div className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {businessDays} días
            </div>
            <p className="mt-2 text-[11px] text-neutral-400">
              Días laborales computados
            </p>
          </div>

          {/* Skipped Weekends */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <CalendarX2 className="h-3.5 w-3.5" />
              <span>Fines de Semana Omitidos</span>
            </div>
            <div className="mt-2 text-2xl font-black text-amber-400 sm:text-3xl">
              {skippedWeekends} días
            </div>
            <p className="mt-2 text-[11px] text-neutral-400">
              {weekendMode === "sat_sun"
                ? "Sábados y domingos no contados"
                : "Solo domingos no contados"}
            </p>
          </div>

          {/* Calendar Days */}
          <div className="p-6 transition hover:bg-neutral-800/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Total Días Naturales</span>
            </div>
            <div className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {totalCalendarDays} días
            </div>
            <p className="mt-2 text-[11px] text-neutral-400">
              Tiempo total de calendario
            </p>
          </div>
        </div>

        {/* Live Calculation Summary Banner */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-3.5 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-[11px]">
            Cómputo: {startDateStr} {mode === "add" ? "+" : "-"} {businessDays} días hábiles ={" "}
            <strong className="text-white">{formattedShortDate}</strong> ({totalCalendarDays} días naturales corridos)
          </div>
          <span className="text-[10px] text-neutral-500 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Excluye fines de semana. Los festivos oficiales locales deben revisarse de forma independiente.
          </span>
        </div>
      </div>
    </div>
  );
}
