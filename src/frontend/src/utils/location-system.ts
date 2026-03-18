// ============================================================
// Dhoondho Location System – Enhanced Module
// Steps 1-11: GPS detection, change detection, popup, manual input, watchPosition
// ============================================================

export interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  area?: string;
  state?: string;
}

const STORAGE_KEYS = {
  lat: "dhoondho_lat",
  lng: "dhoondho_lng",
  city: "dhoondho_city",
  area: "dhoondho_area",
  state: "dhoondho_state",
  denied: "dhoondho_loc_denied",
};

const CHANGE_THRESHOLD_KM = 2.5;
let watchId: number | null = null;
let lastWatchUpdate = 0;
const WATCH_DEBOUNCE_MS = 30000; // 30 seconds

// Haversine distance in km
function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function loadStoredLocation(): UserLocation | null {
  const lat = localStorage.getItem(STORAGE_KEYS.lat);
  const lng = localStorage.getItem(STORAGE_KEYS.lng);
  if (!lat || !lng) return null;
  return {
    lat: Number.parseFloat(lat),
    lng: Number.parseFloat(lng),
    city: localStorage.getItem(STORAGE_KEYS.city) || undefined,
    area: localStorage.getItem(STORAGE_KEYS.area) || undefined,
    state: localStorage.getItem(STORAGE_KEYS.state) || undefined,
  };
}

export function storeLocation(loc: UserLocation): void {
  localStorage.setItem(STORAGE_KEYS.lat, String(loc.lat));
  localStorage.setItem(STORAGE_KEYS.lng, String(loc.lng));
  if (loc.city) localStorage.setItem(STORAGE_KEYS.city, loc.city);
  if (loc.area) localStorage.setItem(STORAGE_KEYS.area, loc.area);
  if (loc.state) localStorage.setItem(STORAGE_KEYS.state, loc.state);
  window.dispatchEvent(new CustomEvent("dhoondho:location"));
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ city: string; area: string; state: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } },
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

function showLocationChangedModal(
  newLoc: UserLocation,
  onUpdate: (loc: UserLocation) => void,
): void {
  // Remove any existing modal
  document.getElementById("loc-change-overlay")?.remove();

  const city = newLoc.city || "New location";
  const area = newLoc.area ? `, ${newLoc.area}` : "";
  const state = newLoc.state ? `, ${newLoc.state}` : "";
  const label = `${city}${area}${state}, India`;

  const overlay = document.createElement("div");
  overlay.id = "loc-change-overlay";
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px";
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

  document.getElementById("loc-update-btn")?.addEventListener("click", () => {
    storeLocation(newLoc);
    overlay.remove();
    onUpdate(newLoc);
  });
  document.getElementById("loc-cancel-btn")?.addEventListener("click", () => {
    overlay.remove();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

function showManualCityInput(onCity: (city: string) => void): void {
  // Check if already shown
  if (document.getElementById("manual-city-bar")) return;

  const bar = document.createElement("div");
  bar.id = "manual-city-bar";
  bar.style.cssText =
    "background:#FFF8E1;border-bottom:1px solid #FFD54F;padding:10px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13px;z-index:100;position:relative";
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
    "manual-city-input",
  ) as HTMLInputElement;
  const go = () => {
    const city = input?.value.trim();
    if (!city) return;
    bar.remove();
    onCity(city);
  };

  document.getElementById("manual-city-btn")?.addEventListener("click", go);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") go();
  });
  document
    .getElementById("manual-city-close")
    ?.addEventListener("click", () => bar.remove());
}

export interface LocationSystemOptions {
  onLocationDetected?: (loc: UserLocation) => void;
  onLocationChanged?: (loc: UserLocation) => void;
  onDenied?: () => void;
  enableWatch?: boolean;
}

export async function initLocationSystem(
  options: LocationSystemOptions = {},
): Promise<UserLocation | null> {
  const stored = loadStoredLocation();

  if (!navigator.geolocation) {
    if (stored) return stored;
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const { city, area, state } = await reverseGeocode(lat, lng);
        const newLoc: UserLocation = { lat, lng, city, area, state };

        if (stored) {
          const dist = distanceKm(stored.lat, stored.lng, lat, lng);
          if (dist > CHANGE_THRESHOLD_KM) {
            showLocationChangedModal(newLoc, (updated) => {
              options.onLocationChanged?.(updated);
            });
            resolve(stored); // keep old until user confirms
            return;
          }
        }

        storeLocation(newLoc);
        options.onLocationDetected?.(newLoc);
        resolve(newLoc);

        // Start real-time watch (optional)
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
              const d = distanceKm(current.lat, current.lng, wLat, wLng);
              if (d > CHANGE_THRESHOLD_KM) {
                const geo = await reverseGeocode(wLat, wLng);
                const wLoc: UserLocation = { lat: wLat, lng: wLng, ...geo };
                showLocationChangedModal(wLoc, (updated) => {
                  options.onLocationChanged?.(updated);
                });
              }
            },
            () => {},
            { enableHighAccuracy: false },
          );
        }
      },
      async () => {
        localStorage.setItem(STORAGE_KEYS.denied, "1");
        if (stored) {
          resolve(stored);
          return;
        }
        options.onDenied?.();
        showManualCityInput((city) => {
          const manualLoc: UserLocation = { lat: 0, lng: 0, city };
          storeLocation(manualLoc);
          options.onLocationDetected?.(manualLoc);
          resolve(manualLoc);
        });
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  });
}

export function stopLocationWatch(): void {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}
