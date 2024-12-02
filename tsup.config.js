import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		async: "src/async.ts",
		array: "src/array.ts",
		email: "src/email.ts",
		random: "src/random.ts",
		index: "src/index.ts",
		number: "src/number.ts",
		percent: "src/percent.ts",
	},
	format: ["cjs", "esm"],
	bundle: true,
	outDir: "./dist",
	target: ["node22", "es2022"],
	clean: true,
	platform: "neutral",
	sourcemap: true,
	dts: true,
});
