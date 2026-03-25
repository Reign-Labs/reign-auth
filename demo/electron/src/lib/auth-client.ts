import { electronClient } from "@reign-auth/electron/client";
import { storage } from "@reign-auth/electron/storage";
import { createAuthClient } from "reign-auth/client";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000/api/auth",
	plugins: [
		electronClient({
			protocol: {
				scheme: "com.reign-auth.demo",
			},
			signInURL: "http://localhost:3000/sign-in",
			storage: storage(),
		}),
	],
});
