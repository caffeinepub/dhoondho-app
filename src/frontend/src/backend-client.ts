import { onAuthChange } from "./auth";
import type { backendInterface } from "./backend";
import { createActorWithConfig } from "./config";

let backendInstance: backendInterface | null = null;

// Reset cached actor on auth change so the next call uses the correct identity
onAuthChange(() => {
  backendInstance = null;
});

export async function getBackend(): Promise<backendInterface> {
  if (!backendInstance) {
    backendInstance = await createActorWithConfig();
  }
  return backendInstance;
}

export function resetBackend(): void {
  backendInstance = null;
}
