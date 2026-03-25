import type { ReignAuthClientPlugin } from "@reign-auth/core";
import type { oidcProvider } from ".";

export const oidcClient = () => {
	return {
		id: "oidc-client",
		$InferServerPlugin: {} as ReturnType<typeof oidcProvider>,
	} satisfies ReignAuthClientPlugin;
};

export type OidcClientPlugin = ReturnType<typeof oidcClient>;

export type * from "./types";
