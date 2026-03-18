import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";
import { SAMPLE_LISTINGS } from "../data/sampleData";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface SavedListing {
  id: string;
  name: string;
  category: string;
  city: string;
}

interface SearchHistoryEntry {
  query: string;
  time: number;
}

function getFavorites(): SavedListing[] {
  try {
    const raw = localStorage.getItem("dhoondho_favorites");
    if (!raw) return [];
    const ids: string[] = JSON.parse(raw);
    return ids.map((id) => {
      const listing = SAMPLE_LISTINGS.find((l) => String(l.id) === id);
      if (listing) {
        return {
          id,
          name: listing.name,
          category: String(listing.categoryId),
          city: listing.city,
        };
      }
      return { id, name: `Business #${id}`, category: "", city: "" };
    });
  } catch {
    return [];
  }
}

function getSearchHistory(): SearchHistoryEntry[] {
  try {
    const raw = localStorage.getItem("dhoondho_search_history");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function renderDashboardPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;

  const favorites = getFavorites();
  const history = getSearchHistory();

  const favoritesHtml =
    favorites.length === 0
      ? `<div data-ocid="dashboard.empty_state" style="text-align:center;padding:32px;color:#9aa0a6">
        <div style="font-size:40px;margin-bottom:12px">💔</div>
        <p style="font-size:14px">No saved listings yet. Tap the ❤️ on any business to save it here.</p>
      </div>`
      : favorites
          .map(
            (fav, i) => `
        <div data-ocid="dashboard.item.${i + 1}" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-radius:12px;background:#f8f9fa;margin-bottom:10px;gap:12px">
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:14px;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(fav.name)}</div>
            <div style="font-size:12px;color:#9aa0a6">${escapeHtml(fav.city)}</div>
          </div>
          <a href="#/listing/${escapeHtml(fav.id)}" data-ocid="dashboard.link" style="padding:6px 14px;border-radius:8px;background:#1a7a3c;color:#fff;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap">View →</a>
        </div>
      `,
          )
          .join("");

  const historyHtml =
    history.length === 0
      ? `<div data-ocid="dashboard.empty_state" style="text-align:center;padding:32px;color:#9aa0a6">
        <div style="font-size:40px;margin-bottom:12px">🔍</div>
        <p style="font-size:14px">No recent searches yet. Start exploring!</p>
      </div>`
      : history
          .map(
            (entry, i) => `
        <div data-ocid="dashboard.item.${i + 1}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-radius:12px;background:#f8f9fa;margin-bottom:8px;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
            <span style="font-size:16px">🕐</span>
            <span style="font-size:14px;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(entry.query)}</span>
          </div>
          <a href="#/search?q=${encodeURIComponent(entry.query)}" data-ocid="dashboard.link" style="padding:6px 14px;border-radius:8px;border:1px solid #dadce0;color:#1a73e8;text-decoration:none;font-size:12px;font-weight:600;white-space:nowrap">Search again</a>
        </div>
      `,
          )
          .join("");

  main.innerHTML = `
    <div style="min-height:100vh;background:#f8f9fa">
      <div style="max-width:720px;margin:0 auto;padding:32px 20px">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:24px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <h1 style="font-size:26px;font-weight:700;color:#202124;margin-bottom:6px">My Dashboard</h1>
        <p style="font-size:14px;color:#5f6368;margin-bottom:32px">Your saved listings and search history</p>

        <!-- Saved Listings -->
        <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:24px;margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
            <span style="font-size:22px">❤️</span>
            <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Saved Listings</h2>
            <span style="margin-left:auto;font-size:13px;font-weight:600;color:#1a7a3c;background:#e8f5e9;padding:3px 10px;border-radius:12px">${favorites.length}</span>
          </div>
          ${favoritesHtml}
          ${favorites.length > 0 ? `<button id="clear-favorites-btn" data-ocid="dashboard.delete_button" style="margin-top:8px;background:none;border:none;color:#d32f2f;font-size:12px;cursor:pointer;padding:4px 0">Clear all saved listings</button>` : ""}
        </div>

        <!-- Search History -->
        <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:24px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
            <span style="font-size:22px">🕐</span>
            <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Recent Searches</h2>
            <span style="margin-left:auto;font-size:13px;font-weight:600;color:#1a73e8;background:#e8f0fe;padding:3px 10px;border-radius:12px">${history.length}</span>
          </div>
          ${historyHtml}
          ${history.length > 0 ? `<button id="clear-history-btn" data-ocid="dashboard.delete_button" style="margin-top:8px;background:none;border:none;color:#d32f2f;font-size:12px;cursor:pointer;padding:4px 0">Clear search history</button>` : ""}
        </div>

      </div>
    ${renderPageFooter(main)}
    </div>
  `;

  document
    .getElementById("clear-favorites-btn")
    ?.addEventListener("click", () => {
      localStorage.removeItem("dhoondho_favorites");
      renderDashboardPage();
    });

  document
    .getElementById("clear-history-btn")
    ?.addEventListener("click", () => {
      localStorage.removeItem("dhoondho_search_history");
      renderDashboardPage();
    });
}
