import { expect, suite } from "vitest";
import { first } from "./first.js";

suite("first", (test) => {
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
