import { getPrincipalObject, isAuthenticated, login } from "../auth";
import {
  debugAuth,
  getAuthenticatedBackend,
  getBackend,
  resetBackend,
} from "../backend-client";
import type { ListingInput } from "../backend.d";
import { renderPageFooter } from "../components/footer";
import { SAMPLE_CATEGORIES } from "../data/sampleData";
import type { Category, Listing } from "../data/sampleData";
import { getStats } from "../utils/analytics";
import {
  friendlyError,
  isCanisterDownError,
  logApiFailure,
  queueListing,
  startRetryLoop,
} from "../utils/canister-error-handler";
import { showToast } from "../utils/toast";
import { renderAdvancedAnalyticsTab } from "./admin-analytics-advanced";
import { renderDocVerificationTab } from "./admin-docverification";
import { renderLogsTab } from "./admin-logs";
import { renderMapControlTab } from "./admin-mapcontrol";
import { renderMonetizationTab } from "./admin-monetization";
import { renderNotificationsTab } from "./admin-notifications";
import { renderSearchControlTab } from "./admin-searchcontrol";
import { renderTicketsTab } from "./admin-tickets";
import { renderFeatureTogglesTab } from "./admin-toggles";
import { renderUserManagementTab } from "./admin-users";
import {
  type BlogArticle,
  getAdminBlogArticles,
  saveBlogArticles,
} from "./blog";

type AdminTab =
  | "pending"
  | "categories"
  | "vendors"
  | "blog"
  | "suggestions"
  | "claims"
  | "analytics"
  | "users"
  | "tickets"
  | "toggles"
  | "notifications"
  | "monetization"
  | "advanalytics"
  | "logs"
  | "mapcontrol"
  | "searchcontrol"
  | "docverify";
let activeTab: AdminTab = "pending";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isVerifiedListing(id: string): boolean {
  try {
    const ids: string[] = JSON.parse(
      localStorage.getItem("dhoondho_verified_listings") || "[]",
    );
    return ids.includes(id);
  } catch {
    return false;
  }
}

function getCategoryName(categoryId: bigint): string {
  const cat = SAMPLE_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.name : "Unknown";
}

function buildCategoryOptions(selectedId?: bigint): string {
  return SAMPLE_CATEGORIES.map(
    (c) =>
      `<option value="${c.id}" ${selectedId && selectedId === c.id ? "selected" : ""}>${c.icon} ${escapeHtml(c.name)}</option>`,
  ).join("");
}

export async function renderAdminPage(): Promise<void> {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Step 1: Check password gate
  const passwordVerified =
    sessionStorage.getItem("dhoondho_admin_auth") === "true";

  if (!passwordVerified) {
    showAdminPasswordScreen(main);
    return;
  }

  // Step 2: Check Internet Identity auth
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
    document
      .getElementById("admin-signin-btn")
      ?.addEventListener("click", async () => {
        await login();
        resetBackend();
        await debugAuth();
        await renderAdminPage();
      });
    return;
  }

  // Step 3: Check admin status with debug logging
  await debugAuth();
  let isAdmin = false;
  let adminAlreadyExists = false;
  try {
    const backend = await getAuthenticatedBackend();
    isAdmin = await backend.isCallerAdmin();

    if (!isAdmin) {
      const claimed = await backend.claimFirstAdminRole();
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
    ${renderPageFooter(main)}
    </div>
  `;

  attachAdminTabEvents();
  switchAdminTab(activeTab);
  loadQuickStats();

  // Wire "Reset & Claim Admin" button
  const resetClaimBtn = document.getElementById(
    "reset-claim-admin-btn",
  ) as HTMLButtonElement | null;
  if (resetClaimBtn) {
    const claimStatus = document.getElementById("claim-admin-status");
    resetClaimBtn.addEventListener("click", async () => {
      if (
        !confirm(
          "This will remove the existing admin and set YOU as admin. Continue?",
        )
      )
        return;
      resetClaimBtn.disabled = true;
      resetClaimBtn.textContent = "Resetting...";
      if (claimStatus) claimStatus.textContent = "";
      try {
        const backend = await getAuthenticatedBackend();
        await backend.forceResetAdmin();
        const claimed = await backend.claimFirstAdminRole();
        if (claimed) {
          document.getElementById("claim-admin-banner")?.remove();
          showToast(
            "Admin reset successful. You are now the admin.",
            "success",
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

  // Wire plain "Claim Admin Access" button
  const claimBtn = document.getElementById(
    "claim-admin-btn",
  ) as HTMLButtonElement | null;
  if (claimBtn) {
    const claimStatus = document.getElementById("claim-admin-status");
    claimBtn.addEventListener("click", async () => {
      claimBtn.disabled = true;
      claimBtn.textContent = "Claiming...";
      if (claimStatus) claimStatus.textContent = "";
      try {
        const backend = await getBackend();
        const claimed = await backend.claimFirstAdminRole();
        if (claimed) {
          document.getElementById("claim-admin-banner")?.remove();
          showToast("Admin access granted! You are now the admin.", "success");
        } else {
          claimBtn.disabled = false;
          claimBtn.textContent = "Claim Admin Access";
          if (claimStatus) {
            claimStatus.style.color = "oklch(0.5 0.15 27)";
            claimStatus.textContent =
              "An admin already exists. Use Reset & Claim.";
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

function showAdminPasswordScreen(main: HTMLElement): void {
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
    "admin-password-input",
  ) as HTMLInputElement | null;
  const btn = document.getElementById("admin-password-btn");
  const errEl = document.getElementById("admin-password-error");

  const handlePasswordSubmit = async () => {
    const val = input?.value || "";
    if (val === "dhoondho3456") {
      sessionStorage.setItem("dhoondho_admin_auth", "true");
      await renderAdminPage();
    } else {
      if (errEl) errEl.classList.remove("hidden");
      if (input) input.value = "";
      input?.focus();
    }
  };

  btn?.addEventListener("click", handlePasswordSubmit);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handlePasswordSubmit();
  });
}

function loadQuickStats(): void {
  try {
    const users = JSON.parse(
      localStorage.getItem("dhoondho_users_registry") || "[]",
    );
    const tickets = JSON.parse(
      localStorage.getItem("dhoondho_support_tickets") || "[]",
    );
    const docs = JSON.parse(
      localStorage.getItem("dhoondho_doc_submissions") || "[]",
    );
    const listings = JSON.parse(
      localStorage.getItem("dhoondho_listings_cache") || "[]",
    );
    const el = (id: string, val: string) => {
      const e = document.getElementById(id);
      if (e) e.textContent = val;
    };
    el("qs-users", String(users.length || 0));
    el("qs-listings", String(listings.length || 0));
    el(
      "qs-tickets",
      String(
        tickets.filter(
          (t: Record<string, string>) =>
            t.status === "open" || t.status === "in-progress",
        ).length || 0,
      ),
    );
    el(
      "qs-docs",
      String(
        docs.filter((d: Record<string, string>) => d.status === "pending")
          .length || 0,
      ),
    );
  } catch {
    /* ignore */
  }
}

function attachAdminTabEvents(): void {
  for (const btn of document.querySelectorAll<HTMLElement>("[data-tab]")) {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab as AdminTab;
      activeTab = tab;
      switchAdminTab(tab);
    });
  }
}

function updateTabStyles(active: AdminTab): void {
  for (const btn of document.querySelectorAll<HTMLElement>("[data-tab]")) {
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

function switchAdminTab(tab: AdminTab): void {
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

// ─── Add Listing Form (Admin) ────────────────────────────────────────────────
function renderAddListingForm(): string {
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

// ─── Suggestions Tab ─────────────────────────────────────────────────────────
function loadSuggestions(): void {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  try {
    const raw = localStorage.getItem("dhoondho_suggestions") || "[]";
    const items: Array<{
      listingId: string;
      field: string;
      suggestion: string;
      time: number;
    }> = JSON.parse(raw);
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
          ${items
            .slice()
            .reverse()
            .map(
              (item, i) => `
            <div data-ocid="admin.item.${i + 1}" class="p-5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">Listing #${escapeHtml(item.listingId)}</div>
                  <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Field: <strong>${escapeHtml(item.field || "general")}</strong></div>
                  <div class="text-sm mt-2" style="color:oklch(var(--foreground))">${escapeHtml(item.suggestion)}</div>
                  <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${new Date(item.time).toLocaleString("en-IN")}</div>
                </div>
                <button data-dismiss-suggestion="${items.length - 1 - i}" class="px-3 py-1.5 text-xs font-semibold rounded-lg border" style="border-color:oklch(var(--border));color:oklch(var(--muted-foreground));cursor:pointer;background:#fff;flex-shrink:0">Dismiss</button>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;
    for (const btn of content.querySelectorAll<HTMLElement>(
      "[data-dismiss-suggestion]",
    )) {
      btn.addEventListener("click", () => {
        const idx = Number.parseInt(btn.dataset.dismissSuggestion || "0");
        const all = JSON.parse(
          localStorage.getItem("dhoondho_suggestions") || "[]",
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

// ─── Claims Tab ────────────────────────────────────────────────────────────────
function loadClaims(): void {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  try {
    const raw = localStorage.getItem("dhoondho_claims") || "[]";
    const items: Array<{
      listingId: string;
      ownerName: string;
      phone: string;
      proof: string;
      time: number;
    }> = JSON.parse(raw);
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
          ${items
            .slice()
            .reverse()
            .map(
              (item, i) => `
            <div data-ocid="admin.item.${i + 1}" class="p-5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">Listing #${escapeHtml(item.listingId)}</div>
                  <div class="text-sm mt-1">Owner: <strong>${escapeHtml(item.ownerName)}</strong> &bull; ${escapeHtml(item.phone)}</div>
                  ${item.proof ? `<div class="text-sm mt-1 text-gray-500">${escapeHtml(item.proof)}</div>` : ""}
                  <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${new Date(item.time).toLocaleString("en-IN")}</div>
                </div>
                <div class="flex flex-wrap gap-2 flex-shrink-0">
                  <button data-approve-claim="${items.length - 1 - i}" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-white" style="background:#1a7a3c;cursor:pointer;border:none">Approve</button>
                  <button data-dismiss-claim="${items.length - 1 - i}" class="px-3 py-1.5 text-xs font-semibold rounded-lg border" style="border-color:oklch(var(--border));color:oklch(var(--muted-foreground));cursor:pointer;background:#fff">Dismiss</button>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;
    for (const btn of content.querySelectorAll<HTMLElement>(
      "[data-approve-claim]",
    )) {
      btn.addEventListener("click", () => {
        const idx = Number.parseInt(btn.dataset.approveClaim || "0");
        const all = JSON.parse(localStorage.getItem("dhoondho_claims") || "[]");
        all.splice(idx, 1);
        localStorage.setItem("dhoondho_claims", JSON.stringify(all));
        loadClaims();
        // Show import toast
        showToast("Claim approved! ✓", "success");
      });
    }
    for (const btn of content.querySelectorAll<HTMLElement>(
      "[data-dismiss-claim]",
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

// ─── Pending Listings Tab ────────────────────────────────────────────────────
async function loadPendingListings(): Promise<void> {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;

  let listings: Listing[] = [];
  try {
    const backend = await getBackend();
    const raw = await backend.getPendingListings();
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
      location: l.location,
    }));
  } catch {
    /* empty */
  }

  const listingRows =
    listings.length === 0
      ? `<div data-ocid="admin.empty_state" class="p-12 text-center">
          <div class="text-4xl mb-3">✅</div>
          <p class="font-semibold" style="color:oklch(var(--foreground))">No pending listings</p>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">All caught up! Use the button above to add a new listing directly.</p>
        </div>`
      : `<div class="divide-y">
          ${listings
            .map(
              (l, i) => `
            <div data-ocid="admin.item.${i + 1}" class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4" style="border-bottom:1px solid oklch(var(--border))">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold" style="color:oklch(var(--foreground))">${escapeHtml(l.name)}</h3>
                <p class="text-sm mt-0.5" style="color:oklch(var(--muted-foreground))">${escapeHtml(getCategoryName(l.categoryId))} &bull; ${escapeHtml(l.city)}, ${escapeHtml(l.state)}</p>
                <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml(l.address)}</p>
                <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml(l.description).substring(0, 120)}...</p>
              </div>
              <div class="flex flex-wrap gap-2 flex-shrink-0">
                <button data-action="approve" data-id="${l.id}" data-ocid="admin.confirm_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(0.55 0.15 145)">✓ Approve</button>
                <button data-action="verify" data-id="${l.id}" data-ocid="admin.toggle" class="px-4 py-2 text-xs font-bold rounded-lg border" style="border-color:#1565c0;color:#1565c0;background:${isVerifiedListing(String(l.id)) ? "#e3f2fd" : "#fff"}">${isVerifiedListing(String(l.id)) ? "✓ Verified" : "Mark Verified"}</button>
                <button data-action="reject" data-id="${l.id}" data-ocid="admin.delete_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--destructive))">✕ Reject</button>
              </div>
            </div>
          `,
            )
            .join("")}
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

  // Toggle add listing form
  // Approve All button
  document
    .getElementById("approve-all-btn")
    ?.addEventListener("click", async () => {
      const btn = document.getElementById(
        "approve-all-btn",
      ) as HTMLButtonElement | null;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Approving...";
      }
      try {
        const be = await getAuthenticatedBackend();
        const pending = await be.getPendingListings();
        const { ListingStatus } = await import("../backend");
        for (const pl of pending) {
          try {
            await be.changeListingStatus(pl.id, ListingStatus.approved);
          } catch {
            /* ignore */
          }
        }
        showToast(`${pending.length} listing(s) approved!`, "success");
        loadPendingListings();
      } catch (err) {
        showToast(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
          "error",
        );
        if (btn) {
          btn.disabled = false;
          btn.textContent = "✓ Approve All";
        }
      }
    });

  document.getElementById("add-listing-btn")?.addEventListener("click", () => {
    document.getElementById("add-listing-form")?.classList.remove("hidden");
    document
      .getElementById("add-listing-btn")
      ?.setAttribute("disabled", "true");
  });
  document
    .getElementById("cancel-listing-btn")
    ?.addEventListener("click", () => {
      document.getElementById("add-listing-form")?.classList.add("hidden");
      const btn = document.getElementById(
        "add-listing-btn",
      ) as HTMLButtonElement | null;
      if (btn) btn.removeAttribute("disabled");
    });

  // Submit add listing form
  document
    .getElementById("listing-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const submitBtn =
        form.querySelector<HTMLButtonElement>("[type='submit']");
      const errorEl = document.getElementById("listing-form-error");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Adding...";
      }
      if (errorEl) errorEl.classList.add("hidden");

      const input: ListingInput = {
        name: (data.get("name") as string)?.trim(),
        categoryId: BigInt((data.get("categoryId") as string) || "1"),
        phone: (data.get("phone") as string)?.trim(),
        city: (data.get("city") as string)?.trim(),
        state: (data.get("state") as string)?.trim(),
        address: (data.get("address") as string)?.trim(),
        website: (data.get("website") as string)?.trim() || "",
        description: (data.get("description") as string)?.trim(),
        photoIds: [],
        location: {
          lat: Number.parseFloat((data.get("lat") as string) || "0") || 0,
          lng: Number.parseFloat((data.get("lng") as string) || "0") || 0,
        },
      };

      try {
        const backend = await getAuthenticatedBackend();
        await backend.submitListing(input);
        // Auto-approve: approve ALL pending listings (admin added them all)
        try {
          const pending = await backend.getPendingListings();
          const { ListingStatus } = await import("../backend");
          for (const pl of pending) {
            try {
              await backend.changeListingStatus(pl.id, ListingStatus.approved);
            } catch {
              /* ignore individual failures */
            }
          }
        } catch {
          // approval failed silently; listing still submitted
        }
        form.reset();
        document.getElementById("add-listing-form")?.classList.add("hidden");
        const addBtn = document.getElementById(
          "add-listing-btn",
        ) as HTMLButtonElement | null;
        if (addBtn) addBtn.removeAttribute("disabled");
        showToast("Business listing added and approved!", "success");
        // Reload pending listings
        loadPendingListings();
      } catch (err) {
        logApiFailure("submitListing[admin]", err);
        if (isCanisterDownError(err)) {
          queueListing(
            Object.fromEntries(new FormData(form as HTMLFormElement)),
          );
          startRetryLoop(async (d) => {
            const be = await getAuthenticatedBackend();
            await be.submitListing({
              name: d.name as string,
              categoryId: BigInt((d.categoryId as string) || "1"),
              phone: d.phone as string,
              city: d.city as string,
              state: d.state as string,
              address: d.address as string,
              website: (d.website as string) || "",
              description: d.description as string,
              photoIds: [],
              location: { lat: Number(d.lat) || 0, lng: Number(d.lng) || 0 },
            });
          });
          showToast(
            "⏳ Your listing is saved and will be submitted shortly.",
            "info",
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

  // Approve/reject buttons on existing pending listings
  for (const btn of content.querySelectorAll<HTMLButtonElement>(
    "[data-action]",
  )) {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      const id = BigInt(btn.dataset.id || "0");
      btn.disabled = true;
      btn.textContent = action === "approve" ? "Approving..." : "Rejecting...";
      try {
        const backend = await getBackend();
        const { ListingStatus } = await import("../backend");
        await backend.changeListingStatus(
          id,
          action === "approve"
            ? ListingStatus.approved
            : ListingStatus.rejected,
        );
        const row = btn.closest("[data-ocid^='admin.item']");
        row?.remove();
        showToast(
          action === "approve" ? "Listing approved!" : "Listing rejected.",
          action === "approve" ? "success" : "info",
        );
      } catch (err) {
        showToast(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
          "error",
        );
        btn.disabled = false;
        btn.textContent = action === "approve" ? "✓ Approve" : "✕ Reject";
      }
    });
  }
}

// ─── Categories Tab ──────────────────────────────────────────────────────────
async function loadCategories(): Promise<void> {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;

  let categories: Category[] = SAMPLE_CATEGORIES;
  try {
    const backend = await getBackend();
    const raw = await backend.getCategories();
    if (raw.length > 0) {
      categories = raw.map((c) => ({
        id: c.id,
        icon: c.icon,
        name: c.name,
        description: c.description,
      }));
    }
  } catch {
    /* use sample */
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
            ${categories
              .map(
                (cat, i) => `
              <tr data-ocid="admin.item.${i + 1}" class="border-b" style="border-color:oklch(var(--border))">
                <td class="py-3 px-4 text-xl">${cat.icon}</td>
                <td class="py-3 px-4 text-sm font-medium" style="color:oklch(var(--foreground))">${escapeHtml(cat.name)}</td>
                <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml(cat.description)}</td>
                <td class="py-3 px-4">
                  <button data-delete-cat="${cat.id}" data-ocid="admin.delete_button" class="text-xs font-semibold" style="color:oklch(var(--destructive))">Delete</button>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("add-cat-btn")?.addEventListener("click", () => {
    document.getElementById("add-cat-form")?.classList.remove("hidden");
  });
  document.getElementById("cancel-cat-btn")?.addEventListener("click", () => {
    document.getElementById("add-cat-form")?.classList.add("hidden");
  });

  document
    .getElementById("category-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const newId = BigInt(Date.now());
      try {
        const backend = await getBackend();
        await backend.addCategory({
          id: newId,
          icon: (data.get("icon") as string) || "🏢",
          name: (data.get("name") as string)?.trim(),
          description: (data.get("description") as string)?.trim(),
        });
        form.reset();
        showToast("Category added!", "success");
        loadCategories();
      } catch (err) {
        showToast(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
          "error",
        );
      }
    });

  for (const btn of content.querySelectorAll<HTMLElement>(
    "[data-delete-cat]",
  )) {
    btn.addEventListener("click", async () => {
      if (!confirm("Delete this category?")) return;
      const id = BigInt(btn.dataset.deleteCat || "0");
      try {
        const backend = await getBackend();
        await backend.deleteCategory(id);
        showToast("Category deleted.", "info");
        loadCategories();
      } catch (err) {
        showToast(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
          "error",
        );
      }
    });
  }
}

// ─── Add Vendor Form (Admin) ─────────────────────────────────────────────────
function renderAddVendorForm(): string {
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

// ─── Vendors Tab ─────────────────────────────────────────────────────────────
async function loadVendors(): Promise<void> {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;

  let vendors: Array<{
    principal: { toString(): string };
    name: string;
    businessName: string;
    phone: string;
  }> = [];
  try {
    const backend = await getBackend();
    vendors = await backend.getAllVendors();
  } catch {
    /* empty */
  }

  const vendorRows =
    vendors.length === 0
      ? `<div data-ocid="admin.empty_state" class="p-12 text-center">
          <div class="text-4xl mb-3">👤</div>
          <p class="font-semibold" style="color:oklch(var(--foreground))">No vendors registered yet</p>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Use the button above to add a vendor directly.</p>
        </div>`
      : `<div class="overflow-x-auto w-full">
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
              ${vendors
                .map(
                  (v, i) => `
                <tr data-ocid="admin.item.${i + 1}" class="border-b" style="border-color:oklch(var(--border))">
                  <td class="py-3 px-4 text-sm font-medium" style="color:oklch(var(--foreground))">${escapeHtml(v.name)}</td>
                  <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml(v.businessName)}</td>
                  <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml(v.phone)}</td>
                  <td class="py-3 px-4 text-xs font-mono truncate max-w-xs" style="color:oklch(var(--muted-foreground))">${escapeHtml(v.principal.toString())}</td>
                  <td class="py-3 px-4">
                    <button data-delete-vendor="${escapeHtml(v.principal.toString())}" data-ocid="admin.delete_button" class="text-xs font-semibold" style="color:oklch(var(--destructive))">Remove</button>
                  </td>
                </tr>
              `,
                )
                .join("")}
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

  // Toggle add vendor form
  document.getElementById("add-vendor-btn")?.addEventListener("click", () => {
    document.getElementById("add-vendor-form")?.classList.remove("hidden");
    const btn = document.getElementById(
      "add-vendor-btn",
    ) as HTMLButtonElement | null;
    if (btn) btn.setAttribute("disabled", "true");
  });
  document
    .getElementById("cancel-vendor-btn")
    ?.addEventListener("click", () => {
      document.getElementById("add-vendor-form")?.classList.add("hidden");
      const btn = document.getElementById(
        "add-vendor-btn",
      ) as HTMLButtonElement | null;
      if (btn) btn.removeAttribute("disabled");
    });

  // Submit add vendor form
  document
    .getElementById("vendor-add-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const submitBtn =
        form.querySelector<HTMLButtonElement>("[type='submit']");
      const errorEl = document.getElementById("vendor-form-error");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Adding...";
      }
      if (errorEl) errorEl.classList.add("hidden");

      try {
        const { Principal } = await import("@icp-sdk/core/principal");
        const principalInput = (
          (data.get("principalId") as string) || ""
        ).trim();
        let principal: { toString(): string };
        if (principalInput) {
          principal = Principal.fromText(principalInput);
        } else {
          // Use the currently authenticated principal
          principal = (await getPrincipalObject())!;
        }

        const backend = await getAuthenticatedBackend();
        await backend.addVendor({
          principal: principal as Parameters<
            typeof backend.addVendor
          >[0]["principal"],
          name: (data.get("name") as string)?.trim(),
          businessName: (data.get("businessName") as string)?.trim(),
          phone: (data.get("phone") as string)?.trim(),
        });

        form.reset();
        document.getElementById("add-vendor-form")?.classList.add("hidden");
        const addBtn = document.getElementById(
          "add-vendor-btn",
        ) as HTMLButtonElement | null;
        if (addBtn) addBtn.removeAttribute("disabled");
        showToast("Vendor added successfully!", "success");
        loadVendors();
      } catch (err) {
        logApiFailure("addVendor[admin]", err);
        const msg = isCanisterDownError(err)
          ? "Service temporarily unavailable. Please try again."
          : friendlyError(err);
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

  // Remove vendor buttons
  for (const btn of content.querySelectorAll<HTMLElement>(
    "[data-delete-vendor]",
  )) {
    btn.addEventListener("click", async () => {
      if (!confirm("Remove this vendor?")) return;
      // No backend removeVendor method -- show a note to the user
      showToast("Vendor removal is not yet supported in the backend.", "info");
    });
  }
}

// ─── Blog Admin Tab ───────────────────────────────────────────────────────────
function loadBlogAdmin(): void {
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

  document.getElementById("add-article-btn")?.addEventListener("click", () => {
    document.getElementById("add-article-form")?.classList.remove("hidden");
  });
  document
    .getElementById("cancel-article-btn")
    ?.addEventListener("click", () => {
      document.getElementById("add-article-form")?.classList.add("hidden");
    });

  document
    .getElementById("blog-article-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const now = new Date();
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
        "December",
      ];
      const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
      const newArticle: BlogArticle = {
        id: String(Date.now()),
        title: (data.get("title") as string)?.trim(),
        category: (data.get("category") as string)?.trim(),
        author: (data.get("author") as string)?.trim() || "Dhoondho Team",
        readTime: (data.get("readTime") as string)?.trim() || "3 min read",
        emoji: (data.get("emoji") as string)?.trim() || "📝",
        summary: (data.get("summary") as string)?.trim(),
        date: dateStr,
      };
      const current = getAdminBlogArticles();
      saveBlogArticles([newArticle, ...current]);
      form.reset();
      document.getElementById("add-article-form")?.classList.add("hidden");
      const list = document.getElementById("blog-admin-list");
      if (list) list.innerHTML = renderBlogAdminList(getAdminBlogArticles());
      attachDeleteArticleEvents();
      showToast("Article published!", "success");
    });

  attachDeleteArticleEvents();
}

function renderBlogAdminList(articles: BlogArticle[]): string {
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
      ${articles
        .map(
          (a, i) => `
        <div data-ocid="admin.item.${i + 1}" class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4" style="border-bottom:1px solid oklch(var(--border))">
          <div class="text-3xl flex-shrink-0">${a.emoji}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#e8f5e9;color:#1a7a3c">${escapeHtml(a.category)}</span>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${escapeHtml(a.readTime)}</span>
            </div>
            <h3 class="font-semibold text-sm" style="color:oklch(var(--foreground))">${escapeHtml(a.title)}</h3>
            <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml(a.summary).substring(0, 100)}...</p>
            <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml(a.date)} &bull; ${escapeHtml(a.author)}</p>
          </div>
          <button data-delete-article="${escapeHtml(a.id)}" data-ocid="admin.delete_button" class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg" style="color:oklch(var(--destructive));border:1px solid oklch(var(--destructive))">Delete</button>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

function attachDeleteArticleEvents(): void {
  const list = document.getElementById("blog-admin-list");
  if (!list) return;
  for (const btn of list.querySelectorAll<HTMLButtonElement>(
    "[data-delete-article]",
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.deleteArticle;
      if (!confirm("Delete this article?")) return;
      const current = getAdminBlogArticles();
      const updated = current.filter((a) => a.id !== id);
      saveBlogArticles(updated);
      list.innerHTML = renderBlogAdminList(getAdminBlogArticles());
      attachDeleteArticleEvents();
    });
  }
}

// ─── Analytics Tab ────────────────────────────────────────────────────────────
async function loadAnalytics(): Promise<void> {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;
  let totalListings = 0;
  try {
    const be = await getBackend();
    const all = await be.searchListingsByCity("");
    totalListings = all.length;
  } catch {}
  const stats = getStats(totalListings);

  const cityBars =
    stats.topCities.length > 0
      ? stats.topCities
          .map((city, i) => {
            const maxW = 100 - i * 15;
            return `<div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span style="color:#202124;font-weight:500">${city}</span></div>
          <div style="background:#f0f0f0;border-radius:4px;height:8px"><div style="background:#1a7a3c;height:8px;border-radius:4px;width:${maxW}%"></div></div>
        </div>`;
          })
          .join("")
      : `<p style="color:#9aa0a6;font-size:13px">No data yet. Searches will appear here.</p>`;

  const activityHtml =
    stats.recentActivity.length > 0
      ? stats.recentActivity
          .map(
            (a) =>
              `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f5f5f5;color:#5f6368">${a}</div>`,
          )
          .join("")
      : `<p style="color:#9aa0a6;font-size:13px">No recent activity.</p>`;

  const topQueriesHtml =
    stats.topCategories.length > 0
      ? stats.topCategories
          .map(
            (q) =>
              `<span style="display:inline-block;padding:4px 12px;background:#e8f5e9;color:#1a7a3c;border-radius:99px;font-size:12px;font-weight:600;margin:3px">${q}</span>`,
          )
          .join("")
      : `<p style="color:#9aa0a6;font-size:13px">No searches yet.</p>`;

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
