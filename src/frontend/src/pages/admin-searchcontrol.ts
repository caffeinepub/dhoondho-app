// ─── Search Control / Ranking Module ───────────────────────────────────────────────

export interface SearchBoost {
  id: string;
  listingName: string;
  city: string;
  category: string;
  boostLevel: 1 | 2 | 3; // 1=silver, 2=gold, 3=platinum
  expiresAt: string;
  active: boolean;
}

export interface SearchBannedTerm {
  id: string;
  term: string;
  reason: string;
  addedAt: string;
}

export interface TrendingSearch {
  term: string;
  count: number;
  trend: "up" | "down" | "stable";
}

const BOOSTS_KEY = "dhoondho_search_boosts";
const BANNED_KEY = "dhoondho_banned_terms";

function getBoosts(): SearchBoost[] {
  try {
    return JSON.parse(localStorage.getItem(BOOSTS_KEY) || "[]");
  } catch {
    return [];
  }
}
function getBanned(): SearchBannedTerm[] {
  try {
    return JSON.parse(localStorage.getItem(BANNED_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveBoosts(d: SearchBoost[]) {
  localStorage.setItem(BOOSTS_KEY, JSON.stringify(d));
}
function saveBanned(d: SearchBannedTerm[]) {
  localStorage.setItem(BANNED_KEY, JSON.stringify(d));
}

const TRENDING: TrendingSearch[] = [
  { term: "plumber near me", count: 1840, trend: "up" },
  { term: "electrician delhi", count: 1520, trend: "up" },
  { term: "doctor bangalore", count: 1280, trend: "stable" },
  { term: "restaurant mumbai", count: 1100, trend: "down" },
  { term: "tutor hyderabad", count: 890, trend: "up" },
  { term: "salon pune", count: 670, trend: "stable" },
  { term: "ac repair chennai", count: 540, trend: "up" },
  { term: "lawyer delhi", count: 420, trend: "down" },
];

function initDemoBoosts(): void {
  if (getBoosts().length > 0) return;
  saveBoosts([
    {
      id: "b1",
      listingName: "MediMarkit India",
      city: "Delhi",
      category: "Medical",
      boostLevel: 3,
      expiresAt: "2026-04-01",
      active: true,
    },
    {
      id: "b2",
      listingName: "Sharma Electricals",
      city: "Mumbai",
      category: "Electricians",
      boostLevel: 2,
      expiresAt: "2026-03-31",
      active: true,
    },
    {
      id: "b3",
      listingName: "Kumar Plumbers",
      city: "Bangalore",
      category: "Plumbers",
      boostLevel: 1,
      expiresAt: "2026-03-25",
      active: false,
    },
  ]);
}

const BOOST_LABELS: Record<
  number,
  { label: string; color: string; bg: string }
> = {
  1: { label: "Silver", color: "#757575", bg: "#f5f5f5" },
  2: { label: "Gold", color: "#b45309", bg: "#fff9c4" },
  3: { label: "Platinum", color: "#6a1b9a", bg: "#f3e5f5" },
};

export function renderSearchControlTab(container: HTMLElement): void {
  initDemoBoosts();
  const boosts = getBoosts();
  const banned = getBanned();

  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Search Control & Ranking</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Boost listings, manage banned terms, and view search trends</p>
      </div>

      <!-- Trending Searches -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Trending Searches</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${TRENDING.map(
            (t, i) => `
            <div class="flex items-center justify-between p-3 rounded-xl" style="background:oklch(var(--muted)/0.2)">
              <div class="flex items-center gap-3">
                <span class="text-sm font-bold" style="color:oklch(var(--muted-foreground))">#${i + 1}</span>
                <span class="text-sm" style="color:oklch(var(--foreground))">${t.term}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs" style="color:oklch(var(--muted-foreground))">${t.count.toLocaleString()}</span>
                <span style="color:${t.trend === "up" ? "#1a7a3c" : t.trend === "down" ? "#b71c1c" : "#757575"}">${t.trend === "up" ? "↑" : t.trend === "down" ? "↓" : "→"}</span>
              </div>
            </div>
          `,
          ).join("")}
        </div>
      </div>

      <!-- Boosted Listings -->
      <div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">Boosted Listings</h3>
          <button id="add-boost-btn" class="text-xs px-4 py-2 rounded-lg font-semibold text-white" style="background:oklch(var(--primary))">+ Add Boost</button>
        </div>

        <!-- Add Boost Form -->
        <div id="add-boost-form" class="hidden mb-4 p-4 rounded-xl border" style="border-color:oklch(var(--border));background:#fafafa">
          <form id="boost-form" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold mb-1">Listing Name</label><input name="listingName" required type="text" placeholder="Business name" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))"></div>
            <div><label class="block text-xs font-semibold mb-1">City</label><input name="city" required type="text" placeholder="City" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))"></div>
            <div><label class="block text-xs font-semibold mb-1">Boost Level</label>
              <select name="boostLevel" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
                <option value="1">Silver</option><option value="2">Gold</option><option value="3">Platinum</option>
              </select>
            </div>
            <div><label class="block text-xs font-semibold mb-1">Expires</label><input name="expiresAt" required type="date" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))"></div>
            <div class="sm:col-span-2 flex gap-3">
              <button type="submit" class="px-4 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Save Boost</button>
              <button type="button" id="cancel-boost" class="px-4 py-2 text-sm rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
            </div>
          </form>
        </div>

        <div id="boosts-list" class="space-y-2">
          ${renderBoostsRows(boosts)}
        </div>
      </div>

      <!-- Banned Terms -->
      <div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">Banned Search Terms</h3>
          <button id="add-banned-btn" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#fdecea;color:#b71c1c">+ Ban Term</button>
        </div>
        <div id="add-banned-form" class="hidden mb-4 p-4 rounded-xl border" style="border-color:oklch(var(--border));background:#fafafa">
          <form id="banned-form" class="flex gap-3 flex-wrap">
            <input name="term" required type="text" placeholder="Term to ban" class="flex-1 min-w-[150px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
            <input name="reason" required type="text" placeholder="Reason" class="flex-1 min-w-[150px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
            <button type="submit" class="px-4 py-2 text-sm font-bold rounded-lg" style="background:#fdecea;color:#b71c1c">Ban</button>
            <button type="button" id="cancel-banned" class="px-4 py-2 text-sm rounded-lg border" style="border-color:oklch(var(--border))">Cancel</button>
          </form>
        </div>
        <div id="banned-list">
          ${banned.length === 0 ? `<p class="text-sm" style="color:oklch(var(--muted-foreground))">No banned terms.</p>` : `<div class="flex flex-wrap gap-2">${banned.map((b) => `<span class="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style="background:#fdecea;color:#b71c1c">${b.term} <button class="unban-btn ml-1 font-bold" data-id="${b.id}">×</button></span>`).join("")}</div>`}
        </div>
      </div>
    </div>
  `;

  // Boost form toggle
  container
    .querySelector("#add-boost-btn")
    ?.addEventListener("click", () =>
      container.querySelector("#add-boost-form")?.classList.remove("hidden"),
    );
  container
    .querySelector("#cancel-boost")
    ?.addEventListener("click", () =>
      container.querySelector("#add-boost-form")?.classList.add("hidden"),
    );

  container.querySelector("#boost-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const boost: SearchBoost = {
      id: `boost-${Date.now()}`,
      listingName: (data.get("listingName") as string).trim(),
      city: (data.get("city") as string).trim(),
      category: "",
      boostLevel: Number(data.get("boostLevel")) as 1 | 2 | 3,
      expiresAt: data.get("expiresAt") as string,
      active: true,
    };
    const boosts = getBoosts();
    saveBoosts([boost, ...boosts]);
    form.reset();
    container.querySelector("#add-boost-form")?.classList.add("hidden");
    const list = container.querySelector("#boosts-list");
    if (list) list.innerHTML = renderBoostsRows(getBoosts());
    attachBoostActions(container);
  });

  // Banned term form
  container
    .querySelector("#add-banned-btn")
    ?.addEventListener("click", () =>
      container.querySelector("#add-banned-form")?.classList.remove("hidden"),
    );
  container
    .querySelector("#cancel-banned")
    ?.addEventListener("click", () =>
      container.querySelector("#add-banned-form")?.classList.add("hidden"),
    );

  container.querySelector("#banned-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const term: SearchBannedTerm = {
      id: `bt-${Date.now()}`,
      term: (data.get("term") as string).trim(),
      reason: (data.get("reason") as string).trim(),
      addedAt: new Date().toISOString().split("T")[0],
    };
    const banned = getBanned();
    saveBanned([term, ...banned]);
    form.reset();
    container.querySelector("#add-banned-form")?.classList.add("hidden");
    const list = container.querySelector("#banned-list");
    if (list)
      list.innerHTML = `<div class="flex flex-wrap gap-2">${getBanned()
        .map(
          (b) =>
            `<span class="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style="background:#fdecea;color:#b71c1c">${b.term} <button class="unban-btn ml-1 font-bold" data-id="${b.id}">×</button></span>`,
        )
        .join("")}</div>`;
    attachBoostActions(container);
  });

  attachBoostActions(container);
}

function renderBoostsRows(boosts: SearchBoost[]): string {
  if (boosts.length === 0)
    return `<p class="text-sm" style="color:oklch(var(--muted-foreground))">No boosted listings.</p>`;
  return boosts
    .map((b) => {
      const lvl = BOOST_LABELS[b.boostLevel];
      return `
      <div class="rounded-xl border p-4 flex flex-wrap items-center justify-between gap-3" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm" style="color:oklch(var(--foreground))">${b.listingName}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-bold" style="background:${lvl.bg};color:${lvl.color}">${lvl.label}</span>
            ${b.active ? "" : `<span class="text-xs px-2 py-0.5 rounded-full" style="background:#fdecea;color:#b71c1c">Inactive</span>`}
          </div>
          <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">${b.city} · Expires: ${b.expiresAt}</div>
        </div>
        <div class="flex gap-2">
          <button class="boost-toggle text-xs px-3 py-1 rounded-lg font-semibold" data-id="${b.id}" data-active="${b.active}" style="background:${b.active ? "#fff3e0" : "#e8f5e9"};color:${b.active ? "#e65100" : "#1a7a3c"}">${b.active ? "Pause" : "Activate"}</button>
          <button class="boost-delete text-xs px-3 py-1 rounded-lg font-semibold" data-id="${b.id}" style="background:#fdecea;color:#b71c1c">Remove</button>
        </div>
      </div>
    `;
    })
    .join("");
}

function attachBoostActions(container: HTMLElement): void {
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".boost-toggle"),
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const boosts = getBoosts();
      const idx = boosts.findIndex((b) => b.id === id);
      if (idx === -1) return;
      boosts[idx].active = !boosts[idx].active;
      saveBoosts(boosts);
      const list = container.querySelector("#boosts-list");
      if (list) list.innerHTML = renderBoostsRows(getBoosts());
      attachBoostActions(container);
    });
  }
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".boost-delete"),
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      saveBoosts(getBoosts().filter((b) => b.id !== id));
      const list = container.querySelector("#boosts-list");
      if (list) list.innerHTML = renderBoostsRows(getBoosts());
      attachBoostActions(container);
    });
  }
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".unban-btn"),
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const banned = getBanned().filter((b) => b.id !== id);
      saveBanned(banned);
      const list = container.querySelector("#banned-list");
      if (list)
        list.innerHTML =
          banned.length === 0
            ? `<p class="text-sm" style="color:oklch(var(--muted-foreground))">No banned terms.</p>`
            : `<div class="flex flex-wrap gap-2">${banned.map((b) => `<span class="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style="background:#fdecea;color:#b71c1c">${b.term} <button class="unban-btn ml-1 font-bold" data-id="${b.id}">×</button></span>`).join("")}</div>`;
      attachBoostActions(container);
    });
  }
}
