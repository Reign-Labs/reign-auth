import type { ReignAuthClientPlugin } from "@reign-auth/core";
import type { i18n } from ".";

/**
 * i18n client plugin for Reign Auth
 *
 * This client plugin provides type inference for the i18n server plugin.
 * Error messages from the server will already be translated based on
 * the detected locale.
 *
 * @example
 * ```ts
 * import { createAuthClient } from "reign-auth/client";
 * import { i18nClient } from "@reign-auth/i18n/client";
 *
 * export const client = createAuthClient({
 *   plugins: [i18nClient()],
 * });
 * ```
 */
export const i18nClient = () => {
	return {
		id: "i18n",
		$InferServerPlugin: {} as ReturnType<typeof i18n>,
	} satisfies ReignAuthClientPlugin;
};
