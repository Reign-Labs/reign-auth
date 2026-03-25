import type { ReignAuthOptions } from "@reign-auth/core";
import { init } from "../context/init";
import type { Auth } from "../types";
import { createReignAuth } from "./base";

/**
 * Reign Auth initializer for full mode (with Kysely)
 *
 * @example
 * ```ts
 * import { reignAuth } from "reign-auth";
 *
 * const auth = reignAuth({
 * 	database: new PostgresDialect({ connection: process.env.DATABASE_URL }),
 * });
 * ```
 *
 * For minimal mode (without Kysely), import from `reign-auth/minimal` instead
 * @example
 * ```ts
 * import { reignAuth } from "reign-auth/minimal";
 *
 * const auth = reignAuth({
 *	  database: drizzleAdapter(db, { provider: "pg" }),
 * });
 */
export const reignAuth = <Options extends ReignAuthOptions>(
	options: Options & {},
): Auth<Options> => {
	return createReignAuth(options, init);
};
