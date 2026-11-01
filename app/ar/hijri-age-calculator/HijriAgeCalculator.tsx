"use client";

import React, { useState, useId } from "react";
import {
  Calendar,
  Moon,
  Sun,
  Cake,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Clock,
  Hourglass,
  CalendarDays,
} from "lucide-react";

export default function HijriAgeCalculator() {
  const dateInputId = useId();

  // Default birth date: 1998-05-15
  const [birthDateStr, setBirthDateStr] = useState<string>("1998-05-15");
  const [copied, setCopied] = useState<boolean>(false);
  // Stable reference for SSR/prerender, updated on client mount
  const [now, setNow] = useState<Date>(() => new Date(2026, 9, 26));

  React.useEffect(() => {
    setNow(new Date());
  }, []);

  // Calculations
  let isValid = false;
  let gYears = 0;
  let gMonths = 0;
  let gDays = 0;

  let hYears = 0;
  let hMonths = 0;
  let hDays = 0;

  let totalDays = 0;
  let totalWeeks = 0;
  let totalMonths = 0;
  let totalHours = 0;

  let hijriBirthDateText = "";
  let nextBirthdayDays = 0;
  let nextBirthdayDayName = "";

  if (birthDateStr) {
    const [y, m, d] = birthDateStr.split("-").map(Number);
    const birthDate = new Date(y, m - 1, d);

    if (!isNaN(birthDate.getTime()) && birthDate <= now) {
      isValid = true;

      // 1. Gregorian Age
      gYears = now.getFullYear() - birthDate.getFullYear();
      gMonths = now.getMonth() - birthDate.getMonth();
      gDays = now.getDate() - birthDate.getDate();

      if (gDays < 0) {
        gMonths--;
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        gDays += prevMonthLastDay;
      }
      if (gMonths < 0) {
        gYears--;
        gMonths += 12;
      }

      // 2. Total time lived
      const diffMs = now.getTime() - birthDate.getTime();
      totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      totalWeeks = Math.floor(totalDays / 7);
      totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      totalMonths = gYears * 12 + gMonths;

      // 3. Hijri Age calculation (lunar year average: 354.367 days, lunar month: 29.5305 days)
      const exactHijriYears = totalDays / 354.367068;
      hYears = Math.floor(exactHijriYears);
      const remainingDaysAfterYears = totalDays - (hYears * 354.367068);
      hMonths = Math.floor(remainingDaysAfterYears / 29.5305);
      hDays = Math.floor(remainingDaysAfterYears % 29.5305);

      // 4. Converted Hijri Birth Date via Umm al-Qura calendar
      try {
        hijriBirthDateText = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(birthDate);
      } catch {
        hijriBirthDateText = `${d} / ${m} / ${y}`;
      }

      // 5. Next Birthday Countdown (Gregorian)
      let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < now) {
        nextBirthday = new Date(now.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
      }
      const nextDiffMs = nextBirthday.getTime() - now.getTime();
      nextBirthdayDays = Math.ceil(nextDiffMs / (1000 * 60 * 60 * 24));

      try {
        nextBirthdayDayName = new Intl.DateTimeFormat("ar-SA", { weekday: "long" }).format(nextBirthday);
      } catch {
        nextBirthdayDayName = "";
      }
    }
  }

  const handleReset = () => {
    setBirthDateStr("1998-05-15");
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!isValid) return;
    const summary = `نتيجة حساب العمر:
- العمر بالميلادي: ${gYears} سنة و ${gMonths} شهر و ${gDays} يوم
- العمر بالهجري: ${hYears} سنة و ${hMonths} شهر و ${hDays} يوم
- تاريخ الميلاد بالهجري: ${hijriBirthDateText}
- إجمالي الأيام التي عشتها: ${totalDays.toLocaleString("ar-SA")} يوم
- متبقي على عيد ميلادك القادم: ${nextBirthdayDays} يوم (يوم ${nextBirthdayDayName})`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8" dir="rtl">
      {/* Header & Reset */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            حساب فوري بالتقويمين الهجري والميلادي
          </span>
          <p className="text-xs text-neutral-500 mt-0.5">
            حدد تاريخ ميلادك بالميلادي لمعرفة عمرك الدقيق وتاريخك الهجري المقابل فوراً.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 active:scale-95"
          title="إعادة تعيين"
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
          <span>إعادة تعيين</span>
        </button>
      </div>

      {/* Input Section */}
      <div className="mt-8 max-w-xl mx-auto">
        <label
          htmlFor={dateInputId}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2"
        >
          <Calendar className="h-4 w-4 text-emerald-600" />
          <span>تاريخ الميلاد (بالميلادي)</span>
        </label>
        <div className="relative rounded-2xl shadow-xs">
          <input
            id={dateInputId}
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={birthDateStr}
            onChange={(e) => setBirthDateStr(e.target.value)}
            className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 py-3.5 px-4 text-lg font-bold text-neutral-900 text-center focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition"
          />
        </div>
        <p className="text-[11px] text-neutral-500 text-center mt-2 flex items-center justify-center gap-1">
          <Info className="h-3 w-3 text-neutral-400" />
          الحساب يتم لحظياً في متصفحك دون الحاجة لإعادة تحميل الصفحة.
        </p>
      </div>

      {/* Results Container */}
      {isValid && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-lg">
          {/* Results Top Bar */}
          <div className="border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                نتيجة حساب العمر بالتفصيل
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
                  <span className="text-emerald-400">تم النسخ بنجاح!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>نسخ النتيجة</span>
                </>
              )}
            </button>
          </div>

          {/* Dual Age Cards: Gregorian & Hijri */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-neutral-800">
            {/* 1. Gregorian Age */}
            <div className="p-6 sm:p-8 bg-neutral-900/90">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Sun className="h-4 w-4" />
                <span>عمرك بالتقويم الميلادي</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">{gYears}</span>
                <span className="text-base text-neutral-400 font-semibold">سنة</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-sm text-neutral-300">
                <span className="rounded-lg bg-neutral-800 px-2.5 py-1">
                  <strong>{gMonths}</strong> شهر
                </span>
                <span className="rounded-lg bg-neutral-800 px-2.5 py-1">
                  <strong>{gDays}</strong> يوم
                </span>
              </div>
              <p className="mt-4 text-[11px] text-neutral-500">
                محسوب على أساس السنة الشمسية (365.25 يوم).
              </p>
            </div>

            {/* 2. Hijri Age */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-neutral-900 to-emerald-950/40">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Moon className="h-4 w-4" />
                <span>عمرك بالتقويم الهجري (تقويم أم القرى)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400">{hYears}</span>
                <span className="text-base text-emerald-300 font-semibold">سنة هجرية</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-sm text-neutral-300">
                <span className="rounded-lg bg-neutral-800 px-2.5 py-1">
                  <strong className="text-emerald-400">{hMonths}</strong> شهر
                </span>
                <span className="rounded-lg bg-neutral-800 px-2.5 py-1">
                  <strong className="text-emerald-400">{hDays}</strong> يوم
                </span>
              </div>
              <p className="mt-4 text-[11px] text-neutral-400">
                العمر بالهجري أكبر بحوالي {hYears - gYears} سنة بسبب قصر السنة القمرية (354 يوماً).
              </p>
            </div>
          </div>

          {/* Hijri Birth Date & Next Birthday Banner */}
          <div className="border-t border-neutral-800 bg-neutral-950 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hijri Birth Date */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                <Moon className="h-3.5 w-3.5 text-emerald-400" />
                تاريخ ميلادك الهجري الموافق
              </span>
              <div className="mt-1.5 text-lg font-bold text-white">
                {hijriBirthDateText}
              </div>
              <span className="text-[10px] text-neutral-500">
                حسب تقويم أم القرى الرسمي المعتمد
              </span>
            </div>

            {/* Next Birthday Countdown */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                <Cake className="h-3.5 w-3.5 text-amber-400" />
                عيد ميلادك القادم
              </span>
              <div className="mt-1.5 text-lg font-bold text-amber-400">
                متبقي {nextBirthdayDays} يوم{" "}
                {nextBirthdayDayName && (
                  <span className="text-sm font-normal text-neutral-300">
                    (يوم {nextBirthdayDayName})
                  </span>
                )}
              </div>
              <span className="text-[10px] text-neutral-500">
                العد التنازلي لميلادك القادم بالميلادي
              </span>
            </div>
          </div>

          {/* Extra Statistics Row */}
          <div className="border-t border-neutral-800 bg-neutral-900 px-6 py-5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              إحصائيات إضافية للمدة التي عشتها حتى الآن:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-neutral-800/60 p-3">
                <div className="text-xl font-bold text-white">
                  {totalDays.toLocaleString("ar-SA")}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center justify-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  إجمالي الأيام
                </div>
              </div>

              <div className="rounded-xl bg-neutral-800/60 p-3">
                <div className="text-xl font-bold text-white">
                  {totalWeeks.toLocaleString("ar-SA")}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center justify-center gap-1">
                  <Hourglass className="h-3 w-3" />
                  إجمالي الأسابيع
                </div>
              </div>

              <div className="rounded-xl bg-neutral-800/60 p-3">
                <div className="text-xl font-bold text-white">
                  {totalMonths.toLocaleString("ar-SA")}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center justify-center gap-1">
                  <Calendar className="h-3 w-3" />
                  إجمالي الشهور
                </div>
              </div>

              <div className="rounded-xl bg-neutral-800/60 p-3">
                <div className="text-xl font-bold text-white">
                  {totalHours.toLocaleString("ar-SA")}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  إجمالي الساعات
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
