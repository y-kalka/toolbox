import { describe, expect } from "vitest";
import {
	addSubAddress,
	dropSubAddress,
	fingerprint,
	sanatizeEmail,
	setSubAddress,
} from "./email.js";

describe("addSubAddress", (test) => {
	test("adds a sub address into a email address", () => {
		expect(addSubAddress("hello@world.com", "test")).toBe(
			"hello+test@world.com",
		);
		expect(() => addSubAddress("hello+test@world.com", "test")).toThrowError(
			"Email has already a sub address",
		);
	});
});

describe("setSubAddress", (test) => {
	test("sets the sub address into a email address", () => {
		expect(setSubAddress("hello+world@world.com", "test")).toBe(
			"hello+test@world.com",
		);
	});
});

describe("dropSubAddress", (test) => {
	test("drops the sub address from a email address", () => {
		expect(dropSubAddress("hello+test@gmail.com")).toBe("hello@gmail.com");
		expect(dropSubAddress("hello@gmail.com")).toBe("hello@gmail.com");
	});
});
describe("sanatizeEmail", (test) => {
	test("should sanatize a email addresss to the format which will be used by email servers for routing", () => {
		expect(sanatizeEmail("hello@gmail.com")).toBe("hello@gmail.com");
		expect(sanatizeEmail("he.lLo+tESt@GMAIL.coM")).toBe("helLo@gmail.com");
		expect(sanatizeEmail("he.lLo+tESt@gmail.com")).toBe("helLo@gmail.com");
		expect(sanatizeEmail("h.e.l.L.o+t.E.S.t@gmail.com")).toBe(
			"helLo@gmail.com",
		);
		expect(sanatizeEmail("he.lLo+tESt@world.com")).toBe("he.lLo@world.com");
	});
});

describe("fingerprint", (test) => {
	test("should generate the same fingerprint for differnt visual addresses", async () => {
		const testCases = [
			{
				alias: ["hello@gmail.com", "h.eLl.o@gmAIL.com"],
				fingerprint: "1qZrfAsZqSTqLab7GIlIGg4Y+q0=",
			},
			{
				alias: ["hello@world.com", "HELLO@world.com"],
				fingerprint: "OwfGBLKIfAAZbXZe+PkiQH7LYH8=",
			},
		];

		for (const testCase of testCases) {
			for (const alias of testCase.alias) {
				expect(await fingerprint(alias, { algorithm: "SHA-1" })).toBe(
					testCase.fingerprint,
				);
			}
		}
	});
});
