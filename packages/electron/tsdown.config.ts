import { defineConfig } from "tsdown";

export default defineConfig([
	{
		dts: { build: true, incremental: true },
		format: ["esm"],
		entry: [
			"./src/index.ts",
			"./src/client.ts",
			"./src/proxy.ts",
			"./src/storage.ts",
		],
		deps: {
			neverBundle: [
				"reign-auth",
				"reign-call",
				"@reign-auth/fetch",
				"electron",
			],
		},
		treeshake: true,
	},
	{
		dts: { build: true, incremental: true },
		format: ["esm"],
		entry: ["./src/preload.ts"],
		deps: {
			neverBundle: (id, _, isResolved) => {
				if (isResolved) return false;
				return (
					!id.startsWith(".") &&
					!id.startsWith("reign-call") &&
					!id.startsWith("@reign-auth/core")
				);
			},
			alwaysBundle: [/^@reign-auth\/core/, /^reign-call/],
			onlyAllowBundle: ["reign-call", "@standard-schema/spec"],
		},
		treeshake: true,
	},
]);
