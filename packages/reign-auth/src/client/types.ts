import type {
	ReignAuthClientOptions,
	ReignAuthClientPlugin,
	ClientAtomListener,
	ClientStore,
} from "@reign-auth/core";
import type {
	ReignAuthPluginDBSchema,
	InferDBFieldsOutput,
} from "@reign-auth/core/db";
import type { RawError } from "@reign-auth/core/utils/error-codes";
import type { InferFieldsInputClient } from "../db/field";
import type { Auth, Session, User } from "../types";
import type { StripEmptyObjects, UnionToIntersection } from "../types/helper";
import type { InferRoutes } from "./path-to-object";
export type {
	ClientStore,
	ClientAtomListener,
	ReignAuthClientOptions,
	ReignAuthClientPlugin,
};

type InferPluginEndpoints<Plugins> =
	Plugins extends Array<infer Pl>
		? UnionToIntersection<
				Pl extends {
					$InferServerPlugin: infer Plug;
				}
					? Plug extends {
							endpoints: infer Endpoints;
						}
						? Endpoints
						: {}
					: {}
			>
		: {};

export type InferClientAPI<O extends ReignAuthClientOptions> = InferRoutes<
	O["plugins"] extends Array<any>
		? Omit<Auth["api"], keyof InferPluginEndpoints<O["plugins"]>> &
				InferPluginEndpoints<O["plugins"]>
		: Auth["api"],
	O
>;

export type InferActions<O extends ReignAuthClientOptions> =
	(O["plugins"] extends Array<infer Plugin>
		? UnionToIntersection<
				Plugin extends ReignAuthClientPlugin
					? Plugin["getActions"] extends (...args: any) => infer Actions
						? Actions
						: {}
					: {}
			>
		: {}) &
		//infer routes from auth config
		InferRoutes<
			O["$InferAuth"] extends {
				plugins: infer Plugins;
			}
				? Plugins extends Array<infer Plugin>
					? Plugin extends {
							endpoints: infer Endpoints;
						}
						? Endpoints
						: {}
					: {}
				: {},
			O
		>;

export type InferErrorCodes<O extends ReignAuthClientOptions> =
	O["plugins"] extends Array<infer Plugin>
		? UnionToIntersection<
				Plugin extends ReignAuthClientPlugin
					? Plugin["$InferServerPlugin"] extends { $ERROR_CODES: infer E }
						? {
								[K in keyof E & string]: E[K] extends RawError
									? RawError<K>
									: never;
							}
						: {}
					: {}
			>
		: {};
/**
 * signals are just used to recall a computed value.
 * as a convention they start with "$"
 */
export type IsSignal<T> = T extends `$${infer _}` ? true : false;

export type InferSessionFromClient<O extends ReignAuthClientOptions> =
	StripEmptyObjects<
		Session &
			UnionToIntersection<InferAdditionalFromClient<O, "session", "output">>
	>;
export type InferUserFromClient<O extends ReignAuthClientOptions> =
	StripEmptyObjects<
		User & UnionToIntersection<InferAdditionalFromClient<O, "user", "output">>
	>;

export type InferAdditionalFromClient<
	Options extends ReignAuthClientOptions,
	Key extends string,
	Format extends "input" | "output" = "output",
> =
	Options["plugins"] extends Array<infer Plugin>
		? Plugin extends ReignAuthClientPlugin
			? Plugin["$InferServerPlugin"] extends { schema: infer Schema }
				? Schema extends ReignAuthPluginDBSchema
					? Format extends "input"
						? InferFieldsInputClient<Schema[Key]["fields"]>
						: InferDBFieldsOutput<Schema[Key]["fields"]>
					: {}
				: {}
			: {}
		: {};

export type SessionQueryParams = {
	disableCookieCache?: boolean | undefined;
	disableRefresh?: boolean | undefined;
};
