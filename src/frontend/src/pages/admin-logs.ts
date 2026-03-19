// ─── Logs & Error Monitoring Module ──────────────────────────────────────────────

export interface LogEntry {
  id: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  module: string;
  timestamp: string;
  details?: string;
}

const LOGS_KEY = "dhoondho_admin_logs";

export function getLogs(): LogEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addLog(
  level: LogEntry["level"],
  module: string,
  message: string,
  details?: string,
): void {
  const logs = getLogs();
  const entry: LogEntry = {
    id: `log-${Date.now()}`,
    level,
    message,
    module,
    timestamp: new Date().toLocaleString("en-IN"),
    details,
  };
  logs.unshift(entry);
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(0, 200))); // keep last 200
}

function initDemoLogs(): void {
  if (getLogs().length > 0) return;
  const demo: LogEntry[] = [
    {
      id: "l1",
      level: "error",
      message: "IC0508: Canister stopped during listing submission",
      module: "backend-client",
      timestamp: "19/03/2026, 14:32:10",
      details:
        "Canister vf3wn-7aaaa-aaaai-at4ha-cai returned IC0508. Listing queued to localStorage for retry.",
    },
    {
      id: "l2",
      level: "warn",
      message: "Anonymous actor used for API call",
      module: "backend-client",
      timestamp: "19/03/2026, 14:20:05",
      details:
        "getCategories called with anonymous identity. Expected authenticated call.",
    },
    {
      id: "l3",
      level: "info",
      message: "User authenticated successfully",
      module: "auth",
      timestamp: "19/03/2026, 14:15:30",
      details: "Principal: 2vxsx-fae. Role: admin.",
    },
    {
      id: "l4",
      level: "info",
      message: "Listing submitted and approved",
      module: "admin",
      timestamp: "19/03/2026, 13:55:00",
      details: "Listing ID: 42. Business: MediMarkit India. City: Delhi.",
    },
    {
      id: "l5",
      level: "error",
      message: "Failed to load nearby listings",
      module: "search",
      timestamp: "19/03/2026, 13:40:15",
      details: "Geolocation API error: Permission denied.",
    },
    {
      id: "l6",
      level: "info",
      message: "Admin panel accessed",
      module: "admin",
      timestamp: "19/03/2026, 13:30:00",
    },
    {
      id: "l7",
      level: "warn",
      message: "Retry queue has 2 pending listings",
      module: "canister-error-handler",
      timestamp: "19/03/2026, 13:10:00",
      details:
        "Pending listings will be resubmitted when backend is available.",
    },
    {
      id: "l8",
      level: "debug",
      message: "Search query executed",
      module: "search",
      timestamp: "19/03/2026, 12:45:00",
      details: 'Query: "plumber delhi". Results: 8. Time: 340ms.',
    },
    {
      id: "l9",
      level: "info",
      message: "Blog article published",
      module: "blog",
      timestamp: "19/03/2026, 12:00:00",
      details: "Title: Top 10 Plumbers in Delhi. Author: Admin.",
    },
    {
      id: "l10",
      level: "error",
      message: "XSS attempt blocked",
      module: "security",
      timestamp: "19/03/2026, 11:30:00",
      details: "Malicious input detected in review form. Input sanitized.",
    },
  ];
  localStorage.setItem(LOGS_KEY, JSON.stringify(demo));
}

export function renderLogsTab(container: HTMLElement): void {
  initDemoLogs();
  const logs = getLogs();
  const errors = logs.filter((l) => l.level === "error").length;
  const warnings = logs.filter((l) => l.level === "warn").length;

  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold" style="color:oklch(var(--foreground))">Logs & Error Monitoring</h2>
          <p class="text-sm" style="color:oklch(var(--muted-foreground))">${logs.length} entries · ${errors} errors · ${warnings} warnings</p>
        </div>
        <div class="flex gap-2">
          <button id="clear-logs-btn" class="text-xs px-4 py-2 rounded-lg font-semibold" style="background:#fdecea;color:#b71c1c">Clear Logs</button>
          <button id="export-logs-btn" class="text-xs px-4 py-2 rounded-lg font-semibold border" style="border-color:oklch(var(--border))">Export</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          {
            label: "Total Logs",
            val: logs.length,
            color: "oklch(var(--primary))",
          },
          { label: "Errors", val: errors, color: "#b71c1c" },
          { label: "Warnings", val: warnings, color: "#e65100" },
          {
            label: "Info",
            val: logs.filter((l) => l.level === "info").length,
            color: "#0d47a1",
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

      <!-- Filter -->
      <div class="flex flex-wrap gap-3">
        <select id="log-level-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Levels</option>
          <option value="error">Error</option>
          <option value="warn">Warning</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
        <select id="log-module-filter" class="px-3 py-2 rounded-lg border text-sm" style="border-color:oklch(var(--border))">
          <option value="">All Modules</option>
          ${[...new Set(logs.map((l) => l.module))].map((m) => `<option value="${m}">${m}</option>`).join("")}
        </select>
      </div>

      <!-- Log Entries -->
      <div id="logs-list" class="space-y-2">
        ${renderLogEntries(logs)}
      </div>
    </div>
  `;

  const levelFilter =
    container.querySelector<HTMLSelectElement>("#log-level-filter");
  const moduleFilter =
    container.querySelector<HTMLSelectElement>("#log-module-filter");

  function applyFilters(): void {
    const level = levelFilter?.value || "";
    const mod = moduleFilter?.value || "";
    const filtered = getLogs().filter(
      (l) => (!level || l.level === level) && (!mod || l.module === mod),
    );
    const list = container.querySelector("#logs-list");
    if (list) list.innerHTML = renderLogEntries(filtered);
  }

  levelFilter?.addEventListener("change", applyFilters);
  moduleFilter?.addEventListener("change", applyFilters);

  container.querySelector("#clear-logs-btn")?.addEventListener("click", () => {
    if (confirm("Clear all logs? This cannot be undone.")) {
      localStorage.removeItem(LOGS_KEY);
      renderLogsTab(container);
    }
  });

  container.querySelector("#export-logs-btn")?.addEventListener("click", () => {
    const all = getLogs();
    const text = all
      .map(
        (l) =>
          `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.module}] ${l.message}${l.details ? ` | ${l.details}` : ""}`,
      )
      .join("\n");
    const a = document.createElement("a");
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    a.download = "dhoondho_logs.txt";
    a.click();
  });
}

function renderLogEntries(logs: LogEntry[]): string {
  if (logs.length === 0)
    return `<div class="p-8 text-center text-sm" style="color:oklch(var(--muted-foreground))">No log entries.</div>`;
  const levelColors: Record<
    LogEntry["level"],
    { bg: string; text: string; dot: string }
  > = {
    error: { bg: "#fdecea", text: "#b71c1c", dot: "#b71c1c" },
    warn: { bg: "#fff3e0", text: "#e65100", dot: "#e65100" },
    info: { bg: "#e3f2fd", text: "#0d47a1", dot: "#0d47a1" },
    debug: { bg: "#f5f5f5", text: "#616161", dot: "#9e9e9e" },
  };
  return logs
    .map((l) => {
      const c = levelColors[l.level];
      return `
      <div class="rounded-xl border p-3" style="border-color:oklch(var(--border));border-left:3px solid ${c.dot}">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:${c.bg};color:${c.text}">${l.level.toUpperCase()}</span>
            <span class="text-xs font-semibold" style="color:oklch(var(--foreground))">${l.message}</span>
          </div>
          <div class="text-xs" style="color:oklch(var(--muted-foreground))">${l.timestamp}</div>
        </div>
        <div class="flex gap-2 mt-1 flex-wrap">
          <span class="text-xs px-2 py-0.5 rounded-full" style="background:#f5f5f5;color:#616161">${l.module}</span>
          ${l.details ? `<span class="text-xs" style="color:oklch(var(--muted-foreground))">${l.details}</span>` : ""}
        </div>
      </div>
    `;
    })
    .join("");
}
