// Step 32 – Analytics + Step 35 Trending Searches

export interface SearchEntry {
  query: string;
  city: string;
  timestamp: number;
}

export interface AnalyticsStats {
  totalListings: number;
  totalSearches: number;
  topCities: string[];
  topCategories: string[];
  recentActivity: string[];
}

export function trackSearch(query: string, city: string): void {
  const raw = localStorage.getItem("dhoondho_analytics_searches") || "[]";
  const entries: SearchEntry[] = JSON.parse(raw);
  entries.push({
    query: query.trim(),
    city: city.trim(),
    timestamp: Date.now(),
  });
  if (entries.length > 200) entries.splice(0, entries.length - 200);
  localStorage.setItem("dhoondho_analytics_searches", JSON.stringify(entries));
}

export function getStats(totalListings = 0): AnalyticsStats {
  const raw = localStorage.getItem("dhoondho_analytics_searches") || "[]";
  const entries: SearchEntry[] = JSON.parse(raw);

  const cityCount: Record<string, number> = {};
  for (const e of entries) {
    if (e.city) cityCount[e.city] = (cityCount[e.city] || 0) + 1;
  }
  const topCities = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city]) => city);

  const queryCount: Record<string, number> = {};
  for (const e of entries) {
    const q = e.query.toLowerCase();
    if (q) queryCount[q] = (queryCount[q] || 0) + 1;
  }
  const topCategories = Object.entries(queryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([q]) => q);

  const recent = entries
    .slice(-10)
    .reverse()
    .map((e) => {
      const d = new Date(e.timestamp);
      const time = d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `🔍 "${e.query}" in ${e.city || "India"} at ${time}`;
    });

  return {
    totalListings,
    totalSearches: entries.length,
    topCities,
    topCategories,
    recentActivity: recent,
  };
}

export function getTrendingSearches(): string[] {
  const raw = localStorage.getItem("dhoondho_analytics_searches") || "[]";
  const entries: SearchEntry[] = JSON.parse(raw);
  const count: Record<string, number> = {};
  for (const e of entries) {
    const q = e.query.toLowerCase().trim();
    if (q.length > 1) count[q] = (count[q] || 0) + 1;
  }
  const trending = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([q]) => q);
  if (trending.length === 0) {
    return [
      "Plumber Delhi",
      "Electrician Mumbai",
      "AC Repair Bangalore",
      "Dentist Chennai",
      "Pizza Delivery Pune",
      "Gym near me",
    ];
  }
  return trending;
}
