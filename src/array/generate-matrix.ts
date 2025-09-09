type Matrix<T extends readonly unknown[][]> = T extends []
	? []
	: T extends readonly [
				infer F extends readonly unknown[],
				...infer R extends readonly unknown[][],
			]
		? F[number] extends infer A
			? R extends []
				? [A][]
				: Matrix<R> extends infer P extends unknown[][]
					? {
							[K in keyof P]: P[K] extends readonly unknown[]
								? [A, ...P[K]]
								: never;
						}[number][]
					: never
			: never
		: [];

/**
 * Generates a matrix from all input array containing a variant of each constelation
 * ```ts
 * generateMatrix(["a", "b"], ["c", "d"]); // [["a", "c"], ["a", "d"], ["b", "c"], ["b", "d"]];
 * ```
 */
export function generateMatrix<const T extends readonly unknown[][]>(
	...arrays: T
): Matrix<T> {
	let acc: unknown[][] = [[]];
	for (const curr of arrays) {
		const next: unknown[][] = [];
		for (const a of acc) {
			for (const c of curr as readonly unknown[]) {
				next.push([...a, c]);
			}
		}
		acc = next;
	}
	return acc as unknown as Matrix<T>;
}
