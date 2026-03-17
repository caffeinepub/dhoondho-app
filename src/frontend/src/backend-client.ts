import type { backendInterface } from "./backend";
import { createActorWithConfig } from "./config";

let backendInstance: backendInterface | null = null;

export async function getBackend(): Promise<backendInterface> {
  if (!backendInstance) {
    backendInstance = await createActorWithConfig();
  }
  return backendInstance;
}

export function resetBackend(): void {
  backendInstance = null;
}
