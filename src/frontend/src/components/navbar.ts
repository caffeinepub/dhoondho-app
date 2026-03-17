import { isAuthenticated, login, logout, onAuthChange } from "../auth";
import { getCurrentLanguage, onLanguageChange, setLanguage, t } from "../i18n";

const menuSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

let navLangUnsubscribe: (() => void) | null = null;

async function getNavbarHTML(): Promise<string> {
  const authed = await isAuthenticated();
  const authBtn = authed
    ? `<button id="auth-btn" class="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">${t("signOut")}</button>`
    : `<button id="auth-btn" class="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors" style="background:#1a7a3c">${t("signIn")}</button>`;

  const currentLang = getCurrentLanguage();

  return `
    <style>
      .nav-active-lang { font-weight: 700 !important; color: #1a7a3c !important; border-bottom: 2px solid #1a7a3c; }
    </style>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm" style="border-color:#e8eaed">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <!-- Logo -->
          <a href="#/" class="flex items-center gap-1 text-lg font-bold no-underline">
            <span style="color:#EA4335">D</span><span style="color:#4285F4">h</span><span style="color:#FBBC05">u</span><span style="color:#4285F4">n</span><span style="color:#34A853">d</span><span style="color:#EA4335">h</span><span style="color:#FBBC05">o</span><span style="color:#5f6368;font-size:13px;font-weight:400">.App</span>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-5">
            <a href="#/about" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">${t("about")}</a>
            <a href="#/blog" class="text-sm font-medium no-underline hover:opacity-70" style="color:#202124">${t("blog")}</a>
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
          <a href="#/vendor" class="text-sm font-medium py-2 no-underline" style="color:#202124">${t("forBusinesses")}</a>
          <a href="#/admin" class="text-sm font-medium py-2 no-underline" style="color:#9aa0a6">${t("admin")}</a>
          <div class="pt-2 border-t" style="border-color:#e8eaed">
            ${authBtn.replace('id="auth-btn"', 'id="auth-btn-mobile"')}
          </div>
          <!-- Language switcher in mobile menu -->
          <div class="pt-2 border-t flex flex-wrap gap-2" style="border-color:#e8eaed">
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang === "en" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="en">English</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang === "hi" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="hi">हिन्दी</a>
            <a class="text-xs cursor-pointer px-2 py-1 rounded ${currentLang === "mr" ? "nav-active-lang" : ""}" style="color:#1a73e8" data-nav-lang="mr">मराठी</a>
          </div>
        </div>
      </div>
    </nav>
    <div style="height:56px"></div>
  `;
}

export async function renderNavbar(): Promise<void> {
  const container = document.getElementById("navbar-container");
  if (!container) return;
  container.innerHTML = await getNavbarHTML();
  attachNavbarEvents();

  // Subscribe to language changes so navbar re-renders instantly
  if (navLangUnsubscribe) navLangUnsubscribe();
  navLangUnsubscribe = onLanguageChange(async () => {
    if (container.style.display !== "none") {
      container.innerHTML = await getNavbarHTML();
      attachNavbarEvents();
    }
  });
}

export function showNavbar(): void {
  const container = document.getElementById("navbar-container");
  if (container) container.style.display = "";
}

export function hideNavbar(): void {
  const container = document.getElementById("navbar-container");
  if (container) container.style.display = "none";
}

function attachNavbarEvents(): void {
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
    "#mobile-menu a:not([data-nav-lang])",
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

  // Language switcher in mobile nav
  for (const el of document.querySelectorAll<HTMLElement>("[data-nav-lang]")) {
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
