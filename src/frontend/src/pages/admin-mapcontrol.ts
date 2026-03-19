// ─── Map Control Module ─────────────────────────────────────────────────────────

export function renderMapControlTab(container: HTMLElement): void {
  // Pull any cached listings from localStorage
  let listings: Array<{
    id: string;
    name: string;
    city: string;
    address: string;
    lat?: number;
    lng?: number;
    category: string;
    status: string;
  }> = [];
  try {
    const cached = JSON.parse(
      localStorage.getItem("dhoondho_listings_cache") || "[]",
    );
    listings = cached.map((l: Record<string, unknown>) => ({
      id: String(l.id ?? ""),
      name: String(l.name ?? "Unknown"),
      city: String(l.city ?? ""),
      address: String(l.address ?? ""),
      lat: typeof l.lat === "number" ? l.lat : undefined,
      lng: typeof l.lng === "number" ? l.lng : undefined,
      category: String(l.category ?? ""),
      status: String(l.status ?? "active"),
    }));
  } catch {
    /* empty */
  }

  // Fallback demo data if no real listings
  if (listings.length === 0) {
    listings = [
      {
        id: "1",
        name: "MediMarkit India",
        city: "Delhi",
        address: "Connaught Place, New Delhi",
        lat: 28.6315,
        lng: 77.2167,
        category: "Medical",
        status: "active",
      },
      {
        id: "2",
        name: "Sharma Electricals",
        city: "Mumbai",
        address: "Bandra West, Mumbai",
        lat: 19.0596,
        lng: 72.8295,
        category: "Electricians",
        status: "active",
      },
      {
        id: "3",
        name: "Kumar Plumbers",
        city: "Bangalore",
        address: "Koramangala, Bangalore",
        lat: 12.9352,
        lng: 77.6245,
        category: "Plumbers",
        status: "active",
      },
      {
        id: "4",
        name: "Raj Tutors Academy",
        city: "Hyderabad",
        address: "Banjara Hills, Hyderabad",
        lat: 17.4126,
        lng: 78.4071,
        category: "Tutors",
        status: "flagged",
      },
      {
        id: "5",
        name: "Priya Beauty Salon",
        city: "Chennai",
        address: "T Nagar, Chennai",
        lat: 13.0418,
        lng: 80.2341,
        category: "Beauty",
        status: "active",
      },
    ];
  }

  const flagged = listings.filter((l) => l.status === "flagged").length;
  const withCoords = listings.filter((l) => l.lat && l.lng).length;

  container.innerHTML = `
    <div class="space-y-5">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Map Control</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">${listings.length} listings · ${withCoords} with coordinates · ${flagged} flagged</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          {
            label: "Total Pins",
            val: listings.length,
            color: "oklch(var(--primary))",
          },
          { label: "With Coords", val: withCoords, color: "#1a7a3c" },
          { label: "Flagged", val: flagged, color: "#b71c1c" },
          {
            label: "No Coords",
            val: listings.length - withCoords,
            color: "#e65100",
          },
        ]
          .map(
            (
              s,
            ) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s.color}">${s.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s.label}</div>
        </div>`,
          )
          .join("")}
      </div>

      <!-- Map Info Box -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-2" style="color:oklch(var(--foreground))">Map Coverage by City</h3>
        <div class="space-y-2">
          ${Object.entries(
            listings.reduce<Record<string, number>>((acc, l) => {
              acc[l.city] = (acc[l.city] || 0) + 1;
              return acc;
            }, {}),
          )
            .map(
              ([city, count]) => `
            <div class="flex items-center justify-between text-sm">
              <span style="color:oklch(var(--foreground))">📍 ${city}</span>
              <span class="font-semibold" style="color:oklch(var(--primary))">${count} listing${count > 1 ? "s" : ""}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Listings Table with Map Actions -->
      <div class="rounded-xl border" style="border-color:oklch(var(--border))">
        <div class="p-4 border-b flex items-center justify-between" style="border-color:oklch(var(--border))">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">All Map Pins</h3>
          <input id="map-search" type="text" placeholder="Filter listings..." class="px-3 py-1.5 rounded-lg border text-sm" style="border-color:oklch(var(--border));width:200px">
        </div>
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:600px;border-collapse:collapse">
            <thead><tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Listing</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">City</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Coordinates</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
            </tr></thead>
            <tbody id="map-pins-table">
              ${renderMapPinsRows(listings)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.querySelector("#map-search")?.addEventListener("input", (e) => {
    const q = ((e.currentTarget as HTMLInputElement).value || "").toLowerCase();
    const filtered = listings.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q),
    );
    const tbody = container.querySelector("#map-pins-table");
    if (tbody) tbody.innerHTML = renderMapPinsRows(filtered);
    attachMapActions(container, listings);
  });

  attachMapActions(container, listings);
}

function renderMapPinsRows(
  listings: Array<{
    id: string;
    name: string;
    city: string;
    address: string;
    lat?: number;
    lng?: number;
    status: string;
  }>,
): string {
  if (listings.length === 0)
    return `<tr><td colspan="5" class="px-4 py-8 text-center text-sm" style="color:oklch(var(--muted-foreground))">No listings found.</td></tr>`;
  return listings
    .map(
      (l) => `
    <tr data-pin-id="${l.id}" style="border-bottom:1px solid oklch(var(--border))">
      <td class="px-4 py-3 text-sm font-semibold" style="color:oklch(var(--foreground))">${l.name}</td>
      <td class="px-4 py-3 text-sm" style="color:oklch(var(--muted-foreground))">${l.city}</td>
      <td class="px-4 py-3 text-xs" style="color:oklch(var(--muted-foreground))">${l.lat && l.lng ? `${l.lat.toFixed(4)}, ${l.lng.toFixed(4)}` : '<span style="color:#e65100">No coords</span>'}</td>
      <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${l.status === "active" ? "#e8f5e9" : l.status === "flagged" ? "#fdecea" : "#f5f5f5"};color:${l.status === "active" ? "#1a7a3c" : l.status === "flagged" ? "#b71c1c" : "#757575"}">${l.status}</span></td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          ${l.lat && l.lng ? `<a href="https://maps.google.com?q=${l.lat},${l.lng}" target="_blank" class="text-xs px-3 py-1 rounded-lg font-semibold" style="background:#e3f2fd;color:#0d47a1">View on Map</a>` : ""}
          ${l.status !== "flagged" ? `<button class="map-flag-btn text-xs px-3 py-1 rounded-lg font-semibold" data-id="${l.id}" style="background:#fff3e0;color:#e65100">Flag</button>` : `<button class="map-unflag-btn text-xs px-3 py-1 rounded-lg font-semibold" data-id="${l.id}" style="background:#e8f5e9;color:#1a7a3c">Unflag</button>`}
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

function attachMapActions(
  container: HTMLElement,
  listings: Array<{
    id: string;
    name: string;
    city: string;
    address: string;
    lat?: number;
    lng?: number;
    status: string;
  }>,
): void {
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".map-flag-btn, .map-unflag-btn"),
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const item = listings.find((l) => l.id === id);
      if (!item) return;
      item.status = item.status === "flagged" ? "active" : "flagged";
      const tbody = container.querySelector("#map-pins-table");
      if (tbody) tbody.innerHTML = renderMapPinsRows(listings);
      attachMapActions(container, listings);
    });
  }
}
