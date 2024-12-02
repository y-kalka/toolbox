import { describe, expect } from "vitest";
import { first, last } from "./array.js";

describe("last", (test) => {
	test("should return allways the last item", async () => {
		const LAST_ITEM = 12;

		expect(last([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, LAST_ITEM])).equal(
			LAST_ITEM,
		);
		expect(last([1, 2, LAST_ITEM])).equal(LAST_ITEM);
		expect(last([LAST_ITEM])).equal(LAST_ITEM);
		expect(last([])).equal(undefined);
	});
});

describe("first", (test) => {
	test("should return allways the first item", async () => {
		const FIRST_ITEM = 1;

		expect(first([FIRST_ITEM, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).equal(
			FIRST_ITEM,
		);
		expect(first([FIRST_ITEM, 2, 3])).equal(FIRST_ITEM);
		expect(first([FIRST_ITEM])).equal(FIRST_ITEM);
		expect(first([])).equal(undefined);
	});
});
