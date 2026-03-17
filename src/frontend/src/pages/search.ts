declare const L: any;

import { getBackend } from "../backend-client";
import {
  CITY_COORDINATES,
  SAMPLE_CATEGORIES,
  SAMPLE_LISTINGS,
} from "../data/sampleData";
import type { Category, Listing } from "../data/sampleData";

let mapInstance: any = null;
let currentListings: Listing[] = [];
let activeView: "list" | "map" = "list";

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

function getCategoryIcon(categoryId: bigint): string {
  const cat = SAMPLE_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.icon : "🏢";
}

function listingCard(listing: Listing, index: number): string {
  return `
    <a href="#/listing/${listing.id}" data-ocid="search.item.${index + 1}" class="block bg-white rounded-xl border hover:shadow-md transition-shadow no-underline" style="border-color:oklch(var(--border))">
      <div class="p-5">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-base truncate" style="color:oklch(var(--foreground))">${escapeHtml(listing.name)}</h3>
            <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium mt-1" style="background:oklch(var(--secondary));color:oklch(var(--secondary-foreground))">
              ${getCategoryIcon(listing.categoryId)} ${escapeHtml(getCategoryName(listing.categoryId))}
            </span>
          </div>
          <span class="text-2xl flex-shrink-0">${getCategoryIcon(listing.categoryId)}</span>
        </div>
        <p class="text-xs mb-2 flex items-center gap-1" style="color:oklch(var(--muted-foreground))">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          ${escapeHtml(listing.address)}, ${escapeHtml(listing.city)}
        </p>
        ${
          listing.phone
            ? `<p class="text-xs flex items-center gap-1" style="color:oklch(var(--muted-foreground))">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${escapeHtml(listing.phone)}
        </p>`
            : ""
        }
        <p class="text-sm mt-2 line-clamp-2" style="color:oklch(var(--muted-foreground))">${escapeHtml(listing.description)}</p>
      </div>
    </a>
  `;
}

function destroyMap(): void {
  if (mapInstance) {
    try {
      mapInstance.remove();
    } catch {
      // ignore errors during cleanup
    }
    mapInstance = null;
  }
}

function initMap(listings: Listing[], city: string): void {
  const container = document.getElementById("map-container");
  if (!container) return;

  // Destroy existing map
  destroyMap();

  // Determine center
  let center = { lat: 20.5937, lng: 78.9629 }; // India center
  if (city && CITY_COORDINATES[city]) {
    center = CITY_COORDINATES[city];
  } else if (listings.length > 0) {
    center = { lat: listings[0].location.lat, lng: listings[0].location.lng };
  }

  try {
    mapInstance = L.map(container, {
      center: [center.lat, center.lng],
      zoom: city ? 12 : 5,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance);

    for (const listing of listings) {
      const marker = L.marker([listing.location.lat, listing.location.lng]);
      marker.bindPopup(`
        <div style="min-width:180px">
          <strong>${escapeHtml(listing.name)}</strong><br/>
          <span style="color:#666;font-size:12px">${getCategoryIcon(listing.categoryId)} ${escapeHtml(getCategoryName(listing.categoryId))}</span><br/>
          <span style="color:#666;font-size:12px">${escapeHtml(listing.address)}</span><br/>
          ${listing.phone ? `<span style="font-size:12px">${escapeHtml(listing.phone)}</span><br/>` : ""}
          <a href="#/listing/${listing.id}" style="font-size:12px;color:#2563eb">View Details &rarr;</a>
        </div>
      `);
      marker.addTo(mapInstance);
    }

    // Invalidate size after render
    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize();
    }, 100);
  } catch (err) {
    console.error("Map init error:", err);
  }
}

function renderListings(listings: Listing[], loading: boolean): void {
  const listContainer = document.getElementById("listings-list");
  if (!listContainer) return;

  if (loading) {
    listContainer.innerHTML = `<div data-ocid="search.loading_state" class="col-span-full text-center py-16"><div class="inline-block w-8 h-8 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div><p class="mt-3 text-sm" style="color:oklch(var(--muted-foreground))">Searching businesses...</p></div>`;
    return;
  }

  if (listings.length === 0) {
    listContainer.innerHTML = `
      <div data-ocid="search.empty_state" class="col-span-full text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-lg font-semibold mb-2" style="color:oklch(var(--foreground))">No businesses found</h3>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Try searching in a different city or category</p>
      </div>
    `;
    return;
  }

  const countEl = document.getElementById("results-count");
  if (countEl) countEl.textContent = `${listings.length} businesses found`;

  listContainer.innerHTML = listings.map(listingCard).join("");
}

export async function renderSearchPage(params: URLSearchParams): Promise<void> {
  const main = document.getElementById("main-content");
  if (!main) return;

  const city = params.get("city") || "";
  const category = params.get("category") || "";
  const lat = params.get("lat");
  const lng = params.get("lng");

  // Destroy any existing map when re-rendering
  destroyMap();

  main.innerHTML = `
    <div class="min-h-screen" style="background:oklch(var(--secondary))">
      <!-- Search Header -->
      <div class="bg-white border-b" style="border-color:oklch(var(--border))">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:oklch(var(--muted-foreground))"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <input
                id="search-city-input"
                data-ocid="search.search_input"
                type="text"
                placeholder="Enter city name"
                value="${escapeHtml(city)}"
                class="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm border outline-none focus:ring-2"
                style="border-color:oklch(var(--border));focus:ring-color:oklch(var(--ring))"
                list="city-list"
              />
              <datalist id="city-list">
                ${Object.keys(CITY_COORDINATES)
                  .map((c) => `<option value="${c}">`)
                  .join("")}
              </datalist>
            </div>
            <button
              id="search-go-btn"
              data-ocid="search.submit_button"
              class="px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style="background:oklch(var(--primary))"
            >
              Search
            </button>
            <button
              id="search-gps-btn"
              data-ocid="search.secondary_button"
              class="px-4 py-2.5 rounded-lg text-sm font-medium border hover:bg-gray-50 transition-colors"
              style="border-color:oklch(var(--border));color:oklch(var(--foreground))"
              title="Use my location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4"/><path d="M12 19v4"/><path d="m4.22 4.22 2.83 2.83"/><path d="m16.95 16.95 2.83 2.83"/><path d="M1 12h4"/><path d="M19 12h4"/><path d="m4.22 19.78 2.83-2.83"/><path d="m16.95 7.05 2.83-2.83"/></svg>
            </button>
          </div>

          <!-- Category Filters -->
          <div class="mt-3 flex gap-2 overflow-x-auto pb-1" id="category-filters">
            <button data-cat="" data-ocid="search.tab" class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!category ? "text-white" : "border"}" style="${!category ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}">
              All
            </button>
            ${SAMPLE_CATEGORIES.map(
              (cat) => `
              <button data-cat="${escapeHtml(cat.name)}" data-ocid="search.tab" class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${category === cat.name ? "text-white" : "border"}" style="${category === cat.name ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}"> 
                ${cat.icon} ${escapeHtml(cat.name)}
              </button>
            `,
            ).join("")}
          </div>
        </div>
      </div>

      <!-- Results Area -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Controls -->
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
          <p id="results-count" class="text-sm font-medium" style="color:oklch(var(--muted-foreground))">Loading...</p>
          <div class="flex items-center gap-2">
            <span class="text-sm" style="color:oklch(var(--muted-foreground))">View:</span>
            <button id="view-list-btn" data-ocid="search.toggle" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${activeView === "list" ? "text-white" : "border"}" style="${activeView === "list" ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              List
            </button>
            <button id="view-map-btn" data-ocid="search.toggle" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${activeView === "map" ? "text-white" : "border"}" style="${activeView === "map" ? "background:oklch(var(--primary))" : "border-color:oklch(var(--border));color:oklch(var(--muted-foreground))"}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
              Map
            </button>
          </div>
        </div>

        <!-- List View -->
        <div id="list-view" class="${activeView === "map" ? "hidden" : ""}">
          <div id="listings-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div data-ocid="search.loading_state" class="col-span-full text-center py-16">
              <div class="inline-block w-8 h-8 border-4 rounded-full animate-spin" style="border-color:oklch(var(--primary));border-top-color:transparent"></div>
              <p class="mt-3 text-sm" style="color:oklch(var(--muted-foreground))">Searching businesses...</p>
            </div>
          </div>
        </div>

        <!-- Map View -->
        <div id="map-view" class="${activeView === "list" ? "hidden" : ""}">
          <div id="map-container" style="height:600px;border-radius:12px;overflow:hidden;border:1px solid oklch(var(--border))"></div>
        </div>
      </div>
    </div>
  `;

  attachSearchEvents(city, category);

  // Load listings
  await loadSearchResults(
    city,
    category,
    lat ? Number.parseFloat(lat) : undefined,
    lng ? Number.parseFloat(lng) : undefined,
  );
}

function switchView(view: "list" | "map", city: string): void {
  activeView = view;
  const listView = document.getElementById("list-view");
  const mapView = document.getElementById("map-view");
  const listBtn = document.getElementById("view-list-btn");
  const mapBtn = document.getElementById("view-map-btn");

  if (!listView || !mapView) return;

  if (view === "list") {
    listView.classList.remove("hidden");
    mapView.classList.add("hidden");
    destroyMap();
    if (listBtn) {
      listBtn.style.background = "oklch(var(--primary))";
      listBtn.style.color = "white";
      listBtn.style.border = "none";
    }
    if (mapBtn) {
      mapBtn.style.background = "";
      mapBtn.style.color = "oklch(var(--muted-foreground))";
      mapBtn.style.border = "1px solid oklch(var(--border))";
    }
  } else {
    listView.classList.add("hidden");
    mapView.classList.remove("hidden");
    if (listBtn) {
      listBtn.style.background = "";
      listBtn.style.color = "oklch(var(--muted-foreground))";
      listBtn.style.border = "1px solid oklch(var(--border))";
    }
    if (mapBtn) {
      mapBtn.style.background = "oklch(var(--primary))";
      mapBtn.style.color = "white";
      mapBtn.style.border = "none";
    }
    // Small delay to ensure DOM is ready
    setTimeout(() => initMap(currentListings, city), 50);
  }
}

function attachSearchEvents(city: string, category: string): void {
  let currentCity = city;
  let currentCategory = category;

  const cityInput = document.getElementById(
    "search-city-input",
  ) as HTMLInputElement;
  const goBtn = document.getElementById("search-go-btn");
  const gpsBtn = document.getElementById("search-gps-btn");
  const viewListBtn = document.getElementById("view-list-btn");
  const viewMapBtn = document.getElementById("view-map-btn");

  function doSearch(): void {
    const newCity = cityInput?.value.trim() || "";
    const params = new URLSearchParams();
    if (newCity) params.set("city", newCity);
    if (currentCategory) params.set("category", currentCategory);
    window.location.hash = `#/search?${params.toString()}`;
  }

  goBtn?.addEventListener("click", doSearch);
  cityInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") doSearch();
  });

  gpsBtn?.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.location.hash = `#/search?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`;
      },
      () => alert("Could not get location."),
    );
  });

  viewListBtn?.addEventListener("click", () => switchView("list", currentCity));
  viewMapBtn?.addEventListener("click", () => switchView("map", currentCity));

  // Category filter tabs
  for (const btn of document.querySelectorAll<HTMLElement>("[data-cat]")) {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat || "";
      // Update tab styles
      for (const b of document.querySelectorAll<HTMLElement>("[data-cat]")) {
        if (b.dataset.cat === currentCategory) {
          b.style.background = "oklch(var(--primary))";
          b.style.color = "white";
          b.style.border = "none";
        } else {
          b.style.background = "";
          b.style.color = "oklch(var(--muted-foreground))";
          b.style.border = "1px solid oklch(var(--border))";
        }
      }
      // Filter displayed listings
      const filtered = currentCategory
        ? currentListings.filter((l) => {
            const cat = SAMPLE_CATEGORIES.find((c) => c.id === l.categoryId);
            return cat?.name === currentCategory;
          })
        : currentListings;
      renderListings(filtered, false);
      if (activeView === "map") initMap(filtered, currentCity);
    });
  }
}

async function loadSearchResults(
  city: string,
  category: string,
  lat?: number,
  lng?: number,
): Promise<void> {
  renderListings([], true);

  let listings: Listing[] = [];

  // Try backend first
  try {
    const backend = await getBackend();
    let backendListings: Array<import("../backend").Listing> | undefined;
    if (lat !== undefined && lng !== undefined) {
      const catId = category
        ? (SAMPLE_CATEGORIES.find((c) => c.name === category)?.id ?? 0n)
        : 0n;
      const { SortBy } = await import("../backend");
      backendListings = await backend.getListingsByCategoryAndLocation(
        catId,
        { lat, lng },
        25,
        SortBy.byDistance,
      );
    } else if (city) {
      backendListings = await backend.searchListingsByCity(city);
    }
    if (backendListings && backendListings.length > 0) {
      listings = backendListings.map((l) => ({
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
    }
  } catch {
    // Fall back to sample data
  }

  // Fall back to sample data
  if (listings.length === 0) {
    listings = SAMPLE_LISTINGS.filter((l) => {
      const cityMatch =
        !city || l.city.toLowerCase().includes(city.toLowerCase());
      const catName =
        SAMPLE_CATEGORIES.find((c) => c.id === l.categoryId)?.name || "";
      const catMatch = !category || catName === category;
      return cityMatch && catMatch;
    });

    // If no city filter, show all
    if (!city && !category) listings = SAMPLE_LISTINGS;
  }

  currentListings = listings;

  // Apply category filter if active
  const filtered = category
    ? listings.filter((l) => {
        const cat = SAMPLE_CATEGORIES.find((c) => c.id === l.categoryId);
        return cat?.name === category;
      })
    : listings;

  currentListings = listings;
  renderListings(filtered, false);

  if (activeView === "map") initMap(filtered, city);
}

// Cleanup function to be called when leaving search page
export function cleanupSearchPage(): void {
  destroyMap();
  activeView = "list";
}
