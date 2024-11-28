import { expect, test } from "vitest";
import { email } from "./index.js";

test("should load sub packages", () => {
	expect(email).toBeTypeOf("object");
	expect(email.setSubAddress).toBeTypeOf("function");
});
