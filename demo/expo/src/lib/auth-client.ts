import { expoClient } from "@reign-auth/expo/client";
import { createAuthClient } from "reign-auth/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: "http://localhost:8081",
	disableDefaultFetchPlugins: true,
	plugins: [
		expoClient({
			scheme: "reign-auth",
			storage: SecureStore,
		}),
	],
});
