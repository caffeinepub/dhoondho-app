export interface PendingListing {
  id: string;
  data: Record<string, unknown>;
  savedAt: number;
  attempts: number;
}
export declare function isCanisterDownError(err: unknown): boolean;
export declare function friendlyError(err: unknown): string;
export declare function queueListing(data: Record<string, unknown>): void;
export declare function hasPendingListings(): boolean;
export declare function startRetryLoop(
  submitFn: (data: Record<string, unknown>) => Promise<void>,
): void;
export declare function stopRetryLoop(): void;
export declare function logApiFailure(method: string, err: unknown): void;
