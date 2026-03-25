import type { ReignAuthOptions } from "@reign-auth/core";
import { initMinimal } from "../context/init-minimal";
import type { Auth } from "../types";
import { createReignAuth } from "./base";

export type { ReignAuthOptions };

/**
 * Reign Auth initializer for minimal mode (without Kysely)
 */
export const reignAuth = <Options extends ReignAuthOptions>(
	options: Options & {},
): Auth<Options> => {
	return createReignAuth(options, initMinimal);
};
