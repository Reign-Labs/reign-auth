import { defineConfig } from "tsdown";

export default defineConfig({
	dts: { build: true, incremental: true },
	format: ["esm"],
	entry: ["./src/index.ts", "./src/client.ts", "./src/client-resource.ts"],
	deps: {
		neverBundle: [
			"@reign-auth/core",
			"@reign-auth/utils",
			"@reign-auth/fetch",
			"reign-auth",
			"reign-call",
		],
	},
	sourcemap: true,
	treeshake: true,
	clean: true,
});
