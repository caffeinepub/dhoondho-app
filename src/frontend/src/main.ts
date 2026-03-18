import "./index.css";
import { initFooterReactivity, renderFooter } from "./components/footer";
import { renderNavbar, showNavbar } from "./components/navbar";
import { renderAboutPage } from "./pages/about";
import { renderAdminPage } from "./pages/admin";
import { renderBlogPage } from "./pages/blog";
import { renderContributorsPage } from "./pages/contributors";
import { renderCookiesPage } from "./pages/cookies";
import { renderDashboardPage } from "./pages/dashboard";
import { renderHomePage } from "./pages/home";
import { cleanupListingPage, renderListingPage } from "./pages/listing";
import { renderPrivacyPage } from "./pages/privacy";
import { cleanupSearchPage, renderSearchPage } from "./pages/search";
import { renderSupportPage } from "./pages/support";
import { renderTermsPage } from "./pages/terms";
import { renderVendorPage } from "./pages/vendor";
import { initPWA } from "./utils/pwa";

// Fix BigInt serialization
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

let currentRoute = "";

function parseHash(): { path: string; params: URLSearchParams } {
  const hash = window.location.hash || "#/";
  const withoutHash = hash.slice(1);
  const [path, queryString] = withoutHash.split("?");
  return {
    path: path || "/",
    params: new URLSearchParams(queryString || ""),
  };
}

async function route(): Promise<void> {
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

  // Show navbar for all non-home pages
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
    const { renderSEOPage } = await import("./pages/seo");
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

async function init(): Promise<void> {
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
