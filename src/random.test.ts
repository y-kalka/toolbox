import { describe, expect } from "vitest";
import { randomArrayValue, randomInt } from "./random.js";

describe("randomInt", (test) => {
	test("should return a random integer value", () => {
		for (let i = 0; i < 25; i++) {
			const integer = randomInt();

			expect(integer >= 0).toBe(true);
			expect(integer <= Number.MAX_SAFE_INTEGER).toBe(true);
			expect(Number.isFinite(integer)).toBe(true);
			expect(Number.isInteger(integer)).toBe(true);
		}
	});
});

describe("randomArrayValue", (test) => {
	test("should return a random value from array", () => {
		const arr = [1, 2, 3];

		for (let i = 0; i < arr.length * 10; i++) {
			expect(typeof randomArrayValue(arr) === "number").toBe(true);
		}
	});
});
