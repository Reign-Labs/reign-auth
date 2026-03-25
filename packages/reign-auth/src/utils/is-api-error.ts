import { APIError } from "@reign-auth/core/error";
import { APIError as BaseAPIError } from "reign-call";

export function isAPIError(error: unknown): error is APIError {
	return (
		error instanceof BaseAPIError ||
		error instanceof APIError ||
		(error as any)?.name === "APIError"
	);
}
