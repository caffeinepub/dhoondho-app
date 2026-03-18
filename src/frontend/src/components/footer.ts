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

function buildLocationText(): string {
  const loc = getStoredLocation();
  if (loc?.city) {
    const place = loc.state
      ? `${loc.city}, ${loc.state}, India`
      : `${loc.city}, India`;
    return `\u{1F4CD} ${t("location_detected")} ${place}`;
  }
  return `\u{1F4CD} ${t("enable_location")}`;
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
          <p>\u00a9 ${new Date().getFullYear()} | Dhoondho India</p>
        </div>
      </div>
    </footer>
  `;
}

// Keep page footer reactive: re-render when language changes or location updates
let footerLangUnsub: (() => void) | null = null;
let _footerLocationHandler: (() => void) | null = null;

export function initFooterReactivity(): void {
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

function refreshPageFooter(): void {
  const footer = document.getElementById("page-footer");
  if (!footer) return;
  const newFooter = document.createElement("div");
  newFooter.innerHTML = buildPageFooterHTML();
  footer.replaceWith(newFooter.firstElementChild!);
}
