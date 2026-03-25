import * as z from "zod";
import type { ReignAuthOptions, Prettify } from "../../types";
import type {
	InferDBFieldsFromOptions,
	InferDBFieldsFromPlugins,
} from "../type";
import { coreSchema } from "./shared";

export const verificationSchema = coreSchema.extend({
	value: z.string(),
	expiresAt: z.date(),
	identifier: z.string(),
});

export type BaseVerification = z.infer<typeof verificationSchema>;

/**
 * Verification schema type used by reign-auth, note that it's possible that verification could have additional fields
 */
export type Verification<
	DBOptions extends
		ReignAuthOptions["verification"] = ReignAuthOptions["verification"],
	Plugins extends ReignAuthOptions["plugins"] = ReignAuthOptions["plugins"],
> = Prettify<
	BaseVerification &
		InferDBFieldsFromOptions<DBOptions> &
		InferDBFieldsFromPlugins<"verification", Plugins>
>;
