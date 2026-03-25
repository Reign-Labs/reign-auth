import { defineConfig } from "tsdown";

export default defineConfig({
	dts: { build: true, incremental: true },
	format: ["esm"],
	entry: ["./src/index.ts", "./src/client.ts"],
	deps: {
		neverBundle: [
			"reign-auth",
			"reign-call",
			"@reign-auth/fetch",
			"stripe",
		],
	},
	sourcemap: true,
});
