// i18n.ts -- Dhoondho translation system
// Supports EN (default), HI (Hindi), MR (Marathi)
// Auto-detects browser language, persists selection via localStorage

type TranslationMap = Record<string, string>;

const SUPPORTED_LANGUAGES = ["en", "hi", "mr"] as const;
type LangCode = (typeof SUPPORTED_LANGUAGES)[number];

const TRANSLATIONS: Record<LangCode, TranslationMap> = {
  en: {
    // Core actions
    search: "Dhundho Search",
    map: "Explore on Map",
    nearby: "Nearby Now",
    // Search
    searchPlaceholder: "Search services, businesses in India",
    searchResults: "Search Results",
    searching: "Searching...",
    noResults: "No results found",
    // Navigation
    about: "About",
    blog: "Blog",
    forBusinesses: "For Businesses",
    admin: "Admin",
    home: "Home",
    searchPage: "Search",
    // Auth
    signIn: "Sign In",
    signOut: "Sign Out",
    myAccount: "My Account",
    myListings: "My Listings",
    // Language switcher
    offeredIn: "Dhoondho offered in:",
    // Home
    categories: "BROWSE CATEGORIES",
    tagline: "India's First Local Search Engine",
    // Location
    location_detected: "Your Location:",
    locationDetected: "Location detected",
    enable_location: "Enable location for better results",
    enableLocation: "Enable location for better results",
    detectingLocation: "Detecting your location...",
    locationDenied:
      "Location access denied. Enable it for better nearby results.",
    locationLoading: "Detecting location...",
    // About
    aboutDhoondho: "About Dhoondho",
    // Footer
    terms: "Terms",
    privacyPolicy: "Privacy Policy",
    privacyTerms: "Privacy & Terms",
    cookies: "Cookies",
    support: "Support",
    copyright: "\u00a9 2025 - 2026 | Dhoondho India",
    // Misc
    nearbyResults: "Nearby businesses",
    loading: "Loading...",
    viewMap: "View on Map",
    viewList: "List View",
    allCategories: "All Categories",
    enterCity: "Enter city or use GPS",
    geolocationNotSupported: "Geolocation is not supported in your browser.",
    couldNotGetLocation: "Could not get your location. Please try again.",
    voiceNotSupported: "Voice search not supported in this browser.",
    couldNotCaptureVoice: "Could not capture voice.",
    india: "India",
  },
  hi: {
    search: "ढूंढो सर्च",
    map: "मैप पर खोजें",
    nearby: "आस-पास अभी",
    searchPlaceholder: "भारत में सेवाएं और व्यवसाय खोजें",
    searchResults: "खोज परिणाम",
    searching: "खोज रहे हैं...",
    noResults: "कोई परिणाम नहीं मिला",
    about: "जानकारी",
    blog: "ब्लॉग",
    forBusinesses: "व्यवसाय के लिए",
    admin: "एडमिन",
    home: "होम",
    searchPage: "खोजें",
    signIn: "साइन इन",
    signOut: "साइन आउट",
    myAccount: "मेरा खाता",
    myListings: "मेरी लिस्टिंग",
    offeredIn: "ढूंढो इसमें उपलब्ध:",
    categories: "श्रेणियां देखें",
    tagline: "भारत का पहला स्थानीय सर्च इंजन",
    location_detected: "आपका स्थान:",
    locationDetected: "स्थान पता चला",
    enable_location: "बेहतर परिणामों के लिए लोकेशन चालू करें",
    enableLocation: "बेहतर परिणामों के लिए लोकेशन चालू करें",
    detectingLocation: "आपका स्थान पता चल रहा है...",
    locationDenied:
      "स्थान अनुमति अस्वीकृत। आस-पास के बेहतर परिणामों के लिए इसे सक्षम करें।",
    locationLoading: "स्थान पता लगाया जा रहा है...",
    aboutDhoondho: "ढूंढो के बारे में",
    terms: "नियम और शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    privacyTerms: "गोपनीयता और नियम",
    cookies: "कुकीज़",
    support: "सहायता",
    copyright: "\u00a9 2025 - 2026 | ढूंढो इंडिया",
    nearbyResults: "आस-पास के व्यवसाय",
    loading: "लोड हो रहा है...",
    viewMap: "मैप पर देखें",
    viewList: "सूची देखें",
    allCategories: "सभी श्रेणियां",
    enterCity: "शहर दर्ज करें या GPS उपयोग करें",
    geolocationNotSupported: "आपके ब्राउज़र में जियोलोकेशन समर्थित नहीं है।",
    couldNotGetLocation: "आपका स्थान नहीं मिला। कृपया पुनः प्रयास करें।",
    voiceNotSupported: "इस ब्राउज़र में वॉइस सर्च समर्थित नहीं है।",
    couldNotCaptureVoice: "आवाज़ कैप्चर नहीं हो सकी।",
    india: "भारत",
  },
  mr: {
    search: "शोधा शोध",
    map: "नकाशावर शोधा",
    nearby: "जवळपास आता",
    searchPlaceholder: "भारतात सेवा आणि व्यवसाय शोधा",
    searchResults: "शोध निकाल",
    searching: "शोधत आहे...",
    noResults: "कोणताही निकाल सापडला नाही",
    about: "आमच्याबद्दल",
    blog: "ब्लॉग",
    forBusinesses: "व्यवसायांसाठी",
    admin: "प्रशासक",
    home: "मुख्यपृष्ठ",
    searchPage: "शोधा",
    signIn: "साइन इन",
    signOut: "साइन आउट",
    myAccount: "माझे खाते",
    myListings: "माझ्या याद्या",
    offeredIn: "ढूंढो यामध्ये उपलब्ध:",
    categories: "श्रेणी पहा",
    tagline: "भारताचे पहिले स्थानिक सर्च इंजिन",
    location_detected: "तुमचे स्थान:",
    locationDetected: "स्थान सापडले",
    enable_location: "चांगल्या निकालांसाठी स्थान चालू करा",
    enableLocation: "चांगल्या निकालांसाठी स्थान चालू करा",
    detectingLocation: "तुमचे स्थान शोधत आहे...",
    locationDenied:
      "स्थान परवानगी नाकारली. जवळपासच्या चांगल्या निकालांसाठी ते सक्षम करा.",
    locationLoading: "स्थान शोधत आहे...",
    aboutDhoondho: "ढूंढो बद्दल",
    terms: "अटी व शर्ती",
    privacyPolicy: "गोपनीयता धोरण",
    privacyTerms: "गोपनीयता आणि अटी",
    cookies: "कुकीज",
    support: "मदत",
    copyright: "\u00a9 2025 - 2026 | ढूंढो इंडिया",
    nearbyResults: "जवळपासचे व्यवसाय",
    loading: "लोड होत आहे...",
    viewMap: "नकाशावर पहा",
    viewList: "यादी पहा",
    allCategories: "सर्व श्रेणी",
    enterCity: "शहर प्रविष्ट करा किंवा GPS वापरा",
    geolocationNotSupported: "तुमच्या ब्राउझरमध्ये जिओलोकेशन समर्थित नाही.",
    couldNotGetLocation: "तुमचे स्थान मिळवता आले नाही. कृपया पुन्हा प्रयत्न करा.",
    voiceNotSupported: "या ब्राउझरमध्ये व्हॉइस सर्च समर्थित नाही.",
    couldNotCaptureVoice: "आवाज कॅप्चर करता आला नाही.",
    india: "भारत",
  },
};

const LANG_STORAGE_KEY = "dhoondho_lang";
const changeCallbacks: Array<(lang: LangCode) => void> = [];

let currentLang: LangCode = "en";

function detectBrowserLanguage(): LangCode {
  const browserLang = (navigator.language || "").toLowerCase().split("-")[0];
  if (SUPPORTED_LANGUAGES.includes(browserLang as LangCode)) {
    return browserLang as LangCode;
  }
  return "en";
}

function initLanguage(): void {
  // localStorage override takes priority
  const stored = localStorage.getItem(LANG_STORAGE_KEY) as LangCode | null;
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    currentLang = stored;
  } else {
    currentLang = detectBrowserLanguage();
  }
}

// Initialize on module load
initLanguage();

export function t(key: string): string {
  return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

export function setLanguage(code: string): void {
  const lang = SUPPORTED_LANGUAGES.includes(code as LangCode)
    ? (code as LangCode)
    : "en";
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  // Notify all subscribers
  for (const cb of changeCallbacks) {
    cb(lang);
  }
}

export function getCurrentLanguage(): string {
  return currentLang;
}

export function onLanguageChange(callback: (lang: string) => void): () => void {
  changeCallbacks.push(callback);
  return () => {
    const idx = changeCallbacks.indexOf(callback);
    if (idx !== -1) changeCallbacks.splice(idx, 1);
  };
}

export const LANG_NAMES: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
};
