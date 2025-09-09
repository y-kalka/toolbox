import { expect, suite } from "vitest";
import { percentFromTotal } from "./percent-from-total.js";

suite("percentFromTotal", (test) => {
	test("should calculate percentage correct", () => {
		expect(percentFromTotal(50, 100)).toBe(50);
		expect(percentFromTotal(100, 100)).toBe(100);
		expect(percentFromTotal(25, 47)).toBe(53.19);
	});

	test("should throw on invalid input", () => {
		expect(() => percentFromTotal(100, 50)).toThrowError();
	});
});
