import { dashClient } from "@reign-auth/dash/client";
import { electronProxyClient } from "@reign-auth/electron/proxy";
import { oauthProviderClient } from "@reign-auth/oauth-provider/client";
import { passkeyClient } from "@reign-auth/passkey/client";
import { stripeClient } from "@reign-auth/stripe/client";
import {
	adminClient,
	customSessionClient,
	deviceAuthorizationClient,
	lastLoginMethodClient,
	multiSessionClient,
	oneTapClient,
	organizationClient,
	twoFactorClient,
} from "reign-auth/client/plugins";
import { createAuthClient } from "reign-auth/react";
import { toast } from "sonner";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	plugins: [
		dashClient(),
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/two-factor";
			},
		}),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		oneTapClient({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			promptOptions: {
				maxAttempts: 1,
			},
		}),
		oauthProviderClient(),
		stripeClient({
			subscription: true,
		}),
		customSessionClient<typeof auth>(),
		deviceAuthorizationClient(),
		lastLoginMethodClient(),
		electronProxyClient({
			protocol: {
				scheme: "com.reign-auth.demo",
			},
		}),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});
