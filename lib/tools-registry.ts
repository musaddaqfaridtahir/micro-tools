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
  | "landmark"
  | "percent"
  | "home";

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
      "Suite complète de 4 outils gratuits conformes aux barèmes et taux français 2026 : calcul TVA HT/TTC, simulateur salaire Brut en Net, frais kilométriques fiscaux et calcul de pourcentage & soldes.",
    seoTitle: "Outils & Calculateurs Gratuits en Français (TVA, Salaire Brut/Net, Frais Km, Pourcentage 2026)",
    seoDescription:
      "Accédez gratuitement à nos 4 calculateurs en ligne pour la France : TVA (20%, 10%, 5,5%, 2,1%), salaire brut en net 2026, barème kilométrique et pourcentages/remises.",
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
      "Präzise, kostenlose Web-Rechner ohne Anmeldung und ohne Datenspeicherung: Mehrwertsteuer (19 % & 7 %), Prozentrechner & Rabatte, Stromverbrauch (kWh) und Dreisatz.",
    seoTitle: "Kostenlose Online-Rechner auf Deutsch (MwSt., Prozent, Stromverbrauch & Dreisatz 2026)",
    seoDescription:
      "4 präzise Online-Rechner für Deutschland: Mehrwertsteuer-Rechner (19% & 7%), Prozentrechner, Stromverbrauch- & Kostenrechner sowie Dreisatz-Rechner kostenlos nutzen.",
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
      "4 herramientas rápidas en español para España y Latinoamérica: cálculo de IVA (21 %, 10 %, 4 % y Latam), cuota mensual de hipoteca y préstamos, días hábiles legales y regla de tres.",
    seoTitle: "Calculadoras Online Gratis en Español (IVA, Hipoteca, Días Hábiles y Regla de Tres 2026)",
    seoDescription:
      "4 calculadoras precisas en español: Calculadora de IVA, Hipoteca y Préstamos (sistema francés), Días Hábiles laborales y Regla de Tres directa e inversa.",
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
      "4 أدوات إلكترونية دقيقة باللغة العربية تعمل مباشرة من المتصفح دون تسجيل أو حفظ للبيانات: ضريبة القيمة المضافة 15%، مكافأة نهاية الخدمة السعودية، النسبة المئوية والخصم، والعمر الهجري.",
    seoTitle: "أدوات وحاسبات عربية مجانية أونلاين (الضريبة 15%، نهاية الخدمة، النسبة المئوية والعمر الهجري 2026)",
    seoDescription:
      "4 حاسبات مجانية باللغة العربية: ضريبة القيمة المضافة في السعودية والإمارات، مكافأة نهاية الخدمة وفق نظام العمل السعودي، النسبة المئوية والخصم، والعمر الهجري والميلادي.",
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
    relatedIds: ["calcul-brut-net", "calculateur-tva", "calcul-pourcentage"],
  },
  {
    id: "calcul-pourcentage",
    slug: "/fr/calcul-pourcentage",
    language: "fr",
    locale: "fr_FR",
    dir: "ltr",
    title: "Calculateur de Pourcentage et Remise (Soldes)",
    shortTitle: "Pourcentage & Soldes",
    shortDescription:
      "Calculez le pourcentage d'un nombre, un taux d'évolution (hausse ou baisse) et le prix final après remise (-10 %, -20 %, -30 %, -50 %) avec économie en €.",
    nativeCtaText: "Ouvrir l'outil →",
    nativeBadgeText: "Nouveau 2026",
    category: "Mathématiques & Shopping",
    keywords: [
      "calculateur pourcentage",
      "calcul remise soldes",
      "calculer augmentation pourcentage",
      "prix apres reduction",
      "pourcentage d un nombre",
    ],
    icon: "percent",
    accent: "violet",
    highlights: [
      "Pourcentage simple, évolution & soldes",
      "Boutons rapides -10 %, -20 %, -30 %, -50 %",
      "Montant économisé & copie en 1 clic",
    ],
    relatedIds: ["calculateur-tva", "calcul-brut-net", "prozentrechner"],
  },
  {
    id: "mehrwertsteuer-rechner",
    slug: "/de/mehrwertsteuer-rechner",
    language: "de",
    locale: "de_DE",
    dir: "ltr",
    title: "Mehrwertsteuer-Rechner (19 % & 7 % Deutschland)",
    shortTitle: "Mehrwertsteuer-Rechner",
    shortDescription:
      "Berechnen Sie Nettobetrag, MwSt.-Betrag (19 % Regelsteuersatz, 7 % ermäßigt oder eigener Satz) und Bruttobetrag in Euro sekundenschnell vorwärts und rückwärts.",
    nativeCtaText: "Rechner öffnen →",
    nativeBadgeText: "Neu 2026",
    category: "Finanzen & Steuern",
    keywords: [
      "mehrwertsteuer rechner",
      "mwst berechnen 19 prozent",
      "netto brutto rechner",
      "umsatzsteuer 7 prozent",
      "brutto zu netto",
    ],
    icon: "receipt",
    accent: "blue",
    highlights: [
      "Netto zu Brutto & Brutto zu Netto",
      "Schnellwahl 19 %, 7 % & eigener Satz",
      "Sofortiges Euro-Ergebnis mit 1-Klick-Kopie",
    ],
    relatedIds: ["prozentrechner", "stromverbrauch-rechner", "calculateur-tva"],
  },
  {
    id: "prozentrechner",
    slug: "/de/prozentrechner",
    language: "de",
    locale: "de_DE",
    dir: "ltr",
    title: "Prozentrechner – Prozentwert, Prozentsatz & Rabatt",
    shortTitle: "Prozentrechner",
    shortDescription:
      "Drei präzise Rechenmodi: Prozentwert berechnen (X % von Y), Prozentsatz ermitteln sowie Aufschlag (+%) oder Rabatt (-%) inklusive Ersparnis in Euro.",
    nativeCtaText: "Rechner öffnen →",
    nativeBadgeText: "Neu 2026",
    category: "Mathematik & Alltag",
    keywords: [
      "prozentrechner",
      "prozentwert berechnen",
      "prozentsatz berechnen",
      "rabatt rechner euro",
      "prozentuale veraenderung",
    ],
    icon: "percent",
    accent: "indigo",
    highlights: [
      "3 Modi: Prozentwert, Prozentsatz, Rabatt",
      "Aufschlag (+%) & Ersparnis (-%) in €",
      "Schritt-für-Schritt-Formel & Presets",
    ],
    relatedIds: ["mehrwertsteuer-rechner", "dreisatz-rechner", "calcul-pourcentage"],
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
    relatedIds: ["mehrwertsteuer-rechner", "prozentrechner", "dreisatz-rechner"],
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
    nativeBadgeText: "Aktiv",
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
    relatedIds: ["prozentrechner", "mehrwertsteuer-rechner", "calculadora-regla-de-tres"],
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
    nativeBadgeText: "Activa",
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
    relatedIds: ["calculadora-hipoteca", "calculadora-regla-de-tres", "calculadora-dias-habiles"],
  },
  {
    id: "calculadora-hipoteca",
    slug: "/es/calculadora-hipoteca",
    language: "es",
    locale: "es_ES",
    dir: "ltr",
    title: "Calculadora de Hipoteca y Préstamos (Cuota Mensual)",
    shortTitle: "Hipoteca y Préstamos",
    shortDescription:
      "Calcule la cuota mensual exacta según el Sistema Francés, el total de intereses y el desglose completo del préstamo por capital, TIN y plazo en años o meses.",
    nativeCtaText: "Abrir calculadora →",
    nativeBadgeText: "Nueva 2026",
    category: "Finanzas & Vivienda",
    keywords: [
      "calculadora hipoteca",
      "simulador cuota mensual prestamo",
      "sistema amortizacion frances",
      "calcular intereses hipoteca",
      "cuota prestamo personal",
    ],
    icon: "home",
    accent: "emerald",
    highlights: [
      "Sistema Francés (cuota mensual constante)",
      "Desglose Capital vs Total Intereses",
      "Plazo en años o meses (€ / $)",
    ],
    relatedIds: ["calculadora-iva", "calculadora-dias-habiles", "calculadora-regla-de-tres"],
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
    relatedIds: ["hijri-age-calculator", "end-of-service-calculator", "percentage-calculator"],
  },
  {
    id: "end-of-service-calculator",
    slug: "/ar/end-of-service-calculator",
    language: "ar",
    locale: "ar_SA",
    dir: "rtl",
    title: "حاسبة مكافأة نهاية الخدمة (نظام العمل السعودي)",
    shortTitle: "مكافأة نهاية الخدمة",
    shortDescription:
      "احسب مكافأة نهاية الخدمة بدقة وفق المادتين 84 و85 من نظام العمل السعودي حسب نوع العقد وسبب انتهاء الخدمة والراتب الأخير ومدة العمل بالسنوات والأشهر.",
    nativeCtaText: "← افتح الحاسبة",
    nativeBadgeText: "جديد 2026",
    category: "الموارد البشرية والعمل",
    keywords: [
      "حاسبة مكافأة نهاية الخدمة",
      "حساب نهاية الخدمة نظام العمل السعودي",
      "المادة 84 و 85 نظام العمل",
      "مكافأة الاستقالة السعودية",
      "تصفية مستحقات الموظف",
    ],
    icon: "briefcase",
    accent: "amber",
    highlights: [
      "المادة 84 و85 من نظام العمل السعودي",
      "نصف راتب لأول 5 سنوات وراتب كامل بعدها",
      "نسب الاستقالة (الثلث، الثلثان، كاملة)",
    ],
    relatedIds: ["vat-calculator-saudi", "percentage-calculator", "hijri-age-calculator"],
  },
  {
    id: "percentage-calculator",
    slug: "/ar/percentage-calculator",
    language: "ar",
    locale: "ar_SA",
    dir: "rtl",
    title: "حاسبة النسبة المئوية والخصم",
    shortTitle: "حاسبة النسبة المئوية",
    shortDescription:
      "أداة عربية شاملة لحساب النسبة المئوية من مبلغ، وحساب سعر المنتج بعد الخصم ومبلغ التوفير في التسوق، بالإضافة إلى نسبة الزيادة أو النقصان بين قيمتين.",
    nativeCtaText: "← افتح الحاسبة",
    nativeBadgeText: "جديد 2026",
    category: "الرياضيات والتسوق",
    keywords: [
      "حاسبة النسبة المئوية",
      "حساب الخصم والتوفير",
      "كم نسبة مبلغ من مبلغ",
      "حساب نسبة الزيادة والنقصان",
      "حاسبة العروض والتخفيضات",
    ],
    icon: "percent",
    accent: "violet",
    highlights: [
      "3 أوضاع: نسبة من مبلغ، خصم، تغيّر",
      "حساب التوفير والخصومات الفورية",
      "واجهة عربية RTL ونسخ بنقرة واحدة",
    ],
    relatedIds: ["vat-calculator-saudi", "end-of-service-calculator", "hijri-age-calculator"],
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
    relatedIds: ["end-of-service-calculator", "vat-calculator-saudi", "percentage-calculator"],
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
