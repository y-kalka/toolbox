/**
 * Returns the last item of an array
 * ```ts
 * const item = last([1,2,3]) // 3
 * ```
 */
export function last<T>(arr: T[]): T | undefined {
	return arr.at(-1);
}
