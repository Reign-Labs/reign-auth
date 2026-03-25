import { reignAuth } from "reign-auth/minimal";

const baseURL: string | undefined =
	process.env.VERCEL === "1"
		? process.env.VERCEL_ENV === "production"
			? process.env.REIGN_AUTH_URL
			: process.env.VERCEL_ENV === "preview"
				? `https://${process.env.VERCEL_URL}`
				: undefined
		: undefined;

export const auth = reignAuth({
	baseURL,
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
	account: {
		storeAccountCookie: true,
	},
});
