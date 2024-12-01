import { describe, expect } from "vitest";
import { sleep } from "./async.js";

describe("sleep", (test) => {
	const TIME_MS = 10;

	test("should resolve the promise after or on time", // { repeats: 1000 },
	async () => {
		const start = performance.now();
		await sleep(TIME_MS);
		const time = performance.now() - start;

		expect(time).gte(Math.floor(TIME_MS * 0.95));
	});

	test("should return a promise", async () => {
		expect(sleep(TIME_MS)).resolves.toBe(undefined);
	});
});
