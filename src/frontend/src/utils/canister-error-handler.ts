/**
 * Canister Error Handler
 * Detects IC0508 / canister-stopped errors and provides localStorage fallback + auto-retry.
 */

const PENDING_LISTINGS_KEY = "dhoondho_pending_listings";
const RETRY_INTERVAL_MS = 30_000; // 30 s
let retryTimer: ReturnType<typeof setInterval> | null = null;

// ─── Type ────────────────────────────────────────────────────────────────────

export interface PendingListing {
  id: string; // uuid-like
  data: Record<string, unknown>;
  savedAt: number;
  attempts: number;
}

// ─── Detection ───────────────────────────────────────────────────────────────

export function isCanisterDownError(err: unknown): boolean {
  const msg =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : JSON.stringify(err);
  const lower = msg.toLowerCase();
  return (
    lower.includes("ic0508") ||
    lower.includes("canister is stopped") ||
    lower.includes("canister stopped") ||
    lower.includes("canister not running")
  );
}

/** Returns a user-friendly message. Raw error is never shown to the user. */
export function friendlyError(err: unknown): string {
  if (isCanisterDownError(err)) {
    return "Service temporarily unavailable. Please try again.";
  }
  const msg = err instanceof Error ? err.message : String(err);
  // Mask internal details
  if (msg.toLowerCase().includes("unauthorized")) return msg; // keep auth msgs
  if (msg.toLowerCase().includes("please log in")) return msg;
  return msg || "An unexpected error occurred.";
}

// ─── LocalStorage queue ──────────────────────────────────────────────────────

function getPending(): PendingListing[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_LISTINGS_KEY) || "[]");
  } catch {
    return [];
  }
}

function savePending(list: PendingListing[]): void {
  localStorage.setItem(PENDING_LISTINGS_KEY, JSON.stringify(list));
}

export function queueListing(data: Record<string, unknown>): void {
  const list = getPending();
  list.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    data,
    savedAt: Date.now(),
    attempts: 0,
  });
  savePending(list);
  console.warn("[CanisterError] Listing queued to localStorage:", data);
}

export function hasPendingListings(): boolean {
  return getPending().length > 0;
}

// ─── Auto-retry ──────────────────────────────────────────────────────────────

/**
 * Start the retry loop.
 * @param submitFn An async function that receives listing data and submits it.
 *   It should throw if the backend is still unavailable.
 */
export function startRetryLoop(
  submitFn: (data: Record<string, unknown>) => Promise<void>,
): void {
  if (retryTimer !== null) return; // already running
  console.log(
    "[CanisterError] Starting retry loop, interval:",
    RETRY_INTERVAL_MS,
    "ms",
  );

  retryTimer = setInterval(async () => {
    const list = getPending();
    if (list.length === 0) {
      stopRetryLoop();
      return;
    }

    const remaining: PendingListing[] = [];
    for (const item of list) {
      try {
        await submitFn(item.data);
        console.log("[CanisterError] Retry succeeded for listing:", item.id);
        // Show toast if available
        try {
          const { showToast } = await import("./toast");
          showToast(
            "Your saved listing has been submitted successfully!",
            "success",
          );
        } catch {
          /* toast optional */
        }
      } catch (err) {
        item.attempts += 1;
        console.warn(
          "[CanisterError] Retry failed (attempt",
          item.attempts,
          "):",
          err,
        );
        remaining.push(item);
      }
    }
    savePending(remaining);
    if (remaining.length === 0) stopRetryLoop();
  }, RETRY_INTERVAL_MS);
}

export function stopRetryLoop(): void {
  if (retryTimer !== null) {
    clearInterval(retryTimer);
    retryTimer = null;
    console.log("[CanisterError] Retry loop stopped.");
  }
}

// ─── Debug logging ───────────────────────────────────────────────────────────

export function logApiFailure(method: string, err: unknown): void {
  const isDown = isCanisterDownError(err);
  console.error(
    `[CanisterError] API failure | method=${method} | canisterDown=${isDown} | error=`,
    err,
  );
  if (isDown) {
    console.warn(
      "[CanisterError] Canister status: STOPPED (IC0508). Backend is unreachable.",
    );
  }
}
