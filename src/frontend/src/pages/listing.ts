declare const L: any;

import { getBackend } from "../backend-client";
import { renderPageFooter } from "../components/footer";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import type { Listing } from "../data/sampleData";

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
    ${renderPageFooter(main)}
    </div>
  `;

  // Initialize map after DOM is ready
  setTimeout(() => initDetailMap(listing!), 100);
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
