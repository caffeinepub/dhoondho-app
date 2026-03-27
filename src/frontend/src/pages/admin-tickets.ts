// ─── Support / Ticket System Module ─────────────────────────────────────────────────
// Tickets are persisted in localStorage (the Motoko backend has no ticket endpoint).
// Real tickets arrive when users submit the support form from the app.
// No demo/seed data — only real submissions are shown.

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  userName: string;
  userEmail: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: "listing" | "vendor" | "payment" | "account" | "bug" | "other";
  createdAt: string;
  updatedAt: string;
  adminReply?: string;
}

const TICKETS_KEY = "dhoondho_support_tickets";

export function getTickets(): SupportTicket[] {
  try {
    const raw = JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
    // Filter out any legacy demo tickets (IDs like TKT-001, TKT-002, TKT-003, TKT-004)
    return Array.isArray(raw)
      ? raw.filter((t: SupportTicket) => !t.id.match(/^TKT-00[1-9]$/))
      : [];
  } catch {
    return [];
  }
}

export function saveTickets(tickets: SupportTicket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function submitTicket(
  ticket: Omit<SupportTicket, "id" | "createdAt" | "updatedAt" | "status">,
): SupportTicket {
  const now = new Date().toISOString().split("T")[0];
  const t: SupportTicket = {
    ...ticket,
    id: `TKT-${Date.now()}`,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };
  const all = getTickets();
  saveTickets([t, ...all]);
  return t;
}

function escH(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statusBadge(s: SupportTicket["status"]): string {
  const m: Record<SupportTicket["status"], string> = {
    open: "background:#fdecea;color:#b71c1c",
    "in-progress": "background:#fff3e0;color:#e65100",
    resolved: "background:#e8f5e9;color:#1a7a3c",
    closed: "background:#f5f5f5;color:#757575",
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${m[s]}">${s}</span>`;
}

function priorityBadge(p: SupportTicket["priority"]): string {
  const m: Record<SupportTicket["priority"], string> = {
    low: "background:#f5f5f5;color:#757575",
    medium: "background:#fff3e0;color:#e65100",
    high: "background:#fdecea;color:#b71c1c",
    urgent: "background:#880000;color:#fff",
  };
  return `<span class="text-xs font-bold px-2 py-0.5 rounded-full" style="${m[p]}">${p.toUpperCase()}</span>`;
}

export function renderTicketsTab(container: HTMLElement): void {
  const tickets = getTickets();
  const open = tickets.filter(
    (t) => t.status === "open" || t.status === "in-progress",
  ).length;
  const resolved = tickets.filter((t) => t.status === "resolved").length;

  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Support Tickets</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${open} open · ${resolved} resolved</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${(
          [
            {
              label: "Total",
              val: tickets.length,
              color: "oklch(var(--primary))",
            },
            {
              label: "Open",
              val: tickets.filter((t) => t.status === "open").length,
              color: "#b71c1c",
            },
            {
              label: "In Progress",
              val: tickets.filter((t) => t.status === "in-progress").length,
              color: "#e65100",
            },
            { label: "Resolved", val: resolved, color: "#1a7a3c" },
          ] as { label: string; val: number; color: string }[]
        )
          .map(
            (
              s,
            ) => `<div class="rounded-xl p-4 text-center" style="background:oklch(var(--card));border:1px solid oklch(var(--border))">
          <div class="text-2xl font-bold" style="color:${s.color}">${s.val}</div>
          <div class="text-xs mt-1" style="color:oklch(var(--muted-foreground))">${s.label}</div>
        </div>`,
          )
          .join("")}
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <input id="ticket-search" type="text" placeholder="Search tickets..." class="flex-1 min-w-[180px] px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
        <select id="ticket-status-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select id="ticket-priority-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <!-- Ticket List -->
      <div id="tickets-list" class="space-y-3">
        ${renderTicketCards(tickets)}
      </div>
    </div>
  `;

  const searchInput =
    container.querySelector<HTMLInputElement>("#ticket-search");
  const statusFilter = container.querySelector<HTMLSelectElement>(
    "#ticket-status-filter",
  );
  const priorityFilter = container.querySelector<HTMLSelectElement>(
    "#ticket-priority-filter",
  );

  function applyFilters(): void {
    const q = (searchInput?.value || "").toLowerCase();
    const status = statusFilter?.value || "";
    const priority = priorityFilter?.value || "";
    const all = getTickets();
    const filtered = all.filter((t) => {
      const matchQ =
        !q ||
        t.subject.toLowerCase().includes(q) ||
        t.userName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);
      const matchS = !status || t.status === status;
      const matchP = !priority || t.priority === priority;
      return matchQ && matchS && matchP;
    });
    const list = container.querySelector("#tickets-list");
    if (list) list.innerHTML = renderTicketCards(filtered);
    attachTicketActions(container);
  }

  searchInput?.addEventListener("input", applyFilters);
  statusFilter?.addEventListener("change", applyFilters);
  priorityFilter?.addEventListener("change", applyFilters);
  attachTicketActions(container);
}

function renderTicketCards(tickets: SupportTicket[]): string {
  if (tickets.length === 0) {
    return `<div class="rounded-xl border p-12 text-center" style="border-color:oklch(var(--border));background:oklch(var(--card))">
      <div class="text-4xl mb-3">🎫</div>
      <p class="font-semibold" style="color:oklch(var(--foreground))">No tickets yet</p>
      <p class="text-sm mt-1" style="color:oklch(var(--muted-foreground))">Support tickets submitted by users will appear here.</p>
    </div>`;
  }
  return tickets
    .map(
      (t) => `
    <div class="rounded-xl border p-4 sm:p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))" data-ticket-id="${t.id}">
      <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <span class="text-xs font-mono" style="color:oklch(var(--muted-foreground))">${t.id}</span>
          <h3 class="text-sm font-bold mt-0.5" style="color:oklch(var(--foreground))">${escH(t.subject)}</h3>
        </div>
        <div class="flex gap-2 flex-wrap">${priorityBadge(t.priority)} ${statusBadge(t.status)}</div>
      </div>
      <p class="text-sm mb-3" style="color:oklch(var(--muted-foreground))">${escH(t.message)}</p>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="text-xs" style="color:oklch(var(--muted-foreground))">
          <span class="font-semibold">${escH(t.userName)}</span>${t.userEmail ? ` · ${escH(t.userEmail)}` : ""} · ${t.createdAt}
        </div>
        <div class="flex gap-2 flex-wrap">
          ${t.status !== "resolved" && t.status !== "closed" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="reply" data-id="${t.id}" style="background:oklch(var(--primary));color:#fff">Reply</button>` : ""}
          ${t.status === "open" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="in-progress" data-id="${t.id}" style="background:#fff3e0;color:#e65100">Mark In Progress</button>` : ""}
          ${t.status !== "resolved" && t.status !== "closed" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="resolve" data-id="${t.id}" style="background:#e8f5e9;color:#1a7a3c">Resolve</button>` : ""}
          ${t.status !== "closed" ? `<button class="ticket-action text-xs px-3 py-1.5 rounded-lg font-semibold" data-action="close" data-id="${t.id}" style="background:#f5f5f5;color:#757575">Close</button>` : ""}
        </div>
      </div>
      ${t.adminReply ? `<div class="mt-3 p-3 rounded-lg text-sm" style="background:#e3f2fd;color:#0d47a1"><span class="font-semibold">Admin Reply:</span> ${escH(t.adminReply)}</div>` : ""}
      ${
        t.status !== "resolved" && t.status !== "closed"
          ? `
        <div id="reply-form-${t.id}" class="hidden mt-3">
          <textarea id="reply-text-${t.id}" rows="3" placeholder="Type your reply..." class="w-full px-3 py-2 rounded-lg border text-sm resize-none" style="border-color:oklch(var(--border))"></textarea>
          <button class="ticket-action mt-2 text-xs px-4 py-2 rounded-lg font-semibold text-white" data-action="submit-reply" data-id="${t.id}" style="background:oklch(var(--primary))">Send Reply</button>
        </div>
      `
          : ""
      }
    </div>
  `,
    )
    .join("");
}

function attachTicketActions(container: HTMLElement): void {
  for (const btn of Array.from(
    container.querySelectorAll<HTMLElement>(".ticket-action"),
  )) {
    btn.addEventListener("click", (e) => {
      const el = e.currentTarget as HTMLElement;
      const action = el.dataset.action;
      const id = el.dataset.id;
      const tickets = getTickets();
      const idx = tickets.findIndex((t) => t.id === id);
      if (idx === -1) return;
      const now = new Date().toISOString().split("T")[0];

      if (action === "reply") {
        const form = container.querySelector(`#reply-form-${id}`);
        form?.classList.toggle("hidden");
      } else if (action === "submit-reply") {
        const textarea = container.querySelector<HTMLTextAreaElement>(
          `#reply-text-${id}`,
        );
        const reply = textarea?.value.trim();
        if (!reply) return;
        tickets[idx].adminReply = reply;
        tickets[idx].status = "in-progress";
        tickets[idx].updatedAt = now;
        saveTickets(tickets);
        showTicketToast("Reply sent!");
        rerender(container);
      } else if (action === "in-progress") {
        tickets[idx].status = "in-progress";
        tickets[idx].updatedAt = now;
        saveTickets(tickets);
        showTicketToast("Ticket marked in progress.");
        rerender(container);
      } else if (action === "resolve") {
        tickets[idx].status = "resolved";
        tickets[idx].updatedAt = now;
        saveTickets(tickets);
        showTicketToast("Ticket resolved!");
        rerender(container);
      } else if (action === "close") {
        tickets[idx].status = "closed";
        tickets[idx].updatedAt = now;
        saveTickets(tickets);
        showTicketToast("Ticket closed.");
        rerender(container);
      }
    });
  }
}

function rerender(container: HTMLElement): void {
  const list = container.querySelector("#tickets-list");
  if (list) list.innerHTML = renderTicketCards(getTickets());
  attachTicketActions(container);
}

function showTicketToast(msg: string): void {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t.style.background = "oklch(var(--primary))";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
