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

  // Check login status via localStorage (quick check; full auth check would require async)
  // This is a client-side page that reads localStorage data so no auth gate needed.

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
    <style>
      @media (max-width: 480px) {
        .dashboard-container { padding: 20px 14px !important; }
        .dashboard-referral-row { flex-direction: column !important; }
        .dashboard-referral-row input { width: 100% !important; }
        .dashboard-referral-row button { width: 100%; text-align: center; }
        .dashboard-wa-btn { width: 100%; justify-content: center; }
      }
      .dash-tabs { display:flex; border-bottom:1px solid #e8eaed; background:#fff; border-radius:12px 12px 0 0; overflow:hidden; }
      .dash-tab { flex:1; display:flex; align-items:center; justify-content:center; gap:6px; padding:12px 8px; font-size:13px; font-weight:600; color:#5f6368; cursor:pointer; border-bottom:2px solid transparent; transition:color 0.2s,border-color 0.2s; white-space:nowrap; }
      .dash-tab.active { color:#1a7a3c; border-bottom:2px solid #1a7a3c; }
      .dash-tab:hover:not(.active) { color:#202124; background:#f8f9fa; }
      .dash-panel { display:none; }
      .dash-panel.active { display:block; }
    </style>
    <div style="min-height:100vh;background:#f8f9fa">
      <div class="dashboard-container" style="max-width:720px;margin:0 auto;padding:32px 20px">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:24px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <h1 style="font-size:26px;font-weight:700;color:#202124;margin-bottom:6px">My Dashboard</h1>
        <p style="font-size:14px;color:#5f6368;margin-bottom:24px">Your saved listings and search history</p>

        <!-- Tab Navigation -->
        <div style="background:#fff;border-radius:12px;border:1px solid #e8eaed;margin-bottom:0;overflow:hidden">
          <div class="dash-tabs" id="dash-tabs">
            <button class="dash-tab active" data-tab="saved" data-ocid="dashboard.tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Saved
            </button>
            <button class="dash-tab" data-tab="share" data-ocid="dashboard.tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              Share &amp; Earn
            </button>
            <button class="dash-tab" data-tab="history" data-ocid="dashboard.tab">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              History
            </button>
          </div>

          <!-- Tab Panels -->
          <!-- Saved Listings -->
          <div id="dash-panel-saved" class="dash-panel active" style="padding:24px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
              <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Saved Listings</h2>
              <span style="margin-left:auto;font-size:13px;font-weight:600;color:#1a7a3c;background:#e8f5e9;padding:3px 10px;border-radius:12px">${favorites.length}</span>
            </div>
            ${favoritesHtml}
            ${favorites.length > 0 ? `<button id="clear-favorites-btn" data-ocid="dashboard.delete_button" style="margin-top:8px;background:none;border:none;color:#d32f2f;font-size:12px;cursor:pointer;padding:4px 0">Clear all saved listings</button>` : ""}
          </div>

          <!-- Share & Earn -->
          <div id="dash-panel-share" class="dash-panel" style="padding:24px;background:linear-gradient(135deg,#e8f5e9,#f1f8e9)">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
              <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Share &amp; Earn</h2>
            </div>
            <div style="margin-bottom:14px">
              <div style="font-size:12px;font-weight:600;color:#5f6368;margin-bottom:6px">Your referral link</div>
              <div class="dashboard-referral-row" style="display:flex;gap:8px;align-items:center">
                <input id="referral-input" readonly value="https://dhoondho.app/?ref=you" style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid #c8e6c9;font-size:12px;color:#202124;background:#fff;outline:none" />
                <button id="copy-referral-btn" data-ocid="dashboard.button" style="padding:8px 14px;background:#1a7a3c;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">Copy</button>
              </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:14px">
              <div style="font-size:12px;color:#5f6368">Referrals:</div>
              <div id="referral-count" style="font-size:18px;font-weight:700;color:#1a7a3c">${localStorage.getItem("dhoondho_referral_count") || "0"}</div>
            </div>
            <button id="whatsapp-share-btn" data-ocid="dashboard.button" class="dashboard-wa-btn" style="display:flex;align-items:center;gap:8px;padding:10px 18px;background:#25D366;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.127 1.531 5.857L0 24l6.335-1.507A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.193-1.372L3 21.5l.897-3.674A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Share on WhatsApp
            </button>
          </div>

          <!-- Search History -->
          <div id="dash-panel-history" class="dash-panel" style="padding:24px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
              <h2 style="font-size:17px;font-weight:700;color:#202124;margin:0">Recent Searches</h2>
              <span style="margin-left:auto;font-size:13px;font-weight:600;color:#1a73e8;background:#e8f0fe;padding:3px 10px;border-radius:12px">${history.length}</span>
            </div>
            ${historyHtml}
            ${history.length > 0 ? `<button id="clear-history-btn" data-ocid="dashboard.delete_button" style="margin-top:8px;background:none;border:none;color:#d32f2f;font-size:12px;cursor:pointer;padding:4px 0">Clear search history</button>` : ""}
          </div>
        </div>

      </div>
    ${renderPageFooter(main)}
    </div>
  `;

  // Tab switching
  for (const tab of Array.from(document.querySelectorAll(".dash-tab"))) {
    tab.addEventListener("click", () => {
      const tabName = (tab as HTMLElement).dataset.tab || "";
      for (const t of Array.from(document.querySelectorAll(".dash-tab")))
        t.classList.remove("active");
      for (const p of Array.from(document.querySelectorAll(".dash-panel")))
        p.classList.remove("active");
      tab.classList.add("active");
      const panel = document.getElementById(`dash-panel-${tabName}`);
      if (panel) panel.classList.add("active");
    });
  }

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

  // Copy referral link
  document
    .getElementById("copy-referral-btn")
    ?.addEventListener("click", () => {
      const input = document.getElementById(
        "referral-input",
      ) as HTMLInputElement;
      if (input) {
        navigator.clipboard
          .writeText(input.value)
          .then(() => {
            const btn = document.getElementById("copy-referral-btn");
            if (btn) {
              btn.textContent = "✓ Copied!";
              setTimeout(() => {
                btn.textContent = "Copy";
              }, 2000);
            }
          })
          .catch(() => {
            // Fallback: select the input text so user can copy manually
            input.select();
            const btn = document.getElementById("copy-referral-btn");
            if (btn) btn.textContent = "Select & Copy";
            setTimeout(() => {
              const b = document.getElementById("copy-referral-btn");
              if (b) b.textContent = "Copy";
            }, 2000);
          });
      }
    });

  // WhatsApp share
  document
    .getElementById("whatsapp-share-btn")
    ?.addEventListener("click", () => {
      const text = encodeURIComponent(
        "Find local businesses near you with Dhoondho – India's local search engine! https://dhoondho.app/?ref=you",
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    });
}
