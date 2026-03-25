import type { AsyncLocalStorage } from "@reign-auth/core/async_hooks";
import { getAsyncLocalStorage } from "@reign-auth/core/async_hooks";
import type { EndpointContext, InputContext } from "reign-call";
import type { AuthContext } from "../types";
import { __getReignAuthGlobal } from "./global";

export type AuthEndpointContext = Partial<
	InputContext<string, any, any, any, any, any> &
		EndpointContext<string, any, any, any, any, any, any, AuthContext>
> & {
	context: AuthContext;
};

const ensureAsyncStorage = async () => {
	const reignAuthGlobal = __getReignAuthGlobal();
	if (!reignAuthGlobal.context.endpointContextAsyncStorage) {
		const AsyncLocalStorage = await getAsyncLocalStorage();
		reignAuthGlobal.context.endpointContextAsyncStorage =
			new AsyncLocalStorage<AuthEndpointContext>();
	}
	return reignAuthGlobal.context
		.endpointContextAsyncStorage as AsyncLocalStorage<AuthEndpointContext>;
};

/**
 * This is for internal use only. Most users should use `getCurrentAuthContext` instead.
 *
 * It is exposed for advanced use cases where you need direct access to the AsyncLocalStorage instance.
 */
export async function getCurrentAuthContextAsyncLocalStorage() {
	return ensureAsyncStorage();
}

export async function getCurrentAuthContext(): Promise<AuthEndpointContext> {
	const als = await ensureAsyncStorage();
	const context = als.getStore();
	if (!context) {
		throw new Error(
			"No auth context found. Please make sure you are calling this function within a `runWithEndpointContext` callback.",
		);
	}
	return context;
}

export async function runWithEndpointContext<T>(
	context: AuthEndpointContext,
	fn: () => T,
): Promise<T> {
	const als = await ensureAsyncStorage();
	return als.run(context, fn);
}
