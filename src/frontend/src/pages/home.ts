import { isAuthenticated, login, logout } from "../auth";
import { getBackend } from "../backend-client";
import { SAMPLE_CATEGORIES } from "../data/sampleData";
import { getCurrentLanguage, onLanguageChange, setLanguage, t } from "../i18n";
import { getProfilePhoto } from "./vendor";

const LANGUAGES = [
  { name: "हिन्दी", code: "hi" },
  { name: "বাংলা", code: "bn" },
  { name: "తెలుగు", code: "te" },
  { name: "मराठी", code: "mr" },
  { name: "தமிழ்", code: "ta" },
  { name: "ਪੰਜਾਬੀ", code: "pa" },
  { name: "ಕನ್ನಡ", code: "kn" },
  { name: "മലയാളം", code: "ml" },
  { name: "ગુજરાતી", code: "gu" },
];

const CATEGORIES = [
  {
    id: "1",
    name: "Home Services",
    icon: "🔧",
    bg: "#FFF3E0",
    color: "#E65100",
  },
  { id: "2", name: "Automotive", icon: "🚗", bg: "#E3F2FD", color: "#1565C0" },
  { id: "3", name: "Healthcare", icon: "❤️", bg: "#FCE4EC", color: "#C62828" },
  {
    id: "4",
    name: "Food & Dining",
    icon: "🍽️",
    bg: "#FFFDE7",
    color: "#F57F17",
  },
  { id: "5", name: "Shopping", icon: "🛍️", bg: "#FCE4EC", color: "#AD1457" },
  {
    id: "6",
    name: "Professional",
    icon: "💼",
    bg: "#EDE7F6",
    color: "#4527A0",
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
    color: "#F9A825",
  },
  { id: "12", name: "Smart City", icon: "📶", bg: "#E8F5E9", color: "#00695C" },
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const DHOONDHO_LOGO = `
  <span class="logo-letter" style="color:#EA4335">D</span><span
  class="logo-letter" style="color:#4285F4">h</span><span
  class="logo-letter" style="color:#FBBC05">u</span><span
  class="logo-letter" style="color:#4285F4">n</span><span
  class="logo-letter" style="color:#34A853">d</span><span
  class="logo-letter" style="color:#EA4335">h</span><span
  class="logo-letter" style="color:#FBBC05">o</span>
`;

// ---------------------------------------------------------------------------
// GPS Location State
// ---------------------------------------------------------------------------
interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  state?: string;
}

let userLocation: UserLocation | null = null;

function loadCachedLocation(): UserLocation | null {
  const lat = localStorage.getItem("dhoondho_lat");
  const lng = localStorage.getItem("dhoondho_lng");
  if (lat && lng) {
    return {
      lat: Number.parseFloat(lat),
      lng: Number.parseFloat(lng),
      city: localStorage.getItem("dhoondho_city") || undefined,
      state: localStorage.getItem("dhoondho_state") || undefined,
    };
  }
  return null;
}

function cacheLocation(loc: UserLocation): void {
  localStorage.setItem("dhoondho_lat", String(loc.lat));
  localStorage.setItem("dhoondho_lng", String(loc.lng));
  if (loc.city) localStorage.setItem("dhoondho_city", loc.city);
  if (loc.state) localStorage.setItem("dhoondho_state", loc.state);
  // Notify footer to update
  window.dispatchEvent(new CustomEvent("dhoondho:location"));
}

async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ city: string; state: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } },
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

function updateLocationBanner(
  status: "detecting" | "detected" | "denied" | "none",
): void {
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
    const place = userLocation.city
      ? `${userLocation.city}${userLocation.state ? `, ${userLocation.state}` : ""}`
      : "";
    banner.style.display = "flex";
    banner.style.background = "#E8F5E9";
    banner.style.color = "#2E7D32";
    banner.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      <span>${t("locationDetected")}${place ? `: ${escapeHtml(place)}` : ""}</span>
      <button id="banner-nearby-btn" style="margin-left:auto;background:#2E7D32;color:#fff;border:none;border-radius:16px;padding:4px 12px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap">${t("nearby")}</button>
    `;
    document
      .getElementById("banner-nearby-btn")
      ?.addEventListener("click", () => {
        if (userLocation) {
          window.location.hash = `#/search?lat=${userLocation.lat}&lng=${userLocation.lng}`;
        }
      });
    // Auto-hide after 6 seconds
    setTimeout(() => {
      if (banner) banner.style.display = "none";
    }, 6000);
  } else if (status === "denied") {
    banner.style.display = "flex";
    banner.style.background = "#FFF8E1";
    banner.style.color = "#F57F17";
    banner.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>${t("enableLocation")}</span>
    `;
  }

  // Update footer location row
  updateFooterLocation();
}

function updateFooterLocation(): void {
  const row = document.getElementById("home-footer-location");
  if (!row) return;
  const loc = loadCachedLocation();
  if (loc?.city) {
    const place = loc.state ? `${loc.city}, ${loc.state}` : loc.city;
    row.innerHTML = `
      <p style="font-size:13px;color:#5f6368;margin:0;display:flex;align-items:center;gap:6px">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a7a3c" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <strong>${t("location_detected")}</strong>&nbsp;${escapeHtml(place)}
      </p>
    `;
  } else {
    row.innerHTML = `
      <p style="font-size:13px;color:#9aa0a6;margin:0;display:flex;align-items:center;gap:6px">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        ${t("enable_location")}
      </p>
    `;
  }
}

async function autoDetectLocation(): Promise<void> {
  // Check cache first
  const cached = loadCachedLocation();
  if (cached) {
    userLocation = cached;
    updateFooterLocation();
    return;
  }

  if (!navigator.geolocation) return;

  updateLocationBanner("detecting");

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const { city, state } = await reverseGeocode(latitude, longitude);
        userLocation = { lat: latitude, lng: longitude, city, state };
        cacheLocation(userLocation);
        updateLocationBanner("detected");
        resolve();
      },
      () => {
        updateLocationBanner("denied");
        resolve();
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  });
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
let langUnsubscribe: (() => void) | null = null;

export async function renderHomePage(): Promise<void> {
  // Unsubscribe from previous language listener
  if (langUnsubscribe) {
    langUnsubscribe();
    langUnsubscribe = null;
  }

  // Hide the persistent navbar on home page
  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) navbarContainer.style.display = "none";

  const main = document.getElementById("main-content");
  if (!main) return;

  const authed = await isAuthenticated();
  let userInitial = "D";
  let userName = "";
  if (authed) {
    try {
      const backend = await getBackend();
      const profile = await backend.getCallerUserProfile();
      if (profile?.name) {
        userName = profile.name;
        userInitial = profile.name.charAt(0).toUpperCase();
      }
    } catch {
      // ignore
    }
  }

  const profilePhoto = authed ? getProfilePhoto() : null;
  const avatarContent = authed
    ? profilePhoto
      ? `<div id="home-avatar" style="width:36px;height:36px;border-radius:50%;cursor:pointer;flex-shrink:0"><img src="${profilePhoto}" style="width:36px;height:36px;border-radius:50%;object-fit:cover" /></div>`
      : `<div id="home-avatar" style="width:36px;height:36px;border-radius:50%;background:#EA4335;color:#fff;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;user-select:none">${escapeHtml(userInitial)}</div>`
    : `<button id="home-login-btn" style="padding:6px 16px;border-radius:6px;border:1px solid #dadce0;background:#fff;font-size:13px;font-weight:600;color:#1a73e8;cursor:pointer">${t("signIn")}</button>`;

  const currentLang = getCurrentLanguage();

  // Build footer location line
  const cachedLoc = loadCachedLocation();
  const footerLocHTML = cachedLoc?.city
    ? `<p style="font-size:13px;color:#5f6368;margin:0;display:flex;align-items:center;gap:6px">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a7a3c" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <strong>${t("location_detected")}</strong>&nbsp;${escapeHtml(cachedLoc.state ? `${cachedLoc.city}, ${cachedLoc.state}` : cachedLoc.city)}
       </p>`
    : `<p style="font-size:13px;color:#9aa0a6;margin:0;display:flex;align-items:center;gap:6px">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        ${t("enable_location")}
       </p>`;

  main.innerHTML = `
    <style>
      @keyframes spin { to { transform: rotate(360deg); } }
      .logo-letter { font-size: clamp(48px, 12vw, 90px); font-weight: 700; letter-spacing: -2px; font-family: 'Google Sans', Arial, sans-serif; }
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
              ${
                authed
                  ? `
                <div style="padding:12px 16px;border-bottom:1px solid #f0f0f0">
                  <div style="font-size:13px;font-weight:600;color:#202124">${escapeHtml(userName || "User")}</div>
                  <div style="font-size:11px;color:#5f6368">Dhoondho Account</div>
                </div>
                <a href="#/vendor" class="avatar-dropdown-item">${t("myAccount")}</a>
                <a href="#/vendor" class="avatar-dropdown-item">${t("myListings")}</a>
                <div style="height:1px;background:#f0f0f0;margin:4px 0"></div>
                <a href="#" id="dropdown-logout" class="avatar-dropdown-item" style="color:#d32f2f">${t("signOut")}</a>
              `
                  : `
                <a href="#" id="dropdown-login" class="avatar-dropdown-item">${t("signIn")}</a>
                <a href="#/vendor" class="avatar-dropdown-item">${t("forBusinesses")}</a>
                <a href="#/about" class="avatar-dropdown-item">${t("aboutDhoondho")}</a>
              `
              }
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
              placeholder="${escapeHtml(t("searchPlaceholder"))}"
              style="flex:1;border:none;outline:none;font-size:16px;color:#202124;background:transparent;min-width:0"
            />
            <button id="home-loc-btn" title="${escapeHtml(t("nearby"))}" style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;color:#5f6368">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></svg>
            </button>
            <div style="width:1px;height:24px;background:#dfe1e5"></div>
            <button id="home-mic-btn" title="${escapeHtml(t("search"))}" style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center">
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
            <a class="lang-link-home${currentLang === "en" ? " active-lang" : ""}" data-lang="en">English</a>
            ${LANGUAGES.map(
              (lang) =>
                `<a class="lang-link-home${currentLang === lang.code ? " active-lang" : ""}" data-lang="${lang.code}">${lang.name}</a>`,
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
                <span style="font-size:12px;font-weight:500;color:#3c4043;text-align:center;line-height:1.3">${escapeHtml(cat.name)}</span>
              </a>
            `,
            ).join("")}
          </div>
        </div>

      </div>

      <!-- Footer India section -->
      <div style="background:#f2f2f2;padding:12px 24px;border-top:1px solid #e0e0e0">
        <div style="max-width:640px;margin:0 auto;font-size:14px;color:#3c4043;font-weight:500">${t("india")}</div>
      </div>

      <!-- Footer links row -->
      <div style="background:#f2f2f2;padding:14px 24px;border-top:1px solid #e8e8e8">
        <div style="max-width:640px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px">
          <a href="#/about" style="font-size:13px;color:#5f6368;text-decoration:none">${t("about")}</a>
          <a href="#/vendor" style="font-size:13px;color:#5f6368;text-decoration:none">${t("forBusinesses")}</a>
          <a href="#/blog" style="font-size:13px;color:#5f6368;text-decoration:none">${t("blog")}</a>
          <a href="#/privacy" style="font-size:13px;color:#5f6368;text-decoration:none">${t("privacyTerms")}</a>
        </div>
      </div>

      <!-- Bottom footer: location + copyright + legal links -->
      <footer style="background:#f2f2f2;border-top:1px solid #e0e0e0;padding:14px 24px">
        <div style="max-width:1200px;margin:0 auto">
          <!-- Location row (reactive) -->
          <div id="home-footer-location" style="margin-bottom:8px">${footerLocHTML}</div>
          <!-- Copyright + links (centred) -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:4px 0">
              <a href="#/terms" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px;border-right:1px solid #ccc">${t("terms")}</a>
              <a href="#/privacy" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px;border-right:1px solid #ccc">${t("privacyPolicy")}</a>
              <a href="#/cookies" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px;border-right:1px solid #ccc">${t("cookies")}</a>
              <a href="#/support" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px">${t("support")}</a>
            </div>
            <span style="font-size:13px;color:#5f6368">${t("copyright")}</span>
          </div>
        </div>
      </footer>

    </div>
  `;

  // Subscribe to language changes -- re-render on switch
  langUnsubscribe = onLanguageChange(() => {
    renderHomePage();
  });

  attachHomeEvents(authed);

  // Auto-detect GPS location after render
  autoDetectLocation();
}

function attachHomeEvents(_authed: boolean): void {
  const input = document.getElementById(
    "home-search-input",
  ) as HTMLInputElement;
  const autocomplete = document.getElementById("home-autocomplete");

  function doSearch(): void {
    const q = input?.value.trim();
    if (q) {
      window.location.hash = `#/search?q=${encodeURIComponent(q)}`;
    } else {
      window.location.hash = "#/search";
    }
  }

  function doNearby(): void {
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
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  // Autocomplete suggestions
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
    "Interior Designer",
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
    "Indore",
  ];

  input?.addEventListener("input", () => {
    const val = input.value.trim().toLowerCase();
    if (!val || !autocomplete) {
      if (autocomplete) autocomplete.style.display = "none";
      return;
    }
    const matches = [
      ...SUGGESTIONS.filter((s) => s.toLowerCase().includes(val)),
      ...CITIES.filter((c) => c.toLowerCase().startsWith(val)),
    ].slice(0, 6);
    if (!matches.length) {
      autocomplete.style.display = "none";
      return;
    }
    autocomplete.style.display = "block";
    autocomplete.innerHTML = matches
      .map(
        (m) =>
          `<div class="ac-item" style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:14px;color:#202124"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>${m}</div>`,
      )
      .join("");
    for (const item of autocomplete.querySelectorAll(".ac-item")) {
      item.addEventListener("mousedown", () => {
        input.value = (item as HTMLElement).innerText.trim();
        autocomplete.style.display = "none";
        doSearch();
      });
    }
  });

  input?.addEventListener("blur", () => {
    setTimeout(() => {
      if (autocomplete) autocomplete.style.display = "none";
    }, 150);
  });
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });

  document
    .getElementById("home-search-btn")
    ?.addEventListener("click", doSearch);
  document.getElementById("home-map-btn")?.addEventListener("click", () => {
    if (userLocation) {
      window.location.hash = `#/search?lat=${userLocation.lat}&lng=${userLocation.lng}&view=map`;
    } else {
      window.location.hash = "#/search?view=map";
    }
  });
  document
    .getElementById("home-nearby-btn")
    ?.addEventListener("click", doNearby);

  // Voice search
  document.getElementById("home-mic-btn")?.addEventListener("click", () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert(t("voiceNotSupported"));
      return;
    }
    const r = new SR();
    r.lang = "en-IN";
    r.start();
    r.onresult = (e: any) => {
      input.value = e.results[0][0].transcript;
      doSearch();
    };
    r.onerror = () => alert(t("couldNotCaptureVoice"));
  });

  document.getElementById("home-loc-btn")?.addEventListener("click", doNearby);

  // Login button (non-authenticated)
  document
    .getElementById("home-login-btn")
    ?.addEventListener("click", async () => {
      await login();
      await renderHomePage();
    });

  // Avatar dropdown
  const avatar = document.getElementById("home-avatar");
  const dropdown = document.getElementById("avatar-dropdown");
  if (avatar && dropdown) {
    avatar.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "none" ? "block" : "none";
    });
    document.addEventListener("click", () => {
      if (dropdown) dropdown.style.display = "none";
    });
  }

  document
    .getElementById("dropdown-logout")
    ?.addEventListener("click", async (e) => {
      e.preventDefault();
      await logout();
      await renderHomePage();
    });

  document
    .getElementById("dropdown-login")
    ?.addEventListener("click", async (e) => {
      e.preventDefault();
      await login();
      await renderHomePage();
    });

  // Language switcher -- clicking a language link switches the UI language
  for (const el of document.querySelectorAll<HTMLElement>("[data-lang]")) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = el.dataset.lang;
      if (lang) setLanguage(lang); // triggers re-render via onLanguageChange
    });
  }
}
