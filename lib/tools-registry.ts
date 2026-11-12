export type LanguageCode = "fr" | "de" | "es" | "ar";

export type ToolIconName =
  | "calculator"
  | "briefcase"
  | "car"
  | "zap"
  | "scale"
  | "calendar"
  | "divide"
  | "receipt"
  | "moon"
  | "landmark";

export type ToolAccent = "blue" | "emerald" | "amber" | "indigo" | "teal" | "violet";

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  language: LanguageCode;
  locale: string;
  dir: "ltr" | "rtl";
  title: string;
  shortTitle: string;
  shortDescription: string;
  nativeCtaText: string;
  nativeBadgeText: string;
  category: string;
  keywords: string[];
  icon: ToolIconName;
  accent: ToolAccent;
  highlights: string[];
  relatedIds: string[];
}

export interface LanguageHubMeta {
  code: LanguageCode;
  upperCode: string;
  slug: string;
  flag: string;
  nativeName: string;
  locale: string;
  dir: "ltr" | "rtl";
  hubHeadline: string;
  hubSubheadline: string;
  seoTitle: string;
  seoDescription: string;
  filterLabel: string;
  toolsCountSuffix: string;
}

export const LANGUAGE_HUBS: Record<LanguageCode, LanguageHubMeta> = {
  fr: {
    code: "fr",
    upperCode: "FR",
    slug: "/fr",
    flag: "🇫🇷",
    nativeName: "Français",
    locale: "fr_FR",
    dir: "ltr",
    hubHeadline: "Calculateurs & Outils Financiers en Français",
    hubSubheadline:
      "Suite complète d'outils gratuits conformes aux barèmes et taux français 2026 : calcul TVA HT/TTC, simulation salaire Brut en Net et frais kilométriques fiscaux.",
    seoTitle: "Outils & Calculateurs Gratuits en Français (TVA, Salaire Brut/Net, Frais Km 2026)",
    seoDescription:
      "Accédez gratuitement à nos calculateurs en ligne pour la France : TVA (20%, 10%, 5,5%, 2,1%), conversion salaire brut en net 2026 et barème kilométrique fiscal.",
    filterLabel: "Français (FR)",
    toolsCountSuffix: "outils gratuits disponibles",
  },
  de: {
    code: "de",
    upperCode: "DE",
    slug: "/de",
    flag: "🇩🇪",
    nativeName: "Deutsch",
    locale: "de_DE",
    dir: "ltr",
    hubHeadline: "Kostenlose Online-Rechner für Deutschland",
    hubSubheadline:
      "Präzise, kostenlose Web-Rechner ohne Anmeldung und ohne Datenspeicherung: Stromverbrauch & Stromkosten exakt ermitteln sowie direkten und indirekten Dreisatz lösen.",
    seoTitle: "Kostenlose Online-Rechner auf Deutsch (Stromverbrauch & Dreisatz 2026)",
    seoDescription:
      "Präzise Online-Rechner für Deutschland: Stromverbrauch- und Stromkosten-Rechner (kWh/Jahr) sowie Dreisatz-Rechner (proportional & antiproportional) kostenlos nutzen.",
    filterLabel: "Deutsch (DE)",
    toolsCountSuffix: "kostenlose Rechner",
  },
  es: {
    code: "es",
    upperCode: "ES",
    slug: "/es",
    flag: "🇪🇸",
    nativeName: "Español",
    locale: "es_ES",
    dir: "ltr",
    hubHeadline: "Calculadoras Online Gratuitas en Español",
    hubSubheadline:
      "Herramientas rápidas en español para España y Latinoamérica: cálculo de IVA (21%, 10%, 4% y tasas personalizadas), días hábiles legales y regla de tres paso a paso.",
    seoTitle: "Calculadoras Online Gratis en Español (IVA, Días Hábiles y Regla de Tres 2026)",
    seoDescription:
      "Calculadoras precisas en español: Calculadora de IVA España y Latam, Calculadora de Días Hábiles laborales y Calculadora de Regla de Tres directa e inversa.",
    filterLabel: "Español (ES)",
    toolsCountSuffix: "calculadoras activas",
  },
  ar: {
    code: "ar",
    upperCode: "AR",
    slug: "/ar",
    flag: "🇸🇦",
    nativeName: "العربية",
    locale: "ar_SA",
    dir: "rtl",
    hubHeadline: "حاسبات وأدوات عربية مجانية فورية",
    hubSubheadline:
      "مجموعة أدوات إلكترونية دقيقة باللغة العربية تعمل مباشرة من المتصفح دون تسجيل أو حفظ للبيانات: حاسبة ضريبة القيمة المضافة السعودية والإماراتية، وحاسبة العمر بالهجري والميلادي.",
    seoTitle: "أدوات وحاسبات عربية مجانية أونلاين (ضريبة القيمة المضافة 15% والعمر الهجري 2026)",
    seoDescription:
      "حاسبات مجانية باللغة العربية: حاسبة ضريبة القيمة المضافة في السعودية (15%) والإمارات (5%)، وحاسبة العمر الدقيقة بالتقويمين الهجري (أم القرى) والميلادي.",
    filterLabel: "العربية (AR)",
    toolsCountSuffix: "أدوات مجانية متاحة",
  },
};

export const LANGUAGE_ORDER: LanguageCode[] = ["fr", "de", "es", "ar"];

export const TOOLS_REGISTRY: ToolDefinition[] = [
  {
    id: "calculateur-tva",
    slug: "/fr/calculateur-tva",
    language: "fr",
    locale: "fr_FR",
    dir: "ltr",
    title: "Calculateur de TVA (France)",
    shortTitle: "Calculateur de TVA",
    shortDescription:
      "Convertissez instantanément un montant HT en TTC et inversement selon les 4 taux légaux français (20 %, 10 %, 5,5 %, 2,1 %) ou un taux personnalisé.",
    nativeCtaText: "Ouvrir l'outil →",
    nativeBadgeText: "Outil actif",
    category: "Finance & Fiscalité",
    keywords: [
      "calculateur tva",
      "calcul tva ht ttc",
      "tva 20%",
      "taux tva france 2026",
      "convertir ttc en ht",
    ],
    icon: "calculator",
    accent: "blue",
    highlights: [
      "HT vers TTC & TTC vers HT",
      "Taux officiels français 2026",
      "Exemples rapides & copie 1 clic",
    ],
    relatedIds: ["calcul-brut-net", "frais-kilometriques", "calculadora-iva"],
  },
  {
    id: "calcul-brut-net",
    slug: "/fr/calcul-brut-net",
    language: "fr",
    locale: "fr_FR",
    dir: "ltr",
    title: "Calculateur Salaire Brut en Net (France)",
    shortTitle: "Salaire Brut en Net",
    shortDescription:
      "Estimez votre salaire net mensuel et annuel à partir du brut en France selon votre statut (Non-Cadre, Cadre, Fonction Publique) avec option prélèvement à la source.",
    nativeCtaText: "Ouvrir l'outil →",
    nativeBadgeText: "Nouveau 2026",
    category: "Emploi & Rémunération",
    keywords: [
      "calcul salaire brut en net",
      "simulateur brut net 2026",
      "salaire cadre non cadre",
      "smic net 2026",
      "convertisseur brut net france",
    ],
    icon: "briefcase",
    accent: "indigo",
    highlights: [
      "Statuts Non-Cadre, Cadre & Public",
      "Bascule Mensuel / Annuel & Temps partiel",
      "Estimation net après impôt (PAS)",
    ],
    relatedIds: ["calculateur-tva", "frais-kilometriques", "stromverbrauch-rechner"],
  },
  {
    id: "frais-kilometriques",
    slug: "/fr/frais-kilometriques",
    language: "fr",
    locale: "fr_FR",
    dir: "ltr",
    title: "Calculateur Frais Kilométriques 2026",
    shortTitle: "Frais Kilométriques",
    shortDescription:
      "Calculez vos indemnités kilométriques déductibles des impôts selon le barème fiscal officiel 2026 (puissance fiscale 3 CV à 7 CV+ et majoration électrique +20 %).",
    nativeCtaText: "Ouvrir l'outil →",
    nativeBadgeText: "Barème 2026",
    category: "Impôts & Mobilité",
    keywords: [
      "frais kilometriques 2026",
      "bareme kilometrique impots",
      "indemnite kilometrique voiture electrique",
      "calcul frais reels cv",
    ],
    icon: "car",
    accent: "teal",
    highlights: [
      "Tranches officielles 3 CV à 7 CV+",
      "Majoration +20 % véhicule électrique",
      "Comparatif frais réels vs 10 %",
    ],
    relatedIds: ["calcul-brut-net", "calculateur-tva", "stromverbrauch-rechner"],
  },
  {
    id: "stromverbrauch-rechner",
    slug: "/de/stromverbrauch-rechner",
    language: "de",
    locale: "de_DE",
    dir: "ltr",
    title: "Stromverbrauch & Stromkosten Rechner",
    shortTitle: "Stromverbrauch Rechner",
    shortDescription:
      "Berechnen Sie den Stromverbrauch (kWh) sowie Tages-, Monats- und Jahreskosten Ihrer Haushaltsgeräte inklusive praktischer Geräte-Presets und aktueller Strompreise.",
    nativeCtaText: "Rechner öffnen →",
    nativeBadgeText: "Aktiv",
    category: "Energie & Haushalt",
    keywords: [
      "stromverbrauch rechner",
      "stromkosten berechnen",
      "watt in kwh umrechnen",
      "strompreis 2026 deutschland",
      "haushaltsgeraete stromkosten",
    ],
    icon: "zap",
    accent: "emerald",
    highlights: [
      "Watt in kWh & Euro umrechnen",
      "Geräte-Presets (Kühlschrank, PC, TV)",
      "Tages-, Monats- & Jahresauswertung",
    ],
    relatedIds: ["dreisatz-rechner", "calculateur-tva", "calcul-brut-net"],
  },
  {
    id: "dreisatz-rechner",
    slug: "/de/dreisatz-rechner",
    language: "de",
    locale: "de_DE",
    dir: "ltr",
    title: "Dreisatz Rechner (Proportional & Antiproportional)",
    shortTitle: "Dreisatz Rechner",
    shortDescription:
      "Lösen Sie den direkten (proportionalen) und indirekten (antiproportionalen) Dreisatz blitzschnell inklusive ausführlichem Schritt-für-Schritt-Lösungsweg.",
    nativeCtaText: "Rechner öffnen →",
    nativeBadgeText: "Neu",
    category: "Mathematik & Alltag",
    keywords: [
      "dreisatz rechner",
      "proportionaler dreisatz",
      "antiproportionaler dreisatz",
      "dreisatz formel",
      "verhaeltnisgleichung loesen",
    ],
    icon: "scale",
    accent: "violet",
    highlights: [
      "Direkt & Indirekt (antiproportional)",
      "Live Schritt-für-Schritt-Rechnung",
      "Praxis-Beispiele mit 1 Klick",
    ],
    relatedIds: ["stromverbrauch-rechner", "calculadora-regla-de-tres", "calculateur-tva"],
  },
  {
    id: "calculadora-iva",
    slug: "/es/calculadora-iva",
    language: "es",
    locale: "es_ES",
    dir: "ltr",
    title: "Calculadora de IVA (España y Latam)",
    shortTitle: "Calculadora de IVA",
    shortDescription:
      "Calcule la Base Imponible, la Cuota de IVA y el Total con IVA al instante. Compatible con los tipos españoles (21 %, 10 %, 4 %) y tasas de México, Colombia, Chile y Argentina.",
    nativeCtaText: "Abrir calculadora →",
    nativeBadgeText: "Nueva 2026",
    category: "Fiscalidad & Empresas",
    keywords: [
      "calculadora de iva",
      "calcular iva 21 españa",
      "quitar iva precio final",
      "base imponible cuota iva",
      "iva mexico colombia argentina",
    ],
    icon: "receipt",
    accent: "blue",
    highlights: [
      "IVA España 21 %, 10 %, 4 % y Latam",
      "Añadir IVA o extraer Base Imponible",
      "Copia instantánea para facturación",
    ],
    relatedIds: ["calculadora-regla-de-tres", "calculadora-dias-habiles", "calculateur-tva"],
  },
  {
    id: "calculadora-dias-habiles",
    slug: "/es/calculadora-dias-habiles",
    language: "es",
    locale: "es_ES",
    dir: "ltr",
    title: "Calculadora de Días Hábiles y Laborables",
    shortTitle: "Días Hábiles",
    shortDescription:
      "Sume o reste días hábiles a cualquier fecha excluyendo automáticamente sábados y domingos para calcular vencimientos administrativos, judiciales y laborales.",
    nativeCtaText: "Abrir calculadora →",
    nativeBadgeText: "Activa",
    category: "Legal & Gestión",
    keywords: [
      "calculadora dias habiles",
      "contar dias laborables",
      "plazos ley 39/2015",
      "sumar dias habiles a una fecha",
    ],
    icon: "calendar",
    accent: "amber",
    highlights: [
      "Sumar o restar días hábiles",
      "Exclusión automática de fines de semana",
      "Cómputo de días naturales totales",
    ],
    relatedIds: ["calculadora-iva", "calculadora-regla-de-tres", "hijri-age-calculator"],
  },
  {
    id: "calculadora-regla-de-tres",
    slug: "/es/calculadora-regla-de-tres",
    language: "es",
    locale: "es_ES",
    dir: "ltr",
    title: "Calculadora de Regla de Tres Simple",
    shortTitle: "Regla de Tres",
    shortDescription:
      "Resuelva proporciones matemáticas directas e inversas al instante con explicación visual de la fórmula y desglose paso a paso para precios, recetas o escalas.",
    nativeCtaText: "Abrir calculadora →",
    nativeBadgeText: "Activa",
    category: "Matemáticas & Utilidades",
    keywords: [
      "calculadora regla de tres",
      "regla de tres directa",
      "regla de tres inversa",
      "proporcionalidad paso a paso",
    ],
    icon: "divide",
    accent: "indigo",
    highlights: [
      "Regla de tres directa e inversa",
      "Desglose matemático paso a paso",
      "Ejemplos interactivos cotidianos",
    ],
    relatedIds: ["calculadora-iva", "calculadora-dias-habiles", "dreisatz-rechner"],
  },
  {
    id: "vat-calculator-saudi",
    slug: "/ar/vat-calculator-saudi",
    language: "ar",
    locale: "ar_SA",
    dir: "rtl",
    title: "حاسبة ضريبة القيمة المضافة 15% (السعودية والإمارات)",
    shortTitle: "حاسبة ضريبة القيمة المضافة 15%",
    shortDescription:
      "احسب ضريبة القيمة المضافة في السعودية (15%) والإمارات (5%) بدقة فائقة: إضافة الضريبة إلى المبلغ الصافي أو استخراج قيمة الضريبة والمبلغ قبل الضريبة من السعر الشامل.",
    nativeCtaText: "← افتح الحاسبة",
    nativeBadgeText: "جديد 2026",
    category: "المالية والضرائب",
    keywords: [
      "حاسبة ضريبة القيمة المضافة 15",
      "حساب الضريبة السعودية",
      "استخراج الضريبة من المبلغ الشامل",
      "ضريبة القيمة المضافة الامارات 5",
      "حاسبة الزكاة والضريبة",
    ],
    icon: "landmark",
    accent: "emerald",
    highlights: [
      "نسبة 15% للسعودية و5% للإمارات ومخصصة",
      "إضافة الضريبة أو استخراجها من الشامل",
      "واجهة عربية متكاملة RTL ونسخ بضغطة واحدة",
    ],
    relatedIds: ["hijri-age-calculator", "calculateur-tva", "calculadora-iva"],
  },
  {
    id: "hijri-age-calculator",
    slug: "/ar/hijri-age-calculator",
    language: "ar",
    locale: "ar_SA",
    dir: "rtl",
    title: "حاسبة العمر بالهجري والميلادي",
    shortTitle: "حاسبة العمر الهجري",
    shortDescription:
      "احسب عمرك بدقة بالسنوات والشهور والأيام بالتقويمين الهجري (أم القرى) والميلادي، واعرف يوم ميلادك والعد التنازلي لعيد ميلادك القادم وإجمالي الأيام والساعات.",
    nativeCtaText: "← افتح الحاسبة",
    nativeBadgeText: "متاح الآن",
    category: "أدوات التوقيت والتاريخ",
    keywords: [
      "حاسبة العمر بالهجري والميلادي",
      "حساب العمر ام القرى",
      "كم عمري بالهجري",
      "تحويل تاريخ الميلاد هجري ميلادي",
    ],
    icon: "moon",
    accent: "teal",
    highlights: [
      "حساب العمر الهجري والميلادي معاً",
      "تحويل فوري حسب تقويم أم القرى",
      "إجمالي الأيام والأسابيع والعد التنازلي",
    ],
    relatedIds: ["vat-calculator-saudi", "calculadora-dias-habiles", "calcul-brut-net"],
  },
];

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((tool) => tool.id === id);
}

export function getToolsByLanguage(language: LanguageCode): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((tool) => tool.language === language);
}

export function getLanguageHub(language: LanguageCode): LanguageHubMeta {
  return LANGUAGE_HUBS[language];
}

export function getRelatedTools(toolId: string, limit = 3): ToolDefinition[] {
  const current = getToolById(toolId);
  if (!current) {
    return TOOLS_REGISTRY.slice(0, limit);
  }

  const mapped = current.relatedIds
    .map((id) => getToolById(id))
    .filter((t): t is ToolDefinition => Boolean(t && t.id !== toolId));

  if (mapped.length >= limit) {
    return mapped.slice(0, limit);
  }

  const sameLangFallback = TOOLS_REGISTRY.filter(
    (t) => t.id !== toolId && !mapped.some((m) => m.id === t.id)
  );
  return [...mapped, ...sameLangFallback].slice(0, limit);
}
