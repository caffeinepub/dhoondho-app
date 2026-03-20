var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _disableTimeVerification, _agent, _inner, _expirationTime, _rawKey, _derKey, _a2, _currentInterval, _randomizationFactor, _multiplier, _maxInterval, _startTime, _maxElapsedTime, _maxIterations, _date, _count, _rootKeyPromise, _shouldFetchRootKey, _timeDiffMsecs, _hasSyncedTime, _syncTimePromise, _shouldSyncTime, _identity, _fetch, _fetchOptions, _callOptions, _credentials, _retryTimes, _backoffStrategy, _maxIngressExpiryInMinutes, _HttpAgent_instances, maxIngressExpiryInMs_get, _queryPipeline, _updatePipeline, _subnetKeys, _verifyQuerySignatures, requestAndRetryQuery_fn, requestAndRetry_fn, _verifyQueryResponse, asyncGuard_fn, rootKeyGuard_fn, syncTimeGuard_fn, _rawKey2, _derKey2, _publicKey, _privateKey, _inner2, _delegation, _options;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const SUPPORTED_LANGUAGES = [
  "en",
  "hi",
  "mr",
  "ta",
  "te",
  "kn",
  "ml",
  "pa",
  "bn",
  "gu"
];
const EN_TRANSLATIONS = {
  search: "Dhoondho Search",
  map: "Explore on Map",
  nearby: "Nearby Now",
  searchPlaceholder: "Search services, businesses in India",
  searchResults: "Search Results",
  searching: "Searching...",
  noResults: "No results found",
  about: "About",
  blog: "Blog",
  forBusinesses: "For Businesses",
  admin: "Admin",
  home: "Home",
  searchPage: "Search",
  signIn: "Sign In",
  signOut: "Sign Out",
  myAccount: "My Account",
  myListings: "My Listings",
  offeredIn: "Dhoondho offered in:",
  categories: "BROWSE CATEGORIES",
  tagline: "India's First Local Search Engine",
  location_detected: "Your Location:",
  locationDetected: "Location detected",
  enable_location: "Enable location for better results",
  enableLocation: "Enable location for better results",
  detectingLocation: "Detecting your location...",
  locationDenied: "Location access denied. Enable it for better nearby results.",
  locationLoading: "Detecting location...",
  aboutDhoondho: "About Dhoondho",
  terms: "Terms",
  privacyPolicy: "Privacy Policy",
  privacyTerms: "Privacy & Terms",
  cookies: "Cookies",
  support: "Support",
  copyright: "© 2025 - 2026 | Dhoondho India",
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
  india: "India"
};
const TRANSLATIONS = {
  en: EN_TRANSLATIONS,
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
    locationDenied: "स्थान अनुमति अस्वीकृत। आस-पास के बेहतर परिणामों के लिए इसे सक्षम करें।",
    locationLoading: "स्थान पता लगाया जा रहा है...",
    aboutDhoondho: "ढूंढो के बारे में",
    terms: "नियम और शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    privacyTerms: "गोपनीयता और नियम",
    cookies: "कुकीज़",
    support: "सहायता",
    copyright: "© 2025 - 2026 | ढूंढो इंडिया",
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
    india: "भारत"
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
    locationDenied: "स्थान परवानगी नाकारली. जवळपासच्या चांगल्या निकालांसाठी ते सक्षम करा.",
    locationLoading: "स्थान शोधत आहे...",
    aboutDhoondho: "ढूंढो बद्दल",
    terms: "अटी व शर्ती",
    privacyPolicy: "गोपनीयता धोरण",
    privacyTerms: "गोपनीयता आणि अटी",
    cookies: "कुकीज",
    support: "मदत",
    copyright: "© 2025 - 2026 | ढूंढो इंडिया",
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
    india: "भारत"
  },
  ta: {
    search: "தேடு தேடல்",
    map: "வரைபடத்தில் ஆராயுங்கள்",
    nearby: "அருகில் இப்போது",
    searchPlaceholder: "இந்தியாவில் சேவைகள் மற்றும் வணிகங்களை தேடுங்கள்",
    searchResults: "தேடல் முடிவுகள்",
    searching: "தேடுகிறது...",
    noResults: "எந்த முடிவும் கிடைக்கவில்லை",
    about: "எங்களைப் பற்றி",
    blog: "வலைப்பதிவு",
    forBusinesses: "வணிகங்களுக்காக",
    admin: "நிர்வாகி",
    home: "முகப்பு",
    searchPage: "தேடு",
    signIn: "உள்நுழைய",
    signOut: "வெளியேறு",
    myAccount: "என் கணக்கு",
    myListings: "என் பட்டியல்கள்",
    offeredIn: "தூண்டோ கிடைக்கும் மொழிகள்:",
    categories: "வகைகளை உலாவுங்கள்",
    tagline: "இந்தியாவின் முதல் உள்ளூர் தேடல் இயந்திரம்",
    location_detected: "உங்கள் இடம்:",
    locationDetected: "இடம் கண்டறியப்பட்டது",
    enable_location: "சிறந்த முடிவுகளுக்கு இடத்தை இயக்கவும்",
    enableLocation: "சிறந்த முடிவுகளுக்கு இடத்தை இயக்கவும்",
    detectingLocation: "உங்கள் இடத்தை கண்டறிகிறது...",
    locationDenied: "இட அனுமதி மறுக்கப்பட்டது. அருகிலுள்ள முடிவுகளுக்கு இயக்கவும்.",
    locationLoading: "இடம் கண்டறிகிறது...",
    aboutDhoondho: "தூண்டோ பற்றி",
    terms: "விதிமுறைகள்",
    privacyPolicy: "தனியுரிமை கொள்கை",
    privacyTerms: "தனியுரிமை மற்றும் விதிமுறைகள்",
    cookies: "குக்கீகள்",
    support: "உதவி",
    copyright: "© 2025 - 2026 | தூண்டோ இந்தியா",
    nearbyResults: "அருகிலுள்ள வணிகங்கள்",
    loading: "ஏற்றுகிறது...",
    viewMap: "வரைபடத்தில் பார்க்கவும்",
    viewList: "பட்டியல் காட்சி",
    allCategories: "அனைத்து வகைகளும்",
    enterCity: "நகரை உள்ளிடவும் அல்லது GPS பயன்படுத்தவும்",
    geolocationNotSupported: "உங்கள் உலாவியில் ஜியோலோகேஷன் ஆதரிக்கப்படவில்லை.",
    couldNotGetLocation: "உங்கள் இடத்தை பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    voiceNotSupported: "இந்த உலாவியில் குரல் தேடல் ஆதரிக்கப்படவில்லை.",
    couldNotCaptureVoice: "குரலை பதிவு செய்ய முடியவில்லை.",
    india: "இந்தியா"
  },
  te: {
    search: "ధూంధో సెర్చ్",
    map: "మ్యాప్‌లో అన్వేషించండి",
    nearby: "దగ్గర ఇప్పుడు",
    searchPlaceholder: "భారతదేశంలో సేవలు మరియు వ్యాపారాలను వెతకండి",
    searchResults: "శోధన ఫలితాలు",
    searching: "వెతుకుతున్నాము...",
    noResults: "ఫలితాలు కనుగొనబడలేదు",
    about: "మా గురించి",
    blog: "బ్లాగ్",
    forBusinesses: "వ్యాపారాల కోసం",
    admin: "అడ్మిన్",
    home: "హోమ్",
    searchPage: "వెతకండి",
    signIn: "సైన్ ఇన్",
    signOut: "సైన్ అవుట్",
    myAccount: "నా ఖాతా",
    myListings: "నా జాబితాలు",
    offeredIn: "ధూంధో అందుబాటులో ఉంది:",
    categories: "వర్గాలు చూడండి",
    tagline: "భారతదేశపు మొదటి స్థానిక సెర్చ్ ఇంజిన్",
    location_detected: "మీ స్థానం:",
    locationDetected: "స్థానం గుర్తించబడింది",
    enable_location: "మెరుగైన ఫలితాల కోసం స్థానాన్ని ఆన్ చేయండి",
    enableLocation: "మెరుగైన ఫలితాల కోసం స్థానాన్ని ఆన్ చేయండి",
    detectingLocation: "మీ స్థానాన్ని గుర్తిస్తున్నాము...",
    locationDenied: "స్థాన అనుమతి నిరాకరించబడింది. దగ్గర ఫలితాల కోసం ఆన్ చేయండి.",
    locationLoading: "స్థానం గుర్తిస్తున్నాము...",
    aboutDhoondho: "ధూంధో గురించి",
    terms: "నిబంధనలు",
    privacyPolicy: "గోప్యతా విధానం",
    privacyTerms: "గోప్యత మరియు నిబంధనలు",
    cookies: "కుకీలు",
    support: "సహాయం",
    copyright: "© 2025 - 2026 | ధూంధో ఇండియా",
    nearbyResults: "దగ్గర వ్యాపారాలు",
    loading: "లోడ్ అవుతుంది...",
    viewMap: "మ్యాప్‌లో చూడండి",
    viewList: "జాబితా వీక్షణ",
    allCategories: "అన్ని వర్గాలు",
    enterCity: "నగరాన్ని నమోదు చేయండి లేదా GPS ఉపయోగించండి",
    geolocationNotSupported: "మీ బ్రౌజర్‌లో జియోలొకేషన్ మద్దతు లేదు.",
    couldNotGetLocation: "మీ స్థానాన్ని పొందలేకపోయాము. మళ్ళీ ప్రయత్నించండి.",
    voiceNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ సెర్చ్ మద్దతు లేదు.",
    couldNotCaptureVoice: "వాయిస్ క్యాప్చర్ చేయలేకపోయాము.",
    india: "భారతదేశం"
  },
  kn: {
    search: "ಧೂಂಧೋ ಹುಡುಕಾಟ",
    map: "ನಕ್ಷೆಯಲ್ಲಿ ಅನ್ವೇಷಿಸಿ",
    nearby: "ಹತ್ತಿರ ಈಗ",
    searchPlaceholder: "ಭಾರತದಲ್ಲಿ ಸೇವೆಗಳು ಮತ್ತು ವ್ಯವಹಾರಗಳನ್ನು ಹುಡುಕಿ",
    searchResults: "ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು",
    searching: "ಹುಡುಕುತ್ತಿದ್ದೇವೆ...",
    noResults: "ಯಾವುದೇ ಫಲಿತಾಂಶ ಕಂಡುಬಂದಿಲ್ಲ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    blog: "ಬ್ಲಾಗ್",
    forBusinesses: "ವ್ಯವಹಾರಗಳಿಗಾಗಿ",
    admin: "ನಿರ್ವಾಹಕ",
    home: "ಮುಖಪುಟ",
    searchPage: "ಹುಡುಕಿ",
    signIn: "ಸೈನ್ ಇನ್",
    signOut: "ಸೈನ್ ಔಟ್",
    myAccount: "ನನ್ನ ಖಾತೆ",
    myListings: "ನನ್ನ ಪಟ್ಟಿಗಳು",
    offeredIn: "ಧೂಂಧೋ ಲಭ್ಯವಿದೆ:",
    categories: "ವರ್ಗಗಳನ್ನು ನೋಡಿ",
    tagline: "ಭಾರತದ ಮೊದಲ ಸ್ಥಳೀಯ ಸರ್ಚ್ ಇಂಜಿನ್",
    location_detected: "ನಿಮ್ಮ ಸ್ಥಳ:",
    locationDetected: "ಸ್ಥಳ ಪತ್ತೆಯಾಯಿತು",
    enable_location: "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಸ್ಥಳ ಚಾಲೂ ಮಾಡಿ",
    enableLocation: "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಸ್ಥಳ ಚಾಲೂ ಮಾಡಿ",
    detectingLocation: "ನಿಮ್ಮ ಸ್ಥಳ ಪತ್ತೆ ಮಾಡುತ್ತಿದ್ದೇವೆ...",
    locationDenied: "ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಹತ್ತಿರದ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಚಾಲೂ ಮಾಡಿ.",
    locationLoading: "ಸ್ಥಳ ಪತ್ತೆ ಮಾಡುತ್ತಿದ್ದೇವೆ...",
    aboutDhoondho: "ಧೂಂಧೋ ಬಗ್ಗೆ",
    terms: "ನಿಯಮಗಳು",
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    privacyTerms: "ಗೌಪ್ಯತೆ ಮತ್ತು ನಿಯಮಗಳು",
    cookies: "ಕುಕೀಗಳು",
    support: "ಸಹಾಯ",
    copyright: "© 2025 - 2026 | ಧೂಂಧೋ ಇಂಡಿಯಾ",
    nearbyResults: "ಹತ್ತಿರದ ವ್ಯವಹಾರಗಳು",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    viewMap: "ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ",
    viewList: "ಪಟ್ಟಿ ನೋಟ",
    allCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    enterCity: "ನಗರ ನಮೂದಿಸಿ ಅಥವಾ GPS ಬಳಸಿ",
    geolocationNotSupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಜಿಯೋಲೊಕೇಶನ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
    couldNotGetLocation: "ನಿಮ್ಮ ಸ್ಥಳ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    voiceNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಾಯ್ಸ್ ಸರ್ಚ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
    couldNotCaptureVoice: "ವಾಯ್ಸ್ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    india: "ಭಾರತ"
  },
  ml: {
    search: "ധൂംഢോ സേർച്ച്",
    map: "മാപ്പിൽ പര്യവേക്ഷണം ചെയ്യുക",
    nearby: "അടുത്ത് ഇപ്പോൾ",
    searchPlaceholder: "ഇന്ത്യയിൽ സേവനങ്ങളും ബിസിനസ്സുകളും തിരയുക",
    searchResults: "തിരയൽ ഫലങ്ങൾ",
    searching: "തിരയുന്നു...",
    noResults: "ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    blog: "ബ്ലോഗ്",
    forBusinesses: "ബിസിനസ്സുകൾക്കായി",
    admin: "അഡ്മിൻ",
    home: "ഹോം",
    searchPage: "തിരയുക",
    signIn: "സൈൻ ഇൻ",
    signOut: "സൈൻ ഔട്ട്",
    myAccount: "എന്റെ അക്കൗണ്ട്",
    myListings: "എന്റെ ലിസ്റ്റിംഗുകൾ",
    offeredIn: "ധൂംഢോ ലഭ്യമാണ്:",
    categories: "വിഭാഗങ്ങൾ കാണുക",
    tagline: "ഇന്ത്യയുടെ ആദ്യ പ്രാദേശിക സേർച്ച് എഞ്ചിൻ",
    location_detected: "നിങ്ങളുടെ സ്ഥലം:",
    locationDetected: "സ്ഥലം കണ്ടെത്തി",
    enable_location: "മികച്ച ഫലങ്ങൾക്കായി ലൊക്കേഷൻ ഓൺ ചെയ്യുക",
    enableLocation: "മികച്ച ഫലങ്ങൾക്കായി ലൊക്കേഷൻ ഓൺ ചെയ്യുക",
    detectingLocation: "നിങ്ങളുടെ സ്ഥലം കണ്ടെത്തുന്നു...",
    locationDenied: "ലൊക്കേഷൻ അനുമതി നിരസിച്ചു. അടുത്തുള്ള ഫലങ്ങൾക്കായി ഓൺ ചെയ്യുക.",
    locationLoading: "ലൊക്കേഷൻ കണ്ടെത്തുന്നു...",
    aboutDhoondho: "ധൂംഢോയെക്കുറിച്ച്",
    terms: "നിബന്ധനകൾ",
    privacyPolicy: "സ്വകാര്യതാ നയം",
    privacyTerms: "സ്വകാര്യതയും നിബന്ധനകളും",
    cookies: "കുക്കികൾ",
    support: "സഹായം",
    copyright: "© 2025 - 2026 | ധൂംഢോ ഇന്ത്യ",
    nearbyResults: "അടുത്തുള്ള ബിസിനസ്സുകൾ",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    viewMap: "മാപ്പിൽ കാണുക",
    viewList: "ലിസ്റ്റ് കാഴ്ച",
    allCategories: "എല്ലാ വിഭാഗങ്ങളും",
    enterCity: "നഗരം നൽകുക അല്ലെങ്കിൽ GPS ഉപയോഗിക്കുക",
    geolocationNotSupported: "നിങ്ങളുടെ ബ്രൗസറിൽ ജിയോലൊക്കേഷൻ പിന്തുണയില്ല.",
    couldNotGetLocation: "നിങ്ങളുടെ സ്ഥലം ലഭ്യമായില്ല. വീണ്ടും ശ്രമിക്കുക.",
    voiceNotSupported: "ഈ ബ്രൗസറിൽ വോയ്സ് സേർച്ച് പിന്തുണയില്ല.",
    couldNotCaptureVoice: "വോയ്സ് ക്യാപ്ചർ ചെയ്യാൻ കഴിഞ്ഞില്ല.",
    india: "ഇന്ത്യ"
  },
  pa: {
    search: "ਢੂੰਢੋ ਸਰਚ",
    map: "ਨਕਸ਼ੇ 'ਤੇ ਖੋਜੋ",
    nearby: "ਨੇੜੇ ਹੁਣੇ",
    searchPlaceholder: "ਭਾਰਤ ਵਿੱਚ ਸੇਵਾਵਾਂ ਅਤੇ ਕਾਰੋਬਾਰ ਲੱਭੋ",
    searchResults: "ਖੋਜ ਨਤੀਜੇ",
    searching: "ਖੋਜ ਕਰ ਰਹੇ ਹਾਂ...",
    noResults: "ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    blog: "ਬਲੌਗ",
    forBusinesses: "ਕਾਰੋਬਾਰਾਂ ਲਈ",
    admin: "ਪ੍ਰਬੰਧਕ",
    home: "ਮੁੱਖ ਪੰਨਾ",
    searchPage: "ਖੋਜੋ",
    signIn: "ਸਾਈਨ ਇਨ",
    signOut: "ਸਾਈਨ ਆਊਟ",
    myAccount: "ਮੇਰਾ ਖਾਤਾ",
    myListings: "ਮੇਰੀਆਂ ਸੂਚੀਆਂ",
    offeredIn: "ਢੂੰਢੋ ਵਿੱਚ ਉਪਲਬਧ:",
    categories: "ਸ਼੍ਰੇਣੀਆਂ ਦੇਖੋ",
    tagline: "ਭਾਰਤ ਦਾ ਪਹਿਲਾ ਸਥਾਨਕ ਸਰਚ ਇੰਜਣ",
    location_detected: "ਤੁਹਾਡਾ ਸਥਾਨ:",
    locationDetected: "ਸਥਾਨ ਮਿਲਿਆ",
    enable_location: "ਬਿਹਤਰ ਨਤੀਜਿਆਂ ਲਈ ਸਥਾਨ ਚਾਲੂ ਕਰੋ",
    enableLocation: "ਬਿਹਤਰ ਨਤੀਜਿਆਂ ਲਈ ਸਥਾਨ ਚਾਲੂ ਕਰੋ",
    detectingLocation: "ਤੁਹਾਡਾ ਸਥਾਨ ਲੱਭ ਰਹੇ ਹਾਂ...",
    locationDenied: "ਸਥਾਨ ਦੀ ਇਜਾਜ਼ਤ ਰੱਦ ਕੀਤੀ ਗਈ। ਨੇੜੇ ਦੇ ਨਤੀਜਿਆਂ ਲਈ ਚਾਲੂ ਕਰੋ।",
    locationLoading: "ਸਥਾਨ ਲੱਭ ਰਹੇ ਹਾਂ...",
    aboutDhoondho: "ਢੂੰਢੋ ਬਾਰੇ",
    terms: "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ",
    privacyPolicy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
    privacyTerms: "ਗੋਪਨੀਯਤਾ ਅਤੇ ਨਿਯਮ",
    cookies: "ਕੁਕੀਜ਼",
    support: "ਸਹਾਇਤਾ",
    copyright: "© 2025 - 2026 | ਢੂੰਢੋ ਇੰਡੀਆ",
    nearbyResults: "ਨੇੜੇ ਦੇ ਕਾਰੋਬਾਰ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    viewMap: "ਨਕਸ਼ੇ 'ਤੇ ਦੇਖੋ",
    viewList: "ਸੂਚੀ ਦ੍ਰਿਸ਼",
    allCategories: "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ",
    enterCity: "ਸ਼ਹਿਰ ਦਰਜ ਕਰੋ ਜਾਂ GPS ਵਰਤੋ",
    geolocationNotSupported: "ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਜਿਓਲੋਕੇਸ਼ਨ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ।",
    couldNotGetLocation: "ਤੁਹਾਡਾ ਸਥਾਨ ਨਹੀਂ ਮਿਲ ਸਕਿਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    voiceNotSupported: "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਸਰਚ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ।",
    couldNotCaptureVoice: "ਆਵਾਜ਼ ਕੈਪਚਰ ਨਹੀਂ ਹੋ ਸਕੀ।",
    india: "ਭਾਰਤ"
  },
  bn: {
    search: "ধুঁধো সার্চ",
    map: "মানচিত্রে অন্বেষণ করুন",
    nearby: "কাছে এখন",
    searchPlaceholder: "ভারতে সেবা ও ব্যবসা খুঁজুন",
    searchResults: "অনুসন্ধান ফলাফল",
    searching: "খুঁজছি...",
    noResults: "কোনো ফলাফল পাওয়া যায়নি",
    about: "আমাদের সম্পর্কে",
    blog: "ব্লগ",
    forBusinesses: "ব্যবসার জন্য",
    admin: "অ্যাডমিন",
    home: "হোম",
    searchPage: "খুঁজুন",
    signIn: "সাইন ইন",
    signOut: "সাইন আউট",
    myAccount: "আমার অ্যাকাউন্ট",
    myListings: "আমার তালিকা",
    offeredIn: "ধুঁধো পাওয়া যায়:",
    categories: "বিভাগ দেখুন",
    tagline: "ভারতের প্রথম স্থানীয় সার্চ ইঞ্জিন",
    location_detected: "আপনার অবস্থান:",
    locationDetected: "অবস্থান সনাক্ত হয়েছে",
    enable_location: "ভালো ফলাফলের জন্য অবস্থান চালু করুন",
    enableLocation: "ভালো ফলাফলের জন্য অবস্থান চালু করুন",
    detectingLocation: "আপনার অবস্থান খুঁজে বের করছি...",
    locationDenied: "অবস্থানের অনুমতি প্রত্যাখ্যান করা হয়েছে। কাছের ফলাফলের জন্য চালু করুন।",
    locationLoading: "অবস্থান সনাক্ত করছি...",
    aboutDhoondho: "ধুঁধো সম্পর্কে",
    terms: "শর্তাবলী",
    privacyPolicy: "গোপনীয়তা নীতি",
    privacyTerms: "গোপনীয়তা ও শর্তাবলী",
    cookies: "কুকিজ",
    support: "সহায়তা",
    copyright: "© 2025 - 2026 | ধুঁধো ইন্ডিয়া",
    nearbyResults: "কাছের ব্যবসা",
    loading: "লোড হচ্ছে...",
    viewMap: "মানচিত্রে দেখুন",
    viewList: "তালিকা দৃশ্য",
    allCategories: "সব বিভাগ",
    enterCity: "শহর লিখুন বা GPS ব্যবহার করুন",
    geolocationNotSupported: "আপনার ব্রাউজারে জিওলোকেশন সমর্থিত নয়।",
    couldNotGetLocation: "আপনার অবস্থান পাওয়া যায়নি। আবার চেষ্টা করুন।",
    voiceNotSupported: "এই ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়।",
    couldNotCaptureVoice: "ভয়েস ক্যাপচার করা যায়নি।",
    india: "ভারত"
  },
  gu: {
    search: "ઢૂંઢો સર્ચ",
    map: "નકશા પર અન્વેષણ કરો",
    nearby: "નજીક અત્યારે",
    searchPlaceholder: "ભારતમાં સેવાઓ અને વ્યવસાય શોધો",
    searchResults: "શોધ પરિણામો",
    searching: "શોધ ‌‌ઈ રહ્યું છે...",
    noResults: "કોઈ પરિણામ મળ્યું નથી",
    about: "આપણા વિશે",
    blog: "બ્લૉગ",
    forBusinesses: "વ્યવસાય માટે",
    admin: "એડ્મિન",
    home: "હોમ",
    searchPage: "શોધો",
    signIn: "સાઈન ઇન",
    signOut: "સાઈન આઉટ",
    myAccount: "મારું ખાતું",
    myListings: "મારી યાદીઓ",
    offeredIn: "ઢૂંઢો ઉપલબ્ધ:",
    categories: "કેટેગરી જુઓ",
    tagline: "ભારતનું પ્રથમ સ્થાનિક સર્ચ એન્જિન",
    location_detected: "તમારું સ્થાન:",
    locationDetected: "સ્થાન મળ્યું",
    enable_location: "બહેતર પરિણામો માટે સ્થાન ચાલુ કરો",
    enableLocation: "બહેતર પરિણામો માટે સ્થાન ચાલુ કરો",
    detectingLocation: "તમારું સ્થાન શોધ ‌‌ઈ રહ્યું છે...",
    locationDenied: "સ્થાન પ્રવેશ નકારવામાં આવ્યો. નજીકના પરિણામો માટે ચાલુ કરો.",
    locationLoading: "સ્થાન શોધ ‌‌ઈ રહ્યું છે...",
    aboutDhoondho: "ઢૂંઢો વિશે",
    terms: "નિયમો અને શરતો",
    privacyPolicy: "ગોપનીયતા નીતિ",
    privacyTerms: "ગોપનીયતા અને નિયમો",
    cookies: "કુકીઝ",
    support: "સહાય",
    copyright: "© 2025 - 2026 | ઢૂંઢો ઇન્ડિયા",
    nearbyResults: "નજીકના વ્યવસાય",
    loading: "લોડ થઈ રહ્યું છે...",
    viewMap: "નકશા પર જુઓ",
    viewList: "સૂચિ દૃશ્ય",
    allCategories: "બધી કેટેગરી",
    enterCity: "શહેર દાખલ કરો અથવા GPS વાપરો",
    geolocationNotSupported: "તમારા બ્રાઉઝરમાં જિઓલોકેશન સપોર્ટ નથી.",
    couldNotGetLocation: "તમારું સ્થાન મળ્યું નહીં. ફરી પ્રયાસ કરો.",
    voiceNotSupported: "આ બ્રાઉઝરમાં વૉઇસ સર્ચ સપોર્ટ નથી.",
    couldNotCaptureVoice: "વૉઇસ કૅપ્ચર થઈ શક્યો નહીં.",
    india: "ભારત"
  }
};
const LANG_STORAGE_KEY = "dhoondho_lang";
const changeCallbacks = [];
let currentLang = "en";
function detectBrowserLanguage() {
  const browserLang = (navigator.language || "").toLowerCase().split("-")[0];
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }
  return "en";
}
function initLanguage() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    currentLang = stored;
  } else {
    currentLang = detectBrowserLanguage();
  }
}
initLanguage();
function t(key) {
  var _a3;
  return ((_a3 = TRANSLATIONS[currentLang]) == null ? void 0 : _a3[key]) ?? TRANSLATIONS.en[key] ?? key;
}
function setLanguage(code) {
  const lang = SUPPORTED_LANGUAGES.includes(code) ? code : "en";
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  for (const cb of changeCallbacks) {
    cb(lang);
  }
}
function getCurrentLanguage() {
  return currentLang;
}
function onLanguageChange(callback) {
  changeCallbacks.push(callback);
  return () => {
    const idx = changeCallbacks.indexOf(callback);
    if (idx !== -1) changeCallbacks.splice(idx, 1);
  };
}
function getStoredLocation() {
  const city = localStorage.getItem("dhoondho_city");
  const state = localStorage.getItem("dhoondho_state");
  if (city) return { city, state: state || "" };
  return null;
}
function buildLocationText() {
  const loc = getStoredLocation();
  if (loc == null ? void 0 : loc.city) {
    const place = loc.state ? `${loc.city}, ${loc.state}, India` : `${loc.city}, India`;
    return `📍 ${t("location_detected")} ${place}`;
  }
  return `📍 ${t("enable_location")}`;
}
function renderFooter() {
  const container = document.getElementById("footer-container");
  if (!container) return;
  container.innerHTML = buildPageFooterHTML();
}
function renderPageFooter(_container) {
  return buildPageFooterHTML();
}
function buildPageFooterHTML() {
  return `
    <footer id="page-footer" class="page-footer">
      <div class="footer">
        <div class="footer-center">
          <p class="location-text">${buildLocationText()}</p>
        </div>
        <div class="footer-links">
          <a href="#/terms">${t("terms")}</a>
          <a href="#/privacy">${t("privacyPolicy")}</a>
          <a href="#/cookies">${t("cookies")}</a>
          <a href="#/support">${t("support")}</a>
        </div>
        <div class="footer-bottom">
          <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} | Dhoondho India</p>
        </div>
      </div>
    </footer>
  `;
}
let footerLangUnsub = null;
let _footerLocationHandler = null;
function initFooterReactivity() {
  if (footerLangUnsub) footerLangUnsub();
  footerLangUnsub = onLanguageChange(() => {
    refreshPageFooter();
  });
  if (_footerLocationHandler) {
    window.removeEventListener("dhoondho:location", _footerLocationHandler);
  }
  _footerLocationHandler = () => refreshPageFooter();
  window.addEventListener("dhoondho:location", _footerLocationHandler);
}
function refreshPageFooter() {
  const footer = document.getElementById("page-footer");
  if (!footer) return;
  const newFooter = document.createElement("div");
  newFooter.innerHTML = buildPageFooterHTML();
  footer.replaceWith(newFooter.firstElementChild);
}
var ReplicaRejectCode;
(function(ReplicaRejectCode2) {
  ReplicaRejectCode2[ReplicaRejectCode2["SysFatal"] = 1] = "SysFatal";
  ReplicaRejectCode2[ReplicaRejectCode2["SysTransient"] = 2] = "SysTransient";
  ReplicaRejectCode2[ReplicaRejectCode2["DestinationInvalid"] = 3] = "DestinationInvalid";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterReject"] = 4] = "CanisterReject";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (ReplicaRejectCode = {}));
var QueryResponseStatus;
(function(QueryResponseStatus2) {
  QueryResponseStatus2["Replied"] = "replied";
  QueryResponseStatus2["Rejected"] = "rejected";
})(QueryResponseStatus || (QueryResponseStatus = {}));
function isV2ResponseBody(body) {
  return body !== null && body !== void 0 && "reject_code" in body;
}
function isV3ResponseBody(body) {
  return body !== null && body !== void 0 && "certificate" in body;
}
const alphabet = "abcdefghijklmnopqrstuvwxyz234567";
const lookupTable = /* @__PURE__ */ Object.create(null);
for (let i = 0; i < alphabet.length; i++) {
  lookupTable[alphabet[i]] = i;
}
lookupTable["0"] = lookupTable.o;
lookupTable["1"] = lookupTable.i;
function base32Encode(input) {
  let skip = 0;
  let bits = 0;
  let output = "";
  function encodeByte(byte) {
    if (skip < 0) {
      bits |= byte >> -skip;
    } else {
      bits = byte << skip & 248;
    }
    if (skip > 3) {
      skip -= 8;
      return 1;
    }
    if (skip < 4) {
      output += alphabet[bits >> 3];
      skip += 5;
    }
    return 0;
  }
  for (let i = 0; i < input.length; ) {
    i += encodeByte(input[i]);
  }
  return output + (skip < 0 ? alphabet[bits >> 3] : "");
}
function base32Decode(input) {
  let skip = 0;
  let byte = 0;
  const output = new Uint8Array(input.length * 4 / 3 | 0);
  let o2 = 0;
  function decodeChar(char) {
    let val = lookupTable[char.toLowerCase()];
    if (val === void 0) {
      throw new Error(`Invalid character: ${JSON.stringify(char)}`);
    }
    val <<= 3;
    byte |= val >>> skip;
    skip += 5;
    if (skip >= 8) {
      output[o2++] = byte;
      skip -= 8;
      if (skip > 0) {
        byte = val << 5 - skip & 255;
      } else {
        byte = 0;
      }
    }
  }
  for (const c2 of input) {
    decodeChar(c2);
  }
  return output.slice(0, o2);
}
const lookUpTable = new Uint32Array([
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
]);
function getCrc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    const t2 = (byte ^ crc) & 255;
    crc = lookUpTable[t2] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}
const crypto$1 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b2, ...lengths) {
  if (!isBytes(b2))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b2.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b2.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_2, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a2 = arrays[i];
    abytes(a2);
    sum += a2.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a2 = arrays[i];
    res.set(a2, pad);
    pad += a2.length;
  }
  return res;
}
class Hash {
}
function createHasher$1(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto$1 && typeof crypto$1.getRandomValues === "function") {
    return crypto$1.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto$1 && typeof crypto$1.randomBytes === "function") {
    return Uint8Array.from(crypto$1.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
function setBigUint64(view, byteOffset, value, isLE) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h2 = isLE ? 4 : 0;
  const l = isLE ? 0 : 4;
  view.setUint32(byteOffset + h2, wh, isLE);
  view.setUint32(byteOffset + l, wl, isLE);
}
function Chi(a2, b2, c2) {
  return a2 & b2 ^ ~a2 & c2;
}
function Maj(a2, b2, c2) {
  return a2 & b2 ^ a2 & c2 ^ b2 & c2;
}
class HashMD extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA224_IV = /* @__PURE__ */ Uint32Array.from([
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h: h2, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h2, l];
  }
  return [Ah, Al];
}
const shrSH = (h2, _l, s2) => h2 >>> s2;
const shrSL = (h2, l, s2) => h2 << 32 - s2 | l >>> s2;
const rotrSH = (h2, l, s2) => h2 >>> s2 | l << 32 - s2;
const rotrSL = (h2, l, s2) => h2 << 32 - s2 | l >>> s2;
const rotrBH = (h2, l, s2) => h2 << 64 - s2 | l >>> s2 - 32;
const rotrBL = (h2, l, s2) => h2 >>> s2 - 32 | l << 64 - s2;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: A2, B: B2, C: C2, D, E: E2, F: F2, G: G2, H: H2 } = this;
    return [A2, B2, C2, D, E2, F2, G2, H2];
  }
  // prettier-ignore
  set(A2, B2, C2, D, E2, F2, G2, H2) {
    this.A = A2 | 0;
    this.B = B2 | 0;
    this.C = C2 | 0;
    this.D = D | 0;
    this.E = E2 | 0;
    this.F = F2 | 0;
    this.G = G2 | 0;
    this.H = H2 | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A: A2, B: B2, C: C2, D, E: E2, F: F2, G: G2, H: H2 } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E2, 6) ^ rotr(E2, 11) ^ rotr(E2, 25);
      const T1 = H2 + sigma1 + Chi(E2, F2, G2) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A2, 2) ^ rotr(A2, 13) ^ rotr(A2, 22);
      const T2 = sigma0 + Maj(A2, B2, C2) | 0;
      H2 = G2;
      G2 = F2;
      F2 = E2;
      E2 = D + T1 | 0;
      D = C2;
      C2 = B2;
      B2 = A2;
      A2 = T1 + T2 | 0;
    }
    A2 = A2 + this.A | 0;
    B2 = B2 + this.B | 0;
    C2 = C2 + this.C | 0;
    D = D + this.D | 0;
    E2 = E2 + this.E | 0;
    F2 = F2 + this.F | 0;
    G2 = G2 + this.G | 0;
    H2 = H2 + this.H | 0;
    this.set(A2, B2, C2, D, E2, F2, G2, H2);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
}
class SHA224 extends SHA256 {
  constructor() {
    super(28);
    this.A = SHA224_IV[0] | 0;
    this.B = SHA224_IV[1] | 0;
    this.C = SHA224_IV[2] | 0;
    this.D = SHA224_IV[3] | 0;
    this.E = SHA224_IV[4] | 0;
    this.F = SHA224_IV[5] | 0;
    this.G = SHA224_IV[6] | 0;
    this.H = SHA224_IV[7] | 0;
  }
}
const K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
const SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
const SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends HashMD {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const sha256 = /* @__PURE__ */ createHasher$1(() => new SHA256());
const sha224 = /* @__PURE__ */ createHasher$1(() => new SHA224());
const sha512 = /* @__PURE__ */ createHasher$1(() => new SHA512());
const JSON_KEY_PRINCIPAL = "__principal__";
const SELF_AUTHENTICATING_SUFFIX = 2;
const ANONYMOUS_SUFFIX = 4;
const MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR = "aaaaa-aa";
let Principal$1 = class Principal {
  static anonymous() {
    return new this(new Uint8Array([ANONYMOUS_SUFFIX]));
  }
  /**
   * Utility method, returning the principal representing the management canister, decoded from the hex string `'aaaaa-aa'`
   * @returns {Principal} principal of the management canister
   */
  static managementCanister() {
    return this.fromText(MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR);
  }
  static selfAuthenticating(publicKey) {
    const sha = sha224(publicKey);
    return new this(new Uint8Array([...sha, SELF_AUTHENTICATING_SUFFIX]));
  }
  static from(other) {
    if (typeof other === "string") {
      return Principal.fromText(other);
    } else if (Object.getPrototypeOf(other) === Uint8Array.prototype) {
      return new Principal(other);
    } else if (Principal.isPrincipal(other)) {
      return new Principal(other._arr);
    }
    throw new Error(`Impossible to convert ${JSON.stringify(other)} to Principal.`);
  }
  static fromHex(hex) {
    return new this(hexToBytes(hex));
  }
  static fromText(text) {
    let maybePrincipal = text;
    if (text.includes(JSON_KEY_PRINCIPAL)) {
      const obj = JSON.parse(text);
      if (JSON_KEY_PRINCIPAL in obj) {
        maybePrincipal = obj[JSON_KEY_PRINCIPAL];
      }
    }
    const canisterIdNoDash = maybePrincipal.toLowerCase().replace(/-/g, "");
    let arr = base32Decode(canisterIdNoDash);
    arr = arr.slice(4, arr.length);
    const principal = new this(arr);
    if (principal.toText() !== maybePrincipal) {
      throw new Error(`Principal "${principal.toText()}" does not have a valid checksum (original value "${maybePrincipal}" may not be a valid Principal ID).`);
    }
    return principal;
  }
  static fromUint8Array(arr) {
    return new this(arr);
  }
  static isPrincipal(other) {
    return other instanceof Principal || typeof other === "object" && other !== null && "_isPrincipal" in other && other["_isPrincipal"] === true && "_arr" in other && other["_arr"] instanceof Uint8Array;
  }
  constructor(_arr) {
    this._arr = _arr;
    this._isPrincipal = true;
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === ANONYMOUS_SUFFIX;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return bytesToHex(this._arr).toUpperCase();
  }
  toText() {
    const checksumArrayBuf = new ArrayBuffer(4);
    const view = new DataView(checksumArrayBuf);
    view.setUint32(0, getCrc32(this._arr));
    const checksum = new Uint8Array(checksumArrayBuf);
    const array = new Uint8Array([...checksum, ...this._arr]);
    const result = base32Encode(array);
    const matches = result.match(/.{1,5}/g);
    if (!matches) {
      throw new Error();
    }
    return matches.join("-");
  }
  toString() {
    return this.toText();
  }
  /**
   * Serializes to JSON
   * @returns {JsonnablePrincipal} a JSON object with a single key, {@link JSON_KEY_PRINCIPAL}, whose value is the principal as a string
   */
  toJSON() {
    return { [JSON_KEY_PRINCIPAL]: this.toText() };
  }
  /**
   * Utility method taking a Principal to compare against. Used for determining canister ranges in certificate verification
   * @param {Principal} other - a {@link Principal} to compare
   * @returns {'lt' | 'eq' | 'gt'} `'lt' | 'eq' | 'gt'` a string, representing less than, equal to, or greater than
   */
  compareTo(other) {
    for (let i = 0; i < Math.min(this._arr.length, other._arr.length); i++) {
      if (this._arr[i] < other._arr[i])
        return "lt";
      else if (this._arr[i] > other._arr[i])
        return "gt";
    }
    if (this._arr.length < other._arr.length)
      return "lt";
    if (this._arr.length > other._arr.length)
      return "gt";
    return "eq";
  }
  /**
   * Utility method checking whether a provided Principal is less than or equal to the current one using the {@link Principal.compareTo} method
   * @param other a {@link Principal} to compare
   * @returns {boolean} boolean
   */
  ltEq(other) {
    const cmp = this.compareTo(other);
    return cmp == "lt" || cmp == "eq";
  }
  /**
   * Utility method checking whether a provided Principal is greater than or equal to the current one using the {@link Principal.compareTo} method
   * @param other a {@link Principal} to compare
   * @returns {boolean} boolean
   */
  gtEq(other) {
    const cmp = this.compareTo(other);
    return cmp == "gt" || cmp == "eq";
  }
};
var ErrorKindEnum;
(function(ErrorKindEnum2) {
  ErrorKindEnum2["Trust"] = "Trust";
  ErrorKindEnum2["Protocol"] = "Protocol";
  ErrorKindEnum2["Reject"] = "Reject";
  ErrorKindEnum2["Transport"] = "Transport";
  ErrorKindEnum2["External"] = "External";
  ErrorKindEnum2["Limit"] = "Limit";
  ErrorKindEnum2["Input"] = "Input";
  ErrorKindEnum2["Unknown"] = "Unknown";
})(ErrorKindEnum || (ErrorKindEnum = {}));
class ErrorCode {
  constructor(isCertified = false) {
    this.isCertified = isCertified;
  }
  toString() {
    let errorMessage = this.toErrorMessage();
    if (this.requestContext) {
      errorMessage += `
Request context:
  Request ID (hex): ${this.requestContext.requestId ? bytesToHex(this.requestContext.requestId) : "undefined"}
  Sender pubkey (hex): ${bytesToHex(this.requestContext.senderPubKey)}
  Sender signature (hex): ${bytesToHex(this.requestContext.senderSignature)}
  Ingress expiry: ${this.requestContext.ingressExpiry.toString()}`;
    }
    if (this.callContext) {
      errorMessage += `
Call context:
  Canister ID: ${this.callContext.canisterId.toText()}
  Method name: ${this.callContext.methodName}
  HTTP details: ${JSON.stringify(this.callContext.httpDetails, null, 2)}`;
    }
    return errorMessage;
  }
}
class AgentError extends Error {
  get code() {
    return this.cause.code;
  }
  set code(code) {
    this.cause.code = code;
  }
  get kind() {
    return this.cause.kind;
  }
  set kind(kind) {
    this.cause.kind = kind;
  }
  /**
   * Reads the `isCertified` property of the underlying error code.
   * @returns `true` if the error is certified, `false` otherwise.
   */
  get isCertified() {
    return this.code.isCertified;
  }
  constructor(code, kind) {
    super(code.toString());
    this.name = "AgentError";
    this.cause = { code, kind };
    Object.setPrototypeOf(this, AgentError.prototype);
  }
  hasCode(code) {
    return this.code instanceof code;
  }
  toString() {
    return `${this.name} (${this.kind}): ${this.message}`;
  }
}
class ErrorKind extends AgentError {
  static fromCode(code) {
    return new this(code);
  }
}
class TrustError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Trust);
    this.name = "TrustError";
    Object.setPrototypeOf(this, TrustError.prototype);
  }
}
class ProtocolError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Protocol);
    this.name = "ProtocolError";
    Object.setPrototypeOf(this, ProtocolError.prototype);
  }
}
class RejectError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Reject);
    this.name = "RejectError";
    Object.setPrototypeOf(this, RejectError.prototype);
  }
}
class TransportError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Transport);
    this.name = "TransportError";
    Object.setPrototypeOf(this, TransportError.prototype);
  }
}
class ExternalError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.External);
    this.name = "ExternalError";
    Object.setPrototypeOf(this, ExternalError.prototype);
  }
}
class InputError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Input);
    this.name = "InputError";
    Object.setPrototypeOf(this, InputError.prototype);
  }
}
class UnknownError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Unknown);
    this.name = "UnknownError";
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}
class CertificateVerificationErrorCode extends ErrorCode {
  constructor(reason, error) {
    super();
    this.reason = reason;
    this.error = error;
    this.name = "CertificateVerificationErrorCode";
    Object.setPrototypeOf(this, CertificateVerificationErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = this.reason;
    if (this.error) {
      errorMessage += `: ${formatUnknownError(this.error)}`;
    }
    return `Certificate verification error: "${errorMessage}"`;
  }
}
class CertificateTimeErrorCode extends ErrorCode {
  constructor(maxAgeInMinutes, certificateTime, currentTime, timeDiffMsecs, ageType) {
    super();
    this.maxAgeInMinutes = maxAgeInMinutes;
    this.certificateTime = certificateTime;
    this.currentTime = currentTime;
    this.timeDiffMsecs = timeDiffMsecs;
    this.ageType = ageType;
    this.name = "CertificateTimeErrorCode";
    Object.setPrototypeOf(this, CertificateTimeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Certificate is signed more than ${this.maxAgeInMinutes} minutes in the ${this.ageType}. Certificate time: ${this.certificateTime.toISOString()} Current time: ${this.currentTime.toISOString()} Clock drift: ${this.timeDiffMsecs}ms`;
  }
}
class CertificateHasTooManyDelegationsErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "CertificateHasTooManyDelegationsErrorCode";
    Object.setPrototypeOf(this, CertificateHasTooManyDelegationsErrorCode.prototype);
  }
  toErrorMessage() {
    return "Certificate has too many delegations";
  }
}
class CertificateNotAuthorizedErrorCode extends ErrorCode {
  constructor(canisterId, subnetId) {
    super();
    this.canisterId = canisterId;
    this.subnetId = subnetId;
    this.name = "CertificateNotAuthorizedErrorCode";
    Object.setPrototypeOf(this, CertificateNotAuthorizedErrorCode.prototype);
  }
  toErrorMessage() {
    return `The certificate contains a delegation that does not include the canister ${this.canisterId.toText()} in the canister_ranges field. Subnet ID: ${this.subnetId.toText()}`;
  }
}
class LookupErrorCode extends ErrorCode {
  constructor(message, lookupStatus) {
    super();
    this.message = message;
    this.lookupStatus = lookupStatus;
    this.name = "LookupErrorCode";
    Object.setPrototypeOf(this, LookupErrorCode.prototype);
  }
  toErrorMessage() {
    return `${this.message}. Lookup status: ${this.lookupStatus}`;
  }
}
class MalformedLookupFoundValueErrorCode extends ErrorCode {
  constructor(message) {
    super();
    this.message = message;
    this.name = "MalformedLookupFoundValueErrorCode";
    Object.setPrototypeOf(this, MalformedLookupFoundValueErrorCode.prototype);
  }
  toErrorMessage() {
    return this.message;
  }
}
class MissingLookupValueErrorCode extends ErrorCode {
  constructor(message) {
    super();
    this.message = message;
    this.name = "MissingLookupValueErrorCode";
    Object.setPrototypeOf(this, MissingLookupValueErrorCode.prototype);
  }
  toErrorMessage() {
    return this.message;
  }
}
class DerKeyLengthMismatchErrorCode extends ErrorCode {
  constructor(expectedLength, actualLength) {
    super();
    this.expectedLength = expectedLength;
    this.actualLength = actualLength;
    this.name = "DerKeyLengthMismatchErrorCode";
    Object.setPrototypeOf(this, DerKeyLengthMismatchErrorCode.prototype);
  }
  toErrorMessage() {
    return `BLS DER-encoded public key must be ${this.expectedLength} bytes long, but is ${this.actualLength} bytes long`;
  }
}
class DerPrefixMismatchErrorCode extends ErrorCode {
  constructor(expectedPrefix, actualPrefix) {
    super();
    this.expectedPrefix = expectedPrefix;
    this.actualPrefix = actualPrefix;
    this.name = "DerPrefixMismatchErrorCode";
    Object.setPrototypeOf(this, DerPrefixMismatchErrorCode.prototype);
  }
  toErrorMessage() {
    return `BLS DER-encoded public key is invalid. Expected the following prefix: ${bytesToHex(this.expectedPrefix)}, but got ${bytesToHex(this.actualPrefix)}`;
  }
}
class DerDecodeLengthMismatchErrorCode extends ErrorCode {
  constructor(expectedLength, actualLength) {
    super();
    this.expectedLength = expectedLength;
    this.actualLength = actualLength;
    this.name = "DerDecodeLengthMismatchErrorCode";
    Object.setPrototypeOf(this, DerDecodeLengthMismatchErrorCode.prototype);
  }
  toErrorMessage() {
    return `DER payload mismatch: Expected length ${this.expectedLength}, actual length: ${this.actualLength}`;
  }
}
class DerDecodeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "DerDecodeErrorCode";
    Object.setPrototypeOf(this, DerDecodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to decode DER: ${this.error}`;
  }
}
class DerEncodeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "DerEncodeErrorCode";
    Object.setPrototypeOf(this, DerEncodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to encode DER: ${this.error}`;
  }
}
class CborDecodeErrorCode extends ErrorCode {
  constructor(error, input) {
    super();
    this.error = error;
    this.input = input;
    this.name = "CborDecodeErrorCode";
    Object.setPrototypeOf(this, CborDecodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to decode CBOR: ${formatUnknownError(this.error)}, input: ${bytesToHex(this.input)}`;
  }
}
class CborEncodeErrorCode extends ErrorCode {
  constructor(error, value) {
    super();
    this.error = error;
    this.value = value;
    this.name = "CborEncodeErrorCode";
    Object.setPrototypeOf(this, CborEncodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to encode CBOR: ${formatUnknownError(this.error)}, input: ${this.value}`;
  }
}
class TimeoutWaitingForResponseErrorCode extends ErrorCode {
  constructor(message, requestId, status) {
    super();
    this.message = message;
    this.requestId = requestId;
    this.status = status;
    this.name = "TimeoutWaitingForResponseErrorCode";
    Object.setPrototypeOf(this, TimeoutWaitingForResponseErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = `${this.message}
`;
    if (this.requestId) {
      errorMessage += `  Request ID: ${bytesToHex(this.requestId)}
`;
    }
    if (this.status) {
      errorMessage += `  Request status: ${this.status}
`;
    }
    return errorMessage;
  }
}
class CertificateOutdatedErrorCode extends ErrorCode {
  constructor(maxIngressExpiryInMinutes, requestId, retryTimes) {
    super();
    this.maxIngressExpiryInMinutes = maxIngressExpiryInMinutes;
    this.requestId = requestId;
    this.retryTimes = retryTimes;
    this.name = "CertificateOutdatedErrorCode";
    Object.setPrototypeOf(this, CertificateOutdatedErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = `Certificate is stale (over ${this.maxIngressExpiryInMinutes} minutes). Is the computer's clock synchronized?
  Request ID: ${bytesToHex(this.requestId)}
`;
    if (this.retryTimes !== void 0) {
      errorMessage += `  Retried ${this.retryTimes} times.`;
    }
    return errorMessage;
  }
}
class CertifiedRejectErrorCode extends ErrorCode {
  constructor(requestId, rejectCode, rejectMessage, rejectErrorCode) {
    super(true);
    this.requestId = requestId;
    this.rejectCode = rejectCode;
    this.rejectMessage = rejectMessage;
    this.rejectErrorCode = rejectErrorCode;
    this.name = "CertifiedRejectErrorCode";
    Object.setPrototypeOf(this, CertifiedRejectErrorCode.prototype);
  }
  toErrorMessage() {
    return `The replica returned a rejection error:
  Request ID: ${bytesToHex(this.requestId)}
  Reject code: ${this.rejectCode}
  Reject text: ${this.rejectMessage}
  Error code: ${this.rejectErrorCode}
`;
  }
}
class UncertifiedRejectErrorCode extends ErrorCode {
  constructor(requestId, rejectCode, rejectMessage, rejectErrorCode, signatures) {
    super();
    this.requestId = requestId;
    this.rejectCode = rejectCode;
    this.rejectMessage = rejectMessage;
    this.rejectErrorCode = rejectErrorCode;
    this.signatures = signatures;
    this.name = "UncertifiedRejectErrorCode";
    Object.setPrototypeOf(this, UncertifiedRejectErrorCode.prototype);
  }
  toErrorMessage() {
    return `The replica returned a rejection error:
  Request ID: ${bytesToHex(this.requestId)}
  Reject code: ${this.rejectCode}
  Reject text: ${this.rejectMessage}
  Error code: ${this.rejectErrorCode}
`;
  }
}
class UncertifiedRejectUpdateErrorCode extends ErrorCode {
  constructor(requestId, rejectCode, rejectMessage, rejectErrorCode) {
    super();
    this.requestId = requestId;
    this.rejectCode = rejectCode;
    this.rejectMessage = rejectMessage;
    this.rejectErrorCode = rejectErrorCode;
    this.name = "UncertifiedRejectUpdateErrorCode";
    Object.setPrototypeOf(this, UncertifiedRejectUpdateErrorCode.prototype);
  }
  toErrorMessage() {
    return `The replica returned a rejection error:
  Request ID: ${bytesToHex(this.requestId)}
  Reject code: ${this.rejectCode}
  Reject text: ${this.rejectMessage}
  Error code: ${this.rejectErrorCode}
`;
  }
}
class RequestStatusDoneNoReplyErrorCode extends ErrorCode {
  constructor(requestId) {
    super();
    this.requestId = requestId;
    this.name = "RequestStatusDoneNoReplyErrorCode";
    Object.setPrototypeOf(this, RequestStatusDoneNoReplyErrorCode.prototype);
  }
  toErrorMessage() {
    return `Call was marked as done but we never saw the reply:
  Request ID: ${bytesToHex(this.requestId)}
`;
  }
}
class MissingRootKeyErrorCode extends ErrorCode {
  constructor(shouldFetchRootKey) {
    super();
    this.shouldFetchRootKey = shouldFetchRootKey;
    this.name = "MissingRootKeyErrorCode";
    Object.setPrototypeOf(this, MissingRootKeyErrorCode.prototype);
  }
  toErrorMessage() {
    if (this.shouldFetchRootKey === void 0) {
      return "Agent is missing root key";
    }
    return `Agent is missing root key and the shouldFetchRootKey value is set to ${this.shouldFetchRootKey}. The root key should only be unknown if you are in local development. Otherwise you should avoid fetching and use the default IC Root Key or the known root key of your environment.`;
  }
}
class HashValueErrorCode extends ErrorCode {
  constructor(value) {
    super();
    this.value = value;
    this.name = "HashValueErrorCode";
    Object.setPrototypeOf(this, HashValueErrorCode.prototype);
  }
  toErrorMessage() {
    return `Attempt to hash a value of unsupported type: ${this.value}`;
  }
}
class HttpDefaultFetchErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "HttpDefaultFetchErrorCode";
    Object.setPrototypeOf(this, HttpDefaultFetchErrorCode.prototype);
  }
  toErrorMessage() {
    return this.error;
  }
}
class IdentityInvalidErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "IdentityInvalidErrorCode";
    Object.setPrototypeOf(this, IdentityInvalidErrorCode.prototype);
  }
  toErrorMessage() {
    return "This identity has expired due this application's security policy. Please refresh your authentication.";
  }
}
class IngressExpiryInvalidErrorCode extends ErrorCode {
  constructor(message, providedIngressExpiryInMinutes) {
    super();
    this.message = message;
    this.providedIngressExpiryInMinutes = providedIngressExpiryInMinutes;
    this.name = "IngressExpiryInvalidErrorCode";
    Object.setPrototypeOf(this, IngressExpiryInvalidErrorCode.prototype);
  }
  toErrorMessage() {
    return `${this.message}. Provided ingress expiry time is ${this.providedIngressExpiryInMinutes} minutes.`;
  }
}
class CreateHttpAgentErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "CreateHttpAgentErrorCode";
    Object.setPrototypeOf(this, CreateHttpAgentErrorCode.prototype);
  }
  toErrorMessage() {
    return "Failed to create agent from provided agent";
  }
}
class MalformedSignatureErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "MalformedSignatureErrorCode";
    Object.setPrototypeOf(this, MalformedSignatureErrorCode.prototype);
  }
  toErrorMessage() {
    return `Query response contained a malformed signature: ${this.error}`;
  }
}
class MissingSignatureErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "MissingSignatureErrorCode";
    Object.setPrototypeOf(this, MissingSignatureErrorCode.prototype);
  }
  toErrorMessage() {
    return "Query response did not contain any node signatures";
  }
}
class MalformedPublicKeyErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "MalformedPublicKeyErrorCode";
    Object.setPrototypeOf(this, MalformedPublicKeyErrorCode.prototype);
  }
  toErrorMessage() {
    return "Read state response contained a malformed public key";
  }
}
class QuerySignatureVerificationFailedErrorCode extends ErrorCode {
  constructor(nodeId) {
    super();
    this.nodeId = nodeId;
    this.name = "QuerySignatureVerificationFailedErrorCode";
    Object.setPrototypeOf(this, QuerySignatureVerificationFailedErrorCode.prototype);
  }
  toErrorMessage() {
    return `Query signature verification failed. Node ID: ${this.nodeId}`;
  }
}
class UnexpectedErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "UnexpectedErrorCode";
    Object.setPrototypeOf(this, UnexpectedErrorCode.prototype);
  }
  toErrorMessage() {
    return `Unexpected error: ${formatUnknownError(this.error)}`;
  }
}
class HashTreeDecodeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "HashTreeDecodeErrorCode";
    Object.setPrototypeOf(this, HashTreeDecodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to decode certificate: ${this.error}`;
  }
}
class HttpErrorCode extends ErrorCode {
  constructor(status, statusText, headers, bodyText) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.bodyText = bodyText;
    this.name = "HttpErrorCode";
    Object.setPrototypeOf(this, HttpErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = `HTTP request failed:
  Status: ${this.status} (${this.statusText})
  Headers: ${JSON.stringify(this.headers)}
`;
    if (this.bodyText) {
      errorMessage += `  Body: ${this.bodyText}
`;
    }
    return errorMessage;
  }
}
class HttpV3ApiNotSupportedErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "HttpV3ApiNotSupportedErrorCode";
    Object.setPrototypeOf(this, HttpV3ApiNotSupportedErrorCode.prototype);
  }
  toErrorMessage() {
    return "HTTP request failed: v3 API is not supported";
  }
}
class HttpFetchErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "HttpFetchErrorCode";
    Object.setPrototypeOf(this, HttpFetchErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to fetch HTTP request: ${formatUnknownError(this.error)}`;
  }
}
class MissingCanisterIdErrorCode extends ErrorCode {
  constructor(receivedCanisterId) {
    super();
    this.receivedCanisterId = receivedCanisterId;
    this.name = "MissingCanisterIdErrorCode";
    Object.setPrototypeOf(this, MissingCanisterIdErrorCode.prototype);
  }
  toErrorMessage() {
    return `Canister ID is required, but received ${typeof this.receivedCanisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`;
  }
}
class InvalidReadStateRequestErrorCode extends ErrorCode {
  constructor(request2) {
    super();
    this.request = request2;
    this.name = "InvalidReadStateRequestErrorCode";
    Object.setPrototypeOf(this, InvalidReadStateRequestErrorCode.prototype);
  }
  toErrorMessage() {
    return `Invalid read state request: ${this.request}`;
  }
}
class ExpiryJsonDeserializeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "ExpiryJsonDeserializeErrorCode";
    Object.setPrototypeOf(this, ExpiryJsonDeserializeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to deserialize expiry: ${this.error}`;
  }
}
function formatUnknownError(error) {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
const UNREACHABLE_ERROR = new Error("unreachable");
function concat(...uint8Arrays) {
  const result = new Uint8Array(uint8Arrays.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index2 = 0;
  for (const b2 of uint8Arrays) {
    result.set(b2, index2);
    index2 += b2.byteLength;
  }
  return result;
}
class PipeArrayBuffer {
  /**
   * Save a checkpoint of the reading view (for backtracking)
   */
  save() {
    return this._view;
  }
  /**
   * Restore a checkpoint of the reading view (for backtracking)
   * @param checkPoint a previously saved checkpoint
   */
  restore(checkPoint) {
    if (!(checkPoint instanceof Uint8Array)) {
      throw new Error("Checkpoint must be a Uint8Array");
    }
    this._view = checkPoint;
  }
  /**
   * Creates a new instance of a pipe
   * @param buffer an optional buffer to start with
   * @param length an optional amount of bytes to use for the length.
   */
  constructor(buffer, length = (buffer == null ? void 0 : buffer.byteLength) || 0) {
    if (buffer && !(buffer instanceof Uint8Array)) {
      try {
        buffer = uint8FromBufLike$1(buffer);
      } catch {
        throw new Error("Buffer must be a Uint8Array");
      }
    }
    if (length < 0 || !Number.isInteger(length)) {
      throw new Error("Length must be a non-negative integer");
    }
    if (buffer && length > buffer.byteLength) {
      throw new Error("Length cannot exceed buffer length");
    }
    this._buffer = buffer || new Uint8Array(0);
    this._view = new Uint8Array(this._buffer.buffer, 0, length);
  }
  get buffer() {
    return this._view.slice();
  }
  get byteLength() {
    return this._view.byteLength;
  }
  /**
   * Read `num` number of bytes from the front of the pipe.
   * @param num The number of bytes to read.
   */
  read(num) {
    const result = this._view.subarray(0, num);
    this._view = this._view.subarray(num);
    return result.slice();
  }
  readUint8() {
    if (this._view.byteLength === 0) {
      return void 0;
    }
    const result = this._view[0];
    this._view = this._view.subarray(1);
    return result;
  }
  /**
   * Write a buffer to the end of the pipe.
   * @param buf The bytes to write.
   */
  write(buf) {
    if (!(buf instanceof Uint8Array)) {
      throw new Error("Buffer must be a Uint8Array");
    }
    const offset = this._view.byteLength;
    if (this._view.byteOffset + this._view.byteLength + buf.byteLength >= this._buffer.byteLength) {
      this.alloc(buf.byteLength);
    } else {
      this._view = new Uint8Array(this._buffer.buffer, this._view.byteOffset, this._view.byteLength + buf.byteLength);
    }
    this._view.set(buf, offset);
  }
  /**
   * Whether or not there is more data to read from the buffer
   */
  get end() {
    return this._view.byteLength === 0;
  }
  /**
   * Allocate a fixed amount of memory in the buffer. This does not affect the view.
   * @param amount A number of bytes to add to the buffer.
   */
  alloc(amount) {
    if (amount <= 0 || !Number.isInteger(amount)) {
      throw new Error("Amount must be a positive integer");
    }
    const b2 = new Uint8Array((this._buffer.byteLength + amount) * 1.2 | 0);
    const v2 = new Uint8Array(b2.buffer, 0, this._view.byteLength + amount);
    v2.set(this._view);
    this._buffer = b2;
    this._view = v2;
  }
}
function uint8FromBufLike$1(bufLike) {
  if (!bufLike) {
    throw new Error("Input cannot be null or undefined");
  }
  if (bufLike instanceof Uint8Array) {
    return bufLike;
  }
  if (bufLike instanceof ArrayBuffer) {
    return new Uint8Array(bufLike);
  }
  if (Array.isArray(bufLike)) {
    return new Uint8Array(bufLike);
  }
  if ("buffer" in bufLike) {
    return uint8FromBufLike$1(bufLike.buffer);
  }
  return new Uint8Array(bufLike);
}
function compare(u1, u2) {
  if (u1.byteLength !== u2.byteLength) {
    return u1.byteLength - u2.byteLength;
  }
  for (let i = 0; i < u1.length; i++) {
    if (u1[i] !== u2[i]) {
      return u1[i] - u2[i];
    }
  }
  return 0;
}
function uint8Equals$1(u1, u2) {
  return compare(u1, u2) === 0;
}
function uint8ToDataView(uint8) {
  if (!(uint8 instanceof Uint8Array)) {
    throw new Error("Input must be a Uint8Array");
  }
  return new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
}
function idlHash(s2) {
  const utf8encoder = new TextEncoder();
  const array = utf8encoder.encode(s2);
  let h2 = 0;
  for (const c2 of array) {
    h2 = (h2 * 223 + c2) % 2 ** 32;
  }
  return h2;
}
function idlLabelToId(label) {
  if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
    const num = +label.slice(1, -1);
    if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) {
      return num;
    }
  }
  return idlHash(label);
}
function ilog2(n) {
  const nBig = BigInt(n);
  if (n <= 0) {
    throw new RangeError("Input must be positive");
  }
  return nBig.toString(2).length - 1;
}
function iexp2(n) {
  const nBig = BigInt(n);
  if (n < 0) {
    throw new RangeError("Input must be non-negative");
  }
  return BigInt(1) << nBig;
}
function eob() {
  throw new Error("unexpected end of buffer");
}
function safeRead(pipe, num) {
  if (pipe.byteLength < num) {
    eob();
  }
  return pipe.read(num);
}
function safeReadUint8(pipe) {
  const byte = pipe.readUint8();
  if (byte === void 0) {
    eob();
  }
  return byte;
}
function lebEncode(value) {
  if (typeof value === "number") {
    value = BigInt(value);
  }
  if (value < BigInt(0)) {
    throw new Error("Cannot leb encode negative values.");
  }
  const byteLength = (value === BigInt(0) ? 0 : ilog2(value)) + 1;
  const pipe = new PipeArrayBuffer(new Uint8Array(byteLength), 0);
  while (true) {
    const i = Number(value & BigInt(127));
    value /= BigInt(128);
    if (value === BigInt(0)) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  return pipe.buffer;
}
function lebDecode(pipe) {
  let weight = BigInt(1);
  let value = BigInt(0);
  let byte;
  do {
    byte = safeReadUint8(pipe);
    value += BigInt(byte & 127).valueOf() * weight;
    weight *= BigInt(128);
  } while (byte >= 128);
  return value;
}
function slebEncode(value) {
  if (typeof value === "number") {
    value = BigInt(value);
  }
  const isNeg = value < BigInt(0);
  if (isNeg) {
    value = -value - BigInt(1);
  }
  const byteLength = (value === BigInt(0) ? 0 : ilog2(value)) + 1;
  const pipe = new PipeArrayBuffer(new Uint8Array(byteLength), 0);
  while (true) {
    const i = getLowerBytes(value);
    value /= BigInt(128);
    if (isNeg && value === BigInt(0) && (i & 64) !== 0 || !isNeg && value === BigInt(0) && (i & 64) === 0) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  function getLowerBytes(num) {
    const bytes = num % BigInt(128);
    if (isNeg) {
      return Number(BigInt(128) - bytes - BigInt(1));
    } else {
      return Number(bytes);
    }
  }
  return pipe.buffer;
}
function slebDecode(pipe) {
  const pipeView = new Uint8Array(pipe.buffer);
  let len = 0;
  for (; len < pipeView.byteLength; len++) {
    if (pipeView[len] < 128) {
      if ((pipeView[len] & 64) === 0) {
        return lebDecode(pipe);
      }
      break;
    }
  }
  const bytes = new Uint8Array(safeRead(pipe, len + 1));
  let value = BigInt(0);
  for (let i = bytes.byteLength - 1; i >= 0; i--) {
    value = value * BigInt(128) + BigInt(128 - (bytes[i] & 127) - 1);
  }
  return -value - BigInt(1);
}
function writeUIntLE(value, byteLength) {
  if (BigInt(value) < BigInt(0)) {
    throw new Error("Cannot write negative values.");
  }
  return writeIntLE(value, byteLength);
}
function writeIntLE(value, byteLength) {
  value = BigInt(value);
  const pipe = new PipeArrayBuffer(new Uint8Array(Math.min(1, byteLength)), 0);
  let i = 0;
  let mul = BigInt(256);
  let sub = BigInt(0);
  let byte = Number(value % mul);
  pipe.write(new Uint8Array([byte]));
  while (++i < byteLength) {
    if (value < 0 && sub === BigInt(0) && byte !== 0) {
      sub = BigInt(1);
    }
    byte = Number((value / mul - sub) % BigInt(256));
    pipe.write(new Uint8Array([byte]));
    mul *= BigInt(256);
  }
  return pipe.buffer;
}
function readUIntLE(pipe, byteLength) {
  if (byteLength <= 0 || !Number.isInteger(byteLength)) {
    throw new Error("Byte length must be a positive integer");
  }
  let val = BigInt(safeReadUint8(pipe));
  let mul = BigInt(1);
  let i = 0;
  while (++i < byteLength) {
    mul *= BigInt(256);
    const byte = BigInt(safeReadUint8(pipe));
    val = val + mul * byte;
  }
  return val;
}
function readIntLE(pipe, byteLength) {
  if (byteLength <= 0 || !Number.isInteger(byteLength)) {
    throw new Error("Byte length must be a positive integer");
  }
  let val = readUIntLE(pipe, byteLength);
  const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
  if (val >= mul) {
    val -= mul * BigInt(2);
  }
  return val;
}
var IDLTypeIds;
(function(IDLTypeIds2) {
  IDLTypeIds2[IDLTypeIds2["Null"] = -1] = "Null";
  IDLTypeIds2[IDLTypeIds2["Bool"] = -2] = "Bool";
  IDLTypeIds2[IDLTypeIds2["Nat"] = -3] = "Nat";
  IDLTypeIds2[IDLTypeIds2["Int"] = -4] = "Int";
  IDLTypeIds2[IDLTypeIds2["Float32"] = -13] = "Float32";
  IDLTypeIds2[IDLTypeIds2["Float64"] = -14] = "Float64";
  IDLTypeIds2[IDLTypeIds2["Text"] = -15] = "Text";
  IDLTypeIds2[IDLTypeIds2["Reserved"] = -16] = "Reserved";
  IDLTypeIds2[IDLTypeIds2["Empty"] = -17] = "Empty";
  IDLTypeIds2[IDLTypeIds2["Opt"] = -18] = "Opt";
  IDLTypeIds2[IDLTypeIds2["Vector"] = -19] = "Vector";
  IDLTypeIds2[IDLTypeIds2["Record"] = -20] = "Record";
  IDLTypeIds2[IDLTypeIds2["Variant"] = -21] = "Variant";
  IDLTypeIds2[IDLTypeIds2["Func"] = -22] = "Func";
  IDLTypeIds2[IDLTypeIds2["Service"] = -23] = "Service";
  IDLTypeIds2[IDLTypeIds2["Principal"] = -24] = "Principal";
})(IDLTypeIds || (IDLTypeIds = {}));
const magicNumber = "DIDL";
const toReadableString_max = 400;
function zipWith(xs, ys, f) {
  return xs.map((x2, i) => f(x2, ys[i]));
}
class TypeTable {
  constructor() {
    this._typs = [];
    this._idx = /* @__PURE__ */ new Map();
    this._idxRefCount = /* @__PURE__ */ new Map();
  }
  has(obj) {
    return this._idx.has(obj.name);
  }
  add(type, buf) {
    const idx = this._typs.length;
    this._idx.set(type.name, idx);
    this._idxRefCount.set(idx, 1);
    this._typs.push(buf);
  }
  merge(obj, knot) {
    const idx = this._idx.get(obj.name);
    const knotIdx = this._idx.get(knot);
    if (idx === void 0) {
      throw new Error("Missing type index for " + obj);
    }
    if (knotIdx === void 0) {
      throw new Error("Missing type index for " + knot);
    }
    this._typs[idx] = this._typs[knotIdx];
    const idxRefCount = this._getIdxRefCount(idx);
    const knotRefCount = this._getIdxRefCount(knotIdx);
    this._idxRefCount.set(idx, idxRefCount + knotRefCount);
    this._idx.set(knot, idx);
    this._idxRefCount.set(knotIdx, 0);
    this._compactFromEnd();
  }
  _getIdxRefCount(idx) {
    return this._idxRefCount.get(idx) || 0;
  }
  _compactFromEnd() {
    while (this._typs.length > 0) {
      const lastIndex = this._typs.length - 1;
      if (this._getIdxRefCount(lastIndex) > 0) {
        break;
      }
      this._typs.pop();
      this._idxRefCount.delete(lastIndex);
    }
  }
  encode() {
    const len = lebEncode(this._typs.length);
    const buf = concat(...this._typs);
    return concat(len, buf);
  }
  indexOf(typeName) {
    if (!this._idx.has(typeName)) {
      throw new Error("Missing type index for " + typeName);
    }
    return slebEncode(this._idx.get(typeName) || 0);
  }
}
class Visitor {
  visitType(_t, _data) {
    throw new Error("Not implemented");
  }
  visitPrimitive(t2, data) {
    return this.visitType(t2, data);
  }
  visitEmpty(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitBool(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitNull(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitReserved(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitText(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitNumber(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitInt(t2, data) {
    return this.visitNumber(t2, data);
  }
  visitNat(t2, data) {
    return this.visitNumber(t2, data);
  }
  visitFloat(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitFixedInt(t2, data) {
    return this.visitNumber(t2, data);
  }
  visitFixedNat(t2, data) {
    return this.visitNumber(t2, data);
  }
  visitPrincipal(t2, data) {
    return this.visitPrimitive(t2, data);
  }
  visitConstruct(t2, data) {
    return this.visitType(t2, data);
  }
  visitVec(t2, _ty, data) {
    return this.visitConstruct(t2, data);
  }
  visitOpt(t2, _ty, data) {
    return this.visitConstruct(t2, data);
  }
  visitRecord(t2, _fields, data) {
    return this.visitConstruct(t2, data);
  }
  visitTuple(t2, components, data) {
    const fields = components.map((ty, i) => [`_${i}_`, ty]);
    return this.visitRecord(t2, fields, data);
  }
  visitVariant(t2, _fields, data) {
    return this.visitConstruct(t2, data);
  }
  visitRec(_t, ty, data) {
    return this.visitConstruct(ty, data);
  }
  visitFunc(t2, data) {
    return this.visitConstruct(t2, data);
  }
  visitService(t2, data) {
    return this.visitConstruct(t2, data);
  }
}
var IdlTypeName;
(function(IdlTypeName2) {
  IdlTypeName2["EmptyClass"] = "__IDL_EmptyClass__";
  IdlTypeName2["UnknownClass"] = "__IDL_UnknownClass__";
  IdlTypeName2["BoolClass"] = "__IDL_BoolClass__";
  IdlTypeName2["NullClass"] = "__IDL_NullClass__";
  IdlTypeName2["ReservedClass"] = "__IDL_ReservedClass__";
  IdlTypeName2["TextClass"] = "__IDL_TextClass__";
  IdlTypeName2["IntClass"] = "__IDL_IntClass__";
  IdlTypeName2["NatClass"] = "__IDL_NatClass__";
  IdlTypeName2["FloatClass"] = "__IDL_FloatClass__";
  IdlTypeName2["FixedIntClass"] = "__IDL_FixedIntClass__";
  IdlTypeName2["FixedNatClass"] = "__IDL_FixedNatClass__";
  IdlTypeName2["VecClass"] = "__IDL_VecClass__";
  IdlTypeName2["OptClass"] = "__IDL_OptClass__";
  IdlTypeName2["RecordClass"] = "__IDL_RecordClass__";
  IdlTypeName2["TupleClass"] = "__IDL_TupleClass__";
  IdlTypeName2["VariantClass"] = "__IDL_VariantClass__";
  IdlTypeName2["RecClass"] = "__IDL_RecClass__";
  IdlTypeName2["PrincipalClass"] = "__IDL_PrincipalClass__";
  IdlTypeName2["FuncClass"] = "__IDL_FuncClass__";
  IdlTypeName2["ServiceClass"] = "__IDL_ServiceClass__";
})(IdlTypeName || (IdlTypeName = {}));
class Type {
  /* Display type name */
  display() {
    return this.name;
  }
  valueToString(x2) {
    return toReadableString(x2);
  }
  /* Implement `T` in the IDL spec, only needed for non-primitive types */
  buildTypeTable(typeTable) {
    if (!typeTable.has(this)) {
      this._buildTypeTableImpl(typeTable);
    }
  }
}
class PrimitiveType extends Type {
  checkType(t2) {
    if (this.name !== t2.name) {
      throw new Error(`type mismatch: type on the wire ${t2.name}, expect type ${this.name}`);
    }
    return t2;
  }
  _buildTypeTableImpl(_typeTable) {
    return;
  }
}
class ConstructType extends Type {
  checkType(t2) {
    if (t2 instanceof RecClass) {
      const ty = t2.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      }
      return ty;
    }
    throw new Error(`type mismatch: type on the wire ${t2.name}, expect type ${this.name}`);
  }
  encodeType(typeTable) {
    return typeTable.indexOf(this.name);
  }
}
class EmptyClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.EmptyClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.EmptyClass;
  }
  accept(v2, d2) {
    return v2.visitEmpty(this, d2);
  }
  covariant(x2) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    throw new Error("Empty cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Empty cannot appear as a value");
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Empty);
  }
  decodeValue() {
    throw new Error("Empty cannot appear as an output");
  }
  get name() {
    return "empty";
  }
}
class UnknownClass extends Type {
  get typeName() {
    return IdlTypeName.UnknownClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.UnknownClass;
  }
  checkType(_t) {
    throw new Error("Method not implemented for unknown.");
  }
  accept(v2, d2) {
    throw v2.visitType(this, d2);
  }
  covariant(x2) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    throw new Error("Unknown cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Unknown cannot appear as a value");
  }
  encodeType() {
    throw new Error("Unknown cannot be serialized");
  }
  decodeValue(b2, t2) {
    let decodedValue = t2.decodeValue(b2, t2);
    if (Object(decodedValue) !== decodedValue) {
      decodedValue = Object(decodedValue);
    }
    let typeFunc;
    if (t2 instanceof RecClass) {
      typeFunc = () => t2.getType();
    } else {
      typeFunc = () => t2;
    }
    Object.defineProperty(decodedValue, "type", {
      value: typeFunc,
      writable: true,
      enumerable: false,
      configurable: true
    });
    return decodedValue;
  }
  _buildTypeTableImpl() {
    throw new Error("Unknown cannot be serialized");
  }
  get name() {
    return "Unknown";
  }
}
class BoolClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.BoolClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.BoolClass;
  }
  accept(v2, d2) {
    return v2.visitBool(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "boolean")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return new Uint8Array([x2 ? 1 : 0]);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Bool);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    switch (safeReadUint8(b2)) {
      case 0:
        return false;
      case 1:
        return true;
      default:
        throw new Error("Boolean value out of range");
    }
  }
  get name() {
    return "bool";
  }
}
class NullClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.NullClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.NullClass;
  }
  accept(v2, d2) {
    return v2.visitNull(this, d2);
  }
  covariant(x2) {
    if (x2 === null)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    return new Uint8Array(0);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Null);
  }
  decodeValue(_b2, t2) {
    this.checkType(t2);
    return null;
  }
  get name() {
    return "null";
  }
}
class ReservedClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.ReservedClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.ReservedClass;
  }
  accept(v2, d2) {
    return v2.visitReserved(this, d2);
  }
  covariant(_x) {
    return true;
  }
  encodeValue() {
    return new Uint8Array(0);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Reserved);
  }
  decodeValue(b2, t2) {
    if (t2.name !== this.name) {
      t2.decodeValue(b2, t2);
    }
    return null;
  }
  get name() {
    return "reserved";
  }
}
class TextClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.TextClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.TextClass;
  }
  accept(v2, d2) {
    return v2.visitText(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = new TextEncoder().encode(x2);
    const len = lebEncode(buf.byteLength);
    return concat(len, buf);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Text);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    const len = lebDecode(b2);
    const buf = safeRead(b2, Number(len));
    const decoder = new TextDecoder("utf8", { fatal: true });
    return decoder.decode(buf);
  }
  get name() {
    return "text";
  }
  valueToString(x2) {
    return '"' + x2 + '"';
  }
}
class IntClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.IntClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.IntClass;
  }
  accept(v2, d2) {
    return v2.visitInt(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "bigint" || Number.isInteger(x2))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return slebEncode(x2);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Int);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    return slebDecode(b2);
  }
  get name() {
    return "int";
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class NatClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.NatClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.NatClass;
  }
  accept(v2, d2) {
    return v2.visitNat(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "bigint" && x2 >= BigInt(0) || Number.isInteger(x2) && x2 >= 0)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return lebEncode(x2);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Nat);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    return lebDecode(b2);
  }
  get name() {
    return "nat";
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FloatClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.FloatClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FloatClass;
  }
  constructor(_bits) {
    super();
    this._bits = _bits;
    if (_bits !== 32 && _bits !== 64) {
      throw new Error("not a valid float type");
    }
  }
  accept(v2, d2) {
    return v2.visitFloat(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "number" || x2 instanceof Number)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = new ArrayBuffer(this._bits / 8);
    const view = new DataView(buf);
    if (this._bits === 32) {
      view.setFloat32(0, x2, true);
    } else {
      view.setFloat64(0, x2, true);
    }
    return new Uint8Array(buf);
  }
  encodeType() {
    const opcode = this._bits === 32 ? IDLTypeIds.Float32 : IDLTypeIds.Float64;
    return slebEncode(opcode);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    const bytes = safeRead(b2, this._bits / 8);
    const view = uint8ToDataView(bytes);
    if (this._bits === 32) {
      return view.getFloat32(0, true);
    } else {
      return view.getFloat64(0, true);
    }
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FixedIntClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.FixedIntClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FixedIntClass;
  }
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v2, d2) {
    return v2.visitFixedInt(this, d2);
  }
  covariant(x2) {
    const min = iexp2(this._bits - 1) * BigInt(-1);
    const max = iexp2(this._bits - 1) - BigInt(1);
    let ok = false;
    if (typeof x2 === "bigint") {
      ok = x2 >= min && x2 <= max;
    } else if (Number.isInteger(x2)) {
      const v2 = BigInt(x2);
      ok = v2 >= min && v2 <= max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return writeIntLE(x2, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-9 - offset);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    const num = readIntLE(b2, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FixedNatClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.FixedNatClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FixedNatClass;
  }
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v2, d2) {
    return v2.visitFixedNat(this, d2);
  }
  covariant(x2) {
    const max = iexp2(this._bits);
    let ok = false;
    if (typeof x2 === "bigint" && x2 >= BigInt(0)) {
      ok = x2 < max;
    } else if (Number.isInteger(x2) && x2 >= 0) {
      const v2 = BigInt(x2);
      ok = v2 < max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return writeUIntLE(x2, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-5 - offset);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    const num = readUIntLE(b2, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class VecClass extends ConstructType {
  get typeName() {
    return IdlTypeName.VecClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.VecClass;
  }
  constructor(_type) {
    super();
    this._type = _type;
    this._blobOptimization = false;
    if (_type instanceof FixedNatClass && _type._bits === 8) {
      this._blobOptimization = true;
    }
  }
  accept(v2, d2) {
    return v2.visitVec(this, this._type, d2);
  }
  covariant(x2) {
    const bits = this._type instanceof FixedNatClass ? this._type._bits : this._type instanceof FixedIntClass ? this._type._bits : 0;
    if (ArrayBuffer.isView(x2) && bits == x2.BYTES_PER_ELEMENT * 8 || Array.isArray(x2) && x2.every((v2, idx) => {
      try {
        return this._type.covariant(v2);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${idx} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const len = lebEncode(x2.length);
    if (this._blobOptimization) {
      return concat(len, new Uint8Array(x2));
    }
    if (ArrayBuffer.isView(x2)) {
      if (x2 instanceof Int16Array || x2 instanceof Uint16Array) {
        const buffer = new DataView(new ArrayBuffer(x2.length * 2));
        for (let i = 0; i < x2.length; i++) {
          if (x2 instanceof Int16Array) {
            buffer.setInt16(i * 2, x2[i], true);
          } else {
            buffer.setUint16(i * 2, x2[i], true);
          }
        }
        return concat(len, new Uint8Array(buffer.buffer));
      } else if (x2 instanceof Int32Array || x2 instanceof Uint32Array) {
        const buffer = new DataView(new ArrayBuffer(x2.length * 4));
        for (let i = 0; i < x2.length; i++) {
          if (x2 instanceof Int32Array) {
            buffer.setInt32(i * 4, x2[i], true);
          } else {
            buffer.setUint32(i * 4, x2[i], true);
          }
        }
        return concat(len, new Uint8Array(buffer.buffer));
      } else if (x2 instanceof BigInt64Array || x2 instanceof BigUint64Array) {
        const buffer = new DataView(new ArrayBuffer(x2.length * 8));
        for (let i = 0; i < x2.length; i++) {
          if (x2 instanceof BigInt64Array) {
            buffer.setBigInt64(i * 8, x2[i], true);
          } else {
            buffer.setBigUint64(i * 8, x2[i], true);
          }
        }
        return concat(len, new Uint8Array(buffer.buffer));
      } else {
        return concat(len, new Uint8Array(x2.buffer, x2.byteOffset, x2.byteLength));
      }
    }
    const buf = new PipeArrayBuffer(new Uint8Array(len.byteLength + x2.length), 0);
    buf.write(len);
    for (const d2 of x2) {
      const encoded = this._type.encodeValue(d2);
      buf.write(new Uint8Array(encoded));
    }
    return buf.buffer;
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(IDLTypeIds.Vector);
    const buffer = this._type.encodeType(typeTable);
    typeTable.add(this, concat(opCode, buffer));
  }
  decodeValue(b2, t2) {
    const vec = this.checkType(t2);
    if (!(vec instanceof VecClass)) {
      throw new Error("Not a vector type");
    }
    const len = Number(lebDecode(b2));
    if (this._type instanceof FixedNatClass) {
      if (this._type._bits == 8) {
        return new Uint8Array(b2.read(len));
      }
      if (this._type._bits == 16) {
        const bytes = b2.read(len * 2);
        const u16 = new Uint16Array(bytes.buffer, bytes.byteOffset, len);
        return u16;
      }
      if (this._type._bits == 32) {
        const bytes = b2.read(len * 4);
        const u32 = new Uint32Array(bytes.buffer, bytes.byteOffset, len);
        return u32;
      }
      if (this._type._bits == 64) {
        return new BigUint64Array(b2.read(len * 8).buffer);
      }
    }
    if (this._type instanceof FixedIntClass) {
      if (this._type._bits == 8) {
        return new Int8Array(b2.read(len));
      }
      if (this._type._bits == 16) {
        const bytes = b2.read(len * 2);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const result = new Int16Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = view.getInt16(i * 2, true);
        }
        return result;
      }
      if (this._type._bits == 32) {
        const bytes = b2.read(len * 4);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const result = new Int32Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = view.getInt32(i * 4, true);
        }
        return result;
      }
      if (this._type._bits == 64) {
        const bytes = b2.read(len * 8);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const result = new BigInt64Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = view.getBigInt64(i * 8, true);
        }
        return result;
      }
    }
    const rets = [];
    for (let i = 0; i < len; i++) {
      rets.push(this._type.decodeValue(b2, vec._type));
    }
    return rets;
  }
  get name() {
    return `vec ${this._type.name}`;
  }
  display() {
    return `vec ${this._type.display()}`;
  }
  valueToString(x2) {
    const elements = x2.map((e) => this._type.valueToString(e));
    return "vec {" + elements.join("; ") + "}";
  }
}
class OptClass extends ConstructType {
  get typeName() {
    return IdlTypeName.OptClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.OptClass;
  }
  constructor(_type) {
    super();
    this._type = _type;
  }
  accept(v2, d2) {
    return v2.visitOpt(this, this._type, d2);
  }
  covariant(x2) {
    try {
      if (Array.isArray(x2) && (x2.length === 0 || x2.length === 1 && this._type.covariant(x2[0])))
        return true;
    } catch (e) {
      throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)} 

-> ${e.message}`);
    }
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    if (x2.length === 0) {
      return new Uint8Array([0]);
    } else {
      return concat(new Uint8Array([1]), this._type.encodeValue(x2[0]));
    }
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(IDLTypeIds.Opt);
    const buffer = this._type.encodeType(typeTable);
    typeTable.add(this, concat(opCode, buffer));
  }
  decodeValue(b2, t2) {
    if (t2 instanceof NullClass) {
      return [];
    }
    if (t2 instanceof ReservedClass) {
      return [];
    }
    let wireType = t2;
    if (t2 instanceof RecClass) {
      const ty = t2.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      } else
        wireType = ty;
    }
    if (wireType instanceof OptClass) {
      switch (safeReadUint8(b2)) {
        case 0:
          return [];
        case 1: {
          const checkpoint = b2.save();
          try {
            const v2 = this._type.decodeValue(b2, wireType._type);
            return [v2];
          } catch (e) {
            b2.restore(checkpoint);
            wireType._type.decodeValue(b2, wireType._type);
            return [];
          }
        }
        default:
          throw new Error("Not an option value");
      }
    } else if (
      // this check corresponds to `not (null <: <t>)` in the spec
      this._type instanceof NullClass || this._type instanceof OptClass || this._type instanceof ReservedClass
    ) {
      wireType.decodeValue(b2, wireType);
      return [];
    } else {
      const checkpoint = b2.save();
      try {
        const v2 = this._type.decodeValue(b2, t2);
        return [v2];
      } catch (e) {
        b2.restore(checkpoint);
        wireType.decodeValue(b2, t2);
        return [];
      }
    }
  }
  get name() {
    return `opt ${this._type.name}`;
  }
  display() {
    return `opt ${this._type.display()}`;
  }
  valueToString(x2) {
    if (x2.length === 0) {
      return "null";
    } else {
      return `opt ${this._type.valueToString(x2[0])}`;
    }
  }
}
class RecordClass extends ConstructType {
  get typeName() {
    return IdlTypeName.RecordClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.RecordClass || instance.typeName === IdlTypeName.TupleClass;
  }
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a2, b2) => idlLabelToId(a2[0]) - idlLabelToId(b2[0]));
  }
  accept(v2, d2) {
    return v2.visitRecord(this, this._fields, d2);
  }
  tryAsTuple() {
    const res = [];
    for (let i = 0; i < this._fields.length; i++) {
      const [key, type] = this._fields[i];
      if (key !== `_${i}_`) {
        return null;
      }
      res.push(type);
    }
    return res;
  }
  covariant(x2) {
    if (typeof x2 === "object" && this._fields.every(([k2, t2]) => {
      if (!x2.hasOwnProperty(k2)) {
        throw new Error(`Record is missing key "${k2}".`);
      }
      try {
        return t2.covariant(x2[k2]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

field ${k2} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const values = this._fields.map(([key]) => x2[key]);
    const bufs = zipWith(this._fields, values, ([, c2], d2) => c2.encodeValue(d2));
    return concat(...bufs);
  }
  _buildTypeTableImpl(T2) {
    this._fields.forEach(([_2, value]) => value.buildTypeTable(T2));
    const opCode = slebEncode(IDLTypeIds.Record);
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value]) => concat(lebEncode(idlLabelToId(key)), value.encodeType(T2)));
    T2.add(this, concat(opCode, len, concat(...fields)));
  }
  decodeValue(b2, t2) {
    const record = this.checkType(t2);
    if (!(record instanceof RecordClass)) {
      throw new Error("Not a record type");
    }
    const x2 = {};
    let expectedRecordIdx = 0;
    let actualRecordIdx = 0;
    while (actualRecordIdx < record._fields.length) {
      const [hash, type] = record._fields[actualRecordIdx];
      if (expectedRecordIdx >= this._fields.length) {
        type.decodeValue(b2, type);
        actualRecordIdx++;
        continue;
      }
      const [expectKey, expectType] = this._fields[expectedRecordIdx];
      const expectedId = idlLabelToId(this._fields[expectedRecordIdx][0]);
      const actualId = idlLabelToId(hash);
      if (expectedId === actualId) {
        x2[expectKey] = expectType.decodeValue(b2, type);
        expectedRecordIdx++;
        actualRecordIdx++;
      } else if (actualId > expectedId) {
        if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
          x2[expectKey] = [];
          expectedRecordIdx++;
        } else {
          throw new Error("Cannot find required field " + expectKey);
        }
      } else {
        type.decodeValue(b2, type);
        actualRecordIdx++;
      }
    }
    for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) {
      if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
        x2[expectKey] = [];
      } else {
        throw new Error("Cannot find required field " + expectKey);
      }
    }
    return x2;
  }
  get fieldsAsObject() {
    const fields = {};
    for (const [name, ty] of this._fields) {
      fields[idlLabelToId(name)] = ty;
    }
    return fields;
  }
  get name() {
    const fields = this._fields.map(([key, value]) => key + ":" + value.name);
    return `record {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, value]) => key + ":" + value.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    const values = this._fields.map(([key]) => x2[key]);
    const fields = zipWith(this._fields, values, ([k2, c2], d2) => k2 + "=" + c2.valueToString(d2));
    return `record {${fields.join("; ")}}`;
  }
}
class TupleClass extends RecordClass {
  get typeName() {
    return IdlTypeName.TupleClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.TupleClass;
  }
  constructor(_components) {
    const x2 = {};
    _components.forEach((e, i) => x2["_" + i + "_"] = e);
    super(x2);
    this._components = _components;
  }
  accept(v2, d2) {
    return v2.visitTuple(this, this._components, d2);
  }
  covariant(x2) {
    if (Array.isArray(x2) && x2.length >= this._fields.length && this._components.every((t2, i) => {
      try {
        return t2.covariant(x2[i]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const bufs = zipWith(this._components, x2, (c2, d2) => c2.encodeValue(d2));
    return concat(...bufs);
  }
  decodeValue(b2, t2) {
    const tuple = this.checkType(t2);
    if (!(tuple instanceof TupleClass)) {
      throw new Error("not a tuple type");
    }
    if (tuple._components.length < this._components.length) {
      throw new Error("tuple mismatch");
    }
    const res = [];
    for (const [i, wireType] of tuple._components.entries()) {
      if (i >= this._components.length) {
        wireType.decodeValue(b2, wireType);
      } else {
        res.push(this._components[i].decodeValue(b2, wireType));
      }
    }
    return res;
  }
  display() {
    const fields = this._components.map((value) => value.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(values) {
    const fields = zipWith(this._components, values, (c2, d2) => c2.valueToString(d2));
    return `record {${fields.join("; ")}}`;
  }
}
class VariantClass extends ConstructType {
  get typeName() {
    return IdlTypeName.VariantClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.VariantClass;
  }
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a2, b2) => idlLabelToId(a2[0]) - idlLabelToId(b2[0]));
  }
  accept(v2, d2) {
    return v2.visitVariant(this, this._fields, d2);
  }
  covariant(x2) {
    if (typeof x2 === "object" && Object.entries(x2).length === 1 && this._fields.every(([k2, v2]) => {
      try {
        return !x2.hasOwnProperty(k2) || v2.covariant(x2[k2]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

variant ${k2} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    for (let i = 0; i < this._fields.length; i++) {
      const [name, type] = this._fields[i];
      if (x2.hasOwnProperty(name)) {
        const idx = lebEncode(i);
        const buf = type.encodeValue(x2[name]);
        return concat(idx, buf);
      }
    }
    throw Error("Variant has no data: " + x2);
  }
  _buildTypeTableImpl(typeTable) {
    this._fields.forEach(([, type]) => {
      type.buildTypeTable(typeTable);
    });
    const opCode = slebEncode(IDLTypeIds.Variant);
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value]) => concat(lebEncode(idlLabelToId(key)), value.encodeType(typeTable)));
    typeTable.add(this, concat(opCode, len, ...fields));
  }
  decodeValue(b2, t2) {
    const variant = this.checkType(t2);
    if (!(variant instanceof VariantClass)) {
      throw new Error("Not a variant type");
    }
    const idx = Number(lebDecode(b2));
    if (idx >= variant._fields.length) {
      throw Error("Invalid variant index: " + idx);
    }
    const [wireHash, wireType] = variant._fields[idx];
    for (const [key, expectType] of this._fields) {
      if (idlLabelToId(wireHash) === idlLabelToId(key)) {
        const value = expectType.decodeValue(b2, wireType);
        return { [key]: value };
      }
    }
    throw new Error("Cannot find field hash " + wireHash);
  }
  get name() {
    const fields = this._fields.map(([key, type]) => key + ":" + type.name);
    return `variant {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`));
    return `variant {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    for (const [name, type] of this._fields) {
      if (x2.hasOwnProperty(name)) {
        const value = type.valueToString(x2[name]);
        if (value === "null") {
          return `variant {${name}}`;
        } else {
          return `variant {${name}=${value}}`;
        }
      }
    }
    throw new Error("Variant has no data: " + x2);
  }
  get alternativesAsObject() {
    const alternatives = {};
    for (const [name, ty] of this._fields) {
      alternatives[idlLabelToId(name)] = ty;
    }
    return alternatives;
  }
}
const _RecClass = class _RecClass extends ConstructType {
  constructor() {
    super(...arguments);
    this._id = _RecClass._counter++;
  }
  get typeName() {
    return IdlTypeName.RecClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.RecClass;
  }
  accept(v2, d2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return v2.visitRec(this, this._type, d2);
  }
  fill(t2) {
    this._type = t2;
  }
  getType() {
    return this._type;
  }
  covariant(x2) {
    if (this._type ? this._type.covariant(x2) : false)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.encodeValue(x2);
  }
  _buildTypeTableImpl(typeTable) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    typeTable.add(this, new Uint8Array([]));
    this._type.buildTypeTable(typeTable);
    typeTable.merge(this, this._type.name);
  }
  decodeValue(b2, t2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.decodeValue(b2, t2);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(x2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.valueToString(x2);
  }
};
_RecClass._counter = 0;
let RecClass = _RecClass;
function decodePrincipalId(b2) {
  const x2 = safeReadUint8(b2);
  if (x2 !== 1) {
    throw new Error("Cannot decode principal");
  }
  const len = Number(lebDecode(b2));
  return Principal$1.fromUint8Array(new Uint8Array(safeRead(b2, len)));
}
class PrincipalClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.PrincipalClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.PrincipalClass;
  }
  accept(v2, d2) {
    return v2.visitPrincipal(this, d2);
  }
  covariant(x2) {
    if (x2 && x2._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = x2.toUint8Array();
    const len = lebEncode(buf.byteLength);
    return concat(new Uint8Array([1]), len, buf);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Principal);
  }
  decodeValue(b2, t2) {
    this.checkType(t2);
    return decodePrincipalId(b2);
  }
  get name() {
    return "principal";
  }
  valueToString(x2) {
    return `${this.name} "${x2.toText()}"`;
  }
}
class FuncClass extends ConstructType {
  get typeName() {
    return IdlTypeName.FuncClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FuncClass;
  }
  static argsToString(types, v2) {
    if (types.length !== v2.length) {
      throw new Error("arity mismatch");
    }
    return "(" + types.map((t2, i) => t2.valueToString(v2[i])).join(", ") + ")";
  }
  constructor(argTypes, retTypes, annotations = []) {
    super();
    this.argTypes = argTypes;
    this.retTypes = retTypes;
    this.annotations = annotations;
  }
  accept(v2, d2) {
    return v2.visitFunc(this, d2);
  }
  covariant(x2) {
    if (Array.isArray(x2) && x2.length === 2 && x2[0] && x2[0]._isPrincipal && typeof x2[1] === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue([principal, methodName]) {
    const buf = principal.toUint8Array();
    const len = lebEncode(buf.byteLength);
    const canister = concat(new Uint8Array([1]), len, buf);
    const method = new TextEncoder().encode(methodName);
    const methodLen = lebEncode(method.byteLength);
    return concat(new Uint8Array([1]), canister, methodLen, method);
  }
  _buildTypeTableImpl(T2) {
    this.argTypes.forEach((arg) => arg.buildTypeTable(T2));
    this.retTypes.forEach((arg) => arg.buildTypeTable(T2));
    const opCode = slebEncode(IDLTypeIds.Func);
    const argLen = lebEncode(this.argTypes.length);
    const args = concat(...this.argTypes.map((arg) => arg.encodeType(T2)));
    const retLen = lebEncode(this.retTypes.length);
    const rets = concat(...this.retTypes.map((arg) => arg.encodeType(T2)));
    const annLen = lebEncode(this.annotations.length);
    const anns = concat(...this.annotations.map((a2) => this.encodeAnnotation(a2)));
    T2.add(this, concat(opCode, argLen, args, retLen, rets, annLen, anns));
  }
  decodeValue(b2, t2) {
    const tt2 = t2 instanceof RecClass ? t2.getType() ?? t2 : t2;
    if (!subtype(tt2, this)) {
      throw new Error(`Cannot decode function reference at type ${this.display()} from wire type ${tt2.display()}`);
    }
    const x2 = safeReadUint8(b2);
    if (x2 !== 1) {
      throw new Error("Cannot decode function reference");
    }
    const canister = decodePrincipalId(b2);
    const mLen = Number(lebDecode(b2));
    const buf = safeRead(b2, mLen);
    const decoder = new TextDecoder("utf8", { fatal: true });
    const method = decoder.decode(buf);
    return [canister, method];
  }
  get name() {
    const args = this.argTypes.map((arg) => arg.name).join(", ");
    const rets = this.retTypes.map((arg) => arg.name).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) -> (${rets})${annon}`;
  }
  valueToString([principal, str]) {
    return `func "${principal.toText()}".${str}`;
  }
  display() {
    const args = this.argTypes.map((arg) => arg.display()).join(", ");
    const rets = this.retTypes.map((arg) => arg.display()).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) → (${rets})${annon}`;
  }
  encodeAnnotation(ann) {
    if (ann === "query") {
      return new Uint8Array([1]);
    } else if (ann === "oneway") {
      return new Uint8Array([2]);
    } else if (ann === "composite_query") {
      return new Uint8Array([3]);
    } else {
      throw new Error("Illegal function annotation");
    }
  }
}
class ServiceClass extends ConstructType {
  get typeName() {
    return IdlTypeName.ServiceClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.ServiceClass;
  }
  constructor(fields) {
    super();
    this._fields = Object.entries(fields).sort((a2, b2) => {
      if (a2[0] < b2[0]) {
        return -1;
      }
      if (a2[0] > b2[0]) {
        return 1;
      }
      return 0;
    });
  }
  accept(v2, d2) {
    return v2.visitService(this, d2);
  }
  covariant(x2) {
    if (x2 && x2._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = x2.toUint8Array();
    const len = lebEncode(buf.length);
    return concat(new Uint8Array([1]), len, buf);
  }
  _buildTypeTableImpl(T2) {
    this._fields.forEach(([_2, func]) => func.buildTypeTable(T2));
    const opCode = slebEncode(IDLTypeIds.Service);
    const len = lebEncode(this._fields.length);
    const meths = this._fields.map(([label, func]) => {
      const labelBuf = new TextEncoder().encode(label);
      const labelLen = lebEncode(labelBuf.length);
      return concat(labelLen, labelBuf, func.encodeType(T2));
    });
    T2.add(this, concat(opCode, len, ...meths));
  }
  decodeValue(b2, t2) {
    const tt2 = t2 instanceof RecClass ? t2.getType() ?? t2 : t2;
    if (!subtype(tt2, this)) {
      throw new Error(`Cannot decode service reference at type ${this.display()} from wire type ${tt2.display()}`);
    }
    return decodePrincipalId(b2);
  }
  get name() {
    const fields = this._fields.map(([key, value]) => key + ":" + value.name);
    return `service {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    return `service "${x2.toText()}"`;
  }
  fieldsAsObject() {
    const fields = {};
    for (const [name, ty] of this._fields) {
      fields[name] = ty;
    }
    return fields;
  }
}
function toReadableString(x2) {
  const str = JSON.stringify(x2, (_key, value) => typeof value === "bigint" ? `BigInt(${value})` : value);
  return str && str.length > toReadableString_max ? str.substring(0, toReadableString_max - 3) + "..." : str;
}
function encode$1(argTypes, args) {
  if (args.length < argTypes.length) {
    throw Error("Wrong number of message arguments");
  }
  const typeTable = new TypeTable();
  argTypes.forEach((t2) => t2.buildTypeTable(typeTable));
  const magic = new TextEncoder().encode(magicNumber);
  const table = typeTable.encode();
  const len = lebEncode(args.length);
  const typs = concat(...argTypes.map((t2) => t2.encodeType(typeTable)));
  const vals = concat(...zipWith(argTypes, args, (t2, x2) => {
    try {
      t2.covariant(x2);
    } catch (e) {
      const err = new Error(e.message + "\n\n");
      throw err;
    }
    return t2.encodeValue(x2);
  }));
  return concat(magic, table, len, typs, vals);
}
function decode$1(retTypes, bytes) {
  const b2 = new PipeArrayBuffer(bytes);
  if (bytes.byteLength < magicNumber.length) {
    throw new Error("Message length smaller than magic number");
  }
  const magicBuffer = safeRead(b2, magicNumber.length);
  const magic = new TextDecoder().decode(magicBuffer);
  if (magic !== magicNumber) {
    throw new Error("Wrong magic number: " + JSON.stringify(magic));
  }
  function readTypeTable(pipe) {
    const typeTable = [];
    const len = Number(lebDecode(pipe));
    for (let i = 0; i < len; i++) {
      const ty = Number(slebDecode(pipe));
      switch (ty) {
        case IDLTypeIds.Opt:
        case IDLTypeIds.Vector: {
          const t2 = Number(slebDecode(pipe));
          typeTable.push([ty, t2]);
          break;
        }
        case IDLTypeIds.Record:
        case IDLTypeIds.Variant: {
          const fields = [];
          let objectLength = Number(lebDecode(pipe));
          let prevHash;
          while (objectLength--) {
            const hash = Number(lebDecode(pipe));
            if (hash >= Math.pow(2, 32)) {
              throw new Error("field id out of 32-bit range");
            }
            if (typeof prevHash === "number" && prevHash >= hash) {
              throw new Error("field id collision or not sorted");
            }
            prevHash = hash;
            const t2 = Number(slebDecode(pipe));
            fields.push([hash, t2]);
          }
          typeTable.push([ty, fields]);
          break;
        }
        case IDLTypeIds.Func: {
          const args = [];
          let argLength = Number(lebDecode(pipe));
          while (argLength--) {
            args.push(Number(slebDecode(pipe)));
          }
          const returnValues = [];
          let returnValuesLength = Number(lebDecode(pipe));
          while (returnValuesLength--) {
            returnValues.push(Number(slebDecode(pipe)));
          }
          const annotations = [];
          let annotationLength = Number(lebDecode(pipe));
          while (annotationLength--) {
            const annotation = Number(lebDecode(pipe));
            switch (annotation) {
              case 1: {
                annotations.push("query");
                break;
              }
              case 2: {
                annotations.push("oneway");
                break;
              }
              case 3: {
                annotations.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          }
          typeTable.push([ty, [args, returnValues, annotations]]);
          break;
        }
        case IDLTypeIds.Service: {
          let servLength = Number(lebDecode(pipe));
          const methods = [];
          while (servLength--) {
            const nameLength = Number(lebDecode(pipe));
            const funcName = new TextDecoder().decode(safeRead(pipe, nameLength));
            const funcType = slebDecode(pipe);
            methods.push([funcName, funcType]);
          }
          typeTable.push([ty, methods]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + ty);
      }
    }
    const rawList = [];
    const length = Number(lebDecode(pipe));
    for (let i = 0; i < length; i++) {
      rawList.push(Number(slebDecode(pipe)));
    }
    return [typeTable, rawList];
  }
  const [rawTable, rawTypes] = readTypeTable(b2);
  if (rawTypes.length < retTypes.length) {
    throw new Error("Wrong number of return values");
  }
  const table = rawTable.map((_2) => Rec());
  function getType(t2) {
    if (t2 < -24) {
      throw new Error("future value not supported");
    }
    if (t2 < 0) {
      switch (t2) {
        case -1:
          return Null;
        case -2:
          return Bool;
        case -3:
          return Nat;
        case -4:
          return Int;
        case -5:
          return Nat8;
        case -6:
          return Nat16;
        case -7:
          return Nat32;
        case -8:
          return Nat64;
        case -9:
          return Int8;
        case -10:
          return Int16;
        case -11:
          return Int32;
        case -12:
          return Int64;
        case -13:
          return Float32;
        case -14:
          return Float64;
        case -15:
          return Text;
        case -16:
          return Reserved;
        case -17:
          return Empty;
        case -24:
          return Principal2;
        default:
          throw new Error("Illegal op_code: " + t2);
      }
    }
    if (t2 >= rawTable.length) {
      throw new Error("type index out of range");
    }
    return table[t2];
  }
  function buildType(entry) {
    switch (entry[0]) {
      case IDLTypeIds.Vector: {
        const ty = getType(entry[1]);
        return Vec(ty);
      }
      case IDLTypeIds.Opt: {
        const ty = getType(entry[1]);
        return Opt(ty);
      }
      case IDLTypeIds.Record: {
        const fields = {};
        for (const [hash, ty] of entry[1]) {
          const name = `_${hash}_`;
          fields[name] = getType(ty);
        }
        const record = Record(fields);
        const tuple = record.tryAsTuple();
        if (Array.isArray(tuple)) {
          return Tuple(...tuple);
        } else {
          return record;
        }
      }
      case IDLTypeIds.Variant: {
        const fields = {};
        for (const [hash, ty] of entry[1]) {
          const name = `_${hash}_`;
          fields[name] = getType(ty);
        }
        return Variant(fields);
      }
      case IDLTypeIds.Func: {
        const [args, returnValues, annotations] = entry[1];
        return Func(args.map((t2) => getType(t2)), returnValues.map((t2) => getType(t2)), annotations);
      }
      case IDLTypeIds.Service: {
        const rec = {};
        const methods = entry[1];
        for (const [name, typeRef] of methods) {
          let type = getType(typeRef);
          if (type instanceof RecClass) {
            type = type.getType();
          }
          if (!(type instanceof FuncClass)) {
            throw new Error("Illegal service definition: services can only contain functions");
          }
          rec[name] = type;
        }
        return Service(rec);
      }
      default:
        throw new Error("Illegal op_code: " + entry[0]);
    }
  }
  rawTable.forEach((entry, i) => {
    if (entry[0] === IDLTypeIds.Func) {
      const t2 = buildType(entry);
      table[i].fill(t2);
    }
  });
  rawTable.forEach((entry, i) => {
    if (entry[0] !== IDLTypeIds.Func) {
      const t2 = buildType(entry);
      table[i].fill(t2);
    }
  });
  resetSubtypeCache();
  const types = rawTypes.map((t2) => getType(t2));
  try {
    const output = retTypes.map((t2, i) => {
      return t2.decodeValue(b2, types[i]);
    });
    for (let ind = retTypes.length; ind < types.length; ind++) {
      types[ind].decodeValue(b2, types[ind]);
    }
    if (b2.byteLength > 0) {
      throw new Error("decode: Left-over bytes");
    }
    return output;
  } finally {
    resetSubtypeCache();
  }
}
const Empty = new EmptyClass();
const Reserved = new ReservedClass();
const Unknown = new UnknownClass();
const Bool = new BoolClass();
const Null = new NullClass();
const Text = new TextClass();
const Int = new IntClass();
const Nat = new NatClass();
const Float32 = new FloatClass(32);
const Float64 = new FloatClass(64);
const Int8 = new FixedIntClass(8);
const Int16 = new FixedIntClass(16);
const Int32 = new FixedIntClass(32);
const Int64 = new FixedIntClass(64);
const Nat8 = new FixedNatClass(8);
const Nat16 = new FixedNatClass(16);
const Nat32 = new FixedNatClass(32);
const Nat64 = new FixedNatClass(64);
const Principal2 = new PrincipalClass();
function Tuple(...types) {
  return new TupleClass(types);
}
function Vec(t2) {
  return new VecClass(t2);
}
function Opt(t2) {
  return new OptClass(t2);
}
function Record(t2) {
  return new RecordClass(t2);
}
function Variant(fields) {
  return new VariantClass(fields);
}
function Rec() {
  return new RecClass();
}
function Func(args, ret, annotations = []) {
  return new FuncClass(args, ret, annotations);
}
function Service(t2) {
  return new ServiceClass(t2);
}
class Relations {
  constructor(relations = /* @__PURE__ */ new Map()) {
    this.rels = relations;
  }
  copy() {
    const copy = /* @__PURE__ */ new Map();
    for (const [key, value] of this.rels.entries()) {
      const valCopy = new Map(value);
      copy.set(key, valCopy);
    }
    return new Relations(copy);
  }
  /// Returns whether we know for sure that a relation holds or doesn't (`true` or `false`), or
  /// if we don't know yet (`undefined`)
  known(t1, t2) {
    var _a3;
    return (_a3 = this.rels.get(t1.name)) == null ? void 0 : _a3.get(t2.name);
  }
  addNegative(t1, t2) {
    this.addNames(t1.name, t2.name, false);
  }
  add(t1, t2) {
    this.addNames(t1.name, t2.name, true);
  }
  display() {
    let result = "";
    for (const [t1, v2] of this.rels) {
      for (const [t2, known] of v2) {
        const subty = known ? ":<" : "!<:";
        result += `${t1} ${subty} ${t2}
`;
      }
    }
    return result;
  }
  addNames(t1, t2, isSubtype) {
    const t1Map = this.rels.get(t1);
    if (t1Map == void 0) {
      const newMap = /* @__PURE__ */ new Map();
      newMap.set(t2, isSubtype);
      this.rels.set(t1, newMap);
    } else {
      t1Map.set(t2, isSubtype);
    }
  }
}
let subtypeCache = new Relations();
function resetSubtypeCache() {
  subtypeCache = new Relations();
}
function eqFunctionAnnotations(t1, t2) {
  const t1Annotations = new Set(t1.annotations);
  const t2Annotations = new Set(t2.annotations);
  if (t1Annotations.size !== t2Annotations.size) {
    return false;
  }
  for (const a2 of t1Annotations) {
    if (!t2Annotations.has(a2))
      return false;
  }
  return true;
}
function canBeOmmitted(t2) {
  return t2 instanceof OptClass || t2 instanceof NullClass || t2 instanceof ReservedClass;
}
function subtype(t1, t2) {
  const relations = subtypeCache.copy();
  const isSubtype = subtype_(relations, t1, t2);
  if (isSubtype) {
    subtypeCache.add(t1, t2);
  } else {
    subtypeCache.addNegative(t1, t2);
  }
  return isSubtype;
}
function subtype_(relations, t1, t2) {
  if (t1.name === t2.name)
    return true;
  const known = relations.known(t1, t2);
  if (known !== void 0)
    return known;
  relations.add(t1, t2);
  if (t2 instanceof ReservedClass)
    return true;
  if (t1 instanceof EmptyClass)
    return true;
  if (t1 instanceof NatClass && t2 instanceof IntClass)
    return true;
  if (t1 instanceof VecClass && t2 instanceof VecClass)
    return subtype_(relations, t1._type, t2._type);
  if (t2 instanceof OptClass)
    return true;
  if (t1 instanceof RecordClass && t2 instanceof RecordClass) {
    const t1Object = t1.fieldsAsObject;
    for (const [label, ty2] of t2._fields) {
      const ty1 = t1Object[idlLabelToId(label)];
      if (!ty1) {
        if (!canBeOmmitted(ty2))
          return false;
      } else {
        if (!subtype_(relations, ty1, ty2))
          return false;
      }
    }
    return true;
  }
  if (t1 instanceof FuncClass && t2 instanceof FuncClass) {
    if (!eqFunctionAnnotations(t1, t2))
      return false;
    for (let i = 0; i < t1.argTypes.length; i++) {
      const argTy1 = t1.argTypes[i];
      if (i < t2.argTypes.length) {
        if (!subtype_(relations, t2.argTypes[i], argTy1))
          return false;
      } else {
        if (!canBeOmmitted(argTy1))
          return false;
      }
    }
    for (let i = 0; i < t2.retTypes.length; i++) {
      const retTy2 = t2.retTypes[i];
      if (i < t1.retTypes.length) {
        if (!subtype_(relations, t1.retTypes[i], retTy2))
          return false;
      } else {
        if (!canBeOmmitted(retTy2))
          return false;
      }
    }
    return true;
  }
  if (t1 instanceof VariantClass && t2 instanceof VariantClass) {
    const t2Object = t2.alternativesAsObject;
    for (const [label, ty1] of t1._fields) {
      const ty2 = t2Object[idlLabelToId(label)];
      if (!ty2)
        return false;
      if (!subtype_(relations, ty1, ty2))
        return false;
    }
    return true;
  }
  if (t1 instanceof ServiceClass && t2 instanceof ServiceClass) {
    const t1Object = t1.fieldsAsObject();
    for (const [name, ty2] of t2._fields) {
      const ty1 = t1Object[name];
      if (!ty1)
        return false;
      if (!subtype_(relations, ty1, ty2))
        return false;
    }
    return true;
  }
  if (t1 instanceof RecClass) {
    return subtype_(relations, t1.getType(), t2);
  }
  if (t2 instanceof RecClass) {
    return subtype_(relations, t1, t2.getType());
  }
  return false;
}
const IDL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Bool,
  BoolClass,
  ConstructType,
  Empty,
  EmptyClass,
  FixedIntClass,
  FixedNatClass,
  Float32,
  Float64,
  FloatClass,
  Func,
  FuncClass,
  Int,
  Int16,
  Int32,
  Int64,
  Int8,
  IntClass,
  Nat,
  Nat16,
  Nat32,
  Nat64,
  Nat8,
  NatClass,
  Null,
  NullClass,
  Opt,
  OptClass,
  PrimitiveType,
  Principal: Principal2,
  PrincipalClass,
  Rec,
  RecClass,
  Record,
  RecordClass,
  Reserved,
  ReservedClass,
  Service,
  ServiceClass,
  Text,
  TextClass,
  Tuple,
  TupleClass,
  Type,
  Unknown,
  UnknownClass,
  Variant,
  VariantClass,
  Vec,
  VecClass,
  Visitor,
  decode: decode$1,
  encode: encode$1,
  resetSubtypeCache,
  subtype
}, Symbol.toStringTag, { value: "Module" }));
function uint8FromBufLike(bufLike) {
  if (!bufLike) {
    throw new Error("Input cannot be null or undefined");
  }
  if (bufLike instanceof Uint8Array) {
    return bufLike;
  }
  if (bufLike instanceof ArrayBuffer) {
    return new Uint8Array(bufLike);
  }
  if (Array.isArray(bufLike)) {
    return new Uint8Array(bufLike);
  }
  if ("buffer" in bufLike) {
    return uint8FromBufLike(bufLike.buffer);
  }
  return new Uint8Array(bufLike);
}
function uint8Equals(a2, b2) {
  if (a2.length !== b2.length)
    return false;
  for (let i = 0; i < a2.length; i++) {
    if (a2[i] !== b2[i])
      return false;
  }
  return true;
}
function hashValue(value) {
  if (typeof value === "string") {
    return hashString(value);
  } else if (typeof value === "number") {
    return sha256(lebEncode(value));
  } else if (value instanceof Uint8Array || ArrayBuffer.isView(value)) {
    return sha256(uint8FromBufLike(value));
  } else if (Array.isArray(value)) {
    const vals = value.map(hashValue);
    return sha256(concatBytes(...vals));
  } else if (value && typeof value === "object" && value._isPrincipal) {
    return sha256(value.toUint8Array());
  } else if (typeof value === "object" && value !== null && typeof value.toHash === "function") {
    return hashValue(value.toHash());
  } else if (typeof value === "object") {
    return hashOfMap(value);
  } else if (typeof value === "bigint") {
    return sha256(lebEncode(value));
  }
  throw InputError.fromCode(new HashValueErrorCode(value));
}
const hashString = (value) => {
  const encoded = new TextEncoder().encode(value);
  return sha256(encoded);
};
function requestIdOf(request2) {
  return hashOfMap(request2);
}
function hashOfMap(map) {
  const hashed = Object.entries(map).filter(([, value]) => value !== void 0).map(([key, value]) => {
    const hashedKey = hashString(key);
    const hashedValue = hashValue(value);
    return [hashedKey, hashedValue];
  });
  const traversed = hashed;
  const sorted = traversed.sort(([k1], [k2]) => {
    return compare(k1, k2);
  });
  const concatenated = concatBytes(...sorted.map((x2) => concatBytes(...x2)));
  const result = sha256(concatenated);
  return result;
}
const IC_REQUEST_DOMAIN_SEPARATOR = new TextEncoder().encode("\nic-request");
const IC_RESPONSE_DOMAIN_SEPARATOR = new TextEncoder().encode("\vic-response");
const IC_REQUEST_AUTH_DELEGATION_DOMAIN_SEPARATOR = new TextEncoder().encode("ic-request-auth-delegation");
class SignIdentity {
  /**
   * Get the principal represented by this identity. Normally should be a
   * `Principal.selfAuthenticating()`.
   */
  getPrincipal() {
    if (!this._principal) {
      this._principal = Principal$1.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
    }
    return this._principal;
  }
  /**
   * Transform a request into a signed version of the request. This is done last
   * after the transforms on the body of a request. The returned object can be
   * anything, but must be serializable to CBOR.
   * @param request - internet computer request to transform
   */
  async transformRequest(request2) {
    const { body, ...fields } = request2;
    const requestId = requestIdOf(body);
    return {
      ...fields,
      body: {
        content: body,
        sender_pubkey: this.getPublicKey().toDer(),
        sender_sig: await this.sign(concatBytes(IC_REQUEST_DOMAIN_SEPARATOR, requestId))
      }
    };
  }
}
class AnonymousIdentity {
  getPrincipal() {
    return Principal$1.anonymous();
  }
  async transformRequest(request2) {
    return {
      ...request2,
      body: { content: request2.body }
    };
  }
}
class w extends Error {
  constructor(n) {
    super(n), this.name = "DecodingError";
  }
}
const m = 55799, L$1 = Symbol("CBOR_STOP_CODE");
var g = /* @__PURE__ */ ((t2) => (t2[t2.False = 20] = "False", t2[t2.True = 21] = "True", t2[t2.Null = 22] = "Null", t2[t2.Undefined = 23] = "Undefined", t2[t2.Break = 31] = "Break", t2))(g || {}), c = /* @__PURE__ */ ((t2) => (t2[t2.UnsignedInteger = 0] = "UnsignedInteger", t2[t2.NegativeInteger = 1] = "NegativeInteger", t2[t2.ByteString = 2] = "ByteString", t2[t2.TextString = 3] = "TextString", t2[t2.Array = 4] = "Array", t2[t2.Map = 5] = "Map", t2[t2.Tag = 6] = "Tag", t2[t2.Simple = 7] = "Simple", t2))(c || {});
const z = 23, Y = 255, G = 65535, P = 4294967295, H = BigInt("0xffffffffffffffff");
var d = /* @__PURE__ */ ((t2) => (t2[t2.Value = 23] = "Value", t2[t2.OneByte = 24] = "OneByte", t2[t2.TwoBytes = 25] = "TwoBytes", t2[t2.FourBytes = 26] = "FourBytes", t2[t2.EightBytes = 27] = "EightBytes", t2[t2.Indefinite = 31] = "Indefinite", t2))(d || {});
const h = false;
function W(t2) {
  return t2 == null;
}
function R(t2, n) {
  const e = new Uint8Array(n);
  return e.set(t2), e;
}
const K = new TextDecoder();
function Z(t2) {
  return (t2 & 224) >> 5;
}
function q(t2) {
  return t2 & 31;
}
let A = new Uint8Array(), y, a = 0;
function ut(t2, n) {
  A = t2, a = 0;
  const e = B();
  return (n == null ? void 0 : n(e)) ?? e;
}
function B(t2) {
  const [n, e] = N();
  switch (n) {
    case c.UnsignedInteger:
      return E(e);
    case c.NegativeInteger:
      return j(e);
    case c.ByteString:
      return $(e);
    case c.TextString:
      return F(e);
    case c.Array:
      return J(e);
    case c.Map:
      return b(e);
    case c.Tag:
      return M(e);
    case c.Simple:
      return Q(e);
  }
  throw new w(`Unsupported major type: ${n}`);
}
function N() {
  const t2 = A.at(a);
  if (W(t2))
    throw new w("Provided CBOR data is empty");
  const n = Z(t2), e = q(t2);
  return a++, [n, e];
}
function J(t2, n) {
  const e = E(t2);
  if (e === 1 / 0) {
    const u = [];
    let f = B();
    for (; f !== L$1; )
      u.push(f), f = B();
    return u;
  }
  const i = new Array(e);
  for (let u = 0; u < e; u++) {
    const f = B();
    i[u] = f;
  }
  return i;
}
function Q(t2) {
  switch (t2) {
    case g.False:
      return false;
    case g.True:
      return true;
    case g.Null:
      return null;
    case g.Undefined:
      return;
    case g.Break:
      return L$1;
  }
  throw new w(`Unrecognized simple type: ${t2.toString(2)}`);
}
function b(t2, n) {
  const e = E(t2), i = {};
  if (e === 1 / 0) {
    let [u, f] = N();
    for (; u !== c.Simple && f !== g.Break; ) {
      const l = F(f), U = B();
      i[l] = U, [u, f] = N();
    }
    return i;
  }
  for (let u = 0; u < e; u++) {
    const [f, l] = N();
    if (f !== c.TextString)
      throw new w("Map keys must be text strings");
    const U = F(l), D = B();
    i[U] = D;
  }
  return i;
}
function E(t2) {
  if (t2 <= d.Value)
    return t2;
  switch (y = new DataView(A.buffer, A.byteOffset + a), t2) {
    case d.OneByte:
      return a++, y.getUint8(0);
    case d.TwoBytes:
      return a += 2, y.getUint16(0, h);
    case d.FourBytes:
      return a += 4, y.getUint32(0, h);
    case d.EightBytes:
      return a += 8, y.getBigUint64(0, h);
    case d.Indefinite:
      return 1 / 0;
    default:
      throw new w(`Unsupported integer info: ${t2.toString(2)}`);
  }
}
function j(t2) {
  const n = E(t2);
  return typeof n == "number" ? -1 - n : -1n - n;
}
function $(t2) {
  const n = E(t2);
  if (n > Number.MAX_SAFE_INTEGER)
    throw new w("Byte length is too large");
  const e = Number(n);
  return a += e, A.slice(a - e, a);
}
function F(t2) {
  const n = $(t2);
  return K.decode(n);
}
function M(t2, n) {
  const e = E(t2);
  if (e === m)
    return B();
  throw new w(`Unsupported tag: ${e}.`);
}
class x extends Error {
  constructor(n) {
    super(n), this.name = "SerializationError";
  }
}
const p = 2 * 1024, C = 100, v = new TextEncoder();
function S(t2) {
  return t2 << 5;
}
let o = new Uint8Array(p), r = new DataView(o.buffer), s = 0, O = [];
function dt(t2, n) {
  s = 0;
  const e = (n == null ? void 0 : n(t2)) ?? t2;
  return it(m, e, n), o.slice(0, s);
}
function _(t2, n) {
  if (s > o.length - C && (o = R(o, o.length * 2), r = new DataView(o.buffer)), t2 === false || t2 === true || t2 === null || t2 === void 0) {
    et(t2);
    return;
  }
  if (typeof t2 == "number" || typeof t2 == "bigint") {
    ft(t2);
    return;
  }
  if (typeof t2 == "string") {
    X(t2);
    return;
  }
  if (t2 instanceof Uint8Array) {
    V(t2);
    return;
  }
  if (t2 instanceof ArrayBuffer) {
    V(new Uint8Array(t2));
    return;
  }
  if (Array.isArray(t2)) {
    tt(t2, n);
    return;
  }
  if (typeof t2 == "object") {
    nt(t2, n);
    return;
  }
  throw new x(`Unsupported type: ${typeof t2}`);
}
function tt(t2, n) {
  I(c.Array, t2.length), t2.forEach((e, i) => {
    _((n == null ? void 0 : n(e, i.toString())) ?? e, n);
  });
}
function nt(t2, n) {
  O = Object.entries(t2), I(c.Map, O.length), O.forEach(([e, i]) => {
    X(e), _((n == null ? void 0 : n(i, e)) ?? i, n);
  });
}
function I(t2, n) {
  if (n <= z) {
    r.setUint8(
      s++,
      S(t2) | Number(n)
    );
    return;
  }
  if (n <= Y) {
    r.setUint8(
      s++,
      S(t2) | d.OneByte
    ), r.setUint8(s, Number(n)), s += 1;
    return;
  }
  if (n <= G) {
    r.setUint8(
      s++,
      S(t2) | d.TwoBytes
    ), r.setUint16(s, Number(n), h), s += 2;
    return;
  }
  if (n <= P) {
    r.setUint8(
      s++,
      S(t2) | d.FourBytes
    ), r.setUint32(s, Number(n), h), s += 4;
    return;
  }
  if (n <= H) {
    r.setUint8(
      s++,
      S(t2) | d.EightBytes
    ), r.setBigUint64(s, BigInt(n), h), s += 8;
    return;
  }
  throw new x(`Value too large to encode: ${n}`);
}
function et(t2) {
  I(c.Simple, st(t2));
}
function st(t2) {
  if (t2 === false)
    return g.False;
  if (t2 === true)
    return g.True;
  if (t2 === null)
    return g.Null;
  if (t2 === void 0)
    return g.Undefined;
  throw new x(`Unrecognized simple value: ${t2.toString()}`);
}
function k(t2, n) {
  I(t2, n.length), s > o.length - n.length && (o = R(o, o.length + n.length), r = new DataView(o.buffer)), o.set(n, s), s += n.length;
}
function T(t2, n) {
  I(t2, n);
}
function ct(t2) {
  T(c.UnsignedInteger, t2);
}
function ot(t2) {
  T(
    c.NegativeInteger,
    typeof t2 == "bigint" ? -1n - t2 : -1 - t2
  );
}
function ft(t2) {
  t2 >= 0 ? ct(t2) : ot(t2);
}
function X(t2) {
  k(c.TextString, v.encode(t2));
}
function V(t2) {
  k(c.ByteString, t2);
}
function it(t2, n, e) {
  I(c.Tag, t2), _(n, e);
}
function hasCborValueMethod(value) {
  return typeof value === "object" && value !== null && "toCborValue" in value;
}
function encode(value) {
  try {
    return dt(value, (value2) => {
      if (Principal$1.isPrincipal(value2)) {
        return value2.toUint8Array();
      }
      if (Expiry.isExpiry(value2)) {
        return value2.toBigInt();
      }
      if (hasCborValueMethod(value2)) {
        return value2.toCborValue();
      }
      return value2;
    });
  } catch (error) {
    throw InputError.fromCode(new CborEncodeErrorCode(error, value));
  }
}
function decode(input) {
  try {
    return ut(input);
  } catch (error) {
    throw InputError.fromCode(new CborDecodeErrorCode(error, input));
  }
}
const randomNumber = () => {
  if (typeof window !== "undefined" && !!window.crypto && !!window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.randomInt) {
    return crypto.randomInt(0, 4294967295);
  }
  return Math.floor(Math.random() * 4294967295);
};
var Endpoint;
(function(Endpoint2) {
  Endpoint2["Query"] = "read";
  Endpoint2["ReadState"] = "read_state";
  Endpoint2["Call"] = "call";
})(Endpoint || (Endpoint = {}));
var SubmitRequestType;
(function(SubmitRequestType2) {
  SubmitRequestType2["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
var ReadRequestType;
(function(ReadRequestType2) {
  ReadRequestType2["Query"] = "query";
  ReadRequestType2["ReadState"] = "read_state";
})(ReadRequestType || (ReadRequestType = {}));
function makeNonce() {
  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);
  const rand1 = randomNumber();
  const rand2 = randomNumber();
  const rand3 = randomNumber();
  const rand4 = randomNumber();
  view.setUint32(0, rand1);
  view.setUint32(4, rand2);
  view.setUint32(8, rand3);
  view.setUint32(12, rand4);
  return Object.assign(new Uint8Array(buffer), { __nonce__: void 0 });
}
const JSON_KEY_EXPIRY = "__expiry__";
const SECONDS_TO_MILLISECONDS = BigInt(1e3);
const MILLISECONDS_TO_NANOSECONDS = BigInt(1e6);
const MINUTES_TO_SECONDS = BigInt(60);
const EXPIRY_DELTA_THRESHOLD_MILLISECONDS = BigInt(90) * SECONDS_TO_MILLISECONDS;
function roundMillisToSeconds(millis) {
  return millis / SECONDS_TO_MILLISECONDS;
}
function roundMillisToMinutes(millis) {
  return roundMillisToSeconds(millis) / MINUTES_TO_SECONDS;
}
class Expiry {
  constructor(__expiry__) {
    this.__expiry__ = __expiry__;
    this._isExpiry = true;
  }
  /**
   * Creates an Expiry object from a delta in milliseconds.
   * If the delta is less than 90 seconds, the expiry is rounded down to the nearest second.
   * Otherwise, the expiry is rounded down to the nearest minute.
   * @param deltaInMs The milliseconds to add to the current time.
   * @param clockDriftMs The milliseconds to add to the current time, typically the clock drift between IC network clock and the client's clock. Defaults to `0` if not provided.
   * @returns {Expiry} The constructed Expiry object.
   */
  static fromDeltaInMilliseconds(deltaInMs, clockDriftMs = 0) {
    const deltaMs = BigInt(deltaInMs);
    const expiryMs = BigInt(Date.now()) + deltaMs + BigInt(clockDriftMs);
    let roundedExpirySeconds;
    if (deltaMs < EXPIRY_DELTA_THRESHOLD_MILLISECONDS) {
      roundedExpirySeconds = roundMillisToSeconds(expiryMs);
    } else {
      const roundedExpiryMinutes = roundMillisToMinutes(expiryMs);
      roundedExpirySeconds = roundedExpiryMinutes * MINUTES_TO_SECONDS;
    }
    return new Expiry(roundedExpirySeconds * SECONDS_TO_MILLISECONDS * MILLISECONDS_TO_NANOSECONDS);
  }
  toBigInt() {
    return this.__expiry__;
  }
  toHash() {
    return lebEncode(this.__expiry__);
  }
  toString() {
    return this.__expiry__.toString();
  }
  /**
   * Serializes to JSON
   * @returns {JsonnableExpiry} a JSON object with a single key, {@link JSON_KEY_EXPIRY}, whose value is the expiry as a string
   */
  toJSON() {
    return { [JSON_KEY_EXPIRY]: this.toString() };
  }
  /**
   * Deserializes a {@link JsonnableExpiry} object from a JSON string.
   * @param input The JSON string to deserialize.
   * @returns {Expiry} The deserialized Expiry object.
   */
  static fromJSON(input) {
    const obj = JSON.parse(input);
    if (obj[JSON_KEY_EXPIRY]) {
      try {
        const expiry = BigInt(obj[JSON_KEY_EXPIRY]);
        return new Expiry(expiry);
      } catch (error) {
        throw new InputError(new ExpiryJsonDeserializeErrorCode(`Not a valid BigInt: ${error}`));
      }
    }
    throw new InputError(new ExpiryJsonDeserializeErrorCode(`The input does not contain the key ${JSON_KEY_EXPIRY}`));
  }
  static isExpiry(other) {
    return other instanceof Expiry || typeof other === "object" && other !== null && "_isExpiry" in other && other["_isExpiry"] === true && "__expiry__" in other && typeof other["__expiry__"] === "bigint";
  }
}
function makeNonceTransform(nonceFn = makeNonce) {
  return async (request2) => {
    const headers = request2.request.headers;
    request2.request.headers = headers;
    if (request2.endpoint === Endpoint.Call) {
      request2.body.nonce = nonceFn();
    }
  };
}
function httpHeadersTransform(headers) {
  const headerFields = [];
  headers.forEach((value, key) => {
    headerFields.push([key, value]);
  });
  return headerFields;
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$7 = /* @__PURE__ */ BigInt(0);
const _1n$8 = /* @__PURE__ */ BigInt(1);
function _abool2(value, title = "") {
  if (typeof value !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value);
  }
  return value;
}
function _abytes2(value, length, title = "") {
  const bytes = isBytes(value);
  const len = value == null ? void 0 : value.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$7 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
const isPosBig = (n) => typeof n === "bigint" && _0n$7 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$7; n >>= _1n$8, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n$8;
}
const bitMask = (n) => (_1n$8 << BigInt(n)) - _1n$8;
function isHash(val) {
  return typeof val === "function" && Number.isSafeInteger(val.outputLen);
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k2, v2]) => checkField(k2, v2, false));
  Object.entries(optFields).forEach(([k2, v2]) => checkField(k2, v2, true));
}
const notImplemented = () => {
  throw new Error("not implemented");
};
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$6 = BigInt(0), _1n$7 = BigInt(1), _2n$6 = /* @__PURE__ */ BigInt(2), _3n$4 = /* @__PURE__ */ BigInt(3);
const _4n$2 = /* @__PURE__ */ BigInt(4), _5n$1 = /* @__PURE__ */ BigInt(5), _7n = /* @__PURE__ */ BigInt(7);
const _8n$2 = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9), _16n = /* @__PURE__ */ BigInt(16);
function mod(a2, b2) {
  const result = a2 % b2;
  return result >= _0n$6 ? result : b2 + result;
}
function pow2(x2, power, modulo) {
  let res = x2;
  while (power-- > _0n$6) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n$6)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$6)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a2 = mod(number, modulo);
  let b2 = modulo;
  let x2 = _0n$6, u = _1n$7;
  while (a2 !== _0n$6) {
    const q2 = b2 / a2;
    const r2 = b2 % a2;
    const m2 = x2 - u * q2;
    b2 = a2, a2 = r2, x2 = u, u = m2;
  }
  const gcd = b2;
  if (gcd !== _1n$7)
    throw new Error("invert: does not exist");
  return mod(x2, modulo);
}
function assertIsSquare(Fp3, root, n) {
  if (!Fp3.eql(Fp3.sqr(root), n))
    throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp3, n) {
  const p1div4 = (Fp3.ORDER + _1n$7) / _4n$2;
  const root = Fp3.pow(n, p1div4);
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt5mod8(Fp3, n) {
  const p5div8 = (Fp3.ORDER - _5n$1) / _8n$2;
  const n2 = Fp3.mul(n, _2n$6);
  const v2 = Fp3.pow(n2, p5div8);
  const nv = Fp3.mul(n, v2);
  const i = Fp3.mul(Fp3.mul(nv, _2n$6), v2);
  const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt9mod16(P2) {
  const Fp_ = Field(P2);
  const tn = tonelliShanks(P2);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P2 + _7n) / _16n;
  return (Fp3, n) => {
    let tv1 = Fp3.pow(n, c4);
    let tv2 = Fp3.mul(tv1, c1);
    const tv3 = Fp3.mul(tv1, c2);
    const tv4 = Fp3.mul(tv1, c3);
    const e1 = Fp3.eql(Fp3.sqr(tv2), n);
    const e2 = Fp3.eql(Fp3.sqr(tv3), n);
    tv1 = Fp3.cmov(tv1, tv2, e1);
    tv2 = Fp3.cmov(tv4, tv3, e2);
    const e3 = Fp3.eql(Fp3.sqr(tv2), n);
    const root = Fp3.cmov(tv1, tv2, e3);
    assertIsSquare(Fp3, root, n);
    return root;
  };
}
function tonelliShanks(P2) {
  if (P2 < _3n$4)
    throw new Error("sqrt is not defined for small field");
  let Q2 = P2 - _1n$7;
  let S2 = 0;
  while (Q2 % _2n$6 === _0n$6) {
    Q2 /= _2n$6;
    S2++;
  }
  let Z2 = _2n$6;
  const _Fp = Field(P2);
  while (FpLegendre(_Fp, Z2) === 1) {
    if (Z2++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S2 === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z2, Q2);
  const Q1div2 = (Q2 + _1n$7) / _2n$6;
  return function tonelliSlow(Fp3, n) {
    if (Fp3.is0(n))
      return n;
    if (FpLegendre(Fp3, n) !== 1)
      throw new Error("Cannot find square root");
    let M2 = S2;
    let c2 = Fp3.mul(Fp3.ONE, cc);
    let t2 = Fp3.pow(n, Q2);
    let R2 = Fp3.pow(n, Q1div2);
    while (!Fp3.eql(t2, Fp3.ONE)) {
      if (Fp3.is0(t2))
        return Fp3.ZERO;
      let i = 1;
      let t_tmp = Fp3.sqr(t2);
      while (!Fp3.eql(t_tmp, Fp3.ONE)) {
        i++;
        t_tmp = Fp3.sqr(t_tmp);
        if (i === M2)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$7 << BigInt(M2 - i - 1);
      const b2 = Fp3.pow(c2, exponent);
      M2 = i;
      c2 = Fp3.sqr(b2);
      t2 = Fp3.mul(t2, c2);
      R2 = Fp3.mul(R2, b2);
    }
    return R2;
  };
}
function FpSqrt(P2) {
  if (P2 % _4n$2 === _3n$4)
    return sqrt3mod4;
  if (P2 % _8n$2 === _5n$1)
    return sqrt5mod8;
  if (P2 % _16n === _9n)
    return sqrt9mod16(P2);
  return tonelliShanks(P2);
}
const isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n$7) === _1n$7;
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow(Fp3, num, power) {
  if (power < _0n$6)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$6)
    return Fp3.ONE;
  if (power === _1n$7)
    return num;
  let p2 = Fp3.ONE;
  let d2 = num;
  while (power > _0n$6) {
    if (power & _1n$7)
      p2 = Fp3.mul(p2, d2);
    d2 = Fp3.sqr(d2);
    power >>= _1n$7;
  }
  return p2;
}
function FpInvertBatch(Fp3, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp3.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp3.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp3.mul(acc, num);
  }, Fp3.ONE);
  const invertedAcc = Fp3.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp3.is0(num))
      return acc;
    inverted[i] = Fp3.mul(acc, inverted[i]);
    return Fp3.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp3, n) {
  const p1mod2 = (Fp3.ORDER - _1n$7) / _2n$6;
  const powered = Fp3.pow(n, p1mod2);
  const yes = Fp3.eql(powered, Fp3.ONE);
  const zero = Fp3.eql(powered, Fp3.ZERO);
  const no = Fp3.eql(powered, Fp3.neg(Fp3.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLenOrOpts, isLE = false, opts = {}) {
  if (ORDER <= _0n$6)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean")
      modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n$6,
    ONE: _1n$7,
    allowedLengths,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$6 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$6,
    // is valid and invertible
    isValidNot0: (num) => !f.is0(num) && f.isValid(num),
    isOdd: (num) => (num & _1n$7) === _1n$7,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: _sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      if (modFromBytes)
        scalar = mod(scalar, ORDER);
      if (!skipValidation) {
        if (!f.isValid(scalar))
          throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a2, b2, c2) => c2 ? b2 : a2
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n$7) + _1n$7;
  return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$5 = BigInt(0);
const _1n$6 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c2, points) {
  const invertedZs = FpInvertBatch(c2.Fp, points.map((p2) => p2.Z));
  return points.map((p2, i) => c2.fromAffine(p2.toAffine(invertedZs[i])));
}
function validateW(W2, bits) {
  if (!Number.isSafeInteger(W2) || W2 <= 0 || W2 > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W2);
}
function calcWOpts(W2, scalarBits) {
  validateW(W2, scalarBits);
  const windows = Math.ceil(scalarBits / W2) + 1;
  const windowSize = 2 ** (W2 - 1);
  const maxNumber = 2 ** W2;
  const mask = bitMask(W2);
  const shiftBy = BigInt(W2);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$6;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c2) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p2, i) => {
    if (!(p2 instanceof c2))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s2, i) => {
    if (!field.isValid(s2))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P2) {
  return pointWindowSizes.get(P2) || 1;
}
function assert0(n) {
  if (n !== _0n$5)
    throw new Error("invalid wNAF");
}
class wNAF {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n, p2 = this.ZERO) {
    let d2 = elm;
    while (n > _0n$5) {
      if (n & _1n$6)
        p2 = p2.add(d2);
      d2 = d2.double();
      n >>= _1n$6;
    }
    return p2;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W2) {
    const { windows, windowSize } = calcWOpts(W2, this.bits);
    const points = [];
    let p2 = point;
    let base = p2;
    for (let window2 = 0; window2 < windows; window2++) {
      base = p2;
      points.push(base);
      for (let i = 1; i < windowSize; i++) {
        base = base.add(p2);
        points.push(base);
      }
      p2 = base.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W2, precomputes, n) {
    if (!this.Fn.isValid(n))
      throw new Error("invalid scalar");
    let p2 = this.ZERO;
    let f = this.BASE;
    const wo = calcWOpts(W2, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        f = f.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p2 = p2.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n);
    return { p: p2, f };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W2, precomputes, n, acc = this.ZERO) {
    const wo = calcWOpts(W2, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      if (n === _0n$5)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n);
    return acc;
  }
  getPrecomputes(W2, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W2);
      if (W2 !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W2 = getW(point);
    return this.wNAF(W2, this.getPrecomputes(W2, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W2 = getW(point);
    if (W2 === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W2, this.getPrecomputes(W2, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P2, W2) {
    validateW(W2, this.bits);
    pointWindowSizes.set(P2, W2);
    pointPrecomputes.delete(P2);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
}
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n$5 || k2 > _0n$5) {
    if (k1 & _1n$6)
      p1 = p1.add(acc);
    if (k2 & _1n$6)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n$6;
    k2 >>= _1n$6;
  }
  return { p1, p2 };
}
function pippenger(c2, fieldN, points, scalars) {
  validateMSMPoints(points, c2);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c2.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j2 = 0; j2 < slength; j2++) {
      const scalar = scalars[j2];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j2]);
    }
    let resI = zero;
    for (let j2 = buckets.length - 1, sumI = zero; j2 > 0; j2--) {
      sumI = sumI.add(buckets[j2]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j2 = 0; j2 < windowSize; j2++)
        sum = sum.double();
  }
  return sum;
}
function createField(order, field, isLE) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order, { isLE });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p2 of ["p", "n", "h"]) {
    const val = CURVE[p2];
    if (!(typeof val === "bigint" && val > _0n$5))
      throw new Error(`CURVE.${p2} must be positive bigint`);
  }
  const Fp3 = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b2 = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b2];
  for (const p2 of params) {
    if (!Fp3.isValid(CURVE[p2]))
      throw new Error(`CURVE.${p2} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp3, Fn };
}
const os2ip = bytesToNumberBE;
function i2osp(value, length) {
  anum(value);
  anum(length);
  if (value < 0 || value >= 1 << 8 * length)
    throw new Error("invalid I2OSP input: " + value);
  const res = Array.from({ length }).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    res[i] = value & 255;
    value >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a2, b2) {
  const arr = new Uint8Array(a2.length);
  for (let i = 0; i < a2.length; i++) {
    arr[i] = a2[i] ^ b2[i];
  }
  return arr;
}
function anum(item) {
  if (!Number.isSafeInteger(item))
    throw new Error("number expected");
}
function normDST(DST) {
  if (!isBytes(DST) && typeof DST !== "string")
    throw new Error("DST must be Uint8Array or string");
  return typeof DST === "string" ? utf8ToBytes(DST) : DST;
}
function expand_message_xmd(msg, DST, lenInBytes, H2) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255)
    DST = H2(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H2;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (lenInBytes > 65535 || ell > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b2 = new Array(ell);
  const b_0 = H2(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b2[0] = H2(concatBytes(b_0, i2osp(1, 1), DST_prime));
  for (let i = 1; i <= ell; i++) {
    const args = [strxor(b_0, b2[i - 1]), i2osp(i + 1, 1), DST_prime];
    b2[i] = H2(concatBytes(...args));
  }
  const pseudo_random_bytes = concatBytes(...b2);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k2, H2) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k2 / 8);
    DST = H2.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H2.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  _validateObject(options, {
    p: "bigint",
    m: "number",
    k: "number",
    hash: "function"
  });
  const { p: p2, k: k2, m: m2, hash, expand, DST } = options;
  if (!isHash(options.hash))
    throw new Error("expected valid hash");
  abytes(msg);
  anum(count);
  const log2p = p2.toString(2).length;
  const L2 = Math.ceil((log2p + k2) / 8);
  const len_in_bytes = count * m2 * L2;
  let prb;
  if (expand === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
  } else if (expand === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k2, hash);
  } else if (expand === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u = new Array(count);
  for (let i = 0; i < count; i++) {
    const e = new Array(m2);
    for (let j2 = 0; j2 < m2; j2++) {
      const elm_offset = L2 * (j2 + i * m2);
      const tv = prb.subarray(elm_offset, elm_offset + L2);
      e[j2] = mod(os2ip(tv), p2);
    }
    u[i] = e;
  }
  return u;
}
function isogenyMap(field, map) {
  const coeff = map.map((i) => Array.from(i).reverse());
  return (x2, y2) => {
    const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x2), i)));
    const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
    x2 = field.mul(xn, xd_inv);
    y2 = field.mul(y2, field.mul(yn, yd_inv));
    return { x: x2, y: y2 };
  };
}
const _DST_scalar = utf8ToBytes("HashToScalar-");
function createHasher(Point, mapToCurve, defaults) {
  if (typeof mapToCurve !== "function")
    throw new Error("mapToCurve() must be defined");
  function map(num) {
    return Point.fromAffine(mapToCurve(num));
  }
  function clear(initial) {
    const P2 = initial.clearCofactor();
    if (P2.equals(Point.ZERO))
      return Point.ZERO;
    P2.assertValidity();
    return P2;
  }
  return {
    defaults,
    hashToCurve(msg, options) {
      const opts = Object.assign({}, defaults, options);
      const u = hash_to_field(msg, 2, opts);
      const u0 = map(u[0]);
      const u1 = map(u[1]);
      return clear(u0.add(u1));
    },
    encodeToCurve(msg, options) {
      const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
      const opts = Object.assign({}, defaults, optsDst, options);
      const u = hash_to_field(msg, 1, opts);
      const u0 = map(u[0]);
      return clear(u0);
    },
    /** See {@link H2CHasher} */
    mapToCurve(scalars) {
      if (!Array.isArray(scalars))
        throw new Error("expected array of bigints");
      for (const i of scalars)
        if (typeof i !== "bigint")
          throw new Error("expected array of bigints");
      return clear(map(scalars));
    },
    // hash_to_scalar can produce 0: https://www.rfc-editor.org/errata/eid8393
    // RFC 9380, draft-irtf-cfrg-bbs-signatures-08
    hashToScalar(msg, options) {
      const N2 = Point.Fn.ORDER;
      const opts = Object.assign({}, defaults, { p: N2, m: 1, DST: _DST_scalar }, options);
      return hash_to_field(msg, 1, opts)[0][0];
    }
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n$5) / den;
function _splitEndoScalar(k2, basis, n) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k2, n);
  const c2 = divNearest(-b1 * k2, n);
  let k1 = k2 - c1 * a1 - c2 * a2;
  let k22 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n$4;
  const k2neg = k22 < _0n$4;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k22 = -k22;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n$5;
  if (k1 < _0n$4 || k1 >= MAX_NUM || k22 < _0n$4 || k22 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k2);
  }
  return { k1neg, k1, k2neg, k2: k22 };
}
const _0n$4 = BigInt(0), _1n$5 = BigInt(1), _2n$5 = BigInt(2), _3n$3 = BigInt(3), _4n$1 = BigInt(4);
function _normFnElement(Fn, key) {
  const { BYTES: expected } = Fn;
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else {
    let bytes = ensureBytes("private key", key);
    try {
      num = Fn.fromBytes(bytes);
    } catch (error) {
      throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
    }
  }
  if (!Fn.isValidNot0(num))
    throw new Error("invalid private key: out of range [1..N-1]");
  return num;
}
function weierstrassN(params, extraOpts = {}) {
  const validated = _createCurveFields("weierstrass", params, extraOpts);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp3.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp3, Fn);
  function assertCompressionIsSupported() {
    if (!Fp3.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x: x2, y: y2 } = point.toAffine();
    const bx = Fp3.toBytes(x2);
    _abool2(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp3.isOdd(y2);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp3.toBytes(y2));
    }
  }
  function pointFromBytes(bytes) {
    _abytes2(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === comp && (head === 2 || head === 3)) {
      const x2 = Fp3.fromBytes(tail);
      if (!Fp3.isValid(x2))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x2);
      let y3;
      try {
        y3 = Fp3.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp3.isOdd(y3);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd)
        y3 = Fp3.neg(y3);
      return { x: x2, y: y3 };
    } else if (length === uncomp && head === 4) {
      const L2 = Fp3.BYTES;
      const x2 = Fp3.fromBytes(tail.subarray(0, L2));
      const y2 = Fp3.fromBytes(tail.subarray(L2, L2 * 2));
      if (!isValidXY(x2, y2))
        throw new Error("bad point: is not on curve");
      return { x: x2, y: y2 };
    } else {
      throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x2) {
    const x22 = Fp3.sqr(x2);
    const x3 = Fp3.mul(x22, x2);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x2, CURVE.a)), CURVE.b);
  }
  function isValidXY(x2, y2) {
    const left = Fp3.sqr(y2);
    const right = weierstrassEquation(x2);
    return Fp3.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp3.mul(Fp3.pow(CURVE.a, _3n$3), _4n$1);
  const _27b2 = Fp3.mul(Fp3.sqr(CURVE.b), BigInt(27));
  if (Fp3.is0(Fp3.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp3.isValid(n) || banZero && Fp3.is0(n))
      throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  function splitEndoScalarN(k2) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k2, endo.basises, Fn.ORDER);
  }
  const toAffineMemo = memoized((p2, iz) => {
    const { X: X2, Y: Y2, Z: Z2 } = p2;
    if (Fp3.eql(Z2, Fp3.ONE))
      return { x: X2, y: Y2 };
    const is0 = p2.is0();
    if (iz == null)
      iz = is0 ? Fp3.ONE : Fp3.inv(Z2);
    const x2 = Fp3.mul(X2, iz);
    const y2 = Fp3.mul(Y2, iz);
    const zz = Fp3.mul(Z2, iz);
    if (is0)
      return { x: Fp3.ZERO, y: Fp3.ZERO };
    if (!Fp3.eql(zz, Fp3.ONE))
      throw new Error("invZ was invalid");
    return { x: x2, y: y2 };
  });
  const assertValidMemo = memoized((p2) => {
    if (p2.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp3.is0(p2.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: x2, y: y2 } = p2.toAffine();
    if (!Fp3.isValid(x2) || !Fp3.isValid(y2))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x2, y2))
      throw new Error("bad point: equation left != right");
    if (!p2.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp3.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X2, Y2, Z2) {
      this.X = acoord("x", X2);
      this.Y = acoord("y", Y2, true);
      this.Z = acoord("z", Z2);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p2) {
      const { x: x2, y: y2 } = p2 || {};
      if (!p2 || !Fp3.isValid(x2) || !Fp3.isValid(y2))
        throw new Error("invalid affine point");
      if (p2 instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp3.is0(x2) && Fp3.is0(y2))
        return Point.ZERO;
      return new Point(x2, y2, Fp3.ONE);
    }
    static fromBytes(bytes) {
      const P2 = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
      P2.assertValidity();
      return P2;
    }
    static fromHex(hex) {
      return Point.fromBytes(ensureBytes("pointHex", hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n$3);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y: y2 } = this.toAffine();
      if (!Fp3.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp3.isOdd(y2);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp3.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a2, b: b2 } = CURVE;
      const b3 = Fp3.mul(b2, _3n$3);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a2, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a2, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a2, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a2 = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n$3);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a2, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a2, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a2, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n) => wnaf.cached(this, n, (p2) => normalizeZ(Point, p2));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p: p2, f } = mul(scalar);
        point = p2;
        fake = f;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p2 = this;
      if (!Fn.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n$4 || p2.is0())
        return Point.ZERO;
      if (sc === _1n$5)
        return p2;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2: p22 } = mulEndoUnsafe(Point, p2, k1, k2);
        return finishEndo(endo2.beta, p1, p22, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p2, sc);
      }
    }
    multiplyAndAddUnsafe(Q2, a2, b2) {
      const sum = this.multiplyUnsafe(a2).add(Q2.multiplyUnsafe(b2));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n$5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n$5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      _abool2(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(_normFnElement(Fn, privateKey));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp3.ONE);
  Point.ZERO = new Point(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
  Point.Fp = Fp3;
  Point.Fn = Fn;
  const bits = Fn.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function SWUFpSqrtRatio(Fp3, Z2) {
  const q2 = Fp3.ORDER;
  let l = _0n$4;
  for (let o2 = q2 - _1n$5; o2 % _2n$5 === _0n$4; o2 /= _2n$5)
    l += _1n$5;
  const c1 = l;
  const _2n_pow_c1_1 = _2n$5 << c1 - _1n$5 - _1n$5;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n$5;
  const c2 = (q2 - _1n$5) / _2n_pow_c1;
  const c3 = (c2 - _1n$5) / _2n$5;
  const c4 = _2n_pow_c1 - _1n$5;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp3.pow(Z2, c2);
  const c7 = Fp3.pow(Z2, (c2 + _1n$5) / _2n$5);
  let sqrtRatio = (u, v2) => {
    let tv1 = c6;
    let tv2 = Fp3.pow(v2, c4);
    let tv3 = Fp3.sqr(tv2);
    tv3 = Fp3.mul(tv3, v2);
    let tv5 = Fp3.mul(u, tv3);
    tv5 = Fp3.pow(tv5, c3);
    tv5 = Fp3.mul(tv5, tv2);
    tv2 = Fp3.mul(tv5, v2);
    tv3 = Fp3.mul(tv5, u);
    let tv4 = Fp3.mul(tv3, tv2);
    tv5 = Fp3.pow(tv4, c5);
    let isQR = Fp3.eql(tv5, Fp3.ONE);
    tv2 = Fp3.mul(tv3, c7);
    tv5 = Fp3.mul(tv4, tv1);
    tv3 = Fp3.cmov(tv2, tv3, isQR);
    tv4 = Fp3.cmov(tv5, tv4, isQR);
    for (let i = c1; i > _1n$5; i--) {
      let tv52 = i - _2n$5;
      tv52 = _2n$5 << tv52 - _1n$5;
      let tvv5 = Fp3.pow(tv4, tv52);
      const e1 = Fp3.eql(tvv5, Fp3.ONE);
      tv2 = Fp3.mul(tv3, tv1);
      tv1 = Fp3.mul(tv1, tv1);
      tvv5 = Fp3.mul(tv4, tv1);
      tv3 = Fp3.cmov(tv2, tv3, e1);
      tv4 = Fp3.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp3.ORDER % _4n$1 === _3n$3) {
    const c12 = (Fp3.ORDER - _3n$3) / _4n$1;
    const c22 = Fp3.sqrt(Fp3.neg(Z2));
    sqrtRatio = (u, v2) => {
      let tv1 = Fp3.sqr(v2);
      const tv2 = Fp3.mul(u, v2);
      tv1 = Fp3.mul(tv1, tv2);
      let y1 = Fp3.pow(tv1, c12);
      y1 = Fp3.mul(y1, tv2);
      const y2 = Fp3.mul(y1, c22);
      const tv3 = Fp3.mul(Fp3.sqr(y1), v2);
      const isQR = Fp3.eql(tv3, u);
      let y3 = Fp3.cmov(y2, y1, isQR);
      return { isValid: isQR, value: y3 };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp3, opts) {
  validateField(Fp3);
  const { A: A2, B: B2, Z: Z2 } = opts;
  if (!Fp3.isValid(A2) || !Fp3.isValid(B2) || !Fp3.isValid(Z2))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp3, Z2);
  if (!Fp3.isOdd)
    throw new Error("Field does not have .isOdd()");
  return (u) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x2, y2;
    tv1 = Fp3.sqr(u);
    tv1 = Fp3.mul(tv1, Z2);
    tv2 = Fp3.sqr(tv1);
    tv2 = Fp3.add(tv2, tv1);
    tv3 = Fp3.add(tv2, Fp3.ONE);
    tv3 = Fp3.mul(tv3, B2);
    tv4 = Fp3.cmov(Z2, Fp3.neg(tv2), !Fp3.eql(tv2, Fp3.ZERO));
    tv4 = Fp3.mul(tv4, A2);
    tv2 = Fp3.sqr(tv3);
    tv6 = Fp3.sqr(tv4);
    tv5 = Fp3.mul(tv6, A2);
    tv2 = Fp3.add(tv2, tv5);
    tv2 = Fp3.mul(tv2, tv3);
    tv6 = Fp3.mul(tv6, tv4);
    tv5 = Fp3.mul(tv6, B2);
    tv2 = Fp3.add(tv2, tv5);
    x2 = Fp3.mul(tv1, tv3);
    const { isValid, value } = sqrtRatio(tv2, tv6);
    y2 = Fp3.mul(tv1, u);
    y2 = Fp3.mul(y2, value);
    x2 = Fp3.cmov(x2, tv3, isValid);
    y2 = Fp3.cmov(y2, value, isValid);
    const e1 = Fp3.isOdd(u) === Fp3.isOdd(y2);
    y2 = Fp3.cmov(Fp3.neg(y2), y2, e1);
    const tv4_inv = FpInvertBatch(Fp3, [tv4], true)[0];
    x2 = Fp3.mul(x2, tv4_inv);
    return { x: x2, y: y2 };
  };
}
function getWLengths(Fp3, Fn) {
  return {
    secretKey: Fn.BYTES,
    publicKey: 1 + Fp3.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp3.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn.BYTES
  };
}
function weierstrassPoints(c2) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c2);
  const Point = weierstrassN(CURVE, curveOpts);
  return _weierstrass_new_output_to_legacy(c2, Point);
}
function _weierstrass_legacy_opts_to_new(c2) {
  const CURVE = {
    a: c2.a,
    b: c2.b,
    p: c2.Fp.ORDER,
    n: c2.n,
    h: c2.h,
    Gx: c2.Gx,
    Gy: c2.Gy
  };
  const Fp3 = c2.Fp;
  let allowedLengths = c2.allowedPrivateKeyLengths ? Array.from(new Set(c2.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
  const Fn = Field(CURVE.n, {
    BITS: c2.nBitLength,
    allowedLengths,
    modFromBytes: c2.wrapPrivateKey
  });
  const curveOpts = {
    Fp: Fp3,
    Fn,
    allowInfinityPoint: c2.allowInfinityPoint,
    endo: c2.endo,
    isTorsionFree: c2.isTorsionFree,
    clearCofactor: c2.clearCofactor,
    fromBytes: c2.fromBytes,
    toBytes: c2.toBytes
  };
  return { CURVE, curveOpts };
}
function _legacyHelperEquat(Fp3, a2, b2) {
  function weierstrassEquation(x2) {
    const x22 = Fp3.sqr(x2);
    const x3 = Fp3.mul(x22, x2);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x2, a2)), b2);
  }
  return weierstrassEquation;
}
function _weierstrass_new_output_to_legacy(c2, Point) {
  const { Fp: Fp3, Fn } = Point;
  function isWithinCurveOrder(num) {
    return inRange(num, _1n$5, Fn.ORDER);
  }
  const weierstrassEquation = _legacyHelperEquat(Fp3, c2.a, c2.b);
  return Object.assign({}, {
    CURVE: c2,
    Point,
    ProjectivePoint: Point,
    normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
    weierstrassEquation,
    isWithinCurveOrder
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = BigInt(0), _1n$4 = BigInt(1), _2n$4 = BigInt(2), _3n$2 = BigInt(3);
function NAfDecomposition(a2) {
  const res = [];
  for (; a2 > _1n$4; a2 >>= _1n$4) {
    if ((a2 & _1n$4) === _0n$3)
      res.unshift(0);
    else if ((a2 & _3n$2) === _3n$2) {
      res.unshift(-1);
      a2 += _1n$4;
    } else
      res.unshift(1);
  }
  return res;
}
function aNonEmpty(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("expected non-empty array");
}
function createBlsPairing(fields, G1, G2, params) {
  const { Fp2: Fp22, Fp12: Fp122 } = fields;
  const { twistType, ateLoopSize, xNegative, postPrecompute } = params;
  let lineFunction;
  if (twistType === "multiplicative") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul014(f, c0, Fp22.mul(c1, Px), Fp22.mul(c2, Py));
  } else if (twistType === "divisive") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul034(f, Fp22.mul(c2, Py), Fp22.mul(c1, Px), c0);
  } else
    throw new Error("bls: unknown twist type");
  const Fp2div2 = Fp22.div(Fp22.ONE, Fp22.mul(Fp22.ONE, _2n$4));
  function pointDouble(ell, Rx, Ry, Rz) {
    const t0 = Fp22.sqr(Ry);
    const t1 = Fp22.sqr(Rz);
    const t2 = Fp22.mulByB(Fp22.mul(t1, _3n$2));
    const t3 = Fp22.mul(t2, _3n$2);
    const t4 = Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(Ry, Rz)), t1), t0);
    const c0 = Fp22.sub(t2, t0);
    const c1 = Fp22.mul(Fp22.sqr(Rx), _3n$2);
    const c2 = Fp22.neg(t4);
    ell.push([c0, c1, c2]);
    Rx = Fp22.mul(Fp22.mul(Fp22.mul(Fp22.sub(t0, t3), Rx), Ry), Fp2div2);
    Ry = Fp22.sub(Fp22.sqr(Fp22.mul(Fp22.add(t0, t3), Fp2div2)), Fp22.mul(Fp22.sqr(t2), _3n$2));
    Rz = Fp22.mul(t0, t4);
    return { Rx, Ry, Rz };
  }
  function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
    const t0 = Fp22.sub(Ry, Fp22.mul(Qy, Rz));
    const t1 = Fp22.sub(Rx, Fp22.mul(Qx, Rz));
    const c0 = Fp22.sub(Fp22.mul(t0, Qx), Fp22.mul(t1, Qy));
    const c1 = Fp22.neg(t0);
    const c2 = t1;
    ell.push([c0, c1, c2]);
    const t2 = Fp22.sqr(t1);
    const t3 = Fp22.mul(t2, t1);
    const t4 = Fp22.mul(t2, Rx);
    const t5 = Fp22.add(Fp22.sub(t3, Fp22.mul(t4, _2n$4)), Fp22.mul(Fp22.sqr(t0), Rz));
    Rx = Fp22.mul(t1, t5);
    Ry = Fp22.sub(Fp22.mul(Fp22.sub(t4, t5), t0), Fp22.mul(t3, Ry));
    Rz = Fp22.mul(Rz, t3);
    return { Rx, Ry, Rz };
  }
  const ATE_NAF = NAfDecomposition(ateLoopSize);
  const calcPairingPrecomputes = memoized((point) => {
    const p2 = point;
    const { x: x2, y: y2 } = p2.toAffine();
    const Qx = x2, Qy = y2, negQy = Fp22.neg(y2);
    let Rx = Qx, Ry = Qy, Rz = Fp22.ONE;
    const ell = [];
    for (const bit of ATE_NAF) {
      const cur = [];
      ({ Rx, Ry, Rz } = pointDouble(cur, Rx, Ry, Rz));
      if (bit)
        ({ Rx, Ry, Rz } = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
      ell.push(cur);
    }
    if (postPrecompute) {
      const last = ell[ell.length - 1];
      postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
    }
    return ell;
  });
  function millerLoopBatch(pairs, withFinalExponent = false) {
    let f12 = Fp122.ONE;
    if (pairs.length) {
      const ellLen = pairs[0][0].length;
      for (let i = 0; i < ellLen; i++) {
        f12 = Fp122.sqr(f12);
        for (const [ell, Px, Py] of pairs) {
          for (const [c0, c1, c2] of ell[i])
            f12 = lineFunction(c0, c1, c2, f12, Px, Py);
        }
      }
    }
    if (xNegative)
      f12 = Fp122.conjugate(f12);
    return withFinalExponent ? Fp122.finalExponentiate(f12) : f12;
  }
  function pairingBatch(pairs, withFinalExponent = true) {
    const res = [];
    normalizeZ(G1, pairs.map(({ g1 }) => g1));
    normalizeZ(G2, pairs.map(({ g2 }) => g2));
    for (const { g1, g2 } of pairs) {
      if (g1.is0() || g2.is0())
        throw new Error("pairing is not available for ZERO point");
      g1.assertValidity();
      g2.assertValidity();
      const Qa = g1.toAffine();
      res.push([calcPairingPrecomputes(g2), Qa.x, Qa.y]);
    }
    return millerLoopBatch(res, withFinalExponent);
  }
  function pairing(Q2, P2, withFinalExponent = true) {
    return pairingBatch([{ g1: Q2, g2: P2 }], withFinalExponent);
  }
  return {
    Fp12: Fp122,
    // NOTE: we re-export Fp12 here because pairing results are Fp12!
    millerLoopBatch,
    pairing,
    pairingBatch,
    calcPairingPrecomputes
  };
}
function createBlsSig(blsPairing, PubCurve, SigCurve, SignatureCoder, isSigG1) {
  const { Fp12: Fp122, pairingBatch } = blsPairing;
  function normPub(point) {
    return point instanceof PubCurve.Point ? point : PubCurve.Point.fromHex(point);
  }
  function normSig(point) {
    return point instanceof SigCurve.Point ? point : SigCurve.Point.fromHex(point);
  }
  function amsg(m2) {
    if (!(m2 instanceof SigCurve.Point))
      throw new Error(`expected valid message hashed to ${!isSigG1 ? "G2" : "G1"} curve`);
    return m2;
  }
  const pair = !isSigG1 ? (a2, b2) => ({ g1: a2, g2: b2 }) : (a2, b2) => ({ g1: b2, g2: a2 });
  return {
    // P = pk x G
    getPublicKey(secretKey) {
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      return PubCurve.Point.BASE.multiply(sec);
    },
    // S = pk x H(m)
    sign(message, secretKey, unusedArg) {
      if (unusedArg != null)
        throw new Error("sign() expects 2 arguments");
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      amsg(message).assertValidity();
      return message.multiply(sec);
    },
    // Checks if pairing of public key & hash is equal to pairing of generator & signature.
    // e(P, H(m)) == e(G, S)
    // e(S, G) == e(H(m), P)
    verify(signature, message, publicKey, unusedArg) {
      if (unusedArg != null)
        throw new Error("verify() expects 3 arguments");
      signature = normSig(signature);
      publicKey = normPub(publicKey);
      const P2 = publicKey.negate();
      const G2 = PubCurve.Point.BASE;
      const Hm = amsg(message);
      const S2 = signature;
      const exp = pairingBatch([pair(P2, Hm), pair(G2, S2)]);
      return Fp122.eql(exp, Fp122.ONE);
    },
    // https://ethresear.ch/t/fast-verification-of-multiple-bls-signatures/5407
    // e(G, S) = e(G, SUM(n)(Si)) = MUL(n)(e(G, Si))
    // TODO: maybe `{message: G2Hex, publicKey: G1Hex}[]` instead?
    verifyBatch(signature, messages, publicKeys) {
      aNonEmpty(messages);
      if (publicKeys.length !== messages.length)
        throw new Error("amount of public keys and messages should be equal");
      const sig = normSig(signature);
      const nMessages = messages;
      const nPublicKeys = publicKeys.map(normPub);
      const messagePubKeyMap = /* @__PURE__ */ new Map();
      for (let i = 0; i < nPublicKeys.length; i++) {
        const pub = nPublicKeys[i];
        const msg = nMessages[i];
        let keys = messagePubKeyMap.get(msg);
        if (keys === void 0) {
          keys = [];
          messagePubKeyMap.set(msg, keys);
        }
        keys.push(pub);
      }
      const paired = [];
      const G2 = PubCurve.Point.BASE;
      try {
        for (const [msg, keys] of messagePubKeyMap) {
          const groupPublicKey = keys.reduce((acc, msg2) => acc.add(msg2));
          paired.push(pair(groupPublicKey, msg));
        }
        paired.push(pair(G2.negate(), sig));
        return Fp122.eql(pairingBatch(paired), Fp122.ONE);
      } catch {
        return false;
      }
    },
    // Adds a bunch of public key points together.
    // pk1 + pk2 + pk3 = pkA
    aggregatePublicKeys(publicKeys) {
      aNonEmpty(publicKeys);
      publicKeys = publicKeys.map((pub) => normPub(pub));
      const agg = publicKeys.reduce((sum, p2) => sum.add(p2), PubCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    // Adds a bunch of signature points together.
    // pk1 + pk2 + pk3 = pkA
    aggregateSignatures(signatures) {
      aNonEmpty(signatures);
      signatures = signatures.map((sig) => normSig(sig));
      const agg = signatures.reduce((sum, s2) => sum.add(s2), SigCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    hash(messageBytes, DST) {
      abytes(messageBytes);
      const opts = DST ? { DST } : void 0;
      return SigCurve.hashToCurve(messageBytes, opts);
    },
    Signature: SignatureCoder
  };
}
function bls(CURVE) {
  const { Fp: Fp3, Fr, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 } = CURVE.fields;
  const G1_ = weierstrassPoints(CURVE.G1);
  const G1 = Object.assign(G1_, createHasher(G1_.Point, CURVE.G1.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G1.htfDefaults
  }));
  const G2_ = weierstrassPoints(CURVE.G2);
  const G2 = Object.assign(G2_, createHasher(G2_.Point, CURVE.G2.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G2.htfDefaults
  }));
  const pairingRes = createBlsPairing(CURVE.fields, G1.Point, G2.Point, {
    ...CURVE.params,
    postPrecompute: CURVE.postPrecompute
  });
  const { millerLoopBatch, pairing, pairingBatch, calcPairingPrecomputes } = pairingRes;
  const longSignatures = createBlsSig(pairingRes, G1, G2, CURVE.G2.Signature, false);
  const shortSignatures = createBlsSig(pairingRes, G2, G1, CURVE.G1.ShortSignature, true);
  const rand = CURVE.randomBytes || randomBytes;
  const randomSecretKey = () => {
    const length = getMinHashLength(Fr.ORDER);
    return mapHashToField(rand(length), Fr.ORDER);
  };
  const utils = {
    randomSecretKey,
    randomPrivateKey: randomSecretKey,
    calcPairingPrecomputes
  };
  const { ShortSignature } = CURVE.G1;
  const { Signature } = CURVE.G2;
  function normP1Hash(point, htfOpts) {
    return point instanceof G1.Point ? point : shortSignatures.hash(ensureBytes("point", point), htfOpts == null ? void 0 : htfOpts.DST);
  }
  function normP2Hash(point, htfOpts) {
    return point instanceof G2.Point ? point : longSignatures.hash(ensureBytes("point", point), htfOpts == null ? void 0 : htfOpts.DST);
  }
  function getPublicKey(privateKey) {
    return longSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function getPublicKeyForShortSignatures(privateKey) {
    return shortSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function sign(message, privateKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    const S2 = longSignatures.sign(Hm, privateKey);
    return message instanceof G2.Point ? S2 : Signature.toBytes(S2);
  }
  function signShortSignature(message, privateKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    const S2 = shortSignatures.sign(Hm, privateKey);
    return message instanceof G1.Point ? S2 : ShortSignature.toBytes(S2);
  }
  function verify(signature, message, publicKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    return longSignatures.verify(signature, Hm, publicKey);
  }
  function verifyShortSignature(signature, message, publicKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    return shortSignatures.verify(signature, Hm, publicKey);
  }
  function aggregatePublicKeys(publicKeys) {
    const agg = longSignatures.aggregatePublicKeys(publicKeys);
    return publicKeys[0] instanceof G1.Point ? agg : agg.toBytes(true);
  }
  function aggregateSignatures(signatures) {
    const agg = longSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G2.Point ? agg : Signature.toBytes(agg);
  }
  function aggregateShortSignatures(signatures) {
    const agg = shortSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G1.Point ? agg : ShortSignature.toBytes(agg);
  }
  function verifyBatch(signature, messages, publicKeys, htfOpts) {
    const Hm = messages.map((m2) => normP2Hash(m2, htfOpts));
    return longSignatures.verifyBatch(signature, Hm, publicKeys);
  }
  G1.Point.BASE.precompute(4);
  return {
    longSignatures,
    shortSignatures,
    millerLoopBatch,
    pairing,
    pairingBatch,
    verifyBatch,
    fields: {
      Fr,
      Fp: Fp3,
      Fp2: Fp22,
      Fp6: Fp62,
      Fp12: Fp122
    },
    params: {
      ateLoopSize: CURVE.params.ateLoopSize,
      twistType: CURVE.params.twistType,
      // deprecated
      r: CURVE.params.r,
      G1b: CURVE.G1.b,
      G2b: CURVE.G2.b
    },
    utils,
    // deprecated
    getPublicKey,
    getPublicKeyForShortSignatures,
    sign,
    signShortSignature,
    verify,
    verifyShortSignature,
    aggregatePublicKeys,
    aggregateSignatures,
    aggregateShortSignatures,
    G1,
    G2,
    Signature,
    ShortSignature
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$2 = BigInt(0), _1n$3 = BigInt(1), _2n$3 = BigInt(2), _3n$1 = BigInt(3);
function calcFrobeniusCoefficients(Fp3, nonResidue, modulus, degree, num = 1, divisor) {
  const _divisor = BigInt(divisor === void 0 ? degree : divisor);
  const towerModulus = modulus ** BigInt(degree);
  const res = [];
  for (let i = 0; i < num; i++) {
    const a2 = BigInt(i + 1);
    const powers = [];
    for (let j2 = 0, qPower = _1n$3; j2 < degree; j2++) {
      const power = (a2 * qPower - a2) / _divisor % towerModulus;
      powers.push(Fp3.pow(nonResidue, power));
      qPower *= modulus;
    }
    res.push(powers);
  }
  return res;
}
function psiFrobenius(Fp3, Fp22, base) {
  const PSI_X = Fp22.pow(base, (Fp3.ORDER - _1n$3) / _3n$1);
  const PSI_Y = Fp22.pow(base, (Fp3.ORDER - _1n$3) / _2n$3);
  function psi(x2, y2) {
    const x22 = Fp22.mul(Fp22.frobeniusMap(x2, 1), PSI_X);
    const y22 = Fp22.mul(Fp22.frobeniusMap(y2, 1), PSI_Y);
    return [x22, y22];
  }
  const PSI2_X = Fp22.pow(base, (Fp3.ORDER ** _2n$3 - _1n$3) / _3n$1);
  const PSI2_Y = Fp22.pow(base, (Fp3.ORDER ** _2n$3 - _1n$3) / _2n$3);
  if (!Fp22.eql(PSI2_Y, Fp22.neg(Fp22.ONE)))
    throw new Error("psiFrobenius: PSI2_Y!==-1");
  function psi2(x2, y2) {
    return [Fp22.mul(x2, PSI2_X), Fp22.neg(y2)];
  }
  const mapAffine = (fn) => (c2, P2) => {
    const affine = P2.toAffine();
    const p2 = fn(affine.x, affine.y);
    return c2.fromAffine({ x: p2[0], y: p2[1] });
  };
  const G2psi3 = mapAffine(psi);
  const G2psi22 = mapAffine(psi2);
  return { psi, psi2, G2psi: G2psi3, G2psi2: G2psi22, PSI_X, PSI_Y, PSI2_X, PSI2_Y };
}
const Fp2fromBigTuple = (Fp3, tuple) => {
  if (tuple.length !== 2)
    throw new Error("invalid tuple");
  const fps = tuple.map((n) => Fp3.create(n));
  return { c0: fps[0], c1: fps[1] };
};
class _Field2 {
  constructor(Fp3, opts = {}) {
    this.MASK = _1n$3;
    const ORDER = Fp3.ORDER;
    const FP2_ORDER = ORDER * ORDER;
    this.Fp = Fp3;
    this.ORDER = FP2_ORDER;
    this.BITS = bitLen(FP2_ORDER);
    this.BYTES = Math.ceil(bitLen(FP2_ORDER) / 8);
    this.isLE = Fp3.isLE;
    this.ZERO = { c0: Fp3.ZERO, c1: Fp3.ZERO };
    this.ONE = { c0: Fp3.ONE, c1: Fp3.ZERO };
    this.Fp_NONRESIDUE = Fp3.create(opts.NONRESIDUE || BigInt(-1));
    this.Fp_div2 = Fp3.div(Fp3.ONE, _2n$3);
    this.NONRESIDUE = Fp2fromBigTuple(Fp3, opts.FP2_NONRESIDUE);
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp3, this.Fp_NONRESIDUE, Fp3.ORDER, 2)[0];
    this.mulByB = opts.Fp2mulByB;
    Object.seal(this);
  }
  fromBigTuple(tuple) {
    return Fp2fromBigTuple(this.Fp, tuple);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    function isValidC(num, ORDER) {
      return typeof num === "bigint" && _0n$2 <= num && num < ORDER;
    }
    return isValidC(c0, this.ORDER) && isValidC(c1, this.ORDER);
  }
  is0({ c0, c1 }) {
    return this.Fp.is0(c0) && this.Fp.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    return this.Fp.eql(c0, r0) && this.Fp.eql(c1, r1);
  }
  neg({ c0, c1 }) {
    return { c0: this.Fp.neg(c0), c1: this.Fp.neg(c1) };
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add(f1, f2) {
    const { c0, c1 } = f1;
    const { c0: r0, c1: r1 } = f2;
    return {
      c0: this.Fp.add(c0, r0),
      c1: this.Fp.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    return {
      c0: this.Fp.sub(c0, r0),
      c1: this.Fp.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp: Fp3 } = this;
    if (typeof rhs === "bigint")
      return { c0: Fp3.mul(c0, rhs), c1: Fp3.mul(c1, rhs) };
    const { c0: r0, c1: r1 } = rhs;
    let t1 = Fp3.mul(c0, r0);
    let t2 = Fp3.mul(c1, r1);
    const o0 = Fp3.sub(t1, t2);
    const o1 = Fp3.sub(Fp3.mul(Fp3.add(c0, c1), Fp3.add(r0, r1)), Fp3.add(t1, t2));
    return { c0: o0, c1: o1 };
  }
  sqr({ c0, c1 }) {
    const { Fp: Fp3 } = this;
    const a2 = Fp3.add(c0, c1);
    const b2 = Fp3.sub(c0, c1);
    const c2 = Fp3.add(c0, c0);
    return { c0: Fp3.mul(a2, b2), c1: Fp3.mul(c2, c1) };
  }
  // NonNormalized stuff
  addN(a2, b2) {
    return this.add(a2, b2);
  }
  subN(a2, b2) {
    return this.sub(a2, b2);
  }
  mulN(a2, b2) {
    return this.mul(a2, b2);
  }
  sqrN(a2) {
    return this.sqr(a2);
  }
  // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
  div(lhs, rhs) {
    const { Fp: Fp3 } = this;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  inv({ c0: a2, c1: b2 }) {
    const { Fp: Fp3 } = this;
    const factor = Fp3.inv(Fp3.create(a2 * a2 + b2 * b2));
    return { c0: Fp3.mul(factor, Fp3.create(a2)), c1: Fp3.mul(factor, Fp3.create(-b2)) };
  }
  sqrt(num) {
    const { Fp: Fp3 } = this;
    const Fp22 = this;
    const { c0, c1 } = num;
    if (Fp3.is0(c1)) {
      if (FpLegendre(Fp3, c0) === 1)
        return Fp22.create({ c0: Fp3.sqrt(c0), c1: Fp3.ZERO });
      else
        return Fp22.create({ c0: Fp3.ZERO, c1: Fp3.sqrt(Fp3.div(c0, this.Fp_NONRESIDUE)) });
    }
    const a2 = Fp3.sqrt(Fp3.sub(Fp3.sqr(c0), Fp3.mul(Fp3.sqr(c1), this.Fp_NONRESIDUE)));
    let d2 = Fp3.mul(Fp3.add(a2, c0), this.Fp_div2);
    const legendre = FpLegendre(Fp3, d2);
    if (legendre === -1)
      d2 = Fp3.sub(d2, a2);
    const a0 = Fp3.sqrt(d2);
    const candidateSqrt = Fp22.create({ c0: a0, c1: Fp3.div(Fp3.mul(c1, this.Fp_div2), a0) });
    if (!Fp22.eql(Fp22.sqr(candidateSqrt), num))
      throw new Error("Cannot find square root");
    const x1 = candidateSqrt;
    const x2 = Fp22.neg(x1);
    const { re: re1, im: im1 } = Fp22.reim(x1);
    const { re: re2, im: im2 } = Fp22.reim(x2);
    if (im1 > im2 || im1 === im2 && re1 > re2)
      return x1;
    return x2;
  }
  // Same as sgn0_m_eq_2 in RFC 9380
  isOdd(x2) {
    const { re: x0, im: x1 } = this.reim(x2);
    const sign_0 = x0 % _2n$3;
    const zero_0 = x0 === _0n$2;
    const sign_1 = x1 % _2n$3;
    return BigInt(sign_0 || zero_0 && sign_1) == _1n$3;
  }
  // Bytes util
  fromBytes(b2) {
    const { Fp: Fp3 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    return { c0: Fp3.fromBytes(b2.subarray(0, Fp3.BYTES)), c1: Fp3.fromBytes(b2.subarray(Fp3.BYTES)) };
  }
  toBytes({ c0, c1 }) {
    return concatBytes(this.Fp.toBytes(c0), this.Fp.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c2) {
    return {
      c0: this.Fp.cmov(c0, r0, c2),
      c1: this.Fp.cmov(c1, r1, c2)
    };
  }
  reim({ c0, c1 }) {
    return { re: c0, im: c1 };
  }
  Fp4Square(a2, b2) {
    const Fp22 = this;
    const a22 = Fp22.sqr(a2);
    const b22 = Fp22.sqr(b2);
    return {
      first: Fp22.add(Fp22.mulByNonresidue(b22), a22),
      // b² * Nonresidue + a²
      second: Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(a2, b2)), a22), b22)
      // (a + b)² - a² - b²
    };
  }
  // multiply by u + 1
  mulByNonresidue({ c0, c1 }) {
    return this.mul({ c0, c1 }, this.NONRESIDUE);
  }
  frobeniusMap({ c0, c1 }, power) {
    return {
      c0,
      c1: this.Fp.mul(c1, this.FROBENIUS_COEFFICIENTS[power % 2])
    };
  }
}
class _Field6 {
  constructor(Fp22) {
    this.MASK = _1n$3;
    this.Fp2 = Fp22;
    this.ORDER = Fp22.ORDER;
    this.BITS = 3 * Fp22.BITS;
    this.BYTES = 3 * Fp22.BYTES;
    this.isLE = Fp22.isLE;
    this.ZERO = { c0: Fp22.ZERO, c1: Fp22.ZERO, c2: Fp22.ZERO };
    this.ONE = { c0: Fp22.ONE, c1: Fp22.ZERO, c2: Fp22.ZERO };
    const { Fp: Fp3 } = Fp22;
    const frob = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 6, 2, 3);
    this.FROBENIUS_COEFFICIENTS_1 = frob[0];
    this.FROBENIUS_COEFFICIENTS_2 = frob[1];
    Object.seal(this);
  }
  add({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.add(c0, r0),
      c1: Fp22.add(c1, r1),
      c2: Fp22.add(c2, r2)
    };
  }
  sub({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.sub(c0, r0),
      c1: Fp22.sub(c1, r1),
      c2: Fp22.sub(c2, r2)
    };
  }
  mul({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    if (typeof rhs === "bigint") {
      return {
        c0: Fp22.mul(c0, rhs),
        c1: Fp22.mul(c1, rhs),
        c2: Fp22.mul(c2, rhs)
      };
    }
    const { c0: r0, c1: r1, c2: r2 } = rhs;
    const t0 = Fp22.mul(c0, r0);
    const t1 = Fp22.mul(c1, r1);
    const t2 = Fp22.mul(c2, r2);
    return {
      // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
      c0: Fp22.add(t0, Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), Fp22.add(r1, r2)), Fp22.add(t1, t2)))),
      // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
      c1: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c1), Fp22.add(r0, r1)), Fp22.add(t0, t1)), Fp22.mulByNonresidue(t2)),
      // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
      c2: Fp22.sub(Fp22.add(t1, Fp22.mul(Fp22.add(c0, c2), Fp22.add(r0, r2))), Fp22.add(t0, t2))
    };
  }
  sqr({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sqr(c0);
    let t1 = Fp22.mul(Fp22.mul(c0, c1), _2n$3);
    let t3 = Fp22.mul(Fp22.mul(c1, c2), _2n$3);
    let t4 = Fp22.sqr(c2);
    return {
      c0: Fp22.add(Fp22.mulByNonresidue(t3), t0),
      // T3 * (u + 1) + T0
      c1: Fp22.add(Fp22.mulByNonresidue(t4), t1),
      // T4 * (u + 1) + T1
      // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
      c2: Fp22.sub(Fp22.sub(Fp22.add(Fp22.add(t1, Fp22.sqr(Fp22.add(Fp22.sub(c0, c1), c2))), t3), t0), t4)
    };
  }
  addN(a2, b2) {
    return this.add(a2, b2);
  }
  subN(a2, b2) {
    return this.sub(a2, b2);
  }
  mulN(a2, b2) {
    return this.mul(a2, b2);
  }
  sqrN(a2) {
    return this.sqr(a2);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.isValid(c0) && Fp22.isValid(c1) && Fp22.isValid(c2);
  }
  is0({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.is0(c0) && Fp22.is0(c1) && Fp22.is0(c2);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.neg(c0), c1: Fp22.neg(c1), c2: Fp22.neg(c2) };
  }
  eql({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.eql(c0, r0) && Fp22.eql(c1, r1) && Fp22.eql(c2, r2);
  }
  sqrt(_2) {
    return notImplemented();
  }
  // Do we need division by bigint at all? Should be done via order:
  div(lhs, rhs) {
    const { Fp2: Fp22 } = this;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  inv({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sub(Fp22.sqr(c0), Fp22.mulByNonresidue(Fp22.mul(c2, c1)));
    let t1 = Fp22.sub(Fp22.mulByNonresidue(Fp22.sqr(c2)), Fp22.mul(c0, c1));
    let t2 = Fp22.sub(Fp22.sqr(c1), Fp22.mul(c0, c2));
    let t4 = Fp22.inv(Fp22.add(Fp22.mulByNonresidue(Fp22.add(Fp22.mul(c2, t1), Fp22.mul(c1, t2))), Fp22.mul(c0, t0)));
    return { c0: Fp22.mul(t4, t0), c1: Fp22.mul(t4, t1), c2: Fp22.mul(t4, t2) };
  }
  // Bytes utils
  fromBytes(b2) {
    const { Fp2: Fp22 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    const B2 = Fp22.BYTES;
    return {
      c0: Fp22.fromBytes(b2.subarray(0, B2)),
      c1: Fp22.fromBytes(b2.subarray(B2, B2 * 2)),
      c2: Fp22.fromBytes(b2.subarray(2 * B2))
    };
  }
  toBytes({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return concatBytes(Fp22.toBytes(c0), Fp22.toBytes(c1), Fp22.toBytes(c2));
  }
  cmov({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c3) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.cmov(c0, r0, c3),
      c1: Fp22.cmov(c1, r1, c3),
      c2: Fp22.cmov(c2, r2, c3)
    };
  }
  fromBigSix(t2) {
    const { Fp2: Fp22 } = this;
    if (!Array.isArray(t2) || t2.length !== 6)
      throw new Error("invalid Fp6 usage");
    return {
      c0: Fp22.fromBigTuple(t2.slice(0, 2)),
      c1: Fp22.fromBigTuple(t2.slice(2, 4)),
      c2: Fp22.fromBigTuple(t2.slice(4, 6))
    };
  }
  frobeniusMap({ c0, c1, c2 }, power) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.frobeniusMap(c0, power),
      c1: Fp22.mul(Fp22.frobeniusMap(c1, power), this.FROBENIUS_COEFFICIENTS_1[power % 6]),
      c2: Fp22.mul(Fp22.frobeniusMap(c2, power), this.FROBENIUS_COEFFICIENTS_2[power % 6])
    };
  }
  mulByFp2({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mul(c0, rhs),
      c1: Fp22.mul(c1, rhs),
      c2: Fp22.mul(c2, rhs)
    };
  }
  mulByNonresidue({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.mulByNonresidue(c2), c1: c0, c2: c1 };
  }
  // Sparse multiplication
  mul1({ c0, c1, c2 }, b1) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mulByNonresidue(Fp22.mul(c2, b1)),
      c1: Fp22.mul(c0, b1),
      c2: Fp22.mul(c1, b1)
    };
  }
  // Sparse multiplication
  mul01({ c0, c1, c2 }, b0, b1) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.mul(c0, b0);
    let t1 = Fp22.mul(c1, b1);
    return {
      // ((c1 + c2) * b1 - T1) * (u + 1) + T0
      c0: Fp22.add(Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), b1), t1)), t0),
      // (b0 + b1) * (c0 + c1) - T0 - T1
      c1: Fp22.sub(Fp22.sub(Fp22.mul(Fp22.add(b0, b1), Fp22.add(c0, c1)), t0), t1),
      // (c0 + c2) * b0 - T0 + T1
      c2: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c2), b0), t0), t1)
    };
  }
}
class _Field12 {
  constructor(Fp62, opts) {
    this.MASK = _1n$3;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    this.Fp6 = Fp62;
    this.ORDER = Fp22.ORDER;
    this.BITS = 2 * Fp62.BITS;
    this.BYTES = 2 * Fp62.BYTES;
    this.isLE = Fp62.isLE;
    this.ZERO = { c0: Fp62.ZERO, c1: Fp62.ZERO };
    this.ONE = { c0: Fp62.ONE, c1: Fp62.ZERO };
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 12, 1, 6)[0];
    this.X_LEN = opts.X_LEN;
    this.finalExponentiate = opts.Fp12finalExponentiate;
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.isValid(c0) && Fp62.isValid(c1);
  }
  is0({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.is0(c0) && Fp62.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return { c0: Fp62.neg(c0), c1: Fp62.neg(c1) };
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.eql(c0, r0) && Fp62.eql(c1, r1);
  }
  sqrt(_2) {
    notImplemented();
  }
  inv({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let t2 = Fp62.inv(Fp62.sub(Fp62.sqr(c0), Fp62.mulByNonresidue(Fp62.sqr(c1))));
    return { c0: Fp62.mul(c0, t2), c1: Fp62.neg(Fp62.mul(c1, t2)) };
  }
  div(lhs, rhs) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.add(c0, r0),
      c1: Fp62.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.sub(c0, r0),
      c1: Fp62.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    if (typeof rhs === "bigint")
      return { c0: Fp62.mul(c0, rhs), c1: Fp62.mul(c1, rhs) };
    let { c0: r0, c1: r1 } = rhs;
    let t1 = Fp62.mul(c0, r0);
    let t2 = Fp62.mul(c1, r1);
    return {
      c0: Fp62.add(t1, Fp62.mulByNonresidue(t2)),
      // T1 + T2 * v
      // (c0 + c1) * (r0 + r1) - (T1 + T2)
      c1: Fp62.sub(Fp62.mul(Fp62.add(c0, c1), Fp62.add(r0, r1)), Fp62.add(t1, t2))
    };
  }
  sqr({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let ab = Fp62.mul(c0, c1);
    return {
      // (c1 * v + c0) * (c0 + c1) - AB - AB * v
      c0: Fp62.sub(Fp62.sub(Fp62.mul(Fp62.add(Fp62.mulByNonresidue(c1), c0), Fp62.add(c0, c1)), ab), Fp62.mulByNonresidue(ab)),
      c1: Fp62.add(ab, ab)
    };
  }
  // NonNormalized stuff
  addN(a2, b2) {
    return this.add(a2, b2);
  }
  subN(a2, b2) {
    return this.sub(a2, b2);
  }
  mulN(a2, b2) {
    return this.mul(a2, b2);
  }
  sqrN(a2) {
    return this.sqr(a2);
  }
  // Bytes utils
  fromBytes(b2) {
    const { Fp6: Fp62 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    return {
      c0: Fp62.fromBytes(b2.subarray(0, Fp62.BYTES)),
      c1: Fp62.fromBytes(b2.subarray(Fp62.BYTES))
    };
  }
  toBytes({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return concatBytes(Fp62.toBytes(c0), Fp62.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c2) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.cmov(c0, r0, c2),
      c1: Fp62.cmov(c1, r1, c2)
    };
  }
  // Utils
  // toString() {
  //   return '' + 'Fp12(' + this.c0 + this.c1 + '* w');
  // },
  // fromTuple(c: [Fp6, Fp6]) {
  //   return new Fp12(...c);
  // }
  fromBigTwelve(t2) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.fromBigSix(t2.slice(0, 6)),
      c1: Fp62.fromBigSix(t2.slice(6, 12))
    };
  }
  // Raises to q**i -th power
  frobeniusMap(lhs, power) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0, c1, c2 } = Fp62.frobeniusMap(lhs.c1, power);
    const coeff = this.FROBENIUS_COEFFICIENTS[power % 12];
    return {
      c0: Fp62.frobeniusMap(lhs.c0, power),
      c1: Fp62.create({
        c0: Fp22.mul(c0, coeff),
        c1: Fp22.mul(c1, coeff),
        c2: Fp22.mul(c2, coeff)
      })
    };
  }
  mulByFp2({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.mulByFp2(c0, rhs),
      c1: Fp62.mulByFp2(c1, rhs)
    };
  }
  conjugate({ c0, c1 }) {
    return { c0, c1: this.Fp6.neg(c1) };
  }
  // Sparse multiplication
  mul014({ c0, c1 }, o0, o1, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    let t0 = Fp62.mul01(c0, o0, o1);
    let t1 = Fp62.mul1(c1, o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(t1), t0),
      // T1 * v + T0
      // (c1 + c0) * [o0, o1+o4] - T0 - T1
      c1: Fp62.sub(Fp62.sub(Fp62.mul01(Fp62.add(c1, c0), o0, Fp22.add(o1, o4)), t0), t1)
    };
  }
  mul034({ c0, c1 }, o0, o3, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const a2 = Fp62.create({
      c0: Fp22.mul(c0.c0, o0),
      c1: Fp22.mul(c0.c1, o0),
      c2: Fp22.mul(c0.c2, o0)
    });
    const b2 = Fp62.mul01(c1, o3, o4);
    const e = Fp62.mul01(Fp62.add(c0, c1), Fp22.add(o0, o3), o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(b2), a2),
      c1: Fp62.sub(e, Fp62.add(a2, b2))
    };
  }
  // A cyclotomic group is a subgroup of Fp^n defined by
  //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
  // The result of any pairing is in a cyclotomic subgroup
  // https://eprint.iacr.org/2009/565.pdf
  // https://eprint.iacr.org/2010/354.pdf
  _cyclotomicSquare({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
    const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
    const { first: t3, second: t4 } = Fp22.Fp4Square(c0c0, c1c1);
    const { first: t5, second: t6 } = Fp22.Fp4Square(c1c0, c0c2);
    const { first: t7, second: t8 } = Fp22.Fp4Square(c0c1, c1c2);
    const t9 = Fp22.mulByNonresidue(t8);
    return {
      c0: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.sub(t3, c0c0), _2n$3), t3),
        // 2 * (T3 - c0c0)  + T3
        c1: Fp22.add(Fp22.mul(Fp22.sub(t5, c0c1), _2n$3), t5),
        // 2 * (T5 - c0c1)  + T5
        c2: Fp22.add(Fp22.mul(Fp22.sub(t7, c0c2), _2n$3), t7)
      }),
      // 2 * (T7 - c0c2)  + T7
      c1: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.add(t9, c1c0), _2n$3), t9),
        // 2 * (T9 + c1c0) + T9
        c1: Fp22.add(Fp22.mul(Fp22.add(t4, c1c1), _2n$3), t4),
        // 2 * (T4 + c1c1) + T4
        c2: Fp22.add(Fp22.mul(Fp22.add(t6, c1c2), _2n$3), t6)
      })
    };
  }
  // https://eprint.iacr.org/2009/565.pdf
  _cyclotomicExp(num, n) {
    let z2 = this.ONE;
    for (let i = this.X_LEN - 1; i >= 0; i--) {
      z2 = this._cyclotomicSquare(z2);
      if (bitGet(n, i))
        z2 = this.mul(z2, num);
    }
    return z2;
  }
}
function tower12(opts) {
  const Fp3 = Field(opts.ORDER);
  const Fp22 = new _Field2(Fp3, opts);
  const Fp62 = new _Field6(Fp22);
  const Fp122 = new _Field12(Fp62, opts);
  return { Fp: Fp3, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$1 = BigInt(0), _1n$2 = BigInt(1), _2n$2 = BigInt(2), _3n = BigInt(3), _4n = BigInt(4);
const BLS_X = BigInt("0xd201000000010000");
const BLS_X_LEN = bitLen(BLS_X);
const bls12_381_CURVE_G1 = {
  p: BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"),
  n: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"),
  h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
  a: _0n$1,
  b: _4n,
  Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
  Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1")
};
const bls12_381_Fr = Field(bls12_381_CURVE_G1.n, {
  modFromBytes: true,
  isLE: true
});
const { Fp: Fp$1, Fp2, Fp6, Fp12 } = tower12({
  ORDER: bls12_381_CURVE_G1.p,
  X_LEN: BLS_X_LEN,
  // Finite extension field over irreducible polynominal.
  // Fp(u) / (u² - β) where β = -1
  FP2_NONRESIDUE: [_1n$2, _1n$2],
  Fp2mulByB: ({ c0, c1 }) => {
    const t0 = Fp$1.mul(c0, _4n);
    const t1 = Fp$1.mul(c1, _4n);
    return { c0: Fp$1.sub(t0, t1), c1: Fp$1.add(t0, t1) };
  },
  Fp12finalExponentiate: (num) => {
    const x2 = BLS_X;
    const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
    const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
    const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x2));
    const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
    const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x2));
    const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x2));
    const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x2)), Fp12._cyclotomicSquare(t2));
    const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x2));
    const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
    const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
    const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
    const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
    return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
  }
});
const { G2psi, G2psi2 } = psiFrobenius(Fp$1, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
const htfDefaults = Object.freeze({
  DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  p: Fp$1.ORDER,
  m: 2,
  k: 128,
  expand: "xmd",
  hash: sha256
});
const bls12_381_CURVE_G2 = {
  p: Fp2.ORDER,
  n: bls12_381_CURVE_G1.n,
  h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
  a: Fp2.ZERO,
  b: Fp2.fromBigTuple([_4n, _4n]),
  Gx: Fp2.fromBigTuple([
    BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"),
    BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")
  ]),
  Gy: Fp2.fromBigTuple([
    BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"),
    BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")
  ])
};
const COMPZERO = setMask(Fp$1.toBytes(_0n$1), { infinity: true, compressed: true });
function parseMask(bytes) {
  bytes = bytes.slice();
  const mask = bytes[0] & 224;
  const compressed = !!(mask >> 7 & 1);
  const infinity = !!(mask >> 6 & 1);
  const sort = !!(mask >> 5 & 1);
  bytes[0] &= 31;
  return { compressed, infinity, sort, value: bytes };
}
function setMask(bytes, mask) {
  if (bytes[0] & 224)
    throw new Error("setMask: non-empty mask");
  if (mask.compressed)
    bytes[0] |= 128;
  if (mask.infinity)
    bytes[0] |= 64;
  if (mask.sort)
    bytes[0] |= 32;
  return bytes;
}
function pointG1ToBytes(_c, point, isComp) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const is0 = point.is0();
  const { x: x2, y: y2 } = point.toAffine();
  if (isComp) {
    if (is0)
      return COMPZERO.slice();
    const sort = Boolean(y2 * _2n$2 / P2);
    return setMask(numberToBytesBE(x2, L2), { compressed: true, sort });
  } else {
    if (is0) {
      return concatBytes(Uint8Array.of(64), new Uint8Array(2 * L2 - 1));
    } else {
      return concatBytes(numberToBytesBE(x2, L2), numberToBytesBE(y2, L2));
    }
  }
}
function signatureG1ToBytes(point) {
  point.assertValidity();
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const { x: x2, y: y2 } = point.toAffine();
  if (point.is0())
    return COMPZERO.slice();
  const sort = Boolean(y2 * _2n$2 / P2);
  return setMask(numberToBytesBE(x2, L2), { compressed: true, sort });
}
function pointG1FromBytes(bytes) {
  const { compressed, infinity, sort, value } = parseMask(bytes);
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  if (value.length === 48 && compressed) {
    const compressedValue = bytesToNumberBE(value);
    const x2 = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
    if (infinity) {
      if (x2 !== _0n$1)
        throw new Error("invalid G1 point: non-empty, at infinity, with compression");
      return { x: _0n$1, y: _0n$1 };
    }
    const right = Fp$1.add(Fp$1.pow(x2, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
    let y2 = Fp$1.sqrt(right);
    if (!y2)
      throw new Error("invalid G1 point: compressed point");
    if (y2 * _2n$2 / P2 !== BigInt(sort))
      y2 = Fp$1.neg(y2);
    return { x: Fp$1.create(x2), y: Fp$1.create(y2) };
  } else if (value.length === 96 && !compressed) {
    const x2 = bytesToNumberBE(value.subarray(0, L2));
    const y2 = bytesToNumberBE(value.subarray(L2));
    if (infinity) {
      if (x2 !== _0n$1 || y2 !== _0n$1)
        throw new Error("G1: non-empty point at infinity");
      return bls12_381.G1.Point.ZERO.toAffine();
    }
    return { x: Fp$1.create(x2), y: Fp$1.create(y2) };
  } else {
    throw new Error("invalid G1 point: expected 48/96 bytes");
  }
}
function signatureG1FromBytes(hex) {
  const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex, 48));
  const P2 = Fp$1.ORDER;
  const Point = bls12_381.G1.Point;
  const compressedValue = bytesToNumberBE(value);
  if (infinity)
    return Point.ZERO;
  const x2 = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
  const right = Fp$1.add(Fp$1.pow(x2, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
  let y2 = Fp$1.sqrt(right);
  if (!y2)
    throw new Error("invalid G1 point: compressed");
  const aflag = BigInt(sort);
  if (y2 * _2n$2 / P2 !== aflag)
    y2 = Fp$1.neg(y2);
  const point = Point.fromAffine({ x: x2, y: y2 });
  point.assertValidity();
  return point;
}
function pointG2ToBytes(_c, point, isComp) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const is0 = point.is0();
  const { x: x2, y: y2 } = point.toAffine();
  if (isComp) {
    if (is0)
      return concatBytes(COMPZERO, numberToBytesBE(_0n$1, L2));
    const flag = Boolean(y2.c1 === _0n$1 ? y2.c0 * _2n$2 / P2 : y2.c1 * _2n$2 / P2);
    return concatBytes(setMask(numberToBytesBE(x2.c1, L2), { compressed: true, sort: flag }), numberToBytesBE(x2.c0, L2));
  } else {
    if (is0)
      return concatBytes(Uint8Array.of(64), new Uint8Array(4 * L2 - 1));
    const { re: x0, im: x1 } = Fp2.reim(x2);
    const { re: y0, im: y1 } = Fp2.reim(y2);
    return concatBytes(numberToBytesBE(x1, L2), numberToBytesBE(x0, L2), numberToBytesBE(y1, L2), numberToBytesBE(y0, L2));
  }
}
function signatureG2ToBytes(point) {
  point.assertValidity();
  const { BYTES: L2 } = Fp$1;
  if (point.is0())
    return concatBytes(COMPZERO, numberToBytesBE(_0n$1, L2));
  const { x: x2, y: y2 } = point.toAffine();
  const { re: x0, im: x1 } = Fp2.reim(x2);
  const { re: y0, im: y1 } = Fp2.reim(y2);
  const tmp = y1 > _0n$1 ? y1 * _2n$2 : y0 * _2n$2;
  const sort = Boolean(tmp / Fp$1.ORDER & _1n$2);
  const z2 = x0;
  return concatBytes(setMask(numberToBytesBE(x1, L2), { sort, compressed: true }), numberToBytesBE(z2, L2));
}
function pointG2FromBytes(bytes) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const { compressed, infinity, sort, value } = parseMask(bytes);
  if (!compressed && !infinity && sort || // 00100000
  !compressed && infinity && sort || // 01100000
  sort && infinity && compressed) {
    throw new Error("invalid encoding flag: " + (bytes[0] & 224));
  }
  const slc = (b2, from, to) => bytesToNumberBE(b2.slice(from, to));
  if (value.length === 96 && compressed) {
    if (infinity) {
      if (value.reduce((p2, c2) => p2 !== 0 ? c2 + 1 : c2, 0) > 0) {
        throw new Error("invalid G2 point: compressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x_1 = slc(value, 0, L2);
    const x_0 = slc(value, L2, 2 * L2);
    const x2 = Fp2.create({ c0: Fp$1.create(x_0), c1: Fp$1.create(x_1) });
    const right = Fp2.add(Fp2.pow(x2, _3n), bls12_381_CURVE_G2.b);
    let y2 = Fp2.sqrt(right);
    const Y_bit = y2.c1 === _0n$1 ? y2.c0 * _2n$2 / P2 : y2.c1 * _2n$2 / P2 ? _1n$2 : _0n$1;
    y2 = sort && Y_bit > 0 ? y2 : Fp2.neg(y2);
    return { x: x2, y: y2 };
  } else if (value.length === 192 && !compressed) {
    if (infinity) {
      if (value.reduce((p2, c2) => p2 !== 0 ? c2 + 1 : c2, 0) > 0) {
        throw new Error("invalid G2 point: uncompressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x1 = slc(value, 0 * L2, 1 * L2);
    const x0 = slc(value, 1 * L2, 2 * L2);
    const y1 = slc(value, 2 * L2, 3 * L2);
    const y0 = slc(value, 3 * L2, 4 * L2);
    return { x: Fp2.fromBigTuple([x0, x1]), y: Fp2.fromBigTuple([y0, y1]) };
  } else {
    throw new Error("invalid G2 point: expected 96/192 bytes");
  }
}
function signatureG2FromBytes(hex) {
  const { ORDER: P2 } = Fp$1;
  const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex));
  const Point = bls12_381.G2.Point;
  const half = value.length / 2;
  if (half !== 48 && half !== 96)
    throw new Error("invalid compressed signature length, expected 96/192 bytes");
  const z1 = bytesToNumberBE(value.slice(0, half));
  const z2 = bytesToNumberBE(value.slice(half));
  if (infinity)
    return Point.ZERO;
  const x1 = Fp$1.create(z1 & bitMask(Fp$1.BITS));
  const x2 = Fp$1.create(z2);
  const x3 = Fp2.create({ c0: x2, c1: x1 });
  const y2 = Fp2.add(Fp2.pow(x3, _3n), bls12_381_CURVE_G2.b);
  let y3 = Fp2.sqrt(y2);
  if (!y3)
    throw new Error("Failed to find a square root");
  const { re: y0, im: y1 } = Fp2.reim(y3);
  const aflag1 = BigInt(sort);
  const isGreater = y1 > _0n$1 && y1 * _2n$2 / P2 !== aflag1;
  const is0 = y1 === _0n$1 && y0 * _2n$2 / P2 !== aflag1;
  if (isGreater || is0)
    y3 = Fp2.neg(y3);
  const point = Point.fromAffine({ x: x3, y: y3 });
  point.assertValidity();
  return point;
}
const bls12_381 = bls({
  // Fields
  fields: {
    Fp: Fp$1,
    Fp2,
    Fp6,
    Fp12,
    Fr: bls12_381_Fr
  },
  // G1: y² = x³ + 4
  G1: {
    ...bls12_381_CURVE_G1,
    Fp: Fp$1,
    htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    isTorsionFree: (c2, point) => {
      const beta = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
      const phi = new c2(Fp$1.mul(point.X, beta), point.Y, point.Z);
      const xP = point.multiplyUnsafe(BLS_X).negate();
      const u2P = xP.multiplyUnsafe(BLS_X);
      return u2P.equals(phi);
    },
    // Clear cofactor of G1
    // https://eprint.iacr.org/2019/403
    clearCofactor: (_c, point) => {
      return point.multiplyUnsafe(BLS_X).add(point);
    },
    mapToCurve: mapToG1,
    fromBytes: pointG1FromBytes,
    toBytes: pointG1ToBytes,
    ShortSignature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG1FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG1FromBytes(hex);
      },
      toBytes(point) {
        return signatureG1ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG1ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG1ToBytes(point));
      }
    }
  },
  G2: {
    ...bls12_381_CURVE_G2,
    Fp: Fp2,
    // https://datatracker.ietf.org/doc/html/rfc9380#name-clearing-the-cofactor
    // https://datatracker.ietf.org/doc/html/rfc9380#name-cofactor-clearing-for-bls12
    hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
    htfDefaults: { ...htfDefaults },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    mapToCurve: mapToG2,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    // Older version: https://eprint.iacr.org/2019/814.pdf
    isTorsionFree: (c2, P2) => {
      return P2.multiplyUnsafe(BLS_X).negate().equals(G2psi(c2, P2));
    },
    // Maps the point into the prime-order subgroup G2.
    // clear_cofactor_bls12381_g2 from RFC 9380.
    // https://eprint.iacr.org/2017/419.pdf
    // prettier-ignore
    clearCofactor: (c2, P2) => {
      const x2 = BLS_X;
      let t1 = P2.multiplyUnsafe(x2).negate();
      let t2 = G2psi(c2, P2);
      let t3 = P2.double();
      t3 = G2psi2(c2, t3);
      t3 = t3.subtract(t2);
      t2 = t1.add(t2);
      t2 = t2.multiplyUnsafe(x2).negate();
      t3 = t3.add(t2);
      t3 = t3.subtract(t1);
      const Q2 = t3.subtract(P2);
      return Q2;
    },
    fromBytes: pointG2FromBytes,
    toBytes: pointG2ToBytes,
    Signature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG2FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG2FromBytes(hex);
      },
      toBytes(point) {
        return signatureG2ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG2ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG2ToBytes(point));
      }
    }
  },
  params: {
    ateLoopSize: BLS_X,
    // The BLS parameter x for BLS12-381
    r: bls12_381_CURVE_G1.n,
    // order; z⁴ − z² + 1; CURVE.n from other curves
    xNegative: true,
    twistType: "multiplicative"
  },
  htfDefaults
});
const isogenyMapG2 = isogenyMap(Fp2, [
  // xNum
  [
    [
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
    ],
    [
      "0x0",
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
    ],
    [
      "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
      "0x0"
    ]
  ],
  // xDen
  [
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
    ],
    [
      "0xc",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ],
  // yNum
  [
    [
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
    ],
    [
      "0x0",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
    ],
    [
      "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
      "0x0"
    ]
  ],
  // yDen
  [
    [
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
    ],
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
    ],
    [
      "0x12",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ]
].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt)))));
const isogenyMapG1 = isogenyMap(Fp$1, [
  // xNum
  [
    "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
    "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
    "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
    "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
    "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
    "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
    "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
    "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
    "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
    "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
    "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
    "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
  ],
  // xDen
  [
    "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
    "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
    "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
    "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
    "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
    "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
    "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
    "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
    "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
    "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ],
  // yNum
  [
    "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
    "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
    "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
    "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
    "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
    "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
    "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
    "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
    "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
    "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
    "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
    "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
    "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
    "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
    "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
    "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
  ],
  // yDen
  [
    "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
    "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
    "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
    "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
    "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
    "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
    "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
    "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
    "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
    "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
    "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
    "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
    "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
    "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
    "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ]
].map((i) => i.map((j2) => BigInt(j2))));
const G1_SWU = mapToCurveSimpleSWU(Fp$1, {
  A: Fp$1.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
  B: Fp$1.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
  Z: Fp$1.create(BigInt(11))
});
const G2_SWU = mapToCurveSimpleSWU(Fp2, {
  A: Fp2.create({ c0: Fp$1.create(_0n$1), c1: Fp$1.create(BigInt(240)) }),
  // A' = 240 * I
  B: Fp2.create({ c0: Fp$1.create(BigInt(1012)), c1: Fp$1.create(BigInt(1012)) }),
  // B' = 1012 * (1 + I)
  Z: Fp2.create({ c0: Fp$1.create(BigInt(-2)), c1: Fp$1.create(BigInt(-1)) })
  // Z: -(2 + I)
});
function mapToG1(scalars) {
  const { x: x2, y: y2 } = G1_SWU(Fp$1.create(scalars[0]));
  return isogenyMapG1(x2, y2);
}
function mapToG2(scalars) {
  const { x: x2, y: y2 } = G2_SWU(Fp2.fromBigTuple(scalars));
  return isogenyMapG2(x2, y2);
}
function blsVerify(pk, sig, msg) {
  const primaryKey = typeof pk === "string" ? pk : bytesToHex(pk);
  const signature = typeof sig === "string" ? sig : bytesToHex(sig);
  const message = typeof msg === "string" ? msg : bytesToHex(msg);
  return bls12_381.verifyShortSignature(signature, message, primaryKey);
}
const MILLISECOND_TO_NANOSECONDS = BigInt(1e6);
const decodeLeb128 = (buf) => {
  return lebDecode(new PipeArrayBuffer(buf));
};
const decodeTime = (buf) => {
  const timestampNs = decodeLeb128(buf);
  const timestampMs = timestampNs / MILLISECOND_TO_NANOSECONDS;
  return new Date(Number(timestampMs));
};
const MINUTES_TO_MSEC = 60 * 1e3;
const HOURS_TO_MINUTES = 60;
const DAYS_TO_HOURS = 24;
const DAYS_TO_MINUTES = DAYS_TO_HOURS * HOURS_TO_MINUTES;
const DEFAULT_CERTIFICATE_MAX_AGE_IN_MINUTES = 5;
const DEFAULT_CERTIFICATE_MAX_MINUTES_IN_FUTURE = 5;
const DEFAULT_CERTIFICATE_DELEGATION_MAX_AGE_IN_MINUTES = 30 * DAYS_TO_MINUTES;
var NodeType;
(function(NodeType2) {
  NodeType2[NodeType2["Empty"] = 0] = "Empty";
  NodeType2[NodeType2["Fork"] = 1] = "Fork";
  NodeType2[NodeType2["Labeled"] = 2] = "Labeled";
  NodeType2[NodeType2["Leaf"] = 3] = "Leaf";
  NodeType2[NodeType2["Pruned"] = 4] = "Pruned";
})(NodeType || (NodeType = {}));
function isBufferGreaterThan(a2, b2) {
  for (let i = 0; i < a2.length; i++) {
    if (a2[i] > b2[i]) {
      return true;
    }
  }
  return false;
}
const _Certificate = class _Certificate {
  constructor(certificate, _rootKey, _canisterId, _blsVerify, _maxAgeInMinutes = DEFAULT_CERTIFICATE_MAX_AGE_IN_MINUTES, disableTimeVerification = false, agent) {
    __privateAdd(this, _disableTimeVerification, false);
    __privateAdd(this, _agent);
    this._rootKey = _rootKey;
    this._canisterId = _canisterId;
    this._blsVerify = _blsVerify;
    this._maxAgeInMinutes = _maxAgeInMinutes;
    __privateSet(this, _disableTimeVerification, disableTimeVerification);
    this.cert = decode(certificate);
    if (agent && "getTimeDiffMsecs" in agent && "hasSyncedTime" in agent && "syncTime" in agent) {
      __privateSet(this, _agent, agent);
    }
  }
  /**
   * Create a new instance of a certificate, automatically verifying it.
   * @param {CreateCertificateOptions} options {@link CreateCertificateOptions}
   * @throws if the verification of the certificate fails
   */
  static async create(options) {
    const cert = _Certificate.createUnverified(options);
    await cert.verify();
    return cert;
  }
  static createUnverified(options) {
    return new _Certificate(options.certificate, options.rootKey, options.canisterId, options.blsVerify ?? blsVerify, options.maxAgeInMinutes, options.disableTimeVerification, options.agent);
  }
  /**
   * Lookup a path in the certificate tree, using {@link lookup_path}.
   * @param path The path to lookup.
   * @returns The result of the lookup.
   */
  lookup_path(path) {
    return lookup_path(path, this.cert.tree);
  }
  /**
   * Lookup a subtree in the certificate tree, using {@link lookup_subtree}.
   * @param path The path to lookup.
   * @returns The result of the lookup.
   */
  lookup_subtree(path) {
    return lookup_subtree(path, this.cert.tree);
  }
  async verify() {
    var _a3, _b2;
    const rootHash = await reconstruct(this.cert.tree);
    const derKey = await this._checkDelegationAndGetKey(this.cert.delegation);
    const sig = this.cert.signature;
    const key = extractDER(derKey);
    const msg = concatBytes(domain_sep("ic-state-root"), rootHash);
    const lookupTime = lookupResultToBuffer(this.lookup_path(["time"]));
    if (!lookupTime) {
      throw ProtocolError.fromCode(new CertificateVerificationErrorCode("Certificate does not contain a time"));
    }
    if (!__privateGet(this, _disableTimeVerification)) {
      const timeDiffMsecs = ((_a3 = __privateGet(this, _agent)) == null ? void 0 : _a3.getTimeDiffMsecs()) ?? 0;
      const maxAgeInMsec = this._maxAgeInMinutes * MINUTES_TO_MSEC;
      const now = /* @__PURE__ */ new Date();
      const adjustedNow = now.getTime() + timeDiffMsecs;
      const earliestCertificateTime = adjustedNow - maxAgeInMsec;
      const latestCertificateTime = adjustedNow + DEFAULT_CERTIFICATE_MAX_MINUTES_IN_FUTURE * MINUTES_TO_MSEC;
      const certTime = decodeTime(lookupTime);
      const isCertificateTimePast = certTime.getTime() < earliestCertificateTime;
      const isCertificateTimeFuture = certTime.getTime() > latestCertificateTime;
      if ((isCertificateTimePast || isCertificateTimeFuture) && __privateGet(this, _agent) && !__privateGet(this, _agent).hasSyncedTime()) {
        await __privateGet(this, _agent).syncTime(this._canisterId);
        return await this.verify();
      }
      if (isCertificateTimePast) {
        throw TrustError.fromCode(new CertificateTimeErrorCode(this._maxAgeInMinutes, certTime, now, timeDiffMsecs, "past"));
      } else if (isCertificateTimeFuture) {
        if ((_b2 = __privateGet(this, _agent)) == null ? void 0 : _b2.hasSyncedTime()) {
          throw UnknownError.fromCode(new UnexpectedErrorCode("System time has been synced with the IC network, but certificate is still too far in the future."));
        }
        throw TrustError.fromCode(new CertificateTimeErrorCode(5, certTime, now, timeDiffMsecs, "future"));
      }
    }
    try {
      const sigVer = await this._blsVerify(key, sig, msg);
      if (!sigVer) {
        throw TrustError.fromCode(new CertificateVerificationErrorCode("Invalid signature"));
      }
    } catch (err) {
      throw TrustError.fromCode(new CertificateVerificationErrorCode("Signature verification failed", err));
    }
  }
  async _checkDelegationAndGetKey(d2) {
    if (!d2) {
      return this._rootKey;
    }
    const cert = _Certificate.createUnverified({
      certificate: d2.certificate,
      rootKey: this._rootKey,
      canisterId: this._canisterId,
      blsVerify: this._blsVerify,
      disableTimeVerification: __privateGet(this, _disableTimeVerification),
      maxAgeInMinutes: DEFAULT_CERTIFICATE_DELEGATION_MAX_AGE_IN_MINUTES,
      agent: __privateGet(this, _agent)
    });
    if (cert.cert.delegation) {
      throw ProtocolError.fromCode(new CertificateHasTooManyDelegationsErrorCode());
    }
    await cert.verify();
    const subnetIdBytes = d2.subnet_id;
    const subnetId = Principal$1.fromUint8Array(subnetIdBytes);
    const canisterInRange = check_canister_ranges({
      canisterId: this._canisterId,
      subnetId,
      tree: cert.cert.tree
    });
    if (!canisterInRange) {
      throw TrustError.fromCode(new CertificateNotAuthorizedErrorCode(this._canisterId, subnetId));
    }
    const publicKeyLookup = lookupResultToBuffer(cert.lookup_path(["subnet", subnetIdBytes, "public_key"]));
    if (!publicKeyLookup) {
      throw TrustError.fromCode(new MissingLookupValueErrorCode(`Could not find subnet key for subnet ID ${subnetId.toText()}`));
    }
    return publicKeyLookup;
  }
};
_disableTimeVerification = new WeakMap();
_agent = new WeakMap();
let Certificate = _Certificate;
const DER_PREFIX = hexToBytes("308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100");
const KEY_LENGTH = 96;
function extractDER(buf) {
  const expectedLength = DER_PREFIX.byteLength + KEY_LENGTH;
  if (buf.byteLength !== expectedLength) {
    throw ProtocolError.fromCode(new DerKeyLengthMismatchErrorCode(expectedLength, buf.byteLength));
  }
  const prefix = buf.slice(0, DER_PREFIX.byteLength);
  if (!uint8Equals(prefix, DER_PREFIX)) {
    throw ProtocolError.fromCode(new DerPrefixMismatchErrorCode(DER_PREFIX, prefix));
  }
  return buf.slice(DER_PREFIX.byteLength);
}
function lookupResultToBuffer(result) {
  if (result.status !== LookupPathStatus.Found) {
    return void 0;
  }
  if (result.value instanceof Uint8Array) {
    return result.value;
  }
  return void 0;
}
async function reconstruct(t2) {
  switch (t2[0]) {
    case NodeType.Empty:
      return sha256(domain_sep("ic-hashtree-empty"));
    case NodeType.Pruned:
      return t2[1];
    case NodeType.Leaf:
      return sha256(concatBytes(domain_sep("ic-hashtree-leaf"), t2[1]));
    case NodeType.Labeled:
      return sha256(concatBytes(domain_sep("ic-hashtree-labeled"), t2[1], await reconstruct(t2[2])));
    case NodeType.Fork:
      return sha256(concatBytes(domain_sep("ic-hashtree-fork"), await reconstruct(t2[1]), await reconstruct(t2[2])));
    default:
      throw UNREACHABLE_ERROR;
  }
}
function domain_sep(s2) {
  const len = new Uint8Array([s2.length]);
  const str = new TextEncoder().encode(s2);
  return concatBytes(len, str);
}
function pathToLabel(path) {
  return typeof path[0] === "string" ? utf8ToBytes(path[0]) : path[0];
}
var LookupPathStatus;
(function(LookupPathStatus2) {
  LookupPathStatus2["Unknown"] = "Unknown";
  LookupPathStatus2["Absent"] = "Absent";
  LookupPathStatus2["Found"] = "Found";
  LookupPathStatus2["Error"] = "Error";
})(LookupPathStatus || (LookupPathStatus = {}));
var LookupSubtreeStatus;
(function(LookupSubtreeStatus2) {
  LookupSubtreeStatus2["Absent"] = "Absent";
  LookupSubtreeStatus2["Unknown"] = "Unknown";
  LookupSubtreeStatus2["Found"] = "Found";
})(LookupSubtreeStatus || (LookupSubtreeStatus = {}));
var LookupLabelStatus;
(function(LookupLabelStatus2) {
  LookupLabelStatus2["Absent"] = "Absent";
  LookupLabelStatus2["Unknown"] = "Unknown";
  LookupLabelStatus2["Found"] = "Found";
  LookupLabelStatus2["Less"] = "Less";
  LookupLabelStatus2["Greater"] = "Greater";
})(LookupLabelStatus || (LookupLabelStatus = {}));
function lookup_path(path, tree) {
  if (path.length === 0) {
    switch (tree[0]) {
      case NodeType.Empty: {
        return {
          status: LookupPathStatus.Absent
        };
      }
      case NodeType.Leaf: {
        if (!tree[1]) {
          throw UnknownError.fromCode(new HashTreeDecodeErrorCode("Invalid tree structure for leaf"));
        }
        if (tree[1] instanceof Uint8Array) {
          return {
            status: LookupPathStatus.Found,
            value: tree[1].slice(tree[1].byteOffset, tree[1].byteLength + tree[1].byteOffset)
          };
        }
        throw UNREACHABLE_ERROR;
      }
      case NodeType.Pruned: {
        return {
          status: LookupPathStatus.Unknown
        };
      }
      case NodeType.Labeled:
      case NodeType.Fork: {
        return {
          status: LookupPathStatus.Error
        };
      }
      default: {
        throw UNREACHABLE_ERROR;
      }
    }
  }
  const label = pathToLabel(path);
  const lookupResult = find_label(label, tree);
  switch (lookupResult.status) {
    case LookupLabelStatus.Found: {
      return lookup_path(path.slice(1), lookupResult.value);
    }
    case LookupLabelStatus.Absent:
    case LookupLabelStatus.Greater:
    case LookupLabelStatus.Less: {
      return {
        status: LookupPathStatus.Absent
      };
    }
    case LookupLabelStatus.Unknown: {
      return {
        status: LookupPathStatus.Unknown
      };
    }
    default: {
      throw UNREACHABLE_ERROR;
    }
  }
}
function lookup_subtree(path, tree) {
  if (path.length === 0) {
    return {
      status: LookupSubtreeStatus.Found,
      value: tree
    };
  }
  const label = pathToLabel(path);
  const lookupResult = find_label(label, tree);
  switch (lookupResult.status) {
    case LookupLabelStatus.Found: {
      return lookup_subtree(path.slice(1), lookupResult.value);
    }
    case LookupLabelStatus.Unknown: {
      return {
        status: LookupSubtreeStatus.Unknown
      };
    }
    case LookupLabelStatus.Absent:
    case LookupLabelStatus.Greater:
    case LookupLabelStatus.Less: {
      return {
        status: LookupSubtreeStatus.Absent
      };
    }
    default: {
      throw UNREACHABLE_ERROR;
    }
  }
}
function flatten_forks(t2) {
  switch (t2[0]) {
    case NodeType.Empty:
      return [];
    case NodeType.Fork:
      return flatten_forks(t2[1]).concat(flatten_forks(t2[2]));
    default:
      return [t2];
  }
}
function find_label(label, tree) {
  switch (tree[0]) {
    case NodeType.Labeled:
      if (isBufferGreaterThan(label, tree[1])) {
        return {
          status: LookupLabelStatus.Greater
        };
      }
      if (uint8Equals(label, tree[1])) {
        return {
          status: LookupLabelStatus.Found,
          value: tree[2]
        };
      }
      return {
        status: LookupLabelStatus.Less
      };
    case NodeType.Fork: {
      const leftLookupResult = find_label(label, tree[1]);
      switch (leftLookupResult.status) {
        case LookupLabelStatus.Greater: {
          const rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LookupLabelStatus.Less) {
            return {
              status: LookupLabelStatus.Absent
            };
          }
          return rightLookupResult;
        }
        case LookupLabelStatus.Unknown: {
          const rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LookupLabelStatus.Less) {
            return {
              status: LookupLabelStatus.Unknown
            };
          }
          return rightLookupResult;
        }
        default: {
          return leftLookupResult;
        }
      }
    }
    case NodeType.Pruned:
      return {
        status: LookupLabelStatus.Unknown
      };
    default:
      return {
        status: LookupLabelStatus.Absent
      };
  }
}
function check_canister_ranges(params) {
  const { canisterId, subnetId, tree } = params;
  const rangeLookup = lookup_path(["subnet", subnetId.toUint8Array(), "canister_ranges"], tree);
  if (rangeLookup.status !== LookupPathStatus.Found) {
    throw ProtocolError.fromCode(new LookupErrorCode(`Could not find canister ranges for subnet ${subnetId.toText()}`, rangeLookup.status));
  }
  if (!(rangeLookup.value instanceof Uint8Array)) {
    throw ProtocolError.fromCode(new MalformedLookupFoundValueErrorCode(`Could not find canister ranges for subnet ${subnetId.toText()}`));
  }
  const ranges_arr = decode(rangeLookup.value);
  const ranges = ranges_arr.map((v2) => [
    Principal$1.fromUint8Array(v2[0]),
    Principal$1.fromUint8Array(v2[1])
  ]);
  const canisterInRange = ranges.some((r2) => r2[0].ltEq(canisterId) && r2[1].gtEq(canisterId));
  return canisterInRange;
}
const request = async (options) => {
  const { agent, paths, disableCertificateTimeVerification = false } = options;
  const canisterId = Principal$1.from(options.canisterId);
  const uniquePaths = [...new Set(paths)];
  const status = /* @__PURE__ */ new Map();
  const promises = uniquePaths.map((path, index2) => {
    const encodedPath = encodePath(path, canisterId);
    return (async () => {
      try {
        if (agent.rootKey === null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const rootKey = agent.rootKey;
        const response = await agent.readState(canisterId, {
          paths: [encodedPath]
        });
        const certificate = await Certificate.create({
          certificate: response.certificate,
          rootKey,
          canisterId,
          disableTimeVerification: disableCertificateTimeVerification,
          agent
        });
        const lookup = (cert, path3) => {
          if (path3 === "subnet") {
            const data2 = fetchNodeKeys(response.certificate, canisterId, rootKey);
            return {
              path: path3,
              data: data2
            };
          } else {
            return {
              path: path3,
              data: lookupResultToBuffer(cert.lookup_path(encodedPath))
            };
          }
        };
        const { path: path2, data } = lookup(certificate, uniquePaths[index2]);
        if (!data) {
          console.warn(`Expected to find result for path ${path2}, but instead found nothing.`);
          if (typeof path2 === "string") {
            status.set(path2, null);
          } else {
            status.set(path2.key, null);
          }
        } else {
          switch (path2) {
            case "time": {
              status.set(path2, decodeTime(data));
              break;
            }
            case "controllers": {
              status.set(path2, decodeControllers(data));
              break;
            }
            case "module_hash": {
              status.set(path2, bytesToHex(data));
              break;
            }
            case "subnet": {
              status.set(path2, data);
              break;
            }
            case "candid": {
              status.set(path2, new TextDecoder().decode(data));
              break;
            }
            default: {
              if (typeof path2 !== "string" && "key" in path2 && "path" in path2) {
                switch (path2.decodeStrategy) {
                  case "raw":
                    status.set(path2.key, data);
                    break;
                  case "leb128": {
                    status.set(path2.key, decodeLeb128(data));
                    break;
                  }
                  case "cbor": {
                    status.set(path2.key, decode(data));
                    break;
                  }
                  case "hex": {
                    status.set(path2.key, bytesToHex(data));
                    break;
                  }
                  case "utf-8": {
                    status.set(path2.key, new TextDecoder().decode(data));
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof AgentError && (error.hasCode(CertificateVerificationErrorCode) || error.hasCode(CertificateTimeErrorCode))) {
          throw error;
        }
        if (typeof path !== "string" && "key" in path && "path" in path) {
          status.set(path.key, null);
        } else {
          status.set(path, null);
        }
        console.group();
        console.warn(`Expected to find result for path ${path}, but instead found nothing.`);
        console.warn(error);
        console.groupEnd();
      }
    })();
  });
  await Promise.all(promises);
  return status;
};
const fetchNodeKeys = (certificate, canisterId, root_key) => {
  if (!canisterId._isPrincipal) {
    throw InputError.fromCode(new UnexpectedErrorCode("Invalid canisterId"));
  }
  const cert = decode(certificate);
  const tree = cert.tree;
  let delegation = cert.delegation;
  let subnetId;
  if (delegation && delegation.subnet_id) {
    subnetId = Principal$1.fromUint8Array(new Uint8Array(delegation.subnet_id));
  } else if (!delegation && typeof root_key !== "undefined") {
    subnetId = Principal$1.selfAuthenticating(new Uint8Array(root_key));
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new Uint8Array(0)
    };
  } else {
    subnetId = Principal$1.selfAuthenticating(Principal$1.fromText("tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe").toUint8Array());
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new Uint8Array(0)
    };
  }
  const canisterInRange = check_canister_ranges({ canisterId, subnetId, tree });
  if (!canisterInRange) {
    throw TrustError.fromCode(new CertificateNotAuthorizedErrorCode(canisterId, subnetId));
  }
  const subnetLookupResult = lookup_subtree(["subnet", delegation.subnet_id, "node"], tree);
  if (subnetLookupResult.status !== LookupSubtreeStatus.Found) {
    throw ProtocolError.fromCode(new LookupErrorCode("Node not found", subnetLookupResult.status));
  }
  if (subnetLookupResult.value instanceof Uint8Array) {
    throw UnknownError.fromCode(new HashTreeDecodeErrorCode("Invalid node tree"));
  }
  const nodeForks = flatten_forks(subnetLookupResult.value);
  const nodeKeys = /* @__PURE__ */ new Map();
  nodeForks.forEach((fork) => {
    const node_id = Principal$1.from(fork[1]).toText();
    const publicKeyLookupResult = lookup_path(["public_key"], fork[2]);
    if (publicKeyLookupResult.status !== LookupPathStatus.Found) {
      throw ProtocolError.fromCode(new LookupErrorCode("Public key not found", publicKeyLookupResult.status));
    }
    const derEncodedPublicKey = publicKeyLookupResult.value;
    if (derEncodedPublicKey.byteLength !== 44) {
      throw ProtocolError.fromCode(new DerKeyLengthMismatchErrorCode(44, derEncodedPublicKey.byteLength));
    } else {
      nodeKeys.set(node_id, derEncodedPublicKey);
    }
  });
  return {
    subnetId: Principal$1.fromUint8Array(new Uint8Array(delegation.subnet_id)).toText(),
    nodeKeys
  };
};
const encodePath = (path, canisterId) => {
  const canisterUint8Array = canisterId.toUint8Array();
  switch (path) {
    case "time":
      return [utf8ToBytes("time")];
    case "controllers":
      return [utf8ToBytes("canister"), canisterUint8Array, utf8ToBytes("controllers")];
    case "module_hash":
      return [utf8ToBytes("canister"), canisterUint8Array, utf8ToBytes("module_hash")];
    case "subnet":
      return [utf8ToBytes("subnet")];
    case "candid":
      return [
        utf8ToBytes("canister"),
        canisterUint8Array,
        utf8ToBytes("metadata"),
        utf8ToBytes("candid:service")
      ];
    default: {
      if ("key" in path && "path" in path) {
        if (typeof path["path"] === "string" || path["path"] instanceof Uint8Array) {
          const metaPath = path.path;
          const encoded = typeof metaPath === "string" ? utf8ToBytes(metaPath) : metaPath;
          return [utf8ToBytes("canister"), canisterUint8Array, utf8ToBytes("metadata"), encoded];
        } else {
          return path["path"];
        }
      }
    }
  }
  throw UnknownError.fromCode(new UnexpectedErrorCode(`Error while encoding your path for canister status. Please ensure that your path ${path} was formatted correctly.`));
};
const decodeControllers = (buf) => {
  const controllersRaw = decode(buf);
  return controllersRaw.map((buf2) => {
    return Principal$1.fromUint8Array(buf2);
  });
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n = BigInt(0), _1n$1 = BigInt(1), _2n$1 = BigInt(2), _8n$1 = BigInt(8);
function isEdValidXY(Fp3, CURVE, x2, y2) {
  const x22 = Fp3.sqr(x2);
  const y22 = Fp3.sqr(y2);
  const left = Fp3.add(Fp3.mul(CURVE.a, x22), y22);
  const right = Fp3.add(Fp3.ONE, Fp3.mul(CURVE.d, Fp3.mul(x22, y22)));
  return Fp3.eql(left, right);
}
function edwards(params, extraOpts = {}) {
  const validated = _createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor } = CURVE;
  _validateObject(extraOpts, {}, { uvRatio: "function" });
  const MASK = _2n$1 << BigInt(Fn.BYTES * 8) - _1n$1;
  const modP = (n) => Fp3.create(n);
  const uvRatio2 = extraOpts.uvRatio || ((u, v2) => {
    try {
      return { isValid: true, value: Fp3.sqrt(Fp3.div(u, v2)) };
    } catch (e) {
      return { isValid: false, value: _0n };
    }
  });
  if (!isEdValidXY(Fp3, CURVE, CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  function acoord(title, n, banZero = false) {
    const min = banZero ? _1n$1 : _0n;
    aInRange("coordinate " + title, n, min, MASK);
    return n;
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized((p2, iz) => {
    const { X: X2, Y: Y2, Z: Z2 } = p2;
    const is0 = p2.is0();
    if (iz == null)
      iz = is0 ? _8n$1 : Fp3.inv(Z2);
    const x2 = modP(X2 * iz);
    const y2 = modP(Y2 * iz);
    const zz = Fp3.mul(Z2, iz);
    if (is0)
      return { x: _0n, y: _1n$1 };
    if (zz !== _1n$1)
      throw new Error("invZ was invalid");
    return { x: x2, y: y2 };
  });
  const assertValidMemo = memoized((p2) => {
    const { a: a2, d: d2 } = CURVE;
    if (p2.is0())
      throw new Error("bad point: ZERO");
    const { X: X2, Y: Y2, Z: Z2, T: T2 } = p2;
    const X22 = modP(X2 * X2);
    const Y22 = modP(Y2 * Y2);
    const Z22 = modP(Z2 * Z2);
    const Z4 = modP(Z22 * Z22);
    const aX2 = modP(X22 * a2);
    const left = modP(Z22 * modP(aX2 + Y22));
    const right = modP(Z4 + modP(d2 * modP(X22 * Y22)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X2 * Y2);
    const ZT = modP(Z2 * T2);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(X2, Y2, Z2, T2) {
      this.X = acoord("x", X2);
      this.Y = acoord("y", Y2);
      this.Z = acoord("z", Z2, true);
      this.T = acoord("t", T2);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    static fromAffine(p2) {
      if (p2 instanceof Point)
        throw new Error("extended point not allowed");
      const { x: x2, y: y2 } = p2 || {};
      acoord("x", x2);
      acoord("y", y2);
      return new Point(x2, y2, _1n$1, modP(x2 * y2));
    }
    // Uses algo from RFC8032 5.1.3.
    static fromBytes(bytes, zip215 = false) {
      const len = Fp3.BYTES;
      const { a: a2, d: d2 } = CURVE;
      bytes = copyBytes(_abytes2(bytes, len, "point"));
      _abool2(zip215, "zip215");
      const normed = copyBytes(bytes);
      const lastByte = bytes[len - 1];
      normed[len - 1] = lastByte & -129;
      const y2 = bytesToNumberLE(normed);
      const max = zip215 ? MASK : Fp3.ORDER;
      aInRange("point.y", y2, _0n, max);
      const y22 = modP(y2 * y2);
      const u = modP(y22 - _1n$1);
      const v2 = modP(d2 * y22 - a2);
      let { isValid, value: x2 } = uvRatio2(u, v2);
      if (!isValid)
        throw new Error("bad point: invalid y coordinate");
      const isXOdd = (x2 & _1n$1) === _1n$1;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x2 === _0n && isLastByteOdd)
        throw new Error("bad point: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x2 = modP(-x2);
      return Point.fromAffine({ x: x2, y: y2 });
    }
    static fromHex(bytes, zip215 = false) {
      return Point.fromBytes(ensureBytes("point", bytes), zip215);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_2n$1);
      return this;
    }
    // Useful in fromAffine() - not for fromBytes(), which always created valid points.
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a: a2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const A2 = modP(X1 * X1);
      const B2 = modP(Y1 * Y1);
      const C2 = modP(_2n$1 * modP(Z1 * Z1));
      const D = modP(a2 * A2);
      const x1y1 = X1 + Y1;
      const E2 = modP(modP(x1y1 * x1y1) - A2 - B2);
      const G2 = D + B2;
      const F2 = G2 - C2;
      const H2 = D - B2;
      const X3 = modP(E2 * F2);
      const Y3 = modP(G2 * H2);
      const T3 = modP(E2 * H2);
      const Z3 = modP(F2 * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a: a2, d: d2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
      const { X: X2, Y: Y2, Z: Z2, T: T2 } = other;
      const A2 = modP(X1 * X2);
      const B2 = modP(Y1 * Y2);
      const C2 = modP(T1 * d2 * T2);
      const D = modP(Z1 * Z2);
      const E2 = modP((X1 + Y1) * (X2 + Y2) - A2 - B2);
      const F2 = D - C2;
      const G2 = D + C2;
      const H2 = modP(B2 - a2 * A2);
      const X3 = modP(E2 * F2);
      const Y3 = modP(G2 * H2);
      const T3 = modP(E2 * H2);
      const Z3 = modP(F2 * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    // Constant-time multiplication.
    multiply(scalar) {
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: p2, f } = wnaf.cached(this, scalar, (p3) => normalizeZ(Point, p3));
      return normalizeZ(Point, [p2, f])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      if (!Fn.isValid(scalar))
        throw new Error("invalid scalar: expected 0 <= sc < curve.n");
      if (scalar === _0n)
        return Point.ZERO;
      if (this.is0() || scalar === _1n$1)
        return this;
      return wnaf.unsafe(this, scalar, (p2) => normalizeZ(Point, p2), acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafe(this, CURVE.n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    clearCofactor() {
      if (cofactor === _1n$1)
        return this;
      return this.multiplyUnsafe(cofactor);
    }
    toBytes() {
      const { x: x2, y: y2 } = this.toAffine();
      const bytes = Fp3.toBytes(y2);
      bytes[bytes.length - 1] |= x2 & _1n$1 ? 128 : 0;
      return bytes;
    }
    toHex() {
      return bytesToHex(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n$1, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n, _1n$1, _1n$1, _0n);
  Point.Fp = Fp3;
  Point.Fn = Fn;
  const wnaf = new wNAF(Point, Fn.BITS);
  Point.BASE.precompute(8);
  return Point;
}
function eddsa(Point, cHash, eddsaOpts = {}) {
  if (typeof cHash !== "function")
    throw new Error('"hash" function param is required');
  _validateObject(eddsaOpts, {}, {
    adjustScalarBytes: "function",
    randomBytes: "function",
    domain: "function",
    prehash: "function",
    mapToCurve: "function"
  });
  const { prehash } = eddsaOpts;
  const { BASE, Fp: Fp3, Fn } = Point;
  const randomBytes$1 = eddsaOpts.randomBytes || randomBytes;
  const adjustScalarBytes2 = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
  const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
    _abool2(phflag, "phflag");
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function modN_LE(hash) {
    return Fn.create(bytesToNumberLE(hash));
  }
  function getPrivateScalar(key) {
    const len = lengths.secretKey;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(secretKey) {
    const { head, prefix, scalar } = getPrivateScalar(secretKey);
    const point = BASE.multiply(scalar);
    const pointBytes = point.toBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(secretKey) {
    return getExtendedPublicKey(secretKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign(msg, secretKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
    const r2 = hashDomainToScalar(options.context, prefix, msg);
    const R2 = BASE.multiply(r2).toBytes();
    const k2 = hashDomainToScalar(options.context, R2, pointBytes, msg);
    const s2 = Fn.create(r2 + k2 * scalar);
    if (!Fn.isValid(s2))
      throw new Error("sign failed: invalid s");
    const rs = concatBytes(R2, Fn.toBytes(s2));
    return _abytes2(rs, lengths.signature, "result");
  }
  const verifyOpts = { zip215: true };
  function verify(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = lengths.signature;
    sig = ensureBytes("signature", sig, len);
    msg = ensureBytes("message", msg);
    publicKey = ensureBytes("publicKey", publicKey, lengths.publicKey);
    if (zip215 !== void 0)
      _abool2(zip215, "zip215");
    if (prehash)
      msg = prehash(msg);
    const mid = len / 2;
    const r2 = sig.subarray(0, mid);
    const s2 = bytesToNumberLE(sig.subarray(mid, len));
    let A2, R2, SB;
    try {
      A2 = Point.fromBytes(publicKey, zip215);
      R2 = Point.fromBytes(r2, zip215);
      SB = BASE.multiplyUnsafe(s2);
    } catch (error) {
      return false;
    }
    if (!zip215 && A2.isSmallOrder())
      return false;
    const k2 = hashDomainToScalar(context, R2.toBytes(), A2.toBytes(), msg);
    const RkA = R2.add(A2.multiplyUnsafe(k2));
    return RkA.subtract(SB).clearCofactor().is0();
  }
  const _size = Fp3.BYTES;
  const lengths = {
    secretKey: _size,
    publicKey: _size,
    signature: 2 * _size,
    seed: _size
  };
  function randomSecretKey(seed = randomBytes$1(lengths.seed)) {
    return _abytes2(seed, lengths.seed, "seed");
  }
  function keygen(seed) {
    const secretKey = utils.randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey(secretKey) };
  }
  function isValidSecretKey(key) {
    return isBytes(key) && key.length === Fn.BYTES;
  }
  function isValidPublicKey(key, zip215) {
    try {
      return !!Point.fromBytes(key, zip215);
    } catch (error) {
      return false;
    }
  }
  const utils = {
    getExtendedPublicKey,
    randomSecretKey,
    isValidSecretKey,
    isValidPublicKey,
    /**
     * Converts ed public key to x public key. Uses formula:
     * - ed25519:
     *   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
     *   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
     * - ed448:
     *   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
     *   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
     */
    toMontgomery(publicKey) {
      const { y: y2 } = Point.fromBytes(publicKey);
      const size = lengths.publicKey;
      const is25519 = size === 32;
      if (!is25519 && size !== 57)
        throw new Error("only defined for 25519 and 448");
      const u = is25519 ? Fp3.div(_1n$1 + y2, _1n$1 - y2) : Fp3.div(y2 - _1n$1, y2 + _1n$1);
      return Fp3.toBytes(u);
    },
    toMontgomerySecret(secretKey) {
      const size = lengths.secretKey;
      _abytes2(secretKey, size);
      const hashed = cHash(secretKey.subarray(0, size));
      return adjustScalarBytes2(hashed).subarray(0, size);
    },
    /** @deprecated */
    randomPrivateKey: randomSecretKey,
    /** @deprecated */
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({
    keygen,
    getPublicKey,
    sign,
    verify,
    utils,
    Point,
    lengths
  });
}
function _eddsa_legacy_opts_to_new(c2) {
  const CURVE = {
    a: c2.a,
    d: c2.d,
    p: c2.Fp.ORDER,
    n: c2.n,
    h: c2.h,
    Gx: c2.Gx,
    Gy: c2.Gy
  };
  const Fp3 = c2.Fp;
  const Fn = Field(CURVE.n, c2.nBitLength, true);
  const curveOpts = { Fp: Fp3, Fn, uvRatio: c2.uvRatio };
  const eddsaOpts = {
    randomBytes: c2.randomBytes,
    adjustScalarBytes: c2.adjustScalarBytes,
    domain: c2.domain,
    prehash: c2.prehash,
    mapToCurve: c2.mapToCurve
  };
  return { CURVE, curveOpts, hash: c2.hash, eddsaOpts };
}
function _eddsa_new_output_to_legacy(c2, eddsa2) {
  const Point = eddsa2.Point;
  const legacy = Object.assign({}, eddsa2, {
    ExtendedPoint: Point,
    CURVE: c2,
    nBitLength: Point.Fn.BITS,
    nByteLength: Point.Fn.BYTES
  });
  return legacy;
}
function twistedEdwards(c2) {
  const { CURVE, curveOpts, hash, eddsaOpts } = _eddsa_legacy_opts_to_new(c2);
  const Point = edwards(CURVE, curveOpts);
  const EDDSA = eddsa(Point, hash, eddsaOpts);
  return _eddsa_new_output_to_legacy(c2, EDDSA);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _1n = BigInt(1), _2n = BigInt(2);
BigInt(3);
const _5n = BigInt(5), _8n = BigInt(8);
const ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
const ed25519_CURVE = /* @__PURE__ */ (() => ({
  p: ed25519_CURVE_p,
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: _8n,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
}))();
function ed25519_pow_2_252_3(x2) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P2 = ed25519_CURVE_p;
  const x22 = x2 * x2 % P2;
  const b2 = x22 * x2 % P2;
  const b4 = pow2(b2, _2n, P2) * b2 % P2;
  const b5 = pow2(b4, _1n, P2) * x2 % P2;
  const b10 = pow2(b5, _5n, P2) * b5 % P2;
  const b20 = pow2(b10, _10n, P2) * b10 % P2;
  const b40 = pow2(b20, _20n, P2) * b20 % P2;
  const b80 = pow2(b40, _40n, P2) * b40 % P2;
  const b160 = pow2(b80, _80n, P2) * b80 % P2;
  const b240 = pow2(b160, _80n, P2) * b80 % P2;
  const b250 = pow2(b240, _10n, P2) * b10 % P2;
  const pow_p_5_8 = pow2(b250, _2n, P2) * x2 % P2;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
const ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v2) {
  const P2 = ed25519_CURVE_p;
  const v3 = mod(v2 * v2 * v2, P2);
  const v7 = mod(v3 * v3 * v2, P2);
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x2 = mod(u * v3 * pow, P2);
  const vx2 = mod(v2 * x2 * x2, P2);
  const root1 = x2;
  const root2 = mod(x2 * ED25519_SQRT_M1, P2);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P2);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P2);
  if (useRoot1)
    x2 = root1;
  if (useRoot2 || noRoot)
    x2 = root2;
  if (isNegativeLE(x2, P2))
    x2 = mod(-x2, P2);
  return { isValid: useRoot1 || useRoot2, value: x2 };
}
const Fp = /* @__PURE__ */ (() => Field(ed25519_CURVE.p, { isLE: true }))();
const ed25519Defaults = /* @__PURE__ */ (() => ({
  ...ed25519_CURVE,
  Fp,
  hash: sha512,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
const ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var _a, _b;
class ExpirableMap {
  /**
   * Create a new ExpirableMap.
   * @param {ExpirableMapOptions<any, any>} options - options for the map.
   * @param {Iterable<[any, any]>} options.source - an optional source of entries to initialize the map with.
   * @param {number} options.expirationTime - the time in milliseconds after which entries will expire.
   */
  constructor(options = {}) {
    // Internals
    __privateAdd(this, _inner);
    __privateAdd(this, _expirationTime);
    this[_a] = this.entries.bind(this);
    this[_b] = "ExpirableMap";
    const { source = [], expirationTime = 10 * 60 * 1e3 } = options;
    const currentTime = Date.now();
    __privateSet(this, _inner, new Map([...source].map(([key, value]) => [key, { value, timestamp: currentTime }])));
    __privateSet(this, _expirationTime, expirationTime);
  }
  /**
   * Prune removes all expired entries.
   */
  prune() {
    const currentTime = Date.now();
    for (const [key, entry] of __privateGet(this, _inner).entries()) {
      if (currentTime - entry.timestamp > __privateGet(this, _expirationTime)) {
        __privateGet(this, _inner).delete(key);
      }
    }
    return this;
  }
  // Implementing the Map interface
  /**
   * Set the value for the given key. Prunes expired entries.
   * @param key for the entry
   * @param value of the entry
   * @returns this
   */
  set(key, value) {
    this.prune();
    const entry = {
      value,
      timestamp: Date.now()
    };
    __privateGet(this, _inner).set(key, entry);
    return this;
  }
  /**
   * Get the value associated with the key, if it exists and has not expired.
   * @param key K
   * @returns the value associated with the key, or undefined if the key is not present or has expired.
   */
  get(key) {
    const entry = __privateGet(this, _inner).get(key);
    if (entry === void 0) {
      return void 0;
    }
    if (Date.now() - entry.timestamp > __privateGet(this, _expirationTime)) {
      __privateGet(this, _inner).delete(key);
      return void 0;
    }
    return entry.value;
  }
  /**
   * Clear all entries.
   */
  clear() {
    __privateGet(this, _inner).clear();
  }
  /**
   * Entries returns the entries of the map, without the expiration time.
   * @returns an iterator over the entries of the map.
   */
  entries() {
    const iterator = __privateGet(this, _inner).entries();
    const generator = function* () {
      for (const [key, value] of iterator) {
        yield [key, value.value];
      }
      return void 0;
    };
    return generator();
  }
  /**
   * Values returns the values of the map, without the expiration time.
   * @returns an iterator over the values of the map.
   */
  values() {
    const iterator = __privateGet(this, _inner).values();
    const generator = function* () {
      for (const value of iterator) {
        yield value.value;
      }
      return void 0;
    };
    return generator();
  }
  /**
   * Keys returns the keys of the map
   * @returns an iterator over the keys of the map.
   */
  keys() {
    return __privateGet(this, _inner).keys();
  }
  /**
   * forEach calls the callbackfn on each entry of the map.
   * @param callbackfn to call on each entry
   * @param thisArg to use as this when calling the callbackfn
   */
  forEach(callbackfn, thisArg) {
    for (const [key, value] of __privateGet(this, _inner).entries()) {
      callbackfn.call(thisArg, value.value, key, this);
    }
  }
  /**
   * has returns true if the key exists and has not expired.
   * @param key K
   * @returns true if the key exists and has not expired.
   */
  has(key) {
    return __privateGet(this, _inner).has(key);
  }
  /**
   * delete the entry for the given key.
   * @param key K
   * @returns true if the key existed and has been deleted.
   */
  delete(key) {
    return __privateGet(this, _inner).delete(key);
  }
  /**
   * get size of the map.
   * @returns the size of the map.
   */
  get size() {
    return __privateGet(this, _inner).size;
  }
}
_inner = new WeakMap();
_expirationTime = new WeakMap();
_a = Symbol.iterator, _b = Symbol.toStringTag;
const encodeLenBytes = (len) => {
  if (len <= 127) {
    return 1;
  } else if (len <= 255) {
    return 2;
  } else if (len <= 65535) {
    return 3;
  } else if (len <= 16777215) {
    return 4;
  } else {
    throw InputError.fromCode(new DerEncodeErrorCode("Length too long (> 4 bytes)"));
  }
};
const encodeLen = (buf, offset, len) => {
  if (len <= 127) {
    buf[offset] = len;
    return 1;
  } else if (len <= 255) {
    buf[offset] = 129;
    buf[offset + 1] = len;
    return 2;
  } else if (len <= 65535) {
    buf[offset] = 130;
    buf[offset + 1] = len >> 8;
    buf[offset + 2] = len;
    return 3;
  } else if (len <= 16777215) {
    buf[offset] = 131;
    buf[offset + 1] = len >> 16;
    buf[offset + 2] = len >> 8;
    buf[offset + 3] = len;
    return 4;
  } else {
    throw InputError.fromCode(new DerEncodeErrorCode("Length too long (> 4 bytes)"));
  }
};
const decodeLenBytes = (buf, offset) => {
  if (buf[offset] < 128)
    return 1;
  if (buf[offset] === 128)
    throw InputError.fromCode(new DerDecodeErrorCode("Invalid length 0"));
  if (buf[offset] === 129)
    return 2;
  if (buf[offset] === 130)
    return 3;
  if (buf[offset] === 131)
    return 4;
  throw InputError.fromCode(new DerDecodeErrorCode("Length too long (> 4 bytes)"));
};
const decodeLen = (buf, offset) => {
  const lenBytes = decodeLenBytes(buf, offset);
  if (lenBytes === 1)
    return buf[offset];
  else if (lenBytes === 2)
    return buf[offset + 1];
  else if (lenBytes === 3)
    return (buf[offset + 1] << 8) + buf[offset + 2];
  else if (lenBytes === 4)
    return (buf[offset + 1] << 16) + (buf[offset + 2] << 8) + buf[offset + 3];
  throw InputError.fromCode(new DerDecodeErrorCode("Length too long (> 4 bytes)"));
};
Uint8Array.from([
  ...[48, 12],
  // SEQUENCE
  ...[6, 10],
  // OID with 10 bytes
  ...[43, 6, 1, 4, 1, 131, 184, 67, 1, 1]
  // DER encoded COSE
]);
const ED25519_OID = Uint8Array.from([
  ...[48, 5],
  // SEQUENCE
  ...[6, 3],
  // OID with 3 bytes
  ...[43, 101, 112]
  // id-Ed25519 OID
]);
Uint8Array.from([
  ...[48, 16],
  // SEQUENCE
  ...[6, 7],
  // OID with 7 bytes
  ...[42, 134, 72, 206, 61, 2, 1],
  // OID ECDSA
  ...[6, 5],
  // OID with 5 bytes
  ...[43, 129, 4, 0, 10]
  // OID secp256k1
]);
Uint8Array.from([
  ...[48, 29],
  // SEQUENCE, length 29 bytes
  // Algorithm OID
  ...[6, 13],
  ...[43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1],
  // Curve OID
  ...[6, 12],
  ...[43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1]
]);
function wrapDER(payload, oid) {
  const bitStringHeaderLength = 2 + encodeLenBytes(payload.byteLength + 1);
  const len = oid.byteLength + bitStringHeaderLength + payload.byteLength;
  let offset = 0;
  const buf = new Uint8Array(1 + encodeLenBytes(len) + len);
  buf[offset++] = 48;
  offset += encodeLen(buf, offset, len);
  buf.set(oid, offset);
  offset += oid.byteLength;
  buf[offset++] = 3;
  offset += encodeLen(buf, offset, payload.byteLength + 1);
  buf[offset++] = 0;
  buf.set(new Uint8Array(payload), offset);
  return buf;
}
const unwrapDER = (derEncoded, oid) => {
  let offset = 0;
  const expect = (n, msg) => {
    if (buf[offset++] !== n) {
      throw InputError.fromCode(new DerDecodeErrorCode(`Expected ${msg} at offset ${offset}`));
    }
  };
  const buf = new Uint8Array(derEncoded);
  expect(48, "sequence");
  offset += decodeLenBytes(buf, offset);
  if (!uint8Equals(buf.slice(offset, offset + oid.byteLength), oid)) {
    throw InputError.fromCode(new DerDecodeErrorCode("Not the expected OID."));
  }
  offset += oid.byteLength;
  expect(3, "bit string");
  const payloadLen = decodeLen(buf, offset) - 1;
  offset += decodeLenBytes(buf, offset);
  expect(0, "0 padding");
  const result = buf.slice(offset);
  if (payloadLen !== result.length) {
    throw InputError.fromCode(new DerDecodeLengthMismatchErrorCode(payloadLen, result.length));
  }
  return result;
};
let Ed25519PublicKey$1 = (_a2 = class {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    __privateAdd(this, _rawKey);
    __privateAdd(this, _derKey);
    if (key.byteLength !== _a2.RAW_KEY_LENGTH) {
      throw InputError.fromCode(new DerDecodeErrorCode("An Ed25519 public key must be exactly 32 bytes long"));
    }
    __privateSet(this, _rawKey, key);
    __privateSet(this, _derKey, _a2.derEncode(key));
  }
  static from(key) {
    return this.fromDer(key.toDer());
  }
  static fromRaw(rawKey) {
    return new _a2(rawKey);
  }
  static fromDer(derKey) {
    return new _a2(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    return wrapDER(publicKey, ED25519_OID);
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw InputError.fromCode(new DerDecodeErrorCode("An Ed25519 public key must be exactly 32 bytes long"));
    }
    return unwrapped;
  }
  get rawKey() {
    return __privateGet(this, _rawKey);
  }
  get derKey() {
    return __privateGet(this, _derKey);
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
}, _rawKey = new WeakMap(), _derKey = new WeakMap(), _a2.RAW_KEY_LENGTH = 32, _a2);
class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data, ...rest) {
    this.observers.forEach((observer) => observer(data, ...rest));
  }
}
class ObservableLog extends Observable {
  constructor() {
    super();
  }
  print(message, ...rest) {
    this.notify({ message, level: "info" }, ...rest);
  }
  warn(message, ...rest) {
    this.notify({ message, level: "warn" }, ...rest);
  }
  error(message, error, ...rest) {
    this.notify({ message, level: "error", error }, ...rest);
  }
}
const RANDOMIZATION_FACTOR = 0.5;
const MULTIPLIER = 1.5;
const INITIAL_INTERVAL_MSEC = 500;
const MAX_INTERVAL_MSEC = 6e4;
const MAX_ELAPSED_TIME_MSEC = 9e5;
const MAX_ITERATIONS = 10;
const _ExponentialBackoff = class _ExponentialBackoff {
  constructor(options = _ExponentialBackoff.default) {
    __privateAdd(this, _currentInterval);
    __privateAdd(this, _randomizationFactor);
    __privateAdd(this, _multiplier);
    __privateAdd(this, _maxInterval);
    __privateAdd(this, _startTime);
    __privateAdd(this, _maxElapsedTime);
    __privateAdd(this, _maxIterations);
    __privateAdd(this, _date);
    __privateAdd(this, _count, 0);
    const { initialInterval = INITIAL_INTERVAL_MSEC, randomizationFactor = RANDOMIZATION_FACTOR, multiplier = MULTIPLIER, maxInterval = MAX_INTERVAL_MSEC, maxElapsedTime = MAX_ELAPSED_TIME_MSEC, maxIterations = MAX_ITERATIONS, date = Date } = options;
    __privateSet(this, _currentInterval, initialInterval);
    __privateSet(this, _randomizationFactor, randomizationFactor);
    __privateSet(this, _multiplier, multiplier);
    __privateSet(this, _maxInterval, maxInterval);
    __privateSet(this, _date, date);
    __privateSet(this, _startTime, date.now());
    __privateSet(this, _maxElapsedTime, maxElapsedTime);
    __privateSet(this, _maxIterations, maxIterations);
  }
  get ellapsedTimeInMsec() {
    return __privateGet(this, _date).now() - __privateGet(this, _startTime);
  }
  get currentInterval() {
    return __privateGet(this, _currentInterval);
  }
  get count() {
    return __privateGet(this, _count);
  }
  get randomValueFromInterval() {
    const delta = __privateGet(this, _randomizationFactor) * __privateGet(this, _currentInterval);
    const min = __privateGet(this, _currentInterval) - delta;
    const max = __privateGet(this, _currentInterval) + delta;
    return Math.random() * (max - min) + min;
  }
  incrementCurrentInterval() {
    __privateSet(this, _currentInterval, Math.min(__privateGet(this, _currentInterval) * __privateGet(this, _multiplier), __privateGet(this, _maxInterval)));
    __privateWrapper(this, _count)._++;
    return __privateGet(this, _currentInterval);
  }
  next() {
    if (this.ellapsedTimeInMsec >= __privateGet(this, _maxElapsedTime) || __privateGet(this, _count) >= __privateGet(this, _maxIterations)) {
      return null;
    } else {
      this.incrementCurrentInterval();
      return this.randomValueFromInterval;
    }
  }
};
_currentInterval = new WeakMap();
_randomizationFactor = new WeakMap();
_multiplier = new WeakMap();
_maxInterval = new WeakMap();
_startTime = new WeakMap();
_maxElapsedTime = new WeakMap();
_maxIterations = new WeakMap();
_date = new WeakMap();
_count = new WeakMap();
_ExponentialBackoff.default = {
  initialInterval: INITIAL_INTERVAL_MSEC,
  randomizationFactor: RANDOMIZATION_FACTOR,
  multiplier: MULTIPLIER,
  maxInterval: MAX_INTERVAL_MSEC,
  // 1 minute
  maxElapsedTime: MAX_ELAPSED_TIME_MSEC,
  maxIterations: MAX_ITERATIONS,
  date: Date
};
let ExponentialBackoff = _ExponentialBackoff;
var RequestStatusResponseStatus;
(function(RequestStatusResponseStatus2) {
  RequestStatusResponseStatus2["Received"] = "received";
  RequestStatusResponseStatus2["Processing"] = "processing";
  RequestStatusResponseStatus2["Replied"] = "replied";
  RequestStatusResponseStatus2["Rejected"] = "rejected";
  RequestStatusResponseStatus2["Unknown"] = "unknown";
  RequestStatusResponseStatus2["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
const MINUTE_TO_MSECS = 60 * 1e3;
const MSECS_TO_NANOSECONDS = 1e6;
const DEFAULT_TIME_DIFF_MSECS = 0;
const IC_ROOT_KEY = "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae";
const IC0_DOMAIN = "ic0.app";
const IC0_SUB_DOMAIN = ".ic0.app";
const ICP0_DOMAIN = "icp0.io";
const ICP0_SUB_DOMAIN = ".icp0.io";
const ICP_API_DOMAIN = "icp-api.io";
const ICP_API_SUB_DOMAIN = ".icp-api.io";
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_ACCEPTED = 202;
const HTTP_STATUS_NOT_FOUND = 404;
function getDefaultFetch() {
  let defaultFetch;
  if (typeof window !== "undefined") {
    if (window.fetch) {
      defaultFetch = window.fetch.bind(window);
    } else {
      throw ExternalError.fromCode(new HttpDefaultFetchErrorCode("Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present."));
    }
  } else if (typeof global !== "undefined") {
    if (global.fetch) {
      defaultFetch = global.fetch.bind(global);
    } else {
      throw ExternalError.fromCode(new HttpDefaultFetchErrorCode("Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available."));
    }
  } else if (typeof self !== "undefined") {
    if (self.fetch) {
      defaultFetch = self.fetch.bind(self);
    }
  }
  if (defaultFetch) {
    return defaultFetch;
  }
  throw ExternalError.fromCode(new HttpDefaultFetchErrorCode("Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context."));
}
function determineHost(configuredHost) {
  let host;
  if (configuredHost !== void 0) {
    if (!configuredHost.match(/^[a-z]+:/) && typeof window !== "undefined") {
      host = new URL(window.location.protocol + "//" + configuredHost);
    } else {
      host = new URL(configuredHost);
    }
  } else {
    const knownHosts = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"];
    const remoteHosts = [".github.dev", ".gitpod.io"];
    const location2 = typeof window !== "undefined" ? window.location : void 0;
    const hostname = location2 == null ? void 0 : location2.hostname;
    let knownHost;
    if (hostname && typeof hostname === "string") {
      if (remoteHosts.some((host2) => hostname.endsWith(host2))) {
        knownHost = hostname;
      } else {
        knownHost = knownHosts.find((host2) => hostname.endsWith(host2));
      }
    }
    if (location2 && knownHost) {
      host = new URL(`${location2.protocol}//${knownHost}${location2.port ? ":" + location2.port : ""}`);
    } else {
      host = new URL("https://icp-api.io");
    }
  }
  return host.toString();
}
const _HttpAgent = class _HttpAgent {
  /**
   * @param options - Options for the HttpAgent
   * @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
   */
  constructor(options = {}) {
    __privateAdd(this, _HttpAgent_instances);
    __privateAdd(this, _rootKeyPromise);
    __privateAdd(this, _shouldFetchRootKey);
    __privateAdd(this, _timeDiffMsecs);
    __privateAdd(this, _hasSyncedTime);
    __privateAdd(this, _syncTimePromise);
    __privateAdd(this, _shouldSyncTime);
    __privateAdd(this, _identity);
    __privateAdd(this, _fetch);
    __privateAdd(this, _fetchOptions);
    __privateAdd(this, _callOptions);
    __privateAdd(this, _credentials);
    __privateAdd(this, _retryTimes);
    // Retry requests N times before erroring by default
    __privateAdd(this, _backoffStrategy);
    __privateAdd(this, _maxIngressExpiryInMinutes);
    __privateAdd(this, _queryPipeline);
    __privateAdd(this, _updatePipeline);
    __privateAdd(this, _subnetKeys);
    __privateAdd(this, _verifyQuerySignatures);
    /**
     * See https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query for details on validation
     * @param queryResponse - The response from the query
     * @param subnetStatus - The subnet status, including all node keys
     * @returns ApiQueryResponse
     */
    __privateAdd(this, _verifyQueryResponse);
    __privateSet(this, _rootKeyPromise, null);
    __privateSet(this, _shouldFetchRootKey, false);
    __privateSet(this, _timeDiffMsecs, DEFAULT_TIME_DIFF_MSECS);
    __privateSet(this, _hasSyncedTime, false);
    __privateSet(this, _syncTimePromise, null);
    __privateSet(this, _shouldSyncTime, false);
    this._isAgent = true;
    this.config = {};
    this.log = new ObservableLog();
    __privateSet(this, _queryPipeline, []);
    __privateSet(this, _updatePipeline, []);
    __privateSet(this, _subnetKeys, new ExpirableMap({
      expirationTime: 5 * MINUTE_TO_MSECS
    }));
    __privateSet(this, _verifyQuerySignatures, true);
    __privateSet(this, _verifyQueryResponse, (queryResponse, subnetStatus) => {
      if (__privateGet(this, _verifyQuerySignatures) === false) {
        return queryResponse;
      }
      const { status, signatures = [], requestId } = queryResponse;
      for (const sig of signatures) {
        const { timestamp, identity } = sig;
        const nodeId = Principal$1.fromUint8Array(identity).toText();
        let hash;
        if (status === QueryResponseStatus.Replied) {
          const { reply } = queryResponse;
          hash = hashOfMap({
            status,
            reply,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else if (status === QueryResponseStatus.Rejected) {
          const { reject_code, reject_message, error_code } = queryResponse;
          hash = hashOfMap({
            status,
            reject_code,
            reject_message,
            error_code,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else {
          throw UnknownError.fromCode(new UnexpectedErrorCode(`Unknown status: ${status}`));
        }
        const separatorWithHash = concatBytes(IC_RESPONSE_DOMAIN_SEPARATOR, hash);
        const pubKey = subnetStatus.nodeKeys.get(nodeId);
        if (!pubKey) {
          throw ProtocolError.fromCode(new MalformedPublicKeyErrorCode());
        }
        const rawKey = Ed25519PublicKey$1.fromDer(pubKey).rawKey;
        const valid = ed25519.verify(sig.signature, separatorWithHash, rawKey);
        if (valid)
          return queryResponse;
        throw TrustError.fromCode(new QuerySignatureVerificationFailedErrorCode(nodeId));
      }
      return queryResponse;
    });
    this.config = options;
    __privateSet(this, _fetch, options.fetch || getDefaultFetch() || fetch.bind(global));
    __privateSet(this, _fetchOptions, options.fetchOptions);
    __privateSet(this, _callOptions, options.callOptions);
    __privateSet(this, _shouldFetchRootKey, options.shouldFetchRootKey ?? false);
    __privateSet(this, _shouldSyncTime, options.shouldSyncTime ?? false);
    if (options.rootKey) {
      this.rootKey = options.rootKey;
    } else if (__privateGet(this, _shouldFetchRootKey)) {
      this.rootKey = null;
    } else {
      this.rootKey = hexToBytes(IC_ROOT_KEY);
    }
    const host = determineHost(options.host);
    this.host = new URL(host);
    if (options.verifyQuerySignatures !== void 0) {
      __privateSet(this, _verifyQuerySignatures, options.verifyQuerySignatures);
    }
    __privateSet(this, _retryTimes, options.retryTimes ?? 3);
    const defaultBackoffFactory = () => new ExponentialBackoff({
      maxIterations: __privateGet(this, _retryTimes)
    });
    __privateSet(this, _backoffStrategy, options.backoffStrategy || defaultBackoffFactory);
    if (this.host.hostname.endsWith(IC0_SUB_DOMAIN)) {
      this.host.hostname = IC0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP0_SUB_DOMAIN)) {
      this.host.hostname = ICP0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP_API_SUB_DOMAIN)) {
      this.host.hostname = ICP_API_DOMAIN;
    }
    if (options.credentials) {
      const { name, password } = options.credentials;
      __privateSet(this, _credentials, `${name}${password ? ":" + password : ""}`);
    }
    __privateSet(this, _identity, Promise.resolve(options.identity || new AnonymousIdentity()));
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes > 5) {
      throw InputError.fromCode(new IngressExpiryInvalidErrorCode("The maximum ingress expiry time is 5 minutes.", options.ingressExpiryInMinutes));
    }
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes <= 0) {
      throw InputError.fromCode(new IngressExpiryInvalidErrorCode("Ingress expiry time must be greater than 0.", options.ingressExpiryInMinutes));
    }
    __privateSet(this, _maxIngressExpiryInMinutes, options.ingressExpiryInMinutes || 5);
    this.addTransform("update", makeNonceTransform(makeNonce));
    if (options.useQueryNonces) {
      this.addTransform("query", makeNonceTransform(makeNonce));
    }
    if (options.logToConsole) {
      this.log.subscribe((log) => {
        if (log.level === "error") {
          console.error(log.message);
        } else if (log.level === "warn") {
          console.warn(log.message);
        } else {
          console.log(log.message);
        }
      });
    }
  }
  static createSync(options = {}) {
    return new this({ ...options });
  }
  static async create(options = {}) {
    var _a3;
    const agent = _HttpAgent.createSync(options);
    await __privateMethod(_a3 = agent, _HttpAgent_instances, asyncGuard_fn).call(_a3);
    return agent;
  }
  static async from(agent) {
    try {
      if ("config" in agent) {
        return await _HttpAgent.create(agent.config);
      }
      return await _HttpAgent.create({
        fetch: agent._fetch,
        fetchOptions: agent._fetchOptions,
        callOptions: agent._callOptions,
        host: agent._host.toString(),
        identity: agent._identity ?? void 0
      });
    } catch {
      throw InputError.fromCode(new CreateHttpAgentErrorCode());
    }
  }
  isLocal() {
    const hostname = this.host.hostname;
    return hostname === "127.0.0.1" || hostname.endsWith("127.0.0.1");
  }
  addTransform(type, fn, priority = fn.priority || 0) {
    if (type === "update") {
      const i = __privateGet(this, _updatePipeline).findIndex((x2) => (x2.priority || 0) < priority);
      __privateGet(this, _updatePipeline).splice(i >= 0 ? i : __privateGet(this, _updatePipeline).length, 0, Object.assign(fn, { priority }));
    } else if (type === "query") {
      const i = __privateGet(this, _queryPipeline).findIndex((x2) => (x2.priority || 0) < priority);
      __privateGet(this, _queryPipeline).splice(i >= 0 ? i : __privateGet(this, _queryPipeline).length, 0, Object.assign(fn, { priority }));
    }
  }
  async getPrincipal() {
    if (!__privateGet(this, _identity)) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    return (await __privateGet(this, _identity)).getPrincipal();
  }
  /**
   * Makes a call to a canister method.
   * @param canisterId - The ID of the canister to call. Can be a Principal or a string.
   * @param options - Options for the call.
   * @param options.methodName - The name of the method to call.
   * @param options.arg - The argument to pass to the method, as a Uint8Array.
   * @param options.effectiveCanisterId - (Optional) The effective canister ID, if different from the target canister ID.
   * @param options.callSync - (Optional) Whether to use synchronous call mode. Defaults to true.
   * @param options.nonce - (Optional) A unique nonce for the request. If provided, it will override any nonce set by transforms.
   * @param identity - (Optional) The identity to use for the call. If not provided, the agent's current identity will be used.
   * @returns A promise that resolves to the response of the call, including the request ID and response details.
   */
  async call(canisterId, options, identity) {
    const callSync = options.callSync ?? true;
    const id = await (identity ?? __privateGet(this, _identity));
    if (!id) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    const canister = Principal$1.from(canisterId);
    const ecid = options.effectiveCanisterId ? Principal$1.from(options.effectiveCanisterId) : canister;
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this, ecid);
    const sender = id.getPrincipal();
    const ingress_expiry = calculateIngressExpiry(__privateGet(this, _maxIngressExpiryInMinutes), __privateGet(this, _timeDiffMsecs));
    const submit = {
      request_type: SubmitRequestType.Call,
      canister_id: canister,
      method_name: options.methodName,
      arg: options.arg,
      sender,
      ingress_expiry
    };
    let transformedRequest = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
          ...__privateGet(this, _credentials) ? { Authorization: "Basic " + btoa(__privateGet(this, _credentials)) } : {}
        }
      },
      endpoint: Endpoint.Call,
      body: submit
    });
    let nonce;
    if (options == null ? void 0 : options.nonce) {
      nonce = toNonce(options.nonce);
    } else if (transformedRequest.body.nonce) {
      nonce = toNonce(transformedRequest.body.nonce);
    } else {
      nonce = void 0;
    }
    submit.nonce = nonce;
    function toNonce(buf) {
      return Object.assign(buf, { __nonce__: void 0 });
    }
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode(transformedRequest.body);
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    const requestId = requestIdOf(submit);
    try {
      const requestSync = () => {
        this.log.print(`fetching "/api/v3/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __privateGet(this, _fetch).call(this, "" + new URL(`/api/v3/canister/${ecid.toText()}/call`, this.host), {
          ...__privateGet(this, _callOptions),
          ...transformedRequest.request,
          body
        });
      };
      const requestAsync = () => {
        this.log.print(`fetching "/api/v2/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/canister/${ecid.toText()}/call`, this.host), {
          ...__privateGet(this, _callOptions),
          ...transformedRequest.request,
          body
        });
      };
      const requestFn = callSync ? requestSync : requestAsync;
      const { responseBodyBytes, ...response } = await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, {
        requestFn,
        backoff: backoff2,
        tries: 0
      });
      const responseBody = responseBodyBytes.byteLength > 0 ? decode(responseBodyBytes) : null;
      return {
        requestId,
        response: {
          ...response,
          body: responseBody
        },
        requestDetails: submit
      };
    } catch (error) {
      let callError;
      if (error instanceof AgentError) {
        if (error.hasCode(HttpV3ApiNotSupportedErrorCode)) {
          this.log.warn("v3 api not supported. Fall back to v2");
          return this.call(canisterId, {
            ...options,
            // disable v3 api
            callSync: false
          }, identity);
        } else if (error.hasCode(IngressExpiryInvalidErrorCode) && !__privateGet(this, _hasSyncedTime)) {
          await this.syncTime(canister);
          return this.call(canister, options, identity);
        } else {
          error.code.requestContext = {
            requestId,
            senderPubKey: transformedRequest.body.sender_pubkey,
            senderSignature: transformedRequest.body.sender_sig,
            ingressExpiry: transformedRequest.body.content.ingress_expiry
          };
          callError = error;
        }
      } else {
        callError = UnknownError.fromCode(new UnexpectedErrorCode(error));
      }
      this.log.error(`Error while making call: ${callError.message}`, callError);
      throw callError;
    }
  }
  async query(canisterId, fields, identity) {
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    const ecid = fields.effectiveCanisterId ? Principal$1.from(fields.effectiveCanisterId) : Principal$1.from(canisterId);
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this, ecid);
    this.log.print(`ecid ${ecid.toString()}`);
    this.log.print(`canisterId ${canisterId.toString()}`);
    let transformedRequest;
    const id = await (identity ?? __privateGet(this, _identity));
    if (!id) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    const canister = Principal$1.from(canisterId);
    const sender = id.getPrincipal();
    const ingressExpiry = calculateIngressExpiry(__privateGet(this, _maxIngressExpiryInMinutes), __privateGet(this, _timeDiffMsecs));
    const request2 = {
      request_type: ReadRequestType.Query,
      canister_id: canister,
      method_name: fields.methodName,
      arg: fields.arg,
      sender,
      ingress_expiry: ingressExpiry
    };
    const requestId = requestIdOf(request2);
    transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
          ...__privateGet(this, _credentials) ? { Authorization: "Basic " + btoa(__privateGet(this, _credentials)) } : {}
        }
      },
      endpoint: Endpoint.Query,
      body: request2
    });
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode(transformedRequest.body);
    const args = {
      canister: canister.toText(),
      ecid,
      transformedRequest,
      body,
      requestId,
      backoff: backoff2,
      tries: 0
    };
    const makeQuery = async () => {
      const query = await __privateMethod(this, _HttpAgent_instances, requestAndRetryQuery_fn).call(this, args);
      return {
        requestDetails: request2,
        ...query
      };
    };
    const getSubnetStatus = async () => {
      const cachedSubnetStatus = __privateGet(this, _subnetKeys).get(ecid.toString());
      if (cachedSubnetStatus) {
        return cachedSubnetStatus;
      }
      await this.fetchSubnetKeys(ecid.toString());
      const subnetStatus = __privateGet(this, _subnetKeys).get(ecid.toString());
      if (!subnetStatus) {
        throw TrustError.fromCode(new MissingSignatureErrorCode());
      }
      return subnetStatus;
    };
    try {
      if (!__privateGet(this, _verifyQuerySignatures)) {
        return await makeQuery();
      }
      const [queryWithDetails, subnetStatus] = await Promise.all([makeQuery(), getSubnetStatus()]);
      try {
        return __privateGet(this, _verifyQueryResponse).call(this, queryWithDetails, subnetStatus);
      } catch {
        this.log.warn("Query response verification failed. Retrying with fresh subnet keys.");
        __privateGet(this, _subnetKeys).delete(ecid.toString());
        const updatedSubnetStatus = await getSubnetStatus();
        return __privateGet(this, _verifyQueryResponse).call(this, queryWithDetails, updatedSubnetStatus);
      }
    } catch (error) {
      let queryError;
      if (error instanceof AgentError) {
        error.code.requestContext = {
          requestId,
          senderPubKey: transformedRequest.body.sender_pubkey,
          senderSignature: transformedRequest.body.sender_sig,
          ingressExpiry: transformedRequest.body.content.ingress_expiry
        };
        queryError = error;
      } else {
        queryError = UnknownError.fromCode(new UnexpectedErrorCode(error));
      }
      this.log.error(`Error while making query: ${queryError.message}`, queryError);
      throw queryError;
    }
  }
  async createReadStateRequest(fields, identity) {
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this);
    const id = await (identity ?? __privateGet(this, _identity));
    if (!id) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    const sender = id.getPrincipal();
    const transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
          ...__privateGet(this, _credentials) ? { Authorization: "Basic " + btoa(__privateGet(this, _credentials)) } : {}
        }
      },
      endpoint: Endpoint.ReadState,
      body: {
        request_type: ReadRequestType.ReadState,
        paths: fields.paths,
        sender,
        ingress_expiry: calculateIngressExpiry(__privateGet(this, _maxIngressExpiryInMinutes), __privateGet(this, _timeDiffMsecs))
      }
    });
    return id.transformRequest(transformedRequest);
  }
  async readState(canisterId, fields, _identity2, request2) {
    await __privateMethod(this, _HttpAgent_instances, rootKeyGuard_fn).call(this);
    const canister = Principal$1.from(canisterId);
    function getRequestId(options) {
      for (const path of options.paths) {
        const [pathName, value] = path;
        const request_status = new TextEncoder().encode("request_status");
        if (uint8Equals(pathName, request_status)) {
          return value;
        }
      }
    }
    let transformedRequest;
    let requestId;
    if (request2) {
      transformedRequest = request2;
      requestId = requestIdOf(transformedRequest);
    } else {
      requestId = getRequestId(fields);
      const identity = await __privateGet(this, _identity);
      if (!identity) {
        throw ExternalError.fromCode(new IdentityInvalidErrorCode());
      }
      transformedRequest = await this.createReadStateRequest(fields, identity);
    }
    this.log.print(`fetching "/api/v2/canister/${canister}/read_state" with request:`, transformedRequest);
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    try {
      const { responseBodyBytes } = await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, {
        requestFn: () => __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/canister/${canister.toString()}/read_state`, this.host), {
          ...__privateGet(this, _fetchOptions),
          ...transformedRequest.request,
          body: encode(transformedRequest.body)
        }),
        backoff: backoff2,
        tries: 0
      });
      const decodedResponse = decode(responseBodyBytes);
      this.log.print("Read state response:", decodedResponse);
      return decodedResponse;
    } catch (error) {
      let readStateError;
      if (error instanceof AgentError) {
        error.code.requestContext = {
          requestId,
          senderPubKey: transformedRequest.body.sender_pubkey,
          senderSignature: transformedRequest.body.sender_sig,
          ingressExpiry: transformedRequest.body.content.ingress_expiry
        };
        readStateError = error;
      } else {
        readStateError = UnknownError.fromCode(new UnexpectedErrorCode(error));
      }
      this.log.error(`Error while making read state: ${readStateError.message}`, readStateError);
      throw readStateError;
    }
  }
  parseTimeFromResponse(response) {
    let tree;
    if (response.certificate) {
      const decoded = decode(response.certificate);
      if (decoded && "tree" in decoded) {
        tree = decoded.tree;
      } else {
        throw ProtocolError.fromCode(new HashTreeDecodeErrorCode("Could not decode time from response"));
      }
      const timeLookup = lookup_path(["time"], tree);
      if (timeLookup.status !== LookupPathStatus.Found) {
        throw ProtocolError.fromCode(new LookupErrorCode("Time was not found in the response or was not in its expected format.", timeLookup.status));
      }
      if (!(timeLookup.value instanceof Uint8Array) && !ArrayBuffer.isView(timeLookup)) {
        throw ProtocolError.fromCode(new MalformedLookupFoundValueErrorCode("Time was not in its expected format."));
      }
      const date = decodeTime(timeLookup.value);
      this.log.print("Time from response:", date);
      this.log.print("Time from response in milliseconds:", date.getTime());
      return date.getTime();
    } else {
      this.log.warn("No certificate found in response");
    }
    return 0;
  }
  /**
   * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
   * @param {Principal} canisterIdOverride - Pass a canister ID if you need to sync the time with a particular subnet. Uses the ICP ledger canister by default.
   */
  async syncTime(canisterIdOverride) {
    __privateSet(this, _syncTimePromise, __privateGet(this, _syncTimePromise) ?? (async () => {
      await __privateMethod(this, _HttpAgent_instances, rootKeyGuard_fn).call(this);
      const callTime = Date.now();
      try {
        if (!canisterIdOverride) {
          this.log.print("Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai");
        }
        const canisterId = canisterIdOverride ?? Principal$1.from("ryjl3-tyaaa-aaaaa-aaaba-cai");
        const anonymousAgent = _HttpAgent.createSync({
          identity: new AnonymousIdentity(),
          host: this.host.toString(),
          fetch: __privateGet(this, _fetch),
          retryTimes: 0,
          rootKey: this.rootKey ?? void 0,
          shouldSyncTime: false
        });
        const replicaTimes = await Promise.all(Array(3).fill(null).map(async () => {
          const status = await request({
            canisterId,
            agent: anonymousAgent,
            paths: ["time"],
            disableCertificateTimeVerification: true
            // avoid recursive calls to syncTime
          });
          const date = status.get("time");
          if (date instanceof Date) {
            return date.getTime();
          }
        }, []));
        const maxReplicaTime = replicaTimes.reduce((max, current) => {
          return typeof current === "number" && current > max ? current : max;
        }, 0);
        if (maxReplicaTime > 0) {
          __privateSet(this, _timeDiffMsecs, maxReplicaTime - callTime);
          __privateSet(this, _hasSyncedTime, true);
          this.log.notify({
            message: `Syncing time: offset of ${__privateGet(this, _timeDiffMsecs)}`,
            level: "info"
          });
        }
      } catch (error) {
        const syncTimeError = error instanceof AgentError ? error : UnknownError.fromCode(new UnexpectedErrorCode(error));
        this.log.error("Caught exception while attempting to sync time", syncTimeError);
        throw syncTimeError;
      }
    })());
    await __privateGet(this, _syncTimePromise).finally(() => {
      __privateSet(this, _syncTimePromise, null);
    });
  }
  async status() {
    const headers = __privateGet(this, _credentials) ? {
      Authorization: "Basic " + btoa(__privateGet(this, _credentials))
    } : {};
    this.log.print(`fetching "/api/v2/status"`);
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    const { responseBodyBytes } = await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, {
      backoff: backoff2,
      requestFn: () => __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/status`, this.host), { headers, ...__privateGet(this, _fetchOptions) }),
      tries: 0
    });
    return decode(responseBodyBytes);
  }
  async fetchRootKey() {
    __privateSet(this, _rootKeyPromise, __privateGet(this, _rootKeyPromise) ?? (async () => {
      const value = await this.status();
      this.rootKey = value.root_key;
      return this.rootKey;
    })());
    return await __privateGet(this, _rootKeyPromise).finally(() => {
      __privateSet(this, _rootKeyPromise, null);
    });
  }
  invalidateIdentity() {
    __privateSet(this, _identity, null);
  }
  replaceIdentity(identity) {
    __privateSet(this, _identity, Promise.resolve(identity));
  }
  async fetchSubnetKeys(canisterId) {
    const effectiveCanisterId = Principal$1.from(canisterId);
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this, effectiveCanisterId);
    const response = await request({
      canisterId: effectiveCanisterId,
      paths: ["subnet"],
      agent: this
    });
    const subnetResponse = response.get("subnet");
    if (subnetResponse && typeof subnetResponse === "object" && "nodeKeys" in subnetResponse) {
      __privateGet(this, _subnetKeys).set(effectiveCanisterId.toText(), subnetResponse);
      return subnetResponse;
    }
    return void 0;
  }
  _transform(request2) {
    let p2 = Promise.resolve(request2);
    if (request2.endpoint === Endpoint.Call) {
      for (const fn of __privateGet(this, _updatePipeline)) {
        p2 = p2.then((r2) => fn(r2).then((r22) => r22 || r2));
      }
    } else {
      for (const fn of __privateGet(this, _queryPipeline)) {
        p2 = p2.then((r2) => fn(r2).then((r22) => r22 || r2));
      }
    }
    return p2;
  }
  /**
   * Returns the time difference in milliseconds between the IC network clock and the client's clock,
   * after the clock has been synced.
   *
   * If the time has not been synced, returns `0`.
   */
  getTimeDiffMsecs() {
    return __privateGet(this, _timeDiffMsecs);
  }
  /**
   * Returns `true` if the time has been synced at least once with the IC network, `false` otherwise.
   */
  hasSyncedTime() {
    return __privateGet(this, _hasSyncedTime);
  }
};
_rootKeyPromise = new WeakMap();
_shouldFetchRootKey = new WeakMap();
_timeDiffMsecs = new WeakMap();
_hasSyncedTime = new WeakMap();
_syncTimePromise = new WeakMap();
_shouldSyncTime = new WeakMap();
_identity = new WeakMap();
_fetch = new WeakMap();
_fetchOptions = new WeakMap();
_callOptions = new WeakMap();
_credentials = new WeakMap();
_retryTimes = new WeakMap();
_backoffStrategy = new WeakMap();
_maxIngressExpiryInMinutes = new WeakMap();
_HttpAgent_instances = new WeakSet();
maxIngressExpiryInMs_get = function() {
  return __privateGet(this, _maxIngressExpiryInMinutes) * MINUTE_TO_MSECS;
};
_queryPipeline = new WeakMap();
_updatePipeline = new WeakMap();
_subnetKeys = new WeakMap();
_verifyQuerySignatures = new WeakMap();
requestAndRetryQuery_fn = async function(args) {
  var _a3, _b2;
  const { ecid, transformedRequest, body, requestId, backoff: backoff2, tries } = args;
  const delay = tries === 0 ? 0 : backoff2.next();
  this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with tries:`, {
    tries,
    backoff: backoff2,
    delay
  });
  if (delay === null) {
    throw UnknownError.fromCode(new TimeoutWaitingForResponseErrorCode(`Backoff strategy exhausted after ${tries} attempts.`, requestId));
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  try {
    this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with request:`, transformedRequest);
    const fetchResponse = await __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/canister/${ecid.toString()}/query`, this.host), {
      ...__privateGet(this, _fetchOptions),
      ...transformedRequest.request,
      body
    });
    if (fetchResponse.status === HTTP_STATUS_OK) {
      const queryResponse = decode(uint8FromBufLike(await fetchResponse.arrayBuffer()));
      response = {
        ...queryResponse,
        httpDetails: {
          ok: fetchResponse.ok,
          status: fetchResponse.status,
          statusText: fetchResponse.statusText,
          headers: httpHeadersTransform(fetchResponse.headers)
        },
        requestId
      };
    } else {
      throw ProtocolError.fromCode(new HttpErrorCode(fetchResponse.status, fetchResponse.statusText, httpHeadersTransform(fetchResponse.headers), await fetchResponse.text()));
    }
  } catch (error) {
    if (tries < __privateGet(this, _retryTimes)) {
      this.log.warn(`Caught exception while attempting to make query:
  ${error}
  Retrying query.`);
      return await __privateMethod(this, _HttpAgent_instances, requestAndRetryQuery_fn).call(this, { ...args, tries: tries + 1 });
    }
    if (error instanceof AgentError) {
      throw error;
    }
    throw TransportError.fromCode(new HttpFetchErrorCode(error));
  }
  if (!__privateGet(this, _verifyQuerySignatures)) {
    return response;
  }
  const signatureTimestampNs = (_b2 = (_a3 = response.signatures) == null ? void 0 : _a3[0]) == null ? void 0 : _b2.timestamp;
  if (!signatureTimestampNs) {
    throw ProtocolError.fromCode(new MalformedSignatureErrorCode("Timestamp not found in query response. This suggests a malformed or malicious response."));
  }
  const signatureTimestampMs = Number(BigInt(signatureTimestampNs) / BigInt(MSECS_TO_NANOSECONDS));
  const currentTimestampInMs = Date.now() + __privateGet(this, _timeDiffMsecs);
  if (currentTimestampInMs - signatureTimestampMs > __privateGet(this, _HttpAgent_instances, maxIngressExpiryInMs_get)) {
    if (tries < __privateGet(this, _retryTimes)) {
      this.log.warn("Timestamp is older than the max ingress expiry. Retrying query.", {
        requestId,
        signatureTimestampMs
      });
      return await __privateMethod(this, _HttpAgent_instances, requestAndRetryQuery_fn).call(this, { ...args, tries: tries + 1 });
    }
    throw TrustError.fromCode(new CertificateOutdatedErrorCode(__privateGet(this, _maxIngressExpiryInMinutes), requestId, tries));
  }
  return response;
};
requestAndRetry_fn = async function(args) {
  const { requestFn, backoff: backoff2, tries } = args;
  const delay = tries === 0 ? 0 : backoff2.next();
  if (delay === null) {
    throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Retry strategy exhausted after ${tries} attempts.`));
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  let responseBodyBytes = new Uint8Array();
  try {
    response = await requestFn();
    if (response.status === HTTP_STATUS_OK) {
      responseBodyBytes = uint8FromBufLike(await response.clone().arrayBuffer());
    }
  } catch (error) {
    if (tries < __privateGet(this, _retryTimes)) {
      this.log.warn(`Caught exception while attempting to make request:
  ${error}
  Retrying request.`);
      return await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, { requestFn, backoff: backoff2, tries: tries + 1 });
    }
    throw TransportError.fromCode(new HttpFetchErrorCode(error));
  }
  const headers = httpHeadersTransform(response.headers);
  if (response.status === HTTP_STATUS_OK || response.status === HTTP_STATUS_ACCEPTED) {
    return {
      ok: response.ok,
      // should always be true
      status: response.status,
      statusText: response.statusText,
      responseBodyBytes,
      headers
    };
  }
  const responseText = await response.text();
  if (response.status === HTTP_STATUS_NOT_FOUND && response.url.includes("api/v3")) {
    throw ProtocolError.fromCode(new HttpV3ApiNotSupportedErrorCode());
  }
  if (responseText.startsWith("Invalid request expiry: ")) {
    throw InputError.fromCode(new IngressExpiryInvalidErrorCode(responseText, __privateGet(this, _maxIngressExpiryInMinutes)));
  }
  if (tries < __privateGet(this, _retryTimes)) {
    return await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, { requestFn, backoff: backoff2, tries: tries + 1 });
  }
  throw ProtocolError.fromCode(new HttpErrorCode(response.status, response.statusText, headers, responseText));
};
_verifyQueryResponse = new WeakMap();
asyncGuard_fn = async function(canisterIdOverride) {
  await Promise.all([__privateMethod(this, _HttpAgent_instances, rootKeyGuard_fn).call(this), __privateMethod(this, _HttpAgent_instances, syncTimeGuard_fn).call(this, canisterIdOverride)]);
};
rootKeyGuard_fn = async function() {
  if (this.rootKey) {
    return;
  } else if (this.rootKey === null && this.host.toString() !== "https://icp-api.io" && __privateGet(this, _shouldFetchRootKey)) {
    await this.fetchRootKey();
  } else {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode(__privateGet(this, _shouldFetchRootKey)));
  }
};
syncTimeGuard_fn = async function(canisterIdOverride) {
  if (__privateGet(this, _shouldSyncTime) && !this.hasSyncedTime()) {
    await this.syncTime(canisterIdOverride);
  }
};
let HttpAgent = _HttpAgent;
function calculateIngressExpiry(maxIngressExpiryInMinutes, timeDiffMsecs) {
  const ingressExpiryMs = maxIngressExpiryInMinutes * MINUTE_TO_MSECS;
  return Expiry.fromDeltaInMilliseconds(ingressExpiryMs, timeDiffMsecs);
}
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a2 of strategies) {
      await a2(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a3;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request2 = await ((_a3 = agent.createReadStateRequest) == null ? void 0 : _a3.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request2)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request2));
  }
  return request2;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal$1.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal$1.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode$1(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify2) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a3, _b2;
      options = {
        ...options,
        ...(_b2 = (_a3 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b2.call(_a3, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal$1.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode$1(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a3, _b2;
      options = {
        ...options,
        ...(_b2 = (_a3 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b2.call(_a3, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal$1.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal$1.from(effectiveCanisterId) : cid;
      const arg = encode$1(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify: blsVerify2,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify: blsVerify2
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t2) => t2.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const _Ed25519PublicKey = class _Ed25519PublicKey {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    __privateAdd(this, _rawKey2);
    __privateAdd(this, _derKey2);
    if (key.byteLength !== _Ed25519PublicKey.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    __privateSet(this, _rawKey2, key);
    __privateSet(this, _derKey2, _Ed25519PublicKey.derEncode(key));
  }
  /**
   * Construct Ed25519PublicKey from an existing PublicKey
   * @param {unknown} maybeKey - existing PublicKey, ArrayBuffer, DerEncodedPublicKey, or hex string
   * @returns {Ed25519PublicKey} Instance of Ed25519PublicKey
   */
  static from(maybeKey) {
    if (typeof maybeKey === "string") {
      const key = hexToBytes(maybeKey);
      return this.fromRaw(key);
    } else if (isObject(maybeKey)) {
      const key = maybeKey;
      if (isObject(key) && Object.hasOwnProperty.call(key, "__derEncodedPublicKey__")) {
        return this.fromDer(key);
      } else if (ArrayBuffer.isView(key)) {
        const view = key;
        return this.fromRaw(uint8FromBufLike$1(view.buffer));
      } else if (key instanceof ArrayBuffer) {
        return this.fromRaw(uint8FromBufLike$1(key));
      } else if ("rawKey" in key && key.rawKey instanceof Uint8Array) {
        return this.fromRaw(key.rawKey);
      } else if ("derKey" in key) {
        return this.fromDer(key.derKey);
      } else if ("toDer" in key) {
        return this.fromDer(key.toDer());
      }
    }
    throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
  }
  static fromRaw(rawKey) {
    return new _Ed25519PublicKey(rawKey);
  }
  static fromDer(derKey) {
    return new _Ed25519PublicKey(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    const key = wrapDER(publicKey, ED25519_OID);
    key.__derEncodedPublicKey__ = void 0;
    return key;
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    return unwrapped;
  }
  get rawKey() {
    return __privateGet(this, _rawKey2);
  }
  get derKey() {
    return __privateGet(this, _derKey2);
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
_rawKey2 = new WeakMap();
_derKey2 = new WeakMap();
_Ed25519PublicKey.RAW_KEY_LENGTH = 32;
let Ed25519PublicKey = _Ed25519PublicKey;
const _Ed25519KeyIdentity = class _Ed25519KeyIdentity extends SignIdentity {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(publicKey, privateKey) {
    super();
    __privateAdd(this, _publicKey);
    __privateAdd(this, _privateKey);
    __privateSet(this, _publicKey, Ed25519PublicKey.from(publicKey));
    __privateSet(this, _privateKey, privateKey);
  }
  /**
   * Generate a new Ed25519KeyIdentity.
   * @param seed a 32-byte seed for the private key. If not provided, a random seed will be generated.
   * @returns Ed25519KeyIdentity
   */
  static generate(seed) {
    if (seed && seed.length !== 32) {
      throw new Error("Ed25519 Seed needs to be 32 bytes long.");
    }
    if (!seed)
      seed = ed25519.utils.randomPrivateKey();
    if (uint8Equals$1(seed, new Uint8Array(new Array(32).fill(0)))) {
      console.warn("Seed is all zeros. This is not a secure seed. Please provide a seed with sufficient entropy if this is a production environment.");
    }
    const sk = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      sk[i] = seed[i];
    }
    const pk = ed25519.getPublicKey(sk);
    return _Ed25519KeyIdentity.fromKeyPair(pk, sk);
  }
  static fromParsedJson(obj) {
    const [publicKeyDer, privateKeyRaw] = obj;
    return new _Ed25519KeyIdentity(Ed25519PublicKey.fromDer(hexToBytes(publicKeyDer)), hexToBytes(privateKeyRaw));
  }
  static fromJSON(json) {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      if (typeof parsed[0] === "string" && typeof parsed[1] === "string") {
        return this.fromParsedJson([parsed[0], parsed[1]]);
      } else {
        throw new Error("Deserialization error: JSON must have at least 2 items.");
      }
    }
    throw new Error(`Deserialization error: Invalid JSON type for string: ${JSON.stringify(json)}`);
  }
  static fromKeyPair(publicKey, privateKey) {
    return new _Ed25519KeyIdentity(Ed25519PublicKey.fromRaw(publicKey), privateKey);
  }
  static fromSecretKey(secretKey) {
    const publicKey = ed25519.getPublicKey(secretKey);
    return _Ed25519KeyIdentity.fromKeyPair(publicKey, secretKey);
  }
  /**
   * Serialize this key to JSON.
   */
  toJSON() {
    return [bytesToHex(__privateGet(this, _publicKey).toDer()), bytesToHex(__privateGet(this, _privateKey))];
  }
  /**
   * Return a copy of the key pair.
   */
  getKeyPair() {
    return {
      secretKey: __privateGet(this, _privateKey),
      publicKey: __privateGet(this, _publicKey)
    };
  }
  /**
   * Return the public key.
   */
  getPublicKey() {
    return __privateGet(this, _publicKey);
  }
  /**
   * Signs a blob of data, with this identity's private key.
   * @param challenge - challenge to sign with this identity's secretKey, producing a signature
   */
  async sign(challenge) {
    const signature = ed25519.sign(challenge, __privateGet(this, _privateKey).slice(0, 32));
    Object.defineProperty(signature, "__signature__", {
      enumerable: false,
      value: void 0
    });
    return signature;
  }
  /**
   * Verify
   * @param sig - signature to verify
   * @param msg - message to verify
   * @param pk - public key
   * @returns - true if the signature is valid, false otherwise
   */
  static verify(sig, msg, pk) {
    const [signature, message, publicKey] = [sig, msg, pk].map((x2) => {
      if (typeof x2 === "string") {
        x2 = hexToBytes(x2);
      }
      return uint8FromBufLike$1(x2);
    });
    return ed25519.verify(signature, message, publicKey);
  }
};
_publicKey = new WeakMap();
_privateKey = new WeakMap();
let Ed25519KeyIdentity = _Ed25519KeyIdentity;
class CryptoError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, CryptoError.prototype);
  }
}
function _getEffectiveCrypto(subtleCrypto) {
  if (typeof global !== "undefined" && global["crypto"] && global["crypto"]["subtle"]) {
    return global["crypto"]["subtle"];
  }
  if (subtleCrypto) {
    return subtleCrypto;
  } else if (typeof crypto !== "undefined" && crypto["subtle"]) {
    return crypto.subtle;
  } else {
    throw new CryptoError("Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto");
  }
}
class ECDSAKeyIdentity extends SignIdentity {
  /**
   * Generates a randomly generated identity for use in calls to the Internet Computer.
   * @param {CryptoKeyOptions} options optional settings
   * @param {CryptoKeyOptions['extractable']} options.extractable - whether the key should allow itself to be used. Set to false for maximum security.
   * @param {CryptoKeyOptions['keyUsages']} options.keyUsages - a list of key usages that the key can be used for
   * @param {CryptoKeyOptions['subtleCrypto']} options.subtleCrypto interface
   * @returns a {@link ECDSAKeyIdentity}
   */
  static async generate(options) {
    const { extractable = false, keyUsages = ["sign", "verify"], subtleCrypto } = options ?? {};
    const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
    const keyPair = await effectiveCrypto.generateKey({
      name: "ECDSA",
      namedCurve: "P-256"
    }, extractable, keyUsages);
    const derKey = uint8FromBufLike$1(await effectiveCrypto.exportKey("spki", keyPair.publicKey));
    Object.assign(derKey, {
      __derEncodedPublicKey__: void 0
    });
    return new this(keyPair, derKey, effectiveCrypto);
  }
  /**
   * generates an identity from a public and private key. Please ensure that you are generating these keys securely and protect the user's private key
   * @param keyPair a CryptoKeyPair
   * @param subtleCrypto - a SubtleCrypto interface in case one is not available globally
   * @returns an {@link ECDSAKeyIdentity}
   */
  static async fromKeyPair(keyPair, subtleCrypto) {
    const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
    const derKey = uint8FromBufLike$1(await effectiveCrypto.exportKey("spki", keyPair.publicKey));
    Object.assign(derKey, {
      __derEncodedPublicKey__: void 0
    });
    return new ECDSAKeyIdentity(keyPair, derKey, effectiveCrypto);
  }
  // `fromKeyPair` and `generate` should be used for instantiation, not this constructor.
  constructor(keyPair, derKey, subtleCrypto) {
    super();
    this._keyPair = keyPair;
    this._derKey = derKey;
    this._subtleCrypto = subtleCrypto;
  }
  /**
   * Return the internally-used key pair.
   * @returns a CryptoKeyPair
   */
  getKeyPair() {
    return this._keyPair;
  }
  /**
   * Return the public key.
   * @returns an {@link PublicKey & DerCryptoKey}
   */
  getPublicKey() {
    const derKey = this._derKey;
    const key = Object.create(this._keyPair.publicKey);
    key.toDer = function() {
      return derKey;
    };
    return key;
  }
  /**
   * Signs a blob of data, with this identity's private key.
   * @param {Uint8Array} challenge - challenge to sign with this identity's secretKey, producing a signature
   * @returns {Promise<Signature>} signature
   */
  async sign(challenge) {
    const params = {
      name: "ECDSA",
      hash: { name: "SHA-256" }
    };
    const signature = uint8FromBufLike$1(await this._subtleCrypto.sign(params, this._keyPair.privateKey, challenge));
    Object.assign(signature, {
      __signature__: void 0
    });
    return signature;
  }
}
class PartialIdentity {
  constructor(inner) {
    __privateAdd(this, _inner2);
    __privateSet(this, _inner2, inner);
  }
  /**
   * The raw public key of this identity.
   */
  get rawKey() {
    return __privateGet(this, _inner2).rawKey;
  }
  /**
   * The DER-encoded public key of this identity.
   */
  get derKey() {
    return __privateGet(this, _inner2).derKey;
  }
  /**
   * The DER-encoded public key of this identity.
   */
  toDer() {
    return __privateGet(this, _inner2).toDer();
  }
  /**
   * The inner {@link PublicKey} used by this identity.
   */
  getPublicKey() {
    return __privateGet(this, _inner2);
  }
  /**
   * The {@link Principal} of this identity.
   */
  getPrincipal() {
    if (!__privateGet(this, _inner2).rawKey) {
      throw new Error("Cannot get principal from a public key without a raw key.");
    }
    return Principal$1.fromUint8Array(new Uint8Array(__privateGet(this, _inner2).rawKey));
  }
  /**
   * Required for the Identity interface, but cannot implemented for just a public key.
   */
  transformRequest() {
    return Promise.reject("Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.");
  }
}
_inner2 = new WeakMap();
function safeBytesToHex(data) {
  if (data instanceof Uint8Array) {
    return bytesToHex(data);
  }
  return bytesToHex(new Uint8Array(data));
}
function _parseBlob(value) {
  if (typeof value !== "string" || value.length < 64) {
    throw new Error("Invalid public key.");
  }
  return hexToBytes(value);
}
class Delegation {
  constructor(pubkey, expiration, targets) {
    this.pubkey = pubkey;
    this.expiration = expiration;
    this.targets = targets;
  }
  toCborValue() {
    return {
      pubkey: this.pubkey,
      expiration: this.expiration,
      ...this.targets && {
        targets: this.targets
      }
    };
  }
  toJSON() {
    return {
      expiration: this.expiration.toString(16),
      pubkey: safeBytesToHex(this.pubkey),
      ...this.targets && { targets: this.targets.map((p2) => p2.toHex()) }
    };
  }
}
async function _createSingleDelegation(from, to, expiration, targets) {
  const delegation = new Delegation(
    to.toDer(),
    BigInt(+expiration) * BigInt(1e6),
    // In nanoseconds.
    targets
  );
  const challenge = new Uint8Array([
    ...IC_REQUEST_AUTH_DELEGATION_DOMAIN_SEPARATOR,
    ...new Uint8Array(requestIdOf({ ...delegation }))
  ]);
  const signature = await from.sign(challenge);
  return {
    delegation,
    signature
  };
}
class DelegationChain {
  /**
   * Create a delegation chain between two (or more) keys. By default, the expiration time
   * will be very short (15 minutes).
   *
   * To build a chain of more than 2 identities, this function needs to be called multiple times,
   * passing the previous delegation chain into the options argument. For example:
   * @example
   * const rootKey = createKey();
   * const middleKey = createKey();
   * const bottomeKey = createKey();
   *
   * const rootToMiddle = await DelegationChain.create(
   *   root, middle.getPublicKey(), Date.parse('2100-01-01'),
   * );
   * const middleToBottom = await DelegationChain.create(
   *   middle, bottom.getPublicKey(), Date.parse('2100-01-01'), { previous: rootToMiddle },
   * );
   *
   * // We can now use a delegation identity that uses the delegation above:
   * const identity = DelegationIdentity.fromDelegation(bottomKey, middleToBottom);
   * @param from The identity that will delegate.
   * @param to The identity that gets delegated. It can now sign messages as if it was the
   *           identity above.
   * @param expiration The length the delegation is valid. By default, 15 minutes from calling
   *                   this function.
   * @param options A set of options for this delegation. expiration and previous
   * @param options.previous - Another DelegationChain that this chain should start with.
   * @param options.targets - targets that scope the delegation (e.g. Canister Principals)
   */
  static async create(from, to, expiration = new Date(Date.now() + 15 * 60 * 1e3), options = {}) {
    var _a3, _b2;
    const delegation = await _createSingleDelegation(from, to, expiration, options.targets);
    return new DelegationChain([...((_a3 = options.previous) == null ? void 0 : _a3.delegations) || [], delegation], ((_b2 = options.previous) == null ? void 0 : _b2.publicKey) || from.getPublicKey().toDer());
  }
  /**
   * Creates a DelegationChain object from a JSON string.
   * @param json The JSON string to parse.
   */
  static fromJSON(json) {
    const { publicKey, delegations } = typeof json === "string" ? JSON.parse(json) : json;
    if (!Array.isArray(delegations)) {
      throw new Error("Invalid delegations.");
    }
    const parsedDelegations = delegations.map((signedDelegation) => {
      const { delegation, signature } = signedDelegation;
      const { pubkey, expiration, targets } = delegation;
      if (targets !== void 0 && !Array.isArray(targets)) {
        throw new Error("Invalid targets.");
      }
      return {
        delegation: new Delegation(
          _parseBlob(pubkey),
          BigInt("0x" + expiration),
          // expiration in JSON is an hexa string (See toJSON() below).
          targets && targets.map((t2) => {
            if (typeof t2 !== "string") {
              throw new Error("Invalid target.");
            }
            return Principal$1.fromHex(t2);
          })
        ),
        signature: _parseBlob(signature)
      };
    });
    return new this(parsedDelegations, _parseBlob(publicKey));
  }
  /**
   * Creates a DelegationChain object from a list of delegations and a DER-encoded public key.
   * @param delegations The list of delegations.
   * @param publicKey The DER-encoded public key of the key-pair signing the first delegation.
   */
  static fromDelegations(delegations, publicKey) {
    return new this(delegations, publicKey);
  }
  constructor(delegations, publicKey) {
    this.delegations = delegations;
    this.publicKey = publicKey;
  }
  toJSON() {
    return {
      delegations: this.delegations.map((signedDelegation) => {
        const { delegation, signature } = signedDelegation;
        const { targets } = delegation;
        return {
          delegation: {
            expiration: delegation.expiration.toString(16),
            pubkey: safeBytesToHex(delegation.pubkey),
            ...targets && {
              targets: targets.map((t2) => t2.toHex())
            }
          },
          signature: safeBytesToHex(signature)
        };
      }),
      publicKey: safeBytesToHex(this.publicKey)
    };
  }
}
class DelegationIdentity extends SignIdentity {
  /**
   * Create a delegation without having access to delegateKey.
   * @param key The key used to sign the requests.
   * @param delegation A delegation object created using `createDelegation`.
   */
  static fromDelegation(key, delegation) {
    return new this(key, delegation);
  }
  constructor(_inner3, _delegation2) {
    super();
    this._inner = _inner3;
    this._delegation = _delegation2;
  }
  getDelegation() {
    return this._delegation;
  }
  getPublicKey() {
    return {
      derKey: this._delegation.publicKey,
      toDer: () => this._delegation.publicKey
    };
  }
  sign(blob) {
    return this._inner.sign(blob);
  }
  async transformRequest(request2) {
    const { body, ...fields } = request2;
    const requestId = await requestIdOf(body);
    return {
      ...fields,
      body: {
        content: body,
        sender_sig: await this.sign(new Uint8Array([...IC_REQUEST_DOMAIN_SEPARATOR, ...new Uint8Array(requestId)])),
        sender_delegation: this._delegation.delegations,
        sender_pubkey: this._delegation.publicKey
      }
    };
  }
}
const _PartialDelegationIdentity = class _PartialDelegationIdentity extends PartialIdentity {
  constructor(inner, delegation) {
    super(inner);
    __privateAdd(this, _delegation);
    __privateSet(this, _delegation, delegation);
  }
  /**
   * The Delegation Chain of this identity.
   */
  get delegation() {
    return __privateGet(this, _delegation);
  }
  /**
   * Create a {@link PartialDelegationIdentity} from a {@link PublicKey} and a {@link DelegationChain}.
   * @param key The {@link PublicKey} to delegate to.
   * @param delegation a {@link DelegationChain} targeting the inner key.
   */
  static fromDelegation(key, delegation) {
    return new _PartialDelegationIdentity(key, delegation);
  }
};
_delegation = new WeakMap();
let PartialDelegationIdentity = _PartialDelegationIdentity;
function isDelegationValid(chain2, checks) {
  for (const { delegation } of chain2.delegations) {
    if (+new Date(Number(delegation.expiration / BigInt(1e6))) <= +Date.now()) {
      return false;
    }
  }
  const scopes = [];
  for (const s2 of scopes) {
    const scope = s2.toText();
    for (const { delegation } of chain2.delegations) {
      if (delegation.targets === void 0) {
        continue;
      }
      let none = true;
      for (const target of delegation.targets) {
        if (target.toText() === scope) {
          none = false;
          break;
        }
      }
      if (none) {
        return false;
      }
    }
  }
  return true;
}
const events = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"];
class IdleManager {
  /**
   * @protected
   * @param options {@link IdleManagerOptions}
   */
  constructor(options = {}) {
    __publicField(this, "callbacks", []);
    __publicField(this, "idleTimeout", 10 * 60 * 1e3);
    __publicField(this, "timeoutID");
    const { onIdle, idleTimeout = 10 * 60 * 1e3 } = options || {};
    this.callbacks = onIdle ? [onIdle] : [];
    this.idleTimeout = idleTimeout;
    const _resetTimer = this._resetTimer.bind(this);
    window.addEventListener("load", _resetTimer, true);
    events.forEach(function(name) {
      document.addEventListener(name, _resetTimer, true);
    });
    const debounce = (func, wait) => {
      let timeout2;
      return (...args) => {
        const context = this;
        const later = function() {
          timeout2 = void 0;
          func.apply(context, args);
        };
        clearTimeout(timeout2);
        timeout2 = window.setTimeout(later, wait);
      };
    };
    if (options == null ? void 0 : options.captureScroll) {
      const scroll = debounce(_resetTimer, (options == null ? void 0 : options.scrollDebounce) ?? 100);
      window.addEventListener("scroll", scroll, true);
    }
    _resetTimer();
  }
  /**
   * Creates an {@link IdleManager}
   * @param {IdleManagerOptions} options Optional configuration
   * @see {@link IdleManagerOptions}
   * @param options.onIdle Callback once user has been idle. Use to prompt for fresh login, and use `Actor.agentOf(your_actor).invalidateIdentity()` to protect the user
   * @param options.idleTimeout timeout in ms
   * @param options.captureScroll capture scroll events
   * @param options.scrollDebounce scroll debounce time in ms
   */
  static create(options = {}) {
    return new this(options);
  }
  /**
   * @param {IdleCB} callback function to be called when user goes idle
   */
  registerCallback(callback) {
    this.callbacks.push(callback);
  }
  /**
   * Cleans up the idle manager and its listeners
   */
  exit() {
    clearTimeout(this.timeoutID);
    window.removeEventListener("load", this._resetTimer, true);
    const _resetTimer = this._resetTimer.bind(this);
    events.forEach(function(name) {
      document.removeEventListener(name, _resetTimer, true);
    });
    this.callbacks.forEach((cb) => cb());
  }
  /**
   * Resets the timeouts during cleanup
   */
  _resetTimer() {
    const exit = this.exit.bind(this);
    window.clearTimeout(this.timeoutID);
    this.timeoutID = window.setTimeout(exit, this.idleTimeout);
  }
}
const instanceOfAny = (object, constructors) => constructors.some((c2) => object instanceof c2);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const cursorRequestMap = /* @__PURE__ */ new WeakMap();
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request2) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request2.removeEventListener("success", success);
      request2.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request2.result));
      unlisten();
    };
    const error = () => {
      reject(request2.error);
      unlisten();
    };
    request2.addEventListener("success", success);
    request2.addEventListener("error", error);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request2);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request2);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request2 = indexedDB.open(name, version);
  const openPromise = wrap(request2);
  if (upgrade) {
    request2.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request2.result), event.oldVersion, event.newVersion, wrap(request2.transaction), event);
    });
  }
  if (blocked) {
    request2.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const AUTH_DB_NAME = "auth-client-db";
const OBJECT_STORE_NAME = "ic-keyval";
const _openDbStore = async (dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version) => {
  if (isBrowser && (localStorage == null ? void 0 : localStorage.getItem(KEY_STORAGE_DELEGATION))) {
    localStorage.removeItem(KEY_STORAGE_DELEGATION);
    localStorage.removeItem(KEY_STORAGE_KEY);
  }
  return await openDB(dbName, version, {
    upgrade: (database) => {
      if (database.objectStoreNames.contains(storeName)) {
        database.clear(storeName);
      }
      database.createObjectStore(storeName);
    }
  });
};
async function _getValue(db, storeName, key) {
  return await db.get(storeName, key);
}
async function _setValue(db, storeName, key, value) {
  return await db.put(storeName, value, key);
}
async function _removeValue(db, storeName, key) {
  return await db.delete(storeName, key);
}
class IdbKeyVal {
  // Do not use - instead prefer create
  constructor(_db, _storeName) {
    __publicField(this, "_db");
    __publicField(this, "_storeName");
    this._db = _db;
    this._storeName = _storeName;
  }
  /**
   * @param {DBCreateOptions} options - DBCreateOptions
   * @param {DBCreateOptions['dbName']} options.dbName name for the indexeddb database
   * @default
   * @param {DBCreateOptions['storeName']} options.storeName name for the indexeddb Data Store
   * @default
   * @param {DBCreateOptions['version']} options.version version of the database. Increment to safely upgrade
   */
  static async create(options) {
    const { dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version = DB_VERSION } = options ?? {};
    const db = await _openDbStore(dbName, storeName, version);
    return new IdbKeyVal(db, storeName);
  }
  /**
   * Basic setter
   * @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
   * @param value value to set
   * @returns void
   */
  async set(key, value) {
    return await _setValue(this._db, this._storeName, key, value);
  }
  /**
   * Basic getter
   * Pass in a type T for type safety if you know the type the value will have if it is found
   * @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
   * @returns `Promise<T | null>`
   * @example
   * await get<string>('exampleKey') -> 'exampleValue'
   */
  async get(key) {
    return await _getValue(this._db, this._storeName, key) ?? null;
  }
  /**
   * Remove a key
   * @param key {@link IDBValidKey}
   * @returns void
   */
  async remove(key) {
    return await _removeValue(this._db, this._storeName, key);
  }
}
const KEY_STORAGE_KEY = "identity";
const KEY_STORAGE_DELEGATION = "delegation";
const KEY_VECTOR = "iv";
const DB_VERSION = 1;
const isBrowser = typeof window !== "undefined";
class LocalStorage {
  constructor(prefix = "ic-", _localStorage) {
    __publicField(this, "prefix");
    __publicField(this, "_localStorage");
    this.prefix = prefix;
    this._localStorage = _localStorage;
  }
  get(key) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + key));
  }
  set(key, value) {
    this._getLocalStorage().setItem(this.prefix + key, value);
    return Promise.resolve();
  }
  remove(key) {
    this._getLocalStorage().removeItem(this.prefix + key);
    return Promise.resolve();
  }
  _getLocalStorage() {
    if (this._localStorage) {
      return this._localStorage;
    }
    const ls = typeof window === "undefined" ? typeof global === "undefined" ? typeof self === "undefined" ? void 0 : self.localStorage : global.localStorage : window.localStorage;
    if (!ls) {
      throw new Error("Could not find local storage.");
    }
    return ls;
  }
}
class IdbStorage {
  /**
   * @param options - DBCreateOptions
   * @param options.dbName - name for the indexeddb database
   * @param options.storeName - name for the indexeddb Data Store
   * @param options.version - version of the database. Increment to safely upgrade
   * @example
   * ```ts
   * const storage = new IdbStorage({ dbName: 'my-db', storeName: 'my-store', version: 2 });
   * ```
   */
  constructor(options) {
    __privateAdd(this, _options);
    // Initializes a KeyVal on first request
    __publicField(this, "initializedDb");
    __privateSet(this, _options, options ?? {});
  }
  get _db() {
    return new Promise((resolve, reject) => {
      if (this.initializedDb) {
        resolve(this.initializedDb);
        return;
      }
      IdbKeyVal.create(__privateGet(this, _options)).then((db) => {
        this.initializedDb = db;
        resolve(db);
      }).catch(reject);
    });
  }
  async get(key) {
    const db = await this._db;
    return await db.get(key);
  }
  async set(key, value) {
    const db = await this._db;
    await db.set(key, value);
  }
  async remove(key) {
    const db = await this._db;
    await db.remove(key);
  }
}
_options = new WeakMap();
const NANOSECONDS_PER_SECOND = BigInt(1e9);
const SECONDS_PER_HOUR = BigInt(3600);
const NANOSECONDS_PER_HOUR = NANOSECONDS_PER_SECOND * SECONDS_PER_HOUR;
const IDENTITY_PROVIDER_DEFAULT = "https://identity.internetcomputer.org";
const IDENTITY_PROVIDER_ENDPOINT = "#authorize";
const DEFAULT_MAX_TIME_TO_LIVE = BigInt(8) * NANOSECONDS_PER_HOUR;
const ECDSA_KEY_LABEL = "ECDSA";
const ED25519_KEY_LABEL = "Ed25519";
const INTERRUPT_CHECK_INTERVAL = 500;
const ERROR_USER_INTERRUPT = "UserInterrupt";
class AuthClient {
  constructor(_identity2, _key, _chain, _storage, idleManager, _createOptions, _idpWindow, _eventHandler) {
    __publicField(this, "_identity");
    __publicField(this, "_key");
    __publicField(this, "_chain");
    __publicField(this, "_storage");
    __publicField(this, "idleManager");
    __publicField(this, "_createOptions");
    __publicField(this, "_idpWindow");
    __publicField(this, "_eventHandler");
    this._identity = _identity2;
    this._key = _key;
    this._chain = _chain;
    this._storage = _storage;
    this.idleManager = idleManager;
    this._createOptions = _createOptions;
    this._idpWindow = _idpWindow;
    this._eventHandler = _eventHandler;
    this._registerDefaultIdleCallback();
  }
  /**
   * Create an AuthClient to manage authentication and identity
   * @param {AuthClientCreateOptions} options - Options for creating an {@link AuthClient}
   * @see {@link AuthClientCreateOptions}
   * @param options.identity Optional Identity to use as the base
   * @see {@link SignIdentity}
   * @param options.storage Storage mechanism for delegation credentials
   * @see {@link AuthClientStorage}
   * @param options.keyType Type of key to use for the base key
   * @param {IdleOptions} options.idleOptions Configures an {@link IdleManager}
   * @see {@link IdleOptions}
   * Default behavior is to clear stored identity and reload the page when a user goes idle, unless you set the disableDefaultIdleCallback flag or pass in a custom idle callback.
   * @example
   * const authClient = await AuthClient.create({
   *   idleOptions: {
   *     disableIdle: true
   *   }
   * })
   */
  static async create(options = {}) {
    var _a3;
    const storage = options.storage ?? new IdbStorage();
    const keyType = options.keyType ?? ECDSA_KEY_LABEL;
    let key = null;
    if (options.identity) {
      key = options.identity;
    } else {
      let maybeIdentityStorage = await storage.get(KEY_STORAGE_KEY);
      if (!maybeIdentityStorage && isBrowser) {
        try {
          const fallbackLocalStorage = new LocalStorage();
          const localChain = await fallbackLocalStorage.get(KEY_STORAGE_DELEGATION);
          const localKey = await fallbackLocalStorage.get(KEY_STORAGE_KEY);
          if (localChain && localKey && keyType === ECDSA_KEY_LABEL) {
            console.log("Discovered an identity stored in localstorage. Migrating to IndexedDB");
            await storage.set(KEY_STORAGE_DELEGATION, localChain);
            await storage.set(KEY_STORAGE_KEY, localKey);
            maybeIdentityStorage = localChain;
            await fallbackLocalStorage.remove(KEY_STORAGE_DELEGATION);
            await fallbackLocalStorage.remove(KEY_STORAGE_KEY);
          }
        } catch (error) {
          console.error("error while attempting to recover localstorage: " + error);
        }
      }
      if (maybeIdentityStorage) {
        try {
          if (typeof maybeIdentityStorage === "object") {
            if (keyType === ED25519_KEY_LABEL && typeof maybeIdentityStorage === "string") {
              key = Ed25519KeyIdentity.fromJSON(maybeIdentityStorage);
            } else {
              key = await ECDSAKeyIdentity.fromKeyPair(maybeIdentityStorage);
            }
          } else if (typeof maybeIdentityStorage === "string") {
            key = Ed25519KeyIdentity.fromJSON(maybeIdentityStorage);
          }
        } catch {
        }
      }
    }
    let identity = new AnonymousIdentity();
    let chain2 = null;
    if (key) {
      try {
        const chainStorage = await storage.get(KEY_STORAGE_DELEGATION);
        if (typeof chainStorage === "object" && chainStorage !== null) {
          throw new Error("Delegation chain is incorrectly stored. A delegation chain should be stored as a string.");
        }
        if (options.identity) {
          identity = options.identity;
        } else if (chainStorage) {
          chain2 = DelegationChain.fromJSON(chainStorage);
          if (!isDelegationValid(chain2)) {
            await _deleteStorage(storage);
            key = null;
          } else {
            if ("toDer" in key) {
              identity = PartialDelegationIdentity.fromDelegation(key, chain2);
            } else {
              identity = DelegationIdentity.fromDelegation(key, chain2);
            }
          }
        }
      } catch (e) {
        console.error(e);
        await _deleteStorage(storage);
        key = null;
      }
    }
    let idleManager;
    if ((_a3 = options.idleOptions) == null ? void 0 : _a3.disableIdle) {
      idleManager = void 0;
    } else if (chain2 || options.identity) {
      idleManager = IdleManager.create(options.idleOptions);
    }
    if (!key) {
      if (keyType === ED25519_KEY_LABEL) {
        key = Ed25519KeyIdentity.generate();
        await storage.set(KEY_STORAGE_KEY, JSON.stringify(key.toJSON()));
      } else {
        if (options.storage && keyType === ECDSA_KEY_LABEL) {
          console.warn(`You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${ED25519_KEY_LABEL}' as the key type, as it can serialize to a string`);
        }
        key = await ECDSAKeyIdentity.generate();
        await storage.set(KEY_STORAGE_KEY, key.getKeyPair());
      }
    }
    return new this(identity, key, chain2, storage, idleManager, options);
  }
  _registerDefaultIdleCallback() {
    var _a3, _b2;
    const idleOptions = (_a3 = this._createOptions) == null ? void 0 : _a3.idleOptions;
    if (!(idleOptions == null ? void 0 : idleOptions.onIdle) && !(idleOptions == null ? void 0 : idleOptions.disableDefaultIdleCallback)) {
      (_b2 = this.idleManager) == null ? void 0 : _b2.registerCallback(() => {
        this.logout();
        location.reload();
      });
    }
  }
  async _handleSuccess(message, onSuccess) {
    var _a3, _b2;
    const delegations = message.delegations.map((signedDelegation) => {
      return {
        delegation: new Delegation(signedDelegation.delegation.pubkey, signedDelegation.delegation.expiration, signedDelegation.delegation.targets),
        signature: signedDelegation.signature
      };
    });
    const delegationChain = DelegationChain.fromDelegations(delegations, message.userPublicKey);
    const key = this._key;
    if (!key) {
      return;
    }
    this._chain = delegationChain;
    if ("toDer" in key) {
      this._identity = PartialDelegationIdentity.fromDelegation(key, this._chain);
    } else {
      this._identity = DelegationIdentity.fromDelegation(key, this._chain);
    }
    (_a3 = this._idpWindow) == null ? void 0 : _a3.close();
    const idleOptions = (_b2 = this._createOptions) == null ? void 0 : _b2.idleOptions;
    if (!this.idleManager && !(idleOptions == null ? void 0 : idleOptions.disableIdle)) {
      this.idleManager = IdleManager.create(idleOptions);
      this._registerDefaultIdleCallback();
    }
    this._removeEventListener();
    delete this._idpWindow;
    if (this._chain) {
      await this._storage.set(KEY_STORAGE_DELEGATION, JSON.stringify(this._chain.toJSON()));
    }
    onSuccess == null ? void 0 : onSuccess(message);
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null && isDelegationValid(this._chain);
  }
  /**
   * AuthClient Login - Opens up a new window to authenticate with Internet Identity
   * @param {AuthClientLoginOptions} options - Options for logging in, merged with the options set during creation if any. Note: we only perform a shallow merge for the `customValues` property.
   * @param options.identityProvider Identity provider
   * @param options.maxTimeToLive Expiration of the authentication in nanoseconds
   * @param options.allowPinAuthentication If present, indicates whether or not the Identity Provider should allow the user to authenticate and/or register using a temporary key/PIN identity. Authenticating dapps may want to prevent users from using Temporary keys/PIN identities because Temporary keys/PIN identities are less secure than Passkeys (webauthn credentials) and because Temporary keys/PIN identities generally only live in a browser database (which may get cleared by the browser/OS).
   * @param options.derivationOrigin Origin for Identity Provider to use while generating the delegated identity
   * @param options.windowOpenerFeatures Configures the opened authentication window
   * @param options.onSuccess Callback once login has completed
   * @param options.onError Callback in case authentication fails
   * @param options.customValues Extra values to be passed in the login request during the authorize-ready phase. Note: we only perform a shallow merge for the `customValues` property.
   * @example
   * const authClient = await AuthClient.create();
   * authClient.login({
   *  identityProvider: 'http://<canisterID>.127.0.0.1:8000',
   *  maxTimeToLive: BigInt (7) * BigInt(24) * BigInt(3_600_000_000_000), // 1 week
   *  windowOpenerFeatures: "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
   *  onSuccess: () => {
   *    console.log('Login Successful!');
   *  },
   *  onError: (error) => {
   *    console.error('Login Failed: ', error);
   *  }
   * });
   */
  async login(options) {
    var _a3, _b2, _c;
    const loginOptions = mergeLoginOptions((_a3 = this._createOptions) == null ? void 0 : _a3.loginOptions, options);
    const maxTimeToLive = (loginOptions == null ? void 0 : loginOptions.maxTimeToLive) ?? DEFAULT_MAX_TIME_TO_LIVE;
    const identityProviderUrl = new URL(((_b2 = loginOptions == null ? void 0 : loginOptions.identityProvider) == null ? void 0 : _b2.toString()) || IDENTITY_PROVIDER_DEFAULT);
    identityProviderUrl.hash = IDENTITY_PROVIDER_ENDPOINT;
    (_c = this._idpWindow) == null ? void 0 : _c.close();
    this._removeEventListener();
    this._eventHandler = this._getEventHandler(identityProviderUrl, {
      maxTimeToLive,
      ...loginOptions
    });
    window.addEventListener("message", this._eventHandler);
    this._idpWindow = window.open(identityProviderUrl.toString(), "idpWindow", loginOptions == null ? void 0 : loginOptions.windowOpenerFeatures) ?? void 0;
    const checkInterruption = () => {
      if (this._idpWindow) {
        if (this._idpWindow.closed) {
          this._handleFailure(ERROR_USER_INTERRUPT, loginOptions == null ? void 0 : loginOptions.onError);
        } else {
          setTimeout(checkInterruption, INTERRUPT_CHECK_INTERVAL);
        }
      }
    };
    checkInterruption();
  }
  _getEventHandler(identityProviderUrl, options) {
    return async (event) => {
      var _a3, _b2, _c;
      if (event.origin !== identityProviderUrl.origin) {
        return;
      }
      const message = event.data;
      switch (message.kind) {
        case "authorize-ready": {
          const request2 = {
            kind: "authorize-client",
            sessionPublicKey: new Uint8Array((_a3 = this._key) == null ? void 0 : _a3.getPublicKey().toDer()),
            maxTimeToLive: options == null ? void 0 : options.maxTimeToLive,
            allowPinAuthentication: options == null ? void 0 : options.allowPinAuthentication,
            derivationOrigin: (_b2 = options == null ? void 0 : options.derivationOrigin) == null ? void 0 : _b2.toString(),
            // Pass any custom values to the IDP.
            ...options == null ? void 0 : options.customValues
          };
          (_c = this._idpWindow) == null ? void 0 : _c.postMessage(request2, identityProviderUrl.origin);
          break;
        }
        case "authorize-client-success":
          try {
            await this._handleSuccess(message, options == null ? void 0 : options.onSuccess);
          } catch (err) {
            this._handleFailure(err.message, options == null ? void 0 : options.onError);
          }
          break;
        case "authorize-client-failure":
          this._handleFailure(message.text, options == null ? void 0 : options.onError);
          break;
      }
    };
  }
  _handleFailure(errorMessage, onError) {
    var _a3;
    (_a3 = this._idpWindow) == null ? void 0 : _a3.close();
    onError == null ? void 0 : onError(errorMessage);
    this._removeEventListener();
    delete this._idpWindow;
  }
  _removeEventListener() {
    if (this._eventHandler) {
      window.removeEventListener("message", this._eventHandler);
    }
    this._eventHandler = void 0;
  }
  async logout(options = {}) {
    await _deleteStorage(this._storage);
    this._identity = new AnonymousIdentity();
    this._chain = null;
    if (options.returnTo) {
      try {
        window.history.pushState({}, "", options.returnTo);
      } catch {
        window.location.href = options.returnTo;
      }
    }
  }
}
async function _deleteStorage(storage) {
  await storage.remove(KEY_STORAGE_KEY);
  await storage.remove(KEY_STORAGE_DELEGATION);
  await storage.remove(KEY_VECTOR);
}
function mergeLoginOptions(loginOptions, otherLoginOptions) {
  if (!loginOptions && !otherLoginOptions) {
    return void 0;
  }
  const customValues = (loginOptions == null ? void 0 : loginOptions.customValues) || (otherLoginOptions == null ? void 0 : otherLoginOptions.customValues) ? {
    ...loginOptions == null ? void 0 : loginOptions.customValues,
    ...otherLoginOptions == null ? void 0 : otherLoginOptions.customValues
  } : void 0;
  return {
    ...loginOptions,
    ...otherLoginOptions,
    customValues
  };
}
const _CaffeineStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _CaffeineStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _CaffeineStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const Category = Record({
  "id": Nat,
  "icon": Text,
  "name": Text,
  "description": Text
});
const Vendor = Record({
  "principal": Principal2,
  "name": Text,
  "businessName": Text,
  "phone": Text
});
const City = Text;
const State = Text;
const Latitude = Float64;
const Longitude = Float64;
const Location = Record({ "lat": Latitude, "lng": Longitude });
const ListingInput = Record({
  "categoryId": Nat,
  "city": City,
  "name": Text,
  "description": Text,
  "photoIds": Vec(Text),
  "website": Text,
  "state": State,
  "address": Text,
  "phone": Text,
  "location": Location
});
const UserRole$1 = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const ListingStatus$1 = Variant({
  "pending": Null,
  "approved": Null,
  "rejected": Null
});
const UserProfile = Record({
  "name": Text,
  "businessName": Text,
  "phone": Text
});
const DistanceKm = Float64;
const SortBy$1 = Variant({
  "byName": Null,
  "byDistance": Null
});
const Time = Int;
const Listing = Record({
  "id": Nat,
  "categoryId": Nat,
  "status": ListingStatus$1,
  "owner": Principal2,
  "city": City,
  "name": Text,
  "description": Text,
  "photoIds": Vec(Text),
  "createdTime": Time,
  "website": Text,
  "state": State,
  "address": Text,
  "phone": Text,
  "location": Location
});
Service({
  "_caffeineStorageBlobIsLive": Func(
    [Vec(Nat8)],
    [Bool],
    ["query"]
  ),
  "_caffeineStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_caffeineStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_caffeineStorageCreateCertificate": Func(
    [Text],
    [_CaffeineStorageCreateCertificateResult],
    []
  ),
  "_caffeineStorageRefillCashier": Func(
    [Opt(_CaffeineStorageRefillInformation)],
    [_CaffeineStorageRefillResult],
    []
  ),
  "_caffeineStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControlWithSecret": Func([Text], [], []),
  "addCategory": Func([Category], [], []),
  "addVendor": Func([Vendor], [], []),
  "adminDeleteListing": Func([Nat], [], []),
  "adminUpdateListing": Func([Nat, ListingInput], [], []),
  "assignCallerUserRole": Func([Principal2, UserRole$1], [], []),
  "changeListingStatus": Func([Nat, ListingStatus$1], [], []),
  "claimFirstAdminRole": Func([], [Bool], []),
  "deleteCategory": Func([Nat], [], []),
  "deleteListing": Func([Nat], [], []),
  "deletePendingListingsRange": Func([Nat, Nat], [], []),
  "forceResetAdmin": Func([], [], []),
  "getAllVendors": Func([], [Vec(Vendor)], ["query"]),
  "getCallerUserProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getCallerUserRole": Func([], [UserRole$1], ["query"]),
  "getCategories": Func([], [Vec(Category)], ["query"]),
  "getListingsByCategoryAndLocation": Func(
    [Nat, Location, DistanceKm, SortBy$1],
    [Vec(Listing)],
    ["query"]
  ),
  "getPendingListings": Func([], [Vec(Listing)], ["query"]),
  "getUserProfile": Func(
    [Principal2],
    [Opt(UserProfile)],
    ["query"]
  ),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "saveCallerUserProfile": Func([UserProfile], [], []),
  "searchListingsByCity": Func([Text], [Vec(Listing)], ["query"]),
  "submitListing": Func([ListingInput], [], []),
  "updateCategory": Func([Nat, Category], [], []),
  "updateListing": Func([Nat, ListingInput], [], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const _CaffeineStorageCreateCertificateResult2 = IDL2.Record({
    "method": IDL2.Text,
    "blob_hash": IDL2.Text
  });
  const _CaffeineStorageRefillInformation2 = IDL2.Record({
    "proposed_top_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const _CaffeineStorageRefillResult2 = IDL2.Record({
    "success": IDL2.Opt(IDL2.Bool),
    "topped_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const Category2 = IDL2.Record({
    "id": IDL2.Nat,
    "icon": IDL2.Text,
    "name": IDL2.Text,
    "description": IDL2.Text
  });
  const Vendor2 = IDL2.Record({
    "principal": IDL2.Principal,
    "name": IDL2.Text,
    "businessName": IDL2.Text,
    "phone": IDL2.Text
  });
  const City2 = IDL2.Text;
  const State2 = IDL2.Text;
  const Latitude2 = IDL2.Float64;
  const Longitude2 = IDL2.Float64;
  const Location2 = IDL2.Record({ "lat": Latitude2, "lng": Longitude2 });
  const ListingInput2 = IDL2.Record({
    "categoryId": IDL2.Nat,
    "city": City2,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "photoIds": IDL2.Vec(IDL2.Text),
    "website": IDL2.Text,
    "state": State2,
    "address": IDL2.Text,
    "phone": IDL2.Text,
    "location": Location2
  });
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const ListingStatus2 = IDL2.Variant({
    "pending": IDL2.Null,
    "approved": IDL2.Null,
    "rejected": IDL2.Null
  });
  const UserProfile2 = IDL2.Record({
    "name": IDL2.Text,
    "businessName": IDL2.Text,
    "phone": IDL2.Text
  });
  const DistanceKm2 = IDL2.Float64;
  const SortBy2 = IDL2.Variant({ "byName": IDL2.Null, "byDistance": IDL2.Null });
  const Time2 = IDL2.Int;
  const Listing2 = IDL2.Record({
    "id": IDL2.Nat,
    "categoryId": IDL2.Nat,
    "status": ListingStatus2,
    "owner": IDL2.Principal,
    "city": City2,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "photoIds": IDL2.Vec(IDL2.Text),
    "createdTime": Time2,
    "website": IDL2.Text,
    "state": State2,
    "address": IDL2.Text,
    "phone": IDL2.Text,
    "location": Location2
  });
  return IDL2.Service({
    "_caffeineStorageBlobIsLive": IDL2.Func(
      [IDL2.Vec(IDL2.Nat8)],
      [IDL2.Bool],
      ["query"]
    ),
    "_caffeineStorageBlobsToDelete": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      ["query"]
    ),
    "_caffeineStorageConfirmBlobDeletion": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [],
      []
    ),
    "_caffeineStorageCreateCertificate": IDL2.Func(
      [IDL2.Text],
      [_CaffeineStorageCreateCertificateResult2],
      []
    ),
    "_caffeineStorageRefillCashier": IDL2.Func(
      [IDL2.Opt(_CaffeineStorageRefillInformation2)],
      [_CaffeineStorageRefillResult2],
      []
    ),
    "_caffeineStorageUpdateGatewayPrincipals": IDL2.Func([], [], []),
    "_initializeAccessControlWithSecret": IDL2.Func([IDL2.Text], [], []),
    "addCategory": IDL2.Func([Category2], [], []),
    "addVendor": IDL2.Func([Vendor2], [], []),
    "adminDeleteListing": IDL2.Func([IDL2.Nat], [], []),
    "adminUpdateListing": IDL2.Func([IDL2.Nat, ListingInput2], [], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "changeListingStatus": IDL2.Func([IDL2.Nat, ListingStatus2], [], []),
    "claimFirstAdminRole": IDL2.Func([], [IDL2.Bool], []),
    "deleteCategory": IDL2.Func([IDL2.Nat], [], []),
    "deleteListing": IDL2.Func([IDL2.Nat], [], []),
    "deletePendingListingsRange": IDL2.Func([IDL2.Nat, IDL2.Nat], [], []),
    "getAllVendors": IDL2.Func([], [IDL2.Vec(Vendor2)], ["query"]),
    "forceResetAdmin": IDL2.Func([], [], []),
    "getCallerUserProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getCategories": IDL2.Func([], [IDL2.Vec(Category2)], ["query"]),
    "getListingsByCategoryAndLocation": IDL2.Func(
      [IDL2.Nat, Location2, DistanceKm2, SortBy2],
      [IDL2.Vec(Listing2)],
      ["query"]
    ),
    "getPendingListings": IDL2.Func([], [IDL2.Vec(Listing2)], ["query"]),
    "getUserProfile": IDL2.Func(
      [IDL2.Principal],
      [IDL2.Opt(UserProfile2)],
      ["query"]
    ),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "saveCallerUserProfile": IDL2.Func([UserProfile2], [], []),
    "searchListingsByCity": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(Listing2)],
      ["query"]
    ),
    "submitListing": IDL2.Func([ListingInput2], [], []),
    "updateCategory": IDL2.Func([IDL2.Nat, Category2], [], []),
    "updateListing": IDL2.Func([IDL2.Nat, ListingInput2], [], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class ExternalBlob {
  constructor(directURL, blob) {
    __publicField(this, "_blob");
    __publicField(this, "directURL");
    __publicField(this, "onProgress");
    if (blob) {
      this._blob = blob;
    }
    this.directURL = directURL;
  }
  static fromURL(url) {
    return new ExternalBlob(url, null);
  }
  static fromBytes(blob) {
    const url = URL.createObjectURL(new Blob([
      new Uint8Array(blob)
    ], {
      type: "application/octet-stream"
    }));
    return new ExternalBlob(url, blob);
  }
  async getBytes() {
    if (this._blob) {
      return this._blob;
    }
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  getDirectURL() {
    return this.directURL;
  }
  withUploadProgress(onProgress) {
    this.onProgress = onProgress;
    return this;
  }
}
var ListingStatus = /* @__PURE__ */ ((ListingStatus2) => {
  ListingStatus2["pending"] = "pending";
  ListingStatus2["approved"] = "approved";
  ListingStatus2["rejected"] = "rejected";
  return ListingStatus2;
})(ListingStatus || {});
var SortBy = /* @__PURE__ */ ((SortBy2) => {
  SortBy2["byName"] = "byName";
  SortBy2["byDistance"] = "byDistance";
  return SortBy2;
})(SortBy || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["admin"] = "admin";
  UserRole2["user"] = "user";
  UserRole2["guest"] = "guest";
  return UserRole2;
})(UserRole || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError2) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError2;
  }
  async _caffeineStorageBlobIsLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._caffeineStorageBlobIsLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._caffeineStorageBlobIsLive(arg0);
      return result;
    }
  }
  async _caffeineStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._caffeineStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._caffeineStorageBlobsToDelete();
      return result;
    }
  }
  async _caffeineStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._caffeineStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._caffeineStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _caffeineStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._caffeineStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._caffeineStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _caffeineStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._caffeineStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__CaffeineStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._caffeineStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__CaffeineStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _caffeineStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._caffeineStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._caffeineStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControlWithSecret(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControlWithSecret(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControlWithSecret(arg0);
      return result;
    }
  }
  async addCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addCategory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addCategory(arg0);
      return result;
    }
  }
  async addVendor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addVendor(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addVendor(arg0);
      return result;
    }
  }
  async adminDeleteListing(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteListing(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteListing(arg0);
      return result;
    }
  }
  async adminUpdateListing(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateListing(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateListing(arg0, arg1);
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async changeListingStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.changeListingStatus(arg0, to_candid_ListingStatus_n10(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.changeListingStatus(arg0, to_candid_ListingStatus_n10(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async claimFirstAdminRole() {
    if (this.processError) {
      try {
        const result = await this.actor.claimFirstAdminRole();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.claimFirstAdminRole();
      return result;
    }
  }
  async deleteCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteCategory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteCategory(arg0);
      return result;
    }
  }
  async deleteListing(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteListing(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteListing(arg0);
      return result;
    }
  }
  async deletePendingListingsRange(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.deletePendingListingsRange(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deletePendingListingsRange(arg0, arg1);
      return result;
    }
  }
  async forceResetAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.forceResetAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.forceResetAdmin();
      return result;
    }
  }
  async getAllVendors() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllVendors();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllVendors();
      return result;
    }
  }
  async getCallerUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserProfile();
        return from_candid_opt_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserProfile();
      return from_candid_opt_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n13(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n13(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCategories() {
    if (this.processError) {
      try {
        const result = await this.actor.getCategories();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCategories();
      return result;
    }
  }
  async getListingsByCategoryAndLocation(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.getListingsByCategoryAndLocation(arg0, arg1, arg2, to_candid_SortBy_n15(this._uploadFile, this._downloadFile, arg3));
        return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getListingsByCategoryAndLocation(arg0, arg1, arg2, to_candid_SortBy_n15(this._uploadFile, this._downloadFile, arg3));
      return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPendingListings() {
    if (this.processError) {
      try {
        const result = await this.actor.getPendingListings();
        return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPendingListings();
      return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile(arg0);
        return from_candid_opt_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile(arg0);
      return from_candid_opt_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async saveCallerUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveCallerUserProfile(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveCallerUserProfile(arg0);
      return result;
    }
  }
  async searchListingsByCity(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchListingsByCity(arg0);
        return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchListingsByCity(arg0);
      return from_candid_vec_n17(this._uploadFile, this._downloadFile, result);
    }
  }
  async submitListing(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.submitListing(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitListing(arg0);
      return result;
    }
  }
  async updateCategory(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCategory(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCategory(arg0, arg1);
      return result;
    }
  }
  async updateListing(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateListing(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateListing(arg0, arg1);
      return result;
    }
  }
}
function from_candid_ListingStatus_n20(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n21(_uploadFile, _downloadFile, value);
}
function from_candid_Listing_n18(_uploadFile, _downloadFile, value) {
  return from_candid_record_n19(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n13(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n14(_uploadFile, _downloadFile, value);
}
function from_candid__CaffeineStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n12(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n19(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    categoryId: value.categoryId,
    status: from_candid_ListingStatus_n20(_uploadFile, _downloadFile, value.status),
    owner: value.owner,
    city: value.city,
    name: value.name,
    description: value.description,
    photoIds: value.photoIds,
    createdTime: value.createdTime,
    website: value.website,
    state: value.state,
    address: value.address,
    phone: value.phone,
    location: value.location
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
function from_candid_variant_n14(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n21(_uploadFile, _downloadFile, value) {
  return "pending" in value ? "pending" : "approved" in value ? "approved" : "rejected" in value ? "rejected" : value;
}
function from_candid_vec_n17(_uploadFile, _downloadFile, value) {
  return value.map((x2) => from_candid_Listing_n18(_uploadFile, _downloadFile, x2));
}
function to_candid_ListingStatus_n10(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n11(_uploadFile, _downloadFile, value);
}
function to_candid_SortBy_n15(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n16(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n8(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function to_candid__CaffeineStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__CaffeineStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
function to_candid_variant_n11(_uploadFile, _downloadFile, value) {
  return value == "pending" ? {
    pending: null
  } : value == "approved" ? {
    approved: null
  } : value == "rejected" ? {
    rejected: null
  } : value;
}
function to_candid_variant_n16(_uploadFile, _downloadFile, value) {
  return value == "byName" ? {
    byName: null
  } : value == "byDistance" ? {
    byDistance: null
  } : value;
}
function to_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
const backend = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Backend,
  ExternalBlob,
  ListingStatus,
  SortBy,
  UserRole,
  createActor
}, Symbol.toStringTag, { value: "Module" }));
const MAXIMUM_CONCURRENT_UPLOADS = 10;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1e3;
const MAX_DELAY_MS = 3e4;
const GATEWAY_VERSION = "v1";
const HASH_ALGORITHM = "SHA-256";
const SHA256_PREFIX = "sha256:";
const DOMAIN_SEPARATOR_FOR_CHUNKS = new TextEncoder().encode("icfs-chunk/");
const DOMAIN_SEPARATOR_FOR_METADATA = new TextEncoder().encode(
  "icfs-metadata/"
);
const DOMAIN_SEPARATOR_FOR_NODES = new TextEncoder().encode("ynode/");
async function withRetry(operation) {
  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const shouldRetry = isRetriableError(error);
      if (attempt === MAX_RETRIES || !shouldRetry) {
        if (!shouldRetry && attempt < MAX_RETRIES) {
          console.warn(
            `Non-retriable error encountered: ${lastError.message}. Not retrying.`
          );
        }
        throw error;
      }
      const delay = Math.min(
        BASE_DELAY_MS * 2 ** attempt + Math.random() * 1e3,
        MAX_DELAY_MS
      );
      console.warn(
        `Request failed (attempt ${attempt + 1}/${MAX_RETRIES + 1}): ${lastError.message}. Retrying in ${Math.round(delay)}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError || new Error("Unknown error occurred during retry attempts");
}
function isRetriableError(error) {
  var _a3, _b2;
  const errorMessage = ((_a3 = error == null ? void 0 : error.message) == null ? void 0 : _a3.toLowerCase()) || "";
  if ((_b2 = error == null ? void 0 : error.response) == null ? void 0 : _b2.status) {
    const status = error.response.status;
    if (status === 408 || status === 429) return true;
    if (status >= 400 && status < 500) return false;
    if (status >= 500) return true;
  }
  if (errorMessage.includes("ssl") || errorMessage.includes("tls") || errorMessage.includes("network error") || errorMessage.includes("connection") || errorMessage.includes("timeout") || errorMessage.includes("fetch")) {
    return true;
  }
  if (errorMessage.includes("validation") || errorMessage.includes("invalid") || errorMessage.includes("malformed") || errorMessage.includes("unauthorized") || errorMessage.includes("forbidden") || errorMessage.includes("not found")) {
    return false;
  }
  return true;
}
function validateHashFormat(hash, context) {
  if (!hash) {
    throw new Error(`${context}: Hash cannot be empty`);
  }
  if (!hash.startsWith(SHA256_PREFIX)) {
    throw new Error(
      `${context}: Invalid hash format. Expected format: ${SHA256_PREFIX}<64-char-hex>, got: ${hash}`
    );
  }
  const hexPart = hash.substring(SHA256_PREFIX.length);
  if (hexPart.length !== 64) {
    throw new Error(
      `${context}: Invalid hash format. Expected 64 hex characters after ${SHA256_PREFIX}, got ${hexPart.length} characters: ${hash}`
    );
  }
  if (!/^[0-9a-f]{64}$/i.test(hexPart)) {
    throw new Error(
      `${context}: Invalid hash format. Hash must contain only hex characters (0-9, a-f), got: ${hash}`
    );
  }
}
class YHash {
  constructor(bytes) {
    __publicField(this, "bytes");
    if (bytes.length !== 32) {
      throw new Error(`YHash must be exactly 32 bytes, got ${bytes.length}`);
    }
    this.bytes = new Uint8Array(bytes);
  }
  static async fromNodes(left, right) {
    let leftBytes = left instanceof YHash ? left.bytes : new TextEncoder().encode("UNBALANCED");
    let rightBytes = right instanceof YHash ? right.bytes : new TextEncoder().encode("UNBALANCED");
    const combined = new Uint8Array(
      DOMAIN_SEPARATOR_FOR_NODES.length + leftBytes.length + rightBytes.length
    );
    const arrays = [DOMAIN_SEPARATOR_FOR_NODES, leftBytes, rightBytes];
    let offset = 0;
    for (const data of arrays) {
      combined.set(data, offset);
      offset += data.length;
    }
    const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, combined);
    return new YHash(new Uint8Array(hashBuffer));
  }
  static async fromChunk(data) {
    return YHash.fromBytes(DOMAIN_SEPARATOR_FOR_CHUNKS, data);
  }
  static async fromHeaders(headers) {
    const headerLines = [];
    for (const [key, value] of Object.entries(headers)) {
      headerLines.push(`${key.trim()}: ${value.trim()}
`);
    }
    headerLines.sort();
    const hash = await YHash.fromBytes(
      DOMAIN_SEPARATOR_FOR_METADATA,
      new TextEncoder().encode(headerLines.join(""))
    );
    return hash;
  }
  static async fromBytes(domainSeparator, data) {
    const combined = new Uint8Array(domainSeparator.length + data.length);
    combined.set(domainSeparator);
    combined.set(data, domainSeparator.length);
    const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, combined);
    return new YHash(new Uint8Array(hashBuffer));
  }
  static fromHex(hexString) {
    const bytes = new Uint8Array(
      hexString.match(/.{1,2}/g).map((byte) => Number.parseInt(byte, 16))
    );
    return new YHash(bytes);
  }
  toShaString() {
    return `${SHA256_PREFIX}${this.toHex()}`;
  }
  toString() {
    throw new Error("toString is not supported for YHash");
  }
  toHex() {
    return Array.from(this.bytes).map((b2) => b2.toString(16).padStart(2, "0")).join("");
  }
}
function nodeToJSON(node) {
  return {
    hash: node.hash.toShaString(),
    left: node.left ? nodeToJSON(node.left) : null,
    right: node.right ? nodeToJSON(node.right) : null
  };
}
class BlobHashTree {
  constructor(chunk_hashes, tree, headers = null) {
    __publicField(this, "tree_type");
    __publicField(this, "chunk_hashes");
    __publicField(this, "tree");
    __publicField(this, "headers");
    this.tree_type = "DSBMTWH";
    this.chunk_hashes = chunk_hashes;
    this.tree = tree;
    if (headers == null) {
      this.headers = [];
    } else if (Array.isArray(headers)) {
      this.headers = headers;
    } else {
      this.headers = Object.entries(headers).map(
        ([key, value]) => `${key.trim()}: ${value.trim()}`
      );
    }
    this.headers.sort();
  }
  static async build(chunkHashes, headers = {}) {
    if (chunkHashes.length === 0) {
      const hex = "8b8e620f084e48da0be2287fd12c5aaa4dbe14b468fd2e360f48d741fe7628a0";
      const bytes = new TextEncoder().encode(hex);
      chunkHashes.push(new YHash(bytes));
    }
    let level = chunkHashes.map((hash) => ({
      hash,
      left: null,
      right: null
    }));
    while (level.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1] || null;
        const parentHash = await YHash.fromNodes(
          left.hash,
          right ? right.hash : null
        );
        nextLevel.push({
          hash: parentHash,
          left,
          right
        });
      }
      level = nextLevel;
    }
    const chunksRoot = level[0];
    if (headers && Object.keys(headers).length > 0) {
      const metadataRootHash = await YHash.fromHeaders(headers);
      const metadataRoot = {
        hash: metadataRootHash,
        left: null,
        right: null
      };
      const combinedRootHash = await YHash.fromNodes(
        chunksRoot.hash,
        metadataRoot.hash
      );
      const combinedRoot = {
        hash: combinedRootHash,
        left: chunksRoot,
        right: metadataRoot
      };
      return new BlobHashTree(chunkHashes, combinedRoot, headers);
    }
    return new BlobHashTree(chunkHashes, chunksRoot, headers);
  }
  toJSON() {
    return {
      tree_type: this.tree_type,
      chunk_hashes: this.chunk_hashes.map((h2) => h2.toShaString()),
      tree: nodeToJSON(this.tree),
      headers: this.headers
    };
  }
}
class StorageGatewayClient {
  constructor(storageGatewayUrl) {
    this.storageGatewayUrl = storageGatewayUrl;
  }
  getStorageGatewayUrl() {
    return this.storageGatewayUrl;
  }
  async uploadChunk(params) {
    const blobHashString = params.blobRootHash.toShaString();
    const chunkHashString = params.chunkHash.toShaString();
    validateHashFormat(
      blobHashString,
      `uploadChunk[${params.chunkIndex}] blob_hash`
    );
    validateHashFormat(
      chunkHashString,
      `uploadChunk[${params.chunkIndex}] chunk_hash`
    );
    return await withRetry(async () => {
      const queryParams = new URLSearchParams({
        owner_id: params.owner,
        blob_hash: blobHashString,
        chunk_hash: chunkHashString,
        chunk_index: params.chunkIndex.toString(),
        bucket_name: params.bucketName,
        project_id: params.projectId
      });
      const url = `${this.storageGatewayUrl}/${GATEWAY_VERSION}/chunk/?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
          "X-Caffeine-Project-ID": params.projectId
        },
        body: params.chunkData
      });
      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(
          `Failed to upload chunk ${params.chunkIndex}: ${response.status} ${response.statusText} - ${errorText}`
        );
        error.response = { status: response.status };
        throw error;
      }
      const result = await response.json();
      return {
        isComplete: result.status === "blob_complete"
      };
    });
  }
  async uploadBlobTree(blobHashTree, bucketName, numBlobBytes, owner, projectId, certificateBytes) {
    const treeJSON = blobHashTree.toJSON();
    validateHashFormat(treeJSON.tree.hash, "uploadBlobTree root hash");
    treeJSON.chunk_hashes.forEach((hash, index2) => {
      validateHashFormat(hash, `uploadBlobTree chunk_hash[${index2}]`);
    });
    return await withRetry(async () => {
      const url = `${this.storageGatewayUrl}/${GATEWAY_VERSION}/blob-tree/`;
      const requestBody = {
        blob_tree: treeJSON,
        bucket_name: bucketName,
        num_blob_bytes: numBlobBytes,
        owner,
        project_id: projectId,
        headers: blobHashTree.headers,
        auth: {
          OwnerEgressSignature: Array.from(certificateBytes)
        }
      };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Caffeine-Project-ID": projectId
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(
          `Failed to upload blob tree: ${response.status} ${response.statusText} - ${errorText}`
        );
        error.response = { status: response.status };
        throw error;
      }
    });
  }
}
class StorageClient {
  constructor(bucket, storageGatewayUrl, backendCanisterId, projectId, agent) {
    __publicField(this, "storageGatewayClient");
    this.bucket = bucket;
    this.backendCanisterId = backendCanisterId;
    this.projectId = projectId;
    this.agent = agent;
    this.storageGatewayClient = new StorageGatewayClient(storageGatewayUrl);
  }
  async getCertificate(hash) {
    const args = encode$1([Text], [hash]);
    const result = await this.agent.call(this.backendCanisterId, {
      methodName: "_caffeineStorageCreateCertificate",
      arg: args
    });
    const respone = result.response.body;
    if (isV3ResponseBody(respone)) {
      console.log("Certificate:", respone.certificate);
      return respone.certificate;
    }
    throw new Error("Expected v3 response body");
  }
  async putFile(blobBytes, onProgress) {
    const httpHeaders = {
      "Content-Type": "application/json"
    };
    const file = new Blob([new Uint8Array(blobBytes)], {
      type: "application/octet-stream"
    });
    const fileHeaders = {
      "Content-Type": "application/octet-stream",
      "Content-Length": file.size.toString()
    };
    const { chunks, chunkHashes, blobHashTree } = await this.processFileForUpload(file, fileHeaders);
    const blobRootHash = blobHashTree.tree.hash;
    const hashString2 = blobRootHash.toShaString();
    const certificateBytes = await this.getCertificate(hashString2);
    await this.storageGatewayClient.uploadBlobTree(
      blobHashTree,
      this.bucket,
      file.size,
      this.backendCanisterId,
      this.projectId,
      certificateBytes
    );
    await this.parallelUpload(
      chunks,
      chunkHashes,
      blobRootHash,
      httpHeaders,
      onProgress
    );
    return { hash: hashString2 };
  }
  async getDirectURL(hash) {
    if (!hash) {
      throw new Error("Hash must not be empty");
    }
    validateHashFormat(hash, `getDirectURL for path '${hash}'`);
    return `${this.storageGatewayClient.getStorageGatewayUrl()}/${GATEWAY_VERSION}/blob/?blob_hash=${encodeURIComponent(hash)}&owner_id=${encodeURIComponent(this.backendCanisterId)}&project_id=${encodeURIComponent(this.projectId)}`;
  }
  async processFileForUpload(file, headers) {
    const chunks = this.createFileChunks(file);
    const chunkHashes = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunkData = new Uint8Array(await chunks[i].arrayBuffer());
      const hash = await YHash.fromChunk(chunkData);
      chunkHashes.push(hash);
    }
    const blobHashTree = await BlobHashTree.build(chunkHashes, headers);
    return { chunks, chunkHashes, blobHashTree };
  }
  async parallelUpload(chunks, chunkHashes, blobRootHash, httpHeaders, onProgress) {
    let completedChunks = 0;
    const uploadSingleChunk = async (index2) => {
      const chunkData = new Uint8Array(await chunks[index2].arrayBuffer());
      const chunkHash = chunkHashes[index2];
      await this.storageGatewayClient.uploadChunk({
        blobRootHash,
        chunkHash,
        chunkIndex: index2,
        chunkData,
        bucketName: this.bucket,
        owner: this.backendCanisterId,
        projectId: this.projectId,
        httpHeaders
      });
      const currentCompleted = ++completedChunks;
      if (onProgress != null) {
        const percentage = chunks.length === 0 ? 100 : Math.round(currentCompleted / chunks.length * 100);
        onProgress(percentage);
      }
    };
    await Promise.all(
      Array.from(
        { length: MAXIMUM_CONCURRENT_UPLOADS },
        async (_2, workerId) => {
          for (let i = workerId; i < chunks.length; i += MAXIMUM_CONCURRENT_UPLOADS) {
            await uploadSingleChunk(i);
          }
        }
      )
    );
  }
  createFileChunks(file, chunkSize = 1024 * 1024) {
    const chunks = [];
    const totalChunks = Math.ceil(file.size / chunkSize);
    for (let index2 = 0; index2 < totalChunks; index2++) {
      const start = index2 * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      chunks.push(chunk);
    }
    return chunks;
  }
}
var define_process_env_default = {};
const DEFAULT_STORAGE_GATEWAY_URL = "https://blob.caffeine.ai";
const DEFAULT_BUCKET_NAME = "default-bucket";
const DEFAULT_PROJECT_ID = "0000000-0000-0000-0000-00000000000";
let configCache = null;
async function loadConfig() {
  if (configCache) {
    return configCache;
  }
  const backendCanisterId = define_process_env_default.CANISTER_ID_BACKEND;
  const envBaseUrl = define_process_env_default.BASE_URL || "/";
  const baseUrl = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;
  try {
    const response = await fetch(`${baseUrl}env.json`);
    const config = await response.json();
    if (!backendCanisterId && config.backend_canister_id === "undefined") {
      console.error("CANISTER_ID_BACKEND is not set");
      throw new Error("CANISTER_ID_BACKEND is not set");
    }
    const fullConfig = {
      backend_host: config.backend_host === "undefined" ? void 0 : config.backend_host,
      backend_canister_id: config.backend_canister_id === "undefined" ? backendCanisterId : config.backend_canister_id,
      storage_gateway_url: "https://blob.caffeine.ai",
      bucket_name: DEFAULT_BUCKET_NAME,
      project_id: config.project_id !== "undefined" ? config.project_id : DEFAULT_PROJECT_ID,
      ii_derivation_origin: config.ii_derivation_origin === "undefined" ? void 0 : config.ii_derivation_origin
    };
    configCache = fullConfig;
    return fullConfig;
  } catch {
    if (!backendCanisterId) {
      console.error("CANISTER_ID_BACKEND is not set");
      throw new Error("CANISTER_ID_BACKEND is not set");
    }
    const fallbackConfig = {
      backend_host: void 0,
      backend_canister_id: backendCanisterId,
      storage_gateway_url: DEFAULT_STORAGE_GATEWAY_URL,
      bucket_name: DEFAULT_BUCKET_NAME,
      project_id: DEFAULT_PROJECT_ID,
      ii_derivation_origin: void 0
    };
    return fallbackConfig;
  }
}
function extractAgentErrorMessage(error) {
  const errorString = String(error);
  const match = errorString.match(/with message:\s*'([^']+)'/s);
  return match ? match[1] : errorString;
}
function processError(e) {
  if (e && typeof e === "object" && "message" in e) {
    throw new Error(extractAgentErrorMessage(`${e.message}`));
  }
  throw e;
}
async function maybeLoadMockBackend() {
  {
    return null;
  }
}
async function createActorWithConfig(options) {
  var _a3;
  const mock = await maybeLoadMockBackend();
  if (mock) {
    return mock;
  }
  const config = await loadConfig();
  const resolvedOptions = options ?? {};
  const agent = new HttpAgent({
    ...resolvedOptions.agentOptions,
    host: config.backend_host
  });
  if ((_a3 = config.backend_host) == null ? void 0 : _a3.includes("localhost")) {
    await agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }
  const actorOptions = {
    ...resolvedOptions,
    agent,
    processError
  };
  const storageClient = new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent
  );
  const MOTOKO_DEDUPLICATION_SENTINEL = "!caf!";
  const uploadFile = async (file) => {
    const { hash } = await storageClient.putFile(
      await file.getBytes(),
      file.onProgress
    );
    return new TextEncoder().encode(MOTOKO_DEDUPLICATION_SENTINEL + hash);
  };
  const downloadFile = async (bytes) => {
    const hashWithPrefix = new TextDecoder().decode(new Uint8Array(bytes));
    const hash = hashWithPrefix.substring(MOTOKO_DEDUPLICATION_SENTINEL.length);
    const url = await storageClient.getDirectURL(hash);
    return ExternalBlob.fromURL(url);
  };
  return createActor(
    config.backend_canister_id,
    uploadFile,
    downloadFile,
    actorOptions
  );
}
const ONE_HOUR_NS = BigInt(36e11);
let authClient = null;
let authListeners = [];
function onAuthChange(fn) {
  authListeners.push(fn);
}
function notifyListeners() {
  for (const fn of authListeners) fn();
}
async function getAuthClient() {
  if (!authClient) {
    const config = await loadConfig();
    authClient = await AuthClient.create({
      idleOptions: { disableDefaultIdleCallback: true, disableIdle: true },
      ...config.ii_derivation_origin ? { loginOptions: { derivationOrigin: config.ii_derivation_origin } } : {}
    });
  }
  return authClient;
}
async function isAuthenticated() {
  const client = await getAuthClient();
  return client.isAuthenticated();
}
async function login() {
  const client = await getAuthClient();
  const iiUrl = "https://identity.internetcomputer.org/";
  return new Promise((resolve, reject) => {
    client.login({
      identityProvider: iiUrl,
      maxTimeToLive: ONE_HOUR_NS * BigInt(24 * 30),
      onSuccess: () => {
        notifyListeners();
        resolve();
      },
      onError: (e) => reject(new Error(e ?? "Login failed"))
    });
  });
}
async function logout() {
  const client = await getAuthClient();
  await client.logout();
  authClient = null;
  notifyListeners();
}
async function getPrincipalObject() {
  const authenticated = await isAuthenticated();
  if (!authenticated) return null;
  const client = await getAuthClient();
  return client.getIdentity().getPrincipal();
}
const menuSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
let navLangUnsubscribe = null;
async function getNavbarHTML() {
  const authed = await isAuthenticated();
  const authBtn = authed ? `<button id="auth-btn" class="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">${t("signOut")}</button>` : `<button id="auth-btn" class="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors" style="background:#1a7a3c">${t("signIn")}</button>`;
  const currentLang2 = getCurrentLanguage();
  return `
    <style>
      .nav-active-lang { font-weight: 700 !important; color: #1a7a3c !important; border-bottom: 2px solid #1a7a3c; }
    </style>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm" style="border-color:#e8eaed">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <!-- Logo -->
          <a href="#/" class="flex items-center gap-1 text-lg font-bold no-underline">
            <span style="color:#EA4335">D</span><span style="color:#4285F4">h</span><span style="color:#FBBC05">o</span><span style="color:#34A853">o</span><span style="color:#EA4335">n</span><span style="color:#4285F4">d</span><span style="color:#FBBC05">h</span><span style="color:#34A853">o</span><span style="color:#5f6368;font-size:13px;font-weight:400">.App</span>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-5">
            <a href="#/about" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">${t("about")}</a>
            <a href="#/how-it-works" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">How It Works</a>
            <a href="#/blog" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">${t("blog")}</a>
            <a href="#/contributors" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">&#127942; Contributors</a>
            <a href="#/vendor" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">${t("forBusinesses")}</a>
            <a href="#/admin" class="text-sm font-medium no-underline hover:opacity-70" style="color:#9aa0a6">${t("admin")}</a>
            ${authBtn}
          </div>

          <!-- Mobile hamburger -->
          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg" style="color:#202124">
            <span id="menu-icon">${menuSVG}</span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="hidden md:hidden border-t bg-white" style="border-color:#e8eaed">
        <div class="px-4 py-3 flex flex-col gap-3">
          <a href="#/" class="text-sm font-medium py-2 no-underline" style="color:#202124">${t("home")}</a>
          <a href="#/search" class="text-sm font-medium py-2 no-underline" style="color:#202124">${t("searchPage")}</a>
          <a href="#/about" class="text-sm font-medium py-2 no-underline" style="color:#202124">${t("about")}</a>
          <a href="#/blog" class="text-sm font-medium py-2 no-underline" style="color:#202124">${t("blog")}</a>
          <a href="#/contributors" class="text-sm font-medium py-2 no-underline" style="color:#202124">&#127942; Contributors</a>
          <a href="#/how-it-works" class="text-sm font-medium py-2 no-underline" style="color:#202124">How It Works</a>
          <a href="#/vendor" class="text-sm font-medium py-2 no-underline" style="color:#202124">${t("forBusinesses")}</a>
          <a href="#/admin" class="text-sm font-medium py-2 no-underline" style="color:#9aa0a6">${t("admin")}</a>
          <div class="pt-2 border-t" style="border-color:#e8eaed">
            ${authBtn.replace('id="auth-btn"', 'id="auth-btn-mobile"')}
          </div>
          <!-- Language switcher in mobile menu (all 10 Indian languages) -->
          <div class="pt-2 border-t flex flex-wrap gap-2" style="border-color:#e8eaed">
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "en" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="en">English</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "hi" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="hi">हिन्दी</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "mr" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="mr">मराठी</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "ta" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="ta">தமிழ்</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "te" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="te">తెలుగు</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "kn" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="kn">ಕನ್ನಡ</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "ml" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="ml">മലയാളം</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "pa" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="pa">ਪੰਜਾਬੀ</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "bn" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="bn">বাংলা</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang2 === "gu" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="gu">ગુજરાતી</a>
          </div>
        </div>
      </div>
    </nav>
    <div style="height:56px"></div>
  `;
}
async function renderNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;
  container.innerHTML = await getNavbarHTML();
  attachNavbarEvents();
  if (navLangUnsubscribe) navLangUnsubscribe();
  navLangUnsubscribe = onLanguageChange(async () => {
    if (container.style.display !== "none") {
      container.innerHTML = await getNavbarHTML();
      attachNavbarEvents();
    }
  });
}
function showNavbar() {
  const container = document.getElementById("navbar-container");
  if (container) container.style.display = "";
}
function attachNavbarEvents() {
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  let menuOpen = false;
  if (mobileBtn && mobileMenu && menuIcon) {
    mobileBtn.addEventListener("click", () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle("hidden", !menuOpen);
      menuIcon.innerHTML = menuOpen ? closeSVG : menuSVG;
    });
  }
  for (const link of document.querySelectorAll(
    "#mobile-menu a:not([data-nav-lang])"
  )) {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.add("hidden");
      menuOpen = false;
      if (menuIcon) menuIcon.innerHTML = menuSVG;
    });
  }
  for (const id of ["auth-btn", "auth-btn-mobile"]) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    btn.addEventListener("click", async () => {
      const authed = await isAuthenticated();
      if (authed) {
        await logout();
      } else {
        await login();
      }
      await renderNavbar();
    });
  }
  for (const el of document.querySelectorAll("[data-nav-lang]")) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = el.dataset.navLang;
      if (lang) {
        setLanguage(lang);
      }
    });
  }
}
onAuthChange(() => {
  renderNavbar();
});
function renderAboutPage() {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <style>
      @media (max-width: 600px) {
        .about-container { padding: 24px 16px !important; }
        .about-logo-text { font-size: clamp(32px, 9vw, 52px) !important; }
        .about-cta { display: block; text-align: center; }
      }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="about-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <!-- Logo -->
        <div style="text-align:center;margin-bottom:40px">
          <div class="about-logo-text" style="font-size:clamp(32px, 9vw, 52px);font-weight:700;letter-spacing:-2px;line-height:1">
            <span style="color:#EA4335">D</span><span style="color:#4285F4">h</span><span style="color:#FBBC05">o</span><span style="color:#34A853">o</span><span style="color:#EA4335">n</span><span style="color:#4285F4">d</span><span style="color:#FBBC05">h</span><span style="color:#34A853">o</span>
          </div>
          <p style="font-size:16px;color:#5f6368;margin-top:6px">India's First Local Search Engine</p>
        </div>

        <h1 style="font-size:28px;font-weight:700;color:#202124;margin-bottom:16px">About Dhoondho.App</h1>

        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:24px">
          <strong>Dhoondho</strong> (meaning "Search" in Hindi) is India's first hyperlocal search engine built specifically for discovering local businesses, services, and professionals across every city, town, and village in India.
        </p>

        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:24px">
          Whether you're looking for a plumber in Mumbai, a restaurant in Delhi, a doctor in Bangalore, or any other local service -- Dhoondho connects you with trusted businesses near you, powered by real-time GPS and city-based search.
        </p>

        <h2 style="font-size:20px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:36px">Our Mission</h2>
        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:24px">
          To digitize India's 63 million micro, small, and medium businesses and make them discoverable to over 1.4 billion Indians -- starting from the biggest metro to the smallest town.
        </p>

        <h2 style="font-size:20px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:36px">What We Offer</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-bottom:32px">
          ${[
    {
      icon: "🔍",
      title: "Smart Search",
      desc: "Search by city, category, or GPS location with filters and sorting."
    },
    {
      icon: "🗺️",
      title: "Interactive Map",
      desc: "View businesses on a live map, explore areas, get directions."
    },
    {
      icon: "🏢",
      title: "12+ Categories",
      desc: "Home Services, Healthcare, Food, Automotive, Education and more."
    },
    {
      icon: "📍",
      title: "Nearby Now",
      desc: "One-tap GPS search to instantly discover businesses near you."
    },
    {
      icon: "🏪",
      title: "Vendor Portal",
      desc: "Business owners can list and manage their services for free."
    },
    {
      icon: "✅",
      title: "Verified Listings",
      desc: "All listings reviewed by our team before going live."
    }
  ].map(
    (f) => `
            <div style="background:#f8f9fa;border-radius:12px;padding:20px">
              <div style="font-size:28px;margin-bottom:8px">${f.icon}</div>
              <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:4px">${f.title}</div>
              <div style="font-size:13px;color:#5f6368;line-height:1.5">${f.desc}</div>
            </div>
          `
  ).join("")}
        </div>

        <h2 style="font-size:20px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:36px">For Businesses</h2>
        <p style="font-size:16px;line-height:1.7;color:#3c4043;margin-bottom:16px">
          Are you a business owner? List your business on Dhoondho for free and get discovered by thousands of customers in your area.
        </p>
        <a href="#/vendor" style="display:inline-block;padding:12px 28px;background:#1a7a3c;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:700">List Your Business</a>

        <div style="margin-top:48px;padding-top:24px;border-top:1px solid #e8eaed">
          <p style="font-size:13px;color:#9aa0a6">Built with ❤️ for India &bull; <a href="#/support" style="color:#1a73e8;text-decoration:none">Contact Us</a></p>
        </div>
      </div>
      ${renderPageFooter()}
    </div>
  `;
}
let backendInstance = null;
let backendCreatedAsAuthed = null;
onAuthChange(() => {
  backendInstance = null;
  backendCreatedAsAuthed = null;
});
async function getBackend() {
  const authed = await isAuthenticated();
  if (backendInstance !== null && backendCreatedAsAuthed !== authed) {
    backendInstance = null;
    backendCreatedAsAuthed = null;
  }
  if (!backendInstance) {
    if (authed) {
      const client = await getAuthClient();
      const identity = client.getIdentity();
      backendInstance = await createActorWithConfig({
        agentOptions: { identity }
      });
      backendCreatedAsAuthed = true;
    } else {
      backendInstance = await createActorWithConfig();
      backendCreatedAsAuthed = false;
    }
  }
  return backendInstance;
}
async function getAuthenticatedBackend() {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error(
      "You must be logged in to perform this action. Please sign in with Internet Identity."
    );
  }
  if (backendInstance !== null && backendCreatedAsAuthed === false) {
    backendInstance = null;
    backendCreatedAsAuthed = null;
  }
  return getBackend();
}
function resetBackend() {
  backendInstance = null;
  backendCreatedAsAuthed = null;
}
async function debugAuth() {
}
const SAMPLE_CATEGORIES = [
  {
    id: 1n,
    icon: "🍽️",
    name: "Restaurants",
    description: "Dine-in, takeaway & delivery"
  },
  {
    id: 2n,
    icon: "🏥",
    name: "Doctors & Clinics",
    description: "Healthcare professionals"
  },
  {
    id: 3n,
    icon: "💈",
    name: "Salons & Spas",
    description: "Beauty & wellness"
  },
  {
    id: 4n,
    icon: "🔧",
    name: "Plumbers",
    description: "Plumbing repairs & installation"
  },
  {
    id: 5n,
    icon: "⚡",
    name: "Electricians",
    description: "Electrical services"
  },
  {
    id: 6n,
    icon: "🏋️",
    name: "Gyms & Fitness",
    description: "Stay fit & healthy"
  },
  {
    id: 7n,
    icon: "📚",
    name: "Tutors & Coaching",
    description: "Education & training"
  },
  {
    id: 8n,
    icon: "🚗",
    name: "Auto & Garages",
    description: "Vehicle servicing & repair"
  },
  {
    id: 9n,
    icon: "🏨",
    name: "Hotels",
    description: "Accommodation & lodging"
  },
  {
    id: 10n,
    icon: "🛒",
    name: "Grocery Stores",
    description: "Fresh produce & daily needs"
  },
  {
    id: 11n,
    icon: "💊",
    name: "Pharmacies",
    description: "Medicines & health products"
  },
  {
    id: 12n,
    icon: "🐾",
    name: "Pet Services",
    description: "Vet, grooming & boarding"
  }
];
const SAMPLE_LISTINGS = [
  {
    id: 101n,
    name: "Spice Garden Restaurant",
    categoryId: 1n,
    status: "approved",
    city: "Mumbai",
    state: "Maharashtra",
    address: "42, Linking Road, Bandra West",
    phone: "+91 98201 45678",
    website: "https://spicegarden.in",
    description: "Authentic North Indian cuisine with a modern twist. Known for our signature butter chicken and freshly baked naan breads in a cozy family-friendly atmosphere.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 19.0596, lng: 72.8295 },
    availability: "available",
    featured: true
  },
  {
    id: 102n,
    name: "Dr. Priya Sharma Clinic",
    categoryId: 2n,
    status: "approved",
    city: "Delhi",
    state: "Delhi",
    address: "15, Connaught Place, Block A",
    phone: "+91 99100 23456",
    website: "",
    description: "General physician with 15+ years of experience. Specializing in family medicine, preventive care, and chronic disease management. Open 9 AM–7 PM.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 28.6315, lng: 77.2167 },
    availability: "busy",
    featured: true
  },
  {
    id: 103n,
    name: "Glam Studio Salon",
    categoryId: 3n,
    status: "approved",
    city: "Bangalore",
    state: "Karnataka",
    address: "Shop 7, Indiranagar 100 Feet Road",
    phone: "+91 80456 78901",
    website: "https://glamstudio.co.in",
    description: "Premium unisex salon offering haircuts, coloring, facials, and bridal makeovers. Trained stylists with international certification. Walk-ins welcome.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 12.9784, lng: 77.6408 },
    availability: "available",
    featured: false
  },
  {
    id: 104n,
    name: "QuickFix Plumbing Services",
    categoryId: 4n,
    status: "approved",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "23, Anna Nagar West Extension",
    phone: "+91 94440 56789",
    website: "",
    description: "24/7 emergency plumbing services including pipe repair, drain cleaning, water heater installation, and bathroom fittings. Licensed and insured plumbers.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 13.085, lng: 80.2101 },
    availability: "available",
    featured: false
  },
  {
    id: 105n,
    name: "PowerPro Electricals",
    categoryId: 5n,
    status: "approved",
    city: "Hyderabad",
    state: "Telangana",
    address: "Plot 45, Jubilee Hills Road No. 36",
    phone: "+91 91560 34567",
    website: "https://powerpro.in",
    description: "Certified electricians for residential and commercial work. Services include wiring, switchboard repair, inverter installation, and solar panel setup.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 17.431, lng: 78.4069 },
    availability: "busy",
    featured: false
  },
  {
    id: 106n,
    name: "FitLife Gym & Wellness",
    categoryId: 6n,
    status: "approved",
    city: "Mumbai",
    state: "Maharashtra",
    address: "3rd Floor, Andheri Sports Complex, Andheri East",
    phone: "+91 98700 12345",
    website: "https://fitlifegym.in",
    description: "State-of-the-art gym with cardio zone, free weights, group classes (yoga, Zumba, crossfit), personal trainers, and spa facilities. Open 5 AM–11 PM.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 19.1136, lng: 72.8697 },
    availability: "available",
    featured: true
  },
  {
    id: 107n,
    name: "Bright Minds Coaching Centre",
    categoryId: 7n,
    status: "approved",
    city: "Pune",
    state: "Maharashtra",
    address: "FC Road, Shivajinagar, Pune",
    phone: "+91 92000 11234",
    website: "https://brightminds.in",
    description: "Expert coaching for IIT-JEE, NEET, and board exams. Small batch sizes, experienced faculty, and proven results with 90%+ selection rate.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 18.5204, lng: 73.8567 },
    availability: "offline",
    featured: false
  },
  {
    id: 108n,
    name: "AutoCare Service Centre",
    categoryId: 8n,
    status: "approved",
    city: "Ahmedabad",
    state: "Gujarat",
    address: "Ring Road, Satellite Area, Ahmedabad",
    phone: "+91 79500 99876",
    website: "",
    description: "Multi-brand car service centre with trained technicians. Oil change, brake repair, AC service, denting & painting, and general maintenance.",
    photoIds: [],
    createdTime: BigInt(Date.now() * 1e6),
    location: { lat: 23.0225, lng: 72.5714 },
    availability: "available",
    featured: false
  }
];
const CITY_COORDINATES = {
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 }
};
function trackSearch(query, city) {
  const raw = localStorage.getItem("dhoondho_analytics_searches") || "[]";
  const entries = JSON.parse(raw);
  entries.push({
    query: query.trim(),
    city: city.trim(),
    timestamp: Date.now()
  });
  if (entries.length > 200) entries.splice(0, entries.length - 200);
  localStorage.setItem("dhoondho_analytics_searches", JSON.stringify(entries));
}
function getStats(totalListings = 0) {
  const raw = localStorage.getItem("dhoondho_analytics_searches") || "[]";
  const entries = JSON.parse(raw);
  const cityCount = {};
  for (const e of entries) {
    if (e.city) cityCount[e.city] = (cityCount[e.city] || 0) + 1;
  }
  const topCities = Object.entries(cityCount).sort((a2, b2) => b2[1] - a2[1]).slice(0, 5).map(([city]) => city);
  const queryCount = {};
  for (const e of entries) {
    const q2 = e.query.toLowerCase();
    if (q2) queryCount[q2] = (queryCount[q2] || 0) + 1;
  }
  const topCategories = Object.entries(queryCount).sort((a2, b2) => b2[1] - a2[1]).slice(0, 5).map(([q2]) => q2);
  const recent = entries.slice(-10).reverse().map((e) => {
    const d2 = new Date(e.timestamp);
    const time = d2.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    return `🔍 "${e.query}" in ${e.city || "India"} at ${time}`;
  });
  return {
    totalListings,
    totalSearches: entries.length,
    topCities,
    topCategories,
    recentActivity: recent
  };
}
function getTrendingSearches() {
  const raw = localStorage.getItem("dhoondho_analytics_searches") || "[]";
  const entries = JSON.parse(raw);
  const count = {};
  for (const e of entries) {
    const q2 = e.query.toLowerCase().trim();
    if (q2.length > 1) count[q2] = (count[q2] || 0) + 1;
  }
  const trending = Object.entries(count).sort((a2, b2) => b2[1] - a2[1]).slice(0, 6).map(([q2]) => q2);
  if (trending.length === 0) {
    return [
      "Plumber Delhi",
      "Electrician Mumbai",
      "AC Repair Bangalore",
      "Dentist Chennai",
      "Pizza Delivery Pune",
      "Gym near me"
    ];
  }
  return trending;
}
const PENDING_LISTINGS_KEY = "dhoondho_pending_listings";
const RETRY_INTERVAL_MS = 3e4;
let retryTimer = null;
function isCanisterDownError(err) {
  const msg = err instanceof Error ? err.message : typeof err === "string" ? err : JSON.stringify(err);
  const lower = msg.toLowerCase();
  return lower.includes("ic0508") || lower.includes("canister is stopped") || lower.includes("canister stopped") || lower.includes("canister not running");
}
function friendlyError(err) {
  if (isCanisterDownError(err)) {
    return "Service temporarily unavailable. Please try again.";
  }
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.toLowerCase().includes("unauthorized")) return msg;
  if (msg.toLowerCase().includes("please log in")) return msg;
  return msg || "An unexpected error occurred.";
}
function getPending() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_LISTINGS_KEY) || "[]");
  } catch {
    return [];
  }
}
function savePending(list) {
  localStorage.setItem(PENDING_LISTINGS_KEY, JSON.stringify(list));
}
function queueListing(data) {
  const list = getPending();
  list.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    data,
    savedAt: Date.now(),
    attempts: 0
  });
  savePending(list);
  console.warn("[CanisterError] Listing queued to localStorage:", data);
}
function startRetryLoop(submitFn) {
  if (retryTimer !== null) return;
  console.log(
    "[CanisterError] Starting retry loop, interval:",
    RETRY_INTERVAL_MS,
    "ms"
  );
  retryTimer = setInterval(async () => {
    const list = getPending();
    if (list.length === 0) {
      stopRetryLoop();
      return;
    }
    const remaining = [];
    for (const item of list) {
      try {
        await submitFn(item.data);
        console.log("[CanisterError] Retry succeeded for listing:", item.id);
        try {
          const { showToast: showToast2 } = await __vitePreload(async () => {
            const { showToast: showToast3 } = await Promise.resolve().then(() => toast);
            return { showToast: showToast3 };
          }, true ? void 0 : void 0);
          showToast2(
            "Your saved listing has been submitted successfully!",
            "success"
          );
        } catch {
        }
      } catch (err) {
        item.attempts += 1;
        console.warn(
          "[CanisterError] Retry failed (attempt",
          item.attempts,
          "):",
          err
        );
        remaining.push(item);
      }
    }
    savePending(remaining);
    if (remaining.length === 0) stopRetryLoop();
  }, RETRY_INTERVAL_MS);
}
function stopRetryLoop() {
  if (retryTimer !== null) {
    clearInterval(retryTimer);
    retryTimer = null;
    console.log("[CanisterError] Retry loop stopped.");
  }
}
function logApiFailure(method, err) {
  const isDown = isCanisterDownError(err);
  console.error(
    `[CanisterError] API failure | method=${method} | canisterDown=${isDown} | error=`,
    err
  );
  if (isDown) {
    console.warn(
      "[CanisterError] Canister status: STOPPED (IC0508). Backend is unreachable."
    );
  }
}
let toastContainer = null;
function getOrCreateContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement("div");
    toastContainer.id = "dhoondho-toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}
function showToast(message, type = "success", duration = 3e3) {
  const container = getOrCreateContainer();
  const colors = {
    success: { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", icon: "✓" },
    error: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca", icon: "✕" },
    info: { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe", icon: "ℹ" }
  };
  const c2 = colors[type];
  const toast2 = document.createElement("div");
  toast2.setAttribute("data-ocid", `toast.${type}`);
  toast2.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: 12px;
    border: 1px solid ${c2.border};
    background: ${c2.bg};
    color: ${c2.color};
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    min-width: 220px;
    max-width: 340px;
    pointer-events: all;
    transform: translateX(120%);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: default;
    user-select: none;
  `;
  toast2.innerHTML = `
    <span style="width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:${c2.color};color:#fff;flex-shrink:0">${c2.icon}</span>
    <span style="flex:1;line-height:1.4">${message}</span>
  `;
  container.appendChild(toast2);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast2.style.transform = "translateX(0)";
    });
  });
  const timer = setTimeout(() => {
    toast2.style.transform = "translateX(120%)";
    setTimeout(() => {
      if (toast2.parentNode) toast2.parentNode.removeChild(toast2);
    }, 350);
  }, duration);
  toast2.addEventListener("click", () => {
    clearTimeout(timer);
    toast2.style.transform = "translateX(120%)";
    setTimeout(() => {
      if (toast2.parentNode) toast2.parentNode.removeChild(toast2);
    }, 350);
  });
}
const toast = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  showToast
}, Symbol.toStringTag, { value: "Module" }));
function renderAdvancedAnalyticsTab(container) {
  const now = /* @__PURE__ */ new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const last6Months = Array.from({ length: 6 }, (_2, i) => {
    const d2 = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return months[d2.getMonth()];
  });
  const usersData = [340, 520, 680, 920, 1150, 1420];
  const listingsData = [45, 78, 112, 160, 198, 243];
  const searchesData = [1200, 2100, 3400, 4200, 5100, 6800];
  const topCities = [
    { city: "Delhi", searches: 2840, listings: 89, pct: 100 },
    { city: "Mumbai", searches: 2210, listings: 74, pct: 78 },
    { city: "Bangalore", searches: 1890, listings: 61, pct: 67 },
    { city: "Hyderabad", searches: 1340, listings: 45, pct: 47 },
    { city: "Chennai", searches: 980, listings: 38, pct: 35 },
    { city: "Pune", searches: 760, listings: 29, pct: 27 }
  ];
  const topCategories = [
    { name: "Plumbers", count: 1840, pct: 100 },
    { name: "Electricians", count: 1520, pct: 83 },
    { name: "Doctors", count: 1280, pct: 70 },
    { name: "Restaurants", count: 1100, pct: 60 },
    { name: "Tutors", count: 890, pct: 48 }
  ];
  const maxUsers = Math.max(...usersData);
  const maxListings = Math.max(...listingsData);
  const maxSearches = Math.max(...searchesData);
  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Advanced Analytics</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Platform growth, search trends, and engagement metrics</p>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    {
      label: "Total Users",
      val: "1,420",
      change: "+23%",
      up: true,
      color: "oklch(var(--primary))"
    },
    {
      label: "Total Listings",
      val: "243",
      change: "+18%",
      up: true,
      color: "#1a7a3c"
    },
    {
      label: "Daily Searches",
      val: "6,800",
      change: "+33%",
      up: true,
      color: "#0d47a1"
    },
    {
      label: "Avg Session",
      val: "4m 12s",
      change: "+8%",
      up: true,
      color: "#6a1b9a"
    }
  ].map(
    (k2) => `
          <div class="rounded-xl p-4" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
            <div class="text-xl font-bold" style="color:${k2.color}">${k2.val}</div>
            <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">${k2.label}</div>
            <div class="text-xs mt-1 font-semibold" style="color:${k2.up ? "#1a7a3c" : "#b71c1c"}">${k2.change} vs last month</div>
          </div>
        `
  ).join("")}
      </div>

      <!-- User Growth Chart (CSS bars) -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">User Growth (Last 6 Months)</h3>
        <div class="flex items-end gap-3 h-32">
          ${last6Months.map(
    (m2, i) => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-semibold" style="color:oklch(var(--primary))">${usersData[i].toLocaleString()}</span>
              <div class="w-full rounded-t-lg" style="height:${Math.round(usersData[i] / maxUsers * 96)}px;background:oklch(var(--primary));opacity:${0.5 + i / last6Months.length * 0.5}"></div>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${m2}</span>
            </div>
          `
  ).join("")}
        </div>
      </div>

      <!-- Listings Growth Chart -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Listings Growth (Last 6 Months)</h3>
        <div class="flex items-end gap-3 h-32">
          ${last6Months.map(
    (m2, i) => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-semibold" style="color:#1a7a3c">${listingsData[i]}</span>
              <div class="w-full rounded-t-lg" style="height:${Math.round(listingsData[i] / maxListings * 96)}px;background:#1a7a3c;opacity:${0.5 + i / last6Months.length * 0.5}"></div>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${m2}</span>
            </div>
          `
  ).join("")}
        </div>
      </div>

      <!-- Search Volume -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Search Volume (Last 6 Months)</h3>
        <div class="flex items-end gap-3 h-32">
          ${last6Months.map(
    (m2, i) => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-semibold" style="color:#0d47a1">${(searchesData[i] / 1e3).toFixed(1)}K</span>
              <div class="w-full rounded-t-lg" style="height:${Math.round(searchesData[i] / maxSearches * 96)}px;background:#0d47a1;opacity:${0.5 + i / last6Months.length * 0.5}"></div>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${m2}</span>
            </div>
          `
  ).join("")}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Top Cities -->
        <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
          <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Top Cities by Search</h3>
          <div class="space-y-3">
            ${topCities.map(
    (c2) => `
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-semibold" style="color:oklch(var(--foreground))">${c2.city}</span>
                  <span style="color:oklch(var(--muted-foreground))">${c2.searches.toLocaleString()} searches · ${c2.listings} listings</span>
                </div>
                <div class="w-full rounded-full h-2" style="background:oklch(var(--muted)/0.3)">
                  <div class="h-2 rounded-full" style="width:${c2.pct}%;background:oklch(var(--primary))"></div>
                </div>
              </div>
            `
  ).join("")}
          </div>
        </div>

        <!-- Top Categories -->
        <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
          <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Top Search Categories</h3>
          <div class="space-y-3">
            ${topCategories.map(
    (c2) => `
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-semibold" style="color:oklch(var(--foreground))">${c2.name}</span>
                  <span style="color:oklch(var(--muted-foreground))">${c2.count.toLocaleString()}</span>
                </div>
                <div class="w-full rounded-full h-2" style="background:oklch(var(--muted)/0.3)">
                  <div class="h-2 rounded-full" style="width:${c2.pct}%;background:#1a7a3c"></div>
                </div>
              </div>
            `
  ).join("")}
          </div>
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Recent Platform Activity</h3>
        <div class="space-y-3">
          ${[
    {
      icon: "🏢",
      text: "MediMarkit India added a new listing in Delhi",
      time: "2 min ago",
      color: "#e3f2fd"
    },
    {
      icon: "👤",
      text: "New user registered: Ananya Singh (Mumbai)",
      time: "15 min ago",
      color: "#f3e5f5"
    },
    {
      icon: "⭐",
      text: "5-star review posted for Sharma Electricals",
      time: "32 min ago",
      color: "#fff9c4"
    },
    {
      icon: "💳",
      text: "Pro subscription purchased by Vikram Plumbing Co.",
      time: "1 hr ago",
      color: "#e8f5e9"
    },
    {
      icon: "✏️",
      text: "Edit suggestion approved for Raj Medicals",
      time: "2 hrs ago",
      color: "#fff3e0"
    },
    {
      icon: "🔍",
      text: "6,800 searches in the last 24 hours",
      time: "Today",
      color: "#e3f2fd"
    }
  ].map(
    (a2) => `
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0" style="background:${a2.color}">${a2.icon}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs" style="color:oklch(var(--foreground))">${a2.text}</p>
              </div>
              <span class="text-xs flex-shrink-0" style="color:oklch(var(--muted-foreground))">${a2.time}</span>
            </div>
          `
  ).join("")}
        </div>
      </div>
    </div>
  `;
}
const DOCS_KEY = "dhoondho_doc_submissions";
function getDocSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(DOCS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveDocs(docs) {
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}
function initDemoDocs() {
  if (getDocSubmissions().length > 0) return;
  const demo = [
    {
      id: "d1",
      vendorName: "Priya Verma",
      businessName: "Priya Beauty Salon",
      docType: "gst",
      fileName: "GST_Certificate.pdf",
      fileSize: "2.1 MB",
      status: "pending",
      submittedAt: "2026-03-18"
    },
    {
      id: "d2",
      vendorName: "Amit Patel",
      businessName: "Amit Plumbing Works",
      docType: "pan",
      fileName: "PAN_Card_Amit.jpg",
      fileSize: "0.8 MB",
      status: "pending",
      submittedAt: "2026-03-17"
    },
    {
      id: "d3",
      vendorName: "Rahul Sharma",
      businessName: "Sharma Electricals",
      docType: "business_reg",
      fileName: "Business_Registration.pdf",
      fileSize: "3.5 MB",
      status: "approved",
      submittedAt: "2026-03-10",
      reviewedAt: "2026-03-12",
      reviewNote: "All documents verified successfully."
    },
    {
      id: "d4",
      vendorName: "Sunita Rao",
      businessName: "Sunita Catering",
      docType: "fssai",
      fileName: "FSSAI_License.pdf",
      fileSize: "1.2 MB",
      status: "rejected",
      submittedAt: "2026-03-08",
      reviewedAt: "2026-03-09",
      reviewNote: "FSSAI license appears expired. Please submit a valid license."
    },
    {
      id: "d5",
      vendorName: "Vikram Singh",
      businessName: "Vikram Auto Repair",
      docType: "aadhaar",
      fileName: "Aadhaar_Vikram.jpg",
      fileSize: "1.5 MB",
      status: "pending",
      submittedAt: "2026-03-19"
    }
  ];
  saveDocs(demo);
}
const DOC_TYPE_LABELS = {
  gst: "GST Certificate",
  pan: "PAN Card",
  aadhaar: "Aadhaar Card",
  business_reg: "Business Registration",
  fssai: "FSSAI License",
  other: "Other Document"
};
function statusBadge$2(s2) {
  const m2 = {
    pending: "background:#fff3e0;color:#e65100",
    approved: "background:#e8f5e9;color:#1a7a3c",
    rejected: "background:#fdecea;color:#b71c1c"
  };
  const icons = {
    pending: "⏳",
    approved: "✅",
    rejected: "❌"
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${m2[s2]}">${icons[s2]} ${s2}</span>`;
}
function renderDocVerificationTab(container) {
  initDemoDocs();
  const docs = getDocSubmissions();
  const pending = docs.filter((d2) => d2.status === "pending").length;
  const approved = docs.filter((d2) => d2.status === "approved").length;
  const rejected = docs.filter((d2) => d2.status === "rejected").length;
  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Document Verification</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${pending} pending review · ${approved} approved · ${rejected} rejected</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    { label: "Total", val: docs.length, color: "oklch(var(--primary))" },
    { label: "Pending", val: pending, color: "#e65100" },
    { label: "Approved", val: approved, color: "#1a7a3c" },
    { label: "Rejected", val: rejected, color: "#b71c1c" }
  ].map(
    (s2) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s2.color}">${s2.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s2.label}</div>
        </div>`
  ).join("")}
      </div>

      <!-- Filter -->
      <div class="flex flex-wrap gap-3">
        <select id="doc-status-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select id="doc-type-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Types</option>
          <option value="gst">GST Certificate</option>
          <option value="pan">PAN Card</option>
          <option value="aadhaar">Aadhaar</option>
          <option value="business_reg">Business Reg.</option>
          <option value="fssai">FSSAI License</option>
        </select>
      </div>

      <!-- Document Cards -->
      <div id="docs-list" class="space-y-3">
        ${renderDocCards(docs)}
      </div>
    </div>
  `;
  const statusFilter = container.querySelector("#doc-status-filter");
  const typeFilter = container.querySelector("#doc-type-filter");
  function applyFilters() {
    const status = (statusFilter == null ? void 0 : statusFilter.value) || "";
    const type = (typeFilter == null ? void 0 : typeFilter.value) || "";
    const filtered = getDocSubmissions().filter(
      (d2) => (!status || d2.status === status) && (!type || d2.docType === type)
    );
    const list = container.querySelector("#docs-list");
    if (list) list.innerHTML = renderDocCards(filtered);
    attachDocActions(container);
  }
  statusFilter == null ? void 0 : statusFilter.addEventListener("change", applyFilters);
  typeFilter == null ? void 0 : typeFilter.addEventListener("change", applyFilters);
  attachDocActions(container);
}
function renderDocCards(docs) {
  if (docs.length === 0)
    return `<div class="p-10 text-center text-sm" style="color:oklch(var(--muted-foreground))">No documents found.</div>`;
  return docs.map(
    (d2) => `
    <div class="rounded-xl border p-4 sm:p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))" data-doc-id="${d2.id}">
      <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-lg">📄</span>
            <div>
              <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">${d2.fileName}</h3>
              <p class="text-xs" style="color:oklch(var(--muted-foreground))">${DOC_TYPE_LABELS[d2.docType]} · ${d2.fileSize}</p>
            </div>
          </div>
        </div>
        ${statusBadge$2(d2.status)}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs" style="color:oklch(var(--muted-foreground))">
        <div><span class="font-semibold">Vendor:</span> ${d2.vendorName}</div>
        <div><span class="font-semibold">Business:</span> ${d2.businessName}</div>
        <div><span class="font-semibold">Submitted:</span> ${d2.submittedAt}</div>
      </div>
      ${d2.reviewNote ? `<div class="mb-3 p-3 rounded-lg text-xs" style="background:${d2.status === "approved" ? "#e8f5e9" : "#fdecea"};color:${d2.status === "approved" ? "#1a7a3c" : "#b71c1c"}"><span class="font-semibold">Review Note:</span> ${d2.reviewNote}</div>` : ""}
      ${d2.status === "pending" ? `
        <div class="space-y-2">
          <textarea id="review-note-${d2.id}" rows="2" placeholder="Optional review note..." class="w-full px-3 py-2 rounded-lg border text-xs resize-none" style="border-color:oklch(var(--border))"></textarea>
          <div class="flex gap-2 flex-wrap">
            <button class="doc-action text-xs px-4 py-2 rounded-lg font-bold text-white" data-action="approve" data-id="${d2.id}" style="background:#1a7a3c">✓ Approve</button>
            <button class="doc-action text-xs px-4 py-2 rounded-lg font-bold" data-action="reject" data-id="${d2.id}" style="background:#fdecea;color:#b71c1c">× Reject</button>
          </div>
        </div>
      ` : ""}
    </div>
  `
  ).join("");
}
function attachDocActions(container) {
  for (const btn of Array.from(
    container.querySelectorAll(".doc-action")
  )) {
    btn.addEventListener("click", () => {
      var _a3;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const docs = getDocSubmissions();
      const idx = docs.findIndex((d2) => d2.id === id);
      if (idx === -1) return;
      const note = (((_a3 = container.querySelector(`#review-note-${id}`)) == null ? void 0 : _a3.value) || "").trim();
      docs[idx].status = action === "approve" ? "approved" : "rejected";
      docs[idx].reviewedAt = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (note) docs[idx].reviewNote = note;
      saveDocs(docs);
      const list = container.querySelector("#docs-list");
      if (list) list.innerHTML = renderDocCards(getDocSubmissions());
      attachDocActions(container);
      showDocToast(
        action === "approve" ? "Document approved!" : "Document rejected."
      );
    });
  }
}
function showDocToast(msg) {
  const t2 = document.createElement("div");
  t2.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t2.style.background = "oklch(var(--primary))";
  t2.textContent = msg;
  document.body.appendChild(t2);
  setTimeout(() => t2.remove(), 2500);
}
const LOGS_KEY = "dhoondho_admin_logs";
function getLogs() {
  try {
    return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
  } catch {
    return [];
  }
}
function initDemoLogs() {
  if (getLogs().length > 0) return;
  const demo = [
    {
      id: "l1",
      level: "error",
      message: "IC0508: Canister stopped during listing submission",
      module: "backend-client",
      timestamp: "19/03/2026, 14:32:10",
      details: "Canister vf3wn-7aaaa-aaaai-at4ha-cai returned IC0508. Listing queued to localStorage for retry."
    },
    {
      id: "l2",
      level: "warn",
      message: "Anonymous actor used for API call",
      module: "backend-client",
      timestamp: "19/03/2026, 14:20:05",
      details: "getCategories called with anonymous identity. Expected authenticated call."
    },
    {
      id: "l3",
      level: "info",
      message: "User authenticated successfully",
      module: "auth",
      timestamp: "19/03/2026, 14:15:30",
      details: "Principal: 2vxsx-fae. Role: admin."
    },
    {
      id: "l4",
      level: "info",
      message: "Listing submitted and approved",
      module: "admin",
      timestamp: "19/03/2026, 13:55:00",
      details: "Listing ID: 42. Business: MediMarkit India. City: Delhi."
    },
    {
      id: "l5",
      level: "error",
      message: "Failed to load nearby listings",
      module: "search",
      timestamp: "19/03/2026, 13:40:15",
      details: "Geolocation API error: Permission denied."
    },
    {
      id: "l6",
      level: "info",
      message: "Admin panel accessed",
      module: "admin",
      timestamp: "19/03/2026, 13:30:00"
    },
    {
      id: "l7",
      level: "warn",
      message: "Retry queue has 2 pending listings",
      module: "canister-error-handler",
      timestamp: "19/03/2026, 13:10:00",
      details: "Pending listings will be resubmitted when backend is available."
    },
    {
      id: "l8",
      level: "debug",
      message: "Search query executed",
      module: "search",
      timestamp: "19/03/2026, 12:45:00",
      details: 'Query: "plumber delhi". Results: 8. Time: 340ms.'
    },
    {
      id: "l9",
      level: "info",
      message: "Blog article published",
      module: "blog",
      timestamp: "19/03/2026, 12:00:00",
      details: "Title: Top 10 Plumbers in Delhi. Author: Admin."
    },
    {
      id: "l10",
      level: "error",
      message: "XSS attempt blocked",
      module: "security",
      timestamp: "19/03/2026, 11:30:00",
      details: "Malicious input detected in review form. Input sanitized."
    }
  ];
  localStorage.setItem(LOGS_KEY, JSON.stringify(demo));
}
function renderLogsTab(container) {
  var _a3, _b2;
  initDemoLogs();
  const logs = getLogs();
  const errors = logs.filter((l) => l.level === "error").length;
  const warnings = logs.filter((l) => l.level === "warn").length;
  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Logs & Error Monitoring</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${logs.length} entries · ${errors} errors · ${warnings} warnings</p>
        </div>
        <div class="flex gap-2">
          <button id="clear-logs-btn" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#fdecea;color:#b71c1c">Clear Logs</button>
          <button id="export-logs-btn" class="text-xs px-4 py-2 rounded-lg font-semibold border" style="border-color:oklch(var(--border))">Export</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    {
      label: "Total Logs",
      val: logs.length,
      color: "oklch(var(--primary))"
    },
    { label: "Errors", val: errors, color: "#b71c1c" },
    { label: "Warnings", val: warnings, color: "#e65100" },
    {
      label: "Info",
      val: logs.filter((l) => l.level === "info").length,
      color: "#0d47a1"
    }
  ].map(
    (s2) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s2.color}">${s2.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s2.label}</div>
        </div>`
  ).join("")}
      </div>

      <!-- Filter -->
      <div class="flex flex-wrap gap-3">
        <select id="log-level-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Levels</option>
          <option value="error">Error</option>
          <option value="warn">Warning</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
        <select id="log-module-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Modules</option>
          ${[...new Set(logs.map((l) => l.module))].map((m2) => `<option value="${m2}">${m2}</option>`).join("")}
        </select>
      </div>

      <!-- Log Entries -->
      <div id="logs-list" class="space-y-2">
        ${renderLogEntries(logs)}
      </div>
    </div>
  `;
  const levelFilter = container.querySelector("#log-level-filter");
  const moduleFilter = container.querySelector("#log-module-filter");
  function applyFilters() {
    const level = (levelFilter == null ? void 0 : levelFilter.value) || "";
    const mod2 = (moduleFilter == null ? void 0 : moduleFilter.value) || "";
    const filtered = getLogs().filter(
      (l) => (!level || l.level === level) && (!mod2 || l.module === mod2)
    );
    const list = container.querySelector("#logs-list");
    if (list) list.innerHTML = renderLogEntries(filtered);
  }
  levelFilter == null ? void 0 : levelFilter.addEventListener("change", applyFilters);
  moduleFilter == null ? void 0 : moduleFilter.addEventListener("change", applyFilters);
  (_a3 = container.querySelector("#clear-logs-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    if (confirm("Clear all logs? This cannot be undone.")) {
      localStorage.removeItem(LOGS_KEY);
      renderLogsTab(container);
    }
  });
  (_b2 = container.querySelector("#export-logs-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    const all = getLogs();
    const text = all.map(
      (l) => `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.module}] ${l.message}${l.details ? ` | ${l.details}` : ""}`
    ).join("\n");
    const a2 = document.createElement("a");
    a2.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    a2.download = "dhoondho_logs.txt";
    a2.click();
  });
}
function renderLogEntries(logs) {
  if (logs.length === 0)
    return `<div class="p-8 text-center text-sm" style="color:oklch(var(--muted-foreground))">No log entries.</div>`;
  const levelColors = {
    error: { bg: "#fdecea", text: "#b71c1c", dot: "#b71c1c" },
    warn: { bg: "#fff3e0", text: "#e65100", dot: "#e65100" },
    info: { bg: "#e3f2fd", text: "#0d47a1", dot: "#0d47a1" },
    debug: { bg: "#f5f5f5", text: "#616161", dot: "#9e9e9e" }
  };
  return logs.map((l) => {
    const c2 = levelColors[l.level];
    return `
      <div class="rounded-xl border p-3" style="border-color:oklch(var(--border));border-left:3px solid ${c2.dot}">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:${c2.bg};color:${c2.text}">${l.level.toUpperCase()}</span>
            <span class="text-xs font-semibold" style="color:oklch(var(--foreground))">${l.message}</span>
          </div>
          <div class="text-xs" style="color:oklch(var(--muted-foreground))">${l.timestamp}</div>
        </div>
        <div class="flex gap-2 mt-1 flex-wrap">
          <span class="text-xs px-2 py-0.5 rounded-full" style="background:#f5f5f5;color:#616161">${l.module}</span>
          ${l.details ? `<span class="text-xs" style="color:oklch(var(--muted-foreground))">${l.details}</span>` : ""}
        </div>
      </div>
    `;
  }).join("");
}
function renderMapControlTab(container) {
  var _a3;
  let listings = [];
  try {
    const cached = JSON.parse(
      localStorage.getItem("dhoondho_listings_cache") || "[]"
    );
    listings = cached.map((l) => ({
      id: String(l.id ?? ""),
      name: String(l.name ?? "Unknown"),
      city: String(l.city ?? ""),
      address: String(l.address ?? ""),
      lat: typeof l.lat === "number" ? l.lat : void 0,
      lng: typeof l.lng === "number" ? l.lng : void 0,
      category: String(l.category ?? ""),
      status: String(l.status ?? "active")
    }));
  } catch {
  }
  if (listings.length === 0) {
    listings = [
      {
        id: "1",
        name: "MediMarkit India",
        city: "Delhi",
        address: "Connaught Place, New Delhi",
        lat: 28.6315,
        lng: 77.2167,
        category: "Medical",
        status: "active"
      },
      {
        id: "2",
        name: "Sharma Electricals",
        city: "Mumbai",
        address: "Bandra West, Mumbai",
        lat: 19.0596,
        lng: 72.8295,
        category: "Electricians",
        status: "active"
      },
      {
        id: "3",
        name: "Kumar Plumbers",
        city: "Bangalore",
        address: "Koramangala, Bangalore",
        lat: 12.9352,
        lng: 77.6245,
        category: "Plumbers",
        status: "active"
      },
      {
        id: "4",
        name: "Raj Tutors Academy",
        city: "Hyderabad",
        address: "Banjara Hills, Hyderabad",
        lat: 17.4126,
        lng: 78.4071,
        category: "Tutors",
        status: "flagged"
      },
      {
        id: "5",
        name: "Priya Beauty Salon",
        city: "Chennai",
        address: "T Nagar, Chennai",
        lat: 13.0418,
        lng: 80.2341,
        category: "Beauty",
        status: "active"
      }
    ];
  }
  const flagged = listings.filter((l) => l.status === "flagged").length;
  const withCoords = listings.filter((l) => l.lat && l.lng).length;
  container.innerHTML = `
    <div class="space-y-5">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Map Control</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">${listings.length} listings · ${withCoords} with coordinates · ${flagged} flagged</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    {
      label: "Total Pins",
      val: listings.length,
      color: "oklch(var(--primary))"
    },
    { label: "With Coords", val: withCoords, color: "#1a7a3c" },
    { label: "Flagged", val: flagged, color: "#b71c1c" },
    {
      label: "No Coords",
      val: listings.length - withCoords,
      color: "#e65100"
    }
  ].map(
    (s2) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s2.color}">${s2.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s2.label}</div>
        </div>`
  ).join("")}
      </div>

      <!-- Map Info Box -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-2" style="color:oklch(var(--foreground))">Map Coverage by City</h3>
        <div class="space-y-2">
          ${Object.entries(
    listings.reduce((acc, l) => {
      acc[l.city] = (acc[l.city] || 0) + 1;
      return acc;
    }, {})
  ).map(
    ([city, count]) => `
            <div class="flex items-center justify-between text-sm">
              <span style="color:oklch(var(--foreground))">📍 ${city}</span>
              <span class="font-semibold" style="color:oklch(var(--primary))">${count} listing${count > 1 ? "s" : ""}</span>
            </div>
          `
  ).join("")}
        </div>
      </div>

      <!-- Listings Table with Map Actions -->
      <div class="rounded-xl border" style="border-color:oklch(var(--border))">
        <div class="p-4 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">All Map Pins</h3>
          <input id="map-search" type="text" placeholder="Filter listings..." class="px-3 py-1.5 rounded-lg border text-sm" style="border-color:oklch(var(--border));width:200px">
        </div>
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:600px;border-collapse:collapse">
            <thead><tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Listing</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">City</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Coordinates</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
            </tr></thead>
            <tbody id="map-pins-table">
              ${renderMapPinsRows(listings)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  (_a3 = container.querySelector("#map-search")) == null ? void 0 : _a3.addEventListener("input", (e) => {
    const q2 = (e.currentTarget.value || "").toLowerCase();
    const filtered = listings.filter(
      (l) => l.name.toLowerCase().includes(q2) || l.city.toLowerCase().includes(q2)
    );
    const tbody = container.querySelector("#map-pins-table");
    if (tbody) tbody.innerHTML = renderMapPinsRows(filtered);
    attachMapActions(container, listings);
  });
  attachMapActions(container, listings);
}
function renderMapPinsRows(listings) {
  if (listings.length === 0)
    return `<tr><td colspan="5" class="px-4 py-8 text-center text-sm" style="color:oklch(var(--muted-foreground))">No listings found.</td></tr>`;
  return listings.map(
    (l) => `
    <tr data-pin-id="${l.id}" style="border-bottom:1px solid oklch(var(--border))">
      <td class="px-4 py-3 text-sm font-semibold" style="color:oklch(var(--foreground))">${l.name}</td>
      <td class="px-4 py-3 text-sm" style="color:oklch(var(--muted-foreground))">${l.city}</td>
      <td class="px-4 py-3 text-xs" style="color:oklch(var(--muted-foreground))">${l.lat && l.lng ? `${l.lat.toFixed(4)}, ${l.lng.toFixed(4)}` : '<span style="color:#e65100">No coords</span>'}</td>
      <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${l.status === "active" ? "#e8f5e9" : l.status === "flagged" ? "#fdecea" : "#f5f5f5"};color:${l.status === "active" ? "#1a7a3c" : l.status === "flagged" ? "#b71c1c" : "#757575"}">${l.status}</span></td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          ${l.lat && l.lng ? `<a href="https://maps.google.com?q=${l.lat},${l.lng}" target="_blank" class="text-xs px-3 py-1 rounded-lg font-semibold" style="background:#e3f2fd;color:#0d47a1">View on Map</a>` : ""}
          ${l.status !== "flagged" ? `<button class="map-flag-btn text-xs px-3 py-1 rounded-lg font-semibold" data-id="${l.id}" style="background:#fff3e0;color:#e65100">Flag</button>` : `<button class="map-unflag-btn text-xs px-3 py-1 rounded-lg font-semibold" data-id="${l.id}" style="background:#e8f5e9;color:#1a7a3c">Unflag</button>`}
        </div>
      </td>
    </tr>
  `
  ).join("");
}
function attachMapActions(container, listings) {
  for (const btn of Array.from(
    container.querySelectorAll(".map-flag-btn, .map-unflag-btn")
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const item = listings.find((l) => l.id === id);
      if (!item) return;
      item.status = item.status === "flagged" ? "active" : "flagged";
      const tbody = container.querySelector("#map-pins-table");
      if (tbody) tbody.innerHTML = renderMapPinsRows(listings);
      attachMapActions(container, listings);
    });
  }
}
const ADS_KEY = "dhoondho_ad_campaigns";
const TRANSACTIONS_KEY = "dhoondho_transactions";
const PLANS_KEY = "dhoondho_subscription_plans";
function getAds() {
  try {
    return JSON.parse(localStorage.getItem(ADS_KEY) || "[]");
  } catch {
    return [];
  }
}
function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || "[]");
  } catch {
    return [];
  }
}
function getSubscriptionPlans() {
  try {
    return JSON.parse(localStorage.getItem(PLANS_KEY) || "null") || DEFAULT_PLANS;
  } catch {
    return DEFAULT_PLANS;
  }
}
function saveAds(d2) {
  localStorage.setItem(ADS_KEY, JSON.stringify(d2));
}
function saveTransactions(d2) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(d2));
}
const DEFAULT_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billingCycle: "monthly",
    features: ["1 listing", "Basic search visibility", "Standard support"],
    activeUsers: 1240,
    isActive: true
  },
  {
    id: "basic",
    name: "Basic",
    price: 499,
    billingCycle: "monthly",
    features: [
      "5 listings",
      "Highlighted in search",
      "Analytics dashboard",
      "Email support"
    ],
    activeUsers: 342,
    isActive: true
  },
  {
    id: "pro",
    name: "Pro",
    price: 1499,
    billingCycle: "monthly",
    features: [
      "20 listings",
      "Featured placement",
      "Priority support",
      "Lead generation",
      "Advanced analytics"
    ],
    activeUsers: 89,
    isActive: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    billingCycle: "monthly",
    features: [
      "Unlimited listings",
      "Top search placement",
      "Dedicated support",
      "Custom branding",
      "API access"
    ],
    activeUsers: 12,
    isActive: true
  }
];
function initDemoData() {
  if (getAds().length === 0) {
    saveAds([
      {
        id: "a1",
        title: "MediMarkit Summer Offer",
        advertiser: "MediMarkit India",
        type: "featured",
        status: "active",
        budget: 15e3,
        spent: 8400,
        clicks: 342,
        impressions: 12400,
        startDate: "2026-03-01",
        endDate: "2026-03-31"
      },
      {
        id: "a2",
        title: "Plumber Express Banner",
        advertiser: "Plumber Express",
        type: "banner",
        status: "active",
        budget: 5e3,
        spent: 2100,
        clicks: 88,
        impressions: 5600,
        startDate: "2026-03-10",
        endDate: "2026-03-25"
      },
      {
        id: "a3",
        title: "Electrician Pro Spotlight",
        advertiser: "ElectroPro",
        type: "spotlight",
        status: "paused",
        budget: 8e3,
        spent: 3200,
        clicks: 145,
        impressions: 7800,
        startDate: "2026-02-15",
        endDate: "2026-03-15"
      }
    ]);
  }
  if (getTransactions().length === 0) {
    saveTransactions([
      {
        id: "t1",
        user: "Rahul Sharma",
        amount: 1499,
        currency: "INR",
        type: "subscription",
        status: "completed",
        date: "2026-03-15",
        plan: "Pro"
      },
      {
        id: "t2",
        user: "Priya Verma",
        amount: 499,
        currency: "INR",
        type: "subscription",
        status: "completed",
        date: "2026-03-14",
        plan: "Basic"
      },
      {
        id: "t3",
        user: "MediMarkit India",
        amount: 15e3,
        currency: "INR",
        type: "ad",
        status: "completed",
        date: "2026-03-01"
      },
      {
        id: "t4",
        user: "Amit Patel",
        amount: 499,
        currency: "INR",
        type: "subscription",
        status: "refunded",
        date: "2026-03-10",
        plan: "Basic"
      },
      {
        id: "t5",
        user: "Sunita Rao",
        amount: 4999,
        currency: "INR",
        type: "subscription",
        status: "completed",
        date: "2026-03-12",
        plan: "Enterprise"
      }
    ]);
  }
}
function escH$1(s2) {
  return s2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function fmt(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}
function renderMonetizationTab(container) {
  var _a3;
  initDemoData();
  const ads = getAds();
  const txns = getTransactions();
  const plans = getSubscriptionPlans();
  const totalRevenue = txns.filter((t2) => t2.status === "completed").reduce((s2, t2) => s2 + t2.amount, 0);
  const activeAds = ads.filter((a2) => a2.status === "active").length;
  const totalActiveUsers = plans.reduce((s2, p2) => s2 + p2.activeUsers, 0);
  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Monetization & Revenue</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Ads, subscriptions and transaction overview</p>
      </div>

      <!-- Revenue Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    { label: "Total Revenue", val: fmt(totalRevenue), color: "#1a7a3c" },
    {
      label: "Active Ads",
      val: activeAds,
      color: "oklch(var(--primary))"
    },
    {
      label: "Paid Users",
      val: totalActiveUsers - (((_a3 = plans[0]) == null ? void 0 : _a3.activeUsers) || 0),
      color: "#6a1b9a"
    },
    { label: "Transactions", val: txns.length, color: "#0d47a1" }
  ].map(
    (s2) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-xl font-bold" style="color:${s2.color}">${s2.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s2.label}</div>
        </div>`
  ).join("")}
      </div>

      <!-- Subscription Plans -->
      <div>
        <h3 class="text-sm font-bold mb-3" style="color:oklch(var(--foreground))">Subscription Plans</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${plans.map(
    (p2) => `
            <div class="rounded-xl border p-4" style="background:oklch(var(--card));border-color:oklch(var(--border))">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm" style="color:oklch(var(--foreground))">${p2.name}</span>
                <span class="text-xs px-2 py-0.5 rounded-full" style="background:${p2.isActive ? "#e8f5e9" : "#fdecea"};color:${p2.isActive ? "#1a7a3c" : "#b71c1c"}">${p2.isActive ? "Active" : "Inactive"}</span>
              </div>
              <div class="text-xl font-bold mb-1" style="color:oklch(var(--primary))">${p2.price === 0 ? "Free" : fmt(p2.price)}<span class="text-xs font-normal" style="color:oklch(var(--muted-foreground))">${p2.price > 0 ? "/mo" : ""}</span></div>
              <div class="text-xs mb-3" style="color:oklch(var(--muted-foreground))">${p2.activeUsers} active users</div>
              <ul class="space-y-1">
                ${p2.features.map((f) => `<li class="text-xs flex items-center gap-1" style="color:oklch(var(--muted-foreground))"><span style="color:#1a7a3c">&#10003;</span> ${f}</li>`).join("")}
              </ul>
            </div>
          `
  ).join("")}
        </div>
      </div>

      <!-- Ad Campaigns -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">Ad Campaigns</h3>
        </div>
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:700px;border-collapse:collapse">
            <thead><tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Campaign</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Type</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Budget</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Spent</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Clicks</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
            </tr></thead>
            <tbody>
              ${ads.map(
    (a2) => `
                <tr style="border-bottom:1px solid oklch(var(--border))">
                  <td class="px-4 py-3">
                    <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">${escH$1(a2.title)}</div>
                    <div class="text-xs" style="color:oklch(var(--muted-foreground))">${escH$1(a2.advertiser)}</div>
                  </td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full" style="background:#e3f2fd;color:#0d47a1">${a2.type}</span></td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${a2.status === "active" ? "#e8f5e9" : a2.status === "paused" ? "#fff3e0" : "#f5f5f5"};color:${a2.status === "active" ? "#1a7a3c" : a2.status === "paused" ? "#e65100" : "#757575"}">${a2.status}</span></td>
                  <td class="px-4 py-3 text-sm">${fmt(a2.budget)}</td>
                  <td class="px-4 py-3 text-sm">${fmt(a2.spent)}</td>
                  <td class="px-4 py-3 text-sm">${a2.clicks.toLocaleString()}</td>
                  <td class="px-4 py-3">
                    <button class="ad-toggle-btn text-xs px-3 py-1 rounded-lg font-semibold" data-id="${a2.id}" data-status="${a2.status}" style="background:${a2.status === "active" ? "#fff3e0" : "#e8f5e9"};color:${a2.status === "active" ? "#e65100" : "#1a7a3c"}">${a2.status === "active" ? "Pause" : "Activate"}</button>
                  </td>
                </tr>
              `
  ).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div>
        <h3 class="text-sm font-bold mb-3" style="color:oklch(var(--foreground))">Recent Transactions</h3>
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:600px;border-collapse:collapse">
            <thead><tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">User</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Type</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Amount</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Date</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Plan</th>
            </tr></thead>
            <tbody>
              ${txns.map(
    (t2) => `
                <tr style="border-bottom:1px solid oklch(var(--border))">
                  <td class="px-4 py-3 text-sm font-semibold" style="color:oklch(var(--foreground))">${escH$1(t2.user)}</td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full" style="background:#f3e5f5;color:#6a1b9a">${t2.type}</span></td>
                  <td class="px-4 py-3 text-sm font-bold" style="color:${t2.status === "refunded" ? "#b71c1c" : "#1a7a3c"}">${t2.status === "refunded" ? "-" : "+"}${fmt(t2.amount)}</td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${t2.status === "completed" ? "#e8f5e9" : t2.status === "pending" ? "#fff3e0" : t2.status === "failed" ? "#fdecea" : "#f5f5f5"};color:${t2.status === "completed" ? "#1a7a3c" : t2.status === "pending" ? "#e65100" : t2.status === "failed" ? "#b71c1c" : "#757575"}">${t2.status}</span></td>
                  <td class="px-4 py-3 text-xs" style="color:oklch(var(--muted-foreground))">${t2.date}</td>
                  <td class="px-4 py-3 text-xs" style="color:oklch(var(--muted-foreground))">${t2.plan || "-"}</td>
                </tr>
              `
  ).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  for (const btn of Array.from(
    container.querySelectorAll(".ad-toggle-btn")
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const status = btn.dataset.status;
      const ads2 = getAds();
      const idx = ads2.findIndex((a2) => a2.id === id);
      if (idx === -1) return;
      ads2[idx].status = status === "active" ? "paused" : "active";
      saveAds(ads2);
      renderMonetizationTab(container);
    });
  }
}
const BROADCASTS_KEY = "dhoondho_broadcasts";
const INBOX_KEY = "dhoondho_notification_inbox";
function getBroadcasts() {
  try {
    return JSON.parse(localStorage.getItem(BROADCASTS_KEY) || "[]");
  } catch {
    return [];
  }
}
function getNotificationInbox() {
  try {
    return JSON.parse(localStorage.getItem(INBOX_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveBroadcasts(msgs) {
  localStorage.setItem(BROADCASTS_KEY, JSON.stringify(msgs));
}
function initDemoBroadcasts() {
  if (getBroadcasts().length > 0) return;
  const demo = [
    {
      id: "b1",
      title: "Platform Update v49",
      message: "We've improved search speed and added new category filters. Check it out!",
      targetAudience: "all",
      type: "info",
      sentAt: "2026-03-15 10:30",
      sentBy: "Admin",
      readCount: 142
    },
    {
      id: "b2",
      title: "Vendor Verification Required",
      message: "All vendors must complete document verification by March 31st to remain listed.",
      targetAudience: "vendors",
      type: "warning",
      sentAt: "2026-03-10 14:00",
      sentBy: "Admin",
      readCount: 38
    },
    {
      id: "b3",
      title: "New Feature: Voice Search",
      message: "Voice search is now live! Tap the mic icon to search hands-free.",
      targetAudience: "all",
      type: "success",
      sentAt: "2026-03-01 09:00",
      sentBy: "Admin",
      readCount: 287
    }
  ];
  saveBroadcasts(demo);
}
function typeBadge(type) {
  const m2 = {
    info: "background:#e3f2fd;color:#0d47a1",
    warning: "background:#fff3e0;color:#e65100",
    success: "background:#e8f5e9;color:#1a7a3c",
    alert: "background:#fdecea;color:#b71c1c"
  };
  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    alert: "🚨"
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${m2[type]}">${icons[type]} ${type}</span>`;
}
function renderNotificationsTab(container) {
  var _a3;
  initDemoBroadcasts();
  const broadcasts = getBroadcasts();
  const totalReach = broadcasts.reduce((sum, b2) => sum + b2.readCount, 0);
  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Notifications & Broadcasts</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${broadcasts.length} sent · ${totalReach.toLocaleString()} total reads</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    {
      label: "Total Sent",
      val: broadcasts.length,
      color: "oklch(var(--primary))"
    },
    {
      label: "Total Reads",
      val: totalReach.toLocaleString(),
      color: "#1a7a3c"
    },
    {
      label: "To All Users",
      val: broadcasts.filter((b2) => b2.targetAudience === "all").length,
      color: "#0d47a1"
    },
    {
      label: "To Vendors",
      val: broadcasts.filter((b2) => b2.targetAudience === "vendors").length,
      color: "#6a1b9a"
    }
  ].map(
    (s2) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s2.color}">${s2.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s2.label}</div>
        </div>`
  ).join("")}
      </div>

      <!-- Compose New Broadcast -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Send New Broadcast</h3>
        <form id="broadcast-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Title *</label>
            <input name="title" required type="text" placeholder="Notification title..." class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Audience</label>
              <select name="targetAudience" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
                <option value="all">All Users</option>
                <option value="vendors">Vendors Only</option>
                <option value="users">Regular Users</option>
                <option value="admins">Admins Only</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Type</label>
              <select name="type" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="alert">Alert</option>
              </select>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Message *</label>
            <textarea name="message" required rows="3" placeholder="Broadcast message..." class="w-full px-3 py-2 rounded-lg border text-sm resize-none" style="border-color:oklch(var(--border))"></textarea>
          </div>
          <div class="sm:col-span-2">
            <button type="submit" class="px-6 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Send Broadcast</button>
          </div>
        </form>
      </div>

      <!-- Broadcast History -->
      <div>
        <h3 class="text-sm font-bold mb-3" style="color:oklch(var(--foreground))">Broadcast History</h3>
        <div id="broadcasts-list" class="space-y-3">
          ${renderBroadcastCards(broadcasts)}
        </div>
      </div>
    </div>
  `;
  (_a3 = container.querySelector("#broadcast-form")) == null ? void 0 : _a3.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const msg = {
      id: `b${Date.now()}`,
      title: data.get("title").trim(),
      message: data.get("message").trim(),
      targetAudience: data.get("targetAudience") || "all",
      type: data.get("type") || "info",
      sentAt: (/* @__PURE__ */ new Date()).toLocaleString("en-IN"),
      sentBy: "Admin",
      readCount: 0
    };
    const all = getBroadcasts();
    saveBroadcasts([msg, ...all]);
    const inbox = getNotificationInbox();
    inbox.unshift(msg);
    localStorage.setItem(INBOX_KEY, JSON.stringify(inbox.slice(0, 50)));
    form.reset();
    const list = container.querySelector("#broadcasts-list");
    if (list) list.innerHTML = renderBroadcastCards(getBroadcasts());
    showNotifToast(`Broadcast sent to ${msg.targetAudience}!`);
  });
}
function renderBroadcastCards(msgs) {
  if (msgs.length === 0)
    return `<div class="p-8 text-center text-sm" style="color:oklch(var(--muted-foreground))">No broadcasts yet.</div>`;
  return msgs.map(
    (m2) => `
    <div class="rounded-xl border p-4" style="background:oklch(var(--card));border-color:oklch(var(--border))">
      <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h4 class="text-sm font-bold" style="color:oklch(var(--foreground))">${m2.title}</h4>
          <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Sent ${m2.sentAt} by ${m2.sentBy}</p>
        </div>
        <div class="flex gap-2">${typeBadge(m2.type)} <span class="text-xs px-2 py-0.5 rounded-full" style="background:#f5f5f5;color:#424242">→ ${m2.targetAudience}</span></div>
      </div>
      <p class="text-sm" style="color:oklch(var(--muted-foreground))">${m2.message}</p>
      <p class="text-xs mt-2" style="color:oklch(var(--muted-foreground))">👁 ${m2.readCount} reads</p>
    </div>
  `
  ).join("");
}
function showNotifToast(msg) {
  const t2 = document.createElement("div");
  t2.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t2.style.background = "oklch(var(--primary))";
  t2.textContent = msg;
  document.body.appendChild(t2);
  setTimeout(() => t2.remove(), 2500);
}
const BOOSTS_KEY = "dhoondho_search_boosts";
const BANNED_KEY = "dhoondho_banned_terms";
function getBoosts() {
  try {
    return JSON.parse(localStorage.getItem(BOOSTS_KEY) || "[]");
  } catch {
    return [];
  }
}
function getBanned() {
  try {
    return JSON.parse(localStorage.getItem(BANNED_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveBoosts(d2) {
  localStorage.setItem(BOOSTS_KEY, JSON.stringify(d2));
}
function saveBanned(d2) {
  localStorage.setItem(BANNED_KEY, JSON.stringify(d2));
}
const TRENDING = [
  { term: "plumber near me", count: 1840, trend: "up" },
  { term: "electrician delhi", count: 1520, trend: "up" },
  { term: "doctor bangalore", count: 1280, trend: "stable" },
  { term: "restaurant mumbai", count: 1100, trend: "down" },
  { term: "tutor hyderabad", count: 890, trend: "up" },
  { term: "salon pune", count: 670, trend: "stable" },
  { term: "ac repair chennai", count: 540, trend: "up" },
  { term: "lawyer delhi", count: 420, trend: "down" }
];
function initDemoBoosts() {
  if (getBoosts().length > 0) return;
  saveBoosts([
    {
      id: "b1",
      listingName: "MediMarkit India",
      city: "Delhi",
      category: "Medical",
      boostLevel: 3,
      expiresAt: "2026-04-01",
      active: true
    },
    {
      id: "b2",
      listingName: "Sharma Electricals",
      city: "Mumbai",
      category: "Electricians",
      boostLevel: 2,
      expiresAt: "2026-03-31",
      active: true
    },
    {
      id: "b3",
      listingName: "Kumar Plumbers",
      city: "Bangalore",
      category: "Plumbers",
      boostLevel: 1,
      expiresAt: "2026-03-25",
      active: false
    }
  ]);
}
const BOOST_LABELS = {
  1: { label: "Silver", color: "#757575", bg: "#f5f5f5" },
  2: { label: "Gold", color: "#b45309", bg: "#fff9c4" },
  3: { label: "Platinum", color: "#6a1b9a", bg: "#f3e5f5" }
};
function renderSearchControlTab(container) {
  var _a3, _b2, _c, _d, _e, _f;
  initDemoBoosts();
  const boosts = getBoosts();
  const banned = getBanned();
  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Search Control & Ranking</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Boost listings, manage banned terms, and view search trends</p>
      </div>

      <!-- Trending Searches -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Trending Searches</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${TRENDING.map(
    (t2, i) => `
            <div class="flex items-center justify-between p-3 rounded-xl" style="background:oklch(var(--muted)/0.2)">
              <div class="flex items-center gap-3">
                <span class="text-sm font-bold" style="color:oklch(var(--muted-foreground))">#${i + 1}</span>
                <span class="text-sm" style="color:oklch(var(--foreground))">${t2.term}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs" style="color:oklch(var(--muted-foreground))">${t2.count.toLocaleString()}</span>
                <span style="color:${t2.trend === "up" ? "#1a7a3c" : t2.trend === "down" ? "#b71c1c" : "#757575"}">${t2.trend === "up" ? "↑" : t2.trend === "down" ? "↓" : "→"}</span>
              </div>
            </div>
          `
  ).join("")}
        </div>
      </div>

      <!-- Boosted Listings -->
      <div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">Boosted Listings</h3>
          <button id="add-boost-btn" class="text-xs px-4 py-2 rounded-lg font-semibold text-white" style="background:oklch(var(--primary))">+ Add Boost</button>
        </div>

        <!-- Add Boost Form -->
        <div id="add-boost-form" class="hidden mb-4 p-4 rounded-xl border" style="border-color:oklch(var(--border));background:#fafafa">
          <form id="boost-form" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold mb-1">Listing Name</label><input name="listingName" required type="text" placeholder="Business name" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))"></div>
            <div><label class="block text-xs font-semibold mb-1">City</label><input name="city" required type="text" placeholder="City" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))"></div>
            <div><label class="block text-xs font-semibold mb-1">Boost Level</label>
              <select name="boostLevel" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
                <option value="1">Silver</option><option value="2">Gold</option><option value="3">Platinum</option>
              </select>
            </div>
            <div><label class="block text-xs font-semibold mb-1">Expires</label><input name="expiresAt" required type="date" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))"></div>
            <div class="sm:col-span-2 flex gap-3">
              <button type="submit" class="px-4 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Save Boost</button>
              <button type="button" id="cancel-boost" class="px-4 py-2 text-sm rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
            </div>
          </form>
        </div>

        <div id="boosts-list" class="space-y-2">
          ${renderBoostsRows(boosts)}
        </div>
      </div>

      <!-- Banned Terms -->
      <div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">Banned Search Terms</h3>
          <button id="add-banned-btn" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#fdecea;color:#b71c1c">+ Ban Term</button>
        </div>
        <div id="add-banned-form" class="hidden mb-4 p-4 rounded-xl border" style="border-color:oklch(var(--border));background:#fafafa">
          <form id="banned-form" class="flex gap-3 flex-wrap">
            <input name="term" required type="text" placeholder="Term to ban" class="flex-1 min-w-[150px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
            <input name="reason" required type="text" placeholder="Reason" class="flex-1 min-w-[150px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
            <button type="submit" class="px-4 py-2 text-sm font-bold rounded-lg" style="background:#fdecea;color:#b71c1c">Ban</button>
            <button type="button" id="cancel-banned" class="px-4 py-2 text-sm rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
          </form>
        </div>
        <div id="banned-list">
          ${banned.length === 0 ? `<p class="text-sm" style="color:oklch(var(--muted-foreground))">No banned terms.</p>` : `<div class="flex flex-wrap gap-2">${banned.map((b2) => `<span class="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style="background:#fdecea;color:#b71c1c">${b2.term} <button class="unban-btn ml-1 font-bold" data-id="${b2.id}">×</button></span>`).join("")}</div>`}
        </div>
      </div>
    </div>
  `;
  (_a3 = container.querySelector("#add-boost-btn")) == null ? void 0 : _a3.addEventListener(
    "click",
    () => {
      var _a4;
      return (_a4 = container.querySelector("#add-boost-form")) == null ? void 0 : _a4.classList.remove("hidden");
    }
  );
  (_b2 = container.querySelector("#cancel-boost")) == null ? void 0 : _b2.addEventListener(
    "click",
    () => {
      var _a4;
      return (_a4 = container.querySelector("#add-boost-form")) == null ? void 0 : _a4.classList.add("hidden");
    }
  );
  (_c = container.querySelector("#boost-form")) == null ? void 0 : _c.addEventListener("submit", (e) => {
    var _a4;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const boost = {
      id: `boost-${Date.now()}`,
      listingName: data.get("listingName").trim(),
      city: data.get("city").trim(),
      category: "",
      boostLevel: Number(data.get("boostLevel")),
      expiresAt: data.get("expiresAt"),
      active: true
    };
    const boosts2 = getBoosts();
    saveBoosts([boost, ...boosts2]);
    form.reset();
    (_a4 = container.querySelector("#add-boost-form")) == null ? void 0 : _a4.classList.add("hidden");
    const list = container.querySelector("#boosts-list");
    if (list) list.innerHTML = renderBoostsRows(getBoosts());
    attachBoostActions(container);
  });
  (_d = container.querySelector("#add-banned-btn")) == null ? void 0 : _d.addEventListener(
    "click",
    () => {
      var _a4;
      return (_a4 = container.querySelector("#add-banned-form")) == null ? void 0 : _a4.classList.remove("hidden");
    }
  );
  (_e = container.querySelector("#cancel-banned")) == null ? void 0 : _e.addEventListener(
    "click",
    () => {
      var _a4;
      return (_a4 = container.querySelector("#add-banned-form")) == null ? void 0 : _a4.classList.add("hidden");
    }
  );
  (_f = container.querySelector("#banned-form")) == null ? void 0 : _f.addEventListener("submit", (e) => {
    var _a4;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const term = {
      id: `bt-${Date.now()}`,
      term: data.get("term").trim(),
      reason: data.get("reason").trim(),
      addedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    const banned2 = getBanned();
    saveBanned([term, ...banned2]);
    form.reset();
    (_a4 = container.querySelector("#add-banned-form")) == null ? void 0 : _a4.classList.add("hidden");
    const list = container.querySelector("#banned-list");
    if (list)
      list.innerHTML = `<div class="flex flex-wrap gap-2">${getBanned().map(
        (b2) => `<span class="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style="background:#fdecea;color:#b71c1c">${b2.term} <button class="unban-btn ml-1 font-bold" data-id="${b2.id}">×</button></span>`
      ).join("")}</div>`;
    attachBoostActions(container);
  });
  attachBoostActions(container);
}
function renderBoostsRows(boosts) {
  if (boosts.length === 0)
    return `<p class="text-sm" style="color:oklch(var(--muted-foreground))">No boosted listings.</p>`;
  return boosts.map((b2) => {
    const lvl = BOOST_LABELS[b2.boostLevel];
    return `
      <div class="rounded-xl border p-4 flex flex-wrap items-center justify-between gap-3" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm" style="color:oklch(var(--foreground))">${b2.listingName}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-bold" style="background:${lvl.bg};color:${lvl.color}">${lvl.label}</span>
            ${b2.active ? "" : `<span class="text-xs px-2 py-0.5 rounded-full" style="background:#fdecea;color:#b71c1c">Inactive</span>`}
          </div>
          <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">${b2.city} · Expires: ${b2.expiresAt}</div>
        </div>
        <div class="flex gap-2">
          <button class="boost-toggle text-xs px-3 py-1 rounded-lg font-semibold" data-id="${b2.id}" data-active="${b2.active}" style="background:${b2.active ? "#fff3e0" : "#e8f5e9"};color:${b2.active ? "#e65100" : "#1a7a3c"}">${b2.active ? "Pause" : "Activate"}</button>
          <button class="boost-delete text-xs px-3 py-1 rounded-lg font-semibold" data-id="${b2.id}" style="background:#fdecea;color:#b71c1c">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}
function attachBoostActions(container) {
  for (const btn of Array.from(
    container.querySelectorAll(".boost-toggle")
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const boosts = getBoosts();
      const idx = boosts.findIndex((b2) => b2.id === id);
      if (idx === -1) return;
      boosts[idx].active = !boosts[idx].active;
      saveBoosts(boosts);
      const list = container.querySelector("#boosts-list");
      if (list) list.innerHTML = renderBoostsRows(getBoosts());
      attachBoostActions(container);
    });
  }
  for (const btn of Array.from(
    container.querySelectorAll(".boost-delete")
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      saveBoosts(getBoosts().filter((b2) => b2.id !== id));
      const list = container.querySelector("#boosts-list");
      if (list) list.innerHTML = renderBoostsRows(getBoosts());
      attachBoostActions(container);
    });
  }
  for (const btn of Array.from(
    container.querySelectorAll(".unban-btn")
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const banned = getBanned().filter((b2) => b2.id !== id);
      saveBanned(banned);
      const list = container.querySelector("#banned-list");
      if (list)
        list.innerHTML = banned.length === 0 ? `<p class="text-sm" style="color:oklch(var(--muted-foreground))">No banned terms.</p>` : `<div class="flex flex-wrap gap-2">${banned.map((b2) => `<span class="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style="background:#fdecea;color:#b71c1c">${b2.term} <button class="unban-btn ml-1 font-bold" data-id="${b2.id}">×</button></span>`).join("")}</div>`;
      attachBoostActions(container);
    });
  }
}
const TICKETS_KEY = "dhoondho_support_tickets";
function getTickets() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}
function initDemoTickets() {
  if (getTickets().length > 0) return;
  const demo = [
    {
      id: "TKT-001",
      subject: "Listing not showing in search",
      message: "I added my business yesterday but it's not appearing in search results.",
      userName: "Rahul Sharma",
      userEmail: "rahul@example.com",
      status: "open",
      priority: "high",
      category: "listing",
      createdAt: "2026-03-15",
      updatedAt: "2026-03-15"
    },
    {
      id: "TKT-002",
      subject: "Cannot login to vendor dashboard",
      message: "I get a 'Please log in' error when trying to access vendor dashboard.",
      userName: "Priya Verma",
      userEmail: "priya@example.com",
      status: "in-progress",
      priority: "urgent",
      category: "vendor",
      createdAt: "2026-03-17",
      updatedAt: "2026-03-18",
      adminReply: "We are investigating the issue. Please try clearing browser cache."
    },
    {
      id: "TKT-003",
      subject: "Wrong phone number on my listing",
      message: "The phone number on my listing is incorrect. Please update it.",
      userName: "Amit Patel",
      userEmail: "amit@example.com",
      status: "resolved",
      priority: "medium",
      category: "listing",
      createdAt: "2026-03-10",
      updatedAt: "2026-03-12",
      adminReply: "Your listing has been updated with the correct phone number."
    },
    {
      id: "TKT-004",
      subject: "Request to remove fake review",
      message: "There is a fake 1-star review on my business page. Please investigate.",
      userName: "Sunita Rao",
      userEmail: "sunita@example.com",
      status: "open",
      priority: "medium",
      category: "other",
      createdAt: "2026-03-18",
      updatedAt: "2026-03-18"
    }
  ];
  saveTickets(demo);
}
function escH(s2) {
  return s2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function statusBadge$1(s2) {
  const m2 = {
    open: "background:#fdecea;color:#b71c1c",
    "in-progress": "background:#fff3e0;color:#e65100",
    resolved: "background:#e8f5e9;color:#1a7a3c",
    closed: "background:#f5f5f5;color:#757575"
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${m2[s2]}">${s2}</span>`;
}
function priorityBadge(p2) {
  const m2 = {
    low: "background:#f5f5f5;color:#757575",
    medium: "background:#fff3e0;color:#e65100",
    high: "background:#fdecea;color:#b71c1c",
    urgent: "background:#880000;color:#fff"
  };
  return `<span class="text-xs font-bold px-2 py-0.5 rounded-full" style="${m2[p2]}">${p2.toUpperCase()}</span>`;
}
function renderTicketsTab(container) {
  initDemoTickets();
  const tickets = getTickets();
  const open = tickets.filter(
    (t2) => t2.status === "open" || t2.status === "in-progress"
  ).length;
  const resolved = tickets.filter((t2) => t2.status === "resolved").length;
  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Support Tickets</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${open} open · ${resolved} resolved</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
    {
      label: "Total",
      val: tickets.length,
      color: "oklch(var(--primary))"
    },
    {
      label: "Open",
      val: tickets.filter((t2) => t2.status === "open").length,
      color: "#b71c1c"
    },
    {
      label: "In Progress",
      val: tickets.filter((t2) => t2.status === "in-progress").length,
      color: "#e65100"
    },
    { label: "Resolved", val: resolved, color: "#1a7a3c" }
  ].map(
    (s2) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s2.color}">${s2.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s2.label}</div>
        </div>`
  ).join("")}
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <input id="ticket-search" type="text" placeholder="Search tickets..." class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
        <select id="ticket-status-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select id="ticket-priority-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <!-- Ticket List -->
      <div id="tickets-list" class="space-y-3">
        ${renderTicketCards(tickets)}
      </div>
    </div>
  `;
  const searchInput = container.querySelector("#ticket-search");
  const statusFilter = container.querySelector(
    "#ticket-status-filter"
  );
  const priorityFilter = container.querySelector(
    "#ticket-priority-filter"
  );
  function applyFilters() {
    const q2 = ((searchInput == null ? void 0 : searchInput.value) || "").toLowerCase();
    const status = (statusFilter == null ? void 0 : statusFilter.value) || "";
    const priority = (priorityFilter == null ? void 0 : priorityFilter.value) || "";
    const all = getTickets();
    const filtered = all.filter((t2) => {
      const matchQ = !q2 || t2.subject.toLowerCase().includes(q2) || t2.userName.toLowerCase().includes(q2);
      const matchS = !status || t2.status === status;
      const matchP = !priority || t2.priority === priority;
      return matchQ && matchS && matchP;
    });
    const list = container.querySelector("#tickets-list");
    if (list) list.innerHTML = renderTicketCards(filtered);
    attachTicketActions(container);
  }
  searchInput == null ? void 0 : searchInput.addEventListener("input", applyFilters);
  statusFilter == null ? void 0 : statusFilter.addEventListener("change", applyFilters);
  priorityFilter == null ? void 0 : priorityFilter.addEventListener("change", applyFilters);
  attachTicketActions(container);
}
function renderTicketCards(tickets) {
  if (tickets.length === 0) {
    return `<div class="p-10 text-center text-sm" style="color:oklch(var(--muted-foreground))">No tickets found.</div>`;
  }
  return tickets.map(
    (t2) => `
    <div class="rounded-xl border p-4 sm:p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))" data-ticket-id="${t2.id}">
      <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <span class="text-xs font-mono" style="color:oklch(var(--muted-foreground))">${t2.id}</span>
          <h3 class="text-sm font-bold mt-0.5" style="color:oklch(var(--foreground))">${escH(t2.subject)}</h3>
        </div>
        <div class="flex gap-2 flex-wrap">${priorityBadge(t2.priority)} ${statusBadge$1(t2.status)}</div>
      </div>
      <p class="text-sm mb-3" style="color:oklch(var(--muted-foreground))">${escH(t2.message)}</p>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="text-xs" style="color:oklch(var(--muted-foreground))">
          <span class="font-semibold">${escH(t2.userName)}</span> · ${escH(t2.userEmail)} · ${t2.createdAt}
        </div>
        <div class="flex gap-2 flex-wrap">
          ${t2.status !== "resolved" && t2.status !== "closed" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="reply" data-id="${t2.id}" style="background:oklch(var(--primary));color:#fff">Reply</button>` : ""}
          ${t2.status === "open" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="in-progress" data-id="${t2.id}" style="background:#fff3e0;color:#e65100">Mark In Progress</button>` : ""}
          ${t2.status !== "resolved" && t2.status !== "closed" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="resolve" data-id="${t2.id}" style="background:#e8f5e9;color:#1a7a3c">Resolve</button>` : ""}
          ${t2.status !== "closed" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="close" data-id="${t2.id}" style="background:#f5f5f5;color:#757575">Close</button>` : ""}
        </div>
      </div>
      ${t2.adminReply ? `<div class="mt-3 p-3 rounded-lg text-sm" style="background:#e3f2fd;color:#0d47a1"><span class="font-semibold">Admin Reply:</span> ${escH(t2.adminReply)}</div>` : ""}
      ${t2.status !== "resolved" && t2.status !== "closed" ? `
        <div id="reply-form-${t2.id}" class="hidden mt-3">
          <textarea id="reply-text-${t2.id}" rows="3" placeholder="Type your reply..." class="w-full px-3 py-2 rounded-lg border text-sm resize-none" style="border-color:oklch(var(--border))"></textarea>
          <button class="ticket-action mt-2 text-xs px-4 py-2 rounded-lg font-semibold text-white" data-action="submit-reply" data-id="${t2.id}" style="background:oklch(var(--primary))">Send Reply</button>
        </div>
      ` : ""}
    </div>
  `
  ).join("");
}
function attachTicketActions(container) {
  for (const btn of Array.from(
    container.querySelectorAll(".ticket-action")
  )) {
    btn.addEventListener("click", (e) => {
      const el = e.currentTarget;
      const action = el.dataset.action;
      const id = el.dataset.id;
      const tickets = getTickets();
      const idx = tickets.findIndex((t2) => t2.id === id);
      if (idx === -1) return;
      if (action === "reply") {
        const form = container.querySelector(`#reply-form-${id}`);
        form == null ? void 0 : form.classList.toggle("hidden");
      } else if (action === "submit-reply") {
        const textarea = container.querySelector(
          `#reply-text-${id}`
        );
        const reply = textarea == null ? void 0 : textarea.value.trim();
        if (!reply) return;
        tickets[idx].adminReply = reply;
        tickets[idx].status = "in-progress";
        tickets[idx].updatedAt = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        saveTickets(tickets);
        showTicketToast("Reply sent!");
        const list = container.querySelector("#tickets-list");
        if (list) list.innerHTML = renderTicketCards(getTickets());
        attachTicketActions(container);
      } else if (action === "in-progress") {
        tickets[idx].status = "in-progress";
        saveTickets(tickets);
        showTicketToast("Ticket marked in progress.");
        const list = container.querySelector("#tickets-list");
        if (list) list.innerHTML = renderTicketCards(getTickets());
        attachTicketActions(container);
      } else if (action === "resolve") {
        tickets[idx].status = "resolved";
        tickets[idx].updatedAt = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        saveTickets(tickets);
        showTicketToast("Ticket resolved!");
        const list = container.querySelector("#tickets-list");
        if (list) list.innerHTML = renderTicketCards(getTickets());
        attachTicketActions(container);
      } else if (action === "close") {
        tickets[idx].status = "closed";
        saveTickets(tickets);
        showTicketToast("Ticket closed.");
        const list = container.querySelector("#tickets-list");
        if (list) list.innerHTML = renderTicketCards(getTickets());
        attachTicketActions(container);
      }
    });
  }
}
function showTicketToast(msg) {
  const t2 = document.createElement("div");
  t2.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t2.style.background = "oklch(var(--primary))";
  t2.textContent = msg;
  document.body.appendChild(t2);
  setTimeout(() => t2.remove(), 2500);
}
const TOGGLES_KEY = "dhoondho_feature_toggles";
const DEFAULT_TOGGLES = [
  {
    id: "search",
    name: "Search",
    description: "Core search functionality",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01"
  },
  {
    id: "map",
    name: "Map View",
    description: "Leaflet map with pins",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01"
  },
  {
    id: "nearby",
    name: "Nearby Now",
    description: "GPS-based nearby search",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01"
  },
  {
    id: "voice_search",
    name: "Voice Search",
    description: "Mic-based voice search (SpeechRecognition API)",
    category: "core",
    enabled: true,
    lastChanged: "2026-02-10"
  },
  {
    id: "blog",
    name: "Blog",
    description: "Blog section and articles",
    category: "social",
    enabled: true,
    lastChanged: "2026-01-15"
  },
  {
    id: "reviews",
    name: "Reviews & Ratings",
    description: "User reviews on listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-01-20"
  },
  {
    id: "qa",
    name: "Q&A",
    description: "Questions and answers on listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-02-01"
  },
  {
    id: "ai_assistant",
    name: "AI Assistant",
    description: "Floating AI search assistant widget",
    category: "experimental",
    enabled: true,
    lastChanged: "2026-02-15"
  },
  {
    id: "claim_listing",
    name: "Claim Listing",
    description: "Business owners can claim listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-02-01"
  },
  {
    id: "suggest_edit",
    name: "Suggest Edit",
    description: "Users can suggest edits to listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-02-01"
  },
  {
    id: "featured_listings",
    name: "Featured Listings",
    description: "Sponsored/promoted listings",
    category: "monetization",
    enabled: true,
    lastChanged: "2026-03-01"
  },
  {
    id: "ads",
    name: "Advertisements",
    description: "Banner and inline ads",
    category: "monetization",
    enabled: false,
    lastChanged: "2026-03-05"
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    description: "Paid vendor subscription plans",
    category: "monetization",
    enabled: true,
    lastChanged: "2026-03-10"
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Push notifications and broadcasts",
    category: "admin",
    enabled: true,
    lastChanged: "2026-03-01"
  },
  {
    id: "seo_pages",
    name: "SEO Pages",
    description: "Dynamic service+city SEO landing pages",
    category: "core",
    enabled: true,
    lastChanged: "2026-02-20"
  },
  {
    id: "multilang",
    name: "Multi-language",
    description: "10 Indian languages support",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01"
  },
  {
    id: "pwa",
    name: "PWA / App Install",
    description: "Progressive Web App install prompt",
    category: "experimental",
    enabled: true,
    lastChanged: "2026-03-15"
  },
  {
    id: "analytics_tracking",
    name: "Analytics Tracking",
    description: "Event and usage tracking",
    category: "admin",
    enabled: true,
    lastChanged: "2026-03-01"
  },
  {
    id: "booking",
    name: "Booking System",
    description: "Request booking/callback from listings",
    category: "core",
    enabled: true,
    lastChanged: "2026-02-10"
  },
  {
    id: "lead_gen",
    name: "Lead Generation",
    description: "Lead capture forms",
    category: "monetization",
    enabled: true,
    lastChanged: "2026-02-15"
  }
];
function getToggles() {
  try {
    const stored = JSON.parse(localStorage.getItem(TOGGLES_KEY) || "null");
    if (!stored) {
      localStorage.setItem(TOGGLES_KEY, JSON.stringify(DEFAULT_TOGGLES));
      return DEFAULT_TOGGLES;
    }
    return stored;
  } catch {
    return DEFAULT_TOGGLES;
  }
}
function saveToggles(toggles) {
  localStorage.setItem(TOGGLES_KEY, JSON.stringify(toggles));
}
function renderFeatureTogglesTab(container) {
  var _a3, _b2;
  const toggles = getToggles();
  const categories = [
    "core",
    "social",
    "monetization",
    "admin",
    "experimental"
  ];
  const catLabels = {
    core: "Core Features",
    social: "Social & Community",
    monetization: "Monetization",
    admin: "Admin & Analytics",
    experimental: "Experimental"
  };
  const catColors = {
    core: "#0d47a1",
    social: "#1a7a3c",
    monetization: "#6a1b9a",
    admin: "#e65100",
    experimental: "#b71c1c"
  };
  const enabled = toggles.filter((t2) => t2.enabled).length;
  const disabled = toggles.filter((t2) => !t2.enabled).length;
  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Feature Toggles</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${enabled} enabled · ${disabled} disabled</p>
        </div>
        <div class="flex gap-2">
          <button id="enable-all-toggles" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#e8f5e9;color:#1a7a3c">Enable All</button>
          <button id="disable-all-toggles" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#fdecea;color:#b71c1c">Disable All Non-Core</button>
        </div>
      </div>

      ${categories.map((cat) => {
    const catToggles = toggles.filter((t2) => t2.category === cat);
    if (catToggles.length === 0) return "";
    return `
          <div>
            <h3 class="text-sm font-bold mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full inline-block" style="background:${catColors[cat]}"></span>
              <span style="color:${catColors[cat]}">${catLabels[cat]}</span>
            </h3>
            <div class="space-y-2">
              ${catToggles.map(
      (t2) => `
                <div class="rounded-xl border p-4 flex items-center justify-between gap-4" style="background:oklch(var(--card));border-color:oklch(var(--border))">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-semibold" style="color:oklch(var(--foreground))">${t2.name}</span>
                      ${!t2.enabled ? `<span class="text-xs px-2 py-0.5 rounded-full" style="background:#fdecea;color:#b71c1c">OFF</span>` : ""}
                    </div>
                    <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">${t2.description}</p>
                    <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Last changed: ${t2.lastChanged}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" class="sr-only peer toggle-checkbox" data-toggle-id="${t2.id}" ${t2.enabled ? "checked" : ""}>
                    <div class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style="background:${t2.enabled ? "oklch(var(--primary))" : "#ccc"}"></div>
                  </label>
                </div>
              `
    ).join("")}
            </div>
          </div>
        `;
  }).join("")}
    </div>
  `;
  for (const checkbox of Array.from(
    container.querySelectorAll(".toggle-checkbox")
  )) {
    checkbox.addEventListener("change", (e) => {
      const el = e.currentTarget;
      const id = el.dataset.toggleId;
      const toggles2 = getToggles();
      const idx = toggles2.findIndex((t2) => t2.id === id);
      if (idx === -1) return;
      toggles2[idx].enabled = el.checked;
      toggles2[idx].lastChanged = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      saveToggles(toggles2);
      const div = el.nextElementSibling;
      if (div)
        div.style.background = el.checked ? "oklch(var(--primary))" : "#ccc";
      showToggleToast(
        `${toggles2[idx].name} ${el.checked ? "enabled" : "disabled"}.`
      );
    });
  }
  (_a3 = container.querySelector("#enable-all-toggles")) == null ? void 0 : _a3.addEventListener("click", () => {
    const toggles2 = getToggles();
    for (const t2 of toggles2) {
      t2.enabled = true;
      t2.lastChanged = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    }
    saveToggles(toggles2);
    renderFeatureTogglesTab(container);
    showToggleToast("All features enabled.");
  });
  (_b2 = container.querySelector("#disable-all-toggles")) == null ? void 0 : _b2.addEventListener("click", () => {
    const toggles2 = getToggles();
    for (const t2 of toggles2) {
      if (t2.category !== "core") {
        t2.enabled = false;
        t2.lastChanged = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      }
    }
    saveToggles(toggles2);
    renderFeatureTogglesTab(container);
    showToggleToast("All non-core features disabled.");
  });
}
function showToggleToast(msg) {
  const t2 = document.createElement("div");
  t2.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t2.style.background = "oklch(var(--primary))";
  t2.textContent = msg;
  document.body.appendChild(t2);
  setTimeout(() => t2.remove(), 2500);
}
const USERS_KEY = "dhoondho_users_registry";
function getUsersRegistry() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveUsersRegistry(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function escHtml(s2) {
  return s2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function initUserManagementDemo() {
  if (getUsersRegistry().length > 0) return;
  const demo = [
    {
      id: "u1",
      principal: "2vxsx-fae",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "user",
      status: "active",
      joinedAt: "2026-01-10",
      lastActive: "2026-03-18",
      listingsCount: 3
    },
    {
      id: "u2",
      principal: "rrkah-fqaaa",
      name: "Priya Verma",
      email: "priya@example.com",
      role: "vendor",
      status: "active",
      joinedAt: "2026-02-05",
      lastActive: "2026-03-17",
      listingsCount: 8
    },
    {
      id: "u3",
      principal: "qoctq-giaaa",
      name: "Amit Patel",
      email: "amit@example.com",
      role: "user",
      status: "banned",
      joinedAt: "2026-01-20",
      lastActive: "2026-02-28",
      listingsCount: 1
    },
    {
      id: "u4",
      principal: "aaaaa-bbbbb",
      name: "Sunita Rao",
      email: "sunita@example.com",
      role: "vendor",
      status: "suspended",
      joinedAt: "2026-02-14",
      lastActive: "2026-03-10",
      listingsCount: 5
    },
    {
      id: "u5",
      principal: "ccccc-ddddd",
      name: "Vikram Singh",
      email: "vikram@example.com",
      role: "admin",
      status: "active",
      joinedAt: "2025-12-01",
      lastActive: "2026-03-19",
      listingsCount: 12
    }
  ];
  saveUsersRegistry(demo);
}
function statusBadge(status) {
  const map = {
    active: "background:#e8f5e9;color:#1a7a3c",
    banned: "background:#fdecea;color:#b71c1c",
    suspended: "background:#fff3e0;color:#e65100"
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${map[status]}">${status}</span>`;
}
function roleBadge(role) {
  const map = {
    admin: "background:#e3f2fd;color:#0d47a1",
    vendor: "background:#f3e5f5;color:#6a1b9a",
    user: "background:#f5f5f5;color:#424242"
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${map[role]}">${role}</span>`;
}
function renderUserManagementTab(container) {
  var _a3;
  initUserManagementDemo();
  const users = getUsersRegistry();
  container.innerHTML = `
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">User Management</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${users.length} registered users</p>
        </div>
        <button id="export-users-btn" class="px-4 py-2 text-sm font-semibold rounded-lg border flex items-center gap-2" style="border-color:oklch(var(--border))">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <input id="user-search" type="text" placeholder="Search by name or email..." class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
        <select id="user-role-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="vendor">Vendor</option>
          <option value="user">User</option>
        </select>
        <select id="user-status-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:oklch(var(--primary))">${users.length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Total Users</div>
        </div>
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:#1a7a3c">${users.filter((u) => u.status === "active").length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Active</div>
        </div>
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:#6a1b9a">${users.filter((u) => u.role === "vendor").length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Vendors</div>
        </div>
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:#b71c1c">${users.filter((u) => u.status === "banned").length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Banned</div>
        </div>
      </div>

      <!-- User Table -->
      <div class="rounded-xl border" style="border-color:oklch(var(--border))">
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:700px">
            <thead>
              <tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">User</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Role</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Joined</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Listings</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
              </tr>
            </thead>
            <tbody id="users-table-body">
              ${renderUsersRows(users)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  const searchInput = container.querySelector("#user-search");
  const roleFilter = container.querySelector("#user-role-filter");
  const statusFilter = container.querySelector(
    "#user-status-filter"
  );
  function applyFilters() {
    const q2 = ((searchInput == null ? void 0 : searchInput.value) || "").toLowerCase();
    const role = (roleFilter == null ? void 0 : roleFilter.value) || "";
    const status = (statusFilter == null ? void 0 : statusFilter.value) || "";
    const all = getUsersRegistry();
    const filtered = all.filter((u) => {
      const matchQ = !q2 || u.name.toLowerCase().includes(q2) || u.email.toLowerCase().includes(q2);
      const matchRole = !role || u.role === role;
      const matchStatus = !status || u.status === status;
      return matchQ && matchRole && matchStatus;
    });
    const tbody = container.querySelector("#users-table-body");
    if (tbody) tbody.innerHTML = renderUsersRows(filtered);
    attachUserActions(container);
  }
  searchInput == null ? void 0 : searchInput.addEventListener("input", applyFilters);
  roleFilter == null ? void 0 : roleFilter.addEventListener("change", applyFilters);
  statusFilter == null ? void 0 : statusFilter.addEventListener("change", applyFilters);
  (_a3 = container.querySelector("#export-users-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    const all = getUsersRegistry();
    const csv = [
      "Name,Email,Role,Status,Joined,Listings",
      ...all.map(
        (u) => `"${u.name}","${u.email}",${u.role},${u.status},${u.joinedAt},${u.listingsCount}`
      )
    ].join("\n");
    const a2 = document.createElement("a");
    a2.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    a2.download = "dhoondho_users.csv";
    a2.click();
  });
  attachUserActions(container);
}
function renderUsersRows(users) {
  if (users.length === 0) {
    return `<tr><td colspan="6" class="px-4 py-10 text-center text-sm" style="color:oklch(var(--muted-foreground))">No users found.</td></tr>`;
  }
  return users.map(
    (u) => `
    <tr data-user-id="${u.id}" style="border-bottom:1px solid oklch(var(--border))">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style="background:oklch(var(--primary))">${escHtml(u.name[0] || "?")}</div>
          <div>
            <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">${escHtml(u.name)}</div>
            <div class="text-xs" style="color:oklch(var(--muted-foreground))">${escHtml(u.email)}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3">${roleBadge(u.role)}</td>
      <td class="px-4 py-3">${statusBadge(u.status)}</td>
      <td class="px-4 py-3 text-sm" style="color:oklch(var(--muted-foreground))">${u.joinedAt}</td>
      <td class="px-4 py-3 text-sm font-semibold" style="color:oklch(var(--foreground))">${u.listingsCount}</td>
      <td class="px-4 py-3">
        <div class="flex flex-wrap gap-2">
          ${u.status !== "banned" ? `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="ban" data-id="${u.id}" style="background:#fdecea;color:#b71c1c">Ban</button>` : `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="unban" data-id="${u.id}" style="background:#e8f5e9;color:#1a7a3c">Unban</button>`}
          ${u.role !== "vendor" ? `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="make-vendor" data-id="${u.id}" style="background:#f3e5f5;color:#6a1b9a">Make Vendor</button>` : ""}
          <button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="view-log" data-id="${u.id}" style="background:#e3f2fd;color:#0d47a1">Activity</button>
        </div>
      </td>
    </tr>
  `
  ).join("");
}
function attachUserActions(container) {
  for (const btn of Array.from(
    container.querySelectorAll(".user-action-btn")
  )) {
    btn.addEventListener("click", (e) => {
      const el = e.currentTarget;
      const action = el.dataset.action;
      const id = el.dataset.id;
      const users = getUsersRegistry();
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return;
      if (action === "ban") {
        users[idx].status = "banned";
        saveUsersRegistry(users);
        showUserToast("User banned.");
      } else if (action === "unban") {
        users[idx].status = "active";
        saveUsersRegistry(users);
        showUserToast("User unbanned.");
      } else if (action === "make-vendor") {
        users[idx].role = "vendor";
        saveUsersRegistry(users);
        showUserToast("Role updated to vendor.");
      } else if (action === "view-log") {
        const u = users[idx];
        alert(
          `Activity Log – ${u.name}

Last Active: ${u.lastActive}
Listings: ${u.listingsCount}
Joined: ${u.joinedAt}
Principal: ${u.principal}`
        );
        return;
      }
      const tbody = container.querySelector("#users-table-body");
      if (tbody) tbody.innerHTML = renderUsersRows(getUsersRegistry());
      attachUserActions(container);
    });
  }
}
function showUserToast(msg) {
  const t2 = document.createElement("div");
  t2.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t2.style.background = "oklch(var(--primary))";
  t2.textContent = msg;
  document.body.appendChild(t2);
  setTimeout(() => t2.remove(), 2500);
}
const BLOG_STORAGE_KEY = "dhoondho_blog_articles";
const SAMPLE_ARTICLES = [
  {
    id: "1",
    title: "How to Find the Best Plumber in Your City",
    category: "Home Services",
    date: "March 15, 2026",
    author: "Dhoondho Team",
    summary: "Looking for a reliable plumber? Here's a complete guide to finding verified, top-rated plumbers in your city using Dhoondho's local search.",
    readTime: "4 min read",
    emoji: "🔧"
  },
  {
    id: "2",
    title: "Top 10 Things to Look for When Choosing a Doctor",
    category: "Healthcare",
    date: "March 13, 2026",
    author: "Dr. Priya Sharma",
    summary: "Whether you need a general physician or a specialist, knowing what to look for can make all the difference. Here are 10 essential tips.",
    readTime: "6 min read",
    emoji: "⚕️"
  },
  {
    id: "3",
    title: "Why Every Small Business in India Needs an Online Presence",
    category: "Business Tips",
    date: "March 11, 2026",
    author: "Dhoondho Team",
    summary: "63 million small businesses in India are still offline. Here's why getting listed on local directories like Dhoondho is the first step to growing your business.",
    readTime: "5 min read",
    emoji: "🏪"
  },
  {
    id: "4",
    title: "Dhoondho Now Available in 9 Indian Languages",
    category: "Announcements",
    date: "March 8, 2026",
    author: "Dhoondho Team",
    summary: "We're thrilled to announce that Dhoondho is now accessible in Hindi, Bengali, Telugu, Marathi, Tamil, Punjabi, Kannada, Malayalam, and Gujarati.",
    readTime: "2 min read",
    emoji: "🌐"
  },
  {
    id: "5",
    title: "Best Restaurants to Try in Mumbai This Month",
    category: "Food & Dining",
    date: "March 5, 2026",
    author: "Foodie Correspondent",
    summary: "From street food to fine dining, Mumbai's food scene is always buzzing. Here are the top new and trending restaurants discovered on Dhoondho this month.",
    readTime: "7 min read",
    emoji: "🍛"
  },
  {
    id: "6",
    title: "How Nearby Now Works: GPS Search Explained",
    category: "Features",
    date: "March 2, 2026",
    author: "Dhoondho Team",
    summary: "Our Nearby Now feature uses your device's GPS location (with your permission) to instantly show businesses within a customizable radius of your location.",
    readTime: "3 min read",
    emoji: "📍"
  }
];
function getBlogArticles() {
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...parsed, ...SAMPLE_ARTICLES];
      }
    }
  } catch {
  }
  return SAMPLE_ARTICLES;
}
function saveBlogArticles(adminArticles) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(adminArticles));
}
function getAdminBlogArticles() {
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
  }
  return [];
}
function escapeHtml$7(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderBlogPage() {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  const allArticles = getBlogArticles();
  const categories = [
    "All",
    ...Array.from(new Set(allArticles.map((a2) => a2.category)))
  ];
  function renderArticles(filter) {
    const filtered = filter === "All" ? allArticles : allArticles.filter((a2) => a2.category === filter);
    if (filtered.length === 0) {
      return `<div style="text-align:center;padding:40px;color:#9aa0a6">No articles in this category yet.</div>`;
    }
    return filtered.map(
      (article) => `
      <article data-id="${escapeHtml$7(article.id)}" style="border:1px solid #e8eaed;border-radius:16px;overflow:hidden;background:#fff;transition:box-shadow 0.15s;cursor:pointer" class="blog-card">
        <div style="background:#f8f9fa;padding:24px;font-size:40px;text-align:center">${article.emoji}</div>
        <div style="padding:20px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
            <span style="font-size:11px;font-weight:600;color:#1a7a3c;background:#e8f5e9;padding:3px 10px;border-radius:12px">${escapeHtml$7(article.category)}</span>
            <span style="font-size:11px;color:#9aa0a6">${escapeHtml$7(article.readTime)}</span>
          </div>
          <h2 style="font-size:15px;font-weight:700;color:#202124;line-height:1.4;margin-bottom:8px">${escapeHtml$7(article.title)}</h2>
          <p style="font-size:13px;color:#5f6368;line-height:1.5;margin-bottom:14px">${escapeHtml$7(article.summary)}</p>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:12px;color:#9aa0a6">${escapeHtml$7(article.date)} &bull; ${escapeHtml$7(article.author)}</span>
          </div>
        </div>
      </article>
    `
    ).join("");
  }
  main.innerHTML = `
    <style>
      @media (max-width: 600px) {
        .blog-container { padding: 24px 16px !important; }
        .blog-articles-grid { grid-template-columns: 1fr !important; }
      }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="blog-container" style="max-width:900px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <div style="margin-bottom:40px">
          <h1 style="font-size:32px;font-weight:700;color:#202124;margin-bottom:8px">Dhoondho Blog</h1>
          <p style="font-size:15px;color:#5f6368">Tips, guides, business insights, and updates from the Dhoondho team.</p>
        </div>

        <!-- Category filter chips -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px" id="blog-cat-filters">
          ${categories.map(
    (c2, i) => `<button class="blog-cat-btn" data-cat="${escapeHtml$7(c2)}" style="padding:6px 16px;border-radius:20px;border:1px solid ${i === 0 ? "#1a7a3c" : "#dadce0"};background:${i === 0 ? "#1a7a3c" : "#fff"};color:${i === 0 ? "#fff" : "#3c4043"};font-size:13px;cursor:pointer;font-weight:500">${escapeHtml$7(c2)}</button>`
  ).join("")}
        </div>

        <!-- Articles grid -->
        <div id="blog-articles-grid" class="blog-articles-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px">
          ${renderArticles("All")}
        </div>

        <div style="text-align:center;margin-top:48px;padding:24px;background:#f8f9fa;border-radius:16px">
          <div style="font-size:24px;margin-bottom:8px">✍️</div>
          <h3 style="font-size:16px;font-weight:700;color:#202124;margin-bottom:4px">Want to write for us?</h3>
          <p style="font-size:13px;color:#5f6368;margin-bottom:16px">Share your expertise on local businesses, services, and India's economy.</p>
          <a href="#/support" style="display:inline-block;padding:10px 24px;background:#1a7a3c;color:#fff;border-radius:24px;text-decoration:none;font-size:13px;font-weight:700">Get in Touch</a>
        </div>
      </div>
      ${renderPageFooter()}
    </div>
  `;
  let activeFilter = "All";
  for (const btn of document.querySelectorAll(
    ".blog-cat-btn"
  )) {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.cat || "All";
      for (const b2 of document.querySelectorAll(
        ".blog-cat-btn"
      )) {
        const isActive = b2.dataset.cat === activeFilter;
        b2.style.background = isActive ? "#1a7a3c" : "#fff";
        b2.style.color = isActive ? "#fff" : "#3c4043";
        b2.style.borderColor = isActive ? "#1a7a3c" : "#dadce0";
      }
      const grid = document.getElementById("blog-articles-grid");
      if (grid) grid.innerHTML = renderArticles(activeFilter);
      attachCardHover();
    });
  }
  attachCardHover();
  attachCardClick();
}
function openArticleModal(article) {
  var _a3;
  const overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px";
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;max-width:680px;width:100%;max-height:90vh;overflow-y:auto;padding:28px 24px 32px;position:relative">
      <button id="blog-modal-close" style="position:absolute;top:14px;right:14px;background:none;border:none;cursor:pointer;font-size:22px;color:#5f6368;line-height:1">×</button>
      <div style="font-size:40px;text-align:center;margin-bottom:16px">${article.emoji}</div>
      <span style="font-size:11px;font-weight:600;color:#1a7a3c;background:#e8f5e9;padding:3px 10px;border-radius:12px">${escapeHtml$7(article.category)}</span>
      <h2 style="font-size:20px;font-weight:700;color:#202124;margin:12px 0 8px;line-height:1.4">${escapeHtml$7(article.title)}</h2>
      <div style="font-size:12px;color:#9aa0a6;margin-bottom:16px">${escapeHtml$7(article.date)} &bull; ${escapeHtml$7(article.author)} &bull; ${escapeHtml$7(article.readTime)}</div>
      <p style="font-size:15px;color:#3c4043;line-height:1.7">${escapeHtml$7(article.summary)}</p>
    </div>
  `;
  document.body.appendChild(overlay);
  (_a3 = overlay.querySelector("#blog-modal-close")) == null ? void 0 : _a3.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", onEsc);
    }
  });
}
function attachCardClick() {
  const allArticles = getBlogArticles();
  for (const card of document.querySelectorAll(".blog-card")) {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const article = allArticles.find((a2) => a2.id === id);
      if (article) openArticleModal(article);
    });
  }
}
function attachCardHover() {
  for (const card of document.querySelectorAll(".blog-card")) {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
    });
  }
}
let activeTab = "pending";
function escapeHtml$6(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function isVerifiedListing$2(id) {
  try {
    const ids = JSON.parse(
      localStorage.getItem("dhoondho_verified_listings") || "[]"
    );
    return ids.includes(id);
  } catch {
    return false;
  }
}
function getCategoryName$2(categoryId) {
  const cat = SAMPLE_CATEGORIES.find((c2) => c2.id === categoryId);
  return cat ? cat.name : "Unknown";
}
function buildCategoryOptions(selectedId) {
  return SAMPLE_CATEGORIES.map(
    (c2) => `<option value="${c2.id}" ${""}>${c2.icon} ${escapeHtml$6(c2.name)}</option>`
  ).join("");
}
async function renderAdminPage() {
  var _a3;
  const main = document.getElementById("main-content");
  if (!main) return;
  const passwordVerified = sessionStorage.getItem("dhoondho_admin_auth") === "true";
  if (!passwordVerified) {
    showAdminPasswordScreen(main);
    return;
  }
  const authed = await isAuthenticated();
  if (!authed) {
    main.innerHTML = `
      <div class="min-h-screen flex items-center justify-center px-4" style="background:oklch(var(--secondary))">
        <div class="bg-white rounded-2xl border p-10 text-center max-w-md w-full" style="border-color:oklch(var(--border))">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5" style="background:oklch(var(--secondary))">🔒</div>
          <h2 class="text-2xl font-bold mb-3" style="color:oklch(var(--foreground))">Admin Panel</h2>
          <p class="text-sm mb-7" style="color:oklch(var(--muted-foreground))">Sign in with your Internet Identity to access the admin panel.</p>
          <button id="admin-signin-btn" data-ocid="admin.primary_button" class="w-full px-6 py-3 rounded-xl text-sm font-bold text-white" style="background:oklch(var(--primary))">
            Sign In with Internet Identity
          </button>
        </div>
      </div>
    `;
    (_a3 = document.getElementById("admin-signin-btn")) == null ? void 0 : _a3.addEventListener("click", async () => {
      await login();
      resetBackend();
      await debugAuth();
      await renderAdminPage();
    });
    return;
  }
  await debugAuth();
  let isAdmin = false;
  let adminAlreadyExists = false;
  try {
    const backend2 = await getAuthenticatedBackend();
    isAdmin = await backend2.isCallerAdmin();
    if (!isAdmin) {
      const claimed = await backend2.claimFirstAdminRole();
      if (claimed) {
        isAdmin = true;
        showToast("Admin access granted!", "success");
      } else {
        adminAlreadyExists = true;
      }
    } else {
    }
  } catch {
    isAdmin = true;
  }
  let adminWarningBanner = "";
  if (!isAdmin) {
    if (adminAlreadyExists) {
      adminWarningBanner = `
        <div id="claim-admin-banner" class="mb-6 px-5 py-4 rounded-xl flex items-start gap-3" style="background:oklch(0.97 0.05 27);border:1px solid oklch(0.85 0.1 27)">
          <span class="text-xl flex-shrink-0">⚠️</span>
          <div class="flex-1">
            <p class="text-sm font-semibold" style="color:oklch(0.45 0.12 27)">Another admin account is registered</p>
            <p class="text-xs mt-0.5" style="color:oklch(0.55 0.08 27)">
              The platform already has an admin. If you are the owner and want to take over as admin,
              click <strong>Reset &amp; Claim Admin</strong>.
            </p>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
              <button id="reset-claim-admin-btn" data-ocid="admin.primary_button" class="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style="background:oklch(0.55 0.18 27)">Reset &amp; Claim Admin</button>
              <span id="claim-admin-status" class="text-xs" style="color:oklch(0.55 0.08 27)"></span>
            </div>
          </div>
        </div>
      `;
    } else {
      adminWarningBanner = `
        <div id="claim-admin-banner" class="mb-6 px-5 py-4 rounded-xl flex items-start gap-3" style="background:oklch(0.97 0.05 85);border:1px solid oklch(0.85 0.1 85)">
          <span class="text-xl flex-shrink-0">⚠️</span>
          <div class="flex-1">
            <p class="text-sm font-semibold" style="color:oklch(0.45 0.12 85)">Admin setup pending</p>
            <p class="text-xs mt-0.5" style="color:oklch(0.55 0.08 85)">You can continue using the platform. Click below to claim admin access.</p>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
              <button id="claim-admin-btn" data-ocid="admin.primary_button" class="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style="background:oklch(0.6 0.15 85)">Claim Admin Access</button>
              <span id="claim-admin-status" class="text-xs" style="color:oklch(0.55 0.08 85)"></span>
            </div>
          </div>
        </div>
      `;
    }
  }
  main.innerHTML = `
    <div class="flex flex-col flex-1 w-full" style="background:oklch(var(--secondary))">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div class="admin-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 class="text-3xl font-bold" style="color:oklch(var(--foreground))">Admin Panel</h1>
            <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Manage listings, categories, vendors, and blog</p>
          </div>
        </div>

        <!-- Quick Stats Dashboard -->
        <div id="admin-quick-stats" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
            <div class="text-xl font-bold" style="color:oklch(var(--primary))" id="qs-users">-</div>
            <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Users</div>
          </div>
          <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
            <div class="text-xl font-bold" style="color:#1a7a3c" id="qs-listings">-</div>
            <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Listings</div>
          </div>
          <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
            <div class="text-xl font-bold" style="color:#e65100" id="qs-tickets">-</div>
            <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Open Tickets</div>
          </div>
          <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
            <div class="text-xl font-bold" style="color:#6a1b9a" id="qs-docs">-</div>
            <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Pending Docs</div>
          </div>
        </div>
        ${adminWarningBanner}

        <!-- Tabs -->
        <div class="admin-tabs-bar" style="min-width:0">
          <button id="tab-pending" data-ocid="admin.tab" data-tab="pending" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Pending Listings
          </button>
          <button id="tab-categories" data-ocid="admin.tab" data-tab="categories" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Categories
          </button>
          <button id="tab-vendors" data-ocid="admin.tab" data-tab="vendors" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Vendors
          </button>
          <button id="tab-blog" data-ocid="admin.tab" data-tab="blog" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Blog Articles
          </button>
          <button id="tab-suggestions" data-ocid="admin.tab" data-tab="suggestions" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            ✏️ Suggestions
          </button>
          <button id="tab-claims" data-ocid="admin.tab" data-tab="claims" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            🏢 Claims
          </button>
          <button id="tab-analytics" data-ocid="admin.tab" data-tab="analytics" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            📊 Analytics
          </button>
          <button id="tab-users" data-ocid="admin.tab" data-tab="users" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            👥 Users
          </button>
          <button id="tab-tickets" data-ocid="admin.tab" data-tab="tickets" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            🎫 Tickets
          </button>
          <button id="tab-toggles" data-ocid="admin.tab" data-tab="toggles" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            ⚙️ Toggles
          </button>
          <button id="tab-notifications" data-ocid="admin.tab" data-tab="notifications" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            🔔 Notify
          </button>
          <button id="tab-monetization" data-ocid="admin.tab" data-tab="monetization" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            💰 Revenue
          </button>
          <button id="tab-advanalytics" data-ocid="admin.tab" data-tab="advanalytics" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            📈 Deep Analytics
          </button>
          <button id="tab-logs" data-ocid="admin.tab" data-tab="logs" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            🗒️ Logs
          </button>
          <button id="tab-mapcontrol" data-ocid="admin.tab" data-tab="mapcontrol" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            🗺️ Map Control
          </button>
          <button id="tab-searchcontrol" data-ocid="admin.tab" data-tab="searchcontrol" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            🔍 Search Ranking
          </button>
          <button id="tab-docverify" data-ocid="admin.tab" data-tab="docverify" class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            📋 Doc Verify
          </button>
        </div>

        <!-- Tab Content -->
        <div id="admin-tab-content">
          <div data-ocid="admin.loading_state" class="p-10 text-center bg-white rounded-2xl border" style="border-color:oklch(var(--border))">
            <div class="inline-block w-6 h-6 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div>
          </div>
        </div>
      </div>
    ${renderPageFooter()}
    </div>
  `;
  attachAdminTabEvents();
  switchAdminTab(activeTab);
  loadQuickStats();
  const resetClaimBtn = document.getElementById(
    "reset-claim-admin-btn"
  );
  if (resetClaimBtn) {
    const claimStatus = document.getElementById("claim-admin-status");
    resetClaimBtn.addEventListener("click", async () => {
      var _a4;
      if (!confirm(
        "This will remove the existing admin and set YOU as admin. Continue?"
      ))
        return;
      resetClaimBtn.disabled = true;
      resetClaimBtn.textContent = "Resetting...";
      if (claimStatus) claimStatus.textContent = "";
      try {
        const backend2 = await getAuthenticatedBackend();
        await backend2.forceResetAdmin();
        const claimed = await backend2.claimFirstAdminRole();
        if (claimed) {
          (_a4 = document.getElementById("claim-admin-banner")) == null ? void 0 : _a4.remove();
          showToast(
            "Admin reset successful. You are now the admin.",
            "success"
          );
        } else {
          resetClaimBtn.disabled = false;
          resetClaimBtn.textContent = "Reset & Claim Admin";
          if (claimStatus) claimStatus.textContent = "Reset failed. Try again.";
          showToast("Reset failed. Please try again.", "error");
        }
      } catch (err) {
        resetClaimBtn.disabled = false;
        resetClaimBtn.textContent = "Reset & Claim Admin";
        const msg = err instanceof Error ? err.message : "Unknown error";
        if (claimStatus) claimStatus.textContent = msg;
        showToast(`Failed: ${msg}`, "error");
      }
    });
  }
  const claimBtn = document.getElementById(
    "claim-admin-btn"
  );
  if (claimBtn) {
    const claimStatus = document.getElementById("claim-admin-status");
    claimBtn.addEventListener("click", async () => {
      var _a4;
      claimBtn.disabled = true;
      claimBtn.textContent = "Claiming...";
      if (claimStatus) claimStatus.textContent = "";
      try {
        const backend2 = await getBackend();
        const claimed = await backend2.claimFirstAdminRole();
        if (claimed) {
          (_a4 = document.getElementById("claim-admin-banner")) == null ? void 0 : _a4.remove();
          showToast("Admin access granted! You are now the admin.", "success");
        } else {
          claimBtn.disabled = false;
          claimBtn.textContent = "Claim Admin Access";
          if (claimStatus) {
            claimStatus.style.color = "oklch(0.5 0.15 27)";
            claimStatus.textContent = "An admin already exists. Use Reset & Claim.";
          }
          showToast("An admin already exists.", "error");
          setTimeout(() => renderAdminPage(), 1500);
        }
      } catch (err) {
        claimBtn.disabled = false;
        claimBtn.textContent = "Claim Admin Access";
        const msg = err instanceof Error ? err.message : "Unknown error";
        if (claimStatus) {
          claimStatus.style.color = "oklch(0.5 0.15 27)";
          claimStatus.textContent = msg;
        }
        showToast(`Failed: ${msg}`, "error");
      }
    });
  }
}
function showAdminPasswordScreen(main) {
  main.innerHTML = `
    <div class="min-h-screen flex items-center justify-center px-4" style="background:oklch(var(--secondary))">
      <div class="bg-white rounded-2xl border p-10 text-center max-w-md w-full" style="border-color:oklch(var(--border))">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5" style="background:oklch(var(--secondary))">🔑</div>
        <h2 class="text-2xl font-bold mb-2" style="color:oklch(var(--foreground))">Admin Access</h2>
        <p class="text-sm mb-7" style="color:oklch(var(--muted-foreground))">Enter admin password to continue</p>
        <div class="text-left">
          <input
            type="password"
            id="admin-password-input"
            data-ocid="admin.input"
            placeholder="Enter admin password"
            class="w-full px-4 py-3 rounded-xl border text-sm outline-none mb-3"
            style="border-color:oklch(var(--border))"
          />
          <div id="admin-password-error" class="hidden mb-3 px-4 py-2.5 rounded-lg text-sm" style="background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27)">Incorrect password. Please try again.</div>
          <button
            id="admin-password-btn"
            data-ocid="admin.primary_button"
            class="w-full px-6 py-3 rounded-xl text-sm font-bold text-white"
            style="background:oklch(var(--primary))"
          >
            Access Admin Panel
          </button>
        </div>
      </div>
    </div>
  `;
  const input = document.getElementById(
    "admin-password-input"
  );
  const btn = document.getElementById("admin-password-btn");
  const errEl = document.getElementById("admin-password-error");
  const handlePasswordSubmit = async () => {
    const val = (input == null ? void 0 : input.value) || "";
    if (val === "dhoondho3456") {
      sessionStorage.setItem("dhoondho_admin_auth", "true");
      await renderAdminPage();
    } else {
      if (errEl) errEl.classList.remove("hidden");
      if (input) input.value = "";
      input == null ? void 0 : input.focus();
    }
  };
  btn == null ? void 0 : btn.addEventListener("click", handlePasswordSubmit);
  input == null ? void 0 : input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handlePasswordSubmit();
  });
}
function loadQuickStats() {
  try {
    const users = JSON.parse(
      localStorage.getItem("dhoondho_users_registry") || "[]"
    );
    const tickets = JSON.parse(
      localStorage.getItem("dhoondho_support_tickets") || "[]"
    );
    const docs = JSON.parse(
      localStorage.getItem("dhoondho_doc_submissions") || "[]"
    );
    const listings = JSON.parse(
      localStorage.getItem("dhoondho_listings_cache") || "[]"
    );
    const el = (id, val) => {
      const e = document.getElementById(id);
      if (e) e.textContent = val;
    };
    el("qs-users", String(users.length || 0));
    el("qs-listings", String(listings.length || 0));
    el(
      "qs-tickets",
      String(
        tickets.filter(
          (t2) => t2.status === "open" || t2.status === "in-progress"
        ).length || 0
      )
    );
    el(
      "qs-docs",
      String(
        docs.filter((d2) => d2.status === "pending").length || 0
      )
    );
  } catch {
  }
}
function attachAdminTabEvents() {
  for (const btn of document.querySelectorAll("[data-tab]")) {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      activeTab = tab;
      switchAdminTab(tab);
    });
  }
}
function updateTabStyles(active) {
  for (const btn of document.querySelectorAll("[data-tab]")) {
    const isActive = btn.dataset.tab === active;
    if (isActive) {
      btn.style.background = "#1f7a3e";
      btn.classList.add("active-admin-tab");
      btn.style.color = "white";
    } else {
      btn.style.background = "";
      btn.style.color = "";
      btn.classList.remove("active-admin-tab");
    }
  }
}
function switchAdminTab(tab) {
  updateTabStyles(tab);
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  content.innerHTML = `<div class="p-10 text-center bg-white rounded-2xl border" style="border-color:oklch(var(--border))"><div class="inline-block w-6 h-6 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div></div>`;
  if (tab === "pending") loadPendingListings();
  else if (tab === "categories") loadCategories();
  else if (tab === "vendors") loadVendors();
  else if (tab === "blog") loadBlogAdmin();
  else if (tab === "suggestions") loadSuggestions();
  else if (tab === "claims") loadClaims();
  else if (tab === "analytics") loadAnalytics();
  else if (tab === "users") {
    content.innerHTML = "";
    renderUserManagementTab(content);
  } else if (tab === "tickets") {
    content.innerHTML = "";
    renderTicketsTab(content);
  } else if (tab === "toggles") {
    content.innerHTML = "";
    renderFeatureTogglesTab(content);
  } else if (tab === "notifications") {
    content.innerHTML = "";
    renderNotificationsTab(content);
  } else if (tab === "monetization") {
    content.innerHTML = "";
    renderMonetizationTab(content);
  } else if (tab === "advanalytics") {
    content.innerHTML = "";
    renderAdvancedAnalyticsTab(content);
  } else if (tab === "logs") {
    content.innerHTML = "";
    renderLogsTab(content);
  } else if (tab === "mapcontrol") {
    content.innerHTML = "";
    renderMapControlTab(content);
  } else if (tab === "searchcontrol") {
    content.innerHTML = "";
    renderSearchControlTab(content);
  } else if (tab === "docverify") {
    content.innerHTML = "";
    renderDocVerificationTab(content);
  }
}
function renderAddListingForm() {
  const categoryOptions = buildCategoryOptions();
  return `
    <div id="add-listing-form" class="hidden p-6 border-b" style="border-color:oklch(var(--border));background:#fafafa">
      <h3 class="font-bold text-sm mb-4" style="color:oklch(var(--foreground))">Add New Business Listing</h3>
      <form id="listing-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Business Name *</label>
          <input data-ocid="admin.input" name="name" type="text" required placeholder="e.g. Raj Electricals" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Category *</label>
          <select data-ocid="admin.input" name="categoryId" required class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
            <option value="">-- Select Category --</option>
            ${categoryOptions}
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Phone *</label>
          <input data-ocid="admin.input" name="phone" type="tel" required placeholder="+91 98000 00000" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">City *</label>
          <input data-ocid="admin.input" name="city" type="text" required placeholder="e.g. Mumbai" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">State *</label>
          <input data-ocid="admin.input" name="state" type="text" required placeholder="e.g. Maharashtra" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Address *</label>
          <input data-ocid="admin.input" name="address" type="text" required placeholder="Street address" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Website</label>
          <input data-ocid="admin.input" name="website" type="url" placeholder="https://example.com" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Latitude</label>
            <input data-ocid="admin.input" name="lat" type="number" step="any" placeholder="28.6139" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Longitude</label>
            <input data-ocid="admin.input" name="lng" type="number" step="any" placeholder="77.2090" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Price Range</label>
          <select data-ocid="admin.select" name="priceRange" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
            <option value="">-- Select Price Range --</option>
            <option value="1">₹ Budget</option>
            <option value="2">₹₹ Mid-Range</option>
            <option value="3">₹₹₹ Premium</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Business Hours</label>
          <input data-ocid="admin.input" name="businessHours" type="text" placeholder="e.g. Mon-Fri: 9:00 AM - 6:00 PM" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Description *</label>
          <textarea data-ocid="admin.input" name="description" required rows="3" placeholder="Brief description of the business..." class="w-full px-3 py-2 rounded-lg border text-sm resize-none" style="border-color:oklch(var(--border))"></textarea>
        </div>
        <div id="listing-form-error" class="md:col-span-2 hidden px-3 py-2 rounded-lg text-xs" style="background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27)"></div>
        <div class="md:col-span-2 flex flex-wrap gap-3">
          <button type="submit" data-ocid="admin.submit_button" class="px-5 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Add &amp; Approve Listing</button>
          <button type="button" id="cancel-listing-btn" data-ocid="admin.cancel_button" class="px-5 py-2 text-sm font-semibold rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
        </div>
      </form>
    </div>
  `;
}
function loadSuggestions() {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  try {
    const raw = localStorage.getItem("dhoondho_suggestions") || "[]";
    const items = JSON.parse(raw);
    if (items.length === 0) {
      content.innerHTML = `<div class="bg-white rounded-2xl border p-10 text-center" style="border-color:oklch(var(--border))"><p style="color:oklch(var(--muted-foreground))">No suggestions yet.</p></div>`;
      return;
    }
    content.innerHTML = `
      <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
        <div class="p-6 border-b" style="border-color:oklch(var(--border))">
          <h2 class="font-bold" style="color:oklch(var(--foreground))">✏️ Contributor Suggestions (${items.length})</h2>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Users have suggested corrections to these listings.</p>
        </div>
        <div class="divide-y" style="border-color:oklch(var(--border))">
          ${items.slice().reverse().map(
      (item, i) => `
            <div data-ocid="admin.item.${i + 1}" class="p-5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">Listing #${escapeHtml$6(item.listingId)}</div>
                  <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Field: <strong>${escapeHtml$6(item.field || "general")}</strong></div>
                  <div class="text-sm mt-2" style="color:oklch(var(--foreground))">${escapeHtml$6(item.suggestion)}</div>
                  <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${new Date(item.time).toLocaleString("en-IN")}</div>
                </div>
                <button data-dismiss-suggestion="${items.length - 1 - i}" class="px-3 py-1.5 text-xs font-semibold rounded-lg border" style="border-color:oklch(var(--border));color:oklch(var(--muted-foreground));cursor:pointer;background:#fff;flex-shrink:0">Dismiss</button>
              </div>
            </div>
          `
    ).join("")}
        </div>
      </div>
    `;
    for (const btn of content.querySelectorAll(
      "[data-dismiss-suggestion]"
    )) {
      btn.addEventListener("click", () => {
        const idx = Number.parseInt(btn.dataset.dismissSuggestion || "0");
        const all = JSON.parse(
          localStorage.getItem("dhoondho_suggestions") || "[]"
        );
        all.splice(idx, 1);
        localStorage.setItem("dhoondho_suggestions", JSON.stringify(all));
        loadSuggestions();
      });
    }
  } catch {
    content.innerHTML = `<div class="bg-white rounded-2xl border p-10 text-center" style="border-color:oklch(var(--border))"><p style="color:oklch(var(--muted-foreground))">Error loading suggestions.</p></div>`;
  }
}
function loadClaims() {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  try {
    const raw = localStorage.getItem("dhoondho_claims") || "[]";
    const items = JSON.parse(raw);
    if (items.length === 0) {
      content.innerHTML = `<div class="bg-white rounded-2xl border p-10 text-center" style="border-color:oklch(var(--border))"><p style="color:oklch(var(--muted-foreground))">No claim requests yet.</p></div>`;
      return;
    }
    content.innerHTML = `
      <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
        <div class="p-6 border-b" style="border-color:oklch(var(--border))">
          <h2 class="font-bold" style="color:oklch(var(--foreground))">🏢 Listing Claim Requests (${items.length})</h2>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Business owners requesting to claim their listings.</p>
        </div>
        <div class="divide-y" style="border-color:oklch(var(--border))">
          ${items.slice().reverse().map(
      (item, i) => `
            <div data-ocid="admin.item.${i + 1}" class="p-5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">Listing #${escapeHtml$6(item.listingId)}</div>
                  <div class="text-sm mt-1">Owner: <strong>${escapeHtml$6(item.ownerName)}</strong> &bull; ${escapeHtml$6(item.phone)}</div>
                  ${item.proof ? `<div class="text-sm mt-1 text-gray-500">${escapeHtml$6(item.proof)}</div>` : ""}
                  <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${new Date(item.time).toLocaleString("en-IN")}</div>
                </div>
                <div class="flex flex-wrap gap-2 flex-shrink-0">
                  <button data-approve-claim="${items.length - 1 - i}" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-white" style="background:#1a7a3c;cursor:pointer;border:none">Approve</button>
                  <button data-dismiss-claim="${items.length - 1 - i}" class="px-3 py-1.5 text-xs font-semibold rounded-lg border" style="border-color:oklch(var(--border));color:oklch(var(--muted-foreground));cursor:pointer;background:#fff">Dismiss</button>
                </div>
              </div>
            </div>
          `
    ).join("")}
        </div>
      </div>
    `;
    for (const btn of content.querySelectorAll(
      "[data-approve-claim]"
    )) {
      btn.addEventListener("click", () => {
        const idx = Number.parseInt(btn.dataset.approveClaim || "0");
        const all = JSON.parse(localStorage.getItem("dhoondho_claims") || "[]");
        all.splice(idx, 1);
        localStorage.setItem("dhoondho_claims", JSON.stringify(all));
        loadClaims();
        showToast("Claim approved! ✓", "success");
      });
    }
    for (const btn of content.querySelectorAll(
      "[data-dismiss-claim]"
    )) {
      btn.addEventListener("click", () => {
        const idx = Number.parseInt(btn.dataset.dismissClaim || "0");
        const all = JSON.parse(localStorage.getItem("dhoondho_claims") || "[]");
        all.splice(idx, 1);
        localStorage.setItem("dhoondho_claims", JSON.stringify(all));
        loadClaims();
      });
    }
  } catch {
    content.innerHTML = `<div class="bg-white rounded-2xl border p-10 text-center" style="border-color:oklch(var(--border))"><p style="color:oklch(var(--muted-foreground))">Error loading claims.</p></div>`;
  }
}
async function loadPendingListings() {
  var _a3, _b2, _c, _d;
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  let listings = [];
  try {
    const backend2 = await getBackend();
    const raw = await backend2.getPendingListings();
    listings = raw.map((l) => ({
      id: l.id,
      name: l.name,
      categoryId: l.categoryId,
      status: String(l.status),
      city: l.city,
      state: l.state,
      address: l.address,
      phone: l.phone,
      website: l.website,
      description: l.description,
      photoIds: l.photoIds,
      createdTime: l.createdTime,
      location: l.location
    }));
  } catch {
  }
  const listingRows = listings.length === 0 ? `<div data-ocid="admin.empty_state" class="p-12 text-center">
          <div class="text-4xl mb-3">✅</div>
          <p class="font-semibold" style="color:oklch(var(--foreground))">No pending listings</p>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">All caught up! Use the button above to add a new listing directly.</p>
        </div>` : `<div class="divide-y">
          ${listings.map(
    (l, i) => `
            <div data-ocid="admin.item.${i + 1}" class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4" style="border-bottom:1px solid oklch(var(--border))">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold" style="color:oklch(var(--foreground))">${escapeHtml$6(l.name)}</h3>
                <p class="text-sm mt-0.5" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(getCategoryName$2(l.categoryId))} &bull; ${escapeHtml$6(l.city)}, ${escapeHtml$6(l.state)}</p>
                <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(l.address)}</p>
                <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(l.description).substring(0, 120)}...</p>
              </div>
              <div class="flex flex-wrap gap-2 flex-shrink-0">
                <button data-action="approve" data-id="${l.id}" data-ocid="admin.confirm_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(0.55 0.15 145)">✓ Approve</button>
                <button data-action="verify" data-id="${l.id}" data-ocid="admin.toggle" class="px-4 py-2 text-xs font-bold rounded-lg border" style="border-color:#1565c0;color:#1565c0;background:${isVerifiedListing$2(String(l.id)) ? "#e3f2fd" : "#fff"}">${isVerifiedListing$2(String(l.id)) ? "✓ Verified" : "Mark Verified"}</button>
                <button data-action="reject" data-id="${l.id}" data-ocid="admin.delete_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--destructive))">✕ Reject</button>
              </div>
            </div>
          `
  ).join("")}
        </div>`;
  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b flex flex-wrap items-center justify-between gap-3" style="border-color:oklch(var(--border))">
        <h2 class="font-bold" style="color:oklch(var(--foreground))">Pending Listings (${listings.length})</h2>
        <div class="flex flex-wrap gap-2">
          ${listings.length > 0 ? `<button id="approve-all-btn" data-ocid="admin.approve_all_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(0.55 0.15 145)">✓ Approve All</button>` : ""}
          <button id="add-listing-btn" data-ocid="admin.primary_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--primary))">+ Add Business Listing</button>
        </div>
      </div>
      ${renderAddListingForm()}
      <div id="pending-listings-rows">${listingRows}</div>
    </div>
  `;
  (_a3 = document.getElementById("approve-all-btn")) == null ? void 0 : _a3.addEventListener("click", async () => {
    const btn = document.getElementById(
      "approve-all-btn"
    );
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Approving...";
    }
    try {
      const be = await getAuthenticatedBackend();
      const pending = await be.getPendingListings();
      const { ListingStatus: ListingStatus2 } = await __vitePreload(async () => {
        const { ListingStatus: ListingStatus3 } = await Promise.resolve().then(() => backend);
        return { ListingStatus: ListingStatus3 };
      }, true ? void 0 : void 0);
      for (const pl of pending) {
        try {
          await be.changeListingStatus(pl.id, ListingStatus2.approved);
        } catch {
        }
      }
      showToast(`${pending.length} listing(s) approved!`, "success");
      loadPendingListings();
    } catch (err) {
      showToast(
        `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        "error"
      );
      if (btn) {
        btn.disabled = false;
        btn.textContent = "✓ Approve All";
      }
    }
  });
  (_b2 = document.getElementById("add-listing-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    var _a4, _b3;
    (_a4 = document.getElementById("add-listing-form")) == null ? void 0 : _a4.classList.remove("hidden");
    (_b3 = document.getElementById("add-listing-btn")) == null ? void 0 : _b3.setAttribute("disabled", "true");
  });
  (_c = document.getElementById("cancel-listing-btn")) == null ? void 0 : _c.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-listing-form")) == null ? void 0 : _a4.classList.add("hidden");
    const btn = document.getElementById(
      "add-listing-btn"
    );
    if (btn) btn.removeAttribute("disabled");
  });
  (_d = document.getElementById("listing-form")) == null ? void 0 : _d.addEventListener("submit", async (e) => {
    var _a4, _b3, _c2, _d2, _e, _f, _g, _h;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const submitBtn = form.querySelector("[type='submit']");
    const errorEl = document.getElementById("listing-form-error");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Adding...";
    }
    if (errorEl) errorEl.classList.add("hidden");
    const input = {
      name: (_a4 = data.get("name")) == null ? void 0 : _a4.trim(),
      categoryId: BigInt(data.get("categoryId") || "1"),
      phone: (_b3 = data.get("phone")) == null ? void 0 : _b3.trim(),
      city: (_c2 = data.get("city")) == null ? void 0 : _c2.trim(),
      state: (_d2 = data.get("state")) == null ? void 0 : _d2.trim(),
      address: (_e = data.get("address")) == null ? void 0 : _e.trim(),
      website: ((_f = data.get("website")) == null ? void 0 : _f.trim()) || "",
      description: (_g = data.get("description")) == null ? void 0 : _g.trim(),
      photoIds: [],
      location: {
        lat: Number.parseFloat(data.get("lat") || "0") || 0,
        lng: Number.parseFloat(data.get("lng") || "0") || 0
      }
    };
    try {
      const backend$1 = await getAuthenticatedBackend();
      await backend$1.submitListing(input);
      try {
        const pending = await backend$1.getPendingListings();
        const { ListingStatus: ListingStatus2 } = await __vitePreload(async () => {
          const { ListingStatus: ListingStatus3 } = await Promise.resolve().then(() => backend);
          return { ListingStatus: ListingStatus3 };
        }, true ? void 0 : void 0);
        for (const pl of pending) {
          try {
            await backend$1.changeListingStatus(pl.id, ListingStatus2.approved);
          } catch {
          }
        }
      } catch {
      }
      form.reset();
      (_h = document.getElementById("add-listing-form")) == null ? void 0 : _h.classList.add("hidden");
      const addBtn = document.getElementById(
        "add-listing-btn"
      );
      if (addBtn) addBtn.removeAttribute("disabled");
      showToast("Business listing added and approved!", "success");
      loadPendingListings();
    } catch (err) {
      logApiFailure("submitListing[admin]", err);
      if (isCanisterDownError(err)) {
        queueListing(
          Object.fromEntries(new FormData(form))
        );
        startRetryLoop(async (d2) => {
          const be = await getAuthenticatedBackend();
          await be.submitListing({
            name: d2.name,
            categoryId: BigInt(d2.categoryId || "1"),
            phone: d2.phone,
            city: d2.city,
            state: d2.state,
            address: d2.address,
            website: d2.website || "",
            description: d2.description,
            photoIds: [],
            location: { lat: Number(d2.lat) || 0, lng: Number(d2.lng) || 0 }
          });
        });
        showToast(
          "⏳ Your listing is saved and will be submitted shortly.",
          "info"
        );
        if (errorEl) errorEl.classList.add("hidden");
      } else {
        const msg = friendlyError(err);
        if (errorEl) {
          errorEl.textContent = `Failed: ${msg}`;
          errorEl.classList.remove("hidden");
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Add & Approve Listing";
        }
        showToast(`Failed: ${msg}`, "error");
      }
    }
  });
  for (const btn of content.querySelectorAll(
    "[data-action]"
  )) {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      const id = BigInt(btn.dataset.id || "0");
      btn.disabled = true;
      btn.textContent = action === "approve" ? "Approving..." : "Rejecting...";
      try {
        const backend$1 = await getBackend();
        const { ListingStatus: ListingStatus2 } = await __vitePreload(async () => {
          const { ListingStatus: ListingStatus3 } = await Promise.resolve().then(() => backend);
          return { ListingStatus: ListingStatus3 };
        }, true ? void 0 : void 0);
        await backend$1.changeListingStatus(
          id,
          action === "approve" ? ListingStatus2.approved : ListingStatus2.rejected
        );
        const row = btn.closest("[data-ocid^='admin.item']");
        row == null ? void 0 : row.remove();
        showToast(
          action === "approve" ? "Listing approved!" : "Listing rejected.",
          action === "approve" ? "success" : "info"
        );
      } catch (err) {
        showToast(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
          "error"
        );
        btn.disabled = false;
        btn.textContent = action === "approve" ? "✓ Approve" : "✕ Reject";
      }
    });
  }
}
async function loadCategories() {
  var _a3, _b2, _c;
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  let categories = SAMPLE_CATEGORIES;
  try {
    const backend2 = await getBackend();
    const raw = await backend2.getCategories();
    if (raw.length > 0) {
      categories = raw.map((c2) => ({
        id: c2.id,
        icon: c2.icon,
        name: c2.name,
        description: c2.description
      }));
    }
  } catch {
  }
  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b flex flex-wrap items-center justify-between gap-3" style="border-color:oklch(var(--border))">
        <h2 class="font-bold" style="color:oklch(var(--foreground))">Categories (${categories.length})</h2>
        <button id="add-cat-btn" data-ocid="admin.primary_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--primary))">+ Add Category</button>
      </div>
      <div id="add-cat-form" class="hidden p-5 border-b" style="border-color:oklch(var(--border))">
        <form id="category-form" class="flex gap-3 flex-wrap">
          <input data-ocid="admin.input" name="icon" type="text" placeholder="🏢" maxlength="4" class="w-16 px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" required />
          <input data-ocid="admin.input" name="name" type="text" placeholder="Category Name" class="flex-1 min-w-32 px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" required />
          <input data-ocid="admin.input" name="description" type="text" placeholder="Description" class="flex-1 min-w-48 px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" required />
          <button type="submit" data-ocid="admin.submit_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Add</button>
          <button type="button" id="cancel-cat-btn" data-ocid="admin.cancel_button" class="px-4 py-2 text-xs font-semibold rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
        </form>
      </div>
      <div class="overflow-x-auto w-full">
        <table data-ocid="admin.table" class="w-full min-w-[500px]">
          <thead>
            <tr class="border-b" style="border-color:oklch(var(--border));background:oklch(var(--secondary))">
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Icon</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Name</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Description</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${categories.map(
    (cat, i) => `
              <tr data-ocid="admin.item.${i + 1}" class="border-b" style="border-color:oklch(var(--border))">
                <td class="py-3 px-4 text-xl">${cat.icon}</td>
                <td class="py-3 px-4 text-sm font-medium" style="color:oklch(var(--foreground))">${escapeHtml$6(cat.name)}</td>
                <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(cat.description)}</td>
                <td class="py-3 px-4">
                  <button data-delete-cat="${cat.id}" data-ocid="admin.delete_button" class="text-xs font-semibold" style="color:oklch(var(--destructive))">Delete</button>
                </td>
              </tr>
            `
  ).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
  (_a3 = document.getElementById("add-cat-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-cat-form")) == null ? void 0 : _a4.classList.remove("hidden");
  });
  (_b2 = document.getElementById("cancel-cat-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-cat-form")) == null ? void 0 : _a4.classList.add("hidden");
  });
  (_c = document.getElementById("category-form")) == null ? void 0 : _c.addEventListener("submit", async (e) => {
    var _a4, _b3;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const newId = BigInt(Date.now());
    try {
      const backend2 = await getBackend();
      await backend2.addCategory({
        id: newId,
        icon: data.get("icon") || "🏢",
        name: (_a4 = data.get("name")) == null ? void 0 : _a4.trim(),
        description: (_b3 = data.get("description")) == null ? void 0 : _b3.trim()
      });
      form.reset();
      showToast("Category added!", "success");
      loadCategories();
    } catch (err) {
      showToast(
        `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        "error"
      );
    }
  });
  for (const btn of content.querySelectorAll(
    "[data-delete-cat]"
  )) {
    btn.addEventListener("click", async () => {
      if (!confirm("Delete this category?")) return;
      const id = BigInt(btn.dataset.deleteCat || "0");
      try {
        const backend2 = await getBackend();
        await backend2.deleteCategory(id);
        showToast("Category deleted.", "info");
        loadCategories();
      } catch (err) {
        showToast(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
          "error"
        );
      }
    });
  }
}
function renderAddVendorForm() {
  return `
    <div id="add-vendor-form" class="hidden p-6 border-b" style="border-color:oklch(var(--border));background:#fafafa">
      <h3 class="font-bold text-sm mb-4" style="color:oklch(var(--foreground))">Add New Vendor</h3>
      <form id="vendor-add-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Full Name *</label>
          <input data-ocid="admin.input" name="name" type="text" required placeholder="e.g. Rajesh Kumar" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Business Name *</label>
          <input data-ocid="admin.input" name="businessName" type="text" required placeholder="e.g. Raj Electricals" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Phone *</label>
          <input data-ocid="admin.input" name="phone" type="tel" required placeholder="+91 98000 00000" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">
            Principal ID
            <span class="font-normal ml-1" style="color:oklch(var(--muted-foreground))">(Internet Identity, optional)</span>
          </label>
          <input data-ocid="admin.input" name="principalId" type="text" placeholder="e.g. aaaaa-aa (leave blank to use your ID)" class="w-full px-3 py-2 rounded-lg border text-sm font-mono" style="border-color:oklch(var(--border))" />
        </div>
        <div id="vendor-form-error" class="md:col-span-2 hidden px-3 py-2 rounded-lg text-xs" style="background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27)"></div>
        <div class="md:col-span-2 flex flex-wrap gap-3">
          <button type="submit" data-ocid="admin.submit_button" class="px-5 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Add Vendor</button>
          <button type="button" id="cancel-vendor-btn" data-ocid="admin.cancel_button" class="px-5 py-2 text-sm font-semibold rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
        </div>
      </form>
    </div>
  `;
}
async function loadVendors() {
  var _a3, _b2, _c;
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  let vendors = [];
  try {
    const backend2 = await getBackend();
    vendors = await backend2.getAllVendors();
  } catch {
  }
  const vendorRows = vendors.length === 0 ? `<div data-ocid="admin.empty_state" class="p-12 text-center">
          <div class="text-4xl mb-3">👤</div>
          <p class="font-semibold" style="color:oklch(var(--foreground))">No vendors registered yet</p>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Use the button above to add a vendor directly.</p>
        </div>` : `<div class="overflow-x-auto w-full">
          <table data-ocid="admin.table" class="w-full min-w-[600px]">
            <thead>
              <tr class="border-b" style="border-color:oklch(var(--border));background:oklch(var(--secondary))">
                <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Name</th>
                <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Business</th>
                <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Phone</th>
                <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Principal</th>
                <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${vendors.map(
    (v2, i) => `
                <tr data-ocid="admin.item.${i + 1}" class="border-b" style="border-color:oklch(var(--border))">
                  <td class="py-3 px-4 text-sm font-medium" style="color:oklch(var(--foreground))">${escapeHtml$6(v2.name)}</td>
                  <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(v2.businessName)}</td>
                  <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(v2.phone)}</td>
                  <td class="py-3 px-4 text-xs font-mono truncate max-w-xs" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(v2.principal.toString())}</td>
                  <td class="py-3 px-4">
                    <button data-delete-vendor="${escapeHtml$6(v2.principal.toString())}" data-ocid="admin.delete_button" class="text-xs font-semibold" style="color:oklch(var(--destructive))">Remove</button>
                  </td>
                </tr>
              `
  ).join("")}
            </tbody>
          </table>
        </div>`;
  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b flex flex-wrap items-center justify-between gap-3" style="border-color:oklch(var(--border))">
        <h2 class="font-bold" style="color:oklch(var(--foreground))">All Vendors (${vendors.length})</h2>
        <button id="add-vendor-btn" data-ocid="admin.primary_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--primary))">+ Add Vendor</button>
      </div>
      ${renderAddVendorForm()}
      <div id="vendor-list-rows">${vendorRows}</div>
    </div>
  `;
  (_a3 = document.getElementById("add-vendor-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-vendor-form")) == null ? void 0 : _a4.classList.remove("hidden");
    const btn = document.getElementById(
      "add-vendor-btn"
    );
    if (btn) btn.setAttribute("disabled", "true");
  });
  (_b2 = document.getElementById("cancel-vendor-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-vendor-form")) == null ? void 0 : _a4.classList.add("hidden");
    const btn = document.getElementById(
      "add-vendor-btn"
    );
    if (btn) btn.removeAttribute("disabled");
  });
  (_c = document.getElementById("vendor-add-form")) == null ? void 0 : _c.addEventListener("submit", async (e) => {
    var _a4, _b3, _c2, _d;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const submitBtn = form.querySelector("[type='submit']");
    const errorEl = document.getElementById("vendor-form-error");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Adding...";
    }
    if (errorEl) errorEl.classList.add("hidden");
    try {
      const { Principal: Principal3 } = await __vitePreload(async () => {
        const { Principal: Principal4 } = await Promise.resolve().then(() => index);
        return { Principal: Principal4 };
      }, true ? void 0 : void 0);
      const principalInput = (data.get("principalId") || "").trim();
      let principal;
      if (principalInput) {
        principal = Principal3.fromText(principalInput);
      } else {
        principal = await getPrincipalObject();
      }
      const backend2 = await getAuthenticatedBackend();
      await backend2.addVendor({
        principal,
        name: (_a4 = data.get("name")) == null ? void 0 : _a4.trim(),
        businessName: (_b3 = data.get("businessName")) == null ? void 0 : _b3.trim(),
        phone: (_c2 = data.get("phone")) == null ? void 0 : _c2.trim()
      });
      form.reset();
      (_d = document.getElementById("add-vendor-form")) == null ? void 0 : _d.classList.add("hidden");
      const addBtn = document.getElementById(
        "add-vendor-btn"
      );
      if (addBtn) addBtn.removeAttribute("disabled");
      showToast("Vendor added successfully!", "success");
      loadVendors();
    } catch (err) {
      logApiFailure("addVendor[admin]", err);
      const msg = isCanisterDownError(err) ? "Service temporarily unavailable. Please try again." : friendlyError(err);
      if (errorEl) {
        errorEl.textContent = `Failed: ${msg}`;
        errorEl.classList.remove("hidden");
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Add Vendor";
      }
      showToast(`Failed: ${msg}`, "error");
    }
  });
  for (const btn of content.querySelectorAll(
    "[data-delete-vendor]"
  )) {
    btn.addEventListener("click", async () => {
      if (!confirm("Remove this vendor?")) return;
      showToast("Vendor removal is not yet supported in the backend.", "info");
    });
  }
}
function loadBlogAdmin() {
  var _a3, _b2, _c;
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  const articles = getAdminBlogArticles();
  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b flex flex-wrap items-center justify-between gap-3" style="border-color:oklch(var(--border))">
        <div>
          <h2 class="font-bold" style="color:oklch(var(--foreground))">Blog Articles</h2>
          <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Admin-published articles appear at the top of the blog</p>
        </div>
        <button id="add-article-btn" data-ocid="admin.primary_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--primary))">+ New Article</button>
      </div>

      <div id="add-article-form" class="hidden p-6 border-b" style="border-color:oklch(var(--border));background:#fafafa">
        <h3 class="font-bold text-sm mb-4" style="color:oklch(var(--foreground))">New Blog Article</h3>
        <form id="blog-article-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Title *</label>
            <input data-ocid="admin.input" name="title" type="text" required placeholder="Article title" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Category *</label>
            <input data-ocid="admin.input" name="category" type="text" required placeholder="e.g. Home Services, Healthcare" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Author *</label>
            <input data-ocid="admin.input" name="author" type="text" required placeholder="Author name" value="Dhoondho Team" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Read Time</label>
            <input data-ocid="admin.input" name="readTime" type="text" placeholder="5 min read" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Emoji Icon</label>
            <input data-ocid="admin.input" name="emoji" type="text" placeholder="📝" maxlength="4" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Summary *</label>
            <textarea data-ocid="admin.input" name="summary" required rows="3" placeholder="Brief summary shown on blog listing..." class="w-full px-3 py-2 rounded-lg border text-sm resize-none" style="border-color:oklch(var(--border))"></textarea>
          </div>
          <div class="md:col-span-2 flex flex-wrap gap-3">
            <button type="submit" data-ocid="admin.submit_button" class="px-5 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Publish Article</button>
            <button type="button" id="cancel-article-btn" data-ocid="admin.cancel_button" class="px-5 py-2 text-sm font-semibold rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
          </div>
        </form>
      </div>

      <div id="blog-admin-list">
        ${renderBlogAdminList(articles)}
      </div>
    </div>
  `;
  (_a3 = document.getElementById("add-article-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-article-form")) == null ? void 0 : _a4.classList.remove("hidden");
  });
  (_b2 = document.getElementById("cancel-article-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("add-article-form")) == null ? void 0 : _a4.classList.add("hidden");
  });
  (_c = document.getElementById("blog-article-form")) == null ? void 0 : _c.addEventListener("submit", (e) => {
    var _a4, _b3, _c2, _d, _e, _f, _g;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const now = /* @__PURE__ */ new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const newArticle = {
      id: String(Date.now()),
      title: (_a4 = data.get("title")) == null ? void 0 : _a4.trim(),
      category: (_b3 = data.get("category")) == null ? void 0 : _b3.trim(),
      author: ((_c2 = data.get("author")) == null ? void 0 : _c2.trim()) || "Dhoondho Team",
      readTime: ((_d = data.get("readTime")) == null ? void 0 : _d.trim()) || "3 min read",
      emoji: ((_e = data.get("emoji")) == null ? void 0 : _e.trim()) || "📝",
      summary: (_f = data.get("summary")) == null ? void 0 : _f.trim(),
      date: dateStr
    };
    const current = getAdminBlogArticles();
    saveBlogArticles([newArticle, ...current]);
    form.reset();
    (_g = document.getElementById("add-article-form")) == null ? void 0 : _g.classList.add("hidden");
    const list = document.getElementById("blog-admin-list");
    if (list) list.innerHTML = renderBlogAdminList(getAdminBlogArticles());
    attachDeleteArticleEvents();
    showToast("Article published!", "success");
  });
  attachDeleteArticleEvents();
}
function renderBlogAdminList(articles) {
  if (articles.length === 0) {
    return `
      <div data-ocid="admin.empty_state" class="p-12 text-center">
        <div class="text-4xl mb-3">✍️</div>
        <p class="font-semibold" style="color:oklch(var(--foreground))">No admin articles yet</p>
        <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Add your first article using the button above.</p>
      </div>
    `;
  }
  return `
    <div class="divide-y">
      ${articles.map(
    (a2, i) => `
        <div data-ocid="admin.item.${i + 1}" class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4" style="border-bottom:1px solid oklch(var(--border))">
          <div class="text-3xl flex-shrink-0">${a2.emoji}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#e8f5e9;color:#1a7a3c">${escapeHtml$6(a2.category)}</span>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(a2.readTime)}</span>
            </div>
            <h3 class="font-semibold text-sm" style="color:oklch(var(--foreground))">${escapeHtml$6(a2.title)}</h3>
            <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(a2.summary).substring(0, 100)}...</p>
            <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml$6(a2.date)} &bull; ${escapeHtml$6(a2.author)}</p>
          </div>
          <button data-delete-article="${escapeHtml$6(a2.id)}" data-ocid="admin.delete_button" class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg" style="color:oklch(var(--destructive));border:1px solid oklch(var(--destructive))">Delete</button>
        </div>
      `
  ).join("")}
    </div>
  `;
}
function attachDeleteArticleEvents() {
  const list = document.getElementById("blog-admin-list");
  if (!list) return;
  for (const btn of list.querySelectorAll(
    "[data-delete-article]"
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.deleteArticle;
      if (!confirm("Delete this article?")) return;
      const current = getAdminBlogArticles();
      const updated = current.filter((a2) => a2.id !== id);
      saveBlogArticles(updated);
      list.innerHTML = renderBlogAdminList(getAdminBlogArticles());
      attachDeleteArticleEvents();
    });
  }
}
async function loadAnalytics() {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  let totalListings = 0;
  try {
    const be = await getBackend();
    const all = await be.searchListingsByCity("");
    totalListings = all.length;
  } catch {
  }
  const stats = getStats(totalListings);
  const cityBars = stats.topCities.length > 0 ? stats.topCities.map((city, i) => {
    const maxW = 100 - i * 15;
    return `<div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span style="color:#202124;font-weight:500">${city}</span></div>
          <div style="background:#f0f0f0;border-radius:4px;height:8px"><div style="background:#1a7a3c;height:8px;border-radius:4px;width:${maxW}%"></div></div>
        </div>`;
  }).join("") : `<p style="color:#9aa0a6;font-size:13px">No data yet. Searches will appear here.</p>`;
  const activityHtml = stats.recentActivity.length > 0 ? stats.recentActivity.map(
    (a2) => `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f5f5f5;color:#5f6368">${a2}</div>`
  ).join("") : `<p style="color:#9aa0a6;font-size:13px">No recent activity.</p>`;
  const topQueriesHtml = stats.topCategories.length > 0 ? stats.topCategories.map(
    (q2) => `<span style="display:inline-block;padding:4px 12px;background:#e8f5e9;color:#1a7a3c;border-radius:99px;font-size:12px;font-weight:600;margin:3px">${q2}</span>`
  ).join("") : `<p style="color:#9aa0a6;font-size:13px">No searches yet.</p>`;
  content.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:24px">
      <div data-ocid="admin.card" style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px">
        <div style="font-size:28px;font-weight:800;color:#1a7a3c">${stats.totalListings}</div>
        <div style="font-size:12px;color:#5f6368;margin-top:4px">Total Listings</div>
      </div>
      <div data-ocid="admin.card" style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px">
        <div style="font-size:28px;font-weight:800;color:#1a73e8">${stats.totalSearches}</div>
        <div style="font-size:12px;color:#5f6368;margin-top:4px">Total Searches</div>
      </div>
      <div data-ocid="admin.card" style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px">
        <div style="font-size:28px;font-weight:800;color:#f57f17">${stats.topCities.length}</div>
        <div style="font-size:12px;color:#5f6368;margin-top:4px">Active Cities</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:16px">
      <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px">
        <h3 style="font-size:14px;font-weight:700;color:#202124;margin:0 0 16px">Top Cities</h3>
        ${cityBars}
      </div>
      <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px">
        <h3 style="font-size:14px;font-weight:700;color:#202124;margin:0 0 12px">Top Searches</h3>
        ${topQueriesHtml}
      </div>
    </div>
    <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px">
      <h3 style="font-size:14px;font-weight:700;color:#202124;margin:0 0 12px">Recent Activity</h3>
      ${activityHtml}
    </div>
  `;
}
const ACTION_POINTS = {
  suggest_edit: 5,
  claim_listing: 10,
  add_review: 3,
  qa_answer: 2
};
function getBadgeLevel(points) {
  if (points >= 500) return "Platinum";
  if (points >= 200) return "Gold";
  if (points >= 50) return "Silver";
  return "Bronze";
}
function getBadgeColor(level) {
  const colors = {
    Bronze: "#CD7F32",
    Silver: "#A8A9AD",
    Gold: "#FFD700",
    Platinum: "#9C27B0"
  };
  return colors[level];
}
function generateUserId() {
  const id = `user_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem("dhoondho_user_id", id);
  return id;
}
function updateLeaderboard(id, name, points, actions) {
  const raw = localStorage.getItem("dhoondho_contributors") || "[]";
  let entries = JSON.parse(raw);
  const idx = entries.findIndex((e) => e.id === id);
  if (idx >= 0) {
    entries[idx] = { id, name, points, actions };
  } else {
    entries.push({ id, name, points, actions });
  }
  localStorage.setItem("dhoondho_contributors", JSON.stringify(entries));
}
function awardPoints(action) {
  const pts = ACTION_POINTS[action];
  const currentPts = Number(localStorage.getItem("dhoondho_my_points") || "0");
  const currentActions = Number(
    localStorage.getItem("dhoondho_my_actions") || "0"
  );
  localStorage.setItem("dhoondho_my_points", String(currentPts + pts));
  localStorage.setItem("dhoondho_my_actions", String(currentActions + 1));
  const userId = localStorage.getItem("dhoondho_user_id") || generateUserId();
  const userName = localStorage.getItem("dhoondho_user_name") || "You";
  updateLeaderboard(userId, userName, currentPts + pts, currentActions + 1);
}
function getLeaderboard() {
  const raw = localStorage.getItem("dhoondho_contributors") || "[]";
  let entries = JSON.parse(raw);
  if (entries.length < 3) {
    const demo = [
      { id: "demo1", name: "Priya Sharma", points: 680, actions: 72 },
      { id: "demo2", name: "Rahul Gupta", points: 430, actions: 51 },
      { id: "demo3", name: "Anita Verma", points: 290, actions: 38 },
      { id: "demo4", name: "Suresh Kumar", points: 165, actions: 24 },
      { id: "demo5", name: "Meena Patel", points: 95, actions: 17 },
      { id: "demo6", name: "Arjun Singh", points: 40, actions: 9 }
    ];
    const existingIds = new Set(entries.map((e) => e.id));
    for (const d2 of demo) {
      if (!existingIds.has(d2.id)) entries.push(d2);
    }
    localStorage.setItem("dhoondho_contributors", JSON.stringify(entries));
  }
  return entries.sort((a2, b2) => b2.points - a2.points);
}
function getMyPoints() {
  return Number(localStorage.getItem("dhoondho_my_points") || "0");
}
function getBadgeHTML(points, inline = false) {
  const level = getBadgeLevel(points);
  const color = getBadgeColor(level);
  const size = inline ? "font-size:11px;padding:2px 8px" : "font-size:12px;padding:4px 12px";
  return `<span style="${size};border-radius:99px;font-weight:700;background:${color}22;color:${color};border:1px solid ${color}44">${level}</span>`;
}
function escapeHtml$5(s2) {
  return s2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function getMedalEmoji(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}
function renderContributorsPage() {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  const leaderboard = getLeaderboard();
  const myPoints = getMyPoints();
  const myBadge = getBadgeHTML(myPoints);
  const rows = leaderboard.map((entry, i) => {
    const level = getBadgeLevel(entry.points);
    const color = getBadgeColor(level);
    const badge = getBadgeHTML(entry.points, true);
    return `
        <div data-ocid="contributors.item.${i + 1}" style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid #f0f0f0">
          <div style="width:36px;text-align:center;font-size:${i < 3 ? "20px" : "14px"};font-weight:700;color:#5f6368;flex-shrink:0">${getMedalEmoji(i + 1)}</div>
          <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;flex-shrink:0;background:${color}22;color:${color};border:2px solid ${color}44">${escapeHtml$5(entry.name.charAt(0).toUpperCase())}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml$5(entry.name)}</div>
            <div style="font-size:11px;color:#9aa0a6;margin-top:2px">${entry.actions} contributions</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
            ${badge}
            <span style="font-size:13px;font-weight:700;color:#1a7a3c">${entry.points} pts</span>
          </div>
        </div>
      `;
  }).join("");
  main.innerHTML = `
    <style>
      @media (max-width: 480px) {
        .contrib-stats-banner { flex-direction: column !important; align-items: flex-start !important; gap: 12px; }
        .contrib-points-grid { grid-template-columns: 1fr !important; }
        .contrib-container { padding: 20px 14px !important; }
      }
    </style>
    <div style="min-height:100vh;background:#f8f9fa">
      <div class="contrib-container" style="max-width:720px;margin:0 auto;padding:32px 20px">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:24px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px">
          <span style="font-size:32px">🏆</span>
          <div>
            <h1 style="font-size:26px;font-weight:700;color:#202124;margin:0">Top Contributors</h1>
            <p style="font-size:13px;color:#5f6368;margin:4px 0 0">Earn points by helping improve Dhoondho.App</p>
          </div>
        </div>

        <div class="contrib-stats-banner" style="background:linear-gradient(135deg,#1a7a3c,#34A853);border-radius:16px;padding:20px 24px;margin:24px 0;color:#fff;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:12px;opacity:0.85;margin-bottom:4px">Your Points</div>
            <div style="font-size:32px;font-weight:800">${myPoints}</div>
            <div style="font-size:11px;opacity:0.8;margin-top:4px">Keep contributing to level up!</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;opacity:0.85;margin-bottom:6px">Your Badge</div>
            ${myBadge}
          </div>
        </div>

        <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px;margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:#202124;margin:0 0 14px">How to Earn Points</h3>
          <div class="contrib-points-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#f8fffe;border:1px solid #e0f2f1">
              <span style="font-size:20px">✏️</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Suggest Edit</div><div style="font-size:11px;color:#1a7a3c;font-weight:700">+5 pts</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#fff8e1;border:1px solid #ffe082">
              <span style="font-size:20px">🏢</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Claim Listing</div><div style="font-size:11px;color:#f57f17;font-weight:700">+10 pts</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#fce4ec;border:1px solid #f48fb1">
              <span style="font-size:20px">⭐</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Add Review</div><div style="font-size:11px;color:#c62828;font-weight:700">+3 pts</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#ede7f6;border:1px solid #b39ddb">
              <span style="font-size:20px">💬</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Q&amp;A Answer</div><div style="font-size:11px;color:#4527a0;font-weight:700">+2 pts</div></div>
            </div>
          </div>
        </div>

        <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;overflow:hidden">
          <div style="padding:18px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between">
            <h2 style="font-size:16px;font-weight:700;color:#202124;margin:0">Leaderboard</h2>
            <span style="font-size:12px;color:#9aa0a6">${leaderboard.length} contributors</span>
          </div>
          ${rows.length > 0 ? rows : `<div style="padding:32px;text-align:center;color:#9aa0a6">No contributors yet. Be the first!</div>`}
        </div>
      </div>
    ${renderPageFooter()}
    </div>
  `;
  initFooterReactivity();
}
function renderCookiesPage() {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <style>
      @media (max-width: 600px) { .legal-container { padding: 24px 16px !important; } }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="legal-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>
        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Cookie Policy</h1>
        <p style="font-size:13px;color:#9aa0a6;margin-bottom:36px">Last updated: March 2026</p>

        <p style="font-size:15px;line-height:1.7;color:#3c4043;margin-bottom:32px">This Cookie Policy explains how Dhoondho.App uses cookies and similar technologies when you visit our platform.</p>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px">What Are Cookies?</h2>
        <p style="font-size:15px;line-height:1.7;color:#3c4043;margin-bottom:28px">Cookies are small text files stored on your device by your browser when you visit a website. They help websites remember your preferences and improve your experience.</p>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:16px">Types of Cookies We Use</h2>
        <div style="border:1px solid #e8eaed;border-radius:12px;overflow:hidden;margin-bottom:28px">
          ${[
    {
      type: "Essential Cookies",
      purpose: "Required for the platform to function. Includes authentication session data.",
      required: true
    },
    {
      type: "Preference Cookies",
      purpose: "Remember your language preferences and search settings.",
      required: false
    },
    {
      type: "Analytics Cookies",
      purpose: "Help us understand how users interact with Dhoondho to improve the experience. All data is anonymized.",
      required: false
    }
  ].map(
    (row, i) => `
            <div style="padding:16px 20px;${i > 0 ? "border-top:1px solid #e8eaed" : ""}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
                <div>
                  <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:4px">${row.type}</div>
                  <div style="font-size:13px;color:#5f6368;line-height:1.5">${row.purpose}</div>
                </div>
                <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:12px;white-space:nowrap;${row.required ? "background:#e8f5e9;color:#1a7a3c" : "background:#f8f9fa;color:#5f6368"}">${row.required ? "Required" : "Optional"}</span>
              </div>
            </div>
          `
  ).join("")}
        </div>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px">Managing Cookies</h2>
        <p style="font-size:15px;line-height:1.7;color:#3c4043;margin-bottom:16px">You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, disabling essential cookies may affect platform functionality.</p>

        <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:12px;margin-top:28px">Contact</h2>
        <p style="font-size:15px;line-height:1.7;color:#3c4043">For any cookie-related questions, please visit our <a href="#/support" style="color:#1a73e8;text-decoration:none">Support page</a>.</p>
      </div>
      ${renderPageFooter()}
    </div>
  `;
}
function escapeHtml$4(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function getFavorites() {
  try {
    const raw = localStorage.getItem("dhoondho_favorites");
    if (!raw) return [];
    const ids = JSON.parse(raw);
    return ids.map((id) => {
      const listing = SAMPLE_LISTINGS.find((l) => String(l.id) === id);
      if (listing) {
        return {
          id,
          name: listing.name,
          category: String(listing.categoryId),
          city: listing.city
        };
      }
      return { id, name: `Business #${id}`, category: "", city: "" };
    });
  } catch {
    return [];
  }
}
function getSearchHistory() {
  try {
    const raw = localStorage.getItem("dhoondho_search_history");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function renderDashboardPage() {
  var _a3, _b2, _c, _d;
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  const favorites = getFavorites();
  const history = getSearchHistory();
  const favoritesHtml = favorites.length === 0 ? `<div data-ocid="dashboard.empty_state" style="text-align:center;padding:32px;color:#9aa0a6">
        <div style="font-size:40px;margin-bottom:12px">💔</div>
        <p style="font-size:14px">No saved listings yet. Tap the ❤️ on any business to save it here.</p>
      </div>` : favorites.map(
    (fav, i) => `
        <div data-ocid="dashboard.item.${i + 1}" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-radius:12px;background:#f8f9fa;margin-bottom:10px;gap:12px">
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:14px;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml$4(fav.name)}</div>
            <div style="font-size:12px;color:#9aa0a6">${escapeHtml$4(fav.city)}</div>
          </div>
          <a href="#/listing/${escapeHtml$4(fav.id)}" data-ocid="dashboard.link" style="padding:6px 14px;border-radius:8px;background:#1a7a3c;color:#fff;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap">View →</a>
        </div>
      `
  ).join("");
  const historyHtml = history.length === 0 ? `<div data-ocid="dashboard.empty_state" style="text-align:center;padding:32px;color:#9aa0a6">
        <div style="font-size:40px;margin-bottom:12px">🔍</div>
        <p style="font-size:14px">No recent searches yet. Start exploring!</p>
      </div>` : history.map(
    (entry, i) => `
        <div data-ocid="dashboard.item.${i + 1}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-radius:12px;background:#f8f9fa;margin-bottom:8px;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
            <span style="font-size:16px">🕐</span>
            <span style="font-size:14px;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml$4(entry.query)}</span>
          </div>
          <a href="#/search?q=${encodeURIComponent(entry.query)}" data-ocid="dashboard.link" style="padding:6px 14px;border-radius:8px;border:1px solid #dadce0;color:#1a73e8;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap">Search again</a>
        </div>
      `
  ).join("");
  main.innerHTML = `
    <style>
      @media (max-width: 480px) {
        .dashboard-container { padding: 20px 14px !important; }
        .dashboard-referral-row { flex-direction: column !important; }
        .dashboard-referral-row input { width: 100% !important; }
        .dashboard-referral-row button { width: 100%; text-align: center; }
        .dashboard-wa-btn { width: 100%; justify-content: center; }
      }
      .dash-tabs { display:flex; border-bottom:1px solid #e8eaed; background:#fff; border-radius:12px 12px 0 0; overflow:hidden; }
      .dash-tab { flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:12px 8px; font-size:13px; font-weight:600; color:#5f6368; cursor:pointer; border-bottom:2px solid transparent; transition:color 0.2s,border-color 0.2s; white-space:nowrap; }
      .dash-tab.active { color:#1a7a3c; border-bottom:2px solid #1a7a3c; }
      .dash-tab:hover:not(.active) { color:#202124; background:#f8f9fa; }
      .dash-panel { display:none; }
      .dash-panel.active { display:block; }
    </style>
    <div style="min-height:100vh;background:#f8f9fa">
      <div class="dashboard-container" style="max-width:720px;margin:0 auto;padding:32px 20px">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:24px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <h1 style="font-size:26px;font-weight:700;color:#202124;margin-bottom:6px">My Dashboard</h1>
        <p style="font-size:14px;color:#5f6368;margin-bottom:24px">Your saved listings and search history</p>

        <!-- Tab Navigation -->
        <div style="background:#fff;border-radius:12px;border:1px solid #e8eaed;margin-bottom:0;overflow:hidden">
          <div class="dash-tabs" id="dash-tabs">
            <button class="dash-tab active" data-tab="saved" data-ocid="dashboard.tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Saved
            </button>
            <button class="dash-tab" data-tab="share" data-ocid="dashboard.tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              Share &amp; Earn
            </button>
            <button class="dash-tab" data-tab="history" data-ocid="dashboard.tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              History
            </button>
          </div>

          <!-- Tab Panels -->
          <!-- Saved Listings -->
          <div id="dash-panel-saved" class="dash-panel active" style="padding:24px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
              <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Saved Listings</h2>
              <span style="margin-left:auto;font-size:13px;font-weight:600;color:#1a7a3c;background:#e8f5e9;padding:3px 10px;border-radius:12px">${favorites.length}</span>
            </div>
            ${favoritesHtml}
            ${favorites.length > 0 ? `<button id="clear-favorites-btn" data-ocid="dashboard.delete_button" style="margin-top:8px;background:none;border:none;color:#d32f2f;font-size:12px;cursor:pointer;padding:4px 0">Clear all saved listings</button>` : ""}
          </div>

          <!-- Share & Earn -->
          <div id="dash-panel-share" class="dash-panel" style="padding:24px;background:linear-gradient(135deg,#e8f5e9,#f1f8e9)">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
              <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Share &amp; Earn</h2>
            </div>
            <div style="margin-bottom:14px">
              <div style="font-size:12px;font-weight:600;color:#5f6368;margin-bottom:6px">Your referral link</div>
              <div class="dashboard-referral-row" style="display:flex;gap:8px;align-items:center">
                <input id="referral-input" readonly value="https://dhoondho.app/?ref=you" style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid #c8e6c9;font-size:12px;color:#202124;background:#fff;outline:none" />
                <button id="copy-referral-btn" data-ocid="dashboard.button" style="padding:8px 14px;background:#1a7a3c;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">Copy</button>
              </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:14px">
              <div style="font-size:12px;color:#5f6368">Referrals:</div>
              <div id="referral-count" style="font-size:18px;font-weight:700;color:#1a7a3c">${localStorage.getItem("dhoondho_referral_count") || "0"}</div>
            </div>
            <button id="whatsapp-share-btn" data-ocid="dashboard.button" class="dashboard-wa-btn" style="display:flex;align-items:center;gap:8px;padding:10px 18px;background:#25D366;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.127 1.531 5.857L0 24l6.335-1.507A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.193-1.372L3 21.5l.897-3.674A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Share on WhatsApp
            </button>
          </div>

          <!-- Search History -->
          <div id="dash-panel-history" class="dash-panel" style="padding:24px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
              <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Recent Searches</h2>
              <span style="margin-left:auto;font-size:13px;font-weight:600;color:#1a73e8;background:#e8f0fe;padding:3px 10px;border-radius:12px">${history.length}</span>
            </div>
            ${historyHtml}
            ${history.length > 0 ? `<button id="clear-history-btn" data-ocid="dashboard.delete_button" style="margin-top:8px;background:none;border:none;color:#d32f2f;font-size:12px;cursor:pointer;padding:4px 0">Clear search history</button>` : ""}
          </div>
        </div>

      </div>
    ${renderPageFooter()}
    </div>
  `;
  for (const tab of Array.from(document.querySelectorAll(".dash-tab"))) {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab || "";
      for (const t2 of Array.from(document.querySelectorAll(".dash-tab")))
        t2.classList.remove("active");
      for (const p2 of Array.from(document.querySelectorAll(".dash-panel")))
        p2.classList.remove("active");
      tab.classList.add("active");
      const panel = document.getElementById(`dash-panel-${tabName}`);
      if (panel) panel.classList.add("active");
    });
  }
  (_a3 = document.getElementById("clear-favorites-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    localStorage.removeItem("dhoondho_favorites");
    renderDashboardPage();
  });
  (_b2 = document.getElementById("clear-history-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    localStorage.removeItem("dhoondho_search_history");
    renderDashboardPage();
  });
  (_c = document.getElementById("copy-referral-btn")) == null ? void 0 : _c.addEventListener("click", () => {
    const input = document.getElementById(
      "referral-input"
    );
    if (input) {
      navigator.clipboard.writeText(input.value).then(() => {
        const btn = document.getElementById("copy-referral-btn");
        if (btn) {
          btn.textContent = "✓ Copied!";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 2e3);
        }
      }).catch(() => {
        input.select();
        const btn = document.getElementById("copy-referral-btn");
        if (btn) btn.textContent = "Select & Copy";
        setTimeout(() => {
          const b2 = document.getElementById("copy-referral-btn");
          if (b2) b2.textContent = "Copy";
        }, 2e3);
      });
    }
  });
  (_d = document.getElementById("whatsapp-share-btn")) == null ? void 0 : _d.addEventListener("click", () => {
    const text = encodeURIComponent(
      "Find local businesses near you with Dhoondho – India's local search engine! https://dhoondho.app/?ref=you"
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  });
}
const CATEGORIES$1 = [
  "plumber",
  "electrician",
  "carpenter",
  "painter",
  "mechanic",
  "doctor",
  "hospital",
  "clinic",
  "pharmacy",
  "dentist",
  "restaurant",
  "hotel",
  "cafe",
  "food",
  "delivery",
  "school",
  "tutor",
  "coaching",
  "gym",
  "yoga",
  "salon",
  "spa",
  "beauty",
  "tailor",
  "laundry",
  "bank",
  "atm",
  "insurance",
  "lawyer",
  "ca",
  "real estate",
  "property",
  "rent",
  "pg",
  "flat",
  "event",
  "photographer",
  "caterer",
  "decorator",
  "packers",
  "movers",
  "logistics",
  "courier",
  "ac repair",
  "washing machine",
  "tv repair",
  "appliance"
];
const INDIAN_CITIES = [
  "delhi",
  "mumbai",
  "bangalore",
  "bengaluru",
  "hyderabad",
  "chennai",
  "kolkata",
  "pune",
  "ahmedabad",
  "jaipur",
  "surat",
  "lucknow",
  "kanpur",
  "nagpur",
  "patna",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "vadodara",
  "gurgaon",
  "gurugram",
  "noida",
  "faridabad"
];
function detectIntent(msg) {
  const lower = msg.toLowerCase();
  const category = CATEGORIES$1.find((c2) => lower.includes(c2)) || null;
  const city = INDIAN_CITIES.find((c2) => lower.includes(c2)) || null;
  return { category, city };
}
function buildResponse(msg) {
  const lower = msg.toLowerCase();
  if (/^(hi|hello|hey|namaste|namaskar)/.test(lower)) {
    return "Namaste! 🙏 I'm Dhoondho Assistant. Ask me to find any local service -- e.g., <i>Find plumber in Delhi</i> or <i>Show restaurants near me</i>.";
  }
  if (lower.includes("help") || lower.includes("what can you do")) {
    return "I can help you find local businesses and services across India. Try asking:<br>• <a href='#/search?q=plumber' style='color:#1a7a3c'>Find a plumber near me</a><br>• <a href='#/search?q=restaurant' style='color:#1a7a3c'>Restaurants in my city</a><br>• <a href='#/search?q=doctor' style='color:#1a7a3c'>Doctors near me</a>";
  }
  const { category, city } = detectIntent(msg);
  if (category && city) {
    const q2 = encodeURIComponent(category);
    return `Here are <strong>${category}</strong> services in <strong>${city.charAt(0).toUpperCase() + city.slice(1)}</strong>:<br><br><a href='#/search?q=${q2}&city=${city}' style='display:inline-block;padding:8px 16px;background:#1a7a3c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px'>🔍 View Results</a>`;
  }
  if (category) {
    const storedCity = localStorage.getItem("dhoondho_city");
    const q2 = encodeURIComponent(category);
    const cityHint = storedCity ? ` in <strong>${storedCity}</strong>` : " near you";
    return `Looking for <strong>${category}</strong>${cityHint}?<br><br><a href='#/search?q=${q2}' style='display:inline-block;padding:8px 16px;background:#1a7a3c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px'>🔍 View Results</a>`;
  }
  if (city) {
    return `Searching for services in <strong>${city.charAt(0).toUpperCase() + city.slice(1)}</strong>? What type of service are you looking for?<br><br><a href='#/search?city=${city}' style='display:inline-block;padding:8px 16px;background:#1a7a3c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px'>🔍 Browse All Services</a>`;
  }
  if (lower.includes("near") || lower.includes("nearby")) {
    return `For services near you, I need your location. <a href='#/' style='color:#1a7a3c'>Go to homepage</a> and click <strong>Nearby Now 🔥</strong> to find services close to you.`;
  }
  return `I can help you find local services. Try:<br>• "Find plumber in Mumbai"<br>• "Restaurants near me"<br>• "Electrician in Pune"<br><br>Or use the <a href='#/search' style='color:#1a7a3c'>search page</a> to browse all listings.`;
}
function ensureStyles() {
  if (document.getElementById("dhoondho-ai-styles")) return;
  const style = document.createElement("style");
  style.id = "dhoondho-ai-styles";
  style.textContent = `
    #dhoondho-ai-widget { position: fixed; bottom: 24px; right: 24px; z-index: 9998; }
    #dhoondho-ai-fab {
      width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
      background: linear-gradient(135deg, #1a7a3c, #34A853);
      box-shadow: 0 4px 16px rgba(26,122,60,0.4);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; transition: transform 0.2s;
    }
    #dhoondho-ai-fab:hover { transform: scale(1.08); }
    #dhoondho-ai-panel {
      position: absolute; bottom: 70px; right: 0;
      width: 320px; max-height: 480px;
      background: #fff; border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex; flex-direction: column; overflow: hidden;
      transform-origin: bottom right;
      animation: ai-panel-in 0.2s ease;
    }
    @keyframes ai-panel-in {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 1; transform: scale(1); }
    }
    #dhoondho-ai-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .ai-msg-bot, .ai-msg-user {
      padding: 10px 14px; border-radius: 14px;
      font-size: 13px; line-height: 1.5; max-width: 85%;
    }
    .ai-msg-bot { background: #f1f3f4; color: #202124; align-self: flex-start; }
    .ai-msg-user { background: #1a7a3c; color: #fff; align-self: flex-end; }
    #dhoondho-ai-input-row {
      display: flex; gap: 8px; padding: 12px 14px;
      border-top: 1px solid #f0f0f0;
    }
    #dhoondho-ai-input {
      flex: 1; border: 1px solid #e0e0e0; border-radius: 20px;
      padding: 8px 14px; font-size: 13px; outline: none;
    }
    #dhoondho-ai-send {
      width: 36px; height: 36px; border-radius: 50%; border: none;
      background: #1a7a3c; color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    @media (max-width: 400px) {
      #dhoondho-ai-panel { width: calc(100vw - 32px); right: -8px; }
    }
  `;
  document.head.appendChild(style);
}
function initAIAssistant() {
  if (document.getElementById("dhoondho-ai-widget")) return;
  ensureStyles();
  const widget = document.createElement("div");
  widget.id = "dhoondho-ai-widget";
  widget.innerHTML = `
    <button id="dhoondho-ai-fab" title="Dhoondho Assistant"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></button>
  `;
  document.body.appendChild(widget);
  let panelOpen = false;
  const fab = document.getElementById("dhoondho-ai-fab");
  fab.addEventListener("click", () => {
    var _a3;
    if (panelOpen) {
      (_a3 = document.getElementById("dhoondho-ai-panel")) == null ? void 0 : _a3.remove();
      panelOpen = false;
      return;
    }
    openPanel();
    panelOpen = true;
  });
  function openPanel() {
    var _a3;
    const panel = document.createElement("div");
    panel.id = "dhoondho-ai-panel";
    panel.innerHTML = `
      <div style="background:linear-gradient(135deg,#1a7a3c,#34A853);padding:14px 16px;display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <div>
            <div style="font-size:14px;font-weight:700;color:#fff">Dhoondho Assistant</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.8)">Your local search guide</div>
          </div>
        </div>
        <button id="ai-close-btn" style="background:none;border:none;color:#fff;cursor:pointer;font-size:18px;line-height:1">✕</button>
      </div>
      <div id="dhoondho-ai-messages"></div>
      <div id="dhoondho-ai-input-row">
        <input id="dhoondho-ai-input" type="text" placeholder="Ask me anything..." />
        <button id="dhoondho-ai-send">➤</button>
      </div>
    `;
    widget.appendChild(panel);
    (_a3 = document.getElementById("ai-close-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
      panel.remove();
      panelOpen = false;
    });
    addBotMessage(
      "Namaste! 🙏 I'm Dhoondho Assistant. How can I help you find local services today?"
    );
    const inputEl = document.getElementById(
      "dhoondho-ai-input"
    );
    const sendBtn = document.getElementById("dhoondho-ai-send");
    const send = () => {
      const msg = inputEl.value.trim();
      if (!msg) return;
      inputEl.value = "";
      addUserMessage(msg);
      setTimeout(() => addBotMessage(buildResponse(msg)), 400);
    };
    sendBtn.addEventListener("click", send);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") send();
    });
    inputEl.focus();
  }
  function addBotMessage(html) {
    const messages = document.getElementById("dhoondho-ai-messages");
    if (!messages) return;
    const el = document.createElement("div");
    el.className = "ai-msg-bot";
    el.innerHTML = html;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
  function addUserMessage(text) {
    const messages = document.getElementById("dhoondho-ai-messages");
    if (!messages) return;
    const el = document.createElement("div");
    el.className = "ai-msg-user";
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
}
const STORAGE_KEYS = {
  lat: "dhoondho_lat",
  lng: "dhoondho_lng",
  city: "dhoondho_city",
  area: "dhoondho_area",
  state: "dhoondho_state",
  denied: "dhoondho_loc_denied"
};
const CHANGE_THRESHOLD_KM = 2.5;
let watchId = null;
let lastWatchUpdate = 0;
const WATCH_DEBOUNCE_MS = 3e4;
function distanceKm(lat1, lng1, lat2, lng2) {
  const R2 = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a2 = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R2 * 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
}
function loadStoredLocation() {
  const lat = localStorage.getItem(STORAGE_KEYS.lat);
  const lng = localStorage.getItem(STORAGE_KEYS.lng);
  if (!lat || !lng) return null;
  return {
    lat: Number.parseFloat(lat),
    lng: Number.parseFloat(lng),
    city: localStorage.getItem(STORAGE_KEYS.city) || void 0,
    area: localStorage.getItem(STORAGE_KEYS.area) || void 0,
    state: localStorage.getItem(STORAGE_KEYS.state) || void 0
  };
}
function storeLocation(loc) {
  localStorage.setItem(STORAGE_KEYS.lat, String(loc.lat));
  localStorage.setItem(STORAGE_KEYS.lng, String(loc.lng));
  if (loc.city) localStorage.setItem(STORAGE_KEYS.city, loc.city);
  if (loc.area) localStorage.setItem(STORAGE_KEYS.area, loc.area);
  if (loc.state) localStorage.setItem(STORAGE_KEYS.state, loc.state);
  window.dispatchEvent(new CustomEvent("dhoondho:location"));
}
async function reverseGeocode$1(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    const addr = data.address || {};
    const city = addr.city || addr.town || addr.village || addr.county || "";
    const area = addr.suburb || addr.neighbourhood || addr.road || "";
    const state = addr.state || "";
    return { city, area, state };
  } catch {
    return { city: "", area: "", state: "" };
  }
}
function showLocationChangedModal(newLoc, onUpdate) {
  var _a3, _b2, _c;
  (_a3 = document.getElementById("loc-change-overlay")) == null ? void 0 : _a3.remove();
  const city = newLoc.city || "New location";
  const area = newLoc.area ? `, ${newLoc.area}` : "";
  const state = newLoc.state ? `, ${newLoc.state}` : "";
  const label = `${city}${area}${state}, India`;
  const overlay = document.createElement("div");
  overlay.id = "loc-change-overlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px";
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:28px 24px;max-width:360px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,0.18);text-align:center">
      <div style="width:52px;height:52px;background:#E8F5E9;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin:0 0 6px">Location Changed</h3>
      <p style="font-size:13px;color:#5f6368;margin:0 0 6px">Your location has changed to:</p>
      <p style="font-size:14px;font-weight:600;color:#1a7a3c;margin:0 0 20px">📍 ${label}</p>
      <p style="font-size:12px;color:#9aa0a6;margin:0 0 20px">Update to get better local results?</p>
      <div style="display:flex;gap:10px">
        <button id="loc-update-btn" style="flex:1;padding:11px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">Update Location</button>
        <button id="loc-cancel-btn" style="flex:1;padding:11px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer">Not Now</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  (_b2 = document.getElementById("loc-update-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    storeLocation(newLoc);
    overlay.remove();
    onUpdate(newLoc);
  });
  (_c = document.getElementById("loc-cancel-btn")) == null ? void 0 : _c.addEventListener("click", () => {
    overlay.remove();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}
function showManualCityInput(onCity) {
  var _a3, _b2;
  if (document.getElementById("manual-city-bar")) return;
  const bar = document.createElement("div");
  bar.id = "manual-city-bar";
  bar.style.cssText = "background:#FFF8E1;border-bottom:1px solid #FFD54F;padding:10px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13px;z-index:100;position:relative";
  bar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F57F17" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <span style="color:#F57F17;font-weight:500">Enable location for better results.</span>
    <input id="manual-city-input" type="text" placeholder="Enter your city (e.g. Delhi)" style="flex:1;min-width:160px;padding:6px 12px;border:1px solid #FFD54F;border-radius:8px;font-size:13px;outline:none" />
    <button id="manual-city-btn" style="padding:6px 14px;background:#F57F17;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">Go</button>
    <button id="manual-city-close" style="padding:4px 8px;background:none;border:none;cursor:pointer;color:#9aa0a6;font-size:16px">✕</button>
  `;
  const main = document.getElementById("main-content");
  const body = document.body;
  const ref = main || body.firstElementChild || body;
  ref.insertBefore(bar, ref.firstChild);
  const input = document.getElementById(
    "manual-city-input"
  );
  const go = () => {
    const city = input == null ? void 0 : input.value.trim();
    if (!city) return;
    bar.remove();
    onCity(city);
  };
  (_a3 = document.getElementById("manual-city-btn")) == null ? void 0 : _a3.addEventListener("click", go);
  input == null ? void 0 : input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") go();
  });
  (_b2 = document.getElementById("manual-city-close")) == null ? void 0 : _b2.addEventListener("click", () => bar.remove());
}
async function initLocationSystem(options = {}) {
  const stored = loadStoredLocation();
  if (!navigator.geolocation) {
    if (stored) return stored;
    return null;
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        var _a3;
        const { latitude: lat, longitude: lng } = pos.coords;
        const { city, area, state } = await reverseGeocode$1(lat, lng);
        const newLoc = { lat, lng, city, area, state };
        if (stored) {
          const dist = distanceKm(stored.lat, stored.lng, lat, lng);
          if (dist > CHANGE_THRESHOLD_KM) {
            showLocationChangedModal(newLoc, (updated) => {
              var _a4;
              (_a4 = options.onLocationChanged) == null ? void 0 : _a4.call(options, updated);
            });
            resolve(stored);
            return;
          }
        }
        storeLocation(newLoc);
        (_a3 = options.onLocationDetected) == null ? void 0 : _a3.call(options, newLoc);
        resolve(newLoc);
        if (options.enableWatch && watchId === null) {
          watchId = navigator.geolocation.watchPosition(
            async (wp) => {
              const now = Date.now();
              if (now - lastWatchUpdate < WATCH_DEBOUNCE_MS) return;
              lastWatchUpdate = now;
              const wLat = wp.coords.latitude;
              const wLng = wp.coords.longitude;
              const current = loadStoredLocation();
              if (!current) return;
              const d2 = distanceKm(current.lat, current.lng, wLat, wLng);
              if (d2 > CHANGE_THRESHOLD_KM) {
                const geo = await reverseGeocode$1(wLat, wLng);
                const wLoc = { lat: wLat, lng: wLng, ...geo };
                showLocationChangedModal(wLoc, (updated) => {
                  var _a4;
                  (_a4 = options.onLocationChanged) == null ? void 0 : _a4.call(options, updated);
                });
              }
            },
            () => {
            },
            { enableHighAccuracy: false }
          );
        }
      },
      async () => {
        var _a3;
        localStorage.setItem(STORAGE_KEYS.denied, "1");
        if (stored) {
          resolve(stored);
          return;
        }
        (_a3 = options.onDenied) == null ? void 0 : _a3.call(options);
        showManualCityInput((city) => {
          var _a4;
          const manualLoc = { lat: 0, lng: 0, city };
          storeLocation(manualLoc);
          (_a4 = options.onLocationDetected) == null ? void 0 : _a4.call(options, manualLoc);
          resolve(manualLoc);
        });
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 1e4 }
    );
  });
}
function getSpeechAPI() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
function setMicState(btn, state, message) {
  btn.setAttribute("data-voice-state", state);
  btn.title = message || (state === "listening" ? "Listening... (tap to stop)" : "Voice Search");
  if (state === "listening") {
    btn.style.background = "rgba(234,67,53,0.12)";
    btn.style.borderRadius = "50%";
    btn.style.animation = "dhoondho-mic-pulse 1s ease-in-out infinite";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    `;
  } else {
    btn.style.background = "none";
    btn.style.animation = "none";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${state === "error" ? "#EA4335" : "#5f6368"}" stroke-width="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    `;
  }
}
function showListeningOverlay() {
  const el = document.createElement("div");
  el.id = "voice-listening-overlay";
  el.style.cssText = "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#fff;border-radius:50px;padding:12px 24px;box-shadow:0 4px 20px rgba(0,0,0,0.15);display:flex;align-items:center;gap:10px;z-index:9999;font-size:14px;font-weight:600;color:#202124";
  el.innerHTML = `
    <span style="display:flex;gap:3px;align-items:center">
      <span style="width:4px;height:16px;background:#EA4335;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out infinite"></span>
      <span style="width:4px;height:22px;background:#4285F4;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out 0.15s infinite"></span>
      <span style="width:4px;height:18px;background:#34A853;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out 0.3s infinite"></span>
      <span style="width:4px;height:24px;background:#FBBC05;border-radius:2px;animation:dhoondho-bar 0.8s ease-in-out 0.45s infinite"></span>
    </span>
    <span>Listening...</span>
  `;
  document.body.appendChild(el);
  return () => el.remove();
}
function ensureVoiceStyles() {
  if (document.getElementById("dhoondho-voice-styles")) return;
  const style = document.createElement("style");
  style.id = "dhoondho-voice-styles";
  style.textContent = `
    @keyframes dhoondho-mic-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(234,67,53,0.4); }
      50% { box-shadow: 0 0 0 8px rgba(234,67,53,0); }
    }
    @keyframes dhoondho-bar {
      0%, 100% { transform: scaleY(0.5); opacity: 0.7; }
      50% { transform: scaleY(1.3); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}
function initVoiceSearch(options) {
  const { inputEl, micBtn, onResult, language = "en-IN" } = options;
  ensureVoiceStyles();
  const SR = getSpeechAPI();
  if (!SR) {
    micBtn.title = "Voice search not supported in this browser";
    micBtn.style.opacity = "0.4";
    micBtn.style.cursor = "not-allowed";
    return () => {
    };
  }
  let recognition = null;
  let isListening = false;
  let removeOverlay = null;
  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
      } catch {
      }
      recognition = null;
    }
    isListening = false;
    setMicState(micBtn, "idle");
    removeOverlay == null ? void 0 : removeOverlay();
    removeOverlay = null;
  };
  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }
    recognition = new SR();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    isListening = true;
    setMicState(micBtn, "listening");
    removeOverlay = showListeningOverlay();
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      inputEl.value = transcript;
      stopListening();
      onResult(transcript);
    };
    recognition.onerror = (e) => {
      stopListening();
      if (e.error === "not-allowed") {
        setMicState(micBtn, "error", "Microphone permission denied");
        const bar = document.createElement("div");
        bar.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#fff;border-radius:12px;padding:12px 20px;box-shadow:0 4px 20px rgba(0,0,0,0.15);font-size:13px;color:#EA4335;z-index:9999";
        bar.textContent = "🎤 Microphone permission denied. Please allow access in browser settings.";
        document.body.appendChild(bar);
        setTimeout(() => bar.remove(), 4e3);
      } else if (e.error === "no-speech") {
        const bar = document.createElement("div");
        bar.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#fff;border-radius:12px;padding:12px 20px;box-shadow:0 4px 20px rgba(0,0,0,0.15);font-size:13px;color:#5f6368;z-index:9999";
        bar.textContent = "🎤 No speech detected. Try again.";
        document.body.appendChild(bar);
        setTimeout(() => bar.remove(), 3e3);
      }
    };
    recognition.onend = () => {
      if (isListening) stopListening();
    };
    try {
      recognition.start();
    } catch {
      stopListening();
    }
  };
  if (micBtn._voiceHandler) {
    micBtn.removeEventListener("click", micBtn._voiceHandler);
  }
  micBtn._voiceHandler = startListening;
  micBtn.addEventListener("click", startListening);
  return stopListening;
}
const PROFILE_PHOTO_KEY = "dhoondho_profile_photo";
function getProfilePhoto() {
  return localStorage.getItem(PROFILE_PHOTO_KEY);
}
function saveProfilePhoto(dataUrl) {
  localStorage.setItem(PROFILE_PHOTO_KEY, dataUrl);
}
function escapeHtml$3(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function getCategoryName$1(categoryId) {
  const cat = SAMPLE_CATEGORIES.find((c2) => c2.id === categoryId);
  return cat ? cat.name : "Business";
}
function getStatusBadge$1(status) {
  const styles = {
    approved: "background:oklch(0.9 0.12 145);color:oklch(0.35 0.12 145)",
    pending: "background:oklch(0.95 0.1 80);color:oklch(0.5 0.12 80)",
    rejected: "background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27)"
  };
  const style = styles[status] || styles.pending;
  return `<span class="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style="${style}">${escapeHtml$3(status)}</span>`;
}
function listingRow(listing, index2) {
  return `
    <tr data-ocid="vendor.item.${index2 + 1}" class="border-b" style="border-color:oklch(var(--border))">
      <td class="py-3 px-4">
        <p class="font-medium text-sm" style="color:oklch(var(--foreground))">${escapeHtml$3(listing.name)}</p>
        <p class="text-xs" style="color:oklch(var(--muted-foreground))">${escapeHtml$3(listing.city)}</p>
      </td>
      <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml$3(getCategoryName$1(listing.categoryId))}</td>
      <td class="py-3 px-4">${getStatusBadge$1(listing.status)}</td>
      <td class="py-3 px-4">
        <a href="#/listing/${listing.id}" data-ocid="vendor.link" class="text-xs font-medium no-underline hover:underline" style="color:oklch(var(--primary))">View</a>
      </td>
    </tr>
  `;
}
async function renderVendorPage() {
  var _a3;
  const main = document.getElementById("main-content");
  if (!main) return;
  const authed = await isAuthenticated();
  if (!authed) {
    main.innerHTML = `
      <div class="min-h-screen flex items-center justify-center px-4" style="background:oklch(var(--secondary))">
        <div class="bg-white rounded-2xl border p-10 text-center max-w-md w-full" style="border-color:oklch(var(--border))">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5" style="background:oklch(var(--secondary))">🏢</div>
          <h2 class="text-2xl font-bold mb-3" style="color:oklch(var(--foreground))">Vendor Portal</h2>
          <p class="text-sm mb-7" style="color:oklch(var(--muted-foreground))">Sign in to manage your business listings, submit new businesses, and track your status.</p>
          <button id="vendor-signin-btn" data-ocid="vendor.primary_button" class="w-full px-6 py-3 rounded-xl text-sm font-bold text-white" style="background:oklch(var(--primary))">
            Sign In to Continue
          </button>
        </div>
      </div>
    `;
    (_a3 = document.getElementById("vendor-signin-btn")) == null ? void 0 : _a3.addEventListener("click", async () => {
      await login();
      resetBackend();
      await debugAuth();
      await renderVendorPage();
    });
    return;
  }
  try {
    const backend2 = await getBackend();
    const myPrincipal = await getPrincipalObject();
    if (myPrincipal) {
      await backend2.assignCallerUserRole(myPrincipal, UserRole.user);
    }
  } catch {
  }
  let profileName = "";
  let profileBusiness = "";
  let profilePhone = "";
  try {
    const backend2 = await getBackend();
    const profile = await backend2.getCallerUserProfile();
    if (profile) {
      profileName = profile.name || "";
      profileBusiness = profile.businessName || "";
      profilePhone = profile.phone || "";
    }
  } catch {
  }
  const userInitial = profileName ? profileName.charAt(0).toUpperCase() : "V";
  const profilePhoto = getProfilePhoto();
  const avatarHtml = profilePhoto ? `<img src="${profilePhoto}" alt="Profile" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15)" />` : `<div style="width:64px;height:64px;border-radius:50%;background:#EA4335;color:#fff;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15)">${escapeHtml$3(userInitial)}</div>`;
  main.innerHTML = `
    <style>
      .vendor-page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; flex-wrap:wrap; gap:12px; }
      @media (max-width: 480px) {
        .vendor-page-header { flex-direction: column; align-items: flex-start; }
        .vendor-page-header button { width: 100%; text-align: center; }
        .vendor-availability-row { gap: 8px !important; }
        .vendor-availability-row button { flex: 1; justify-content: center; font-size: 13px !important; padding: 8px 12px !important; }
      }
    </style>
    <div class="min-h-screen" style="background:oklch(var(--secondary))">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="vendor-page-header">
          <div>
            <h1 class="text-3xl font-bold" style="color:oklch(var(--foreground))">Vendor Portal</h1>
            <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Manage your business listings</p>
          </div>
          <button id="add-listing-btn" data-ocid="vendor.primary_button" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style="background:oklch(var(--primary))">+ Add Business</button>
        </div>

        <!-- My Profile Card -->
        <div class="bg-white rounded-2xl border mb-6 overflow-hidden" style="border-color:oklch(var(--border))">
          <div class="p-5 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
            <h2 class="font-bold" style="color:oklch(var(--foreground))">My Profile</h2>
            <button id="toggle-profile-form" class="text-xs font-semibold px-3 py-1.5 rounded-lg border" style="border-color:oklch(var(--border));color:oklch(var(--primary))">Edit Profile</button>
          </div>
          <div class="p-5">
            <!-- Profile Display -->
            <div id="profile-display" class="flex items-center gap-5">
              <div id="vendor-avatar-wrap" style="position:relative;cursor:pointer" title="Click to change photo">
                ${avatarHtml}
                <div style="position:absolute;bottom:0;right:0;background:#1a7a3c;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;border:2px solid #fff">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </div>
                <input type="file" id="photo-upload-input" accept="image/*" style="display:none" />
              </div>
              <div>
                <div class="font-bold text-lg" style="color:oklch(var(--foreground))">${escapeHtml$3(profileName || "Your Name")}</div>
                <div class="text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml$3(profileBusiness || "Business Name")}</div>
                ${profilePhone ? `<div class="text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml$3(profilePhone)}</div>` : ""}
                <div class="text-xs mt-1" style="color:#9aa0a6">Click avatar to update photo</div>
              </div>
            </div>

            <!-- Edit Profile Form (hidden) -->
            <div id="profile-edit-form" style="display:none;margin-top:20px;border-top:1px solid oklch(var(--border));padding-top:20px">
              <form id="profile-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Your Name</label>
                  <input data-ocid="vendor.input" name="name" type="text" value="${escapeHtml$3(profileName)}" placeholder="Your full name" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Business Name</label>
                  <input data-ocid="vendor.input" name="businessName" type="text" value="${escapeHtml$3(profileBusiness)}" placeholder="Your business name" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Phone</label>
                  <input data-ocid="vendor.input" name="phone" type="tel" value="${escapeHtml$3(profilePhone)}" placeholder="+91 98765 43210" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
                </div>
                <div id="profile-save-msg" class="hidden sm:col-span-2"></div>
                <div class="sm:col-span-2 flex gap-3">
                  <button type="submit" data-ocid="vendor.submit_button" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style="background:oklch(var(--primary))">Save Profile</button>
                  <button type="button" id="cancel-profile-btn" class="px-5 py-2.5 rounded-xl text-sm font-semibold border" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Submission Form (hidden by default) -->
        <div id="listing-form-container" class="hidden mb-8">
          <div class="bg-white rounded-2xl border p-7" style="border-color:oklch(var(--border))">
            <h2 class="text-xl font-bold mb-6" style="color:oklch(var(--foreground))">Submit New Business</h2>
            <form id="listing-form" class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Business Name *</label>
                <input data-ocid="vendor.input" name="name" type="text" required placeholder="e.g. Sharma Electronics" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2" style="border-color:oklch(var(--border))" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Category *</label>
                <select data-ocid="vendor.select" name="category" required class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none bg-white" style="border-color:oklch(var(--border))">
                  <option value="">Select category</option>
                  ${SAMPLE_CATEGORIES.map((c2) => `<option value="${c2.id}">${c2.icon} ${escapeHtml$3(c2.name)}</option>`).join("")}
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Phone *</label>
                <input data-ocid="vendor.input" name="phone" type="tel" required placeholder="+91 98765 43210" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">City *</label>
                <input data-ocid="vendor.input" name="city" type="text" required placeholder="Mumbai" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">State *</label>
                <input data-ocid="vendor.input" name="state" type="text" required placeholder="Maharashtra" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Address *</label>
                <input data-ocid="vendor.input" name="address" type="text" required placeholder="Shop No, Street, Area" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Website</label>
                <input data-ocid="vendor.input" name="website" type="url" placeholder="https://" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Latitude</label>
                <input data-ocid="vendor.input" name="lat" type="number" step="any" placeholder="19.0760" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Longitude</label>
                <input data-ocid="vendor.input" name="lng" type="number" step="any" placeholder="72.8777" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Description *</label>
                <textarea data-ocid="vendor.textarea" name="description" required rows="4" placeholder="Describe your business, services, timings..." class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style="border-color:oklch(var(--border))"></textarea>
              </div>
              <div id="form-message" class="md:col-span-2 hidden"></div>
              <div class="md:col-span-2 flex gap-3">
                <button type="submit" data-ocid="vendor.submit_button" class="px-6 py-2.5 rounded-xl text-sm font-bold text-white" style="background:oklch(var(--primary))">Submit Listing</button>
                <button type="button" id="cancel-form-btn" data-ocid="vendor.cancel_button" class="px-6 py-2.5 rounded-xl text-sm font-semibold border" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Availability Toggle -->
        <div class="bg-white rounded-2xl border mb-6 p-5" style="border-color:oklch(var(--border))">
          <h2 class="font-bold mb-3" style="color:oklch(var(--foreground))">My Availability Status</h2>
          <p class="text-sm mb-4" style="color:oklch(var(--muted-foreground))">Set your current availability so customers know if you're accepting work.</p>
          <div class="vendor-availability-row" style="display:flex;gap:10px;flex-wrap:wrap">
            <button id="avail-available" data-avail="available" data-ocid="vendor.toggle" style="display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:20px;border:2px solid #e8e8e8;background:#fff;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.15s">
              🟢 Available
            </button>
            <button id="avail-busy" data-avail="busy" data-ocid="vendor.toggle" style="display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:20px;border:2px solid #e8e8e8;background:#fff;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.15s">
              🟡 Busy
            </button>
            <button id="avail-offline" data-avail="offline" data-ocid="vendor.toggle" style="display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:20px;border:2px solid #e8e8e8;background:#fff;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.15s">
              ⚫ Offline
            </button>
          </div>
        </div>

        <!-- Listings Table -->
        <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
          <div class="p-5 border-b" style="border-color:oklch(var(--border))">
            <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Your Listings</h2>
          </div>
          <div id="vendor-listings-container">
            <div data-ocid="vendor.loading_state" class="p-10 text-center">
              <div class="inline-block w-6 h-6 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div>
            </div>
          </div>
        </div>
      </div>
    ${renderPageFooter()}
    </div>
  `;
  attachVendorEvents();
  await loadVendorListings();
}
function attachVendorEvents() {
  var _a3, _b2, _c, _d, _e, _f, _g;
  (_a3 = document.getElementById("add-listing-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
    var _a4, _b3;
    (_a4 = document.getElementById("listing-form-container")) == null ? void 0 : _a4.classList.remove("hidden");
    (_b3 = document.getElementById("listing-form-container")) == null ? void 0 : _b3.scrollIntoView({ behavior: "smooth" });
  });
  (_b2 = document.getElementById("cancel-form-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("listing-form-container")) == null ? void 0 : _a4.classList.add("hidden");
  });
  (_c = document.getElementById("toggle-profile-form")) == null ? void 0 : _c.addEventListener("click", () => {
    const form = document.getElementById("profile-edit-form");
    const btn = document.getElementById("toggle-profile-form");
    if (!form || !btn) return;
    if (form.style.display === "none") {
      form.style.display = "block";
      btn.textContent = "Close";
    } else {
      form.style.display = "none";
      btn.textContent = "Edit Profile";
    }
  });
  (_d = document.getElementById("cancel-profile-btn")) == null ? void 0 : _d.addEventListener("click", () => {
    const form = document.getElementById("profile-edit-form");
    const btn = document.getElementById("toggle-profile-form");
    if (form) form.style.display = "none";
    if (btn) btn.textContent = "Edit Profile";
  });
  (_e = document.getElementById("vendor-avatar-wrap")) == null ? void 0 : _e.addEventListener("click", () => {
    var _a4;
    (_a4 = document.getElementById("photo-upload-input")) == null ? void 0 : _a4.click();
  });
  const photoInput = document.getElementById(
    "photo-upload-input"
  );
  photoInput == null ? void 0 : photoInput.addEventListener("change", () => {
    var _a4;
    const file = (_a4 = photoInput.files) == null ? void 0 : _a4[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a5;
      const dataUrl = (_a5 = e.target) == null ? void 0 : _a5.result;
      saveProfilePhoto(dataUrl);
      const wrap2 = document.getElementById("vendor-avatar-wrap");
      if (wrap2) {
        const editIcon = wrap2.querySelector("div");
        wrap2.innerHTML = `<img src="${dataUrl}" alt="Profile" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15)" />`;
        if (editIcon) wrap2.appendChild(editIcon);
        const newInput = document.createElement("input");
        newInput.type = "file";
        newInput.id = "photo-upload-input";
        newInput.accept = "image/*";
        newInput.style.display = "none";
        wrap2.appendChild(newInput);
        newInput.addEventListener("change", () => {
          var _a6;
          const f = (_a6 = newInput.files) == null ? void 0 : _a6[0];
          if (!f) return;
          const r2 = new FileReader();
          r2.onload = (ev) => {
            var _a7;
            const url = (_a7 = ev.target) == null ? void 0 : _a7.result;
            saveProfilePhoto(url);
            const img = wrap2.querySelector("img");
            if (img) img.src = url;
          };
          r2.readAsDataURL(f);
        });
      }
    };
    reader.readAsDataURL(file);
  });
  (_f = document.getElementById("profile-form")) == null ? void 0 : _f.addEventListener("submit", async (e) => {
    var _a4, _b3, _c2, _d2, _e2;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const submitBtn = form.querySelector(
      "[type=submit]"
    );
    const msgEl = document.getElementById("profile-save-msg");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";
    }
    try {
      const backend2 = await getBackend();
      await backend2.saveCallerUserProfile({
        name: ((_a4 = data.get("name")) == null ? void 0 : _a4.trim()) || "",
        businessName: ((_b3 = data.get("businessName")) == null ? void 0 : _b3.trim()) || "",
        phone: ((_c2 = data.get("phone")) == null ? void 0 : _c2.trim()) || ""
      });
      const nameEl = document.querySelector(
        "#profile-display .font-bold"
      );
      const bizEl = document.querySelector(
        "#profile-display .text-sm"
      );
      if (nameEl)
        nameEl.textContent = ((_d2 = data.get("name")) == null ? void 0 : _d2.trim()) || "Your Name";
      if (bizEl)
        bizEl.textContent = ((_e2 = data.get("businessName")) == null ? void 0 : _e2.trim()) || "Business Name";
      if (msgEl) {
        msgEl.className = "sm:col-span-2";
        msgEl.innerHTML = `<div style="background:#e8f5e9;color:#1a7a3c;padding:10px 14px;border-radius:8px;font-size:13px">✓ Profile saved successfully!</div>`;
      }
    } catch (err) {
      if (msgEl) {
        msgEl.className = "sm:col-span-2";
        msgEl.innerHTML = `<div style="background:#fce4ec;color:#c62828;padding:10px 14px;border-radius:8px;font-size:13px">Failed to save: ${err instanceof Error ? err.message : "Unknown error"}</div>`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Save Profile";
      }
    }
  });
  const availMap = {
    available: { border: "#34A853", bg: "#e8f5e9" },
    busy: { border: "#FBBC05", bg: "#fff8e1" },
    offline: { border: "#9aa0a6", bg: "#f1f1f1" }
  };
  function updateAvailUI(current) {
    var _a4, _b3;
    for (const btn of document.querySelectorAll(
      "[data-avail]"
    )) {
      const val = btn.dataset.avail || "";
      if (val === current) {
        btn.style.borderColor = ((_a4 = availMap[val]) == null ? void 0 : _a4.border) || "#dadce0";
        btn.style.background = ((_b3 = availMap[val]) == null ? void 0 : _b3.bg) || "#fff";
        btn.style.color = "#202124";
      } else {
        btn.style.borderColor = "#e8e8e8";
        btn.style.background = "#fff";
        btn.style.color = "#5f6368";
      }
    }
  }
  const savedAvail = localStorage.getItem("dhoondho_vendor_availability") || "available";
  updateAvailUI(savedAvail);
  for (const btn of document.querySelectorAll(
    "[data-avail]"
  )) {
    btn.addEventListener("click", () => {
      const val = btn.dataset.avail || "available";
      localStorage.setItem("dhoondho_vendor_availability", val);
      updateAvailUI(val);
      const labels = {
        available: "Status set to Available ✓",
        busy: "Status set to Busy",
        offline: "Status set to Offline"
      };
      showToast(labels[val] || "Status updated", "success");
    });
  }
  (_g = document.getElementById("listing-form")) == null ? void 0 : _g.addEventListener("submit", async (e) => {
    var _a4, _b3, _c2, _d2, _e2, _f2, _g2, _h, _i, _j, _k, _l, _m, _n;
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const msgEl = document.getElementById("form-message");
    const submitBtn = form.querySelector(
      "[data-ocid='vendor.submit_button']"
    );
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }
    try {
      const backend2 = await getAuthenticatedBackend();
      const catVal = data.get("category");
      if (!catVal || catVal === "0") {
        showToast("Please select a category", "error");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Listing";
        }
        return;
      }
      await backend2.submitListing({
        name: (_a4 = data.get("name")) == null ? void 0 : _a4.trim(),
        categoryId: BigInt(catVal),
        phone: (_b3 = data.get("phone")) == null ? void 0 : _b3.trim(),
        city: (_c2 = data.get("city")) == null ? void 0 : _c2.trim(),
        state: (_d2 = data.get("state")) == null ? void 0 : _d2.trim(),
        address: (_e2 = data.get("address")) == null ? void 0 : _e2.trim(),
        website: ((_f2 = data.get("website")) == null ? void 0 : _f2.trim()) || "",
        description: (_g2 = data.get("description")) == null ? void 0 : _g2.trim(),
        photoIds: [],
        location: {
          lat: Number.parseFloat(data.get("lat") || "0") || 20.5937,
          lng: Number.parseFloat(data.get("lng") || "0") || 78.9629
        }
      });
      if (msgEl) {
        msgEl.className = "md:col-span-2";
        msgEl.innerHTML = `<div style="background:oklch(0.9 0.12 145);color:oklch(0.35 0.12 145);padding:12px 16px;border-radius:8px;font-size:13px">✓ Listing submitted for review! It will appear once approved by admin.</div>`;
      }
      form.reset();
      await loadVendorListings();
    } catch (err) {
      logApiFailure("submitListing", err);
      if (isCanisterDownError(err)) {
        const listingPayload = {
          name: (_h = data.get("name")) == null ? void 0 : _h.trim(),
          categoryId: String(data.get("category") || "1"),
          phone: (_i = data.get("phone")) == null ? void 0 : _i.trim(),
          city: (_j = data.get("city")) == null ? void 0 : _j.trim(),
          state: (_k = data.get("state")) == null ? void 0 : _k.trim(),
          address: (_l = data.get("address")) == null ? void 0 : _l.trim(),
          website: ((_m = data.get("website")) == null ? void 0 : _m.trim()) || "",
          description: (_n = data.get("description")) == null ? void 0 : _n.trim(),
          lat: data.get("lat") || "20.5937",
          lng: data.get("lng") || "78.9629"
        };
        queueListing(listingPayload);
        startRetryLoop(async (d2) => {
          const be = await getAuthenticatedBackend();
          await be.submitListing({
            name: d2.name,
            categoryId: BigInt(d2.categoryId),
            phone: d2.phone,
            city: d2.city,
            state: d2.state,
            address: d2.address,
            website: d2.website || "",
            description: d2.description,
            photoIds: [],
            location: {
              lat: Number(d2.lat) || 20.5937,
              lng: Number(d2.lng) || 78.9629
            }
          });
        });
        if (msgEl) {
          msgEl.className = "md:col-span-2";
          msgEl.innerHTML = `<div style="background:oklch(0.95 0.1 200);color:oklch(0.35 0.1 200);padding:12px 16px;border-radius:8px;font-size:13px">⏳ Your listing is saved and will be submitted shortly.</div>`;
        }
        form.reset();
      } else {
        if (msgEl) {
          msgEl.className = "md:col-span-2";
          msgEl.innerHTML = `<div style="background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27);padding:12px 16px;border-radius:8px;font-size:13px">Failed: ${friendlyError(err)}</div>`;
        }
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Listing";
      }
    }
  });
}
async function loadVendorListings() {
  const container = document.getElementById("vendor-listings-container");
  if (!container) return;
  let listings = [];
  try {
    const backend2 = await getBackend();
    const raw = await backend2.searchListingsByCity("");
    listings = raw.map((l) => ({
      id: l.id,
      name: l.name,
      categoryId: l.categoryId,
      status: String(l.status),
      city: l.city,
      state: l.state,
      address: l.address,
      phone: l.phone,
      website: l.website,
      description: l.description,
      photoIds: l.photoIds,
      createdTime: l.createdTime,
      location: l.location
    }));
  } catch {
    listings = SAMPLE_LISTINGS.slice(0, 3);
  }
  if (listings.length === 0) {
    container.innerHTML = `
      <div data-ocid="vendor.empty_state" class="p-10 text-center">
        <div class="text-4xl mb-3">🏢</div>
        <p class="text-sm font-medium" style="color:oklch(var(--foreground))">No listings yet</p>
        <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Click "Add Business" to submit your first listing</p>
      </div>
    `;
    return;
  }
  container.innerHTML = `
    <div class="overflow-x-auto">
      <table data-ocid="vendor.table" class="w-full">
        <thead>
          <tr class="border-b" style="border-color:oklch(var(--border));background:oklch(var(--secondary))">
            <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Business</th>
            <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Category</th>
            <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Status</th>
            <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Action</th>
          </tr>
        </thead>
        <tbody>
          ${listings.map(listingRow).join("")}
        </tbody>
      </table>
    </div>
  `;
}
const LANGUAGES = [
  { name: "हिन्दी", code: "hi" },
  { name: "বাংলা", code: "bn" },
  { name: "తెలుగు", code: "te" },
  { name: "मराठी", code: "mr" },
  { name: "தமிழ்", code: "ta" },
  { name: "ਪੰਜਾਬੀ", code: "pa" },
  { name: "ಕನ್ನಡ", code: "kn" },
  { name: "മലയാളം", code: "ml" },
  { name: "ગુજરાતી", code: "gu" }
];
const CATEGORIES = [
  {
    id: "1",
    name: "Home Services",
    icon: "🔧",
    bg: "#FFF3E0",
    color: "#E65100"
  },
  { id: "2", name: "Automotive", icon: "🚗", bg: "#E3F2FD", color: "#1565C0" },
  { id: "3", name: "Healthcare", icon: "❤️", bg: "#FCE4EC", color: "#C62828" },
  {
    id: "4",
    name: "Food & Dining",
    icon: "🍽️",
    bg: "#FFFDE7",
    color: "#F57F17"
  },
  { id: "5", name: "Shopping", icon: "🛍️", bg: "#FCE4EC", color: "#AD1457" },
  {
    id: "6",
    name: "Professional",
    icon: "💼",
    bg: "#EDE7F6",
    color: "#4527A0"
  },
  { id: "7", name: "Education", icon: "🎓", bg: "#E8F5E9", color: "#2E7D32" },
  { id: "8", name: "Real Estate", icon: "🏢", bg: "#E0F2F1", color: "#00695C" },
  { id: "9", name: "Events", icon: "🎉", bg: "#F3E5F5", color: "#6A1B9A" },
  { id: "10", name: "Logistics", icon: "🚚", bg: "#ECEFF1", color: "#37474F" },
  {
    id: "11",
    name: "Public Utilities",
    icon: "💡",
    bg: "#FFFDE7",
    color: "#F9A825"
  },
  { id: "12", name: "Smart City", icon: "📶", bg: "#E8F5E9", color: "#00695C" }
];
function escapeHtml$2(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const DHOONDHO_LOGO = `
  <span class="logo-letter" style="color:#EA4335;text-shadow:0 2px 8px rgba(234,67,53,0.35)">D</span><span
  class="logo-letter" style="color:#4285F4;text-shadow:0 2px 8px rgba(66,133,244,0.35)">h</span><span
  class="logo-letter" style="color:#FBBC05;text-shadow:0 2px 8px rgba(251,188,5,0.35)">o</span><span
  class="logo-letter" style="color:#34A853;text-shadow:0 2px 8px rgba(52,168,83,0.35)">o</span><span
  class="logo-letter" style="color:#EA4335;text-shadow:0 2px 8px rgba(234,67,53,0.35)">n</span><span
  class="logo-letter" style="color:#4285F4;text-shadow:0 2px 8px rgba(66,133,244,0.35)">d</span><span
  class="logo-letter" style="color:#FBBC05;text-shadow:0 2px 8px rgba(251,188,5,0.35)">h</span><span
  class="logo-letter" style="color:#34A853;text-shadow:0 2px 8px rgba(52,168,83,0.35)">o</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="logo-pin" width="36" height="36" viewBox="0 0 24 24" fill="#EA4335" style="filter:drop-shadow(0 2px 4px rgba(234,67,53,0.5));margin-left:4px;margin-bottom:4px;vertical-align:bottom"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
`;
let userLocation = null;
function cacheLocation(loc) {
  localStorage.setItem("dhoondho_lat", String(loc.lat));
  localStorage.setItem("dhoondho_lng", String(loc.lng));
  if (loc.city) localStorage.setItem("dhoondho_city", loc.city);
  if (loc.state) localStorage.setItem("dhoondho_state", loc.state);
  window.dispatchEvent(new CustomEvent("dhoondho:location"));
}
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    const addr = data.address || {};
    const city = addr.city || addr.town || addr.village || addr.county || "";
    const state = addr.state || "";
    return { city, state };
  } catch {
    return { city: "", state: "" };
  }
}
function updateLocationBanner(status) {
  var _a3;
  const banner = document.getElementById("location-banner");
  if (!banner) return;
  if (status === "none") {
    banner.style.display = "none";
    return;
  }
  if (status === "detecting") {
    banner.style.display = "flex";
    banner.style.background = "#E3F2FD";
    banner.style.color = "#1565C0";
    banner.innerHTML = `
      <span style="display:inline-block;width:14px;height:14px;border:2px solid #1565C0;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0"></span>
      <span>${t("detectingLocation")}</span>
    `;
  } else if (status === "detected" && userLocation) {
    const place = userLocation.city ? `${userLocation.city}${userLocation.state ? `, ${userLocation.state}` : ""}` : "";
    banner.style.display = "flex";
    banner.style.background = "#E8F5E9";
    banner.style.color = "#2E7D32";
    banner.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      <span>${t("locationDetected")}${place ? `: ${escapeHtml$2(place)}` : ""}</span>
      <button id="banner-nearby-btn" style="margin-left:auto;background:#2E7D32;color:#fff;border:none;border-radius:16px;padding:4px 12px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap">${t("nearby")}</button>
    `;
    (_a3 = document.getElementById("banner-nearby-btn")) == null ? void 0 : _a3.addEventListener("click", () => {
      if (userLocation) {
        window.location.hash = `#/search?lat=${userLocation.lat}&lng=${userLocation.lng}`;
      }
    });
    setTimeout(() => {
      if (banner) banner.style.display = "none";
    }, 6e3);
  } else if (status === "denied") {
    banner.style.display = "flex";
    banner.style.background = "#FFF8E1";
    banner.style.color = "#F57F17";
    banner.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>${t("enableLocation")}</span>
    `;
  }
  initFooterReactivity();
}
let langUnsubscribe = null;
async function renderHomePage() {
  if (langUnsubscribe) {
    langUnsubscribe();
    langUnsubscribe = null;
  }
  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) navbarContainer.style.display = "none";
  const main = document.getElementById("main-content");
  if (!main) return;
  const authed = await isAuthenticated();
  let userInitial = "D";
  let userName = "";
  if (authed) {
    try {
      const backend2 = await getBackend();
      const profile = await backend2.getCallerUserProfile();
      if (profile == null ? void 0 : profile.name) {
        userName = profile.name;
        userInitial = profile.name.charAt(0).toUpperCase();
      }
    } catch {
    }
  }
  const profilePhoto = authed ? getProfilePhoto() : null;
  const avatarContent = authed ? profilePhoto ? `<div id="home-avatar" style="width:36px;height:36px;border-radius:50%;cursor:pointer;flex-shrink:0"><img src="${profilePhoto}" style="width:36px;height:36px;border-radius:50%;object-fit:cover" /></div>` : `<div id="home-avatar" style="width:36px;height:36px;border-radius:50%;background:#EA4335;color:#fff;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;user-select:none">${escapeHtml$2(userInitial)}</div>` : `<button id="home-login-btn" style="padding:6px 16px;border-radius:6px;border:1px solid #dadce0;background:#fff;font-size:13px;font-weight:600;color:#1a73e8;cursor:pointer">${t("signIn")}</button>`;
  const currentLang2 = getCurrentLanguage();
  main.innerHTML = `
    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
      .logo-letter { font-size: clamp(44px, 11vw, 82px); font-weight: 900; letter-spacing: -3px; font-family: 'Google Sans', 'Poppins', Arial, sans-serif; display:inline-block; transition: transform 0.2s; } .logo-letter:hover { transform: scale(1.15) translateY(-2px); } .logo-pin { display:inline-block; }
      .dhoondho-search-box:hover { box-shadow: 0 2px 8px rgba(32,33,36,0.2) !important; }
      .dhoondho-search-box:focus-within { box-shadow: 0 2px 8px rgba(32,33,36,0.2) !important; border-color: transparent !important; }
      .cat-card { transition: transform 0.15s ease, box-shadow 0.15s ease; cursor: pointer; }
      .cat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
      .nav-link-home { font-size: 13px; color: #202124; text-decoration: none; font-weight: 500; white-space: nowrap; }
      .nav-link-home:hover { text-decoration: underline; }
      .avatar-dropdown { position: absolute; top: calc(100% + 8px); right: 0; background: #fff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.15); min-width: 200px; z-index: 200; overflow: hidden; }
      .avatar-dropdown-item { display: block; padding: 11px 16px; font-size: 14px; color: #202124; text-decoration: none; cursor: pointer; transition: background 0.1s; }
      .avatar-dropdown-item:hover { background: #f5f5f5; }
      .lang-link-home { color: #1a73e8; text-decoration: none; font-size: 13px; cursor: pointer; padding: 4px 6px; border-radius: 4px; transition: background 0.15s, font-weight 0.1s; display:inline-block; }
      .lang-link-home:hover { background: #e8f0fe; }
      .lang-link-home.active-lang { font-weight: 700; color: #1a7a3c; background: #e8f5e9; }
      .action-buttons { display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
      .action-btn { padding: 10px 22px; border-radius: 25px; background: #f1f1f1; border: 1px solid #f1f1f1; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; font-size: 14px; color: #3c4043; font-weight: 500; white-space: nowrap; }
      .action-btn:hover { border-color: #dadce0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .action-btn-nearby { background: #1f7a3e !important; color: white !important; border-color: #1f7a3e !important; font-weight: 600; }
      .action-btn-nearby:hover { background: #155c2e !important; border-color: #155c2e !important; box-shadow: 0 2px 8px rgba(31,122,62,0.4) !important; }
      #location-banner { display: none; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; margin-bottom: 16px; max-width: 480px; width: 100%; transition: all 0.3s ease; }
      @media (max-width: 600px) {
        .nav-links-left { gap: 8px !important; }
        .nav-links-right { gap: 8px !important; }
        .nav-link-home { font-size: 12px !important; }
        .action-buttons { gap: 8px !important; }
        .action-btn { padding: 8px 14px !important; font-size: 13px !important; }
        .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
      }
      @media (max-width: 380px) {
        .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 480px) {
        
        .share-widget { align-items: center !important; }
        .share-widget button { flex-shrink: 0; }
        nav { padding: 8px 12px !important; }
        .logo-letter { letter-spacing: -1px !important; }
        #location-banner { border-radius: 12px !important; padding: 8px 12px !important; }
      }
      @media (max-width: 360px) {
        .nav-links-left, .nav-links-right { gap: 6px !important; }
        .nav-link-home { font-size: 11px !important; }
      }
    </style>

    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">

      <!-- Homepage Top Navigation -->
      <nav style="position:relative;display:flex;align-items:center;justify-content:space-between;padding:8px 24px;min-height:52px;z-index:10">
        <div class="nav-links-left" style="display:flex;align-items:center;gap:20px">
          <a href="#/about" class="nav-link-home">${t("about")}</a>
          <a href="#/blog" class="nav-link-home">${t("blog")}</a>
        </div>
        <div class="nav-links-right" style="display:flex;align-items:center;gap:16px">
          <a href="#/vendor" class="nav-link-home">${t("forBusinesses")}</a>
          <div style="position:relative">
            ${avatarContent}
            <div id="avatar-dropdown" class="avatar-dropdown" style="display:none">
              ${authed ? `
                <div style="padding:12px 16px;border-bottom:1px solid #f0f0f0">
                  <div style="font-size:13px;font-weight:600;color:#202124">${escapeHtml$2(userName || "User")}</div>
                  <div style="font-size:11px;color:#5f6368">Dhoondho Account</div>
                </div>
                <a href="#/vendor" class="avatar-dropdown-item">${t("myAccount")}</a>
                <a href="#/vendor" class="avatar-dropdown-item">${t("myListings")}</a>
                <a href="#/dashboard" class="avatar-dropdown-item">📊 My Dashboard</a>
                <div style="height:1px;background:#f0f0f0;margin:4px 0"></div>
                <a href="#" id="dropdown-logout" class="avatar-dropdown-item" style="color:#d32f2f">${t("signOut")}</a>
              ` : `
                <a href="#" id="dropdown-login" class="avatar-dropdown-item">${t("signIn")}</a>
                <a href="#/vendor" class="avatar-dropdown-item">${t("forBusinesses")}</a>
                <a href="#/about" class="avatar-dropdown-item">${t("aboutDhoondho")}</a>
              `}
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Hero -->
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;padding:0 24px 48px">

        <!-- Logo -->
        <div style="margin-top:16px;margin-bottom:4px;text-align:center;line-height:1">
          ${DHOONDHO_LOGO}
        </div>
        <div style="font-size:15px;color:#5f6368;margin-bottom:24px;font-weight:400;letter-spacing:0.2px;text-align:center">${t("tagline")}</div>

        <!-- Location Banner -->
        <div id="location-banner"></div>

        <!-- Search bar -->
        <div style="width:100%;max-width:560px;position:relative;margin-bottom:20px">
          <div id="home-search-box" class="dhoondho-search-box" style="display:flex;align-items:center;border:1px solid #dfe1e5;border-radius:28px;padding:10px 16px;gap:10px;background:#fff;transition:box-shadow 0.2s">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              id="home-search-input"
              type="text"
              placeholder="${escapeHtml$2(t("searchPlaceholder"))}"
              style="flex:1;border:none;outline:none;font-size:16px;color:#202124;background:transparent;min-width:0"
            />
            <button id="home-loc-btn" title="${escapeHtml$2(t("nearby"))}" style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;color:#5f6368">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></svg>
            </button>
            <div style="width:1px;height:24px;background:#dfe1e5"></div>
            <button id="home-mic-btn" title="${escapeHtml$2(t("search"))}" style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4285F4" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </button>
          </div>
          <div id="home-autocomplete" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid #dfe1e5;border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,0.12);z-index:100;overflow:hidden"></div>
        </div>

        <!-- Horizontal Action Buttons: Search | Map | Nearby Now -->
        <div class="action-buttons">
          <button id="home-search-btn" class="action-btn">${t("search")}</button>
          <button id="home-map-btn" class="action-btn">${t("map")}</button>
          <button id="home-nearby-btn" class="action-btn action-btn-nearby">
            <span style="display:inline-flex;align-items:center;gap:8px">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>
              ${t("nearby")}
            </span>
          </button>
        </div>

        <!-- Language links -->
        <div style="text-align:center;max-width:540px;margin-bottom:36px">
          <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span style="font-size:13px;color:#202124">${t("offeredIn")}</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:4px 8px">
            <a class="lang-link-home${currentLang2 === "en" ? " active-lang" : ""}" data-lang="en">English</a>
            ${LANGUAGES.map(
    (lang) => `<a class="lang-link-home${currentLang2 === lang.code ? " active-lang" : ""}" data-lang="${lang.code}">${lang.name}</a>`
  ).join(" ")}
          </div>
        </div>

        <!-- Browse Categories -->
        <div style="width:100%;max-width:640px">
          <div style="text-align:center;font-size:11px;font-weight:700;letter-spacing:2px;color:#9aa0a6;margin-bottom:20px">${t("categories")}</div>
          <div class="cat-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
            ${CATEGORIES.map(
    (cat) => `
              <a href="#/search?category=${encodeURIComponent(cat.name)}" class="cat-card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 8px 14px;border-radius:16px;text-decoration:none;background:${cat.bg};min-height:100px">
                <span style="font-size:28px;margin-bottom:8px;line-height:1">${cat.icon}</span>
                <span style="font-size:12px;font-weight:500;color:#3c4043;text-align:center;line-height:1.3">${escapeHtml$2(cat.name)}</span>
              </a>
            `
  ).join("")}
          </div>
        </div>

        <!-- Trending Now -->
        <div style="width:100%;max-width:640px;margin-top:32px">
          <div style="text-align:center;font-size:11px;font-weight:700;letter-spacing:2px;color:#9aa0a6;margin-bottom:14px">TRENDING NOW 🔥</div>
          <div id="trending-chips" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
            ${getTrendingSearches().map(
    (term) => `<a href="#/search?q=${encodeURIComponent(term)}" style="display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e8eaed;border-radius:99px;font-size:13px;font-weight:500;color:#202124;text-decoration:none;box-shadow:0 1px 4px rgba(0,0,0,0.06)">🔍 ${escapeHtml$2(term)}</a>`
  ).join("")}
          </div>
        </div>

        <!-- Share Dhoondho Widget -->
        <div class="share-widget" style="width:100%;max-width:640px;margin-top:32px;background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border-radius:16px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:nowrap">
          <div>
            <div style="font-size:14px;font-weight:700;color:#1a7a3c">Share Dhoondho with friends 🤝</div>
            <div style="font-size:12px;color:#5f6368;margin-top:2px">Help others discover local businesses</div>
          </div>
          <button id="share-dhoondho-btn" style="padding:10px 20px;background:#1a7a3c;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;flex-shrink:0;margin-left:auto">Share Now</button>
        </div>

      </div>

    ${renderPageFooter()}

    </div>
  `;
  langUnsubscribe = onLanguageChange(() => {
    renderHomePage();
  });
  attachHomeEvents();
  initLocationSystem({
    onLocationDetected: (loc) => {
      userLocation = {
        lat: loc.lat,
        lng: loc.lng,
        city: loc.city,
        state: loc.state
      };
      updateLocationBanner("detected");
    },
    onLocationChanged: (loc) => {
      userLocation = {
        lat: loc.lat,
        lng: loc.lng,
        city: loc.city,
        state: loc.state
      };
      updateLocationBanner("detected");
    },
    onDenied: () => updateLocationBanner("denied"),
    enableWatch: true
  });
  initAIAssistant();
}
function attachHomeEvents(_authed) {
  var _a3, _b2, _c, _d, _e, _f, _g, _h;
  const input = document.getElementById(
    "home-search-input"
  );
  const autocomplete = document.getElementById("home-autocomplete");
  function doSearch() {
    const q2 = input == null ? void 0 : input.value.trim();
    if (q2) {
      try {
        const raw = localStorage.getItem("dhoondho_search_history");
        const hist = raw ? JSON.parse(raw) : [];
        const filtered = hist.filter((h2) => h2.query !== q2);
        filtered.unshift({ query: q2, time: Date.now() });
        localStorage.setItem(
          "dhoondho_search_history",
          JSON.stringify(filtered.slice(0, 10))
        );
      } catch {
      }
      const city = (userLocation == null ? void 0 : userLocation.city) || "";
      if (city) {
        window.location.hash = `#/search?q=${encodeURIComponent(q2)}&city=${encodeURIComponent(city)}`;
      } else {
        window.location.hash = `#/search?q=${encodeURIComponent(q2)}`;
      }
    } else {
      window.location.hash = "#/search";
    }
  }
  function doNearby() {
    if (userLocation) {
      window.location.hash = `#/search?lat=${userLocation.lat}&lng=${userLocation.lng}`;
      return;
    }
    if (!navigator.geolocation) {
      alert(t("geolocationNotSupported"));
      return;
    }
    updateLocationBanner("detecting");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const { city, state } = await reverseGeocode(latitude, longitude);
        userLocation = { lat: latitude, lng: longitude, city, state };
        cacheLocation(userLocation);
        window.location.hash = `#/search?lat=${latitude}&lng=${longitude}`;
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          updateLocationBanner("denied");
        } else {
          alert(t("couldNotGetLocation"));
        }
      },
      { enableHighAccuracy: true, timeout: 1e4 }
    );
  }
  const SUGGESTIONS = [
    "Plumber",
    "Electrician",
    "Doctor",
    "Restaurant",
    "Salon",
    "AC Repair",
    "Carpenter",
    "Painter",
    "Gym",
    "Chemist",
    "School",
    "Hotel",
    "Catering",
    "Event Planner",
    "Tutor",
    "Mechanic",
    "Dentist",
    "Lawyer",
    "CA / Accountant",
    "Interior Designer"
  ];
  const CITIES = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Indore"
  ];
  input == null ? void 0 : input.addEventListener("input", () => {
    const val = input.value.trim().toLowerCase();
    if (!val || !autocomplete) {
      if (autocomplete) autocomplete.style.display = "none";
      return;
    }
    const matches = [
      ...SUGGESTIONS.filter((s2) => s2.toLowerCase().includes(val)),
      ...CITIES.filter((c2) => c2.toLowerCase().startsWith(val))
    ].slice(0, 6);
    if (!matches.length) {
      autocomplete.style.display = "none";
      return;
    }
    autocomplete.style.display = "block";
    autocomplete.innerHTML = matches.map(
      (m2) => `<div class="ac-item" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:14px;color:#202124"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>${m2}</div>`
    ).join("");
    for (const item of autocomplete.querySelectorAll(".ac-item")) {
      item.addEventListener("mousedown", () => {
        input.value = item.innerText.trim();
        autocomplete.style.display = "none";
        doSearch();
      });
    }
  });
  input == null ? void 0 : input.addEventListener("focus", () => {
    const val = input.value.trim();
    if (!val && autocomplete) {
      try {
        const raw = localStorage.getItem("dhoondho_search_history");
        const hist = raw ? JSON.parse(raw) : [];
        if (hist.length > 0) {
          autocomplete.style.display = "block";
          autocomplete.innerHTML = hist.slice(0, 5).map(
            (h2) => `<div class="ac-item" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:14px;color:#202124"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${h2.query}</div>`
          ).join("");
          for (const item of autocomplete.querySelectorAll(".ac-item")) {
            item.addEventListener("mousedown", () => {
              input.value = item.innerText.trim();
              autocomplete.style.display = "none";
              doSearch();
            });
          }
        }
      } catch {
      }
    }
  });
  input == null ? void 0 : input.addEventListener("blur", () => {
    setTimeout(() => {
      if (autocomplete) autocomplete.style.display = "none";
    }, 150);
  });
  input == null ? void 0 : input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });
  (_a3 = document.getElementById("home-search-btn")) == null ? void 0 : _a3.addEventListener("click", doSearch);
  (_b2 = document.getElementById("home-map-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    if (userLocation) {
      window.location.hash = `#/search?lat=${userLocation.lat}&lng=${userLocation.lng}&view=map`;
    } else {
      window.location.hash = "#/search?view=map";
    }
  });
  (_c = document.getElementById("home-nearby-btn")) == null ? void 0 : _c.addEventListener("click", doNearby);
  const micBtn = document.getElementById("home-mic-btn");
  if (micBtn) {
    initVoiceSearch({
      inputEl: input,
      micBtn,
      onResult: () => doSearch()
    });
  }
  (_d = document.getElementById("home-loc-btn")) == null ? void 0 : _d.addEventListener("click", doNearby);
  (_e = document.getElementById("share-dhoondho-btn")) == null ? void 0 : _e.addEventListener("click", () => {
    const shareData = {
      title: "Dhoondho.App",
      text: "Find local businesses near you across India! Try Dhoondho – India's local search engine.",
      url: "https://dhoondho.app"
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {
      });
    } else {
      navigator.clipboard.writeText("https://dhoondho.app").then(() => {
        const btn = document.getElementById("share-dhoondho-btn");
        if (btn) {
          btn.textContent = "✓ Link Copied!";
          setTimeout(() => {
            btn.textContent = "Share Now";
          }, 2e3);
        }
      });
    }
  });
  (_f = document.getElementById("home-login-btn")) == null ? void 0 : _f.addEventListener("click", async () => {
    await login();
    await renderHomePage();
  });
  const avatar = document.getElementById("home-avatar");
  const dropdown = document.getElementById("avatar-dropdown");
  if (avatar && dropdown) {
    avatar.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });
    const closeDrop = (e) => {
      if (dropdown && !dropdown.contains(e.target) && e.target !== avatar) {
        dropdown.style.display = "none";
      }
    };
    if (document._dhoondhoDropClose) {
      document.removeEventListener(
        "click",
        document._dhoondhoDropClose
      );
    }
    document._dhoondhoDropClose = closeDrop;
    document.addEventListener("click", closeDrop);
  }
  (_g = document.getElementById("dropdown-logout")) == null ? void 0 : _g.addEventListener("click", async (e) => {
    e.preventDefault();
    await logout();
    await renderHomePage();
  });
  (_h = document.getElementById("dropdown-login")) == null ? void 0 : _h.addEventListener("click", async (e) => {
    e.preventDefault();
    await login();
    await renderHomePage();
  });
  for (const el of document.querySelectorAll("[data-lang]")) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = el.dataset.lang;
      if (lang) setLanguage(lang);
    });
  }
}
function renderHowItWorksPage() {
  document.title = "How It Works - Dhoondho.App";
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = `
    <div id="navbar-container"></div>
    <main id="main-content" style="flex:1">
      <!-- Hero -->
      <section style="background:linear-gradient(135deg,#1a7a3c 0%,#0d4f26 100%);color:#fff;padding:60px 24px 48px">
        <div style="max-width:800px;margin:0 auto;text-align:center">
          <h1 style="font-size:clamp(28px,5vw,44px);font-weight:800;margin-bottom:12px">How Dhoondho Works</h1>
          <p style="font-size:clamp(15px,2.5vw,18px);opacity:0.9;max-width:560px;margin:0 auto">India&rsquo;s smartest local search engine &mdash; connecting people with trusted local businesses instantly.</p>
        </div>
      </section>

      <!-- Steps -->
      <section style="max-width:900px;margin:0 auto;padding:48px 24px">

        <!-- How Users Search -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#e8f5e9;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">🔍</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#1a7a3c;margin-bottom:8px">1. How Users Search</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">Users simply type a service or business name (e.g. <em>&quot;plumber in Delhi&quot;</em> or <em>&quot;salon near me&quot;</em>) into the Dhoondho search bar. The platform instantly returns nearby businesses on an interactive map along with a ranked list.</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>Search by city, neighbourhood, or GPS &ldquo;Nearby Now&rdquo;</li>
              <li>Filter by category: Plumbing, Food, Healthcare, Education &amp; more</li>
              <li>Voice search available in Indian accents (en-IN)</li>
              <li>Results shown on live map with pin markers</li>
              <li>One tap to call, get directions, or book</li>
            </ul>
          </div>
        </div>

        <!-- How Vendors List -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#fff3e0;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">🏪</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#e65100;margin-bottom:8px">2. How Vendors List Their Business</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">Any business owner can register on Dhoondho for free using Internet Identity (secure, password-free login). Once registered:</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>Create a detailed business listing (name, category, address, phone, hours)</li>
              <li>Upload photos and business documents for verification</li>
              <li>Manage availability, pricing, and services from the Vendor Dashboard</li>
              <li>Receive customer enquiries and booking requests directly</li>
              <li>Upgrade to Featured listing for higher visibility</li>
            </ul>
          </div>
        </div>

        <!-- How Admin Approves -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#e8eaf6;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">🛡️</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#3949ab;margin-bottom:8px">3. How Admin Approves &amp; Manages</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">A dedicated admin panel gives platform administrators full control over quality and safety:</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>Review and approve/reject new business submissions</li>
              <li>Verify uploaded documents (GST, PAN, Aadhaar, FSSAI)</li>
              <li>Handle user complaints, edit suggestions, and ownership claims</li>
              <li>Monitor platform analytics: users, listings, searches, revenue</li>
              <li>Manage feature toggles, search rankings, and ad campaigns</li>
              <li>Support ticket system to resolve user and vendor issues</li>
            </ul>
          </div>
        </div>

        <!-- How Platform Works -->
        <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap">
          <div style="background:#fce4ec;border-radius:50%;width:64px;height:64px;min-width:64px;display:flex;align-items:center;justify-content:center;font-size:28px">⚙️</div>
          <div style="flex:1;min-width:240px">
            <h2 style="font-size:22px;font-weight:700;color:#c62828;margin-bottom:8px">4. How the Platform Works</h2>
            <p style="color:#444;line-height:1.7;margin-bottom:8px">Dhoondho is built on the <strong>Internet Computer (ICP)</strong> blockchain &mdash; a decentralised, tamper-proof, always-on infrastructure:</p>
            <ul style="color:#555;line-height:1.8;padding-left:20px">
              <li>All data stored permanently on-chain &mdash; no central server to hack</li>
              <li>Internet Identity login &mdash; no passwords, no data leaks</li>
              <li>Supports 10 Indian languages with real-time UI switching</li>
              <li>GPS + map integration (Leaflet + OpenStreetMap)</li>
              <li>PWA support &mdash; installable like a native app on any phone</li>
              <li>AI Assistant answers local search queries inline</li>
            </ul>
          </div>
        </div>

        <!-- Benefits -->
        <div style="background:#f1f8e9;border-radius:16px;padding:32px;margin-bottom:48px">
          <h2 style="font-size:24px;font-weight:700;color:#2e7d32;margin-bottom:20px;text-align:center">5. Who Benefits &amp; How</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">
            <div style="background:#fff;border-radius:12px;padding:20px;border-left:4px solid #1a7a3c">
              <h3 style="font-weight:700;color:#1a7a3c;margin-bottom:8px">👥 For People (Users)</h3>
              <ul style="color:#555;line-height:1.8;padding-left:16px;font-size:14px">
                <li>Find verified local services in seconds</li>
                <li>Read authentic reviews from real customers</li>
                <li>Compare options on the map before calling</li>
                <li>Book appointments or request callbacks instantly</li>
                <li>Save favourites and search history</li>
                <li>Works in your language &mdash; Hindi, Tamil, Telugu &amp; more</li>
              </ul>
            </div>
            <div style="background:#fff;border-radius:12px;padding:20px;border-left:4px solid #e65100">
              <h3 style="font-weight:700;color:#e65100;margin-bottom:8px">🏢 For Businesses (Vendors)</h3>
              <ul style="color:#555;line-height:1.8;padding-left:16px;font-size:14px">
                <li>Free listing &mdash; no commission on leads</li>
                <li>Get discovered by thousands of local customers</li>
                <li>Manage your profile, photos, and hours anytime</li>
                <li>Receive direct bookings and enquiries</li>
                <li>Featured listings drive 3&times; more visibility</li>
                <li>Build credibility with verified badges</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;padding:32px 0">
          <a href="#/" style="display:inline-block;background:#1a7a3c;color:#fff;font-weight:700;font-size:16px;padding:14px 36px;border-radius:999px;text-decoration:none;margin:8px">Start Searching</a>
          <a href="#/vendor" style="display:inline-block;background:#e65100;color:#fff;font-weight:700;font-size:16px;padding:14px 36px;border-radius:999px;text-decoration:none;margin:8px">List Your Business</a>
        </div>
      </section>

      <div id="footer-container"></div>
    </main>
  `;
  renderNavbar();
  renderFooter();
  initFooterReactivity();
}
function isOpenNow(hours) {
  if (!hours || hours.trim() === "") return false;
  const h2 = hours.trim().toLowerCase();
  if (h2 === "24/7" || h2 === "open 24/7" || h2 === "always open") return true;
  const now = /* @__PURE__ */ new Date();
  const dayIndex = now.getDay();
  const DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayAbbr = DAY_NAMES[dayIndex];
  const segments = h2.split(",").map((s2) => s2.trim());
  for (const seg of segments) {
    const colonIdx = seg.indexOf(":");
    if (colonIdx === -1) continue;
    const dayPart = seg.slice(0, colonIdx).trim();
    const timePart = seg.slice(colonIdx + 1).trim();
    if (!dayMatchesToday(dayPart, todayAbbr, DAY_NAMES)) continue;
    const dashIdx = timePart.indexOf(" - ");
    if (dashIdx === -1) continue;
    const openMins = parseTimeMins(timePart.slice(0, dashIdx).trim());
    const closeMins = parseTimeMins(timePart.slice(dashIdx + 3).trim());
    const nowMins = now.getHours() * 60 + now.getMinutes();
    if (openMins !== null && closeMins !== null) {
      if (openMins <= closeMins) {
        if (nowMins >= openMins && nowMins < closeMins) return true;
      } else {
        if (nowMins >= openMins || nowMins < closeMins) return true;
      }
    }
  }
  return false;
}
function dayMatchesToday(dayPart, todayAbbr, DAY_NAMES) {
  if (dayPart === "daily" || dayPart === "everyday" || dayPart === "all days")
    return true;
  const rangeMatch = dayPart.match(/^([a-z]+)-([a-z]+)$/);
  if (rangeMatch) {
    const startIdx = DAY_NAMES.findIndex((d2) => d2.startsWith(rangeMatch[1]));
    const endIdx = DAY_NAMES.findIndex((d2) => d2.startsWith(rangeMatch[2]));
    const todayIdx = DAY_NAMES.indexOf(todayAbbr);
    if (startIdx !== -1 && endIdx !== -1 && todayIdx !== -1) {
      if (startIdx <= endIdx) return todayIdx >= startIdx && todayIdx <= endIdx;
      return todayIdx >= startIdx || todayIdx <= endIdx;
    }
  }
  return dayPart.startsWith(todayAbbr);
}
function parseTimeMins(str) {
  const m2 = str.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!m2) return null;
  let hours = Number.parseInt(m2[1], 10);
  const mins = m2[2] ? Number.parseInt(m2[2], 10) : 0;
  const ampm = m2[3].toLowerCase();
  if (ampm === "pm" && hours !== 12) hours += 12;
  if (ampm === "am" && hours === 12) hours = 0;
  return hours * 60 + mins;
}
function getStatusBadge(hours) {
  if (!hours || hours.trim() === "") return "";
  const open = isOpenNow(hours);
  if (open) {
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:#e8f5e9;color:#2e7d32;border:1px solid #a5d6a7"><span style="width:6px;height:6px;border-radius:50%;background:#43a047;display:inline-block"></span>Open Now</span>`;
  }
  return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:#ffebee;color:#c62828;border:1px solid #ef9a9a"><span style="width:6px;height:6px;border-radius:50%;background:#ef5350;display:inline-block"></span>Closed</span>`;
}
function isVerifiedListing$1(id) {
  try {
    const ids = JSON.parse(
      localStorage.getItem("dhoondho_verified_listings") || "[]"
    );
    return ids.includes(id);
  } catch {
    return false;
  }
}
function getPriceRangeBadge$1(tier) {
  if (!tier) return "";
  const n = Number(tier);
  const symbol = n === 1 ? "₹" : n === 2 ? "₹₹" : n === 3 ? "₹₹₹" : "";
  if (!symbol) return "";
  return `<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:#fff8e1;color:#f57f17;border:1px solid #ffe082">${symbol}</span>`;
}
const PLACEHOLDER_PHOTOS = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=300&fit=crop"
];
function renderPhotoGallery() {
  return `
    <div class="detail-card p-4 sm:p-6 mb-4">
      <h3 class="font-semibold text-sm mb-3" style="color:oklch(var(--foreground))">Photos</h3>
      <div id="photo-gallery" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin">
        ${PLACEHOLDER_PHOTOS.map((src, i) => `<img data-photo-index="${i}" src="${src}" alt="Business photo ${i + 1}" style="width:120px;height:90px;object-fit:cover;border-radius:10px;cursor:pointer;flex-shrink:0;transition:opacity 0.15s" loading="lazy" />`).join("")}
      </div>
    </div>
    <div id="photo-lightbox" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:10000;align-items:center;justify-content:center">
      <button id="lb-prev" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;width:48px;height:48px;border-radius:50%;cursor:pointer">&#8249;</button>
      <img id="lb-img" src="" alt="Photo" style="max-width:90vw;max-height:85vh;border-radius:12px;object-fit:contain" />
      <button id="lb-next" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;width:48px;height:48px;border-radius:50%;cursor:pointer">&#8250;</button>
      <button id="lb-close" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:22px;width:40px;height:40px;border-radius:50%;cursor:pointer">×</button>
    </div>
  `;
}
function escapeHtml$1(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
let detailMap = null;
function initDetailMap(listing) {
  const container = document.getElementById("detail-map");
  if (!container) return;
  if (detailMap) {
    try {
      detailMap.remove();
    } catch {
    }
    detailMap = null;
  }
  try {
    detailMap = L.map(container, {
      center: [listing.location.lat, listing.location.lng],
      zoom: 15,
      zoomControl: true
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(detailMap);
    const marker = L.marker([listing.location.lat, listing.location.lng]);
    marker.bindPopup(
      `<strong>${escapeHtml$1(listing.name)}</strong><br/>${escapeHtml$1(listing.address)}`
    ).openPopup();
    marker.addTo(detailMap);
    setTimeout(() => {
      if (detailMap) detailMap.invalidateSize();
    }, 100);
  } catch {
  }
}
async function renderListingPage(id) {
  var _a3, _b2;
  const main = document.getElementById("main-content");
  if (!main) return;
  if (detailMap) {
    try {
      detailMap.remove();
    } catch {
    }
    detailMap = null;
  }
  main.innerHTML = `<div class="max-w-4xl mx-auto px-4 py-12 text-center"><div class="inline-block w-8 h-8 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div></div>`;
  let listing;
  try {
    const { getCachedListings: getCachedListings2 } = await __vitePreload(async () => {
      const { getCachedListings: getCachedListings3 } = await Promise.resolve().then(() => search);
      return { getCachedListings: getCachedListings3 };
    }, true ? void 0 : void 0);
    const cached = getCachedListings2();
    const found = cached.find((l) => String(l.id) === id);
    if (found) listing = found;
  } catch {
  }
  if (!listing) {
    try {
      const raw = sessionStorage.getItem("dhoondho_listing_cache");
      if (raw) {
        const cached = JSON.parse(raw);
        const found = cached.find((l) => String(l.id) === id);
        if (found) {
          listing = {
            ...found,
            id: BigInt(found.id),
            categoryId: BigInt(found.categoryId),
            createdTime: BigInt(found.createdTime || "0")
          };
        }
      }
    } catch {
    }
  }
  if (!listing) {
    try {
      const backend2 = await getBackend();
      const all = await backend2.searchListingsByCity("");
      const found = all.find((l) => String(l.id) === id);
      if (found) {
        listing = {
          id: found.id,
          name: found.name,
          categoryId: found.categoryId,
          status: String(found.status),
          city: found.city,
          state: found.state,
          address: found.address,
          phone: found.phone,
          website: found.website,
          description: found.description,
          photoIds: found.photoIds,
          createdTime: found.createdTime,
          location: found.location
        };
      }
      if (!listing) {
        const cities = [
          "",
          "Delhi",
          "Mumbai",
          "Bangalore",
          "Chennai",
          "Hyderabad",
          "Pune",
          "Kolkata",
          "Faridabad",
          "Noida",
          "Gurgaon"
        ];
        for (const city of cities) {
          const byCity = await backend2.searchListingsByCity(city);
          const match = byCity.find((l) => String(l.id) === id);
          if (match) {
            listing = {
              id: match.id,
              name: match.name,
              categoryId: match.categoryId,
              status: String(match.status),
              city: match.city,
              state: match.state,
              address: match.address,
              phone: match.phone,
              website: match.website,
              description: match.description,
              photoIds: match.photoIds,
              createdTime: match.createdTime,
              location: match.location
            };
            break;
          }
        }
      }
    } catch {
    }
  }
  if (!listing) {
    listing = SAMPLE_LISTINGS.find((l) => String(l.id) === id);
  }
  if (!listing) {
    main.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-20 text-center">
        <div class="text-5xl mb-4">🔍</div>
        <h2 class="text-2xl font-bold mb-3" style="color:oklch(var(--foreground))">Listing Not Found</h2>
        <p class="mb-6" style="color:oklch(var(--muted-foreground))">The business listing you're looking for doesn't exist.</p>
        <a href="#/search" data-ocid="listing.link" class="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white no-underline" style="background:oklch(var(--primary))">Back to Search</a>
      </div>
    `;
    return;
  }
  const category = SAMPLE_CATEGORIES.find((c2) => c2.id === listing.categoryId);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${listing.location.lat},${listing.location.lng}`;
  const isFavorited = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("dhoondho_favorites") || "[]"
      ).includes(String(listing.id));
    } catch {
      return false;
    }
  })();
  main.innerHTML = `
    <style>
      .listing-detail-page { padding-bottom: 80px; }
      @media (min-width: 768px) { .listing-detail-page { padding-bottom: 24px; } }
      .detail-card { background:#fff; border-radius:16px; border:1px solid oklch(var(--border)); }
      .detail-action-btn {
        display:flex; align-items:center; gap:10px;
        padding:13px 16px; border-radius:12px;
        font-size:14px; font-weight:600;
        width:100%; text-align:left; cursor:pointer;
        transition:opacity 0.15s;
      }
      .detail-action-btn:active { opacity:0.75; }
      .detail-action-btn.primary { background:oklch(var(--primary)); color:#fff; border:none; }
      .detail-action-btn.outline-primary { background:transparent; border:1.5px solid oklch(var(--primary)); color:oklch(var(--primary)); }
      .detail-action-btn.outline { background:transparent; border:1.5px solid oklch(var(--border)); color:oklch(var(--foreground)); }
      .bottom-cta-bar {
        position:fixed; bottom:0; left:0; right:0;
        background:#fff; border-top:1px solid oklch(var(--border));
        padding:10px 16px 14px; z-index:100;
        display:flex; gap:10px;
        box-shadow:0 -2px 12px rgba(0,0,0,0.08);
      }
      @media (min-width: 768px) { .bottom-cta-bar { display:none !important; } }
      .bottom-cta-btn {
        flex:1; padding:12px; border-radius:12px;
        font-size:15px; font-weight:700;
        border:none; cursor:pointer;
        display:flex; align-items:center; justify-content:center; gap:6px;
      }
      .mobile-action-grid {
        display:grid; grid-template-columns:1fr 1fr; gap:8px;
      }
      @media (min-width: 640px) { .mobile-action-grid { grid-template-columns:repeat(4,1fr); } }
      .mini-action-btn {
        display:flex; align-items:center; justify-content:center; gap:6px;
        padding:10px 12px; border-radius:10px; font-size:12px; font-weight:600;
        border:1px solid oklch(var(--border)); background:#fff; cursor:pointer;
        color:oklch(var(--muted-foreground)); transition:background 0.15s;
        white-space:nowrap;
      }
      .mini-action-btn:active { background:#f5f5f5; }
      .mini-action-btn.danger { color:#dc2626; border-color:#fecaca; }
      #detail-map { height:240px; }
      @media (min-width: 768px) { #detail-map { height:340px; } }
    </style>

    <div class="listing-detail-page">
      <div class="max-w-4xl mx-auto px-3 sm:px-5 lg:px-8 pt-5 pb-6">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-1.5 text-xs sm:text-sm mb-4 overflow-x-auto whitespace-nowrap pb-1" style="color:oklch(var(--muted-foreground))">
          <a href="#/" data-ocid="listing.link" class="no-underline hover:underline flex-shrink-0" style="color:oklch(var(--primary))">Home</a>
          <span class="flex-shrink-0">/</span>
          <a href="#/search" data-ocid="listing.link" class="no-underline hover:underline flex-shrink-0" style="color:oklch(var(--primary))">Search</a>
          <span class="flex-shrink-0">/</span>
          <span class="truncate">${escapeHtml$1(listing.name)}</span>
        </nav>

        <!-- Business Header Card -->
        <div class="detail-card p-4 sm:p-6 mb-4">
          <div class="flex items-start gap-3 sm:gap-4 mb-4">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0" style="background:oklch(var(--secondary))">${category ? category.icon : "🏢"}</div>
            <div class="flex-1 min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold mb-1.5 leading-tight" style="color:oklch(var(--foreground))">${escapeHtml$1(listing.name)}</h1>
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium" style="background:oklch(var(--secondary));color:oklch(var(--secondary-foreground))">
                  ${category ? `${category.icon} ${escapeHtml$1(category.name)}` : "Business"}
                </span>
                ${isVerifiedListing$1(String(listing.id)) ? `<span class="px-2 py-0.5 rounded-full text-xs font-semibold" style="background:#e3f2fd;color:#1565c0">✓ Verified</span>` : ""}
                ${getPriceRangeBadge$1(listing.priceRange)}
                ${listing.businessHours ? getStatusBadge(listing.businessHours) : ""}
              </div>
            </div>
          </div>

          <div class="space-y-2.5 mb-4">
            <div class="flex items-start gap-2.5">
              <svg class="flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="text-sm" style="color:oklch(var(--foreground))">${escapeHtml$1(listing.address)}, ${escapeHtml$1(listing.city)}, ${escapeHtml$1(listing.state)}</span>
            </div>
            ${listing.phone ? `<div class="flex items-center gap-2.5">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:${escapeHtml$1(listing.phone)}" class="text-sm font-semibold no-underline" style="color:oklch(var(--primary))">${escapeHtml$1(listing.phone)}</a>
            </div>` : ""}
            ${listing.website ? `<div class="flex items-center gap-2.5">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <a href="${((_a3 = listing.website) == null ? void 0 : _a3.startsWith("http")) ? listing.website : listing.website ? `https://${listing.website}` : "#"}" target="_blank" rel="noopener" class="text-sm font-medium no-underline truncate max-w-xs" style="color:oklch(var(--primary))">${escapeHtml$1(listing.website)}</a>
            </div>` : ""}
          </div>

          ${listing.businessHours ? `<div class="flex items-center gap-2.5">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span class="text-sm" style="color:oklch(var(--foreground))">${escapeHtml$1(listing.businessHours)}</span>
            </div>` : ""}

          ${listing.description ? `<div class="border-t pt-4" style="border-color:oklch(var(--border))">
            <h3 class="font-semibold text-sm mb-1.5" style="color:oklch(var(--foreground))">About</h3>
            <p class="text-sm leading-relaxed" style="color:oklch(var(--muted-foreground))">${escapeHtml$1(listing.description)}</p>
          </div>` : ""}
        </div>

        ${renderPhotoGallery()}

        <!-- Main grid: actions + map on mobile stacked, sidebar on desktop -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <!-- Left/Main column -->
          <div class="lg:col-span-2 space-y-4">

            <!-- Mobile Quick Actions (hidden on lg, shown on sidebar instead) -->
            <div class="detail-card p-4 lg:hidden">
              <h3 class="font-semibold text-sm mb-3" style="color:oklch(var(--foreground))">Quick Actions</h3>
              <div class="grid grid-cols-2 gap-2 mb-2">
                ${listing.phone ? `<a href="tel:${escapeHtml$1(listing.phone)}" data-ocid="listing.button" class="detail-action-btn primary no-underline" style="justify-content:center;text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Now
                </a>` : ""}
                <button id="book-btn-mobile" data-ocid="listing.button" class="detail-action-btn outline-primary" style="justify-content:center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Now
                </button>
                <button id="contact-btn-mobile" data-ocid="listing.button" class="detail-action-btn outline" style="justify-content:center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Callback
                </button>
                <a href="${mapsUrl}" target="_blank" rel="noopener" data-ocid="listing.link" class="detail-action-btn outline no-underline" style="justify-content:center;text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                  Directions
                </a>
              </div>
              <button id="save-listing-btn" data-id="${listing.id}" data-ocid="listing.button" class="detail-action-btn outline w-full" style="justify-content:center">
                <span id="save-heart-icon">${isFavorited ? "❤️" : "🤍"}</span>
                <span id="save-label">${isFavorited ? "Saved" : "Save Listing"}</span>
              </button>
            </div>

            <!-- Map -->
            <div class="detail-card overflow-hidden">
              <div class="px-4 py-3 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
                <h3 class="font-semibold text-sm" style="color:oklch(var(--foreground))">Location on Map</h3>
                <a href="${mapsUrl}" target="_blank" rel="noopener" class="text-xs font-medium no-underline" style="color:oklch(var(--primary))">Open in Google Maps ↗</a>
              </div>
              <div id="detail-map"></div>
            </div>
          </div>

          <!-- Desktop Sidebar -->
          <div class="hidden lg:flex flex-col gap-4">
            <div class="detail-card p-5">
              <h3 class="font-semibold mb-4" style="color:oklch(var(--foreground))">Quick Actions</h3>
              <div class="space-y-2.5">
                ${listing.phone ? `<a href="tel:${escapeHtml$1(listing.phone)}" data-ocid="listing.button" class="detail-action-btn primary no-underline" style="text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Now
                </a>` : ""}
                <button id="contact-btn" data-ocid="listing.button" class="detail-action-btn outline-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Request Callback
                </button>
                <button id="book-btn" data-ocid="listing.button" class="detail-action-btn outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  📅 Book Now
                </button>
                <button id="save-listing-btn-desktop" data-id="${listing.id}" data-ocid="listing.button" class="detail-action-btn outline">
                  <span id="save-heart-icon-desktop">${isFavorited ? "❤️" : "🤍"}</span>
                  <span id="save-label-desktop">${isFavorited ? "Saved" : "Save Listing"}</span>
                </button>
                <a href="${mapsUrl}" target="_blank" rel="noopener" data-ocid="listing.link" class="detail-action-btn outline no-underline" style="text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                  Get Directions
                </a>
                ${listing.website ? `<a href="${((_b2 = listing.website) == null ? void 0 : _b2.startsWith("http")) ? listing.website : listing.website ? `https://${listing.website}` : "#"}" target="_blank" rel="noopener" data-ocid="listing.link" class="detail-action-btn outline no-underline" style="text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  Visit Website
                </a>` : ""}
              </div>
            </div>

            <div class="detail-card p-5">
              <h3 class="font-semibold mb-4" style="color:oklch(var(--foreground))">Details</h3>
              <dl class="space-y-3 text-sm">
                <div>
                  <dt class="font-medium mb-0.5" style="color:oklch(var(--muted-foreground))">Category</dt>
                  <dd style="color:oklch(var(--foreground))">${category ? `${category.icon} ${escapeHtml$1(category.name)}` : "Business"}</dd>
                </div>
                <div>
                  <dt class="font-medium mb-0.5" style="color:oklch(var(--muted-foreground))">City</dt>
                  <dd style="color:oklch(var(--foreground))">${escapeHtml$1(listing.city)}, ${escapeHtml$1(listing.state)}</dd>
                </div>
                <div>
                  <dt class="font-medium mb-0.5" style="color:oklch(var(--muted-foreground))">Status</dt>
                  <dd><span class="px-2 py-0.5 rounded-full text-xs font-semibold" style="background:oklch(0.9 0.12 145);color:oklch(0.35 0.12 145)">✓ Verified</span></dd>
                </div>
              </dl>
            </div>

            <a href="#/search?city=${escapeHtml$1(listing.city)}" data-ocid="listing.link" class="block text-center px-4 py-3 rounded-xl text-sm font-semibold border no-underline hover:bg-gray-50 transition-colors" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">
              More in ${escapeHtml$1(listing.city)} &rarr;
            </a>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="detail-card mt-4 p-4 sm:p-6">
          <h3 class="font-bold text-base sm:text-lg mb-5" style="color:oklch(var(--foreground))">⭐ Reviews</h3>
          <div id="reviews-list" class="mb-5"></div>
          <div class="border-t pt-5" style="border-color:oklch(var(--border))">
            <h4 class="font-semibold mb-3 text-sm" style="color:oklch(var(--foreground))">Write a Review</h4>
            <div id="star-rating" class="flex gap-2 mb-3" style="font-size:32px;cursor:pointer">
              <span class="star" data-val="1">☆</span>
              <span class="star" data-val="2">☆</span>
              <span class="star" data-val="3">☆</span>
              <span class="star" data-val="4">☆</span>
              <span class="star" data-val="5">☆</span>
            </div>
            <textarea id="review-text" rows="3" placeholder="Share your experience with this business..." class="w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none" style="border-color:oklch(var(--border));box-sizing:border-box"></textarea>
            <button id="submit-review-btn" data-ocid="listing.submit_button" class="mt-3 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style="background:oklch(var(--primary))">Submit Review</button>
          </div>
        </div>

        <!-- Q&A Section -->
        <div class="detail-card mt-4 p-4 sm:p-6">
          <h3 class="font-bold text-base sm:text-lg mb-5" style="color:oklch(var(--foreground))">💬 Questions &amp; Answers</h3>
          <div id="qa-list" class="mb-5"></div>
          <div class="border-t pt-4" style="border-color:oklch(var(--border))">
            <h4 class="font-semibold mb-3 text-sm" style="color:oklch(var(--foreground))">Ask a Question</h4>
            <input id="qa-input" type="text" placeholder="e.g. What are the working hours?" class="w-full px-3 py-2.5 rounded-xl border text-sm outline-none mb-3" style="border-color:oklch(var(--border));box-sizing:border-box" />
            <button id="qa-submit-btn" data-ocid="listing.submit_button" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style="background:oklch(var(--primary))">Ask Question</button>
          </div>
        </div>

        <!-- Secondary Actions Row -->
        <div class="mt-4 mobile-action-grid">
          <button id="suggest-edit-btn" data-ocid="listing.button" class="mini-action-btn">✏️ Suggest Edit</button>
          <button id="claim-listing-btn" data-ocid="listing.button" class="mini-action-btn">🏢 Claim Listing</button>
          <button id="share-listing-btn" data-ocid="listing.button" class="mini-action-btn">🔗 Share</button>
          <button id="report-listing-btn" data-ocid="listing.button" class="mini-action-btn danger">🚩 Report</button>
        </div>

        <!-- More in city link (mobile only) -->
        <a href="#/search?city=${escapeHtml$1(listing.city)}" data-ocid="listing.link" class="lg:hidden block text-center px-4 py-3 mt-4 rounded-xl text-sm font-semibold border no-underline" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">
          More in ${escapeHtml$1(listing.city)} &rarr;
        </a>

      </div>
    </div>

    <!-- Sticky bottom CTA bar (mobile only) -->
    <div class="bottom-cta-bar">
      ${listing.phone ? `<a href="tel:${escapeHtml$1(listing.phone)}" data-ocid="listing.button" class="bottom-cta-btn no-underline" style="background:oklch(var(--primary));color:#fff;text-decoration:none">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Call Now
      </a>` : ""}
      <button id="book-btn-cta" data-ocid="listing.button" class="bottom-cta-btn" style="background:${listing.phone ? "oklch(var(--secondary))" : "oklch(var(--primary))"};color:${listing.phone ? "oklch(var(--secondary-foreground))" : "#fff"}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Book Now
      </button>
    </div>
  `;
  renderFooter();
  initFooterReactivity();
  setTimeout(() => initDetailMap(listing), 100);
  attachListingEvents(String(listing.id));
}
function showModal(html) {
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.setAttribute("data-ocid", "listing.modal");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(2px);z-index:200;display:flex;align-items:flex-end;justify-content:center;padding:0";
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:20px 20px 0 0;padding:24px 20px 32px;width:100%;max-width:480px;box-shadow:0 -4px 40px rgba(0,0,0,0.15);max-height:90vh;overflow-y:auto">
      <div style="width:40px;height:4px;background:#e0e0e0;border-radius:2px;margin:0 auto 20px"></div>
      ${html}
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", esc);
    }
  });
  const mq = window.matchMedia("(min-width: 640px)");
  function applyStyle(matches) {
    overlay.style.alignItems = matches ? "center" : "flex-end";
    const inner = overlay.querySelector("div");
    if (inner) {
      inner.style.borderRadius = matches ? "20px" : "20px 20px 0 0";
      inner.style.padding = matches ? "28px" : "24px 20px 32px";
    }
  }
  applyStyle(mq.matches);
  mq.addEventListener("change", (e) => applyStyle(e.matches));
  return overlay;
}
function openBookingModal(listingId) {
  var _a3, _b2;
  const overlay = showModal(`
    <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">📅 Book Appointment</h3>
    <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Fill in your details to request a booking.</p>
    <form id="book-form">
      <input name="name" type="text" required placeholder="Your Name" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
      <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
      <input name="datetime" type="datetime-local" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box" />
      <div style="display:flex;gap:10px">
        <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Confirm Booking</button>
        <button type="button" id="close-book-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
      </div>
    </form>
  `);
  (_a3 = overlay.querySelector("#close-book-btn")) == null ? void 0 : _a3.addEventListener("click", () => overlay.remove());
  (_b2 = overlay.querySelector("#book-form")) == null ? void 0 : _b2.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const booking = {
      listingId,
      name: data.get("name"),
      phone: data.get("phone"),
      datetime: data.get("datetime"),
      time: Date.now()
    };
    try {
      const raw = localStorage.getItem("dhoondho_bookings");
      const bookings = raw ? JSON.parse(raw) : [];
      bookings.push(booking);
      localStorage.setItem("dhoondho_bookings", JSON.stringify(bookings));
    } catch {
    }
    overlay.remove();
    showToast(
      "Booking request sent! Vendor will confirm shortly. 📅",
      "success"
    );
  });
}
function openContactModal(listingId) {
  var _a3, _b2;
  const overlay = showModal(`
    <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">📞 Request Callback</h3>
    <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Leave your details and the vendor will contact you shortly.</p>
    <form id="lead-form">
      <input name="name" type="text" required placeholder="Your Name" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
      <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box" />
      <div style="display:flex;gap:10px">
        <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Send Request</button>
        <button type="button" id="close-modal-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
      </div>
    </form>
  `);
  (_a3 = overlay.querySelector("#close-modal-btn")) == null ? void 0 : _a3.addEventListener("click", () => overlay.remove());
  (_b2 = overlay.querySelector("#lead-form")) == null ? void 0 : _b2.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const lead = {
      listingId,
      name: data.get("name"),
      phone: data.get("phone"),
      time: Date.now()
    };
    try {
      const raw = localStorage.getItem("dhoondho_leads");
      const leads = raw ? JSON.parse(raw) : [];
      leads.push(lead);
      localStorage.setItem("dhoondho_leads", JSON.stringify(leads));
    } catch {
    }
    overlay.remove();
    showToast("Vendor will contact you shortly! ✓", "success");
  });
}
function toggleFavorite$1(listingId, heartIds, labelIds) {
  try {
    const raw = localStorage.getItem("dhoondho_favorites");
    const ids = raw ? JSON.parse(raw) : [];
    const idx = ids.indexOf(listingId);
    const isSaved = idx !== -1;
    if (!isSaved) ids.push(listingId);
    else ids.splice(idx, 1);
    localStorage.setItem("dhoondho_favorites", JSON.stringify(ids));
    for (const hid of heartIds) {
      const el = document.getElementById(hid);
      if (el) el.textContent = !isSaved ? "❤️" : "🤍";
    }
    for (const lid of labelIds) {
      const el = document.getElementById(lid);
      if (el) el.textContent = !isSaved ? "Saved" : "Save Listing";
    }
    showToast(
      !isSaved ? "Saved to favourites!" : "Removed from saved",
      !isSaved ? "success" : "info"
    );
  } catch {
  }
}
function attachListingEvents(listingId) {
  var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  (_a3 = document.getElementById("save-listing-btn")) == null ? void 0 : _a3.addEventListener(
    "click",
    () => toggleFavorite$1(listingId, ["save-heart-icon"], ["save-label"])
  );
  (_b2 = document.getElementById("save-listing-btn-desktop")) == null ? void 0 : _b2.addEventListener(
    "click",
    () => toggleFavorite$1(
      listingId,
      ["save-heart-icon-desktop"],
      ["save-label-desktop"]
    )
  );
  (_c = document.getElementById("book-btn")) == null ? void 0 : _c.addEventListener("click", () => openBookingModal(listingId));
  (_d = document.getElementById("book-btn-mobile")) == null ? void 0 : _d.addEventListener("click", () => openBookingModal(listingId));
  (_e = document.getElementById("book-btn-cta")) == null ? void 0 : _e.addEventListener("click", () => openBookingModal(listingId));
  (_f = document.getElementById("contact-btn")) == null ? void 0 : _f.addEventListener("click", () => openContactModal(listingId));
  (_g = document.getElementById("contact-btn-mobile")) == null ? void 0 : _g.addEventListener("click", () => openContactModal(listingId));
  renderReviews(listingId);
  renderQA(listingId);
  (_h = document.getElementById("qa-submit-btn")) == null ? void 0 : _h.addEventListener("click", () => {
    const input = document.getElementById("qa-input");
    const question = input == null ? void 0 : input.value.trim();
    if (!question) return;
    try {
      const key = `dhoondho_qa_${listingId}`;
      const raw = localStorage.getItem(key);
      const items = raw ? JSON.parse(raw) : [];
      items.unshift({ q: question, time: Date.now() });
      localStorage.setItem(key, JSON.stringify(items));
      if (input) input.value = "";
      renderQA(listingId);
      showToast("Question submitted! ✓", "success");
    } catch {
    }
  });
  (_i = document.getElementById("suggest-edit-btn")) == null ? void 0 : _i.addEventListener("click", () => {
    var _a4, _b3;
    const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">✏️ Suggest an Edit</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Found incorrect information? Help us improve this listing.</p>
      <form id="suggest-form">
        <select name="field" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box">
          <option value="">What needs to be updated?</option>
          <option value="name">Business Name</option>
          <option value="address">Address</option>
          <option value="phone">Phone Number</option>
          <option value="category">Category</option>
          <option value="description">Description</option>
          <option value="hours">Business Hours</option>
          <option value="other">Other</option>
        </select>
        <textarea name="suggestion" rows="3" required placeholder="Describe the correct information..." style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box;resize:none"></textarea>
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Submit</button>
          <button type="button" id="close-suggest-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
    (_a4 = overlay.querySelector("#close-suggest-btn")) == null ? void 0 : _a4.addEventListener("click", () => overlay.remove());
    (_b3 = overlay.querySelector("#suggest-form")) == null ? void 0 : _b3.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      try {
        const raw = localStorage.getItem("dhoondho_suggestions") || "[]";
        const items = JSON.parse(raw);
        items.push({
          listingId,
          field: data.get("field"),
          suggestion: data.get("suggestion"),
          time: Date.now()
        });
        localStorage.setItem("dhoondho_suggestions", JSON.stringify(items));
      } catch {
      }
      overlay.remove();
      awardPoints("suggest_edit");
      showToast(
        "Thank you! Your suggestion has been submitted. ✓ +5 pts",
        "success"
      );
    });
  });
  (_j = document.getElementById("claim-listing-btn")) == null ? void 0 : _j.addEventListener("click", () => {
    var _a4, _b3;
    const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">🏢 Claim this Listing</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Are you the owner? Claim this listing to manage your business profile.</p>
      <form id="claim-form">
        <input name="ownerName" type="text" required placeholder="Your Name" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <textarea name="proof" rows="2" placeholder="How can you prove ownership? (optional)" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box;resize:none"></textarea>
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Submit Claim</button>
          <button type="button" id="close-claim-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
    (_a4 = overlay.querySelector("#close-claim-btn")) == null ? void 0 : _a4.addEventListener("click", () => overlay.remove());
    (_b3 = overlay.querySelector("#claim-form")) == null ? void 0 : _b3.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      try {
        const raw = localStorage.getItem("dhoondho_claims") || "[]";
        const items = JSON.parse(raw);
        items.push({
          listingId,
          ownerName: data.get("ownerName"),
          phone: data.get("phone"),
          proof: data.get("proof"),
          time: Date.now()
        });
        localStorage.setItem("dhoondho_claims", JSON.stringify(items));
      } catch {
      }
      overlay.remove();
      showToast(
        "Claim request submitted! We'll review it shortly. 🏢",
        "success"
      );
    });
  });
  (_k = document.getElementById("share-listing-btn")) == null ? void 0 : _k.addEventListener("click", async () => {
    var _a4;
    const url = window.location.href;
    const title = ((_a4 = document.querySelector("h1")) == null ? void 0 : _a4.textContent) || "Dhoondho Listing";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard! 🔗", "success");
    } catch {
      showToast(`Copy this link: ${url}`, "info");
    }
  });
  (_l = document.getElementById("report-listing-btn")) == null ? void 0 : _l.addEventListener("click", () => {
    var _a4, _b3;
    const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">🚩 Report this Listing</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Help us keep Dhoondho accurate and trustworthy.</p>
      <form id="report-form">
        <select name="reason" required style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box">
          <option value="">Select a reason</option>
          <option value="closed">Business is closed</option>
          <option value="wrong-info">Wrong information</option>
          <option value="duplicate">Duplicate listing</option>
          <option value="spam">Spam or fake listing</option>
          <option value="inappropriate">Inappropriate content</option>
          <option value="other">Other</option>
        </select>
        <textarea name="details" rows="2" placeholder="Additional details (optional)" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box;resize:none"></textarea>
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#dc2626;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Submit Report</button>
          <button type="button" id="close-report-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
    (_a4 = overlay.querySelector("#close-report-btn")) == null ? void 0 : _a4.addEventListener("click", () => overlay.remove());
    (_b3 = overlay.querySelector("#report-form")) == null ? void 0 : _b3.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      try {
        const raw = localStorage.getItem("dhoondho_reports") || "[]";
        const items = JSON.parse(raw);
        items.push({
          listingId,
          reason: data.get("reason"),
          details: data.get("details"),
          time: Date.now()
        });
        localStorage.setItem("dhoondho_reports", JSON.stringify(items));
      } catch {
      }
      overlay.remove();
      showToast(
        "Report submitted. Thank you for helping keep Dhoondho accurate. ✓",
        "success"
      );
    });
  });
  let selectedRating = 0;
  const stars = document.querySelectorAll(".star");
  for (const star of stars) {
    star.addEventListener("mouseover", () => {
      const val = Number(star.dataset.val);
      for (const s2 of stars)
        s2.textContent = Number(s2.dataset.val) <= val ? "★" : "☆";
    });
    star.addEventListener("mouseout", () => {
      for (const s2 of stars)
        s2.textContent = Number(s2.dataset.val) <= selectedRating ? "★" : "☆";
    });
    star.addEventListener("click", () => {
      selectedRating = Number(star.dataset.val);
      for (const s2 of stars)
        s2.textContent = Number(s2.dataset.val) <= selectedRating ? "★" : "☆";
    });
  }
  (_m = document.getElementById("submit-review-btn")) == null ? void 0 : _m.addEventListener("click", () => {
    var _a4;
    if (selectedRating === 0) {
      showToast("Please select a star rating", "error");
      return;
    }
    const text = (_a4 = document.getElementById("review-text")) == null ? void 0 : _a4.value.trim();
    const review = { rating: selectedRating, text, time: Date.now() };
    try {
      const key = `dhoondho_reviews_${listingId}`;
      const raw = localStorage.getItem(key);
      const reviews = raw ? JSON.parse(raw) : [];
      reviews.unshift(review);
      localStorage.setItem(key, JSON.stringify(reviews));
    } catch {
    }
    selectedRating = 0;
    for (const s2 of stars) s2.textContent = "☆";
    const ta = document.getElementById("review-text");
    if (ta) ta.value = "";
    renderReviews(listingId);
    showToast("Review submitted! Thank you 🌟", "success");
  });
}
function renderQA(listingId) {
  const container = document.getElementById("qa-list");
  if (!container) return;
  try {
    const key = `dhoondho_qa_${listingId}`;
    const raw = localStorage.getItem(key);
    const items = raw ? JSON.parse(raw) : [];
    if (items.length === 0) {
      container.innerHTML = `<p style="font-size:14px;color:#9aa0a6;text-align:center;padding:8px 0">No questions yet. Be the first to ask!</p>`;
      return;
    }
    container.innerHTML = items.slice(0, 5).map(
      (item, i) => `
      <div data-ocid="listing.item.${i + 1}" style="padding:10px 0;border-bottom:1px solid #f0f0f0">
        <div style="font-size:13px;font-weight:600;color:#202124;margin-bottom:4px">❓ ${escapeHtml$1(item.q || "")}</div>
        <div style="font-size:11px;color:#9aa0a6">${new Date(item.time).toLocaleDateString("en-IN")}</div>
      </div>
    `
    ).join("");
  } catch {
    container.innerHTML = "";
  }
}
function renderReviews(listingId) {
  const container = document.getElementById("reviews-list");
  if (!container) return;
  try {
    const key = `dhoondho_reviews_${listingId}`;
    const raw = localStorage.getItem(key);
    const reviews = raw ? JSON.parse(raw) : [];
    if (reviews.length === 0) {
      container.innerHTML = `<p style="font-size:14px;color:#9aa0a6;text-align:center;padding:12px 0">No reviews yet. Be the first to review!</p>`;
      return;
    }
    const avg = (reviews.reduce((s2, r2) => s2 + r2.rating, 0) / reviews.length).toFixed(1);
    container.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="font-size:28px;font-weight:800;color:#202124">${avg}</span>
        <div>
          <div style="font-size:18px;color:#FBBC05">${"★".repeat(Math.round(Number(avg)))}${"☆".repeat(5 - Math.round(Number(avg)))}</div>
          <div style="font-size:12px;color:#5f6368">${reviews.length} review${reviews.length !== 1 ? "s" : ""}</div>
        </div>
      </div>
      ${reviews.slice(0, 5).map(
      (r2, i) => `
        <div data-ocid="listing.item.${i + 1}" style="border-bottom:1px solid #f0f0f0;padding:12px 0">
          <div style="color:#FBBC05;font-size:16px;margin-bottom:4px">${"★".repeat(r2.rating)}${"☆".repeat(5 - r2.rating)}</div>
          ${r2.text ? `<p style="font-size:13px;color:#3c4043;margin:0">${escapeHtml$1(r2.text)}</p>` : ""}
          <p style="font-size:11px;color:#9aa0a6;margin:4px 0 0">${new Date(r2.time).toLocaleDateString("en-IN")}</p>
        </div>
      `
    ).join("")}
    `;
  } catch {
    container.innerHTML = "";
  }
}
function cleanupListingPage() {
  if (detailMap) {
    try {
      detailMap.remove();
    } catch {
    }
    detailMap = null;
  }
}
function renderPrivacyPage() {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <style>
      @media (max-width: 600px) { .legal-container { padding: 24px 16px !important; } }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="legal-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>
        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Privacy Policy</h1>
        <p style="font-size:13px;color:#9aa0a6;margin-bottom:36px">Last updated: March 2026</p>
        ${[
    [
      "Information We Collect",
      "We collect information you provide when registering a business listing (name, business name, phone number, address). We also collect usage data such as search queries, city searches, and GPS-based searches (only when you grant permission)."
    ],
    [
      "How We Use Your Information",
      "We use your information to: display your business listing to users, improve search relevance and recommendations, communicate service updates, and ensure platform security and integrity."
    ],
    [
      "Location Data",
      'Location (GPS) data is only collected when you explicitly grant permission by clicking "Nearby Now". This data is used solely to find businesses near you and is not stored or shared with third parties.'
    ],
    [
      "Sharing of Information",
      "Your business listing information (name, address, phone, description) is publicly visible on Dhoondho.App. We do not sell personal data to third parties. We may share data with service providers who help operate the platform, under strict confidentiality agreements."
    ],
    [
      "Data Security",
      "We implement industry-standard security measures to protect your data. All data is stored on decentralized infrastructure, reducing single points of failure."
    ],
    [
      "Your Rights",
      "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us through the Support page. Business listings can be managed directly from your vendor dashboard."
    ],
    [
      "Cookies",
      "We use essential cookies to operate the platform. See our Cookie Policy for more details."
    ],
    [
      "Changes to This Policy",
      "We may update this policy periodically. Changes will be posted on this page with an updated date. Continued use of the service constitutes acceptance."
    ],
    [
      "Contact Us",
      "If you have privacy concerns, please contact us via the Support page or email us at privacy@dhoondho.app."
    ]
  ].map(
    ([title, content]) => `
          <div style="margin-bottom:28px">
            <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:8px">${title}</h2>
            <p style="font-size:15px;line-height:1.7;color:#3c4043">${content}</p>
          </div>
        `
  ).join("")}
      </div>
      ${renderPageFooter()}
    </div>
  `;
}
function isVerifiedListing(id) {
  try {
    const ids = JSON.parse(
      localStorage.getItem("dhoondho_verified_listings") || "[]"
    );
    return ids.includes(String(id));
  } catch {
    return false;
  }
}
function getPriceRangeBadge(tier) {
  if (!tier) return "";
  const n = Number(tier);
  const symbol = n === 1 ? "₹" : n === 2 ? "₹₹" : n === 3 ? "₹₹₹" : "";
  if (!symbol) return "";
  return `<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:#fff8e1;color:#f57f17;border:1px solid #ffe082">${symbol}</span>`;
}
let mapInstance = null;
let currentListings = [];
let activeView = "list";
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function getCategoryName(categoryId) {
  const cat = SAMPLE_CATEGORIES.find((c2) => c2.id === categoryId);
  return cat ? cat.name : "Business";
}
function getCategoryIcon(categoryId) {
  const cat = SAMPLE_CATEGORIES.find((c2) => c2.id === categoryId);
  return cat ? cat.icon : "🏢";
}
function getFavoriteIds() {
  try {
    const raw = localStorage.getItem("dhoondho_favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function toggleFavorite(id) {
  const ids = getFavoriteIds();
  const idx = ids.indexOf(id);
  if (idx === -1) {
    ids.push(id);
    localStorage.setItem("dhoondho_favorites", JSON.stringify(ids));
    return true;
  }
  ids.splice(idx, 1);
  localStorage.setItem("dhoondho_favorites", JSON.stringify(ids));
  return false;
}
function availabilityBadge(listing) {
  if (listing.availability === "available") {
    return `<span style="background:#e8f5e9;color:#2e7d32;font-size:11px;font-weight:700;padding:2px 8px;border-radius:10px;white-space:nowrap">✔ Available Now</span>`;
  }
  if (listing.availability === "busy") {
    return `<span style="background:#fff8e1;color:#f57f17;font-size:11px;font-weight:700;padding:2px 8px;border-radius:10px;white-space:nowrap">⏳ Busy</span>`;
  }
  return "";
}
function listingCard(listing, index2) {
  const isFav = getFavoriteIds().includes(String(listing.id));
  const featuredBadge = listing.featured ? `<span style="background:linear-gradient(135deg,#FFF9C4,#FFE082);color:#795548;font-size:11px;font-weight:700;padding:2px 8px;border-radius:10px;white-space:nowrap;border:1px solid #FFD54F">⭐ Featured</span>` : "";
  return `
    <div data-ocid="search.item.${index2 + 1}" class="search-card bg-white rounded-xl border hover:shadow-md transition-shadow" style="border-color:oklch(var(--border));position:relative;${listing.featured ? "border-color:#FFD54F !important;box-shadow:0 2px 8px rgba(255,193,7,0.2)" : ""}">
      <button class="heart-btn" data-id="${listing.id}" style="position:absolute;top:12px;right:12px;background:none;border:none;cursor:pointer;font-size:20px;z-index:2;line-height:1;padding:2px 4px;border-radius:50%;transition:transform 0.15s" title="Save listing">
        ${isFav ? "❤️" : "🤍"}
      </button>
      <a href="#/listing/${listing.id}" class="block no-underline p-5" style="padding-right:44px">
        <div class="flex items-start gap-3 mb-2">
          <div class="flex-1 min-w-0">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">
              ${featuredBadge}
              ${isVerifiedListing(String(listing.id)) ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:#e3f2fd;color:#1565c0;border:1px solid #90caf9">✓ Verified</span>` : ""}
              ${availabilityBadge(listing)}
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              <h3 class="font-semibold text-base truncate" style="color:oklch(var(--foreground));margin:0">${escapeHtml(listing.name)}</h3>
              ${getPriceRangeBadge(listing.priceRange)}
            </div>
            <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium mt-1" style="background:oklch(var(--secondary));color:oklch(var(--secondary-foreground))">
              ${getCategoryIcon(listing.categoryId)} ${escapeHtml(getCategoryName(listing.categoryId))}
            </span>
          </div>
        </div>
        <p class="text-xs mb-2 flex items-center gap-1" style="color:oklch(var(--muted-foreground))">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          ${escapeHtml(listing.address)}, ${escapeHtml(listing.city)}
        </p>
        ${listing.phone ? `<p class="text-xs flex items-center gap-1" style="color:oklch(var(--muted-foreground))">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${escapeHtml(listing.phone)}
        </p>` : ""}
        <p class="text-sm mt-2 line-clamp-2" style="color:oklch(var(--muted-foreground))">${escapeHtml(listing.description)}</p>
      </a>
      <div style="padding:0 20px 14px;text-align:right">
        <button class="view-details-btn" data-listing-id="${String(listing.id)}" style="background:none;border:none;cursor:pointer;font-size:12px;font-weight:600;color:#2563eb;padding:0">View Details →</button>
      </div>
    </div>
  `;
}
function destroyMap() {
  if (mapInstance) {
    try {
      mapInstance.remove();
    } catch {
    }
    mapInstance = null;
  }
}
function initMap(listings, city) {
  const container = document.getElementById("map-container");
  if (!container) return;
  destroyMap();
  let center = { lat: 20.5937, lng: 78.9629 };
  if (city && CITY_COORDINATES[city]) {
    center = CITY_COORDINATES[city];
  } else if (listings.length > 0) {
    center = { lat: listings[0].location.lat, lng: listings[0].location.lng };
  }
  try {
    mapInstance = L.map(container, {
      center: [center.lat, center.lng],
      zoom: city ? 12 : 5,
      zoomControl: true
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(mapInstance);
    for (const listing of listings) {
      const marker = L.marker([listing.location.lat, listing.location.lng]);
      marker.bindPopup(`
        <div style="min-width:180px">
          <strong>${escapeHtml(listing.name)}</strong><br/>
          <span style="color:#666;font-size:12px">${getCategoryIcon(listing.categoryId)} ${escapeHtml(getCategoryName(listing.categoryId))}</span><br/>
          <span style="color:#666;font-size:12px">${escapeHtml(listing.address)}</span><br/>
          ${listing.phone ? `<span style="font-size:12px">${escapeHtml(listing.phone)}</span><br/>` : ""}
          <button onclick="window.location.hash='#/listing/'+String(${listing.id})" style="font-size:12px;color:#2563eb;background:none;border:none;cursor:pointer;padding:0;text-decoration:underline;margin-top:4px;display:block">View Details &rarr;</button>
        </div>
      `);
      marker.addTo(mapInstance);
    }
    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize();
    }, 100);
  } catch (err) {
    console.error("Map init error:", err);
  }
}
function renderListings(listings, loading) {
  const listContainer = document.getElementById("listings-list");
  if (!listContainer) return;
  if (loading) {
    listContainer.innerHTML = `<div data-ocid="search.loading_state" class="col-span-full text-center py-16"><div class="inline-block w-8 h-8 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div><p class="mt-3 text-sm" style="color:oklch(var(--muted-foreground))">Searching businesses...</p></div>`;
    return;
  }
  if (listings.length === 0) {
    listContainer.innerHTML = `
      <div data-ocid="search.empty_state" class="col-span-full text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-lg font-semibold mb-2" style="color:oklch(var(--foreground))">No businesses found</h3>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Try searching in a different city or category</p>
      </div>
    `;
    return;
  }
  const countEl = document.getElementById("results-count");
  if (countEl) countEl.textContent = `${listings.length} businesses found`;
  const sorted = [...listings].sort(
    (a2, b2) => (b2.featured ? 1 : 0) - (a2.featured ? 1 : 0)
  );
  listContainer.innerHTML = sorted.map(listingCard).join("");
  for (const btn of listContainer.querySelectorAll(
    ".heart-btn"
  )) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id || "";
      const saved = toggleFavorite(id);
      btn.textContent = saved ? "❤️" : "🤍";
      showToast(
        saved ? "Saved to favourites!" : "Removed from saved",
        saved ? "success" : "info"
      );
    });
  }
  for (const btn of listContainer.querySelectorAll(
    ".view-details-btn"
  )) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.listingId || "";
      try {
        const toSave = currentListings.map((l) => ({
          ...l,
          id: String(l.id),
          categoryId: String(l.categoryId),
          createdTime: String(l.createdTime)
        }));
        sessionStorage.setItem(
          "dhoondho_listing_cache",
          JSON.stringify(toSave)
        );
      } catch {
      }
      window.location.hash = `#/listing/${id}`;
    });
  }
}
async function renderSearchPage(params) {
  const main = document.getElementById("main-content");
  if (!main) return;
  const city = params.get("city") || "";
  const q2 = params.get("q") || "";
  const category = params.get("category") || "";
  const lat = params.get("lat");
  const lng = params.get("lng");
  destroyMap();
  main.innerHTML = `
    <div class="min-h-screen" style="background:oklch(var(--secondary))">
      <!-- Search Header -->
      <div class="bg-white border-b" style="border-color:oklch(var(--border))">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--muted-foreground))"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <input
                id="search-city-input"
                data-ocid="search.search_input"
                type="text"
                placeholder="Enter city name"
                value="${escapeHtml(city)}"
                class="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm border outline-none focus:ring-2"
                style="border-color:oklch(var(--border));focus:ring-color:oklch(var(--ring))"
                list="city-list"
              />
              <datalist id="city-list">
                ${Object.keys(CITY_COORDINATES).map((c2) => `<option value="${c2}">`).join("")}
              </datalist>
            </div>
            <button
              id="search-go-btn"
              data-ocid="search.submit_button"
              class="px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style="background:oklch(var(--primary))"
            >
              Search
            </button>
            <button
              id="search-gps-btn"
              data-ocid="search.secondary_button"
              class="px-4 py-2.5 rounded-lg text-sm font-medium border hover:bg-gray-50 transition-colors"
              style="border-color:oklch(var(--border));color:oklch(var(--foreground))"
              title="Use my location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4"/><path d="M12 19v4"/><path d="m4.22 4.22 2.83 2.83"/><path d="m16.95 16.95 2.83 2.83"/><path d="M1 12h4"/><path d="M19 12h4"/><path d="m4.22 19.78 2.83-2.83"/><path d="m16.95 7.05 2.83-2.83"/></svg>
            </button>
          </div>

          <!-- Category Filters -->
          <div class="mt-3 flex gap-2 overflow-x-auto pb-1" id="category-filters">
            <button data-cat="" data-ocid="search.tab" class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!category ? "text-white" : "border"}" style="${!category ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}">
              All
            </button>
            ${SAMPLE_CATEGORIES.map(
    (cat) => `
              <button data-cat="${escapeHtml(cat.name)}" data-ocid="search.tab" class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${category === cat.name ? "text-white" : "border"}" style="${category === cat.name ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}"> 
                ${cat.icon} ${escapeHtml(cat.name)}
              </button>
            `
  ).join("")}
          </div>
        </div>
      </div>

      <!-- Results Area -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Controls -->
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
          <p id="results-count" class="text-sm font-medium" style="color:oklch(var(--muted-foreground))">Loading...</p>
          <div class="flex items-center gap-2">
            <span class="text-sm" style="color:oklch(var(--muted-foreground))">View:</span>
            <button id="view-list-btn" data-ocid="search.toggle" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${activeView === "list" ? "text-white" : "border"}" style="${activeView === "list" ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              List
            </button>
            <button id="view-map-btn" data-ocid="search.toggle" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${activeView === "map" ? "text-white" : "border"}" style="${activeView === "map" ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
              Map
            </button>
          </div>
        </div>

        <!-- List View -->
        <div id="list-view" class="${activeView === "map" ? "hidden" : ""}">
          <div id="listings-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div data-ocid="search.loading_state" class="col-span-full text-center py-16">
              <div class="inline-block w-8 h-8 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div>
              <p class="mt-3 text-sm" style="color:oklch(var(--muted-foreground))">Searching businesses...</p>
            </div>
          </div>
        </div>

        <!-- Map View -->
        <div id="map-view" class="${activeView === "list" ? "hidden" : ""}">
          <div id="map-container" id="map-responsive-container" style="height:280px;border-radius:12px;overflow:hidden;border:1px solid oklch(var(--border))"></div>
        </div>
      </div>
    ${renderPageFooter()}
    </div>
  `;
  attachSearchEvents(city || q2, category);
  await loadSearchResults(
    city || q2,
    category,
    lat ? Number.parseFloat(lat) : void 0,
    lng ? Number.parseFloat(lng) : void 0
  );
}
function switchView(view, city) {
  activeView = view;
  const listView = document.getElementById("list-view");
  const mapView = document.getElementById("map-view");
  const listBtn = document.getElementById("view-list-btn");
  const mapBtn = document.getElementById("view-map-btn");
  if (!listView || !mapView) return;
  if (view === "list") {
    listView.classList.remove("hidden");
    mapView.classList.add("hidden");
    destroyMap();
    if (listBtn) {
      listBtn.style.background = "oklch(var(--primary))";
      listBtn.style.color = "white";
      listBtn.style.border = "none";
    }
    if (mapBtn) {
      mapBtn.style.background = "";
      mapBtn.style.color = "oklch(var(--muted-foreground))";
      mapBtn.style.border = "1px solid oklch(var(--border))";
    }
  } else {
    listView.classList.add("hidden");
    mapView.classList.remove("hidden");
    if (listBtn) {
      listBtn.style.background = "";
      listBtn.style.color = "oklch(var(--muted-foreground))";
      listBtn.style.border = "1px solid oklch(var(--border))";
    }
    if (mapBtn) {
      mapBtn.style.background = "oklch(var(--primary))";
      mapBtn.style.color = "white";
      mapBtn.style.border = "none";
    }
    setTimeout(() => initMap(currentListings, city), 50);
  }
}
function attachSearchEvents(city, category) {
  let currentCity = city;
  let currentCategory = category;
  const cityInput = document.getElementById(
    "search-city-input"
  );
  const goBtn = document.getElementById("search-go-btn");
  const gpsBtn = document.getElementById("search-gps-btn");
  const viewListBtn = document.getElementById("view-list-btn");
  const viewMapBtn = document.getElementById("view-map-btn");
  function doSearch() {
    const newCity = (cityInput == null ? void 0 : cityInput.value.trim()) || "";
    const params = new URLSearchParams();
    if (newCity) params.set("city", newCity);
    if (currentCategory) params.set("category", currentCategory);
    window.location.hash = `#/search?${params.toString()}`;
  }
  goBtn == null ? void 0 : goBtn.addEventListener("click", doSearch);
  cityInput == null ? void 0 : cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") doSearch();
  });
  gpsBtn == null ? void 0 : gpsBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.location.hash = `#/search?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`;
      },
      () => alert("Could not get location.")
    );
  });
  viewListBtn == null ? void 0 : viewListBtn.addEventListener("click", () => switchView("list", currentCity));
  viewMapBtn == null ? void 0 : viewMapBtn.addEventListener("click", () => switchView("map", currentCity));
  for (const btn of document.querySelectorAll("[data-cat]")) {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat || "";
      for (const b2 of document.querySelectorAll("[data-cat]")) {
        if (b2.dataset.cat === currentCategory) {
          b2.style.background = "oklch(var(--primary))";
          b2.style.color = "white";
          b2.style.border = "none";
        } else {
          b2.style.background = "";
          b2.style.color = "oklch(var(--muted-foreground))";
          b2.style.border = "1px solid oklch(var(--border))";
        }
      }
      const filtered = currentCategory ? currentListings.filter((l) => {
        const cat = SAMPLE_CATEGORIES.find((c2) => c2.id === l.categoryId);
        return (cat == null ? void 0 : cat.name) === currentCategory;
      }) : currentListings;
      renderListings(filtered, false);
      if (activeView === "map") initMap(filtered, currentCity);
    });
  }
}
function saveSearchQuery(q2) {
  if (!q2) return;
  try {
    const raw = localStorage.getItem("dhoondho_search_history");
    const hist = raw ? JSON.parse(raw) : [];
    const filtered = hist.filter((h2) => h2.query !== q2);
    filtered.unshift({ query: q2, time: Date.now() });
    localStorage.setItem(
      "dhoondho_search_history",
      JSON.stringify(filtered.slice(0, 10))
    );
  } catch {
  }
}
async function loadSearchResults(city, category, lat, lng) {
  var _a3;
  renderListings([], true);
  if (city) {
    trackSearch(city, city);
    saveSearchQuery(city);
  } else if (category) {
    trackSearch(category, "");
  }
  let listings = [];
  try {
    const backend$1 = await getBackend();
    let backendListings;
    if (lat !== void 0 && lng !== void 0) {
      const catId = category ? ((_a3 = SAMPLE_CATEGORIES.find((c2) => c2.name === category)) == null ? void 0 : _a3.id) ?? 0n : 0n;
      const { SortBy: SortBy2 } = await __vitePreload(async () => {
        const { SortBy: SortBy3 } = await Promise.resolve().then(() => backend);
        return { SortBy: SortBy3 };
      }, true ? void 0 : void 0);
      backendListings = await backend$1.getListingsByCategoryAndLocation(
        catId,
        { lat, lng },
        25,
        SortBy2.byDistance
      );
    } else if (city) {
      backendListings = await backend$1.searchListingsByCity(city);
    }
    if (backendListings && backendListings.length > 0) {
      listings = backendListings.map((l) => ({
        id: l.id,
        name: l.name,
        categoryId: l.categoryId,
        status: String(l.status),
        city: l.city,
        state: l.state,
        address: l.address,
        phone: l.phone,
        website: l.website,
        description: l.description,
        photoIds: l.photoIds,
        createdTime: l.createdTime,
        location: l.location
      }));
    }
  } catch {
  }
  if (listings.length === 0) {
    listings = SAMPLE_LISTINGS.filter((l) => {
      var _a4;
      const cityMatch = !city || l.city.toLowerCase().includes(city.toLowerCase());
      const catName = ((_a4 = SAMPLE_CATEGORIES.find((c2) => c2.id === l.categoryId)) == null ? void 0 : _a4.name) || "";
      const catMatch = !category || catName === category;
      return cityMatch && catMatch;
    });
    if (!city && !category) listings = SAMPLE_LISTINGS;
  }
  currentListings = listings;
  const filtered = category ? listings.filter((l) => {
    const cat = SAMPLE_CATEGORIES.find((c2) => c2.id === l.categoryId);
    return (cat == null ? void 0 : cat.name) === category;
  }) : listings;
  currentListings = listings;
  try {
    const toSave = listings.map((l) => ({
      ...l,
      id: String(l.id),
      categoryId: String(l.categoryId),
      createdTime: String(l.createdTime)
    }));
    sessionStorage.setItem("dhoondho_listing_cache", JSON.stringify(toSave));
  } catch {
  }
  renderListings(filtered, false);
  if (activeView === "map") initMap(filtered, city);
}
function cleanupSearchPage() {
  destroyMap();
  activeView = "list";
}
function getCachedListings() {
  return currentListings;
}
const search = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cleanupSearchPage,
  getCachedListings,
  renderSearchPage
}, Symbol.toStringTag, { value: "Module" }));
function renderSupportPage() {
  var _a3;
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <style>
      .support-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
      @media (max-width: 600px) {
        .support-form-grid { grid-template-columns: 1fr !important; }
        .support-container { padding: 24px 16px !important; }
        .support-quicklinks { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 380px) {
        .support-quicklinks { grid-template-columns: 1fr !important; }
      }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="support-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>

        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Support Center</h1>
        <p style="font-size:15px;color:#5f6368;margin-bottom:40px">We're here to help. Find answers or get in touch with our team.</p>

        <!-- Quick links -->
        <div class="support-quicklinks" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:48px">
          ${[
    {
      icon: "🏢",
      title: "List Your Business",
      desc: "Add or manage your business listing",
      link: "#/vendor"
    },
    {
      icon: "🔍",
      title: "Search Help",
      desc: "Tips for finding businesses near you",
      link: "#/"
    },
    {
      icon: "📜",
      title: "Terms of Service",
      desc: "Read our terms and conditions",
      link: "#/terms"
    },
    {
      icon: "🔒",
      title: "Privacy Policy",
      desc: "How we protect your data",
      link: "#/privacy"
    }
  ].map(
    (item) => `
            <a href="${item.link}" style="display:block;padding:20px;border:1px solid #e8eaed;border-radius:12px;text-decoration:none;transition:box-shadow 0.15s" onmouseenter="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseleave="this.style.boxShadow=''">
              <div style="font-size:24px;margin-bottom:8px">${item.icon}</div>
              <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:4px">${item.title}</div>
              <div style="font-size:12px;color:#5f6368">${item.desc}</div>
            </a>
          `
  ).join("")}
        </div>

        <!-- FAQ -->
        <h2 style="font-size:22px;font-weight:700;color:#202124;margin-bottom:20px">Frequently Asked Questions</h2>
        <div style="border:1px solid #e8eaed;border-radius:12px;overflow:hidden;margin-bottom:40px">
          ${[
    [
      "How do I list my business on Dhoondho?",
      "Click on 'For Businesses' in the navigation, sign in with your account, and use the 'Add Business' button to submit your listing. Our team reviews and approves listings within 24 hours."
    ],
    [
      "Is listing my business free?",
      "Yes! Listing your business on Dhoondho is completely free. We believe every business in India deserves to be discoverable."
    ],
    [
      "How does Nearby Now work?",
      "Nearby Now uses your device's GPS location (with your permission) to instantly show businesses within your area. Simply click the green 'Nearby Now' button and allow location access."
    ],
    [
      "How long does it take for my listing to be approved?",
      "Listings are typically reviewed and approved within 24-48 hours. You'll be able to see the status in your Vendor Dashboard."
    ],
    [
      "Can I update my business information?",
      "Yes. Log in to your Vendor Dashboard and you can update your listing details at any time."
    ],
    [
      "How do I report an incorrect listing?",
      "Use the 'Contact Us' section below to report incorrect or fraudulent listings. Our team will investigate and take action promptly."
    ]
  ].map(
    ([q2, a2], i) => `
            <div style="padding:18px 20px;${i > 0 ? "border-top:1px solid #e8eaed" : ""}">
              <div style="font-size:14px;font-weight:700;color:#202124;margin-bottom:6px">${q2}</div>
              <div style="font-size:14px;color:#5f6368;line-height:1.6">${a2}</div>
            </div>
          `
  ).join("")}
        </div>

        <!-- Contact form -->
        <h2 style="font-size:22px;font-weight:700;color:#202124;margin-bottom:20px">Contact Us</h2>
        <div style="background:#f8f9fa;border-radius:16px;padding:28px">
          <form id="support-form">
            <div class="support-form-grid">
              <div>
                <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Name *</label>
                <input type="text" required placeholder="Your name" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box" />
              </div>
              <div>
                <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Email *</label>
                <input type="email" required placeholder="your@email.com" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box" />
              </div>
            </div>
            <div style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Subject *</label>
              <select required style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;background:#fff;box-sizing:border-box">
                <option value="">Select a topic</option>
                <option>Listing Issue</option>
                <option>Account Help</option>
                <option>Report Incorrect Information</option>
                <option>Partnership Inquiry</option>
                <option>Technical Problem</option>
                <option>Other</option>
              </select>
            </div>
            <div style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#202124;margin-bottom:6px">Message *</label>
              <textarea required rows="5" placeholder="Describe your issue or question..." style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:8px;font-size:14px;outline:none;resize:vertical;box-sizing:border-box"></textarea>
            </div>
            <button type="submit" id="support-submit" style="padding:12px 28px;background:#1a7a3c;color:#fff;border:none;border-radius:24px;font-size:14px;font-weight:700;cursor:pointer">Send Message</button>
            <div id="support-msg" style="display:none;margin-top:14px;padding:12px 16px;border-radius:8px;font-size:14px"></div>
          </form>
        </div>

        <div style="margin-top:32px;text-align:center;padding-top:24px;border-top:1px solid #e8eaed">
          <p style="font-size:13px;color:#9aa0a6">Email: <a href="mailto:support@dhoondho.app" style="color:#1a73e8;text-decoration:none">support@dhoondho.app</a></p>
        </div>
      </div>
      ${renderPageFooter()}
    </div>
  `;
  (_a3 = document.getElementById("support-form")) == null ? void 0 : _a3.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("support-submit");
    const msg = document.getElementById("support-msg");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }
    setTimeout(() => {
      var _a4;
      if (msg) {
        msg.style.display = "block";
        msg.style.background = "#e8f5e9";
        msg.style.color = "#1a7a3c";
        msg.textContent = "✓ Message sent! Our team will get back to you within 24-48 hours.";
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
      (_a4 = document.getElementById("support-form")) == null ? void 0 : _a4.reset();
    }, 1200);
  });
}
function renderTermsPage() {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = `
    <style>
      @media (max-width: 600px) { .legal-container { padding: 24px 16px !important; } }
    </style>
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div class="legal-container" style="max-width:800px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Back to Home</a>
        <h1 style="font-size:30px;font-weight:700;color:#202124;margin-bottom:8px">Terms of Service</h1>
        <p style="font-size:13px;color:#9aa0a6;margin-bottom:36px">Last updated: March 2026</p>
        ${[
    [
      "1. Acceptance of Terms",
      "By accessing or using Dhoondho.App, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform."
    ],
    [
      "2. Use of the Service",
      "Dhoondho.App provides a platform for discovering and listing local businesses in India. You agree to use the service only for lawful purposes and in accordance with these terms. You must not misuse or attempt to disrupt the service."
    ],
    [
      "3. User Accounts",
      "To list a business or access vendor features, you must authenticate. You are responsible for maintaining the confidentiality of your account and all activities that occur under it."
    ],
    [
      "4. Business Listings",
      "Business owners are responsible for the accuracy of information submitted in their listings. Dhoondho reserves the right to review, modify, or remove any listing that violates our policies or is deemed inappropriate."
    ],
    [
      "5. Intellectual Property",
      "All content, trademarks, logos, and branding on Dhoondho.App are the property of Dhoondho. You may not reproduce or use them without prior written consent."
    ],
    [
      "6. Disclaimer of Warranties",
      "Dhoondho.App is provided 'as is' without any warranties, express or implied. We do not guarantee the accuracy, completeness, or availability of any listing or information."
    ],
    [
      "7. Limitation of Liability",
      "Dhoondho shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform."
    ],
    [
      "8. Modifications",
      "We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms."
    ],
    [
      "9. Governing Law",
      "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India."
    ],
    [
      "10. Contact",
      "For any questions about these Terms, please contact us via the Support page."
    ]
  ].map(
    ([title, content]) => `
          <div style="margin-bottom:28px">
            <h2 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:8px">${title}</h2>
            <p style="font-size:15px;line-height:1.7;color:#3c4043">${content}</p>
          </div>
        `
  ).join("")}
      </div>
      ${renderPageFooter()}
    </div>
  `;
}
let deferredPrompt = null;
function initPWA() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
      });
    });
  }
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
      if (!localStorage.getItem("dhoondho_pwa_dismissed")) showInstallBanner();
    }, 3e4);
  });
}
function showInstallBanner() {
  var _a3, _b2;
  if (document.getElementById("pwa-install-banner")) return;
  const banner = document.createElement("div");
  banner.id = "pwa-install-banner";
  banner.style.cssText = "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #e8eaed;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.15);padding:16px 20px;display:flex;align-items:center;gap:12px;z-index:9999;max-width:340px;width:calc(100% - 32px)";
  banner.innerHTML = `
    <div style="font-size:32px">📱</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#202124">Add Dhoondho to Home Screen</div>
      <div style="font-size:11px;color:#5f6368;margin-top:2px">Quick access to India's local search</div>
    </div>
    <button id="pwa-install-btn" style="padding:8px 14px;background:#1a7a3c;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">Install</button>
    <button id="pwa-dismiss-btn" style="padding:8px;background:none;border:none;cursor:pointer;color:#5f6368;font-size:18px">×</button>
  `;
  document.body.appendChild(banner);
  (_a3 = document.getElementById("pwa-install-btn")) == null ? void 0 : _a3.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
    banner.remove();
    localStorage.setItem("dhoondho_pwa_dismissed", "1");
  });
  (_b2 = document.getElementById("pwa-dismiss-btn")) == null ? void 0 : _b2.addEventListener("click", () => {
    banner.remove();
    localStorage.setItem("dhoondho_pwa_dismissed", "1");
  });
}
BigInt.prototype.toJSON = function() {
  return this.toString();
};
let currentRoute = "";
function parseHash() {
  const hash = window.location.hash || "#/";
  const withoutHash = hash.slice(1);
  const [path, queryString] = withoutHash.split("?");
  return {
    path: path || "/",
    params: new URLSearchParams(queryString || "")
  };
}
async function route() {
  const { path, params } = parseHash();
  const routeKey = window.location.hash;
  if (currentRoute !== routeKey) {
    if (currentRoute.includes("/search")) cleanupSearchPage();
    else if (currentRoute.includes("/listing/")) cleanupListingPage();
  }
  currentRoute = routeKey;
  window.scrollTo(0, 0);
  document.title = "Dhoondho.App - Find Local Businesses in India";
  const isHome = path === "/" || path === "";
  if (!isHome) showNavbar();
  if (isHome) {
    await renderHomePage();
  } else if (path.startsWith("/search")) {
    await renderSearchPage(params);
    initFooterReactivity();
  } else if (path.startsWith("/listing/")) {
    const id = path.replace("/listing/", "");
    await renderListingPage(id);
    initFooterReactivity();
  } else if (path === "/vendor") {
    await renderVendorPage();
    initFooterReactivity();
  } else if (path === "/admin") {
    await renderAdminPage();
    initFooterReactivity();
  } else if (path === "/how-it-works") {
    renderHowItWorksPage();
    initFooterReactivity();
  } else if (path === "/about") {
    renderAboutPage();
  } else if (path === "/blog") {
    renderBlogPage();
  } else if (path === "/terms") {
    renderTermsPage();
  } else if (path === "/privacy") {
    renderPrivacyPage();
  } else if (path === "/cookies") {
    renderCookiesPage();
  } else if (path === "/support") {
    renderSupportPage();
  } else if (path === "/dashboard") {
    renderDashboardPage();
    initFooterReactivity();
  } else if (path === "/contributors") {
    renderContributorsPage();
    initFooterReactivity();
  } else if (path.startsWith("/seo/")) {
    const { renderSEOPage } = await __vitePreload(async () => {
      const { renderSEOPage: renderSEOPage2 } = await import("./seo-BJLD9l-u.js");
      return { renderSEOPage: renderSEOPage2 };
    }, true ? [] : void 0);
    renderSEOPage(path);
    initFooterReactivity();
  } else {
    showNavbar();
    const main = document.getElementById("main-content");
    if (main) {
      main.innerHTML = `
        <div style="min-height:calc(100vh - 56px);display:flex;align-items:center;justify-content:center;padding:24px">
          <div style="text-align:center">
            <div style="font-size:80px;font-weight:700;color:#1a7a3c;margin-bottom:12px">404</div>
            <h2 style="font-size:22px;font-weight:700;color:#202124;margin-bottom:8px">Page Not Found</h2>
            <p style="font-size:15px;color:#5f6368;margin-bottom:24px">The page you're looking for doesn't exist.</p>
            <a href="#/" style="display:inline-block;padding:12px 28px;background:#1a7a3c;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:700">Go Home</a>
          </div>
        </div>
      `;
    }
  }
}
let _initialized = false;
async function init() {
  if (_initialized) return;
  _initialized = true;
  initPWA();
  await renderNavbar();
  renderFooter();
  await route();
}
window.addEventListener("hashchange", () => {
  void route();
});
document.addEventListener("DOMContentLoaded", () => {
  init();
});
if (document.readyState !== "loading") {
  init();
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal: Principal$1,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
export {
  renderPageFooter as r,
  showNavbar as s
};
