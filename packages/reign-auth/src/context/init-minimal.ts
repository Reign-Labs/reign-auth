import type { ReignAuthOptions } from "@reign-auth/core";
import { ReignAuthError } from "@reign-auth/core/error";
import { getBaseAdapter } from "../db/adapter-base";
import { createAuthContext } from "./create-context";

export const initMinimal = async (options: ReignAuthOptions) => {
	const adapter = await getBaseAdapter(options, async () => {
		throw new ReignAuthError(
			"Direct database connection requires Kysely. Please use `reign-auth` instead of `reign-auth/minimal`, or provide an adapter (drizzleAdapter, prismaAdapter, etc.)",
		);
	});

	// Without Kysely, we can't detect database type, so always return "unknown"
	const getDatabaseType = (_database: ReignAuthOptions["database"]) =>
		"unknown";

	// Use base context creation
	const ctx = await createAuthContext(adapter, options, getDatabaseType);

	// Add runMigrations that throws error (migrations require Kysely)
	ctx.runMigrations = async function () {
		throw new ReignAuthError(
			"Migrations are not supported in 'reign-auth/minimal'. Please use 'reign-auth' for migration support.",
		);
	};

	return ctx;
};
