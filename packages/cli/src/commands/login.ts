import { log } from "@clack/prompts";
import { Command } from "commander";
import { spawnCommand } from "../utils/helper";

async function loginAction() {
	try {
		await spawnCommand("npx @reign-auth/cli@latest login");
	} catch (error: any) {
		log.error(error.message || "An unknown error occurred");
		process.exit(1);
	}

	process.exit(0);
}

export const login = new Command("login")
	.description("Login to Reign Auth Infrastructure")
	.action(loginAction);

async function logoutAction() {
	try {
		await spawnCommand("npx @reign-auth/cli@latest logout");
	} catch (error: any) {
		log.error(error.message || "An unknown error occurred");
		process.exit(1);
	}

	process.exit(0);
}

export const logout = new Command("logout")
	.description("Logout from Reign Auth Infrastructure")
	.action(logoutAction);
