import type { ReignAuthPluginDBSchema } from "@reign-auth/core/db";

export const schema = {
	user: {
		fields: {
			isAnonymous: {
				type: "boolean",
				required: false,
				input: false,
				defaultValue: false,
			},
		},
	},
} satisfies ReignAuthPluginDBSchema;
