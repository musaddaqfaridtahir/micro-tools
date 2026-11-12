import React from "react";

export interface AdSlotProps {
  position: "top" | "in-content" | "bottom";
  className?: string;
  adSlot?: string;
}

/**
 * AdSense-safe container.
 * When NEXT_PUBLIC_ENABLE_ADS !== "true", returns null so zero placeholder boxes
 * or "Under Construction" elements ever appear during AdSense review.
 */
export default function AdSlot({
  position,
  className = "",
  adSlot,
}: AdSlotProps) {
  if (process.env.NEXT_PUBLIC_ENABLE_ADS !== "true") {
    return null;
  }

  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isTop = position === "top";

  return (
    <aside
      className={`w-full overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <div
        className={`mx-auto flex items-center justify-center rounded-xl border border-neutral-200/70 bg-neutral-50/40 ${
          isTop ? "min-h-[90px] max-w-4xl" : "min-h-[120px] max-w-3xl"
        }`}
      >
        {adsenseClient && adSlot ? (
          <ins
            className="adsbygoogle block w-full text-center"
            data-ad-client={adsenseClient}
            data-ad-slot={adSlot}
            data-ad-format={isTop ? "horizontal" : "auto"}
            data-full-width-responsive="true"
          />
        ) : null}
      </div>
    </aside>
  );
}
