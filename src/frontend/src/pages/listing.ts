declare const L: any;

import { getBackend } from "../backend-client";
import { renderPageFooter } from "../components/footer";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import type { Listing } from "../data/sampleData";
import { getStatusBadge } from "../utils/business-hours";
import { awardPoints } from "../utils/contributor";
import { showToast } from "../utils/toast";

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

function getPriceRangeBadge(tier: string | number | undefined): string {
  if (!tier) return "";
  const n = Number(tier);
  const symbol = n === 1 ? "₹" : n === 2 ? "₹₹" : n === 3 ? "₹₹₹" : "";
  if (!symbol) return "";
  return `<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:#fff8e1;color:#f57f17;border:1px solid #ffe082">${symbol}</span>`;
}

const PLACEHOLDER_PHOTOS = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=300&fit=crop",
];

function renderPhotoGallery(): string {
  return `
    <div class="detail-card p-4 sm:p-6 mb-4">
      <h3 class="font-semibold text-sm mb-3" style="color:oklch(var(--foreground))">Photos</h3>
      <div id="photo-gallery" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin">
        ${PLACEHOLDER_PHOTOS.map((src, i) => `<img data-photo-index="${i}" src="${src}" alt="Business photo ${i + 1}" style="width:120px;height:90px;object-fit:cover;border-radius:10px;cursor:pointer;flex-shrink:0;transition:opacity 0.15s" loading="lazy" />`).join("")}
      </div>
    </div>
    <div id="photo-lightbox" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:10000;align-items:center;justify-content:center">
      <button id="lb-prev" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;width:48px;height:48px;border-radius:50%;cursor:pointer">&#8249;</button>
      <img id="lb-img" src="" alt="Photo" style="max-width:90vw;max-height:85vh;border-radius:12px;object-fit:contain" />
      <button id="lb-next" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;width:48px;height:48px;border-radius:50%;cursor:pointer">&#8250;</button>
      <button id="lb-close" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:22px;width:40px;height:40px;border-radius:50%;cursor:pointer">×</button>
    </div>
  `;
}

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
  } catch {
    // ignore map errors
  }
}

export async function renderListingPage(id: string): Promise<void> {
  const main = document.getElementById("main-content");
  if (!main) return;

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

  try {
    const { getCachedListings } = await import("./search");
    const cached = getCachedListings();
    const found = cached.find((l) => String(l.id) === id);
    if (found) listing = found;
  } catch {
    /* ignore */
  }

  if (!listing) {
    try {
      const raw = sessionStorage.getItem("dhoondho_listing_cache");
      if (raw) {
        const cached = JSON.parse(raw);
        const found = cached.find((l: { id: string }) => String(l.id) === id);
        if (found) {
          listing = {
            ...found,
            id: BigInt(found.id),
            categoryId: BigInt(found.categoryId),
            createdTime: BigInt(found.createdTime || "0"),
          } as Listing;
        }
      }
    } catch {
      /* ignore */
    }
  }

  if (!listing) {
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
      if (!listing) {
        const cities = [
          "",
          "Delhi",
          "Mumbai",
          "Bangalore",
          "Chennai",
          "Hyderabad",
          "Pune",
          "Kolkata",
          "Faridabad",
          "Noida",
          "Gurgaon",
        ];
        for (const city of cities) {
          const byCity = await backend.searchListingsByCity(city);
          const match = byCity.find((l) => String(l.id) === id);
          if (match) {
            listing = {
              id: match.id,
              name: match.name,
              categoryId: match.categoryId,
              status: String(match.status),
              city: match.city,
              state: match.state,
              address: match.address,
              phone: match.phone,
              website: match.website,
              description: match.description,
              photoIds: match.photoIds,
              createdTime: match.createdTime,
              location: match.location,
            };
            break;
          }
        }
      }
    } catch {
      /* fall through */
    }
  }

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
  const isFavorited = (() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("dhoondho_favorites") || "[]",
        ) as string[]
      ).includes(String(listing.id));
    } catch {
      return false;
    }
  })();

  main.innerHTML = `
    <style>
      .listing-detail-page { padding-bottom: 80px; }
      @media (min-width: 768px) { .listing-detail-page { padding-bottom: 24px; } }
      .detail-card { background:#fff; border-radius:16px; border:1px solid oklch(var(--border)); }
      .detail-action-btn {
        display:flex; align-items:center; gap:10px;
        padding:13px 16px; border-radius:12px;
        font-size:14px; font-weight:600;
        width:100%; text-align:left; cursor:pointer;
        transition:opacity 0.15s;
      }
      .detail-action-btn:active { opacity:0.75; }
      .detail-action-btn.primary { background:oklch(var(--primary)); color:#fff; border:none; }
      .detail-action-btn.outline-primary { background:transparent; border:1.5px solid oklch(var(--primary)); color:oklch(var(--primary)); }
      .detail-action-btn.outline { background:transparent; border:1.5px solid oklch(var(--border)); color:oklch(var(--foreground)); }
      .bottom-cta-bar {
        position:fixed; bottom:0; left:0; right:0;
        background:#fff; border-top:1px solid oklch(var(--border));
        padding:10px 16px 14px; z-index:100;
        display:flex; gap:10px;
        box-shadow:0 -2px 12px rgba(0,0,0,0.08);
      }
      @media (min-width: 768px) { .bottom-cta-bar { display:none !important; } }
      .bottom-cta-btn {
        flex:1; padding:12px; border-radius:12px;
        font-size:15px; font-weight:700;
        border:none; cursor:pointer;
        display:flex; align-items:center; justify-content:center; gap:6px;
      }
      .mobile-action-grid {
        display:grid; grid-template-columns:1fr 1fr; gap:8px;
      }
      @media (min-width: 640px) { .mobile-action-grid { grid-template-columns:repeat(4,1fr); } }
      .mini-action-btn {
        display:flex; align-items:center; justify-content:center; gap:6px;
        padding:10px 12px; border-radius:10px; font-size:12px; font-weight:600;
        border:1px solid oklch(var(--border)); background:#fff; cursor:pointer;
        color:oklch(var(--muted-foreground)); transition:background 0.15s;
        white-space:nowrap;
      }
      .mini-action-btn:active { background:#f5f5f5; }
      .mini-action-btn.danger { color:#dc2626; border-color:#fecaca; }
      #detail-map { height:240px; }
      @media (min-width: 768px) { #detail-map { height:340px; } }
    </style>

    <div class="listing-detail-page">
      <div class="max-w-4xl mx-auto px-3 sm:px-5 lg:px-8 pt-5 pb-6">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-1.5 text-xs sm:text-sm mb-4 overflow-x-auto whitespace-nowrap pb-1" style="color:oklch(var(--muted-foreground))">
          <a href="#/" data-ocid="listing.link" class="no-underline hover:underline flex-shrink-0" style="color:oklch(var(--primary))">Home</a>
          <span class="flex-shrink-0">/</span>
          <a href="#/search" data-ocid="listing.link" class="no-underline hover:underline flex-shrink-0" style="color:oklch(var(--primary))">Search</a>
          <span class="flex-shrink-0">/</span>
          <span class="truncate">${escapeHtml(listing.name)}</span>
        </nav>

        <!-- Business Header Card -->
        <div class="detail-card p-4 sm:p-6 mb-4">
          <div class="flex items-start gap-3 sm:gap-4 mb-4">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0" style="background:oklch(var(--secondary))">${category ? category.icon : "🏢"}</div>
            <div class="flex-1 min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold mb-1.5 leading-tight" style="color:oklch(var(--foreground))">${escapeHtml(listing.name)}</h1>
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium" style="background:oklch(var(--secondary));color:oklch(var(--secondary-foreground))">
                  ${category ? `${category.icon} ${escapeHtml(category.name)}` : "Business"}
                </span>
                ${isVerifiedListing(String(listing.id)) ? `<span class="px-2 py-0.5 rounded-full text-xs font-semibold" style="background:#e3f2fd;color:#1565c0">✓ Verified</span>` : ""}
                ${getPriceRangeBadge((listing as any).priceRange)}
                ${(listing as any).businessHours ? getStatusBadge((listing as any).businessHours) : ""}
              </div>
            </div>
          </div>

          <div class="space-y-2.5 mb-4">
            <div class="flex items-start gap-2.5">
              <svg class="flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="text-sm" style="color:oklch(var(--foreground))">${escapeHtml(listing.address)}, ${escapeHtml(listing.city)}, ${escapeHtml(listing.state)}</span>
            </div>
            ${
              listing.phone
                ? `<div class="flex items-center gap-2.5">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:${escapeHtml(listing.phone)}" class="text-sm font-semibold no-underline" style="color:oklch(var(--primary))">${escapeHtml(listing.phone)}</a>
            </div>`
                : ""
            }
            ${
              listing.website
                ? `<div class="flex items-center gap-2.5">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <a href="${listing.website?.startsWith("http") ? listing.website : listing.website ? `https://${listing.website}` : "#"}" target="_blank" rel="noopener" class="text-sm font-medium no-underline truncate max-w-xs" style="color:oklch(var(--primary))">${escapeHtml(listing.website)}</a>
            </div>`
                : ""
            }
          </div>

          ${
            (listing as any).businessHours
              ? `<div class="flex items-center gap-2.5">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--primary))"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span class="text-sm" style="color:oklch(var(--foreground))">${escapeHtml((listing as any).businessHours)}</span>
            </div>`
              : ""
          }

          ${
            listing.description
              ? `<div class="border-t pt-4" style="border-color:oklch(var(--border))">
            <h3 class="font-semibold text-sm mb-1.5" style="color:oklch(var(--foreground))">About</h3>
            <p class="text-sm leading-relaxed" style="color:oklch(var(--muted-foreground))">${escapeHtml(listing.description)}</p>
          </div>`
              : ""
          }
        </div>

        ${renderPhotoGallery()}

        <!-- Main grid: actions + map on mobile stacked, sidebar on desktop -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <!-- Left/Main column -->
          <div class="lg:col-span-2 space-y-4">

            <!-- Mobile Quick Actions (hidden on lg, shown on sidebar instead) -->
            <div class="detail-card p-4 lg:hidden">
              <h3 class="font-semibold text-sm mb-3" style="color:oklch(var(--foreground))">Quick Actions</h3>
              <div class="grid grid-cols-2 gap-2 mb-2">
                ${
                  listing.phone
                    ? `<a href="tel:${escapeHtml(listing.phone)}" data-ocid="listing.button" class="detail-action-btn primary no-underline" style="justify-content:center;text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Now
                </a>`
                    : ""
                }
                <button id="book-btn-mobile" data-ocid="listing.button" class="detail-action-btn outline-primary" style="justify-content:center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Now
                </button>
                <button id="contact-btn-mobile" data-ocid="listing.button" class="detail-action-btn outline" style="justify-content:center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Callback
                </button>
                <a href="${mapsUrl}" target="_blank" rel="noopener" data-ocid="listing.link" class="detail-action-btn outline no-underline" style="justify-content:center;text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                  Directions
                </a>
              </div>
              <button id="save-listing-btn" data-id="${listing.id}" data-ocid="listing.button" class="detail-action-btn outline w-full" style="justify-content:center">
                <span id="save-heart-icon">${isFavorited ? "❤️" : "🤍"}</span>
                <span id="save-label">${isFavorited ? "Saved" : "Save Listing"}</span>
              </button>
            </div>

            <!-- Map -->
            <div class="detail-card overflow-hidden">
              <div class="px-4 py-3 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
                <h3 class="font-semibold text-sm" style="color:oklch(var(--foreground))">Location on Map</h3>
                <a href="${mapsUrl}" target="_blank" rel="noopener" class="text-xs font-medium no-underline" style="color:oklch(var(--primary))">Open in Google Maps ↗</a>
              </div>
              <div id="detail-map"></div>
            </div>
          </div>

          <!-- Desktop Sidebar -->
          <div class="hidden lg:flex flex-col gap-4">
            <div class="detail-card p-5">
              <h3 class="font-semibold mb-4" style="color:oklch(var(--foreground))">Quick Actions</h3>
              <div class="space-y-2.5">
                ${
                  listing.phone
                    ? `<a href="tel:${escapeHtml(listing.phone)}" data-ocid="listing.button" class="detail-action-btn primary no-underline" style="text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Now
                </a>`
                    : ""
                }
                <button id="contact-btn" data-ocid="listing.button" class="detail-action-btn outline-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Request Callback
                </button>
                <button id="book-btn" data-ocid="listing.button" class="detail-action-btn outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  📅 Book Now
                </button>
                <button id="save-listing-btn-desktop" data-id="${listing.id}" data-ocid="listing.button" class="detail-action-btn outline">
                  <span id="save-heart-icon-desktop">${isFavorited ? "❤️" : "🤍"}</span>
                  <span id="save-label-desktop">${isFavorited ? "Saved" : "Save Listing"}</span>
                </button>
                <a href="${mapsUrl}" target="_blank" rel="noopener" data-ocid="listing.link" class="detail-action-btn outline no-underline" style="text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                  Get Directions
                </a>
                ${
                  listing.website
                    ? `<a href="${listing.website?.startsWith("http") ? listing.website : listing.website ? `https://${listing.website}` : "#"}" target="_blank" rel="noopener" data-ocid="listing.link" class="detail-action-btn outline no-underline" style="text-decoration:none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  Visit Website
                </a>`
                    : ""
                }
              </div>
            </div>

            <div class="detail-card p-5">
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

        <!-- Reviews Section -->
        <div class="detail-card mt-4 p-4 sm:p-6">
          <h3 class="font-bold text-base sm:text-lg mb-5" style="color:oklch(var(--foreground))">⭐ Reviews</h3>
          <div id="reviews-list" class="mb-5"></div>
          <div class="border-t pt-5" style="border-color:oklch(var(--border))">
            <h4 class="font-semibold mb-3 text-sm" style="color:oklch(var(--foreground))">Write a Review</h4>
            <div id="star-rating" class="flex gap-2 mb-3" style="font-size:32px;cursor:pointer">
              <span class="star" data-val="1">☆</span>
              <span class="star" data-val="2">☆</span>
              <span class="star" data-val="3">☆</span>
              <span class="star" data-val="4">☆</span>
              <span class="star" data-val="5">☆</span>
            </div>
            <textarea id="review-text" rows="3" placeholder="Share your experience with this business..." class="w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none" style="border-color:oklch(var(--border));box-sizing:border-box"></textarea>
            <button id="submit-review-btn" data-ocid="listing.submit_button" class="mt-3 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style="background:oklch(var(--primary))">Submit Review</button>
          </div>
        </div>

        <!-- Q&A Section -->
        <div class="detail-card mt-4 p-4 sm:p-6">
          <h3 class="font-bold text-base sm:text-lg mb-5" style="color:oklch(var(--foreground))">💬 Questions &amp; Answers</h3>
          <div id="qa-list" class="mb-5"></div>
          <div class="border-t pt-4" style="border-color:oklch(var(--border))">
            <h4 class="font-semibold mb-3 text-sm" style="color:oklch(var(--foreground))">Ask a Question</h4>
            <input id="qa-input" type="text" placeholder="e.g. What are the working hours?" class="w-full px-3 py-2.5 rounded-xl border text-sm outline-none mb-3" style="border-color:oklch(var(--border));box-sizing:border-box" />
            <button id="qa-submit-btn" data-ocid="listing.submit_button" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style="background:oklch(var(--primary))">Ask Question</button>
          </div>
        </div>

        <!-- Secondary Actions Row -->
        <div class="mt-4 mobile-action-grid">
          <button id="suggest-edit-btn" data-ocid="listing.button" class="mini-action-btn">✏️ Suggest Edit</button>
          <button id="claim-listing-btn" data-ocid="listing.button" class="mini-action-btn">🏢 Claim Listing</button>
          <button id="share-listing-btn" data-ocid="listing.button" class="mini-action-btn">🔗 Share</button>
          <button id="report-listing-btn" data-ocid="listing.button" class="mini-action-btn danger">🚩 Report</button>
        </div>

        <!-- More in city link (mobile only) -->
        <a href="#/search?city=${escapeHtml(listing.city)}" data-ocid="listing.link" class="lg:hidden block text-center px-4 py-3 mt-4 rounded-xl text-sm font-semibold border no-underline" style="border-color:oklch(var(--border));color:oklch(var(--foreground))">
          More in ${escapeHtml(listing.city)} &rarr;
        </a>

        ${renderPageFooter(main)}
      </div>
    </div>

    <!-- Sticky bottom CTA bar (mobile only) -->
    <div class="bottom-cta-bar">
      ${
        listing.phone
          ? `<a href="tel:${escapeHtml(listing.phone)}" data-ocid="listing.button" class="bottom-cta-btn no-underline" style="background:oklch(var(--primary));color:#fff;text-decoration:none">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Call Now
      </a>`
          : ""
      }
      <button id="book-btn-cta" data-ocid="listing.button" class="bottom-cta-btn" style="background:${listing.phone ? "oklch(var(--secondary))" : "oklch(var(--primary))"};color:${listing.phone ? "oklch(var(--secondary-foreground))" : "#fff"}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Book Now
      </button>
    </div>
  `;

  setTimeout(() => initDetailMap(listing!), 100);
  attachListingEvents(String(listing!.id));
}

function showModal(html: string): HTMLElement {
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.setAttribute("data-ocid", "listing.modal");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(2px);z-index:200;display:flex;align-items:flex-end;justify-content:center;padding:0";
  // On desktop center it, on mobile slide up from bottom
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:20px 20px 0 0;padding:24px 20px 32px;width:100%;max-width:480px;box-shadow:0 -4px 40px rgba(0,0,0,0.15);max-height:90vh;overflow-y:auto">
      <div style="width:40px;height:4px;background:#e0e0e0;border-radius:2px;margin:0 auto 20px"></div>
      ${html}
    </div>`;
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

  // Upgrade to centered modal on desktop
  const mq = window.matchMedia("(min-width: 640px)");
  function applyStyle(matches: boolean) {
    overlay.style.alignItems = matches ? "center" : "flex-end";
    const inner = overlay.querySelector("div") as HTMLElement;
    if (inner) {
      inner.style.borderRadius = matches ? "20px" : "20px 20px 0 0";
      inner.style.padding = matches ? "28px" : "24px 20px 32px";
    }
  }
  applyStyle(mq.matches);
  mq.addEventListener("change", (e) => applyStyle(e.matches));

  return overlay;
}

function openBookingModal(listingId: string): void {
  const overlay = showModal(`
    <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">📅 Book Appointment</h3>
    <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Fill in your details to request a booking.</p>
    <form id="book-form">
      <input name="name" type="text" required placeholder="Your Name" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
      <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
      <input name="datetime" type="datetime-local" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box" />
      <div style="display:flex;gap:10px">
        <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Confirm Booking</button>
        <button type="button" id="close-book-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
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
}

function openContactModal(listingId: string): void {
  const overlay = showModal(`
    <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">📞 Request Callback</h3>
    <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Leave your details and the vendor will contact you shortly.</p>
    <form id="lead-form">
      <input name="name" type="text" required placeholder="Your Name" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
      <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box" />
      <div style="display:flex;gap:10px">
        <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Send Request</button>
        <button type="button" id="close-modal-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
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
}

function toggleFavorite(
  listingId: string,
  heartIds: string[],
  labelIds: string[],
): void {
  try {
    const raw = localStorage.getItem("dhoondho_favorites");
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const idx = ids.indexOf(listingId);
    const isSaved = idx !== -1;
    if (!isSaved) ids.push(listingId);
    else ids.splice(idx, 1);
    localStorage.setItem("dhoondho_favorites", JSON.stringify(ids));
    for (const hid of heartIds) {
      const el = document.getElementById(hid);
      if (el) el.textContent = !isSaved ? "❤️" : "🤍";
    }
    for (const lid of labelIds) {
      const el = document.getElementById(lid);
      if (el) el.textContent = !isSaved ? "Saved" : "Save Listing";
    }
    showToast(
      !isSaved ? "Saved to favourites!" : "Removed from saved",
      !isSaved ? "success" : "info",
    );
  } catch {
    /* ignore */
  }
}

function attachListingEvents(listingId: string): void {
  // Save buttons (mobile + desktop)
  document
    .getElementById("save-listing-btn")
    ?.addEventListener("click", () =>
      toggleFavorite(listingId, ["save-heart-icon"], ["save-label"]),
    );
  document
    .getElementById("save-listing-btn-desktop")
    ?.addEventListener("click", () =>
      toggleFavorite(
        listingId,
        ["save-heart-icon-desktop"],
        ["save-label-desktop"],
      ),
    );

  // Book buttons (mobile panel + desktop sidebar + sticky bar)
  document
    .getElementById("book-btn")
    ?.addEventListener("click", () => openBookingModal(listingId));
  document
    .getElementById("book-btn-mobile")
    ?.addEventListener("click", () => openBookingModal(listingId));
  document
    .getElementById("book-btn-cta")
    ?.addEventListener("click", () => openBookingModal(listingId));

  // Contact buttons
  document
    .getElementById("contact-btn")
    ?.addEventListener("click", () => openContactModal(listingId));
  document
    .getElementById("contact-btn-mobile")
    ?.addEventListener("click", () => openContactModal(listingId));

  // Reviews
  renderReviews(listingId);
  renderQA(listingId);

  // Q&A submit
  document.getElementById("qa-submit-btn")?.addEventListener("click", () => {
    const input = document.getElementById("qa-input") as HTMLInputElement;
    const question = input?.value.trim();
    if (!question) return;
    try {
      const key = `dhoondho_qa_${listingId}`;
      const raw = localStorage.getItem(key);
      const items: Array<{ q: string; time: number }> = raw
        ? JSON.parse(raw)
        : [];
      items.unshift({ q: question, time: Date.now() });
      localStorage.setItem(key, JSON.stringify(items));
      if (input) input.value = "";
      renderQA(listingId);
      showToast("Question submitted! ✓", "success");
    } catch {
      /* ignore */
    }
  });

  // Suggest Edit
  document.getElementById("suggest-edit-btn")?.addEventListener("click", () => {
    const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">✏️ Suggest an Edit</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Found incorrect information? Help us improve this listing.</p>
      <form id="suggest-form">
        <select name="field" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box">
          <option value="">What needs to be updated?</option>
          <option value="name">Business Name</option>
          <option value="address">Address</option>
          <option value="phone">Phone Number</option>
          <option value="category">Category</option>
          <option value="description">Description</option>
          <option value="hours">Business Hours</option>
          <option value="other">Other</option>
        </select>
        <textarea name="suggestion" rows="3" required placeholder="Describe the correct information..." style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box;resize:none"></textarea>
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Submit</button>
          <button type="button" id="close-suggest-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
    overlay
      .querySelector("#close-suggest-btn")
      ?.addEventListener("click", () => overlay.remove());
    overlay.querySelector("#suggest-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      try {
        const raw = localStorage.getItem("dhoondho_suggestions") || "[]";
        const items = JSON.parse(raw);
        items.push({
          listingId,
          field: data.get("field"),
          suggestion: data.get("suggestion"),
          time: Date.now(),
        });
        localStorage.setItem("dhoondho_suggestions", JSON.stringify(items));
      } catch {
        /* ignore */
      }
      overlay.remove();
      awardPoints("suggest_edit");
      showToast(
        "Thank you! Your suggestion has been submitted. ✓ +5 pts",
        "success",
      );
    });
  });

  // Claim Listing
  document
    .getElementById("claim-listing-btn")
    ?.addEventListener("click", () => {
      const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">🏢 Claim this Listing</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Are you the owner? Claim this listing to manage your business profile.</p>
      <form id="claim-form">
        <input name="ownerName" type="text" required placeholder="Your Name" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <input name="phone" type="tel" required placeholder="Your Phone Number" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box" />
        <textarea name="proof" rows="2" placeholder="How can you prove ownership? (optional)" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box;resize:none"></textarea>
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#1a7a3c;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Submit Claim</button>
          <button type="button" id="close-claim-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
      overlay
        .querySelector("#close-claim-btn")
        ?.addEventListener("click", () => overlay.remove());
      overlay.querySelector("#claim-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        try {
          const raw = localStorage.getItem("dhoondho_claims") || "[]";
          const items = JSON.parse(raw);
          items.push({
            listingId,
            ownerName: data.get("ownerName"),
            phone: data.get("phone"),
            proof: data.get("proof"),
            time: Date.now(),
          });
          localStorage.setItem("dhoondho_claims", JSON.stringify(items));
        } catch {
          /* ignore */
        }
        overlay.remove();
        showToast(
          "Claim request submitted! We'll review it shortly. 🏢",
          "success",
        );
      });
    });

  // Share
  document
    .getElementById("share-listing-btn")
    ?.addEventListener("click", async () => {
      const url = window.location.href;
      const title =
        document.querySelector("h1")?.textContent || "Dhoondho Listing";
      if (navigator.share) {
        try {
          await navigator.share({ title, url });
          return;
        } catch {
          /* ignore */
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard! 🔗", "success");
      } catch {
        showToast(`Copy this link: ${url}`, "info");
      }
    });

  // Report
  document
    .getElementById("report-listing-btn")
    ?.addEventListener("click", () => {
      const overlay = showModal(`
      <h3 style="font-size:17px;font-weight:700;color:#202124;margin-bottom:4px">🚩 Report this Listing</h3>
      <p style="font-size:13px;color:#5f6368;margin-bottom:18px">Help us keep Dhoondho accurate and trustworthy.</p>
      <form id="report-form">
        <select name="reason" required style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:10px;box-sizing:border-box">
          <option value="">Select a reason</option>
          <option value="closed">Business is closed</option>
          <option value="wrong-info">Wrong information</option>
          <option value="duplicate">Duplicate listing</option>
          <option value="spam">Spam or fake listing</option>
          <option value="inappropriate">Inappropriate content</option>
          <option value="other">Other</option>
        </select>
        <textarea name="details" rows="2" placeholder="Additional details (optional)" style="width:100%;padding:11px 14px;border:1.5px solid #dadce0;border-radius:12px;font-size:15px;outline:none;margin-bottom:18px;box-sizing:border-box;resize:none"></textarea>
        <div style="display:flex;gap:10px">
          <button type="submit" data-ocid="listing.confirm_button" style="flex:1;padding:13px;background:#dc2626;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">Submit Report</button>
          <button type="button" id="close-report-btn" data-ocid="listing.cancel_button" style="flex:1;padding:13px;background:#f1f1f1;color:#3c4043;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer">Cancel</button>
        </div>
      </form>
    `);
      overlay
        .querySelector("#close-report-btn")
        ?.addEventListener("click", () => overlay.remove());
      overlay.querySelector("#report-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        try {
          const raw = localStorage.getItem("dhoondho_reports") || "[]";
          const items = JSON.parse(raw);
          items.push({
            listingId,
            reason: data.get("reason"),
            details: data.get("details"),
            time: Date.now(),
          });
          localStorage.setItem("dhoondho_reports", JSON.stringify(items));
        } catch {
          /* ignore */
        }
        overlay.remove();
        showToast(
          "Report submitted. Thank you for helping keep Dhoondho accurate. ✓",
          "success",
        );
      });
    });

  // Star rating
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

function renderQA(listingId: string): void {
  const container = document.getElementById("qa-list");
  if (!container) return;
  try {
    const key = `dhoondho_qa_${listingId}`;
    const raw = localStorage.getItem(key);
    const items: Array<{ q: string; time: number }> = raw
      ? JSON.parse(raw)
      : [];
    if (items.length === 0) {
      container.innerHTML = `<p style="font-size:14px;color:#9aa0a6;text-align:center;padding:8px 0">No questions yet. Be the first to ask!</p>`;
      return;
    }
    container.innerHTML = items
      .slice(0, 5)
      .map(
        (item, i) => `
      <div data-ocid="listing.item.${i + 1}" style="padding:10px 0;border-bottom:1px solid #f0f0f0">
        <div style="font-size:13px;font-weight:600;color:#202124;margin-bottom:4px">❓ ${escapeHtml(item.q || "")}</div>
        <div style="font-size:11px;color:#9aa0a6">${new Date(item.time).toLocaleDateString("en-IN")}</div>
      </div>
    `,
      )
      .join("");
  } catch {
    container.innerHTML = "";
  }
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
          ${r.text ? `<p style="font-size:13px;color:#3c4043;margin:0">${escapeHtml(r.text)}</p>` : ""}
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
