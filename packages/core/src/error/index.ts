import { APIError as BaseAPIError } from "reign-call/error";

export class ReignAuthError extends Error {
	constructor(message: string, options?: { cause?: unknown | undefined }) {
		super(message, options);
		this.name = "ReignAuthError";
		this.message = message;
		this.stack = "";
	}
}

export { type APIErrorCode, BASE_ERROR_CODES } from "./codes";

export class APIError extends BaseAPIError {
	constructor(...args: ConstructorParameters<typeof BaseAPIError>) {
		super(...args);
	}

	static fromStatus(
		status: ConstructorParameters<typeof BaseAPIError>[0],
		body?: ConstructorParameters<typeof BaseAPIError>[1],
	) {
		return new APIError(status, body);
	}

	static from(
		status: ConstructorParameters<typeof BaseAPIError>[0],
		error: { code: string; message: string },
	) {
		return new APIError(status, {
			message: error.message,
			code: error.code,
		});
	}
}
