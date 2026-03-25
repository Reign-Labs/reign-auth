import { reignAuth } from "reign-auth";
import { oidcProvider } from "reign-auth/plugins";

export const auth = reignAuth({
	plugins: [
		oidcProvider({
			loginPage: "/login",
		}),
	],
});
