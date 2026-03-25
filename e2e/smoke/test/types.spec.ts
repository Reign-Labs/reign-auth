import type { JoinConfig, JoinOption } from "reign-auth/adapters";
import type { GoogleProfile } from "reign-auth/social-providers";
import { describe, expectTypeOf, it } from "vitest";

describe("type exports", () => {
	it("should export JoinOption", () => {
		expectTypeOf<JoinOption>().not.toBeAny();
	});

	it("should export JoinConfig", () => {
		expectTypeOf<JoinConfig>().not.toBeAny();
	});

	it("should export GoogleProfile", () => {
		expectTypeOf<GoogleProfile>().not.toBeAny();
	});
});
