import type { ReignAuthClientPlugin } from "@reign-auth/core";
import type { magicLink } from ".";

export const magicLinkClient = () => {
	return {
		id: "magic-link",
		$InferServerPlugin: {} as ReturnType<typeof magicLink>,
	} satisfies ReignAuthClientPlugin;
};
