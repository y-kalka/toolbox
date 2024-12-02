/**
 * Returns the last item of an array
 * ```ts
 * const item = last([1,2,3]) // 3
 * ```
 */
export function last<T>(arr: T[]): T | undefined {
	return arr.at(-1);
}

/**
 * Returns the first item of an array
 * ```ts
 * const item = first([1,2,3]) // 1
 * ```
 */
export function first<T>(arr: T[]): T | undefined {
	return arr.at(0);
}
