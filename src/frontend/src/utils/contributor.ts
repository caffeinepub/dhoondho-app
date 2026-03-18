// Step 31 – Contributor Badge System

export type ContributorAction =
  | "suggest_edit"
  | "claim_listing"
  | "add_review"
  | "qa_answer";

const ACTION_POINTS: Record<ContributorAction, number> = {
  suggest_edit: 5,
  claim_listing: 10,
  add_review: 3,
  qa_answer: 2,
};

export type BadgeLevel = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface ContributorEntry {
  id: string;
  name: string;
  points: number;
  actions: number;
}

export function getBadgeLevel(points: number): BadgeLevel {
  if (points >= 500) return "Platinum";
  if (points >= 200) return "Gold";
  if (points >= 50) return "Silver";
  return "Bronze";
}

export function getBadgeColor(level: BadgeLevel): string {
  const colors: Record<BadgeLevel, string> = {
    Bronze: "#CD7F32",
    Silver: "#A8A9AD",
    Gold: "#FFD700",
    Platinum: "#9C27B0",
  };
  return colors[level];
}

function generateUserId(): string {
  const id = `user_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem("dhoondho_user_id", id);
  return id;
}

function updateLeaderboard(
  id: string,
  name: string,
  points: number,
  actions: number,
): void {
  const raw = localStorage.getItem("dhoondho_contributors") || "[]";
  let entries: ContributorEntry[] = JSON.parse(raw);
  const idx = entries.findIndex((e) => e.id === id);
  if (idx >= 0) {
    entries[idx] = { id, name, points, actions };
  } else {
    entries.push({ id, name, points, actions });
  }
  localStorage.setItem("dhoondho_contributors", JSON.stringify(entries));
}

export function awardPoints(action: ContributorAction): void {
  const pts = ACTION_POINTS[action] ?? 1;
  const currentPts = Number(localStorage.getItem("dhoondho_my_points") || "0");
  const currentActions = Number(
    localStorage.getItem("dhoondho_my_actions") || "0",
  );
  localStorage.setItem("dhoondho_my_points", String(currentPts + pts));
  localStorage.setItem("dhoondho_my_actions", String(currentActions + 1));
  const userId = localStorage.getItem("dhoondho_user_id") || generateUserId();
  const userName = localStorage.getItem("dhoondho_user_name") || "You";
  updateLeaderboard(userId, userName, currentPts + pts, currentActions + 1);
}

export function getLeaderboard(): ContributorEntry[] {
  const raw = localStorage.getItem("dhoondho_contributors") || "[]";
  let entries: ContributorEntry[] = JSON.parse(raw);
  if (entries.length < 3) {
    const demo: ContributorEntry[] = [
      { id: "demo1", name: "Priya Sharma", points: 680, actions: 72 },
      { id: "demo2", name: "Rahul Gupta", points: 430, actions: 51 },
      { id: "demo3", name: "Anita Verma", points: 290, actions: 38 },
      { id: "demo4", name: "Suresh Kumar", points: 165, actions: 24 },
      { id: "demo5", name: "Meena Patel", points: 95, actions: 17 },
      { id: "demo6", name: "Arjun Singh", points: 40, actions: 9 },
    ];
    const existingIds = new Set(entries.map((e) => e.id));
    for (const d of demo) {
      if (!existingIds.has(d.id)) entries.push(d);
    }
    localStorage.setItem("dhoondho_contributors", JSON.stringify(entries));
  }
  return entries.sort((a, b) => b.points - a.points);
}

export function getMyPoints(): number {
  return Number(localStorage.getItem("dhoondho_my_points") || "0");
}

export function getBadgeHTML(points: number, inline = false): string {
  const level = getBadgeLevel(points);
  const color = getBadgeColor(level);
  const size = inline
    ? "font-size:11px;padding:2px 8px"
    : "font-size:12px;padding:4px 12px";
  return `<span style="${size};border-radius:99px;font-weight:700;background:${color}22;color:${color};border:1px solid ${color}44">${level}</span>`;
}
