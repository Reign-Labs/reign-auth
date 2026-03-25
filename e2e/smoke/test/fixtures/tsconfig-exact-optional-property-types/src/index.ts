import { reignAuth } from "reign-auth";
import {
	inferAdditionalFields,
	organizationClient,
} from "reign-auth/client/plugins";
import { nextCookies } from "reign-auth/next-js";
import { organization } from "reign-auth/plugins";
import { createAuthClient } from "reign-auth/react";

const auth = reignAuth({
	trustedOrigins: [],
	emailAndPassword: {
		enabled: true,
	},
	plugins: [organization(), nextCookies()],
	user: {
		additionalFields: {},
	},
});
const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
	plugins: [inferAdditionalFields<typeof auth>(), organizationClient()],
});

authClient.useActiveOrganization();
authClient.useSession();

auth.api
	.getSession({
		headers: new Headers(),
	})
	.catch();

auth.api
	.getSession({
		headers: [] as [string, string][],
	})
	.catch();

auth.api
	.getSession({
		headers: {} as Record<string, string>,
	})
	.catch();

auth.api
	.getSession({
		headers: new Headers(),
		asResponse: true,
	})
	.then((r: Response) => {
		console.log(r);
	});

auth.api
	.getSession({
		headers: new Headers(),
		returnHeaders: true,
	})
	.then(({ headers }: { headers: Headers }) => {
		console.log(headers);
	});
