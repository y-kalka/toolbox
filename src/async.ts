/**
 * Waits x miliseconds until it resolves the promise
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(() => resolve(), ms));
}
