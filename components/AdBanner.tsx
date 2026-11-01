import React from "react";

interface AdBannerProps {
  position: "top" | "in-content" | "bottom";
  className?: string;
  adSlot?: string;
}

export default function AdBanner({ position, className = "", adSlot }: AdBannerProps) {
  const isTop = position === "top";
  
  return (
    <div
      className={`w-full overflow-hidden transition-all ${className}`}
      aria-label="Espace Publicitaire"
    >
      <div
        className={`mx-auto flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300/80 bg-neutral-50/70 p-3 text-center text-neutral-400 select-none ${
          isTop
            ? "min-h-[90px] max-w-4xl"
            : "min-h-[140px] sm:min-h-[250px] max-w-3xl"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="rounded bg-neutral-200/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
            Annonce / AdSense Placeholder
          </span>
          {adSlot && (
            <span className="text-[10px] text-neutral-400 font-mono">
              Slot ID: {adSlot}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-neutral-400 max-w-md">
          {isTop
            ? "Emplacement d'annonce optimisé (Format Leaderboard 728x90 ou Responsive)"
            : "Emplacement d'annonce In-Content (Format Pavé 336x280 ou Responsive)"}
        </p>
        <span className="text-[10px] text-neutral-300 mt-1">
          Remplacez ce bloc par votre balise &lt;ins className=&quot;adsbygoogle&quot;&gt;
        </span>
      </div>
    </div>
  );
}
