import { expect, suite } from "vitest";
import { differenceInPercent } from "./difference-in-percent.js";

suite("differenceInPercent", (test) => {
	test("should calculate the difference from 0 to X", () => {
		const res = differenceInPercent(0, 5);
		expect(res).toBe(500);
	});

	test("should calculate the difference from X to 0", () => {
		const res = differenceInPercent(245, 0);
		expect(res).toBe(-100);
	});

	test("should calculate a correct decrease", () => {
		const test1 = differenceInPercent(100, 50);
		const test2 = differenceInPercent(100, 25);
		const test3 = differenceInPercent(107, 98);
		expect(test1).toBe(-50);
		expect(test2).toBe(-75);
		expect(test3).toBe(-8.41);
	});

	test("should calculate a correct increase", () => {
		const test1 = differenceInPercent(5, 10);
		const test2 = differenceInPercent(5, 40);
		const test3 = differenceInPercent(5, 37);
		const test4 = differenceInPercent(98, 107);
		expect(test1).toBe(100);
		expect(test2).toBe(700);
		expect(test3).toBe(640);
		expect(test4).toBe(9.18);
	});
});
