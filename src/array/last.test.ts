import { expect, suite } from "vitest";
import { last } from "./last.js";

suite("last", (test) => {
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
