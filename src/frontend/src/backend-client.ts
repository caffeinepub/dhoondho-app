import { getAuthClient, isAuthenticated, onAuthChange } from "./auth";
import type { backendInterface } from "./backend";
import { createActorWithConfig } from "./config";

/**
 * We track the authentication state at the time the backend was created.
 * If the auth state changes, we recreate the backend.
 *
 * "authenticated" | "anonymous" | null (not yet created)
 */
let backendInstance: backendInterface | null = null;
let backendCreatedAsAuthed: boolean | null = null;

// Reset cached actor on auth change so the next call uses the correct identity
onAuthChange(() => {
  backendInstance = null;
  backendCreatedAsAuthed = null;
});

/**
 * Returns a backend actor that ALWAYS uses the current auth identity.
 */
export async function getBackend(): Promise<backendInterface> {
  const authed = await isAuthenticated();

  // If auth state changed since we created the instance, invalidate it.
  if (backendInstance !== null && backendCreatedAsAuthed !== authed) {
    backendInstance = null;
    backendCreatedAsAuthed = null;
  }

  if (!backendInstance) {
    if (authed) {
      const client = await getAuthClient();
      const identity = client.getIdentity();
      backendInstance = await createActorWithConfig({
        agentOptions: { identity },
      });
      backendCreatedAsAuthed = true;
    } else {
      backendInstance = await createActorWithConfig();
      backendCreatedAsAuthed = false;
    }
  }

  return backendInstance;
}

/**
 * Returns an authenticated backend actor.
 * Throws a descriptive error if the user is not logged in.
 * Use this for all write operations that require authentication.
 */
export async function getAuthenticatedBackend(): Promise<backendInterface> {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error(
      "You must be logged in to perform this action. Please sign in with Internet Identity.",
    );
  }

  // Force recreate if we have an anonymous cached instance
  if (backendInstance !== null && backendCreatedAsAuthed === false) {
    backendInstance = null;
    backendCreatedAsAuthed = null;
  }

  return getBackend();
}

/**
 * Explicitly reset the backend instance.
 * Call this after login or logout to force actor recreation on next use.
 */
export function resetBackend(): void {
  backendInstance = null;
  backendCreatedAsAuthed = null;
}

/**
 * No-op kept for API compatibility.
 */
export async function debugAuth(): Promise<void> {
  // Intentionally empty in production
}
