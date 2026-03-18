import { initFooterReactivity, renderPageFooter } from "../components/footer";
// Step 31 – Contributors Leaderboard Page
import { showNavbar } from "../components/navbar";
import {
  getBadgeColor,
  getBadgeHTML,
  getBadgeLevel,
  getLeaderboard,
  getMyPoints,
} from "../utils/contributor";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getMedalEmoji(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

export function renderContributorsPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;

  const leaderboard = getLeaderboard();
  const myPoints = getMyPoints();
  const myBadge = getBadgeHTML(myPoints);

  const rows = leaderboard
    .map((entry, i) => {
      const level = getBadgeLevel(entry.points);
      const color = getBadgeColor(level);
      const badge = getBadgeHTML(entry.points, true);
      return `
        <div data-ocid="contributors.item.${i + 1}" style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid #f0f0f0">
          <div style="width:36px;text-align:center;font-size:${i < 3 ? "20px" : "14px"};font-weight:700;color:#5f6368;flex-shrink:0">${getMedalEmoji(i + 1)}</div>
          <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;flex-shrink:0;background:${color}22;color:${color};border:2px solid ${color}44">${escapeHtml(entry.name.charAt(0).toUpperCase())}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:#202124;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(entry.name)}</div>
            <div style="font-size:11px;color:#9aa0a6;margin-top:2px">${entry.actions} contributions</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
            ${badge}
            <span style="font-size:13px;font-weight:700;color:#1a7a3c">${entry.points} pts</span>
          </div>
        </div>
      `;
    })
    .join("");

  main.innerHTML = `
    <style>
      @media (max-width: 480px) {
        .contrib-stats-banner { flex-direction: column !important; align-items: flex-start !important; gap: 12px; }
        .contrib-points-grid { grid-template-columns: 1fr !important; }
        .contrib-container { padding: 20px 14px !important; }
      }
    </style>
    <div style="min-height:100vh;background:#f8f9fa">
      <div class="contrib-container" style="max-width:720px;margin:0 auto;padding:32px 20px">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:24px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px">
          <span style="font-size:32px">🏆</span>
          <div>
            <h1 style="font-size:26px;font-weight:700;color:#202124;margin:0">Top Contributors</h1>
            <p style="font-size:13px;color:#5f6368;margin:4px 0 0">Earn points by helping improve Dhoondho.App</p>
          </div>
        </div>

        <div class="contrib-stats-banner" style="background:linear-gradient(135deg,#1a7a3c,#34A853);border-radius:16px;padding:20px 24px;margin:24px 0;color:#fff;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:12px;opacity:0.85;margin-bottom:4px">Your Points</div>
            <div style="font-size:32px;font-weight:800">${myPoints}</div>
            <div style="font-size:11px;opacity:0.8;margin-top:4px">Keep contributing to level up!</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;opacity:0.85;margin-bottom:6px">Your Badge</div>
            ${myBadge}
          </div>
        </div>

        <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;padding:20px 24px;margin-bottom:24px">
          <h3 style="font-size:14px;font-weight:700;color:#202124;margin:0 0 14px">How to Earn Points</h3>
          <div class="contrib-points-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#f8fffe;border:1px solid #e0f2f1">
              <span style="font-size:20px">✏️</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Suggest Edit</div><div style="font-size:11px;color:#1a7a3c;font-weight:700">+5 pts</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#fff8e1;border:1px solid #ffe082">
              <span style="font-size:20px">🏢</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Claim Listing</div><div style="font-size:11px;color:#f57f17;font-weight:700">+10 pts</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#fce4ec;border:1px solid #f48fb1">
              <span style="font-size:20px">⭐</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Add Review</div><div style="font-size:11px;color:#c62828;font-weight:700">+3 pts</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#ede7f6;border:1px solid #b39ddb">
              <span style="font-size:20px">💬</span>
              <div><div style="font-size:12px;font-weight:600;color:#202124">Q&amp;A Answer</div><div style="font-size:11px;color:#4527a0;font-weight:700">+2 pts</div></div>
            </div>
          </div>
        </div>

        <div style="background:#fff;border-radius:16px;border:1px solid #e8eaed;overflow:hidden">
          <div style="padding:18px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between">
            <h2 style="font-size:16px;font-weight:700;color:#202124;margin:0">Leaderboard</h2>
            <span style="font-size:12px;color:#9aa0a6">${leaderboard.length} contributors</span>
          </div>
          ${rows.length > 0 ? rows : `<div style="padding:32px;text-align:center;color:#9aa0a6">No contributors yet. Be the first!</div>`}
        </div>
      </div>
    ${renderPageFooter(main)}
    </div>
  `;

  initFooterReactivity();
}
