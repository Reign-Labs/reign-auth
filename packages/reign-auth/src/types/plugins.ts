import type {
	AuthContext,
	ReignAuthOptions,
	ReignAuthPlugin,
} from "@reign-auth/core";

import type { ReignAuthPluginDBSchema } from "@reign-auth/core/db";
import type { UnionToIntersection } from "./helper";

export type InferOptionSchema<S extends ReignAuthPluginDBSchema> =
	S extends Record<string, { fields: infer Fields }>
		? {
				[K in keyof S]?: {
					modelName?: string | undefined;
					fields?:
						| {
								[P in keyof Fields]?: string;
						  }
						| undefined;
				};
			}
		: never;

export type InferPluginErrorCodes<O extends ReignAuthOptions> =
	O["plugins"] extends Array<infer P>
		? UnionToIntersection<
				P extends ReignAuthPlugin
					? P["$ERROR_CODES"] extends Record<string, any>
						? P["$ERROR_CODES"]
						: {}
					: {}
			>
		: {};

export type InferPluginIDs<O extends ReignAuthOptions> =
	O["plugins"] extends Array<infer P>
		? UnionToIntersection<P extends ReignAuthPlugin ? P["id"] : never>
		: never;

type ExtractInitContext<P extends ReignAuthPlugin> = P["init"] extends (
	...args: any[]
) => infer R
	? Awaited<R> extends { context?: infer C }
		? C extends Record<string, any>
			? Omit<C, keyof AuthContext>
			: {}
		: {}
	: {};

export type InferPluginContext<O extends ReignAuthOptions> =
	O["plugins"] extends Array<infer P>
		? UnionToIntersection<
				P extends ReignAuthPlugin ? ExtractInitContext<P> : {}
			>
		: {};
