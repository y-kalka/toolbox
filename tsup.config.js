import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		email: "src/email.ts",
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
