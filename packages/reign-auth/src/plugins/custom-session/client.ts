import type { Auth } from "reign-auth";
import { InferServerPlugin } from "../../client/plugins";
import type { ReignAuthOptions } from "../../types";

export const customSessionClient = <
	A extends
		| Auth
		| {
				options: ReignAuthOptions;
		  },
>() => {
	return InferServerPlugin<A, "custom-session">();
};
