import type { ReignAuthOptions } from "@reign-auth/core";
import { getAuthTables } from "@reign-auth/core/db";
import type { DBAdapter } from "@reign-auth/core/db/adapter";
import { logger } from "@reign-auth/core/env";
import type { MemoryDB } from "@reign-auth/memory-adapter";

export async function getBaseAdapter(
	options: ReignAuthOptions,
	handleDirectDatabase: (
		options: ReignAuthOptions,
	) => Promise<DBAdapter<ReignAuthOptions>>,
): Promise<DBAdapter<ReignAuthOptions>> {
	let adapter: DBAdapter<ReignAuthOptions>;

	if (!options.database) {
		const tables = getAuthTables(options);
		const memoryDB = Object.keys(tables).reduce<MemoryDB>((acc, key) => {
			acc[key] = [];
			return acc;
		}, {});
		const { memoryAdapter } = await import("@reign-auth/memory-adapter");
		adapter = memoryAdapter(memoryDB)(options);
	} else if (typeof options.database === "function") {
		adapter = options.database(options);
	} else {
		adapter = await handleDirectDatabase(options);
	}

	// patch for 1.3.x to ensure we have a transaction function in the adapter
	if (!adapter.transaction) {
		logger.warn(
			"Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.",
		);
		adapter.transaction = async (cb) => {
			return cb(adapter);
		};
	}

	return adapter;
}
