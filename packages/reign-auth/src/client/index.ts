import type {
	ReignAuthClientPlugin,
	ReignAuthOptions,
	ReignAuthPlugin,
} from "@reign-auth/core";

export * from "./broadcast-channel";
export {
	type FocusListener,
	type FocusManager,
	kFocusManager,
} from "./focus-manager";
export {
	kOnlineManager,
	type OnlineListener,
	type OnlineManager,
} from "./online-manager";
export * from "./parser";
export * from "./query";
export * from "./session-refresh";
export * from "./types";
export * from "./vanilla";

export const InferPlugin = <T extends ReignAuthPlugin>() => {
	return {
		id: "infer-server-plugin",
		$InferServerPlugin: {} as T,
	} satisfies ReignAuthClientPlugin;
};

export function InferAuth<O extends { options: ReignAuthOptions }>() {
	return {} as O["options"];
}

//#region Necessary re-exports
export type * from "@reign-auth/core/db";
export type { DBPrimitive } from "@reign-auth/core/db";
export type * from "@reign-auth/fetch";
export type * from "nanostores";
export type * from "../plugins/access";
export type * from "../plugins/organization";
export type * from "../types/helper";
export type { UnionToIntersection } from "../types/helper";
export type * from "./path-to-object";
//#endregion
