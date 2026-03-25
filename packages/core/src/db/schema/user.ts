import * as z from "zod";
import type { ReignAuthOptions, Prettify } from "../../types";
import type {
	InferDBFieldsFromOptions,
	InferDBFieldsFromPlugins,
} from "../type";
import { coreSchema } from "./shared";

export const userSchema = coreSchema.extend({
	email: z.string().transform((val) => val.toLowerCase()),
	emailVerified: z.boolean().default(false),
	name: z.string(),
	image: z.string().nullish(),
});

export type BaseUser = z.infer<typeof userSchema>;

/**
 * User schema type used by reign-auth, note that it's possible that user could have additional fields
 */
export type User<
	DBOptions extends ReignAuthOptions["user"] = ReignAuthOptions["user"],
	Plugins extends ReignAuthOptions["plugins"] = ReignAuthOptions["plugins"],
> = Prettify<
	BaseUser &
		InferDBFieldsFromOptions<DBOptions> &
		InferDBFieldsFromPlugins<"user", Plugins>
>;
