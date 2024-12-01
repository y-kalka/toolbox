/**
 * Return a random integer value
 */
export function randomArrayValue<T>(arr: T[]): T {
	const index = randomInt({ to: arr.length - 1 });
	return arr[index] as T;
}

/**
 * Generate a random boolean value
 */
export function randomBoolean(): boolean {
	return Math.random() >= 0.5;
}

/**
 * Generate a random integer value
 */
export function randomInt(
	options: { from?: number; to?: number } = {},
): number {
	let { from, to } = options;

	if (from === undefined) {
		from = 0;
	}

	if (to === undefined) {
		to = Number.MAX_SAFE_INTEGER;
	}

	// From should not be bigger than to
	if (from > to) {
		throw new Error("'from' muss kleiner oder gleich 'to' sein.");
	}

	return Math.floor(Math.random() * (to - from + 1)) + from;
}
