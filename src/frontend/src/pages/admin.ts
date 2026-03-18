import { getPrincipalObject, isAuthenticated, login } from "../auth";
import { UserRole } from "../backend";
import { getBackend } from "../backend-client";
import { renderPageFooter } from "../components/footer";
import { SAMPLE_CATEGORIES } from "../data/sampleData";
import type { Category, Listing } from "../data/sampleData";
import { showToast } from "../utils/toast";
import {
  type BlogArticle,
  getAdminBlogArticles,
  saveBlogArticles,
} from "./blog";

type AdminTab = "pending" | "categories" | "vendors" | "blog";
let activeTab: AdminTab = "pending";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCategoryName(categoryId: bigint): string {
  const cat = SAMPLE_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.name : "Unknown";
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
          <p class="text-sm mb-7" style="color:oklch(var(--muted-foreground))">Sign in with your admin account to access the management panel.</p>
          <button id="admin-signin-btn" data-ocid="admin.primary_button" class="w-full px-6 py-3 rounded-xl text-sm font-bold text-white" style="background:oklch(var(--primary))">
            Sign In
          </button>
        </div>
      </div>
    `;
    document
      .getElementById("admin-signin-btn")
      ?.addEventListener("click", async () => {
        await login();
        await renderAdminPage();
      });
    return;
  }

  // Step 3: Try to bootstrap admin role (first logged-in user becomes admin)
  let bootstrapSuccess = false;
  try {
    const backend = await getBackend();
    const myPrincipal = await getPrincipalObject();
    if (myPrincipal) {
      await backend.assignCallerUserRole(myPrincipal, UserRole.admin);
      bootstrapSuccess = true;
    }
  } catch {
    // Not the first user - bootstrap already done by someone else
  }

  // Step 4: Check admin status
  let isAdmin = false;
  try {
    const backend = await getBackend();
    isAdmin = await backend.isCallerAdmin();
  } catch {
    // Backend unreachable - allow access with warning
    isAdmin = bootstrapSuccess;
  }

  // Step 5: If not admin, show soft warning but still allow panel with limited info
  const adminWarningBanner = !isAdmin
    ? `
    <div id="claim-admin-banner" class="mb-6 px-5 py-4 rounded-xl flex items-start gap-3" style="background:oklch(0.97 0.05 85);border:1px solid oklch(0.85 0.1 85)">
      <span class="text-xl flex-shrink-0">⚠️</span>
      <div class="flex-1">
        <p class="text-sm font-semibold" style="color:oklch(0.45 0.12 85)">Admin setup pending</p>
        <p class="text-xs mt-0.5" style="color:oklch(0.55 0.08 85)">Admin setup pending, but you can continue using the platform. Click "Claim Admin" below to set yourself as admin.</p>
        <div class="flex items-center gap-3 mt-2">
          <button id="claim-admin-btn" data-ocid="admin.primary_button" class="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style="background:oklch(0.6 0.15 85)">Claim Admin Access</button>
          <span id="claim-admin-status" class="text-xs" style="color:oklch(0.55 0.08 85)"></span>
        </div>
      </div>
    </div>
  `
    : "";

  main.innerHTML = `
    <div class="min-h-screen" style="background:oklch(var(--secondary))">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="mb-8">
          <h1 class="text-3xl font-bold" style="color:oklch(var(--foreground))">Admin Panel</h1>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Manage listings, categories, vendors, and blog</p>
        </div>

        ${adminWarningBanner}

        <!-- Tabs -->
        <div class="flex flex-wrap gap-1 bg-white rounded-xl border p-1 mb-6" style="border-color:oklch(var(--border));width:fit-content">
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

  // Wire claim admin button if present — update banner in-place, NO full page re-render
  const claimBtn = document.getElementById(
    "claim-admin-btn",
  ) as HTMLButtonElement | null;
  const claimStatus = document.getElementById("claim-admin-status");
  if (claimBtn) {
    claimBtn.addEventListener("click", async () => {
      claimBtn.disabled = true;
      claimBtn.textContent = "Claiming...";
      if (claimStatus) claimStatus.textContent = "";

      try {
        const backend = await getBackend();
        const claimed = await backend.claimFirstAdminRole();
        if (claimed) {
          document.getElementById("claim-admin-banner")?.remove();
          showToast("Admin access granted! You are now an admin.", "success");
        } else {
          claimBtn.disabled = false;
          claimBtn.textContent = "Claim Admin Access";
          if (claimStatus) {
            claimStatus.style.color = "oklch(0.5 0.15 27)";
            claimStatus.textContent =
              "Admin already exists. You cannot claim admin access.";
          }
          showToast(
            "Could not claim admin access. An admin already exists.",
            "error",
          );
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
      btn.style.background = "oklch(var(--primary))";
      btn.style.color = "white";
    } else {
      btn.style.background = "";
      btn.style.color = "oklch(var(--muted-foreground))";
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
}

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

  if (listings.length === 0) {
    content.innerHTML = `
      <div data-ocid="admin.empty_state" class="bg-white rounded-2xl border p-12 text-center" style="border-color:oklch(var(--border))">
        <div class="text-4xl mb-3">✅</div>
        <p class="font-semibold" style="color:oklch(var(--foreground))">No pending listings</p>
        <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">All caught up!</p>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b" style="border-color:oklch(var(--border))">
        <h2 class="font-bold" style="color:oklch(var(--foreground))">Pending Listings (${listings.length})</h2>
      </div>
      <div class="divide-y" style="--tw-divide-opacity:1">
        ${listings
          .map(
            (l, i) => `
          <div data-ocid="admin.item.${i + 1}" class="p-5 flex items-start gap-4" style="border-bottom:1px solid oklch(var(--border))">
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold" style="color:oklch(var(--foreground))">${escapeHtml(l.name)}</h3>
              <p class="text-sm mt-0.5" style="color:oklch(var(--muted-foreground))">${escapeHtml(getCategoryName(l.categoryId))} &bull; ${escapeHtml(l.city)}, ${escapeHtml(l.state)}</p>
              <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml(l.address)}</p>
              <p class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${escapeHtml(l.description).substring(0, 120)}...</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button data-action="approve" data-id="${l.id}" data-ocid="admin.confirm_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(0.55 0.15 145)">✓ Approve</button>
              <button data-action="reject" data-id="${l.id}" data-ocid="admin.delete_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--destructive))">✕ Reject</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;

  // Attach approve/reject events
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
        // Remove the item row
        const row = btn.closest("[data-ocid^='admin.item']");
        row?.remove();
      } catch (err) {
        alert(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
        btn.disabled = false;
        btn.textContent = action === "approve" ? "✓ Approve" : "✕ Reject";
      }
    });
  }
}

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
      <div class="p-5 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
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
      <div class="overflow-x-auto">
        <table data-ocid="admin.table" class="w-full">
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

  // Category form toggle
  document.getElementById("add-cat-btn")?.addEventListener("click", () => {
    document.getElementById("add-cat-form")?.classList.remove("hidden");
  });
  document.getElementById("cancel-cat-btn")?.addEventListener("click", () => {
    document.getElementById("add-cat-form")?.classList.add("hidden");
  });

  // Add category
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
        loadCategories();
      } catch (err) {
        alert(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      }
    });

  // Delete category
  for (const btn of content.querySelectorAll<HTMLElement>(
    "[data-delete-cat]",
  )) {
    btn.addEventListener("click", async () => {
      if (!confirm("Delete this category?")) return;
      const id = BigInt(btn.dataset.deleteCat || "0");
      try {
        const backend = await getBackend();
        await backend.deleteCategory(id);
        loadCategories();
      } catch (err) {
        alert(
          `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      }
    });
  }
}

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

  if (vendors.length === 0) {
    content.innerHTML = `
      <div data-ocid="admin.empty_state" class="bg-white rounded-2xl border p-12 text-center" style="border-color:oklch(var(--border))">
        <div class="text-4xl mb-3">👤</div>
        <p class="font-semibold" style="color:oklch(var(--foreground))">No vendors registered yet</p>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b" style="border-color:oklch(var(--border))">
        <h2 class="font-bold" style="color:oklch(var(--foreground))">All Vendors (${vendors.length})</h2>
      </div>
      <div class="overflow-x-auto">
        <table data-ocid="admin.table" class="w-full">
          <thead>
            <tr class="border-b" style="border-color:oklch(var(--border));background:oklch(var(--secondary))">
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Name</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Business</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Phone</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style="color:oklch(var(--muted-foreground))">Principal</th>
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
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function loadBlogAdmin(): void {
  const content = document.getElementById("admin-tab-content");
  if (!content) return;

  const articles = getAdminBlogArticles();

  content.innerHTML = `
    <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
      <div class="p-5 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
        <div>
          <h2 class="font-bold" style="color:oklch(var(--foreground))">Blog Articles</h2>
          <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Admin-published articles appear at the top of the blog</p>
        </div>
        <button id="add-article-btn" data-ocid="admin.primary_button" class="px-4 py-2 text-xs font-bold rounded-lg text-white" style="background:oklch(var(--primary))">+ New Article</button>
      </div>

      <!-- Add Article Form -->
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
          <div class="md:col-span-2 flex gap-3">
            <button type="submit" data-ocid="admin.submit_button" class="px-5 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Publish Article</button>
            <button type="button" id="cancel-article-btn" data-ocid="admin.cancel_button" class="px-5 py-2 text-sm font-semibold rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Articles List -->
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
    });

  attachDeleteArticleEvents();
}

function renderBlogAdminList(articles: BlogArticle[]): string {
  if (articles.length === 0) {
    return `
      <div data-ocid="admin.empty_state" class="p-12 text-center">
        <div class="text-4xl mb-3">✍️</div>
        <p class="font-semibold" style="color:oklch(var(--foreground))">No admin articles yet</p>
        <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Add your first article using the button above. Sample articles always appear on the blog.</p>
      </div>
    `;
  }
  return `
    <div class="divide-y">
      ${articles
        .map(
          (a, i) => `
        <div data-ocid="admin.item.${i + 1}" class="p-5 flex items-start gap-4" style="border-bottom:1px solid oklch(var(--border))">
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
