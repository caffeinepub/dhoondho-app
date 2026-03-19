// ─── Advanced Analytics Module ──────────────────────────────────────────────────

export function renderAdvancedAnalyticsTab(container: HTMLElement): void {
  const now = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return months[d.getMonth()];
  });

  // Mock data - in production would come from backend analytics
  const usersData = [340, 520, 680, 920, 1150, 1420];
  const listingsData = [45, 78, 112, 160, 198, 243];
  const searchesData = [1200, 2100, 3400, 4200, 5100, 6800];

  const topCities = [
    { city: "Delhi", searches: 2840, listings: 89, pct: 100 },
    { city: "Mumbai", searches: 2210, listings: 74, pct: 78 },
    { city: "Bangalore", searches: 1890, listings: 61, pct: 67 },
    { city: "Hyderabad", searches: 1340, listings: 45, pct: 47 },
    { city: "Chennai", searches: 980, listings: 38, pct: 35 },
    { city: "Pune", searches: 760, listings: 29, pct: 27 },
  ];

  const topCategories = [
    { name: "Plumbers", count: 1840, pct: 100 },
    { name: "Electricians", count: 1520, pct: 83 },
    { name: "Doctors", count: 1280, pct: 70 },
    { name: "Restaurants", count: 1100, pct: 60 },
    { name: "Tutors", count: 890, pct: 48 },
  ];

  const maxUsers = Math.max(...usersData);
  const maxListings = Math.max(...listingsData);
  const maxSearches = Math.max(...searchesData);

  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Advanced Analytics</h2>
        <p class="text-sm" style="color:oklch(var(--muted-foreground))">Platform growth, search trends, and engagement metrics</p>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          {
            label: "Total Users",
            val: "1,420",
            change: "+23%",
            up: true,
            color: "oklch(var(--primary))",
          },
          {
            label: "Total Listings",
            val: "243",
            change: "+18%",
            up: true,
            color: "#1a7a3c",
          },
          {
            label: "Daily Searches",
            val: "6,800",
            change: "+33%",
            up: true,
            color: "#0d47a1",
          },
          {
            label: "Avg Session",
            val: "4m 12s",
            change: "+8%",
            up: true,
            color: "#6a1b9a",
          },
        ]
          .map(
            (k) => `
          <div class="rounded-xl p-4" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
            <div class="text-xl font-bold" style="color:${k.color}">${k.val}</div>
            <div class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">${k.label}</div>
            <div class="text-xs mt-1 font-semibold" style="color:${k.up ? "#1a7a3c" : "#b71c1c"}">${k.change} vs last month</div>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- User Growth Chart (CSS bars) -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">User Growth (Last 6 Months)</h3>
        <div class="flex items-end gap-3 h-32">
          ${last6Months
            .map(
              (m, i) => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-semibold" style="color:oklch(var(--primary))">${usersData[i].toLocaleString()}</span>
              <div class="w-full rounded-t-lg" style="height:${Math.round((usersData[i] / maxUsers) * 96)}px;background:oklch(var(--primary));opacity:${0.5 + (i / last6Months.length) * 0.5}"></div>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${m}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Listings Growth Chart -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Listings Growth (Last 6 Months)</h3>
        <div class="flex items-end gap-3 h-32">
          ${last6Months
            .map(
              (m, i) => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-semibold" style="color:#1a7a3c">${listingsData[i]}</span>
              <div class="w-full rounded-t-lg" style="height:${Math.round((listingsData[i] / maxListings) * 96)}px;background:#1a7a3c;opacity:${0.5 + (i / last6Months.length) * 0.5}"></div>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${m}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Search Volume -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Search Volume (Last 6 Months)</h3>
        <div class="flex items-end gap-3 h-32">
          ${last6Months
            .map(
              (m, i) => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-semibold" style="color:#0d47a1">${(searchesData[i] / 1000).toFixed(1)}K</span>
              <div class="w-full rounded-t-lg" style="height:${Math.round((searchesData[i] / maxSearches) * 96)}px;background:#0d47a1;opacity:${0.5 + (i / last6Months.length) * 0.5}"></div>
              <span class="text-xs" style="color:oklch(var(--muted-foreground))">${m}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Top Cities -->
        <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
          <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Top Cities by Search</h3>
          <div class="space-y-3">
            ${topCities
              .map(
                (c) => `
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-semibold" style="color:oklch(var(--foreground))">${c.city}</span>
                  <span style="color:oklch(var(--muted-foreground))">${c.searches.toLocaleString()} searches · ${c.listings} listings</span>
                </div>
                <div class="w-full rounded-full h-2" style="background:oklch(var(--muted)/0.3)">
                  <div class="h-2 rounded-full" style="width:${c.pct}%;background:oklch(var(--primary))"></div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <!-- Top Categories -->
        <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
          <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Top Search Categories</h3>
          <div class="space-y-3">
            ${topCategories
              .map(
                (c) => `
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-semibold" style="color:oklch(var(--foreground))">${c.name}</span>
                  <span style="color:oklch(var(--muted-foreground))">${c.count.toLocaleString()}</span>
                </div>
                <div class="w-full rounded-full h-2" style="background:oklch(var(--muted)/0.3)">
                  <div class="h-2 rounded-full" style="width:${c.pct}%;background:#1a7a3c"></div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Recent Platform Activity</h3>
        <div class="space-y-3">
          ${[
            {
              icon: "🏢",
              text: "MediMarkit India added a new listing in Delhi",
              time: "2 min ago",
              color: "#e3f2fd",
            },
            {
              icon: "👤",
              text: "New user registered: Ananya Singh (Mumbai)",
              time: "15 min ago",
              color: "#f3e5f5",
            },
            {
              icon: "⭐",
              text: "5-star review posted for Sharma Electricals",
              time: "32 min ago",
              color: "#fff9c4",
            },
            {
              icon: "💳",
              text: "Pro subscription purchased by Vikram Plumbing Co.",
              time: "1 hr ago",
              color: "#e8f5e9",
            },
            {
              icon: "✏️",
              text: "Edit suggestion approved for Raj Medicals",
              time: "2 hrs ago",
              color: "#fff3e0",
            },
            {
              icon: "🔍",
              text: "6,800 searches in the last 24 hours",
              time: "Today",
              color: "#e3f2fd",
            },
          ]
            .map(
              (a) => `
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0" style="background:${a.color}">${a.icon}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs" style="color:oklch(var(--foreground))">${a.text}</p>
              </div>
              <span class="text-xs flex-shrink-0" style="color:oklch(var(--muted-foreground))">${a.time}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}
