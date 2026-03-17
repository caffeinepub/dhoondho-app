import { onLanguageChange, t } from "../i18n";

// ---------------------------------------------------------------------------
// Location helpers -- reads from localStorage (set by home.ts GPS detection)
// ---------------------------------------------------------------------------
function getStoredLocation(): { city: string; state: string } | null {
  const city = localStorage.getItem("dhoondho_city");
  const state = localStorage.getItem("dhoondho_state");
  if (city) return { city, state: state || "" };
  return null;
}

function buildLocationLine(): string {
  const loc = getStoredLocation();
  if (loc) {
    const place = loc.state ? `${loc.city}, ${loc.state}` : loc.city;
    return `
      <p style="font-size:13px;color:#5f6368;margin:0 0 4px;display:flex;align-items:center;gap:6px">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a7a3c" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <span><strong>${t("location_detected")}</strong> ${place}</span>
      </p>
    `;
  }
  return `
    <p style="font-size:13px;color:#9aa0a6;margin:0 0 4px;display:flex;align-items:center;gap:6px">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>${t("enable_location")}</span>
    </p>
  `;
}

export function renderFooter(): void {
  const container = document.getElementById("footer-container");
  if (!container) return;
  container.innerHTML = "";
}

export function renderPageFooter(_container: HTMLElement): string {
  return buildPageFooterHTML();
}

function buildPageFooterHTML(): string {
  return `
    <footer id="page-footer" style="background:#f2f2f2;border-top:1px solid #e0e0e0;padding:14px 24px;margin-top:auto">
      <div style="max-width:1200px;margin:0 auto">
        <!-- Location line -->
        <div id="footer-location-row" style="margin-bottom:8px">
          ${buildLocationLine()}
        </div>
        <!-- Copyright + legal links -->
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px">
          <span style="font-size:13px;color:#5f6368">${t("copyright")}</span>
          <div style="display:flex;flex-wrap:wrap;gap:4px 0">
            <a href="#/terms" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px;border-right:1px solid #ccc">${t("terms")}</a>
            <a href="#/privacy" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px;border-right:1px solid #ccc">${t("privacyPolicy")}</a>
            <a href="#/cookies" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px;border-right:1px solid #ccc">${t("cookies")}</a>
            <a href="#/support" style="font-size:13px;color:#5f6368;text-decoration:none;padding:0 8px">${t("support")}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Keep page footer reactive: re-render when language changes or location updates
let footerLangUnsub: (() => void) | null = null;

export function initFooterReactivity(): void {
  if (footerLangUnsub) footerLangUnsub();
  footerLangUnsub = onLanguageChange(() => {
    refreshPageFooter();
  });

  // Listen for location stored in localStorage (fired from home.ts)
  window.addEventListener("dhoondho:location", () => {
    refreshPageFooter();
  });
}

function refreshPageFooter(): void {
  const footer = document.getElementById("page-footer");
  if (!footer) return;
  footer.outerHTML = buildPageFooterHTML();
}
