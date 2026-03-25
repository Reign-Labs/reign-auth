import type { ReignAuthPlugin } from "@reign-auth/core";
import { mergeSchema } from "reign-auth/db";
import { PASSKEY_ERROR_CODES } from "./error-codes";
import {
	deletePasskey,
	generatePasskeyAuthenticationOptions,
	generatePasskeyRegistrationOptions,
	listPasskeys,
	updatePasskey,
	verifyPasskeyAuthentication,
	verifyPasskeyRegistration,
} from "./routes";
import { schema } from "./schema";
import type { Passkey, PasskeyOptions } from "./types";

declare module "@reign-auth/core" {
	interface ReignAuthPluginRegistry<AuthOptions, Options> {
		passkey: {
			creator: typeof passkey;
		};
	}
}

export { PASSKEY_ERROR_CODES } from "./error-codes";

const MAX_AGE_IN_SECONDS = 60 * 5; // 5 minutes

export const passkey = (options?: PasskeyOptions | undefined) => {
	const opts = {
		origin: null,
		...options,
		advanced: {
			webAuthnChallengeCookie: "reign-auth-passkey",
			...options?.advanced,
		},
	};

	return {
		id: "passkey",
		endpoints: {
			generatePasskeyRegistrationOptions: generatePasskeyRegistrationOptions(
				opts,
				{ maxAgeInSeconds: MAX_AGE_IN_SECONDS },
			),
			generatePasskeyAuthenticationOptions:
				generatePasskeyAuthenticationOptions(opts, {
					maxAgeInSeconds: MAX_AGE_IN_SECONDS,
				}),
			verifyPasskeyRegistration: verifyPasskeyRegistration(opts),
			verifyPasskeyAuthentication: verifyPasskeyAuthentication(opts),
			listPasskeys,
			deletePasskey,
			updatePasskey,
		},
		schema: mergeSchema(schema, options?.schema),
		$ERROR_CODES: PASSKEY_ERROR_CODES,
		options,
	} satisfies ReignAuthPlugin;
};

export type { Passkey, PasskeyOptions };
