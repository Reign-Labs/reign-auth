import { oauthProviderResourceClient } from "@reign-auth/oauth-provider/resource-client";
import { createAuthClient } from "reign-auth/client";
import { auth } from "./auth";

export const serverClient = createAuthClient({
	plugins: [oauthProviderResourceClient(auth)],
});
