import type { ReignAuthClientPlugin } from "@reign-auth/core";
import type { siwe } from ".";

export const siweClient = () => {
	return {
		id: "siwe",
		$InferServerPlugin: {} as ReturnType<typeof siwe>,
	} satisfies ReignAuthClientPlugin;
};
