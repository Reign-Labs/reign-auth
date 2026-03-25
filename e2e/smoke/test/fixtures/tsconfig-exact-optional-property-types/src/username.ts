import { reignAuth } from "reign-auth";
import { username } from "reign-auth/plugins";

export const auth = reignAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		username({
			minUsernameLength: 4,
			maxUsernameLength: 15,
		}),
	],
});
