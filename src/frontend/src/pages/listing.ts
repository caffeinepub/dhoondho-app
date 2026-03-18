declare const L: any;

import { getBackend } from "../backend-client";
import { renderPageFooter } from "../components/footer";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import type { Listing } from "../data/sampleData";
import { showToast } from "../utils/toast";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let detailMap: any = null;

function initDetailMap(listing: Listing): void {
  const container = document.getElementById("detail-map");
  if (!container) return;

  if (detailMap) {
    try {
      detailMap.remove();
    } catch {
      /* ignore */
    }
    detailMap = null;
  }

  try {
    detailMap = L.map(container, {
      center: [listing.location.lat, listing.location.lng],
      zoom: 15,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(detailMap);

    const marker = L.marker([listing.location.lat, listing.location.lng]);
    marker
      .bindPopup(
        `<strong>${escapeHtml(listing.name)}</strong><br/>${escapeHtml(listing.address)}`,
      )
      .openPopup();
    marker.addTo(detailMap);

    setTimeout(() => {
      if (detailMap) detailMap.invalidateSize();
    }, 100);
  } catch (err) {
    console.error("Detail map error:", err);
  }
}

export async function renderListingPage(id: string): Promise<void> {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Clean up old map
  if (detailMap) {
    try {
      detailMap.remove();
    } catch {
      /* ignore */
    }
    detailMap = null;
  }

  main.innerHTML = `<div class="max-w-4xl mx-auto px-4 py-12 text-center"><div class="inline-block w-8 h-8 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div></div>`;

  let listing: Listing | undefined;

  // Try backend
  try {
    const backend = await getBackend();
    const all = await backend.searchListingsByCity("");
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
        location: found.location,
      };
    }
  } catch {
    /* fall through */
  }

  // Fall back to sample data
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

  const category = SAMPLE_CATEGORIES.find((c) => c.id === listing!.categoryId);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${listing.location.lat},${listing.location.lng}`;

  main.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6" style="color:oklch(var(--muted-foreground))">
        <a href="#/" data-ocid="listing.link" class="no-underline hover:underline" style="color:oklch(var(--primary))">Home</a>
        <span>/</span>
        <a href="#/search" data-ocid="listing.link" class="no-underline hover:underline" style="color:oklch(var(--primary))">Search</a>
        <span>/</span>
        <span>${escapeHtml(listing.name)}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Info -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl border p-7 mb-6" style="border-color:oklch(var(--border))">
            <div class="flex items-start gap-4 mb-5">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style="background:oklch(var(--secondary))">${category ? category.icon : "🏢"}</div>
              <div class="flex-1 min-w-0">
                <h1 class="text-2xl font-bold mb-1" style="color:oklch(var(--foreground))">${escapeHtml(listing.name)}</h1>
                <span class="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full font-medium" style="background:oklch(var(--secondary));color:oklch(var(--secondary-foreground))">
                  ${category ? `${category.icon} ${escapeHtml(category.name)}` : "Business"}
                </span>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-start gap-3">
                <svg class="flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span class="text-sm" style="color:oklch(var(--foreground))">${escapeHtml(listing.address)}, ${escapeHtml(listing.city)}, ${escapeHtml(listing.state)}</span>
              </div>
              ${
                listing.phone
                  ? `<div class="flex items-center gap-3">
                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:${escapeHtml(listing.phone)}" class="text-sm font-medium no-underline hover:underline" style="color:oklch(var(--primary))">${escapeHtml(listing.phone)}</a>
              </div>`
                  : ""
              }
              ${
                listing.website
                  ? `<div class="flex items-center gap-3">
                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <a href="${escapeHtml(listing.website)}" target="_blank" rel="noopener" class="text-sm font-medium no-underline hover:underline truncate" style="color:oklch(var(--primary))">${escapeHtml(listing.website)}</a>
              </div>`
                  : ""
              }
            </div>

            <div class="border-t pt-5" style="border-color:oklch(var(--border))">
              <h3 class="font-semibold mb-2" style="color:oklch(var(--foreground))">About</h3>
              <p class="text-sm leading-relaxed" style="color:oklch(var(--muted-foreground))">${escapeHtml(listing.description)}</p>
            </div>
          </div>

          <!-- Map -->
          <div class="bg-white rounded-2xl border overflow-hidden" style="border-color:oklch(var(--border))">
            <div class="p-4 border-b" style="border-color:oklch(var(--border))">
              <h3 class="font-semibold" style="color:oklch(var(--foreground))">Location on Map</h3>
            </div>
            <div id="detail-map" style="height:350px"></div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-4">
          <!-- Actions -->
          <div class="bg-white rounded-2xl border p-5" style="border-color:oklch(var(--border))">
            <h3 class="font-semibold mb-4" style="color:oklch(var(--foreground))">Quick Actions</h3>
            <div class="space-y-3">
              ${
                listing.phone
                  ? `<a href="tel:${escapeHtml(listing.phone)}" data-ocid="listing.button" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white no-underline text-center" style="background:oklch(var(--primary))">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Now
              </a>`
                  : ""
              }
              <button id="contact-btn" data-ocid="listing.button" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border w-full text-left" style="border-color:oklch(var(--primary));color:oklch(var(--primary));background:transparent;cursor:pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Request Callback
              </button>
              <button id="book-btn" data-ocid="listing.button" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border w-full text-left" style="border-color:oklch(var(--border));color:oklch(var(--foreground));background:transparent;cursor:pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                📅 Book Now
              </button>
              <button id="save-listing-btn" data-id="${listing.id}" data-ocid="listing.button" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border w-full text-left" style="border-color:oklch(var(--border));color:oklch(var(--foreground));background:transparent;cursor:pointer">
                <span id="save-heart-icon">${(() => {
                  try {
                    const ids = JSON.parse(
                      localStorage.getItem("dhoondho_favorites") || "[]",
                    );
                    return ids.includes(String(listing.id)) ? "❤️" : "🤍";
                  } catch {
                    return "🤍";
                  }
                })()}</span>
                <span id="save-label">${(() => {
                  try {
                    const ids = JSON.parse(
                      localStorage.getItem("dhoondho_favorites") || "[]",
                    );
                    return ids.includes(String(listing.id))
                      ? "Saved"
                      : "Save Listing";
                  } catch {
                    return "Save Listing";
                  }
                })()}</span>
              </button>
              <a href="${mapsUrl}" target="_blank" rel="noopener" data-ocid="listing.link" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border no-underline" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                Get Directions
              </a>
              ${
                listing.website
                  ? `<a href="${escapeHtml(listing.website)}" target="_blank" rel="noopener" data-ocid="listing.link" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border no-underline" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                Visit Website
              </a>`
                  : ""
              }
            </div>
          </div>

          <!-- Details -->
          <div class="bg-white rounded-2xl border p-5" style="border-color:oklch(var(--border))">
            <h3 class="font-semibold mb-4" style="color:oklch(var(--foreground))">Details</h3>
            <dl class="space-y-3 text-sm">
              <div>
                <dt class="font-medium mb-0.5" style="color:oklch(var(--muted-foreground))">Category</dt>
                <dd style="color:oklch(var(--foreground))">${category ? `${category.icon} ${escapeHtml(category.name)}` : "Business"}</dd>
              </div>
              <div>
                <dt class="font-medium mb-0.5" style="color:oklch(var(--muted-foreground))">City</dt>
                <dd style="color:oklch(var(--foreground))">${escapeHtml(listing.city)}, ${escapeHtml(listing.state)}</dd>
              </div>
              <div>
                <dt class="font-medium mb-0.5" style="color:oklch(var(--muted-foreground))">Status</dt>
                <dd><span class="px-2 py-0.5 rounded-full text-xs font-semibold" style="background:oklch(0.9 0.12 145);color:oklch(0.35 0.12 145)">✓ Verified</span></dd>
              </div>
            </dl>
          </div>

          <a href="#/search?city=${escapeHtml(listing.city)}" data-ocid="listing.link" class="block text-center px-4 py-3 rounded-xl text-sm font-semibold border no-underline hover:bg-gray-50 transition-colors" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">
            More in ${escapeHtml(listing.city)} &rarr;
          </a>
        </div>
      </div>
      </div>

      <!-- Reviews Section -->
      <div class="mt-8 bg-white rounded-2xl border p-7" style="border-color:oklch(var(--border))">
        <h3 class="font-bold text-lg mb-5" style="color:oklch(var(--foreground))">⭐ Reviews</h3>
        <div id="reviews-list" style="margin-bottom:20px"></div>
        <div style="border-top:1px solid oklch(var(--border));padding-top:20px">
          <h4 class="font-semibold mb-4 text-sm" style="color:oklch(var(--foreground))">Write a Review</h4>
          <div id="star-rating" style="display:flex;gap:6px;margin-bottom:12px;font-size:28px;cursor:pointer">
            <span class="star" data-val="1">☆</span>
            <span class="star" data-val="2">☆</span>
            <span class="star" data-val="3">☆</span>
            <span class="star" data-val="4">☆</span>
            <span class="star" data-val="5">☆</span>
          </div>
          <textarea id="review-text" rows="3" placeholder="Share your experience with this business..." class="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style="border-color:oklch(var(--border));width:100%;box-sizing:border-box"></textarea>
          <button id="submit-review-btn" data-ocid="listing.submit_button" class="mt-3 px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style="background:oklch(var(--primary))">Submit Review</button>
        </div>
      </div>

    ${renderPageFooter(main)}
    </div>
  `;

  // Initialize map after DOM is ready
  setTimeout(() => initDetailMap(listing!), 100);
  attachListingEvents(String(listing!.id));
}

function showModal(html: string): HTMLElement {
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.setAttribute("data-ocid", "listing.modal");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(2px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px";
  overlay.innerHTML = `<div style="background:#fff;border-radius:20px;padding:28px;max-width:400px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,0.2)">${html}</div>`;
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
  return overlay;
}

function attachListingEvents(listingId: string): void {
  // Save/favourite button
  const saveBtn = document.getElementById("save-listing-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      try {
        const raw = localStorage.getItem("dhoondho_favorites");
        const ids: string[] = raw ? JSON.parse(raw) : [];
        const idx = ids.indexOf(listingId);
        const heartEl = document.getElementById("save-heart-icon");
        const labelEl = document.getElementById("save-label");
        if (idx === -1) {
          ids.push(listingId);
          if (heartEl) heartEl.textContent = "❤️";
          if (labelEl) labelEl.textContent = "Saved";
          showToast("Saved to favourites!", "success");
        } else {
          ids.splice(idx, 1);
          if (heartEl) heartEl.textContent = "🤍";
          if (labelEl) labelEl.textContent = "Save Listing";
          showToast("Removed from saved", "info");
        }
        localStorage.setItem("dhoondho_favorites", JSON.stringify(ids));
      } catch {
        /* ignore */
      }
    });
  }

  // Contact / Callback modal
  document.getElementById("contact-btn")?.addEventListener("click", () => {
    const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">📞 Request Callback</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Leave your details and the vendor will contact you shortly.</p>
      <form id="lead-form">
        <input name="name" type="text" required placeholder="Your Name" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:10px;font-size:14px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:10px;font-size:14px;outline:none;margin-bottom:16px;box-sizing:border-box" />
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:11px;background:#1a7a3c;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer">Send Request</button>
          <button type="button" id="close-modal-btn" data-ocid="listing.cancel_button" style="flex:1;padding:11px;background:#f1f1f1;color:#3c4043;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
    overlay
      .querySelector("#close-modal-btn")
      ?.addEventListener("click", () => overlay.remove());
    overlay.querySelector("#lead-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const lead = {
        listingId,
        name: data.get("name"),
        phone: data.get("phone"),
        time: Date.now(),
      };
      try {
        const raw = localStorage.getItem("dhoondho_leads");
        const leads = raw ? JSON.parse(raw) : [];
        leads.push(lead);
        localStorage.setItem("dhoondho_leads", JSON.stringify(leads));
      } catch {
        /* ignore */
      }
      overlay.remove();
      showToast("Vendor will contact you shortly! ✓", "success");
    });
  });

  // Book Now modal
  document.getElementById("book-btn")?.addEventListener("click", () => {
    const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">📅 Book Appointment</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Fill in your details to request a booking.</p>
      <form id="book-form">
        <input name="name" type="text" required placeholder="Your Name" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:10px;font-size:14px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:10px;font-size:14px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <input name="datetime" type="datetime-local" style="width:100%;padding:10px 14px;border:1px solid #dadce0;border-radius:10px;font-size:14px;outline:none;margin-bottom:16px;box-sizing:border-box" />
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:11px;background:#1a7a3c;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer">Confirm Booking</button>
          <button type="button" id="close-book-btn" data-ocid="listing.cancel_button" style="flex:1;padding:11px;background:#f1f1f1;color:#3c4043;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
    overlay
      .querySelector("#close-book-btn")
      ?.addEventListener("click", () => overlay.remove());
    overlay.querySelector("#book-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const booking = {
        listingId,
        name: data.get("name"),
        phone: data.get("phone"),
        datetime: data.get("datetime"),
        time: Date.now(),
      };
      try {
        const raw = localStorage.getItem("dhoondho_bookings");
        const bookings = raw ? JSON.parse(raw) : [];
        bookings.push(booking);
        localStorage.setItem("dhoondho_bookings", JSON.stringify(bookings));
      } catch {
        /* ignore */
      }
      overlay.remove();
      showToast(
        "Booking request sent! Vendor will confirm shortly. 📅",
        "success",
      );
    });
  });

  // Reviews
  renderReviews(listingId);

  let selectedRating = 0;
  const stars = document.querySelectorAll<HTMLElement>(".star");
  for (const star of stars) {
    star.addEventListener("mouseover", () => {
      const val = Number(star.dataset.val);
      for (const s of stars)
        s.textContent = Number(s.dataset.val) <= val ? "★" : "☆";
    });
    star.addEventListener("mouseout", () => {
      for (const s of stars)
        s.textContent = Number(s.dataset.val) <= selectedRating ? "★" : "☆";
    });
    star.addEventListener("click", () => {
      selectedRating = Number(star.dataset.val);
      for (const s of stars)
        s.textContent = Number(s.dataset.val) <= selectedRating ? "★" : "☆";
    });
  }

  document
    .getElementById("submit-review-btn")
    ?.addEventListener("click", () => {
      if (selectedRating === 0) {
        showToast("Please select a star rating", "error");
        return;
      }
      const text = (
        document.getElementById("review-text") as HTMLTextAreaElement
      )?.value.trim();
      const review = { rating: selectedRating, text, time: Date.now() };
      try {
        const key = `dhoondho_reviews_${listingId}`;
        const raw = localStorage.getItem(key);
        const reviews = raw ? JSON.parse(raw) : [];
        reviews.unshift(review);
        localStorage.setItem(key, JSON.stringify(reviews));
      } catch {
        /* ignore */
      }
      selectedRating = 0;
      for (const s of stars) s.textContent = "☆";
      const ta = document.getElementById("review-text") as HTMLTextAreaElement;
      if (ta) ta.value = "";
      renderReviews(listingId);
      showToast("Review submitted! Thank you 🌟", "success");
    });
}

function renderReviews(listingId: string): void {
  const container = document.getElementById("reviews-list");
  if (!container) return;
  try {
    const key = `dhoondho_reviews_${listingId}`;
    const raw = localStorage.getItem(key);
    const reviews: Array<{ rating: number; text: string; time: number }> = raw
      ? JSON.parse(raw)
      : [];
    if (reviews.length === 0) {
      container.innerHTML = `<p style="font-size:14px;color:#9aa0a6;text-align:center;padding:12px 0">No reviews yet. Be the first to review!</p>`;
      return;
    }
    const avg = (
      reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    ).toFixed(1);
    container.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="font-size:28px;font-weight:800;color:#202124">${avg}</span>
        <div>
          <div style="font-size:18px;color:#FBBC05">${"★".repeat(Math.round(Number(avg)))}${"☆".repeat(5 - Math.round(Number(avg)))}</div>
          <div style="font-size:12px;color:#5f6368">${reviews.length} review${reviews.length !== 1 ? "s" : ""}</div>
        </div>
      </div>
      ${reviews
        .slice(0, 5)
        .map(
          (r, i) => `
        <div data-ocid="listing.item.${i + 1}" style="border-bottom:1px solid #f0f0f0;padding:12px 0">
          <div style="color:#FBBC05;font-size:16px;margin-bottom:4px">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
          ${r.text ? `<p style="font-size:13px;color:#3c4043;margin:0">${r.text}</p>` : ""}
          <p style="font-size:11px;color:#9aa0a6;margin:4px 0 0">${new Date(r.time).toLocaleDateString("en-IN")}</p>
        </div>
      `,
        )
        .join("")}
    `;
  } catch {
    container.innerHTML = "";
  }
}

export function cleanupListingPage(): void {
  if (detailMap) {
    try {
      detailMap.remove();
    } catch {
      /* ignore */
    }
    detailMap = null;
  }
}
