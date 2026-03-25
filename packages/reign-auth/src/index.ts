//#region Re-exports necessaries from core module
export type { StandardSchemaV1 } from "@reign-auth/core";
export * from "@reign-auth/core";
export { getCurrentAdapter } from "@reign-auth/core/context";
export * from "@reign-auth/core/db";
export * from "@reign-auth/core/env";
export * from "@reign-auth/core/error";
export * from "@reign-auth/core/oauth2";
export * from "@reign-auth/core/utils/error-codes";
export * from "@reign-auth/core/utils/id";
export * from "@reign-auth/core/utils/json";
//#endregion
export { reignAuth } from "./auth/full";
// @ts-expect-error
export * from "./types";
export * from "./utils";

// export this as we are referencing OAuth2Tokens in the `refresh-token` api as return type

// telemetry exports for CLI and consumers
export {
	createTelemetry,
	getTelemetryAuthConfig,
	type TelemetryEvent,
} from "@reign-auth/telemetry";
// re-export third party types
// @ts-expect-error
export type * from "reign-call";
export type { JSONWebKeySet, JWTPayload } from "jose";
export type * from "zod";
export { APIError } from "./api";
