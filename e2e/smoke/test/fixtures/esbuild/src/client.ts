import { createAuthClient } from "reign-auth/vue";

export * from "reign-auth/client/plugins";

export const client = createAuthClient({
	baseURL: "http://localhost:3000",
});
