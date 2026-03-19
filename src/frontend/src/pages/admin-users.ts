// ─── User Management Module ──────────────────────────────────────────────────

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

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function initUserManagementDemo(): void {
  if (getUsersRegistry().length > 0) return;
  const demo: AppUser[] = [
    {
      id: "u1",
      principal: "2vxsx-fae",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "user",
      status: "active",
      joinedAt: "2026-01-10",
      lastActive: "2026-03-18",
      listingsCount: 3,
    },
    {
      id: "u2",
      principal: "rrkah-fqaaa",
      name: "Priya Verma",
      email: "priya@example.com",
      role: "vendor",
      status: "active",
      joinedAt: "2026-02-05",
      lastActive: "2026-03-17",
      listingsCount: 8,
    },
    {
      id: "u3",
      principal: "qoctq-giaaa",
      name: "Amit Patel",
      email: "amit@example.com",
      role: "user",
      status: "banned",
      joinedAt: "2026-01-20",
      lastActive: "2026-02-28",
      listingsCount: 1,
    },
    {
      id: "u4",
      principal: "aaaaa-bbbbb",
      name: "Sunita Rao",
      email: "sunita@example.com",
      role: "vendor",
      status: "suspended",
      joinedAt: "2026-02-14",
      lastActive: "2026-03-10",
      listingsCount: 5,
    },
    {
      id: "u5",
      principal: "ccccc-ddddd",
      name: "Vikram Singh",
      email: "vikram@example.com",
      role: "admin",
      status: "active",
      joinedAt: "2025-12-01",
      lastActive: "2026-03-19",
      listingsCount: 12,
    },
  ];
  saveUsersRegistry(demo);
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
  initUserManagementDemo();
  const users = getUsersRegistry();

  container.innerHTML = `
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">User Management</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${users.length} registered users</p>
        </div>
        <button id="export-users-btn" class="px-4 py-2 text-sm font-semibold rounded-lg border flex items-center gap-2" style="border-color:oklch(var(--border))">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <input id="user-search" type="text" placeholder="Search by name or email..." class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
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
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Listings</th>
                <th class="text-left px-4 py-3 text-xs font-semibold" style="color:oklch(var(--muted-foreground))">Actions</th>
              </tr>
            </thead>
            <tbody id="users-table-body">
              ${renderUsersRows(users)}
            </tbody>
          </table>
        </div>
      </div>
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
        u.email.toLowerCase().includes(q);
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
        "Name,Email,Role,Status,Joined,Listings",
        ...all.map(
          (u) =>
            `"${u.name}","${u.email}",${u.role},${u.status},${u.joinedAt},${u.listingsCount}`,
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
    return `<tr><td colspan="6" class="px-4 py-10 text-center text-sm" style="color:oklch(var(--muted-foreground))">No users found.</td></tr>`;
  }
  return users
    .map(
      (u) => `
    <tr data-user-id="${u.id}" style="border-bottom:1px solid oklch(var(--border))">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style="background:oklch(var(--primary))">${escHtml(u.name[0] || "?")}</div>
          <div>
            <div class="text-sm font-semibold" style="color:oklch(var(--foreground))">${escHtml(u.name)}</div>
            <div class="text-xs" style="color:oklch(var(--muted-foreground))">${escHtml(u.email)}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3">${roleBadge(u.role)}</td>
      <td class="px-4 py-3">${statusBadge(u.status)}</td>
      <td class="px-4 py-3 text-sm" style="color:oklch(var(--muted-foreground))">${u.joinedAt}</td>
      <td class="px-4 py-3 text-sm font-semibold" style="color:oklch(var(--foreground))">${u.listingsCount}</td>
      <td class="px-4 py-3">
        <div class="flex flex-wrap gap-2">
          ${u.status !== "banned" ? `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="ban" data-id="${u.id}" style="background:#fdecea;color:#b71c1c">Ban</button>` : `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="unban" data-id="${u.id}" style="background:#e8f5e9;color:#1a7a3c">Unban</button>`}
          ${u.role !== "vendor" ? `<button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="make-vendor" data-id="${u.id}" style="background:#f3e5f5;color:#6a1b9a">Make Vendor</button>` : ""}
          <button class="user-action-btn text-xs px-3 py-1 rounded-lg font-semibold" data-action="view-log" data-id="${u.id}" style="background:#e3f2fd;color:#0d47a1">Activity</button>
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
    btn.addEventListener("click", (e) => {
      const el = e.currentTarget as HTMLElement;
      const action = el.dataset.action;
      const id = el.dataset.id;
      const users = getUsersRegistry();
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return;
      if (action === "ban") {
        users[idx].status = "banned";
        saveUsersRegistry(users);
        showUserToast("User banned.");
      } else if (action === "unban") {
        users[idx].status = "active";
        saveUsersRegistry(users);
        showUserToast("User unbanned.");
      } else if (action === "make-vendor") {
        users[idx].role = "vendor";
        saveUsersRegistry(users);
        showUserToast("Role updated to vendor.");
      } else if (action === "view-log") {
        const u = users[idx];
        alert(
          `Activity Log – ${u.name}\n\nLast Active: ${u.lastActive}\nListings: ${u.listingsCount}\nJoined: ${u.joinedAt}\nPrincipal: ${u.principal}`,
        );
        return;
      }
      const tbody = container.querySelector("#users-table-body");
      if (tbody) tbody.innerHTML = renderUsersRows(getUsersRegistry());
      attachUserActions(container);
    });
  }
}

function showUserToast(msg: string): void {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t.style.background = "oklch(var(--primary))";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
