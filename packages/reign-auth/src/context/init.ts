import { ReignAuthError } from "@reign-auth/core/error";
import { getKyselyDatabaseType } from "@reign-auth/kysely-adapter";
import { getAdapter } from "../db/adapter-kysely";
import { getMigrations } from "../db/get-migration";
import type { ReignAuthOptions } from "../types";
import { createAuthContext } from "./create-context";

export const init = async (options: ReignAuthOptions) => {
	const adapter = await getAdapter(options);

	// Get database type using Kysely's dialect detection
	const getDatabaseType = (database: ReignAuthOptions["database"]) =>
		getKyselyDatabaseType(database) || "unknown";

	// Use base context creation
	const ctx = await createAuthContext(adapter, options, getDatabaseType);

	// Add runMigrations with Kysely support
	ctx.runMigrations = async function () {
		// only run migrations if database is provided and it's not an adapter
		if (!options.database || "updateMany" in options.database) {
			throw new ReignAuthError(
				"Database is not provided or it's an adapter. Migrations are only supported with a database instance.",
			);
		}
		const { runMigrations } = await getMigrations(options);
		await runMigrations();
	};

	return ctx;
};
