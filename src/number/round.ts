export function round(value: number, decimals = 2): number {
	const divisor = 10 ** decimals;

	return Math.round(value * divisor) / divisor;
}
