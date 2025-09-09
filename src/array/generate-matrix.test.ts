import { expect, suite } from "vitest";
import { generateMatrix } from "./generate-matrix.js";

suite("generateMatrix", (test) => {
	const a = ["a", "b"];
	const b = [1, 2];
	const c = ["AA", "BB"];

	const result = [
		["a", 1, "AA"],
		["a", 1, "BB"],
		["a", 2, "AA"],
		["a", 2, "BB"],
		["b", 1, "AA"],
		["b", 1, "BB"],
		["b", 2, "AA"],
		["b", 2, "BB"],
	] as const;

	test("should generate a Matrix of the input arrays", () => {
		expect(generateMatrix(a, b, c)).toStrictEqual(result);
	});
});
