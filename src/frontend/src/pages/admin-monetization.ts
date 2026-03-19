// ─── Monetization / Payments / Subscriptions Module ────────────────────────

export interface AdCampaign {
  id: string;
  title: string;
  advertiser: string;
  type: "banner" | "featured" | "spotlight";
  status: "active" | "paused" | "expired";
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  startDate: string;
  endDate: string;
}

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  currency: string;
  type: "subscription" | "featured" | "ad" | "refund";
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  plan?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  activeUsers: number;
  isActive: boolean;
}

const ADS_KEY = "dhoondho_ad_campaigns";
const TRANSACTIONS_KEY = "dhoondho_transactions";
const PLANS_KEY = "dhoondho_subscription_plans";

function getAds(): AdCampaign[] {
  try {
    return JSON.parse(localStorage.getItem(ADS_KEY) || "[]");
  } catch {
    return [];
  }
}
function getTransactions(): Transaction[] {
  try {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || "[]");
  } catch {
    return [];
  }
}
export function getSubscriptionPlans(): SubscriptionPlan[] {
  try {
    return (
      JSON.parse(localStorage.getItem(PLANS_KEY) || "null") || DEFAULT_PLANS
    );
  } catch {
    return DEFAULT_PLANS;
  }
}
function saveAds(d: AdCampaign[]) {
  localStorage.setItem(ADS_KEY, JSON.stringify(d));
}
function saveTransactions(d: Transaction[]) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(d));
}

const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billingCycle: "monthly",
    features: ["1 listing", "Basic search visibility", "Standard support"],
    activeUsers: 1240,
    isActive: true,
  },
  {
    id: "basic",
    name: "Basic",
    price: 499,
    billingCycle: "monthly",
    features: [
      "5 listings",
      "Highlighted in search",
      "Analytics dashboard",
      "Email support",
    ],
    activeUsers: 342,
    isActive: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1499,
    billingCycle: "monthly",
    features: [
      "20 listings",
      "Featured placement",
      "Priority support",
      "Lead generation",
      "Advanced analytics",
    ],
    activeUsers: 89,
    isActive: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    billingCycle: "monthly",
    features: [
      "Unlimited listings",
      "Top search placement",
      "Dedicated support",
      "Custom branding",
      "API access",
    ],
    activeUsers: 12,
    isActive: true,
  },
];

function initDemoData(): void {
  if (getAds().length === 0) {
    saveAds([
      {
        id: "a1",
        title: "MediMarkit Summer Offer",
        advertiser: "MediMarkit India",
        type: "featured",
        status: "active",
        budget: 15000,
        spent: 8400,
        clicks: 342,
        impressions: 12400,
        startDate: "2026-03-01",
        endDate: "2026-03-31",
      },
      {
        id: "a2",
        title: "Plumber Express Banner",
        advertiser: "Plumber Express",
        type: "banner",
        status: "active",
        budget: 5000,
        spent: 2100,
        clicks: 88,
        impressions: 5600,
        startDate: "2026-03-10",
        endDate: "2026-03-25",
      },
      {
        id: "a3",
        title: "Electrician Pro Spotlight",
        advertiser: "ElectroPro",
        type: "spotlight",
        status: "paused",
        budget: 8000,
        spent: 3200,
        clicks: 145,
        impressions: 7800,
        startDate: "2026-02-15",
        endDate: "2026-03-15",
      },
    ]);
  }
  if (getTransactions().length === 0) {
    saveTransactions([
      {
        id: "t1",
        user: "Rahul Sharma",
        amount: 1499,
        currency: "INR",
        type: "subscription",
        status: "completed",
        date: "2026-03-15",
        plan: "Pro",
      },
      {
        id: "t2",
        user: "Priya Verma",
        amount: 499,
        currency: "INR",
        type: "subscription",
        status: "completed",
        date: "2026-03-14",
        plan: "Basic",
      },
      {
        id: "t3",
        user: "MediMarkit India",
        amount: 15000,
        currency: "INR",
        type: "ad",
        status: "completed",
        date: "2026-03-01",
      },
      {
        id: "t4",
        user: "Amit Patel",
        amount: 499,
        currency: "INR",
        type: "subscription",
        status: "refunded",
        date: "2026-03-10",
        plan: "Basic",
      },
      {
        id: "t5",
        user: "Sunita Rao",
        amount: 4999,
        currency: "INR",
        type: "subscription",
        status: "completed",
        date: "2026-03-12",
        plan: "Enterprise",
      },
    ]);
  }
}

function escH(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function renderMonetizationTab(container: HTMLElement): void {
  initDemoData();
  const ads = getAds();
  const txns = getTransactions();
  const plans = getSubscriptionPlans();
  const totalRevenue = txns
    .filter((t) => t.status === "completed")
    .reduce((s, t) => s + t.amount, 0);
  const activeAds = ads.filter((a) => a.status === "active").length;
  const totalActiveUsers = plans.reduce((s, p) => s + p.activeUsers, 0);

  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Monetization & Revenue</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Ads, subscriptions and transaction overview</p>
      </div>

      <!-- Revenue Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          { label: "Total Revenue", val: fmt(totalRevenue), color: "#1a7a3c" },
          {
            label: "Active Ads",
            val: activeAds,
            color: "oklch(var(--primary))",
          },
          {
            label: "Paid Users",
            val: totalActiveUsers - (plans[0]?.activeUsers || 0),
            color: "#6a1b9a",
          },
          { label: "Transactions", val: txns.length, color: "#0d47a1" },
        ]
          .map(
            (
              s,
            ) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-xl font-bold" style="color:${s.color}">${s.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s.label}</div>
        </div>`,
          )
          .join("")}
      </div>

      <!-- Subscription Plans -->
      <div>
        <h3 class="text-sm font-bold mb-3" style="color:oklch(var(--foreground))">Subscription Plans</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${plans
            .map(
              (p) => `
            <div class="rounded-xl border p-4" style="background:oklch(var(--card));border-color:oklch(var(--border))">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm" style="color:oklch(var(--foreground))">${p.name}</span>
                <span class="text-xs px-2 py-0.5 rounded-full" style="background:${p.isActive ? "#e8f5e9" : "#fdecea"};color:${p.isActive ? "#1a7a3c" : "#b71c1c"}">${p.isActive ? "Active" : "Inactive"}</span>
              </div>
              <div class="text-xl font-bold mb-1" style="color:oklch(var(--primary))">${p.price === 0 ? "Free" : fmt(p.price)}<span class="text-xs font-normal" style="color:oklch(var(--muted-foreground))">${p.price > 0 ? "/mo" : ""}</span></div>
              <div class="text-xs mb-3" style="color:oklch(var(--muted-foreground))">${p.activeUsers} active users</div>
              <ul class="space-y-1">
                ${p.features.map((f) => `<li class="text-xs flex items-center gap-1" style="color:oklch(var(--muted-foreground))"><span style="color:#1a7a3c">&#10003;</span> ${f}</li>`).join("")}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Ad Campaigns -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold" style="color:oklch(var(--foreground))">Ad Campaigns</h3>
        </div>
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:700px;border-collapse:collapse">
            <thead><tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Campaign</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Type</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Budget</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Spent</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Clicks</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
            </tr></thead>
            <tbody>
              ${ads
                .map(
                  (a) => `
                <tr style="border-bottom:1px solid oklch(var(--border))">
                  <td class="px-4 py-3">
                    <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">${escH(a.title)}</div>
                    <div class="text-xs" style="color:oklch(var(--muted-foreground))">${escH(a.advertiser)}</div>
                  </td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full" style="background:#e3f2fd;color:#0d47a1">${a.type}</span></td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${a.status === "active" ? "#e8f5e9" : a.status === "paused" ? "#fff3e0" : "#f5f5f5"};color:${a.status === "active" ? "#1a7a3c" : a.status === "paused" ? "#e65100" : "#757575"}">${a.status}</span></td>
                  <td class="px-4 py-3 text-sm">${fmt(a.budget)}</td>
                  <td class="px-4 py-3 text-sm">${fmt(a.spent)}</td>
                  <td class="px-4 py-3 text-sm">${a.clicks.toLocaleString()}</td>
                  <td class="px-4 py-3">
                    <button class="ad-toggle-btn text-xs px-3 py-1 rounded-lg font-semibold" data-id="${a.id}" data-status="${a.status}" style="background:${a.status === "active" ? "#fff3e0" : "#e8f5e9"};color:${a.status === "active" ? "#e65100" : "#1a7a3c"}">${a.status === "active" ? "Pause" : "Activate"}</button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div>
        <h3 class="text-sm font-bold mb-3" style="color:oklch(var(--foreground))">Recent Transactions</h3>
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:600px;border-collapse:collapse">
            <thead><tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">User</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Type</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Amount</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Date</th>
              <th class="text-left px-4 py-2 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Plan</th>
            </tr></thead>
            <tbody>
              ${txns
                .map(
                  (t) => `
                <tr style="border-bottom:1px solid oklch(var(--border))">
                  <td class="px-4 py-3 text-sm font-semibold" style="color:oklch(var(--foreground))">${escH(t.user)}</td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full" style="background:#f3e5f5;color:#6a1b9a">${t.type}</span></td>
                  <td class="px-4 py-3 text-sm font-bold" style="color:${t.status === "refunded" ? "#b71c1c" : "#1a7a3c"}">${t.status === "refunded" ? "-" : "+"}${fmt(t.amount)}</td>
                  <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${t.status === "completed" ? "#e8f5e9" : t.status === "pending" ? "#fff3e0" : t.status === "failed" ? "#fdecea" : "#f5f5f5"};color:${t.status === "completed" ? "#1a7a3c" : t.status === "pending" ? "#e65100" : t.status === "failed" ? "#b71c1c" : "#757575"}">${t.status}</span></td>
                  <td class="px-4 py-3 text-xs" style="color:oklch(var(--muted-foreground))">${t.date}</td>
                  <td class="px-4 py-3 text-xs" style="color:oklch(var(--muted-foreground))">${t.plan || "-"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".ad-toggle-btn"),
  )) {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const status = btn.dataset.status;
      const ads = getAds();
      const idx = ads.findIndex((a) => a.id === id);
      if (idx === -1) return;
      ads[idx].status = status === "active" ? "paused" : "active";
      saveAds(ads);
      renderMonetizationTab(container);
    });
  }
}
