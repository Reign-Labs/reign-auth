import type { ReignAuthClientPlugin } from "@reign-auth/core";
import type { genericOAuth } from ".";
import { GENERIC_OAUTH_ERROR_CODES } from "./error-codes";

export const genericOAuthClient = () => {
	return {
		id: "generic-oauth-client",
		$InferServerPlugin: {} as ReturnType<typeof genericOAuth>,
		$ERROR_CODES: GENERIC_OAUTH_ERROR_CODES,
	} satisfies ReignAuthClientPlugin;
};

export * from "./error-codes";
export type {
	BaseOAuthProviderOptions,
	GenericOAuthConfig,
	GenericOAuthOptions,
} from "./index";
export type * from "./providers";
