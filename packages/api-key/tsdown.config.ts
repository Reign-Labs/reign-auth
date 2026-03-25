import { defineConfig } from "tsdown";

export default defineConfig({
	dts: { build: true, incremental: true },
	format: ["esm"],
	entry: ["./src/index.ts", "./src/client.ts", "./src/types.ts"],
	deps: {
		neverBundle: ["reign-auth", "reign-call", "@reign-auth/fetch"],
	},
	sourcemap: true,
	treeshake: true,
});
