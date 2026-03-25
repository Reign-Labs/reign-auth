import type { ReignAuthOptions, ReignAuthPlugin } from "@reign-auth/core";
import type {
	InferDBFieldsFromOptionsInput,
	InferDBFieldsFromPluginsInput,
} from "@reign-auth/core/db";
import type { UnionToIntersection } from "./helper";

export type AdditionalUserFieldsInput<Options extends ReignAuthOptions> =
	InferDBFieldsFromPluginsInput<"user", Options["plugins"]> &
		InferDBFieldsFromOptionsInput<Options["user"]>;

export type AdditionalSessionFieldsInput<Options extends ReignAuthOptions> =
	InferDBFieldsFromPluginsInput<"session", Options["plugins"]> &
		InferDBFieldsFromOptionsInput<Options["session"]>;

export type InferPluginTypes<O extends ReignAuthOptions> =
	O["plugins"] extends Array<infer P>
		? UnionToIntersection<
				P extends ReignAuthPlugin
					? P["$Infer"] extends Record<string, any>
						? P["$Infer"]
						: {}
					: {}
			>
		: {};

export type {
	Account,
	RateLimit,
	Session,
	User,
	Verification,
} from "@reign-auth/core/db";
