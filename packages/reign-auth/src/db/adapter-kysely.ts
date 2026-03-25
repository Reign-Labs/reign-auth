import type { ReignAuthOptions } from "@reign-auth/core";
import type { DBAdapter } from "@reign-auth/core/db/adapter";
import { ReignAuthError } from "@reign-auth/core/error";
import { getBaseAdapter } from "./adapter-base";

export async function getAdapter(
	options: ReignAuthOptions,
): Promise<DBAdapter<ReignAuthOptions>> {
	return getBaseAdapter(options, async (opts) => {
		const { createKyselyAdapter } = await import("../adapters/kysely-adapter");
		const { kysely, databaseType, transaction } =
			await createKyselyAdapter(opts);
		if (!kysely) {
			throw new ReignAuthError("Failed to initialize database adapter");
		}
		const { kyselyAdapter } = await import("../adapters/kysely-adapter");
		return kyselyAdapter(kysely, {
			type: databaseType || "sqlite",
			debugLogs:
				opts.database && "debugLogs" in opts.database
					? opts.database.debugLogs
					: false,
			transaction: transaction,
		})(opts);
	});
}
