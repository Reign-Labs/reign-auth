import type { ReignAuthClientPlugin } from "reign-auth/client";
import { STRIPE_ERROR_CODES } from "./error-codes";
import type { StripePlan, stripe } from "./index";
export const stripeClient = <
	O extends {
		subscription: boolean;
	},
>(
	options?: O | undefined,
) => {
	return {
		id: "stripe-client",
		$InferServerPlugin: {} as ReturnType<
			typeof stripe<
				O["subscription"] extends true
					? {
							stripeClient: any;
							stripeWebhookSecret: string;
							subscription: {
								enabled: true;
								plans: StripePlan[];
							};
						}
					: {
							stripeClient: any;
							stripeWebhookSecret: string;
						}
			>
		>,
		pathMethods: {
			"/subscription/billing-portal": "POST",
			"/subscription/restore": "POST",
		},
		$ERROR_CODES: STRIPE_ERROR_CODES,
	} satisfies ReignAuthClientPlugin;
};
export * from "./error-codes";
