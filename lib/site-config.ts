export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://micro-tools-liart.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "MicroTools";

export const SITE_LAST_MODIFIED = "2026-11-12";

export const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
