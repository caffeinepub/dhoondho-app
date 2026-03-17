import { isAuthenticated, login } from "../auth";
import { getBackend } from "../backend-client";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import type { Listing } from "../data/sampleData";

const PROFILE_PHOTO_KEY = "dhoondho_profile_photo";

export function getProfilePhoto(): string | null {
  return localStorage.getItem(PROFILE_PHOTO_KEY);
}

export function saveProfilePhoto(dataUrl: string): void {
  localStorage.setItem(PROFILE_PHOTO_KEY, dataUrl);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCategoryName(categoryId: bigint): string {
  const cat = SAMPLE_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.name : "Business";
}

function getStatusBadge(status: string): string {
  const styles: Record<string, string> = {
    approved: "background:oklch(0.9 0.12 145);color:oklch(0.35 0.12 145)",
    pending: "background:oklch(0.95 0.1 80);color:oklch(0.5 0.12 80)",
    rejected: "background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27)",
  };
  const style = styles[status] || styles.pending;
  return `<span class="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style="${style}">${escapeHtml(status)}</span>`;
}

function listingRow(listing: Listing, index: number): string {
  return `
    <tr data-ocid="vendor.item.${index + 1}" class="border-b" style="border-color:oklch(var(--border))">
      <td class="py-3 px-4">
        <p class="font-medium text-sm" style="color:oklch(var(--foreground))">${escapeHtml(listing.name)}</p>
        <p class="text-xs" style="color:oklch(var(--muted-foreground))">${escapeHtml(listing.city)}</p>
      </td>
      <td class="py-3 px-4 text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml(getCategoryName(listing.categoryId))}</td>
      <td class="py-3 px-4">${getStatusBadge(listing.status)}</td>
      <td class="py-3 px-4">
        <a href="#/listing/${listing.id}" data-ocid="vendor.link" class="text-xs font-medium no-underline hover:underline" style="color:oklch(var(--primary))">View</a>
      </td>
    </tr>
  `;
}

export async function renderVendorPage(): Promise<void> {
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
    document
      .getElementById("vendor-signin-btn")
      ?.addEventListener("click", async () => {
        await login();
        await renderVendorPage();
      });
    return;
  }

  // Load profile from backend
  let profileName = "";
  let profileBusiness = "";
  let profilePhone = "";
  try {
    const backend = await getBackend();
    const profile = await backend.getCallerUserProfile();
    if (profile) {
      profileName = profile.name || "";
      profileBusiness = profile.businessName || "";
      profilePhone = profile.phone || "";
    }
  } catch {
    /* ignore */
  }

  const userInitial = profileName ? profileName.charAt(0).toUpperCase() : "V";
  const profilePhoto = getProfilePhoto();
  const avatarHtml = profilePhoto
    ? `<img src="${profilePhoto}" alt="Profile" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15)" />`
    : `<div style="width:64px;height:64px;border-radius:50%;background:#EA4335;color:#fff;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15)">${escapeHtml(userInitial)}</div>`;

  // Logged in view
  main.innerHTML = `
    <div class="min-h-screen" style="background:oklch(var(--secondary))">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center justify-between mb-8">
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
                <div class="font-bold text-lg" style="color:oklch(var(--foreground))">${escapeHtml(profileName || "Your Name")}</div>
                <div class="text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml(profileBusiness || "Business Name")}</div>
                ${profilePhone ? `<div class="text-sm" style="color:oklch(var(--muted-foreground))">${escapeHtml(profilePhone)}</div>` : ""}
                <div class="text-xs mt-1" style="color:#9aa0a6">Click avatar to update photo</div>
              </div>
            </div>

            <!-- Edit Profile Form (hidden) -->
            <div id="profile-edit-form" style="display:none;margin-top:20px;border-top:1px solid oklch(var(--border));padding-top:20px">
              <form id="profile-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Your Name</label>
                  <input data-ocid="vendor.input" name="name" type="text" value="${escapeHtml(profileName)}" placeholder="Your full name" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Business Name</label>
                  <input data-ocid="vendor.input" name="businessName" type="text" value="${escapeHtml(profileBusiness)}" placeholder="Your business name" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-1.5" style="color:oklch(var(--foreground))">Phone</label>
                  <input data-ocid="vendor.input" name="phone" type="tel" value="${escapeHtml(profilePhone)}" placeholder="+91 98765 43210" class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style="border-color:oklch(var(--border))" />
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
                  ${SAMPLE_CATEGORIES.map((c) => `<option value="${c.id}">${c.icon} ${escapeHtml(c.name)}</option>`).join("")}
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
    </div>
  `;

  attachVendorEvents();
  await loadVendorListings();
}

function attachVendorEvents(): void {
  // Add listing form toggle
  document.getElementById("add-listing-btn")?.addEventListener("click", () => {
    document
      .getElementById("listing-form-container")
      ?.classList.remove("hidden");
    document
      .getElementById("listing-form-container")
      ?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("cancel-form-btn")?.addEventListener("click", () => {
    document.getElementById("listing-form-container")?.classList.add("hidden");
  });

  // Profile form toggle
  document
    .getElementById("toggle-profile-form")
    ?.addEventListener("click", () => {
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
  document
    .getElementById("cancel-profile-btn")
    ?.addEventListener("click", () => {
      const form = document.getElementById("profile-edit-form");
      const btn = document.getElementById("toggle-profile-form");
      if (form) form.style.display = "none";
      if (btn) btn.textContent = "Edit Profile";
    });

  // Profile photo click -> open file input
  document
    .getElementById("vendor-avatar-wrap")
    ?.addEventListener("click", () => {
      document.getElementById("photo-upload-input")?.click();
    });

  // Profile photo file input
  const photoInput = document.getElementById(
    "photo-upload-input",
  ) as HTMLInputElement | null;
  photoInput?.addEventListener("change", () => {
    const file = photoInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      saveProfilePhoto(dataUrl);
      // Update avatar in DOM
      const wrap = document.getElementById("vendor-avatar-wrap");
      if (wrap) {
        const editIcon = wrap.querySelector("div") as HTMLElement;
        wrap.innerHTML = `<img src="${dataUrl}" alt="Profile" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.15)" />`;
        if (editIcon) wrap.appendChild(editIcon);
        // Re-add click
        const newInput = document.createElement("input");
        newInput.type = "file";
        newInput.id = "photo-upload-input";
        newInput.accept = "image/*";
        newInput.style.display = "none";
        wrap.appendChild(newInput);
        newInput.addEventListener("change", () => {
          const f = newInput.files?.[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = (ev) => {
            const url = ev.target?.result as string;
            saveProfilePhoto(url);
            // rebuild
            const img = wrap.querySelector("img") as HTMLImageElement;
            if (img) img.src = url;
          };
          r.readAsDataURL(f);
        });
      }
    };
    reader.readAsDataURL(file);
  });

  // Save profile form
  document
    .getElementById("profile-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const submitBtn = form.querySelector(
        "[type=submit]",
      ) as HTMLButtonElement;
      const msgEl = document.getElementById("profile-save-msg");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Saving...";
      }
      try {
        const backend = await getBackend();
        await backend.saveCallerUserProfile({
          name: (data.get("name") as string)?.trim() || "",
          businessName: (data.get("businessName") as string)?.trim() || "",
          phone: (data.get("phone") as string)?.trim() || "",
        });
        // Update display
        const nameEl = document.querySelector(
          "#profile-display .font-bold",
        ) as HTMLElement;
        const bizEl = document.querySelector(
          "#profile-display .text-sm",
        ) as HTMLElement;
        if (nameEl)
          nameEl.textContent =
            (data.get("name") as string)?.trim() || "Your Name";
        if (bizEl)
          bizEl.textContent =
            (data.get("businessName") as string)?.trim() || "Business Name";
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

  // Submit listing form
  document
    .getElementById("listing-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const msgEl = document.getElementById("form-message");
      const submitBtn = form.querySelector(
        "[data-ocid='vendor.submit_button']",
      ) as HTMLButtonElement;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }

      try {
        const backend = await getBackend();
        await backend.submitListing({
          name: (data.get("name") as string)?.trim(),
          categoryId: BigInt(data.get("category") as string),
          phone: (data.get("phone") as string)?.trim(),
          city: (data.get("city") as string)?.trim(),
          state: (data.get("state") as string)?.trim(),
          address: (data.get("address") as string)?.trim(),
          website: (data.get("website") as string)?.trim() || "",
          description: (data.get("description") as string)?.trim(),
          photoIds: [],
          location: {
            lat:
              Number.parseFloat((data.get("lat") as string) || "0") || 20.5937,
            lng:
              Number.parseFloat((data.get("lng") as string) || "0") || 78.9629,
          },
        });
        if (msgEl) {
          msgEl.className = "md:col-span-2";
          msgEl.innerHTML = `<div style="background:oklch(0.9 0.12 145);color:oklch(0.35 0.12 145);padding:12px 16px;border-radius:8px;font-size:13px">✓ Listing submitted for review! It will appear once approved by admin.</div>`;
        }
        form.reset();
        await loadVendorListings();
      } catch (err) {
        if (msgEl) {
          msgEl.className = "md:col-span-2";
          msgEl.innerHTML = `<div style="background:oklch(0.95 0.1 27);color:oklch(0.5 0.15 27);padding:12px 16px;border-radius:8px;font-size:13px">Failed: ${err instanceof Error ? err.message : "Unknown error"}</div>`;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Listing";
        }
      }
    });
}

async function loadVendorListings(): Promise<void> {
  const container = document.getElementById("vendor-listings-container");
  if (!container) return;

  let listings: Listing[] = [];
  try {
    const backend = await getBackend();
    const raw = await backend.searchListingsByCity("");
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
