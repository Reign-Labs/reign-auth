/// <reference types="vite/client" />
export * from "reign-auth/client/plugins";

import { createAuthClient } from "reign-auth/client";

export * from "reign-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
});
