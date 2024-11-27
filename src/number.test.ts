import { describe, expect } from "vitest";
import { round } from "./number.js";

describe("round", (test) => {
	test("should round correct to the requested decimal point", () => {
		expect(round(10.200329, 0)).toBe(10);
		expect(round(10.200329, 1)).toBe(10.2);
		expect(round(10.200329, 2)).toBe(10.2);
		expect(round(10.200329, 3)).toBe(10.2);
		expect(round(10.200329, 4)).toBe(10.2003);
		expect(round(10.200329, 5)).toBe(10.20033);
		expect(round(10.200329, 6)).toBe(10.200329);
	});
});
