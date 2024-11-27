import { round } from "./number.js";

/**
 * Returns the percentage of a fraction from a value
 * ```ts
 * percentFromTotal(25, 47) // 53.19 (%)
 * ```
 */
export function percentFromTotal(
	fraction: number,
	total: number,
	digits = 2,
): number {
	if (fraction === total) {
		return 100;
	}

	if (fraction === 0 && total > 0) {
		return 0;
	}

	if (fraction > total) {
		throw Error("The total is less than the part");
	}

	return round((fraction / total) * 100, digits);
}

/**
 * @description
 * Calculates the % change from one value to a other
 * ```ts
 * differenceInPercent(100, 50) // -50 (%)
 * ```
 */
export function differenceInPercent(from: number, to: number): number {
	let percent: number;
	let isIncrease = false;

	// check that the values are from type number
	if (typeof from !== "number" || typeof to !== "number") {
		throw Error("getDifferenceInPercent() expects only number values");
	}

	// check that only positive values are given
	if (from < 0 || to < 0) {
		throw Error("getDifferenceInPercent() expects only positive values");
	}

	// if no change has happened
	if (from === to) {
		return 0;
	}

	// if current is 0 then 100% of the current were removed
	if (to === 0) {
		return -100;
	}

	// if there were nothing before
	if (from === 0) {
		return to * 100;
	}

	if (from > to) {
		// decrease
		percent = ((from - to) / from) * 100;
	} else {
		// increase
		isIncrease = true;
		percent = ((to - from) / from) * 100;
	}

	// round the number to 2 digits max
	percent = round(percent);

	return isIncrease ? percent : -percent;
}
