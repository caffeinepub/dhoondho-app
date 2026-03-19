// ─── Notification / Broadcast Module ─────────────────────────────────────────

export interface BroadcastMessage {
  id: string;
  title: string;
  message: string;
  targetAudience: "all" | "vendors" | "users" | "admins";
  type: "info" | "warning" | "success" | "alert";
  sentAt: string;
  sentBy: string;
  readCount: number;
}

const BROADCASTS_KEY = "dhoondho_broadcasts";
const INBOX_KEY = "dhoondho_notification_inbox";

export function getBroadcasts(): BroadcastMessage[] {
  try {
    return JSON.parse(localStorage.getItem(BROADCASTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getNotificationInbox(): BroadcastMessage[] {
  try {
    return JSON.parse(localStorage.getItem(INBOX_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveBroadcasts(msgs: BroadcastMessage[]): void {
  localStorage.setItem(BROADCASTS_KEY, JSON.stringify(msgs));
}

function initDemoBroadcasts(): void {
  if (getBroadcasts().length > 0) return;
  const demo: BroadcastMessage[] = [
    {
      id: "b1",
      title: "Platform Update v49",
      message:
        "We've improved search speed and added new category filters. Check it out!",
      targetAudience: "all",
      type: "info",
      sentAt: "2026-03-15 10:30",
      sentBy: "Admin",
      readCount: 142,
    },
    {
      id: "b2",
      title: "Vendor Verification Required",
      message:
        "All vendors must complete document verification by March 31st to remain listed.",
      targetAudience: "vendors",
      type: "warning",
      sentAt: "2026-03-10 14:00",
      sentBy: "Admin",
      readCount: 38,
    },
    {
      id: "b3",
      title: "New Feature: Voice Search",
      message:
        "Voice search is now live! Tap the mic icon to search hands-free.",
      targetAudience: "all",
      type: "success",
      sentAt: "2026-03-01 09:00",
      sentBy: "Admin",
      readCount: 287,
    },
  ];
  saveBroadcasts(demo);
}

function typeBadge(type: BroadcastMessage["type"]): string {
  const m: Record<BroadcastMessage["type"], string> = {
    info: "background:#e3f2fd;color:#0d47a1",
    warning: "background:#fff3e0;color:#e65100",
    success: "background:#e8f5e9;color:#1a7a3c",
    alert: "background:#fdecea;color:#b71c1c",
  };
  const icons: Record<BroadcastMessage["type"], string> = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    alert: "🚨",
  };
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="${m[type]}">${icons[type]} ${type}</span>`;
}

export function renderNotificationsTab(container: HTMLElement): void {
  initDemoBroadcasts();
  const broadcasts = getBroadcasts();
  const totalReach = broadcasts.reduce((sum, b) => sum + b.readCount, 0);

  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Notifications & Broadcasts</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${broadcasts.length} sent · ${totalReach.toLocaleString()} total reads</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          {
            label: "Total Sent",
            val: broadcasts.length,
            color: "oklch(var(--primary))",
          },
          {
            label: "Total Reads",
            val: totalReach.toLocaleString(),
            color: "#1a7a3c",
          },
          {
            label: "To All Users",
            val: broadcasts.filter((b) => b.targetAudience === "all").length,
            color: "#0d47a1",
          },
          {
            label: "To Vendors",
            val: broadcasts.filter((b) => b.targetAudience === "vendors")
              .length,
            color: "#6a1b9a",
          },
        ]
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

      <!-- Compose New Broadcast -->
      <div class="rounded-xl border p-5" style="background:oklch(var(--card));border-color:oklch(var(--border))">
        <h3 class="text-sm font-bold mb-4" style="color:oklch(var(--foreground))">Send New Broadcast</h3>
        <form id="broadcast-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Title *</label>
            <input name="title" required type="text" placeholder="Notification title..." class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Audience</label>
              <select name="targetAudience" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
                <option value="all">All Users</option>
                <option value="vendors">Vendors Only</option>
                <option value="users">Regular Users</option>
                <option value="admins">Admins Only</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Type</label>
              <select name="type" class="w-full px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="alert">Alert</option>
              </select>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold mb-1" style="color:oklch(var(--foreground))">Message *</label>
            <textarea name="message" required rows="3" placeholder="Broadcast message..." class="w-full px-3 py-2 rounded-lg border text-sm resize-none" style="border-color:oklch(var(--border))"></textarea>
          </div>
          <div class="sm:col-span-2">
            <button type="submit" class="px-6 py-2 text-sm font-bold rounded-lg text-white" style="background:oklch(var(--primary))">Send Broadcast</button>
          </div>
        </form>
      </div>

      <!-- Broadcast History -->
      <div>
        <h3 class="text-sm font-bold mb-3" style="color:oklch(var(--foreground))">Broadcast History</h3>
        <div id="broadcasts-list" class="space-y-3">
          ${renderBroadcastCards(broadcasts)}
        </div>
      </div>
    </div>
  `;

  container
    .querySelector("#broadcast-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const msg: BroadcastMessage = {
        id: `b${Date.now()}`,
        title: (data.get("title") as string).trim(),
        message: (data.get("message") as string).trim(),
        targetAudience:
          (data.get("targetAudience") as BroadcastMessage["targetAudience"]) ||
          "all",
        type: (data.get("type") as BroadcastMessage["type"]) || "info",
        sentAt: new Date().toLocaleString("en-IN"),
        sentBy: "Admin",
        readCount: 0,
      };
      const all = getBroadcasts();
      saveBroadcasts([msg, ...all]);
      // Also save to inbox for users to see
      const inbox = getNotificationInbox();
      inbox.unshift(msg);
      localStorage.setItem(INBOX_KEY, JSON.stringify(inbox.slice(0, 50)));
      form.reset();
      const list = container.querySelector("#broadcasts-list");
      if (list) list.innerHTML = renderBroadcastCards(getBroadcasts());
      showNotifToast(`Broadcast sent to ${msg.targetAudience}!`);
    });
}

function renderBroadcastCards(msgs: BroadcastMessage[]): string {
  if (msgs.length === 0)
    return `<div class="p-8 text-center text-sm" style="color:oklch(var(--muted-foreground))">No broadcasts yet.</div>`;
  return msgs
    .map(
      (m) => `
    <div class="rounded-xl border p-4" style="background:oklch(var(--card));border-color:oklch(var(--border))">
      <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h4 class="text-sm font-bold" style="color:oklch(var(--foreground))">${m.title}</h4>
          <p class="text-xs mt-0.5" style="color:oklch(var(--muted-foreground))">Sent ${m.sentAt} by ${m.sentBy}</p>
        </div>
        <div class="flex gap-2">${typeBadge(m.type)} <span class="text-xs px-2 py-0.5 rounded-full" style="background:#f5f5f5;color:#424242">→ ${m.targetAudience}</span></div>
      </div>
      <p class="text-sm" style="color:oklch(var(--muted-foreground))">${m.message}</p>
      <p class="text-xs mt-2" style="color:oklch(var(--muted-foreground))">👁 ${m.readCount} reads</p>
    </div>
  `,
    )
    .join("");
}

function showNotifToast(msg: string): void {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg";
  t.style.background = "oklch(var(--primary))";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
