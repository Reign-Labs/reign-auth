import type { ReignAuthClientPlugin } from "@reign-auth/core";
import type { oneTimeToken } from "./index";

export const oneTimeTokenClient = () => {
	return {
		id: "one-time-token",
		$InferServerPlugin: {} as ReturnType<typeof oneTimeToken>,
	} satisfies ReignAuthClientPlugin;
};

export type { OneTimeTokenOptions } from "./index";
