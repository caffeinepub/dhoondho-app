// ─── Feature Toggle System Module ────────────────────────────────────────────

export interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  category: "core" | "monetization" | "social" | "admin" | "experimental";
  enabled: boolean;
  lastChanged: string;
}

const TOGGLES_KEY = "dhoondho_feature_toggles";

const DEFAULT_TOGGLES: FeatureToggle[] = [
  {
    id: "search",
    name: "Search",
    description: "Core search functionality",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01",
  },
  {
    id: "map",
    name: "Map View",
    description: "Leaflet map with pins",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01",
  },
  {
    id: "nearby",
    name: "Nearby Now",
    description: "GPS-based nearby search",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01",
  },
  {
    id: "voice_search",
    name: "Voice Search",
    description: "Mic-based voice search (SpeechRecognition API)",
    category: "core",
    enabled: true,
    lastChanged: "2026-02-10",
  },
  {
    id: "blog",
    name: "Blog",
    description: "Blog section and articles",
    category: "social",
    enabled: true,
    lastChanged: "2026-01-15",
  },
  {
    id: "reviews",
    name: "Reviews & Ratings",
    description: "User reviews on listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-01-20",
  },
  {
    id: "qa",
    name: "Q&A",
    description: "Questions and answers on listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-02-01",
  },
  {
    id: "ai_assistant",
    name: "AI Assistant",
    description: "Floating AI search assistant widget",
    category: "experimental",
    enabled: true,
    lastChanged: "2026-02-15",
  },
  {
    id: "claim_listing",
    name: "Claim Listing",
    description: "Business owners can claim listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-02-01",
  },
  {
    id: "suggest_edit",
    name: "Suggest Edit",
    description: "Users can suggest edits to listings",
    category: "social",
    enabled: true,
    lastChanged: "2026-02-01",
  },
  {
    id: "featured_listings",
    name: "Featured Listings",
    description: "Sponsored/promoted listings",
    category: "monetization",
    enabled: true,
    lastChanged: "2026-03-01",
  },
  {
    id: "ads",
    name: "Advertisements",
    description: "Banner and inline ads",
    category: "monetization",
    enabled: false,
    lastChanged: "2026-03-05",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    description: "Paid vendor subscription plans",
    category: "monetization",
    enabled: true,
    lastChanged: "2026-03-10",
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Push notifications and broadcasts",
    category: "admin",
    enabled: true,
    lastChanged: "2026-03-01",
  },
  {
    id: "seo_pages",
    name: "SEO Pages",
    description: "Dynamic service+city SEO landing pages",
    category: "core",
    enabled: true,
    lastChanged: "2026-02-20",
  },
  {
    id: "multilang",
    name: "Multi-language",
    description: "10 Indian languages support",
    category: "core",
    enabled: true,
    lastChanged: "2026-01-01",
  },
  {
    id: "pwa",
    name: "PWA / App Install",
    description: "Progressive Web App install prompt",
    category: "experimental",
    enabled: true,
    lastChanged: "2026-03-15",
  },
  {
    id: "analytics_tracking",
    name: "Analytics Tracking",
    description: "Event and usage tracking",
    category: "admin",
    enabled: true,
    lastChanged: "2026-03-01",
  },
  {
    id: "booking",
    name: "Booking System",
    description: "Request booking/callback from listings",
    category: "core",
    enabled: true,
    lastChanged: "2026-02-10",
  },
  {
    id: "lead_gen",
    name: "Lead Generation",
    description: "Lead capture forms",
    category: "monetization",
    enabled: true,
    lastChanged: "2026-02-15",
  },
];

export function getToggles(): FeatureToggle[] {
  try {
    const stored = JSON.parse(localStorage.getItem(TOGGLES_KEY) || "null");
    if (!stored) {
      localStorage.setItem(TOGGLES_KEY, JSON.stringify(DEFAULT_TOGGLES));
      return DEFAULT_TOGGLES;
    }
    return stored;
  } catch {
    return DEFAULT_TOGGLES;
  }
}

export function isFeatureEnabled(id: string): boolean {
  return getToggles().find((t) => t.id === id)?.enabled ?? true;
}

function saveToggles(toggles: FeatureToggle[]): void {
  localStorage.setItem(TOGGLES_KEY, JSON.stringify(toggles));
}

export function renderFeatureTogglesTab(container: HTMLElement): void {
  const toggles = getToggles();
  const categories: FeatureToggle["category"][] = [
    "core",
    "social",
    "monetization",
    "admin",
    "experimental",
  ];
  const catLabels: Record<FeatureToggle["category"], string> = {
    core: "Core Features",
    social: "Social & Community",
    monetization: "Monetization",
    admin: "Admin & Analytics",
    experimental: "Experimental",
  };
  const catColors: Record<FeatureToggle["category"], string> = {
    core: "#0d47a1",
    social: "#1a7a3c",
    monetization: "#6a1b9a",
    admin: "#e65100",
    experimental: "#b71c1c",
  };

  const enabled = toggles.filter((t) => t.enabled).length;
  const disabled = toggles.filter((t) => !t.enabled).length;

  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Feature Toggles</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${enabled} enabled · ${disabled} disabled</p>
        </div>
        <div class="flex gap-2">
          <button id="enable-all-toggles" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#e8f5e9;color:#1a7a3c">Enable All</button>
          <button id="disable-all-toggles" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#fdecea;color:#b71c1c">Disable All Non-Core</button>
        </div>
      </div>

      ${categories
        .map((cat) => {
          const catToggles = toggles.filter((t) => t.category === cat);
          if (catToggles.length === 0) return "";
          return `
          <div>
            <h3 class="text-sm font-bold mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full inline-block" style="background:${catColors[cat]}"></span>
              <span style="color:${catColors[cat]}">${catLabels[cat]}</span>
            </h3>
            <div class="space-y-2">
              ${catToggles
                .map(
                  (t) => `
                <div class="rounded-xl border p-4 flex items-center justify-between gap-4" style="background:oklch(var(--card));border-color:oklch(var(--border))">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-semibold" style="color:oklch(var(--foreground))">${t.name}</span>
                      ${!t.enabled ? `<span class="text-xs px-2 py-0.5 rounded-full" style="background:#fdecea;color:#b71c1c">OFF</span>` : ""}
                    </div>
                    <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">${t.description}</p>
                    <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Last changed: ${t.lastChanged}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" class="sr-only peer toggle-checkbox" data-toggle-id="${t.id}" ${t.enabled ? "checked" : ""}>
                    <div class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style="background:${t.enabled ? "oklch(var(--primary))" : "#ccc"}"></div>
                  </label>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;

  for (const checkbox of Array.from(
    container.querySelectorAll<HTMLInputElement>(".toggle-checkbox"),
  )) {
    checkbox.addEventListener("change", (e) => {
      const el = e.currentTarget as HTMLInputElement;
      const id = el.dataset.toggleId;
      const toggles = getToggles();
      const idx = toggles.findIndex((t) => t.id === id);
      if (idx === -1) return;
      toggles[idx].enabled = el.checked;
      toggles[idx].lastChanged = new Date().toISOString().split("T")[0];
      saveToggles(toggles);
      // Update toggle visual
      const div = el.nextElementSibling as HTMLElement;
      if (div)
        div.style.background = el.checked ? "oklch(var(--primary))" : "#ccc";
      showToggleToast(
        `${toggles[idx].name} ${el.checked ? "enabled" : "disabled"}.`,
      );
    });
  }

  container
    .querySelector("#enable-all-toggles")
    ?.addEventListener("click", () => {
      const toggles = getToggles();
      for (const t of toggles) {
        t.enabled = true;
        t.lastChanged = new Date().toISOString().split("T")[0];
      }
      saveToggles(toggles);
      renderFeatureTogglesTab(container);
      showToggleToast("All features enabled.");
    });

  container
    .querySelector("#disable-all-toggles")
    ?.addEventListener("click", () => {
      const toggles = getToggles();
      for (const t of toggles) {
        if (t.category !== "core") {
          t.enabled = false;
          t.lastChanged = new Date().toISOString().split("T")[0];
        }
      }
      saveToggles(toggles);
      renderFeatureTogglesTab(container);
      showToggleToast("All non-core features disabled.");
    });
}

function showToggleToast(msg: string): void {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t.style.background = "oklch(var(--primary))";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
