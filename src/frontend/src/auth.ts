import { AuthClient } from "@dfinity/auth-client";
import { loadConfig } from "./config";

const ONE_HOUR_NS = BigInt(3_600_000_000_000);
let authClient: AuthClient | null = null;
let authListeners: Array<() => void> = [];

export function onAuthChange(fn: () => void): void {
  authListeners.push(fn);
}

function notifyListeners(): void {
  for (const fn of authListeners) fn();
}

export async function getAuthClient(): Promise<AuthClient> {
  if (!authClient) {
    const config = await loadConfig();
    authClient = await AuthClient.create({
      idleOptions: { disableDefaultIdleCallback: true, disableIdle: true },
      ...(config.ii_derivation_origin
        ? { loginOptions: { derivationOrigin: config.ii_derivation_origin } }
        : {}),
    });
  }
  return authClient;
}

export async function isAuthenticated(): Promise<boolean> {
  const client = await getAuthClient();
  return client.isAuthenticated();
}

export async function login(): Promise<void> {
  const client = await getAuthClient();
  const iiUrl =
    (import.meta.env.II_URL as string) ||
    "https://identity.internetcomputer.org/";
  return new Promise((resolve, reject) => {
    client.login({
      identityProvider: iiUrl,
      maxTimeToLive: ONE_HOUR_NS * BigInt(24 * 30),
      onSuccess: () => {
        notifyListeners();
        resolve();
      },
      onError: (e) => reject(new Error(e ?? "Login failed")),
    });
  });
}

export async function logout(): Promise<void> {
  const client = await getAuthClient();
  await client.logout();
  authClient = null;
  notifyListeners();
}

export async function getPrincipal(): Promise<string | null> {
  const authenticated = await isAuthenticated();
  if (!authenticated) return null;
  const client = await getAuthClient();
  return client.getIdentity().getPrincipal().toString();
}
