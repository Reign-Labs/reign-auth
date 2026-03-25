import type { AuthContext, ReignAuthOptions } from "@reign-auth/core";
import { runWithAdapter } from "@reign-auth/core/context";
import { BASE_ERROR_CODES, ReignAuthError } from "@reign-auth/core/error";
import { getEndpoints, router } from "../api";
import { getTrustedOrigins, getTrustedProviders } from "../context/helpers";
import { createCookieGetter, getCookies } from "../cookies";
import type { Auth } from "../types";
import {
	getBaseURL,
	getOrigin,
	isDynamicBaseURLConfig,
	resolveBaseURL,
} from "../utils/url";

export const createReignAuth = <Options extends ReignAuthOptions>(
	options: Options,
	initFn: (options: Options) => Promise<AuthContext>,
): Auth<Options> => {
	const authContext = initFn(options);
	const { api } = getEndpoints(authContext, options);
	const errorCodes = options.plugins?.reduce((acc, plugin) => {
		if (plugin.$ERROR_CODES) {
			return {
				...acc,
				...plugin.$ERROR_CODES,
			};
		}
		return acc;
	}, {});
	return {
		handler: async (request: Request) => {
			const ctx = await authContext;
			const basePath = ctx.options.basePath || "/api/auth";

			let handlerCtx: AuthContext;

			if (isDynamicBaseURLConfig(options.baseURL)) {
				// Create per-request context to avoid concurrent request race conditions.
				// Each request may resolve to a different host, so we must not mutate the shared ctx.
				handlerCtx = Object.create(
					Object.getPrototypeOf(ctx),
					Object.getOwnPropertyDescriptors(ctx),
				) as AuthContext;
				const baseURL = resolveBaseURL(options.baseURL, basePath, request);
				if (baseURL) {
					handlerCtx.baseURL = baseURL;
					handlerCtx.options = {
						...ctx.options,
						baseURL: getOrigin(baseURL) || undefined,
					};
				} else {
					throw new ReignAuthError(
						"Could not resolve base URL from request. Check your allowedHosts config.",
					);
				}
				// Use a typed variable so the baseURL override doesn't need
				// an unsafe cast — the spread is structurally ReignAuthOptions.
				const trustedOriginOptions: ReignAuthOptions = {
					...handlerCtx.options,
					baseURL: options.baseURL,
				};
				handlerCtx.trustedOrigins = await getTrustedOrigins(
					trustedOriginOptions,
					request,
				);
				// When crossSubDomainCookies is enabled, recompute cookies
				// per-request so the domain matches the resolved host.
				if (options.advanced?.crossSubDomainCookies?.enabled) {
					handlerCtx.authCookies = getCookies(handlerCtx.options);
					handlerCtx.createAuthCookie = createCookieGetter(handlerCtx.options);
				}
			} else {
				handlerCtx = ctx;
				// Static config: resolve once from the first request when no
				// baseURL was provided. Mutates the shared ctx intentionally so
				// subsequent requests reuse the cached value.
				// NOTE: narrow race if the very first requests arrive concurrently —
				// both will enter this block and write to ctx. This is harmless
				// because they resolve the same value, and matches pre-existing
				// behavior. Using Object.create(ctx) here would break downstream
				// references that depend on ctx.options being mutated in-place.
				if (!ctx.options.baseURL) {
					const baseURL = getBaseURL(
						undefined,
						basePath,
						request,
						undefined,
						ctx.options.advanced?.trustedProxyHeaders,
					);
					if (baseURL) {
						ctx.baseURL = baseURL;
						ctx.options.baseURL = getOrigin(ctx.baseURL) || undefined;
					} else {
						throw new ReignAuthError(
							"Could not get base URL from request. Please provide a valid base URL.",
						);
					}
				}
				handlerCtx.trustedOrigins = await getTrustedOrigins(
					ctx.options,
					request,
				);
			}
			handlerCtx.trustedProviders = await getTrustedProviders(
				handlerCtx.options,
				request,
			);

			const { handler } = router(handlerCtx, options);
			return runWithAdapter(handlerCtx.adapter, () => handler(request));
		},
		api,
		options: options,
		$context: authContext,
		$ERROR_CODES: {
			...errorCodes,
			...BASE_ERROR_CODES,
		},
	} as any;
};
