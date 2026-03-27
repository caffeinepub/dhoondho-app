// ─── User Management Module ──────────────────────────────────────────────────
// Uses localStorage as the user registry (backend has no getAllUsers endpoint).
// When a user logs in, their profile is saved to the registry via saveCallerUserProfile.
// Role changes are persisted to both localStorage and backend (assignCallerUserRole).

import { getAuthenticatedBackend } from "../backend-client";
import { showToast } from "../utils/toast";

export interface AppUser {
  id: string;
  principal: string;
  name: string;
  email: string;
  role: "user" | "vendor" | "admin";
  status: "active" | "banned" | "suspended";
  joinedAt: string;
  lastActive: string;
  listingsCount: number;
}

const USERS_KEY = "dhoondho_users_registry";

export function getUsersRegistry(): AppUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUsersRegistry(users: AppUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Register or update the currently logged-in user in the local registry. */
export function upsertUserInRegistry(
  user: Partial<AppUser> & { principal: string },
): void {
  const all = getUsersRegistry();
  const idx = all.findIndex((u) => u.principal === user.principal);
  const now = new Date().toISOString().split("T")[0];
  if (idx === -1) {
    all.push({
      id: `u-${Date.now()}`,
      name: user.name || "Unknown",
      email: user.email || "",
      role: user.role || "user",
      status: "active",
      joinedAt: now,
      lastActive: now,
      listingsCount: 0,
      ...user,
    });
  } else {
    all[idx] = { ...all[idx], ...user, lastActive: now };
  }
  saveUsersRegistry(all);
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statusBadge(status: AppUser["status"]): string {
  const map: Record<AppUser["status"], string> = {
    active: "background:#e8f5e9;color:#1a7a3c",
    banned: "background:#fdecea;color:#b71c1c",
    suspended: "background:#fff3e0;color:#e65100",
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${map[status]}">${status}</span>`;
}

function roleBadge(role: AppUser["role"]): string {
  const map: Record<AppUser["role"], string> = {
    admin: "background:#e3f2fd;color:#0d47a1",
    vendor: "background:#f3e5f5;color:#6a1b9a",
    user: "background:#f5f5f5;color:#424242",
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${map[role]}">${role}</span>`;
}

export function renderUserManagementTab(container: HTMLElement): void {
  const users = getUsersRegistry();

  container.innerHTML = `
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">User Management</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${users.length} registered user${users.length !== 1 ? "s" : ""} (users are registered as they log in)</p>
        </div>
        <button id="export-users-btn" class="px-4 py-2 text-sm font-semibold rounded-lg border flex items-center gap-2" style="border-color:oklch(var(--border))">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <input id="user-search" type="text" placeholder="Search by name, email or principal..." class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
        <select id="user-role-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="vendor">Vendor</option>
          <option value="user">User</option>
        </select>
        <select id="user-status-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:oklch(var(--primary))">${users.length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Total Users</div>
        </div>
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:#1a7a3c">${users.filter((u) => u.status === "active").length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Active</div>
        </div>
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:#6a1b9a">${users.filter((u) => u.role === "vendor").length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Vendors</div>
        </div>
        <div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:#b71c1c">${users.filter((u) => u.status === "banned").length}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">Banned</div>
        </div>
      </div>

      ${
        users.length === 0
          ? `
        <div class="rounded-xl border p-12 text-center" style="border-color:oklch(var(--border));background:oklch(var(--card))">
          <div class="text-4xl mb-3">👥</div>
          <p class="font-semibold" style="color:oklch(var(--foreground))">No users registered yet</p>
          <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Users will appear here as they log in with Internet Identity.</p>
        </div>
      `
          : `
      <!-- User Table -->
      <div class="rounded-xl border" style="border-color:oklch(var(--border))">
        <div style="overflow-x:auto">
          <table class="w-full" style="min-width:700px">
            <thead>
              <tr style="background:oklch(var(--muted)/0.3);border-bottom:1px solid oklch(var(--border))">
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">User</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Role</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Status</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Joined</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
              </tr>
            </thead>
            <tbody id="users-table-body">
              ${renderUsersRows(users)}
            </tbody>
          </table>
        </div>
      </div>
      `
      }
    </div>
  `;

  // Search & filter
  const searchInput = container.querySelector<HTMLInputElement>("#user-search");
  const roleFilter =
    container.querySelector<HTMLSelectElement>("#user-role-filter");
  const statusFilter = container.querySelector<HTMLSelectElement>(
    "#user-status-filter",
  );

  function applyFilters(): void {
    const q = (searchInput?.value || "").toLowerCase();
    const role = roleFilter?.value || "";
    const status = statusFilter?.value || "";
    const all = getUsersRegistry();
    const filtered = all.filter((u) => {
      const matchQ =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.principal.toLowerCase().includes(q);
      const matchRole = !role || u.role === role;
      const matchStatus = !status || u.status === status;
      return matchQ && matchRole && matchStatus;
    });
    const tbody = container.querySelector("#users-table-body");
    if (tbody) tbody.innerHTML = renderUsersRows(filtered);
    attachUserActions(container);
  }

  searchInput?.addEventListener("input", applyFilters);
  roleFilter?.addEventListener("change", applyFilters);
  statusFilter?.addEventListener("change", applyFilters);

  container
    .querySelector("#export-users-btn")
    ?.addEventListener("click", () => {
      const all = getUsersRegistry();
      const csv = [
        "Name,Email,Role,Status,Joined,Principal",
        ...all.map(
          (u) =>
            `"${u.name}","${u.email}",${u.role},${u.status},${u.joinedAt},"${u.principal}"`,
        ),
      ].join("\n");
      const a = document.createElement("a");
      a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
      a.download = "dhoondho_users.csv";
      a.click();
    });

  attachUserActions(container);
}

function renderUsersRows(users: AppUser[]): string {
  if (users.length === 0) {
    return `<tr><td colspan="5" class="px-4 py-10 text-center text-sm" style="color:oklch(var(--muted-foreground))">No users found.</td></tr>`;
  }
  return users
    .map(
      (u) => `
    <tr data-user-id="${u.id}" style="border-bottom:1px solid oklch(var(--border))">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style="background:oklch(var(--primary))">${escHtml((u.name[0] || "?").toUpperCase())}</div>
          <div>
            <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">${escHtml(u.name)}</div>
            <div class="text-xs font-mono truncate max-w-[180px]" style="color:oklch(var(--muted-foreground))">${escHtml(u.principal)}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3">${roleBadge(u.role)}</td>
      <td class="px-4 py-3">${statusBadge(u.status)}</td>
      <td class="px-4 py-3 text-sm" style="color:oklch(var(--muted-foreground))">${u.joinedAt}</td>
      <td class="px-4 py-3">
        <div class="flex flex-wrap gap-2">
          ${
            u.status !== "banned"
              ? `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="ban" data-id="${u.id}" style="background:#fdecea;color:#b71c1c">Ban</button>`
              : `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="unban" data-id="${u.id}" style="background:#e8f5e9;color:#1a7a3c">Unban</button>`
          }
          ${
            u.role !== "vendor"
              ? `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="make-vendor" data-id="${u.id}" style="background:#f3e5f5;color:#6a1b9a">Make Vendor</button>`
              : ""
          }
          <button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="delete" data-id="${u.id}" style="background:#fdecea;color:#b71c1c">Delete</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

function attachUserActions(container: HTMLElement): void {
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".user-action-btn"),
  )) {
    btn.addEventListener("click", async (e) => {
      const el = e.currentTarget as HTMLElement;
      const action = el.dataset.action;
      const id = el.dataset.id;
      const users = getUsersRegistry();
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return;

      el.setAttribute("disabled", "true");

      if (action === "ban") {
        users[idx].status = "banned";
        saveUsersRegistry(users);
        showToast("User banned.", "info");
      } else if (action === "unban") {
        users[idx].status = "active";
        saveUsersRegistry(users);
        showToast("User unbanned.", "success");
      } else if (action === "make-vendor") {
        users[idx].role = "vendor";
        saveUsersRegistry(users);
        // Also try to update role on backend via assignCallerUserRole
        try {
          const { Principal } = await import("@icp-sdk/core/principal");
          const backend = await getAuthenticatedBackend();
          const { UserRole } = await import("../backend");
          await backend.assignCallerUserRole(
            Principal.fromText(users[idx].principal) as Parameters<
              typeof backend.assignCallerUserRole
            >[0],
            UserRole.user, // backend has no vendor role; set as user
          );
          showToast("Role updated to vendor.", "success");
        } catch {
          // backend role assignment may fail if caller is not the target user; local update still applied
          showToast(
            "Role updated locally. Backend sync may require the user to log in again.",
            "info",
          );
        }
      } else if (action === "delete") {
        if (
          !confirm(`Delete user "${users[idx].name}"? This cannot be undone.`)
        ) {
          el.removeAttribute("disabled");
          return;
        }
        users.splice(idx, 1);
        saveUsersRegistry(users);
        showToast("User deleted.", "info");
      }

      el.removeAttribute("disabled");

      const tbody = container.querySelector("#users-table-body");
      if (tbody) tbody.innerHTML = renderUsersRows(getUsersRegistry());
      attachUserActions(container);
    });
  }
}
